# 11 — PowerShell: administração AD e Entra

**Fase 3 — Automação IAM** · **Objetivo:** entender cada conceito e, em seguida, praticá-lo.

> **Regra do curso:** faça no AD ou Entra autorizado quando possível. Operações que exigem licença, aplicativo ou instalação extra só são executadas se já houver o recurso de laboratório. Observação, simulação e implementação real são atividades distintas.

## 1. Consultar antes de alterar

**O que é?** Boa automação identifica o objeto exato antes de escrever.

**Prática — faça agora:**

Em estação **com RSAT de laboratório**, abra PowerShell e execute `Get-ADUser -Identity 'joao.jml' -Properties Enabled,Department,MemberOf | Select-Object Name,Enabled,Department,MemberOf`. Use conta **realmente criada no Lab 05**. Se não há AD, use `Connect-MgGraph -Scopes 'User.Read'` e consulte `/me`, sem pedir novas permissões.

**O que você acabou de fazer?** Você leu estado antes de qualquer alteração.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Evita erro de identidade e alterações desnecessárias.

**Pontos negativos / riscos:** Filtrar somente por nome de exibição pode encontrar homônimos.

**Fixação:** Por que consultar Object ID/SamAccountName antes de editar?

## 2. Dry-run / WhatIf

**O que é?** É prever alteração antes de executá-la, quando o cmdlet oferece suporte.

**Prática — faça agora:**

Na OU **de teste**, execute `Set-ADUser -Identity 'joao.jml' -Department 'TI' -WhatIf` e observe a simulação. Só execute a alteração real, **sem `-WhatIf`**, se tiver autorização e a conta for exclusiva do laboratório.

**O que você acabou de fazer?** Você diferenciou previsão da alteração real.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Diminui alterações acidentais.

**Pontos negativos / riscos:** Nem todos os cmdlets/API suportam WhatIf; não confundir com operação efetuada.

**Fixação:** O que significa ver saída de WhatIf sem mudança na conta?

## 3. Idempotência

**O que é?** Executar repetidamente a mesma automação não deve causar concessões duplicadas ou estado inesperado.

**Prática — faça agora:**

No objeto **fictício** já transferido, leia Department e grupos; escreva uma condição: só ajustar Department se for diferente de `TI`. Rode uma segunda vez e comprove que não há alteração necessária.

**O que você acabou de fazer?** Você praticou checagem de estado antes da escrita.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Diminui ruído e retrabalho.

**Pontos negativos / riscos:** Condição mal escrita pode ocultar falhas reais.

**Fixação:** Qual evidência demonstra que a segunda execução foi inofensiva?


## Desafio de fixação

Escolha um **segundo usuário ou aplicativo de laboratório** e repita o processo **sem consultar os passos**. Registre o que realmente executou, qual resultado observou e qual limitação encontrou. Nunca compartilhe tokens ou senhas.

[Trilha por fases](../curriculo.md)
