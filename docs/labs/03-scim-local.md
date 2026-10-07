# Laboratório — Provisionamento SCIM 2.0 — API de laboratório

**Objetivo:** realizar o fluxo principal e diagnosticar uma falha com recursos gratuitos, quando possível.

## Requisitos

Um servidor de teste SCIM que aceite Users/Groups; curl ou cliente HTTP. Escolha versões suportadas, reserve capacidade de CPU/RAM e mantenha serviços acessíveis somente localmente. Nunca execute em ambiente corporativo sem autorização.

## Preparação

1. Registre data, versão, dependências e topologia.
2. Use conta e dados exclusivamente fictícios.
3. Anote estado inicial, procedimento de reset e limite de custo.
4. Leia documentação oficial da **versão instalada** antes de reproduzir comandos específicos.

## Implementação guiada

Configure endpoint local com autenticação fictícia; leia o schema /Schemas e GET /Users; crie usuário via POST /Users com userName e active; altere active via PATCH e consulte o resultado. Se o servidor escolhido não suportar PATCH, documente a limitação e execute PUT.

## Validação positiva

Comprove que a ação autorizada funciona. Salve a sequência executada, resposta esperada e observação real. Não inclua códigos de autorização, tokens, senhas nem dados pessoais.

## Teste negativo e diagnóstico

Envie payload sem userName ou atributo não suportado; compare status HTTP e objeto de erro SCIM.

Investigue identidade, configuração, escopo, certificados/tokens, autorização, logs e horário; evite dar permissão administrativa apenas para contornar a falha.

## Entrega obrigatória

Tabela GET/POST/PATCH, request/response sanitizados, teste de idempotência e desativação. Anote causa-raiz e uma medida preventiva.

## Critérios de conclusão

- [ ] Explico os componentes sem depender de um produto específico.
- [ ] Repito a integração de maneira reproduzível.
- [ ] Demonstro falha, investigação e correção.
- [ ] Reestabeleço estado seguro e limpo recursos temporários.
- [ ] Entrego evidências sanitizadas.

[Voltar ao currículo](../curriculo.md)
