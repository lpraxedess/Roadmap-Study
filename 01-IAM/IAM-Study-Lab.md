# 🛡️ IAM Study Lab — Microsoft Entra ID do Básico ao Avançado

> **Manual prático para evolução profissional em IAM.**
>
> Eixo principal: Microsoft Entra ID. Trilhas complementares: Active Directory, JML, RBAC/ABAC, MFA, Conditional Access, SSO, SAML, OIDC, OAuth2, SCIM, workload identity, IGA, PIM, PAM, Teleport CE, PowerShell, Graph, KQL, cloud, ITSM, auditoria e arquitetura.
>
> **Método:** entender → preparar → configurar → testar → quebrar → investigar → corrigir → revogar → documentar → explicar.

![Microsoft Entra](https://img.shields.io/badge/Microsoft-Entra%20ID-0078D4?style=for-the-badge&logo=microsoft)
![IAM](https://img.shields.io/badge/Focus-IAM-6f42c1?style=for-the-badge)
![Hands On](https://img.shields.io/badge/Lab-Hands--On-2ea44b?style=for-the-badge)
![Career](https://img.shields.io/badge/Career-Junior%20%E2%86%92%20Senior-orange?style=for-the-badge)

---

## 🧭 Navegação

- [1. Objetivo](#1--objetivo)
- [2. Método de estudo](#2--método-de-estudo)
- [3. Arquitetura mínima](#3--arquitetura-mínima)
- [4. Estratégia para 1 P2](#4--estratégia-para-1-p2)
- [5. Preparação](#5--preparação)
- [6. Mapa de carreira](#6--mapa-de-carreira)
- [7. IAM Fundamentals](#7--iam-fundamentals)
- [8. Active Directory](#8--active-directory)
- [9. Users e Groups](#9--users-e-groups)
- [10. RBAC / ABAC / Least Privilege](#10--rbac--abac--least-privilege)
- [11. MFA / SSPR](#11--mfa--sspr)
- [12. Conditional Access](#12--conditional-access)
- [13. Logs / KQL / Investigação](#13--logs--kql--investigação)
- [14. B2B / External Identity](#14--b2b--external-identity)
- [15. SSO / SAML](#15--sso--saml)
- [16. OIDC / OAuth2](#16--oidc--oauth2)
- [17. Applications / APIs / Service Principals](#17--applications--apis--service-principals)
- [18. Managed Identity / Workload Federation](#18--managed-identity--workload-federation)
- [19. JML](#19--jml)
- [20. IGA / SoD / Access Reviews](#20--iga--sod--access-reviews)
- [21. Entitlement Management](#21--entitlement-management)
- [22. Lifecycle Workflows](#22--lifecycle-workflows)
- [23. PIM / JIT](#23--pim--jit)
- [24. PAM Fundamentals](#24--pam-fundamentals)
- [25. Teleport Community Edition](#25--teleport-community-edition)
- [26. JEA / PAW / Break-glass](#26--jea--paw--break-glass)
- [27. PowerShell / Graph / REST](#27--powershell--graph--rest)
- [28. Hybrid Identity](#28--hybrid-identity)
- [29. Cloud IAM](#29--cloud-iam)
- [30. IGA / SailPoint](#30--iga--sailpoint)
- [31. PAM Enterprise](#31--pam-enterprise)
- [32. ITSM](#32--itsm)
- [33. Auditoria / Compliance](#33--auditoria--compliance)
- [34. Arquitetura IAM](#34--arquitetura-iam)
- [35. Projeto final](#35--projeto-final)
- [36. Evidências](#36--evidências)
- [37. Portfólio / Entrevistas](#37--portfólio--entrevistas)
- [38. Evolução de carreira](#38--evolução-de-carreira)
- [39. Checklist](#39--checklist)
- [40. Referências](#40--referências)

---

# 1. 🎯 Objetivo

Este projeto transforma sua experiência de infraestrutura, redes e segurança em uma trilha profissional de **IAM → IGA → IAM Engineering → arquitetura**.

A versão atual da SC-300, com competências medidas desde 27/04/2026, organiza o domínio em quatro áreas: identidades de usuários, autenticação/acesso, workload identities e governança. A Microsoft também espera familiaridade com Azure, Microsoft 365, AD DS, PowerShell e KQL. ([Microsoft Learn — SC-300](https://learn.microsoft.com/pt-br/credentials/certifications/resources/study-guides/sc-300))

O objetivo não é decorar telas. É conseguir responder, com evidência:

> **Quem é a identidade, como foi autenticada, por que recebeu o acesso, quem autorizou, por quanto tempo, qual privilégio possui, onde funciona, como revogar e como provar tudo isso para auditoria?**

---

# 2. 🧠 Método de estudo

## Regra 70/20/10

- **70%:** prática.
- **20%:** documentação, logs e troubleshooting.
- **10%:** teoria.

## Ciclo de cada missão

1. Leia o objetivo.
2. Explique o conceito com suas palavras.
3. Diga qual risco ele reduz.
4. Verifique pré-requisitos e licença.
5. Configure o menor cenário possível.
6. Faça teste positivo.
7. Faça teste negativo.
8. Provoque uma falha controlada.
9. Localize o log.
10. Corrija.
11. Faça rollback.
12. Repita sem consultar o manual.
13. Registre a evidência.
14. Explique o cenário em 60 segundos.

### Critério de domínio

```text
[ ] Sei o que é
[ ] Sei por que existe
[ ] Sei quando usar
[ ] Sei os pré-requisitos/licenciamento
[ ] Sei configurar
[ ] Sei testar permitido
[ ] Sei testar negado
[ ] Sei investigar
[ ] Sei corrigir
[ ] Sei revogar
[ ] Tenho evidência
[ ] Consigo explicar em entrevista
```

---

# 3. 💻 Arquitetura mínima

A máquina não precisa manter todas as VMs ligadas.

```text
SEU PC
├── Browser
├── PowerShell
└── Graph SDK
      │
      ▼
MICROSOFT ENTRA ID
├── Users / Groups
├── Authentication / CA
├── RBAC / PIM
├── Applications
├── Workload Identities
├── Governance
└── Logs
      │
      ├── Azure VM temporária
      ├── Linux + Teleport CE
      └── Windows Server AD somente na fase híbrida
```

| Componente | Quando ligar |
|---|---|
| Entra ID | Sempre |
| Teleport CE | PAM |
| Linux target | PAM/SSH |
| Windows Server | AD/Hybrid |
| Windows Client | JEA/PAW/dispositivo |
| PostgreSQL | Database Access opcional |
| Kubernetes | Somente etapa avançada |

**Regra:** desligue a VM quando ela não participar do exercício.

---

# 4. 💰 Estratégia para 1 P2

Você possui **1 licença Microsoft Entra ID P2**. Ela deve ser usada de forma estratégica e dentro do licenciamento real.

## Identidade P2 principal

```text
LAB-P2-ADMIN
```

Use-a para os exercícios que realmente exigirem P2, especialmente PIM e recursos de risco/governança aplicáveis ao seu tenant.

A Microsoft informa que PIM exige Microsoft Entra ID P2 ou Microsoft Entra ID Governance e que existem requisitos de licenciamento para usuários elegíveis, aprovadores e participantes de determinados recursos de governança. Consulte a matriz oficial antes de cada laboratório. ([Entra licensing](https://learn.microsoft.com/en-us/entra/fundamentals/licensing))

## Regra de laboratório

Você pode explorar uma funcionalidade em uma identidade por vez quando isso for compatível com sua licença, mas **não use troca de licença como modelo de implantação corporativa**. Se um cenário exigir licenciamento para vários usuários, registre a limitação ou use uma licença/trial adicional legítima.

| Recurso | Estratégia |
|---|---|
| Users / Groups | usuários de laboratório |
| RBAC | cenário mínimo |
| MFA / SSPR | usuários de teste |
| Conditional Access | validar requisitos atuais |
| Identity Protection | P2 no escopo mínimo |
| PIM | P2 no escopo mínimo |
| Access Reviews | somente escopo licenciado |
| Entitlement Management | validar licença atual |
| Lifecycle Workflows | executar se disponível; caso contrário simular |

---

# 5. 🔐 Preparação

## Identidades

| Nome | Uso |
|---|---|
| `LAB-P2-ADMIN` | P2 / administração |
| `LAB-BREAKGLASS` | recuperação |
| `LAB-USER-ANA` | teste permitido |
| `LAB-USER-JOAO` | teste negado |
| `LAB-USER-MARIA` | JML |
| `LAB-USER-CARLOS` | privilégio |
| `LAB-GUEST-PARTNER` | B2B |
| `LAB-APP-TEST` | aplicação |

## Convenções

```text
LAB-USER-*
LAB-GRP-*
LAB-ROLE-*
LAB-CA-*
LAB-APP-*
LAB-SP-*
LAB-PIM-*
LAB-AR-*
LAB-PACK-*
LAB-JML-*
```

## Break-glass

Antes de criar Conditional Access:

- [ ] conta criada;
- [ ] recuperação validada;
- [ ] não está indevidamente no escopo de bloqueio;
- [ ] uso será monitorado.

Nunca publique no GitHub senhas, tokens, secrets, chaves privadas, recovery codes ou dados pessoais reais.

---

# 6. 🗺️ Mapa de carreira

```text
IAM Fundamentals
      ↓
AD / Entra ID
      ↓
Authentication / MFA / SSO
      ↓
Authorization / RBAC / ABAC
      ↓
JML
      ↓
SAML / OIDC / OAuth2 / SCIM
      ↓
Workload Identity
      ↓
IGA / SoD / Access Reviews
      ↓
PIM
      ↓
PAM — Teleport CE
      ↓
PowerShell / Graph / REST / Python
      ↓
KQL / Investigation / Audit
      ↓
Hybrid Identity / Cloud IAM
      ↓
ITSM / Compliance
      ↓
SailPoint / PAM Enterprise
      ↓
IAM Engineering
      ↓
IAM Architecture
```

| Senioridade | Você deve conseguir |
|---|---|
| Entrada | operar identidades, MFA, JML e acessos |
| Júnior | administrar Entra/AD, controles e automação básica |
| Pleno | projetar JML, RBAC, SSO, IGA, APIs e governança |
| Sênior | arquitetura, IGA/PAM, cloud, risco, auditoria e liderança técnica |

---

# 7. 👤 IAM Fundamentals

## Aprenda

- identidade;
- conta;
- autenticação;
- autorização;
- entitlement;
- role;
- grupo;
- privilégio;
- sessão;
- identidade humana;
- identidade não humana;
- service account;
- workload identity.

## Prática

Desenhe:

```text
Pessoa
 ↓
Identidade
 ↓
Autenticação
 ↓
Role
 ↓
Entitlement
 ↓
Recurso
 ↓
Auditoria
```

Depois explique, sem consulta, por que autenticação e autorização são problemas diferentes.

---

# 8. 🏢 Active Directory

## O que aprender

Usuários, grupos, OUs, GPO, DNS, LDAP, Kerberos, permissões, delegação, contas privilegiadas, service accounts, trusts e sincronização com Entra.

## Laboratório

1. Criar domínio.
2. Criar OUs `Users`, `Servers`, `Workstations`, `Admins`.
3. Criar grupos por função.
4. Criar usuários.
5. Aplicar GPO simples.
6. Testar login.
7. Testar acesso por grupo.
8. Remover grupo.
9. Confirmar perda de acesso.
10. Investigar eventos.

**Pergunta:** por que grupos são preferíveis a permissões individuais?

---

# 9. 👥 Users e Groups

## O que é

Usuário representa uma identidade. Grupo fornece uma forma escalável de associar identidades a acesso.

## Como

**Entra admin center → Identity → Users → All users → New user**

Crie ANA, JOAO e MARIA.

Depois:

**Identity → Groups → All groups → New group**

Crie `LAB-GRP-FINANCE` e adicione ANA.

## Teste

Conceda acesso ao grupo → ANA acessa.

Remova ANA → ANA perde o acesso.

## Teste negativo

Tente acessar sem membership e registre a evidência.

---

# 10. 🔐 RBAC / ABAC / Least Privilege

## RBAC

```text
User → Role → Permission → Resource
```

Crie:

```text
APP-READER
APP-OPERATOR
APP-ADMIN
```

Teste acesso progressivo.

## Azure RBAC

Crie um recurso temporário. Conceda somente a role mínima. Teste. Remova. Teste novamente.

Compare o mesmo acesso em:

```text
Subscription
Resource Group
Resource
```

Explique **escopo, herança e blast radius**.

## ABAC

Modele:

```text
Subject + Action + Resource + Attributes → Decision
```

Use atributos conceituais como `Department=Finance`, `Environment=Production`, `JobLevel=Senior`.

---

# 11. 🔑 MFA / SSPR

## MFA

**O que é:** múltiplos fatores.

**Por que:** reduz dependência de senha.

**Prática:** registrar método → testar login → confirmar MFA → consultar log → revogar sessão → repetir.

## SSPR

Simule:

```text
Senha esquecida
 ↓
Validação
 ↓
Reset
 ↓
Novo login
```

Teste também o caminho que não satisfaz os requisitos.

**Pergunta:** SSPR resolve autorização? **Não.**

---

# 12. 🛡️ Conditional Access

## Conceito

```text
WHO + WHAT + WHERE + DEVICE + RISK
                ↓
             POLICY
                ↓
        GRANT / BLOCK / SESSION
```

## Regra

**Report-only → teste → What If → logs → ajuste → ativação.**

## Missão 1 — MFA

**Protection → Conditional Access → Policies → New policy**

Nome: `LAB-CA-001-MFA`

Selecione somente ANA. Configure MFA. Use Report-only. Faça login. Analise o detalhe do Sign-in Log. Ative somente após validar.

## Missão 2 — Bloqueio

Crie uma política de laboratório que bloqueie JOAO. Teste. Investigue. Faça rollback.

## Missão 3 — Contexto

Quando disponível, teste localização, dispositivo, risco e session controls.

### Evidência obrigatória

- política;
- escopo;
- exclusões;
- What If;
- log permitido;
- log negado;
- rollback.

---

# 13. 🔎 Logs / KQL / Investigação

A SC-300 atual inclui monitoramento, logs, relatórios e KQL. ([Microsoft Learn — SC-300](https://learn.microsoft.com/pt-br/credentials/certifications/resources/study-guides/sc-300))

## Investigue

- login falho;
- login bem-sucedido;
- alteração de usuário;
- alteração de grupo;
- mudança de role;
- aplicação;
- consentimento;
- atividade administrativa;
- PIM;
- provisionamento.

## Método

```text
Evento → Hipótese → Query → Evidência → Conclusão → Ação
```

Comece no portal e evolua para KQL/Log Analytics quando o cenário permitir.

---

# 14. 🌐 B2B / External Identity

## Aprenda

- guest;
- collaboration settings;
- cross-tenant access;
- external identity provider;
- lifecycle de guest.

## Laboratório

1. Criar/invitar `LAB-GUEST-PARTNER`.
2. Definir acesso mínimo.
3. Testar aplicação/grupo.
4. Remover acesso.
5. Revisar atividade.
6. Documentar risco de contas externas persistentes.

---

# 15. 🔗 SSO / SAML

## Conceitos

- IdP;
- SP;
- Assertion;
- Entity ID;
- ACS;
- claims;
- metadata;
- assinatura;
- certificado.

## Laboratório

```text
Entra ID
 ↓
Enterprise Application
 ↓
SAML
 ↓
Aplicação de teste
```

Quebre propositalmente:

- claim;
- audience;
- ACS;
- certificado.

Investigue o erro e documente a correção.

---

# 16. 🔐 OIDC / OAuth2

## OIDC

Dominar:

- authorization endpoint;
- token endpoint;
- ID token;
- access token;
- claims;
- discovery;
- JWKS.

## OAuth2

Dominar:

- client;
- authorization server;
- resource server;
- scopes;
- access token;
- refresh token.

## Exercício

Trace manualmente:

```text
User
 ↓
Authorization
 ↓
Token
 ↓
API
 ↓
Resource
```

Depois explique por que **ID token não é o mesmo que access token**.

---

# 17. 🧩 Applications / APIs / Service Principals

## Diferencie

```text
App Registration
= definição/configuração da aplicação

Service Principal
= identidade da aplicação no tenant

Enterprise Application
= representação/configuração da aplicação no tenant
```

## Laboratório

1. Criar App Registration.
2. Configurar redirect URI.
3. Configurar API permissions.
4. Criar app role.
5. Criar service principal.
6. Atribuir usuário/grupo.
7. Testar.
8. Remover permission.
9. Investigar a falha.

---

# 18. 🤖 Managed Identity / Workload Federation

## Compare

```text
User Account
Service Principal
Managed Identity
Managed Service Account
Workload Identity Federation
```

## Managed Identity

1. Criar VM/recurso temporário.
2. Habilitar Managed Identity.
3. Conceder role mínima.
4. Acessar recurso.
5. Remover role.
6. Repetir acesso.
7. Investigar falha.
8. Restaurar somente a permissão necessária.

## Workload Federation

Entender como workload obtém identidade temporária sem armazenar segredo de longa duração. Faça o exercício quando houver um provedor compatível disponível; caso contrário, documente a arquitetura e simule o fluxo.

---

# 19. 🔄 JML — Joiner / Mover / Leaver

## Joiner

```text
RH → Identity → Groups → License → Application → MFA
```

## Mover

Simule `Finance → IT`.

Retire acessos incompatíveis e conceda os novos.

## Leaver

```text
Disable
 ↓
Revoke Sessions
 ↓
Remove Groups
 ↓
Review Privileges
 ↓
Evidence
```

Execute os três ciclos com `LAB-USER-MARIA`.

### Pergunta de entrevista

> Como você garantiria que um funcionário que mudou de departamento não mantenha privilégios antigos?

---

# 20. 🏛️ IGA / SoD / Access Reviews

## SoD

Cenário:

```text
ROLE-FINANCE-REQUEST
+
ROLE-FINANCE-APPROVE
=
CONFLITO
```

Prática: definir roles → criar combinação proibida → atribuir primeira → tentar segunda → registrar conflito → criar exceção com owner e validade.

## Access Reviews

```text
Access → Review → Owner → Approve/Deny → Remediation → Evidence
```

Teste aprovação, rejeição e ausência de resposta, respeitando licenciamento.

## Resultado esperado

Você deve conseguir explicar a diferença entre:

```text
IAM operacional
IGA
Access Review
SoD
RBAC
```

---

# 21. 📦 Entitlement Management

## Modelo

```text
Catalog
 ↓
Access Package
 ↓
Policy
 ↓
Approval
 ↓
Assignment
 ↓
Expiration
```

## Prática

Crie um cenário de acesso temporário a uma aplicação/grupo, com aprovação e expiração, se o recurso estiver disponível no seu tenant.

Se a licença impedir o laboratório completo, faça o fluxo conceitual e registre exatamente o que não foi executado.

---

# 22. 🔄 Lifecycle Workflows

Modele três workflows:

```text
Joiner
Mover
Leaver
```

Para cada um defina:

- gatilho;
- identidade em escopo;
- tarefas;
- condição de sucesso;
- condição de erro;
- evidência.

Depois compare:

```text
Lifecycle Workflow
vs
PowerShell / Graph
```

---

# 23. 👑 PIM / JIT

## Conceito

Reduz standing privilege transformando acesso administrativo em acesso elegível/temporário, quando aplicável.

## Fluxo

```text
Eligible
 ↓
Request
 ↓
MFA
 ↓
Justification
 ↓
Approval, quando configurado
 ↓
Activation
 ↓
Expiration
 ↓
Audit
```

## Laboratório com 1 P2

Use `LAB-P2-ADMIN` e somente as identidades estritamente necessárias e licenciadas.

Teste:

- eligible;
- activation;
- tempo limitado;
- justificativa;
- MFA;
- expiração;
- histórico;
- auditoria;
- emergency account.

Não conceda P2 a todo o laboratório apenas para aumentar a quantidade de testes.

---

# 24. 🔒 PAM Fundamentals

## Aprenda

- privileged account;
- standing privilege;
- JIT;
- JEA;
- bastion;
- vault;
- credential rotation;
- session recording;
- break-glass;
- least privilege.

### Diferencie

```text
PIM
= controle de privilégios no ecossistema Microsoft/Entra/Azure

PAM
= disciplina e tecnologias para controlar acesso privilegiado a recursos, contas e credenciais
```

PIM e PAM se complementam.

---

# 25. 🟢 Teleport Community Edition

> **Objetivo:** obter hands-on de PAM/Zero Trust Infrastructure Access sem depender de uma licença CyberArk.

A matriz oficial do Teleport deve ser usada como fonte de verdade. Atualmente, a Community Edition possui acesso a infraestrutura, RBAC, auditoria e capacidades de machine/workload identity, enquanto recursos como SSO com Microsoft Entra, SCIM e JIT Access Requests estão indicados como Enterprise. ([Teleport Feature Matrix](https://goteleport.com/docs/feature-matrix/))

## Arquitetura mínima

```text
Teleport CE VM
 ├── Auth Service
 ├── Proxy Service
 └── SSH Service
       │
       ▼
Linux Target
```

## PAM-01 — Instalação

1. Criar VM Linux.
2. Atualizar o sistema.
3. Instalar a versão CE indicada na documentação oficial atual.
4. Criar cluster single-node de laboratório.
5. Configurar hostname/DNS.
6. Abrir somente portas necessárias.
7. Criar usuário inicial.
8. Validar `tsh status`.

Use a documentação da versão instalada; não copie comandos antigos sem validar a versão.

## PAM-02 — RBAC

Criar roles de laboratório:

```text
teleport-admin
teleport-operator
teleport-auditor
teleport-developer
```

Teste permissões distintas e acesso negado.

## PAM-03 — Least Privilege por labels

Rotule recursos:

```text
env=dev
env=prod
```

Developer acessa somente `env=dev`.

## PAM-04 — SSH baseado em identidade

Compare:

```text
SSH tradicional
User → SSH Key → Server
```

com:

```text
Teleport
User → Identity → RBAC → Short-lived Credential → Server → Audit
```

## PAM-05 — Auditoria

1. Acessar recurso.
2. Executar comandos de teste.
3. Encerrar sessão.
4. Consultar eventos.
5. Identificar usuário, recurso e horário.
6. Documentar evidência.

## PAM-06 — Database Access

Opcional: adicione PostgreSQL somente nesta fase.

Crie:

```text
DB-ADMIN
DB-READONLY
DB-NONE
```

Prove acesso administrativo, leitura e negação.

## PAM-07 — Kubernetes

Opcional e posterior. Só execute após dominar SSH e Database Access.

## Limites da CE

Não apresente recurso Enterprise como Community Edition. SSO Entra/SAML/OIDC, SCIM e JIT Access Requests devem ser tratados como **estudo de arquitetura ou trial Enterprise quando disponível**, conforme a matriz oficial atual. ([Teleport Feature Matrix](https://goteleport.com/docs/feature-matrix/))

---

# 26. 🧰 JEA / PAW / Break-glass

## JEA

```text
Admin → Endpoint controlado → Somente comandos necessários
```

Crie uma sessão administrativa de laboratório com somente as operações necessárias.

## PAW

Entenda por que contas privilegiadas devem ser usadas em endpoints/contextos controlados.

## Break-glass

Documente duas identidades de emergência: finalidade, owner, proteção, monitoramento, quando usar e revisão posterior.

Não use uma conta de emergência como conta administrativa diária.

---

# 27. ⚙️ PowerShell / Graph / REST

## Provisioning

```text
CSV
 ↓
Create User
 ↓
Group Assignment
 ↓
Report
```

## Leaver

```text
Disable
 ↓
Revoke Sessions
 ↓
Remove Groups
 ↓
Evidence
```

## Graph

Consultar usuários, grupos, aplicações e service principals.

## Qualidade obrigatória

Scripts devem ter:

- validação de entrada;
- tratamento de erro;
- `-WhatIf` quando aplicável;
- logs;
- idempotência;
- menor privilégio.

## REST

Dominar:

```text
GET / POST / PATCH / DELETE
```

E HTTP status, headers, bearer token, scopes, permissions, JSON, pagination, rate limit e error handling.

Comece com leitura; só depois faça escrita.

---

# 28. 🔁 Hybrid Identity

Estudar:

- AD DS;
- Entra Connect Sync;
- Cloud Sync;
- Password Hash Synchronization;
- Pass-through Authentication;
- Seamless SSO;
- Connect Health;
- troubleshooting de sincronização.

Fluxo:

```text
AD → Sync → Entra → Cloud Identity
```

Altere uma identidade no AD e acompanhe a mudança até o Entra. Depois provoque um erro controlado e investigue.

---

# 29. ☁️ Cloud IAM

## Azure

Aprofunde Azure RBAC, Managed Identity e workload access.

## AWS

Depois do núcleo Microsoft:

- IAM User;
- Role;
- Policy;
- Resource Policy;
- Federation;
- STS;
- workload identity;
- least privilege.

## GCP

Conhecer:

- principal;
- role;
- IAM policy;
- service account;
- workload identity federation.

Não mantenha três clouds no laboratório simultaneamente.

---

# 30. 🏛️ IGA / SailPoint

Não tente instalar uma plataforma corporativa complexa no homelab sem necessidade.

Estude a arquitetura:

```text
Identity Source
 ↓
Application / Source
 ↓
Account
 ↓
Entitlement
 ↓
Role
 ↓
Provisioning
 ↓
Certification
 ↓
SoD
```

Conheça:

- IdentityIQ;
- Identity Security Cloud;
- connectors;
- aggregation;
- provisioning;
- certifications;
- roles;
- policies;
- lifecycle;
- APIs;
- application onboarding.

> Aprenda IGA como disciplina e SailPoint como plataforma. Não declare experiência hands-on que não possui.

---

# 31. 🔐 PAM Enterprise

| Plataforma | Conceitos |
|---|---|
| CyberArk | Vault, accounts, rotation, sessions, JIT |
| Delinea | privileged accounts, policies, secrets |
| BeyondTrust | privileged access, endpoint/server access |
| senhasegura | vault, credential management, privileged access |
| Teleport CE | hands-on de infraestrutura, RBAC e auditoria |

Teleport CE é um laboratório prático de conceitos de PAM/Zero Trust, não um substituto integral dessas plataformas.

---

# 32. 🎫 ITSM

IAM corporativo precisa de processo:

```text
Request → Approval → Fulfillment → Validation → Closure → Evidence
```

Estude:

- Incident;
- Request;
- Change;
- Problem;
- SLA;
- approval;
- owner;
- evidence.

Simule os tickets em Markdown/CSV ou ferramenta gratuita. Não é necessário instalar ServiceNow.

---

# 33. 📋 Auditoria / Compliance

Conecte IAM a:

- ISO 27001;
- NIST;
- LGPD;
- PCI DSS;
- CIS Controls.

Para cada controle:

```text
Risco
 ↓
Controle IAM
 ↓
Implementação
 ↓
Log
 ↓
Evidência
 ↓
Owner
 ↓
Periodicidade
```

### Exemplo

**Risco:** ex-funcionário mantém acesso.

**Controle:** Leaver.

**Evidência:** identidade desabilitada + revogação + ticket + log.

---

# 34. 🏗️ Arquitetura IAM

## Desafio

Empresa fictícia:

```text
8.000 funcionários
400 aplicações
AD on-premises
Entra ID
AWS
SailPoint
PAM
ITSM
```

Projete:

```text
HR
 ↓
IGA
 ↓
Identity
 ↓
AD / Entra
 ↓
RBAC
 ↓
Applications
 ↓
PAM
 ↓
Access Reviews
 ↓
Audit
```

Justifique:

- fonte autoritativa;
- JML;
- RBAC/ABAC;
- SoD;
- SSO;
- workload identity;
- PAM;
- reviews;
- logs;
- ITSM;
- break-glass;
- recuperação;
- métricas.

---

# 35. 🧪 Projeto final

Construa o cenário completo:

```text
                         RH
                          │
                          ▼
                         JML
                          │
                          ▼
                   ┌─────────────┐
                   │ AD / Entra  │
                   └──────┬──────┘
                          │
               ┌──────────┼──────────┐
               ▼          ▼          ▼
             RBAC        SSO       Groups
               │          │          │
               └──────┬───┴──────────┘
                      ▼
                     IGA
               ┌──────┼──────┐
               ▼      ▼      ▼
              SoD   Review  Package
                      │
                      ▼
                     PIM
                      │
                      ▼
                     PAM
                      │
                      ▼
                  Resources
                      │
                      ▼
                    Audit
```

## Cenários obrigatórios

1. Joiner.
2. Mover.
3. Leaver.
4. MFA.
5. Conditional Access.
6. RBAC.
7. ABAC conceitual.
8. SoD.
9. SSO/SAML.
10. OAuth/OIDC.
11. SCIM prático ou simulado.
12. Workload Identity.
13. Access Review.
14. Entitlement.
15. PIM.
16. PAM com Teleport.
17. Incidente IAM.
18. Automação.
19. Auditoria.
20. Arquitetura.

---

# 36. 📸 Evidências

Estrutura sugerida:

```text
evidence/
├── 01-fundamentals/
├── 02-ad/
├── 03-entra/
├── 04-authentication/
├── 05-conditional-access/
├── 06-rbac/
├── 07-jml/
├── 08-sso/
├── 09-apps/
├── 10-workload/
├── 11-iga/
├── 12-sod/
├── 13-pim/
├── 14-pam/
├── 15-teleport/
├── 16-automation/
├── 17-kql/
├── 18-hybrid/
├── 19-cloud/
├── 20-audit/
└── 21-final-project/
```

Para cada missão, guarde apenas evidências sanitizadas: screenshot sem PII, configuração, resultado positivo, resultado negativo, log e conclusão.

Nunca publique secrets, tokens, cookies, chaves privadas ou dados reais.

---

# 37. 📄 Portfólio / Entrevistas

## Não escreva

> "Estudei Entra ID e Teleport."

## Escreva somente o que demonstrou

> Laboratório prático de IAM com Microsoft Entra ID, incluindo RBAC, Conditional Access, MFA, JML, Access Reviews, PIM, workload identities, Microsoft Graph e automação com PowerShell.

Após concluir Teleport:

> Laboratório de PAM com Teleport Community Edition, incluindo RBAC, least privilege, acesso SSH baseado em identidade, controle por recurso e auditoria.

Não declare experiência profissional em SailPoint, CyberArk, Delinea ou outras plataformas se o contato foi apenas teórico.

## Perguntas que você deve conseguir responder

- Autenticação vs autorização?
- RBAC vs ABAC?
- PIM vs PAM?
- App Registration vs Service Principal?
- SAML vs OIDC?
- OAuth2 serve para quê?
- O que é SCIM?
- O que é JML?
- Como evitar privilégio permanente?
- Como investigar login suspeito?
- Como provar um acesso para auditoria?
- Como desenhar IGA para uma empresa grande?

---

# 38. 📈 Evolução de carreira

## Júnior

Dominar:

- AD;
- Entra;
- usuários/grupos;
- MFA;
- Conditional Access;
- JML;
- RBAC;
- ITSM;
- PowerShell básico.

## Pleno

Adicionar:

- IGA;
- SoD;
- Access Reviews;
- Entitlement Management;
- SAML/OIDC/OAuth2/SCIM;
- Graph/REST;
- KQL;
- cloud IAM;
- automação;
- PAM.

## Sênior

Adicionar:

- arquitetura IAM;
- SailPoint/IGA enterprise;
- PAM enterprise;
- Zero Trust;
- cloud híbrida/multicloud;
- compliance;
- métricas;
- liderança técnica;
- desenho de modelos de identidade.

### Prioridade de estudo para seu perfil

```text
1. Entra ID
2. JML
3. RBAC / Least Privilege
4. MFA / Conditional Access
5. SSO / SAML / OIDC / OAuth2
6. IGA / SoD / Access Reviews
7. PowerShell / Graph / REST
8. PIM
9. PAM / Teleport
10. Hybrid Identity
11. Cloud IAM
12. SailPoint / PAM Enterprise
13. Architecture
```

---

# 39. ✅ Checklist final de prontidão

Você está pronto para começar a disputar vagas IAM quando consegue, sem tutorial:

- [ ] explicar autenticação × autorização;
- [ ] administrar usuários e grupos no Entra;
- [ ] criar/testar RBAC;
- [ ] aplicar MFA;
- [ ] projetar/testar Conditional Access;
- [ ] executar JML;
- [ ] explicar SAML/OIDC/OAuth2;
- [ ] diferenciar App Registration/Service Principal/Enterprise Application;
- [ ] explicar Managed Identity;
- [ ] automatizar uma tarefa com PowerShell/Graph;
- [ ] investigar Sign-in Logs;
- [ ] explicar Access Reviews;
- [ ] explicar SoD;
- [ ] explicar PIM;
- [ ] explicar PAM;
- [ ] demonstrar Teleport CE;
- [ ] relacionar IAM com auditoria;
- [ ] desenhar arquitetura IAM básica;
- [ ] explicar o que você ainda não sabe sem inventar experiência.

---

# 40. 📚 Referências

- [Microsoft Entra ID](https://learn.microsoft.com/entra/)
- [Microsoft Entra licensing](https://learn.microsoft.com/en-us/entra/fundamentals/licensing)
- [SC-300 Study Guide — 2026](https://learn.microsoft.com/pt-br/credentials/certifications/resources/study-guides/sc-300)
- [Microsoft Entra ID Governance](https://learn.microsoft.com/en-us/entra/id-governance/)
- [Microsoft Entra PIM](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure)
- [Teleport Documentation](https://goteleport.com/docs/)
- [Teleport Feature Matrix](https://goteleport.com/docs/feature-matrix/)
- [Teleport Community Edition deployment](https://goteleport.com/docs/get-started/deploy-community/)

---

# 🏁 Regra final

```text
Não estudar para saber.

Estudar
→ construir
→ testar
→ quebrar
→ investigar
→ corrigir
→ revogar
→ documentar
→ explicar.
```

**O objetivo não é conhecer dezenas de produtos. É dominar o raciocínio de identidade, acesso, privilégio, governança e auditoria e conseguir demonstrá-lo na prática.**
