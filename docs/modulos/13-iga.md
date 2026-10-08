# 13 — IGA: governar quem pode acessar o quê

**Fase 4 — Governança e privilégios** · **Objetivo:** entender cada conceito e, em seguida, praticá-lo.

> **Regra do curso:** faça no AD ou Entra autorizado quando possível. Operações que exigem licença, aplicativo ou instalação extra só são executadas se já houver o recurso de laboratório. Observação, simulação e implementação real são atividades distintas.

## 1. Entitlement

**O que é?** É direito específico sobre sistema/recurso; alguém deve ser responsável por aprová-lo.

**Prática — faça agora:**

No Entra de teste, abra grupo de segurança de laboratório e liste seus membros. Anote em tabela: nome do grupo, finalidade, sistema que o utiliza (se houver) e **owner**. Não invente sistema vinculado.

**O que você acabou de fazer?** Você iniciou um catálogo verificável de acessos.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Aprovações passam a ter responsável e justificativa.

**Pontos negativos / riscos:** Grupos sem owner acumulam acesso indefinidamente.

**Fixação:** Quem decide se João ainda precisa do grupo Financeiro?

## 2. Segregação de funções (SoD)

**O que é?** Impede que a mesma pessoa concentre atos incompatíveis, como criar e aprovar pagamento.

**Prática — faça agora:**

Use dois grupos fictícios no Entra, `Criar-Pagamento-LAB` e `Aprovar-Pagamento-LAB`, caso autorizados; compare membros e identifique intersecções **sem atribuir roles reais**. Ou rode [Lab 10 — SoD offline](../labs/10-sod-offline.md).

**O que você acabou de fazer?** Você detectou conflito potencial; não revogou autorização de um sistema bancário real.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Reduz possibilidade de fraude por acúmulo de funções.

**Pontos negativos / riscos:** Conflito depende do contexto do sistema e exceções aprovadas.

**Fixação:** Uma conta nos dois grupos é aceitável sem revisão?

## 3. Aprovação

**O que é?** É decisão explícita de dono ou gestor antes de conceder acesso relevante.

**Prática — faça agora:**

Simule uma solicitação de João para `Aprovar-Pagamento-LAB`. Registre solicitante, motivo, dono, decisão e validade; **só altere o grupo de lab** depois de autorização no próprio exercício.

**O que você acabou de fazer?** Você separou pedido, decisão e implementação.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Melhora auditoria.

**Pontos negativos / riscos:** Aprovação automática sem contexto pode virar formalidade.

**Fixação:** Qual evidência prova que a concessão foi autorizada?


## Desafio de fixação

Escolha um **segundo usuário ou aplicativo de laboratório** e repita o processo **sem consultar os passos**. Registre o que realmente executou, qual resultado observou e qual limitação encontrou. Nunca compartilhe tokens ou senhas.

[Trilha por fases](../curriculo.md)
