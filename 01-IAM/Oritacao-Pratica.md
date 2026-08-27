# 🔐 MICROSOFT IAM HOMELAB
## Manual Operacional — Active Directory + Entra ID + Hybrid IAM + Governance + PAM

> Versão: 1.0  
> Data: 2026  
> Objetivo: laboratório profissional para carreira em IAM  
> Plataforma principal: Microsoft Active Directory + Microsoft Entra ID  
> Perfil: IAM / Identity Security / Entra ID / Hybrid Identity

---

# 🧭 ÍNDICE

1. [🎯 Objetivo](#-objetivo)
2. [🏗️ Arquitetura](#️-arquitetura)
3. [💻 Infraestrutura](#-infraestrutura)
4. [🌐 Rede](#-rede)
5. [🧰 Preparação](#-preparação)
6. [🟦 Fase 1 — Active Directory](#-fase-1--active-directory)
7. [👥 Fase 2 — Usuários e Grupos](#-fase-2--usuários-e-grupos)
8. [🛡️ Fase 3 — GPO e Hardening](#️-fase-3--gpo-e-hardening)
9. [☁️ Fase 4 — Entra ID](#️-fase-4--entra-id)
10. [🔐 Fase 5 — Authentication](#-fase-5--authentication)
11. [🚦 Fase 6 — Conditional Access](#-fase-6--conditional-access)
12. [💻 Fase 7 — Device Identity](#-fase-7--device-identity)
13. [🔄 Fase 8 — Hybrid Identity](#-fase-8--hybrid-identity)
14. [👨‍💼 Fase 9 — JML](#-fase-9--jml)
15. [📱 Fase 10 — Application Identity](#-fase-10--application-identity)
16. [🤖 Fase 11 — Workload Identity](#-fase-11--workload-identity)
17. [🔑 Fase 12 — SAML/OAuth/OIDC/JWT](#-fase-12--samloauthoidcjwt)
18. [⚙️ Fase 13 — PowerShell e Graph](#️-fase-13--powershell-e-graph)
19. [🧠 Fase 14 — Identity Protection](#-fase-14--identity-protection)
20. [⏱️ Fase 15 — PIM](#️-fase-15--pim)
21. [🔎 Fase 16 — Access Reviews](#-fase-16--access-reviews)
22. [📦 Fase 17 — Entitlement Management](#-fase-17--entitlement-management)
23. [🔄 Fase 18 — Lifecycle Workflows](#-fase-18--lifecycle-workflows)
24. [🌎 Fase 19 — B2B](#-fase-19--b2b)
25. [🚨 Fase 20 — IAM Monitoring](#-fase-20--iam-monitoring)
26. [🛡️ Fase 21 — PAM](#️-fase-21--pam)
27. [⚖️ Fase 22 — Segregation of Duties](#️-fase-22--segregation-of-duties)
28. [🏆 Projeto Final](#-projeto-final)
29. [📊 Checklist profissional](#-checklist-profissional)

---

# 🎯 OBJETIVO

Construir um ambiente corporativo fictício no qual você consiga executar:

    IDENTIDADE
        ↓
    AUTENTICAÇÃO
        ↓
    AUTORIZAÇÃO
        ↓
    PROVISIONAMENTO
        ↓
    ACESSO
        ↓
    PRIVILÉGIO
        ↓
    GOVERNANÇA
        ↓
    MONITORAMENTO
        ↓
    AUDITORIA
        ↓
    DESPROVISIONAMENTO

Ao final você deverá conseguir explicar e executar:

- Active Directory
- Microsoft Entra ID
- Hybrid Identity
- MFA
- Conditional Access
- RBAC
- JML
- Application Identity
- Service Principal
- Managed Identity
- OAuth 2.0
- OpenID Connect
- SAML
- JWT
- SCIM
- Microsoft Graph
- PowerShell
- PIM
- Access Reviews
- Entitlement Management
- Lifecycle Workflows
- B2B
- IAM Monitoring
- PAM
- SoD

---

# 🏗️ ARQUITETURA

## Arquitetura geral

    ┌─────────────────────────────────────────────────────────┐
    │                    MICROSOFT ENTRA ID                   │
    │                                                         │
    │ Users | Groups | MFA | CA | RBAC | Apps | Governance   │
    └──────────────────────────┬──────────────────────────────┘
                               │
                               │ Hybrid Identity
                               │
                               ▼
    ┌─────────────────────────────────────────────────────────┐
    │                    CLOUD SYNC                           │
    │                                                         │
    │ Microsoft Entra Provisioning Agent                     │
    └──────────────────────────┬──────────────────────────────┘
                               │
                               ▼
    ┌─────────────────────────────────────────────────────────┐
    │                 ACTIVE DIRECTORY                        │
    │                                                         │
    │ Users | Groups | OU | GPO | Computers | DNS            │
    └──────────────────────────┬──────────────────────────────┘
                               │
                 ┌─────────────┼──────────────┐
                 │             │              │
                 ▼             ▼              ▼
               WIN11         SRV01          PAW01
              Client        Server        Privileged
                                           Workstation

---

# 💻 INFRAESTRUTURA

## Máquinas

| Hostname | Sistema | Função | IP |
|---|---|---|---|
| DC01 | Windows Server | AD DS + DNS | 192.168.100.10 |
| SYNC01 | Windows Server | Cloud Sync Agent | 192.168.100.15 |
| SRV01 | Windows Server | Servidor corporativo | 192.168.100.20 |
| LINUX01 | Linux | Aplicação/PAM | 192.168.100.30 |
| WIN11-01 | Windows 11 | Workstation | DHCP |
| PAW01 | Windows 11 | Administração privilegiada | DHCP |

---

# 🌐 REDE

## Endereço

    Network:
    192.168.100.0/24

    Gateway:
    192.168.100.1

    DNS:
    192.168.100.10

    Domain:
    corp.lab

## DNS

Todos os computadores Windows do domínio deverão utilizar:

    DNS = 192.168.100.10

Não utilizar DNS público diretamente nas máquinas integrantes do domínio.

---

# 🧰 PREPARAÇÃO

## 1. Criar a rede virtual

No hypervisor escolhido:

    Network:
    IAM-LAB

    Network:
    192.168.100.0/24

Habilitar Internet somente quando necessário.

---

## 2. Criar DC01

Instalar Windows Server.

Hostname:

    DC01

Configurar:

    IP:
    192.168.100.10

    Mask:
    255.255.255.0

    Gateway:
    192.168.100.1

    Preferred DNS:
    192.168.100.10

---

## 3. Validar conectividade

Executar:

    ipconfig /all

Depois:

    ping 192.168.100.10

Depois:

    nslookup dc01.corp.lab

Resultado esperado:

    DC01 resolve para 192.168.100.10

---

# 🟦 FASE 1 — ACTIVE DIRECTORY

## Objetivo

Criar a autoridade de identidade on-premises.

---

## 1. Instalar AD DS

Abrir:

    Server Manager
    ↓
    Add Roles and Features
    ↓
    Role-based installation
    ↓
    Select DC01
    ↓
    Active Directory Domain Services
    ↓
    Add Features
    ↓
    Install

Não reiniciar antes de concluir a instalação, salvo se solicitado.

---

## 2. Promover DC01

Depois da instalação:

    Server Manager
    ↓
    Notifications
    ↓
    Promote this server to a domain controller

Selecionar:

    Add a new forest

Root domain:

    corp.lab

Definir uma senha DSRM forte e exclusiva.

Prosseguir com:

    DNS
    Global Catalog
    Database
    SYSVOL
    Prerequisites Check

Concluir.

---

## 3. Validar AD

Após reinicialização:

    whoami

Esperado:

    CORP\Administrator

Executar:

    dcdiag

Executar:

    nslookup corp.lab

Executar:

    nslookup dc01.corp.lab

Critério:

- [ ] DC funcional
- [ ] DNS funcional
- [ ] SYSVOL funcional
- [ ] NETLOGON funcional
- [ ] Sem erros críticos no dcdiag

---

# 👥 FASE 2 — USUÁRIOS E GRUPOS

## 1. Criar OUs

Criar:

    OU=Users
    OU=Groups
    OU=Servers
    OU=Workstations
    OU=Admins
    OU=Service Accounts
    OU=Disabled
    OU=IAM-Lab

Dentro de Users:

    OU=Finance
    OU=IT
    OU=HR
    OU=Helpdesk

---

# 2. Criar usuários

Criar:

    ana.silva
    bruno.santos
    carlos.oliveira
    diana.souza

Mapeamento:

    ana.silva
    Finance

    bruno.santos
    IT

    carlos.oliveira
    Helpdesk

    diana.souza
    HR

Criar contas administrativas:

    admin.iam
    admin.infra

Criar contas de serviço:

    svc-app
    svc-backup

---

# 3. Criar grupos

Criar grupos de segurança:

    GG-Finance
    GG-IT
    GG-HR
    GG-Helpdesk

    GG-IAM-Admins
    GG-IAM-Readers
    GG-Server-Admins

    GG-App-Finance
    GG-App-IT
    GG-App-HR

---

# 4. Regra de acesso

Utilizar:

    USER
      ↓
    GROUP
      ↓
    RESOURCE

Evitar:

    USER
      ↓
    RESOURCE

O objetivo é desenvolver o raciocínio de controle de acesso baseado em grupos.

---

# 5. Exercício

Adicionar:

    ana.silva
        ↓
    GG-Finance

Validar:

    Get-ADGroupMember GG-Finance

Resultado esperado:

    ana.silva

---

# 🔄 FASE 3 — JML ON-PREMISES

## JOINER

Criar:

    novo.finance

Configurar:

    Department = Finance

Mover para:

    OU=Finance

Adicionar:

    GG-Finance
    GG-App-Finance

Validar:

    Get-ADUser novo.finance -Properties Department

Depois:

    Get-ADPrincipalGroupMembership novo.finance

---

# MOVER

Alterar:

    Finance
       ↓
    IT

Executar:

    Remove-ADGroupMember GG-Finance novo.finance

Depois:

    Add-ADGroupMember GG-IT novo.finance

Validar:

    Get-ADPrincipalGroupMembership novo.finance

Resultado esperado:

    GG-IT

e ausência do:

    GG-Finance

---

# LEAVER

Executar:

    Disable-ADAccount novo.finance

Depois:

    Remove-ADGroupMember GG-IT novo.finance

Depois:

    Move-ADObject

Mover para:

    OU=Disabled

Validar:

    Get-ADUser novo.finance

Critério:

- [ ] Disabled
- [ ] Sem acesso antigo
- [ ] OU Disabled
- [ ] Evidência registrada

---

# 🛡️ FASE 4 — GPO E HARDENING

Criar:

    GPO-Security-Baseline

Configurar políticas de:

    Password Policy
    Account Lockout
    Audit Policy
    Screen Lock
    Windows Firewall

Aplicar primeiro:

    OU=IAM-Lab

Depois validar.

---

## Atualizar política

No cliente:

    gpupdate /force

Depois:

    gpresult /r

Validar:

    GPO-Security-Baseline

---

# ☁️ FASE 5 — MICROSOFT ENTRA ID

Criar tenant dedicado ao laboratório.

Não utilizar conta pessoal como identidade administrativa cotidiana.

Criar:

    cloud.admin
    cloud.iam
    cloud.user01
    cloud.user02

Criar duas contas de emergência:

    breakglass01
    breakglass02

A Microsoft recomenda duas contas de emergência cloud-only para cenários de perda de acesso administrativo. :contentReference[oaicite:1]{index=1}

---

# 🚨 BREAK-GLASS

Características:

- Cloud-only
- Uso emergencial
- Monitoramento
- Credenciais protegidas
- Não utilizar no dia a dia

Criar alerta conceitual:

    IF
    breakglass sign-in

    THEN
    HIGH SEVERITY

---

# 👥 FASE 6 — GRUPOS ENTRA

Criar:

    GRP-FINANCE
    GRP-IT
    GRP-HR
    GRP-HELPDESK

Criar:

    GRP-IAM-ADMINS
    GRP-IAM-READERS

Criar:

    GRP-APP-FINANCE
    GRP-APP-IT
    GRP-APP-HR

Para cada grupo documentar:

    Owner
    Purpose
    Membership
    Resource
    Review Frequency

---

# 🔑 FASE 7 — RBAC

## Conceito

Diferenciar:

    Entra Directory Roles

de:

    Azure RBAC

---

## Azure RBAC

Criar:

    Resource Group:
    rg-iam-lab

Criar uma VM ou recurso de laboratório.

Atribuir:

    Reader

Depois testar:

    leitura = permitido
    alteração = negada

Depois testar:

    Contributor

Depois:

    Owner

Documentar a diferença.

---

# 🔐 FASE 8 — AUTHENTICATION

Configurar:

    Microsoft Authenticator

Criar:

    cloud.user01

Registrar MFA.

Validar:

    Login
      ↓
    MFA
      ↓
    Access

---

# 🔑 FASE 9 — SSPR

Acessar:

    Entra ID
      ↓
    Password Reset

Configurar o cenário disponível no tenant.

Testar:

    User
      ↓
    Forgot Password
      ↓
    Verification
      ↓
    Password Reset

Registrar evidência.

---

# 🚦 FASE 10 — CONDITIONAL ACCESS

Conditional Access funciona como mecanismo de política baseado em sinais como usuário, dispositivo e localização. A Microsoft recomenda planejamento e testes antes de aplicar políticas em escala. :contentReference[oaicite:2]{index=2}

---

# ⚠️ REGRA DE SEGURANÇA

Antes de criar políticas abrangentes:

    REPORT-ONLY
         ↓
    TEST
         ↓
    WHAT IF
         ↓
    ANALYZE
         ↓
    ENABLE

O What If permite simular a avaliação das políticas habilitadas ou em Report-only. :contentReference[oaicite:3]{index=3}

---

# CA01 — MFA ADMIN

Criar política:

    CA01-Require-MFA-Admins

Users:

    Directory Roles

Target:

    All cloud apps

Grant:

    Require MFA

Inicialmente:

    Report-only

Testar.

---

# CA02 — BLOCK LEGACY AUTH

Criar:

    CA02-Block-Legacy-Authentication

Condition:

    Legacy Authentication

Grant:

    Block Access

Executar:

    What If

Validar impacto.

---

# CA03 — APPLICATION

Criar:

    CA03-Finance-App-MFA

Target:

    FinanceApp

Grant:

    MFA

Testar:

    cloud.user01

---

# CA04 — ADMIN PHISHING-RESISTANT

Se o tenant/licenciamento suportar:

    Authentication Strength

Selecionar:

    Phishing-resistant

Aplicar primeiro em usuário de laboratório.

---

# 💻 FASE 11 — DEVICE IDENTITY

Criar:

    WIN11-01

Ingressar no domínio:

    corp.lab

Validar no Windows:

    Settings
      ↓
    Accounts
      ↓
    Access work or school

Depois validar no Entra.

Estudar diferenças entre:

    Registered
    Joined
    Hybrid Joined

---

# 🖥️ PAW01

Criar máquina:

    PAW01

Finalidade:

    Administração privilegiada

Modelo:

    PAW01
      ↓
    admin.iam
      ↓
    PIM
      ↓
    Azure / Entra

Evitar administrar recursos privilegiados a partir da workstation cotidiana.

---

# 🔄 FASE 12 — HYBRID IDENTITY

## Arquitetura

    AD
     ↓
    Provisioning Agent
     ↓
    Cloud Sync
     ↓
    Entra ID

O Cloud Sync utiliza um agente local e um serviço de provisionamento gerenciado na nuvem; a configuração e o processamento são orquestrados pelo serviço do Entra. :contentReference[oaicite:4]{index=4}

---

# 🖥️ SYNC01

Instalar:

    Windows Server

Hostname:

    SYNC01

IP:

    192.168.100.15

DNS:

    192.168.100.10

Ingressar no domínio:

    corp.lab

---

# ☁️ INSTALAR PROVISIONING AGENT

No Entra Admin Center:

    Entra ID
      ↓
    Entra Connect
      ↓
    Cloud Sync
      ↓
    Agent
      ↓
    Download on-premises agent

A documentação atual da Microsoft orienta a instalação do agente pelo portal do Entra. :contentReference[oaicite:5]{index=5}

---

# 🔐 AGENT

Executar o instalador no SYNC01.

Durante o processo:

    Sign in
       ↓
    Authenticate
       ↓
    Register Agent
       ↓
    Verify Agent

No portal:

    Cloud Sync
       ↓
    Agents

Resultado:

    Agent = Active

---

# 🔎 IDFIX

Antes da sincronização, executar revisão de atributos.

Procurar:

    Duplicate
    Invalid
    Invalid Characters
    UPN Problems
    Proxy Address Problems

Corrigir problemas antes de ampliar o escopo.

---

# 🔄 CLOUD SYNC

Criar configuração.

Selecionar:

    Active Directory Domain

Selecionar escopo:

    OU=IAM-Lab

Inicialmente sincronizar somente:

    OU=IAM-Lab

Não começar sincronizando o domínio inteiro.

A configuração do Cloud Sync possui etapas de escopo, mapeamento de atributos, teste e ativação. :contentReference[oaicite:6]{index=6}

---

# 🧪 TESTE CLOUD SYNC

Criar:

    sync.test

No AD:

    OU=IAM-Lab

Aguardar sincronização.

Validar no Entra:

    Users
       ↓
    sync.test

Verificar:

    Source
    UPN
    Display Name
    Department

---

# 🧪 TESTE DE ALTERAÇÃO

No AD:

    Department:
    IT

Alterar para:

    Finance

Aguardar sincronização.

Validar no Entra.

Depois desabilitar no AD:

    Disable-ADAccount sync.test

Validar o comportamento no Entra.

Documentar:

    AD State
    Sync State
    Entra State

---

# 💻 FASE 13 — HYBRID JOIN

Com WIN11-01 ingressado no domínio:

    AD Joined
        ↓
    Hybrid Identity Configuration
        ↓
    Entra Device

Validar no Entra:

    Devices

Registrar:

    Device ID
    Join Type
    Enabled
    Last Activity

---

# 👨‍💼 FASE 14 — JML HÍBRIDO

## JOINER

Criar:

    joao.silva

No AD:

    OU=Finance

Adicionar:

    GG-Finance

Cloud Sync:

    AD
      ↓
    Entra

Depois:

    Entra
      ↓
    MFA
      ↓
    Application

---

# MOVER

Alterar:

    Finance
       ↓
    IT

Executar no AD:

    Remove-ADGroupMember GG-Finance joao.silva

Depois:

    Add-ADGroupMember GG-IT joao.silva

Aguardar sincronização.

Validar:

    Entra Groups

---

# LEAVER

Executar:

    Disable-ADAccount joao.silva

Aguardar sincronização.

Validar:

    Entra User

Depois verificar:

    Groups
    Applications
    Privileged Access
    Sessions

Registrar evidência.

---

# 📱 FASE 15 — APPLICATION IDENTITY

Criar:

    FinanceApp

No Entra:

    App registrations
      ↓
    New registration

Configuração inicial:

    Name:
    FinanceApp

    Account type:
    Single tenant

Registrar.

A criação de um App Registration também resulta em um Service Principal no tenant. O Service Principal representa a identidade da aplicação naquele tenant. :contentReference[oaicite:7]{index=7}

---

# 🔍 IDENTIFICADORES

Documentar:

    Application Client ID
    Directory Tenant ID
    Object ID
    Service Principal Object ID

Não confundir:

    Application Object

com:

    Service Principal Object

---

# 🔐 CLIENT SECRET

Criar somente para laboratório.

Documentar:

    Created
    Expiration
    Purpose
    Owner

Nunca:

    commit secret
    ↓
    GitHub

Depois testar:

    Rotation
    Revocation

---

# 📜 CERTIFICATE

Criar certificado de laboratório.

Testar:

    Application
       ↓
    Certificate
       ↓
    Authentication

Documentar:

    Thumbprint
    Expiration
    Owner

Nunca publicar:

    Private Key

---

# 🔑 API PERMISSIONS

Adicionar Microsoft Graph.

Estudar separadamente:

    Delegated Permission

e:

    Application Permission

Documentar:

    Permission
    Type
    Purpose
    Consent
    Risk

---

# 🤖 FASE 16 — WORKLOAD IDENTITY

## Managed Identity

Criar uma VM Azure.

Habilitar:

    System Assigned Managed Identity

Fluxo:

    VM
      ↓
    Managed Identity
      ↓
    Azure Resource

Conceder apenas a permissão necessária.

A Microsoft recomenda Managed Identity quando o código roda em um recurso Azure compatível e precisa acessar recursos que aceitam autenticação Microsoft Entra. :contentReference[oaicite:8]{index=8}

---

# 🔄 TESTE

Criar:

    Storage Account

Atribuir à VM:

    Storage Blob Data Reader

Testar acesso.

Depois remover a role.

Validar:

    Access = denied

---

# 🔑 FASE 17 — SAML

Criar ou utilizar aplicação de laboratório compatível com SAML.

Documentar:

    IdP
    SP
    Entity ID
    ACS URL
    Claims
    Certificate

Fluxo:

    User
      ↓
    Application
      ↓
    Entra
      ↓
    Authentication
      ↓
    SAML Assertion
      ↓
    Application

---

# 🔐 FASE 18 — OAUTH 2.0

Criar uma aplicação de laboratório.

Estudar:

    Authorization Endpoint
    Token Endpoint
    Client
    Resource Server
    Scope
    Access Token
    Refresh Token
    Authorization Code
    PKCE

Fluxo:

    Client
      ↓
    Authorization
      ↓
    Code
      ↓
    Token
      ↓
    Access Token
      ↓
    API

---

# 🪪 FASE 19 — OIDC

Entender:

    OAuth 2.0
       +
    Authentication Layer
       =
    OIDC

Estudar:

    ID Token
    Access Token
    Claims
    Issuer
    Audience
    Nonce
    State
    Redirect URI

---

# 🎫 FASE 20 — JWT

Estrutura:

    Header
       +
    Payload
       +
    Signature

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

    Signature
    Issuer
    Audience
    Expiration

Nunca confiar somente no conteúdo visual do token.

---

# 🔄 FASE 21 — SCIM

Utilizar uma aplicação de laboratório compatível.

Fluxo:

    Entra
      ↓
    SCIM
      ↓
    Application

Testar:

    CREATE
    UPDATE
    DISABLE
    DELETE / DEPROVISION

Documentar:

    Attribute Mapping

---

# ⚙️ FASE 22 — POWERSHELL

Criar diretório:

    C:\IAM-Lab\Scripts

Arquivos:

    New-IAMUser.ps1
    Disable-IAMUser.ps1
    Add-IAMGroup.ps1
    Remove-IAMAccess.ps1
    Get-PrivilegedUsers.ps1
    Get-InactiveUsers.ps1
    Export-IAMReport.ps1

---

# 👤 SCRIPT JOINER

Entrada:

    FirstName
    LastName
    Department
    JobTitle

Processo:

    Validate
       ↓
    Create
       ↓
    Attributes
       ↓
    Group
       ↓
    Log

Obrigatório:

- tratamento de erro
- validação
- logging
- sem senha hardcoded
- menor privilégio

---

# 🚪 SCRIPT LEAVER

Entrada:

    Username

Processo:

    Validate
       ↓
    Disable
       ↓
    Remove Access
       ↓
    Log

Resultado esperado:

    Account Disabled
    Access Removed
    Evidence Created

---

# 📊 FASE 23 — MICROSOFT GRAPH

Instalar módulo:

    Microsoft.Graph

Conectar utilizando o mecanismo de autenticação apropriado ao cenário.

Estudar operações:

    Users
    Groups
    Applications
    Service Principals
    Directory Roles

Objetivo:

    Portal
       ↓
    Graph
       ↓
    Automation

---

# 🧠 FASE 24 — IDENTITY PROTECTION

Executar somente se o tenant/licenciamento disponibilizar o recurso.

Estudar:

    User Risk
    Sign-in Risk
    Risk Detection
    Risky Users
    Risky Sign-ins
    Remediation

Fluxo:

    Sign-in
       ↓
    Detection
       ↓
    Risk
       ↓
    Policy
       ↓
    MFA / Reset / Block

---

# ⏱️ FASE 25 — PIM

> ⚠️ PIM exige licença válida. A documentação atual indica Microsoft Entra ID Governance ou Microsoft Entra ID P2 para utilização do PIM. :contentReference[oaicite:9]{index=9}

## Estratégia de custo

Utilizar:

    1 usuário de laboratório

Exemplo:

    admin.iam

Executar:

    License
       ↓
    Exercise
       ↓
    Evidence
       ↓
    Remove / Reassign
       ↓
    Next Exercise

Não é necessário manter múltiplos usuários licenciados apenas para reproduzir cada cenário do laboratório.

---

# 🔐 PIM — ROLE

Atribuir:

    Eligible

Em vez de:

    Permanent Active

Fluxo:

    admin.iam
       ↓
    Eligible
       ↓
    Activate
       ↓
    MFA
       ↓
    Justification
       ↓
    Approval
       ↓
    Temporary Role
       ↓
    Expiration

O PIM fornece acesso privilegiado just-in-time, ativação baseada em tempo, aprovação, MFA, justificativa e histórico de auditoria. :contentReference[oaicite:10]{index=10}

---

# 🧪 PIM TESTE

Executar:

    Activate

Registrar:

    Start
    End
    Role
    Justification

Depois verificar:

    Audit History

Resultado esperado:

    Activation recorded

---

# 🔎 FASE 26 — ACCESS REVIEWS

> ⚠️ Access Reviews possuem requisitos de licenciamento; a documentação atual indica Microsoft Entra ID P2 ou Microsoft Entra ID Governance para esse cenário. :contentReference[oaicite:11]{index=11}

Criar:

    GRP-FINANCE

Adicionar:

    ana.silva
    bruno.santos
    carlos.oliveira

Criar:

    Access Review

Reviewer:

    Manager

---

# 🧪 TESTE

Decisão:

    ana.silva
    APPROVE

    bruno.santos
    DENY

Aplicar resultado.

Validar:

    bruno.santos
       ↓
    GRP-FINANCE

Resultado:

    Membership removed

A documentação da Microsoft descreve o processo de revisão, decisão e aplicação das alterações após a revisão. :contentReference[oaicite:12]{index=12}

---

# 📦 FASE 27 — ENTITLEMENT MANAGEMENT

Executar se disponível no licenciamento.

Criar:

    Catalog:
    Finance

Adicionar:

    GRP-FINANCE
    FinanceApp

Criar:

    Access Package:
    Finance Employee

Fluxo:

    User
      ↓
    Request
      ↓
    Approval
      ↓
    Access Package
      ↓
    Group + Application
      ↓
    Expiration

Documentar:

    Resource
    Approval
    Expiration
    Owner

---

# 🔄 FASE 28 — LIFECYCLE WORKFLOWS

Executar se disponível.

Lifecycle Workflows modela os três momentos:

    JOINER
    MOVER
    LEAVER

A Microsoft define esses três estágios como o ciclo central do recurso. :contentReference[oaicite:13]{index=13}

---

# JOINER

Criar workflow de laboratório.

Evento:

    New Employee

Ações:

    Add to Group
    Notify
    Provision Access

---

# MOVER

Evento:

    Department Change

Ações:

    Remove Old Access
    Add New Access

---

# LEAVER

Evento:

    Employee Leaving

Ações:

    Remove Access
    Disable / Cleanup conforme o workflow disponível

---

# 🌎 FASE 29 — B2B

Criar:

    guest.finance

Convidar como Guest.

Adicionar somente:

    FinanceApp

Não conceder:

    Global Administrator

Testar:

    Guest
      ↓
    Authentication
      ↓
    Application
      ↓
    Access

---

# 🔎 FASE 30 — GOVERNANÇA DE GUEST

Responder:

    Quem pode convidar?

    Quem aprova?

    Qual recurso o guest acessa?

    Quando expira?

    Quem revisa?

    Quando remove?

Criar revisão específica se disponível.

---

# 🚨 FASE 31 — IAM MONITORING

Monitorar:

    Audit Logs
    Sign-in Logs
    Provisioning Logs
    PIM
    Conditional Access
    Applications
    Service Principals
    Groups

---

# 🚨 CASOS DE DETECÇÃO

Criar casos conceituais:

    01 - Global Admin Assigned
    02 - Privileged Role Assigned
    03 - MFA Method Added
    04 - MFA Method Removed
    05 - Conditional Access Changed
    06 - Service Principal Created
    07 - Client Secret Added
    08 - Certificate Added
    09 - Application Permission Changed
    10 - Admin Consent
    11 - Guest Created
    12 - Breakglass Login
    13 - PIM Activation
    14 - User Disabled
    15 - Group Membership Changed

---

# 🛡️ FASE 32 — IAM + SIEM

Arquitetura:

    Entra
      ↓
    Logs
      ↓
    SIEM
      ↓
    Detection
      ↓
    Alert
      ↓
    Investigation
      ↓
    Response

---

# 🚨 CASO SOC 01

Evento:

    Privileged Role Assignment

Investigar:

    Who?
    When?
    Role?
    Target?
    Source?
    Justification?
    PIM?
    Approval?

---

# 🚨 CASO SOC 02

Evento:

    MFA Method Added

Investigar:

    User
    Time
    IP
    Device
    Previous Authentication
    Risk

Resposta potencial de laboratório:

    Disable User
    Revoke Sessions
    Remove Unauthorized Method
    Reset Credentials
    Investigate

---

# 🚨 CASO SOC 03

Evento:

    Breakglass Login

Classificação:

    HIGH

Investigar imediatamente:

    Who
    When
    Source
    Device
    Activity

---

# 🛡️ FASE 33 — PAM

PAM não deve ser tratado como sinônimo de PIM.

## PIM

    Privilege
       ↓
    JIT
       ↓
    Activation
       ↓
    Expiration

## PAM

    Privileged Account
       ↓
    Vault
       ↓
    Approval
       ↓
    Credential
       ↓
    Session
       ↓
    Audit

---

# 🧪 PAM LAB

Criar contas:

    Administrator
    svc-app
    svc-backup

Criar papéis:

    PAM-Admin
    PAM-Operator
    PAM-Auditor

---

# 🔐 PAM VAULT

Guardar credencial de laboratório.

Modelo:

    Credential
       ↓
    Vault
       ↓
    Controlled Checkout

Registrar:

    Owner
    Target
    Purpose
    Rotation

---

# 🔄 PAM ROTATION

Executar:

    Checkout
       ↓
    Use
       ↓
    Return
       ↓
    Rotate

Validar:

    Old Password = Invalid
    New Password = Valid

---

# 🎥 PAM SESSION

Se a ferramenta utilizada suportar:

    User
      ↓
    Privileged Session
      ↓
    Recording
      ↓
    Audit

Registrar:

    User
    Target
    Start
    End
    Duration

---

# ⚖️ FASE 34 — SEGREGATION OF DUTIES

Criar funções:

    Requester
    Approver
    IAM Operator
    Auditor

Regra:

    REQUESTER
       ≠
    APPROVER

E:

    OPERATOR
       ≠
    AUDITOR

---

# 🧪 CENÁRIO

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

Testar tentativa:

    Employee
       ↓
    Self Approval

Resultado esperado:

    DENIED

---

# 🏆 PROJETO FINAL

## Empresa

    Contoso Lab

## Departamentos

    Finance
    IT
    HR
    Helpdesk

---

# 👤 CENÁRIO 01 — JOINER

Criar:

    joao.silva

Cargo:

    Finance Analyst

Processo:

    AD
      ↓
    OU Finance
      ↓
    Group Finance
      ↓
    Cloud Sync
      ↓
    Entra
      ↓
    MFA
      ↓
    Conditional Access
      ↓
    FinanceApp

---

# 🔄 CENÁRIO 02 — MOVER

Alterar:

    Finance
       ↓
    IT

Remover:

    Finance Access

Adicionar:

    IT Access

Validar:

    Old Access = DENIED
    New Access = ALLOWED

---

# 🔐 CENÁRIO 03 — PRIVILEGED ACCESS

João precisa executar uma tarefa administrativa.

Fluxo:

    PAW01
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

# 🔎 CENÁRIO 04 — ACCESS REVIEW

Criar revisão.

Reviewer:

    Manager

Decidir:

    Approve
    ou
    Deny

Aplicar.

Validar acesso efetivo.

---

# 🚪 CENÁRIO 05 — LEAVER

João deixa a empresa.

Executar:

    Disable AD
       ↓
    Sync
       ↓
    Disable Entra
       ↓
    Remove Groups
       ↓
    Remove Application
       ↓
    Remove Privileged Access
       ↓
    Revoke Sessions quando necessário
       ↓
    Audit

---

# 🚨 CENÁRIO 06 — INCIDENTE IAM

Simular:

    MFA Method Added

Investigar:

    User
    IP
    Device
    Timestamp
    Previous Login
    Audit Event

Responder:

    Disable
    Revoke
    Investigate
    Restore

Documentar:

    Timeline
    Root Cause
    Action
    Evidence

---

# 📸 EVIDÊNCIAS

Para cada exercício guardar:

    01-architecture
    02-configuration
    03-test
    04-result
    05-audit

Exemplo:

    evidence/
    └── conditional-access/
        ├── policy.png
        ├── what-if.png
        ├── sign-in.png
        └── result.md

---

# 🔒 NUNCA PUBLICAR

Não colocar no GitHub:

    Passwords
    Client Secrets
    Private Keys
    Access Tokens
    Refresh Tokens
    API Keys
    Recovery Codes
    Real Personal Data

---

# 📝 PADRÃO DE DOCUMENTAÇÃO

Cada laboratório deve conter:

    # Objetivo

    # Cenário

    # Pré-requisitos

    # Arquitetura

    # Configuração

    # Teste

    # Resultado Esperado

    # Resultado Obtido

    # Evidências

    # Problemas

    # Troubleshooting

    # Boas Práticas

    # Conclusão Técnica

---

# 🐛 TROUBLESHOOTING

Nunca escrever:

    "Não funcionou."

Utilizar:

    SINTOMA
       ↓
    HIPÓTESE
       ↓
    TESTE
       ↓
    RESULTADO
       ↓
    CAUSA
       ↓
    CORREÇÃO
       ↓
    VALIDAÇÃO

---

# 🔄 EXEMPLO — CLOUD SYNC

Sintoma:

    User not synchronized

Hipóteses:

    OU fora do escopo
    Attribute problem
    Agent unavailable
    Domain problem

Testes:

    Check Agent
    Check Scope
    Check Attribute
    Check Logs

Correção:

    Ajustar causa encontrada

Validação:

    User appears in Entra

---

# 📊 CHECKLIST PROFISSIONAL

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

## Entra

- [ ] Users
- [ ] Groups
- [ ] Roles
- [ ] RBAC
- [ ] Breakglass

## Authentication

- [ ] MFA
- [ ] SSPR
- [ ] Passwordless
- [ ] FIDO2
- [ ] Authentication Strength

## Conditional Access

- [ ] MFA
- [ ] Admin
- [ ] Legacy Auth
- [ ] Application
- [ ] Device
- [ ] Location
- [ ] Report-only
- [ ] What If

## Hybrid

- [ ] Provisioning Agent
- [ ] Cloud Sync
- [ ] Scope
- [ ] Attribute Mapping
- [ ] Troubleshooting
- [ ] Hybrid Join

## Application

- [ ] App Registration
- [ ] Service Principal
- [ ] API Permissions
- [ ] Admin Consent
- [ ] Secret
- [ ] Certificate

## Workload

- [ ] Service Principal
- [ ] Managed Identity
- [ ] Least Privilege

## Protocols

- [ ] SAML
- [ ] OAuth
- [ ] OIDC
- [ ] JWT
- [ ] SCIM
- [ ] PKCE

## Automation

- [ ] PowerShell
- [ ] Graph
- [ ] JML Automation
- [ ] Reporting
- [ ] Logging

## Governance

- [ ] PIM
- [ ] Access Reviews
- [ ] Entitlement Management
- [ ] Lifecycle Workflows
- [ ] B2B
- [ ] SoD

## Monitoring

- [ ] Audit
- [ ] Sign-in
- [ ] Provisioning
- [ ] PIM
- [ ] CA
- [ ] SIEM
- [ ] Detection

## PAM

- [ ] Vault
- [ ] Privileged Accounts
- [ ] Approval
- [ ] Rotation
- [ ] Session
- [ ] Audit

---

# 🧠 CRITÉRIO DE DOMÍNIO

Não considerar o conhecimento concluído porque conseguiu clicar no portal.

Para cada tecnologia:

    NÍVEL 1
    EXPLICAR

    ↓

    NÍVEL 2
    CONFIGURAR

    ↓

    NÍVEL 3
    OPERAR

    ↓

    NÍVEL 4
    TROUBLESHOOT

    ↓

    NÍVEL 5
    AUTOMATIZAR

    ↓

    NÍVEL 6
    GOVERNAR

Meta:

    Entra ID          → Nível 5
    AD                → Nível 5
    Hybrid Identity   → Nível 4/5
    Conditional Access→ Nível 4/5
    RBAC              → Nível 4/5
    JML               → Nível 5
    PIM               → Nível 4
    Graph             → Nível 4/5
    PowerShell        → Nível 5
    Application IAM   → Nível 4
    Protocols         → Nível 4
    Governance        → Nível 4
    PAM               → Nível 3/4

---

# 🎓 PERGUNTAS DE ENTREVISTA

## IAM

    O que é IAM?

    Qual diferença entre Authentication
    e Authorization?

    O que é Least Privilege?

    O que é JML?

---

## Entra

    O que é Microsoft Entra ID?

    Qual diferença entre User,
    Group, Service Principal e Managed Identity?

---

## Hybrid

    Como AD sincroniza com Entra?

    O que é Cloud Sync?

    Como investigar um usuário
    que não sincronizou?

---

## Conditional Access

    O que é Conditional Access?

    Como você evita lockout administrativo?

    O que é Report-only?

    Para que serve What If?

---

## PIM

    Qual diferença entre Active
    e Eligible?

    Por que JIT é importante?

    Como você auditaria uma ativação?

---

## Application Identity

    O que é Service Principal?

    Qual diferença entre Application
    e Service Principal?

    Delegated versus Application Permission?

    Quando usar Managed Identity?

---

## Protocolos

    SAML versus OIDC?

    OAuth versus OIDC?

    Access Token versus ID Token?

    O que é JWT?

    Para que serve PKCE?

    O que é SCIM?

---

## PAM

    IAM versus PIM versus PAM?

    Por que utilizar Vault?

    Por que rotacionar credenciais?

    Como proteger Service Accounts?

---

# 🏁 DEFINIÇÃO DE PRONTO

O laboratório estará concluído quando você conseguir executar o seguinte cenário sem consultar o manual:

    1. Criar usuário
             ↓
    2. Atribuir departamento
             ↓
    3. Associar grupo
             ↓
    4. Sincronizar
             ↓
    5. Autenticar
             ↓
    6. Aplicar MFA
             ↓
    7. Conditional Access
             ↓
    8. Acessar aplicação
             ↓
    9. Solicitar privilégio
             ↓
    10. Ativar PIM
             ↓
    11. Executar tarefa
             ↓
    12. Auditar
             ↓
    13. Access Review
             ↓
    14. Mover usuário
             ↓
    15. Remover acesso antigo
             ↓
    16. Desligar usuário
             ↓
    17. Revogar acesso
             ↓
    18. Investigar logs
             ↓
    19. Gerar evidência
             ↓
    20. Documentar

---

# 📚 FONTES OFICIAIS

Microsoft Entra ID:
https://learn.microsoft.com/en-us/entra/identity/

Conditional Access:
https://learn.microsoft.com/en-us/entra/identity/conditional-access/

Cloud Sync:
https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/what-is-cloud-sync

PIM:
https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

Licenciamento Entra:
https://learn.microsoft.com/en-us/entra/fundamentals/licensing

Identity Governance:
https://learn.microsoft.com/en-us/entra/id-governance/

Application Identity:
https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals

---

# 🏆 RESULTADO FINAL

O objetivo profissional deste laboratório é chegar ao seguinte modelo mental:

                  IDENTITY
                     │
                     ▼
              AUTHENTICATION
                     │
                     ▼
                 DEVICE
                     │
                     ▼
               AUTHORIZATION
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
        RBAC                    CA
          │                     │
          └──────────┬──────────┘
                     ▼
                  ACCESS
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
      APPLICATION            PRIVILEGE
          │                     │
          │                    PIM
          │                     │
          │                    PAM
          └──────────┬──────────┘
                     ▼
                GOVERNANCE
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
         JML      REVIEWS    ENTITLEMENT
                     │
                     ▼
                 MONITORING
                     │
                     ▼
                    SIEM
                     │
                     ▼
                   AUDIT

A partir daqui, o laboratório deixa de ser apenas um ambiente de estudos e passa a funcionar como uma simulação de uma operação corporativa de IAM.
