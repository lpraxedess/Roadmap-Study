#!/usr/bin/env python3
"""Servidor didático SCIM reduzido: somente localhost, dados em memória.
NÃO implementa SCIM completo, autenticação ou armazenamento persistente.
"""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
from urllib.parse import urlparse

USERS = {}
SEQUENCE = 0
SCIM = "urn:ietf:params:scim:schemas:core:2.0:User"
PATCH = "urn:ietf:params:scim:api:messages:2.0:PatchOp"

class Handler(BaseHTTPRequestHandler):
    def send_json(self, code, data):
        payload=json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/scim+json; charset=utf-8")
        self.send_header("Content-Length",str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def read_json(self):
        size=int(self.headers.get("Content-Length","0"))
        if size<1 or size>16384: raise ValueError("invalid body size")
        return json.loads(self.rfile.read(size))

    def do_GET(self):
        path=urlparse(self.path).path
        if path=="/Users":
            return self.send_json(200,{"totalResults":len(USERS),"Resources":list(USERS.values()),"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"]})
        if path.startswith("/Users/"):
            u=USERS.get(path.split("/")[-1])
            return self.send_json(200,u) if u else self.send_json(404,{"detail":"not found"})
        return self.send_json(404,{"detail":"not found"})

    def do_POST(self):
        global SEQUENCE
        if urlparse(self.path).path!="/Users":
            return self.send_json(404,{"detail":"not found"})
        try:
            doc=self.read_json()
            name=doc.get("userName")
            if not isinstance(name,str) or not name.strip(): raise ValueError("userName required")
            if any(u["userName"]==name for u in USERS.values()):
                return self.send_json(409,{"detail":"userName already exists"})
            SEQUENCE+=1
            u={"schemas":[SCIM],"id":str(SEQUENCE),"userName":name,"active":bool(doc.get("active",True))}
            USERS[u["id"]]=u
            return self.send_json(201,u)
        except (ValueError,TypeError,json.JSONDecodeError) as exc:
            return self.send_json(400,{"detail":str(exc)})

    def do_PATCH(self):
        path=urlparse(self.path).path
        if not path.startswith("/Users/"): return self.send_json(404,{"detail":"not found"})
        uid=path.split("/")[-1]
        if uid not in USERS:return self.send_json(404,{"detail":"not found"})
        try:
            doc=self.read_json()
            if PATCH not in doc.get("schemas",[]): raise ValueError("PatchOp schema required")
            for op in doc.get("Operations",[]):
                if op.get("op","").lower()!="replace" or op.get("path")!="active" or not isinstance(op.get("value"),bool):
                    raise ValueError("only replace active with boolean supported")
                USERS[uid]["active"]=op["value"]
            return self.send_json(200,USERS[uid])
        except (ValueError,TypeError,json.JSONDecodeError) as exc:
            return self.send_json(400,{"detail":str(exc)})

if __name__=="__main__":
    print("SCIM mock educativo em http://127.0.0.1:8787; sem autenticação. Ctrl+C para sair.")
    ThreadingHTTPServer(("127.0.0.1",8787),Handler).serve_forever()
