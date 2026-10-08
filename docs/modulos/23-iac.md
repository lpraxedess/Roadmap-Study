# 23 — IaC e Git: controle de mudanças em IAM

**Fase 6 — Arquitetura** · **Objetivo:** compreender cada conceito e executar um exercício com resultado verificável.

> **Regra:** AD/Entra são as ferramentas principais. Casos que dependem de Azure, AWS, licenças ou app específico só são práticos quando você já tem o ambiente. Simulação e observação **não equivalem** a instalação real.

## 1. Versionamento

**O que é?** É registrar alterações de configuração com histórico e revisão.

**Prática — faça agora:**

No repositório **local de exercícios separado do ambiente real**, crie arquivo `politica-iam-lab.json` com texto fictício `{"role":"Reader","scope":"rg-lab"}`. Rode `git init`, `git add politica-iam-lab.json`, `git commit -m 'policy inicial'`. Configure nome/e-mail local se o Git pedir.

**O que você acabou de fazer?** Você versionou uma política **fictícia**, não concedeu role Azure.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Permite rastrear quem mudou o desenho.

**Pontos negativos / riscos:** Arquivo com segredo não deve ser versionado.

**Fixação:** Um commit aplica permissão no Entra?

## 2. Revisão de diferença

**O que é?** É comparar estado anterior e alteração proposta antes de executar.

**Prática — faça agora:**

Edite no arquivo fictício Reader → Owner; execute `git diff` e identifique o aumento de privilégio. Desfaça com editor ou `git restore` **após salvar o que for necessário**.

**O que você acabou de fazer?** Você detectou risco em revisão sem afetar cloud.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Impede mudanças excessivas antes de apply.

**Pontos negativos / riscos:** Pipeline sem revisão pode propagar erro.

**Fixação:** Por que mudar Reader para Owner precisa de revisão?

## 3. Pipeline e rollback

**O que é?** São etapas para validar, aprovar, aplicar e eventualmente reverter mudanças de IAM.

**Prática — faça agora:**

Desenhe pipeline `PR → validate → review → plan → approval → apply → verify`. Para uma alteração fictícia que falhe, descreva rollback e quais logs guardaria. Não rode Terraform apply em assinatura com custo para esta aula.

**O que você acabou de fazer?** Você projetou controles, ainda **não** fez deploy IaC real.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Melhora repetibilidade e governança.

**Pontos negativos / riscos:** Rollback nem sempre restaura tokens/sessões anteriores.

**Fixação:** Que condição deve impedir o apply automático?


## Desafio da fase

Repita um dos exercícios em **outro objeto fictício** ou caso de teste, sem consultar o passo a passo. Explique as decisões e os limites do que realmente foi executado. Não use contas reais nem capture senhas ou tokens.

[Trilha por fases](../curriculo.md)
