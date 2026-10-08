# 20 — ITDR: detectar abuso de identidade

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Identity Threat Detection and Response correlaciona sinais e conduz contenção.

**Onde aparece no trabalho:** Múltiplas tentativas MFA e nova sessão suspeita.

**Ao terminar você fará:** Monte timeline e priorize contenção sem criar ataques reais.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Reduz tempo de identificação e resposta.

**Ponto negativo / risco:** Falsos positivos; logs incompletos comprometem investigação.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

CSV com eventos inventados; nenhum ataque real.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Crie três eventos com timestamps fictícios: `login_fail`, `mfa_fail`, `login_success` para mesmo usuário; ordene por tempo e produza hipótese, evidência, severidade e próxima verificação.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Relatório contém linha do tempo e distingue evidência de suposição.

## 5. Quebre de propósito (apenas laboratório)

Adicione usuário diferente no segundo evento: teste se sua correlação por identityId produz falso positivo.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Escreva playbook para revogar sessões e resetar credenciais após autorização.

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
