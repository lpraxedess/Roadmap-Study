# 01 — Fundamentos: DNS, HTTP e TLS

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Uma aplicação só autentica depois de resolver nome, negociar TLS e alcançar o IdP.

**Onde aparece no trabalho:** Investigar falha de login que parece erro de senha, mas é DNS.

**Ao terminar você fará:** Localize a etapa rede→IdP antes de alterar identidades.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Diagnóstico por camada evita elevação de privilégios.

**Ponto negativo / risco:** Ferramentas de rede mostram transporte, não provam autorização.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Python 3, terminal e acesso apenas a host público de documentação.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** No terminal rode `python -c "import socket; print(socket.getaddrinfo('example.org',443)[0][4])"`. Em seguida rode `python -c "import ssl; print(ssl.OPENSSL_VERSION)"`. Desenhe o fluxo cliente→DNS→TLS→IdP→aplicação.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** DNS retorna um endereço; a versão do OpenSSL é exibida. Nenhum login ocorreu ainda.

## 5. Quebre de propósito (apenas laboratório)

Substitua por `dominio-inexistente.invalid`: a resolução falha. Classifique como problema de DNS, não de MFA.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Repita o fluxo para um app SaaS fictício e indique onde surgiria HTTP 401.

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
