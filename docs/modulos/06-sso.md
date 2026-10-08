# 06 — Single Sign-On: um login em vários aplicativos

**Fase 2 — SSO e protocolos** · **Objetivo:** aprender e executar cada conceito com verificação imediata.

> **Ambiente:** AD/Entra já disponível, de laboratório e autorizado. Nem todos os conceitos exigem alteração. Quando o recurso/licença não existe, o exercício é **observação/análise**, não configuração executada.

## 1. SSO

**O que é?** É reutilizar uma autenticação de provedor de identidade (IdP) em aplicações integradas.

**Prática — faça agora:**

No Entra de teste → Enterprise applications → All applications, abra **um aplicativo de teste existente** → Single sign-on. Identifique método configurado. Se não houver app de teste, explore apenas a interface sem alterar configurações.

**O que você acabou de fazer?** Você encontrou onde uma aplicação é integrada para confiar no IdP.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Centraliza autenticação e políticas.

**Pontos negativos / riscos:** Falha do IdP afeta várias aplicações.

**Fixação:** SSO dispensa checar permissões da aplicação?

## 2. IdP e aplicativo (SP/RP)

**O que é?** IdP autentica; SP/RP confia na resposta e precisa autorizar o usuário.

**Prática — faça agora:**

Para uma aplicação já federada no **tenant de laboratório**, observe Users and groups e veja quem foi atribuído. Com conta de teste **não atribuída**, verifique se há recusa (somente quando a política de app exige assignment).

**O que você acabou de fazer?** Você distinguiu autenticação central de atribuição ao aplicativo.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Controle de acesso centralizado quando configurado.

**Pontos negativos / riscos:** Permissão de app pode existir fora de grupos e requer revisão.

**Fixação:** Um usuário com login válido necessariamente entra em qualquer app?

## 3. Sessão e logout

**O que é?** Sessão do IdP e sessão do aplicativo podem ter durações e invalidação diferentes.

**Prática — faça agora:**

Entre em duas aplicações **de laboratório** já integradas ao mesmo IdP; abra ambas, saia da primeira e observe se a segunda continua autenticada. Não altere tokens ou políticas de produção.

**O que você acabou de fazer?** Você verificou comportamento real de sessões, que varia por aplicativo.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Ajuda a projetar experiência de login.

**Pontos negativos / riscos:** Logout de um serviço nem sempre encerra todas as sessões.

**Fixação:** Por que revogar sessões é uma tarefa relevante em Leaver?


## Desafio da aula

Sem copiar os passos, reproduza o conceito em **outra identidade fictícia**, ou analise outro aplicativo de teste quando a aula for de leitura. Registre **o que fez, o que encontrou, qual falha observou e como verificou**. Nunca salve senhas/tokens.

**Conclua somente após explicar a teoria e demonstrar o resultado observado.** O quiz do portal ajuda a revisar, mas não substitui a prática.

[Trilha por fases](../curriculo.md)
