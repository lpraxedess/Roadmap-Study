# Laboratório 08 — Simulador local de PIM: JIT, duração e auditoria

**Objetivo:** observar na prática uma política de privilégio temporário sem licença, cloud ou alteração real de permissões.

**Tempo:** 45–75 minutos. **Custo:** zero. **Requisitos:** Python 3.10+ e terminal. **Segurança:** o script não acessa rede nem modifica permissões do sistema.

## 1. Preparação

Na raiz do repositório:

```bash
python --version
python scripts/pim_simulator.py
```

No Windows, se `python` não estiver no PATH, use `py -3 scripts/pim_simulator.py`.

## 2. O que observar

O script cria um usuário fictício elegível, rejeita uma ativação sem justificativa, rejeita duração acima do limite, permite uma ativação de 30 minutos, valida acesso durante a janela e demonstra a expiração com um relógio de laboratório controlado. Os eventos JSON são impressos no terminal.

**Resultado esperado:** três decisões negadas (justificativa ausente, duração excessiva e acesso depois da expiração), mais ativação e autorização válidas. A expiração é simulada; não espere 30 minutos reais.

## 3. Testes automatizados

```bash
python -m unittest discover -s scripts -p 'test_*.py' -v
```

Os testes verificam justificativa obrigatória, limite de duração, impossibilidade de ativar sem elegibilidade e expiração.

## 4. Investigar e corrigir

- **Sem justificativa:** o evento `activation_denied` deve indicar `justification_required`. Corrija adicionando um ticket fictício.
- **Duração acima do limite:** `duration_exceeds_policy`. Solicite duração menor; não aumente o limite para mascarar o problema.
- **Não elegível:** `not_eligible`. Exige concessão de elegibilidade por um responsável, não elevação automática.
- **Expirado:** `authorization_denied` com `not_active`. Uma nova ativação é necessária.

## 5. Evidências

Registre a política (30 minutos), os eventos JSON, uma tabela de resultados previstos/observados e explique a diferença entre a **simulação** e a atribuição real de uma função no Entra.

## 6. Critérios de aprovação

- [ ] Sei diferenciar `eligible`, `active` e `expired`.
- [ ] Executo o script e os testes sem editar código.
- [ ] Explico por que cada negação ocorreu.
- [ ] Consigo modificar a duração solicitada e prever o resultado.
- [ ] Reconheço que esta simulação não aplica RBAC, MFA ou aprovação real.

[Estudar o conceito e a implementação Microsoft](../modulos/15-pim.md)
