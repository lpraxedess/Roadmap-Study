# 24 — Auditoria: controle, evidência e KPI

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Controle precisa de objetivo, proprietário, frequência, teste e prova verificável.

**Onde aparece no trabalho:** Auditoria solicita evidência de revogação de ex-funcionário.

**Ao terminar você fará:** Conecte risco → controle → teste → evidência → responsável.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Torna resultados auditáveis e mede desempenho.

**Ponto negativo / risco:** Métricas sem fonte ou controle geram falsas conclusões.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Planilha ou CSV fictício.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Crie tabela com `controle`, `risco`, `frequência`, `owner`, `evidência`, `resultado`. Calcule: 18 revogações no SLA entre 20 saídas = 90%. Registre as duas exceções e causa.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Indicador tem denominador, período e fonte.

## 5. Quebre de propósito (apenas laboratório)

Retire owner de um controle: explique por que a auditoria não pode encerrar achado.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Defina KPI de contas órfãs e rotina de revisão.

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
