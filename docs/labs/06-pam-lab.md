# Laboratório — Acesso privilegiado — desenho e validação

**Objetivo:** realizar o fluxo principal e diagnosticar uma falha com recursos gratuitos, quando possível.

## Requisitos

VM Linux local, Teleport Community versão suportada quando hardware permitir; alternativamente modelo de política offline. Escolha versões suportadas, reserve capacidade de CPU/RAM e mantenha serviços acessíveis somente localmente. Nunca execute em ambiente corporativo sem autorização.

## Preparação

1. Registre data, versão, dependências e topologia.
2. Use conta e dados exclusivamente fictícios.
3. Anote estado inicial, procedimento de reset e limite de custo.
4. Leia documentação oficial da **versão instalada** antes de reproduzir comandos específicos.

## Implementação guiada

Defina role de operador de leitura e role de manutenção; instale Teleport somente com documentação da versão; configure acesso a alvo Linux isolado com logs; valide conexão e revogação. Registre o que a edição Community oferece efetivamente.

## Validação positiva

Comprove que a ação autorizada funciona. Salve a sequência executada, resposta esperada e observação real. Não inclua códigos de autorização, tokens, senhas nem dados pessoais.

## Teste negativo e diagnóstico

Revogue role de manutenção e tente nova sessão; confirme negação e registro de auditoria.

Investigue identidade, configuração, escopo, certificados/tokens, autorização, logs e horário; evite dar permissão administrativa apenas para contornar a falha.

## Entrega obrigatória

Matriz role→recurso, justificativa, duração, sessões e critérios de recuperação. Anote causa-raiz e uma medida preventiva.

## Critérios de conclusão

- [ ] Explico os componentes sem depender de um produto específico.
- [ ] Repito a integração de maneira reproduzível.
- [ ] Demonstro falha, investigação e correção.
- [ ] Reestabeleço estado seguro e limpo recursos temporários.
- [ ] Entrego evidências sanitizadas.

[Voltar ao currículo](../curriculo.md)
