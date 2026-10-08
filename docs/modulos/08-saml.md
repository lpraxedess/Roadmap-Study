# 08 — SAML: confiança e autenticação federada

**Fase 2 — SSO e protocolos** · **Objetivo:** aprender e executar cada conceito com verificação imediata.

> **Ambiente:** AD/Entra já disponível, de laboratório e autorizado. Nem todos os conceitos exigem alteração. Quando o recurso/licença não existe, o exercício é **observação/análise**, não configuração executada.

## 1. IdP e SP

**O que é?** O IdP autentica e o Service Provider aceita assertions assinadas se confiar no emissor.

**Prática — faça agora:**

Em Entra → Enterprise applications → aplicativo **SAML de laboratório já existente** → Single sign-on → SAML. Identifique Entity ID do SP e Login URL. Não altere configurações.

**O que você acabou de fazer?** Você encontrou emissores/destinatários da federação.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Permite SSO em aplicações corporativas antigas.

**Pontos negativos / riscos:** Configuração divergente entre IdP/SP impede acesso.

**Fixação:** Quem autentica e quem recebe a assertion?

## 2. ACS e assinatura

**O que é?** ACS é o endpoint que recebe respostas SAML; assinatura protege integridade/autoria.

**Prática — faça agora:**

Na configuração SAML de teste, compare Identifier (Entity ID), Reply URL (ACS) e certificado público do IdP com a configuração documentada do SP. Registre **somente dados fictícios/sanitizados**.

**O que você acabou de fazer?** Você validou os itens fundamentais da confiança.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Ajuda a impedir assertions aceitas por SP incorreto.

**Pontos negativos / riscos:** Certificado expirado ou ACS errada causa falha de login.

**Fixação:** O que ocorre se o SP recebe assertion destinada a outro Entity ID?

## 3. Teste de configuração

**O que é?** A integração só está validada quando o SP aceita login e impõe a autorização prevista.

**Prática — faça agora:**

Se possuir app SAML de teste, use Test single sign-on e compare mensagem de sucesso/erro. **Sem SP real**, faça análise de parâmetros, identificando claramente que não executou o fluxo.

**O que você acabou de fazer?** Você distinguiu revisão de metadata de login real.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Detecta erros antes da publicação.

**Pontos negativos / riscos:** Trocar Reply URL em ambiente de produção é perigoso.

**Fixação:** Qual o primeiro item a conferir em erro de destino/audience?


## Desafio da aula

Sem copiar os passos, reproduza o conceito em **outra identidade fictícia**, ou analise outro aplicativo de teste quando a aula for de leitura. Registre **o que fez, o que encontrou, qual falha observou e como verificou**. Nunca salve senhas/tokens.

**Conclua somente após explicar a teoria e demonstrar o resultado observado.** O quiz do portal ajuda a revisar, mas não substitui a prática.

[Trilha por fases](../curriculo.md)
