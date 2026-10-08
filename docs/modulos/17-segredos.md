# 17 — Segredos: OpenBao e tokens

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Workloads precisam de segredo ou identidade; cofres centralizam política, TTL e revogação.

**Onde aparece no trabalho:** Pipeline possui senha hardcoded em arquivo Git.

**Ao terminar você fará:** Modele cofre e política de acesso por workload.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Rotação e menor exposição de segredos.

**Ponto negativo / risco:** Cofre mal administrado vira ponto crítico de indisponibilidade.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

OpenBao local isolado, ou simulação com JSON de política.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Crie política fictícia `app-reader` com leitura somente de `secret/data/app1`; compare com acesso a `secret/data/app2` e negue. Se usar OpenBao, execute apenas modo development local, nunca guarde root token no Git.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** A política limita leitura a um caminho; TTL reduz exposição.

## 5. Quebre de propósito (apenas laboratório)

Tente ler caminho fora da política: acesso negado. Documente expiração/rotação.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Desenhe fluxo de rotação sem interromper a aplicação.

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
