#!/usr/bin/env python3
"""Servidor SCIM 2.0 didático AtlasCorp: somente laboratório, sem TLS embutido.
Uso: IAM_SCIM_TOKEN='<valor-aleatorio-longo>' python scim_server.py
Padrão: bind em 127.0.0.1, porta 8081, SQLite local. NUNCA publicar na Internet.
Não suporta todos os filtros/atributos da RFC 7644; documentado em labs/README.md.
"""
import hmac
import json
import os
import re
import sqlite3
import threading
import uuid
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlsplit

USER_SCHEMA = "urn:ietf:params:scim:schemas:core:2.0:User"
LIST_SCHEMA = "urn:ietf:params:scim:api:messages:2.0:ListResponse"
ERROR_SCHEMA = "urn:ietf:params:scim:api:messages:2.0:Error"
PATCH_SCHEMA = "urn:ietf:params:scim:api:messages:2.0:PatchOp"


class Store:
    def __init__(self, path="atlas-scim.sqlite3"):
        self.lock = threading.RLock()
        self.conn = sqlite3.connect(path, check_same_thread=False)
        with self.lock:
            self.conn.execute("""CREATE TABLE IF NOT EXISTS users(
               id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE,
               externalid TEXT UNIQUE, active INTEGER NOT NULL, department TEXT)""")
            self.conn.commit()

    @staticmethod
    def format_user(row):
        return {"schemas": [USER_SCHEMA], "id": row[0], "userName": row[1],
                "externalId": row[2], "active": bool(row[3]),
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":
                {"department": row[4] or ""}}

    def by_id(self, uid):
        with self.lock:
            result = self.conn.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()
        return self.format_user(result) if result else None

    def list(self, field=None, value=None, offset=0, limit=100):
        query = "SELECT * FROM users"
        args = []
        if field:
            column = {"userName": "username", "externalId": "externalid"}[field]
            query += " WHERE " + column + "=?"
            args.append(value)
        with self.lock:
            count = self.conn.execute("SELECT COUNT(*) FROM users" + (query[19:] if field else ""), args).fetchone()[0]
            rows = self.conn.execute(query + " ORDER BY username LIMIT ? OFFSET ?", (*args, limit, offset)).fetchall()
        return count, [self.format_user(x) for x in rows]

    def create(self, data):
        name = data.get("userName")
        external = data.get("externalId")
        if not isinstance(name, str) or not 1 <= len(name) <= 120:
            raise ValueError("userName obrigatório (1–120 caracteres)")
        if external is not None and (not isinstance(external, str) or len(external) > 120):
            raise ValueError("externalId inválido")
        if not isinstance(data.get("active", True), bool):
            raise ValueError("active precisa ser boolean")
        ext = data.get("urn:ietf:params:scim:schemas:extension:enterprise:2.0:User", {})
        department = ext.get("department", "") if isinstance(ext, dict) else ""
        if not isinstance(department, str) or len(department) > 120:
            raise ValueError("department inválido")
        ident = str(uuid.uuid4())
        with self.lock:
            self.conn.execute("INSERT INTO users VALUES(?,?,?,?,?)",
                              (ident, name, external, int(data.get("active", True)), department))
            self.conn.commit()
        return self.by_id(ident)

    def patch(self, uid, data):
        operations = data.get("Operations")
        if not isinstance(operations, list) or not operations:
            raise ValueError("Operations obrigatório")
        with self.lock:
            old = self.conn.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()
            if old is None:
                return None
            user = self.format_user(old)
            for op in operations:
                if not isinstance(op, dict) or str(op.get("op", "")).lower() != "replace":
                    raise ValueError("Somente op replace é suportada")
                path, value = op.get("path"), op.get("value")
                if path not in ("active", "department"):
                    raise ValueError("Somente active e department são alteráveis")
                if path == "active" and not isinstance(value, bool):
                    raise ValueError("active precisa ser boolean")
                if path == "department" and (not isinstance(value, str) or len(value) > 120):
                    raise ValueError("department inválido")
                if path == "active":
                    user["active"] = value
                else:
                    user["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"]["department"] = value
            self.conn.execute("UPDATE users SET active=?, department=? WHERE id=?",
                              (int(user["active"]), user["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"]["department"], uid))
            self.conn.commit()
        return self.by_id(uid)


def handler_factory(store, token):
    class Handler(BaseHTTPRequestHandler):
        server_version = "AtlasCorpSCIM/0.2"
        def log_message(self, fmt, *args):
            # Não registrar Authorization nem corpo de usuário.
            print("SCIM:", self.command, urlsplit(self.path).path, args[1] if len(args) > 1 else "")

        def send_json(self, status, value, extra=None):
            encoded = json.dumps(value, ensure_ascii=False).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/scim+json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(encoded)))
            if extra:
                for key, val in extra.items():
                    self.send_header(key, val)
            self.end_headers()
            self.wfile.write(encoded)

        def error(self, status, detail):
            self.send_json(status, {"schemas": [ERROR_SCHEMA], "status": str(status), "detail": detail})

        def authenticated(self):
            actual = self.headers.get("Authorization", "")
            if not hmac.compare_digest(actual, "Bearer " + token):
                self.error(401, "Bearer de laboratório necessário")
                return False
            return True

        def payload(self):
            try:
                size = int(self.headers.get("Content-Length", "0"))
                if size <= 0 or size > 65536:
                    raise ValueError("Tamanho de payload inválido")
                return json.loads(self.rfile.read(size))
            except (ValueError, json.JSONDecodeError, UnicodeDecodeError):
                raise ValueError("JSON inválido ou excede 64 KiB")

        def do_GET(self):
            route = urlsplit(self.path)
            if route.path == "/healthz":
                return self.send_json(200, {"status": "ok", "name": "AtlasCorp SCIM training"})
            if not self.authenticated():
                return
            if route.path == "/scim/v2/Users":
                q = parse_qs(route.query)
                expr = q.get("filter", [None])[0]
                field = value = None
                if expr:
                    match = re.fullmatch(r'(userName|externalId)\s+eq\s+"([^"]{1,120})"', expr)
                    if not match:
                        return self.error(400, 'Filtro permitido: userName eq "..." ou externalId eq "..."')
                    field, value = match.groups()
                try:
                    start = int(q.get("startIndex", ["1"])[0])
                    limit = int(q.get("count", ["100"])[0])
                    if start < 1 or not 1 <= limit <= 100:
                        raise ValueError()
                except ValueError:
                    return self.error(400, "startIndex/count inválidos")
                count, users = store.list(field, value, start - 1, limit)
                return self.send_json(200, {"schemas": [LIST_SCHEMA], "totalResults": count,
                                             "startIndex": start, "itemsPerPage": len(users), "Resources": users})
            match = re.fullmatch(r"/scim/v2/Users/([0-9a-f-]{36})", route.path)
            if match:
                user = store.by_id(match.group(1))
                return self.send_json(200, user) if user else self.error(404, "Usuário não encontrado")
            self.error(404, "Endpoint desconhecido")

        def do_POST(self):
            if not self.authenticated(): return
            if urlsplit(self.path).path != "/scim/v2/Users":
                return self.error(404, "Endpoint desconhecido")
            try:
                user = store.create(self.payload())
            except sqlite3.IntegrityError:
                return self.error(409, "userName ou externalId já existe: pesquise antes de tentar novamente")
            except (ValueError, AttributeError):
                return self.error(400, "Payload SCIM inválido")
            self.send_json(201, user, {"Location": "/scim/v2/Users/" + user["id"]})

        def do_PATCH(self):
            if not self.authenticated(): return
            match = re.fullmatch(r"/scim/v2/Users/([0-9a-f-]{36})", urlsplit(self.path).path)
            if not match: return self.error(404, "Endpoint desconhecido")
            try:
                data = self.payload()
                if PATCH_SCHEMA not in data.get("schemas", []):
                    raise ValueError("Schema PatchOp ausente")
                user = store.patch(match.group(1), data)
            except (ValueError, AttributeError):
                return self.error(400, "PATCH SCIM inválido")
            return self.send_json(200, user) if user else self.error(404, "Usuário não encontrado")
    return Handler


def main():
    token = os.getenv("IAM_SCIM_TOKEN", "")
    if len(token) < 24:
        raise SystemExit("Defina IAM_SCIM_TOKEN com pelo menos 24 caracteres aleatórios. Nunca envie ao GitHub.")
    host = os.getenv("IAM_SCIM_HOST", "127.0.0.1")
    if host not in ("127.0.0.1", "::1"):
        raise SystemExit("Por segurança, só é permitido loopback. Use túnel SSH para acessar outra VM.")
    port = int(os.getenv("IAM_SCIM_PORT", "8081"))
    store = Store(os.getenv("IAM_SCIM_DB", "atlas-scim.sqlite3"))
    server = ThreadingHTTPServer((host, port), handler_factory(store, token))
    print("Servidor didático SCIM em http://%s:%s/scim/v2/Users" % (host, port))
    server.serve_forever()


if __name__ == "__main__":
    main()
