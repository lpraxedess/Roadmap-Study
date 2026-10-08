# 05 — JML na prática: Active Directory e Microsoft Entra ID

**Fase 1 — Identidade no AD e Entra** · **Tempo:** 60–120 minutos por ambiente · **Tipo:** operação real em diretório de laboratório, sem Docker.

**Missão:** você vai criar João, conceder o grupo Financeiro, transferi-lo para TI e impedir seu acesso depois do desligamento. No final, explica o que fez e prova cada resultado.

## 1. O que é JML e por que importa?

- **Joiner — admissão:** a pessoa chega. IAM cria a conta, registra atributos e concede **somente** os acessos autorizados.
- **Mover — movimentação:** a pessoa muda de função. IAM **remove os acessos antigos** e concede os novos depois da aprovação.
- **Leaver — desligamento:** a pessoa sai. IAM bloqueia novos acessos, revoga sessões quando possível, trata licenças e informações e, **quando a política permitir**, exclui a identidade.

**Por que fazer:** para evitar contas órfãs, permissões acumuladas e acessos após o desligamento. **Benefícios:** menor privilégio, rastreabilidade, gestão padronizada, auditoria. **Limitações:** dados de RH incorretos, propagação de alterações, sistemas que não obedecem ao grupo, sessões existentes e necessidade de retenção.

**Exemplo:** João é contratado para o Financeiro, muda para TI e depois é desligado. O grupo que representa cada departamento será o *controle* da prática. A atribuição de um grupo só vira permissão efetiva se um recurso estiver configurado para usá-lo.

## 2. Escolha seu ambiente (não instale nada novo)

**Trilha A — Active Directory local:** use o Windows Server/AD DS do **seu laboratório**, com a console **Usuários e Computadores do Active Directory** (ADUC, \`dsa.msc\`). Precisa de permissão delegada para criar usuários e administrar grupos na OU de testes.

**Trilha B — Microsoft Entra ID:** use \`https://entra.microsoft.com\` e um tenant **de teste** onde você possa criar usuário *cloud-only* e administrar grupos de segurança. Funções normalmente usadas são User Administrator e Groups Administrator, ou uma delegação suficiente; não se atribua Global Administrator para fazer a aula. **Criar grupos/usuários básicos não requer que você compre P2 para cada usuário**, mas o exercício não deve provisionar serviços que exijam licenças adicionais.

**Escolha uma trilha primeiro.** Se tiver os dois ambientes, realize A e depois B. Se houver sincronização do AD para o Entra, faça mudanças na **origem autoritativa**, não edite atributos sincronizados diretamente nem crie outra conta com a mesma identidade.

### Antes de iniciar — checagem obrigatória

1. Confirme que está em **ambiente de laboratório** autorizado.
2. Use conta separada com direitos adequados; não altere um administrador, conta de emergência, usuário real ou grupo de produção.
3. Decida nomes fictícios: \`joao.jml\`, \`JML-Financeiro\` e \`JML-TI\`. Se já existirem, **pare** e use nomes novos para não afetar objetos anteriores.
4. Registre em um bloco de notas: data, sistema escolhido, OU/tenant de teste, estado inicial (usuários e grupos ainda não existem).
5. Se sua conta não permite executar, registre a permissão faltante e peça acesso **delegado na área de testes**; não contorne uma negação.

---

## 3. Trilha A — fazer no Active Directory (Windows Server)

### A1. Prepare uma OU e os grupos

1. No servidor ou computador com RSAT e acesso ao domínio de laboratório, abra **Executar → \`dsa.msc\`**.
2. Na árvore do domínio, clique com o botão direito na unidade organizacional onde você tem permissão de criar uma OU → **Novo → Unidade Organizacional**. Nomeie \`IAM-Lab\`. Se já houver OU de teste autorizada, reutilize-a.
3. Dentro de \`IAM-Lab\`, botão direito → **Novo → Grupo**. Crie \`JML-Financeiro\` como **Security / Global**.
4. Crie \`JML-TI\` com as mesmas opções.
5. Abra ambos os grupos e confira que ainda não possuem João como membro.

**Resultado:** uma OU dedicada e dois grupos de segurança. Ainda não há usuário.

### A2. JOINER — criar João e conceder Financeiro

1. Clique com o botão direito na OU \`IAM-Lab\` → **Novo → Usuário**.
2. Preencha nome \`Joao\`, sobrenome \`Laboratorio\` e logon \`joao.jml\`. Avance.
3. Defina **uma senha fictícia exclusiva**, atendendo à política de complexidade do domínio. Pode manter “O usuário deve alterar a senha no próximo logon” se conseguir completar essa ação com uma estação do laboratório.
4. Finalize. Na OU, procure \`joao.jml\`.
5. Abra **Propriedades → Membro de (Member Of) → Adicionar**. Digite \`JML-Financeiro\`, pressione **Verificar nomes** e **OK**.
6. Abra o grupo \`JML-Financeiro → Membros\`: João deve estar listado.

**Confirmação:** João existe, está habilitado e pertence a Financeiro. Se tiver estação ingressada no domínio e direitos de logon, faça um login de teste com João e confira a autenticação. **Não** use a única estação administrativa como prova obrigatória.

### A3. MOVER — transferir João para TI

1. Abra \`joao.jml → Propriedades → Membro de\`.
2. Selecione \`JML-Financeiro\` e clique **Remover**. **Não remova Domain Users nem grupos padrão necessários**.
3. Clique **Adicionar**, pesquise \`JML-TI\`, escolha **Verificar nomes → OK**.
4. Se desejar demonstrar atributos, em **Organization / Organização**, altere **Department** para \`TI\` (quando disponível).
5. Confira o usuário e os dois grupos:
   - \`JML-Financeiro\`: João **não** aparece.
   - \`JML-TI\`: João **aparece**.

**Teste negativo:** adicione João **temporariamente** aos dois grupos de laboratório e observe o problema de acúmulo de acesso. Corrija retirando o grupo Financeiro. Se testar uma sessão Windows, lembre-se de que a associação em tokens já emitidos pode exigir novo logon.

### A4. LEAVER — bloquear conta e verificar

1. Na OU \`IAM-Lab\`, clique com o botão direito em \`joao.jml\` → **Desabilitar conta (Disable Account)**.
2. Reabra as propriedades e confirme que a conta está desabilitada.
3. Em estação Windows do **laboratório**, tente **novo** logon como João: deverá ser negado. Não afirme que sessões existentes foram encerradas automaticamente.
4. Registre o estado dos grupos e a ação de bloqueio. Avalie a remoção de grupos específicos conforme a política de desligamento, sem alterar grupos padrão.
5. **Exclusão é opcional:** somente depois de validar o ciclo, selecione o **usuário fictício** e **Excluir (Delete)** se seu laboratório não exigir retenção. Uma conta apagada recebe novo SID se recriada. Não exclua usuários reais.

**Limpeza:** mantenha a OU se ela for reutilizada no curso; caso contrário, exclua **apenas** os dois grupos e objetos fictícios criados para a aula depois de conferir cada nome. Evite exclusão de OU com outros objetos.

### A5. Erros típicos

| O que aconteceu | O que verificar |
|---|---|
| Não consegue criar João | Direitos sobre OU, conexão ao DC, senha e política |
| Grupo não aparece | Domínio, OU, tipo do grupo, nome digitado |
| João ainda tem acesso antigo | Grupo direto/indireto, sessão/token anterior, permissão atribuída fora do grupo |
| Conta desabilitada mas há sessão existente | Bloqueio de novos logons ≠ encerramento automático de sessões |

---

## 4. Trilha B — fazer no Microsoft Entra ID

**Use apenas o tenant de laboratório.** Estas etapas tratam um usuário *cloud-only*. Em ambiente híbrido, objetos sincronizados devem ser administrados na origem AD para os atributos e grupos sincronizados.

### B1. Crie grupos de segurança

1. Acesse [Microsoft Entra admin center](https://entra.microsoft.com).
2. Navegue para **Entra ID → Groups → All groups** (nomes dos menus podem variar).
3. Clique **New group**; escolha **Security**, nome \`JML-Financeiro\`, tipo de associação **Assigned** e **Create**.
4. Repita para \`JML-TI\`.
5. Abra cada grupo e confira que João ainda não é membro. **Não use grupo dinâmico** neste primeiro exercício.

### B2. JOINER — crie o usuário cloud-only

1. Em **Entra ID → Users → All users**, clique **New user → Create new user**.
2. Digite \`joao.jml\` como nome de usuário no **domínio verificado disponível no tenant**. Use nome de exibição \`João JML (LAB)\`.
3. Defina uma senha inicial conforme a interface e mantenha-a privada. Não use endereço de e-mail pessoal real; o UPN deve pertencer a um domínio válido do tenant.
4. Crie o usuário. Pesquise pelo nome e confira **Account enabled / conta habilitada**.
5. Acesse **Groups → All groups → JML-Financeiro → Members → Add members**; localize João e confirme.
6. Confira na aba **Members** que João aparece. No perfil do usuário, observe **Groups**.

**Resultado:** objeto *cloud-only* criado e pertencente ao grupo Financeiro. Isto comprova **atribuição de grupo**; só comprovará acesso a um aplicativo se ele estiver configurado com autorização baseada nesse grupo.

### B3. MOVER — retire grupo antigo e conceda novo

1. Abra **JML-Financeiro → Members**, selecione João e escolha **Remove member**.
2. Abra **JML-TI → Members → Add members**, escolha João e confirme.
3. Opcionalmente atualize \`Department\` (perfil/propriedades) para \`TI\`, se sua função administrativa permitir.
4. Reabra **ambos os grupos** e confirme **presente em TI / ausente em Financeiro**.

**Teste negativo:** adicione João aos dois grupos **somente em seu tenant de laboratório**, confira o erro de privilégio acumulado e remova Financeiro novamente. Não atribua roles administrativas para demonstrar grupos.

### B4. LEAVER — bloqueio de login e sessões

1. Em **Entra ID → Users → All users**, abra João.
2. Use **Block sign-in** ou ajuste **Account enabled = No**, conforme a versão da interface, e confirme.
3. Se disponível, execute **Revoke sessions / Revoke sign-in sessions** na página do usuário. Entenda que tokens já emitidos podem continuar válidos até expirar ou conforme o comportamento do serviço.
4. Verifique que o usuário aparece com entrada bloqueada. **Não é obrigatório testar login** em aplicativo que exija licença inexistente; a alteração do estado da conta e os registros de auditoria já comprovam a operação administrativa.
5. Abra **Audit logs**, se sua função permitir, e pesquise eventos de alteração de usuário/membership.
6. **Exclusão opcional:** apenas para \`joao.jml\` criado nesta aula, e somente após salvar evidência e avaliar retenção. A operação remove o objeto; não apague outros usuários.

### B5. Troubleshooting

| Sintoma | Verifique antes de agir |
|---|---|
| “Create user” não aparece | Role e escopo administrativos, tenant correto |
| UPN inválido | Domínio permitido pelo tenant e unicidade |
| Grupo não aceita João | Grupo de segurança atribuído, permissão de gerenciamento, regras de associação |
| João ainda consegue usar app | Sessões/tokens existentes, propagação, aplicativo não integrado, acesso externo ao grupo |
| Não encontra “Revoke sessions” | Interface, função administrativa, disponibilidade e registros disponíveis |

---

## 5. Qual trilha é correta em ambiente híbrido?

Quando **AD DS é a origem do usuário sincronizado para o Entra**:

1. Faça **Joiner, Mover e Leaver no AD**, na OU e nos grupos efetivamente sincronizados (se configurados).
2. Espere o ciclo de sincronização já configurado. Monitore o status em Entra Connect e no objeto em nuvem.
3. Compare o que mudou no AD e no Entra; não crie **outro** usuário cloud-only para representar a mesma pessoa.
4. Bloqueio e revogação de sessões de aplicações cloud também precisam ser considerados conforme arquitetura. **Uma alteração on-prem não significa revogação instantânea de todos os tokens cloud.**

## 6. Verificação e evidências

| Evento | Prova mínima |
|---|---|
| Joiner | Objeto João existe e pertence a Financeiro |
| Mover | Não pertence mais a Financeiro; pertence a TI |
| Leaver | Conta desabilitada; novas autenticações negadas quando possível testar |
| Auditoria | Quem alterou, quando e qual ação (sem senhas ou tokens) |
| Retenção | Decisão fundamentada: manter desabilitada ou excluir objeto fictício |

**Desafio sem roteiro:** repita com \`maria.jml\`, mudando de TI para Financeiro e depois desabilitando. Registre quais etapas dependem do AD, Entra ou sincronização.

### 7. Depois da prática manual

Só então faça [Laboratório 07 — automação JML em Python (dry-run)](../labs/07-jml-python.md). Ele serve para planejar mudanças e detectar entradas inválidas — **não substitui o processo real de criar e administrar contas**.

### Referências oficiais

- [Microsoft Learn — Gerenciar contas e grupos no AD DS](https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/manage-user-accounts-in-windows-server)
- [Microsoft Learn — Gerenciar usuários no Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users)
- [Microsoft Learn — Gerenciar grupos no Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups)

[Ver fases da formação](../curriculo.md)
