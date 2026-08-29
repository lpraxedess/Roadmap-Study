# 🛡️ IAM Study Lab — Microsoft Entra ID do Básico ao Avançado

> **Manual prático para evolução profissional em IAM.**
>
> O laboratório usa o Microsoft Entra ID como eixo central, mas ensina também JML, RBAC/ABAC, SoD, SSO, SAML, OIDC, OAuth2, SCIM, Workload Identity, IGA, PIM, PAM, automação, cloud, ITSM, auditoria e arquitetura.
>
> **Método:** entender → preparar → configurar → testar → quebrar → investigar → corrigir → revogar → documentar.

![Microsoft Entra](https://img.shields.io/badge/Microsoft-Entra%20ID-0078D4?style=for-the-badge&logo=microsoft)
![IAM](https://img.shields.io/badge/Focus-IAM-6f42c1?style=for-the-badge)
![Hands On](https://img.shields.io/badge/Lab-Hands--On-2ea44f?style=for-the-badge)
![Career](https://img.shields.io/badge/Career-Junior%20%E2%86%92%20Senior-orange?style=for-the-badge)

---

## 🧭 Navegação

- [1. Objetivo](#1--objetivo)
- [2. Método de estudo](#2--método-de-estudo)
- [3. Arquitetura mínima](#3--arquitetura-mínima)
- [4. Estratégia para 1 P2](#4--estratégia-para-1-p2)
- [5. Preparação](#5--preparação)
- [6. Trilha prática](#6--trilha-prática)
- [7. Users e Groups](#7--users-e-groups)
- [8. RBAC e Least Privilege](#8--rbac-e-least-privilege)
- [9. MFA e SSPR](#9--mfa-e-sspr)
- [10. Conditional Access](#10--conditional-access)
- [11. Logs e investigação](#11--logs-e-investigação)
- [12. B2B](#12--b2b)
- [13. SSO e SAML](#13--sso-e-saml)
- [14. OIDC e OAuth2](#14--oidc-e-oauth2)
- [15. Apps, APIs e Service Principals](#15--apps-apis-e-service-principals)
- [16. Managed Identity e Workload Federation](#16--managed-identity-e-workload-federation)
- [17. JML](#17--jml)
- [18. IGA, SoD e Access Reviews](#18--iga-sod-e-access-reviews)
- [19. Entitlement Management](#19--entitlement-management)
- [20. Lifecycle Workflows](#20--lifecycle-workflows)
- [21. PIM/JIT](#21--pimjit)
- [22. PAM/JEA/PAW](#22--pamjeapaw)
- [23. PowerShell/Graph](#23--powershellgraph)
- [24. KQL](#24--kql)
- [25. AD e Hybrid Identity](#25--ad-e-hybrid-identity)
- [26. IGA/SailPoint](#26--igasailpoint)
- [27. Cloud IAM](#27--cloud-iam)
- [28. ITSM](#28--itsm)
- [29. Auditoria e Compliance](#29--auditoria-e-compliance)
- [30. Projeto final](#30--projeto-final)
- [31. Portfólio e entrevistas](#31--portfólio-e-entrevistas)
- [32. Evolução de carreira](#32--evolução-de-carreira)
- [33. Checklist](#33--checklist)
- [34. Fontes oficiais](#34--fontes-oficiais)

---

# 1. 🎯 Objetivo

Este projeto deve levar você de **Analista de Segurança/Infraestrutura com base Microsoft** para um profissional de **IAM**, evoluindo depois para **IGA/IAM Engineering e arquitetura**.

A versão atual da [SC-300](https://learn.microsoft.com/pt-br/credentials/certifications/resources/study-guides/sc-300), válida a partir de 27/04/2026, organiza a função em quatro áreas: identidades de usuários, autenticação/acesso, identidades de carga de trabalho e governança. A Microsoft também espera familiaridade com Azure, Microsoft 365, AD DS, PowerShell e KQL.

O laboratório, portanto, não deve ensinar apenas telas do Entra. Cada tema precisa responder:

**O que é? → Por que existe? → Quando usar? → Como configurar? → Como testar? → Como quebrar? → Onde investigar? → Como revogar? → Como explicar em entrevista?**

---

# 2. 🧠 Método de estudo

## Regra 70/20/10

- **70%:** laboratório.
- **20%:** documentação e evidência.
- **10%:** teoria.

## Ciclo de cada missão

1. Leia o objetivo.
2. Explique o conceito com suas palavras.
3. Diga qual risco ele reduz.
4. Configure o menor cenário possível.
5. Faça teste positivo.
6. Faça teste negativo.
7. Provoque uma falha controlada.
8. Localize o log.
9. Corrija.
10. Revogue a configuração.
11. Repita sem consultar o manual.
12. Registre 3–5 linhas de aprendizado.

## Critério de domínio

Um tema só está concluído quando você consegue:

- [ ] explicar;
- [ ] configurar;
- [ ] testar permitido;
- [ ] testar negado;
- [ ] investigar;
- [ ] corrigir;
- [ ] revogar;
- [ ] explicar um caso de uso profissional.

---

# 3. 💻 Arquitetura mínima

O Entra será o laboratório principal. Não mantenha várias VMs ligadas.

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
      ├── Azure VM somente quando necessário
      └── AD DS somente na fase híbrida
```

| Tema | VM necessária? |
|---|---|
| Users/Groups/RBAC | Não |
| MFA/SSPR/CA | Não, salvo cenário de dispositivo |
| Logs | Não |
| B2B | Não |
| SSO | Opcional |
| Managed Identity | Recurso Azure temporário |
| Workload Federation | Não necessariamente |
| AD/Hybrid | Sim |
| JEA/PAW | VM Windows recomendada |

**Regra:** VM desligada quando não participa do exercício.

---

# 4. 💰 Estratégia para 1 P2

Você terá **1 licença Microsoft Entra ID P2**. Ela deve ser usada estrategicamente, não distribuída indiscriminadamente.

A documentação atual da Microsoft confirma que PIM exige P2 ou Microsoft Entra ID Governance e possui requisitos próprios para usuários envolvidos em atribuições, ativações, aprovações e revisões. A matriz oficial deve ser consultada antes de cada recurso.

## Identidade P2 principal

Use:

`LAB-P2-ADMIN`

para os exercícios que realmente exigirem P2:

- PIM;
- Identity Protection/risk;
- recursos de governança que estejam disponíveis ao P2 no cenário;
- testes de privilégio elegível.

## Regra importante

**Não use "tirar a licença de um usuário e colocar em outro" como forma de simular uma implantação corporativa multiusuário.** Isso é somente uma estratégia de laboratório para explorar uma funcionalidade em uma identidade por vez, quando o licenciamento permitir; não representa conformidade de produção.

Quando a documentação exigir licenças para usuários em escopo, revisores ou aprovadores, registre isso como **limite de laboratório** ou use uma licença/trial adicional legítima.

## Matriz prática

| Recurso | Estratégia |
|---|---|
| Users/Groups | identidades de laboratório |
| RBAC | laboratório mínimo |
| MFA/SSPR | identidades de teste |
| Conditional Access básico | licença compatível disponível |
| Risk/Identity Protection | `LAB-P2-ADMIN` |
| PIM | `LAB-P2-ADMIN` |
| Access Reviews | somente no escopo/licença permitido |
| Entitlement Management | validar licença atual; executar se disponível |
| Lifecycle Workflows | executar se disponível; caso contrário simular |
| Workload Identity | usar recurso disponível e documentar requisito |

Fonte de verdade: [Entra licensing](https://learn.microsoft.com/en-us/entra/fundamentals/licensing).

---

# 5. 🔐 Preparação

## 5.1 Identidades

Crie somente:

| Nome | Uso |
|---|---|
| `LAB-P2-ADMIN` | administração/P2 |
| `LAB-BREAKGLASS` | recuperação |
| `LAB-USER-ANA` | permitido |
| `LAB-USER-JOAO` | negado |
| `LAB-USER-MARIA` | JML |
| `LAB-USER-CARLOS` | privilégio |
| `LAB-GUEST-PARTNER` | B2B |
| `LAB-APP-TEST` | aplicação |

## 5.2 Convenções

`LAB-USER-*`  
`LAB-GRP-*`  
`LAB-ROLE-*`  
`LAB-CA-*`  
`LAB-APP-*`  
`LAB-SP-*`  
`LAB-PIM-*`  
`LAB-AR-*`  
`LAB-PACK-*`  
`LAB-JML-*`

## 5.3 Break-glass

Antes de Conditional Access:

- [ ] conta criada;
- [ ] recuperação validada;
- [ ] não está indevidamente no escopo de bloqueio;
- [ ] uso será monitorado.

## 5.4 Segurança do GitHub

Nunca publicar:

- senha;
- secret;
- token;
- certificado privado;
- recovery code;
- cookie;
- dados pessoais reais.

---

# 6. 🗺️ Trilha prática

| Fase | Competência | Nível |
|---|---|---|
| 1 | IAM Fundamentals | 🟢 |
| 2 | Users/Groups | 🟢 |
| 3 | RBAC/Least Privilege | 🟢 |
| 4 | MFA/SSPR | 🟢 |
| 5 | Conditional Access | 🟡 |
| 6 | Logs/KQL | 🟡 |
| 7 | B2B | 🟡 |
| 8 | SSO/SAML/OIDC | 🟡 |
| 9 | OAuth2/API | 🟡 |
| 10 | Apps/SP/Managed Identity | 🟡 |
| 11 | Workload Federation | 🟠 |
| 12 | JML | 🟡 |
| 13 | RBAC/ABAC/SoD | 🟠 |
| 14 | Access Reviews | 🟠 |
| 15 | Entitlement Management | 🟠 |
| 16 | Lifecycle Workflows | 🟠 |
| 17 | PIM/JIT | 🔴 |
| 18 | PAM/JEA/PAW | 🔴 |
| 19 | Graph/PowerShell | 🟡 |
| 20 | AD/Hybrid | 🟡 |
| 21 | IGA/SailPoint | 🟠 |
| 22 | Cloud IAM | 🟠 |
| 23 | ITSM | 🟡 |
| 24 | Auditoria | 🟠 |
| 25 | Projeto corporativo | 🔴 |

---

# 7. 👤 Users e Groups

## O que é

Usuário é uma identidade humana. Grupo é uma forma escalável de associar identidades a acesso.

## Por que

Permissões individuais são difíceis de manter e revisar.

## Quando

Use grupos quando uma população compartilha o mesmo conjunto de acesso.

## Como

**Entra admin center → Identity → Users → All users → New user**

Crie ANA, JOAO e MARIA.

Depois:

**Identity → Groups → All groups → New group**

Crie `LAB-GRP-FINANCE` e adicione ANA.

## Teste

Conceda acesso ao grupo.

ANA deve acessar.

Remova ANA do grupo.

ANA deve perder o acesso.

## Teste negativo

Tente acessar sem membership.

## Aprendizado profissional

Você deve conseguir explicar:

`User → Group → Role → Entitlement → Resource`.

---

# 8. 🔐 RBAC e Least Privilege

## O que é

RBAC associa permissões a funções.

## Por que

Reduz concessões arbitrárias e facilita governança.

## Quando

Quando funções empresariais possuem conjuntos previsíveis de permissões.

## Como

**Identity → Roles & admins**

Compare uma função de leitura com uma administrativa.

Não conceda uma role privilegiada apenas para "testar".

## Laboratório Azure RBAC

Crie um recurso temporário.

Conceda uma identidade somente a permissão mínima necessária.

Teste.

Remova.

Teste novamente.

## Pergunta obrigatória

> O que muda se a mesma role for aplicada no subscription, resource group ou recurso?

Você deve responder com **escopo e blast radius**.

---

# 9. 🔑 MFA e SSPR

## MFA

### O que é

Autenticação com múltiplos fatores.

### Por que

Reduz dependência de senha.

### Quando

Especialmente para acesso sensível e privilegiado.

### Prática

Use `LAB-USER-ANA`.

Configure método disponível.

Teste login.

Teste falha de autenticação.

Registre o evento.

## SSPR

### O que é

Recuperação de credencial pelo próprio usuário.

### Prática

Configure o fluxo de laboratório, execute recuperação e tente novamente sem cumprir os requisitos.

### Pergunta

SSPR resolve autorização? **Não.**

---

# 10. 🛡️ Conditional Access

## O que é

Motor que transforma sinais em decisão de acesso.

`WHO + WHAT + WHERE + DEVICE + RISK → POLICY → ACCESS`

## Por que

Autenticação sozinha não define se aquele contexto é confiável.

## Regra de implementação

**Report-only → teste → logs → ajuste → ativação.**

Nunca comece com política ampla.

## Missão 1 — MFA

**Protection → Conditional Access → Policies → New policy**

Nome:

`LAB-CA-001-MFA`

Selecione somente ANA.

Configure MFA.

Use Report-only.

Faça login.

Abra o detalhe do evento e confirme a avaliação da política.

Depois, se o teste estiver correto, ative.

## Missão 2 — Bloqueio

Crie uma política de laboratório que bloqueie uma identidade específica.

Teste.

Investigue.

Desative.

## Missão 3 — What If

Use **What If** para prever quais políticas seriam aplicadas a ANA e JOAO.

## Missão 4 — Legacy Authentication

Estude e teste a restrição em ambiente controlado quando houver protocolo compatível.

## Missão 5 — Device

Somente com uma máquina Windows de laboratório.

## Missão 6 — Risk

Com P2, use `LAB-P2-ADMIN` para estudar políticas baseadas em risco. Não tente gerar eventos de risco de forma insegura; se o tenant não produzir o sinal necessário, documente a limitação.

---

# 11. 🔎 Logs e investigação

## Logs fundamentais

Aprenda a diferença entre:

- Sign-in logs;
- Audit logs;
- Provisioning logs;
- Conditional Access details;
- Identity Protection.

## Missão

1. adicione ANA a um grupo;
2. registre horário;
3. procure Audit Logs;
4. identifique ator e alvo;
5. remova ANA;
6. encontre o segundo evento.

## Perguntas

`Quem? O quê? Quando? Qual objeto? Qual resultado?`

## Cenário SOC

Investigue:

`login falho → alteração de grupo → alteração de role → criação de aplicação → consentimento → acesso`.

O objetivo é aprender correlação, não apenas consulta.

---

# 12. 🌎 B2B

## O que é

Colaboração com identidade externa.

## Quando

Parceiros, fornecedores e terceiros.

## Missão

Convide `LAB-GUEST-PARTNER`.

Analise:

- tipo de objeto;
- origem;
- grupos;
- aplicação;
- CA;
- governança;
- revogação.

Remova o acesso e confirme que não existe outro caminho.

Pergunte:

**Quem é o owner? Quando expira? Quem revisa? Como revogar?**

---

# 13. 🔗 SSO e SAML

## SSO

Centraliza autenticação entre aplicações.

## SAML — o que dominar

- IdP;
- SP;
- Assertion;
- ACS;
- Entity ID;
- claims;
- metadata;
- certificado;
- assinatura.

## Laboratório

Use uma aplicação de teste SAML.

No Entra:

**Enterprise applications → New application → Create your own application**

Configure a integração conforme a aplicação.

## Teste positivo

ANA entra na aplicação usando Entra.

## Teste negativo

Altere uma configuração não destrutiva, como claim/identificador, e investigue a falha.

## Resultado

Você deve conseguir desenhar:

`User → Entra IdP → SAML Assertion → SP → Session`.

---

# 14. 🔄 OIDC e OAuth2

## OIDC

Camada de identidade sobre OAuth2.

Domine:

- issuer;
- client;
- redirect URI;
- authorization code;
- ID token;
- claims;
- JWKS;
- scopes.

## OAuth2

Domine:

- client;
- authorization server;
- resource server;
- access token;
- refresh token;
- scope;
- delegated access;
- application access.

## Missão

Use uma aplicação OIDC de laboratório.

Mapeie:

`Browser → Authorization → Code → Token → ID Token → Application`.

Quebre redirect URI no ambiente de teste.

Investigue.

## Pergunta

> OIDC e OAuth2 são a mesma coisa?

Não. OAuth2 é um framework de autorização; OIDC adiciona uma camada padronizada de autenticação/identidade.

---

# 15. 🧩 Apps, APIs e Service Principals

## App Registration

Definição/configuração da aplicação.

## Service Principal

Identidade da aplicação dentro de um tenant.

## Laboratório

Crie:

`LAB-APP-TEST`

Localize o Service Principal em Enterprise Applications.

Analise:

- Application ID;
- Object ID;
- owners;
- credentials;
- permissions;
- assignments.

## API permissions

Teste primeiro uma permissão de baixo impacto.

Compare:

**Delegated:** aplicativo age em nome do usuário.

**Application:** aplicativo age sem usuário interativo.

## Teste negativo

Remova a permissão e repita a operação.

## Credential lifecycle

Se precisar criar secret para laboratório:

- expiração curta;
- uso mínimo;
- nunca publicar;
- remover ao terminar.

---

# 16. 🤖 Managed Identity e Workload Federation

## Managed Identity

### O que é

Identidade gerenciada pelo Azure para workload.

### Por que

Reduz secrets persistentes.

### Laboratório

Crie recurso Azure temporário.

Habilite Managed Identity.

Conceda RBAC mínimo ao recurso de destino.

Teste.

Remova RBAC.

Teste novamente.

Você deve observar:

`authentication continua possível ≠ authorization continua permitida`.

## Workload Identity Federation

Use para estudar acesso sem secret persistente em:

- GitHub Actions;
- Kubernetes;
- workloads externos.

Configure uma relação de confiança em laboratório.

Teste token/acesso permitido.

Altere subject/claim.

Teste novamente.

A [documentação do Workload ID](https://learn.microsoft.com/en-us/entra/workload-id/) cobre service principals, managed identities, federation e segurança de workloads.

---

# 17. 🔄 JML

## Joiner

Pessoa entra.

`HR → Identity → Group → Application → Access → MFA`

## Mover

Pessoa muda de função.

`Old Access → SoD → Remove → New Access → Review`

## Leaver

Pessoa sai.

`Disable → Revoke → Remove Access → Preserve Evidence`

## Laboratório

Use MARIA.

### Joiner

Financeiro → `LAB-GRP-FINANCE` → aplicação.

### Mover

Financeiro → TI.

Remova acesso incompatível e adicione o novo.

### Leaver

Bloqueie a conta e revogue acesso.

## Regra

Não apague evidências automaticamente. O processo corporativo precisa considerar retenção, investigação e requisitos legais.

## Automação

Depois faça o mesmo processo com PowerShell/Graph em modo **Dry Run**.

---

# 18. 🧩 IGA, SoD e Access Reviews

## IGA

Identity Governance responde:

- quem deve ter acesso?
- por que?
- por quanto tempo?
- quem aprovou?
- quem revisa?
- como revogar?
- como provar?

## SoD

Exemplo:

`CREATE_VENDOR + APPROVE_PAYMENT = conflito`

Modele duas roles:

`LAB-ROLE-FINANCE-REQUESTER`

`LAB-ROLE-FINANCE-APPROVER`

Defina a combinação como conflito.

## Access Review

Fluxo:

`Access → Reviewer → Decision → Action → Evidence`

Use uma população pequena.

Aprove um acesso.

Execute nova revisão.

Rejeite.

Confirme a ação de remoção conforme a configuração.

A documentação atual de [Access Reviews](https://learn.microsoft.com/pt-br/entra/id-governance/access-reviews-overview) deve ser usada para confirmar requisitos e capacidades do tenant.

---

# 19. 📦 Entitlement Management

## O que é

Processo governado para solicitação e concessão de pacotes de acesso.

## Modelo

`Catalog → Access Package → Policy → Request → Approval → Assignment → Expiration → Review`

## Laboratório

Crie conceitualmente:

`LAB-PACK-FINANCE-ANALYST`

Inclua aplicação/grupo de laboratório.

Defina:

- quem solicita;
- quem aprova;
- duração;
- expiração;
- revisão.

Se o recurso estiver disponível no licenciamento atual, execute o ciclo completo. Caso contrário, faça a simulação e documente a diferença.

---

# 20. 🔁 Lifecycle Workflows

## O que é

Automação de tarefas de ciclo de vida.

## Quando

JML em escala.

## Missão

Modele:

`Joiner → grupo inicial`

`Mover → recalcular acesso`

`Leaver → bloquear/remover`

Se disponível, implemente um workflow mínimo.

Se não estiver disponível com sua licença, automatize a mesma lógica com Graph/PowerShell e documente:

`processo nativo esperado → simulação realizada → limitação de licença`.

---

# 21. ⚡ PIM/JIT

## O que é

PIM governa acesso privilegiado, incluindo elegibilidade, ativação e controles associados.

## Por que

Reduz privilégio permanente.

## Estratégia com 1 P2

Use somente:

`LAB-P2-ADMIN`

## Laboratório

1. escolha role de laboratório;
2. configure atribuição elegível quando suportado;
3. configure duração curta;
4. configure requisitos disponíveis;
5. ative;
6. execute uma tarefa;
7. consulte logs;
8. espere expirar;
9. confirme que o privilégio não permanece ativo.

## Testes

**Positivo:** ativação → privilégio → tarefa.

**Negativo:** sem ativação → tarefa privilegiada negada.

**Expiração:** privilégio desaparece após o período.

Aprenda a diferença entre:

`eligible ≠ active ≠ permanent`.

PIM não é simplesmente MFA para administrador.

---

# 22. 🛡️ PAM/JEA/PAW

## PAM

Disciplina de proteção de contas e sessões privilegiadas.

Conceitos:

- vault;
- rotation;
- JIT;
- elevation;
- session management;
- break-glass;
- service accounts.

Ferramentas de mercado: CyberArk, Delinea, BeyondTrust e senhasegura.

## Laboratório

Sem produto comercial, modele:

`Request → Approval → JIT → Session → Expiration → Audit`

## JEA

Em uma VM Windows, crie uma função PowerShell que permita somente uma operação administrativa específica, como reiniciar um serviço de teste.

O operador não deve possuir uma sessão administrativa irrestrita.

## PAW

Modele uma estação administrativa separada para tarefas privilegiadas.

## Memorize

`PIM = quando o privilégio existe`

`PAM = como proteger o privilégio`

`JEA = quais operações podem ser executadas`

`PAW = de onde a administração sensível é realizada`

---

# 23. ⚙️ PowerShell/Graph

## Objetivo

Transformar operação manual em processo reproduzível.

## Primeiro exercício

Consultar:

- usuários;
- grupos;
- memberships;
- roles.

## Segundo — JML

CSV fictício:

`name,department,jobTitle,status`

Script deve:

1. validar dados;
2. identificar Joiner/Mover/Leaver;
3. calcular ação;
4. registrar log;
5. não alterar nada inicialmente.

## Dry Run

Saída:

`WOULD CREATE`

`WOULD ADD`

`WOULD REMOVE`

`WOULD DISABLE`

## Idempotência

Execute duas vezes.

A segunda execução não deve duplicar objetos ou ações.

## Evolução

`Portal → PowerShell → Graph → REST → Python`.

---

# 24. 🔎 KQL

Aprenda a transformar pergunta de segurança em consulta.

Perguntas:

- quais logins falharam?
- quais usuários tiveram alterações?
- quem ganhou privilégio?
- quais aplicações tiveram alterações?

Exemplo conceitual:

```kusto
SigninLogs
| where TimeGenerated > ago(1h)
| summarize Attempts=count() by UserPrincipalName, ResultType
| order by Attempts desc
```

A disponibilidade de tabelas depende da integração/licenciamento. Use o schema atual.

---

# 25. 🏢 AD e Hybrid Identity

Esta fase usa VM sob demanda.

Arquitetura mínima:

`DC01 → AD DS + DNS`

`WIN11 → cliente`

Aprenda:

- users;
- groups;
- OU;
- GPO;
- DNS;
- Kerberos;
- LDAP;
- service accounts;
- delegação;
- sincronização.

Depois estude Entra Connect/Cloud Sync conforme a arquitetura suportada.

Fluxo mental:

`AD → Synchronization → Entra → Cloud Application`.

Faça um troubleshooting controlado de sincronização e identifique objeto, atributo, identificador, conectividade e estado.

---

# 26. 🧩 IGA/SailPoint

Não é necessário instalar SailPoint para aprender os fundamentos.

Domine:

- identity;
- account;
- entitlement;
- source;
- role;
- connector;
- aggregation;
- provisioning;
- deprovisioning;
- certification;
- workflow;
- SoD;
- application onboarding.

## Simulação

Aplicação:

`ERP-FINANCE`

Entitlements:

`READ`, `CREATE`, `APPROVE`

Roles:

`FINANCE-ANALYST`

`FINANCE-APPROVER`

SoD:

`CREATE + APPROVE = conflito`

Depois estude a arquitetura de SailPoint IdentityIQ e Identity Security Cloud.

Objetivo: entender IGA como disciplina, não decorar uma interface.

---

# 27. ☁️ Cloud IAM

## Azure — prioridade

Domine:

- Azure RBAC;
- scopes;
- Managed Identity;
- Service Principal;
- Key Vault;
- resource group;
- subscription;
- least privilege.

## AWS — fundamentos

Estude:

- IAM Role;
- policy;
- trust policy;
- STS;
- federation;
- workload identity.

## GCP — fundamentos

Estude:

- principal;
- role;
- permission;
- service account;
- federation.

Ordem:

**Azure profundo → AWS fundamentos → GCP fundamentos.**

---

# 28. 🎫 ITSM

IAM real trabalha com:

- Request;
- Incident;
- Change;
- Approval;
- SLA;
- Assignment;
- Evidence;
- Closure.

## Simulação

Crie `REQ-0001`:

- solicitante;
- usuário;
- aplicação;
- acesso;
- justificativa;
- aprovador;
- SoD;
- executor;
- evidência;
- expiração.

Execute:

`Request → Approval → Provision → Validation → Closure`.

Depois faça:

`Revocation → Validation → Closure`.

Estude ServiceNow/Jira como plataformas de operação, não como requisito para dominar IAM básico.

---

# 29. 📋 Auditoria e Compliance

Conheça:

- ISO 27001;
- NIST;
- LGPD;
- PCI DSS;
- least privilege;
- SoD;
- Access Reviews;
- logging.

## Caso prático

Para `LAB-APP-FINANCE`, produza:

1. quem possui acesso;
2. como recebeu;
3. quem aprovou;
4. quando recebeu;
5. quando revisou;
6. quando expira;
7. logs;
8. exceções.

Pergunta central:

> **Como provar que somente pessoas autorizadas possuem acesso?**

---

# 30. 🏆 Projeto final

## Cenário

Empresa fictícia:

- 1.000 funcionários;
- 50 aplicações;
- AD;
- Entra ID;
- Azure;
- SaaS;
- terceiros;
- administradores.

## Áreas

- RH;
- Financeiro;
- TI;
- fornecedores.

## Entregas

### Identidade

`HR → Identity → AD/Entra → IGA → Applications`

### Autenticação

MFA + Conditional Access + SSO.

### Autorização

RBAC + least privilege + ABAC quando justificar + SoD.

### Governança

JML + Access Reviews + Entitlement Management + PIM.

### Aplicações

SAML + OIDC + OAuth2 + SCIM conceitual.

### Workloads

Service Principal + Managed Identity + Federation.

### Privilege

PIM + PAM + JEA + PAW.

### Engenharia

PowerShell + Graph + KQL.

### Auditoria

Logs + evidências + controles.

## Regra

Não consulte o manual durante o desenho inicial.

Primeiro projete.

Depois valide com a documentação.

---

# 31. 📁 Portfólio e entrevistas

Cada projeto deve ter:

`README.md`

`architecture.md`

`scenario.md`

`implementation.md`

`test-results.md`

`troubleshooting.md`

`lessons-learned.md`

## Projetos mínimos

1. Entra + RBAC + MFA + CA.
2. JML.
3. SAML/OIDC.
4. Workload Identity.
5. PIM/JIT.
6. IGA/SoD/Access Review.
7. Graph/PowerShell.
8. Incidente IAM.

## Entrevista

Treine cada tema em três níveis:

**Definição:** o que é?

**Aplicação:** quando usar?

**Decisão:** como desenharia em escala?

Perguntas obrigatórias:

- authentication vs authorization;
- RBAC vs ABAC;
- JML;
- SoD;
- PIM vs PAM;
- SAML vs OIDC;
- OAuth2;
- delegated vs application permissions;
- App Registration vs Service Principal;
- Managed Identity;
- Workload Federation;
- Conditional Access;
- Access Reviews;
- Entitlement Management;
- SailPoint;
- PAM;
- PowerShell/Graph;
- troubleshooting;
- auditoria.

---

# 32. 📈 Evolução de carreira

## 🟢 Júnior

Dominar:

AD básico + Entra Users/Groups + MFA + RBAC + JML + SSO básico + ITSM + PowerShell básico + troubleshooting.

## 🟡 Pleno

Adicionar:

Conditional Access + SAML/OIDC/OAuth2 + APIs + Graph + SoD + Access Reviews + IGA + PIM + Cloud IAM + automação.

## 🟠 IAM Engineer

Adicionar:

Python + REST + SCIM + Workload Identity + SQL + arquitetura de integração + pipelines + role engineering.

## 🔴 Sênior/Especialista

Adicionar:

SailPoint/Saviynt + PAM + CyberArk/Delinea/BeyondTrust/senhasegura + arquitetura híbrida + Zero Trust + compliance + métricas + liderança técnica.

## Critério real

Você não evoluiu porque terminou o documento.

Você evoluiu quando consegue resolver um cenário novo **sem seguir o tutorial**.

---

# 33. ✅ Checklist

## Fundamentos

- [ ] IAM
- [ ] Authentication
- [ ] Authorization
- [ ] Identity lifecycle
- [ ] Least privilege

## Entra

- [ ] Users
- [ ] Groups
- [ ] Roles
- [ ] Administrative Units
- [ ] Devices
- [ ] Licensing

## Authentication

- [ ] MFA
- [ ] SSPR
- [ ] Authentication methods
- [ ] Conditional Access
- [ ] Risk

## Application IAM

- [ ] Enterprise Applications
- [ ] SSO
- [ ] SAML
- [ ] OIDC
- [ ] OAuth2
- [ ] SCIM
- [ ] App Registration
- [ ] Service Principal
- [ ] API permissions

## Workload

- [ ] Managed Identity
- [ ] Federation
- [ ] Credential lifecycle
- [ ] Workload risk

## Governance

- [ ] JML
- [ ] RBAC
- [ ] ABAC
- [ ] SoD
- [ ] Access Reviews
- [ ] Entitlement Management
- [ ] Lifecycle Workflows

## Privilege

- [ ] PIM
- [ ] JIT
- [ ] PAM
- [ ] JEA
- [ ] PAW
- [ ] Break-glass

## Engineering

- [ ] PowerShell
- [ ] Graph
- [ ] REST
- [ ] Python
- [ ] SQL
- [ ] KQL

## Enterprise

- [ ] AD DS
- [ ] Hybrid Identity
- [ ] IGA
- [ ] SailPoint
- [ ] PAM products
- [ ] Cloud IAM
- [ ] ITSM
- [ ] Compliance
- [ ] Architecture

## Portfólio

- [ ] Architecture
- [ ] Scenario
- [ ] Positive test
- [ ] Negative test
- [ ] Troubleshooting
- [ ] Evidence
- [ ] Lessons learned

---

# 34. 📚 Fontes oficiais

- [Microsoft Entra ID](https://learn.microsoft.com/pt-br/entra/identity/)
- [SC-300 — habilidades medidas em 2026](https://learn.microsoft.com/pt-br/credentials/certifications/resources/study-guides/sc-300)
- [Entra licensing](https://learn.microsoft.com/en-us/entra/fundamentals/licensing)
- [Entra ID Governance](https://learn.microsoft.com/pt-br/entra/id-governance/identity-governance-overview)
- [Identity Governance licensing](https://learn.microsoft.com/pt-br/entra/id-governance/licensing-fundamentals)
- [Access Reviews](https://learn.microsoft.com/pt-br/entra/id-governance/access-reviews-overview)
- [Entitlement Management](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview)
- [Lifecycle Workflows](https://learn.microsoft.com/en-us/entra/id-governance/what-are-lifecycle-workflows)
- [Workload ID](https://learn.microsoft.com/en-us/entra/workload-id/)
- [Workload Identity Federation](https://learn.microsoft.com/pt-br/entra/workload-id/workload-identity-federation)
- [Conditional Access](https://learn.microsoft.com/pt-br/entra/identity/conditional-access/)
- [Microsoft Graph](https://learn.microsoft.com/graph/)
- [Microsoft Graph PowerShell](https://learn.microsoft.com/en-us/powershell/microsoftgraph/)

---

# 🏁 Regra final

Para qualquer acesso, pense automaticamente:

**Quem é a identidade?**

**Como autentica?**

**O que precisa acessar?**

**Qual é o privilégio mínimo?**

**Quem aprova?**

**Existe SoD?**

**Quanto tempo o acesso deve existir?**

**Como revisar?**

**Como revogar?**

**Como automatizar?**

**Como provar para auditoria?**

Quando essas perguntas se tornam automáticas, você deixou de aprender somente uma ferramenta e começou a pensar como profissional de **IAM**.
