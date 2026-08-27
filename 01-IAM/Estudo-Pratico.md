# 🔐 Microsoft IAM Hybrid Lab

> Laboratório prático para desenvolver competências profissionais em Identity and Access Management (IAM), com foco em Microsoft Active Directory, Microsoft Entra ID, Hybrid Identity, Authentication, Authorization, Governance, Privileged Access, Application Identity, Workload Identity, Automation, Monitoring, SIEM e PAM.

---

## 🧭 Navegação

- [🎯 Objetivo](#-objetivo)
- [🧠 Modelo mental de IAM](#-modelo-mental-de-iam)
- [🏗️ Arquitetura](#️-arquitetura)
- [💻 Infraestrutura](#-infraestrutura)
- [🌐 Rede](#-rede)
- [🟦 Fase 1 — Active Directory](#-fase-1--active-directory)
- [👥 Fase 2 — Identidades e Grupos](#-fase-2--identidades-e-grupos)
- [🛡️ Fase 3 — GPO e Segurança](#️-fase-3--gpo-e-segurança)
- [☁️ Fase 4 — Microsoft Entra ID](#️-fase-4--microsoft-entra-id)
- [🔑 Fase 5 — Authentication](#-fase-5--authentication)
- [🚦 Fase 6 — Conditional Access](#-fase-6--conditional-access)
- [💻 Fase 7 — Device Identity](#-fase-7--device-identity)
- [🔄 Fase 8 — Hybrid Identity](#-fase-8--hybrid-identity)
- [👨‍💼 Fase 9 — JML](#-fase-9--jml)
- [📱 Fase 10 — Application Identity](#-fase-10--application-identity)
- [🤖 Fase 11 — Workload Identity](#-fase-11--workload-identity)
- [🔐 Fase 12 — Protocolos](#-fase-12--protocolos)
- [⚙️ Fase 13 — PowerShell e Microsoft Graph](#️-fase-13--powershell-e-microsoft-graph)
- [🧠 Fase 14 — Identity Protection](#-fase-14--identity-protection)
- [⏱️ Fase 15 — PIM](#️-fase-15--pim)
- [🔎 Fase 16 — Access Reviews](#-fase-16--access-reviews)
- [📦 Fase 17 — Entitlement Management](#-fase-17--entitlement-management)
- [🔄 Fase 18 — Lifecycle Workflows](#-fase-18--lifecycle-workflows)
- [🌎 Fase 19 — B2B](#-fase-19--b2b)
- [🚨 Fase 20 — IAM Monitoring](#-fase-20--iam-monitoring)
- [🛡️ Fase 21 — PAM](#️-fase-21--pam)
- [⚖️ Fase 22 — Segregation of Duties](#️-fase-22--segregation-of-duties)
- [🏆 Projeto Final](#-projeto-final)
- [📚 Portfólio](#-portfólio)
- [📊 Nível de domínio](#-nível-de-domínio)
- [🎓 Perguntas de entrevista](#-perguntas-de-entrevista)
- [🏁 Definição de pronto](#-definição-de-pronto)

---

# 🎯 Objetivo

Construir progressivamente um ambiente corporativo Microsoft híbrido capaz de reproduzir o ciclo completo de IAM:

    IDENTITY
        ↓
    AUTHENTICATION
        ↓
    AUTHORIZATION
        ↓
    ACCESS
        ↓
    PRIVILEGED ACCESS
        ↓
    GOVERNANCE
        ↓
    MONITORING
        ↓
    AUDIT
        ↓
    LIFECYCLE

Ao final do laboratório, o objetivo é conseguir demonstrar, configurar, operar, investigar e documentar:

- 👤 Identidades
- 👥 Grupos
- 🔐 Authentication
- 🛡️ MFA
- 🎣 Phishing-resistant Authentication
- 🚦 Conditional Access
- 🔑 RBAC
- 💻 Device Identity
- 🔄 Hybrid Identity
- 👨‍💼 Joiner / Mover / Leaver
- 📱 Application Identity
- 🤖 Service Principals
- ⚙️ Managed Identity
- 🧩 Workload Identity
- 🔑 SAML
- 🔐 OAuth 2.0
- 🪪 OpenID Connect
- 🎫 JWT
- 🔄 SCIM
- 📊 Microsoft Graph
- 💻 PowerShell
- ⏱️ PIM
- 🔎 Access Reviews
- 📦 Entitlement Management
- 🔄 Lifecycle Workflows
- 🧠 Identity Protection
- 🌎 B2B
- 🚨 IAM Monitoring
- 🛡️ PAM
- ⚖️ Segregation of Duties
- 🖥️ PAW
- 📋 Auditoria

---

# 🧠 Modelo mental de IAM

Antes de configurar qualquer tecnologia, responda:

    WHO?
    Quem é a identidade?

    WHAT?
    O que ela pode acessar?

    WHY?
    Por que ela possui esse acesso?

    HOW?
    Como ela autentica?

    WHERE?
    De onde está acessando?

    WHEN?
    Quando o acesso é permitido?

    HOW LONG?
    Por quanto tempo possui privilégio?

    WHO APPROVED?
    Quem aprovou?

    WHO REVIEWED?
    Quem revisou?

    WHO AUDITED?
    Quem auditou?

O objetivo é sair do modelo:

    "Usuário possui acesso."

para:

    "Usuário possui determinada identidade,
    autenticou por determinado mecanismo,
    recebeu acesso por determinado grupo ou função,
    possui determinada justificativa,
    foi aprovado por determinada pessoa,
    está sujeito a determinadas políticas,
    possui privilégio temporário quando necessário,
    e sua utilização gera evidência auditável."

---

# 🏗️ Arquitetura

    ┌───────────────────────────────────────────────────────────┐
    │                        INTERNET                           │
    └────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   MICROSOFT ENTRA ID    │
                    └────────────┬────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
          USERS               DEVICES            WORKLOADS
             │                   │                   │
             ▼                   ▼                   ▼
          GROUPS            JOIN / HYBRID       APPLICATION
             │                   │                   │
             └───────────────────┼───────────────────┘
                                 │
                                 ▼
                       ACCESS CONTROL
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
               MFA               CA               RBAC
                │                │                │
                └────────────────┼────────────────┘
                                 │
                                 ▼
                       PRIVILEGED ACCESS
                                 │
                         ┌───────┴───────┐
                         │               │
                         ▼               ▼
                        PIM             PAM
                         │               │
                         └───────┬───────┘
                                 │
                                 ▼
                           GOVERNANCE
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
             JML           ACCESS REVIEWS       ENTITLEMENT
                                                     │
                                                     ▼
                                             LIFECYCLE
                                 │
                                 ▼
                            MONITORING
                                 │
                                 ▼
                               SIEM
                                 │
                                 ▼
                              AUDIT

---

# 💻 Infraestrutura

## Máquinas virtuais

| Hostname | Sistema | Função | IP |
|---|---|---|---|
| `DC01` | Windows Server | AD DS + DNS | `192.168.100.10` |
| `SYNC01` | Windows Server | Microsoft Entra Cloud Sync | `192.168.100.15` |
| `SRV01` | Windows Server | Servidor corporativo | `192.168.100.20` |
| `LINUX01` | Linux | Aplicação / alvo PAM | `192.168.100.30` |
| `WIN11-01` | Windows 11 | Workstation | DHCP |
| `PAW01` | Windows 11 | Administração privilegiada | DHCP |
| `PAM01` | Conforme solução escolhida | PAM | `192.168.100.40` |

### Ordem recomendada

- [ ] `DC01`
- [ ] `WIN11-01`
- [ ] `SRV01`
- [ ] `SYNC01`
- [ ] `LINUX01`
- [ ] `PAW01`
- [ ] `PAM01`

Não crie todas as VMs inicialmente. O laboratório deve crescer conforme as fases.

---

# 🌐 Rede

## Endereçamento

    Network:
    192.168.100.0/24

    Gateway:
    192.168.100.1

    DNS:
    192.168.100.10

    Domain:
    corp.lab

## Hosts

    DC01
    192.168.100.10

    SYNC01
    192.168.100.15

    SRV01
    192.168.100.20

    LINUX01
    192.168.100.30

    PAM01
    192.168.100.40

## DNS

Criar e validar:

    dc01.corp.lab
    sync01.corp.lab
    srv01.corp.lab
    linux01.corp.lab

Checklist:

- [ ] IPs configurados
- [ ] DNS funcionando
- [ ] Forward Lookup funcionando
- [ ] Reverse Lookup configurado/testado
- [ ] Comunicação entre VMs
- [ ] Internet disponível onde necessário
- [ ] Firewall considerado no desenho

---

# 🟦 Fase 1 — Active Directory

## 🎯 Objetivo

Construir a autoridade de identidade on-premises.

---

## 1.1 — Preparar DC01

Configurar:

    Hostname:
    DC01

    IP:
    192.168.100.10

    Mask:
    255.255.255.0

    Gateway:
    192.168.100.1

    DNS:
    192.168.100.10

Instalar:

- [ ] Active Directory Domain Services
- [ ] DNS Server

Criar uma nova floresta:

    corp.lab

---

## 1.2 — Validar o domínio

Executar:

    dcdiag

Depois:

    nslookup corp.lab

E:

    nslookup dc01.corp.lab

Checklist:

- [ ] DC saudável
- [ ] DNS funcionando
- [ ] Domínio funcional
- [ ] Resolução direta funcionando
- [ ] Resolução reversa validada
- [ ] Horário sincronizado

---

# 👥 Fase 2 — Identidades e Grupos

## 2.1 — Estrutura de OUs

Criar:

    corp.lab
    │
    ├── OU=Users
    │   ├── OU=Employees
    │   ├── OU=IT
    │   ├── OU=Finance
    │   ├── OU=HR
    │   └── OU=Helpdesk
    │
    ├── OU=Groups
    ├── OU=Servers
    ├── OU=Workstations
    ├── OU=Service Accounts
    ├── OU=Admins
    ├── OU=Disabled
    └── OU=IAM-Lab

Checklist:

- [ ] Users
- [ ] Employees
- [ ] IT
- [ ] Finance
- [ ] HR
- [ ] Helpdesk
- [ ] Groups
- [ ] Servers
- [ ] Workstations
- [ ] Service Accounts
- [ ] Admins
- [ ] Disabled
- [ ] IAM-Lab

---

## 2.2 — Criar usuários

Criar:

    ana.silva
    bruno.santos
    carlos.oliveira
    diana.souza

Departamentos:

    ana.silva
    Finance

    bruno.santos
    IT

    carlos.oliveira
    Helpdesk

    diana.souza
    HR

Criar contas administrativas separadas:

    admin.iam
    admin.infra

Criar contas de serviço para laboratório:

    svc-app
    svc-backup
    svc-iis

---

## 2.3 — Criar grupos

Criar:

    GG-Finance
    GG-IT
    GG-Helpdesk
    GG-HR

    GG-IAM-Admins
    GG-IAM-Readers
    GG-Server-Admins

    GG-App-Finance
    GG-App-IT
    GG-App-HR

Preferir:

    USER
      ↓
    GROUP
      ↓
    PERMISSION

Evitar:

    USER
      ↓
    DIRECT PERMISSION

---

# 🔄 Exercício JML — Joiner

Criar:

    novo.finance

Processo:

    Criar identidade
          ↓
    Definir OU
          ↓
    Definir departamento
          ↓
    Adicionar grupos
          ↓
    Validar acesso

Resultado esperado:

    novo.finance
    │
    ├── OU=Finance
    ├── GG-Finance
    └── GG-App-Finance

Checklist:

- [ ] Usuário criado
- [ ] OU correta
- [ ] Departamento correto
- [ ] Grupo correto
- [ ] Aplicação correta
- [ ] Evidência capturada

---

# 🔄 Exercício JML — Mover

Mover:

    Finance
       ↓
    IT

Executar:

- [ ] Remover `GG-Finance`
- [ ] Adicionar `GG-IT`
- [ ] Remover `GG-App-Finance`
- [ ] Adicionar `GG-App-IT`

Resultado esperado:

    Finance Access = REMOVED

    IT Access = GRANTED

Validar efetivamente o acesso, não apenas a associação aos grupos.

---

# 🚪 Exercício JML — Leaver

Desligar:

    novo.finance

Executar:

    Disable Account
          ↓
    Remove Groups
          ↓
    Move to OU=Disabled
          ↓
    Validate Access Removal

Não apagar imediatamente a identidade.

Checklist:

- [ ] Conta desabilitada
- [ ] Grupos removidos conforme política
- [ ] OU `Disabled`
- [ ] Acesso revogado
- [ ] Evidência registrada

---

# 🛡️ Fase 3 — GPO e Segurança

Criar:

    GPO-Security-Baseline
    GPO-Workstations
    GPO-Servers
    GPO-Admins

Testar:

- [ ] Password Policy
- [ ] Account Lockout
- [ ] Screen Lock
- [ ] Windows Firewall
- [ ] Audit Policy
- [ ] PowerShell Logging
- [ ] Restrições administrativas

Não aplicar alterações de segurança diretamente no ambiente inteiro sem testar primeiro em uma OU de laboratório.

---

# ☁️ Fase 4 — Microsoft Entra ID

Criar um tenant dedicado ao laboratório.

Criar:

    cloud.admin
    cloud.iam
    cloud.user01
    cloud.user02

Criar duas contas de emergência:

    breakglass01
    breakglass02

---

# 🚨 Break-glass Accounts

As contas de emergência devem ser tratadas como exceção controlada.

Características desejáveis:

- [ ] Cloud-only
- [ ] Não dependem do AD local
- [ ] Credenciais protegidas
- [ ] Monitoramento específico
- [ ] Uso somente emergencial
- [ ] Teste periódico
- [ ] Exclusão de políticas que possam impedir acesso emergencial, conforme desenho da organização
- [ ] Alertas para utilização

Não utilizar essas contas para administração cotidiana.

---

# 👥 Grupos no Entra ID

Criar:

    GRP-FINANCE
    GRP-IT
    GRP-HELPDESK
    GRP-HR

    GRP-IAM-ADMINS
    GRP-IAM-READERS

    GRP-APP-FINANCE
    GRP-APP-IT
    GRP-APP-HR

Documentar para cada grupo:

    Owner
    Purpose
    Membership
    Source
    Access
    Review Frequency

---

# 🔑 RBAC

Não confundir:

    Microsoft Entra Directory Roles

com:

    Azure RBAC

São mecanismos relacionados a autorização, mas possuem escopos e finalidades diferentes.

---

## Entra Directory Roles

Estudar, conforme disponibilidade:

    Global Administrator
    User Administrator
    Groups Administrator
    Application Administrator
    Authentication Administrator
    Directory Readers

Sempre aplicar Least Privilege.

---

## Azure RBAC

Modelo:

    Management Group
          ↓
    Subscription
          ↓
    Resource Group
          ↓
    Resource

Testar:

    Reader
    Contributor
    Owner

Matriz:

| Role | Scope | Ler | Alterar | Conceder acesso |
|---|---|---:|---:|---:|
| Reader | Resource Group | ✅ | ❌ | ❌ |
| Contributor | Resource Group | ✅ | ✅ | ❌ |
| Owner | Resource Group | ✅ | ✅ | ✅ |

Modelo mental:

    ROLE
      +
    SCOPE
      =
    EFFECTIVE ACCESS

---

# 🔐 Fase 5 — Authentication

Estudar:

- [ ] Password
- [ ] MFA
- [ ] Passwordless
- [ ] FIDO2
- [ ] Passkeys
- [ ] Windows Hello for Business
- [ ] Authentication Strength
- [ ] SSPR

---

# 🛡️ MFA

Configurar:

    Microsoft Authenticator

Depois estudar:

    FIDO2
    Passkeys

Comparar:

    Password
       ↓
    MFA
       ↓
    Passwordless
       ↓
    Phishing-resistant Authentication

---

# 🎣 Phishing-resistant Authentication

Estudar:

- [ ] FIDO2
- [ ] Passkeys
- [ ] Authentication Strength
- [ ] Requisitos de autenticação para administradores

Objetivo:

    Password
       ↓
    MFA
       ↓
    Passwordless
       ↓
    Phishing-resistant

---

# 🔑 SSPR

Configurar:

    Self-Service Password Reset

Fluxo:

    User
      ↓
    Forgot Password
      ↓
    Identity Verification
      ↓
    Password Reset
      ↓
    Access Restored

No cenário híbrido, estudar também:

    Password Writeback

quando suportado pelo cenário e licenciamento utilizado.

---

# 🚦 Fase 6 — Conditional Access

## Regra de implementação

Sempre que possível:

    CONFIGURE
       ↓
    REPORT-ONLY
       ↓
    TESTE
       ↓
    ANALISE IMPACTO
       ↓
    ENABLE

---

## CA01 — Administradores

Target:

    Admin Roles

Control:

    MFA

---

## CA02 — Usuários

Target:

    All Users

Control:

    MFA

---

## CA03 — Legacy Authentication

Target:

    Legacy Authentication

Control:

    Block

---

## CA04 — Authentication Strength

Target:

    Administrators

Control:

    Phishing-resistant Authentication

---

## CA05 — Application

Target:

    FinanceApp

Control:

    MFA

---

## CA06 — Device

Target:

    Sensitive Application

Control:

    Compliant Device

---

## CA07 — Location

Cenário:

    Untrusted Location

Ação:

    MFA
    ou
    Block

Sempre validar o impacto antes de aplicar políticas abrangentes.

---

# 💻 Fase 7 — Device Identity

Estudar:

    Microsoft Entra Registered
    Microsoft Entra Joined
    Microsoft Entra Hybrid Joined

Criar:

    WIN11-01
    PAW01

Fluxo híbrido:

    AD
      ↓
    Hybrid Join
      ↓
    Entra Device

Validar:

- [ ] Device ID
- [ ] Join Type
- [ ] Owner
- [ ] Enabled
- [ ] Last Activity
- [ ] Compliance quando aplicável

---

# 🖥️ PAW — Privileged Access Workstation

Criar:

    PAW01

Objetivo:

    Administração privilegiada

Separar:

    Normal User
         X
    Privileged Administration

Preferir:

    Admin Account
          ↓
        PAW
          ↓
        PIM
          ↓
        Target

A PAW deve ser tratada como dispositivo de maior confiança e ter superfície de ataque reduzida.

---

# 🔄 Fase 8 — Hybrid Identity

Arquitetura:

    ACTIVE DIRECTORY
           ↓
        SYNC01
           ↓
    Microsoft Entra Cloud Sync
           ↓
    Microsoft Entra ID

---

# 🖥️ SYNC01

Criar:

    SYNC01

Configurar:

- [ ] Windows Server
- [ ] Domain Joined
- [ ] Static IP
- [ ] DNS = DC01
- [ ] Comunicação com Entra

Instalar o agente correspondente ao cenário escolhido.

---

# 🔍 IdFix

Antes da sincronização:

    IdFix

Verificar:

- [ ] Duplicate Attributes
- [ ] Invalid Attributes
- [ ] Invalid Characters
- [ ] UPN Problems
- [ ] Proxy Address Problems

Criar:

    OU=IAM-Lab

Inicialmente sincronizar somente o escopo necessário ao laboratório.

Não sincronizar todo o domínio sem necessidade.

---

# 🔄 Cloud Sync

Fluxo:

    AD Source
        ↓
    OU Scope
        ↓
    Microsoft Entra

Validar:

- [ ] User
- [ ] UPN
- [ ] Groups
- [ ] Attributes
- [ ] Source
- [ ] Synchronization Status
- [ ] Errors

---

# 💻 Hybrid Join

Executar:

    AD Joined Device
           ↓
    Microsoft Entra Hybrid Joined

Validar:

- [ ] Device
- [ ] Join Type
- [ ] Owner
- [ ] Enabled
- [ ] Last Activity

---

# 👨‍💼 Fase 9 — JML

## Joiner

Fluxo:

    HR Event
        ↓
    AD Identity
        ↓
    OU
        ↓
    Group
        ↓
    Cloud Sync
        ↓
    Entra
        ↓
    MFA
        ↓
    Application Access

---

## Mover

Fluxo:

    Department Change
          ↓
    Remove Old Access
          ↓
    Assign New Access
          ↓
    Validate Effective Access

---

## Leaver

Fluxo:

    HR Termination
          ↓
    Disable AD
          ↓
    Cloud Sync
          ↓
    Disable Entra
          ↓
    Remove Groups
          ↓
    Remove Applications
          ↓
    Remove Privileged Access
          ↓
    Revoke Sessions conforme necessário
          ↓
    Audit

---

# 📱 Fase 10 — Application Identity

Criar:

    App Registration

Entender:

    Application Object
           ≠
    Service Principal

Estudar:

- [ ] Application ID
- [ ] Tenant ID
- [ ] Object ID
- [ ] Redirect URI
- [ ] API Permissions
- [ ] Certificates
- [ ] Client Secrets
- [ ] Consent
- [ ] Service Principal
- [ ] Enterprise Application

---

# 🤖 Service Principal

Criar:

    FinanceApp-SP

Modelo:

    Application
         ↓
    Service Principal
         ↓
    Permissions

Documentar:

    Owner
    Purpose
    Permissions
    Credential
    Expiration
    Last Usage
    Risk

---

# 🔐 API Permissions

Criar:

    IAM-Lab-Automation

Testar Microsoft Graph.

Diferenciar:

    Delegated Permissions

de:

    Application Permissions

Entender:

    User Context

versus:

    Application Context

Testar:

    Admin Consent

---

# 🔑 Client Secret

Criar somente para laboratório.

Documentar:

    Created
    Expiration
    Owner
    Purpose

Depois praticar:

    Rotation
    Replacement
    Revocation
    Deletion

Nunca publicar secrets no GitHub.

---

# 📜 Certificates

Criar certificado de laboratório.

Testar:

    Application
        ↓
    Certificate Credential

Documentar:

    Expiration
    Rotation
    Replacement
    Revocation

---

# 🤖 Fase 11 — Workload Identity

Estudar:

    Workload
       │
       ├── Managed Identity
       │
       ├── Service Principal
       │
       └── Workload Identity Federation

---

# ⚙️ Managed Identity

Criar uma VM Azure.

Habilitar:

    System-assigned Managed Identity

Fluxo:

    Azure VM
       ↓
    Managed Identity
       ↓
    Azure Resource

Comparar:

    User Account
    Service Principal
    Managed Identity

Objetivo:

    Automação
       ↓
    Machine Identity
       ↓
    Resource

Evitar utilizar identidade humana para automação quando uma identidade de workload apropriada puder ser utilizada.

---

# 🔐 Fase 12 — Protocolos

---

## SAML 2.0

Estudar:

- [ ] IdP
- [ ] SP
- [ ] Entity ID
- [ ] ACS URL
- [ ] Assertion
- [ ] Claims
- [ ] NameID
- [ ] Certificate
- [ ] Signature

Fluxo:

    User
      ↓
    Application
      ↓
    Entra ID
      ↓
    Authentication
      ↓
    SAML Assertion
      ↓
    Application

Responder:

- [ ] Quem é o IdP?
- [ ] Quem é o SP?
- [ ] Qual é o ACS?
- [ ] Quais claims são enviados?
- [ ] Como a assinatura é validada?

---

# 🔐 OAuth 2.0

Estudar:

- [ ] Authorization Server
- [ ] Client
- [ ] Resource Server
- [ ] Access Token
- [ ] Refresh Token
- [ ] Scope
- [ ] Consent
- [ ] Authorization Code
- [ ] PKCE

Fluxo:

    Client
       ↓
    Authorization Endpoint
       ↓
    Authorization Code
       ↓
    Token Endpoint
       ↓
    Access Token

---

# 🪪 OpenID Connect

Entender:

    OAuth 2.0
       +
    Identity Layer
       =
    OpenID Connect

Estudar:

- [ ] ID Token
- [ ] Access Token
- [ ] Claims
- [ ] Issuer
- [ ] Audience
- [ ] Nonce
- [ ] State
- [ ] Redirect URI

---

# 🎫 JWT

Estrutura:

    JWT
     │
     ├── Header
     ├── Payload
     └── Signature

Estudar:

    iss
    sub
    aud
    exp
    iat
    nonce
    scp
    roles

Validar:

- [ ] Issuer
- [ ] Audience
- [ ] Expiration
- [ ] Signature

Nunca confiar apenas no conteúdo visual de um token.

---

# 🔄 SCIM

Arquitetura:

    Entra ID
       │
       │ SCIM
       ▼
    Application

Testar:

- [ ] Create User
- [ ] Update User
- [ ] Disable User
- [ ] Deprovision User
- [ ] Group Assignment
- [ ] Attribute Mapping

---

# ⚙️ Fase 13 — PowerShell e Microsoft Graph

Criar:

    IAM-Automation/
    │
    ├── New-IAMUser.ps1
    ├── Disable-IAMUser.ps1
    ├── Add-IAMGroup.ps1
    ├── Remove-IAMAccess.ps1
    ├── Get-InactiveUsers.ps1
    ├── Get-PrivilegedUsers.ps1
    ├── Export-GroupMembers.ps1
    ├── Get-ServicePrincipals.ps1
    └── Export-IAMReport.ps1

---

# 🤖 Microsoft Graph

Testar:

- [ ] Get Users
- [ ] Get Groups
- [ ] Get Group Members
- [ ] Create User
- [ ] Create Group
- [ ] Add Group Member
- [ ] Remove Group Member
- [ ] Get Directory Roles
- [ ] Get Applications
- [ ] Get Service Principals

Depois:

    Export IAM Report

---

# 🔄 Automação JML

Criar:

    New-IAMUser.ps1

Entrada:

    FirstName
    LastName
    Department
    JobTitle
    Manager

Processo:

    Validate Input
          ↓
    Create User
          ↓
    Set Attributes
          ↓
    Assign Group
          ↓
    Log Operation

Boas práticas:

- [ ] Validar entrada
- [ ] Usar tratamento de erro
- [ ] Gerar logs
- [ ] Evitar credenciais embutidas
- [ ] Usar identidade apropriada para automação
- [ ] Aplicar menor privilégio
- [ ] Testar primeiro em laboratório

---

# 🚪 Automação Leaver

Criar:

    Disable-IAMUser.ps1

Processo:

    Validate User
          ↓
    Disable
          ↓
    Remove Groups
          ↓
    Remove Application Access
          ↓
    Log

---

# 🧠 Fase 14 — Identity Protection

> ⚠️ Tratar como módulo dependente de licenciamento. Confirmar o licenciamento atual antes do exercício.

Estudar:

- [ ] Risk Detection
- [ ] User Risk
- [ ] Sign-in Risk
- [ ] Risky User
- [ ] Risky Sign-in
- [ ] Remediation
- [ ] Risk-based Conditional Access

Fluxo:

    Sign-in
       ↓
    Risk Detection
       ↓
    Risk Level
       ↓
    Conditional Access
       ├── MFA
       ├── Password Reset
       └── Block

---

# ⏱️ Fase 15 — PIM

> ⚠️ PIM depende de licenciamento. Executar como módulo pontual para reduzir custo do laboratório.

Objetivo:

    Permanent Privilege
           ↓
    Eligible Privilege
           ↓
    JIT Activation

---

# 🔐 PIM Lab

Utilizar:

    admin.iam

Atribuir uma função elegível.

Quando disponível no cenário:

- [ ] MFA
- [ ] Justification
- [ ] Approval
- [ ] Maximum Activation Duration
- [ ] Notification
- [ ] Audit

Fluxo:

    Admin
      ↓
    Activate
      ↓
    MFA
      ↓
    Justification
      ↓
    Approval
      ↓
    Temporary Privilege
      ↓
    Expiration

---

# 💰 Estratégia para reduzir custo do PIM

Não é necessário manter diversos usuários licenciados para praticar os conceitos.

Utilizar:

    1 usuário de laboratório
    admin.iam

Executar:

    PIM License
         ↓
    Assign to admin.iam
         ↓
    Execute Exercise
         ↓
    Capture Evidence
         ↓
    Remove Assignment
         ↓
    Reuse User

Para diferentes cenários:

    Role A
      ↓
    Test
      ↓
    Remove

    Role B
      ↓
    Test
      ↓
    Remove

Essa estratégia é adequada para laboratório, não para representar a arquitetura operacional de uma organização.

---

# 🔎 Fase 16 — Access Reviews

Criar:

    GRP-FINANCE

Adicionar:

    ana.silva
    carlos.oliveira
    diana.souza

Criar:

    Access Review

Fluxo:

    Group
      ↓
    Reviewer
      ├── Approve
      └── Deny
            ↓
       Access Removed

Testar:

    carlos.oliveira
        ↓
       Deny

Validar a remoção efetiva do acesso.

---

# 📦 Fase 17 — Entitlement Management

Criar:

    Catalog:
    Finance

Adicionar:

    FinanceApp
    GRP-FINANCE

Criar:

    Access Package:
    Finance Employee

Configurar, conforme disponibilidade:

- [ ] Request
- [ ] Approval
- [ ] Expiration
- [ ] Review

Fluxo:

    User
      ↓
    Request
      ↓
    Approval
      ↓
    Access Package
      ├── Group
      └── Application
      ↓
    Expiration

---

# 🔄 Fase 18 — Lifecycle Workflows

Cobrir:

    JOINER
    MOVER
    LEAVER

---

## Joiner

    New Employee
         ↓
    Lifecycle Workflow
         ↓
    Groups / Access Package
         ↓
    Application

---

## Mover

    Finance
       ↓
    Department Change
       ↓
    Remove Finance Access
       ↓
    Assign IT Access

---

## Leaver

    Employee Exit
       ↓
    Disable / Remove Access
       ↓
    Cleanup

---

# 🌎 Fase 19 — B2B

Criar:

    guest.finance

Testar:

    Guest User
       ↓
    B2B
       ↓
    Application

Estudar:

- [ ] Guest
- [ ] External User
- [ ] Cross-Tenant Access
- [ ] External Collaboration
- [ ] Guest Lifecycle

---

# 🔎 B2B Governance

Responder:

    Quem pode convidar?

    Quem aprova?

    Qual aplicação pode acessar?

    Por quanto tempo?

    Quem revisa?

    Quando remover?

Criar:

    Guest Access Review

---

# 🚨 Fase 20 — IAM Monitoring

Monitorar:

- [ ] Audit Logs
- [ ] Sign-in Logs
- [ ] Provisioning Logs
- [ ] PIM Logs
- [ ] Access Reviews
- [ ] Conditional Access
- [ ] Risk Events
- [ ] Application Changes
- [ ] Service Principal Changes

---

# 🚨 Eventos críticos

Criar casos de detecção para:

    User Created
    User Deleted
    User Disabled
    Group Created
    Group Membership Changed
    Role Assigned
    Role Removed
    PIM Activated
    PIM Assignment Changed
    Conditional Access Changed
    MFA Method Added
    MFA Method Removed
    Application Created
    Application Permission Changed
    Service Principal Created
    Client Secret Added
    Certificate Added
    Admin Consent Granted
    Guest Created
    Guest Removed
    Break-glass Login

Para cada detecção:

    Trigger
       ↓
    Detection
       ↓
    Investigation
       ↓
    Response
       ↓
    Evidence

---

# 🛡️ Fase 21 — IAM + SIEM

Arquitetura:

    Microsoft Entra
          ↓
        Logs
          ↓
      Monitoring
          ↓
         SIEM
          ↓
      Detection
          ↓
       Incident

Como já existe experiência com SOC no laboratório, utilizar IAM como fonte de casos de detecção.

---

# 🚨 Casos de detecção

Implementar:

    01. Global Administrator assigned
    02. Privileged role assigned
    03. MFA method changed
    04. Conditional Access changed
    05. Service Principal credential added
    06. Application permission changed
    07. Multiple failed sign-ins
    08. Risky sign-in
    09. Guest created
    10. Guest privilege changed
    11. Break-glass login
    12. PIM activation

Para cada caso documentar:

    Data Source
    Event
    Detection Logic
    Severity
    Investigation
    Response
    Evidence

---

# 🛡️ Fase 22 — PAM

> ⚠️ PAM é um domínio mais amplo que PIM. O laboratório deve manter os dois conceitos separados.

Modelo:

    Privileged Account
          ↓
        Vault
          ↓
       Approval
          ↓
    Credential Checkout
          ↓
        Target
          ↓
        Audit

---

# 🧰 PAM Lab

Criar papéis:

    PAM-Admin
    PAM-Operator
    PAM-Auditor

Criar contas:

    Administrator
    svc-app
    svc-db

---

# 🔐 PAM Vault

Armazenar:

    Privileged Credential

Modelo:

    Credential
         ↓
       Vault
         ↓
    Controlled Access

---

# ✅ PAM Approval

    Operator
       ↓
    Request
       ↓
    Approval
       ↓
    Checkout
       ↓
    Use
       ↓
    Audit

---

# 🔄 PAM Rotation

Quando suportado pela solução:

    Credential
         ↓
      Rotation
         ↓
    New Credential
         ↓
    Target Updated

Validar:

    Old Credential = Invalid
    New Credential = Valid

---

# 🎥 PAM Session

Se a solução suportar:

    Privileged Session
          ↓
       Recording
          ↓
        Audit

Registrar:

    Who
    When
    Where
    Target
    Duration
    Action

---

# 🧩 PAM gratuito para laboratório

O objetivo do módulo PAM é compreender o modelo operacional, mesmo que a solução corporativa completa não esteja disponível gratuitamente.

Praticar:

    DISCOVER
       ↓
    STORE
       ↓
    CONTROL
       ↓
    ROTATE
       ↓
    MONITOR
       ↓
    AUDIT

O laboratório deve diferenciar claramente:

    PIM
    =
    controle de ativação de privilégios

e:

    PAM
    =
    proteção e controle de contas,
    credenciais e sessões privilegiadas

---

# ⚖️ Fase 23 — Segregation of Duties

Criar funções:

| Função | Permissão |
|---|---|
| Helpdesk | Reset de senha |
| IAM Analyst | Grupos |
| IAM Admin | IAM Roles |
| Application Owner | Application Access |
| Manager | Aprovação |
| Auditor | Leitura |

Regra:

    REQUESTOR
        ≠
    APPROVER

E:

    APPROVER
        ≠
    AUDITOR

---

# 🧪 Cenário SoD

    Employee
       ↓
    Request Access
       ↓
    Manager
       ↓
    Approval
       ↓
    IAM
       ↓
    Provisioning
       ↓
    Audit

Nunca:

    Employee
       ↓
    Self Approval
       ↓
    Self Provisioning

---

# 🏆 Projeto Final

## Empresa simulada

    Contoso Lab

Departamentos:

    Finance
    IT
    HR
    Helpdesk

---

# 👤 Projeto — Joiner

Usuário:

    joao.silva

Cargo:

    Finance Analyst

Fluxo:

    HR
      ↓
    Identity
      ↓
    AD
      ↓
    Cloud Sync
      ↓
    Entra
      ↓
    Group
      ↓
    Access Package
      ↓
    FinanceApp

Aplicar:

- [ ] MFA
- [ ] Conditional Access
- [ ] Device Requirement
- [ ] Least Privilege

---

# 🔄 Projeto — Mover

Executar:

    Finance
       ↓
    IT

Remover:

- [ ] Finance Group
- [ ] Finance Application

Adicionar:

- [ ] IT Group
- [ ] IT Application

Validar:

    Old Access = REMOVED
    New Access = GRANTED

---

# 🔐 Projeto — Privileged Access

João precisa executar uma tarefa administrativa.

Fluxo:

    PAW
      ↓
    admin.iam
      ↓
    PIM
      ↓
    MFA
      ↓
    Approval
      ↓
    JIT
      ↓
    Target
      ↓
    Expiration

---

# 🔎 Projeto — Access Review

Criar:

    Access Review

Reviewer:

    Manager

Decisão:

    Approve

ou:

    Deny

Registrar evidência da decisão.

---

# 🚪 Projeto — Leaver

João deixa a empresa.

Executar:

    AD Disable
        ↓
    Cloud Sync
        ↓
    Entra Disable
        ↓
    Remove Groups
        ↓
    Remove Applications
        ↓
    Remove Privileged Access
        ↓
    Revoke Sessions conforme necessário
        ↓
    Audit

---

# 📋 Projeto — Auditoria

Responder:

    Quem criou João?

    Quem aprovou seus acessos?

    Quais grupos ele recebeu?

    Quais aplicações acessou?

    Quando recebeu privilégio?

    Quando ativou PIM?

    Quem aprovou?

    Qual foi a duração?

    Quando foi movido?

    Quando perdeu o acesso?

    Quando a conta foi desativada?

A resposta deve ser baseada em evidências, não em memória.

---

# 📸 Evidências

Capturar:

- [ ] 01 — AD User
- [ ] 02 — AD Group
- [ ] 03 — Cloud Sync
- [ ] 04 — Entra User
- [ ] 05 — MFA
- [ ] 06 — Conditional Access
- [ ] 07 — Device
- [ ] 08 — Application
- [ ] 09 — Access Package
- [ ] 10 — PIM
- [ ] 11 — Access Review
- [ ] 12 — Lifecycle Workflow
- [ ] 13 — Audit Logs
- [ ] 14 — SIEM Detection
- [ ] 15 — Leaver

Nunca capturar ou publicar:

- ❌ Password
- ❌ Client Secret
- ❌ Private Key
- ❌ Access Token
- ❌ Refresh Token
- ❌ API Key
- ❌ Dados pessoais desnecessários

---

# 📚 Portfólio

Estrutura recomendada:

    microsoft-iam-homelab/
    │
    ├── README.md
    │
    ├── architecture/
    │   ├── architecture.md
    │   ├── network.md
    │   └── identity-flow.md
    │
    ├── active-directory/
    │   ├── structure.md
    │   ├── users.md
    │   ├── groups.md
    │   ├── gpo.md
    │   ├── jml.md
    │   └── service-accounts.md
    │
    ├── entra-id/
    │   ├── users.md
    │   ├── groups.md
    │   ├── roles.md
    │   ├── rbac.md
    │   ├── authentication.md
    │   ├── mfa.md
    │   ├── sspr.md
    │   ├── conditional-access.md
    │   └── device-identity.md
    │
    ├── hybrid/
    │   ├── cloud-sync.md
    │   ├── hybrid-identity.md
    │   ├── hybrid-join.md
    │   └── troubleshooting.md
    │
    ├── applications/
    │   ├── app-registration.md
    │   ├── service-principal.md
    │   ├── managed-identity.md
    │   ├── workload-identity.md
    │   ├── saml.md
    │   ├── oauth.md
    │   ├── oidc.md
    │   ├── jwt.md
    │   └── scim.md
    │
    ├── governance/
    │   ├── pim.md
    │   ├── access-reviews.md
    │   ├── entitlement-management.md
    │   ├── access-packages.md
    │   ├── lifecycle-workflows.md
    │   ├── identity-protection.md
    │   ├── b2b.md
    │   └── sod.md
    │
    ├── monitoring/
    │   ├── audit-logs.md
    │   ├── sign-in-logs.md
    │   ├── provisioning-logs.md
    │   ├── siem.md
    │   └── detections.md
    │
    ├── pam/
    │   ├── architecture.md
    │   ├── vault.md
    │   ├── privileged-accounts.md
    │   ├── approval.md
    │   ├── rotation.md
    │   └── audit.md
    │
    ├── automation/
    │   ├── New-IAMUser.ps1
    │   ├── Disable-IAMUser.ps1
    │   ├── Add-IAMGroup.ps1
    │   ├── Remove-IAMAccess.ps1
    │   ├── Get-InactiveUsers.ps1
    │   ├── Get-PrivilegedUsers.ps1
    │   ├── Get-ServicePrincipals.ps1
    │   └── Export-IAMReport.ps1
    │
    ├── evidence/
    │   ├── screenshots/
    │   ├── reports/
    │   └── diagrams/
    │
    └── projects/
        ├── hybrid-jml.md
        ├── privileged-access.md
        └── iam-soc-integration.md

---

# 📝 Padrão de documentação

Cada laboratório deve possuir:

    # 🎯 Objetivo

    # 🏢 Cenário

    # 🏗️ Arquitetura

    # 📋 Pré-requisitos

    # ⚙️ Configuração

    # 🧪 Teste

    # ✅ Resultado esperado

    # 📊 Resultado obtido

    # 📸 Evidências

    # 🐛 Problemas encontrados

    # 🔧 Troubleshooting

    # ⚠️ Riscos

    # 🛡️ Boas práticas

    # 📌 Conclusão técnica

---

# 🐛 Padrão de Troubleshooting

Nunca registrar apenas:

    "Funcionou."

Utilizar:

    SINTOMA
       ↓
    HIPÓTESE
       ↓
    TESTE
       ↓
    RESULTADO
       ↓
    CAUSA RAIZ
       ↓
    CORREÇÃO
       ↓
    VALIDAÇÃO

Exemplo:

    Sintoma:
    Usuário não sincronizou.

    Hipótese:
    OU fora do escopo.

    Teste:
    Verificar configuração do Cloud Sync.

    Resultado:
    OU não estava incluída.

    Correção:
    Adicionar OU ao escopo.

    Validação:
    Executar sincronização.

    Resultado:
    Usuário sincronizado.

---

# 💰 Estratégia de laboratório e licenciamento

Separar o laboratório em dois grupos.

## 🟢 Base

Manter permanentemente:

- [ ] AD
- [ ] DNS
- [ ] GPO
- [ ] PowerShell
- [ ] Graph
- [ ] Entra
- [ ] RBAC
- [ ] MFA
- [ ] Conditional Access
- [ ] SSPR
- [ ] Device Identity
- [ ] Hybrid Identity
- [ ] SAML
- [ ] OAuth
- [ ] OIDC
- [ ] JWT
- [ ] SCIM
- [ ] Application Identity
- [ ] Workload Identity
- [ ] Monitoring

---

## 🟡 Premium Sprint

Ativar somente durante exercícios específicos:

- [ ] PIM
- [ ] Identity Protection
- [ ] Access Reviews
- [ ] Entitlement Management
- [ ] Lifecycle Workflows
- [ ] Outros recursos dependentes de licença

Antes do exercício:

    Verificar licença
         ↓
    Identificar usuário necessário
         ↓
    Habilitar recurso
         ↓
    Executar laboratório
         ↓
    Capturar evidências
         ↓
    Remover configuração
         ↓
    Liberar licença quando aplicável

Os requisitos de licenciamento podem mudar. Sempre confirmar a documentação e o licenciamento atual da Microsoft antes de executar o laboratório.

---

# 🧠 IAM × IGA × PIM × PAM

## IAM

    Quem é?
    Como autentica?
    O que pode acessar?

## IGA

    Por que possui acesso?
    Quem aprovou?
    Quem revisou?
    Quando expira?

## PIM

    Quem pode administrar?
    Quando?
    Por quanto tempo?
    Com qual controle?

## PAM

    Como proteger credenciais privilegiadas?
    Como controlar sessões?
    Como armazenar?
    Como rotacionar?
    Como auditar?

---

# 🧭 Ordem de estudo

    01. IAM Fundamentals
    02. Active Directory
    03. Groups
    04. RBAC
    05. Entra ID
    06. Authentication
    07. MFA
    08. Conditional Access
    09. SSPR
    10. Device Identity
    11. Hybrid Identity
    12. JML
    13. Application Identity
    14. Service Principals
    15. Managed Identity
    16. Workload Identity
    17. Azure RBAC
    18. Enterprise Applications
    19. SAML
    20. OAuth 2.0
    21. OIDC
    22. JWT
    23. SCIM
    24. PowerShell
    25. Microsoft Graph
    26. Identity Protection
    27. PIM
    28. Access Reviews
    29. Entitlement Management
    30. Access Packages
    31. Lifecycle Workflows
    32. B2B
    33. Service Account Governance
    34. Monitoring
    35. SIEM
    36. PAM
    37. SoD
    38. PAW
    39. Projeto Final

---

# 📊 Nível de domínio

## Nível 1 — Conhece

Consegue explicar o conceito.

## Nível 2 — Configura

Consegue implementar.

## Nível 3 — Opera

Consegue administrar.

## Nível 4 — Troubleshoots

Consegue investigar e corrigir.

## Nível 5 — Automatiza

Consegue automatizar.

## Nível 6 — Governa

Consegue definir controles, revisão e auditoria.

---

# 🎯 Meta recomendada

Buscar nível 4–5 em:

- Active Directory
- Microsoft Entra ID
- Hybrid Identity
- RBAC
- Conditional Access
- MFA
- JML
- PIM
- PowerShell
- Microsoft Graph
- Governance

Buscar inicialmente nível 3–4 em:

- SAML
- OAuth
- OIDC
- SCIM
- PAM
- Identity Protection
- B2B
- Workload Identity

---

# 🧪 Regra de conclusão

Não considerar:

    "Funcionou."

como conclusão.

Utilizar:

    EXPLICAR
       +
    IMPLEMENTAR
       +
    TESTAR
       +
    INVESTIGAR
       +
    CORRIGIR
       +
    AUDITAR
       +
    AUTOMATIZAR
       +
    DOCUMENTAR

---

# 🎓 Perguntas de entrevista

## Identity

    O que é uma identidade?

    Qual diferença entre User, Group,
    Service Principal e Managed Identity?

    Como funciona JML?

---

## Authentication

    Qual diferença entre Authentication
    e Authorization?

    O que é MFA?

    O que é phishing-resistant authentication?

    Por que FIDO2 é mais resistente a phishing?

---

## Authorization

    O que é RBAC?

    Qual diferença entre Entra Directory Roles
    e Azure RBAC?

    O que significa Least Privilege?

---

## Conditional Access

    Como uma política CA é avaliada?

    O que é Report-only?

    Como evitar lockout administrativo?

    O que é Authentication Strength?

---

## Hybrid Identity

    Como AD chega ao Entra?

    Qual função do Cloud Sync?

    O que é Hybrid Join?

    Como investigar usuário não sincronizado?

---

## PIM

    Qual diferença entre Active e Eligible?

    Por que JIT reduz risco?

    Como auditar uma ativação?

---

## Governance

    Por que fazer Access Review?

    O que é Access Package?

    Qual diferença entre PIM
    e Entitlement Management?

    Como Lifecycle Workflows participa do JML?

---

## Application Identity

    Qual diferença entre Application Object
    e Service Principal?

    O que é Delegated Permission?

    O que é Application Permission?

    O que é Admin Consent?

    Quando utilizar Managed Identity?

---

## Protocolos

    O que é SAML?

    O que é OAuth?

    O que é OIDC?

    Qual diferença entre Access Token
    e ID Token?

    O que é JWT?

    Por que PKCE existe?

    O que é SCIM?

---

## PAM

    Qual diferença entre IAM, PIM e PAM?

    O que é Credential Vault?

    Por que rotacionar credenciais?

    Como controlar Service Accounts?

---

# 🏁 Definição de pronto

## Active Directory

- [ ] AD DS
- [ ] DNS
- [ ] OU
- [ ] Users
- [ ] Groups
- [ ] GPO
- [ ] Service Accounts
- [ ] Admin Accounts
- [ ] JML
- [ ] Leaver

---

## Entra ID

- [ ] Users
- [ ] Groups
- [ ] Directory Roles
- [ ] Azure RBAC
- [ ] Least Privilege
- [ ] Break-glass

---

## Authentication

- [ ] MFA
- [ ] Authenticator
- [ ] FIDO2
- [ ] Passkeys
- [ ] Authentication Strength
- [ ] SSPR

---

## Conditional Access

- [ ] MFA
- [ ] Admin
- [ ] Legacy Authentication
- [ ] Device
- [ ] Location
- [ ] Application
- [ ] Phishing-resistant
- [ ] Report-only

---

## Device Identity

- [ ] Registered
- [ ] Joined
- [ ] Hybrid Joined
- [ ] PAW

---

## Hybrid Identity

- [ ] SYNC01
- [ ] Cloud Sync
- [ ] IdFix
- [ ] OU Filtering
- [ ] User Sync
- [ ] Group Sync
- [ ] Hybrid Join
- [ ] Troubleshooting

---

## Application Identity

- [ ] App Registration
- [ ] Application Object
- [ ] Service Principal
- [ ] API Permissions
- [ ] Delegated Permissions
- [ ] Application Permissions
- [ ] Admin Consent
- [ ] Client Secret
- [ ] Certificate
- [ ] Enterprise Application

---

## Workload Identity

- [ ] Service Principal
- [ ] Managed Identity
- [ ] Workload Identity
- [ ] Credential Rotation
- [ ] Least Privilege

---

## Protocolos

- [ ] SAML
- [ ] OAuth 2.0
- [ ] OIDC
- [ ] JWT
- [ ] PKCE
- [ ] SCIM

---

## Automation

- [ ] PowerShell
- [ ] Microsoft Graph
- [ ] REST
- [ ] JSON
- [ ] JML Automation
- [ ] Reporting
- [ ] Logging
- [ ] Error Handling

---

## Governance

- [ ] PIM
- [ ] Access Reviews
- [ ] Entitlement Management
- [ ] Access Packages
- [ ] Lifecycle Workflows
- [ ] Identity Protection
- [ ] B2B
- [ ] SoD

---

## Monitoring

- [ ] Audit Logs
- [ ] Sign-in Logs
- [ ] Provisioning Logs
- [ ] PIM Logs
- [ ] Risk Logs
- [ ] Conditional Access Logs
- [ ] SIEM
- [ ] Detection
- [ ] Incident Response

---

## PAM

- [ ] Vault
- [ ] Privileged Accounts
- [ ] RBAC
- [ ] Approval
- [ ] Rotation
- [ ] Session
- [ ] Audit

---

# 🏅 Resultado profissional esperado

Ao terminar, você deve conseguir demonstrar:

    IDENTITY
       ↓
    AUTHENTICATION
       ↓
    DEVICE
       ↓
    ACCESS
       ↓
    APPLICATION
       ↓
    PRIVILEGE
       ↓
    GOVERNANCE
       ↓
    MONITORING
       ↓
    AUDIT
       ↓
    MOVER
       ↓
    LEAVER

E responder tecnicamente:

    Quem é o usuário?
          ↓
    De onde veio?
          ↓
    Como autenticou?
          ↓
    Qual dispositivo utilizou?
          ↓
    Quais grupos possui?
          ↓
    Quais aplicações acessa?
          ↓
    Por que possui acesso?
          ↓
    Quem aprovou?
          ↓
    O acesso foi revisado?
          ↓
    Possui privilégios?
          ↓
    Como são protegidos?
          ↓
    Como são monitorados?
          ↓
    Como são removidos?
          ↓
    Qual evidência ficou?

---

# 🧭 Atalhos rápidos

| Tema | Fase |
|---|---|
| 👤 Identidades | [Fase 1](#-fase-1--active-directory) |
| 👥 Grupos | [Fase 2](#-fase-2--identidades-e-grupos) |
| 🔐 MFA | [Fase 5](#-fase-5--authentication) |
| 🚦 Conditional Access | [Fase 6](#-fase-6--conditional-access) |
| 💻 Device Identity | [Fase 7](#-fase-7--device-identity) |
| 🔄 Hybrid Identity | [Fase 8](#-fase-8--hybrid-identity) |
| 👨‍💼 JML | [Fase 9](#-fase-9--jml) |
| 📱 Applications | [Fase 10](#-fase-10--application-identity) |
| 🤖 Workload Identity | [Fase 11](#-fase-11--workload-identity) |
| 🔐 SAML/OAuth/OIDC | [Fase 12](#-fase-12--protocolos) |
| 💻 Graph/PowerShell | [Fase 13](#️-fase-13--powershell-e-microsoft-graph) |
| 🧠 Identity Protection | [Fase 14](#-fase-14--identity-protection) |
| ⏱️ PIM | [Fase 15](#️-fase-15--pim) |
| 🔎 Access Reviews | [Fase 16](#-fase-16--access-reviews) |
| 📦 Access Packages | [Fase 17](#-fase-17--entitlement-management) |
| 🔄 Lifecycle | [Fase 18](#-fase-18--lifecycle-workflows) |
| 🌎 B2B | [Fase 19](#-fase-19--b2b) |
| 🚨 IAM + SIEM | [Fase 20](#-fase-20--iam-monitoring) |
| 🛡️ PAM | [Fase 21](#️-fase-21--pam) |
| ⚖️ SoD | [Fase 22](#️-fase-22--segregation-of-duties) |
| 🏆 Projeto completo | [Projeto Final](#-projeto-final) |

---

# 📌 Regra operacional do laboratório

    ┌──────────────────────────────────────┐
    │                                      │
    │  CONFIGURE                           │
    │      ↓                               │
    │  TESTE                              │
    │      ↓                               │
    │  QUEBRE                             │
    │      ↓                               │
    │  INVESTIGUE                         │
    │      ↓                               │
    │  CORRIJA                            │
    │      ↓                               │
    │  AUTOMATIZE                         │
    │      ↓                               │
    │  AUDITE                             │
    │      ↓                               │
    │  DOCUMENTE                          │
    │                                      │
    └──────────────────────────────────────┘

> 🔐 O objetivo do laboratório não é apenas demonstrar que uma configuração funciona. É demonstrar que você entende quem recebeu acesso, por que recebeu, qual privilégio foi concedido, como o acesso é controlado, como é monitorado, como pode ser investigado e como será removido.
