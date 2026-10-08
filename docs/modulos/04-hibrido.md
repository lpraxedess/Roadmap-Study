# 04 — Híbrido: AD DS + Entra Connect

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Sincronização propaga objetos/atributos da fonte definida; não é o mesmo que autenticação.

**Onde aparece no trabalho:** Conta é desativada no AD, mas ainda aparece no Entra.

**Ao terminar você fará:** Investigue origem da conta, agendamento e atributos sem alterar produção.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Reaproveita identidades on-prem e facilita transição.

**Ponto negativo / risco:** Erros de escopo, atributos e sincronização impactam provisionamento.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

AD/Entra Connect de laboratório existente; caso contrário, simulação com CSV fictício.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Abra `Synchronization Service Manager` ou logs do conector em sua VM. Consulte escopo de OU e scheduler com `Get-ADSyncScheduler` quando disponível. Se só puder simular, crie tabela `AD enabled=false`, `sync pendente`, `cloud enabled=true` e avance uma execução fictícia.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Após sincronização validada, a alteração elegível é refletida no destino conforme o tipo de objeto e a configuração.

## 5. Quebre de propósito (apenas laboratório)

Retire um usuário fictício do escopo em tabela e preveja comportamento e riscos; não altere sync de usuários importantes.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Documente procedimento para diferenciar falha de fluxo, erro de atributo e exclusão de escopo.

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
