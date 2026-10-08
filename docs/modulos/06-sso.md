# 06 — SSO: IdP, SP e sessões

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

SSO reutiliza a autenticação do provedor de identidade nas aplicações integradas.

**Onde aparece no trabalho:** Duas aplicações exigem login separado e têm políticas inconsistentes.

**Ao terminar você fará:** Desenhe o fluxo de confiança IdP ↔ SP/RP e identifique quem decide acesso.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Centraliza políticas e simplifica autenticação.

**Ponto negativo / risco:** Indisponibilidade do IdP amplia impacto; logout pode variar.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Keycloak local opcional; papel e caneta suficientes para diagnóstico.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Desenhe usuário→aplicação→IdP→aplicação. Defina duas aplicações fictícias, mesma sessão IdP e sessões próprias em cada SP. Compare estado antes/depois do logout no IdP e liste verificações necessárias.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Você distingue sessão no IdP da sessão no aplicativo; autenticação única não implica acesso autorizado a tudo.

## 5. Quebre de propósito (apenas laboratório)

Simule usuário autenticado mas sem role no aplicativo: deve entrar no IdP, porém receber acesso negado no SP.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Defina política SSO para aplicativo crítico com MFA e fallback documentado.

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
