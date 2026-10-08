# 14 — Access Reviews: recertificar acesso

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Recertificação exige responsável, prazo, decisão e execução real da revogação.

**Onde aparece no trabalho:** Terceirizado saiu, mas continua membro de grupo.

**Ao terminar você fará:** Simule campanha e comprove revogações.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Detecta acesso esquecido e produz evidência.

**Ponto negativo / risco:** Revisão sem execução de decisão vira formalidade; alto volume causa fadiga.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Tabela fictícia com 8 contas e 3 grupos.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Crie CSV `identity,group,owner,decision` com 8 linhas. Atribua `keep` ou `revoke`, registre justificativa, produza relatório e compare grupo antes/depois em planilha. Se licenciado, observe Access Reviews no Entra sem aplicar a terceiros.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Total de decisões e número de revogações confere com a tabela.

## 5. Quebre de propósito (apenas laboratório)

Deixe uma decisão sem resposta; escreva regra padrão com prazo e responsável.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Desenhe campanha de 30 dias e KPI `% acessos reavaliados`.

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
