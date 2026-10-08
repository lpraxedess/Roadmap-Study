# 08 — SAML 2.0 e federação

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

SAML troca afirmações XML assinadas entre IdP e SP com confiança pré-estabelecida.

**Onde aparece no trabalho:** Uma aplicação corporativa só suporta SAML.

**Ao terminar você fará:** Identifique EntityID, ACS, NameID, assinatura e validade de assertion.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Padrão maduro para aplicativos corporativos.

**Ponto negativo / risco:** Clock skew e metadata/certificados incorretos quebram SSO; XML complexo.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Keycloak e SP SAML de teste ou exercício de metadata offline.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** No [lab SAML](../labs/02-saml-keycloak.md), anote EntityID, ACS e certificado público. Desenhe AuthnRequest → IdP → SAML Response → ACS. Se não tiver SP, use metadata fictícia e verifique manualmente a igualdade das URLs.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** A assertion destina-se ao SP correto e a resposta chega à ACS autorizada.

## 5. Quebre de propósito (apenas laboratório)

Troque uma ACS fictícia ou audience e explique rejeição; restaure metadata original.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Produza tabela de erros de assinatura, destino e expiração com correção.

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
