# 07 — OAuth 2.0 e OIDC com PKCE

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

OAuth delega autorização; OIDC adiciona autenticação por ID Token e informações de identidade.

**Onde aparece no trabalho:** Aplicação web precisa autenticar sem receber senha do usuário.

**Ao terminar você fará:** Execute Authorization Code + PKCE e diferencie tipos de token.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Evita compartilhar senha com aplicações.

**Ponto negativo / risco:** Erros de audience, redirect e escopo geram exposição; tokens exigem cuidado.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Docker ou Podman e Keycloak isolado; siga o laboratório OIDC detalhado.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Realize [laboratório 01 de Keycloak e PKCE](../labs/01-keycloak-oidc.md). Salve **somente** código HTTP e estrutura redigida, nunca tokens. Compare ID Token versus Access Token no diagrama.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Recebe código de autorização, troca-o com verifier correto e identifica scopes.

## 5. Quebre de propósito (apenas laboratório)

Altere `code_verifier` na troca: Keycloak deve rejeitar; explique vínculo PKCE.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Desenhe Authorization Code Flow com issuer, audience, redirect e validação de assinatura.

## 7. Fixação ativa

**Antes de marcar concluído**, responda à pergunta interativa exibida no final desta aula. Justifique a escolha em uma frase e confira a explicação. A atividade é uma verificação conceitual; a competência prática exige executar e diagnosticar o laboratório.

## 8. Evidência mínima (5 itens)

- [ ] Consigo explicar o conceito e **por que usar**.
- [ ] Enumero uma vantagem e uma limitação real.
- [ ] Executei a prática (ou identifiquei explicitamente uma simulação).
- [ ] Fiz teste negativo e expliquei a causa.
- [ ] Reverti o estado e consigo repetir sem o roteiro.

**Critério:** só declare prática concluída quando houver resultados observados. O botão do portal registra estudo pessoal; não é uma certificação.

[Ir ao currículo](../curriculo.md) · [Guia do aluno](../guia-do-aluno.md)
