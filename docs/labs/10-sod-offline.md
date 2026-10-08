# Laboratório 10 — SoD: detectar acesso incompatível no terminal

**Objetivo:** detectar e corrigir conflito de segregação de funções com um CSV fictício. **Zero custo, Python 3.10+.**

## Por que existe

Um usuário que **cria** e **aprova** o mesmo pagamento pode contornar uma revisão. O controle de SoD separa funções incompatíveis. Uma detecção não revoga acesso automaticamente: a decisão precisa de dono e evidência.

## Execute

Na raiz do repositório:

```bash
python scripts/sod_check.py scripts/sod-exemplo.csv
```

**Resultado esperado:** lista contendo `lab-ana`, conflito `criar_pagamento` + `aprovar_pagamento` e `count=1`. O programa encerra com código **1** quando detecta conflito, apropriado para bloquear pipeline de validação.

## Corrija

Copie o arquivo para `sod-corrigido.csv` (fora da pasta scripts). Remova somente o entitlement excessivo de `lab-ana`, após simular aprovação do responsável. Execute novamente usando o novo caminho. O resultado deve ter `count=0` e código de saída 0.

## Teste negativo

Crie duas linhas com *usuários diferentes*, um com `criar_pagamento` e outro com `aprovar_pagamento`: isso **não** é conflito SoD do mesmo usuário. Apague a coluna `identity` na cópia e observe falha de validação.

## Evidências e fixação

Registre tabela antes/depois, conflito detectado, responsável hipotético, decisão e execução de revogação (na planilha somente). Teste a regra alternativa `criar_fornecedor` + `aprovar_fornecedor`.

**Limitação:** é um mecanismo didático baseado em pares fixos de entitlements; IGA real também considera roles herdadas, contexto, exceções e histórico.

[Aula de IGA](../modulos/13-iga.md)
