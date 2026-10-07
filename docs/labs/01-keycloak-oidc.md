# Laboratório 01 — SSO OIDC com Keycloak

**Objetivo:** compreender e observar Authorization Code Flow com PKCE, tokens, sessão, roles e erros de configuração sem depender de Entra ID P2.

**Duração estimada:** 2–4 horas. **Licença:** open source. **Pré-requisitos:** Docker e navegador. **Portas locais:** 8080. Não expor o serviço à internet.

## 1. Conceitos

- **IdP / OpenID Provider:** autentica o usuário e emite tokens.
- **Relying Party / Cliente:** aplicação que solicita autenticação.
- **Authorization Code:** código temporário trocado por tokens pelo cliente.
- **PKCE:** vincula a troca do código ao cliente que iniciou o fluxo.
- **ID Token:** afirmações de autenticação; não é token de autorização para APIs.
- **Access Token:** credencial para acessar recurso protegido conforme público/escopos.
- **Redirect URI:** endereço previamente permitido para retorno do navegador.

## 2. Preparar

Use uma senha de laboratório não reutilizada. O exemplo usa Keycloak 26.0.7 como **referência de versão**, não como recomendação de produção. Confira notas de segurança e atualize a versão antes de expor qualquer serviço.

```bash
docker run --name iam-keycloak-lab --rm \
  -p 127.0.0.1:8080:8080 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD='Troque-Esta-Senha-Local-123!' \
  quay.io/keycloak/keycloak:26.0.7 start-dev
```

Abra `http://localhost:8080/admin/`. O modo `start-dev` **não é apropriado para produção**. Se a imagem não estiver disponível, escolha uma versão suportada, documente-a e ajuste a configuração.

## 3. Criar o ambiente

1. No console administrativo, crie o realm `iam-lab`.
2. Crie o usuário `alice` com e-mail fictício e senha temporária.
3. Crie um cliente OIDC `iam-web-lab` do tipo **public client** para experimentar um cliente de navegador.
4. Ative **Standard Flow** e PKCE `S256` quando a interface disponibilizar essa opção.
5. Configure **Valid Redirect URIs** como `http://127.0.0.1:8765/callback`. Use somente essa URL para o teste.
6. Em outra janela de terminal, inicie um receptor HTTP local simples para observar a chamada de retorno. **Atenção:** um receptor HTTP simples não troca o código por tokens; a etapa completa abaixo usa requisições manuais.

## 4. Testar o protocolo de ponta a ponta

Use Python 3 para gerar `code_verifier` e `code_challenge`:

```python
import base64, hashlib, secrets
verifier = secrets.token_urlsafe(64)
challenge = base64.urlsafe_b64encode(
    hashlib.sha256(verifier.encode()).digest()
).decode().rstrip("=")
print("code_verifier:", verifier)
print("code_challenge:", challenge)
```

No navegador, abra a URL abaixo substituindo `SEU_CHALLENGE` pelo valor gerado:

```text
http://localhost:8080/realms/iam-lab/protocol/openid-connect/auth?client_id=iam-web-lab&response_type=code&scope=openid&redirect_uri=http%3A%2F%2F127.0.0.1%3A8765%2Fcallback&code_challenge_method=S256&code_challenge=SEU_CHALLENGE&state=teste123
```

Autentique como `alice`. O navegador tentará redirecionar para `127.0.0.1:8765`; se não houver servidor nessa porta, a página pode falhar, **mas a URL de destino ainda conterá o parâmetro `code`**. Copie somente o valor de `code` para uso local; não publique esse código.

Troque o código por tokens usando o mesmo `code_verifier`:

```bash
curl -sS -X POST http://localhost:8080/realms/iam-lab/protocol/openid-connect/token \
  -d grant_type=authorization_code \
  -d client_id=iam-web-lab \
  -d redirect_uri=http://127.0.0.1:8765/callback \
  -d code='COLE_CODIGO_AQUI' \
  -d code_verifier='COLE_VERIFIER_AQUI'
```

**Resultado esperado:** resposta JSON com `access_token`, `id_token`, `expires_in` e outros campos, dependendo das configurações. Tokens são segredos: **não cole a resposta em issues, commits ou capturas**. O código expira rapidamente e só pode ser utilizado uma vez.

## 5. Testes negativos

- Repita a troca com `code_verifier` incorreto: a troca deve falhar.
- Altere a `redirect_uri` para um valor não autorizado: o fluxo deve ser rejeitado.
- Tente reutilizar um código já consumido: a troca deve falhar.

Anote códigos HTTP, mensagens sanitizadas e o que cada controle protege. Verifique eventos do realm no console administrativo e logs do contêiner (`docker logs iam-keycloak-lab`).

## 6. Diagnóstico

Se a autenticação falhar, verifique: realm, client ID, tipo de cliente, Standard Flow, redirect URI, método PKCE, expiração do código e consistência do verifier. Compare os parâmetros enviados com a configuração real.

## 7. Critério de aprovação

- [ ] Explico IdP, cliente, Authorization Code, PKCE, ID Token e Access Token.
- [ ] Consigo autenticar e trocar o código por tokens.
- [ ] Demonstro três falhas controladas e explico suas causas.
- [ ] Refaço a integração sem seguir o roteiro.
- [ ] Registro evidências **sem tokens ou senhas**.

## 8. Limpeza

Interrompa o contêiner com `Ctrl+C`. Como foi iniciado com `--rm` e sem volume persistente, os dados de laboratório serão descartados. Nunca use esse comando contra um ambiente que contenha dados que precisam ser preservados.

## Próximos laboratórios

SAML 2.0 com Keycloak; integração de aplicativo; SCIM; Microsoft Entra como IdP alternativo; automatização com Microsoft Graph.
