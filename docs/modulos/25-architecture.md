# 25 — Arquitetura IAM: decisões e resiliência

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Arquitetura integra provisionamento, SSO, controles privilegiados, logs e recuperação.

**Onde aparece no trabalho:** Empresa fictícia de 500 pessoas migra AD local para ambiente híbrido/cloud.

**Ao terminar você fará:** Defenda escolhas com critérios funcionais, riscos e custos.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Reduz fragilidade e facilita evolução.

**Ponto negativo / risco:** Complexidade, dependência de IdP e custos de operação.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Diagrama gratuito (Mermaid) e planilha fictícia.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Crie diagrama com RH→JML→AD/Entra→apps e IdP→SSO; inclua PAM, SIEM, break-glass. Escreva ADR de 1 página comparando Keycloak versus Entra no caso, com segurança, operação, custo e risco.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** ADR contém alternativas, trade-offs, decisão, risco residual e rollback.

## 5. Quebre de propósito (apenas laboratório)

Simule indisponibilidade de IdP por 2 horas: liste serviços afetados e plano de contingência.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Apresente arquitetura em 5 minutos e responda por que não usar permissões permanentes.

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
