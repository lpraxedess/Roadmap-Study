# 11 — PowerShell: automação segura

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Scripts IAM precisam validar entrada, ser idempotentes, registrar resultado e permitir dry-run.

**Onde aparece no trabalho:** Um script de provisionamento recebe departamento vazio.

**Ao terminar você fará:** Implemente validações e erros sem tocar no tenant.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Melhora consistência e reduz tarefas manuais.

**Ponto negativo / risco:** Scripts inseguros podem alterar milhares de contas de uma vez.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

PowerShell 7 local, sem AD.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Execute `pwsh -NoProfile -Command '$dept=""; if ([string]::IsNullOrWhiteSpace($dept)) { throw "department obrigatório" }'` e observe a falha. Depois use dept=`TI`. Inclua `try/catch` e saída estruturada.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Entrada válida segue; entrada ausente falha antes da operação.

## 5. Quebre de propósito (apenas laboratório)

Passe `'  '` e explique por que `IsNullOrWhiteSpace` é mais robusto do que testar null.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Escreva função `Test-Department` com três testes de entrada.

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
