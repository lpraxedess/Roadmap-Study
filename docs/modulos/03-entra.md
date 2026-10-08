# 03 — Microsoft Entra ID: usuários, grupos e papéis

**Fase 1 — AD e Entra** · **Objetivo:** aprender e executar cada conceito com verificação imediata.

> **Ambiente:** AD/Entra já disponível, de laboratório e autorizado. Nem todos os conceitos exigem alteração. Quando o recurso/licença não existe, o exercício é **observação/análise**, não configuração executada.

## 1. Usuário cloud-only

**O que é?** É a identidade criada diretamente no Entra ID, não controlada por AD on-prem.

**Prática — faça agora:**

Em entra.microsoft.com → Entra ID → Users → New user → Create new user. No **tenant de laboratório**, crie ana.treino em domínio verificado. Confirme Account enabled e Source/On-premises sync.

**O que você acabou de fazer?** Você provisionou um usuário cloud-only.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Permite administrar identidades SaaS sem AD.

**Pontos negativos / riscos:** Criar conta em tenant incorreto pode impactar usuários reais.

**Fixação:** Por que não duplicar um usuário sincronizado criando cloud-only?

## 2. Grupo atribuído

**O que é?** Agrupa usuários com associação administrada manualmente.

**Prática — faça agora:**

Entra ID → Groups → New group → Security → Assigned; crie IAM-Treino-Leitura. Em Members → Add members, adicione ana.treino. Abra Members e confirme; depois remova-a e confira ausência.

**O que você acabou de fazer?** Você administrou uma associação de identidade.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Escalável para acesso baseado em grupo.

**Pontos negativos / riscos:** Grupo só autoriza acesso se recurso/aplicativo estiver configurado para reconhecê-lo.

**Fixação:** O que verificar se usuário está no grupo mas aplicativo nega acesso?

## 3. Directory role x Azure RBAC

**O que é?** Directory role administra Entra; Azure RBAC governa recursos de assinatura/escopo.

**Prática — faça agora:**

Apenas **observe** Entra ID → Roles and administrators. Se existir um Resource Group de laboratório, abra portal.azure.com → grupo → Access control (IAM) → View my access. Compare role e escopo; não atribua permissões.

**O que você acabou de fazer?** Você identificou dois domínios de autorização diferentes.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Evita papéis administrativos abrangentes.

**Pontos negativos / riscos:** Role errada no escopo errado causa privilégios excessivos ou falha.

**Fixação:** Global Reader do Entra significa automaticamente Reader do Azure?


## Desafio da aula

Sem copiar os passos, reproduza o conceito em **outra identidade fictícia**, ou analise outro aplicativo de teste quando a aula for de leitura. Registre **o que fez, o que encontrou, qual falha observou e como verificou**. Nunca salve senhas/tokens.

**Conclua somente após explicar a teoria e demonstrar o resultado observado.** O quiz do portal ajuda a revisar, mas não substitui a prática.

[Trilha por fases](../curriculo.md)
