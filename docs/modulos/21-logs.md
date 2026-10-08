# 21 — Logs e troubleshooting de autenticação

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Sign-in logs e audit logs registram fatos diferentes; correlation ID liga eventos.

**Onde aparece no trabalho:** Login negado após mudança de Conditional Access.

**Ao terminar você fará:** Traceie origem do bloqueio antes de alterar a política.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Acelera diagnóstico com evidência.

**Ponto negativo / risco:** Retenção, privacidade e permissões variam por plano.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Keycloak local ou conjunto fictício de logs.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** No Keycloak de laboratório, provoque senha incorreta em `alice`; veja eventos administrativos/usuário e `docker logs iam-keycloak-lab`. Registre timestamp, evento e motivo sem credenciais.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Você associa uma tentativa ao resultado e distingue login de alteração administrativa.

## 5. Quebre de propósito (apenas laboratório)

Crie evento de token expirado e explique por que não se resolve elevando RBAC.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Escreva runbook de triagem em cinco verificações.

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
