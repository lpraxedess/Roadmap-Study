# 22 — Zero Trust: políticas graduais

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Zero Trust é modelo de decisão contínua: verificar explicitamente, mínimo privilégio e assumir violação.

**Onde aparece no trabalho:** Admin acessa app crítico em dispositivo desconhecido.

**Ao terminar você fará:** Desenhe decisão por identidade, MFA, dispositivo e risco.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Reduz confiança implícita; favorece defesa em profundidade.

**Ponto negativo / risco:** Políticas mal testadas bloqueiam usuários e equipes.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Tabela de decisão local; não precisa licença de CA.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Monte tabela para `admin`, `usuário padrão`, `convidado` x `dispositivo gerenciado` x `MFA`. Indique permitir, exigir controle ou bloquear. Simule duas linhas negadas e plano de exceção temporária.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Decisões estão ligadas a sinais e controle explícito.

## 5. Quebre de propósito (apenas laboratório)

Retire o sinal de dispositivo gerenciado: explique como resultado deveria mudar.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Planeje rollout em modo relatório com conta de emergência preservada.

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
