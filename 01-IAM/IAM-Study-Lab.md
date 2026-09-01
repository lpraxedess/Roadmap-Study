# 🟦 IAM Study Lab

> **Formato:** laboratório prático progressivo. Execute na ordem.
>
> **Regra:** configure → teste → provoque uma falha controlada → investigue → corrija → revogue → registre evidência.
>
> **Licença:** use estrategicamente **1 Entra ID P2** apenas no usuário/conta necessária para os exercícios avançados. Recursos cuja licença não esteja disponível devem ser marcados como `OPCIONAL` e não tratados como pré-requisito.

## 📍 Mapa

1. Ambiente
2. IAM Fundamentals
3. Active Directory
4. Entra Users & Groups
5. RBAC
6. Administrative RBAC
7. MFA
8. Conditional Access
9. Identity Protection
10. Logs & Troubleshooting
11. OAuth 2.0
12. OpenID Connect
13. SAML 2.0
14. App Registration
15. Service Principals
16. Workload Identity
17. SCIM
18. Microsoft Graph
19. PowerShell Automation
20. JML
21. Entitlement Management
22. Access Reviews
23. PIM
24. B2B
25. Hybrid Identity
26. IGA + RBAC + ABAC + SoD
27. PAM + Teleport CE
28. Cloud IAM
29. ITSM + Audit
30. Zero Trust
31. IAM Metrics
32. Projeto Final
33. Desafio de Entrevista

---

# 01 — AMBIENTE

## Cenário

Criar um laboratório isolado para não misturar testes com recursos reais.

## PASSO 1 — Criar rede no VirtualBox

Abra **VirtualBox → Tools → Network Manager → Host-only Networks → Create**.

Use uma rede como:

- IPv4: `192.168.56.1`
- máscara: `255.255.255.0`
- DHCP: **desativado**

### Por quê?

O DHCP será feito pelo próprio Windows Server quando ele assumir a função DHCP. Ter dois DHCPs na mesma rede pode entregar IP, gateway ou DNS incorretos.

## PASSO 2 — Criar VMs

Crie, mas não mantenha todas ligadas:

| VM | Função | IP |
|---|---|---|
| LAB-DC01 | AD/DNS/DHCP | 192.168.56.10 |
| LAB-WIN11 | cliente | DHCP |
| LAB-LINUX01 | alvo PAM | 192.168.56.30 |
| LAB-TELEPORT | PAM | 192.168.56.20 |

RAM mínima sugerida: DC `4 GB`; Windows `4 GB`; Linux `2 GB`; Teleport `2 GB`.

### Regra de economia

Ligue somente as VMs necessárias ao módulo atual. Para Entra, AD pode permanecer desligado depois dos testes de identidade híbrida.

## PASSO 3 — Validar conectividade

No cliente Windows:

`ipconfig`

`ping 192.168.56.10`

### Resultado esperado

O cliente alcança o DC.

### O que você aprendeu

Isolamento de laboratório, rede host-only, endereçamento estático e motivo de desativar DHCP do VirtualBox.

---

# 02 — IAM FUNDAMENTALS

## Cenário

Distinguir autenticação, autorização, identidade, conta, grupo, role, entitlement e privilégio.

## PASSO 1 — Criar identidade

No Entra: **Identity → Users → All users → New user**.

Crie `LAB-ANA`.

### Por quê?

Uma identidade representa a pessoa; a conta é a representação técnica usada para autenticação e autorização.

## PASSO 2 — Criar grupo

**Groups → New group**.

Crie `GRP-FINANCE` e adicione `LAB-ANA`.

### Resultado esperado

Ana possui uma identidade e pertence a um grupo.

### O que você aprendeu

`Identidade → conta → grupo → autorização`.

---

# 03 — ACTIVE DIRECTORY

## Cenário

Criar uma pequena estrutura corporativa on-premises.

## PASSO 1 — Instalar AD DS

No `LAB-DC01`: **Server Manager → Add Roles and Features → Active Directory Domain Services → Install**.

Depois selecione **Promote this server to a domain controller**.

Domínio:

`lab.local`

### Por quê?

O AD será a fonte de identidade on-premises para praticar usuários, grupos, OU, GPO, LDAP, Kerberos e sincronização híbrida.

## PASSO 2 — Criar OUs

**Active Directory Users and Computers → lab.local → New → Organizational Unit**.

Crie:

- `OU=Users`
- `OU=Groups`
- `OU=Servers`
- `OU=Workstations`
- `OU=Disabled`

## PASSO 3 — Criar usuário

Crie `LAB-ANA` em `OU=Users`.

## PASSO 4 — Criar grupos

Crie:

- `GG-FINANCE`
- `GG-IT`
- `GG-IAM`

Adicione Ana a `GG-FINANCE`.

## PASSO 5 — GPO

**Group Policy Management → Default/OU → Create a GPO**.

Crie `GPO-LAB-AUDIT` e habilite auditoria adequada ao laboratório.

### Resultado esperado

Você possui AD, OU, usuário, grupo e GPO.

### O que você aprendeu

Estrutura de diretório e administração básica de identidade.

---

# 04 — ENTRA USERS & GROUPS

## PASSO 1 — Criar usuário cloud

**Entra admin center → Identity → Users → New user**.

Crie `LAB-CLOUD-01`.

## PASSO 2 — Criar grupos

Crie:

`GRP-IAM-READERS`

`GRP-IAM-ADMINS`

## PASSO 3 — Adicionar membro

Adicione `LAB-CLOUD-01` a `GRP-IAM-READERS`.

### Por quê?

Conceder acesso por grupo facilita RBAC, JML, recertificação e automação.

### Resultado esperado

Acesso futuro pode ser atribuído ao grupo em vez de usuário individual.

---

# 05 — RBAC

## Cenário

Ana precisa administrar VMs de um Resource Group, mas não a assinatura inteira.

## PASSO 1 — Criar Resource Group

**Azure Portal → Resource groups → Create**.

Nome:

`rg-iam-lab`

## PASSO 2 — Atribuir função

**Resource group → Access control (IAM) → Add role assignment**.

Role:

`Virtual Machine Contributor`

Member:

`LAB-ANA`

Scope:

`rg-iam-lab`

### Por quê?

RBAC combina **role + principal + scope** para conceder somente as permissões necessárias.

## PASSO 3 — Testar

Entre como Ana e tente administrar uma VM do Resource Group.

### Resultado esperado

A operação permitida funciona.

## PASSO 4 — Teste negativo

Tente uma ação de administração do Entra.

### Resultado esperado

A operação é negada.

## PASSO 5 — Remover role

Volte ao administrador → IAM → Role assignments → remova a função.

Teste novamente.

### O que você aprendeu

Autorização, scope, least privilege, concessão e revogação.

---

# 06 — ADMINISTRATIVE RBAC

## Cenário

Não conceder Global Administrator para tarefas comuns.

## PASSO 1 — Comparar roles

No Entra: **Roles & admins**.

Compare:

- User Administrator
- Groups Administrator
- Application Administrator
- Security Administrator
- Global Administrator

## PASSO 2 — Criar operador de laboratório

Use `LAB-IAM-OPERATOR`.

Atribua somente a role necessária para a tarefa.

## PASSO 3 — Testar

Execute a tarefa permitida.

Depois tente uma tarefa fora do escopo.

### Resultado esperado

A tarefa necessária funciona; a desnecessária é negada.

### O que você aprendeu

Least privilege administrativo e separação de responsabilidades.

---

# 07 — MFA

## PASSO 1 — Registrar método MFA

Entre com `LAB-ANA` e registre Microsoft Authenticator ou método disponível no tenant.

## PASSO 2 — Testar login

Saia e entre novamente.

### Resultado esperado

O segundo fator é solicitado quando requerido.

## PASSO 3 — Investigar log

**Entra → Monitoring & health → Sign-in logs**.

Abra o evento e observe o método de autenticação.

### O que você aprendeu

Autenticação forte e evidência de autenticação.

---

# 08 — CONDITIONAL ACCESS

## Cenário

Exigir MFA somente para o usuário de laboratório.

## PASSO 1 — Criar política

**Entra → Protection → Conditional Access → Policies → Create new policy**.

Nome:

`CA-LAB-MFA`

Users: somente `LAB-ANA`.

Target resources: `All cloud apps`.

Grant: `Require multifactor authentication`.

Use **Report-only** primeiro.

### Por quê?

Report-only permite validar impacto antes de bloquear.

## PASSO 2 — Validar

Faça login como Ana e consulte o Sign-in Log.

## PASSO 3 — Ativar

Mude para **On**.

## PASSO 4 — Teste negativo

Tente autenticar sem satisfazer o controle.

### Resultado esperado

A política exige MFA.

## PASSO 5 — Break-glass

Antes de políticas amplas, mantenha contas de emergência excluídas e monitoradas.

### O que você aprendeu

Policy evaluation, MFA, report-only, exceção administrativa e troubleshooting.

---

# 09 — IDENTITY PROTECTION

> **P2:** use a única licença neste laboratório.

## PASSO 1 — Abrir Risky Users

**Entra → Protection → Identity Protection → Risky users**.

## PASSO 2 — Abrir Risky sign-ins

Observe sinais e detalhes disponíveis.

## PASSO 3 — Criar política baseada em risco

Configure uma política de laboratório com escopo restrito a `LAB-ANA` e ação de MFA/controle disponível.

### Por quê?

Identity Protection transforma sinais de risco em decisões de acesso.

## PASSO 4 — Investigar

Compare o risco com o Sign-in Log.

### O que você aprendeu

Risk detection, risk remediation e integração com Conditional Access.

---

# 10 — LOGS & TROUBLESHOOTING

## PASSO 1 — Gerar evento

Faça login com `LAB-ANA`.

## PASSO 2 — Investigar

**Entra → Sign-in logs**.

Verifique:

- usuário;
- aplicação;
- IP;
- resultado;
- Conditional Access;
- autenticação;
- risco.

## PASSO 3 — Criar falha

Desabilite temporariamente a role ou grupo necessário.

Repita o acesso.

## PASSO 4 — Diagnosticar

Use esta ordem:

`Identidade → autenticação → grupo → role → scope → CA → aplicação → token → logs`.

## PASSO 5 — Corrigir

Reponha somente a permissão necessária.

### O que você aprendeu

Troubleshooting sistemático em IAM.

---

# 11 — OAUTH 2.0

## Cenário

Uma aplicação precisa obter acesso delegado a uma API.

## PASSO 1 — Identificar atores

Documente:

`Resource Owner → Client → Authorization Server → Resource Server`.

## PASSO 2 — Criar App Registration

**Entra → App registrations → New registration**.

Nome:

`APP-OAUTH-LAB`

## PASSO 3 — Configurar Redirect URI

Use uma URI local da aplicação de laboratório.

### Por quê?

OAuth autoriza o cliente a obter tokens; não é, por si só, um protocolo de autenticação de usuário.

## PASSO 4 — Testar Authorization Code

Faça login e observe o retorno de autorização.

## PASSO 5 — Inspecionar token

Identifique `access_token`, `scope`, `aud`, `iss` e expiração.

### Teste negativo

Altere o redirect URI e repita.

### Resultado esperado

O fluxo é rejeitado.

### O que você aprendeu

Delegated authorization, scopes, tokens e redirect URI.

---

# 12 — OPENID CONNECT

## PASSO 1 — Usar a mesma App Registration

Habilite o fluxo OIDC da aplicação escolhida.

## PASSO 2 — Configurar issuer/discovery

Use o endpoint OpenID Configuration do tenant.

## PASSO 3 — Fazer login

Autentique como `LAB-ANA`.

## PASSO 4 — Inspecionar ID Token

Identifique:

- `iss`
- `sub`
- `aud`
- `exp`
- `name`
- `preferred_username`

### Por quê?

OIDC adiciona autenticação e identidade sobre OAuth 2.0.

### Teste negativo

Use audiência/redirect incorreto.

### Resultado esperado

A validação falha.

### O que você aprendeu

OIDC, claims, ID token, issuer e audience.

---

# 13 — SAML 2.0

## Cenário

Integrar uma aplicação SaaS de laboratório como Service Provider.

## PASSO 1 — Criar Enterprise Application

**Entra → Enterprise applications → New application → Create your own application**.

Escolha configuração de SAML para a aplicação de teste.

## PASSO 2 — Configurar SP

Preencha:

- Identifier / Entity ID
- Reply URL / ACS
- Sign-on URL

## PASSO 3 — Configurar claims

Envie um identificador do usuário como claim.

## PASSO 4 — Login

Faça login e observe a Assertion.

### Por quê?

SAML transporta uma assertion assinada do IdP para o SP.

## PASSO 5 — Quebrar Entity ID

Altere deliberadamente o identificador.

### Resultado esperado

O SP rejeita a resposta.

## PASSO 6 — Corrigir

Restaure o valor e valide.

### O que você aprendeu

IdP, SP, Entity ID, ACS, Assertion, claims e certificado.

---

# 14 — APP REGISTRATION

## PASSO 1 — Criar aplicação

Crie `APP-IAM-LAB` em **App registrations**.

## PASSO 2 — Identificar objetos

Observe:

`Application object ≠ Service Principal`

### Por quê?

O App Registration representa a definição da aplicação; o Service Principal é a instância dessa aplicação em um tenant.

## PASSO 3 — Criar redirect URI

Adicione uma URI somente para o laboratório.

## PASSO 4 — Configurar API permissions

Comece com a menor permissão necessária.

### O que você aprendeu

Application object, service principal, redirect URI e API permissions.

---

# 15 — SERVICE PRINCIPALS

## PASSO 1 — Criar Service Principal

Use a App Registration `APP-IAM-LAB`.

## PASSO 2 — Conceder acesso mínimo

Atribua uma role RBAC somente ao Resource Group `rg-iam-lab`.

### Por quê?

Aplicações também são identidades e precisam de autorização controlada.

## PASSO 3 — Testar

Execute uma ação permitida pela aplicação.

## PASSO 4 — Remover role

Teste novamente.

### Resultado esperado

A ação deixa de funcionar.

### O que você aprendeu

Identidade não humana e RBAC para aplicações.

---

# 16 — WORKLOAD IDENTITY + SECRETS

## PASSO 1 — Comparar opções

Documente:

`Client Secret → Certificate → Managed Identity → Workload Identity Federation`

## PASSO 2 — Secret de laboratório

Se precisar criar secret, use somente laboratório, registre a data de expiração e não publique o valor.

## PASSO 3 — Preferir identidade gerenciada

Em uma VM Azure de laboratório, habilite Managed Identity quando disponível.

## PASSO 4 — Testar acesso

Conceda uma role mínima ao recurso e valide o acesso.

### Por quê?

Evitar secrets permanentes reduz risco de vazamento e rotação manual.

## PASSO 5 — Key Vault

Crie um cofre de laboratório e pratique acesso por Managed Identity.

### O que você aprendeu

Workload identity, secret lifecycle, certificates e eliminação de credenciais estáticas.

---

# 17 — SCIM 2.0

## Cenário

Automatizar provisioning e deprovisioning de usuários para uma aplicação.

## PASSO 1 — Subir endpoint SCIM

Use uma aplicação SCIM de laboratório ou um mock SCIM 2.0 local.

## PASSO 2 — Testar API

Valide os métodos:

`GET /Users`

`POST /Users`

`PATCH /Users/{id}`

`DELETE /Users/{id}`

## PASSO 3 — Configurar provisioning

No Enterprise Application → **Provisioning**.

Configure endpoint e token de teste.

## PASSO 4 — Mapear atributos

Mapeie pelo menos:

`userName`, `active`, `displayName`, `emails[type eq "work"].value`.

## PASSO 5 — Provisionar

Ative um usuário de teste.

### Resultado esperado

O usuário aparece no sistema alvo.

## PASSO 6 — Alterar

Mude um atributo no Entra e sincronize.

## PASSO 7 — Desprovisionar

Desative o usuário.

### Resultado esperado

O alvo recebe a alteração de ciclo de vida.

### Teste negativo

Use endpoint/token inválido e investigue logs.

### O que você aprendeu

Provisioning, deprovisioning, attribute mapping e SCIM.

---

# 18 — MICROSOFT GRAPH

## PASSO 1 — Graph Explorer

Abra o Microsoft Graph Explorer e autentique com a conta de laboratório.

## PASSO 2 — Consultar usuário

Execute uma consulta `GET` para o usuário `LAB-ANA`.

## PASSO 3 — Consultar grupos

Consulte grupos e memberships.

## PASSO 4 — Alterar atributo

Faça uma alteração permitida pela sessão.

## PASSO 5 — Testar permissão insuficiente

Use uma operação para a qual não exista consentimento.

### Resultado esperado

A API retorna erro de autorização.

### O que você aprendeu

REST, Microsoft Graph, permissions, consent e troubleshooting de API.

---

# 19 — POWERSHELL + AUTOMATION

## Cenário

Automatizar onboarding e offboarding.

## PASSO 1 — Preparar CSV

Crie:

`users.csv`

com:

`Name,UserPrincipalName,Department`

## PASSO 2 — Conectar Graph

Use Microsoft Graph PowerShell e conceda somente permissões necessárias.

## PASSO 3 — Criar usuários

Escreva script que:

1. lê CSV;
2. verifica se usuário existe;
3. cria somente se necessário;
4. adiciona grupo;
5. grava log.

### Por quê?

A verificação evita duplicidade e torna o script idempotente.

## PASSO 4 — Offboarding

Script:

`disable → remove group → revoke sessions quando aplicável → log`

## PASSO 5 — Erro controlado

Informe um usuário inexistente.

### Resultado esperado

O script não interrompe toda a execução e registra o erro.

### O que você aprendeu

Automação, idempotência, logging e least privilege.

---

# 20 — JML

## Cenário

Simular ciclo corporativo completo.

## PASSO 1 — JOINER

Crie `LAB-MARIA`.

Atribua departamento Finance.

Adicione ao grupo adequado.

### O que você aprendeu

Onboarding e provisioning.

## PASSO 2 — MOVER

Altere Finance → IT.

Remova grupo antigo e adicione grupo novo.

### Teste

Verifique que Maria perdeu o acesso Finance.

### O que você aprendeu

Mover não é simplesmente adicionar acesso novo; é recalcular o acesso antigo.

## PASSO 3 — LEAVER

Bloqueie a conta, remova grupos e revogue sessões quando aplicável.

### Resultado esperado

Maria não consegue mais autenticar nem manter os acessos anteriores.

### O que você aprendeu

Lifecycle e revogação.

> **Lifecycle Workflows:** trate como `OPCIONAL` caso a licença disponível no tenant não cubra a funcionalidade.

---

# 21 — ENTITLEMENT MANAGEMENT

> **Licenciamento:** valide no tenant antes de executar; não trate como garantido com P2 isolada.

## Cenário

Um funcionário solicita um pacote de acessos Finance.

## PASSO 1 — Criar catálogo

No Entra → Identity Governance → Entitlement Management, se disponível.

Crie catálogo `CAT-FINANCE`.

## PASSO 2 — Criar Access Package

Crie `PKG-FINANCE-ANALYST`.

Inclua grupo e aplicação de laboratório.

## PASSO 3 — Criar policy

Defina quem pode solicitar, aprovação e expiração.

## PASSO 4 — Solicitar

Solicite o pacote como `LAB-ANA`.

## PASSO 5 — Aprovar

Aprove como aprovador separado.

## PASSO 6 — Validar

Confirme o acesso.

## PASSO 7 — Expirar/remover

Remova ou deixe expirar conforme a policy.

### O que você aprendeu

Entitlement, access package, approval, expiration e governança de acesso.

---

# 22 — ACCESS REVIEWS

> Valide o entitlement/licenciamento disponível antes de criar o review.

## PASSO 1 — Criar população

Escolha `GRP-FINANCE`.

## PASSO 2 — Criar review

**Identity Governance → Access Reviews → New access review**.

Use população pequena.

## PASSO 3 — Revisar

Acesse como reviewer e marque:

- Keep access
- Remove access

## PASSO 4 — Aplicar resultado

Remova o acesso rejeitado.

## PASSO 5 — Evidência

Registre:

`reviewer → usuário → decisão → data → resultado`

### O que você aprendeu

Recertificação, owner, decisão e evidência.

---

# 23 — PIM

> **P2:** este é um dos usos prioritários da única licença.

## Cenário

O administrador não deve permanecer permanentemente privilegiado.

## PASSO 1 — Criar/usar conta administrativa separada

Não use sua conta pessoal principal como identidade de teste privilegiada.

## PASSO 2 — Tornar elegível

**Entra → Privileged Identity Management → Microsoft Entra roles**.

Escolha uma role adequada ao laboratório.

Atribua como **Eligible**.

## PASSO 3 — Testar antes da ativação

Tente executar a tarefa administrativa.

### Resultado esperado

Sem ativação, a tarefa não deve possuir o privilégio necessário.

## PASSO 4 — Ativar

Informe justificativa, MFA e duração conforme a policy.

## PASSO 5 — Testar

Repita a tarefa.

### Resultado esperado

A tarefa funciona durante a ativação.

## PASSO 6 — Esperar expiração

Após expirar, repita.

### Resultado esperado

O privilégio deixa de estar ativo.

## PASSO 7 — Auditar

Consulte activation history e audit logs.

### O que você aprendeu

JIT, eligible, activation, MFA, duração e auditoria.

---

# 24 — B2B

## Cenário

Um fornecedor externo precisa acessar uma aplicação específica.

## PASSO 1 — Convidar identidade externa

**Entra → Users → New external user**.

Use identidade de teste controlada.

## PASSO 2 — Atribuir acesso mínimo

Conceda somente aplicação/grupo necessário.

## PASSO 3 — Testar

Entre como externo.

## PASSO 4 — Revogar

Remova acesso/convidado.

### O que você aprendeu

External identity, guest lifecycle e least privilege.

---

# 25 — HYBRID IDENTITY

## Cenário

AD é a origem e Entra recebe identidade sincronizada.

## PASSO 1 — Preparar UPN

No AD, configure o UPN do usuário para corresponder ao domínio verificado no tenant de laboratório.

## PASSO 2 — Instalar ferramenta de sincronização

Use **Microsoft Entra Cloud Sync ou Entra Connect Sync**, conforme o cenário de laboratório e a documentação atual.

### Por quê?

A sincronização cria uma relação entre identidade on-premises e cloud.

## PASSO 3 — Escopo limitado

Sincronize somente a OU de laboratório.

## PASSO 4 — Sincronizar

Sincronize `LAB-ANA`.

### Resultado esperado

O usuário aparece como sincronizado no Entra.

## PASSO 5 — Alterar atributo

Altere um atributo no AD e sincronize.

### Resultado esperado

A alteração chega ao Entra.

## PASSO 6 — Troubleshooting

Quebre deliberadamente DNS ou credencial/configuração do agente em ambiente isolado.

Investigue logs e restaure.

### O que você aprendeu

Source of authority, sync scope, identidade híbrida e troubleshooting.

---

# 26 — IGA + RBAC + ABAC + SoD

## Cenário

Finance possui funções incompatíveis.

## PASSO 1 — Criar roles

`FIN-REQUESTER`

`FIN-APPROVER`

## PASSO 2 — Criar entitlements

Defina permissões de cada role.

## PASSO 3 — Criar conflito SoD

`FIN-REQUESTER + FIN-APPROVER = CONFLITO`

### Por quê?

Uma pessoa que cria e aprova a própria operação pode gerar risco de fraude.

## PASSO 4 — Testar concessão

Atribua requester a Ana.

Tente conceder approver.

Registre a violação.

## PASSO 5 — Simular ABAC

Defina uma regra conceitual:

`Department = Finance AND Location = Brazil`

Compare com RBAC puro.

### O que você aprendeu

IGA, role engineering, SoD, ABAC e exceções.

---

# 27 — PAM COM TELEPORT COMMUNITY EDITION

## Cenário

Administrador precisa acessar Linux sem compartilhar senha privilegiada.

## PASSO 1 — Criar `LAB-LINUX01`

IP:

`192.168.56.30`

Instale SSH.

## PASSO 2 — Criar `LAB-TELEPORT`

IP:

`192.168.56.20`

Instale Teleport Community Edition conforme a documentação da versão utilizada.

## PASSO 3 — Registrar servidor

Adicione `LAB-LINUX01` ao cluster Teleport.

## PASSO 4 — Criar role de menor privilégio

Permita acesso somente ao servidor necessário.

## PASSO 5 — Acessar

Entre via Teleport e execute:

`whoami`

`hostname`

`id`

## PASSO 6 — Session recording/auditoria

Consulte eventos e gravação disponíveis na edição instalada.

## PASSO 7 — Access Request CE

Pratique role request pela CLI (`tsh request create`) e aprovação administrativa (`tctl`), conforme suporte da versão.

## PASSO 8 — Negar

Remova a role e tente novamente.

### Resultado esperado

Acesso privilegiado controlado e auditável.

> **Limite:** CE não é equivalente às capacidades Enterprise de PAM/Access Requests.

### O que você aprendeu

PAM, privileged access, RBAC, sessão, auditoria e acesso temporário.

---

# 28 — CLOUD IAM

## PASSO 1 — Azure

Use `Virtual Machine Contributor` em `rg-iam-lab`.

## PASSO 2 — AWS

Em conta de laboratório, crie uma role/policy de leitura com menor privilégio.

## PASSO 3 — Testar

Faça leitura e tente alteração.

### Resultado esperado

Leitura funciona; alteração é negada.

## PASSO 4 — Comparar

| Conceito | Azure | AWS |
|---|---|---|
| Autorização | Azure RBAC | IAM Policy |
| Identidade de workload | Managed Identity | IAM Role |
| Escopo | Resource/Resource Group/Subscription | Resource/Account/Policy |
| Federação | Entra/OIDC/SAML | IAM Identity Center/OIDC/SAML |

### O que você aprendeu

IAM é um modelo, não uma ferramenta.

---

# 29 — ITSM + AUDITORIA

## Cenário

Maria solicita acesso a uma aplicação.

## PASSO 1 — Abrir solicitação

Crie `docs/itsm/REQ-001.md` com:

- solicitante;
- usuário;
- aplicação;
- acesso;
- justificativa;
- aprovador;
- data;
- resultado.

## PASSO 2 — Aprovar

Use aprovador separado.

## PASSO 3 — Conceder

Aplique grupo/role.

## PASSO 4 — Registrar evidência

Cole referências aos logs e alterações.

## PASSO 5 — Revogar

Remova o acesso e registre a data.

### Perguntas de auditoria

`Quem pediu? Quem aprovou? Quem concedeu? O quê? Quando? Por quanto tempo? Qual evidência?`

### O que você aprendeu

ITSM, approval, evidência, auditoria e rastreabilidade.

---

# 30 — ZERO TRUST

## PASSO 1 — Mapear princípios

`Verify explicitly`

`Use least privilege`

`Assume breach`

## PASSO 2 — Relacionar controles

| Princípio | Laboratório |
|---|---|
| Verify explicitly | MFA + CA + Identity Protection |
| Least privilege | RBAC + PIM |
| Assume breach | logs + audit + PAM |

## PASSO 3 — Demonstrar

Use Ana para provar que identidade autenticada não significa acesso irrestrito.

### O que você aprendeu

Zero Trust aplicado, não apenas conceitualmente.

---

# 31 — IAM METRICS

## PASSO 1 — Criar dataset fictício

Registre:

- total de usuários;
- MFA ativo;
- contas privilegiadas;
- contas permanentes;
- acessos revisados;
- acessos removidos;
- contas sem owner;
- tempo de provisioning;
- tempo de revogação.

## PASSO 2 — Calcular indicadores

Exemplos:

`MFA Coverage = usuários MFA / usuários totais × 100`

`Review Completion = reviews concluídos / reviews planejados × 100`

## PASSO 3 — Produzir relatório

Crie `docs/metrics/iam-dashboard.md`.

### O que você aprendeu

Medir eficácia de IAM e comunicar risco.

---

# 32 — PROJETO FINAL

## Cenário

Você é responsável pelo IAM de uma empresa fictícia.

## PASSO 1 — Criar identidades

`ANA-FIN`

`JOAO-IT`

`CARLA-HR`

`ADMIN-IAM`

## PASSO 2 — Criar grupos

`GRP-FINANCE`

`GRP-IT`

`GRP-HR`

`GRP-IAM-READONLY`

## PASSO 3 — Criar roles

Documente a matriz:

`docs/architecture/role-matrix.md`

## PASSO 4 — Proteger autenticação

MFA + CA + Identity Protection.

## PASSO 5 — Implementar autorização

RBAC + least privilege.

## PASSO 6 — JML

Execute Joiner → Mover → Leaver.

## PASSO 7 — SSO

Integre uma aplicação OIDC ou SAML.

## PASSO 8 — Provisioning

Execute SCIM.

## PASSO 9 — Automação

Execute PowerShell + Graph.

## PASSO 10 — Governance

Execute Access Package/Access Review quando disponível.

## PASSO 11 — Privilege

Execute PIM com a licença P2.

## PASSO 12 — PAM

Acesse Linux pelo Teleport.

## PASSO 13 — Auditoria

Prove criação, autenticação, concessão, privilégio, revisão e revogação.

### Resultado final

Você deve conseguir demonstrar:

`Identity → Authentication → Authorization → Provisioning → Governance → Privilege → Audit → Revocation`

---

# 33 — DESAFIO DE ENTREVISTA

## Cenário

Maria entra como Analista Financeiro, muda para IT e depois deixa a empresa.

## Execute sem consultar o manual

1. Criar identidade.
2. Aplicar grupo.
3. Aplicar role.
4. Exigir MFA.
5. Integrar aplicação.
6. Consultar logs.
7. Mover Finance → IT.
8. Remover acessos antigos.
9. Conceder novos acessos.
10. Fazer review.
11. Ativar privilégio temporário com PIM.
12. Acessar servidor pelo PAM.
13. Desligar Maria.
14. Revogar acessos.
15. Produzir evidências.

### Você passou se conseguir explicar

- autenticação × autorização;
- RBAC × ABAC;
- JML;
- SoD;
- SSO;
- SAML;
- OAuth;
- OIDC;
- SCIM;
- service principal;
- workload identity;
- Access Review;
- PIM;
- PAM;
- least privilege;
- auditoria.

---

# 🧭 PLAYBOOK UNIVERSAL DE TROUBLESHOOTING

Quando algo falhar:

1. Identifique o usuário/aplicação.
2. Confirme se a identidade está habilitada.
3. Verifique autenticação.
4. Verifique MFA.
5. Verifique Conditional Access.
6. Verifique grupos.
7. Verifique role.
8. Verifique scope.
9. Verifique aplicação/Enterprise App.
10. Verifique token/claims.
11. Verifique API permissions.
12. Verifique logs.
13. Reproduza.
14. Corrija o menor componente possível.
15. Repita o teste.
16. Revogue a alteração de laboratório.
17. Registre causa e solução.

---

# 📸 EVIDÊNCIAS

Para cada módulo, salve somente evidências sem secrets:

```text
01-IAM/
├── evidencias/
│   ├── 01-ambiente/
│   ├── 05-rbac/
│   ├── 08-conditional-access/
│   ├── 12-oidc/
│   ├── 13-saml/
│   ├── 17-scim/
│   ├── 19-automation/
│   ├── 21-entitlement/
│   ├── 22-access-reviews/
│   ├── 23-pim/
│   ├── 27-pam/
│   └── 29-audit/
├── docs/
│   ├── architecture/
│   ├── iga/
│   ├── itsm/
│   └── metrics/
└── scripts/
    ├── powershell/
    └── graph/
```

Nunca publique senhas, tokens, client secrets, private keys ou dados reais.

---

# ✅ CHECKPOINT

Antes de avançar:

- [ ] Executei todos os passos.
- [ ] Entendi por que cada configuração existe.
- [ ] Vi o resultado esperado.
- [ ] Fiz o teste negativo.
- [ ] Investiguei o erro.
- [ ] Corrigi.
- [ ] Revoguei o acesso quando aplicável.
- [ ] Registrei evidência.
- [ ] Consigo explicar sem consultar o manual.
- [ ] Consigo repetir sozinho.

> **Regra:** terminar a leitura não significa dominar o módulo. Domínio = configurar + testar + quebrar + investigar + corrigir + revogar + explicar.

## 🎯 Progressão

| Nível | Evidência prática |
|---|---|
| 🟢 Básico | identidade, AD/Entra, grupos, RBAC, MFA |
| 🔵 Júnior | JML, CA, logs, SSO, protocolos |
| 🟣 Pleno | SCIM, Graph, PowerShell, IGA, SoD, reviews |
| 🟠 Avançado | PIM, PAM, cloud IAM, workload identity, ABAC |
| 🔴 Sênior | arquitetura, governança, métricas, Zero Trust e controles auditáveis |

## 📚 Referências oficiais

- Microsoft Entra: https://learn.microsoft.com/entra/
- Microsoft Entra licensing: https://learn.microsoft.com/entra/fundamentals/licensing
- Entra Identity Governance: https://learn.microsoft.com/entra/id-governance/
- Microsoft Graph: https://learn.microsoft.com/graph/
- OAuth: https://www.rfc-editor.org/rfc/rfc6749
- OpenID Connect: https://openid.net/specs/openid-connect-core-1_0.html
- SAML: https://www.oasis-open.org/standard/saml/
- SCIM: https://www.rfc-editor.org/rfc/rfc7644
- NIST Digital Identity Guidelines: https://pages.nist.gov/800-63-4/
- Teleport Community Edition: https://goteleport.com/docs/get-started/deploy-community/
