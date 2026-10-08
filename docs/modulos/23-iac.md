# 23 — IaC: revisão e controle de mudanças

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Infraestrutura como código descreve configuração verificável por diff e pipeline.

**Onde aparece no trabalho:** Permissão ampla foi introduzida em pull request.

**Ao terminar você fará:** Faça code review sem executar apply.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Repetibilidade, revisão e histórico.

**Ponto negativo / risco:** States/segredos podem vazar; plano deve ser revisado.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Git local e editor; Terraform opcional.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Crie `policy.json` fictício com `role: Reader, scope: rg-lab`; faça commit. Altere para `Owner`, execute `git diff`, marque risco e reverta via `git restore policy.json` se não houver dados não salvos importantes.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Diff evidencia escalada de privilégio antes de execução.

## 5. Quebre de propósito (apenas laboratório)

Introduza wildcard de permissões e escreva uma regra de revisão que falharia.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Defina requisito de duas revisões antes de aplicar mudança crítica.

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
