# 09 — SCIM: criar e desligar contas em aplicativos

**Fase 2 — SSO e protocolos** · **Objetivo:** entender cada conceito e, em seguida, praticá-lo.

> **Regra do curso:** faça no AD ou Entra autorizado quando possível. Operações que exigem licença, aplicativo ou instalação extra só são executadas se já houver o recurso de laboratório. Observação, simulação e implementação real são atividades distintas.

## 1. Provisionamento

**O que é?** É entregar a identidade ao sistema de destino; não é sinônimo de fazer login.

**Prática — faça agora:**

No Entra de teste → Enterprise applications → app de teste já integrado → Provisioning, identifique se há opção de provisionamento e qual status. **Não ative** sem endpoint SaaS autorizado. Compare com Users and groups (atribuição).

**O que você acabou de fazer?** Você distinguiu identidade no Entra de cadastro no aplicativo.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Evita criação manual repetitiva.

**Pontos negativos / riscos:** App que não suporta SCIM pode exigir outro conector.

**Fixação:** SSO sozinho cria usuários em todos os aplicativos?

## 2. SCIM Users

**O que é?** É recurso HTTP padronizado para representar identidade em aplicação.

**Prática — faça agora:**

No [Lab 09 — API SCIM educativa](../labs/09-scim-mock.md), rode `python scripts/scim_mock.py`, depois POST /Users de usuário fictício, conforme comandos completos do laboratório. Observe HTTP 201 e faça GET.

**O que você acabou de fazer?** Você **criou um objeto real no servidor mock local**, não no Entra nem em SaaS.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Ajuda a compreender payload e protocolo sem licença.

**Pontos negativos / riscos:** Mock não tem autenticação ou todos os recursos de SCIM real.

**Fixação:** Por que sucesso HTTP 201 não comprova que usuário fez login?

## 3. Desprovisionamento

**O que é?** É retirar ou desativar conta no destino quando a identidade perde o direito.

**Prática — faça agora:**

No mesmo Lab 09, envie PATCH para `active=false` e confira no GET. Em seguida tente POST duplicado e observe HTTP 409; finalize servidor.

**O que você acabou de fazer?** Você alterou estado do usuário na API didática.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Reduz contas esquecidas nos destinos.

**Pontos negativos / riscos:** Requer reconciliar erros, deprovisionamento e políticas do SaaS real.

**Fixação:** O que significa `active=false` e que validação ainda faltaria num SaaS real?


## Desafio de fixação

Escolha um **segundo usuário ou aplicativo de laboratório** e repita o processo **sem consultar os passos**. Registre o que realmente executou, qual resultado observou e qual limitação encontrou. Nunca compartilhe tokens ou senhas.

[Trilha por fases](../curriculo.md)
