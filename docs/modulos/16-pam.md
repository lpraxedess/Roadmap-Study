# 16 — PAM: controlar acesso administrativo

**Fase 4 — Governança e privilégios** · **Objetivo:** entender cada conceito e, em seguida, praticá-lo.

> **Regra do curso:** faça no AD ou Entra autorizado quando possível. Operações que exigem licença, aplicativo ou instalação extra só são executadas se já houver o recurso de laboratório. Observação, simulação e implementação real são atividades distintas.

## 1. Acesso privilegiado

**O que é?** É o acesso capaz de administrar infraestrutura, sistema ou identidade.

**Prática — faça agora:**

No AD ou Entra **de laboratório**, identifique um grupo/role administrativo de teste **sem atribuir ninguém**. Liste quais operações esse acesso permitiria e o risco se ficasse permanente.

**O que você acabou de fazer?** Você inventariou privilégio antes de escolher controle.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Ajuda a restringir administração.

**Pontos negativos / riscos:** Papel amplo facilita movimento lateral após comprometimento.

**Fixação:** Qual a diferença entre conta comum e conta privilegiada?

## 2. PAM x PIM

**O que é?** PAM pode administrar sessões e credenciais privilegiadas de sistemas; PIM cuida elegibilidade/ativação em escopos suportados.

**Prática — faça agora:**

No Entra observe PIM (se disponível) e, no AD, grupos que autorizam acesso ao servidor de lab. Monte tabela `quem, qual host/sistema, método de entrada, sessão, log`. Não confunda inventário com sessão PAM gravada.

**O que você acabou de fazer?** Você comparou objeto de identidade e acesso efetivo a um host.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Ajuda a planejar controle de sessão.

**Pontos negativos / riscos:** Sem broker PAM real não há controle/recording de sessão.

**Fixação:** PIM e PAM são o mesmo produto?

## 3. Revisão e revogação

**O que é?** Revogar acesso deve ser verificável e não depender de memória humana.

**Prática — faça agora:**

Crie um **grupo de segurança fictício** `IAM-Admin-Lab` sem poderes reais, adicione um usuário fictício e remova-o; comprove member antes/depois. Para sessão PAM real, siga laboratório adicional apenas se houver solução aprovada instalada.

**O que você acabou de fazer?** Você realizou revogação de membership, **não** gravou sessão privilegiada real.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Pratica processo de concessão/revogação.

**Pontos negativos / riscos:** Grupos fictícios não são equivalentes a PAM implantado.

**Fixação:** Que provas adicionais seriam necessárias num PAM com gravação de sessão?


## Desafio de fixação

Escolha um **segundo usuário ou aplicativo de laboratório** e repita o processo **sem consultar os passos**. Registre o que realmente executou, qual resultado observou e qual limitação encontrou. Nunca compartilhe tokens ou senhas.

[Trilha por fases](../curriculo.md)
