# Laboratório 03 — SCIM: entenda o ciclo antes da automação

**Não comece instalando ferramentas aleatórias.** Primeiro faça o [laboratório 09 — SCIM em localhost](09-scim-mock.md), que contém comandos para instalar/iniciar um servidor didático, criar usuário, consultar, desativar e testar erros 400/404/409.

## O que é praticado

1. Subir a API SCIM didática em `127.0.0.1:8787`.
2. Criar um usuário via `POST /Users`, comprovar `201`.
3. Consultar `GET /Users` e comprovar que o objeto existe.
4. Desativar com `PATCH /Users/{id}` e confirmar `active=false`.
5. Testar duplicidade, recurso ausente e requisição inválida.
6. Encerrar o serviço e descartar os dados em memória.

**Limite importante:** o mock ensina *fluxo* SCIM por HTTP, mas não fornece autenticação, grupos, paginação ou conformidade SCIM integral. A integração posterior com um IdP real exige configuração adicional.

[Ir para o procedimento completo e executável](09-scim-mock.md)
