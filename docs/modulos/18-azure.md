# 18 — Azure IAM: RBAC e managed identities

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Atribuição Azure RBAC liga principal a role e escopo; managed identity reduz segredos de workloads.

**Onde aparece no trabalho:** App precisa ler um recurso sem armazenar client secret.

**Ao terminar você fará:** Identifique principal, role, scope e ação.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Permissões por escopo e identidade gerenciada.

**Ponto negativo / risco:** Escopo amplo causa acesso lateral; assinatura pode cobrar.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Portal Azure apenas se existir subscrição com orçamento; senão simulação.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** No grupo de recursos **já existente**, abra `Access control (IAM)`, consulte role assignments e marque principal/role/scope. Desenhe cenário de managed identity com role de leitura em recurso fictício; não provisionar VM apenas para exercício.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Escopo explica o que uma identidade consegue acessar.

## 5. Quebre de propósito (apenas laboratório)

Tente ação fictícia de escrita com Reader; deve ser negada.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Comparar managed identity versus service principal com client secret.

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
