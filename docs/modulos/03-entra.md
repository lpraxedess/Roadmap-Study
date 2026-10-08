# 03 — Entra ID: papéis e escopos

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Funções de diretório administram identidades; Azure RBAC controla recursos no Azure.

**Onde aparece no trabalho:** Um operador precisa visualizar apenas um Resource Group.

**Ao terminar você fará:** Separe directory roles de escopos Azure Resource Manager.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Menor privilégio e delegação granular.

**Ponto negativo / risco:** Um papel Reader ainda pode expor metadados; permissões variam por plano e escopo.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Conta de laboratório; não crie recurso cobrado apenas para a atividade.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** No portal Azure, abra `Access control (IAM)` de um grupo de recursos **existente** → `View my access`. Depois, no Entra, observe `Roles and administrators`. Compare os dois escopos. Se não houver assinatura, preencha matriz `identidade, recurso, role, ação permitida`.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Você consegue explicar por que Global Reader não é automaticamente Reader de uma assinatura.

## 5. Quebre de propósito (apenas laboratório)

Na matriz fictícia, tente `Reader → excluir VM`: marque negado e explique quem avalia.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Crie uma matriz de três papéis e cinco operações, mantendo ações sensíveis negadas.

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
