# 19 — AWS e Azure: compare modelos de IAM

**Fase 5 — Cloud e defesa** · **Objetivo:** compreender cada conceito e executar um exercício com resultado verificável.

> **Regra:** AD/Entra são as ferramentas principais. Casos que dependem de Azure, AWS, licenças ou app específico só são práticos quando você já tem o ambiente. Simulação e observação **não equivalem** a instalação real.

## 1. Principal e política

**O que é?** AWS policies descrevem ações/recursos; Azure RBAC usa roles e escopos, com semântica distinta.

**Prática — faça agora:**

No Azure **de teste**, consulte uma atribuição Reader existente. Em editor local, escreva uma policy AWS fictícia que permite apenas `s3:GetObject` no bucket `arn:aws:s3:::iam-treino/*`. **Não precisa conta AWS** para a comparação.

**O que você acabou de fazer?** Você identificou o mesmo objetivo de menor privilégio em modelos distintos.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Transferência de princípios entre clouds.

**Pontos negativos / riscos:** Sintaxe e avaliação não são intercambiáveis.

**Fixação:** Pode copiar JSON de policy AWS para Azure RBAC?

## 2. Trust policy

**O que é?** Em AWS determina quem pode assumir uma role, além das permissões que a role possui.

**Prática — faça agora:**

Considere role fictícia AWS: apenas uma service principal específica pode assumir role de leitura. Desenhe duas decisões: **quem assume** e **o que faz depois**. Compare com principal/role/scope do Azure.

**O que você acabou de fazer?** Você separou confiança de autorização no desenho; **não** assumiu uma role AWS real.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Evita trust excessivamente aberto.

**Pontos negativos / riscos:** Wildcard em trust pode ampliar risco de assunção indevida.

**Fixação:** Permissão para S3 já concede direito de assumir qualquer role?

## 3. Revisão de menor privilégio

**O que é?** É reduzir ações e recursos a operações justificadas.

**Prática — faça agora:**

Pegue a policy fictícia e altere `Action: '*'` para `s3:GetObject` e `Resource: '*'` para ARN fictício específico. Faça diff e explique por que o segundo desenho é preferível.

**O que você acabou de fazer?** Você revisou policy **offline**, sem tocar em infraestrutura.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Ajuda a detectar permissões amplas em code review.

**Pontos negativos / riscos:** Permissão restrita demais pode impedir operação legítima.

**Fixação:** O que revisar primeiro numa policy com `Resource:*`?


## Desafio da fase

Repita um dos exercícios em **outro objeto fictício** ou caso de teste, sem consultar o passo a passo. Explique as decisões e os limites do que realmente foi executado. Não use contas reais nem capture senhas ou tokens.

[Trilha por fases](../curriculo.md)
