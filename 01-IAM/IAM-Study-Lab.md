# 🛡️ Microsoft Entra ID — IAM Study Lab

> Laboratório prático, progressivo e otimizado para estudar Microsoft Entra ID do básico ao avançado, com foco em identidade, autenticação, autorização, governança, acesso privilegiado, aplicações, workload identities, automação, auditoria e investigação.

**Método:** entender → configurar → testar → quebrar → corrigir → evidenciar → automatizar → revogar.

> **Escopo:** este manual prioriza Microsoft Entra ID. Active Directory on-premises e identidade híbrida entram somente quando forem necessários para demonstrar um cenário específico.

---

## 🧭 Navegação

1. [Objetivo](#1-objetivo)
2. [Como usar o laboratório](#2-como-usar-o-laboratório)
3. [Licenciamento e estratégia de custo](#3-licenciamento-e-estratégia-de-custo)
4. [Arquitetura mínima](#4-arquitetura-mínima)
5. [Identidades do laboratório](#5-identidades-do-laboratório)
6. [Fase 0 — Preparação e segurança](#6-fase-0--preparação-e-segurança)
7. [Fase 1 — Tenant e primeiros acessos](#7-fase-1--tenant-e-primeiros-acessos)
8. [Fase 2 — Usuários e grupos](#8-fase-2--usuários-e-grupos)
9. [Fase 3 — RBAC do Entra](#9-fase-3--rbac-do-entra)
10. [Fase 4 — Autenticação e MFA](#10-fase-4--autenticação-e-mfa)
11. [Fase 5 — Conditional Access](#11-fase-5--conditional-access)
12. [Fase 6 — Logs e investigação](#12-fase-6--logs-e-investigação)
13. [Fase 7 — SSPR](#13-fase-7--self-service-password-reset)
14. [Fase 8 — Guest/B2B](#14-fase-8--guestb2b)
15. [Fase 9 — Enterprise Applications e SSO](#15-fase-9--enterprise-applications-e-sso)
16. [Fase 10 — App Registration e Service Principal](#16-fase-10--app-registration-e-service-principal)
17. [Fase 11 — Permissões de API](#17-fase-11--permissões-de-api)
18. [Fase 12 — Managed Identity](#18-fase-12--managed-identity)
19. [Fase 13 — Workload Identity Federation](#19-fase-13--workload-identity-federation)
20. [Fase 14 — PIM e JIT](#20-fase-14--pim-e-jit)
21. [Fase 15 — Access Reviews](#21-fase-15--access-reviews)
22. [Fase 16 — Entitlement Management](#22-fase-16--entitlement-management)
23. [Fase 17 — Lifecycle Workflows](#23-fase-17--lifecycle-workflows)
24. [Fase 18 — Identity Protection e risco](#24-fase-18--identity-protection-e-risco)
25. [Fase 19 — Conditional Access avançado](#25-fase-19--conditional-access-avançado)
26. [Fase 20 — Workload Identity Security](#26-fase-20--workload-identity-security)
27. [Fase 21 — Microsoft Graph e automação](#27-fase-21--microsoft-graph-e-automação)
28. [Fase 22 — JML completo](#28-fase-22--jml-completo)
29. [Fase 23 — Cenários de ataque e resposta](#29-fase-23--cenários-de-ataque-e-resposta)
30. [Fase 24 — Projeto final](#30-fase-24--projeto-final)
31. [Matriz de testes](#31-matriz-de-testes)
32. [Evidências](#32-evidências)
33. [Critérios de conclusão](#33-critérios-de-conclusão)
34. [Fontes oficiais](#34-fontes-oficiais)

---

# 1. Objetivo

Ao terminar este laboratório, você deverá conseguir executar e explicar o ciclo completo de IAM no Microsoft Entra ID:

`Identidade → Autenticação → Autorização → Privilégio → Governança → Monitoramento → Automação → Revogação`

O laboratório deve responder, na prática:

- Quem é a identidade?
- Como ela autentica?
- Qual recurso ela pode acessar?
- Por que ela pode acessar?
- Qual função ou grupo concedeu o acesso?
- O acesso é permanente ou elegível?
- Como o acesso privilegiado é ativado?
- Como o acesso é revisado?
- Como detectar uma alteração indevida?
- Como revogar o acesso?
- Como automatizar o ciclo?
- Como proteger uma aplicação sem criar uma senha secreta desnecessária?

---

# 2. Como usar o laboratório

## 2.1 Regra principal

Não avance apenas porque a configuração foi salva.

Cada exercício só está concluído quando você consegue:

1. configurar;
2. executar o teste positivo;
3. executar pelo menos um teste negativo;
4. verificar o log gerado;
5. explicar por que o resultado aconteceu;
6. registrar uma evidência;
7. desfazer ou revogar o acesso quando o cenário exigir.

## 2.2 Padrão de cada exercício

**Objetivo** → o que será demonstrado.

**Por que** → qual problema corporativo o recurso resolve.

**Pré-requisito** → licença, identidade ou recurso necessário.

**Configuração** → caminho exato no portal e valores a utilizar.

**Teste positivo** → o que deve funcionar.

**Teste negativo** → o que deve ser bloqueado.

**Validação** → onde confirmar o resultado.

**Evidência** → screenshot ou exportação que deve ser guardada.

**Limpeza** → o que remover/desativar depois do teste.

---

# 3. Licenciamento e estratégia de custo

O laboratório separa recursos gratuitos de recursos Premium para evitar custo desnecessário.

| Recurso | Gratuito | P1 | P2 / Governance |
|---|---:|---:|---:|
| Usuários e grupos | ✅ | ✅ | ✅ |
| MFA via Security Defaults | ✅ | ✅ | ✅ |
| SSPR básico | ✅ | ✅ | ✅ |
| Conditional Access | ❌ | ✅ | ✅ |
| Conditional Access baseado em risco | ❌ | ❌ | ✅ |
| PIM | ❌ | ❌ | ✅ |
| Access Reviews avançados | depende do cenário | depende do cenário | ✅ |
| Entitlement Management | ❌ | depende do plano | Governance |
| Lifecycle Workflows | ❌ | depende do plano | Governance |

**Regra:** não assuma que uma única licença Premium torna todas as identidades do tenant elegíveis para qualquer recurso. A licença aplicável depende da funcionalidade e do usuário/recurso beneficiado.

### 🟢 Bloco gratuito

Estude primeiro:

- tenant;
- usuários;
- grupos;
- funções básicas;
- Security Defaults;
- MFA básico;
- SSPR básico;
- Enterprise Applications;
- App Registration;
- Managed Identity quando houver Azure;
- logs disponíveis.

### 🟡 Bloco P1

Use trial/licença de laboratório quando disponível para:

- Conditional Access;
- autenticação forte;
- políticas por localização;
- bloqueio de autenticação legada;
- políticas por aplicação;
- controles administrativos.

### 🔴 Bloco P2/Governance

Ative somente quando chegar a:

- PIM;
- risco de usuário/entrada;
- Identity Protection;
- Access Reviews avançados;
- governança avançada.

Consulte a documentação atual antes de comprar qualquer licença.

---

# 4. Arquitetura mínima

Para a maior parte do laboratório Entra ID você não precisa de várias VMs.

```text
Seu computador
├── Navegador
├── PowerShell
└── Microsoft Graph PowerShell
        │
        ▼
Microsoft Entra ID — tenant de laboratório
├── Users / Groups
├── Roles / RBAC
├── Authentication / MFA
├── Conditional Access
├── Logs
├── Applications
├── Workload Identities
└── Identity Governance
        │
        ▼
Azure Subscription
└── somente para módulos que exigirem recursos Azure
```

Uma VM Windows é opcional para cliente, PowerShell isolado, aplicação de teste ou cenário híbrido. Não mantenha VMs ligadas para recursos que podem ser estudados diretamente no tenant.

---

# 5. Identidades do laboratório

| Identidade | Tipo | Finalidade |
|---|---|---|
| `lab-admin` | Break-glass | Recuperação controlada |
| `iam-admin` | Administrativa | Administração IAM |
| `iam-reader` | Administrativa | Leitura/auditoria |
| `user.ana` | Usuário | Testes normais |
| `user.joao` | Usuário | Testes de acesso |
| `user.maria` | Usuário | Testes JML |
| `guest.partner` | Guest | B2B |
| `app-lab` | Aplicação | Workload identity |

Não use credenciais corporativas reais.

A conta administrativa deve ser usada somente para administração. A conta de emergência deve ser protegida contra políticas que possam bloquear todos os administradores e seu uso deve ser excepcional e monitorado.

---

# 6. Fase 0 — Preparação e segurança

## Objetivo

Preparar o tenant sem risco de lockout.

## 6.1 Inventário

Registre localmente:

- tenant name;
- tenant ID;
- domínio;
- assinatura Azure, se existir;
- administradores;
- licenças;
- trials e respectivas datas;
- recursos criados.

Não coloque senhas, tokens, secrets, cookies ou recovery codes no GitHub.

## 6.2 Convenção

Use:

```text
LAB-USER-*
LAB-GRP-*
LAB-APP-*
LAB-CA-*
LAB-RBAC-*
LAB-PIM-*
LAB-AR-*
```

## 6.3 Regra para políticas

Antes de aplicar política de segurança:

`Report-only → Teste → Logs → Ajuste → Enable`

Mantenha uma conta de emergência fora do escopo conforme o desenho da política e valide o acesso antes de aplicar bloqueios amplos.

---

# 7. Fase 1 — Tenant e primeiros acessos

## Objetivo

Conhecer a estrutura antes de configurar controles.

Abra o Microsoft Entra admin center.

1. Entre com a conta administrativa.
2. Confirme o tenant selecionado.
3. Abra **Microsoft Entra ID**.
4. Localize:
   - Overview;
   - Users;
   - Groups;
   - Roles and administrators;
   - Enterprise applications;
   - App registrations;
   - Monitoring;
   - Protection;
   - Identity Governance.

### Por que fazer isso?

Usuários, aplicações, autenticação, privilégios e governança são objetos diferentes. O primeiro objetivo é aprender onde cada controle pertence.

### Evidência

Registre tenant name, domínio e recursos/licenças sem expor segredos.

---

# 8. Fase 2 — Usuários e grupos

## Objetivo

Construir a base de identidade.

## 8.1 Criar usuário

Caminho:

**Entra ID → Users → New user**

Crie `user.ana`.

### Teste positivo

1. Abra uma janela privada.
2. Entre como `user.ana`.
3. Confirme autenticação.

### Teste negativo

Tente acessar uma área administrativa.

Resultado esperado: acesso negado.

## 8.2 Criar grupos

Caminho:

**Entra ID → Groups → All groups → New group**

Crie:

```text
LAB-GRP-Users
LAB-GRP-IAM-Readers
LAB-GRP-IAM-Admins
LAB-GRP-Finance
LAB-GRP-Approvers
```

### Por que grupos?

O modelo desejado é:

`Usuário → Grupo → Permissão`

Isso facilita governança, revisão e revogação.

## 8.3 Testar membership

Adicione `user.ana` ao grupo, remova e adicione novamente.

Valide no portal e nos Audit Logs.

---

# 9. Fase 3 — RBAC do Entra

## Objetivo

Entender função, escopo e privilégio.

Caminho:

**Entra ID → Roles and administrators**

Escolha uma função somente leitura adequada ao laboratório e atribua a `iam-reader`.

### Teste

Como `iam-reader`:

- consulte recursos permitidos;
- tente executar uma alteração administrativa.

Resultado esperado: leitura permitida e alteração negada.

### Modelo mental

`Quem → pode fazer o quê → em qual escopo?`

## Exercício de excesso de privilégio

Atribua temporariamente uma função administrativa controlada, execute uma alteração e remova a função.

Registre:

- identidade;
- função;
- escopo;
- ação;
- remoção;
- logs.

---

# 10. Fase 4 — Autenticação e MFA

## Objetivo

Entender autenticação antes de impor políticas.

## 10.1 Security Defaults

Se o tenant estiver utilizando a camada gratuita e não houver Conditional Access, use Security Defaults como primeiro exercício de MFA.

### Teste

1. Use uma identidade de laboratório.
2. Registre Microsoft Authenticator quando solicitado.
3. Faça novo login.
4. Confirme o segundo fator.

## 10.2 Métodos modernos

Estude e teste quando disponíveis:

- Microsoft Authenticator;
- passkeys/FIDO2;
- Temporary Access Pass;
- Authentication Methods Policy;
- recuperação.

### Cenário

`usuário novo → registro → MFA → login → perda do método → recuperação`

---

# 11. Fase 5 — Conditional Access

## Objetivo

Transformar requisitos de segurança em políticas `if/then`.

Conditional Access usa sinais para tomar decisões de acesso e é o mecanismo de política Zero Trust do Microsoft Entra.

## 11.1 Regra de segurança

Nunca comece com bloqueio global.

Use:

`Report-only → teste → logs → correção → Enable`

## 11.2 Política MFA

Caminho:

**Entra ID → Protection → Conditional Access → Policies → New policy**

Nome:

`LAB-CA-001-Require-MFA`

Configuração inicial:

- Users: `user.ana`, `user.joao`;
- exclua a conta de emergência conforme planejamento;
- escolha um recurso de teste;
- Grant: Require multifactor authentication;
- Enable: Report-only.

### Teste

Faça login com `user.ana`.

### Validação

Abra **Entra ID → Monitoring → Sign-in logs** e verifique usuário, aplicação, localização, Conditional Access e resultado.

## 11.3 Bloquear autenticação legada

Crie `LAB-CA-002-Block-Legacy-Authentication`.

Primeiro teste em Report-only.

## 11.4 Localização

Teste:

`local permitido → acesso`

`local não permitido → bloqueio`

Use o comportamento real mostrado nos logs; não presuma que um IP residencial representa todos os sinais de localização.

## 11.5 Administradores

Crie uma política específica para funções administrativas e compare o resultado com um usuário normal.

## 11.6 What If

Use **What If** para descobrir:

- quais políticas seriam aplicadas;
- qual política produziria bloqueio;
- qual condição está faltando;
- qual exclusão está mudando o resultado.

### Exercício

Crie uma política de teste conflitante em Report-only, analise no What If e corrija.

---

# 12. Fase 6 — Logs e investigação

## Objetivo

Transformar eventos em investigação IAM.

## 12.1 Sign-in Logs

Abra **Entra ID → Monitoring → Sign-in logs**.

Investigue:

- sucesso;
- falha;
- MFA;
- Conditional Access;
- localização;
- aplicação.

## 12.2 Audit Logs

Abra **Entra ID → Monitoring → Audit logs**.

Procure alterações em:

- usuários;
- grupos;
- funções;
- aplicações;
- políticas;
- credenciais.

## 12.3 Exercício de timeline

Execute:

1. criar usuário;
2. adicionar grupo;
3. atribuir função temporária;
4. remover função;
5. remover grupo;
6. desabilitar usuário.

Depois reconstrua a linha do tempo somente com logs.

Você deve conseguir responder:

`Quem fez? → O que mudou? → Quando? → Qual objeto? → Qual resultado?`

---

# 13. Fase 7 — Self-Service Password Reset

## Objetivo

Entender recuperação de identidade.

Configure SSPR conforme os recursos disponíveis.

### Cenário positivo

`usuário esquece senha → valida identidade → redefine → novo login`

### Cenário negativo

Falhe na validação.

Resultado esperado: redefinição não ocorre sem comprovação suficiente.

---

# 14. Fase 8 — Guest/B2B

## Objetivo

Controlar identidade externa.

Caminho:

**Entra ID → Users → New user → Invite external user**

Use uma identidade externa controlada.

### Cenários

`guest sem acesso → negado`

`guest com acesso → permitido`

`guest removido → revogado`

Investigue criação, convite, autenticação, membership e remoção nos logs.

---

# 15. Fase 9 — Enterprise Applications e SSO

## Objetivo

Entender como aplicações consomem identidade Entra.

Use uma aplicação de laboratório/SaaS que suporte SSO.

Caminho:

**Entra ID → Enterprise applications → New application**

Atribua `user.ana`.

Teste:

`usuário atribuído → acesso`

`usuário não atribuído → acesso negado`, quando assignment for exigido.

Depois aplique uma política Conditional Access somente à aplicação e demonstre:

`identidade + aplicação + condição → decisão`

---

# 16. Fase 10 — App Registration e Service Principal

## Objetivo

Diferenciar Application Object e Service Principal.

Caminho:

**Entra ID → App registrations → New registration**

Nome:

`LAB-APP-GraphTest`

## Exercício com secret

Se precisar demonstrar client secret:

1. crie secret temporário;
2. armazene somente localmente;
3. teste;
4. revogue;
5. confirme falha posterior.

Nunca coloque secret no GitHub.

### Pergunta

Como você detectaria uma credencial de aplicação esquecida?

---

# 17. Fase 11 — Permissões de API

## Objetivo

Entender delegated permissions, application permissions e consentimento.

### Delegated

`usuário → aplicação → API`

### Application

`aplicação → API`

### Exercício

1. conceda somente uma permissão necessária;
2. teste;
3. remova;
4. teste novamente;
5. valide logs.

Objetivo: comprovar least privilege para workload identity.

---

# 18. Fase 12 — Managed Identity

## Objetivo

Substituir secrets por identidade gerenciada quando o workload Azure suportar o recurso.

Crie um recurso Azure temporário compatível.

Habilite Managed Identity.

Conceda somente o RBAC necessário.

Modelo:

`Azure Resource → Managed Identity → Role → Resource`

### Testes

`role presente → acesso`

`role removida → acesso negado`

O ponto central é autenticar o workload sem armazenar uma credencial de longa duração.

---

# 19. Fase 13 — Workload Identity Federation

## Objetivo

Aprender autenticação de workload sem secret persistente.

Use um cenário controlado de CI/CD ou provedor suportado.

Fluxo:

`Workload externo → token → Entra → confiança federada → recurso`

### Testes negativos obrigatórios

- issuer incorreto → bloqueio;
- subject incorreto → bloqueio;
- audience incorreta → bloqueio;
- role removida → bloqueio.

---

# 20. Fase 14 — PIM e JIT

## Objetivo

Aprender privilégio temporário.

PIM exige licença compatível. Estude este módulo somente depois de validar a disponibilidade do recurso no tenant.

Modelo:

`usuário → eligible → activate → role → expire`

## Configuração

1. abra PIM;
2. selecione Microsoft Entra roles;
3. escolha uma função de baixo impacto;
4. atribua elegibilidade;
5. configure duração curta;
6. configure justificativa/aprovação/MFA quando disponível.

### Testes

`sem ativação → ação negada`

`ativação → ação permitida`

`expiração → ação negada`

### Investigação

Verifique elegibilidade, ativação, aprovação, alteração realizada e expiração nos registros disponíveis.

---

# 21. Fase 15 — Access Reviews

## Objetivo

Responder:

`Esta pessoa ainda precisa desse acesso?`

Quando disponível, crie uma revisão para:

- grupo privilegiado;
- aplicação;
- guest;
- acesso administrativo.

### Exercício

1. `user.ana` recebe acesso;
2. crie Access Review;
3. registre decisão `Deny`;
4. remova o acesso;
5. valide.

Registre reviewer, decisão, data e acesso afetado.

---

# 22. Fase 16 — Entitlement Management

## Objetivo

Simular solicitação, aprovação, concessão, expiração e revisão de acesso.

Quando disponível:

`Access Package → Policy → Request → Approval → Assignment → Expiration → Review`

Crie:

`LAB-PACK-FINANCE`

Inclua um grupo de laboratório.

### Teste

`usuário solicita → aprovador decide → acesso concedido → expiração/revisão → acesso removido`

Isso demonstra governança de acesso, não apenas autorização técnica.

---

# 23. Fase 17 — Lifecycle Workflows

## Objetivo

Automatizar o ciclo de identidade.

Quando disponível:

`Joiner → Mover → Leaver`

### Joiner

`identidade → grupo → acesso → autenticação`

### Mover

`departamento antigo → remoção do acesso antigo → novo acesso`

### Leaver

`desativação → revisão de grupos → revisão de aplicações → remoção de privilégio → evidência`

O resultado importante é impedir privilégio residual.

---

# 24. Fase 18 — Identity Protection e risco

## Objetivo

Aprender IAM baseado em risco.

Este módulo depende de recursos/licença compatíveis.

Estude:

- User risk;
- Sign-in risk;
- risky users;
- risk detections;
- remediação;
- integração com Conditional Access.

Modelo:

`risco → política → MFA/remediação/bloqueio → investigação`

Não tente fabricar eventos reais de risco de forma irresponsável. Use recursos de simulação/documentação quando disponíveis.

---

# 25. Fase 19 — Conditional Access avançado

Implemente e teste, conforme licenciamento:

| Cenário | Teste |
|---|---|
| MFA | usuário → MFA |
| Administrador | role privilegiada → autenticação forte |
| Aplicação | app específica → política específica |
| Localização | local permitido/negado |
| Dispositivo | dispositivo compatível/incompatível |
| Legacy auth | autenticação legada → bloqueio |
| Risco | risco elevado → remediação/bloqueio |
| Workload identity | service principal fora da condição → bloqueio |

Para todos os cenários use o mesmo ciclo:

`Report-only → teste → Sign-in Logs → What If → correção → Enable`

---

# 26. Fase 20 — Workload Identity Security

## Objetivo

Tratar aplicações como identidades que também precisam de governança.

Audite:

- aplicações sem uso;
- secrets expirados;
- secrets próximos da expiração;
- certificados;
- permissões de API excessivas;
- service principals privilegiados;
- RBAC excessivo.

### Exercício

Crie uma aplicação com permissão desnecessária.

Depois:

1. identifique;
2. documente o risco;
3. remova;
4. valide que a aplicação continua funcionando;
5. confirme que a permissão não era necessária.

---

# 27. Fase 21 — Microsoft Graph e automação

## Objetivo

Automatizar IAM fora do portal.

## 27.1 Instalação

```powershell
Install-Module Microsoft.Graph -Scope CurrentUser
```

## 27.2 Autenticação

Use autenticação interativa e o menor conjunto de scopes necessário.

Exemplo:

```powershell
Connect-MgGraph -Scopes "User.Read.All"
```

## 27.3 Consulta

```powershell
Get-MgUser -All | Select-Object DisplayName,UserPrincipalName,AccountEnabled
```

## 27.4 Automação

Crie um relatório com:

- usuário;
- UPN;
- enabled;
- criação;
- grupos;
- funções, quando permitido.

Depois automatize:

`CSV → validação → criação → grupo → relatório`

E:

`Leaver → disable → memberships → relatório`

Nunca coloque secrets em scripts.

---

# 28. Fase 22 — JML completo

## Joiner

Entrada:

```text
Nome: Ana Silva
Departamento: Finance
Cargo: Analyst
```

Fluxo:

`identidade → grupo → aplicação → MFA → acesso`

## Mover

`Finance → RH`

O acesso de Finance deve ser removido e o acesso de RH concedido.

## Leaver

Desative a identidade e valide:

- login bloqueado;
- grupos revisados;
- aplicações revisadas;
- privilégios removidos;
- logs preservados.

### Pergunta de entrevista

Por que bloquear a conta não é suficiente para um offboarding completo?

---

# 29. Fase 23 — Cenários de ataque e resposta

Todos os cenários são controlados e executados somente no tenant de laboratório.

## Cenário 1 — Privilégio excessivo

Usuário comum recebe role administrativa.

Detecte → identifique quem fez → remova → valide → documente.

## Cenário 2 — Grupo privilegiado

Adicione usuário a grupo administrativo e investigue Audit Logs.

## Cenário 3 — Secret exposto

Crie secret temporário → use → revogue → valide falha.

## Cenário 4 — Conditional Access incorreto

Crie política em Report-only → use What If → explique → corrija.

## Cenário 5 — Guest residual

Conceda acesso por dois caminhos → remova somente um → encontre o acesso restante.

## Cenário 6 — Leaver incompleto

Desabilite usuário sem revisar memberships → descubra acesso residual → corrija.

## Cenário 7 — Service Principal excessivo

Conceda função acima do necessário → identifique → reduza → valide.

---

# 30. Fase 24 — Projeto final

## Empresa fictícia

`ACME Brasil`

Departamentos:

- TI
- IAM
- SOC
- Financeiro
- RH

## Requisitos

### Identidade

- usuários;
- grupos;
- guest;
- contas administrativas;
- conta de emergência.

### Autenticação

- MFA;
- autenticação forte quando disponível;
- SSPR.

### Autorização

- RBAC;
- grupos;
- least privilege;
- segregação de funções.

### Acesso

- Conditional Access;
- aplicação corporativa;
- guest;
- dispositivo/local quando disponível.

### Privilégio

- PIM/JIT quando licenciado;
- ativação;
- expiração;
- auditoria.

### Governança

- Access Review;
- Access Package quando disponível;
- JML;
- revisão de guest.

### Workload

- App Registration;
- Service Principal;
- API permission;
- Managed Identity;
- Workload Federation quando possível.

### Automação

- Graph;
- relatório de usuários;
- relatório de privilégios;
- Leaver.

### Monitoramento

- Sign-in Logs;
- Audit Logs;
- investigação de alteração privilegiada.

---

# 31. Matriz de testes

| ID | Cenário | Resultado esperado | Evidência |
|---|---|---|---|
| T01 | Login normal | Permitido | Sign-in Log |
| T02 | Usuário sem acesso | Negado | Log |
| T03 | MFA | Solicitado | Sign-in Log |
| T04 | CA Report-only | Impacto registrado | CA/Log |
| T05 | CA bloqueio | Acesso negado | Log |
| T06 | What If | Política identificada | Screenshot |
| T07 | RBAC Reader | Leitura | Screenshot |
| T08 | RBAC sem permissão | Negado | Screenshot |
| T09 | Guest | Acesso controlado | Log |
| T10 | Guest removido | Negado | Log |
| T11 | SSO | Login conforme configuração | Log |
| T12 | App Registration | Autenticação válida | Log |
| T13 | API permission | Acesso autorizado | Log |
| T14 | API permission removida | Acesso negado | Log |
| T15 | Managed Identity | Acesso sem secret | Log |
| T16 | Role removida | Acesso negado | Log |
| T17 | PIM sem ativação | Negado | Log |
| T18 | PIM ativado | Permitido | Log |
| T19 | PIM expirado | Negado | Log |
| T20 | Access Review deny | Acesso removido | Review |
| T21 | JML Joiner | Acesso correto | Evidência |
| T22 | JML Mover | Acesso antigo removido | Evidência |
| T23 | JML Leaver | Identidade bloqueada | Evidência |
| T24 | Secret revogado | Autenticação falha | Log |
| T25 | Privilege escalation | Detectado/removido | Audit Log |
| T26 | Workload identity | Política aplicada | Log |

---

# 32. Evidências

Estrutura local:

```text
01-IAM/
└── evidence/
    ├── 01-tenant/
    ├── 02-users-groups/
    ├── 03-rbac/
    ├── 04-authentication/
    ├── 05-conditional-access/
    ├── 06-logs/
    ├── 07-guest/
    ├── 08-applications/
    ├── 09-workload-identity/
    ├── 10-pim/
    ├── 11-governance/
    ├── 12-automation/
    └── 13-incidents/
```

Antes de publicar:

- remova e-mails reais;
- remova IPs públicos;
- remova secrets;
- remova tokens;
- remova códigos MFA;
- remova cookies;
- remova dados pessoais das screenshots.

---

# 33. Critérios de conclusão

Você deve conseguir demonstrar sem seguir o tutorial:

### Fundamentos

- tenant;
- usuário;
- grupo;
- guest;
- role;
- RBAC.

### Autenticação

- MFA;
- SSPR;
- métodos de autenticação;
- autenticação forte.

### Conditional Access

- condições;
- grants;
- sessões;
- exclusões;
- Report-only;
- What If;
- troubleshooting.

### Governança

- Access Reviews;
- Entitlement Management;
- JML;
- least privilege;
- SoD.

### Privileged Access

- PIM;
- eligible;
- activation;
- JIT;
- expiração;
- auditoria.

### Applications

- Enterprise Application;
- SSO;
- App Registration;
- Service Principal;
- delegated permission;
- application permission;
- consent.

### Workload

- Managed Identity;
- Service Principal;
- Workload Identity Federation;
- proteção de credenciais.

### Automação

- Microsoft Graph;
- PowerShell;
- relatório;
- JML automatizado.

### Investigação

Diante de um evento, explique:

`quem → autenticou → em qual aplicação → de onde → sob quais políticas → com qual resultado → qual alteração ocorreu depois`

---

# 34. Fontes oficiais

- Microsoft Entra ID: https://learn.microsoft.com/entra/identity/
- Licensing: https://learn.microsoft.com/en-us/entra/fundamentals/licensing
- Conditional Access: https://learn.microsoft.com/pt-br/entra/identity/conditional-access/
- Conditional Access planning: https://learn.microsoft.com/pt-br/entra/identity/conditional-access/plan-conditional-access
- PIM: https://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-getting-started
- PIM deployment: https://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-deployment-plan
- Identity Governance: https://learn.microsoft.com/pt-br/entra/id-governance/identity-governance-overview
- Workload ID: https://learn.microsoft.com/en-us/entra/workload-id/
- Conditional Access para workload identities: https://learn.microsoft.com/pt-br/entra/identity/conditional-access/workload-identity
- Microsoft Graph PowerShell: https://learn.microsoft.com/en-us/powershell/microsoftgraph/

---

# 🏁 Resultado esperado

Ao finalizar, você deve conseguir pegar um requisito corporativo como:

> Somente pessoas autorizadas devem acessar o recurso; administradores não devem permanecer permanentemente privilegiados; aplicações não devem armazenar secrets desnecessários; e o acesso relevante deve ser auditável.

E transformá-lo em:

`Identidade → Grupo → RBAC → MFA → Conditional Access → PIM/JIT → Aplicação → Workload Identity → Governança → Logs → Automação → Revogação`

Esse é o modelo mental central do laboratório para uma atuação profissional em IAM.
