# Laboratório — Microsoft Graph — consultas delegadas e diagnóstico

**Objetivo:** realizar o fluxo principal e diagnosticar uma falha com recursos gratuitos, quando possível.

## Requisitos

PowerShell 7 recomendado; Microsoft.Graph; conta de laboratório com permissão apropriada. Escolha versões suportadas, reserve capacidade de CPU/RAM e mantenha serviços acessíveis somente localmente. Nunca execute em ambiente corporativo sem autorização.

## Preparação

1. Registre data, versão, dependências e topologia.
2. Use conta e dados exclusivamente fictícios.
3. Anote estado inicial, procedimento de reset e limite de custo.
4. Leia documentação oficial da **versão instalada** antes de reproduzir comandos específicos.

## Implementação guiada

Instale Microsoft.Graph no escopo CurrentUser; Connect-MgGraph -Scopes User.Read; Get-MgContext; Get-MgUser -UserId 'me' pode exigir API específica: use Get-MgUser -UserId (Get-MgContext).Account quando suportado e documente a limitação; use Get-MgUser -Top 1 apenas se possuir User.Read.All licenciado/autorizado.

## Validação positiva

Comprove que a ação autorizada funciona. Salve a sequência executada, resposta esperada e observação real. Não inclua códigos de autorização, tokens, senhas nem dados pessoais.

## Teste negativo e diagnóstico

Solicite consulta sem escopo suficiente e registre erro, sem elevar privilégio automaticamente.

Investigue identidade, configuração, escopo, certificados/tokens, autorização, logs e horário; evite dar permissão administrativa apenas para contornar a falha.

## Entrega obrigatória

Lista de escopos, consulta executada, sanitização de saída e Disconnect-MgGraph. Anote causa-raiz e uma medida preventiva.

## Critérios de conclusão

- [ ] Explico os componentes sem depender de um produto específico.
- [ ] Repito a integração de maneira reproduzível.
- [ ] Demonstro falha, investigação e correção.
- [ ] Reestabeleço estado seguro e limpo recursos temporários.
- [ ] Entrego evidências sanitizadas.

[Voltar ao currículo](../curriculo.md)
