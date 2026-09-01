# 🟦 IAM Study Lab — Microsoft Entra ID do básico ao avançado

> **Objetivo:** aprender IAM executando tarefas reais em um laboratório controlado, com foco em Microsoft Entra ID, Active Directory, IGA, PAM, automação e auditoria.
>
> **Método obrigatório:** `configurar → testar → teste negativo → investigar → corrigir → revogar → evidenciar → explicar`.
>
> **Licenciamento do laboratório:** o projeto foi desenhado para funcionar com **1 única licença Microsoft Entra ID P2**, atribuída à conta `LAB-P2`. Os demais usuários são contas de teste e recebem somente os recursos que não exigem P2. **Não coloque uma política baseada em risco em usuários sem P2**; para esse exercício, o alvo será somente `LAB-P2`. Acesso Condicional comum é P1; políticas baseadas em risco usam ID Protection/P2. PIM exige licença para usuários com atribuições elegíveis ou com prazo definido. Access Reviews devem usar um único reviewer `LAB-P2`; não use self-review dos usuários sem P2. Entitlement Management e Lifecycle Workflows ficam em exercícios controlados/condicionados à licença disponível no tenant.
>
> **Regra de segurança:** nunca publique senha, secret, token, chave privada, cookie, código MFA, arquivo de configuração sensível ou dado real.

---

## 🧭 Navegação

| Módulo | Tema | Nível |
|---|---|---|
| 00 | Como usar o laboratório | Base |
| 01 | Ambiente e VirtualBox | Base |
| 02 | IAM Fundamentals | Base |
| 03 | Active Directory | Base |
| 04 | Entra Users, Groups e atributos | Base |
| 05 | Administrative Units e least privilege | Base |
| 06 | Azure RBAC | Júnior |
| 07 | MFA e métodos de autenticação | Júnior |
| 08 | Conditional Access | Júnior |
| 09 | Identity Protection — P2 | Pleno |
| 10 | Logs e troubleshooting | Júnior |
| 11 | SSO, OAuth 2.0 e OIDC | Júnior/Pleno |
| 12 | SAML 2.0 | Júnior/Pleno |
| 13 | App Registrations e Service Principals | Pleno |
| 14 | Workload Identity e Managed Identity | Pleno |
| 15 | SCIM e provisioning | Pleno |
| 16 | Microsoft Graph | Pleno |
| 17 | PowerShell e automação | Pleno |
| 18 | JML — Joiner/Mover/Leaver | Pleno |
| 19 | IGA, RBAC, ABAC e SoD | Pleno |
| 20 | Entitlement Management | Pleno |
| 21 | Access Reviews | Pleno |
| 22 | PIM — única P2 | Avançado |
| 23 | B2B / External ID | Pleno |
| 24 | Hybrid Identity — AD + Entra | Avançado |
| 25 | PAM com Teleport Community Edition | Avançado |
| 26 | Cloud IAM — Azure/AWS | Avançado |
| 27 | ITSM, auditoria e evidências | Pleno |
| 28 | Zero Trust | Avançado |
| 29 | Métricas de IAM | Avançado |
| 30 | Projeto final | Sênior |
| 31 | Desafio de entrevista | Sênior |

---

# 00 — COMO USAR O LABORATÓRIO

## Regra de cada módulo

Não avance apenas porque a configuração funcionou.

Você termina um módulo somente quando consegue responder:

1. **O que configurei?**
2. **Por que configurei?**
3. **Quem foi afetado?**
4. **Qual permissão foi concedida?**
5. **Qual foi o scope?**
6. **Como provei que funcionou?**
7. **Como provei que o acesso indevido foi negado?**
8. **Onde encontrei o log?**
9. **Como revoguei?**
10. **Como explicaria isso em uma entrevista?**

## Padrão de exercício

Cada exercício deve possuir:

```text
PASSO 1 → preparar
PASSO 2 → configurar
PASSO 3 → validar resultado positivo
PASSO 4 → provocar falha controlada
PASSO 5 → investigar
PASSO 6 → corrigir
PASSO 7 → revogar/limpar
PASSO 8 → registrar evidência
PASSO 9 → explicar o conhecimento adquirido
```

## Convenção de contas

| Conta | Licença P2 | Função |
|---|---:|---|
| `LAB-ADMIN` | Não | configuração administrativa do tenant |
| `LAB-P2` | **Sim — única P2** | PIM, ID Protection e exercícios avançados licenciados |
| `LAB-USER01` | Não | usuário comum para CA/MFA/SSO |
| `LAB-USER02` | Não | segundo usuário para testes comparativos |
| `LAB-BREAKGLASS` | Não | emergência; não usar no dia a dia |

### ⚠️ Regra de licenciamento

`LAB-ADMIN` pode **configurar** políticas sem ser o usuário beneficiado pelo recurso P2.

Mas uma política baseada em risco **não deve ser aplicada a `LAB-USER01` ou `LAB-USER02` neste laboratório**, porque o cenário de P2 deve permanecer restrito à única identidade licenciada.

Assim:

```text
LAB-ADMIN
   │
   ├── configura CA comum ───────────→ LAB-USER01 / LAB-USER02
   │
   ├── configura CA baseada em risco → LAB-P2
   │
   └── configura PIM ────────────────→ LAB-P2
```

---

# 01 — AMBIENTE E VIRTUALBOX

## Objetivo

Construir uma rede isolada, economizando RAM e evitando que testes afetem o ambiente real.

## PASSO 1 — Criar rede Host-only

Abra:

**VirtualBox → Tools → Network Manager → Host-only Networks → Create**.

Configure:

| Campo | Valor |
|---|---|
| IPv4 Address | `192.168.56.1` |
| IPv4 Network Mask | `255.255.255.0` |
| DHCP Server | **desativado** |

### Por que o DHCP do VirtualBox fica desligado?

Porque o laboratório terá um **único DHCP**, o `LAB-DC01`. Dois DHCPs na mesma rede podem entregar configurações diferentes para o mesmo cliente.

## PASSO 2 — Criar VMs

| VM | Função | IP | RAM inicial |
|---|---|---|---:|
| `LAB-DC01` | AD DS + DNS + DHCP | `192.168.56.10` | 4 GB |
| `LAB-WIN11` | cliente Windows | DHCP | 4 GB |
| `LAB-LINUX01` | alvo PAM | `192.168.56.30` | 2 GB |
| `LAB-TELEPORT` | PAM | `192.168.56.20` | 2 GB |

Não mantenha todas ligadas.

### Estratégia de RAM

- AD: ligado quando estudar AD/híbrido.
- Windows: ligado quando testar GPO/cliente.
- Linux + Teleport: ligados somente no módulo PAM.
- Entra: os exercícios cloud não exigem todas as VMs locais.

## PASSO 3 — Configurar adaptador das VMs

Em cada VM:

**Settings → Network → Adapter 1 → Enable Network Adapter → Host-only Adapter**.

Selecione a rede criada.

### Por que Host-only?

Permite comunicação entre host e VMs sem expor o laboratório diretamente à rede física.

## PASSO 4 — Configurar IP do DC

No Windows Server:

**Settings → Network Connections → Ethernet → Properties → IPv4**.

Configure:

```text
IP:      192.168.56.10
Mask:    255.255.255.0
Gateway: deixar vazio no laboratório isolado
DNS:     192.168.56.10 após instalar DNS
```

## PASSO 5 — Validar

No cliente:

```text
ipconfig /all
ping 192.168.56.10
```

### Resultado esperado

O cliente recebe IP pelo DHCP do Windows Server quando esse serviço estiver configurado e consegue alcançar o DC.

### Teste negativo

Desligue o DC.

Renove o IP do cliente.

### Resultado esperado

O DHCP do VirtualBox não assume o serviço.

### Conhecimento adquirido

Segmentação de laboratório, DHCP, DNS, IP estático, isolamento e dependências de infraestrutura.

---

# 02 — IAM FUNDAMENTALS

## Objetivo

Entender a cadeia:

`Identidade → autenticação → autorização → recurso → auditoria`.

## PASSO 1 — Criar usuário

No Entra:

**Identity → Users → All users → New user**.

Crie `LAB-USER01`.

### Por que criar um usuário?

IAM administra identidades que precisam autenticar e receber autorizações.

## PASSO 2 — Criar grupo

**Identity → Groups → New group**.

Crie:

`GRP-FINANCE`

Adicione `LAB-USER01`.

### Por que usar grupo?

O grupo desacopla a identidade individual da autorização. Em ambiente corporativo, o acesso deve preferencialmente ser atribuído por função/grupo, não manualmente usuário por usuário.

## PASSO 3 — Diferenciar conceitos

Documente:

```text
Identidade = representação de uma pessoa/sistema
Conta = objeto usado para acesso
Credencial = mecanismo usado para provar identidade
Autenticação = provar quem é
Autorização = determinar o que pode fazer
Entitlement = permissão/acesso concedido
Role = conjunto lógico de permissões
Privilege = capacidade administrativa/especial
```

### Teste

Pergunte a si mesmo:

> “MFA resolve autorização?”

Resposta esperada: **não**. MFA fortalece autenticação; autorização continua sendo controlada por roles, grupos, políticas e scopes.

---

# 03 — ACTIVE DIRECTORY

## Objetivo

Aprender o diretório corporativo que ainda aparece em grande parte dos ambientes híbridos.

## PASSO 1 — Instalar AD DS

No `LAB-DC01`:

**Server Manager → Add Roles and Features → Role-based installation → Active Directory Domain Services → Install**.

Após instalar:

**Promote this server to a domain controller**.

Escolha:

**Add a new forest**.

Domínio:

`lab.local`

Reinicie.

## PASSO 2 — Validar DNS

No DC:

```text
nslookup lab.local
```

### Por que DNS é crítico?

AD depende fortemente de DNS para localizar serviços do domínio.

## PASSO 3 — Criar OUs

Abra:

**Active Directory Users and Computers**.

Crie:

```text
OU=Users
OU=Groups
OU=Servers
OU=Workstations
OU=Disabled
```

## PASSO 4 — Criar grupos

Crie:

```text
GG-FINANCE
GG-IT
GG-IAM
```

Adicione usuários aos grupos conforme a função.

## PASSO 5 — Criar GPO de auditoria

Abra:

**Group Policy Management → OU de laboratório → Create a GPO in this domain**.

Nome:

`GPO-LAB-AUDIT`

Configure auditoria somente para os eventos necessários ao estudo.

### Por que não usar a Default Domain Policy para tudo?

Porque separar configurações por finalidade facilita troubleshooting, rollback e governança.

## PASSO 6 — Entrar uma estação no domínio

No `LAB-WIN11`:

**Settings → System → About → Advanced system settings → Computer Name → Change**.

Escolha **Domain** e informe:

`lab.local`

Use credencial administrativa do domínio.

### Resultado esperado

A máquina aparece no AD e consegue autenticar no domínio.

### Teste negativo

Configure DNS incorreto no cliente e tente ingressar novamente.

### Resultado esperado

O ingresso falha ou apresenta problemas de descoberta do domínio.

### Conhecimento adquirido

AD DS, DNS, OU, grupos, GPO, domínio, autenticação de domínio e troubleshooting.

---

# 04 — ENTRA USERS, GROUPS E ATRIBUTOS

## PASSO 1 — Criar usuários

Crie:

```text
LAB-P2
LAB-USER01
LAB-USER02
LAB-BREAKGLASS
```

Atribua a licença P2 **somente a `LAB-P2`**.

## PASSO 2 — Criar grupos

```text
GRP-FINANCE
GRP-IT
GRP-IAM-READERS
GRP-IAM-ADMINS
GRP-LAB-CA-MFA
```

## PASSO 3 — Testar grupo como alvo de política

Coloque `LAB-USER01` em `GRP-LAB-CA-MFA`.

Use esse grupo em uma política de CA posterior.

### Por que grupo é melhor que usuário direto?

Permite governar populações inteiras e torna a política reutilizável.

## PASSO 4 — Estudar atributos

Observe:

- Department
- Job title
- Usage location
- Manager
- User type
- Account enabled

### Teste adicional

Altere `Department` de `Finance` para `IT` e observe o impacto em regras futuras.

### Conhecimento adquirido

Identidade, atributos, grupos, escopo e governança baseada em população.

---

# 05 — ADMINISTRATIVE UNITS + LEAST PRIVILEGE

## Objetivo

Aprender a restringir administração sem transformar todo operador em Global Administrator.

## PASSO 1 — Criar Administrative Unit

No Entra:

**Identity → Administrative Units → Add**.

Nome:

`AU-FINANCE`

## PASSO 2 — Adicionar usuário

Adicione `LAB-USER01`.

## PASSO 3 — Delegar administração

Crie uma conta operacional de laboratório e conceda somente a role compatível com o escopo que você quer testar.

### Por que isso importa?

Least privilege não significa apenas limitar o usuário final. Também significa limitar quem administra usuários.

## PASSO 4 — Teste positivo

O operador executa a tarefa dentro do escopo permitido.

## PASSO 5 — Teste negativo

O operador tenta administrar usuário fora do escopo.

### Resultado esperado

A operação é negada.

### Conhecimento adquirido

Delegação, escopo administrativo, blast radius e least privilege.

---

# 06 — AZURE RBAC

## Cenário

`LAB-USER01` administra VMs de um Resource Group, mas não a assinatura inteira.

## PASSO 1 — Criar Resource Group

**Azure Portal → Resource groups → Create**.

Nome:

`rg-iam-lab`

## PASSO 2 — Atribuir role

Abra:

**rg-iam-lab → Access control (IAM) → Add role assignment**.

Role:

`Virtual Machine Contributor`

Member:

`LAB-USER01`

Scope:

`rg-iam-lab`

### Por que esse scope?

A mesma role em subscription teria impacto muito maior.

## PASSO 3 — Teste positivo

Entre com `LAB-USER01` e execute uma operação permitida sobre uma VM do Resource Group.

## PASSO 4 — Teste negativo

Tente administrar recursos fora do Resource Group.

### Resultado esperado

Negado.

## PASSO 5 — Revogar

Remova a role.

Repita o teste positivo.

### Resultado esperado

O acesso deixa de funcionar.

### Conhecimento adquirido

Principal + role + scope, least privilege, concessão e revogação.

---

# 07 — MFA E MÉTODOS DE AUTENTICAÇÃO

## PASSO 1 — Registrar método

Entre como `LAB-USER01` e registre Microsoft Authenticator conforme o método permitido pelo tenant.

## PASSO 2 — Criar CA de MFA

A política será criada no módulo seguinte. Aqui, apenas confirme que o método está registrado.

## PASSO 3 — Testar autenticação

Faça login novamente quando a política estiver aplicada.

### Resultado esperado

O segundo fator é solicitado.

## PASSO 4 — Estudar Authentication Methods

No Entra, examine os métodos disponíveis e documente:

```text
Password
Microsoft Authenticator
FIDO2/passkeys
Temporary Access Pass
SMS/voice quando habilitados
```

### Teste adicional

Compare MFA por método com autenticação resistente a phishing.

### Conhecimento adquirido

MFA, métodos de autenticação, registro e authentication strength.

---

# 08 — CONDITIONAL ACCESS

## Regra

Comece sempre em **Report-only**.

A documentação atual da Microsoft recomenda planejamento, validação de impacto e uso de Report-only antes de aplicar políticas amplamente.

## PASSO 1 — Criar grupo de teste

Use:

`GRP-LAB-CA-MFA`

Membro:

`LAB-USER01`

## PASSO 2 — Criar política

Abra:

**Entra → Protection → Conditional Access → Policies → New policy**.

Nome:

`CA-LAB-01-MFA`

Users:

`GRP-LAB-CA-MFA`

Target resources:

`All cloud apps`

Grant:

`Require multifactor authentication`

Mode:

`Report-only`

## PASSO 3 — Validar

Faça login como `LAB-USER01`.

Abra:

**Monitoring & health → Sign-in logs**.

Abra o evento e observe a aba de Conditional Access.

## PASSO 4 — Ativar

Depois de validar, altere para **On**.

## PASSO 5 — Teste positivo

Login de `LAB-USER01`.

### Resultado esperado

MFA é exigido.

## PASSO 6 — Teste negativo

Exclua temporariamente o usuário do grupo ou altere o escopo da política.

Teste novamente.

### Objetivo

Entender que CA avalia condições e escopo, não simplesmente “liga MFA”.

## PASSO 7 — Testar What If

Use a ferramenta **What If** do Conditional Access para simular um usuário/aplicação/cenário.

### Conhecimento adquirido

Conditions, grant controls, exclusions, report-only, policy evaluation e troubleshooting.

---

# 09 — IDENTITY PROTECTION — ÚNICA P2

> **Licença:** somente `LAB-P2` participa do exercício P2.
>
> **Importante:** não coloque `LAB-USER01` ou `LAB-USER02` no escopo de uma política baseada em risco neste laboratório.

## PASSO 1 — Abrir ID Protection

**Entra → Protection → Identity Protection**.

Explore:

- Risky users
- Risky sign-ins
- Risk detections

## PASSO 2 — Criar grupo P2

Crie:

`GRP-LAB-P2`

Membro:

`LAB-P2`.

## PASSO 3 — Criar CA baseada em risco

Crie:

`CA-LAB-P2-SIGNIN-RISK`

Users:

`LAB-P2` somente.

Condition:

`Sign-in risk`.

Grant:

controle de MFA/remediação disponível no tenant.

Comece em `Report-only`.

### Por que somente `LAB-P2`?

Porque políticas de risco utilizam ID Protection/P2. O laboratório deve reproduzir o recurso sem criar uma falsa premissa de que uma única P2 licencia todos os usuários afetados.

## PASSO 4 — Analisar eventos

Faça login com `LAB-P2` e consulte Sign-in logs + Risk detections.

## PASSO 5 — Teste controlado

Use somente métodos de teste/documentados pelo tenant para produzir sinais de risco. **Não tente provocar comprometimento real ou ataque contra a conta.**

## PASSO 6 — Remediação

Observe como MFA/remediação altera o resultado do acesso quando o risco é aplicável.

### Conhecimento adquirido

Risky user, sign-in risk, risk remediation, risk-based CA e diferença entre CA comum e CA baseada em risco.

---

# 10 — LOGS E TROUBLESHOOTING

## PASSO 1 — Gerar login

Faça login como `LAB-USER01`.

## PASSO 2 — Abrir Sign-in logs

Analise:

```text
User
Application
IP
Location
Authentication requirement
Authentication details
Conditional Access
Status
Risk
```

## PASSO 3 — Criar falha

Remova `LAB-USER01` do grupo que recebe uma role.

Repita a operação.

## PASSO 4 — Investigar

Use esta ordem:

```text
1. Identidade existe?
2. Conta está habilitada?
3. Autenticação passou?
4. MFA passou?
5. Conditional Access permitiu?
6. Grupo correto?
7. Role correta?
8. Scope correto?
9. Aplicação correta?
10. Token/claims corretos?
11. API permission correta?
12. Logs explicam a falha?
```

## PASSO 5 — Corrigir o menor componente

Não conceda Global Administrator para “resolver”.

Corrija somente a causa.

### Conhecimento adquirido

Troubleshooting baseado em evidência.

---

# 11 — SSO + OAUTH 2.0 + OIDC

## Objetivo

Não decorar protocolos; observar o fluxo real.

## PASSO 1 — Criar App Registration

**Entra → App registrations → New registration**.

Nome:

`APP-OIDC-LAB`

## PASSO 2 — Configurar Redirect URI

Use uma aplicação de laboratório local ou um serviço de teste compatível.

## PASSO 3 — Executar Authorization Code Flow

Observe:

```text
Usuário
  ↓
Client
  ↓
Authorization Server
  ↓
Authorization Code
  ↓
Client
  ↓
Token Endpoint
  ↓
Access Token + ID Token quando OIDC
```

## PASSO 4 — Inspecionar ID Token

Identifique:

```text
iss
sub
aud
exp
iat
name
preferred_username
```

### Por que OIDC?

OAuth 2.0 é um framework de autorização. OIDC adiciona uma camada padronizada de autenticação/identidade.

## PASSO 5 — Teste negativo

Altere o Redirect URI cadastrado e repita.

### Resultado esperado

O fluxo deve ser rejeitado.

## PASSO 6 — Teste de scope

Solicite um scope que o cliente não possui.

### Resultado esperado

Falha de autorização/consentimento.

### Conhecimento adquirido

OAuth, OIDC, authorization code, access token, ID token, scopes, claims e redirect URI.

---

# 12 — SAML 2.0

## PASSO 1 — Criar Enterprise Application

**Entra → Enterprise applications → New application → Create your own application**.

Escolha integração SAML quando a aplicação de laboratório suportar.

## PASSO 2 — Configurar SP

Preencha:

```text
Identifier / Entity ID
Reply URL / ACS
Sign-on URL
```

## PASSO 3 — Configurar claims

Mapeie o identificador necessário pela aplicação.

## PASSO 4 — Login

Execute SSO.

Observe:

```text
IdP → SAML Response → Assertion → SP
```

### Por que isso importa?

A aplicação não precisa conhecer a senha do usuário; ela confia no IdP e valida a assertion.

## PASSO 5 — Teste negativo

Altere Entity ID ou ACS deliberadamente.

### Resultado esperado

A aplicação rejeita o fluxo.

## PASSO 6 — Investigar

Verifique claims, Entity ID, ACS, assinatura e certificado.

### Conhecimento adquirido

IdP, SP, assertion, claims, ACS, Entity ID e confiança federada.

---

# 13 — APP REGISTRATIONS + SERVICE PRINCIPALS

## PASSO 1 — Criar aplicação

Use `APP-IAM-LAB`.

## PASSO 2 — Identificar objetos

Documente:

```text
Application object
      ≠
Service Principal
```

### Explicação

O Application object descreve a aplicação. O Service Principal representa a identidade/instância usada pelo tenant.

## PASSO 3 — Localizar Service Principal

Abra:

**Enterprise applications → All applications → APP-IAM-LAB**.

## PASSO 4 — Atribuir RBAC mínimo

No `rg-iam-lab`, atribua uma role mínima ao Service Principal.

## PASSO 5 — Teste positivo

Execute a operação permitida.

## PASSO 6 — Teste negativo

Remova a role e repita.

### Resultado esperado

A operação falha por falta de autorização.

### Conhecimento adquirido

Identidades de aplicação, Service Principal e RBAC não humano.

---

# 14 — WORKLOAD IDENTITY + MANAGED IDENTITY

## PASSO 1 — Criar VM Azure de laboratório

Use uma VM pequena somente quando necessário.

## PASSO 2 — Ativar Managed Identity

Nas propriedades da VM:

**Identity → System assigned → On**.

## PASSO 3 — Conceder role mínima

No recurso alvo, atribua uma role de leitura.

## PASSO 4 — Testar

A aplicação/processo dentro da VM tenta acessar o recurso sem armazenar secret estático.

## PASSO 5 — Comparar

Documente:

```text
Client Secret
Certificate
Managed Identity
Workload Identity Federation
```

### Pergunta

> “Por que uma identidade de workload é melhor que um secret permanente?”

Resposta esperada: reduz exposição e necessidade de armazenar/rotacionar credenciais estáticas.

### Conhecimento adquirido

Workload identity, managed identity, service principal e credential lifecycle.

---

# 15 — SCIM + PROVISIONING

## Objetivo

Simular o fluxo que aparece em IAM/IGA corporativo:

`Entra → aplicação → usuário`.

## PASSO 1 — Preparar endpoint SCIM

Use um mock SCIM 2.0 ou aplicação de laboratório que ofereça endpoint SCIM.

## PASSO 2 — Testar endpoints

Valide:

```text
GET /Users
POST /Users
PATCH /Users/{id}
DELETE /Users/{id}
```

## PASSO 3 — Configurar Enterprise Application

Abra:

**Enterprise application → Provisioning**.

Configure endpoint e credencial de laboratório.

## PASSO 4 — Mapear atributos

Pratique:

```text
userName
active
displayName
emails
```

## PASSO 5 — Provisionar

Ative o usuário.

### Resultado esperado

Usuário criado no sistema alvo.

## PASSO 6 — Alterar

Altere um atributo no Entra e sincronize.

## PASSO 7 — Desprovisionar

Desative o usuário.

### Resultado esperado

O alvo recebe a alteração de lifecycle conforme o comportamento configurado.

## PASSO 8 — Teste negativo

Use endpoint/token inválido.

Investigue logs de provisioning.

### Conhecimento adquirido

Provisioning, deprovisioning, attribute mapping, SCIM e troubleshooting.

---

# 16 — MICROSOFT GRAPH

## PASSO 1 — Abrir Graph Explorer

Autentique com conta de laboratório.

## PASSO 2 — Consultar usuário

Faça um `GET` de `LAB-USER01`.

Observe atributos e object ID.

## PASSO 3 — Consultar grupos

Liste grupos e memberships.

## PASSO 4 — Testar operação de escrita

Execute somente uma alteração de laboratório para a qual a sessão tenha permissão.

## PASSO 5 — Teste negativo

Tente uma operação sem a permissão necessária.

### Resultado esperado

Erro de autorização.

## PASSO 6 — Relacionar com IAM

Documente:

```text
Graph API
   ↓
Permission
   ↓
Consent
   ↓
Token
   ↓
API
```

### Conhecimento adquirido

REST, Microsoft Graph, permissions, consent, token e troubleshooting.

---

# 17 — POWERSHELL + AUTOMAÇÃO

## Objetivo

Transformar operação manual em processo repetível.

## PASSO 1 — Criar CSV

Arquivo:

`users.csv`

Campos:

```text
Name
UserPrincipalName
Department
```

## PASSO 2 — Criar script

O script deve:

1. Ler CSV.
2. Validar dados.
3. Verificar se usuário existe.
4. Criar somente se não existir.
5. Adicionar grupo.
6. Gravar log.

## PASSO 3 — Testar idempotência

Execute duas vezes.

### Resultado esperado

A segunda execução não cria duplicatas.

## PASSO 4 — Criar offboarding

Fluxo:

```text
disable
→ remove group
→ revoke sessions quando aplicável
→ log
```

## PASSO 5 — Erro controlado

Informe um usuário inválido.

### Resultado esperado

O script registra o erro e continua de forma controlada.

### Conhecimento adquirido

PowerShell, Graph, idempotência, logging, tratamento de erro e automação IAM.

---

# 18 — JML — JOINER / MOVER / LEAVER

## Cenário

A mesma pessoa entra, muda de área e sai da empresa.

## PASSO 1 — JOINER

Crie:

`LAB-MARIA`

Atributos:

```text
Department = Finance
JobTitle = Financial Analyst
```

Adicione:

`GRP-FINANCE`

### Resultado esperado

Maria recebe o acesso de nascimento definido para Finance.

## PASSO 2 — MOVER

Altere:

`Finance → IT`

Remova:

`GRP-FINANCE`

Adicione:

`GRP-IT`

### Teste negativo

Maria tenta acessar recurso Finance.

### Resultado esperado

Acesso negado.

### Ponto importante

Mover não é somente **adicionar** acesso. É recalcular o acesso anterior e remover o que deixou de ser necessário.

## PASSO 3 — LEAVER

Execute:

```text
Disable account
→ remove groups
→ revoke sessions quando aplicável
→ remover roles
→ registrar evidência
```

### Resultado esperado

Maria não consegue continuar utilizando os acessos anteriores.

## PASSO 4 — Automatizar

Repita o fluxo usando PowerShell/Graph.

## PASSO 5 — Lifecycle Workflows

Estude a funcionalidade e execute somente se o tenant possuir a licença necessária. O conceito deve ser aprendido mesmo quando a execução estiver fora do escopo de licenciamento.

### Conhecimento adquirido

JML, birthright access, mover, leaver, revogação e automação de lifecycle.

---

# 19 — IGA + RBAC + ABAC + SOD

## Cenário

Uma empresa possui duas funções incompatíveis:

```text
FIN-REQUESTER
FIN-APPROVER
```

## PASSO 1 — Definir role

Documente os entitlements de cada role.

## PASSO 2 — Criar conflito

Regra:

```text
FIN-REQUESTER + FIN-APPROVER = CONFLITO SoD
```

## PASSO 3 — Testar

Atribua `FIN-REQUESTER` a `LAB-USER01`.

Simule tentativa de `FIN-APPROVER`.

## PASSO 4 — Registrar exceção

Se uma exceção for permitida, registre:

```text
Justificativa
Aprovador
Prazo
Risco
Mitigação
Data de revisão
```

## PASSO 5 — Comparar RBAC e ABAC

RBAC:

```text
User → Role → Permission
```

ABAC:

```text
User attributes
+ Resource attributes
+ Action
+ Environment
→ Decision
```

Exemplo:

```text
Department = Finance
AND Location = BR
AND Resource = FinanceApp
→ Allow
```

### Conhecimento adquirido

Role engineering, entitlement, SoD, ABAC, exceções e governança.

---

# 20 — ENTITLEMENT MANAGEMENT

> **Licenciamento:** Entitlement Management é um recurso de Identity Governance. O comportamento/licenciamento deve ser validado no tenant antes da execução. Para manter o laboratório com uma única P2, use a conta `LAB-P2` para o exercício executável; os demais usuários podem ser usados somente para desenho/documentação quando a licença do cenário não estiver disponível.

## PASSO 1 — Criar catálogo

**Entra → ID Governance → Entitlement management → Catalogs**.

Nome:

`CAT-FINANCE`

## PASSO 2 — Criar Access Package

Nome:

`PKG-FINANCE-ANALYST`

Inclua um grupo/aplicação de laboratório.

## PASSO 3 — Criar policy

Configure:

```text
Quem pode solicitar
Aprovação
Expiração
Perguntas/justificativa
```

## PASSO 4 — Executar com LAB-P2

Solicite o pacote como `LAB-P2`.

## PASSO 5 — Aprovação

Use o fluxo de aprovação que o tenant permitir sem exigir uma segunda identidade licenciada.

## PASSO 6 — Validar

Confirme o acesso concedido.

## PASSO 7 — Expirar/revogar

Force ou aguarde o término conforme a policy.

### Teste negativo

Tente solicitar um pacote fora do escopo permitido.

### Conhecimento adquirido

Catalog, Access Package, request, approval, lifecycle e entitlement.

---

# 21 — ACCESS REVIEWS

> **Estratégia de licença:** `LAB-P2` será o **único reviewer**. Não use self-review de `LAB-USER01`/`LAB-USER02`, pois isso adicionaria outra categoria de usuário que interage diretamente com a funcionalidade licenciada.

## PASSO 1 — Criar grupo de teste

Use:

`GRP-FINANCE`

Membros:

`LAB-USER01`

`LAB-USER02`

## PASSO 2 — Criar Access Review

**ID Governance → Access Reviews → New access review**.

População:

`GRP-FINANCE`

Reviewer:

`LAB-P2`

## PASSO 3 — Revisar

Como `LAB-P2`, marque:

```text
LAB-USER01 → Keep
LAB-USER02 → Remove
```

## PASSO 4 — Aplicar resultado

Execute a aplicação do resultado conforme configuração do review.

## PASSO 5 — Validar

Verifique membership antes/depois.

## PASSO 6 — Auditoria

Registre:

```text
Reviewer
Subject
Decision
Date
Applied result
```

### Teste adicional

Crie uma segunda revisão com decisão oposta e compare o resultado.

### Conhecimento adquirido

Recertificação, reviewer, decisão, aplicação e evidência.

---

# 22 — PIM — ÚNICA LICENÇA P2

## Objetivo

Aprender JIT sem precisar licenciar vários administradores.

## PASSO 1 — Usar `LAB-P2`

A única P2 do laboratório será a identidade que recebe a atribuição elegível.

## PASSO 2 — Atribuir role como Eligible

Abra:

**Entra → Privileged Identity Management → Microsoft Entra roles**.

Escolha uma role adequada ao exercício.

Atribua:

`Eligible`

Não use Global Administrator sem necessidade.

## PASSO 3 — Teste antes da ativação

Tente executar a tarefa administrativa.

### Resultado esperado

A permissão privilegiada não está ativa.

## PASSO 4 — Ativar

Como `LAB-P2`:

- Activate
- informar justificativa
- concluir MFA quando solicitado
- definir duração permitida

## PASSO 5 — Testar

Execute a tarefa administrativa.

### Resultado esperado

Funciona durante a ativação.

## PASSO 6 — Expirar

Aguarde a expiração ou use a duração mínima disponível.

Repita a tarefa.

### Resultado esperado

A permissão deixa de estar ativa.

## PASSO 7 — Auditar

Consulte:

- Activation history
- Audit logs
- Role assignments

## PASSO 8 — Teste de elevação

Tente ativar uma role diferente da necessária.

### Objetivo

Entender que PIM controla **qual privilégio**, **por quanto tempo** e **sob quais condições**.

### Conhecimento adquirido

Eligible, active, JIT, activation, MFA, justification, duration, least privilege e auditoria.

---

# 23 — B2B / EXTERNAL IDENTITY

## PASSO 1 — Criar convidado de teste

Use uma identidade externa controlada.

## PASSO 2 — Conceder acesso mínimo

Atribua somente a aplicação/grupo necessário.

## PASSO 3 — Testar

Entre como convidado.

## PASSO 4 — Verificar logs

Analise o Sign-in Log e o tipo de usuário.

## PASSO 5 — Revogar

Remova o acesso do convidado.

### Teste negativo

Tente acessar recurso não autorizado.

### Resultado esperado

Negado.

### Conhecimento adquirido

External identity, guest lifecycle, trust e least privilege.

---

# 24 — HYBRID IDENTITY — AD + ENTRA

## Objetivo

Entender o conceito de source of authority e sincronização.

## PASSO 1 — Preparar UPN

No AD, configure o UPN do usuário de laboratório para corresponder ao domínio verificado no tenant quando necessário.

## PASSO 2 — Escolher método

Estude:

```text
Microsoft Entra Cloud Sync
Microsoft Entra Connect Sync
```

Use a opção suportada pelo cenário atual do tenant.

## PASSO 3 — Limitar escopo

Sincronize **somente** a OU de laboratório.

### Por que limitar?

Evita trazer objetos reais ou desnecessários para o tenant.

## PASSO 4 — Sincronizar `LAB-ANA`

Valide o objeto no Entra.

Observe que a origem passa a ser híbrida/sincronizada.

## PASSO 5 — Alterar atributo no AD

Altere `Department`.

Sincronize.

### Resultado esperado

A alteração chega ao Entra conforme o mapeamento.

## PASSO 6 — Teste negativo

Interrompa o serviço/agente de sincronização no laboratório.

Observe o comportamento e os logs.

Restaure o serviço.

### Conhecimento adquirido

Source of authority, sync scope, UPN, atributos, AD Connect/Cloud Sync e troubleshooting híbrido.

---

# 25 — PAM COM TELEPORT COMMUNITY EDITION

> **Objetivo:** aprender PAM com ferramenta aberta. Teleport Community Edition permite estudar RBAC, acesso a servidores, sessões e um fluxo de Access Request via CLI. A experiência completa de Identity Governance/JIT Access Requests é recurso Enterprise; na CE, requests são feitos via `tsh` e aprovados por administrador usando `tctl` no Auth Service.

## PASSO 1 — Preparar Linux

`LAB-LINUX01`:

```text
IP: 192.168.56.30
SSH: habilitado
```

Crie um usuário de laboratório sem privilégios excessivos.

## PASSO 2 — Instalar Teleport

Na `LAB-TELEPORT`, siga a documentação oficial da versão instalada.

Não fixe comandos antigos no manual sem validar a versão.

## PASSO 3 — Registrar o servidor

Adicione `LAB-LINUX01` ao cluster Teleport.

## PASSO 4 — Criar role mínima

A role deve permitir somente o acesso ao recurso necessário.

## PASSO 5 — Login

Use `tsh login` conforme o cluster.

Depois execute:

```text
whoami
hostname
id
```

## PASSO 6 — Auditar sessão

Consulte eventos e recursos de gravação disponíveis na versão CE instalada.

## PASSO 7 — Access Request CE

Crie uma role que possa solicitar uma role elevada.

Use o fluxo CLI documentado para CE:

```text
tsh request create
```

A aprovação/negação deve ser feita pelo administrador via `tctl` no Auth Service.

## PASSO 8 — Teste negativo

Negue a request.

Tente novamente acessar o recurso elevado.

### Resultado esperado

A elevação não ocorre.

## PASSO 9 — Limitar duração

Use `max_session_ttl`/configuração equivalente quando suportado pela versão para estudar acesso temporário.

### Conhecimento adquirido

PAM, RBAC, privileged access, session control, audit, request/approval e JIT conceitual.

---

# 26 — CLOUD IAM — AZURE + AWS

## Azure

### PASSO 1

Crie uma role mínima no `rg-iam-lab`.

### PASSO 2

Teste ação permitida.

### PASSO 3

Teste ação negada.

## AWS

Somente em conta de laboratório.

### PASSO 4

Crie uma IAM Role de leitura.

### PASSO 5

Teste leitura.

### PASSO 6

Tente alteração.

### Resultado esperado

Leitura funciona; alteração é negada.

## Comparação

| Conceito | Azure | AWS |
|---|---|---|
| Autorização | Azure RBAC | IAM Policy |
| Identidade de workload | Managed Identity | IAM Role |
| Escopo | Resource / RG / Subscription | Resource / Account |
| Federação | SAML/OIDC/Entra | SAML/OIDC/Identity Center |

### Conhecimento adquirido

IAM é um modelo de segurança aplicado por plataformas diferentes.

---

# 27 — ITSM + AUDITORIA

## Cenário

`LAB-USER01` solicita acesso à aplicação Finance.

## PASSO 1 — Criar solicitação

Arquivo:

`docs/itsm/REQ-001.md`

Inclua:

```text
Solicitante
Usuário
Aplicação
Acesso solicitado
Justificativa
Aprovador
Data
Resultado
```

## PASSO 2 — Aprovar

Registre quem aprovou e por quê.

## PASSO 3 — Conceder

Use grupo/role, não permissão manual na aplicação quando houver alternativa.

## PASSO 4 — Evidenciar

Relacione:

```text
Request
→ Approval
→ Role assignment
→ Sign-in
→ Audit log
```

## PASSO 5 — Revogar

Remova acesso e registre data/hora.

### Perguntas de auditoria

```text
Quem pediu?
Quem aprovou?
Quem concedeu?
Qual acesso?
Por quê?
Quando?
Por quanto tempo?
Qual evidência?
Quando foi revogado?
```

### Conhecimento adquirido

ITSM, approval, evidence, audit trail e accountability.

---

# 28 — ZERO TRUST

## PASSO 1 — Três princípios

```text
Verify explicitly
Use least privilege
Assume breach
```

## PASSO 2 — Relacionar com o laboratório

| Princípio | Controle |
|---|---|
| Verify explicitly | MFA + CA + risk signals |
| Least privilege | RBAC + PIM + PAM |
| Assume breach | logs + audit + revocation |

## PASSO 3 — Demonstrar

`LAB-USER01` autentica corretamente, mas não consegue acessar um recurso fora de sua autorização.

### Resultado esperado

Você consegue explicar por que **autenticação bem-sucedida não significa autorização total**.

### Conhecimento adquirido

Zero Trust aplicado à identidade.

---

# 29 — IAM METRICS

## PASSO 1 — Criar dataset

Registre:

```text
Total users
MFA coverage
Privileged accounts
Eligible privileged accounts
Permanent privileged accounts
Access reviews completed
Access removed
Orphan accounts
Provisioning time
Deprovisioning time
Failed sign-ins
```

## PASSO 2 — Calcular

```text
MFA Coverage = MFA users / Total users × 100

Review Completion = Completed / Planned × 100

Privileged Permanent Rate = Permanent privileged / Total privileged × 100
```

## PASSO 3 — Criar relatório

Arquivo:

`docs/metrics/iam-dashboard.md`

## PASSO 4 — Interpretar

Não basta mostrar 98% de MFA.

Pergunte:

> “Quais 2% estão sem MFA e por quê?”

### Conhecimento adquirido

Métricas, risco, exceções e comunicação executiva.

---

# 30 — PROJETO FINAL — IAM CORPORATIVO

## Cenário

Empresa fictícia:

```text
Finance
IT
HR
IAM
```

## PASSO 1 — Criar identidades

```text
ANA-FIN
JOAO-IT
CARLA-HR
LAB-P2
```

## PASSO 2 — Criar grupos

```text
GRP-FINANCE
GRP-IT
GRP-HR
GRP-IAM-READONLY
```

## PASSO 3 — Definir role matrix

Arquivo:

`docs/architecture/role-matrix.md`

Para cada role:

```text
Role
Business purpose
Entitlements
Owner
Approver
SoD conflict
Review frequency
```

## PASSO 4 — Autenticação

Implemente:

```text
MFA
CA comum
CA baseada em risco somente para LAB-P2
```

## PASSO 5 — Autorização

Implemente:

```text
RBAC
Least privilege
Administrative delegation
```

## PASSO 6 — JML

Execute:

```text
Joiner
→ Mover
→ Leaver
```

## PASSO 7 — SSO

Integre uma aplicação via OIDC ou SAML.

## PASSO 8 — Provisioning

Execute SCIM.

## PASSO 9 — Automação

Execute PowerShell + Graph.

## PASSO 10 — Governance

Execute Access Review com `LAB-P2` como único reviewer.

Use Entitlement Management somente conforme o licenciamento disponível.

## PASSO 11 — Privileged Access

Execute PIM somente com `LAB-P2`.

## PASSO 12 — PAM

Acesse Linux pelo Teleport CE.

## PASSO 13 — Auditoria

Prove:

```text
Identity
→ Authentication
→ Authorization
→ Provisioning
→ Governance
→ Privilege
→ PAM
→ Audit
→ Revocation
```

---

# 31 — DESAFIO DE ENTREVISTA

## Cenário

Maria entra como Analista Financeiro, muda para IT e depois deixa a empresa.

Execute **sem consultar o manual**:

1. Criar identidade.
2. Definir atributos.
3. Aplicar grupo Finance.
4. Aplicar role.
5. Exigir MFA.
6. Integrar aplicação.
7. Consultar logs.
8. Mover Finance → IT.
9. Remover acessos antigos.
10. Conceder novos acessos.
11. Executar Access Review.
12. Ativar privilégio temporário com PIM usando `LAB-P2`.
13. Acessar Linux pelo PAM.
14. Desligar Maria.
15. Revogar acessos.
16. Produzir evidências.

## Perguntas que você precisa responder

- Autenticação vs autorização?
- RBAC vs ABAC?
- O que é JML?
- O que é birthright access?
- O que é SoD?
- O que é entitlement?
- O que é SSO?
- SAML vs OIDC?
- OAuth 2.0 é autenticação?
- O que é SCIM?
- Application object vs Service Principal?
- O que é workload identity?
- O que é Access Review?
- O que é PIM?
- O que é PAM?
- Como funciona least privilege?
- Como investigar um login negado?
- Como provar para auditoria que um acesso foi autorizado?

---

# 🧪 TESTES ADICIONAIS OBRIGATÓRIOS

Depois de concluir os módulos, execute estes cenários sem alterar o desenho do laboratório:

## Teste A — Usuário certo, role errada

Usuário autenticado corretamente, mas sem role.

**Esperado:** autorização negada.

## Teste B — Role certa, scope errado

A role existe, mas foi atribuída a outro Resource Group.

**Esperado:** negado.

## Teste C — CA bloqueia

Usuário possui permissão, mas CA bloqueia a autenticação.

**Esperado:** não chega à autorização do recurso.

## Teste D — MFA satisfeito, autorização ausente

Usuário passa MFA, mas não possui role.

**Esperado:** autenticação passa; autorização falha.

## Teste E — PIM inativo

`LAB-P2` possui role elegível, mas não ativada.

**Esperado:** privilégio não está ativo.

## Teste F — PIM ativo

Ative a role.

**Esperado:** privilégio temporário funciona.

## Teste G — Expiração PIM

Espere expirar.

**Esperado:** privilégio deixa de funcionar.

## Teste H — JML Mover

Finance → IT.

**Esperado:** acesso Finance removido e IT concedido.

## Teste I — Leaver

Bloqueie usuário.

**Esperado:** autenticação e acessos são revogados conforme o fluxo.

## Teste J — SSO quebrado

Altere ACS/Redirect URI.

**Esperado:** login falha.

## Teste K — SCIM quebrado

Use token inválido.

**Esperado:** provisioning falha e gera evidência.

## Teste L — API sem consentimento

Execute chamada Graph sem permissão.

**Esperado:** erro de autorização.

## Teste M — PAM negado

Remova role Teleport.

**Esperado:** acesso ao recurso privilegiado é negado.

## Teste N — Auditoria

Depois de todos os testes, responda:

> “Consigo reconstruir quem fez o quê, quando, com qual permissão e por qual motivo?”

---

# 🧭 PLAYBOOK UNIVERSAL DE TROUBLESHOOTING

Sempre siga esta ordem:

```text
01. Identidade
02. Estado da conta
03. Autenticação
04. MFA
05. Conditional Access
06. Grupo
07. Role
08. Scope
09. Aplicação
10. Token / claims
11. API permission
12. Provisioning
13. Logs
14. Causa raiz
15. Correção mínima
16. Novo teste
17. Revogação / cleanup
18. Evidência
```

## Regra de investigação

Nunca resolva:

```text
"acesso negado"
```

com:

```text
Global Administrator
```

Descubra **qual autorização está faltando**.

---

# 📁 EVIDÊNCIAS DO LABORATÓRIO

Estrutura sugerida:

```text
01-IAM/
├── IAM-Study-Lab.md
├── evidencias/
│   ├── 01-ambiente/
│   ├── 03-active-directory/
│   ├── 06-rbac/
│   ├── 08-conditional-access/
│   ├── 09-identity-protection/
│   ├── 11-oidc/
│   ├── 12-saml/
│   ├── 15-scim/
│   ├── 16-graph/
│   ├── 17-automation/
│   ├── 18-jml/
│   ├── 21-access-reviews/
│   ├── 22-pim/
│   ├── 24-hybrid/
│   ├── 25-pam/
│   └── 27-audit/
├── docs/
│   ├── architecture/
│   ├── iga/
│   ├── itsm/
│   └── metrics/
└── scripts/
    ├── powershell/
    └── graph/
```

## O que salvar

- screenshots de configuração;
- screenshots de resultado positivo;
- screenshots de resultado negativo;
- logs relevantes;
- matriz de roles;
- fluxos JML;
- scripts;
- relatórios;
- decisões de SoD.

## O que nunca salvar

- senha;
- client secret;
- refresh token;
- access token;
- private key;
- QR code de MFA;
- cookie de sessão;
- dados reais.

---

# ✅ CHECKPOINT POR MÓDULO

Antes de marcar um módulo como concluído:

- [ ] Configurei sozinho.
- [ ] Sei por que a configuração existe.
- [ ] Sei quem foi afetado.
- [ ] Validei resultado positivo.
- [ ] Executei teste negativo.
- [ ] Investiguei o erro.
- [ ] Corrigi a causa.
- [ ] Revoguei/limpei o laboratório.
- [ ] Registrei evidência.
- [ ] Consigo explicar o conceito.
- [ ] Consigo repetir sem consultar o passo a passo.

> **Domínio = executar + quebrar + investigar + corrigir + revogar + explicar.**

---

# 🎯 MATRIZ DE EVOLUÇÃO

| Nível | Você precisa demonstrar |
|---|---|
| 🟢 Base | IAM fundamentals, AD, Entra, users, groups, DNS, GPO |
| 🔵 Júnior | RBAC, MFA, CA, SSO, logs, troubleshooting, ITSM |
| 🟣 Pleno | JML, OAuth/OIDC/SAML, SCIM, Graph, PowerShell, IGA, SoD, Access Reviews |
| 🟠 Avançado | PIM, PAM, workload identity, hybrid identity, cloud IAM, ABAC |
| 🔴 Sênior | arquitetura, governance, role engineering, métricas, auditoria, Zero Trust, automação e desenho de controles |

---

# 📌 O QUE ESTE LABORATÓRIO DEVE PRODUZIR NO FINAL

Você não deve terminar apenas sabendo clicar no portal.

Deve conseguir explicar e demonstrar:

```text
IDENTITY
   ↓
AUTHENTICATION
   ↓
MFA / CONDITIONAL ACCESS
   ↓
AUTHORIZATION
   ↓
RBAC / ABAC
   ↓
PROVISIONING
   ↓
JML
   ↓
IGA / SoD / ACCESS REVIEW
   ↓
PIM
   ↓
PAM
   ↓
AUDIT
   ↓
REVOCATION
```

E deve conseguir transformar esse conhecimento em:

```text
Política
→ configuração
→ teste
→ automação
→ evidência
→ auditoria
→ melhoria
```

---

# 📚 REFERÊNCIAS OFICIAIS

- Microsoft Entra: https://learn.microsoft.com/entra/
- Microsoft Entra licensing: https://learn.microsoft.com/entra/fundamentals/licensing
- Conditional Access: https://learn.microsoft.com/entra/identity/conditional-access/
- Identity Protection: https://learn.microsoft.com/entra/id-protection/
- PIM: https://learn.microsoft.com/entra/id-governance/privileged-identity-management/
- Identity Governance: https://learn.microsoft.com/entra/id-governance/
- Access Reviews: https://learn.microsoft.com/entra/id-governance/access-reviews-overview
- Entitlement Management: https://learn.microsoft.com/entra/id-governance/entitlement-management-overview
- Lifecycle Workflows: https://learn.microsoft.com/entra/id-governance/lifecycle-workflows-overview
- Microsoft Graph: https://learn.microsoft.com/graph/
- OAuth 2.0 RFC 6749: https://www.rfc-editor.org/rfc/rfc6749
- OpenID Connect Core: https://openid.net/specs/openid-connect-core-1_0.html
- SAML: https://www.oasis-open.org/standard/saml/
- SCIM RFC 7644: https://www.rfc-editor.org/rfc/rfc7644
- NIST Digital Identity Guidelines: https://pages.nist.gov/800-63-4/
- Teleport Community Edition: https://goteleport.com/docs/get-started/deploy-community/

---

# 🧾 AUDITORIA DO PRÓPRIO LABORATÓRIO

Este documento foi estruturado para corrigir quatro problemas comuns de roadmaps de IAM:

1. **Excesso de teoria antes da prática:** cada módulo começa por uma tarefa concreta.
2. **Passos sem objetivo:** cada configuração explica imediatamente o motivo e o resultado esperado.
3. **Ausência de troubleshooting:** cada bloco relevante possui teste negativo e investigação.
4. **Licenciamento ignorado:** o laboratório separa explicitamente CA comum, recursos P2 e cenários que dependem de licenças adicionais.

### Estratégia de 1 P2

```text
LAB-ADMIN
   ↓
CONFIGURA
   ↓
┌─────────────────────────────────────┐
│                                     │
│  LAB-USER01 / LAB-USER02            │
│  ├── MFA                             │
│  ├── CA comum                        │
│  ├── SSO                             │
│  ├── RBAC                            │
│  ├── JML                             │
│  └── testes gerais                   │
│                                     │
│  LAB-P2                              │
│  ├── Identity Protection             │
│  ├── Risk-based CA                   │
│  ├── PIM                             │
│  └── Access Review como reviewer     │
│                                     │
└─────────────────────────────────────┘
```

**Resultado:** o laboratório maximiza o conteúdo técnico aprendido sem transformar a quantidade de usuários em requisito artificial de licenciamento. Os exercícios que realmente exigem múltiplos usuários licenciados devem permanecer como cenários corporativos de referência, não como pré-requisito para concluir o laboratório.
