# 🛡️ IAM Study Lab — Microsoft Entra ID do básico ao avançado

> **Objetivo:** transformar cada tema de IAM em competência prática. Você não avança porque leu; avança quando consegue **configurar → testar → negar → investigar → corrigir → revogar → explicar → repetir**.

![Microsoft Entra ID](https://img.shields.io/badge/Microsoft-Entra_ID-0078D4?style=for-the-badge&logo=microsoft)
![IAM](https://img.shields.io/badge/IAM-Hands--On-6f42c1?style=for-the-badge)
![PAM](https://img.shields.io/badge/PAM-Teleport_CE-2ea44f2?style=for-the-badge)
![PowerShell](https://img.shields.io/badge/Automation-PowerShell-5391FE?style=for-the-badge&logo=powershell)

---

## 🧭 Navegação

- [00 — Método de estudo](#00--método-de-estudo)
- [01 — Estratégia de licença P2](#01--estratégia-de-licença-p2)
- [02 — Laboratório econômico](#02--laboratório-econômico)
- [03 — IAM Fundamentals](#03--iam-fundamentals)
- [04 — Active Directory](#04--active-directory)
- [05 — Entra ID: usuários e grupos](#05--entra-id-usuários-e-grupos)
- [06 — MFA e SSPR](#06--mfa-e-sspr)
- [07 — Conditional Access](#07--conditional-access)
- [08 — RBAC e Least Privilege](#08--rbac-e-least-privilege)
- [09 — Logs, auditoria e troubleshooting](#09--logs-auditoria-e-troubleshooting)
- [10 — B2B e identidade externa](#10--b2b-e-identidade-externa)
- [11 — SSO, SAML, OAuth 2.0 e OIDC](#11--sso-saml-oauth-20-e-oidc)
- [12 — App Registration, Service Principal e Graph](#12--app-registration-service-principal-e-graph)
- [13 — SCIM e provisioning](#13--scim-e-provisioning)
- [14 — Workload Identity](#14--workload-identity)
- [15 — JML](#15--jml)
- [16 — Access Reviews com P2](#16--access-reviews-com-p2)
- [17 — Entitlement Management](#17--entitlement-management)
- [18 — Lifecycle Workflows](#18--lifecycle-workflows)
- [19 — PIM](#19--pim)
- [20 — PAM com Teleport Community Edition](#20--pam-com-teleport-community-edition)
- [21 — JEA, PAW e Break-glass](#21--jea-paw-e-break-glass)
- [22 — PowerShell, Graph e REST](#22--powershell-graph-e-rest)
- [23 — Hybrid Identity](#23--hybrid-identity)
- [24 — Cloud IAM](#24--cloud-iam)
- [25 — IGA/SailPoint](#25--igasailpoint)
- [26 — PAM Enterprise](#26--pam-enterprise)
- [27 — ITSM](#27--itsm)
- [28 — SoD e role engineering](#28--sod-e-role-engineering)
- [29 — Auditoria e compliance](#29--auditoria-e-compliance)
- [30 — Projeto final](#30--projeto-final)
- [31 — Portfólio e entrevista](#31--portfólio-e-entrevista)
- [32 — Critério de conclusão](#32--critério-de-conclusão)

---

# 00 — Método de estudo

## Regra principal

Cada módulo é uma **missão de trabalho**, não uma aula teórica.

Use sempre:

`CENÁRIO → POR QUÊ → PREPARAÇÃO → CONFIGURAÇÃO → TESTE PERMITIDO → TESTE NEGADO → FALHA CONTROLADA → INVESTIGAÇÃO → CORREÇÃO → REVOGAÇÃO → EVIDÊNCIA → CHECKPOINT`

### O que você deve responder durante a prática

| Pergunta | Exemplo |
|---|---|
| O que é? | RBAC é autorização baseada em função. |
| Por que existe? | Reduz privilégio excessivo. |
| Quando usar? | Quando vários usuários precisam do mesmo conjunto de permissões. |
| Onde configurar? | Access control (IAM). |
| O que muda? | Role assignment. |
| Como provar? | Teste + logs. |
| Como quebrar? | Remover role ou alterar escopo. |
| Como revogar? | Remover assignment. |
| Como automatizar? | Graph/PowerShell. |

## 🔁 Ciclo de repetição

### Repetição 1

Execute seguindo o manual.

### Repetição 2

Execute somente olhando os títulos/checklist.

### Repetição 3

Reconstrua sem consultar.

### Repetição 4

Explique em 60 segundos como se fosse entrevista.

### Repetição 5

Automatize o que foi repetitivo.

## ✅ Definition of Done de qualquer módulo

- [ ] Sei definir.
- [ ] Sei explicar o risco.
- [ ] Sei quando usar.
- [ ] Sei configurar.
- [ ] Sei validar o permitido.
- [ ] Sei validar o negado.
- [ ] Sei provocar uma falha controlada.
- [ ] Sei encontrar a evidência.
- [ ] Sei corrigir.
- [ ] Sei revogar.
- [ ] Consigo repetir sem o manual.
- [ ] Consigo explicar em entrevista.

---

# 01 — Estratégia de licença P2

## 🎯 Objetivo

Extrair o máximo de uma única licença **Microsoft Entra ID P2**, sem fingir que recursos de Governance/Enterprise estão disponíveis quando não estiverem.

A documentação atual da Microsoft informa que P2 é licença válida para PIM e que determinados cenários de Access Reviews podem operar com P2. A documentação atual também informa que **Lifecycle Workflows exige Microsoft Entra ID Governance ou Microsoft Entra Suite**. Entitlement Management tem documentação com cenários P2, mas a página atual de visão geral ressalta que o licenciamento varia por capacidade; portanto, valide o recurso específico no tenant antes de consumi-lo. citeturn0search3turn1search2turn1search3turn1search5

## Conta licenciada

`LAB-P2-ADMIN`

Use-a **sequencialmente**, principalmente para:

- PIM;
- Access Reviews compatíveis com P2;
- testes avançados de Conditional Access;
- tarefas administrativas que exigirem a licença;
- laboratório de governança quando o tenant confirmar cobertura.

## Contas de teste

Crie apenas as necessárias:

- `LAB-USER-ANA` — usuário normal;
- `LAB-USER-JOAO` — acesso negado/excesso de acesso;
- `LAB-USER-MARIA` — JML;
- `LAB-USER-CARLOS` — privilégio/PAM;
- `LAB-BREAKGLASS` — emergência.

## ⚠️ Regra importante

Não atribua P2 a todos os usuários para “facilitar”. Para PIM, a Microsoft exige licenciamento para usuários com atribuições elegíveis/time-bound e também para determinados aprovadores/revisores. Portanto, o laboratório usa **um único ator P2 por vez**. citeturn0search3

## Matriz prática

| Tema | Uma P2 | Estratégia |
|---|---:|---|
| Users/Groups | Não necessária | usar contas normais |
| Azure RBAC | Não necessária por si só | usuário/grupo de laboratório |
| Conditional Access | P1/P2 conforme recurso | usar ANA + grupo pequeno |
| Risk-based CA | P2 | usar P2 somente no cenário |
| PIM | ✅ | prioridade máxima |
| Access Review de app/grupo em cenário P2 | ✅ em cenários suportados | uma revisão por vez |
| Entitlement Management | ⚠️ validar capacidade | executar somente se tenant/licença permitir |
| Lifecycle Workflows | ❌ P2 isolada não cobre | simular + estudar |
| SailPoint | ❌ | simular IGA |
| CyberArk/Delinea | ❌ | Teleport CE |

> **Nunca compre ou ative licença adicional apenas para seguir o manual.** Se o tenant bloquear um recurso, transforme o bloqueio em exercício: identificar requisito → desenhar fluxo → simular → documentar → comparar com ferramenta corporativa.

---

# 02 — Laboratório econômico

## 🎯 Objetivo

Executar todo o projeto sem manter várias VMs ligadas simultaneamente.

## Arquitetura

```text
                         INTERNET
                            │
                         NAT ───────── somente instalação/updates
                            │
                     ┌──────┴──────┐
                     │  LAB HOST   │
                     │  VirtualBox │
                     └──────┬──────┘
                            │ Host-only
                     192.168.56.0/24
                            │
             ┌──────────────┼──────────────┐
             │              │              │
         LAB-DC01      LAB-TELEPORT   LAB-LINUX01
         AD/DNS/GPO       PAM           SSH alvo
```

## VMs

| VM | Função | RAM | Uso |
|---|---|---:|---|
| `LAB-DC01` | AD DS/DNS/GPO/Hybrid | 3–4 GB | ligar somente em AD/Hybrid |
| `LAB-TELEPORT` | Teleport CE | 1–2 GB | ligar somente em PAM |
| `LAB-LINUX01` | alvo SSH/Linux | 1–2 GB | ligar com Teleport |
| `LAB-DB01` | banco opcional | 1–2 GB | somente módulo DB |

**Não é necessário manter todas ligadas.**

## 02.1 — Criar rede no VirtualBox

1. Abra **VirtualBox**.
2. Vá em **File → Tools → Network Manager**.
3. Abra **Host-only Networks**.
4. Clique em **Create**.
5. Use `vboxnet0`.
6. IPv4: `192.168.56.1`.
7. Máscara: `255.255.255.0`.
8. Desative **DHCP Server**.

### Por que DHCP fica desativado?

Porque, quando o AD estiver ativo, o `LAB-DC01` poderá fornecer DHCP para o laboratório. Dois DHCPs na mesma rede podem entregar DNS/gateway incorretos. Durante módulos que não usam AD, você pode usar IP estático nas VMs.

## 02.2 — Configurar VM

Para cada VM:

1. **Settings → Network**.
2. **Adapter 1 → Enable Network Adapter**.
3. **Attached to → Host-only Adapter**.
4. **Name → vboxnet0**.
5. Não use Bridge.
6. Adicione **Adapter 2 → NAT** somente quando precisar de Internet.
7. Desative o NAT após instalação se não for necessário.

## 02.3 — Plano IP

| Host | IP |
|---|---|
| Host VirtualBox | `192.168.56.1` |
| `LAB-DC01` | `192.168.56.10` |
| `LAB-TELEPORT` | `192.168.56.20` |
| `LAB-LINUX01` | `192.168.56.30` |
| `LAB-DB01` | `192.168.56.40` |

## 02.4 — Snapshots

Antes de cada grande mudança:

`VM → Snapshots → Take`

Nomeie:

- `01-clean-install`;
- `02-network-ok`;
- `03-service-installed`;
- `04-lab-complete`.

### Por que?

IAM é ótimo para aprender troubleshooting. Snapshot permite quebrar o ambiente e voltar rapidamente.

---

# 03 — IAM Fundamentals

## 🎯 Missão

Construir o modelo mental antes de usar ferramentas.

## Cenário

Um funcionário pede acesso ao ERP.

Você deve responder:

```text
Pessoa
  ↓
Identidade
  ↓
Autenticação
  ↓
Autorização
  ↓
Role
  ↓
Entitlement
  ↓
Recurso
  ↓
Log
  ↓
Revisão
  ↓
Revogação
```

## Faça

Crie uma tabela `iam-modelo.md` com:

| Elemento | Exemplo |
|---|---|
| Identity | Maria |
| Authentication | MFA |
| Role | Finance Analyst |
| Entitlement | ERP-READ |
| Resource | ERP |
| Approval | Manager |
| Review | Quarterly |
| Revocation | Leaver |

## 🧪 Teste

Explique sem consultar:

- autenticação ≠ autorização;
- identidade ≠ conta;
- role ≠ entitlement;
- IAM ≠ IGA ≠ PAM.

### CHECKPOINT

Se você não consegue explicar **quem pode fazer o quê, em qual recurso, por qual motivo e como revogar**, não avance.

---

# 04 — Active Directory

## 🎯 Missão

Criar um domínio pequeno e usá-lo para aprender identidade, grupos, GPO, DNS, Kerberos e delegação.

## 04.1 — Criar `LAB-DC01`

1. VirtualBox → **New**.
2. Nome: `LAB-DC01`.
3. Windows Server 2022/2025 compatível com seu ambiente.
4. RAM: 3–4 GB.
5. Disco: 50 GB dinâmico.
6. Adapter 1: `Host-only → vboxnet0`.
7. Instale Windows Server.

## 04.2 — IP estático

Dentro do Windows:

1. **Settings → Network & Internet**.
2. Abra o adaptador Ethernet.
3. IPv4 → **Edit → Manual**.
4. IP `192.168.56.10`.
5. Máscara `255.255.255.0`.
6. Gateway vazio se não precisar de Internet.
7. DNS temporário conforme a instalação; após DNS/AD, aponte para `192.168.56.10`.

### Por que IP fixo?

DNS e AD dependem de um endereço estável para serviços do controlador.

## 04.3 — Instalar AD DS

1. **Server Manager**.
2. **Manage → Add Roles and Features**.
3. **Role-based or feature-based installation**.
4. Selecione `LAB-DC01`.
5. Marque **Active Directory Domain Services**.
6. Aceite **Add Features**.
7. **Install**.
8. Ao terminar, clique na notificação.
9. **Promote this server to a domain controller**.
10. **Add a new forest**.
11. Domínio: `lab.local`.
12. Defina a senha DSRM.
13. Verifique DNS/NetBIOS.
14. Instale.
15. Reinicie.

## 04.4 — Validar

No servidor:

```powershell
ipconfig /all
nslookup lab.local
Get-ADDomain
Get-ADForest
```

### Resultado esperado

- domínio responde;
- DNS resolve;
- AD PowerShell retorna o domínio;
- servidor aparece como DC.

## 04.5 — Criar OUs

Abra **Tools → Active Directory Users and Computers**.

Crie:

```text
LAB
├── Users
├── Groups
├── Admins
├── Servers
└── Workstations
```

### Por que OU não é grupo?

OU organiza objetos e permite aplicar/delegar políticas. Grupo representa associação e pode ser usado para autorização.

## 04.6 — Criar grupos

Crie:

- `GG-FINANCE`;
- `GG-IT`;
- `GG-READONLY`;
- `GG-ADMINS`.

## 04.7 — Primeira missão de autorização

1. Crie `ANA`.
2. Coloque ANA em `GG-FINANCE`.
3. Dê acesso a um compartilhamento de laboratório ao grupo.
4. Faça login como ANA.
5. Confirme acesso.
6. Remova ANA do grupo.
7. Faça logoff/login.
8. Confirme perda do acesso.

### Aprendizado

Você praticou:

`identity → group → permission → access → revoke`

## 04.8 — GPO

1. **Group Policy Management**.
2. Crie `GPO-LAB-SECURITY`.
3. Configure somente controles não destrutivos:
   - bloqueio de tela;
   - auditoria;
   - política de senha de laboratório.
4. Vincule à OU de teste.
5. Na máquina alvo:

```cmd
gpupdate /force
gpresult /r
```

## 04.9 — Conceitos obrigatórios

Você deve conseguir explicar:

`DNS → LDAP → Kerberos → AD DS → GPO → grupos → autorização`

---

# 05 — Entra ID: usuários e grupos

## 🎯 Missão

Criar uma identidade cloud e controlar acesso por grupo.

## 05.1 — Criar usuário

1. Acesse **Microsoft Entra admin center**.
2. **Identity → Users → All users**.
3. **New user → Create new user**.
4. Nome: `LAB-USER-ANA`.
5. Defina senha temporária.
6. Não atribua role administrativa.
7. **Create**.

### Agora pare e explique

`User object` = identidade armazenada no diretório.

## 05.2 — Login

1. Abra janela anônima.
2. Entre em `https://portal.azure.com`.
3. Use ANA.
4. Observe o que ela consegue e não consegue acessar.

### Por que testar com usuário normal?

Porque IAM deve ser validado a partir da perspectiva do consumidor do acesso, não somente do administrador.

## 05.3 — Criar grupo

1. **Identity → Groups → All groups**.
2. **New group**.
3. Group type: `Security`.
4. Name: `LAB-GRP-FINANCE`.
5. Membership: `Assigned`.
6. Add ANA.
7. **Create**.

## 05.4 — Teste de grupo

Use um recurso de laboratório que permita autorização por grupo.

1. ANA sem grupo → acesso negado.
2. Adicione ANA → acesso permitido.
3. Remova ANA → acesso negado.

### CHECKPOINT

Você deve conseguir desenhar:

`ANA → LAB-GRP-FINANCE → recurso`

---

# 06 — MFA e SSPR

## 🎯 Missão

Separar claramente **autenticação forte** de **autorização**.

## 06.1 — Registrar método

1. Entre com ANA.
2. Abra **My Account → Security info**.
3. Registre método disponível no tenant.
4. Complete o registro.

## 06.2 — Validar MFA

Faça novo login conforme a política/método configurado.

Observe:

`senha + fator adicional → autenticação`

## 06.3 — SSPR

Execute um reset de senha no fluxo de autoatendimento, se habilitado no tenant.

### Resultado

Você deve conseguir explicar:

`MFA = aumenta garantia de identidade`

`SSPR = recuperação/redefinição de credencial`

Nenhum dos dois, sozinho, define se ANA pode administrar uma VM.

---

# 07 — Conditional Access

## 🎯 Missão

Criar uma política de MFA sem colocar o tenant em risco.

A Microsoft recomenda validar políticas com **Report-only** antes de ativá-las e excluir contas de emergência das políticas que poderiam bloqueá-las. citeturn0search2turn0search4

## 07.1 — Preparação

Tenha:

- `LAB-USER-ANA`;
- `LAB-BREAKGLASS`;
- método MFA de ANA;
- acesso administrativo recuperável.

## 07.2 — Criar política

1. **Entra admin center → Protection → Conditional Access → Policies**.
2. **Create new policy**.
3. Nome: `LAB-CA-001-ANA-MFA`.
4. **Users → Include → Select users and groups → ANA**.
5. **Target resources → All resources** ou recurso mínimo do cenário.
6. **Grant → Grant access → Require multifactor authentication**.
7. **Enable policy → Report-only**.
8. **Create**.

## 07.3 — Testar em Report-only

1. Faça login como ANA.
2. Abra **Protection → Sign-in logs**.
3. Abra o evento.
4. Abra a aba **Conditional Access**.
5. Localize `LAB-CA-001-ANA-MFA`.
6. Registre resultado.

### Por que Report-only?

Você verifica o impacto antes de impor a decisão. citeturn0search4

## 07.4 — Ativar

Depois de validar:

`Report-only → On → Save`

Faça novo login.

### Resultado esperado

ANA precisa satisfazer MFA.

## 07.5 — Falha controlada

Altere a política para incluir um segundo grupo de teste.

Não altere várias condições ao mesmo tempo.

Gere login.

Descubra no log:

`usuário → política → condição → grant → resultado`

## 07.6 — Cenários avançados P2

Execute separadamente:

1. MFA para administrador;
2. localização;
3. dispositivo;
4. authentication strength;
5. sign-in risk, quando disponível;
6. user risk, quando disponível.

A Microsoft documenta políticas de risco como cenário P2. citeturn0search10turn0search12

---

# 08 — RBAC e Least Privilege

## 🎯 Missão

Você vai provar que **função + escopo** determina autorização.

## Cenário

ANA precisa operar VMs em `rg-iam-lab`, mas não administrar a assinatura inteira.

## 08.1 — Criar recurso

1. Portal Azure → **Resource groups**.
2. **Create**.
3. Nome: `rg-iam-lab`.
4. Região: escolha uma região disponível.
5. Create.

## 08.2 — Atribuir função

1. Abra `rg-iam-lab`.
2. **Access control (IAM)**.
3. **Add → Add role assignment**.
4. Escolha `Virtual Machine Contributor` se existir VM de laboratório.
5. **Members → Select members → ANA**.
6. Review + assign.

### Por que essa role?

Ela é mais restrita que Owner/Contributor para o cenário de administração de VM.

## 08.3 — Testar como ANA

1. Janela anônima.
2. Login ANA.
3. Abra `rg-iam-lab`.
4. Execute uma ação permitida.
5. Tente uma ação administrativa fora do escopo.

### Resultado esperado

`permitido no escopo da role`

`negado fora do escopo/permissão`

## 08.4 — Comparar escopos

Faça três testes, um por vez:

`Subscription → Resource Group → Resource`

Quanto maior o escopo, maior o impacto potencial.

## 08.5 — Revogar

1. Volte ao IAM do Resource Group.
2. Remova a atribuição.
3. Aguarde a propagação.
4. Teste novamente.

### CHECKPOINT

Explique:

`Directory Role ≠ Azure RBAC Role ≠ Application Role`

---

# 09 — Logs, auditoria e troubleshooting

## 🎯 Missão

Resolver problemas usando evidência, não tentativa e erro.

## 09.1 — Gerar evento permitido

Faça login com ANA.

## 09.2 — Gerar evento negado

Remova uma role ou aplique uma política de teste que negue acesso.

## 09.3 — Investigar Sign-in Log

1. **Entra → Monitoring & health → Sign-in logs**.
2. Filtre ANA.
3. Abra o evento.
4. Observe:
   - usuário;
   - aplicação;
   - timestamp;
   - IP;
   - resultado;
   - authentication details;
   - Conditional Access.

## 09.4 — Investigar Audit Log

1. Faça alteração de grupo.
2. **Audit logs**.
3. Localize a operação.
4. Identifique:
   - initiator;
   - target;
   - operação;
   - horário;
   - resultado.

## 09.5 — Mini incidente

Cenário:

`ANA não consegue acessar recurso.`

Você deve produzir:

```text
Sintoma
↓
Identidade
↓
Autenticação
↓
CA
↓
Role
↓
Scope
↓
Log
↓
Causa
↓
Correção
↓
Reteste
```

### CHECKPOINT

Você só encerra o incidente quando consegue provar a causa.

---

# 10 — B2B e identidade externa

## 🎯 Missão

Tratar um parceiro como identidade externa com acesso mínimo.

## Faça

1. **Entra → External Identities**.
2. Convide uma conta de teste, se disponível.
3. Crie `LAB-GUEST-PARTNER`.
4. Adicione o guest ao grupo mínimo.
5. Conceda um recurso de laboratório.
6. Teste.
7. Remova o acesso.
8. Teste novamente.

## Governança

Documente:

- sponsor;
- finalidade;
- recurso;
- prazo;
- aprovador;
- revisão;
- revogação.

### Pergunta

Por que um guest não deve receber automaticamente as mesmas permissões de um funcionário interno?

---

# 11 — SSO, SAML, OAuth 2.0 e OIDC

## 🎯 Missão

Entender autenticação federada observando o fluxo real.

## 11.1 — SAML

### Memorize antes

`User → IdP → SAML Assertion → SP`

Conheça:

- IdP;
- SP;
- Entity ID;
- ACS URL;
- claims;
- metadata;
- certificado.

### Prática

Use uma aplicação de laboratório SAML.

1. **Entra → Enterprise applications**.
2. Adicione a aplicação.
3. **Single sign-on → SAML**.
4. Configure parâmetros conforme o SP.
5. Atribua ANA.
6. Teste **My Apps/Access Panel → aplicação**.
7. Examine a configuração e os logs.

### Quebre

Altere uma URL/claim em ambiente de teste.

### Diagnostique

Pergunte:

`O erro está no IdP? Assertion? Claim? Certificado? SP? Redirect?`

## 11.2 — OAuth 2.0

Desenhe:

```text
Client
  ↓
Authorization Server
  ↓
Authorization Code
  ↓
Token Endpoint
  ↓
Access Token
  ↓
Resource Server
```

Estude na prática com uma app própria.

## 11.3 — OIDC

Valide:

`authorization code → token → ID token → claims → session`

Observe:

- issuer;
- audience;
- redirect URI;
- nonce;
- JWKS;
- discovery.

### Falha controlada

Altere redirect URI.

Depois corrija.

### CHECKPOINT

Explique sem consulta:

`SAML = federação`

`OAuth2 = autorização delegada`

`OIDC = autenticação/identidade sobre OAuth2`

---

# 12 — App Registration, Service Principal e Graph

## 🎯 Missão

Criar uma aplicação e controlar suas permissões.

## 12.1 — Criar App Registration

1. **Entra → Applications → App registrations**.
2. **New registration**.
3. Nome: `LAB-APP-001`.
4. Tipo de conta: somente este tenant para laboratório.
5. Register.

## 12.2 — Diferenciar objetos

Observe:

`Application object = definição da aplicação`

`Service Principal = instância da aplicação no tenant`

## 12.3 — API Permissions

1. Abra **API permissions**.
2. Adicione uma permissão pequena e necessária.
3. Compare **Delegated** e **Application**.
4. Não use permissões `*.ReadWrite.All` sem necessidade.
5. Teste.
6. Remova.
7. Teste novamente.

## 12.4 — Primeiro uso de Graph

Use Microsoft Graph Explorer ou PowerShell em ambiente de laboratório.

Pratique uma operação somente leitura primeiro:

`GET /users`

Depois:

`GET /groups`

Só depois pratique alteração.

### Regra

`Read → validar → menor permissão → write → revogar`

---

# 13 — SCIM e provisioning

## 🎯 Missão

Aprender diferença entre **autenticar** uma identidade e **provisionar** uma identidade.

## Modelo

`Source → Provisioning Engine → SCIM → Target`

## Prática

Use uma aplicação de laboratório compatível com SCIM.

Execute na ordem:

1. Create user.
2. Validar no target.
3. Alterar atributo.
4. Validar alteração.
5. Adicionar grupo.
6. Validar grupo.
7. Desabilitar.
8. Validar bloqueio.
9. Deprovision.
10. Validar remoção.

## Evidência

Para cada ação:

`input → request → target → log → resultado → rollback`

### CHECKPOINT

Explique:

`SAML ≠ SCIM`

SAML trata federação/autenticação; SCIM trata ciclo de identidade/provisioning.

---

# 14 — Workload Identity

## 🎯 Missão

Sair do modelo “usuário humano” e controlar identidade de aplicações.

## 14.1 — Managed Identity

1. Crie recurso de laboratório.
2. Habilite Managed Identity.
3. Abra recurso alvo → **Access control (IAM)**.
4. Adicione a menor role possível.
5. Selecione a identidade gerenciada.
6. Teste acesso do workload.
7. Remova role.
8. Teste novamente.

### Por que?

Evita armazenar secret de longa duração apenas para identificar o workload.

## 14.2 — Compare

| Modelo | Identidade |
|---|---|
| Humano | User |
| App | Service Principal |
| Azure workload | Managed Identity |
| CI/CD externo | Federated Identity |

### CHECKPOINT

Explique por que workload identity é parte importante do IAM moderno.

---

# 15 — JML

## 🎯 Missão

Implementar Joiner, Mover e Leaver manualmente antes de automatizar.

## Cenário

Maria entra em Finance.

## 15.1 — Joiner

1. Criar Maria.
2. Definir departamento `Finance`.
3. Adicionar grupo Finance.
4. Conceder ERP Read.
5. Registrar aprovação.
6. Testar login.
7. Testar acesso.
8. Registrar evidência.

## 15.2 — Mover

Maria muda para IT.

1. Alterar departamento.
2. Remover grupo Finance.
3. Adicionar grupo IT.
4. Remover ERP Finance.
5. Adicionar acesso IT necessário.
6. Testar acesso antigo → **deve falhar**.
7. Testar novo acesso → **deve funcionar**.
8. Registrar evidência.

## 15.3 — Leaver

1. Desabilitar conta.
2. Remover grupos.
3. Revogar aplicações.
4. Revogar privilégios.
5. Tratar sessões conforme o recurso.
6. Testar login → **deve falhar**.
7. Consultar logs.
8. Registrar evidência.

### Pergunta de entrevista

Qual é o risco de executar somente o Joiner e esquecer o Mover?

Resposta esperada: **privilégios acumulados e toxic combinations.**

---

# 16 — Access Reviews com P2

## 🎯 Missão

Provar que acesso antigo pode ser identificado e revogado.

A Microsoft documenta Access Reviews para grupos/aplicações e indica P2 como requisito para determinados cenários de revisão; outros recursos de governança exigem Governance. citeturn1search7turn1search9

## Cenário

`LAB-GRP-REVIEW`

Membros:

- ANA → deve permanecer;
- JOAO → deve ser removido.

## 16.1 — Preparar

1. Crie grupo `LAB-GRP-REVIEW`.
2. Adicione ANA e JOAO.
3. Conceda ao grupo acesso a um recurso de laboratório.
4. Confirme acesso dos dois.

## 16.2 — Criar review

1. Entre com `LAB-P2-ADMIN`.
2. Acesse **ID Governance → Access Reviews**.
3. Crie uma revisão para o grupo/aplicação compatível com a licença do tenant.
4. Selecione ANA/JOAO no escopo.
5. Configure revisão curta para laboratório.
6. Inicie.

## 16.3 — Decidir

- ANA → **Approve**.
- JOAO → **Deny**.

## 16.4 — Aplicar

Aplique os resultados conforme a opção disponível.

### Teste

JOAO deve perder o acesso revisado.

### Evidência

Capture:

`scope → reviewer → decision → date → result → removal`

### CHECKPOINT

Explique:

`Assignment = concede`

`Review = verifica continuidade`

---

# 17 — Entitlement Management

## 🎯 Missão

Aprender Access Packages, request, approval, expiration e revocation.

O licenciamento atual é dependente da capacidade; há documentação Microsoft para cenários com P2, mas a visão atual do recurso também indica requisitos de Governance/Entra Suite para várias capacidades. Portanto, **primeiro verifique o que o tenant permite**. citeturn1search3turn1search11

## Se o recurso estiver disponível

1. **ID Governance → Entitlement management → Access packages**.
2. Crie catálogo `LAB-CATALOG`.
3. Crie `LAB-PACKAGE-FINANCE`.
4. Adicione grupo/recurso de laboratório.
5. Configure política de solicitação.
6. Configure aprovação.
7. Configure expiração curta.
8. Solicite como ANA.
9. Aprove com o ator permitido.
10. Teste acesso.
11. Revogue.
12. Teste novamente.

## Se o recurso não estiver disponível

Construa o mesmo fluxo manual:

```text
Request
 ↓
Business justification
 ↓
Approval
 ↓
SoD check
 ↓
Provision
 ↓
Expiration
 ↓
Review
 ↓
Revocation
 ↓
Evidence
```

### Resultado

Você aprende o **processo IGA**, não apenas os botões do produto.

---

# 18 — Lifecycle Workflows

## ⚠️ Licença

Lifecycle Workflows requer **Microsoft Entra ID Governance ou Microsoft Entra Suite**; uma única P2 não deve ser considerada suficiente. citeturn1search5turn1search15

## 🎯 Missão sem licença adicional

Simular o workflow real.

## 18.1 — Joiner

```text
HR Event
 ↓
Department=Finance
 ↓
Create identity
 ↓
Finance group
 ↓
Access
 ↓
Evidence
```

## 18.2 — Mover

```text
Department Finance → IT
 ↓
Remove Finance access
 ↓
Grant IT access
 ↓
SoD check
 ↓
Evidence
```

## 18.3 — Leaver

```text
Termination
 ↓
Disable identity
 ↓
Remove groups
 ↓
Revoke apps
 ↓
Handle sessions
 ↓
Evidence
```

## Quando tiver Governance

Reexecute os três cenários com Lifecycle Workflows e compare:

`manual → workflow → execution log → result → rollback`

---

# 19 — PIM

## 🎯 Missão

Transformar privilégio permanente em privilégio **elegível e temporário**.

A Microsoft informa que PIM pode ser usado com Entra ID P2 ou Entra ID Governance. citeturn0search3

## 19.1 — Preparar

Use somente `LAB-P2-ADMIN`.

1. Abra **Identity → Roles & admins**.
2. Escolha uma função administrativa de laboratório com menor impacto possível.
3. Abra **Privileged Identity Management**.
4. Crie uma atribuição **eligible** para a conta P2.
5. Defina duração curta.
6. Não torne Global Administrator o padrão do laboratório.

## 19.2 — Testar antes

Tente executar a ação administrativa.

Resultado esperado:

`negado / sem privilégio ativo`

## 19.3 — Ativar

1. Entre como `LAB-P2-ADMIN`.
2. Abra PIM.
3. Localize a role.
4. **Activate**.
5. Informe justificativa.
6. Faça MFA se solicitado.
7. Defina o menor tempo necessário.
8. Ative.

## 19.4 — Testar durante

Repita a ação.

Resultado:

`permitido`

## 19.5 — Esperar expiração

Depois da expiração:

`mesma ação → novamente negada`

## 19.6 — Auditar

Procure o evento e registre:

- identidade;
- role;
- hora;
- duração;
- justificativa;
- resultado.

### CHECKPOINT

Explique:

`Permanent assignment = standing privilege`

`Eligible = pode ativar quando necessário`

`JIT = privilégio ativo por janela limitada`

---

# 20 — PAM com Teleport Community Edition

## 🎯 Missão

Aprender PAM de infraestrutura sem comprar CyberArk.

Teleport Community Edition permite praticar RBAC, SSH, identidade, sessão e auditoria. A matriz atual também mostra que a Community Edition permite **Role Access Requests via CLI**, enquanto recursos completos de Identity Governance/Resource Access Requests e workflows avançados são Enterprise. citeturn0search0turn0search1turn0search5

## Arquitetura

```text
                 LAB-TELEPORT
          ┌────────────────────────┐
          │ Auth + Proxy + Audit   │
          └───────────┬────────────┘
                      │
                Teleport identity
                      │
                      ▼
                LAB-LINUX01
                  SSH alvo
```

## 20.1 — Criar `LAB-LINUX01`

1. VirtualBox → New.
2. Nome: `LAB-LINUX01`.
3. Linux 64-bit.
4. RAM: 1–2 GB.
5. Host-only `vboxnet0`.
6. IP `192.168.56.30`.
7. Instale OpenSSH.

## 20.2 — Criar `LAB-TELEPORT`

1. VirtualBox → New.
2. Nome: `LAB-TELEPORT`.
3. Linux 64-bit.
4. RAM: 1–2 GB.
5. Host-only.
6. IP `192.168.56.20`.
7. NAT somente para instalação.

## 20.3 — Instalar

Use a documentação oficial atual do Teleport Community Edition para instalar a versão estável disponível.

Valide:

```bash
teleport version
```

## 20.4 — Entender antes de testar

- **Auth Service** = autoridade do cluster;
- **Proxy Service** = ponto de acesso;
- **SSH Service** = serviço protegido;
- **CA/certificados** = identidade criptográfica;
- **RBAC** = autorização;
- **Audit events** = evidência.

## 20.5 — Registrar Linux

1. Instale o agente no `LAB-LINUX01`.
2. Use o método de enrollment documentado para a versão atual.
3. Não grave token no Git.
4. Confirme o host no Teleport.
5. No cliente, use `tsh ls`.
6. Conecte com `tsh ssh`.

## 20.6 — RBAC

Crie:

`lab-readonly`

`lab-admin`

### Teste

`readonly → ação permitida mínima`

`readonly → ação administrativa → negada`

`admin → ação administrativa → permitida`

Depois remova o role e repita.

## 20.7 — Auditoria

Faça uma sessão SSH.

Depois localize eventos de auditoria.

Registre:

- usuário;
- host;
- horário;
- sessão/evento;
- resultado.

## 20.8 — Access Request CE

No Community Edition, pratique o fluxo de **Role Access Request via CLI**.

Exemplo conceitual:

```text
usuário
 ↓
request role
 ↓
justificativa
 ↓
admin/revisor via fluxo CE
 ↓
role temporário
 ↓
sessão
 ↓
expiração
 ↓
audit
```

A documentação do Teleport deixa claro que a aprovação completa/UI de Access Requests é Enterprise; no CE o fluxo disponível é limitado ao CLI e aprovação administrativa conforme o modelo documentado. citeturn0search1turn0search9

### ⚠️ Não confunda

`Teleport CE ≠ CyberArk`

Você está aprendendo **conceitos PAM**, não alegando experiência comercial com CyberArk.

---

# 21 — JEA, PAW e Break-glass

## JEA — Just Enough Administration

### Missão

Criar uma sessão administrativa com comandos limitados.

1. Crie endpoint de laboratório.
2. Defina comandos permitidos.
3. Use usuário sem privilégio total.
4. Teste comando permitido.
5. Teste comando proibido.
6. Registre evidência.

## PAW

Desenhe:

`PAW → MFA → PIM → recurso`

Explique por que estação administrativa dedicada reduz exposição de credenciais privilegiadas.

## Break-glass

Use uma conta de emergência real apenas se o tenant suportar o cenário com segurança.

Regras:

- nunca usar no dia a dia;
- excluir de políticas que poderiam causar lockout;
- monitorar;
- testar recuperação;
- proteger credencial fora do Git;
- registrar uso.

A Microsoft recomenda excluir contas de emergência das políticas de CA que poderiam bloquear o acesso administrativo. citeturn0search2

---

# 22 — PowerShell, Graph e REST

## 🎯 Missão

Transformar uma tarefa manual em automação IAM.

## 22.1 — PowerShell

Pratique:

- variáveis;
- objetos;
- arrays;
- loops;
- funções;
- CSV;
- `try/catch`;
- logging;
- validação.

## 22.2 — Projeto CSV → usuários

Crie:

```csv
name,department,role
Ana,Finance,Reader
Joao,IT,Operator
Maria,Finance,Reader
```

Fluxo:

`CSV → validar → procurar existente → criar/atualizar → grupo → log`

### Regras

- idempotência;
- não criar duplicado;
- validar campos;
- registrar sucesso/erro;
- não armazenar senha em texto puro.

## 22.3 — Graph

Primeiro somente leitura:

```text
GET users
GET groups
GET user
```

Depois:

```text
POST create
PATCH update
POST group membership
DELETE/revoke
```

Sempre siga:

`menor permissão → teste → evidência → revogação`

## 22.4 — HTTP troubleshooting

| Código | Significado |
|---:|---|
| 200 | sucesso |
| 201 | criado |
| 400 | requisição inválida |
| 401 | não autenticado |
| 403 | autenticado, sem autorização |
| 404 | recurso não encontrado |
| 409 | conflito |
| 429 | rate limit |
| 5xx | erro servidor |

### CHECKPOINT

Você deve conseguir diferenciar:

`401 = identidade/autenticação`

`403 = autorização`

---

# 23 — Hybrid Identity

## 🎯 Missão

Compreender AD → Entra como fluxo de autoridade e sincronização.

## Arquitetura

```text
LAB-DC01
   │
   │ sync
   ▼
Entra ID
   │
   ├── MFA
   ├── Conditional Access
   └── Cloud Apps
```

## Prática

Use `LAB-DC01` somente neste módulo.

1. Crie usuário no AD.
2. Configure solução de sincronização suportada pela versão atual da Microsoft.
3. Restrinja o escopo às OUs de laboratório.
4. Execute sincronização.
5. Confirme usuário no Entra.
6. Altere atributo no AD.
7. Confirme no Entra.
8. Desabilite no AD.
9. Observe o efeito.
10. Investigue logs.

## Conceitos obrigatórios

- source of authority;
- UPN;
- sincronização;
- escopo;
- atributos;
- troubleshooting;
- DNS;
- sincronização incremental;
- staging/rollback.

### Falha controlada

Retire um usuário do escopo de sincronização e explique por que o comportamento não equivale simplesmente a “apagar usuário na nuvem”.

---

# 24 — Cloud IAM

## Ordem

`Azure → AWS → GCP`

## Azure

Pratique:

- Subscription;
- Resource Group;
- Resource;
- Azure RBAC;
- Managed Identity;
- Service Principal;
- Key Vault;
- least privilege.

## AWS

Pratique conceitualmente ou no free tier disponível:

- IAM Role;
- policy;
- STS;
- federation;
- resource policy;
- workload identity.

## GCP

Conheça:

- principal;
- role;
- policy;
- service account;
- workload identity federation.

## Exercício

Monte uma tabela:

`Entra Role ↔ Azure RBAC ↔ AWS IAM Role ↔ GCP IAM Role`

Explique o que é equivalente e o que não é.

---

# 25 — IGA/SailPoint

## 🎯 Missão

Aprender IGA mesmo sem licença comercial.

## Modelo

```text
Identity
 ├── Account
 ├── Role
 └── Entitlement
```

## Crie em CSV/JSON

`ROLE-FINANCE-ANALYST`

Entitlements:

- `ERP-READ`;
- `SHARE-FINANCE`;
- `REPORT-FINANCE`.

Outra role:

`ROLE-PAYMENT-APPROVER`

## Crie uma regra SoD

```text
ROLE-FINANCE-ANALYST
        +
ROLE-PAYMENT-APPROVER
        ↓
SoD violation
```

## Simule

`request → approval → SoD → provisioning → certification → revocation`

## Depois compare

Estude como os mesmos conceitos aparecem em:

- SailPoint IdentityIQ;
- SailPoint Identity Security Cloud;
- Saviynt;
- One Identity.

### Objetivo

Quando você tiver acesso a SailPoint profissional, implemente o mesmo cenário em vez de começar do zero.

---

# 26 — PAM Enterprise

## 🎯 Objetivo

Conhecer o que ferramentas comerciais acrescentam ao fundamento aprendido com Teleport.

## Compare

| Capacidade | Teleport CE | PAM Enterprise |
|---|---|---|
| RBAC | ✅ | ✅ |
| SSH | ✅ | ✅ |
| Auditoria | ✅ | ✅ |
| Session recording | ✅ | varia por produto |
| Vault de credenciais | não é foco | central |
| Password rotation | não equivalente | central |
| JIT | limitado/varia | central |
| Approval workflow | limitado no CE | comum |
| Discovery | limitado | comum |
| Service accounts | conceito | central |
| Break-glass | conceito | central |

## Ferramentas para conhecer

- CyberArk;
- Delinea;
- BeyondTrust;
- senhasegura.

### Pergunta de entrevista

Explique em uma frase:

`IAM → identidade e acesso`

`IGA → governança do acesso`

`PAM → proteção do acesso privilegiado`

---

# 27 — ITSM

## 🎯 Missão

Simular como IAM funciona dentro de uma empresa.

## Fluxo

```text
Request
 ↓
Business justification
 ↓
Approval
 ↓
IAM validation
 ↓
Provision
 ↓
User validation
 ↓
Evidence
 ↓
Close
```

## Crie uma tabela de chamados

Campos:

- Ticket;
- requester;
- identity;
- department;
- resource;
- role;
- justification;
- approver;
- expiration;
- executor;
- evidence;
- closure.

## Cenários

1. Novo acesso.
2. Mover de departamento.
3. Leaver.
4. Acesso privilegiado.
5. Exceção.
6. Revogação urgente.

### CHECKPOINT

Você deve conseguir executar um pedido de acesso como se estivesse trabalhando em um Service Desk/IAM real.

---

# 28 — SoD e role engineering

## 🎯 Missão

Sair de “grupo = acesso” e aprender desenho de autorização.

## 28.1 — Role engineering

Crie:

```text
Finance Analyst
Finance Manager
Payment Approver
IT Operator
IT Administrator
```

Liste entitlements de cada uma.

## 28.2 — Matriz SoD

| Role A | Role B | Conflito |
|---|---|---|
| Vendor Creator | Payment Approver | ❌ |
| Finance Analyst | Payment Approver | ⚠️ avaliar |
| IT Reader | Finance Reader | ✅ |
| IT Admin | Payment Approver | ❌ em cenário crítico |

## 28.3 — Missão

1. Maria solicita `Payment Approver`.
2. Sistema/processo verifica roles atuais.
3. Detecta conflito.
4. Bloqueia ou encaminha exceção.
5. Registra justificativa.
6. Define aprovador.
7. Define expiração.
8. Revisa posteriormente.

### Resultado

Você deve conseguir explicar por que **SoD é controle preventivo**, enquanto Access Review é controle de recertificação.

---

# 29 — Auditoria e compliance

## 🎯 Missão

Produzir evidência suficiente para um auditor responder:

> “Esse acesso foi autorizado, permanece necessário e pode ser revogado?”

## Dossiê de acesso

Para ANA, produza:

```text
Identity
 ↓
Request
 ↓
Approval
 ↓
Role/Entitlement
 ↓
Assignment
 ↓
Usage/Test
 ↓
Review
 ↓
Revocation
```

## Controles

| Controle | Evidência |
|---|---|
| Least privilege | role + scope |
| JML | entrada/mudança/saída |
| SoD | regra + decisão |
| Access Review | revisão + decisão |
| PIM | ativação + expiração |
| PAM | sessão + auditoria |
| MFA | autenticação |
| CA | policy result |
| Approval | ticket/aprovador |
| Revocation | alteração + log |

## Estude

- ISO 27001;
- NIST;
- LGPD;
- PCI DSS;
- CIS Controls;
- SOX;
- SOC 2.

### Exercício de auditoria

Escolha um acesso concedido no laboratório.

Tente provar:

1. quem pediu;
2. quem aprovou;
3. o que foi concedido;
4. por quê;
5. por quanto tempo;
6. quem usou;
7. quando foi revisado;
8. quando foi removido.

Se faltar evidência, registre a falha de controle.

---

# 30 — Projeto final

## 🏢 Empresa fictícia: LAB-CORP

Departamentos:

- HR;
- Finance;
- IT.

Recursos:

- ERP;
- Service Desk;
- File Server;
- Azure VM;
- Linux Server.

## Arquitetura

```text
                         HR
                          │
                          ▼
                   Identity Source
                          │
                          ▼
                      AD / Entra
                          │
          ┌───────────────┼────────────────┐
          ▼               ▼                ▼
         JML             RBAC             MFA/CA
          │               │                │
          └───────────────┼────────────────┘
                          ▼
                         IGA
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
            ERP          Azure        Linux
                                        │
                                        ▼
                                     Teleport
```

## MISSÃO 1 — Joiner

Maria entra em Finance.

### Deve acontecer

- identidade;
- grupo Finance;
- ERP Read;
- MFA;
- evidência.

### Teste

Maria acessa ERP.

### Negação

Maria tenta recurso IT.

### Revogação

Remova acesso e teste novamente.

## MISSÃO 2 — Mover

Maria muda Finance → IT.

### Deve acontecer

- Finance removido;
- IT adicionado;
- acesso Finance negado;
- acesso IT permitido;
- SoD verificado.

## MISSÃO 3 — Leaver

Maria sai da empresa.

### Deve acontecer

- conta bloqueada;
- grupos removidos;
- aplicações revogadas;
- privilégio revogado;
- sessão tratada;
- evidência.

## MISSÃO 4 — Privilege

Carlos precisa administrar Azure por 30 minutos.

```text
Eligible
 ↓
MFA
 ↓
Activate
 ↓
Admin
 ↓
Expire
 ↓
Audit
```

## MISSÃO 5 — PAM

Carlos precisa administrar Linux.

```text
Teleport
 ↓
Role
 ↓
Request
 ↓
SSH
 ↓
Audit
 ↓
Expire/Revoke
```

## MISSÃO 6 — Access Review

JOAO mantém acesso antigo.

```text
Review
 ↓
Deny
 ↓
Remove
 ↓
Test
 ↓
Evidence
```

## MISSÃO 7 — Incidente

Uma identidade tenta acessar recurso sem autorização.

Você deve:

1. identificar usuário;
2. verificar autenticação;
3. verificar CA;
4. verificar RBAC;
5. verificar scope;
6. consultar log;
7. determinar causa;
8. conter;
9. revogar;
10. retestar;
11. documentar.

---

# 31 — Portfólio e entrevista

## 📁 Estrutura recomendada

```text
01-IAM/
├── IAM-Study-Lab.md
├── labs/
│   ├── 01-entra-users-groups/
│   ├── 02-rbac/
│   ├── 03-conditional-access/
│   ├── 04-access-reviews/
│   ├── 05-pim/
│   ├── 06-jml/
│   ├── 07-sso/
│   ├── 08-automation/
│   └── 09-teleport-pam/
├── scripts/
├── diagrams/
└── evidence/
```

## Nunca publique

- passwords;
- tokens;
- secrets;
- private keys;
- recovery codes;
- cookies;
- dados reais;
- logs com PII desnecessária.

## Publique

- arquitetura;
- screenshots sanitizados;
- scripts;
- troubleshooting;
- decisões técnicas;
- fluxos JML;
- matriz RBAC;
- matriz SoD;
- evidências sanitizadas.

## Projetos prioritários

### Projeto 1 — Entra IAM Lab

Users + Groups + RBAC + MFA + CA + Logs.

### Projeto 2 — JML + Governance

Joiner + Mover + Leaver + Review + SoD.

### Projeto 3 — PAM Home Lab

Teleport CE + RBAC + SSH + audit + JIT concept.

### Projeto 4 — IAM Automation

CSV + PowerShell + Graph + report.

## Perguntas de entrevista

1. Authentication vs Authorization?
2. RBAC vs ABAC?
3. SAML vs OIDC?
4. OAuth2 é autenticação?
5. SAML vs SCIM?
6. Application vs Service Principal?
7. PIM vs PAM?
8. IAM vs IGA?
9. O que é JML?
10. O que é SoD?
11. O que é Access Review?
12. O que é Access Package?
13. Managed Identity?
14. Least privilege?
15. Como investigar login negado?
16. Como provar que acesso foi autorizado?
17. Como automatizar 500 onboardings?
18. Como reduzir standing privilege?
19. Como funciona AD → Entra?
20. Como proteger conta break-glass?

---

# 32 — Critério de conclusão

## 🟢 Nível 1 — IAM operacional

- [ ] IAM fundamentals
- [ ] AD básico
- [ ] Entra Users/Groups
- [ ] MFA
- [ ] Conditional Access
- [ ] RBAC
- [ ] Logs
- [ ] JML manual

## 🔵 Nível 2 — IAM profissional

- [ ] SSO
- [ ] SAML
- [ ] OAuth2
- [ ] OIDC
- [ ] SCIM
- [ ] App Registration
- [ ] Service Principal
- [ ] Graph
- [ ] PowerShell
- [ ] Access Reviews
- [ ] SoD
- [ ] Hybrid Identity

## 🟣 Nível 3 — IGA/PAM

- [ ] Entitlement Management
- [ ] Lifecycle Workflows — conceito; prática com Governance quando disponível
- [ ] PIM
- [ ] Teleport CE
- [ ] PAM concepts
- [ ] SailPoint concepts
- [ ] Auditoria

## 🔴 Nível 4 — IAM Engineering / Architecture

- [ ] Graph automation
- [ ] Python
- [ ] SQL
- [ ] Cloud IAM
- [ ] Workload Identity
- [ ] Role Engineering
- [ ] Architecture
- [ ] Zero Trust
- [ ] Governance
- [ ] Métricas

---

# 🧪 Checklist universal de laboratório

Antes de declarar qualquer tema concluído:

```text
[ ] Cenário entendido
[ ] Por que explicado
[ ] Quando usar explicado
[ ] Pré-requisitos conferidos
[ ] Configurado
[ ] Teste permitido executado
[ ] Teste negado executado
[ ] Falha controlada provocada
[ ] Log encontrado
[ ] Causa identificada
[ ] Correção aplicada
[ ] Acesso revogado
[ ] Reteste executado
[ ] Evidência salva
[ ] Cenário destruído ou snapshot restaurado
[ ] Repetido sem consulta
[ ] Explicado em 60 segundos
```

---

# ⚡ Regra de aprendizado acelerado

Não memorize menus.

Memorize o raciocínio:

```text
IDENTIDADE
    ↓
AUTENTICAÇÃO
    ↓
CONDIÇÃO
    ↓
AUTORIZAÇÃO
    ↓
RECURSO
    ↓
USO
    ↓
LOG
    ↓
REVISÃO
    ↓
REVOGAÇÃO
    ↓
AUTOMAÇÃO
```

Quando uma ferramenta mudar o nome de um menu, o raciocínio continua válido.

---

# 📚 Referências oficiais

- Microsoft Entra licensing: https://learn.microsoft.com/en-us/entra/fundamentals/licensing
- Microsoft Entra ID Governance licensing: https://learn.microsoft.com/en-us/entra/id-governance/licensing-fundamentals
- Access Reviews: https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview
- Entitlement Management: https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview
- Lifecycle Workflows: https://learn.microsoft.com/en-us/entra/id-governance/what-are-lifecycle-workflows
- Conditional Access: https://learn.microsoft.com/en-us/entra/identity/conditional-access/
- Conditional Access Report-only: https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only
- PIM: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/
- SC-300: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-300
- Microsoft Graph: https://learn.microsoft.com/en-us/graph/
- Teleport Community Edition: https://goteleport.com/docs/get-started/deploy-community/
- Teleport Access Requests CE: https://goteleport.com/docs/identity-governance/access-requests/oss-role-requests/
- Teleport Feature Matrix: https://goteleport.com/docs/feature-matrix/

---

> **Regra final:** todo acesso precisa de identidade, motivo, escopo, controle, teste, evidência e caminho de revogação. Todo privilégio permanente deve ser questionado. Todo processo repetitivo deve ser candidato à automação.