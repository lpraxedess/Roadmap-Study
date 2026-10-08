# Laboratório 09 — SCIM real em localhost (API educativa)

**Objetivo:** criar, consultar e desativar identidade por HTTP, testar conflitos e observar o ciclo de vida. **Custo: zero.** Requer Python 3.10+. **Não há autenticação e o servidor NÃO é implementação SCIM completa.** Use somente no computador local.

## Entender em 30 segundos

SCIM padroniza o provisionamento e a manutenção de objetos de identidade. **SSO faz autenticação; SCIM gerencia o cadastro de contas.** Nesta prática, o sistema de RH fictício pede a criação e o desligamento de Alice.

## Executar

1. Abra um terminal na raiz do Roadmap-Study.
2. Inicie o servidor: `python scripts/scim_mock.py`. Ele escuta apenas `127.0.0.1:8787`.
3. Em **outro terminal**, faça os pedidos:

```bash
curl -i http://127.0.0.1:8787/Users
curl -i -X POST http://127.0.0.1:8787/Users -H "Content-Type: application/scim+json" -d '{"schemas":["urn:ietf:params:scim:schemas:core:2.0:User"],"userName":"alice.lab","active":true}'
curl -i http://127.0.0.1:8787/Users
curl -i -X PATCH http://127.0.0.1:8787/Users/1 -H "Content-Type: application/scim+json" -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"replace","path":"active","value":false}]}'
curl -i http://127.0.0.1:8787/Users/1
```

**Resultados esperados:** lista vazia (200), criação (201) com `id=1`, lista com Alice (200), alteração (200), Alice com `active=false` (200). Isso ilustra desprovisionamento lógico.

**Windows PowerShell:** `curl` pode ser alias; use `curl.exe` no terminal para enviar exatamente o payload dos exemplos.

## Faça falhar para aprender

- Envie o mesmo POST duas vezes: segunda tentativa deve retornar **409** (duplicidade).
- Tente criar objeto sem `userName`: deve retornar **400**.
- Faça PATCH com `path=department`: deve retornar **400** (servidor de laboratório suporta apenas `active`).
- Faça GET em `/Users/999`: deve retornar **404**.

## Diagnosticar

Compare status HTTP e corpo JSON: **400** campo/requisição inválida; **404** recurso ausente; **409** conflito de unicidade. Não corrija uma falha de provisionamento concedendo acesso privilegiado.

## Limpeza e desafio

Finalize o servidor com `Ctrl+C`; os dados em memória são descartados. Sem olhar, repita o fluxo com `bob.lab` e documente 201 → 200 → desativação.

**Limites:** não implementa autorização, HTTPS, filtros/paginação, PATCH completo, grupos, ETAGs, provedores externos ou persistência. Nunca exponha a Internet.

[Aula de SCIM](../modulos/09-scim.md)
