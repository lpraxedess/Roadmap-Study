# 01 — Identidade, autenticação e autorização

**Fase 1 — AD e Entra** · **Objetivo:** aprender e executar cada conceito com verificação imediata.

> **Ambiente:** AD/Entra já disponível, de laboratório e autorizado. Nem todos os conceitos exigem alteração. Quando o recurso/licença não existe, o exercício é **observação/análise**, não configuração executada.

## 1. Identidade

**O que é?** É o registro que representa uma pessoa ou serviço no diretório.

**Prática — faça agora:**

Abra Entra ID → Users → All users, selecione uma conta fictícia autorizada e identifique User principal name, Object ID e Account enabled. Se usar AD, abra dsa.msc → usuário de laboratório → Account.

**O que você acabou de fazer?** Você identificou **quem** é o principal. Isso ainda não concede acesso.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Centraliza o gerenciamento de contas.

**Pontos negativos / riscos:** Contas duplicadas e atributos errados confundem a identificação.

**Fixação:** Qual campo distingue o objeto mesmo que seu nome de exibição mude?

## 2. Autenticação

**O que é?** É comprovar a identidade com senha, MFA ou outros métodos.

**Prática — faça agora:**

No Entra, abra Sign-in logs de um login **do laboratório** que sua função permita consultar; observe usuário, aplicativo, horário e status. Sem acesso aos logs, autentique a própria conta de teste em uma janela privada e observe o resultado, sem registrar senha.

**O que você acabou de fazer?** Você testou **se o usuário consegue comprovar quem é**.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Reduz falsificação de identidade quando usa controles adequados.

**Pontos negativos / riscos:** Senha correta não significa acesso autorizado a toda aplicação.

**Fixação:** Uma autenticação com sucesso garante permissão em todos os sistemas? Por quê?

## 3. Autorização

**O que é?** Define o que uma identidade pode fazer num recurso.

**Prática — faça agora:**

Abra o grupo JML-Financeiro de laboratório no Entra ou AD e confira seus membros. Compare a associação ao grupo com a ACL de uma pasta de teste ou o assignment de uma aplicação fictícia, se houver; não altere produção.

**O que você acabou de fazer?** Você distinguiu **ser membro de grupo** de **ter acesso ao recurso**, que precisa consultar esse grupo.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Implementa menor privilégio.

**Pontos negativos / riscos:** Membro de grupo sem vínculo com aplicativo pode não obter permissão nenhuma.

**Fixação:** Como investigaria usuário que autentica mas recebe acesso negado?


## Desafio da aula

Sem copiar os passos, reproduza o conceito em **outra identidade fictícia**, ou analise outro aplicativo de teste quando a aula for de leitura. Registre **o que fez, o que encontrou, qual falha observou e como verificou**. Nunca salve senhas/tokens.

**Conclua somente após explicar a teoria e demonstrar o resultado observado.** O quiz do portal ajuda a revisar, mas não substitui a prática.

[Trilha por fases](../curriculo.md)
