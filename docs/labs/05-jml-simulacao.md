# Laboratório — JML reproduzível — CSV e PowerShell

**Objetivo:** realizar o fluxo principal e diagnosticar uma falha com recursos gratuitos, quando possível.

## Requisitos

PowerShell 7; nenhum tenant necessário; dados fictícios. Escolha versões suportadas, reserve capacidade de CPU/RAM e mantenha serviços acessíveis somente localmente. Nunca execute em ambiente corporativo sem autorização.

## Preparação

1. Registre data, versão, dependências e topologia.
2. Use conta e dados exclusivamente fictícios.
3. Anote estado inicial, procedimento de reset e limite de custo.
4. Leia documentação oficial da **versão instalada** antes de reproduzir comandos específicos.

## Implementação guiada

Crie entrada CSV com employeeId,department,action; processe somente operações simuladas Joiner/Mover/Leaver; valide schema, gere plano de ações, registre timestamps, negue identidades repetidas e exiba resumo. Depois adapte a Microsoft Graph com revisão e permissões mínimas.

## Validação positiva

Comprove que a ação autorizada funciona. Salve a sequência executada, resposta esperada e observação real. Não inclua códigos de autorização, tokens, senhas nem dados pessoais.

## Teste negativo e diagnóstico

Injete registro duplicado, departamento inexistente e tentativa de leaver de conta privilegiada fictícia.

Investigue identidade, configuração, escopo, certificados/tokens, autorização, logs e horário; evite dar permissão administrativa apenas para contornar a falha.

## Entrega obrigatória

Script com dry-run, teste de entradas inválidas, resumo de alterações e matriz aprovação→ação→evidência. Anote causa-raiz e uma medida preventiva.

## Critérios de conclusão

- [ ] Explico os componentes sem depender de um produto específico.
- [ ] Repito a integração de maneira reproduzível.
- [ ] Demonstro falha, investigação e correção.
- [ ] Reestabeleço estado seguro e limpo recursos temporários.
- [ ] Entrego evidências sanitizadas.

[Voltar ao currículo](../curriculo.md)
