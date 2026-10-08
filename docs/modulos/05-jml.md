# 05 — Joiner, Mover, Leaver

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

JML conecta eventos de RH, aprovações e identidades durante entrada, movimentação e saída.

**Onde aparece no trabalho:** Funcionário muda de Financeiro para TI e não pode reter privilégio financeiro.

**Ao terminar você fará:** Crie plano idempotente de concessão e revogação.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Reduz contas órfãs e melhora rastreabilidade.

**Ponto negativo / risco:** Automação sem aprovações pode propagar erros rapidamente.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Python 3; arquivo fictício `scripts/dados-exemplo.csv` incluído.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Na raiz execute `python scripts/jml_dry_run.py scripts/dados-exemplo.csv`; analise cada `operation`. Edite uma cópia do CSV para transformar `mover` em `leaver` e execute novamente.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** A saída JSON contém operações `PROPOSE_*` e `DRY_RUN_ONLY`; **não altera AD/Entra**.

## 5. Quebre de propósito (apenas laboratório)

Duplique `employeeId`: deve encerrar com erro e nenhum plano aplicado.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Defina autorização e rollback para mudança de departamento fictícia, evitando permissões acumuladas.

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
