# 24 — Auditoria IAM: controles e evidências

**Fase 6 — Arquitetura** · **Objetivo:** compreender cada conceito e executar um exercício com resultado verificável.

> **Regra:** AD/Entra são as ferramentas principais. Casos que dependem de Azure, AWS, licenças ou app específico só são práticos quando você já tem o ambiente. Simulação e observação **não equivalem** a instalação real.

## 1. Controle IAM

**O que é?** É regra/atividade que reduz risco mensurável, com dono e frequência.

**Prática — faça agora:**

No Entra ou AD de **teste**, escolha controle `usuário desligado não pode autenticar` e verifique estado de conta do exercício JML. Registre data, responsável e critério. Não inclua dados pessoais.

**O que você acabou de fazer?** Você transformou um risco em controle verificável.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Facilita auditoria.

**Pontos negativos / riscos:** Controle sem proprietário acaba esquecido.

**Fixação:** Qual evidência demonstra que Leaver foi executado?

## 2. Evidência

**O que é?** É registro verificável de ação, resultado e momento de execução.

**Prática — faça agora:**

Em grupo JML-Financeiro de lab, consulte antes/depois da remoção de uma conta fictícia. Combine com audit log do Entra se disponível; guarde apenas dados sanitizados.

**O que você acabou de fazer?** Você produziu evidência da remoção real.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Permite validar eficiência de remediação.

**Pontos negativos / riscos:** Print isolado sem contexto pode ser inconclusivo.

**Fixação:** Como demonstrar quem alterou um grupo e quando?

## 3. KPI de controle

**O que é?** É medida com fórmula, origem, período e meta documentados.

**Prática — faça agora:**

Considere 20 desligamentos **fictícios**, 18 bloqueados dentro do SLA. Calcule `18/20*100 = 90%`. Registre também duas exceções e suas causas. Esta é **simulação de análise**, não métrica do tenant.

**O que você acabou de fazer?** Você entendeu cálculo e limite da amostra.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Mostra tendência e gargalos.

**Pontos negativos / riscos:** KPI sem fonte real gera falsa sensação de conformidade.

**Fixação:** O que falta para chamar 90% de desempenho real?


## Desafio da fase

Repita um dos exercícios em **outro objeto fictício** ou caso de teste, sem consultar o passo a passo. Explique as decisões e os limites do que realmente foi executado. Não use contas reais nem capture senhas ou tokens.

[Trilha por fases](../curriculo.md)
