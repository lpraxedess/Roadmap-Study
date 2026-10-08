# 12 — Python: APIs e tratamento de falhas

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Integrações IAM usam JSON, HTTP e códigos de status; erros devem ser classificados antes de retry.

**Onde aparece no trabalho:** Uma API de provisionamento responde 429 e 403.

**Ao terminar você fará:** Identifique falhas transitórias e permanentes e valide entradas.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Boa cobertura de testes e integração com APIs.

**Ponto negativo / risco:** Sem limites de retry, scripts causam bloqueio e consumo.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Python 3 sem dependências externas.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** No terminal: `python -c "import json; data=json.loads('{\"active\": false}'); print(data['active'])"`. Crie função `should_retry(status)` que retorne True para 429, 502, 503 e False para 400, 401, 403; teste com assertions.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** JSON interpreta `false` como booleano Python; seus testes classificam os status.

## 5. Quebre de propósito (apenas laboratório)

Faça a função retornar True incorretamente para 403, depois explique por que seria mau desenho.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Adicione backoff limitado à função com tempo máximo e logs que nunca incluam bearer tokens.

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
