# Laboratório — SAML 2.0 — Keycloak e SP de teste

**Objetivo:** realizar o fluxo principal e diagnosticar uma falha com recursos gratuitos, quando possível.

## Requisitos

Keycloak local; SP SAML compatível instalado em contêiner ou VM; navegador. Escolha versões suportadas, reserve capacidade de CPU/RAM e mantenha serviços acessíveis somente localmente. Nunca execute em ambiente corporativo sem autorização.

## Preparação

1. Registre data, versão, dependências e topologia.
2. Use conta e dados exclusivamente fictícios.
3. Anote estado inicial, procedimento de reset e limite de custo.
4. Leia documentação oficial da **versão instalada** antes de reproduzir comandos específicos.

## Implementação guiada

Crie realm iam-lab; no Keycloak crie cliente SAML com Client ID igual ao EntityID fornecido pelo SP; configure ACS exatamente conforme SP, valide assinaturas e importe metadata do IdP no SP. Faça login fictício e observe assertion via extensão SAML-tracer ou logs do SP; remova atributos pessoais.

## Validação positiva

Comprove que a ação autorizada funciona. Salve a sequência executada, resposta esperada e observação real. Não inclua códigos de autorização, tokens, senhas nem dados pessoais.

## Teste negativo e diagnóstico

Altere a ACS no cliente ou SP para valor fictício e documente a rejeição. Volte ao valor original.

Investigue identidade, configuração, escopo, certificados/tokens, autorização, logs e horário; evite dar permissão administrativa apenas para contornar a falha.

## Entrega obrigatória

Fluxo SP→IdP→SP, EntityID, ACS, NameID, certificado público, horários e resposta do teste sem dados sensíveis. Anote causa-raiz e uma medida preventiva.

## Critérios de conclusão

- [ ] Explico os componentes sem depender de um produto específico.
- [ ] Repito a integração de maneira reproduzível.
- [ ] Demonstro falha, investigação e correção.
- [ ] Reestabeleço estado seguro e limpo recursos temporários.
- [ ] Entrego evidências sanitizadas.

[Voltar ao currículo](../curriculo.md)
