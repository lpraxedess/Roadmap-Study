# 🟦 IAM Study Lab — Microsoft Entra ID do básico ao avançado

> **Método:** `preparar → configurar → validar → quebrar → investigar → corrigir → revogar → evidenciar → explicar`.
>
> **Objetivo:** sair de operações de usuário e chegar a IAM/IGA Engineering com prática em Entra ID, AD, autenticação, autorização, JML, governança, PIM, PAM, automação, cloud e auditoria.
>
> ⚠️ **Licenciamento:** o laboratório foi desenhado para usar **1 única licença Entra ID P2**, atribuída somente a `LAB-P2`. O administrador configura as políticas; ele não precisa ser o usuário beneficiado. Recursos que exigem P1/P2 devem ter o escopo explicitamente limitado ao usuário licenciado ou a um trial/licenciamento adicional. Não trate a existência de uma P2 no tenant como licença para todos os usuários.
>
> 🔐 Nunca publique senha, secret, token, chave privada, cookie, código MFA ou dado real.

---

## 🧭 Mapa rápido

| # | Tema | Nível |
|---|---|---|
| 00 | Método, licença e evidências | Base |
| 01 | VirtualBox e laboratório otimizado | Base |
| 02 | Fundamentos IAM | Base |
| 03 | Active Directory | Base |
| 04 | Entra Users, Groups e atributos | Base |
| 05 | Administrative Units e least privilege | Júnior |
| 06 | Azure RBAC | Júnior |
| 07 | Authentication Methods + MFA | Júnior |
| 08 | SSPR + Password Writeback | Júnior/Pleno |
| 09 | Conditional Access | Júnior/Pleno |
| 10 | Identity Protection — P2 | Pleno |
| 11 | Device Identity + Authentication Strength | Pleno |
| 12 | Logs + troubleshooting | Júnior/Pleno |
| 13 | SSO + OAuth2 + OIDC | Júnior/Pleno |
| 14 | SAML 2.0 | Júnior/Pleno |
| 15 | App Registrations + Service Principals | Pleno |
| 16 | Workload Identity + Managed Identity | Pleno |
| 17 | SCIM + provisioning | Pleno |
| 18 | Microsoft Graph | Pleno |
| 19 | PowerShell + automação | Pleno |
| 20 | JML + birthright access | Pleno |
| 21 | IGA + Role Engineering + ABAC + SoD | Pleno |
| 22 | Entitlement Management | Pleno |
| 23 | Access Reviews | Pleno |
| 24 | PIM | Avançado |
| 25 | B2B / External ID | Pleno |
| 26 | Hybrid Identity | Avançado |
| 27 | PAM com Teleport CE | Avançado |
| 28 | Cloud IAM — Azure/AWS | Avançado |
| 29 | ITSM + auditoria + evidências | Pleno |
| 30 | Zero Trust + métricas | Avançado |
| 31 | Projeto final + entrevista | Sênior |

---

## 🧪 Como estudar cada módulo

Não avance porque a tela mostrou “Success”. Avance somente quando concluir:

- [ ] Entendi o objetivo.
- [ ] Sei **quando** usar.
- [ ] Sei **por que** usar.
- [ ] Executei seguindo os passos.
- [ ] Repeti sem consultar o passo a passo.
- [ ] Executei um teste positivo.
- [ ] Executei um teste negativo.
- [ ] Encontrei o log/evidência.
- [ ] Revoguei o acesso/configuração.
- [ ] Consigo explicar o resultado em uma entrevista.

### Progressão de domínio

**Nível 1:** seguir o roteiro.  
**Nível 2:** repetir sem olhar.  
**Nível 3:** quebrar deliberadamente e investigar.  
**Nível 4:** resolver sem roteiro.  
**Nível 5:** explicar, desenhar e propor melhoria.

---

# 00 — CONTROLE DO LABORATÓRIO

## Contas

| Conta | P2 | Uso |
|---|---:|---|
| `LAB-ADMIN` | Não | configura o tenant |
| `LAB-P2` | **Sim — única** | exercícios que realmente dependem de P2 |
| `LAB-USER01` | Não | usuário comum |
| `LAB-USER02` | Não | comparação/testes negativos |
| `LAB-BREAKGLASS` | Não | emergência; não usar no cotidiano |

### Regra essencial

```text
LAB-ADMIN
   │
   ├── configura políticas
   │
   ├── configura PIM
   │
   ├── configura Access Reviews
   │
   └── configura CA
              │
              └── somente LAB-P2 quando o recurso exigir P2
```

### Matriz de licença

| Recurso | Estratégia com 1 P2 |
|---|---|
| Users/Groups | todos os usuários de laboratório |
| Security Defaults | usar quando quiser MFA básico sem CA |
| Authentication Methods | testar conforme recurso disponível |
| SSPR | `LAB-P2` para cenário licenciado |
| CA comum | requer P1/P2 para usuários beneficiados; usar `LAB-P2` ou trial adicional |
| Risk-based CA / Identity Protection | `LAB-P2` |
| PIM | `LAB-P2` |
| Access Reviews | `LAB-P2` como reviewer quando licenciamento permitir o cenário |
| Entitlement Management | executar somente no escopo licenciado/trial |
| Lifecycle Workflows | executar somente no escopo licenciado/trial |
| Graph/PowerShell | depende das permissões/API usadas; validar antes |
| SAML/OIDC/SCIM | depende da aplicação; laboratório local pode ser gratuito |
| Teleport CE | gratuito para o laboratório de PAM |

> **Importante:** licença é avaliada por usuário beneficiado quando a documentação do serviço assim exige. O fato de `LAB-ADMIN` conseguir abrir/configurar uma tela não significa que todos os usuários estejam licenciados para usar o recurso.

---

# 01 — VIRTUALBOX: LABORATÓRIO OTIMIZADO

## PASSO 1 — Criar rede

Abra **VirtualBox → Tools → Network Manager → Host-only Networks → Create**.

Configure `192.168.56.1/24` e **desative o DHCP do VirtualBox**.

### Por quê?

O `LAB-DC01` será o único DHCP do laboratório. Dois DHCPs na mesma rede podem entregar gateway/DNS/IP diferentes e produzir falhas difíceis de diagnosticar.

## PASSO 2 — Criar VMs

| VM | Função | RAM sugerida |
|---|---|---:|
| `LAB-DC01` | AD DS + DNS + DHCP | 4 GB |
| `LAB-WIN11` | cliente | 4 GB |
| `LAB-LINUX01` | alvo PAM | 2 GB |
| `LAB-TELEPORT` | PAM | 2 GB |

Não ligue todas ao mesmo tempo.

## PASSO 3 — Configurar rede

Em cada VM: **Settings → Network → Adapter 1 → Host-only Adapter** → selecione a rede.

## PASSO 4 — IP do DC

No Windows Server configure:

`IP 192.168.56.10 /24`  
`Gateway vazio`  
`DNS 192.168.56.10`

### Resultado

Rede isolada e previsível.

### Teste negativo

Desligue o DC e renove DHCP no cliente. O VirtualBox não deve assumir o DHCP.

---

# 02 — FUNDAMENTOS IAM

## PASSO 1 — Criar identidade

Entra → **Identity → Users → All users → New user** → crie `LAB-USER01`.

### Por quê?

IAM administra identidades humanas e não humanas e controla seu ciclo de vida e acesso.

## PASSO 2 — Criar grupo

**Identity → Groups → New group** → `GRP-FINANCE` → adicione `LAB-USER01`.

### Por quê?

Grupo permite administrar autorização por população/função em vez de permissões individuais.

## PASSO 3 — Memorizar a cadeia

`Identidade → autenticação → autorização → recurso → auditoria`.

### Teste

MFA prova melhor quem é o usuário; **MFA não concede autorização**.

---

# 03 — ACTIVE DIRECTORY

## PASSO 1 — Instalar AD DS

`Server Manager → Add Roles and Features → Active Directory Domain Services → Install`.

Depois selecione **Promote this server to a domain controller → Add a new forest**.

Domínio: `lab.local`.

## PASSO 2 — DNS

Depois do reboot:

`nslookup lab.local`

### Por quê?

AD depende de DNS para localizar serviços do domínio.

## PASSO 3 — OUs

Crie:

`Users`, `Groups`, `Servers`, `Workstations`, `Disabled`.

## PASSO 4 — Grupos

Crie `GG-FINANCE`, `GG-IT`, `GG-IAM`.

## PASSO 5 — GPO

Abra **Group Policy Management** e crie `GPO-LAB-AUDIT` na OU apropriada. Evite colocar toda configuração na Default Domain Policy.

## PASSO 6 — Ingressar cliente

No Windows cliente: **System → About → Domain or workgroup → Domain** → `lab.local`.

### Teste negativo

Aponte o DNS do cliente para endereço incorreto e tente localizar o domínio.

### Investigue

`ipconfig /all`, `nslookup`, conectividade e eventos.

### Aprendeu

AD, DNS, OU, GPO, grupos, autenticação e troubleshooting.

---

# 04 — ENTRA: USERS, GROUPS E ATRIBUTOS

## PASSO 1

Crie `LAB-P2`, `LAB-USER01`, `LAB-USER02`, `LAB-BREAKGLASS`.

Atribua **P2 somente a `LAB-P2`**.

## PASSO 2

Crie:

`GRP-FINANCE`, `GRP-IT`, `GRP-IAM-READERS`, `GRP-IAM-ADMINS`, `GRP-LAB-CA`.

## PASSO 3

Preencha em `LAB-USER01`: Department, Job title, Manager e Usage location.

### Por quê?

Atributos alimentam automação, grupos dinâmicos, JML e decisões de acesso.

### Teste

Altere Department `Finance → IT` e registre o que deveria mudar em uma arquitetura baseada em atributos.

---

# 05 — ADMINISTRATIVE UNITS + LEAST PRIVILEGE

## PASSO 1

**Identity → Administrative Units → Add** → `AU-FINANCE`.

## PASSO 2

Adicione usuários financeiros.

## PASSO 3

Delegue uma role administrativa com escopo limitado.

### Por quê?

Least privilege também vale para administradores.

### Teste positivo

Operador administra usuário dentro do escopo.

### Teste negativo

Operador tenta administrar usuário fora do escopo.

### Resultado esperado

Negação.

---

# 06 — AZURE RBAC

## PASSO 1

**Azure Portal → Resource groups → Create** → `rg-iam-lab`.

## PASSO 2

`Access control (IAM) → Add role assignment`.

Atribua `Virtual Machine Contributor` ou outra role mínima adequada ao laboratório, no **Resource Group**, não na assinatura.

### Por quê?

RBAC controla autorização no Azure e o scope deve ser o menor possível.

### Teste

`LAB-USER01` deve administrar o recurso permitido.

### Teste negativo

Tente uma operação fora da role/scope.

### Conceito-chave

`Role + Scope + Principal = autorização efetiva`.

---

# 07 — AUTHENTICATION METHODS + MFA

## PASSO 1 — Abrir política

Entra → **Protection → Authentication methods → Policies**.

Habilite o método necessário para o grupo de laboratório.

## PASSO 2 — Registrar Authenticator

Use `LAB-P2` para o cenário licenciado quando necessário.

### Por quê?

Authentication Methods define como identidades podem provar controle de autenticadores.

## PASSO 3 — Testar MFA

Faça login e complete MFA.

## PASSO 4 — Teste negativo

Remova/desabilite o método permitido e repita o login.

### Aprendeu

Método de autenticação ≠ política de autorização.

---

# 08 — SSPR + PASSWORD WRITEBACK

## PASSO 1 — Configurar SSPR

Entra → **Protection → Password reset → Properties**.

Defina o escopo para o usuário licenciado do laboratório e escolha os métodos disponíveis.

### Por quê?

SSPR permite que o usuário recupere o acesso sem depender de um operador para cada esquecimento de senha.

## PASSO 2 — Registrar informações

`LAB-P2` acessa o registro de informações de segurança e registra o método exigido.

## PASSO 3 — Executar reset

Na tela de login selecione **Forgot password** e conclua a validação.

## PASSO 4 — Validar

Entre com a nova senha.

## PASSO 5 — Teste negativo

Tente o fluxo sem método suficiente/sem registro.

### Investigue

Authentication logs e registro de métodos.

## PASSO 6 — Password Writeback

Somente no laboratório híbrido, habilite o recurso após configurar Entra Connect e validar os pré-requisitos de licença/configuração.

Fluxo:

`AD → Entra Connect → SSPR → writeback → AD`.

### Aprendeu

SSPR, registro, autenticação, recuperação de conta e integração híbrida.

---

# 09 — CONDITIONAL ACCESS

> ⚠️ CA exige P1/P2 para os usuários beneficiados. Com uma única P2, mantenha os exercícios licenciados em `LAB-P2` ou use trial/licença adicional. Não aplique CA licenciada indiscriminadamente a usuários sem licença.

## PASSO 1 — Criar grupo de teste

`GRP-LAB-CA`.

## PASSO 2 — Criar política

Entra → **Protection → Conditional Access → Policies → New policy**.

Nome: `CA-LAB-MFA`.

Defina explicitamente:

- Users: população de teste licenciada;
- Target resources: aplicação de laboratório;
- Grant: MFA;
- primeiro use **Report-only**.

### Por quê?

CA é decisão contextual. Report-only reduz risco de lockout durante a criação.

## PASSO 3 — What If

Use **What If** para verificar se a política deveria aplicar.

## PASSO 4 — Ativar

Depois de validar, mude para **On**.

## PASSO 5 — Teste positivo

Login → MFA → acesso.

## PASSO 6 — Teste negativo

Crie condição que deva negar o acesso.

### Aprendeu

`Signal → Policy → Grant/Block → Session`.

---

# 10 — IDENTITY PROTECTION — P2

## PASSO 1

Use `LAB-P2` como identidade licenciada.

Abra os recursos de risco de identidade disponíveis no tenant.

## PASSO 2

Estude:

`User risk`, `Sign-in risk`, detecção, investigação e remediação.

## PASSO 3

Combine com CA baseada em risco somente no usuário licenciado.

### Por quê?

Risco permite mudar o controle conforme o contexto do login.

### Teste

Use dados/simulações disponíveis no ambiente; **não tente fabricar ataque real contra contas reais**.

### Aprendeu

Risco de identidade ≠ risco de endpoint ≠ autorização.

---

# 11 — DEVICE IDENTITY + AUTHENTICATION STRENGTH

## PASSO 1 — Device Identity

Registre/ingresse o `LAB-WIN11` conforme o modo suportado pelo laboratório.

Observe o objeto de dispositivo no Entra.

### Por quê?

Zero Trust pode considerar usuário e dispositivo simultaneamente.

## PASSO 2 — Authentication Strength

Crie uma política de força de autenticação para exigir o método adequado ao cenário.

Compare:

`MFA comum` vs `phishing-resistant`.

## PASSO 3 — Passkey/FIDO2

Habilite o método disponível, registre um autenticador compatível e teste login passwordless.

### Teste negativo

Use método que não atende à força exigida.

### Aprendeu

`User + Device + Method + Context → decisão`.

---

# 12 — LOGS + TROUBLESHOOTING

## PASSO 1

Abra os logs de sign-in e audit logs.

## PASSO 2

Para cada teste, registre:

`timestamp → usuário → aplicação → IP/localização → resultado → política → motivo`.

## PASSO 3 — Quebre uma configuração

Exemplos:

- claim errado;
- role removida;
- grupo errado;
- CA em escopo incorreto;
- consentimento ausente;
- DNS incorreto.

## PASSO 4

Investigue começando pelo evento mais próximo da falha.

### Método

`Sintoma → evidência → hipótese → teste → correção → nova evidência`.

---

# 13 — SSO + OAUTH 2.0 + OIDC

## PASSO 1

Escolha uma aplicação de laboratório.

## PASSO 2

Defina:

`IdP`, `Client`, `Authorization Server`, `Resource Server`.

## PASSO 3

Implemente Authorization Code Flow com PKCE quando aplicável.

Observe:

`authorization code → token → access`.

### Por quê?

SSO reduz múltiplas autenticações; OAuth delega autorização; OIDC adiciona identidade sobre OAuth.

## PASSO 4

Identifique:

`issuer`, `audience`, `scope`, `claims`, `ID token`, `access token`, `JWKS`.

## Teste negativo

Altere audience/scope/redirect URI e observe a falha.

---

# 14 — SAML 2.0

## PASSO 1

Configure uma Enterprise Application de laboratório ou IdP/SP de teste.

Defina:

`Entity ID`, `ACS URL`, claims e certificado.

## PASSO 2

Faça login SSO.

## PASSO 3

Use ferramenta de inspeção SAML para observar:

`AuthnRequest → SAMLResponse → Assertion → Claims`.

## Testes negativos

1. ACS incorreto.
2. Audience incorreta.
3. Claim ausente.
4. Certificado expirado.
5. NameID incompatível.

### Aprendeu

Federação e troubleshooting de SAML.

---

# 15 — APP REGISTRATIONS + SERVICE PRINCIPALS

## PASSO 1

Entra → **App registrations → New registration**.

Crie `APP-IAM-LAB`.

## PASSO 2

Identifique:

`Application object` vs `Service Principal`.

### Por quê?

A aplicação é a definição; o service principal representa sua identidade em um tenant.

## PASSO 3

Teste secret/certificado apenas em laboratório.

### Teste negativo

Secret expirado/revogado.

### Aprendeu

Identidade de aplicação e autenticação não humana.

---

# 16 — WORKLOAD IDENTITY + MANAGED IDENTITY

## PASSO 1

Crie uma VM/serviço com Managed Identity quando houver recurso Azure disponível.

## PASSO 2

Conceda somente a role necessária no menor scope.

## PASSO 3

Acesse o recurso sem armazenar senha/secret na aplicação.

### Por quê?

Managed Identity reduz a necessidade de secrets estáticos.

## Testes

1. Role correta → sucesso.
2. Role removida → autorização falha.
3. Identidade indisponível → autenticação/obtenção de token falha.

### Compare

`User identity`, `service principal`, `managed identity`, `workload identity`.

---

# 17 — SCIM + PROVISIONING

## PASSO 1

Use uma aplicação que suporte SCIM ou um servidor SCIM de laboratório.

## PASSO 2

Configure endpoint e credencial/token somente para o laboratório.

## PASSO 3

Mapeie atributos.

## PASSO 4

Teste ciclo completo:

`Create → Update → Group membership → Disable → Delete`.

## PASSO 5 — Quebrar

Use atributo incorreto ou endpoint indisponível.

### Investigue

Provisioning logs, mapping e resposta HTTP.

### Aprendeu

Provisioning ≠ autenticação ≠ autorização.

---

# 18 — MICROSOFT GRAPH

## PASSO 1

Use Graph Explorer ou aplicação de laboratório.

## PASSO 2

Execute leitura de usuário/grupo.

## PASSO 3

Compare:

`Delegated permission` vs `Application permission`.

## PASSO 4

Estude Admin Consent.

Fluxo:

`Permission → Consent → Token → Graph API`.

## PASSO 5 — Teste negativo

Remova consentimento/permissão e repita.

### Aprendeu

IAM via API, escopo e privilégio de aplicação.

---

# 19 — POWERSHELL + AUTOMAÇÃO

## PASSO 1

Instale o módulo oficial necessário e autentique com o menor privilégio possível.

## PASSO 2

Crie CSV:

`name,department,jobTitle`

## PASSO 3

Automatize:

`CSV → validar → criar → grupo → log`.

## PASSO 4

Adicione modo **WhatIf/dry-run** antes de alterações reais.

## PASSO 5

Faça tratamento de erro e log.

### Teste

Execute duas vezes e garanta que o script não crie duplicidade.

### Evolução

Depois faça a mesma automação com Python + REST/Graph.

---

# 20 — JML + BIRTHRIGHT ACCESS

## Cenário

`LAB-USER01` entra em Finance, muda para IT e depois sai.

## PASSO 1 — Joiner

Crie identidade → atributo → grupo/role → aplicação.

### Por quê?

Birthright access deve entregar automaticamente o mínimo necessário para a função.

## PASSO 2 — Mover

Mude Finance → IT.

Remova acesso antigo e conceda o novo.

### Teste crítico

O usuário **não pode continuar acumulando** acesso de Finance sem justificativa.

## PASSO 3 — Leaver

Desabilite conta, revogue sessões quando aplicável, remova grupos/entitlements e trate acessos privilegiados.

## PASSO 4 — Evidência

Registre antes/depois e quem autorizou.

### Aprendeu

JML não é apenas “criar/desativar usuário”; é recalcular o acesso durante todo o ciclo de vida.

---

# 21 — IGA + ROLE ENGINEERING + ABAC + SOD

## PASSO 1 — Criar matriz de acesso

Exemplo:

| Role | Entitlement |
|---|---|
| `FINANCE_ANALYST` | ERP.Read |
| `FINANCE_ANALYST` | FinanceShare.Read |
| `FINANCE_APPROVER` | Payment.Approve |

## PASSO 2 — Separar RBAC de ABAC

RBAC: acesso baseado em role.  
ABAC: decisão baseada em atributos/contexto.

## PASSO 3 — Criar SoD

Regra:

`Vendor.Create + Payment.Approve = conflito`.

## PASSO 4

Tente atribuir as duas funções.

### Resultado esperado

Conflito identificado; se houver exceção, ela precisa de justificativa, aprovação e prazo.

### Aprendeu

Role engineering, entitlement, risco e governança.

---

# 22 — ENTITLEMENT MANAGEMENT

> ⚠️ Execute somente quando o tenant/trial fornecer o licenciamento necessário.

## PASSO 1

Crie catálogo de laboratório.

## PASSO 2

Adicione pacote de acesso.

## PASSO 3

Defina aprovação e duração.

## PASSO 4

Solicite acesso como usuário de teste.

## PASSO 5

Aprove e valide provisionamento.

## PASSO 6

Espere/force expiração conforme o cenário e confirme remoção.

### Aprendeu

`Request → Approval → Provision → Expire → Revoke → Audit`.

---

# 23 — ACCESS REVIEWS

> ⚠️ Respeite o licenciamento do usuário reviewer e da população conforme a documentação do tenant.

## PASSO 1

Crie um grupo com acesso de laboratório.

## PASSO 2

Configure review com `LAB-P2` como reviewer quando licenciado.

## PASSO 3

Teste decisões:

- Keep;
- Remove;
- não responder;
- aplicar resultado automaticamente quando disponível.

## PASSO 4

Repita para aplicação/role administrativa quando o cenário suportar.

## PASSO 5

Analise evidências.

### Pergunta de entrevista

> “Como você provaria que os acessos foram recertificados?”

Resposta deve conter população, reviewer, decisão, timestamp e evidência de remoção quando aplicável.

---

# 24 — PIM — ÚNICA P2

## PASSO 1

Use `LAB-P2` como identidade licenciada.

## PASSO 2

Atribua uma role como **Eligible**, não permanente, no menor scope.

## PASSO 3

Configure exigências disponíveis:

`MFA → justification → duration → approval quando aplicável`.

## PASSO 4

`LAB-P2 → Activate → justificar → executar tarefa → expirar`.

### Compare

`Permanent assignment` vs `Eligible assignment`.

## PASSO 5 — Teste negativo

Tente executar a tarefa antes da ativação.

### Resultado

Sem privilégio ativo, a operação deve falhar.

## PASSO 6

Teste expiração e consulte auditoria.

## PASSO 7

Repita o conceito para role de recurso Azure quando disponível.

### Aprendeu

JIT, privilégio mínimo, duração, ativação e auditoria.

---

# 25 — B2B / EXTERNAL ID

## PASSO 1

Convide uma identidade externa de laboratório quando disponível.

## PASSO 2

Observe `User type`, convite e relacionamento com o tenant.

## PASSO 3

Conceda somente o recurso necessário.

## PASSO 4

Revogue/remova o convidado.

### Aprendeu

Identidade externa ≠ identidade interna e requer governança própria.

---

# 26 — HYBRID IDENTITY: AD + ENTRA

## PASSO 1

Prepare `LAB-DC01` e `LAB-WIN11`.

## PASSO 2

Instale/configure Entra Connect conforme o laboratório e os pré-requisitos atuais.

## PASSO 3

Escolha uma identidade de teste.

## PASSO 4

Observe:

`AD object → sync → Entra object`.

## PASSO 5

Altere atributo no AD e observe sincronização.

## PASSO 6

Desabilite usuário no AD e valide impacto no Entra.

### Teste negativo

Quebre DNS/conectividade/sincronização e investigue.

### Aprendeu

Source of authority, sincronização, dependências e troubleshooting híbrido.

---

# 27 — PAM COM TELEPORT COMMUNITY EDITION

## Objetivo

Aprender o conceito de privilégio temporário e acesso auditável sem depender de CyberArk/Delinea.

## PASSO 1

Ligue somente `LAB-LINUX01` + `LAB-TELEPORT`.

## PASSO 2

Instale Teleport Community Edition conforme a documentação da versão usada.

## PASSO 3

Cadastre o servidor Linux como recurso protegido.

## PASSO 4

Crie roles com menor privilégio.

## PASSO 5

Teste acesso normal.

## PASSO 6

Pratique Role Request/Access Request disponível na CE via CLI.

Fluxo:

`request → approval → temporary role → access → session → audit → expiration`.

## Testes

1. Role correta → acesso.
2. Role insuficiente → negação.
3. Request não aprovado → negação.
4. Acesso expirado → negação.

### Compare

`IAM` controla identidade/acesso.  
`IGA` governa ciclo de vida e decisões.  
`PAM` protege acesso privilegiado.

---

# 28 — CLOUD IAM: AZURE + AWS

## Azure

Pratique:

`Principal → Role → Scope → Resource`.

## AWS

Crie laboratório gratuito/controlado quando disponível e estude:

`IAM User/Role → Policy → Resource`.

Priorize roles e federação em vez de usuários permanentes.

## Testes

- policy mínima;
- policy excessiva;
- scope incorreto;
- role sem permissão;
- sessão temporária.

### Aprendeu

Os produtos mudam, mas os princípios de IAM permanecem: identidade, autenticação, autorização, scope, least privilege e auditoria.

---

# 29 — ITSM + AUDITORIA + EVIDÊNCIAS

## PASSO 1 — Criar chamado fictício

Exemplo:

`REQ-001 — acesso ERP Financeiro para LAB-USER01`.

## PASSO 2

Documente:

`solicitante → justificativa → aprovador → role → entitlement → data → executor → evidência`.

## PASSO 3

Simule incidente:

`INC-001 — acesso indevido detectado`.

## PASSO 4

Faça:

`detecção → contenção → revogação → investigação → evidência → encerramento`.

### Aprendeu

IAM corporativo precisa ser rastreável e integrado a ITSM/GRC.

---

# 30 — ZERO TRUST + MÉTRICAS

## Modelo prático

`Never trust implicitly → verify explicitly → least privilege → assume breach`.

## PASSO 1

Escolha um aplicativo.

## PASSO 2

Combine sinais:

`user + device + authentication strength + application + risk`.

## PASSO 3

Defina decisão de acesso.

## PASSO 4

Teste permitido e negado.

## Métricas

Crie planilha com:

- % contas órfãs;
- tempo médio de provisionamento;
- tempo médio de revogação;
- % acessos revisados;
- % privilégios permanentes;
- quantidade de conflitos SoD;
- taxa de falha de provisioning;
- quantidade de exceções vencidas.

### Aprendeu

IAM deve ser mensurável, não apenas operacional.

---

# 31 — PROJETO FINAL: SIMULAÇÃO DE EMPRESA

## Cenário

A empresa possui:

- RH;
- Financeiro;
- TI;
- ERP;
- aplicações SaaS;
- AD;
- Entra ID;
- usuários externos;
- contas privilegiadas.

## Requisitos

Você deve projetar e implementar:

1. identidade;
2. grupos;
3. RBAC;
4. MFA;
5. SSPR;
6. CA conforme licenciamento;
7. SSO SAML/OIDC;
8. SCIM;
9. JML;
10. SoD;
11. Access Review;
12. PIM;
13. PAM;
14. workload identity;
15. automação Graph/PowerShell;
16. auditoria;
17. métricas.

## Regra

Na primeira execução, **não consulte os módulos anteriores**.

Receba apenas o cenário e produza:

`arquitetura → matriz de acesso → políticas → implementação → testes → evidências → riscos → melhorias`.

## Critérios de aprovação

- [ ] nenhuma permissão sem justificativa;
- [ ] menor scope possível;
- [ ] JML completo;
- [ ] acesso privilegiado temporário;
- [ ] autenticação forte;
- [ ] SSO funcional;
- [ ] provisioning funcional;
- [ ] revogação funcional;
- [ ] SoD testado;
- [ ] review testado;
- [ ] logs encontrados;
- [ ] automação idempotente;
- [ ] documentação reproduzível.

---

# 🎯 DESAFIO DE ENTREVISTA

Responda sem consultar o manual:

1. Qual diferença entre autenticação e autorização?
2. Como implementaria Joiner/Mover/Leaver?
3. RBAC ou ABAC: quando usar cada um?
4. Como evitar privilégios permanentes?
5. Como funcionam PIM e PAM?
6. Como investigaria falha de SSO SAML?
7. O que diferencia OAuth de OIDC?
8. O que SCIM resolve?
9. Qual diferença entre App Registration e Service Principal?
10. Como proteger workload identities?
11. Como provar um acesso em auditoria?
12. Como desenharia SoD para Financeiro?
13. Como faria uma Access Review?
14. Como automatizaria 500 onboardings?
15. Como reduzir blast radius de um administrador?
16. Como aplicaria Zero Trust ao acesso de uma aplicação?
17. Como faria troubleshooting de um usuário que não consegue acessar uma aplicação?
18. Como projetaria IAM híbrido AD + Entra?

---

# 🧠 CHECKPOINT DE CARREIRA

## IAM Júnior

- [ ] AD
- [ ] Entra users/groups
- [ ] MFA
- [ ] SSPR
- [ ] RBAC
- [ ] JML básico
- [ ] ITSM
- [ ] logs

## IAM Pleno

- [ ] CA
- [ ] Authentication Strength
- [ ] SSO
- [ ] SAML
- [ ] OIDC/OAuth
- [ ] SCIM
- [ ] Graph
- [ ] PowerShell
- [ ] SoD
- [ ] Access Reviews
- [ ] IGA

## IAM Engineer / Sênior

- [ ] SailPoint/IGA
- [ ] PAM
- [ ] PIM
- [ ] workload identity
- [ ] cloud IAM
- [ ] automação Python/REST
- [ ] arquitetura híbrida
- [ ] Zero Trust
- [ ] auditoria/compliance
- [ ] métricas
- [ ] desenho de arquitetura

---

# 📁 EVIDÊNCIAS DO LABORATÓRIO

Para cada módulo, salve somente material seguro:

```text
01-screenshot-resultado.png
02-screenshot-log.png
03-configuracao-resumida.md
04-teste-negativo.md
05-aprendizado.md
```

Nunca salve:

`password`, `secret`, `private key`, `refresh token`, `cookie`, `MFA code` ou credenciais reais.

---

# 🔁 CICLO DE REPETIÇÃO

Depois de concluir todos os módulos:

**Rodada 1:** seguir tutorial.  
**Rodada 2:** repetir sem tutorial.  
**Rodada 3:** executar somente testes negativos.  
**Rodada 4:** receber um cenário e desenhar a solução.  
**Rodada 5:** implementar como se fosse uma mudança corporativa.  
**Rodada 6:** explicar a arquitetura em entrevista.

> **Objetivo final:** não apenas saber clicar no Entra. Ser capaz de transformar uma necessidade de negócio em `identidade → autenticação → autorização → governança → privilégio → automação → auditoria`, implementando, testando, quebrando e corrigindo cada etapa.