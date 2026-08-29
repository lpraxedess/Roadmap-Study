# 🛡️ IAM Study Lab — Manual Único

> Laboratório prático para carreira em Identity and Access Management (IAM), com foco em Active Directory, Microsoft Entra ID, Azure RBAC, MFA, Conditional Access, PIM, JIT, JEA, PAM, governança, automação, identidade de workload, identidade híbrida e monitoramento.

**Princípio:** entender → configurar → validar → documentar → automatizar → investigar → revogar.

---

## 🧭 Navegação

- [1. Como usar](#1-como-usar)
- [2. Objetivos e competências](#2-objetivos-e-competências)
- [3. Arquitetura otimizada](#3-arquitetura-otimizada)
- [4. Inventário e consumo](#4-inventário-e-consumo)
- [5. Planejamento de rede](#5-planejamento-de-rede)
- [6. VirtualBox](#6-virtualbox)
- [7. DC01: Windows Server](#7-dc01-windows-server)
- [8. AD DS e DNS](#8-ad-ds-e-dns)
- [9. DHCP](#9-dhcp)
- [10. OUs, usuários e grupos](#10-ous-usuários-e-grupos)
- [11. CLIENT01 e Domain Join](#11-client01-e-domain-join)
- [12. GPO](#12-gpo)
- [13. Joiner, Mover e Leaver](#13-joiner-mover-e-leaver)
- [14. Contas privilegiadas e RBAC](#14-contas-privilegiadas-e-rbac)
- [15. Microsoft Entra ID](#15-microsoft-entra-id)
- [16. Entra Users, Groups e Roles](#16-entra-users-groups-e-roles)
- [17. Azure RBAC](#17-azure-rbac)
- [18. MFA](#18-mfa)
- [19. Conditional Access](#19-conditional-access)
- [20. Logs e auditoria](#20-logs-e-auditoria)
- [21. Access Reviews e SoD](#21-access-reviews-e-sod)
- [22. PIM e JIT](#22-pim-e-jit)
- [23. JEA](#23-jea)
- [24. PAM](#24-pam)
- [25. PowerShell](#25-powershell)
- [26. Microsoft Graph](#26-microsoft-graph)
- [27. Service Principal](#27-service-principal)
- [28. Managed Identity](#28-managed-identity)
- [29. Identidade híbrida](#29-identidade-híbrida)
- [30. IAM + Wazuh](#30-iam--wazuh)
- [31. Cenários de investigação](#31-cenários-de-investigação)
- [32. Projeto corporativo final](#32-projeto-corporativo-final)
- [33. Evidências](#33-evidências)
- [34. Checklist final](#34-checklist-final)
- [35. Critério de conclusão](#35-critério-de-conclusão)
- [36. Referências](#36-referências)

---

# 1. Como usar

Este é o **manual único** do Study IAM. A execução foi desenhada para uma máquina que não consegue manter muitas VMs ligadas ao mesmo tempo.

Cada etapa segue sempre esta ordem:

1. **Objetivo** — o que será aprendido.
2. **Por que** — qual problema corporativo a configuração resolve.
3. **Pré-requisitos** — o que precisa estar funcionando.
4. **Onde clicar** — caminho exato na interface quando aplicável.
5. **Configuração** — valores e ações.
6. **Validação** — teste objetivo.
7. **Falha comum** — primeira coisa a verificar.
8. **Evidência** — o que registrar.

> Não avance porque a configuração foi salva. Avance somente quando a validação passar.

### Legenda

- 🟢 **Essencial:** obrigatório.
- 🟡 **Prática:** consolidação.
- 🔵 **Validação:** prova de funcionamento.
- 📝 **Evidência:** material para o GitHub.
- ⚠️ **Falha comum:** diagnóstico inicial.
- 💡 **Conceito IAM:** conexão com a prática profissional.

### Regra de segurança

O laboratório deve usar identidades, senhas, tokens, certificados e dados fictícios. Nunca publique secrets, chaves privadas, cookies ou dados pessoais reais.

---

# 2. Objetivos e competências

Ao concluir o projeto, você deverá conseguir explicar e executar:

- ciclo de identidade;
- Joiner / Mover / Leaver;
- provisioning e deprovisioning;
- Active Directory Domain Services;
- DNS e DHCP para ambiente AD;
- OUs, grupos e GPO;
- RBAC e Least Privilege;
- contas administrativas separadas;
- Microsoft Entra ID;
- Directory Roles e Azure RBAC;
- MFA e Conditional Access;
- Sign-in Logs e Audit Logs;
- Access Reviews;
- PIM e JIT;
- JEA;
- fundamentos de PAM;
- PowerShell para IAM;
- Microsoft Graph;
- Service Principal e Managed Identity;
- identidade híbrida;
- monitoramento de eventos de identidade;
- investigação e revogação de acessos.

💡 A pergunta central de IAM é: **quem possui qual acesso, por qual motivo, em qual escopo, por quanto tempo, com qual controle e como esse acesso será revogado?**

---

# 3. Arquitetura otimizada

## 3.1 On-premises

```text
HOST
└── VirtualBox
    └── LAB-NET 192.168.50.0/24
        ├── DC01 192.168.50.10
        │   ├── AD DS
        │   ├── DNS
        │   └── DHCP
        ├── CLIENT01 via DHCP
        └── LINUX01 via DHCP/estático
            └── Wazuh — somente no módulo SIEM
```

## 3.2 Cloud

```text
Microsoft Entra ID
├── Users
├── Groups
├── Directory Roles
├── MFA
├── Conditional Access
├── Access Reviews
└── PIM
    └── Azure RBAC
        └── Resource Group
            └── Recursos do laboratório
```

## 3.3 VMs obrigatórias

| VM | Função | RAM sugerida | Quando ligar |
|---|---|---:|---|
| DC01 | AD/DNS/DHCP | 4 GB | módulos on-premises |
| CLIENT01 | Windows/domain join | 4 GB | AD/GPO/JML |
| LINUX01 | Wazuh | 4 GB | somente SIEM |

Não crie inicialmente um segundo DC, servidor de arquivos, PAW dedicada, servidor de sincronização ou PAM comercial. Esses componentes são extensões, não pré-requisitos.

### Estratégia de RAM

- AD/GPO/JML: `DC01 + CLIENT01`.
- SIEM: `DC01 + LINUX01`.
- Cloud IAM: nenhuma VM.
- PowerShell/Graph: host ou `DC01`.
- Híbrido: somente quando chegar ao módulo.

Ao terminar uma fase, desligue a VM que não será usada na próxima.

---

# 4. Inventário e consumo

## 4.1 Hardware

Recomendado:

- 16 GB RAM;
- CPU com virtualização habilitada;
- SSD;
- 4 threads ou mais.

Com 8 GB, use apenas uma VM de 4 GB por vez quando possível e mantenha o host livre de aplicações pesadas.

## 4.2 Software

- Oracle VirtualBox;
- Windows Server;
- Windows Client compatível com Domain Join;
- Linux compatível com Wazuh;
- conta Microsoft para tenant de laboratório;
- Azure Subscription apenas para módulos Azure.

## 4.3 Convenções

```text
Domínio:       corp.lab
Rede:          LAB-NET
DC:            DC01
Cliente:       CLIENT01
SIEM:          LINUX01
```

---

# 5. Planejamento de rede

| Item | Valor |
|---|---|
| Rede | `192.168.50.0/24` |
| Host-only adapter | `192.168.50.1` |
| DC01 | `192.168.50.10` |
| LINUX01 | `192.168.50.20` opcional |
| DHCP inicial | `192.168.50.100` |
| DHCP final | `192.168.50.200` |
| DNS interno | `192.168.50.10` |
| Gateway do laboratório | `192.168.50.1` |
| Domínio | `corp.lab` |

💡 O AD DS depende de DNS para descoberta de serviços e localização do controlador. Por isso o cliente de domínio deverá usar o DNS interno do laboratório, não um DNS público como servidor DNS primário.

---

# 6. VirtualBox

## 🟢 Objetivo

Criar uma rede isolada para o laboratório e impedir que o DHCP do VirtualBox concorra com o DHCP do Windows Server.

## 6.1 Criar Host-only Network

1. Abra **VirtualBox Manager**.
2. Abra **Tools / Ferramentas**.
3. Abra **Network / Rede / Network Manager**, conforme a versão.
4. Entre em **Host-only Networks**.
5. Clique **Create**.
6. Edite a rede criada.
7. Configure o adaptador:

```text
IPv4 Address: 192.168.50.1
IPv4 Network Mask: 255.255.255.0
```

8. Localize **DHCP Server**.
9. Desative o DHCP do VirtualBox.

### Por que o DHCP fica desligado?

O `DC01` será o único DHCP da rede. Dois DHCPs podem entregar endereços, DNS ou gateway diferentes e produzir comportamento inconsistente.

🔵 Resultado esperado:

```text
LAB-NET
192.168.50.1/24
VirtualBox DHCP: OFF
```

⚠️ Se a interface ou os nomes dos menus forem diferentes, procure por **Host-only**, **Network Manager** e **DHCP Server**; a nomenclatura varia entre versões do VirtualBox.

📝 Evidência: captura da rede Host-only mostrando IP/máscara e DHCP desativado.

---

# 7. DC01: Windows Server

## 🟢 Objetivo

Criar o servidor que será simultaneamente Domain Controller, DNS e DHCP.

## 7.1 Criar VM

No VirtualBox:

1. **New / Novo**.
2. Nome: `DC01`.
3. Tipo: `Microsoft Windows`.
4. RAM: `4096 MB`.
5. CPU: `2 vCPU`.
6. Disco: `60 GB`, dinamicamente alocado.
7. **Settings → Network → Adapter 1**.
8. Marque **Enable Network Adapter**.
9. Em **Attached to**, selecione **Host-only Adapter**.
10. Escolha `LAB-NET`.

💡 O DC não precisa de acesso direto à rede física para este laboratório. Isolamento reduz risco e facilita troubleshooting.

## 7.2 Instalar e renomear

Instale o Windows Server normalmente.

Depois:

1. **Server Manager → Local Server**.
2. Clique no nome atual do computador.
3. Altere para `DC01`.
4. Reinicie.

💡 Definir o hostname antes da promoção evita retrabalho e facilita identificação dos objetos e logs.

## 7.3 IP estático

1. **Control Panel → Network and Internet → Network and Sharing Center**.
2. **Change adapter settings**.
3. Botão direito no adaptador → **Properties**.
4. Abra **Internet Protocol Version 4 (TCP/IPv4)**.
5. Selecione configuração manual.

Use:

```text
IP address:       192.168.50.10
Subnet mask:      255.255.255.0
Default gateway:  192.168.50.1
Preferred DNS:    192.168.50.10
```

💡 O servidor terá papel de DNS do domínio; por isso o endereço precisa ser estável.

🔵 Valide:

```text
ipconfig /all
```

⚠️ Antes da instalação do DNS integrado ao AD, testes de resolução do domínio ainda não funcionarão.

---

# 8. AD DS e DNS

## 🟢 Objetivo

Criar `corp.lab` e transformar `DC01` em Domain Controller.

## 8.1 Instalar AD DS

No **Server Manager**:

1. **Manage → Add Roles and Features**.
2. Avance até **Server Roles**.
3. Marque **Active Directory Domain Services**.
4. Clique **Add Features**.
5. Continue até **Install**.
6. Aguarde.

💡 Instalar a role não cria o domínio; ainda será necessária a promoção.

## 8.2 Promover para Domain Controller

1. No **Server Manager**, abra a notificação.
2. Clique **Promote this server to a domain controller**.
3. Selecione **Add a new forest**.
4. Root domain: `corp.lab`.
5. Mantenha **DNS Server** e **Global Catalog** habilitados.
6. Defina uma senha de DSRM e armazene-a de forma segura.
7. Avance até a checagem de pré-requisitos.
8. Clique **Install**.
9. Aguarde o reboot.

💡 `corp.lab` é utilizado apenas para o laboratório; não use domínio corporativo real.

## 8.3 Validar AD/DNS

Abra PowerShell como administrador:

```powershell
ipconfig /all
nslookup corp.lab
dcdiag
```

Resultado esperado:

- IP `192.168.50.10`;
- DNS `192.168.50.10`;
- `corp.lab` resolve;
- `dcdiag` sem falhas críticas.

⚠️ Se DNS falhar, pare aqui. Não tente corrigir Domain Join antes de corrigir DNS.

📝 Evidência: `dcdiag`, `nslookup` e captura do console AD/DNS.

---

# 9. DHCP

## 🟢 Objetivo

Fazer o Windows Server distribuir IP, DNS e gateway aos clientes.

## 9.1 Instalar DHCP

1. **Server Manager → Manage → Add Roles and Features**.
2. Marque **DHCP Server**.
3. Instale.
4. Abra **Server Manager → Tools → DHCP**.

## 9.2 Criar escopo

1. Expanda `DC01`.
2. Expanda `IPv4`.
3. Botão direito em `IPv4` → **New Scope**.
4. Nome: `LAB-LAN`.
5. Start IP: `192.168.50.100`.
6. End IP: `192.168.50.200`.
7. Mask: `255.255.255.0`.
8. Router/Gateway: `192.168.50.1`.
9. DNS Server: `192.168.50.10`.
10. DNS Domain: `corp.lab`.
11. Ative o escopo.

💡 O cliente receberá o DNS interno para conseguir localizar serviços do AD.

🔵 Validação no cliente, depois de criado:

```powershell
ipconfig /release
ipconfig /renew
ipconfig /all
```

Esperado:

- IP `192.168.50.100–200`;
- DNS `192.168.50.10`.

⚠️ Se o cliente receber endereço `192.168.50.x` mas DNS diferente, verifique o escopo e confirme que o DHCP do VirtualBox está desligado.

---

# 10. OUs, usuários e grupos

## 🟢 Objetivo

Organizar identidades para GPO, delegação e governança.

Abra:

**Server Manager → Tools → Active Directory Users and Computers**.

## 10.1 OUs

No domínio `corp.lab`, crie:

```text
Users
Groups
Admins
Servers
Workstations
ServiceAccounts
Disabled
```

💡 OUs não são apenas pastas. Elas fornecem escopo para GPO e podem apoiar delegação administrativa.

## 10.2 Usuários

Na OU `Users`, crie:

```text
joao.silva
maria.santos
ana.financeiro
carlos.rh
```

Na OU `Admins`, crie:

```text
adm.iam
```

Na OU `ServiceAccounts`, reserve identidades de serviço para exercícios posteriores.

💡 Não use uma conta administrativa como conta de navegação/e-mail diário.

## 10.3 Grupos

Na OU `Groups`, crie:

```text
GG-Financeiro
GG-RH
GG-TI
GG-SOC
GG-IAM
GG-IAM-Readers
GG-IAM-Admins
```

Modelo:

```text
Usuário
  ↓
Grupo
  ↓
Permissão
  ↓
Recurso
```

💡 A atribuição por grupo simplifica provisioning, revogação e Access Reviews.

🔵 Validação:

```powershell
Get-ADUser joao.silva
Get-ADGroup GG-IAM
Get-ADPrincipalGroupMembership joao.silva
```

---

# 11. CLIENT01 e Domain Join

## 🟢 Objetivo

Criar uma estação consumidora de identidade AD.

## 11.1 Criar VM

Crie `CLIENT01` com:

- 4 GB RAM;
- 2 vCPU;
- 60 GB disco;
- Adapter 1: `Host-only Adapter → LAB-NET`.

Instale Windows compatível com Domain Join.

## 11.2 DHCP e DNS

Deixe IPv4 em automático.

Abra PowerShell:

```powershell
ipconfig /all
nslookup corp.lab
nslookup dc01.corp.lab
```

Esperado:

- IP via DHCP do DC01;
- DNS `192.168.50.10`;
- resolução do domínio e do DC.

⚠️ Se o DNS apontar para roteador ou DNS público, corrija antes do Domain Join.

## 11.3 Domain Join

1. Abra **Settings → System → About**.
2. Abra a opção de ingresso em domínio disponível na edição do Windows.
3. Informe `corp.lab`.
4. Forneça credencial autorizada.
5. Reinicie.
6. Entre com um usuário do domínio.

🔵 Valide:

```powershell
whoami
hostname
ipconfig /all
```

Esperado:

```text
corp\joao.silva
```

📝 Evidência: captura do domínio do computador e `whoami`.

---

# 12. GPO

## 🟢 Objetivo

Aplicar controles de segurança de forma centralizada.

Abra:

**Server Manager → Tools → Group Policy Management**.

## 12.1 Criar GPO

1. Expanda `Forest → Domains → corp.lab`.
2. Clique na OU `Workstations`.
3. Crie e vincule `GPO-LAB-Security`.

💡 Comece por uma OU de teste, não pelo domínio inteiro. Uma GPO incorreta pode impactar todos os computadores.

## 12.2 Exercícios

Pratique, em ambiente controlado:

- auditoria;
- bloqueio de tela;
- configurações de senha conforme escopo adequado;
- Windows Firewall;
- políticas de segurança não destrutivas.

Antes de mudanças críticas, crie snapshot da VM.

## 12.3 Validar

No CLIENT01:

```powershell
gpupdate /force
gpresult /r
```

💡 O objetivo é provar que a política foi aplicada, não apenas que ela existe no console.

---

# 13. Joiner, Mover e Leaver

## 13.1 Joiner

🟢 Simule entrada de colaborador.

Fluxo:

```text
RH
 ↓
Solicitação
 ↓
Aprovação
 ↓
IAM
 ↓
Identidade
 ↓
Grupo
 ↓
Acesso
 ↓
Evidência
```

Crie `joao.financeiro`, adicione `GG-Financeiro` e registre solicitante, aprovador, função e data.

🔵 Valide:

```powershell
Get-ADUser joao.financeiro
Get-ADPrincipalGroupMembership joao.financeiro
```

💡 Provisioning é mais do que criar a conta: deve existir uma justificativa e uma autorização rastreável.

## 13.2 Mover

🟢 Simule mudança de Financeiro para TI.

1. Adicione `GG-TI`.
2. Verifique o acesso anterior.
3. Remova `GG-Financeiro` quando não houver necessidade de retenção.
4. Valide o novo acesso.
5. Registre a alteração.

💡 O objetivo é evitar **Privilege Creep**, o acúmulo de acessos antigos.

## 13.3 Leaver

🟢 Simule desligamento.

1. Desabilite a conta.
2. Liste grupos.
3. Remova acessos conforme a regra do exercício.
4. Mova para `Disabled`.
5. Registre a evidência.

Valide:

```powershell
Get-ADUser joao.financeiro -Properties Enabled
```

Esperado: `Enabled = False`.

💡 Em ambiente híbrido, o Leaver também precisa considerar Entra, Microsoft 365, aplicações, VPN, sessões e credenciais de workload.

---

# 14. Contas privilegiadas e RBAC

## 14.1 Contas separadas

Use:

```text
Conta comum:  luiz
Conta admin:  adm.iam
```

A conta privilegiada deve ser usada somente quando a tarefa exigir privilégio.

## 14.2 RBAC

Modelo:

```text
Identidade
 ↓
Função
 ↓
Permissão
 ↓
Recurso
```

Crie um cenário de leitura com `GG-IAM-Readers` e um cenário administrativo com `GG-IAM-Admins`.

Para cada acesso responda:

- é necessário?
- qual é o menor escopo?
- é permanente?
- quem aprovou?
- como será auditado?
- como será revogado?

💡 **Least Privilege** significa conceder somente o necessário para realizar a tarefa.

---

# 15. Microsoft Entra ID

## 🟢 Objetivo

Praticar IAM cloud e comparar o modelo com AD.

Modelo:

```text
Tenant
 ↓
Users / Groups
 ↓
Roles
 ↓
Resources
 ↓
Access
```

Acesse o Microsoft Entra admin center e identifique:

- tenant;
- users;
- groups;
- roles;
- applications;
- sign-in logs;
- audit logs.

💡 O portal é apenas uma interface; os objetos de identidade também podem ser administrados por PowerShell e Microsoft Graph.

---

# 16. Entra Users, Groups e Roles

Crie usuários de laboratório:

```text
iam.user01
iam.user02
iam.admin01
iam.pimlab
```

Grupos:

```text
IAM-Lab-Users
IAM-Lab-Readers
IAM-Lab-Admins
```

Atribua as identidades aos grupos conforme o exercício.

💡 Prefira grupos quando eles representarem corretamente uma função ou conjunto de acesso.

### Directory Roles

Estude a diferença entre:

- membro de grupo;
- role do diretório;
- Azure RBAC;
- permissões de aplicação.

Não atribua Global Administrator para tarefas que podem ser realizadas com escopo menor.

🔵 Para cada identidade documente:

```text
User → Group → Role → Resource → Justification
```

---

# 17. Azure RBAC

## 🟢 Objetivo

Praticar autorização em recursos Azure.

Modelo:

```text
Subscription
 ↓
Resource Group
 ↓
Resource
```

## 17.1 Criar Resource Group

No Azure Portal:

1. Abra **Resource groups**.
2. Clique **Create**.
3. Selecione a subscription de laboratório.
4. Crie `rg-iam-lab`.
5. Use uma região disponível.

💡 Resource Group fornece um escopo administrativo conveniente para o laboratório e evita conceder acesso à subscription inteira sem necessidade.

## 17.2 Testar Reader

Atribua `Reader` a uma identidade/grupo no escopo `rg-iam-lab`.

Depois valide que a identidade consegue consultar recursos, mas não alterá-los.

## 17.3 Testar privilégio maior

Somente em recurso descartável, teste `Contributor` e depois remova a atribuição.

💡 O objetivo é visualizar a diferença entre autenticação, autorização, role e escopo.

Regra:

```text
Menor escopo possível
```

---

# 18. MFA

## 🟢 Objetivo

Adicionar um fator adicional à autenticação.

O tenant de laboratório pode oferecer diferentes mecanismos Microsoft para MFA. Security Defaults podem fornecer proteção básica; Conditional Access depende do licenciamento correspondente.

Faça o registro do método de autenticação em uma identidade de laboratório.

Depois autentique e examine o evento.

🔵 No Entra:

`Monitoring & health → Sign-in logs`

Analise Authentication Details.

💡 MFA é um controle de autenticação, não substituto de autorização, RBAC ou Least Privilege.

---

# 19. Conditional Access

## 🟢 Objetivo

Criar política baseada em condições:

```text
SE condição
ENTÃO controle
```

Exemplo:

```text
SE usuário administrativo
ENTÃO exigir MFA
```

## 19.1 Licenciamento

Conditional Access requer Microsoft Entra ID P1 ou licença que inclua essa capacidade. Recursos baseados em risco dependem das capacidades correspondentes de Microsoft Entra ID Protection/P2.

Verifique o licenciamento do tenant antes de executar o módulo.

## 19.2 Criar política segura

1. Abra **Entra ID → Protection → Conditional Access → Policies**.
2. Clique **New policy**.
3. Nome: `CA-LAB-Admins-MFA`.
4. Em Users, selecione somente `iam.admin01`.
5. Selecione uma aplicação de teste apropriada.
6. Configure a condição necessária.
7. Em Grant, selecione exigência de MFA.
8. Comece com **Report-only** quando possível.
9. Salve.

💡 Report-only permite observar o efeito antes de impor o controle e reduz risco de lockout.

## 19.3 Validar

Faça login com o usuário de teste.

Depois:

`Entra ID → Monitoring & health → Sign-in logs`

Analise:

- resultado;
- MFA;
- Conditional Access;
- Authentication Details;
- política aplicada.

## 19.4 What If

Use **What If** para simular usuário, aplicação, localização e dispositivo.

💡 Isso permite entender quais políticas seriam aplicadas antes de mudar o comportamento real.

⚠️ Nunca teste primeiro com a única conta administrativa do tenant.

---

# 20. Logs e auditoria

## 20.1 Sign-in Logs

Use para responder:

- quem autenticou?
- quando?
- de qual IP?
- qual aplicação?
- sucesso ou falha?
- MFA ocorreu?
- qual Conditional Access foi aplicado?

## 20.2 Audit Logs

Use para investigar alterações administrativas:

- criação/exclusão de usuário;
- mudança de grupo;
- atribuição de role;
- alterações em aplicações;
- mudanças de políticas.

## 20.3 Windows Security Logs

No Windows:

`Event Viewer → Windows Logs → Security`

Pratique investigação de:

- logon;
- falha de logon;
- criação de usuário;
- alterações de grupos;
- uso de conta privilegiada.

💡 IAM sem auditoria não permite provar quem fez uma alteração.

---

# 21. Access Reviews e SoD

## 21.1 Access Review

🟢 Para cada acesso, simule uma decisão:

```text
Usuário
 ↓
Grupo / Role
 ↓
Recurso
 ↓
Justificativa
 ↓
Manter / Remover / Alterar
```

Crie pelo menos 10 acessos fictícios e faça uma revisão documentada.

## 21.2 SoD — Segregation of Duties

Crie um cenário em que uma identidade não deve acumular funções incompatíveis.

Exemplo conceitual:

```text
Solicitar pagamento
≠
Aprovar pagamento
```

💡 SoD reduz risco de abuso e erro ao evitar concentração incompatível de funções.

### Licenciamento

Alguns recursos de Access Reviews e governança exigem licenças específicas. Verifique o cenário e o licenciamento atual antes de habilitar funcionalidades premium.

---

# 22. PIM e JIT

## 22.1 Objetivo

Praticar privilégio temporário em vez de privilégio permanente.

Fluxo:

```text
Eligible
 ↓
Activate
 ↓
MFA / controles
 ↓
Justification
 ↓
Privilege active
 ↓
Expiration
```

## 22.2 Licenciamento

PIM exige recursos/licenciamento apropriados, normalmente Microsoft Entra ID P2 ou Microsoft Entra ID Governance conforme o cenário atual da Microsoft.

## 22.3 Estratégia econômica de laboratório

Use uma identidade dedicada, por exemplo:

`iam.pimlab`

A sequência pode ser:

```text
iam.pimlab
 ↓
Role A
 ↓
Testar
 ↓
Remover
 ↓
Role B
 ↓
Testar
 ↓
Remover
```

Isso é uma estratégia de laboratório individual, não uma interpretação de que uma única licença pode ser usada arbitrariamente para cobrir usuários de produção.

## 22.4 Exercício

1. Atribua uma role como **Eligible** à identidade de laboratório.
2. Ative o privilégio.
3. Observe duração, justificativa e autenticação.
4. Execute uma tarefa permitida.
5. Aguarde ou force o encerramento conforme o cenário.
6. Confirme a expiração.
7. Consulte a auditoria.

💡 JIT reduz a janela de exposição do privilégio.

---

# 23. JEA

## 🟢 Objetivo

Aplicar **Just Enough Administration** no Windows PowerShell.

Modelo:

```text
Operador
 ↓
Endpoint JEA
 ↓
Comandos permitidos
 ↓
Recurso específico
```

## Exercício

Crie uma configuração JEA de laboratório que permita somente uma operação administrativa limitada, como consultar ou reiniciar um serviço específico.

Teste:

- comando permitido;
- comando não permitido;
- acesso fora do escopo.

💡 JEA reduz a quantidade de privilégio necessário para uma tarefa administrativa.

---

# 24. PAM

## 🟢 Objetivo

Entender Privileged Access Management sem depender de uma plataforma comercial.

PAM é uma disciplina que pode envolver:

- contas administrativas separadas;
- Least Privilege;
- JIT;
- PIM;
- JEA;
- PAW;
- Jump Host;
- vault;
- rotação de credenciais;
- aprovação;
- auditoria de sessão.

## 24.1 O que será praticado gratuitamente

```text
Conta comum
 ↓
Conta privilegiada
 ↓
Least Privilege
 ↓
JIT/PIM
 ↓
JEA
 ↓
Auditoria
 ↓
Revogação
```

💡 Um produto PAM comercial é uma implementação de capacidades; aprender os controles primeiro é mais importante para o laboratório.

## 24.2 PAW conceitual

Use `CLIENT01` como estação administrativa de laboratório e documente a regra:

```text
Uso diário → conta comum
Administração → identidade privilegiada / estação administrativa
```

---

# 25. PowerShell

## 🟢 Objetivo

Automatizar tarefas de identidade.

Pratique:

```powershell
Get-ADUser
New-ADUser
Disable-ADAccount
Get-ADGroup
Get-ADGroupMember
Get-ADPrincipalGroupMembership
Add-ADGroupMember
Remove-ADGroupMember
```

## 25.1 Provisionamento

O script deverá receber:

- nome;
- sobrenome;
- departamento;
- grupo.

Fluxo:

```text
Validar entrada
 ↓
Criar usuário
 ↓
Definir atributos
 ↓
Adicionar grupo
 ↓
Registrar resultado
```

## 25.2 Deprovisionamento

Fluxo:

```text
Localizar
 ↓
Desabilitar
 ↓
Listar grupos
 ↓
Remover conforme política
 ↓
Registrar
```

⚠️ Scripts destrutivos devem validar entrada, registrar ações e evitar alterações em massa sem confirmação.

📝 Guarde scripts no repositório sem credenciais embutidas.

---

# 26. Microsoft Graph

## 🟢 Objetivo

Administrar identidade via API.

Estude recursos como:

- Users;
- Groups;
- Applications;
- Service Principals;
- Directory Roles;
- Role Assignments.

Modelo:

```text
PowerShell / Script
 ↓
Microsoft Graph
 ↓
Microsoft Entra ID
 ↓
Objeto
```

Faça uma tarefa pelo portal e repita via Graph.

Compare:

```text
Portal → PowerShell → API
```

💡 O objetivo é entender automação e integração, não decorar endpoints.

---

# 27. Service Principal

## 🟢 Objetivo

Entender identidade de aplicação.

Diferencie:

```text
Application
 ↓
Service Principal
 ↓
Permissions
 ↓
Resource
```

Registre para cada aplicação:

- finalidade;
- proprietário;
- permissões;
- escopo;
- credencial usada, quando aplicável;
- data de revisão.

💡 Não conceda permissões amplas a uma aplicação apenas para fazê-la funcionar rapidamente.

---

# 28. Managed Identity

## 🟢 Objetivo

Entender identidade de workload sem armazenar secret manualmente.

Modelo:

```text
Azure Resource
 ↓
Managed Identity
 ↓
Token
 ↓
API / Resource
```

💡 Managed Identity reduz o uso de credenciais armazenadas, mas continua sujeita a RBAC e Least Privilege.

Execute somente em recurso descartável e remova o recurso ao terminar para evitar custo.

---

# 29. Identidade híbrida

## 🟡 Módulo avançado

Execute somente depois de dominar AD e Entra separadamente.

Modelo:

```text
Active Directory
 ↓
Sync
 ↓
Microsoft Entra ID
 ↓
Cloud Access
```

Estude:

- UPN;
- Source of Authority;
- Password Hash Synchronization;
- Microsoft Entra Connect;
- Microsoft Entra Cloud Sync;
- sincronização e escopo.

### Estratégia para máquina limitada

Não mantenha um servidor de sincronização ligado permanentemente. Adicione a VM somente durante este módulo.

### Exercício

```text
Criar no AD
 ↓
Sincronizar
 ↓
Validar no Entra
 ↓
Atribuir acesso cloud
 ↓
Desabilitar no AD
 ↓
Sincronizar
 ↓
Validar revogação
```

💡 O objetivo é entender a autoridade da identidade e o efeito da sincronização no ciclo de vida.

---

# 30. IAM + Wazuh

## 🟡 Módulo avançado

Ligue somente:

- `DC01`;
- `LINUX01`.

O CLIENT01 só precisa ficar ligado quando o exercício exigir interação do usuário.

## 30.1 Arquitetura

```text
Windows Security Events
 ↓
Wazuh Agent
 ↓
Wazuh
 ↓
Detection
 ↓
Investigation
 ↓
Response
```

## 30.2 Eventos

Pratique detecção de:

- login bem-sucedido;
- falha de login;
- criação de usuário;
- alteração de grupo;
- adição a grupo privilegiado;
- uso de conta administrativa.

## 30.3 Cenário

```text
Conta privilegiada
 ↓
Falhas de login
 ↓
Login bem-sucedido
 ↓
Alteração de grupo privilegiado
 ↓
Alerta
 ↓
Investigação
 ↓
Revogação
```

Pergunte:

- Quem?
- Quando?
- De onde?
- O que mudou?
- Qual privilégio?
- É legítimo?
- Qual ação deve ser tomada?

📝 Registre a linha do tempo da investigação.

---

# 31. Cenários de investigação

## 31.1 Privilege Escalation

Adicione controladamente uma conta comum a um grupo privilegiado.

Investigue o evento, identifique responsável, horário e justificativa. Depois remova o privilégio.

## 31.2 Password Spray conceitual

Gere falhas de autenticação controladas somente no laboratório.

Analise:

- origem;
- quantidade;
- contas afetadas;
- intervalo.

Não faça testes contra sistemas externos.

## 31.3 Leaver incompleto

Desabilite uma conta, mas deixe deliberadamente um acesso residual para o exercício. Faça uma revisão e corrija.

## 31.4 Privilege Creep

Dê a uma identidade acesso a Financeiro e TI. Mude sua função para RH e faça uma revisão para remover os acessos antigos.

## 31.5 Conditional Access incorreto

Crie uma política de teste em `Report-only`, analise os resultados e explique quais usuários seriam impactados antes de ativá-la.

---

# 32. Projeto corporativo final

## 🏢 Empresa fictícia

Use `ACME Corporation`.

Departamentos:

- Financeiro;
- RH;
- TI;
- SOC;
- IAM.

## 32.1 Identidades

Crie 20 usuários:

```text
Financeiro: 5
RH:         4
TI:         6
SOC:        3
IAM:        2
```

## 32.2 Grupos

```text
GG-Financeiro
GG-RH
GG-TI
GG-SOC
GG-IAM
GG-IAM-Readers
GG-IAM-Admins
```

## 32.3 Processos

Execute:

- 5 Joiners;
- 5 Movers;
- 5 Leavers;
- 5 Access Reviews;
- 3 alterações privilegiadas;
- 3 investigações de logs;
- 1 incidente completo.

## 32.4 Incidente final

```text
Conta privilegiada
 ↓
Falhas de login
 ↓
Login bem-sucedido
 ↓
Alteração de grupo privilegiado
 ↓
Detecção
 ↓
Investigação
 ↓
Containment
 ↓
Revogação
 ↓
Evidência
 ↓
Lição aprendida
```

## 32.5 Entregável

Produza um relatório contendo:

1. arquitetura;
2. inventário;
3. matriz de acessos;
4. JML;
5. RBAC;
6. controles privilegiados;
7. Conditional Access;
8. PIM/JIT;
9. auditoria;
10. incidente;
11. evidências;
12. melhorias recomendadas.

---

# 33. Evidências

## 33.1 Estrutura

```text
01-IAM/
├── IAM-Study-Lab.md
├── evidencias/
│   ├── 01-rede/
│   ├── 02-ad-dns/
│   ├── 03-dhcp/
│   ├── 04-ous-users-groups/
│   ├── 05-domain-join/
│   ├── 06-gpo/
│   ├── 07-jml/
│   ├── 08-rbac/
│   ├── 09-entra/
│   ├── 10-mfa/
│   ├── 11-conditional-access/
│   ├── 12-audit/
│   ├── 13-access-review/
│   ├── 14-pim/
│   ├── 15-pam-jit-jea/
│   ├── 16-automation/
│   ├── 17-workload-identity/
│   ├── 18-hybrid/
│   ├── 19-wazuh/
│   └── 20-incidentes/
└── scripts/
    ├── provision-user.ps1
    ├── disable-user.ps1
    ├── audit-groups.ps1
    └── access-review.ps1
```

## 33.2 Template

Para cada exercício:

```markdown
# Nome do exercício

## Objetivo

## Por que

## Ambiente

## Pré-requisitos

## Configuração

## Validação

## Resultado esperado

## Resultado obtido

## Falha encontrada

## Correção

## Evidência

## Aprendizado
```

Não publique secrets ou dados reais.

---

# 34. Checklist final

## Infraestrutura

- [ ] Host-only criada.
- [ ] DHCP do VirtualBox desativado.
- [ ] DC01 criado.
- [ ] IP estático configurado.
- [ ] AD DS instalado.
- [ ] DNS funcionando.
- [ ] DHCP Windows funcionando.
- [ ] CLIENT01 criado.
- [ ] LINUX01 criado somente para SIEM.

## Active Directory

- [ ] `corp.lab` criado.
- [ ] `dcdiag` validado.
- [ ] OUs criadas.
- [ ] usuários criados.
- [ ] grupos criados.
- [ ] GPO aplicada.
- [ ] Domain Join validado.

## IAM

- [ ] Joiner.
- [ ] Mover.
- [ ] Leaver.
- [ ] Provisioning.
- [ ] Deprovisioning.
- [ ] RBAC.
- [ ] Least Privilege.
- [ ] Privilege Creep.
- [ ] Access Review.
- [ ] SoD.

## Entra/Azure

- [ ] Users.
- [ ] Groups.
- [ ] Directory Roles.
- [ ] Azure RBAC.
- [ ] MFA.
- [ ] Conditional Access.
- [ ] Report-only.
- [ ] What If.
- [ ] Sign-in Logs.
- [ ] Audit Logs.
- [ ] Access Review.
- [ ] PIM/JIT.

## Privileged Access

- [ ] Conta administrativa separada.
- [ ] Least Privilege.
- [ ] JIT.
- [ ] PIM.
- [ ] JEA.
- [ ] PAM conceitual.
- [ ] PAW conceitual.
- [ ] Auditoria.
- [ ] Revogação.

## Automação

- [ ] PowerShell AD.
- [ ] Provisionamento automatizado.
- [ ] Deprovisionamento automatizado.
- [ ] Auditoria automatizada.
- [ ] Microsoft Graph.
- [ ] Service Principal.
- [ ] Managed Identity.

## Segurança

- [ ] Windows Security Events.
- [ ] Wazuh.
- [ ] Detecção.
- [ ] Investigação.
- [ ] Resposta.
- [ ] Evidências.

---

# 35. Critério de conclusão

O laboratório está concluído quando você consegue executar o fluxo sem depender mecanicamente do tutorial:

```text
Planejar
 ↓
Implementar
 ↓
Testar
 ↓
Validar
 ↓
Auditar
 ↓
Investigar
 ↓
Revogar
 ↓
Automatizar
 ↓
Documentar
```

Para qualquer acesso, responda:

1. Quem é a identidade?
2. Como foi autenticada?
3. O que pode acessar?
4. Qual é a role?
5. Qual é o escopo?
6. Por que precisa do acesso?
7. Quem aprovou?
8. Por quanto tempo?
9. Como é monitorado?
10. Como será revogado?

Se você consegue responder essas perguntas com evidências, o laboratório atingiu seu objetivo.

---

# 36. Referências

Consulte a documentação atual antes de executar funcionalidades que dependam de licenciamento ou cuja interface possa ter mudado.

- Microsoft Entra ID — https://learn.microsoft.com/entra/identity/
- Microsoft Entra licensing — https://learn.microsoft.com/entra/fundamentals/licensing
- Conditional Access — https://learn.microsoft.com/entra/identity/conditional-access/
- PIM — https://learn.microsoft.com/entra/id-governance/privileged-identity-management/
- Azure RBAC — https://learn.microsoft.com/azure/role-based-access-control/
- Microsoft Graph — https://learn.microsoft.com/graph/
- Active Directory Domain Services — https://learn.microsoft.com/windows-server/identity/ad-ds/
- Windows Security Auditing — https://learn.microsoft.com/windows/security/threat-protection/auditing/
- Wazuh — https://documentation.wazuh.com/
- CIS Benchmarks — https://www.cisecurity.org/cis-benchmarks

---

# 🎯 Modelo mental final

```text
IDENTIDADE
   ↓
AUTENTICAÇÃO
   ↓
AUTORIZAÇÃO
   ↓
RBAC
   ↓
LEAST PRIVILEGE
   ↓
ACESSO
   ↓
MONITORAMENTO
   ↓
REVISÃO
   ↓
REVOGAÇÃO
   ↓
EVIDÊNCIA
```

> **IAM não é apenas conceder acesso. É garantir que a identidade correta tenha o acesso correto, no escopo correto, pelo motivo correto, pelo tempo necessário, com controle, monitoramento e capacidade de revogação.**
