# 20 — ITDR: detectar e responder a ameaças de identidade

**Fase 5 — Cloud e defesa** · **Objetivo:** compreender cada conceito e executar um exercício com resultado verificável.

> **Regra:** AD/Entra são as ferramentas principais. Casos que dependem de Azure, AWS, licenças ou app específico só são práticos quando você já tem o ambiente. Simulação e observação **não equivalem** a instalação real.

## 1. Evento de autenticação

**O que é?** É registro de tentativa e resultado de login de identidade.

**Prática — faça agora:**

Em Entra **de laboratório**, abra Monitoring & health → Sign-in logs (ou Users → Sign-in logs), selecione uma tentativa de **conta fictícia autorizada** e observe status, app, horário e motivo. Não faça ataques nem force MFA em produção.

**O que você acabou de fazer?** Você consultou evidência de autenticação real conforme acesso aos logs.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Facilita triagem de incidentes.

**Pontos negativos / riscos:** Sem retenção/visibilidade suficiente, investigação fica incompleta.

**Fixação:** Um login falho sozinho prova ataque?

## 2. Correlação de eventos

**O que é?** É relacionar sinais do mesmo usuário em sequência de tempo.

**Prática — faça agora:**

Na própria amostra de logs, filtre usuário de teste e ordene por horário; se não houver dados, monte três eventos explicitamente **fictícios**: login falho, MFA falho, login bem-sucedido. Escreva uma hipótese e como validá-la.

**O que você acabou de fazer?** Você montou sequência observada ou simulada, sem inventar conclusão.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Diminui tempo para identificar padrão anômalo.

**Pontos negativos / riscos:** Falsos positivos exigem contexto.

**Fixação:** Que hipótese faria após muitas falhas seguidas de sucesso?

## 3. Resposta à ameaça

**O que é?** É conter risco sem destruir evidências necessárias.

**Prática — faça agora:**

Em cenário **fictício**, liste decisões de resposta: validar alerta → contatar owner → bloquear conta **de laboratório** se confirmado → revogar sessões quando disponível → investigar sinais → restaurar acesso seguro após aprovação. Se executar bloqueio, confirme o objeto antes.

**O que você acabou de fazer?** Você criou playbook e, opcionalmente, testou bloqueio apenas em lab.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Padroniza tratamento e reduz improviso.

**Pontos negativos / riscos:** Bloqueio precipitado pode causar interrupção de negócio.

**Fixação:** Quando revogar sessões e como verificar efeito?


## Desafio da fase

Repita um dos exercícios em **outro objeto fictício** ou caso de teste, sem consultar o passo a passo. Explique as decisões e os limites do que realmente foi executado. Não use contas reais nem capture senhas ou tokens.

[Trilha por fases](../curriculo.md)
