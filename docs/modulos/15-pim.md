# 15 — PIM: privilégio só quando necessário

**Fase 4 — Governança e privilégios** · **Objetivo:** entender cada conceito e, em seguida, praticá-lo.

> **Regra do curso:** faça no AD ou Entra autorizado quando possível. Operações que exigem licença, aplicativo ou instalação extra só são executadas se já houver o recurso de laboratório. Observação, simulação e implementação real são atividades distintas.

## 1. Papel permanente x elegível

**O que é?** Atribuição Active pode manter privilégios imediatamente; Eligible permite solicitar ativação por período limitado.

**Prática — faça agora:**

No tenant **de laboratório e licenciado** → Entra ID → Identity governance → Privileged Identity Management → Microsoft Entra roles → My roles/Assignments. Identifique uma função **de teste** e seu estado sem alterar ninguém. Caso indisponível, estude a política na [aula detalhada anterior](../modulos/15-pim.md) como análise.

**O que você acabou de fazer?** Você diferenciou acesso permanente de capacidade de solicitar acesso.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Reduz privilégio permanente.

**Pontos negativos / riscos:** Elegibilidade não elimina risco de conta comprometida.

**Fixação:** Usuário Eligible já pode executar ações administrativas?

## 2. Ativação JIT

**O que é?** É exercer papel temporariamente, com duração, justificativa e controles configurados.

**Prática — faça agora:**

Se houver função de teste elegível e autorização, abra **My roles → Activate**, informe motivo fictício `LAB-1042`, duração permitida e complete MFA/aprovação configurados. Confira a função Active e evento de auditoria. **Não altere Global Administrator ou conta de emergência.**

**O que você acabou de fazer?** Você executou elevação temporária autorizada (quando recurso disponível).

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Menor janela de exposição.

**Pontos negativos / riscos:** Durante a ativação há risco residual e atrasos na concessão.

**Fixação:** O que registrar como prova da ativação sem divulgar dados sensíveis?

## 3. Expiração e auditoria

**O que é?** Acesso deve terminar na janela prevista e deixar rastro de revisão.

**Prática — faça agora:**

Use o histórico de auditoria do PIM de teste. Aguarde expiração ou desative função conforme a interface; confira estado final. **Sem licença**, execute [Lab 08 — simulador PIM](../labs/08-pim-simulador.md) e identifique-o como simulação.

**O que você acabou de fazer?** Você observou a duração efetiva ou executou simulação declarada.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Permite auditoria de elevações.

**Pontos negativos / riscos:** Logs incompletos e aprovações erradas fragilizam o controle.

**Fixação:** Por que PIM não substitui política de menor privilégio?


## Desafio de fixação

Escolha um **segundo usuário ou aplicativo de laboratório** e repita o processo **sem consultar os passos**. Registre o que realmente executou, qual resultado observou e qual limitação encontrou. Nunca compartilhe tokens ou senhas.

[Trilha por fases](../curriculo.md)
