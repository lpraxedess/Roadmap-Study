# IAM Study Lab — Entra ID do básico ao avançado

> **Regra:** não leia o módulo inteiro antes de praticar. Execute o **PASSO 1**, valide, leia o **Por quê**, execute o próximo passo e repita.

## Ordem

1. Laboratório
2. IAM Fundamentals
3. Active Directory
4. Entra — usuários e grupos
5. RBAC
6. MFA e Conditional Access
7. Logs e troubleshooting
8. SSO — OIDC e SAML
9. App Registration e Service Principal
10. Microsoft Graph + PowerShell
11. SCIM + provisioning
12. JML
13. Access Reviews
14. PIM
15. B2B
16. Workload Identity
17. Hybrid Identity
18. IGA + SoD
19. PAM + Teleport CE
20. Cloud IAM
21. ITSM + auditoria
22. Projeto final

---

# 1 — LABORATÓRIO

## Resultado

Você terá uma rede isolada e somente duas VMs principais. Não precisa deixar todas ligadas.

| Componente | Função | Uso |
|---|---|---|
| `LAB-DC01` | AD DS + DNS + GPO | AD/Hybrid |
| `LAB-LINUX01` | alvo Linux/SSH | PAM |
| `LAB-TELEPORT` | Teleport Community Edition | PAM |
| Entra ID | IAM cloud | demais módulos |
| 1 usuário P2 | PIM/recursos P2 | somente quando necessário |

## PASSO 1 — Criar rede no VirtualBox

1. Abra **VirtualBox**.
2. Vá em **File → Tools → Network Manager**.
3. Abra **Host-only Networks**.
4. Clique **Create**.
5. Selecione `vboxnet0`.
6. IPv4: `192.168.56.1`.
7. Máscara: `255.255.255.0`.
8. **DHCP Server: desativado**.

### Por quê?

Você quer IPs previsíveis. Além disso, quando praticar AD, o laboratório poderá usar o próprio Windows Server como DHCP. Dois DHCPs na mesma rede podem entregar DNS/gateway incorretos.

## PASSO 2 — Configurar rede da VM

VirtualBox → VM → **Settings → Network**:

- Adapter 1: **Host-only Adapter**
- Name: `vboxnet0`
- Adapter 2: **NAT**, somente para instalação/updates

Desligue o NAT depois. Não use Bridge.

## PASSO 3 — Plano de IP

| Host | IP |
|---|---|
| Host | `192.168.56.1` |
| `LAB-DC01` | `192.168.56.10` |
| `LAB-TELEPORT` | `192.168.56.20` |
| `LAB-LINUX01` | `192.168.56.30` |

## PASSO 4 — Snapshot

VirtualBox → VM → **Snapshots → Take** → `clean`.

### O que você aprendeu

Rede isolada, IP fixo, NAT controlado, snapshot e laboratório econômico.

---

# 2 — IAM FUNDAMENTALS

## Cenário

Maria entra na empresa e precisa de acesso ao ERP.

## PASSO 1 — Desenhar o fluxo

Crie `docs/iam-flow.md`:

`RH → identidade → autenticação → autorização → role → entitlement → aplicação → log → revisão → revogação`

## PASSO 2 — Definir cada elemento

Escreva um exemplo para:

- identidade;
- conta;
- credencial;
- autenticação;
- autorização;
- role;
- entitlement;
- privilégio;
- identidade humana;
- workload identity.

## PASSO 3 — Teste

Responda sem consultar:

**Quem é você?** → autenticação.

**O que você pode fazer?** → autorização.

**Quem deve ter acesso, por quê e por quanto tempo?** → governança.

**Como controlar uma conta privilegiada?** → PAM.

### O que você aprendeu

O fluxo que será implementado nos módulos seguintes.

---

# 3 — ACTIVE DIRECTORY

## Resultado

Um domínio `lab.local`, grupos, OUs e uma GPO funcionando.

## PASSO 1 — Criar `LAB-DC01`

VirtualBox → **New**:

- Nome: `LAB-DC01`
- Windows Server
- RAM: 3–4 GB
- Disco: 50 GB dinâmico
- Rede: `vboxnet0`

Instale o Windows Server.

## PASSO 2 — Configurar IP

Windows → configurações do adaptador → IPv4 → Manual:

- IP: `192.168.56.10`
- Máscara: `255.255.255.0`
- Gateway: vazio, se não precisar de Internet
- DNS: `192.168.56.10` depois que o DNS do AD estiver instalado

### Por quê?

AD depende de DNS. O DC precisa de endereço previsível.

## PASSO 3 — Instalar AD DS

1. **Server Manager → Manage → Add Roles and Features**.
2. **Role-based or feature-based installation**.
3. Selecione `LAB-DC01`.
4. Marque **Active Directory Domain Services**.
5. **Add Features → Install**.
6. Na notificação, **Promote this server to a domain controller**.
7. **Add a new forest**.
8. Domínio: `lab.local`.
9. Defina a senha DSRM.
10. Instale e reinicie.

## PASSO 4 — Validar

```powershell
Get-ADDomain
Get-ADForest
nslookup lab.local
```

### Resultado esperado

O domínio e a floresta aparecem e `lab.local` resolve.

## PASSO 5 — Criar OUs

**Active Directory Users and Computers → domínio → New → Organizational Unit**.

Crie:

- `Users`
- `Groups`
- `Workstations`
- `Servers`
- `ServiceAccounts`

### Por quê?

OU organiza objetos e permite aplicar GPO/delegação por escopo.

## PASSO 6 — Criar usuários e grupos

Crie:

- `LAB-MARIA`
- `LAB-JOAO`
- `GG-FINANCE`
- `GG-IT`
- `GG-READONLY`

Adicione Maria a `GG-FINANCE`.

## PASSO 7 — Validar a associação

Faça login com Maria em uma máquina ingressada no domínio e execute:

```powershell
whoami
awhoami /groups
```

Corrija o comando se necessário: o comando correto é `whoami /groups`.

### O que você aprendeu

Usuário, grupo, OU, associação e autenticação de domínio.

## PASSO 8 — Criar GPO

1. Abra **Group Policy Management**.
2. Clique na OU `Workstations`.
3. **Create a GPO in this domain, and Link it here**.
4. Nome: `GPO-LAB-BASELINE`.
5. Configure uma política simples, como bloqueio de tela.
6. Na estação:

```powershell
gpupdate /force
gpresult /r
```

### Resultado esperado

A estação recebe a GPO.

---

# 4 — ENTRA: USUÁRIOS E GRUPOS

## PASSO 1 — Criar grupo

Microsoft Entra admin center → **Entra ID → Groups → New group**.

Crie:

`GRP-IAM-LAB`

Tipo: **Security**.

### Por quê?

Grupo permite atribuir acesso a um conjunto de identidades em vez de configurar usuário por usuário.

## PASSO 2 — Criar usuário

**Entra ID → Users → New user → Create new user**.

Crie:

`LAB-USER-ANA`

Não atribua P2.

## PASSO 3 — Adicionar ao grupo

Grupo → **Members → Add members → Ana**.

## PASSO 4 — Validar

Usuário → **Groups**.

Confirme `GRP-IAM-LAB`.

### O que você aprendeu

Identidade cloud, usuário, grupo e associação.

---

# 5 — RBAC

## Cenário

Ana precisa somente ler recursos de um Resource Group.

## PASSO 1 — Criar recurso

Azure Portal → **Resource groups → Create**.

Nome:

`rg-iam-lab`

## PASSO 2 — Conceder acesso

Resource Group → **Access control (IAM) → Add → Add role assignment**.

Selecione:

`Reader`

Membro:

`LAB-USER-ANA`

Escopo: `rg-iam-lab`.

### Por quê?

RBAC define permissões e o escopo limita o impacto.

## PASSO 3 — Testar como Ana

Entre no portal como Ana.

Tente:

1. visualizar `rg-iam-lab`;
2. alterar/criar um recurso.

### Resultado esperado

Leitura funciona; operação de escrita deve ser negada.

## PASSO 4 — Trocar a role

Administrador → IAM → remova `Reader`.

Atribua `Contributor` no mesmo Resource Group.

Repita o teste.

### Resultado esperado

A capacidade de alteração aumenta somente dentro do escopo atribuído.

## PASSO 5 — Revogar

Remova `Contributor`.

Teste novamente.

### O que você aprendeu

`Principal → Role → Permission → Scope → Resource` e least privilege.

---

# 6 — MFA E CONDITIONAL ACCESS

## Cenário

Ana pode acessar, mas deve usar MFA.

## PASSO 1 — Registrar MFA

Entre como Ana e complete o registro de um método de autenticação suportado pelo tenant.

### Por quê?

MFA adiciona uma prova além da senha.

## PASSO 2 — Criar política

Entra → **Protection → Conditional Access → Policies → New policy**.

Nome:

`CA-LAB-MFA-ANA`

Users → somente Ana.

Target resources → escolha o recurso cloud necessário ao teste.

Grant → exigir MFA.

### Primeiro use `Report-only`.

### Por quê?

Você observa o impacto antes de aplicar o bloqueio.

## PASSO 3 — Testar

Faça login com Ana.

Entra → **Monitoring & health → Sign-in logs**.

Abra o evento → examine **Conditional Access**.

## PASSO 4 — Ativar

Somente depois da validação, altere para **On**.

Repita o login.

## PASSO 5 — Teste negativo

Altere a política para não atingir Ana e compare os logs.

### O que você aprendeu

MFA, Conditional Access, Report-only e evidência de autenticação.

---

# 7 — LOGS E TROUBLESHOOTING

## PASSO 1 — Gerar três eventos

1. login normal;
2. login com MFA;
3. tentativa de ação sem permissão RBAC.

## PASSO 2 — Investigar

Entra → **Monitoring & health → Sign-in logs**.

Para alterações administrativas:

**Audit logs**.

## PASSO 3 — Registrar

Crie `docs/incidents/INC-001.md`:

`Sintoma → Evidência → Causa → Correção → Validação → Prevenção`

Registre:

- usuário;
- horário;
- aplicação;
- IP;
- resultado;
- CA;
- operação.

### O que você aprendeu

Investigar IAM por evidência.

---

# 8 — SSO E FEDERAÇÃO

## Cenário

Uma aplicação deve usar o Entra como IdP.

## PASSO 1 — OIDC

Use uma aplicação de laboratório que suporte OIDC.

Mapeie:

`Usuário → Authorization Endpoint → login → Authorization Code → Token → aplicação`

## PASSO 2 — Configurar

Na aplicação registre:

- Client ID;
- Tenant/Issuer;
- Redirect URI;
- scopes;
- claims.

### Por quê?

A Redirect URI limita para onde a aplicação pode receber a resposta de autenticação.

## PASSO 3 — Testar

1. Abra a aplicação.
2. Seja redirecionado ao Entra.
3. Autentique.
4. Retorne à aplicação.
5. Confirme a identidade.

## PASSO 4 — Quebrar

Altere a Redirect URI para uma incorreta.

Teste novamente.

### Resultado esperado

O fluxo falha por configuração incompatível.

## PASSO 5 — SAML

Use uma aplicação que suporte SAML.

Identifique:

- Entity ID;
- ACS URL;
- Assertion;
- claims;
- certificado.

### O que você aprendeu

IdP, SP, SSO, OIDC, SAML, claims e troubleshooting de federação.

---

# 9 — APP REGISTRATION E SERVICE PRINCIPAL

## Cenário

Uma aplicação precisa de identidade própria.

## PASSO 1 — Registrar

Entra → **App registrations → New registration**.

Nome:

`APP-IAM-LAB`

## PASSO 2 — Identificar

Anote:

- Application/Client ID;
- Directory/Tenant ID.

### Por quê?

App Registration define a aplicação; Service Principal representa a identidade da aplicação no tenant.

## PASSO 3 — Credencial

Para laboratório, use uma credencial temporária. Prefira certificado quando o cenário permitir.

Nunca publique secret/certificado privado.

## PASSO 4 — Testar

Use a aplicação para autenticar e executar somente a operação permitida.

## PASSO 5 — Revogar

Remova a credencial após o teste.

### O que você aprendeu

Application object, Service Principal, autenticação de aplicação e gestão de credenciais.

---

# 10 — MICROSOFT GRAPH + POWERSHELL

## Cenário

Automatizar criação e revogação de identidades.

## PASSO 1 — Criar CSV

Crie `users.csv`:

```text
displayName,userPrincipalName
Ana Lab,ana.lab@SEU-TENANT-DOMINIO
Joao Lab,joao.lab@SEU-TENANT-DOMINIO
```

## PASSO 2 — Instalar módulo

No PowerShell:

```powershell
Install-Module Microsoft.Graph -Scope CurrentUser
```

## PASSO 3 — Conectar

Use somente os scopes necessários para a tarefa.

## PASSO 4 — Automatizar

Faça um script que:

`CSV → localizar/criar usuário → adicionar grupo → registrar resultado`

## PASSO 5 — Revogar

Crie outro script:

`usuário → bloquear → registrar data/hora → registrar operador`

## PASSO 6 — Testar primeiro em uma conta

Depois execute em três.

### Por quê?

IAM automation deve ser previsível, auditável e testada antes de escalar.

### O que você aprendeu

Graph, PowerShell, scopes, automação e logging.

---

# 11 — SCIM + PROVISIONING

## Cenário

O Entra deve criar/remover uma identidade em uma aplicação.

## PASSO 1 — Escolher alvo

Use uma aplicação de laboratório com SCIM ou um servidor SCIM local.

## PASSO 2 — Entender o fluxo

`Entra → SCIM endpoint → user/group → aplicação`

## PASSO 3 — Mapear atributos

Pratique:

- `userName`;
- `active`;
- `displayName`;
- email.

## PASSO 4 — Provisionar

Crie um usuário elegível.

Execute/teste o provisioning.

## PASSO 5 — Desprovisionar

Desative o usuário no Entra.

Verifique o estado na aplicação.

### O que você aprendeu

Provisioning, deprovisioning, attribute mapping e SCIM.

---

# 12 — JML

## Cenário

Simular RH → IAM → aplicação.

## PASSO 1 — JOINER

Crie:

`LAB-MARIA`

Cargo:

`Finance Analyst`

Adicione ao grupo financeiro.

### O que isso representa?

Entrada da pessoa e concessão de acesso inicial.

## PASSO 2 — MOVER

Altere Maria para:

`IT Analyst`

Faça nesta ordem:

1. remover grupo Finance;
2. adicionar grupo IT;
3. revisar aplicações;
4. registrar alteração.

### Por quê?

Mover não significa somente adicionar acesso novo; o acesso antigo pode continuar sendo risco.

## PASSO 3 — LEAVER

1. Bloqueie a conta.
2. Remova grupos.
3. Revogue acessos aplicáveis.
4. Registre a evidência.

### Resultado esperado

Maria não consegue mais utilizar os acessos corporativos definidos pelo laboratório.

## PASSO 4 — Automatizar

Represente:

`evento RH → regra → aprovação → ação IAM → evidência`

Se Lifecycle Workflows não estiver disponível no tenant, implemente a lógica com Graph/PowerShell e documente a diferença.

### O que você aprendeu

Joiner, Mover, Leaver e revogação.

---

# 13 — ACCESS REVIEWS

## Cenário

O gestor precisa responder: **Ana ainda precisa deste acesso?**

## PASSO 1 — Preparar

Dê a Ana acesso a um grupo/aplicação adequado ao cenário de revisão disponível no tenant.

## PASSO 2 — Criar revisão

Entra → **Identity Governance → Access Reviews**.

Crie uma revisão compatível com a licença disponível.

## PASSO 3 — Aprovar

Marque um acesso como **Approve**.

## PASSO 4 — Negar

Marque outro como **Deny**.

## PASSO 5 — Validar aplicação

Quando a configuração permitir aplicação automática, confirme se o acesso rejeitado foi removido.

### Por quê?

Access Review transforma a pergunta de negócio em uma decisão formal de acesso.

### O que você aprendeu

Recertificação, reviewer, decisão, revogação e evidência.

> Se o tenant bloquear a função por licença, registre o requisito e simule o processo manualmente. Não tente contornar o licenciamento.

---

# 14 — PIM

## Cenário

Um administrador precisa de privilégio somente durante uma tarefa.

> **Use a única licença P2 de forma sequencial.**

## PASSO 1 — Preparar

Atribua P2 somente à conta necessária para este laboratório.

## PASSO 2 — Abrir PIM

Entra → **ID Governance → Privileged Identity Management**.

## PASSO 3 — Criar atribuição elegível

Escolha uma role administrativa adequada ao laboratório.

Crie uma atribuição **Eligible**, quando disponível.

### Por quê?

A conta não permanece privilegiada permanentemente.

## PASSO 4 — Ativar

Com a conta elegível:

1. PIM → role.
2. **Activate**.
3. Informe justificativa.
4. Complete MFA/condições exigidas.
5. Use a menor duração necessária.

## PASSO 5 — Testar

Execute uma ação que exige a role.

Depois que a ativação terminar, repita.

### Resultado esperado

A ação funciona enquanto o privilégio está ativo e deixa de funcionar depois.

## PASSO 6 — Auditar

Consulte os registros e anote:

- operador;
- role;
- início;
- fim;
- justificativa;
- resultado.

## PASSO 7 — Revogar

Remova qualquer atribuição permanente criada somente para o laboratório.

### O que você aprendeu

Eligible, activation, JIT, least privilege e auditoria privilegiada.

---

# 15 — B2B / IDENTIDADE EXTERNA

## Cenário

Um fornecedor precisa de acesso limitado.

## PASSO 1

Entra → **External Identities** → fluxo de convite suportado pelo tenant.

Convide uma identidade de laboratório.

## PASSO 2

Conceda somente o acesso necessário.

## PASSO 3

Faça login como convidado.

## PASSO 4

Tente acessar um recurso não autorizado.

### Resultado esperado

Acesso permitido somente ao escopo concedido.

## PASSO 5

Remova o convidado.

### O que você aprendeu

External identity, B2B, trust e least privilege.

---

# 16 — WORKLOAD IDENTITY

## Cenário

Uma aplicação precisa acessar Azure sem senha de usuário.

## PASSO 1

Escolha um recurso de laboratório que suporte Managed Identity.

## PASSO 2

Habilite a identidade gerenciada.

## PASSO 3

Conceda somente uma role de leitura no recurso necessário.

## PASSO 4

Execute a aplicação e valide a operação.

## PASSO 5

Remova a role.

Execute novamente.

### Resultado esperado

A aplicação perde a capacidade correspondente à permissão removida.

### O que você aprendeu

Managed Identity, workload identity e redução de secrets.

---

# 17 — HYBRID IDENTITY

## Cenário

Usuário criado no AD deve aparecer no Entra.

## PASSO 1

No `LAB-DC01`, crie:

`LAB-HYBRID-USER`

na OU dedicada ao laboratório.

## PASSO 2

Instale/configure a ferramenta de sincronização suportada pela documentação atual da Microsoft para seu cenário.

### Por quê?

Não use comandos antigos de blogs; ferramentas e requisitos mudam.

## PASSO 3

Escolha somente a OU do laboratório como escopo.

## PASSO 4

Execute a sincronização.

## PASSO 5 — Validar

No Entra, confirme:

- usuário sincronizado;
- origem;
- UPN;
- atributos.

## PASSO 6 — Teste negativo

Retire o usuário do escopo e observe o comportamento do ciclo de sincronização.

### O que você aprendeu

AD + Entra, escopo de sincronização e troubleshooting híbrido.

---

# 18 — IGA + SOD

## Cenário

Um usuário não deve criar fornecedor e aprovar pagamento simultaneamente.

## PASSO 1 — Criar entitlements

Modele:

- `ERP-VENDOR-CREATE`
- `ERP-PAYMENT-APPROVE`

## PASSO 2 — Criar role

`ROLE-FINANCE-ANALYST`

## PASSO 3 — Definir conflito

`VENDOR-CREATE + PAYMENT-APPROVE = SoD CONFLICT`

## PASSO 4 — Testar

Atribua os dois entitlements a um usuário de laboratório.

Registre o conflito.

## PASSO 5 — Corrigir

Remova um entitlement.

## PASSO 6 — Documentar

Crie `docs/iga/sod-matrix.md`:

| Role | Entitlement | Conflito |
|---|---|---|
| Finance Analyst | Vendor Create | Payment Approve |
| Finance Analyst | Payment Approve | Vendor Create |

### O que você aprendeu

Entitlement, role engineering, IGA e Segregation of Duties.

## PASSO 7 — Simular IGA

Monte:

`Identity → Role → Entitlement → SoD check → Approval → Provisioning → Review → Revocation`

Depois compare esse fluxo com SailPoint/Saviynt.

---

# 19 — PAM COM TELEPORT COMMUNITY EDITION

## Cenário

Carlos precisa administrar Linux sem depender de uma senha compartilhada.

## PASSO 1 — Criar `LAB-LINUX01`

Linux VM:

- IP `192.168.56.30`
- SSH habilitado

Crie uma conta local somente para configuração inicial.

## PASSO 2 — Criar `LAB-TELEPORT`

Linux VM:

- IP `192.168.56.20`
- RAM 1–2 GB

## PASSO 3 — Instalar Teleport CE

Use **somente a documentação oficial da versão atual do Teleport Community Edition**.

### Por quê?

Comandos, versões e parâmetros mudam.

## PASSO 4 — Criar o cluster

Configure o proxy/cluster seguindo a documentação da versão utilizada.

## PASSO 5 — Registrar `LAB-LINUX01`

Instale/configure o agente no Linux alvo e faça o join usando o método recomendado pela versão.

## PASSO 6 — Testar

Acesse o Linux através do Teleport.

Confirme que a sessão passa pelo ponto de controle.

## PASSO 7 — Criar dois perfis

- `pam-admin`
- `pam-readonly`

Aplique permissões diferentes.

## PASSO 8 — Teste negativo

Entre como `pam-readonly`.

Tente executar uma ação administrativa.

### Resultado esperado

A operação é negada.

## PASSO 9 — Investigar

Consulte os registros/sessões disponíveis no Teleport.

Registre:

- usuário;
- destino;
- horário;
- sessão;
- resultado.

## PASSO 10 — Revogar

Remova o grant/perfil.

Teste novamente.

### O que você aprendeu

PAM, proxy de acesso, controle de sessão, autorização e auditoria.

> **Limite:** Teleport CE é laboratório de conceitos PAM. Não trate CE como equivalente funcional a CyberArk, Delinea ou BeyondTrust Enterprise.

---

# 20 — CLOUD IAM

## Cenário

Uma workload precisa acessar somente um recurso.

## PASSO 1 — Azure

Repita RBAC usando Managed Identity.

## PASSO 2 — AWS

Em uma sandbox, crie uma IAM Role e uma policy mínima.

Evite access keys permanentes.

## PASSO 3 — Testar

Permita leitura.

Teste leitura.

Tente escrita.

## PASSO 4 — Revogar

Remova a policy.

Repita.

### O que você aprendeu

O padrão se repete:

`Principal → Role/Policy → Permission → Resource`

---

# 21 — ITSM + AUDITORIA

## Cenário

Todo acesso precisa ser solicitado, aprovado, executado e comprovado.

## PASSO 1 — Criar chamado

Crie `IAM-ACCESS-001` com:

- solicitante;
- usuário alvo;
- aplicação;
- role;
- motivo;
- risco;
- aprovador;
- prazo;
- executor;
- evidência;
- revogação.

## PASSO 2 — Executar

`Request → Approval → IAM execution → Validation → Evidence → Closure`

## PASSO 3 — Auditoria

Escolha um acesso criado nos módulos anteriores.

Prove:

1. quem recebeu;
2. qual acesso;
3. quem aprovou;
4. quando foi concedido;
5. qual log comprova;
6. quando foi revisado;
7. quando foi removido.

### O que você aprendeu

ITSM, evidência, rastreabilidade e auditoria.

---

# 22 — PROJETO FINAL

## Cenário

Simular uma empresa pequena.

### Identidades

- Ana — Financeiro
- João — TI
- Maria — Financeiro → TI
- Carlos — administrador/PAM

## PASSO 1 — Criar identidades e grupos

`GRP-FINANCE`, `GRP-IT`, `GRP-IAM-READONLY`.

## PASSO 2 — Criar recurso Azure

`rg-iam-final`.

## PASSO 3 — Aplicar RBAC

Financeiro → acesso financeiro.

TI → acesso técnico.

## PASSO 4 — MFA + CA

Exigir MFA conforme a política do laboratório.

## PASSO 5 — SSO

Integrar uma aplicação com OIDC ou SAML.

## PASSO 6 — Provisioning

Usar SCIM ou simular com Graph/PowerShell.

## PASSO 7 — JML

Maria:

`JOIN → Finance → MOVE → remover Finance + adicionar TI → LEAVE → revogar`

## PASSO 8 — PIM

Administrador usa privilégio somente durante a tarefa.

## PASSO 9 — PAM

Carlos acessa Linux através do Teleport.

## PASSO 10 — SoD

Criar e resolver um conflito.

## PASSO 11 — Access Review

Revisar um acesso e remover um acesso desnecessário.

## PASSO 12 — Auditoria

Produzir evidências de:

- criação;
- autenticação;
- concessão;
- aprovação;
- alteração;
- privilégio;
- revisão;
- revogação.

### Resultado final

Você executou:

`Identity → Authentication → Authorization → Provisioning → Governance → Privilege → PAM → Audit → Revocation`

---

# CHECKPOINT FINAL

Marque um módulo somente se consegue fazer os oito passos abaixo sem copiar do manual:

- [ ] Criar
- [ ] Configurar
- [ ] Testar
- [ ] Provocar uma negação/falha controlada
- [ ] Investigar
- [ ] Corrigir
- [ ] Revogar
- [ ] Explicar em 60 segundos

## Evidência por módulo

Guarde somente:

`objetivo + passos + evidência + erro encontrado + correção + conhecimento adquirido`

Nunca publique senha, token, secret, chave privada ou dado real.

## Regra de evolução

**Júnior:** AD + Entra + JML + RBAC + MFA/CA + ITSM.

**Pleno:** SSO + SAML/OIDC/OAuth2 + SCIM + Graph/PowerShell + Access Reviews + SoD + cloud.

**Sênior:** IGA + PAM + arquitetura híbrida + automação + Zero Trust + auditoria/compliance + workload identity.

**Ferramentas comerciais:** use o laboratório para dominar conceitos e fluxos; depois compare com SailPoint, Saviynt, CyberArk, Delinea, BeyondTrust e Okta.
