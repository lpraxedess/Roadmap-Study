# 🛡️ IAM Study Lab — Entra ID do básico ao avançado

> **Método:** faça o passo indicado → valide o resultado → leia o **Por quê** → provoque uma falha → investigue → corrija → revogue → registre a evidência.

## 🧭 Ordem do laboratório

| # | Módulo | Entrega prática |
|---|---|---|
| 01 | Ambiente | laboratório isolado e econômico |
| 02 | IAM Fundamentals | modelo de identidade e acesso |
| 03 | Active Directory | domínio, OUs, grupos e GPO |
| 04 | Entra — usuários e grupos | identidades cloud |
| 05 | RBAC | acesso por função e escopo |
| 06 | MFA + Conditional Access | autenticação baseada em risco/condição |
| 07 | Logs + troubleshooting | investigação por evidência |
| 08 | SSO — OIDC | aplicação integrada ao Entra |
| 09 | SAML | federação com aplicação de teste |
| 10 | App Registration | identidade de aplicação |
| 11 | Graph + PowerShell | automação de IAM |
| 12 | SCIM + provisioning | ciclo de conta em aplicação |
| 13 | JML | Joiner, Mover, Leaver |
| 14 | Access Reviews | recertificação |
| 15 | PIM | privilégio just-in-time |
| 16 | B2B | identidade externa |
| 17 | Workload Identity | identidade não humana |
| 18 | Hybrid Identity | AD + Entra |
| 19 | IGA + RBAC/SoD | governança e segregação |
| 20 | PAM + Teleport CE | acesso privilegiado |
| 21 | Cloud IAM | comparação com AWS IAM |
| 22 | ITSM + Auditoria | processo corporativo |
| 23 | Projeto final | ambiente IAM integrado |

---

# 01 — AMBIENTE

## Resultado

Você terá três VMs, mas **não precisa mantê-las ligadas simultaneamente**.

| Máquina | IP | Função | Ligar quando |
|---|---:|---|---|
| `LAB-DC01` | `192.168.56.10` | AD DS + DNS | AD/Hybrid |
| `LAB-TELEPORT` | `192.168.56.20` | Teleport CE | PAM |
| `LAB-LINUX01` | `192.168.56.30` | servidor SSH | PAM |

Entra ID fica na nuvem. Use **uma única conta licenciada P2** somente nos exercícios que realmente exigirem recurso P2.

## PASSO 1 — Criar rede isolada

1. Abra **VirtualBox**.
2. Vá em **File → Tools → Network Manager**.
3. Abra **Host-only Networks**.
4. Clique **Create**.
5. Selecione `vboxnet0`.
6. Configure IPv4 `192.168.56.1`.
7. Máscara `255.255.255.0`.
8. Desative **DHCP Server**.

### Por quê?

O laboratório precisa de IPs previsíveis. Quando o AD for configurado, o DNS do domínio deverá ser controlado pelo laboratório. Um DHCP adicional pode entregar DNS incorreto e causar problemas de domínio.

## PASSO 2 — Conectar cada VM

Para cada VM:

**Settings → Network → Adapter 1**

- Enable Network Adapter: marcado
- Attached to: **Host-only Adapter**
- Name: `vboxnet0`

Durante instalação/updates, você pode usar **Adapter 2 → NAT**.

Depois remova/desative o NAT quando não precisar de Internet.

### Por quê?

Host-only mantém as VMs em uma rede privada entre host e laboratório. NAT fornece saída para Internet sem colocar a VM diretamente na rede corporativa/doméstica.

## PASSO 3 — Criar snapshots

Depois da instalação limpa de cada VM:

**VirtualBox → VM → Snapshots → Take**

Nome:

`01-clean-install`

Antes de mudanças grandes, crie outro snapshot.

### O que você aprendeu

Segmentação, endereçamento, isolamento, NAT, snapshot e recuperação rápida.

---

# 02 — IAM FUNDAMENTALS

## Cenário

Uma empresa precisa garantir que uma pessoa tenha somente o acesso necessário.

## PASSO 1 — Criar o modelo

Crie `docs/iam-model.md` no repositório.

Desenhe:

`Pessoa → Identidade → Autenticação → Autorização → Role → Entitlement → Recurso → Log → Revisão → Revogação`

## PASSO 2 — Definir os termos

Escreva uma frase para cada item:

- identidade;
- conta;
- credencial;
- autenticação;
- autorização;
- role;
- entitlement;
- privilégio;
- identidade humana;
- identidade não humana.

### Por quê?

Esses termos aparecem diariamente em IAM. Se você confundir autenticação com autorização, terá dificuldade para entender Entra, SSO, RBAC e PAM.

## PASSO 3 — Aplicar ao laboratório

Use este exemplo:

`Ana → conta Entra → MFA → Reader → Resource Group → log → Access Review → remoção`

### O que você aprendeu

Você acabou de modelar um ciclo de acesso real.

---

# 03 — ACTIVE DIRECTORY

## Resultado

`lab.local` funcionando com OUs, usuários, grupos e uma GPO.

## PASSO 1 — Criar `LAB-DC01`

VirtualBox → **New**:

- Name: `LAB-DC01`
- Tipo: Windows Server
- RAM: 4 GB se disponível
- CPU: 2 vCPU
- Disco: 50 GB dinâmico
- Adapter 1: `vboxnet0`

Instale Windows Server.

## PASSO 2 — Definir IP

Windows → **Network Connections → Adapter → Properties → IPv4**.

Configure:

- IP: `192.168.56.10`
- Mask: `255.255.255.0`
- Gateway: vazio
- DNS: temporariamente `192.168.56.10` após o DNS estar instalado

### Por quê?

O AD depende fortemente de DNS. O controlador de domínio deve possuir endereço previsível.

## PASSO 3 — Instalar AD DS

1. Abra **Server Manager**.
2. **Manage → Add Roles and Features**.
3. **Role-based or feature-based installation**.
4. Selecione `LAB-DC01`.
5. Marque **Active Directory Domain Services**.
6. **Add Features → Install**.
7. Após concluir, clique na notificação.
8. **Promote this server to a domain controller**.
9. Selecione **Add a new forest**.
10. Root domain: `lab.local`.
11. Defina uma senha DSRM forte.
12. Avance até **Install**.
13. Reinicie.

### Por quê?

Aqui você transforma o Windows Server em autoridade do domínio. AD DS armazenará identidades, grupos e objetos usados nos próximos exercícios.

## PASSO 4 — Validar

Abra PowerShell como administrador:

`Get-ADDomain`

`Get-ADForest`

`nslookup lab.local`

### Resultado esperado

O domínio e a floresta aparecem e o DNS resolve `lab.local`.

## PASSO 5 — Criar OUs

Abra **Active Directory Users and Computers**.

No domínio → botão direito → **New → Organizational Unit**.

Crie:

- `Users`
- `Groups`
- `Workstations`
- `Servers`
- `ServiceAccounts`

### Por quê?

OU cria organização lógica e permite aplicar GPOs/delegações por escopo.

## PASSO 6 — Criar usuários

Crie:

- `LAB-ANA`
- `LAB-JOAO`
- `LAB-ADMIN`

Crie grupos de segurança:

- `GG-FINANCE`
- `GG-IT`
- `GG-READONLY`

Adicione `LAB-ANA` a `GG-FINANCE`.

## PASSO 7 — Validar associação

Em uma máquina ingressada no domínio, faça login com `LAB-ANA`.

Execute:

`whoami`

`whoami /groups`

### Resultado esperado

O usuário e o grupo aparecem na sessão.

### Por quê?

Você está vendo na prática como grupos participam da autorização no ambiente Windows.

## PASSO 8 — Criar GPO

1. Abra **Group Policy Management**.
2. Selecione a OU `Workstations`.
3. **Create a GPO in this domain, and Link it here**.
4. Nome: `GPO-LAB-BASELINE`.
5. Configure uma política simples, como bloqueio de tela.
6. Na estação, execute:

`gpupdate /force`

`gpresult /r`

### Resultado esperado

A estação recebe a GPO.

### O que você aprendeu

AD DS, DNS, domínio, OU, grupo, usuário, GPO e autenticação de domínio.

---

# 04 — ENTRA ID: USUÁRIOS E GRUPOS

## PASSO 1 — Criar usuário

Acesse **Microsoft Entra admin center → Entra ID → Users → New user → Create new user**.

Crie:

`LAB-ANA`

Use um UPN do seu tenant.

Não atribua licença P2 a ela.

### Por quê?

A conta sem licença será usada nos testes comuns. A licença P2 ficará reservada para os cenários que realmente precisam dela.

## PASSO 2 — Criar grupo

**Entra ID → Groups → New group**.

Configure:

- Group type: `Security`
- Name: `GRP-FINANCE-LAB`

Adicione `LAB-ANA`.

### Por quê?

O grupo será o objeto ao qual você poderá associar acesso, evitando permissões individuais.

## PASSO 3 — Validar

Abra o usuário → **Groups**.

Confirme `GRP-FINANCE-LAB`.

### O que você aprendeu

Identidade cloud, grupo de segurança e associação de identidade.

---

# 05 — RBAC

## Cenário

Ana precisa consultar recursos, mas não pode alterá-los.

## PASSO 1 — Criar escopo

Azure Portal → **Resource groups → Create**.

Nome:

`rg-iam-lab`

### Por quê?

RBAC funciona por escopo. Vamos conceder acesso somente a este Resource Group.

## PASSO 2 — Conceder Reader

Abra `rg-iam-lab` → **Access control (IAM) → Add → Add role assignment**.

Selecione:

`Reader`

Membro:

`LAB-ANA`

Conclua.

### Por quê?

Reader permite leitura sem conceder permissões de alteração. Isso demonstra least privilege.

## PASSO 3 — Testar como Ana

Abra uma janela anônima → `https://portal.azure.com` → entre como Ana.

Tente:

1. abrir `rg-iam-lab`;
2. visualizar recursos;
3. criar/alterar um recurso, se houver recurso de teste.

### Resultado esperado

Leitura permitida; operação sem permissão de escrita negada.

## PASSO 4 — Aumentar privilégio

Volte para o administrador.

IAM → remova `Reader` → atribua `Contributor` no mesmo Resource Group.

Repita o teste.

### O que mudou?

A identidade é a mesma. O resultado mudou porque a autorização mudou.

## PASSO 5 — Revogar

Remova `Contributor`.

Teste novamente como Ana.

### O que você aprendeu

`Principal → Role → Permission → Scope → Resource`.

---

# 06 — MFA + CONDITIONAL ACCESS

## Cenário

Ana deve usar MFA para acessar aplicações cloud.

## PASSO 1 — Registrar método de autenticação

Entre como Ana e registre um método disponível no tenant.

### Por quê?

Conditional Access pode exigir uma autenticação adicional.

## PASSO 2 — Criar política em Report-only

Entra admin center → **Protection → Conditional Access → Policies → New policy**.

Nome:

`CA-LAB-MFA-ANA`

Users → somente `LAB-ANA`.

Target resources → selecione os recursos necessários ao teste.

Grant → requisito de MFA.

State → **Report-only**.

### Por quê?

Report-only permite observar o resultado sem bloquear o acesso durante a primeira validação.

## PASSO 3 — Gerar login

Faça login com Ana.

Acesse **Entra → Monitoring & health → Sign-in logs**.

Abra o evento → **Conditional Access**.

### Resultado esperado

Você consegue identificar se a política teria sido aplicada.

## PASSO 4 — Ativar

Depois de validar, altere a política para **On**.

Faça novo login.

### Resultado esperado

O fluxo exige MFA conforme as condições configuradas.

## PASSO 5 — Criar uma falha controlada

Altere temporariamente uma condição da política de laboratório para produzir um resultado diferente.

Gere novo login e compare os eventos.

Depois restaure a configuração.

### O que você aprendeu

MFA, Conditional Access, Report-only, política por usuário e análise de autenticação.

---

# 07 — LOGS + TROUBLESHOOTING

## PASSO 1 — Gerar eventos

Produza:

1. login permitido;
2. login com MFA;
3. operação negada por RBAC;
4. alteração de configuração.

## PASSO 2 — Investigar login

Entra → **Monitoring & health → Sign-in logs**.

Observe:

- usuário;
- horário;
- aplicação;
- IP;
- resultado;
- autenticação;
- Conditional Access.

## PASSO 3 — Investigar alteração

Abra **Audit logs**.

Localize a operação feita no laboratório.

### Por quê?

Sign-in Logs mostram autenticação; Audit Logs mostram alterações e operações administrativas.

## PASSO 4 — Documentar

Crie:

`docs/incidents/INC-001.md`

Use:

`Sintoma → Evidência → Causa → Correção → Validação → Prevenção`

### O que você aprendeu

Troubleshooting baseado em evidência, não em tentativa e erro.

---

# 08 — SSO COM OIDC

## Cenário

Uma aplicação de laboratório deve autenticar usuários pelo Entra.

## PASSO 1 — Escolher aplicação

Use uma aplicação própria de laboratório que suporte OpenID Connect.

## PASSO 2 — Registrar aplicação

Entra → **App registrations → New registration**.

Nome:

`APP-OIDC-LAB`

Configure a Redirect URI exatamente conforme a documentação da aplicação.

### Por quê?

A Redirect URI é parte do trust entre aplicação e provedor de identidade.

## PASSO 3 — Configurar OIDC

Na aplicação informe os dados necessários:

- Client ID;
- Issuer/Tenant;
- Redirect URI;
- scopes;
- claims.

## PASSO 4 — Testar

1. Abra a aplicação.
2. Clique login.
3. Seja redirecionado ao Entra.
4. Autentique.
5. Retorne à aplicação.
6. Confirme a identidade exibida.

### Resultado esperado

A aplicação autentica pelo Entra sem armazenar a senha do usuário.

## PASSO 5 — Quebrar

Altere propositalmente a Redirect URI para uma incorreta.

Teste novamente.

### Resultado esperado

O fluxo falha por incompatibilidade de configuração.

Restaure a URI correta.

### O que você aprendeu

IdP, OIDC, redirect URI, scopes, claims e troubleshooting de SSO.

---

# 09 — SAML

## PASSO 1 — Escolher aplicação SAML

Use uma aplicação de laboratório que aceite SAML 2.0.

## PASSO 2 — Criar Enterprise Application

Entra → **Enterprise applications → New application**.

Adicione uma aplicação não-galeria apropriada ao teste ou uma aplicação de laboratório compatível.

## PASSO 3 — Configurar SSO

Abra **Single sign-on → SAML**.

Identifique e configure:

- Identifier/Entity ID;
- Reply URL/ACS;
- Sign-on URL;
- claims;
- certificado.

### Por quê?

SAML usa uma assertion emitida pelo IdP para informar à aplicação que a identidade foi autenticada.

## PASSO 4 — Testar

Faça login na aplicação.

Confirme o acesso.

## PASSO 5 — Investigar

Analise os dados de configuração e identifique:

`IdP → Assertion → ACS → aplicação`

### O que você aprendeu

SAML, IdP, SP, assertion, ACS, Entity ID e claims.

---

# 10 — APP REGISTRATION + SERVICE PRINCIPAL

## PASSO 1 — Registrar aplicação

Entra → **App registrations → New registration**.

Nome:

`APP-IAM-AUTOMATION`

Anote:

- Application/Client ID;
- Directory/Tenant ID.

## PASSO 2 — Localizar Service Principal

Entra → **Enterprise applications** → localize `APP-IAM-AUTOMATION`.

### Por quê?

App Registration representa a definição da aplicação; o Service Principal é a identidade dessa aplicação no tenant.

## PASSO 3 — Criar credencial temporária

Use uma credencial somente para laboratório e com validade curta.

Guarde o segredo fora do Git.

### Regra

Nunca publique:

- client secret;
- private key;
- token;
- senha.

## PASSO 4 — Testar

Use a identidade da aplicação para executar somente uma operação de laboratório permitida.

## PASSO 5 — Revogar

Remova a credencial após o teste.

### O que você aprendeu

Identidade de aplicação, Service Principal, credencial e princípio de menor privilégio.

---

# 11 — MICROSOFT GRAPH + POWERSHELL

## Cenário

Você recebeu 3 usuários para onboarding.

## PASSO 1 — Criar CSV

Crie `users.csv` com dados fictícios.

Campos:

`displayName,userPrincipalName`

Inclua três usuários de laboratório.

## PASSO 2 — Instalar Graph

PowerShell:

`Install-Module Microsoft.Graph -Scope CurrentUser`

## PASSO 3 — Autenticar

Conecte ao Microsoft Graph usando somente os scopes necessários.

### Por quê?

Permissões excessivas em automação são risco de segurança.

## PASSO 4 — Automatizar criação

Faça um script que:

1. lê CSV;
2. valida dados;
3. cria usuário;
4. adiciona ao grupo correto;
5. registra sucesso/erro;
6. não grava senha em log.

## PASSO 5 — Testar primeiro com 1 usuário

Valide no portal.

Depois execute para os três.

## PASSO 6 — Criar revogação

Crie outro script que:

1. recebe UPN;
2. bloqueia a conta;
3. registra data/hora;
4. registra resultado.

### O que você aprendeu

PowerShell, Graph, escopo de permissão, automação, idempotência básica e logging.

---

# 12 — SCIM + PROVISIONING

## Cenário

O Entra deve criar e desativar contas automaticamente em uma aplicação compatível com SCIM.

## PASSO 1 — Preparar aplicação

Use uma aplicação de laboratório que ofereça endpoint SCIM.

## PASSO 2 — Configurar provisioning

Enterprise Application → **Provisioning**.

Configure o endpoint e a autenticação conforme a aplicação.

### Por quê?

SCIM padroniza operações de identidade entre o IdP/IGA e aplicações.

## PASSO 3 — Mapear atributos

Mapeie, conforme o alvo:

- userName;
- displayName;
- givenName;
- surname;
- active.

## PASSO 4 — Testar criação

Atribua Ana à aplicação.

Execute provisioning.

### Resultado esperado

A conta aparece no sistema de destino.

## PASSO 5 — Testar desprovisioning

Remova Ana da atribuição.

Execute o ciclo de provisioning.

### Resultado esperado

O estado da conta no destino muda conforme a configuração de desprovisionamento.

### O que você aprendeu

Provisioning, deprovisioning, mapeamento de atributos e SCIM.

---

# 13 — JML

## Cenário

Simular o ciclo de vida de um funcionário.

## PASSO 1 — JOINER

Crie:

`LAB-CARLA`

Cargo:

`Finance Analyst`

Atribua ao grupo:

`GRP-FINANCE-LAB`

### Resultado

Carla possui a identidade e os acessos iniciais definidos para o cargo.

### O que você aprendeu

**Joiner:** entrada da identidade no ambiente.

## PASSO 2 — MOVER

Altere o cenário:

`Finance → IT`

Remova:

`GRP-FINANCE-LAB`

Adicione:

`GRP-IT-LAB`

### Por quê?

Mover não é apenas adicionar o novo acesso. O acesso antigo deve ser analisado e removido quando não for mais necessário.

### Resultado

Carla passa a ter o conjunto de acesso correspondente ao novo cargo.

## PASSO 3 — LEAVER

Simule desligamento.

Execute:

1. bloquear conta;
2. remover atribuições de aplicação;
3. remover privilégios;
4. revogar sessões quando aplicável;
5. registrar data/hora;
6. guardar evidência.

### Resultado

Carla não deve continuar utilizando os acessos corporativos.

### O que você aprendeu

JML, ciclo de vida e revogação.

---

# 14 — ACCESS REVIEWS

## Pré-requisito

Use a conta/licença P2 somente no cenário compatível com a licença disponível no tenant. Confirme a capacidade no portal antes de iniciar.

## Cenário

Ana possui acesso a um grupo. Um gestor precisa confirmar se ela ainda precisa dele.

## PASSO 1 — Preparar grupo

Crie:

`GRP-ACCESS-REVIEW-LAB`

Adicione Ana.

## PASSO 2 — Criar Access Review

Entra → **Identity Governance → Access Reviews**.

Crie uma revisão para o grupo/aplicação disponível no tenant.

Defina:

- reviewer;
- duração;
- decisão;
- comportamento após não resposta, quando disponível.

### Por quê?

Access Review responde: **“este acesso ainda é necessário?”**

## PASSO 3 — Aprovar

Como reviewer, mantenha o acesso de Ana.

## PASSO 4 — Repetir e negar

Execute nova revisão.

Desta vez, rejeite o acesso.

### Resultado esperado

O acesso é removido conforme a configuração da revisão.

## PASSO 5 — Registrar evidência

Salve:

- período;
- reviewer;
- usuário;
- decisão;
- resultado.

### O que você aprendeu

Recertificação, ownership, evidência e governança de acesso.

---

# 15 — PIM

## Regra do laboratório

**Não crie uma licença por usuário.** Use sua única licença P2 de forma controlada e remova a atribuição depois do exercício quando aplicável.

## Cenário

Você é administrador, mas não quer permanecer permanentemente privilegiado.

## PASSO 1 — Identificar a conta P2

Use uma identidade de laboratório licenciada com P2.

Não transforme a conta pessoal principal em conta de teste se isso comprometer sua administração.

## PASSO 2 — Abrir PIM

Entra → **ID Governance / Privileged Identity Management**.

Escolha o recurso que será testado.

## PASSO 3 — Criar atribuição elegível

Configure a conta como **eligible**, quando a capacidade/licença do tenant permitir.

### Por quê?

Eligible significa que o privilégio não fica ativo permanentemente.

## PASSO 4 — Ativar

Com a conta de laboratório:

1. abra PIM;
2. localize a role;
3. clique em **Activate**;
4. informe justificativa;
5. conclua os requisitos apresentados.

### Resultado esperado

A role fica ativa por tempo limitado conforme a política.

## PASSO 5 — Testar antes e depois

Antes da ativação, tente executar uma ação que exige a role.

Depois da ativação, repita.

### Resultado esperado

A capacidade administrativa aparece somente durante a ativação.

## PASSO 6 — Verificar histórico

Consulte o histórico de ativações.

### O que você aprendeu

Privilégio elegível, JIT, ativação, justificativa, duração e auditoria.

---

# 16 — B2B

## Cenário

Um consultor externo precisa colaborar sem virar usuário interno comum.

## PASSO 1 — Criar convidado

Entra → **Users → New user → Invite external user**.

Use uma conta externa controlada por você.

### Por quê?

B2B permite colaboração com identidades externas mantendo o contexto de guest.

## PASSO 2 — Conceder somente o acesso necessário

Adicione o guest somente ao grupo/recurso de teste.

## PASSO 3 — Testar

Entre como convidado e confirme o recurso permitido.

## PASSO 4 — Revogar

Remova o convidado do grupo e/ou exclua a identidade conforme o cenário.

### O que você aprendeu

Guest identity, colaboração externa, escopo e revogação.

---

# 17 — WORKLOAD IDENTITY

## Cenário

Uma aplicação precisa acessar um recurso sem utilizar usuário humano.

## PASSO 1 — Criar identidade de aplicação

Use uma App Registration/Service Principal de laboratório.

## PASSO 2 — Conceder somente a permissão necessária

Associe a identidade ao recurso com o menor escopo possível.

### Por quê?

Aplicações também são identidades. Uma aplicação comprometida pode abusar de permissões excessivas.

## PASSO 3 — Testar

Execute a operação autorizada.

## PASSO 4 — Testar operação não autorizada

Tente uma operação fora do escopo.

### Resultado esperado

A operação deve falhar.

## PASSO 5 — Remover acesso

Retire a atribuição.

### O que você aprendeu

Workload identity, Service Principal e least privilege para identidades não humanas.

---

# 18 — HYBRID IDENTITY

## Cenário

A empresa possui AD local e Entra ID.

## PASSO 1 — Preparar AD

Use `LAB-DC01` com `lab.local`.

Crie usuários de laboratório.

## PASSO 2 — Preparar domínio/UPN

Configure um domínio/UPN de laboratório compatível com o tenant de teste quando necessário.

### Por quê?

A identidade precisa ter uma correspondência coerente entre diretório local e cloud.

## PASSO 3 — Instalar ferramenta de sincronização

Instale o método de sincronização suportado pela documentação atual da Microsoft para seu cenário de laboratório.

Escolha escopo limitado ao OU de laboratório.

### Por quê?

Você não deve sincronizar objetos desnecessários.

## PASSO 4 — Sincronizar um usuário

Comece com apenas `LAB-ANA`.

### Resultado esperado

A identidade aparece no Entra como sincronizada.

## PASSO 5 — Alterar atributo local

Altere um atributo controlado pelo AD.

Execute a sincronização.

### Resultado esperado

A alteração chega ao Entra.

### O que você aprendeu

Source of authority, sincronização, identidade híbrida e troubleshooting.

---

# 19 — IGA + RBAC + SoD

## Cenário

Financeiro possui dois privilégios que não devem pertencer à mesma pessoa.

## PASSO 1 — Definir roles

Crie o modelo:

`FIN-REQUESTER`

`FIN-APPROVER`

## PASSO 2 — Definir conflito

Regra:

`FIN-REQUESTER + FIN-APPROVER = conflito`

### Por quê?

Uma pessoa que cria e aprova a própria operação pode gerar risco de fraude.

## PASSO 3 — Criar matriz

Crie `docs/iga/role-matrix.md`:

| Role | Permissão | Área | Conflita com |
|---|---|---|---|
| FIN-REQUESTER | criar solicitação | Finance | FIN-APPROVER |
| FIN-APPROVER | aprovar | Finance | FIN-REQUESTER |

## PASSO 4 — Simular solicitação

Ana recebe `FIN-REQUESTER`.

Depois tente conceder `FIN-APPROVER`.

Registre a violação.

## PASSO 5 — Tratar exceção

Documente:

- conflito;
- risco;
- aprovador;
- justificativa;
- prazo;
- compensação.

### O que você aprendeu

IGA, role engineering, SoD, exceção e governança.

---

# 20 — PAM COM TELEPORT COMMUNITY EDITION

## Cenário

Um administrador precisa acessar `LAB-LINUX01` por SSH sem compartilhar uma senha privilegiada.

## PASSO 1 — Criar `LAB-LINUX01`

VirtualBox → New:

- Nome: `LAB-LINUX01`
- Linux
- 2 GB RAM
- 1–2 vCPU
- 20 GB disco
- Adapter: `vboxnet0`

IP:

`192.168.56.30`

Instale OpenSSH.

## PASSO 2 — Criar `LAB-TELEPORT`

Crie outra VM Linux:

`LAB-TELEPORT`

IP:

`192.168.56.20`

Instale o Teleport Community Edition conforme a documentação oficial atual.

### Por quê?

Teleport permite praticar controle de acesso e acesso auditável a recursos sem precisar de uma plataforma PAM comercial.

## PASSO 3 — Registrar o servidor

Configure `LAB-LINUX01` como recurso/servidor gerenciado pelo Teleport conforme a versão instalada.

## PASSO 4 — Criar identidade de teste

Crie uma identidade de laboratório com acesso somente ao servidor necessário.

## PASSO 5 — Acessar

Faça login pelo fluxo do Teleport.

Execute:

`whoami`

`hostname`

`id`

### Resultado esperado

Você acessa o servidor pelo caminho controlado pelo Teleport.

## PASSO 6 — Negar acesso

Remova o usuário do grupo/role que permite o acesso.

Tente novamente.

### Resultado esperado

O acesso é negado.

## PASSO 7 — Investigar

Consulte os eventos/auditoria disponíveis na instalação.

Identifique:

- usuário;
- recurso;
- horário;
- sessão;
- ação.

### O que você aprendeu

PAM, acesso privilegiado, RBAC, sessão e auditoria.

> **Importante:** Teleport Community Edition é um laboratório de PAM/access proxy, não uma réplica completa das capacidades comerciais de CyberArk, Delinea ou BeyondTrust.

---

# 21 — CLOUD IAM

## Cenário

Comparar o modelo de identidade do Azure com AWS.

## PASSO 1 — Criar usuário/role de laboratório na AWS

Utilize somente uma conta gratuita/de laboratório e evite criar credenciais permanentes quando uma alternativa temporária existir.

## PASSO 2 — Criar role de leitura

Crie uma role/policy de leitura com escopo limitado.

### Por quê?

O conceito é equivalente ao exercício RBAC do Azure: conceder somente o necessário.

## PASSO 3 — Testar

Faça uma operação de leitura.

Depois tente alteração.

### Resultado esperado

Leitura funciona; alteração é negada.

## PASSO 4 — Comparar

Documente:

| Conceito | Azure | AWS |
|---|---|---|
| Identidade | Entra user/service principal | IAM identity/role |
| Autorização | RBAC | IAM policy |
| Escopo | management group/subscription/resource group/resource | account/resource/policy conditions |
| MFA | Entra/CA | IAM/Identity Center |

### O que você aprendeu

O conceito de IAM é maior que uma ferramenta específica.

---

# 22 — ITSM + AUDITORIA

## Cenário

Um usuário solicita acesso a uma aplicação.

## PASSO 1 — Criar chamado fictício

Crie:

`docs/itsm/REQ-001.md`

Campos:

- solicitante;
- usuário afetado;
- aplicação;
- acesso solicitado;
- justificativa;
- aprovador;
- data;
- resultado.

## PASSO 2 — Simular aprovação

A solicitação deve passar por aprovação antes da concessão.

### Por quê?

IAM corporativo não deve depender apenas de uma ação administrativa sem rastreabilidade.

## PASSO 3 — Conceder

Aplique a role/grupo correspondente.

Registre a alteração.

## PASSO 4 — Auditar

Responda:

> Quem pediu?

> Quem aprovou?

> Quem concedeu?

> O que foi concedido?

> Quando?

> Por quanto tempo?

> Como provar?

## PASSO 5 — Revogar

Remova o acesso.

Registre evidência.

### O que você aprendeu

ITSM, approval, evidência, auditoria e rastreabilidade.

---

# 23 — PROJETO FINAL

## Cenário

Você foi contratado para implementar o IAM de uma empresa fictícia.

### Estrutura

`RH`

↓

`Identidade`

↓

`AD / Entra`

↓

`Grupo / Role`

↓

`Aprovação`

↓

`SoD`

↓

`Provisioning`

↓

`Aplicação`

↓

`Access Review`

↓

`PIM/PAM`

↓

`Logs / Auditoria`

## PASSO 1 — Criar departamentos

Crie:

- Finance;
- IT;
- HR.

## PASSO 2 — Criar usuários

Crie pelo menos:

- `ANA-FIN`
- `JOAO-IT`
- `CARLA-HR`
- `ADMIN-IAM`

## PASSO 3 — Criar grupos

Crie:

- `GRP-FINANCE`
- `GRP-IT`
- `GRP-HR`
- `GRP-IAM-READONLY`

## PASSO 4 — Criar roles

Defina o que cada grupo pode fazer.

Documente em:

`docs/architecture/role-matrix.md`

## PASSO 5 — Implementar MFA

Proteja as identidades de laboratório com Conditional Access.

## PASSO 6 — Implementar RBAC

Conceda acesso por grupo e escopo.

## PASSO 7 — Implementar JML

Simule:

`Joiner → Mover → Leaver`

## PASSO 8 — Implementar SSO

Integre uma aplicação OIDC ou SAML.

## PASSO 9 — Automatizar

Use PowerShell + Graph para criar e revogar usuários.

## PASSO 10 — Recertificar

Faça Access Review do grupo escolhido.

## PASSO 11 — Privilégio

Use PIM para uma função administrativa quando disponível pela licença do laboratório.

## PASSO 12 — PAM

Acesse `LAB-LINUX01` através do Teleport.

## PASSO 13 — Auditoria

Produza evidências de:

- criação;
- alteração;
- concessão;
- autenticação;
- privilégio;
- revisão;
- revogação.

---

# 🧪 TESTE FINAL — CENÁRIO DE ENTREVISTA

Sem consultar o manual, execute este cenário.

## Situação

`Maria` entrou na empresa como Analista Financeiro.

Ela precisa:

- acessar aplicação financeira;
- consultar recursos Azure;
- usar MFA;
- não possuir privilégio administrativo;
- posteriormente mudar para IT;
- perder os acessos antigos;
- ter o novo acesso revisado;
- eventualmente solicitar privilégio temporário.

## Você deve executar

1. Criar identidade.
2. Criar/usar grupo.
3. Aplicar role.
4. Configurar MFA/CA.
5. Integrar aplicação.
6. Registrar logs.
7. Mover Maria de Finance para IT.
8. Remover acessos antigos.
9. Conceder novos acessos.
10. Executar Access Review.
11. Simular privilégio PIM.
12. Desligar Maria.
13. Revogar tudo.
14. Produzir evidências.

### Resultado esperado

Você consegue explicar e demonstrar todo o ciclo:

`Identity → Authentication → Authorization → Provisioning → Governance → Privilege → Audit → Revocation`

---

# 📁 ESTRUTURA DO PORTFÓLIO

Use uma estrutura simples:

`01-IAM/`

`├── IAM-Study-Lab.md`

`├── docs/`

`│   ├── architecture/`

`│   ├── incidents/`

`│   ├── iga/`

`│   └── itsm/`

`├── scripts/`

`│   ├── powershell/`

`│   └── graph/`

└── evidencias/`

Nunca publique:

- senhas;
- tokens;
- secrets;
- private keys;
- dados pessoais reais.

---

# ✅ CHECKPOINT DE EVOLUÇÃO

Não avance apenas porque terminou os passos.

| Nível | Você consegue... |
|---|---|
| 🟢 Básico | criar identidade, grupo e acesso |
| 🔵 Júnior | explicar e configurar AD/Entra, RBAC, MFA e JML |
| 🟣 Pleno | integrar SSO, SCIM, APIs, Access Reviews e automação |
| 🟠 Avançado | trabalhar com IGA, SoD, PIM, PAM e cloud IAM |
| 🔴 Sênior | desenhar arquitetura, governança, automação e controles auditáveis |

## Para cada módulo

- [ ] Executei todos os PASSOS.
- [ ] Vi o resultado esperado.
- [ ] Fiz o teste negativo.
- [ ] Investiguei o motivo da falha.
- [ ] Corrigi.
- [ ] Revoguei o acesso quando aplicável.
- [ ] Registrei evidência.
- [ ] Consigo explicar o **por quê**.
- [ ] Consigo repetir sem o manual.

## Regra de ouro

> **Se você não consegue configurar, testar, quebrar, investigar, corrigir e explicar, ainda não domina o tema.**
