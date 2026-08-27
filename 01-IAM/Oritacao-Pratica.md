# 🔐 IAM HOMELAB — MANUAL OPERACIONAL

**Objetivo:** preparar, praticar e demonstrar competências para atuação profissional em IAM, com foco em Microsoft Active Directory, Microsoft Entra ID, Hybrid Identity, Authentication, Authorization, Governance, Privileged Access, Application Identity e automação.

**Princípio de infraestrutura:** manter o laboratório modular. Não é necessário manter todas as VMs ligadas simultaneamente.

---

# 🧭 NAVEGAÇÃO

- [1. Objetivo e metodologia](#1-objetivo-e-metodologia)
- [2. Arquitetura otimizada](#2-arquitetura-otimizada)
- [3. Dimensionamento](#3-dimensionamento)
- [4. Inventário](#4-inventário)
- [5. Convenções](#5-convenções)
- [6. Preparação do ambiente](#6-preparação-do-ambiente)
- [7. Módulo AD](#7-módulo-ad)
- [8. Módulo usuários e grupos](#8-módulo-usuários-e-grupos)
- [9. Módulo GPO e hardening](#9-módulo-gpo-e-hardening)
- [10. Módulo JML on-premises](#10-módulo-jml-on-premises)
- [11. Módulo Entra ID](#11-módulo-entra-id)
- [12. Módulo MFA e Authentication](#12-módulo-mfa-e-authentication)
- [13. Módulo Conditional Access](#13-módulo-conditional-access)
- [14. Módulo RBAC](#14-módulo-rbac)
- [15. Módulo Device Identity](#15-módulo-device-identity)
- [16. Módulo Cloud Sync](#16-módulo-cloud-sync)
- [17. Módulo Hybrid Join](#17-módulo-hybrid-join)
- [18. Módulo JML híbrido](#18-módulo-jml-híbrido)
- [19. Módulo App Registration](#19-módulo-app-registration)
- [20. Módulo Service Principal](#20-módulo-service-principal)
- [21. Módulo Workload Identity](#21-módulo-workload-identity)
- [22. Módulo SAML](#22-módulo-saml)
- [23. Módulo OAuth 20](#23-módulo-oauth-20)
- [24. Módulo OIDC](#24-módulo-oidc)
- [25. Módulo JWT](#25-módulo-jwt)
- [26. Módulo SCIM](#26-módulo-scim)
- [27. Módulo PowerShell](#27-módulo-powershell)
- [28. Módulo Microsoft Graph](#28-módulo-microsoft-graph)
- [29. Módulo Identity Protection](#29-módulo-identity-protection)
- [30. Módulo PIM](#30-módulo-pim)
- [31. Módulo Access Reviews](#31-módulo-access-reviews)
- [32. Módulo Entitlement Management](#32-módulo-entitlement-management)
- [33. Módulo Lifecycle Workflows](#33-módulo-lifecycle-workflows)
- [34. Módulo B2B](#34-módulo-b2b)
- [35. Módulo IAM Monitoring](#35-módulo-iam-monitoring)
- [36. Módulo PAM](#36-módulo-pam)
- [37. Módulo SoD](#37-módulo-sod)
- [38. Projeto final](#38-projeto-final)
- [39. Portfólio](#39-portfólio)
- [40. Checklist](#40-checklist)
- [41. Critério de domínio](#41-critério-de-domínio)

---

# 1. OBJETIVO E METODOLOGIA

O laboratório deve ensinar IAM como uma disciplina completa, e não apenas como administração de usuários.

O modelo mental será:

    IDENTITY
        ↓
    AUTHENTICATION
        ↓
    DEVICE / CONTEXT
        ↓
    AUTHORIZATION
        ↓
    ACCESS
        ↓
    PRIVILEGE
        ↓
    GOVERNANCE
        ↓
    MONITORING
        ↓
    AUDIT
        ↓
    DEPROVISIONING

Para cada módulo utilizar sempre:

    1. CONCEITO
    2. PRÉ-REQUISITOS
    3. CONFIGURAÇÃO
    4. TESTE
    5. FALHA CONTROLADA
    6. TROUBLESHOOTING
    7. EVIDÊNCIA
    8. DOCUMENTAÇÃO

Não considerar um tema concluído apenas porque conseguiu configurá-lo.

O objetivo é conseguir:

    EXPLICAR
    CONFIGURAR
    OPERAR
    INVESTIGAR
    AUTOMATIZAR
    GOVERNAR

---

# 2. ARQUITETURA OTIMIZADA

## 2.1 Componentes

O laboratório será dividido em:

    CORE
      ├── DC01
      ├── WIN11-01
      └── SYNC01

    CLOUD
      └── Microsoft Entra ID

    OPTIONAL
      ├── LINUX01
      └── SIEM

A maior parte dos módulos de IAM acontece diretamente no Entra ID e não exige nenhuma VM.

---

## 2.2 Arquitetura

    ┌────────────────────────────────────────────────────┐
    │                 MICROSOFT ENTRA ID                  │
    │                                                    │
    │ Users | Groups | MFA | CA | RBAC | PIM             │
    │ Apps | B2B | Governance | Graph | Logs             │
    └───────────────────────┬────────────────────────────┘
                            │
                       Cloud Sync
                            │
                            ▼
    ┌────────────────────────────────────────────────────┐
    │                      DC01                          │
    │                                                    │
    │ AD DS | DNS | GPO | Users | Groups | JML           │
    └───────────────────────┬────────────────────────────┘
                            │
                            ▼
    ┌────────────────────────────────────────────────────┐
    │                     SYNC01                         │
    │                                                    │
    │ Microsoft Entra Provisioning Agent                 │
    └────────────────────────────────────────────────────┘

    ┌────────────────────────────────────────────────────┐
    │                    WIN11-01                        │
    │                                                    │
    │ Domain Join | Hybrid Join | CA Testing             │
    └────────────────────────────────────────────────────┘

    ┌────────────────────────────────────────────────────┐
    │                    LINUX01                         │
    │                                                    │
    │ PAM / Application / Protocol Labs                  │
    └────────────────────────────────────────────────────┘

---

# 3. DIMENSIONAMENTO

## 3.1 Regra principal

Não manter todas as VMs ligadas.

### Entra / PIM / CA / Governance

    VMs:
    0

### AD

    VMs:
    DC01

### AD + Windows

    VMs:
    DC01
    WIN11-01

### Hybrid Identity

    VMs:
    DC01
    SYNC01
    WIN11-01

### PAM / Application

    VMs:
    LINUX01

### SIEM

    Somente quando necessário.

---

## 3.2 Perfil recomendado

Se a máquina possuir 16 GB RAM:

    DC01:
    2–4 GB

    SYNC01:
    2–4 GB

    WIN11-01:
    4–6 GB

    LINUX01:
    2–4 GB

Operar normalmente com:

    1–2 VMs

Usar 3 VMs somente durante Hybrid Identity.

---

## 3.3 Se a máquina tiver pouca RAM

Prioridade:

    1. DC01
    2. WIN11-01
    3. SYNC01
    4. LINUX01
    5. SIEM

Nunca sacrificar o conteúdo de IAM para manter uma infraestrutura grande.

---

# 4. INVENTÁRIO

## 4.1 VMs

| Host | Sistema | Função | IP |
|---|---|---|---|
| DC01 | Windows Server | AD DS + DNS | 192.168.100.10 |
| SYNC01 | Windows Server | Cloud Sync Agent | 192.168.100.15 |
| WIN11-01 | Windows 11 | Cliente / Hybrid Join | DHCP |
| LINUX01 | Linux | PAM / aplicação | 192.168.100.30 |

---

## 4.2 Domínio

    corp.lab

---

## 4.3 Rede

    Network:
    192.168.100.0/24

    Gateway:
    192.168.100.1

    DNS:
    192.168.100.10

---

# 5. CONVENÇÕES

## Usuários

    nome.sobrenome

Exemplo:

    ana.silva

## Administradores

    admin.nome

Exemplo:

    admin.iam

## Service Accounts

    svc-nome

Exemplo:

    svc-app

## Grupos

    GG-Finance
    GG-IT
    GG-HR
    GG-Helpdesk

## Aplicações

    APP-Finance
    APP-Portal
    APP-IAM

## GPOs

    GPO-Security-Baseline
    GPO-Workstation
    GPO-Servers

---

# 6. PREPARAÇÃO DO AMBIENTE

## 6.1 Criar rede virtual

Criar:

    IAM-LAB

Configurar:

    192.168.100.0/24

A rede deve permitir comunicação entre as VMs.

---

## 6.2 Criar DC01

Instalar Windows Server.

Definir hostname:

    DC01

Configurar IP:

    192.168.100.10

Máscara:

    255.255.255.0

Gateway:

    192.168.100.1

DNS:

    192.168.100.10

---

## 6.3 Validação

Executar:

    ipconfig /all

Depois:

    ping 192.168.100.10

Depois:

    nslookup dc01

Critério:

    IP correto
    DNS correto
    conectividade funcional

---

# 7. MÓDULO AD

## Objetivo

Construir a autoridade de identidade on-premises.

---

## 7.1 Instalar AD DS

No Server Manager:

    Add Roles and Features
        ↓
    Role-based installation
        ↓
    DC01
        ↓
    Active Directory Domain Services
        ↓
    Add Features
        ↓
    Install

---

## 7.2 Promover DC01

Depois da instalação:

    Server Manager
        ↓
    Notifications
        ↓
    Promote this server to a domain controller

Selecionar:

    Add a new forest

Domain:

    corp.lab

Configurar:

    DNS
    Global Catalog
    DSRM Password
    Database
    SYSVOL

Concluir.

---

## 7.3 Validação

Executar:

    whoami

Esperado:

    CORP\Administrator

Executar:

    dcdiag

Executar:

    nslookup corp.lab

Executar:

    nslookup dc01.corp.lab

Verificar:

    DNS
    SYSVOL
    NETLOGON
    AD DS

---

# 8. MÓDULO USUÁRIOS E GRUPOS

## 8.1 Criar OUs

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

## 8.2 Criar usuários

Criar:

    ana.silva
    bruno.santos
    carlos.oliveira
    diana.souza

Departamentos:

    ana.silva → Finance
    bruno.santos → IT
    carlos.oliveira → Helpdesk
    diana.souza → HR

---

## 8.3 Criar contas administrativas

    admin.iam
    admin.infra

Não utilizar contas administrativas para atividades cotidianas.

---

## 8.4 Criar service accounts

    svc-app
    svc-backup

Documentar:

    Owner
    Purpose
    Application
    Privileges
    Password Management
    Rotation

---

## 8.5 Criar grupos

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

## 8.6 Modelo de autorização

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

Objetivo:

    Least Privilege
    Centralized Access Management
    Easier Review

---

# 9. MÓDULO GPO E HARDENING

## Objetivo

Entender como políticas de identidade e endpoint são aplicadas no AD.

Criar:

    GPO-Security-Baseline

Configurar:

    Password Policy
    Account Lockout
    Audit Policy
    Windows Firewall
    Screen Lock
    Security Options

---

## 9.1 Aplicar primeiro em laboratório

Não aplicar diretamente em todo o domínio.

Utilizar:

    OU=IAM-Lab

---

## 9.2 Atualizar política

No Windows:

    gpupdate /force

Depois:

    gpresult /r

Validar:

    GPO-Security-Baseline

---

## 9.3 Exercício

Modificar uma política.

Executar:

    gpupdate /force

Validar a alteração.

Depois reverter.

Objetivo:

    Configuration
    Propagation
    Validation
    Rollback

---

# 10. MÓDULO JML ON-PREMISES

JML:

    JOINER
    MOVER
    LEAVER

---

## 10.1 JOINER

Criar:

    novo.finance

Atributos:

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

## 10.2 MOVER

Alterar departamento:

    Finance
        ↓
    IT

Executar:

    Remove-ADGroupMember GG-Finance novo.finance

Depois:

    Add-ADGroupMember GG-IT novo.finance

Validar:

    Get-ADPrincipalGroupMembership novo.finance

Resultado:

    GG-IT = presente
    GG-Finance = ausente

---

## 10.3 LEAVER

Executar:

    Disable-ADAccount novo.finance

Remover grupos:

    Remove-ADGroupMember GG-IT novo.finance

Mover para:

    OU=Disabled

Validar:

    Get-ADUser novo.finance

Registrar evidência.

---

# 11. MÓDULO ENTRA ID

## Objetivo

Construir a camada de identidade cloud.

Criar usuários de laboratório:

    cloud.user01
    cloud.user02

Criar administrador de laboratório:

    cloud.iam

Criar conta de emergência:

    breakglass01

Idealmente manter duas contas de emergência cloud-only no ambiente real; no laboratório, utilize pelo menos uma para compreender o conceito, sem utilizá-la no cotidiano.

---

## 11.1 Breakglass

Características:

    Cloud-only
    Não utilizada diariamente
    Credencial protegida
    Monitorada
    Uso emergencial

Criar um caso de detecção:

    BREAKGLASS LOGIN
        ↓
    HIGH PRIORITY
        ↓
    INVESTIGATION

---

# 12. MÓDULO MFA E AUTHENTICATION

## Objetivo

Entender:

    Authentication
    Authentication Methods
    MFA
    Passwordless
    Authentication Strength

---

## 12.1 MFA

Registrar:

    cloud.user01

Utilizar método MFA disponível no tenant.

Testar:

    Login
      ↓
    MFA
      ↓
    Access

Registrar:

    Authentication Method
    Timestamp
    Result

---

## 12.2 Authentication Strength

Estudar a diferença entre:

    MFA genérico

e:

    Authentication Strength

Depois estudar métodos resistentes a phishing quando disponíveis no tenant/licenciamento.

---

## 12.3 SSPR

Configurar o Password Reset conforme os recursos disponíveis.

Testar:

    User
      ↓
    Forgot Password
      ↓
    Verification
      ↓
    Reset

Registrar o fluxo.

---

# 13. MÓDULO CONDITIONAL ACCESS

Conditional Access exige Microsoft Entra ID P1 ou uma licença que inclua essa capacidade; políticas baseadas em risco dependem de Identity Protection/P2. :contentReference[oaicite:0]{index=0}

## Regra operacional

Nunca começar com uma política ampla em modo obrigatório.

Utilizar:

    REPORT-ONLY
        ↓
    TEST
        ↓
    WHAT IF
        ↓
    VALIDATE
        ↓
    ENABLE

---

## 13.1 CA01 — MFA para administradores

Criar:

    CA01-Require-MFA-Admins

Target:

    Administrative Roles

Apps:

    All cloud apps

Grant:

    Require MFA

Modo inicial:

    Report-only

Testar.

---

## 13.2 CA02 — Legacy Authentication

Criar:

    CA02-Block-Legacy-Authentication

Condition:

    Legacy Authentication Clients

Control:

    Block Access

Primeiro:

    Report-only

Validar impacto.

---

## 13.3 CA03 — Aplicação

Criar:

    CA03-Finance-App-MFA

Target:

    APP-Finance

Grant:

    MFA

Testar com:

    cloud.user01

---

## 13.4 CA04 — Contexto de dispositivo

Estudar políticas condicionadas por:

    Device
    User
    Application
    Location
    Authentication
    Risk

---

## 13.5 What If

Executar o simulador para responder:

    Qual política seria aplicada?

    Qual condição foi satisfeita?

    Qual política não foi aplicada?

    Qual seria o resultado?

Registrar evidência.

---

# 14. MÓDULO RBAC

Separar claramente:

    Entra Directory Roles

de:

    Azure RBAC

---

## 14.1 Azure RBAC

Criar:

    Resource Group:
    rg-iam-lab

Criar recurso de teste.

Atribuir:

    Reader

Testar:

    Read = ALLOWED
    Modify = DENIED

Depois testar uma função com mais privilégios.

Documentar:

    Role
    Scope
    Principal
    Permission

---

## 14.2 Least Privilege

Perguntar para cada atribuição:

    O usuário precisa dessa permissão?

    Precisa no recurso inteiro?

    Pode ser no Resource Group?

    Pode ser apenas no recurso?

    Pode ser temporária?

---

# 15. MÓDULO DEVICE IDENTITY

Criar:

    WIN11-01

Ingressar no domínio:

    corp.lab

Validar:

    Domain Join

Depois estudar:

    Entra Registered
    Entra Joined
    Hybrid Joined

Objetivo:

    User Identity
        +
    Device Identity
        +
    Conditional Access

---

# 16. MÓDULO CLOUD SYNC

## Objetivo

Construir:

    AD
      ↓
    Cloud Sync
      ↓
    Entra ID

O Cloud Sync utiliza um agente local e um serviço de provisionamento em nuvem. A Microsoft recomenda atualmente Windows Server 2025 ou 2022 para o agente; a instalação em servidor ingressado no domínio é requisito. :contentReference[oaicite:1]{index=1}

---

## 16.1 VMs necessárias

Ligar:

    DC01
    SYNC01

Para Hybrid Join:

    DC01
    SYNC01
    WIN11-01

---

## 16.2 SYNC01

Instalar Windows Server.

Hostname:

    SYNC01

IP:

    192.168.100.15

DNS:

    192.168.100.10

Ingressar no domínio:

    corp.lab

---

## 16.3 Provisioning Agent

No Entra Admin Center:

    Entra ID
        ↓
    Entra Connect
        ↓
    Cloud Sync
        ↓
    Agent
        ↓
    Download

Instalar no SYNC01.

A instalação exige que o servidor esteja ingressado no domínio e que sejam atendidos os pré-requisitos do agente. :contentReference[oaicite:2]{index=2}

---

## 16.4 Agente

Executar o instalador.

Realizar:

    Sign in
    Register Agent
    Verify Agent

No portal:

    Cloud Sync
        ↓
    Agents

Resultado:

    Active

---

## 16.5 Escopo

Não começar sincronizando todo o domínio.

Criar:

    OU=IAM-Lab

Configurar somente essa OU inicialmente.

---

## 16.6 Configuração

Seguir:

    Scope
      ↓
    Attribute Mapping
      ↓
    Test
      ↓
    Review
      ↓
    Enable

Esse fluxo corresponde à configuração atual documentada pela Microsoft para Cloud Sync. :contentReference[oaicite:3]{index=3}

---

## 16.7 Teste

No AD:

    sync.test

Colocar em:

    OU=IAM-Lab

Aguardar sincronização.

No Entra:

    Users
      ↓
    sync.test

Validar:

    UPN
    Display Name
    Department
    Source
    Object

---

## 16.8 Teste de alteração

Alterar no AD:

    Department = IT

Depois:

    Department = Finance

Validar a propagação.

---

## 16.9 Teste de desprovisionamento

No AD:

    Disable-ADAccount sync.test

Aguardar sincronização.

Validar o estado no Entra.

Documentar:

    AD State
    Sync State
    Entra State

---

## 16.10 Troubleshooting

Se não sincronizar:

    1. Verificar Agent
    2. Verificar Scope
    3. Verificar OU
    4. Verificar Attribute
    5. Verificar Logs
    6. Verificar conectividade
    7. Verificar permissões
    8. Verificar estado da configuração

Nunca alterar várias coisas simultaneamente.

---

# 17. MÓDULO HYBRID JOIN

O cenário de sincronização de dispositivos pelo Cloud Sync possui requisitos próprios e a documentação atual o identifica como recurso em prévia; portanto, tratar esta etapa como laboratório experimental e validar a disponibilidade no tenant antes de depender dela. :contentReference[oaicite:4]{index=4}

Ligar:

    DC01
    SYNC01
    WIN11-01

Configurar a sincronização de dispositivos conforme a documentação atual do tenant.

Validar no Entra:

    Devices

Procurar:

    WIN11-01

Registrar:

    Device ID
    Join Type
    Enabled
    Activity

---

# 18. MÓDULO JML HÍBRIDO

## JOINER

No AD:

    joao.silva

Atribuir:

    Department = Finance

Grupo:

    GG-Finance

Fluxo:

    AD
      ↓
    Cloud Sync
      ↓
    Entra
      ↓
    MFA
      ↓
    Conditional Access
      ↓
    Application

---

## MOVER

Alterar:

    Finance
      ↓
    IT

No AD:

    Remove Finance

    Add IT

Validar no Entra.

---

## LEAVER

Executar:

    Disable AD

Depois validar:

    Cloud Sync
    Entra
    Groups
    Applications
    Privileged Access
    Sessions

Registrar evidência.

---

# 19. MÓDULO APP REGISTRATION

Criar:

    APP-Finance

Tipo:

    Single Tenant

Registrar.

Documentar:

    Application ID
    Directory ID
    Object ID

Estudar:

    Application Object
    Service Principal

---

# 20. MÓDULO SERVICE PRINCIPAL

Entender:

    App Registration
        ↓
    Application Object

e:

    Application
        ↓
    Service Principal
        ↓
    Enterprise Application

Documentar:

    Application ID
    Service Principal ID
    Tenant
    Owners
    Permissions

---

## 20.1 Secret

Criar somente para laboratório.

Registrar:

    Purpose
    Created
    Expiration
    Owner

Testar:

    Secret
      ↓
    Authentication
      ↓
    Rotation
      ↓
    Revocation

Nunca armazenar:

    Secret
    Token
    Private Key

em Git.

---

## 20.2 Certificate

Criar certificado de laboratório.

Documentar:

    Thumbprint
    Expiration
    Owner

Nunca publicar:

    Private Key

---

## 20.3 API Permissions

Adicionar Microsoft Graph conforme o exercício.

Para cada permissão registrar:

    Permission
    Type
    Purpose
    Risk
    Consent

Diferenciar:

    Delegated

de:

    Application

---

# 21. MÓDULO WORKLOAD IDENTITY

Estudar:

    User Identity

versus:

    Workload Identity

e:

    Service Principal

versus:

    Managed Identity

---

## 21.1 Managed Identity

Criar recurso Azure de laboratório compatível.

Habilitar:

    System Assigned Managed Identity

Criar:

    Storage Account

Atribuir:

    Storage Blob Data Reader

Fluxo:

    Resource
      ↓
    Managed Identity
      ↓
    RBAC
      ↓
    Storage

---

## 21.2 Teste de Least Privilege

Remover a role.

Resultado esperado:

    Access Denied

Documentar:

    Before
    Permission
    Test
    Removal
    After

---

# 22. MÓDULO SAML

Não manter uma VM permanente apenas para estudar SAML.

Utilizar aplicação de laboratório compatível quando disponível.

Fluxo:

    User
      ↓
    Service Provider
      ↓
    Entra ID
      ↓
    Authentication
      ↓
    SAML Assertion
      ↓
    Service Provider

Estudar:

    IdP
    SP
    Entity ID
    ACS URL
    NameID
    Claims
    Signing Certificate

---

## 22.1 Troubleshooting

Quando falhar:

    Entity ID
    ACS URL
    Reply URL
    Claims
    NameID
    Certificate
    Clock
    User Assignment

Verificar um item por vez.

---

# 23. MÓDULO OAUTH 2.0

Dominar:

    Client
    Authorization Server
    Resource Server
    Authorization Code
    Access Token
    Refresh Token
    Scope
    PKCE

Fluxo:

    User
      ↓
    Client
      ↓
    Authorization
      ↓
    Authorization Code
      ↓
    Token Endpoint
      ↓
    Access Token
      ↓
    API

Não confundir:

    Authentication

com:

    Authorization

---

# 24. MÓDULO OIDC

OIDC adiciona autenticação sobre OAuth 2.0.

Estudar:

    ID Token
    Access Token
    Issuer
    Audience
    Subject
    Nonce
    State
    Redirect URI

Fluxo:

    User
      ↓
    Client
      ↓
    Entra
      ↓
    ID Token
      ↓
    Application

---

# 25. MÓDULO JWT

Estrutura:

    HEADER
    .
    PAYLOAD
    .
    SIGNATURE

Estudar claims:

    iss
    sub
    aud
    exp
    iat
    nonce
    scp
    roles

Ao validar um token:

    1. Signature
    2. Issuer
    3. Audience
    4. Expiration
    5. Required Claims

Nunca confiar em um JWT apenas porque o payload parece correto.

---

# 26. MÓDULO SCIM

Objetivo:

    Provisioning
    Deprovisioning

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
    DEPROVISION

Estudar:

    Attribute Mapping
    Provisioning Scope
    Matching
    Provisioning Logs

---

# 27. MÓDULO POWERSHELL

Criar:

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

## 27.1 Regras dos scripts

Todo script deve possuir:

    Validation
    Error Handling
    Logging
    Parameters
    Documentation

Nunca:

    senha hardcoded
    secret hardcoded
    token hardcoded

---

## 27.2 Joiner Automation

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

---

## 27.3 Leaver Automation

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

---

# 28. MÓDULO MICROSOFT GRAPH

Utilizar:

    Microsoft Graph PowerShell SDK

Estudar:

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

## 28.1 Exercício

Criar relatório contendo:

    User
    Department
    Account Status
    Groups
    Directory Roles

Exportar:

    CSV

---

## 28.2 Exercício de auditoria

Gerar relatório:

    Privileged Users

Campos:

    User
    Role
    Assignment
    Assignment Type
    Status

---

# 29. MÓDULO IDENTITY PROTECTION

Executar somente se o tenant/licenciamento disponibilizar a funcionalidade.

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

# 30. MÓDULO PIM

PIM exige licenciamento apropriado. A Microsoft documenta Microsoft Entra ID Governance ou Microsoft Entra ID P2 para esses cenários. 

A estratégia econômica do laboratório será:

    1 conta licenciada
    ↓
    executar exercício
    ↓
    remover/reutilizar
    ↓
    próximo exercício

Usuário:

    admin.iam

Não é necessário manter vários usuários licenciados apenas para aprender o mecanismo.

---

## 30.1 Eligible

Atribuir:

    Eligible

Evitar:

    Permanent Active

---

## 30.2 Activation

Executar:

    Activate
      ↓
    MFA
      ↓
    Justification
      ↓
    Approval se configurado
      ↓
    Temporary Access
      ↓
    Expiration

Registrar:

    Role
    User
    Start
    End
    Justification

---

## 30.3 Auditoria

Consultar:

    Audit History

Responder:

    Quem ativou?

    Qual função?

    Quando?

    Por quanto tempo?

    Qual justificativa?

---

# 31. MÓDULO ACCESS REVIEWS

Access Reviews atualmente exigem Microsoft Entra ID Governance ou Microsoft Entra Suite nos cenários documentados pela Microsoft. :contentReference[oaicite:5]{index=5}

Criar grupo:

    GG-Finance

Membros:

    ana.silva
    bruno.santos
    carlos.oliveira

Criar revisão.

---

## 31.1 Teste

Decisão:

    ana.silva
    APPROVE

    bruno.santos
    DENY

Aplicar resultado.

Validar:

    bruno.santos
    ↓
    GG-Finance

Resultado:

    Membership removed

---

## 31.2 Perguntas

    Quem é o reviewer?

    Qual é a frequência?

    O que acontece com DENY?

    Quem pode alterar o resultado?

    Qual é a evidência?

---

# 32. MÓDULO ENTITLEMENT MANAGEMENT

Executar quando o tenant possuir o recurso/licenciamento necessário.

Criar:

    Catalog:
    Finance

Adicionar:

    FinanceApp
    GG-Finance

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
    Resources
      ↓
    Expiration

Documentar:

    Resource
    Approval
    Owner
    Expiration
    Access Policy

---

# 33. MÓDULO LIFECYCLE WORKFLOWS

Lifecycle Workflows é uma capacidade de Governance e atualmente exige Microsoft Entra ID Governance ou Microsoft Entra Suite. :contentReference[oaicite:6]{index=6}

O conceito central é:

    JOINER
    MOVER
    LEAVER

---

## 33.1 JOINER

Criar workflow de laboratório.

Objetivo:

    New Employee
      ↓
    Group
      ↓
    Access

---

## 33.2 MOVER

Evento:

    Department Change

Objetivo:

    Remove Old Access
      ↓
    Add New Access

---

## 33.3 LEAVER

Evento:

    Employee Leaving

Objetivo:

    Remove Access
      ↓
    Cleanup

Executar manualmente quando possível antes de utilizar agendamento.

---

# 34. MÓDULO B2B

Criar:

    guest.finance

Conceder apenas:

    FinanceApp

Não conceder privilégios administrativos.

Estudar:

    Guest
    External Identity
    Invitation
    Access
    Review
    Removal

---

## 34.1 Governança

Responder:

    Quem pode convidar?

    Quem aprova?

    Qual aplicação o guest acessa?

    Quando expira?

    Quem revisa?

    Como remover?

---

# 35. MÓDULO IAM MONITORING

Monitorar:

    Audit Logs
    Sign-in Logs
    Provisioning Logs
    Conditional Access
    PIM
    Applications
    Service Principals
    Groups

---

## 35.1 Casos de detecção

Criar uma matriz:

| Evento | Severidade | Investigação |
|---|---|---|
| Global Admin Assigned | Alta | Quem atribuiu? |
| PIM Activation | Alta | Quem ativou? |
| MFA Method Added | Alta | Quem adicionou? |
| Service Principal Created | Alta | Qual aplicação? |
| Secret Added | Alta | Qual aplicação? |
| API Permission Changed | Alta | Qual permissão? |
| Admin Consent | Alta | Quem concedeu? |
| Guest Created | Média/Alta | Quem convidou? |
| CA Modified | Alta | Qual política? |
| Breakglass Login | Crítica | Investigação imediata |

---

# 36. MÓDULO SIEM

O SIEM não precisa ficar ligado durante os outros módulos.

Arquitetura:

    Entra
      ↓
    Identity Logs
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

## 36.1 Caso 01 — Privileged Role

Evento:

    Privileged Role Assignment

Investigar:

    User
    Role
    Target
    Source
    Time
    PIM
    Justification

---

## 36.2 Caso 02 — MFA Method Added

Investigar:

    User
    IP
    Device
    Time
    Previous Authentication
    Risk

Resposta de laboratório:

    Disable
    Revoke
    Remove unauthorized method
    Reset credentials
    Investigate

---

## 36.3 Caso 03 — Breakglass

Evento:

    breakglass01 sign-in

Classificação:

    CRITICAL

Investigar:

    IP
    Time
    Device
    Activity

---

# 37. MÓDULO PAM

PAM e PIM não são a mesma coisa.

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
    Checkout
      ↓
    Session
      ↓
    Recording
      ↓
    Rotation
      ↓
    Audit

---

## 37.1 Infraestrutura

Ligar apenas:

    LINUX01

Não é necessário manter LINUX01 ligada durante os demais módulos.

---

## 37.2 Contas

Criar contas de laboratório:

    administrator
    svc-app
    svc-backup

---

## 37.3 Papéis

Criar conceitualmente:

    PAM-Admin
    PAM-Operator
    PAM-Auditor

---

## 37.4 Vault

Guardar uma credencial de laboratório.

Registrar:

    Owner
    Target
    Purpose
    Checkout
    Rotation

---

## 37.5 Rotation

Executar:

    Checkout
      ↓
    Use
      ↓
    Return
      ↓
    Rotate

Validar:

    Old Credential = Invalid
    New Credential = Valid

---

## 37.6 Session

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

# 38. MÓDULO SoD

Segregation of Duties.

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

## 38.1 Cenário

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
    Provision
      ↓
    Audit

Teste:

    Employee
      ↓
    Self Approval

Resultado:

    DENIED

---

# 39. PROJETO FINAL

## Empresa fictícia

    Contoso Lab

Departamentos:

    Finance
    IT
    HR
    Helpdesk

Aplicações:

    FinanceApp
    ITPortal

---

# 39.1 JOINER

Criar:

    joao.silva

Cargo:

    Finance Analyst

Fluxo completo:

    AD
      ↓
    OU Finance
      ↓
    GG-Finance
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

# 39.2 MOVER

Alterar:

    Finance
      ↓
    IT

Executar:

    Remove Finance
    Add IT

Validar:

    Old Access = DENIED
    New Access = ALLOWED

---

# 39.3 PRIVILEGED ACCESS

João precisa executar tarefa administrativa.

Fluxo:

    PAW / Workstation
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
    Resource
      ↓
    Expiration

---

# 39.4 ACCESS REVIEW

Criar revisão.

Reviewer:

    Manager

Decidir:

    Approve
    Deny

Aplicar.

Validar acesso efetivo.

---

# 39.5 LEAVER

João deixa a empresa.

Executar:

    Disable AD
      ↓
    Cloud Sync
      ↓
    Disable / Restrict Entra
      ↓
    Remove Groups
      ↓
    Remove Application Access
      ↓
    Remove Privileged Access
      ↓
    Revoke Sessions quando necessário
      ↓
    Audit

---

# 39.6 INCIDENTE IAM

Simular:

    MFA Method Added

Investigar:

    User
    IP
    Device
    Time
    Authentication History

Responder:

    Disable
    Revoke
    Remove unauthorized method
    Reset
    Investigate

Documentar:

    Timeline
    Root Cause
    Actions
    Evidence

---

# 40. PORTFÓLIO

Criar repositório:

    iam-homelab

Estrutura:

    iam-homelab/
    │
    ├── README.md
    │
    ├── architecture/
    │   └── architecture.md
    │
    ├── active-directory/
    │   ├── users-groups.md
    │   ├── gpo.md
    │   └── jml.md
    │
    ├── entra/
    │   ├── authentication.md
    │   ├── conditional-access.md
    │   ├── rbac.md
    │   └── devices.md
    │
    ├── hybrid/
    │   ├── cloud-sync.md
    │   └── hybrid-join.md
    │
    ├── applications/
    │   ├── app-registration.md
    │   ├── service-principal.md
    │   ├── saml.md
    │   ├── oauth.md
    │   ├── oidc.md
    │   └── scim.md
    │
    ├── governance/
    │   ├── pim.md
    │   ├── access-reviews.md
    │   ├── entitlement.md
    │   └── lifecycle.md
    │
    ├── automation/
    │   ├── powershell/
    │   └── graph/
    │
    ├── pam/
    │   └── pam.md
    │
    ├── monitoring/
    │   └── iam-detections.md
    │
    └── evidence/

---

# 41. EVIDÊNCIAS

Para cada laboratório guardar:

    Architecture
    Configuration
    Test
    Result
    Logs
    Troubleshooting

Exemplo:

    evidence/
    └── conditional-access/
        ├── policy.png
        ├── what-if.png
        ├── sign-in.png
        └── result.md

Nunca publicar:

    Password
    Secret
    Token
    Private Key
    Recovery Code
    API Key
    Personal Data

---

# 42. PADRÃO DE DOCUMENTAÇÃO

Cada exercício deve possuir:

    # Objetivo

    # Cenário

    # Pré-requisitos

    # Arquitetura

    # Configuração

    # Teste

    # Resultado esperado

    # Resultado obtido

    # Troubleshooting

    # Evidências

    # Boas práticas

    # Conclusão técnica

---

# 43. TROUBLESHOOTING

Nunca registrar:

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

# 44. CHECKLIST DE COMPETÊNCIAS

## Active Directory

- [ ] AD DS
- [ ] DNS
- [ ] OU
- [ ] Users
- [ ] Groups
- [ ] GPO
- [ ] Delegation
- [ ] Service Accounts
- [ ] Admin Accounts
- [ ] JML
- [ ] Audit
- [ ] Hardening

## Entra ID

- [ ] Users
- [ ] Groups
- [ ] Directory Roles
- [ ] RBAC
- [ ] Breakglass
- [ ] Authentication Methods
- [ ] MFA
- [ ] SSPR
- [ ] Device Identity

## Conditional Access

- [ ] MFA
- [ ] Admin Protection
- [ ] Legacy Authentication
- [ ] Application
- [ ] Device
- [ ] Location
- [ ] Report-only
- [ ] What If
- [ ] Authentication Strength

## Hybrid Identity

- [ ] Cloud Sync
- [ ] Provisioning Agent
- [ ] Scope
- [ ] Attribute Mapping
- [ ] Provisioning
- [ ] Deprovisioning
- [ ] Troubleshooting
- [ ] Device Sync
- [ ] Hybrid Join

## Application IAM

- [ ] App Registration
- [ ] Service Principal
- [ ] Enterprise Application
- [ ] API Permissions
- [ ] Delegated Permissions
- [ ] Application Permissions
- [ ] Admin Consent
- [ ] Secret
- [ ] Certificate
- [ ] SAML
- [ ] OAuth 2.0
- [ ] OIDC
- [ ] JWT
- [ ] SCIM
- [ ] PKCE

## Workload Identity

- [ ] Service Principal
- [ ] Managed Identity
- [ ] RBAC
- [ ] Least Privilege

## Automation

- [ ] PowerShell
- [ ] Microsoft Graph
- [ ] JML Automation
- [ ] Reporting
- [ ] Logging
- [ ] Error Handling

## Governance

- [ ] PIM
- [ ] Access Reviews
- [ ] Entitlement Management
- [ ] Lifecycle Workflows
- [ ] B2B
- [ ] SoD

## PAM

- [ ] Privileged Accounts
- [ ] Vault
- [ ] Checkout
- [ ] Approval
- [ ] Rotation
- [ ] Session
- [ ] Audit

## Monitoring

- [ ] Audit Logs
- [ ] Sign-in Logs
- [ ] Provisioning Logs
- [ ] PIM Logs
- [ ] Conditional Access Logs
- [ ] Application Events
- [ ] Service Principal Events
- [ ] SIEM
- [ ] Detection
- [ ] Investigation

---

# 45. CRITÉRIO DE DOMÍNIO

## Nível 1 — Explicar

Consegue explicar o conceito sem consultar documentação.

---

## Nível 2 — Configurar

Consegue construir o recurso no laboratório.

---

## Nível 3 — Operar

Consegue executar operações cotidianas.

---

## Nível 4 — Troubleshoot

Consegue identificar:

    Sintoma
    Causa
    Evidência
    Correção

---

## Nível 5 — Automatizar

Consegue utilizar:

    PowerShell
    Graph
    APIs
    Workflows

---

## Nível 6 — Governar

Consegue responder:

    Quem tem acesso?

    Por que possui?

    Quem aprovou?

    Até quando?

    Qual privilégio?

    Quem revisa?

    Como auditar?

    Como remover?

---

# 46. META FINAL

Ao concluir o laboratório, executar este fluxo sem consultar o manual:

    CREATE USER
        ↓
    ASSIGN DEPARTMENT
        ↓
    ASSIGN GROUP
        ↓
    SYNCHRONIZE
        ↓
    AUTHENTICATE
        ↓
    MFA
        ↓
    CONDITIONAL ACCESS
        ↓
    APPLICATION ACCESS
        ↓
    PRIVILEGED REQUEST
        ↓
    PIM ACTIVATION
        ↓
    JIT ACCESS
        ↓
    AUDIT
        ↓
    ACCESS REVIEW
        ↓
    DEPARTMENT CHANGE
        ↓
    REMOVE OLD ACCESS
        ↓
    ADD NEW ACCESS
        ↓
    LEAVER
        ↓
    DISABLE
        ↓
    DEPROVISION
        ↓
    LOG
        ↓
    INVESTIGATE
        ↓
    DOCUMENT

---

# 47. ORDEM DE EXECUÇÃO

Não estudar todos os módulos simultaneamente.

Executar nesta ordem:

    FASE 01
    AD + DNS

    ↓

    FASE 02
    Users + Groups

    ↓

    FASE 03
    GPO + Hardening

    ↓

    FASE 04
    JML On-Premises

    ↓

    FASE 05
    Entra ID

    ↓

    FASE 06
    Authentication + MFA + SSPR

    ↓

    FASE 07
    Conditional Access

    ↓

    FASE 08
    RBAC

    ↓

    FASE 09
    Device Identity

    ↓

    FASE 10
    Cloud Sync

    ↓

    FASE 11
    Hybrid Join

    ↓

    FASE 12
    JML Hybrid

    ↓

    FASE 13
    App Registration

    ↓

    FASE 14
    Service Principal

    ↓

    FASE 15
    Workload Identity

    ↓

    FASE 16
    SAML

    ↓

    FASE 17
    OAuth 2.0

    ↓

    FASE 18
    OIDC

    ↓

    FASE 19
    JWT

    ↓

    FASE 20
    SCIM

    ↓

    FASE 21
    PowerShell

    ↓

    FASE 22
    Microsoft Graph

    ↓

    FASE 23
    Identity Protection

    ↓

    FASE 24
    PIM

    ↓

    FASE 25
    Access Reviews

    ↓

    FASE 26
    Entitlement Management

    ↓

    FASE 27
    Lifecycle Workflows

    ↓

    FASE 28
    B2B

    ↓

    FASE 29
    IAM Monitoring

    ↓

    FASE 30
    PAM

    ↓

    FASE 31
    SoD

    ↓

    FASE 32
    PROJETO FINAL

---

# 48. REGRA DE LICENCIAMENTO DO LABORATÓRIO

Antes de executar qualquer módulo pago:

    1. Verificar licença atual
    2. Verificar recurso disponível
    3. Verificar quantidade de usuários necessária
    4. Executar somente o exercício
    5. Remover/reutilizar a licença quando possível
    6. Registrar a limitação

Recursos que merecem atenção especial:

    Conditional Access
    Identity Protection
    PIM
    Access Reviews
    Entitlement Management
    Lifecycle Workflows

Cloud Sync também possui requisitos específicos de licenciamento para determinados cenários; não assumir que toda funcionalidade de sincronização possui o mesmo requisito. :contentReference[oaicite:7]{index=7}

Lifecycle Workflows requer atualmente Microsoft Entra ID Governance ou Microsoft Entra Suite. :contentReference[oaicite:8]{index=8}

Access Reviews requer atualmente Microsoft Entra ID Governance ou Microsoft Entra Suite nos cenários documentados. :contentReference[oaicite:9]{index=9}

---

# 49. PRINCÍPIO PROFISSIONAL

O laboratório não deve demonstrar apenas:

    "Eu sei criar usuário."

Deve demonstrar:

    IDENTIDADE
        ↓
    ACESSO
        ↓
    JUSTIFICATIVA
        ↓
    AUTORIZAÇÃO
        ↓
    PRIVILÉGIO
        ↓
    GOVERNANÇA
        ↓
    MONITORAMENTO
        ↓
    AUDITORIA
        ↓
    REVOGAÇÃO

Esse é o modelo que deve orientar todas as atividades do laboratório.

---

# 50. RESULTADO ESPERADO

Ao concluir o projeto, o laboratório deverá demonstrar domínio prático de:

    Microsoft Active Directory
    Microsoft Entra ID
    Hybrid Identity
    Cloud Sync
    Authentication
    MFA
    SSPR
    Conditional Access
    RBAC
    Device Identity
    JML
    Application Identity
    Service Principal
    Managed Identity
    SAML
    OAuth 2.0
    OIDC
    JWT
    SCIM
    PowerShell
    Microsoft Graph
    Identity Protection
    PIM
    Access Reviews
    Entitlement Management
    Lifecycle Workflows
    B2B
    PAM
    SoD
    IAM Monitoring
    SIEM Integration

A infraestrutura necessária para isso permanece modular:

    NORMAL
    0–1 VM

    AD
    1 VM

    AD + CLIENT
    2 VMs

    HYBRID
    3 VMs

    PAM
    1 VM

    SIEM
    SOMENTE QUANDO NECESSÁRIO

A arquitetura reduz o consumo de RAM sem remover os principais domínios técnicos necessários para uma preparação consistente para carreira em IAM.
