# 15 — PIM: privilégio temporário na prática

**Nível:** intermediário → avançado | **Tempo:** 3–5 horas | **Trilha:** Governança e privilégios

> **Resultado da aula:** você conseguirá justificar uma política de acesso privilegiado, configurar e testar uma ativação PIM no Entra **se sua conta e tenant forem elegíveis**, ou executar uma simulação local auditável sem custo. Uma simulação **não** substitui a configuração real de PIM.

## 1. O que é PIM?

**Privileged Identity Management (PIM)** é um conjunto de controles para gerenciar **quando**, **por quanto tempo**, **com quais condições** e **com qual evidência** uma identidade pode exercer privilégios. No Microsoft Entra, é usado para controlar atribuições e ativações de funções privilegiadas, entre outros cenários conforme produto/licenciamento.

**Standing privilege:** alguém mantém a função administrativa ativa continuamente. **Eligible:** pode solicitar ativação, mas não exerce a função antes de ativar. **Active:** a função está exercível durante uma janela de tempo. **JIT (just-in-time):** privilégio concedido apenas quando necessário. **JEA (just enough access):** escopo mínimo necessário. PIM não substitui MFA, revisão de acesso, segregação de funções ou monitoramento.

### Exemplo de trabalho real

Um analista precisa modificar uma configuração de autenticação durante uma mudança aprovada. Não deve ser Global Administrator permanentemente. O responsável por IAM escolhe a função específica, define elegibilidade, duração curta, justificativa, autenticação reforçada e auditoria; a equipe de segurança revisa ativações excepcionais.

## 2. Por que utilizar?

- Reduz a janela de exposição de privilégios permanentes.
- Produz rastreabilidade de quem ativou, quando, por qual motivo e por quanto tempo.
- Permite condicionar elevações a autenticação, justificativa e, quando disponível/configurado, aprovação.
- Ajuda na resposta a incidentes e auditorias de acesso privilegiado.

**Limitações e pontos negativos:** depende de desenho de roles correto; uma função excessiva continua excessiva durante a ativação. Pode adicionar atrito operacional, depender de aprovação/disponibilidade e exigir licenças. Ativações legítimas podem ser abusadas se a conta estiver comprometida. Recursos, nomes de menus e requisitos mudam conforme produto e tenant.

## 3. Antes de tocar no ambiente

**Seu contexto:** uma licença Entra ID P2, orçamento restrito. Faça o teste **apenas com a identidade efetivamente licenciada e autorizada**. Não presuma que P2 cobre todos os recursos de Entra ID Governance, PIM for Groups, Azure RBAC ou outros usuários. Se o portal mostrar bloqueio de licença, permissão ou produto, **não contorne**: faça o laboratório local abaixo.

Pré-requisitos do teste Microsoft:
1. Tenant **de laboratório**, nunca corporativo.
2. Identidade de teste com licença aplicável e acesso permitido à funcionalidade.
3. Um administrador separado com permissões para configurar atribuições e políticas, conforme o cenário e licenciamento.
4. Acesso de recuperação de emergência previamente verificado. **Não** modifique a única conta de emergência nem aplique uma política de bloqueio nela.
5. Função de **baixo impacto**, apropriada à operação demonstrada. Não use Global Administrator como atalho.

**Registro inicial:** data, tenant fictício/mascarado, usuário, função, situação inicial (nenhuma/elegível/ativa), duração prevista, quem autoriza, risco e plano de reversão. Nunca registre senha, token ou dados pessoais.

## 4. Laboratório A — Microsoft Entra PIM, quando disponível

### Cenário e resultado esperado

**Solicitação INC-1042:** o operador precisa consultar informações administrativas durante 30 minutos. Sua função não deve permanecer ativa depois. O nome da função e a operação precisam ser escolhidos de acordo com o menor privilégio e as permissões reais do tenant.

**Etapa 1 — verificar capacidade.** Acesse [entra.microsoft.com](https://entra.microsoft.com) com a identidade de laboratório. Localize **Identity governance → Privileged Identity Management** (a organização dos menus pode mudar). Verifique a disponibilidade de **Microsoft Entra roles** e as permissões necessárias. Se não estiver disponível, registre a limitação e passe ao laboratório B.

**Etapa 2 — observar o estado inicial.** Na área de funções do PIM, localize **Assignments** ou a visão equivalente e registre se o usuário está sem função, elegível ou ativo. Compare com **Roles and administrators** para compreender a diferença entre atribuição e ativação.

**Etapa 3 — desenhar a política antes de alterar.** Em uma tabela, defina: função mínima, identidade elegível, tempo máximo, exigência de MFA/autenticação forte, justificativa, número da mudança, aprovação (se suportada e viável), alertas e responsável pela revisão. Para o exercício, proponha **30 minutos**; aplique apenas valores aceitos pela interface e pelo tenant.

**Etapa 4 — criar elegibilidade.** Com a identidade administradora apropriada, navegue para **PIM → Microsoft Entra roles → Assignments → Add assignments** (rótulos podem variar). Selecione a função mínima e o usuário de teste. Escolha **Eligible**, não **Active**, se a funcionalidade permitir. Revise o resumo antes de confirmar. Caso a função não possa ser atribuída por licença ou permissão, documente o erro; não amplie direitos apenas para concluir o laboratório.

**Etapa 5 — ajustar a ativação.** Em **Role settings** da função, revise os controles disponíveis: duração máxima, autenticação, justificativa, ticket e aprovação. **Não ative aprovação sem um aprovador de laboratório disponível**, pois isso pode bloquear o próprio exercício. Anote o que a licença e a interface realmente permitem; não afirme ter testado uma condição que não foi aplicada.

**Etapa 6 — testar a ativação.** Entre como usuário elegível, acesse **PIM → My roles → Microsoft Entra roles**, encontre a função e escolha **Activate**. Preencha a justificativa `INC-1042 - consulta administrativa no lab`, o ticket se exigido e a duração permitida. Complete a autenticação adicional ou aguarde a aprovação, se configuradas. **Resultado esperado:** função passa a ativa por período limitado, com evento rastreável.

**Etapa 7 — validar a autorização.** Execute uma operação **somente leitura** permitida pela função escolhida, comparando o acesso **antes**, **durante** e **depois** da ativação. Se a interface tiver latência de propagação, registre os horários e aguarde sem elevar permissões.

**Etapa 8 — investigar os registros.** Procure **PIM audit history / Audit logs** e identifique atribuição, ativação, eventual aprovação, desativação e identidade executora. Registre somente dados sanitizados. Explique a diferença entre evento de administração e evento de sign-in.

**Etapa 9 — teste negativo seguro.** Sem elevar a função, tente novamente a operação controlada e confirme a ausência de privilégio. Alternativamente, provoque **uma falha de justificativa/condição no próprio lab** se a interface suportar e sem comprometer recuperação. Não faça testes de bloqueio em contas reais.

**Etapa 10 — limpar.** Desative a função se houver opção e remova a elegibilidade **criada para o exercício**. Confirme o estado final e registre se o histórico de auditoria permanece. Não remova funções preexistentes.

### Diagnóstico de falhas

| Sintoma | Investigar | Não fazer |
|---|---|---|
| PIM não aparece | Licença, produto, role de administração e tenant | Comprar serviço ou elevar privilégio sem necessidade |
| Função não está em My roles | Elegibilidade, usuário correto, atraso de propagação | Criar atribuição ativa permanente |
| Ativação exige aprovação | Política, aprovador, solicitação pendente | Usar conta de emergência para contornar |
| Operação segue negada | Role adequada, escopo, tempo de propagação, sessão/token | Atribuir Global Administrator |
| Auditoria incompleta | Categoria de log, horário, retenção, filtro e permissões | Inventar evidência |

## 5. Laboratório B — simulação local gratuita e reproduzível

Execute [Laboratório 08 — PIM local com trilha de auditoria](../labs/08-pim-simulador.md). Você vai executar uma máquina de estados **elegível → ativo → expirado**, simular política de justificativa e duração, negar solicitações inválidas e analisar eventos JSON. **É uma simulação didática**, sem alterar roles do Entra, sem sessão privilegiada real e sem representar um substituto de PIM.

## 6. Como decidir em uma empresa

| Situação | Escolha e justificativa |
|---|---|
| Analista consulta logs frequentemente | Role de leitura mínima, possivelmente permanente se risco justificar |
| Alteração administrativa eventual | Elegível + ativação temporária + auditoria |
| Operação sensível com dupla checagem | Elegível + aprovação, quando disponível |
| Conta de emergência | Processo de recuperação próprio, controles e monitoramento; não depender de aprovação que impeça acesso |
| Serviço automatizado | **Não** tratar como usuário ativando PIM; estudar workload identity e credenciais de curta duração |

**Riscos residuais:** comprometimento da conta durante a janela ativa, aprovação indevida, role excessiva, lacunas de logs e ausência de revisão periódica.

## 7. Entrega e avaliação

Crie uma pasta local `evidencias/pim/` **fora de commits públicos** com:
1. `decisao.md`: problema, escolha da role, vantagens, limitações e riscos.
2. `politica.md`: eligible/active, duração, justificativa, autenticação, aprovação e recuperação.
3. `execucao.md`: ambiente, versões, passos, resultado esperado versus observado.
4. `testes.md`: pelo menos **um sucesso**, **duas negações**, causa-raiz e reversão.
5. `auditoria.json`: eventos **fictícios ou sanitizados**, nunca tokens.

**Rubrica (0–2 pontos cada; mínimo 8/10):** conceito, política de menor privilégio, execução reproduzível, diagnóstico de falhas, evidência e rollback. A soma dos cinco critérios é 10. **Não marque como executado no Entra** se fez somente a simulação.

**Desafio sem roteiro:** redesenhe o caso para uma equipe de suporte que precisa de elevação por 15 minutos e explique por que o controle escolhido é suficiente.

## 8. Fontes para conferir a versão atual

- [Microsoft Learn — Privileged Identity Management](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure)
- [Microsoft Learn — Ativar funções do Entra no PIM](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-activate-role)
- [Microsoft Learn — Licenciamento do PIM](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/subscription-requirements)

[Voltar ao currículo](../curriculo.md)
