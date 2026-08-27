# 🔐 IAM HOMELAB — MANUAL COMPLETO E MICRODETALHADO

> Laboratório prático para preparação profissional em IAM, com foco em Active Directory, Microsoft Entra ID, Hybrid Identity, Authentication, Authorization, RBAC, Conditional Access, PIM, Governance, Application Identity, Workload Identity, PAM, automação e monitoramento.

---

# 🧭 SUMÁRIO

1. [Objetivo](#1-objetivo)
2. [Como utilizar este manual](#2-como-utilizar-este-manual)
3. [Arquitetura](#3-arquitetura)
4. [Decisões técnicas](#4-decisões-técnicas)
5. [Dimensionamento](#5-dimensionamento)
6. [Pré-requisitos](#6-pré-requisitos)
7. [Downloads](#7-downloads)
8. [VirtualBox](#8-virtualbox)
9. [Criando a rede](#9-criando-a-rede)
10. [Criando DC01](#10-criando-dc01)
11. [Instalando Windows Server](#11-instalando-windows-server)
12. [Configurando DC01](#12-configurando-dc01)
13. [Instalando AD DS](#13-instalando-ad-ds)
14. [Criando domínio](#14-criando-domínio)
15. [Validando AD](#15-validando-ad)
16. [Criando OUs](#16-criando-ous)
17. [Criando usuários](#17-criando-usuários)
18. [Criando grupos](#18-criando-grupos)
19. [Delegação](#19-delegação)
20. [GPO](#20-gpo)
21. [Hardening](#21-hardening)
22. [JML On-Premises](#22-jml-on-premises)
23. [Criando WIN11-01](#23-criando-win11-01)
24. [Domain Join](#24-domain-join)
25. [Criando tenant Entra](#25-criando-tenant-entra)
26. [Estrutura Entra](#26-estrutura-entra)
27. [MFA](#27-mfa)
28. [SSPR](#28-sspr)
29. [Conditional Access](#29-conditional-access)
30. [RBAC](#30-rbac)
31. [Device Identity](#31-device-identity)
32. [Cloud Sync](#32-cloud-sync)
33. [Provisionamento sob demanda](#33-provisionamento-sob-demanda)
34. [Sincronização contínua](#34-sincronização-contínua)
35. [JML híbrido](#35-jml-híbrido)
36. [Application Identity](#36-application-identity)
37. [Service Principal](#37-service-principal)
38. [API Permissions](#38-api-permissions)
39. [Secrets e certificados](#39-secrets-e-certificados)
40. [Managed Identity](#40-managed-identity)
41. [OAuth 2.0](#41-oauth-20)
42. [OIDC](#42-oidc)
43. [JWT](#43-jwt)
44. [SAML](#44-saml)
45. [SCIM](#45-scim)
46. [PowerShell](#46-powershell)
47. [Microsoft Graph](#47-microsoft-graph)
48. [PIM](#48-pim)
49. [Access Reviews](#49-access-reviews)
50. [Entitlement Management](#50-entitlement-management)
51. [Lifecycle Workflows](#51-lifecycle-workflows)
52. [B2B](#52-b2b)
53. [PAM](#53-pam)
54. [SoD](#54-sod)
55. [IAM Monitoring](#55-iam-monitoring)
56. [SIEM](#56-siem)
57. [Projeto final](#57-projeto-final)
58. [Portfólio](#58-portfólio)
59. [Checklist](#59-checklist)
60. [Critério de domínio](#60-critério-de-domínio)

---

# 1. OBJETIVO

O objetivo não é simplesmente aprender a criar usuários.

O laboratório deve permitir demonstrar o ciclo completo:

```text
IDENTITY
   ↓
AUTHENTICATION
   ↓
DEVICE
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
REVOCATION
```

Ao final, você deverá conseguir explicar, configurar, operar, automatizar, auditar e investigar um ambiente IAM.

---

# 2. COMO UTILIZAR ESTE MANUAL

Cada laboratório possui cinco etapas:

```text
1. ENTENDER
2. CONFIGURAR
3. TESTAR
4. QUEBRAR CONTROLADAMENTE
5. DOCUMENTAR
```

Nunca avance simplesmente porque "funcionou".

Para cada exercício responda:

```text
O que estou configurando?
Por que estou configurando?
Qual risco estou controlando?
Como sei que funcionou?
Como sei que não funcionou?
Como investigo uma falha?
Como removo a configuração?
```

---

# 3. ARQUITETURA

## 3.1 Arquitetura física

Você terá:

```text
                    INTERNET
                       │
                       │
                 NAT - VirtualBox
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      DC01          SYNC01         WIN11-01
        │              │              │
        └──────────────┼──────────────┘
                       │
                 HOST-ONLY
              192.168.56.0/24
                       │
                     HOST
```

O NAT fornece Internet.

O Host-Only fornece a rede privada do laboratório.

---

# 4. DECISÕES TÉCNICAS

## 4.1 Por que usar dois adaptadores?

Cada VM terá:

```text
ADAPTER 1
NAT
↓
Internet

ADAPTER 2
HOST-ONLY
↓
Rede interna IAM
```

Isso evita colocar o domínio de laboratório diretamente na rede física da sua casa.

---

## 4.2 Por que o DHCP do VirtualBox ficará desativado?

Porque o laboratório terá endereçamento controlado.

O DC terá IP fixo:

```text
192.168.56.10
```

O DNS do laboratório será:

```text
192.168.56.10
```

Não queremos que o VirtualBox entregue outro DNS para os clientes.

Também não queremos dois servidores DHCP disputando a mesma rede.

Portanto:

```text
VirtualBox DHCP
     ↓
DESATIVADO

Windows DHCP
     ↓
NÃO USADO inicialmente

IP ESTÁTICO
     ↓
USADO
```

Posteriormente você poderá criar um laboratório separado com DHCP Server no Windows Server.

---

# 5. DIMENSIONAMENTO

## 5.1 Máquina física recomendada

Ideal:

```text
CPU: 4+ cores
RAM: 16 GB+
SSD: 100 GB+
Virtualização:
VT-x / AMD-V habilitado
```

Com 16 GB:

```text
DC01       3 GB
WIN11-01   4 GB
SYNC01     3 GB
```

Não mantenha todas ligadas.

---

## 5.2 Operação normal

```text
AD:
DC01

Hybrid:
DC01
SYNC01
WIN11-01

PAM:
LINUX01

Entra:
0 VMs
```

---

# 6. PRÉ-REQUISITOS

Você precisará de:

```text
VirtualBox
Windows Server 2025 Evaluation
Windows 11 Enterprise Evaluation
Conta Microsoft
Tenant Microsoft Entra
Azure Subscription
```

O Windows Server 2025 possui avaliação gratuita de 180 dias. O Windows 11 Enterprise possui avaliação de 90 dias. 

---

# 7. DOWNLOADS

Baixe somente de fontes oficiais.

## Windows Server

Acesse o Microsoft Evaluation Center.

Procure:

```text
Windows Server 2025
```

Baixe:

```text
ISO
64-bit
Evaluation
```

## Windows 11

Baixe:

```text
Windows 11 Enterprise Evaluation
```

---

# 8. VIRTUALBOX

## 8.1 Instalar

Instale o VirtualBox normalmente.

Após abrir:

```text
VirtualBox Manager
```

Você deverá visualizar a tela principal.

---

# 9. CRIANDO A REDE

## 9.1 Abrir Network Manager

No VirtualBox:

```text
File
  ↓
Tools
  ↓
Network Manager
```

Dependendo da versão:

```text
Arquivo
  ↓
Ferramentas
  ↓
Gerenciador de Rede
```

---

## 9.2 Criar Host-Only

Na janela Network Manager:

```text
Host-only Networks
```

Clique:

```text
Create
```

Será criada uma rede semelhante a:

```text
VirtualBox Host-Only Ethernet Adapter
```

Selecione-a.

---

## 9.3 Configurar IPv4

Procure:

```text
Adapter
```

Configure:

```text
IPv4 Address:
192.168.56.1

IPv4 Network Mask:
255.255.255.0
```

Isso significa:

```text
Rede:
192.168.56.0/24

Host:
192.168.56.1
```

---

## 9.4 DHCP

Abra:

```text
DHCP Server
```

Desmarque:

```text
Enable DHCP
```

Deixe:

```text
DHCP = Disabled
```

### Por que?

Porque vamos definir os IPs manualmente.

Exemplo:

```text
DC01
192.168.56.10

SYNC01
192.168.56.15

WIN11-01
192.168.56.20
```

Assim não haverá alteração inesperada de IP.

---

## 9.5 Resultado

A rede deverá ficar:

```text
Host-Only Adapter
IPv4:
192.168.56.1

Mask:
255.255.255.0

DHCP:
Disabled
```

---

# 10. CRIANDO DC01

No VirtualBox:

```text
New
```

Preencha:

```text
Name:
DC01

ISO Image:
Windows Server 2025 ISO
```

Se houver opção:

```text
Skip Unattended Installation
```

marque-a.

Isso permite controlar a instalação manualmente.

---

## 10.1 Hardware

RAM:

```text
3072 MB
```

CPU:

```text
2 CPUs
```

Disco:

```text
60 GB
```

Use:

```text
VDI
Dynamically allocated
```

---

# 11. CONFIGURANDO REDE DA VM

Selecione:

```text
DC01
  ↓
Settings
  ↓
Network
```

---

## 11.1 Adapter 1

Marque:

```text
Enable Network Adapter
```

Attached to:

```text
NAT
```

Objetivo:

```text
DC01 → Internet
```

---

## 11.2 Adapter 2

Abra:

```text
Adapter 2
```

Marque:

```text
Enable Network Adapter
```

Attached to:

```text
Host-only Adapter
```

Name:

```text
VirtualBox Host-Only Ethernet Adapter
```

Objetivo:

```text
DC01
  ↓
rede IAM
  ↓
outros servidores
```

---

# 12. INSTALANDO WINDOWS SERVER

Inicie:

```text
DC01
  ↓
Start
```

O instalador iniciará.

---

## 12.1 Selecionar edição

Escolha:

```text
Windows Server 2025
Desktop Experience
```

Não escolha:

```text
Server Core
```

neste laboratório.

### Por quê?

Porque o objetivo é aprender IAM e você ainda está construindo a infraestrutura.

A GUI reduz complexidade desnecessária.

---

## 12.2 Instalação

Selecione:

```text
Custom Install
```

Escolha o disco.

Clique:

```text
Next
```

Aguarde.

---

# 13. CONFIGURANDO DC01

Após o primeiro login:

```text
Server Manager
```

---

## 13.1 Alterar hostname

Clique:

```text
Start
  ↓
Settings
  ↓
System
  ↓
About
```

Procure:

```text
Rename this PC
```

Defina:

```text
DC01
```

Reinicie.

---

# 14. CONFIGURANDO IP

Abra:

```text
Control Panel
  ↓
Network and Internet
  ↓
Network and Sharing Center
  ↓
Change adapter settings
```

Você verá dois adaptadores.

Algo semelhante a:

```text
Ethernet
Ethernet 2
```

Identifique qual é:

```text
NAT
```

e qual é:

```text
Host-Only
```

---

## 14.1 Host-Only

Clique com botão direito no adaptador Host-Only:

```text
Properties
```

Selecione:

```text
Internet Protocol Version 4 (TCP/IPv4)
```

Clique:

```text
Properties
```

Selecione:

```text
Use the following IP address
```

Preencha:

```text
IP address:
192.168.56.10

Subnet mask:
255.255.255.0

Default gateway:
deixe vazio

Preferred DNS:
192.168.56.10
```

---

## 14.2 Por que gateway vazio?

Porque:

```text
192.168.56.0/24
```

é a rede interna.

A Internet será acessada pelo adaptador NAT.

---

## 14.3 NAT

O adaptador NAT deve permanecer:

```text
DHCP
```

Ele receberá automaticamente:

```text
IP
Gateway
DNS
```

Não altere isso.

---

# 15. TESTANDO REDE

Abra PowerShell.

Execute:

```powershell
ipconfig
```

Você deverá encontrar:

```text
192.168.56.10
```

Teste:

```powershell
ping 192.168.56.1
```

Depois:

```powershell
ping 8.8.8.8
```

Se funcionar:

```text
Host-Only = OK
Internet = OK
```

Teste DNS:

```powershell
nslookup microsoft.com
```

---

# 16. INSTALANDO AD DS

Abra:

```text
Server Manager
```

Clique:

```text
Manage
  ↓
Add Roles and Features
```

---

## 16.1 Antes de começar

Clique:

```text
Next
```

---

## 16.2 Installation Type

Selecione:

```text
Role-based or feature-based installation
```

Clique:

```text
Next
```

---

## 16.3 Server Selection

Selecione:

```text
DC01
```

Clique:

```text
Next
```

---

## 16.4 Server Roles

Marque:

```text
Active Directory Domain Services
```

Aparecerá uma janela.

Clique:

```text
Add Features
```

Depois:

```text
Next
```

---

## 16.5 Features

Não precisa alterar.

Clique:

```text
Next
```

---

## 16.6 AD DS

Leia.

Clique:

```text
Next
```

---

## 16.7 Confirmation

Clique:

```text
Install
```

Aguarde.

---

# 17. PROMOVER DC01

Após a instalação:

```text
Server Manager
  ↓
Notifications
```

Você verá:

```text
Promote this server to a domain controller
```

Clique.

---

# 18. CRIAR FLORESTA

Na tela:

```text
Deployment Configuration
```

Selecione:

```text
Add a new forest
```

Root domain:

```text
corp.lab
```

Clique:

```text
Next
```

---

# 19. DOMAIN CONTROLLER OPTIONS

Selecione:

```text
Domain Name System (DNS)
Global Catalog (GC)
```

Não selecione:

```text
Read only domain controller
```

Defina a senha DSRM.

Exemplo:

```text
Senha forte armazenada no gerenciador de senhas.
```

Não coloque a senha no Git.

Clique:

```text
Next
```

---

# 20. DNS OPTIONS

Você pode receber um aviso de delegação DNS.

Isso é esperado.

Continue.

---

# 21. PATHS

Deixe:

```text
Database:
C:\Windows\NTDS

Log files:
C:\Windows\NTDS

SYSVOL:
C:\Windows\SYSVOL
```

Clique:

```text
Next
```

---

# 22. PREREQUISITE CHECK

Aguarde.

Se estiver tudo correto:

```text
All prerequisite checks passed successfully
```

Clique:

```text
Install
```

O servidor será reiniciado.

---

# 23. PRIMEIRO LOGIN NO DOMÍNIO

Após reiniciar:

```text
CORP\Administrator
```

ou:

```text
Administrator@corp.lab
```

---

# 24. VALIDANDO AD

Abra PowerShell como administrador.

Execute:

```powershell
Get-ADDomain
```

Resultado esperado:

```text
DNSRoot : corp.lab
```

Execute:

```powershell
Get-ADForest
```

Deve retornar:

```text
RootDomain : corp.lab
```

---

# 25. VALIDANDO DNS

Execute:

```powershell
nslookup corp.lab
```

Deve retornar:

```text
192.168.56.10
```

Teste:

```powershell
nslookup dc01.corp.lab
```

Resultado esperado:

```text
192.168.56.10
```

---

# 26. VALIDANDO DC

Execute:

```powershell
dcdiag
```

Se houver erros:

```text
não avance
```

Primeiro corrija o DC.

---

# 27. CRIANDO OUS

Abra:

```text
Server Manager
  ↓
Tools
  ↓
Active Directory Users and Computers
```

Expanda:

```text
corp.lab
```

Botão direito no domínio:

```text
New
  ↓
Organizational Unit
```

Crie:

```text
Users
Groups
Admins
Service Accounts
Workstations
Servers
Disabled
IAM-Lab
```

---

# 28. ESTRUTURA FINAL

```text
corp.lab
│
├── Users
│   ├── Finance
│   ├── IT
│   ├── HR
│   └── Helpdesk
│
├── Groups
│
├── Admins
│
├── Service Accounts
│
├── Workstations
│
├── Servers
│
├── Disabled
│
└── IAM-Lab
```

---

# 29. CRIANDO USUÁRIOS

Abra:

```text
Active Directory Users and Computers
```

Entre em:

```text
Users
  ↓
Finance
```

Botão direito:

```text
New
  ↓
User
```

Crie:

```text
Ana Silva

User logon:
ana.silva
```

---

# 30. UPN

Por enquanto:

```text
ana.silva@corp.lab
```

Isso funciona dentro do AD.

Para sincronização com Entra, posteriormente será necessário utilizar um sufixo de domínio verificado no tenant ou aceitar o comportamento de fallback para `onmicrosoft.com`.

Não tente resolver isso agora.

Primeiro construa o AD.

---

# 31. CRIAR USUÁRIOS DE TESTE

Crie:

```text
ana.silva
bruno.santos
carlos.oliveira
diana.souza
joao.silva
```

Departamentos:

```text
ana.silva       Finance
bruno.santos    IT
carlos.oliveira Helpdesk
diana.souza     HR
joao.silva      Finance
```

---

# 32. CONTAS ADMINISTRATIVAS

Crie:

```text
admin.iam
admin.infra
```

Essas contas não devem ser utilizadas para navegação cotidiana.

Modelo:

```text
usuario normal
    ↓
atividade cotidiana

admin.iam
    ↓
atividade administrativa
```

---

# 33. SERVICE ACCOUNTS

Crie:

```text
svc-app
svc-backup
```

Coloque em:

```text
Service Accounts
```

Não conceda privilégios administrativos por padrão.

---

# 34. CRIANDO GRUPOS

Entre em:

```text
Groups
```

Crie:

```text
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
```

Tipo:

```text
Security
```

---

# 35. ADICIONANDO MEMBROS

Exemplo:

```text
GG-Finance
```

Adicione:

```text
ana.silva
joao.silva
```

Depois:

```text
GG-IT
```

Adicione:

```text
bruno.santos
```

---

# 36. VALIDANDO GRUPOS

PowerShell:

```powershell
Get-ADGroupMember GG-Finance
```

Depois:

```powershell
Get-ADPrincipalGroupMembership ana.silva
```

---

# 37. DELEGAÇÃO

Não utilize Domain Admin para tudo.

Crie:

```text
Helpdesk
```

O objetivo será permitir que o Helpdesk execute somente operações necessárias.

Exemplo:

```text
Reset password
Unlock account
Read users
```

Não:

```text
Create Domain Controller
Modify Domain Admins
Change GPO
```

---

# 38. GPO

Abra:

```text
Server Manager
  ↓
Tools
  ↓
Group Policy Management
```

Crie:

```text
GPO-Security-Baseline
```

Vincule primeiro:

```text
IAM-Lab
```

Não vincule imediatamente ao domínio inteiro.

---

# 39. CONFIGURANDO PASSWORD POLICY

Edite:

```text
GPO-Security-Baseline
  ↓
Computer Configuration
  ↓
Policies
  ↓
Windows Settings
  ↓
Security Settings
  ↓
Account Policies
  ↓
Password Policy
```

Configure uma política de laboratório coerente.

Exemplo:

```text
Minimum password length:
12

Password complexity:
Enabled
```

Evite copiar políticas de produção sem entender o impacto.

---

# 40. ACCOUNT LOCKOUT

Caminho:

```text
Account Policies
  ↓
Account Lockout Policy
```

Configure:

```text
Account lockout threshold:
5

Account lockout duration:
15 minutes
```

O objetivo é entender:

```text
Authentication failure
       ↓
Threshold
       ↓
Lockout
       ↓
Recovery
```

---

# 41. TESTANDO GPO

Na máquina cliente:

```powershell
gpupdate /force
```

Depois:

```powershell
gpresult /r
```

Procure:

```text
GPO-Security-Baseline
```

---

# 42. JML ON-PREMISES

JML significa:

```text
JOINER
MOVER
LEAVER
```

---

## JOINER

Criar:

```text
novo.finance
```

Definir:

```text
Department:
Finance
```

Adicionar:

```text
GG-Finance
GG-App-Finance
```

---

## MOVER

Alterar:

```text
Finance
↓
IT
```

Remover:

```text
GG-Finance
```

Adicionar:

```text
GG-IT
```

Validar:

```powershell
Get-ADPrincipalGroupMembership novo.finance
```

---

## LEAVER

Executar:

```powershell
Disable-ADAccount novo.finance
```

Depois:

```powershell
Move-ADObject `
    -Identity "CN=novo.finance,OU=Finance,OU=Users,DC=corp,DC=lab" `
    -TargetPath "OU=Disabled,DC=corp,DC=lab"
```

Validar:

```powershell
Get-ADUser novo.finance
```

---

# 43. CRIANDO WIN11-01

No VirtualBox:

```text
New
```

Nome:

```text
WIN11-01
```

ISO:

```text
Windows 11 Enterprise Evaluation
```

RAM:

```text
4096 MB
```

CPU:

```text
2
```

Disco:

```text
64 GB
```

---

# 44. REDE WIN11-01

Adapter 1:

```text
NAT
```

Adapter 2:

```text
Host-only
```

---

# 45. IP WIN11-01

No Windows:

```text
Settings
  ↓
Network & Internet
  ↓
Advanced network settings
  ↓
More network adapter options
```

Identifique Host-Only.

IPv4:

```text
IP:
192.168.56.20

Mask:
255.255.255.0

Gateway:
vazio

DNS:
192.168.56.10
```

---

# 46. TESTAR DNS NO CLIENTE

PowerShell:

```powershell
ping 192.168.56.10
```

Depois:

```powershell
nslookup corp.lab
```

Depois:

```powershell
nslookup dc01.corp.lab
```

Se o DNS falhar:

```text
NÃO faça Domain Join.
```

Corrija primeiro o DNS.

---

# 47. DOMAIN JOIN

No Windows:

```text
Settings
  ↓
System
  ↓
About
  ↓
Domain or workgroup
```

Escolha:

```text
Join this device to a local Active Directory domain
```

Digite:

```text
corp.lab
```

Quando solicitado:

```text
CORP\Administrator
```

Reinicie.

---

# 48. VALIDAR DOMAIN JOIN

Depois do login:

```text
System
  ↓
About
```

Procure:

```text
Domain:
corp.lab
```

PowerShell:

```powershell
whoami
```

Exemplo:

```text
corp\ana.silva
```

---

# 49. CRIANDO TENANT ENTRA

Agora a etapa cloud.

Não precisa de nenhuma VM.

Acesse o Microsoft Entra Admin Center.

Crie ou utilize um tenant de laboratório.

Registre:

```text
Tenant Name:
________________

Tenant ID:
________________

Initial Domain:
________________.onmicrosoft.com
```

Nunca publique:

```text
Tenant ID
```

se não houver necessidade.

O ID não é um segredo, mas não deve ser tratado como credencial.

---

# 50. CONTA BREAKGLASS

Crie:

```text
breakglass01
```

Características:

```text
Cloud-only
Não sincronizada
Não usada diariamente
Credencial armazenada com segurança
Monitorada
```

O objetivo é evitar que uma política de IAM bloqueie todos os administradores.

---

# 51. USUÁRIO ADMINISTRATIVO CLOUD

Crie:

```text
cloud.iam
```

Use-o para administração do tenant.

Não utilize:

```text
Global Administrator
```

para tarefas comuns se uma função mais específica for suficiente.

---

# 52. MFA

Entre no tenant com:

```text
cloud.iam
```

Configure MFA.

Depois crie:

```text
cloud.user01
cloud.user02
```

Configure MFA para eles.

---

# 53. ENTENDER MFA

Fluxo:

```text
Username
   ↓
Password
   ↓
MFA
   ↓
Token
   ↓
Access
```

O MFA reduz o risco de uma senha comprometida ser suficiente para acessar o recurso.

---

# 54. SSPR

Procure:

```text
Microsoft Entra ID
  ↓
Password reset
```

Configure primeiro para:

```text
Selected
```

Selecione:

```text
cloud.user01
cloud.user02
```

Não comece com:

```text
All
```

---

# 55. TESTAR SSPR

Use uma janela privada do navegador.

Entre como:

```text
cloud.user01
```

Teste o processo de recuperação.

Documente:

```text
User
Verification
Reset
Result
```

O SSPR possui recursos gratuitos em determinadas SKUs, mas o benefício pretendido deve respeitar o licenciamento aplicável. 

---

# 56. CONDITIONAL ACCESS

Antes de criar qualquer política:

```text
MFA
+
Breakglass
+
Test User
```

deve estar preparado.

---

# 57. POLÍTICA CA01

Abra:

```text
Entra ID
  ↓
Conditional Access
  ↓
Policies
  ↓
New policy
```

Nome:

```text
CA01-Require-MFA-Admins
```

Users:

```text
Directory roles
```

Selecione administradores.

Target resources:

```text
All cloud apps
```

Grant:

```text
Require multifactor authentication
```

---

# 58. REPORT-ONLY

Antes de ativar:

```text
Enable policy:
Report-only
```

Clique:

```text
Create
```

---

# 59. TESTAR CA

Entre:

```text
Entra ID
  ↓
Monitoring
  ↓
Sign-in logs
```

Abra um login.

Procure:

```text
Conditional Access
```

Analise:

```text
Applied
Not applied
Report-only
```

---

# 60. CA02 — BLOQUEAR LEGACY AUTH

Crie:

```text
CA02-Block-Legacy-Authentication
```

Client apps:

```text
Legacy authentication clients
```

Grant:

```text
Block access
```

Comece:

```text
Report-only
```

---

# 61. WHAT IF

No Conditional Access:

```text
What If
```

Selecione:

```text
User:
cloud.user01

Application:
All cloud apps
```

Execute.

Pergunte:

```text
Qual política seria aplicada?
Qual condição foi satisfeita?
Qual política não foi aplicada?
Qual seria o resultado?
```

---

# 62. CA03 — APPLICATION

Criar:

```text
CA03-FinanceApp-MFA
```

Users:

```text
cloud.user01
```

Target:

```text
FinanceApp
```

Grant:

```text
MFA
```

Modo:

```text
Report-only
```

Depois de validar:

```text
On
```

---

# 63. RBAC

Não confundir:

```text
Microsoft Entra Roles
```

com:

```text
Azure RBAC
```

---

# 64. AZURE RESOURCE GROUP

No Azure Portal:

```text
Resource groups
  ↓
Create
```

Nome:

```text
rg-iam-lab
```

Região:

```text
região mais próxima disponível
```

Clique:

```text
Review + create
```

Depois:

```text
Create
```

---

# 65. RBAC READER

Abra:

```text
rg-iam-lab
  ↓
Access control (IAM)
  ↓
Add
  ↓
Add role assignment
```

Role:

```text
Reader
```

Assign access:

```text
User
```

Selecione:

```text
cloud.user01
```

---

# 66. TESTAR RBAC

Entre como:

```text
cloud.user01
```

Tente:

```text
Visualizar recurso
```

Deve funcionar.

Tente:

```text
Modificar recurso
```

Deve falhar.

Isso demonstra:

```text
Authentication
+
Authorization
```

---

# 67. DEVICE IDENTITY

No WIN11-01:

```text
Settings
  ↓
Accounts
  ↓
Access work or school
```

Estude a diferença entre:

```text
Microsoft Entra Registered
Microsoft Entra Joined
Hybrid Joined
```

Não confunda:

```text
User Identity
```

com:

```text
Device Identity
```

---

# 68. CLOUD SYNC

Agora será necessário:

```text
DC01
+
SYNC01
```

---

# 69. CRIANDO SYNC01

No VirtualBox:

```text
New
```

Nome:

```text
SYNC01
```

Windows Server 2025.

RAM:

```text
3072 MB
```

CPU:

```text
2
```

Disco:

```text
50 GB
```

Rede:

```text
Adapter 1 = NAT
Adapter 2 = Host-only
```

---

# 70. IP SYNC01

Host-Only:

```text
IP:
192.168.56.15

Mask:
255.255.255.0

Gateway:
vazio

DNS:
192.168.56.10
```

---

# 71. TESTAR SYNC01

```powershell
ping 192.168.56.10
```

Depois:

```powershell
nslookup corp.lab
```

Depois:

```powershell
nslookup dc01.corp.lab
```

---

# 72. DOMAIN JOIN SYNC01

Entre em:

```text
Settings
  ↓
System
  ↓
About
```

Faça:

```text
Join domain
```

Domínio:

```text
corp.lab
```

Use:

```text
CORP\Administrator
```

Reinicie.

---

# 73. VALIDAR SYNC01

```powershell
whoami
```

Esperado:

```text
corp\Administrator
```

Depois:

```powershell
nltest /dsgetdc:corp.lab
```

Esperado:

```text
DC01
```

---

# 74. CLOUD SYNC — PRÉ-REQUISITOS

O agente Cloud Sync deve estar em servidor ingressado no domínio.

O ambiente também precisa atender aos requisitos de identidade, gMSA, rede e licença definidos pela Microsoft.

Não instale o agente sem antes validar os pré-requisitos.

---

# 75. INSTALAR AGENTE CLOUD SYNC

No portal:

```text
Entra ID
  ↓
Entra Connect
  ↓
Cloud Sync
```

Localize:

```text
Cloud Sync agents
```

Baixe o:

```text
Microsoft Entra Provisioning Agent
```

No SYNC01:

```text
Downloads
  ↓
Installer
```

Execute como administrador.

---

# 76. REGISTRAR AGENTE

Durante o assistente:

```text
Sign in
```

Utilize uma conta apropriada para Hybrid Identity.

Não use:

```text
Guest
```

O agente solicitará informações relacionadas ao AD.

Conclua.

---

# 77. VALIDAR AGENTE

No portal:

```text
Entra ID
  ↓
Entra Connect
  ↓
Cloud Sync
  ↓
Agents
```

Procure:

```text
SYNC01
```

Estado esperado:

```text
Active
```

---

# 78. CRIAR CONFIGURAÇÃO

No Cloud Sync:

```text
New configuration
```

Selecione:

```text
Microsoft Entra ID
```

como destino.

Selecione:

```text
corp.lab
```

como domínio.

---

# 79. ESCOPO

Não sincronize o domínio inteiro.

Use:

```text
OU=IAM-Lab
```

Isso permite testar sem colocar todo o ambiente no escopo.

---

# 80. TEST USER

No AD:

```text
IAM-Lab
```

Crie:

```text
sync.test
```

---

# 81. UPN PARA CLOUD

Para sincronização, o UPN precisa ser compatível com um domínio verificado no tenant.

Exemplo:

```text
sync.test@SEUTENANT.onmicrosoft.com
```

Se você possuir um domínio próprio verificado:

```text
sync.test@seudominio.com
```

será preferível.

---

# 82. PROVISIONAMENTO SOB DEMANDA

Antes de habilitar tudo:

```text
Cloud Sync
  ↓
Configuration
  ↓
Provision on demand
```

Informe o DN de:

```text
sync.test
```

Exemplo:

```text
CN=sync.test,OU=IAM-Lab,DC=corp,DC=lab
```

Clique:

```text
Provision
```

---

# 83. ANALISAR O RESULTADO

O provisionamento sob demanda mostra:

```text
Import
↓
Scope
↓
Match
↓
Provision
```

Se falhar:

```text
NÃO habilite a sincronização completa.
```

Corrija primeiro.

---

# 84. VALIDAR NO ENTRA

Abra:

```text
Entra ID
  ↓
Users
  ↓
All users
```

Procure:

```text
sync.test
```

Verifique:

```text
UPN
Source
Object ID
Department
Account status
```

---

# 85. HABILITAR CLOUD SYNC

Depois do teste:

```text
Scope
↓
Attribute Mapping
↓
Test
↓
Review
↓
Enable
```

Somente então:

```text
Enable
```

---

# 86. TESTAR ALTERAÇÃO

No AD:

```text
sync.test
```

Altere:

```text
Department:
IT
```

Aguarde o ciclo.

Valide no Entra.

Depois altere:

```text
Department:
Finance
```

Valide novamente.

---

# 87. TESTAR LEAVER

No AD:

```powershell
Disable-ADAccount sync.test
```

Aguarde sincronização.

Verifique no Entra.

Documente:

```text
AD:
Disabled

Cloud:
estado observado

Timestamp:
__________
```

---

# 88. TROUBLESHOOTING CLOUD SYNC

Sempre nesta ordem:

```text
1. Agent
2. Network
3. Domain
4. Scope
5. OU
6. Attribute Mapping
7. Object Matching
8. Provisioning Logs
9. Quarantine
10. Target
```

Não altere cinco coisas ao mesmo tempo.

---

# 89. JML HÍBRIDO

Agora execute:

```text
JOINER
```

Criar no AD:

```text
joao.finance
```

Adicionar:

```text
GG-Finance
```

Sincronizar.

---

# 90. VALIDAR JOINER

Esperado:

```text
AD User
↓
Cloud Sync
↓
Entra User
↓
MFA
↓
CA
↓
Application
```

---

# 91. MOVER

Alterar:

```text
Finance
↓
IT
```

Remover:

```text
GG-Finance
```

Adicionar:

```text
GG-IT
```

Sincronizar.

Validar:

```text
Finance access = removed
IT access = present
```

---

# 92. LEAVER

Executar:

```text
Disable AD account
↓
Sync
↓
Cloud account affected
↓
Groups reviewed
↓
Application access reviewed
↓
Privileged access reviewed
↓
Audit
```

---

# 93. APPLICATION IDENTITY

No Entra:

```text
Entra ID
  ↓
App registrations
  ↓
New registration
```

Nome:

```text
APP-Finance
```

Tipo:

```text
Accounts in this organizational directory only
```

Registre:

```text
Application ID
Directory ID
Object ID
```

---

# 94. APP REGISTRATION

Entenda:

```text
Application Object
```

como a definição da aplicação.

E:

```text
Service Principal
```

como a identidade da aplicação dentro do tenant.

---

# 95. SERVICE PRINCIPAL

No Entra:

```text
Enterprise applications
```

Procure:

```text
APP-Finance
```

Compare:

```text
Application ID
Service Principal ID
```

---

# 96. API PERMISSIONS

Abra:

```text
App registrations
  ↓
APP-Finance
  ↓
API permissions
```

Você verá permissões como:

```text
Microsoft Graph
```

Entenda a diferença:

```text
Delegated
```

e:

```text
Application
```

---

# 97. DELEGATED

Modelo:

```text
User
 ↓
Application
 ↓
Microsoft Graph
```

A aplicação atua em nome do usuário.

---

# 98. APPLICATION

Modelo:

```text
Application
 ↓
Microsoft Graph
```

Não existe usuário interativo necessariamente.

Por isso, o risco é maior.

Use somente permissões necessárias.

---

# 99. SECRET

Em:

```text
Certificates & secrets
```

Crie um secret de laboratório.

Defina uma expiração curta.

Copie o valor imediatamente.

O valor pode não ser exibido novamente.

Não publique:

```text
Client Secret
```

---

# 100. CERTIFICATE

Crie certificado de laboratório.

Documente:

```text
Subject
Thumbprint
Expiration
Owner
Purpose
```

Não publique:

```text
Private Key
```

---

# 101. MANAGED IDENTITY

Crie uma VM Azure pequena de laboratório somente quando necessário.

No Azure:

```text
Virtual machines
  ↓
Create
```

Durante ou depois da criação:

```text
Identity
  ↓
System assigned
  ↓
On
```

Salve.

---

# 102. RBAC PARA MANAGED IDENTITY

Crie:

```text
Storage Account
```

Depois:

```text
Storage
  ↓
Access Control (IAM)
  ↓
Add role assignment
```

Role:

```text
Storage Blob Data Reader
```

Principal:

```text
Managed Identity da VM
```

---

# 103. TESTE

A VM deve conseguir executar a ação permitida.

Não deve conseguir executar uma ação não concedida.

Modelo:

```text
Managed Identity
      ↓
RBAC
      ↓
Storage
```

---

# 104. OAUTH 2.0

Estude o fluxo:

```text
User
 ↓
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

Termos obrigatórios:

```text
Client
Scope
Authorization Code
Access Token
Refresh Token
PKCE
Redirect URI
```

---

# 105. OIDC

OIDC utiliza OAuth 2.0 para autenticação.

Estude:

```text
ID Token
Access Token
Issuer
Audience
Subject
Nonce
State
Redirect URI
```

---

# 106. JWT

Um token JWT possui:

```text
HEADER
.
PAYLOAD
.
SIGNATURE
```

Analise:

```text
iss
sub
aud
exp
iat
nonce
scp
roles
```

Nunca confie somente no payload.

Valide:

```text
Signature
Issuer
Audience
Expiration
Claims
```

---

# 107. SAML

Utilize o:

```text
Microsoft Entra SAML Toolkit
```

quando disponível.

No Entra:

```text
Enterprise applications
  ↓
New application
  ↓
Microsoft Entra SAML Toolkit
```

---

# 108. CONCEITOS SAML

Estude:

```text
IdP
SP
Entity ID
ACS URL
NameID
Claims
Signing Certificate
```

Fluxo:

```text
User
 ↓
SP
 ↓
Entra IdP
 ↓
SAML Assertion
 ↓
SP
```

---

# 109. TROUBLESHOOTING SAML

Se falhar, verifique:

```text
Entity ID
ACS URL
Reply URL
NameID
Claims
Certificate
User Assignment
Clock
```

---

# 110. SCIM

SCIM será utilizado para praticar:

```text
Provisioning
Deprovisioning
Attribute Mapping
```

Fluxo:

```text
Entra
 ↓
SCIM
 ↓
Application
```

Teste:

```text
CREATE
UPDATE
DISABLE
DELETE/DEPROVISION
```

---

# 111. POWERSHELL

No DC01:

```text
C:\IAM-Lab
```

Crie:

```text
Scripts
Logs
Reports
Evidence
```

---

# 112. SCRIPT JOINER

Crie:

```text
New-IAMUser.ps1
```

Estrutura mínima:

```powershell
param(
    [Parameter(Mandatory)]
    [string]$FirstName,

    [Parameter(Mandatory)]
    [string]$LastName,

    [Parameter(Mandatory)]
    [string]$Department
)

$Username = "$($FirstName.ToLower()).$($LastName.ToLower())"

Write-Host "Creating user: $Username"

# Implementação do exercício
```

Primeiro entenda.

Depois automatize.

---

# 113. SCRIPT LEAVER

Criar:

```text
Disable-IAMUser.ps1
```

Fluxo:

```text
Input
 ↓
Validate
 ↓
Disable
 ↓
Remove Access
 ↓
Move to Disabled OU
 ↓
Log
```

---

# 114. LOGGING

Todo script deve registrar:

```text
Timestamp
User
Action
Operator
Result
Error
```

Exemplo:

```text
2026-08-27 21:00
joao.silva
Disable Account
admin.iam
SUCCESS
```

---

# 115. MICROSOFT GRAPH

Instalar:

```powershell
Install-Module Microsoft.Graph -Scope CurrentUser
```

Conectar:

```powershell
Connect-MgGraph -Scopes "User.Read.All","Group.Read.All"
```

Não conceda permissões maiores que o necessário.

---

# 116. CONSULTAR USUÁRIOS

```powershell
Get-MgUser -All |
    Select-Object DisplayName,UserPrincipalName,AccountEnabled
```

---

# 117. RELATÓRIO

Criar:

```text
Export-IAMReport.ps1
```

Gerar:

```text
User
UPN
Department
AccountEnabled
CreatedDateTime
```

Exportar:

```powershell
Export-Csv
```

---

# 118. PRIVILEGED USERS

Crie relatório específico:

```text
Get-PrivilegedUsers.ps1
```

Objetivo:

```text
User
Role
Assignment
Scope
Status
```

---

# 119. PIM

## IMPORTANTE

PIM não é uma funcionalidade gratuita.

Para utilizar PIM e suas configurações, o tenant precisa de licença válida, como:

```text
Microsoft Entra ID P2
```

ou:

```text
Microsoft Entra ID Governance
```

---

# 120. ESTRATÉGIA DE CUSTO DO LABORATÓRIO

Não crie dez usuários licenciados.

Utilize:

```text
1 usuário de laboratório licenciado
```

e reutilize para os exercícios.

Exemplo:

```text
admin.iam
```

Atenção:

Se o exercício exigir dois participantes licenciados simultaneamente, uma única licença não cobre os dois usuários.

---

# 121. PIM — ELIGIBLE

No Entra:

```text
Privileged Identity Management
  ↓
Microsoft Entra roles
```

Selecione uma função de laboratório apropriada.

Configure:

```text
Eligible
```

em vez de:

```text
Permanent active
```

---

# 122. ATIVAÇÃO PIM

Execute:

```text
Activate
```

Informe:

```text
MFA
Justification
Duration
```

Exemplo:

```text
Justification:
Lab test - temporary administrative operation
```

---

# 123. VALIDAR PIM

Depois da ativação:

```text
My roles
```

Verifique:

```text
Role
Status
Start
Expiration
```

Depois aguarde a expiração ou encerre a ativação.

---

# 124. PIM — AUDITORIA

Procure:

```text
Audit history
```

Responda:

```text
Quem ativou?
Qual função?
Quando?
Por quanto tempo?
Qual justificativa?
```

---

# 125. ACCESS REVIEWS

Access Reviews exige licenciamento apropriado de Governance/Suite nos cenários atuais.

Crie:

```text
GG-Finance
```

Membros:

```text
ana.silva
joao.silva
```

---

# 126. CRIAR ACCESS REVIEW

No Entra:

```text
ID Governance
  ↓
Access Reviews
  ↓
New access review
```

Escolha:

```text
Group
```

Grupo:

```text
GG-Finance
```

Reviewer:

```text
Specified users
```

ou:

```text
Group owner
```

---

# 127. TESTE

Faça uma decisão:

```text
ana.silva
Approve
```

e:

```text
joao.silva
Deny
```

Depois aplique.

Verifique:

```text
GG-Finance
```

---

# 128. ENTITLEMENT MANAGEMENT

Quando o tenant/licenciamento disponibilizar:

```text
Identity Governance
  ↓
Entitlement Management
```

Crie:

```text
Catalog:
Finance
```

Adicione:

```text
GG-Finance
APP-Finance
```

---

# 129. ACCESS PACKAGE

Crie:

```text
Finance Employee
```

Fluxo:

```text
User
 ↓
Request
 ↓
Approval
 ↓
Access Package
 ↓
Group
 ↓
Application
```

Configure expiração.

---

# 130. LIFECYCLE WORKFLOWS

Quando disponível no licenciamento:

```text
Identity Governance
  ↓
Lifecycle Workflows
```

Estude:

```text
Joiner
Mover
Leaver
```

---

# 131. JOINER WORKFLOW

Evento:

```text
New Employee
```

Ação:

```text
Add to group
```

Exemplo:

```text
Finance Employee
```

---

# 132. LEAVER WORKFLOW

Evento:

```text
Employee leaving
```

Ações conceituais:

```text
Remove group
Remove application access
Disable account
```

Não automatize ações destrutivas em produção.

No laboratório:

```text
manual execution
```

primeiro.

---

# 133. B2B

Crie um guest:

```text
guest.finance
```

Dê acesso somente a:

```text
FinanceApp
```

Não dê:

```text
Global Administrator
```

---

# 134. GOVERNANÇA B2B

Responda:

```text
Quem convidou?
Por quê?
Qual recurso?
Por quanto tempo?
Quem aprovou?
Quem revisa?
Quando remover?
```

---

# 135. PAM

PAM é diferente de PIM.

PIM:

```text
Privilege
↓
JIT
↓
Activation
↓
Expiration
```

PAM:

```text
Privileged Account
↓
Vault
↓
Checkout
↓
Session
↓
Rotation
↓
Audit
```

---

# 136. PAM GRATUITO

Para o laboratório, utilize:

```text
LINUX01
+
sudo
+
SSH
+
HashiCorp Vault Community
```

Isso não transforma o laboratório em uma solução PAM empresarial.

O objetivo é estudar os fundamentos.

---

# 137. CRIAR LINUX01

No VirtualBox:

```text
New
```

Sistema:

```text
Ubuntu Server LTS
```

RAM:

```text
2048 MB
```

CPU:

```text
2
```

Disco:

```text
25 GB
```

Rede:

```text
NAT
+
Host-only
```

---

# 138. IP LINUX01

Configure:

```text
192.168.56.30
```

DNS:

```text
192.168.56.10
```

---

# 139. CRIAR USUÁRIOS

No Linux:

```bash
sudo adduser pamuser
sudo adduser pamadmin
```

---

# 140. SUDO

Edite:

```bash
sudo visudo
```

Conceda privilégio somente a:

```text
pamadmin
```

Teste:

```bash
sudo -l
```

Compare:

```text
pamuser
```

com:

```text
pamadmin
```

---

# 141. SSH

Instale:

```bash
sudo apt update
sudo apt install openssh-server
```

Verifique:

```bash
systemctl status ssh
```

---

# 142. TESTAR SSH

Do host ou outra VM:

```bash
ssh pamuser@192.168.56.30
```

Depois:

```bash
ssh pamadmin@192.168.56.30
```

---

# 143. VAULT COMMUNITY

Utilize o Vault Community para estudar:

```text
Secrets
Authentication
Policies
Audit
Rotation concepts
```

Não trate:

```text
Vault Community
```

como equivalente a:

```text
CyberArk / BeyondTrust / Delinea
```

---

# 144. VAULT

Instale conforme a documentação oficial da HashiCorp.

Depois:

```text
vault
```

deve responder no terminal.

---

# 145. CONCEITO VAULT

Fluxo:

```text
User
 ↓
Authentication
 ↓
Policy
 ↓
Secret
 ↓
Audit
```

---

# 146. SEGREDO DE LABORATÓRIO

Crie:

```text
lab/app
```

Com:

```text
username
password
```

Não use senha real.

---

# 147. POLICY

Crie uma política permitindo somente:

```text
read
```

em:

```text
lab/app
```

Teste.

Depois tente:

```text
write
```

O acesso deve ser negado.

---

# 148. AUDIT

Habilite o mecanismo de auditoria disponível na edição utilizada.

Depois:

```text
read secret
```

Procure o evento correspondente.

Objetivo:

```text
Who
What
When
Result
```

---

# 149. SEGREGAÇÃO DE FUNÇÕES

Crie conceitualmente:

```text
Requester
Approver
Operator
Auditor
```

Regra:

```text
Requester != Approver
```

e:

```text
Operator != Auditor
```

---

# 150. IAM MONITORING

Monitore:

```text
Audit Logs
Sign-in Logs
Provisioning Logs
Conditional Access
PIM
Applications
Service Principals
Groups
```

---

# 151. EVENTOS IMPORTANTES

Crie uma matriz:

| Evento | Prioridade |
|---|---:|
| Global Admin assigned | CRITICAL |
| PIM activation | HIGH |
| MFA method added | HIGH |
| Service Principal created | HIGH |
| Client Secret added | HIGH |
| API permission changed | HIGH |
| Admin consent | HIGH |
| Conditional Access changed | HIGH |
| Breakglass login | CRITICAL |
| Guest created | MEDIUM/HIGH |

---

# 152. CASO DE INCIDENTE — MFA

Simule:

```text
MFA method added
```

Investigue:

```text
User
IP
Device
Time
Authentication
Previous sign-ins
```

Resposta de laboratório:

```text
Disable account
Revoke sessions
Remove unauthorized method
Reset credentials
Investigate
Document
```

---

# 153. CASO DE INCIDENTE — PIM

Evento:

```text
Privileged role activation
```

Perguntas:

```text
Quem?
Qual role?
Quando?
Quanto tempo?
Justificativa?
IP?
Foi esperado?
```

---

# 154. CASO DE INCIDENTE — BREAKGLASS

Evento:

```text
breakglass01 login
```

Classificação:

```text
CRITICAL
```

Investigação:

```text
IP
Timestamp
Device
Authentication
Activity
```

---

# 155. SIEM

Você já possui Wazuh no seu laboratório pessoal.

Não deixe o Wazuh ligado permanentemente.

Ligue somente quando executar:

```text
IAM Monitoring
```

Fluxo:

```text
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
```

---

# 156. PROJETO FINAL

Crie uma empresa fictícia:

```text
Contoso Lab
```

Departamentos:

```text
Finance
IT
HR
Helpdesk
```

Aplicações:

```text
FinanceApp
ITPortal
```

---

# 157. PROJETO FINAL — JOINER

Criar:

```text
joao.silva
```

Departamento:

```text
Finance
```

Grupo:

```text
GG-Finance
```

Fluxo:

```text
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
FinanceApp
```

---

# 158. PROJETO FINAL — MOVER

Alterar:

```text
Finance
↓
IT
```

Executar:

```text
Remove GG-Finance
Add GG-IT
```

Validar:

```text
FinanceApp
↓
Access denied
```

e:

```text
ITPortal
↓
Access allowed
```

---

# 159. PROJETO FINAL — PRIVILEGED

João precisa executar uma tarefa administrativa.

Fluxo:

```text
Admin Identity
 ↓
PIM
 ↓
MFA
 ↓
Activation
 ↓
Temporary Privilege
 ↓
Task
 ↓
Expiration
 ↓
Audit
```

---

# 160. PROJETO FINAL — ACCESS REVIEW

Criar:

```text
Finance Access Review
```

Reviewer:

```text
Manager
```

Resultado:

```text
Approve
Deny
```

Aplicar.

Validar acesso efetivo.

---

# 161. PROJETO FINAL — LEAVER

João deixa a empresa.

Executar:

```text
Disable AD
 ↓
Cloud Sync
 ↓
Entra
 ↓
Remove Groups
 ↓
Remove Application Access
 ↓
Review Privileges
 ↓
Revoke Sessions when appropriate
 ↓
Audit
```

---

# 162. PROJETO FINAL — INCIDENTE

Simular:

```text
MFA method added unexpectedly
```

Investigar.

Documentar:

```text
Timeline
User
IP
Device
Evidence
Root Cause
Response
Recovery
Lessons Learned
```

---

# 163. DOCUMENTAÇÃO

Crie:

```text
iam-homelab/
```

Estrutura:

```text
iam-homelab/
│
├── README.md
│
├── architecture/
│
├── active-directory/
│
├── entra/
│
├── hybrid/
│
├── applications/
│
├── governance/
│
├── pam/
│
├── automation/
│
├── monitoring/
│
├── evidence/
│
└── scripts/
```

---

# 164. DOCUMENTO DE CADA LABORATÓRIO

Use:

```markdown
# Laboratório

## Objetivo

## Cenário

## Pré-requisitos

## Arquitetura

## Configuração

## Teste

## Resultado esperado

## Resultado obtido

## Troubleshooting

## Evidências

## Boas práticas

## O que aprendi
```

---

# 165. EVIDÊNCIAS

Guardar:

```text
Screenshots
Logs
Commands
Outputs
Diagrams
Configuration
```

Nunca guardar:

```text
Password
Secret
Token
Private Key
Recovery Code
API Key
```

---

# 166. TROUBLESHOOTING

Sempre utilizar:

```text
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
```

Exemplo:

```text
Sintoma:
User não sincroniza.

Hipótese:
OU fora do escopo.

Teste:
Provision on demand.

Resultado:
Out of scope.

Causa:
Scope filter.

Correção:
Adicionar OU.

Validação:
Provisionamento bem-sucedido.
```

---

# 167. CHECKPOINTS

Após cada fase, crie um Snapshot da VM.

Exemplo:

```text
DC01-AD-BASE
DC01-GPO
WIN11-DOMAIN
SYNC01-AGENT
```

Antes de mudanças grandes:

```text
Snapshot
```

Isso reduz o tempo de recuperação do laboratório.

---

# 168. NÃO SNAPSHOTE O QUE ESTÁ EM PRODUÇÃO

Este laboratório é:

```text
LABORATÓRIO
```

Nunca conecte:

```text
AD real
```

ao:

```text
tenant corporativo real
```

sem planejamento e autorização.

---

# 169. CHECKLIST AD

```text
[ ] VirtualBox
[ ] Host-only
[ ] DHCP disabled
[ ] DC01
[ ] Static IP
[ ] DNS
[ ] AD DS
[ ] Domain
[ ] OUs
[ ] Users
[ ] Groups
[ ] Admin accounts
[ ] Service accounts
[ ] Delegation
[ ] GPO
[ ] Password policy
[ ] Lockout
[ ] Audit
[ ] JML
```

---

# 170. CHECKLIST ENTRA

```text
[ ] Tenant
[ ] Cloud admin
[ ] Breakglass
[ ] Users
[ ] Groups
[ ] MFA
[ ] SSPR
[ ] Conditional Access
[ ] What If
[ ] Report-only
[ ] RBAC
[ ] Device Identity
[ ] Logs
```

---

# 171. CHECKLIST HYBRID

```text
[ ] SYNC01
[ ] Domain Join
[ ] Provisioning Agent
[ ] Agent Active
[ ] Scope
[ ] Attribute Mapping
[ ] Provision on demand
[ ] Test User
[ ] Sync
[ ] Update
[ ] Disable
[ ] Troubleshooting
```

---

# 172. CHECKLIST APPLICATION IAM

```text
[ ] App Registration
[ ] Enterprise Application
[ ] Service Principal
[ ] Client ID
[ ] Tenant ID
[ ] Secret
[ ] Certificate
[ ] Delegated Permission
[ ] Application Permission
[ ] Admin Consent
[ ] OAuth
[ ] OIDC
[ ] JWT
[ ] SAML
[ ] SCIM
```

---

# 173. CHECKLIST GOVERNANCE

```text
[ ] PIM
[ ] Eligible
[ ] Activation
[ ] MFA
[ ] Justification
[ ] Expiration
[ ] Audit
[ ] Access Review
[ ] Entitlement Management
[ ] Lifecycle Workflow
[ ] B2B
[ ] SoD
```

---

# 174. CHECKLIST PAM

```text
[ ] Linux
[ ] Users
[ ] sudo
[ ] SSH
[ ] Vault
[ ] Secrets
[ ] Policy
[ ] Audit
[ ] Rotation concept
[ ] Privileged workflow
```

---

# 175. CHECKLIST AUTOMATION

```text
[ ] PowerShell
[ ] Parameters
[ ] Validation
[ ] Error handling
[ ] Logging
[ ] Graph
[ ] User report
[ ] Group report
[ ] Privileged report
[ ] Joiner automation
[ ] Leaver automation
```

---

# 176. CHECKLIST MONITORING

```text
[ ] Sign-in logs
[ ] Audit logs
[ ] Provisioning logs
[ ] CA logs
[ ] PIM logs
[ ] Application events
[ ] Service Principal events
[ ] MFA changes
[ ] Breakglass
[ ] SIEM
[ ] Detection
[ ] Investigation
```

---

# 177. CRITÉRIO DE DOMÍNIO

Um módulo só está concluído quando você consegue:

```text
EXPLICAR
↓
CONFIGURAR
↓
TESTAR
↓
FALHAR
↓
INVESTIGAR
↓
CORRIGIR
↓
AUTOMATIZAR
↓
DOCUMENTAR
```

---

# 178. NÍVEL 1 — EXPLICAR

Você consegue explicar sem consultar documentação:

```text
O que é IAM?
O que é Authentication?
O que é Authorization?
O que é RBAC?
O que é JML?
O que é PIM?
O que é PAM?
O que é Service Principal?
O que é Managed Identity?
O que é OAuth?
O que é OIDC?
O que é SAML?
```

---

# 179. NÍVEL 2 — CONFIGURAR

Você consegue construir:

```text
AD
Entra
MFA
CA
RBAC
Cloud Sync
Application
PIM
Governance
PAM
```

---

# 180. NÍVEL 3 — OPERAR

Você consegue executar:

```text
Create
Modify
Disable
Remove
Review
Audit
```

---

# 181. NÍVEL 4 — TROUBLESHOOT

Você consegue descobrir:

```text
Por que o usuário não sincronizou?
Por que o login foi bloqueado?
Por que o RBAC negou acesso?
Por que a aplicação não autenticou?
Por que o SAML falhou?
Por que o token foi rejeitado?
```

---

# 182. NÍVEL 5 — AUTOMATIZAR

Você consegue transformar:

```text
Manual Process
```

em:

```text
PowerShell
Graph
API
Workflow
```

---

# 183. NÍVEL 6 — GOVERNAR

Você consegue responder:

```text
Quem possui acesso?
Por que possui?
Quem aprovou?
Qual privilégio?
Qual escopo?
Até quando?
Quem revisa?
Como revogar?
Como provar?
```

---

# 184. ORDEM OFICIAL DO LABORATÓRIO

Não tente fazer tudo de uma vez.

Execute:

```text
FASE 01
VirtualBox
↓
Rede
↓
DC01

FASE 02
AD DS
↓
DNS
↓
Domain

FASE 03
Users
↓
Groups
↓
OUs

FASE 04
GPO
↓
Hardening
↓
Audit

FASE 05
JML
↓
Joiner
↓
Mover
↓
Leaver

FASE 06
WIN11
↓
Domain Join

FASE 07
Entra
↓
Users
↓
Groups
↓
MFA
↓
SSPR

FASE 08
Conditional Access
↓
Report-only
↓
What If
↓
Enforcement

FASE 09
RBAC
↓
Least Privilege

FASE 10
SYNC01
↓
Cloud Sync
↓
Provision on demand
↓
Synchronization

FASE 11
Hybrid JML

FASE 12
Application Identity
↓
Service Principal
↓
API Permissions

FASE 13
OAuth
↓
OIDC
↓
JWT
↓
SAML
↓
SCIM

FASE 14
PowerShell
↓
Graph
↓
Automation

FASE 15
PIM
↓
JIT
↓
Audit

FASE 16
Access Reviews
↓
Entitlement
↓
Lifecycle

FASE 17
B2B
↓
SoD

FASE 18
PAM
↓
Linux
↓
Vault

FASE 19
Monitoring
↓
SIEM
↓
Detection

FASE 20
FINAL PROJECT
```

---

# 185. ARQUITETURA FINAL

```text
                         INTERNET
                             │
                             │
                           NAT
                             │
                  ┌──────────┴──────────┐
                  │                     │
                DC01                  SYNC01
             192.168.56.10        192.168.56.15
                  │                     │
                  │                     │
                  └──────────┬──────────┘
                             │
                        HOST-ONLY
                      192.168.56.0/24
                             │
                     ┌───────┴────────┐
                     │                │
                 WIN11-01          LINUX01
                .56.20             .56.30


                         CLOUD
                           │
                           ▼
                  MICROSOFT ENTRA ID
                           │
          ┌────────────────┼─────────────────┐
          │                │                 │
       Identity       Authentication     Authorization
          │                │                 │
       Users             MFA                RBAC
       Groups            SSPR               PIM
       Devices           CA                 Apps
          │                │                 │
          └────────────────┼─────────────────┘
                           │
                       Governance
                           │
              ┌────────────┼────────────┐
              │            │            │
          Reviews      Entitlement   Lifecycle
              │            │            │
              └────────────┼────────────┘
                           │
                        Audit
                           │
                           ▼
                          SIEM
```

---

# 186. PRINCÍPIO CENTRAL DO LABORATÓRIO

Não pense:

```text
"Eu sei administrar usuários."
```

Pense:

```text
IDENTITY
    ↓
AUTHENTICATION
    ↓
CONTEXT
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
REVOCATION
```

Esse é o modelo mental que deve orientar sua formação em IAM.

---

# 187. RESULTADO FINAL

Ao terminar o laboratório você deverá possuir evidências práticas de:

```text
Active Directory
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
OAuth 2.0
OIDC
JWT
SAML
SCIM
PowerShell
Microsoft Graph
PIM
Access Reviews
Entitlement Management
Lifecycle Workflows
B2B
PAM
SoD
IAM Monitoring
SIEM
Incident Response
```

E, principalmente, deverá conseguir demonstrar o seguinte fluxo de negócio:

```text
EMPLOYEE JOINER
      ↓
IDENTITY CREATED
      ↓
GROUP MEMBERSHIP
      ↓
CLOUD PROVISIONING
      ↓
AUTHENTICATION
      ↓
MFA
      ↓
CONDITIONAL ACCESS
      ↓
APPLICATION ACCESS
      ↓
PRIVILEGED ACCESS WHEN NEEDED
      ↓
PIM / JIT
      ↓
AUDIT
      ↓
ACCESS REVIEW
      ↓
DEPARTMENT CHANGE
      ↓
ACCESS RECALCULATION
      ↓
LEAVER
      ↓
DISABLE
      ↓
DEPROVISION
      ↓
AUDIT
      ↓
EVIDENCE
```

---

# 188. REGRA DE OURO

Em todos os laboratórios, faça sempre estas cinco perguntas:

```text
1. QUEM é a identidade?

2. COMO ela foi autenticada?

3. O QUE ela pode acessar?

4. POR QUE ela possui esse acesso?

5. COMO o acesso será removido?
```

Se você conseguir responder essas cinco perguntas tecnicamente, operacionalmente e com evidências, estará estudando IAM da forma correta.
