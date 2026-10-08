# Laboratório 05 — JML manual de ponta a ponta no Keycloak

**Tipo:** operações reais de identidade no Keycloak do laboratório; **não é simulação CSV**.

**Tempo:** 90–150 minutos · **Custo:** gratuito · **Ambiente:** Docker + Keycloak local.

Este laboratório faz parte da [aula 05 — Joiner, Mover e Leaver](../modulos/05-jml.md), que já contém os passos detalhados, comandos, caminhos do painel e resultados esperados. Siga a aula na ordem, sem pular a validação de cada etapa.

## Ordem prática

1. Iniciar contêiner Keycloak e criar o realm `iam-lab`.
2. Criar grupos `Financeiro` e `TI`.
3. **Joiner:** criar `joao.lab`, definir senha de laboratório, atribuir grupo Financeiro e testar login.
4. **Mover:** retirar Financeiro, adicionar TI e confirmar a ausência de acesso antigo.
5. **Leaver:** desabilitar conta, encerrar sessões quando disponível e comprovar negação de **novo** login.
6. **Opcional:** excluir a conta fictícia somente depois de coletar evidências.
7. **Desafio:** repetir com `maria.lab`, sem instruções.

## Resultado esperado

| Etapa | Conta ativa | Grupos | Login novo |
|---|---|---|---|
| Joiner | Sim | Financeiro | Permitido |
| Mover | Sim | TI (não Financeiro) | Permitido |
| Leaver | Não | Associação pode permanecer para auditoria | Negado |
| Exclusão opcional | Conta inexistente | — | Negado |

**Importante:** grupos demonstram ciclo de associação; autorização efetiva precisa de aplicação integrada, com roles e políticas, em exercícios posteriores.

## Checkpoint e diagnóstico

Se não conseguir login após Joiner, verifique `Enabled`, senha, realm e eventos antes de continuar. Se o grupo antigo permanecer após Mover, o processo não está concluído. Se uma sessão antiga funcionar após Leaver, investigue revogação de sessões/tokens e diferencie sessão existente de novo login.

**Critério de conclusão:** apresente o estado antes/depois de cada fase e execute o desafio Maria. Sem isso, não considere o laboratório aprovado.

[Executar aula completa](../modulos/05-jml.md) · [Etapa posterior: automação em Python](07-jml-python.md)
