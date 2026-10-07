# Laboratório 07 — Joiner–Mover–Leaver sem licenças adicionais

Este laboratório demonstra o processo de IAM operacional com dados fictícios e script Python **totalmente offline**.

## Fundamento

O ciclo **Joiner** trata entrada e acesso mínimo por função; **Mover** exige revisar direitos antigos e novos; **Leaver** exige desabilitar credenciais, revogar sessões, acessos e identidades não humanas relacionadas. Operações automatizadas requerem aprovação, logs e política de recuperação.

## Execução

Clone o Roadmap-Study e, na raiz:

```bash
python scripts/jml_dry_run.py scripts/dados-exemplo.csv
```

O script deve produzir JSON com três operações DRY_RUN_ONLY. Ele **não cria, altera nem apaga usuários reais**.

Rode os testes:

```bash
python -m unittest discover -s scripts -p "test_*.py" -v
```

## Testes de falha

1. Duplique um employeeId no CSV e confirme erro.
2. Altere uma action para `grant_admin` e confirme rejeição.
3. Marque departamento `breakglass` com `leaver`: exige revisão manual.
4. Reponha o CSV original.

## Explique

- Por que desabilitar não substitui revogar sessões e tokens?
- Como detectar privilégios antigos após a movimentação?
- Onde ficam os approvals e logs de quem solicitou, revisou e executou a mudança?
- Como tornar execução idempotente e reversível?

## Aprovação

Produza um fluxograma de JML, log JSON **fictício**, evidência dos quatro testes, justificativa de menor privilégio e backlog de integração futura com Microsoft Graph.

[Guia do aluno](../guia-do-aluno.md)
