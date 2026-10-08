# Exemplos executáveis de IAM Engineering

## Simulação JML offline (sem custo nem Microsoft)

Requer Python 3.10+. Não acessa rede, AD, Entra ou Azure; produz apenas plano em JSON.

```bash
python scripts/jml_dry_run.py scripts/dados-exemplo.csv
python -m unittest discover -s scripts -p "test_*.py" -v
```

**Comportamento:** Joiner → proposta de criar, Mover → proposta de revisar/mudar, Leaver → proposta de desabilitar/revogar. Identidade duplicada, campo inválido e leaver de conta privilegiada provocam erro sem alteração externa.

**Próxima evolução:** conectores para AD e Microsoft Graph, depois de revisão de permissões, aprovações, idempotência, segregação de funções, logs e rollback. **Nunca** transforme o simulador diretamente em executor de mudanças em um tenant real.

## Laboratórios locais adicionais

- **PIM JIT:** `python scripts/pim_simulator.py` (sem conceder privilégio real).
- **SCIM HTTP local:** `python scripts/scim_mock.py` (API didática na porta localhost 8787; sem autenticação, não expor).
- **IGA / SoD:** `python scripts/sod_check.py scripts/sod-exemplo.csv` (código de retorno 1 se houver conflito).
- **Testes:** `python -m unittest discover -s scripts -p 'test_*.py' -v`.

Todos usam dados fictícios e não alteram identidades reais.
