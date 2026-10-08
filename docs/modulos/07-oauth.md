# 07 — OAuth 2.0 e OpenID Connect (OIDC)

**Fase 2 — SSO e protocolos** · **Objetivo:** aprender e executar cada conceito com verificação imediata.

> **Ambiente:** AD/Entra já disponível, de laboratório e autorizado. Nem todos os conceitos exigem alteração. Quando o recurso/licença não existe, o exercício é **observação/análise**, não configuração executada.

## 1. OAuth 2.0

**O que é?** É protocolo de autorização delegada: um cliente obtém acesso a recurso dentro de escopos.

**Prática — faça agora:**

No Entra, abra App registrations **de laboratório já existente** → API permissions. Identifique um escopo Delegated; não adicione permissões novas. Descreva o recurso que seria acessado.

**O que você acabou de fazer?** Você reconheceu quais permissões um aplicativo solicita.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Evita expor senha do usuário ao cliente.

**Pontos negativos / riscos:** Escopos amplos aumentam o impacto de um token vazado.

**Fixação:** User.Read concede ler todas as contas do diretório?

## 2. OIDC

**O que é?** Usa OAuth 2.0 e adiciona autenticação e identidade, incluindo ID Token.

**Prática — faça agora:**

Abra a página de informações de um app registrado de teste e observe Authentication/Redirect URIs. Compare a finalidade do ID Token (identidade) com Access Token (API). Não copie tokens para documentação pública.

**O que você acabou de fazer?** Você identificou cliente, redirect e diferença entre tokens.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Padroniza login moderno em apps.

**Pontos negativos / riscos:** Configuração de redirect incorreta pode levar a falhas/risco.

**Fixação:** É correto enviar ID Token como autorização para toda API?

## 3. Consentimento e PKCE

**O que é?** Consent define permissões; PKCE protege a troca do código de autorização em clientes aplicáveis.

**Prática — faça agora:**

Em App registrations de **teste**, identifique Authentication/Platform e API permissions. Faça checklist: redirect exato, Authorization Code + PKCE em cliente público e menor escopo. Para executar protocolo ponta a ponta, use [Lab 01 opcional](../labs/01-keycloak-oidc.md), que requer ambiente adicional.

**O que você acabou de fazer?** Você fez revisão de configuração. Sem aplicação rodando, isto **não** é execução de login OIDC ponta a ponta.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Protege autorização e reduz abuso de código.

**Pontos negativos / riscos:** Consentimento elevado/redirect excessivo pode ampliar acesso indevido.

**Fixação:** Por que PKCE não substitui validação de redirect URI?


## Desafio da aula

Sem copiar os passos, reproduza o conceito em **outra identidade fictícia**, ou analise outro aplicativo de teste quando a aula for de leitura. Registre **o que fez, o que encontrou, qual falha observou e como verificou**. Nunca salve senhas/tokens.

**Conclua somente após explicar a teoria e demonstrar o resultado observado.** O quiz do portal ajuda a revisar, mas não substitui a prática.

[Trilha por fases](../curriculo.md)
