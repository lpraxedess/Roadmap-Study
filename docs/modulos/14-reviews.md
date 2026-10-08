# 14 — Access Reviews: revisar e revogar acessos

**Fase 4 — Governança e privilégios** · **Objetivo:** entender cada conceito e, em seguida, praticá-lo.

> **Regra do curso:** faça no AD ou Entra autorizado quando possível. Operações que exigem licença, aplicativo ou instalação extra só são executadas se já houver o recurso de laboratório. Observação, simulação e implementação real são atividades distintas.

## 1. Recertificação

**O que é?** É verificar periodicamente se alguém ainda precisa de um grupo ou aplicativo.

**Prática — faça agora:**

Em Entra → Groups → grupo **fictício** JML-Financeiro → Members, anote uma lista de três usuários de lab e o owner. Faça tabela `identidade, grupo, manter/revogar, motivo`.

**O que você acabou de fazer?** Você preparou base para revisão e não apenas um inventário.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Reduz acesso órfão.

**Pontos negativos / riscos:** Revisões sem remediação não corrigem risco.

**Fixação:** O que fazer com decisão de revogar que ainda não foi executada?

## 2. Revisão real no Entra

**O que é?** É campanha, geralmente sujeita a requisitos de licença/role, que coleta decisões e pode executar remediação.

**Prática — faça agora:**

Se o seu tenant **tem o recurso habilitado e licenciado**, entre em Entra ID → Identity governance → Access reviews; explore revisões **de teste** ou crie campanha apenas com autorização. Se indisponível, use a planilha anterior e registre que foi simulação.

**O que você acabou de fazer?** Você verificou a diferença entre campanha governada e revisão manual.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Padroniza responsáveis, prazo e auditoria.

**Pontos negativos / riscos:** Recursos podem exigir licenciamento Governance ou Entra adequado.

**Fixação:** Qual o risco de marcar a campanha como encerrada sem conferir revogações?

## 3. Remediação

**O que é?** É aplicar a decisão tomada e verificar estado final.

**Prática — faça agora:**

Para o grupo de teste, escolha um usuário fictício com decisão Revogar. Entra → Groups → Members → Remove member. Compare lista antes/depois e registre data.

**O que você acabou de fazer?** Você **removeu membership efetivamente**, não apenas registrou opinião.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Fecha o ciclo de governança.

**Pontos negativos / riscos:** Remoção errada pode bloquear trabalho de usuário legítimo.

**Fixação:** Qual é a evidência final de recertificação bem-sucedida?


## Desafio de fixação

Escolha um **segundo usuário ou aplicativo de laboratório** e repita o processo **sem consultar os passos**. Registre o que realmente executou, qual resultado observou e qual limitação encontrou. Nunca compartilhe tokens ou senhas.

[Trilha por fases](../curriculo.md)
