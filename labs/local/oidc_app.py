#!/usr/bin/env python3
"""Portal-RH OIDC para laboratório. Authlib valida ID token via metadata/JWKS.
A claim roles precisa ser mapeada no ID token Keycloak; sem role há negação.
Não usar em produção: HTTP apenas em localhost e identidades sintéticas.
"""
import os
from flask import Flask, redirect, render_template_string, session, url_for
from authlib.integrations.flask_client import OAuth

secret = os.getenv("IAM_OIDC_SESSION_SECRET", "")
if len(secret) < 32:
    raise SystemExit("Defina IAM_OIDC_SESSION_SECRET de >=32 caracteres aleatórios")
realm = os.getenv("IAM_KEYCLOAK_REALM", "http://127.0.0.1:8080/realms/atlascorp-lab")
client_secret = os.getenv("IAM_OIDC_CLIENT_SECRET", "")
if not client_secret:
    raise SystemExit("Defina IAM_OIDC_CLIENT_SECRET do cliente Keycloak")

app = Flask(__name__)
app.config.update(SECRET_KEY=secret, SESSION_COOKIE_HTTPONLY=True, SESSION_COOKIE_SAMESITE="Lax",
                  SESSION_COOKIE_SECURE=False)  # HTTP: localhost apenas.
oauth = OAuth(app)
oidc = oauth.register(
    name="atlas", client_id=os.getenv("IAM_OIDC_CLIENT_ID", "atlascorp-portal"),
    client_secret=client_secret,
    server_metadata_url=realm.rstrip("/") + "/.well-known/openid-configuration",
    client_kwargs={"scope": "openid profile email", "code_challenge_method": "S256"},
)

HTML = """<!doctype html><html lang="pt-BR"><meta charset="utf-8">
<title>AtlasCorp IAM · Portal-RH</title><h1>Portal-RH AtlasCorp</h1>
<p>Login não concede direitos financeiros. Teste OIDC local, sem dados reais.</p>
<p>Usuário: {{user}} · Roles: {{roles}}</p><a href="/login">Entrar via Keycloak</a>
<a href="/rh">RH</a> <a href="/financeiro">Financeiro</a> <a href="/logout">Sair</a></html>"""


@app.get("/")
def index():
    return render_template_string(HTML, user=session.get("subject", "anônimo"),
                                  roles=", ".join(session.get("roles", [])))


@app.get("/login")
def login():
    return oidc.authorize_redirect(url_for("callback", _external=True),
                                   code_challenge_method="S256")


@app.get("/callback")
def callback():
    # authorize_access_token valida ID token, issuer, audience, exp e nonce via Authlib.
    token = oidc.authorize_access_token()
    info = token.get("userinfo") or {}
    subject = info.get("sub")
    if not subject:
        session.clear()
        return "ID token inválido: sub ausente", 401
    roles = info.get("roles", [])
    if not isinstance(roles, list) or any(not isinstance(role, str) for role in roles):
        roles = []
    session.clear()
    session.update(subject=subject, roles=roles)
    return redirect(url_for("index"))


@app.get("/rh")
def rh():
    return ("RH: somente leitura autorizada", 200) if "rh-leitor" in session.get("roles", []) else ("Acesso negado: falta rh-leitor", 403)


@app.get("/financeiro")
def financeiro():
    return ("Financeiro: aprovação fictícia autorizada", 200) if "fin-aprovador" in session.get("roles", []) else ("Acesso negado: falta fin-aprovador", 403)


@app.get("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.getenv("IAM_OIDC_PORT", "8001")), debug=False)
