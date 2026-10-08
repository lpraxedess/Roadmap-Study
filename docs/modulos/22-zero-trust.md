# 22 — Zero Trust: verificar antes de permitir

**Fase 5 — Cloud e defesa** · **Objetivo:** compreender cada conceito e executar um exercício com resultado verificável.

> **Regra:** AD/Entra são as ferramentas principais. Casos que dependem de Azure, AWS, licenças ou app específico só são práticos quando você já tem o ambiente. Simulação e observação **não equivalem** a instalação real.

## 1. Verificação explícita

**O que é?** É tomar decisão de acesso com identidade, contexto, dispositivo e sinais de risco disponíveis.

**Prática — faça agora:**

No Entra de **laboratório**, abra Protection → Conditional Access → Policies se tiver acesso. **Somente observe** uma política de teste: usuários, cloud apps, conditions e grant controls. Se indisponível por licença, analise a matriz abaixo sem criar política.

**O que você acabou de fazer?** Você separou política e mecanismo de autenticação.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Fortalece controles contextuais.

**Pontos negativos / riscos:** Regra mal aplicada pode bloquear administradores.

**Fixação:** MFA por si só equivale a Zero Trust completo?

## 2. Menor privilégio

**O que é?** Usuário deve receber apenas permissões necessárias para sua função e duração.

**Prática — faça agora:**

No grupo JML-TI do Entra ou AD de teste, confira quais usuários estão associados e explique quem deveria removê-los depois de mudança de departamento. Faça remoção **apenas de usuário fictício**, caso autorizado.

**O que você acabou de fazer?** Você aplicou revisão prática de membership.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Diminui exposição lateral.

**Pontos negativos / riscos:** Revisão manual não cobre todos os apps.

**Fixação:** Como evitar que pessoa acumule grupos após mudança?

## 3. Implantação gradual

**O que é?** Políticas de acesso precisam ser avaliadas antes de entrar em modo de bloqueio.

**Prática — faça agora:**

Se houver recurso e licença, abra Conditional Access de teste e identifique opção de **Report-only**, sem ativar bloqueios. Elabore teste com duas contas fictícias e verificação de break-glass. **Não aplique policy a todo tenant** para completar aula.

**O que você acabou de fazer?** Você compreendeu rollout; não é implantação real sem aplicar e validar.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Reduz risco operacional.

**Pontos negativos / riscos:** Report-only não bloqueia acesso; decisão precisa ser revisada.

**Fixação:** Por que proteger conta de emergência antes de CA?


## Desafio da fase

Repita um dos exercícios em **outro objeto fictício** ou caso de teste, sem consultar o passo a passo. Explique as decisões e os limites do que realmente foi executado. Não use contas reais nem capture senhas ou tokens.

[Trilha por fases](../curriculo.md)
