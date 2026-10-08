# 25 — Arquitetura IAM: escolher controles e demonstrar decisões

**Fase 6 — Arquitetura** · **Objetivo:** compreender cada conceito e executar um exercício com resultado verificável.

> **Regra:** AD/Entra são as ferramentas principais. Casos que dependem de Azure, AWS, licenças ou app específico só são práticos quando você já tem o ambiente. Simulação e observação **não equivalem** a instalação real.

## 1. Arquitetura de identidade

**O que é?** É definir fonte, autenticação, autorização, ciclo de vida, privilégio, observabilidade e recuperação.

**Prática — faça agora:**

Desenhe para organização fictícia: RH → AD DS → Entra → aplicativos; anote onde acontece Joiner, Mover, Leaver, quem autentica e onde um app autoriza. Compare com configuração **do seu laboratório**, apenas por observação.

**O que você acabou de fazer?** Você ligou os módulos aprendidos num único fluxo.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Evidencia dependências e responsáveis.

**Pontos negativos / riscos:** Arquitetura complexa amplia custo e pontos de falha.

**Fixação:** O que acontece se RH e diretório divergirem?

## 2. Decisão arquitetural (ADR)

**O que é?** É documento curto que registra alternativas e por que uma solução foi escolhida.

**Prática — faça agora:**

Escreva ADR de uma página: `decisão: JML on-prem antes de sincronizar`, opções consideradas, vantagens, riscos, custo, o que fica fora do escopo e rollback. Se ambiente cloud-only, justifique alternativa.

**O que você acabou de fazer?** Você tomou decisão explícita, não apenas desenhou ferramentas.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Ajuda a revisar trade-offs.

**Pontos negativos / riscos:** Uma escolha válida hoje pode precisar mudar após novos requisitos.

**Fixação:** Por que guardar o motivo da decisão é tão importante quanto diagrama?

## 3. Resiliência e emergência

**O que é?** IAM precisa continuar seguro diante de indisponibilidade ou comprometimento.

**Prática — faça agora:**

Simule **no papel** uma falha do IdP por 2 horas: indique apps afetados, contas de emergência protegidas, decisões de bloqueio e plano de recuperação. Não desconecte o tenant real para testar.

**O que você acabou de fazer?** Você executou exercício de arquitetura e recuperação, **não** provocou indisponibilidade real.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Antecipação diminui tempo de crise.

**Pontos negativos / riscos:** Break-glass mal protegido é risco elevado.

**Fixação:** Como distinguir recuperação de emergência de permissão permanente de rotina?


## Desafio da fase

Repita um dos exercícios em **outro objeto fictício** ou caso de teste, sem consultar o passo a passo. Explique as decisões e os limites do que realmente foi executado. Não use contas reais nem capture senhas ou tokens.

[Trilha por fases](../curriculo.md)
