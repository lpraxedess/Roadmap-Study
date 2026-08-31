# 🛡️ IAM Study Lab — Microsoft Entra ID + IGA + PAM

> **Manual prático.** Faça, teste, quebre, investigue, corrija, revogue e documente.

![Entra](https://img.shields.io/badge/Microsoft-Entra%20ID-0078D4?style=for-the-badge&logo=microsoft)
![IAM](https://img.shields.io/badge/IAM-Hands--On-6f42c1?style=for-the-badge)
![PAM](https://img.shields.io/badge/PAM-Teleport%20CE-2ea44f?style=for-the-badge)

## 🧭 Navegação

- [0. Método](#0-método)
- [1. Ambiente](#1-ambiente)
- [2. IAM Fundamentals](#2-iam-fundamentals)
- [3. Active Directory](#3-active-directory)
- [4. Entra ID](#4-entra-id)
- [5. MFA e SSPR](#5-mfa-e-sspr)
- [6. Conditional Access](#6-conditional-access)
- [7. RBAC e ABAC](#7-rbac-e-abac)
- [8. Logs e KQL](#8-logs-e-kql)
- [9. B2B](#9-b2b)
- [10. SSO, SAML, OIDC e OAuth2](#10-sso-saml-oidc-e-oauth2)
- [11. Applications, APIs e SCIM](#11-applications-apis-e-scim)
- [12. Workload Identity](#12-workload-identity)
- [13. JML](#13-jml)
- [14. IGA, SoD e Access Reviews](#14-iga-sod-e-access-reviews)
- [15. Entitlement Management](#15-entitlement-management)
- [16. Lifecycle Workflows](#16-lifecycle-workflows)
- [17. PIM](#17-pim)
- [18. PAM](#18-pam)
- [19. Teleport Community Edition](#19-teleport-community-edition)
- [20. JEA, PAW e Break-glass](#20-jea-paw-e-break-glass)
- [21. PowerShell, Graph e REST](#21-powershell-graph-e-rest)
- [22. Hybrid Identity](#22-hybrid-identity)
- [23. Cloud IAM](#23-cloud-iam)
- [24. SailPoint e IGA Enterprise](#24-sailpoint-e-iga-enterprise)
- [25. PAM Enterprise](#25-pam-enterprise)
- [26. ITSM](#26-itsm)
- [27. Auditoria e Compliance](#27-auditoria-e-compliance)
- [28. Arquitetura](#28-arquitetura)
- [29. Projeto final](#29-projeto-final)
- [30. Portfólio e entrevistas](#30-portfólio-e-entrevistas)
- [31. Checklist](#31-checklist)

---

# 0. Método

## Regra

**Não avance porque leu. Avance porque executou.**

Em cada missão:

1. Leia **O que é**.
2. Leia **Por que usar**.
3. Leia **Quando usar**.
4. Confira **pré-requisitos/licença**.
5. Configure.
6. Teste permitido.
7. Teste negado.
8. Quebre uma configuração de propósito.
9. Investigue o log.
10. Corrija.
11. Revogue.
12. Repita sem consulta.
13. Salve evidência.
14. Explique em 60 segundos.

### Checklist por missão

- [ ] Sei o que é
- [ ] Sei por que usar
- [ ] Sei quando usar
- [ ] Sei configurar
- [ ] Sei testar
- [ ] Sei negar
- [ ] Sei investigar
- [ ] Sei corrigir
- [ ] Sei revogar
- [ ] Tenho evidência
- [ ] Consigo explicar

---

# 1. Ambiente

## Arquitetura econômica

```text
PC
├── Browser
├── PowerShell
└── Microsoft Graph
      │
      ▼
Microsoft Entra ID
├── Users / Groups
├── MFA / CA
├── RBAC / PIM
├── Applications
├── Governance
└── Logs
      │
      ├── Windows Server AD  ← somente Hybrid
      ├── Linux + Teleport   ← somente PAM
      └── DB/K8s             ← opcional
```

### VMs

| VM | Ligue quando |
|---|---|
| `LAB-DC01` | AD/Hybrid |
| `LAB-TELEPORT` | PAM |
| `LAB-LINUX01` | PAM/SSH |
| `LAB-DB01` | Database Access |
| `LAB-K8S01` | Kubernetes |

**Desligue tudo que não participa da missão.**

## Identidades

| Identidade | Uso |
|---|---|
| `LAB-P2-ADMIN` | P2 / PIM / governança |
| `LAB-BREAKGLASS` | recuperação |
| `LAB-USER-ANA` | permitido |
| `LAB-USER-JOAO` | negado |
| `LAB-USER-MARIA` | JML |
| `LAB-USER-CARLOS` | privilégio |
| `LAB-GUEST-PARTNER` | B2B |
| `LAB-APP-TEST` | aplicação |

Nunca publique credenciais, tokens, secrets, private keys ou recovery codes.

---

# 2. IAM Fundamentals

## O que é

Controle do ciclo de vida, autenticação, autorização e privilégio de identidades humanas e não humanas.

## Por que usar

Reduz acesso excessivo, permanente e sem rastreabilidade.

## Faça

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

Explique sem consulta:

- Authentication = quem é?
- Authorization = o que pode fazer?
- Entitlement = qual permissão concreta?
- Role = conjunto lógico de permissões?

---

# 3. Active Directory

## Você precisa dominar

Users, groups, OUs, GPO, DNS, LDAP, Kerberos, permissões, delegação, service accounts, privilégios, trusts e sincronização.

## Montagem

1. VirtualBox → **New** → `LAB-DC01`.
2. Instale Windows Server.
3. Configure IP estático.
4. **Server Manager → Add roles and features**.
5. Instale **Active Directory Domain Services** e **DNS**.
6. Promova para novo domínio, por exemplo `lab.local`.
7. Reinicie.
8. **Tools → Active Directory Users and Computers**.
9. Crie OUs `Users`, `Groups`, `Servers`, `Workstations`, `Admins`.

## Missão

Crie:

```text
LAB-GRP-FINANCE
LAB-GRP-IT
LAB-GRP-ADMINS
```

Crie usuários e associe grupos.

### Teste

Grupo → permissão → acesso.

Remova grupo → acesso negado.

### Quebre

Dê permissão diretamente ao usuário.

Depois remova e modele novamente via grupo.

### Explique

Por que grupo melhora escala, revisão e governança?

---

# 4. Entra ID

## 4.1 Usuário

### O que

Identidade cloud.

### Faça

1. Abra **Microsoft Entra admin center**.
2. **Identity → Users → All users**.
3. **New user → Create new user**.
4. Crie `LAB-USER-ANA`.
5. Defina senha temporária.
6. Salve.

### Teste

Login com ANA.

## 4.2 Grupo

1. **Identity → Groups → All groups**.
2. **New group**.
3. Crie `LAB-GRP-FINANCE`.
4. Adicione ANA.
5. Conceda um acesso ao grupo.
6. Teste ANA.
7. Remova ANA.
8. Teste novamente.

## 4.3 Role

1. **Identity → Roles & admins**.
2. Selecione role de laboratório.
3. Examine escopo e permissões.
4. Não conceda privilégio administrativo desnecessário.

Monte:

```text
Identidade → Role → Escopo → Motivo → Prazo
```

---

# 5. MFA e SSPR

## MFA

### Por que

Reduz o risco de credencial comprometida.

### Faça

1. Selecione ANA.
2. Configure método de autenticação disponível.
3. Faça login.
4. Complete MFA.
5. Abra **Entra ID → Monitoring & health → Sign-in logs**.
6. Localize o evento.

### Quebre

Tente autenticar sem satisfazer o requisito.

### Investigue

Identifique resultado, política e método.

## SSPR

Teste:

```text
Senha esquecida
 ↓
Verificação
 ↓
Reset
 ↓
Novo login
```

Explique por que SSPR não é autorização.

---

# 6. Conditional Access

## O que

Decide acesso usando identidade, recurso, localização, dispositivo, risco e condições.

## Por que

Transforma política de segurança em decisão técnica.

## Faça primeiro

Confirme que `LAB-BREAKGLASS` não será bloqueada.

## Criar política

1. **Protection → Conditional Access → Policies**.
2. **New policy**.
3. Nome `LAB-CA-001-MFA`.
4. **Users** → somente ANA.
5. **Target resources** → menor escopo possível.
6. **Grant** → MFA.
7. **Report-only**.
8. Salve.

## Teste

1. Faça login com ANA.
2. Abra **Sign-in logs**.
3. Examine a avaliação da política.

## Quebre

Altere uma condição de forma controlada.

## Corrija

Retorne à configuração anterior.

## Evolução

Repita para cenários de:

- MFA;
- localização;
- dispositivo;
- risco;
- sessão.

Use **Report-only → teste → log → ativação**.

---

# 7. RBAC e ABAC

## RBAC

```text
User → Role → Permission → Resource
```

### Missão

Crie papéis:

```text
LAB-ROLE-READER
LAB-ROLE-OPERATOR
LAB-ROLE-ADMIN
```

Teste cada um.

Depois remova a role e confirme revogação.

## Azure RBAC

1. Crie recurso temporário.
2. Conceda role mínima.
3. Teste.
4. Remova.
5. Teste novamente.
6. Repita comparando subscription, resource group e resource.

### Explique

Escopo, herança e blast radius.

## ABAC

Modele:

```text
Subject + Action + Resource + Attributes → Decision
```

Atributos:

```text
Department=Finance
Environment=Production
JobLevel=Senior
```

Crie uma política conceitual Finance → Finance e teste Marketing → Finance como negado.

---

# 8. Logs e KQL

## Missão

Produza um login permitido e um negado.

1. **Entra ID → Monitoring & health → Sign-in logs**.
2. Filtre ANA.
3. Compare eventos.
4. Identifique usuário, app, resultado, IP e Conditional Access.

Quando os logs estiverem em Log Analytics, pratique consultas KQL por campos como:

```text
UserPrincipalName
AppDisplayName
ResultType
IPAddress
ConditionalAccessStatus
```

### Exercício

```text
Evento → Evidência → Causa → Correção → Resultado
```

---

# 9. B2B

## Por que

Permite colaboração externa sem transformar parceiro em usuário interno.

## Faça

1. **Identity → External Identities**.
2. Convide uma identidade de teste.
3. Crie `LAB-GUEST-PARTNER`.
4. Coloque o guest em grupo específico.
5. Conceda recurso mínimo.
6. Teste.
7. Remova.
8. Teste novamente.

Fluxo:

```text
Partner → Guest → Group → Resource → Review → Removal
```

---

# 10. SSO, SAML, OIDC e OAuth2

## SAML

### Aprenda durante a configuração

- IdP;
- SP;
- Assertion;
- claims;
- Entity ID;
- ACS;
- metadata;
- certificado.

### Faça

1. Escolha aplicação de laboratório com SAML.
2. **Entra → Enterprise applications → New application**.
3. Configure SAML.
4. Associe usuário/grupo.
5. Teste login.
6. Verifique claims.

### Quebre

Altere uma claim/parâmetro de teste.

### Investigue

Identifique se o erro está no IdP, assertion, claim ou aplicação.

## OIDC

Monte:

```text
Browser → Client → Authorization Server → Token → Application
```

Confira issuer, audience, redirect URI, ID token e claims.

## OAuth2

Entenda:

```text
Client → Authorization Server → Access Token → Resource Server
```

Não trate OAuth2 isoladamente como protocolo de autenticação.

---

# 11. Applications, APIs e SCIM

## App Registration

1. **Identity → Applications → App registrations**.
2. **New registration**.
3. Crie `LAB-APP-TEST`.
4. Examine Application object e Service Principal.
5. Configure redirect URI somente se necessário.

## API permission

1. Adicione a menor permissão necessária.
2. Teste.
3. Remova.
4. Teste novamente.
5. Consulte consentimento e logs.

## SCIM

Fluxo:

```text
Identity/IGA → SCIM → Application → User/Group
```

Use aplicação de laboratório compatível.

Teste:

1. Provisionar usuário.
2. Alterar atributo.
3. Adicionar/remover grupo.
4. Desprovisionar.
5. Confirmar resultado.

---

# 12. Workload Identity

## O que

Identidade usada por aplicação, serviço, pipeline ou workload.

## Estude

- App Registration;
- Service Principal;
- Managed Identity;
- Federated Credential.

## Missão

1. Crie recurso temporário.
2. Habilite Managed Identity.
3. Conceda role mínima.
4. Teste acesso.
5. Remova role.
6. Teste novamente.

### Pergunta

Por que uma identidade gerenciada é preferível a senha hardcoded?

---

# 13. JML

## Joiner

1. Crie Maria.
2. Defina departamento.
3. Associe grupo.
4. Associe role.
5. Conceda aplicação.
6. Registre evidência.

## Mover

Mude Maria de Finance para TI.

Remova acesso antigo.

Adicione novo acesso.

Verifique SoD.

## Leaver

1. Desative Maria.
2. Revogue grupos.
3. Revogue acessos.
4. Revogue sessões quando aplicável.
5. Teste login.
6. Salve evidência.

### Evidência

```text
Identidade
Motivo
Aprovador
Acesso anterior
Acesso novo
Data
Revogação
Resultado
```

---

# 14. IGA, SoD e Access Reviews

## SoD

### Cenário

```text
REQUESTER + APPROVER = CONFLITO
```

Modele regra:

```text
LAB-ROLE-FINANCE-REQUESTER
LAB-ROLE-FINANCE-APPROVER
```

Tente combinar as funções.

Registre conflito, risco, exceção e aprovador.

## Access Review

Fluxo:

```text
Acesso → Reviewer → Approve/Deny → Remoção → Evidência
```

### Faça

1. Crie acesso temporário.
2. Crie revisão no menor escopo.
3. Atribua reviewer conforme recurso/licença.
4. Rejeite acesso.
5. Verifique remoção.
6. Salve evidência.

**Confira licenciamento antes de executar; participantes e funcionalidades podem possuir requisitos próprios.**

---

# 15. Entitlement Management

## O que

Controla acesso por pacote, política, aprovação, duração e revisão.

## Faça

Modele:

```text
Access Package
├── Group
├── Application
└── Resource
```

Teste, quando disponível:

```text
Request → Approval → Access → Expiration → Removal
```

Se a função não estiver disponível no tenant, documente o fluxo manual equivalente.

---

# 16. Lifecycle Workflows

## Objetivo

Automatizar tarefas de Joiner, Mover e Leaver.

## Missão

Modele:

```text
Atributo/Evento
 ↓
Workflow
 ↓
Task
 ↓
Resultado
 ↓
Auditoria
```

Execute cenário de entrada e saída.

Verifique execução e resultado.

Se o recurso exigir licença não disponível, faça a mesma lógica manualmente e marque como **simulação**.

---

# 17. PIM

## O que

Administração just-in-time de privilégios.

## Licença

Use `LAB-P2-ADMIN` de forma estratégica. Não trate troca de licença entre usuários como arquitetura corporativa.

## Missão

1. **Identity → Privileged Identity Management**.
2. Abra **Microsoft Entra roles**.
3. Escolha role de laboratório de baixo impacto.
4. Configure elegibilidade quando permitido.
5. Ative por período curto.
6. Exija MFA/justificativa quando disponível.
7. Execute tarefa.
8. Expire/desative.
9. Consulte histórico.

### Teste negativo

Tente executar ação sem ativação.

### Evidência

```text
Eligible → Activate → MFA/Justification → Role → Task → Expiration → Audit
```

---

# 18. PAM

## O que

Controle de contas e sessões privilegiadas.

## Aprenda

- privileged account;
- JIT;
- JEA;
- vault;
- credential rotation;
- session recording;
- break-glass;
- elevation;
- service accounts.

## Compare

```text
SSH tradicional
User → Key → Server

PAM
Identity → Policy → Temporary Credential/Certificate → Resource → Audit
```

---

# 19. Teleport Community Edition

## Objetivo

Obter prática real de PAM/Zero Trust sem depender de CyberArk.

## Limite

Teleport CE **não é equivalente a CyberArk/Delinea/BeyondTrust** e recursos Enterprise devem ser tratados como Enterprise.

## Arquitetura mínima

```text
LAB-TELEPORT
├── Auth
├── Proxy
└── SSH Service
      ↓
Linux target
```

Pode começar com uma única VM e adicionar um segundo Linux quando necessário.

## Instalação

1. Crie VM `LAB-TELEPORT`.
2. Configure hostname e IP.
3. Garanta resolução DNS funcional.
4. Instale a versão atual do Teleport CE seguindo a documentação oficial.
5. Inicialize Auth e Proxy.
6. Crie identidade administrativa.
7. Valide CLI/painel.

## RBAC

Crie roles:

```text
teleport-admin
teleport-operator
teleport-auditor
teleport-developer
```

Teste permissões individualmente.

## Least privilege

Use labels:

```text
env=dev
env=prod
```

Developer → `env=dev`.

Teste DEV permitido e PROD negado.

## Session audit

1. Entre pelo Teleport.
2. Execute comandos inofensivos.
3. Saia.
4. Consulte eventos/sessão.
5. Identifique usuário, recurso, horário e atividade.
6. Guarde evidência.

## Database Access — opcional

```text
Teleport → PostgreSQL
```

Crie `DB-ADMIN`, `DB-READONLY`, `DB-NONE`.

Teste SELECT e operação proibida.

## Kubernetes — opcional

Faça somente após SSH/RBAC/auditoria.

## Access Requests

Marque claramente:

- CE = disponível na edição instalada;
- Enterprise = recurso comercial;
- Simulação = workflow estudado sem funcionalidade disponível.

---

# 20. JEA, PAW e Break-glass

## JEA

Crie endpoint PowerShell limitado.

Teste:

```text
Comando permitido → sucesso
Comando administrativo não permitido → bloqueio
```

## PAW

Simule separação:

```text
Workstation comum ≠ Admin Workstation
```

## Break-glass

Mantenha identidade de recuperação separada.

Defina:

```text
Quando usar
Quem usa
Como monitorar
Como recuperar
```

---

# 21. PowerShell, Graph e REST

## PowerShell

Crie CSV:

```text
name,department
Ana,Finance
Joao,IT
```

Automatize:

```text
CSV → User → Group → Log → Report
```

## Graph

Pratique primeiro leitura:

```text
Authentication → Permission → Endpoint → Request → Response
```

Depois escrita em objeto de laboratório.

## REST

Pratique:

```text
GET → consultar
POST → criar
PATCH → alterar
DELETE → remover
```

Sempre use menor privilégio.

---

# 22. Hybrid Identity

## Arquitetura

```text
AD DS → Synchronization → Entra ID
```

## Missão

1. Ligue `LAB-DC01`.
2. Configure sincronização conforme documentação atual.
3. Sincronize usuário de laboratório.
4. Altere atributo no AD.
5. Observe Entra.
6. Desative usuário.
7. Observe sincronização.
8. Provoque falha controlada.
9. Investigue.

Explique qual sistema é a fonte de autoridade em cada atributo do cenário.

---

# 23. Cloud IAM

## Azure

Pratique:

- RBAC;
- scope;
- inheritance;
- Managed Identity;
- Service Principal;
- Key Vault;
- workload identity.

## AWS

Estude/pratique em conta de laboratório quando disponível:

```text
IAM Role
Policy
Trust Policy
STS
Federation
```

Modele:

```text
Human → Federation → Role → Resource
Workload → Role → Resource
```

## GCP

Modele:

```text
Principal → Role → Permission → Resource
```

Priorize conceitos antes de abrir infraestrutura adicional.

---

# 24. SailPoint e IGA Enterprise

## Objetivo

Aprender IGA corporativo a partir dos conceitos já praticados.

Estude:

- identity;
- account;
- entitlement;
- source;
- connector;
- aggregation;
- provisioning;
- certification;
- role;
- policy;
- SoD;
- lifecycle;
- application onboarding;
- API.

## Exercício

Modele:

```text
HR → IGA → Identity → Role → SoD → Approval → Provisioning → Application → Certification
```

Compare cada etapa com o laboratório Entra.

Não alegue experiência hands-on com SailPoint sem ter usado a plataforma.

---

# 25. PAM Enterprise

## Plataformas

- CyberArk;
- Delinea;
- BeyondTrust;
- senhasegura.

## Para cada uma responda

1. Onde fica a credencial?
2. Como ocorre rotação?
3. Como ocorre JIT?
4. Como ocorre sessão?
5. Como auditar?
6. Como integrar AD/Entra?
7. Como proteger service accounts?

Compare cada conceito com Teleport CE.

---

# 26. ITSM

## Aprenda

Request, Incident, Change, Approval, SLA, Evidence, Workflow.

## Simule

```text
REQ-001
Solicitação: Finance Reader
Solicitante: usuário
Aprovador: gestor
Role: LAB-ROLE-FINANCE-READER
Prazo: 30 dias
Evidência: logs
```

Execute manualmente.

Depois automatize o que puder.

---

# 27. Auditoria e Compliance

## Pergunta

**Quem autorizou este acesso e como provo?**

## Monte

```text
Identity
 ↓
Request
 ↓
Approver
 ↓
Role
 ↓
Entitlement
 ↓
Timestamp
 ↓
Audit Log
 ↓
Review
 ↓
Revocation
```

## Estude

ISO 27001, NIST, LGPD, PCI DSS e CIS Controls.

## Missão

Escolha um acesso do laboratório e produza um pacote de evidência sanitizado.

---

# 28. Arquitetura

## Caso

```text
8.000 usuários
400 aplicações
AD on-prem
Entra ID
AWS
IGA
PAM
ITSM
```

## Desenhe

```text
HR
 ↓
Identity Source
 ↓
IGA
 ↓
AD / Entra
 ↓
RBAC
 ↓
SSO
 ↓
Applications
 ↓
PIM
 ↓
PAM
 ↓
Audit
```

Para cada componente responda:

- problema resolvido;
- risco reduzido;
- administrador;
- fonte de autoridade;
- revogação;
- auditoria;
- falha e recuperação.

---

# 29. Projeto final

## Cenário

Empresa fictícia com RH, Finance, TI, AD, Entra, SaaS, Linux, Azure, banco e auditoria.

## Execute

1. Criar identidades.
2. Criar grupos e roles.
3. Implementar MFA.
4. Implementar Conditional Access.
5. Criar SSO.
6. Implementar JML.
7. Modelar SoD.
8. Executar Access Review.
9. Criar Access Package quando disponível.
10. Executar PIM.
11. Proteger Linux com Teleport.
12. Implementar workload identity.
13. Automatizar parte do fluxo.
14. Investigar logs.
15. Produzir evidências.
16. Revogar acessos.
17. Documentar arquitetura.

## Critério

Você só conclui quando consegue reconstruir o fluxo sem consultar o manual.

---

# 30. Portfólio e entrevistas

## Cada projeto deve conter

```text
Objetivo
Arquitetura
Pré-requisitos
Configuração
Teste positivo
Teste negativo
Falha controlada
Logs
Correção
Rollback
Evidência
Conclusão
```

## Perguntas obrigatórias

1. IAM x IGA x PAM?
2. Authentication x Authorization?
3. RBAC x ABAC?
4. O que é JML?
5. O que PIM resolve?
6. PIM x PAM?
7. SAML x OIDC?
8. OAuth2?
9. SCIM?
10. Service Principal x Managed Identity?
11. Como investigar login negado?
12. Como executar Access Review?
13. Como detectar SoD?
14. Como provar acesso para auditoria?
15. Como automatizar JML?

---

# 31. Checklist

## IAM

- [ ] Fundamentals
- [ ] Authentication
- [ ] Authorization
- [ ] Least privilege
- [ ] Lifecycle

## Microsoft

- [ ] AD
- [ ] Entra Users
- [ ] Groups
- [ ] RBAC
- [ ] MFA
- [ ] SSPR
- [ ] Conditional Access
- [ ] Logs
- [ ] KQL
- [ ] B2B
- [ ] SSO
- [ ] SAML
- [ ] OIDC
- [ ] OAuth2
- [ ] App Registration
- [ ] Service Principal
- [ ] Managed Identity
- [ ] Workload Identity
- [ ] SCIM
- [ ] JML
- [ ] SoD
- [ ] Access Reviews
- [ ] Entitlement Management
- [ ] Lifecycle Workflows
- [ ] PIM

## PAM

- [ ] PAM fundamentals
- [ ] JIT
- [ ] JEA
- [ ] PAW
- [ ] Break-glass
- [ ] Teleport CE
- [ ] RBAC
- [ ] Session audit
- [ ] Database Access
- [ ] CyberArk concepts
- [ ] Delinea concepts
- [ ] BeyondTrust concepts
- [ ] senhasegura concepts

## Engineering

- [ ] PowerShell
- [ ] Microsoft Graph
- [ ] REST
- [ ] JSON
- [ ] Python
- [ ] SQL
- [ ] KQL

## Enterprise

- [ ] Hybrid Identity
- [ ] Azure IAM
- [ ] AWS IAM
- [ ] GCP IAM
- [ ] ITSM
- [ ] ISO 27001
- [ ] NIST
- [ ] LGPD
- [ ] PCI DSS
- [ ] Architecture

## Mercado

- [ ] Tenho laboratórios executados
- [ ] Tenho evidências sanitizadas
- [ ] Tenho projeto corporativo
- [ ] Sei investigar falhas
- [ ] Sei automatizar
- [ ] Sei explicar arquitetura
- [ ] Sei responder entrevista

---

# 🔗 Referências oficiais

- Microsoft SC-300: https://learn.microsoft.com/pt-br/credentials/certifications/resources/study-guides/sc-300
- Entra licensing: https://learn.microsoft.com/en-us/entra/fundamentals/licensing
- Entra Governance: https://learn.microsoft.com/en-us/entra/id-governance/
- Lifecycle Workflows: https://learn.microsoft.com/en-us/entra/id-governance/what-are-lifecycle-workflows
- Access Reviews: https://learn.microsoft.com/en-us/entra/id-governance/deploy-access-reviews
- Entitlement Management: https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview
- Teleport Community Edition: https://goteleport.com/docs/get-started/deploy-community/
- Teleport Feature Matrix: https://goteleport.com/docs/feature-matrix/

---

# 🏁 Regra do laboratório

```text
ENTENDER
 ↓
CONFIGURAR
 ↓
TESTAR
 ↓
NEGAR
 ↓
QUEBRAR
 ↓
INVESTIGAR
 ↓
CORRIGIR
 ↓
REVOGAR
 ↓
AUDITAR
 ↓
AUTOMATIZAR
 ↓
EXPLICAR
```

**O objetivo é transformar cada conceito em uma habilidade executável e demonstrável.**