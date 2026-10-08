# 21 — Logs IAM: encontrar a causa do erro

**Fase 5 — Cloud e defesa** · **Objetivo:** compreender cada conceito e executar um exercício com resultado verificável.

> **Regra:** AD/Entra são as ferramentas principais. Casos que dependem de Azure, AWS, licenças ou app específico só são práticos quando você já tem o ambiente. Simulação e observação **não equivalem** a instalação real.

## 1. Sign-in logs

**O que é?** Registram tentativas de autenticação e condições avaliadas, quando a coleta está disponível.

**Prática — faça agora:**

Entra de teste → Sign-in logs → filtre conta fictícia e abra tentativa. Identifique Failure reason ou Success, aplicativo e correlation ID quando exibidos.

**O que você acabou de fazer?** Você viu evidência de login sem supor a causa.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Acelera troubleshooting.

**Pontos negativos / riscos:** Falta de log/retention pode ocultar evento.

**Fixação:** Senha errada e Conditional Access bloqueando são a mesma falha?

## 2. Audit logs

**O que é?** Registram alterações administrativas, como adicionar/remover membros de grupo.

**Prática — faça agora:**

No Entra de teste, adicione usuário fictício a grupo de lab e volte em Monitoring & health → Audit logs. Procure operação de membership pelo horário e compare ator e alvo. Se sua função não dá acesso, registre limitação.

**O que você acabou de fazer?** Você vinculou ação administrativa e evento de auditoria.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Prova quando alteração ocorreu.

**Pontos negativos / riscos:** Nem todo evento está disponível por tempo indefinido.

**Fixação:** Sign-in log prova quem modificou um grupo?

## 3. Diagnóstico por evidências

**O que é?** É chegar à causa-raiz comparando logs e configuração.

**Prática — faça agora:**

Faça uma remoção controlada do usuário **no grupo fictício**. Reabra o grupo e log de auditoria; responda por que acesso poderia permanecer até sessão/token ser atualizado. Readicione ao final, se necessário.

**O que você acabou de fazer?** Você comprovou que mudança de membership e sessão são etapas diferentes.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Evita resolver tudo com atribuição privilegiada.

**Pontos negativos / riscos:** Propagação e logs podem ter atraso.

**Fixação:** O que fazer quando o log contradiz a situação atual?


## Desafio da fase

Repita um dos exercícios em **outro objeto fictício** ou caso de teste, sem consultar o passo a passo. Explique as decisões e os limites do que realmente foi executado. Não use contas reais nem capture senhas ou tokens.

[Trilha por fases](../curriculo.md)
