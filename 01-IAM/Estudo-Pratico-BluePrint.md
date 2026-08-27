# 🛡️ IAM Study Lab — Manual Prático

> Laboratório de estudo para carreira em IAM, com foco em Microsoft Active Directory, Microsoft Entra ID, Azure RBAC, MFA, Conditional Access, PIM, JIT, JEA, PAM, governança, automação e monitoramento.

**Princípio:** aprender → configurar → validar → documentar → automatizar → investigar.

---

## 🧭 Navegação

- [0. Como usar este laboratório](#0-como-usar-este-laboratório)
- [1. Objetivos](#1-objetivos)
- [2. Arquitetura otimizada](#2-arquitetura-otimizada)
- [3. Inventário](#3-inventário)
- [4. Planejamento de rede](#4-planejamento-de-rede)
- [5. VirtualBox](#5-virtualbox)
- [6. VM DC01](#6-vm-dc01)
- [7. Active Directory](#7-active-directory)
- [8. DNS](#8-dns)
- [9. DHCP](#9-dhcp)
- [10. Estrutura de OUs](#10-estrutura-de-ous)
- [11. Usuários e grupos](#11-usuários-e-grupos)
- [12. GPO](#12-gpo)
- [13. Windows Client](#13-windows-client)
- [14. Joiner](#14-joiner)
- [15. Mover](#15-mover)
- [16. Leaver](#16-leaver)
- [17. Contas privilegiadas](#17-contas-privilegiadas)
- [18. RBAC e Least Privilege](#18-rbac-e-least-privilege)
- [19. Microsoft Entra ID](#19-microsoft-entra-id)
- [20. Entra Users e Groups](#20-entra-users-e-groups)
- [21. Azure RBAC](#21-azure-rbac)
- [22. MFA](#22-mfa)
- [23. Conditional Access](#23-conditional-access)
- [24. Logs e auditoria](#24-logs-e-auditoria)
- [25. Access Review](#25-access-review)
- [26. PIM](#26-pim)
- [27. JIT](#27-jit)
- [28. JEA](#28-jea)
- [29. PAM](#29-pam)
- [30. PowerShell](#30-powershell)
- [31. Microsoft Graph](#31-microsoft-graph)
- [32. Service Principal](#32-service-principal)
- [33. Managed Identity](#33-managed-identity)
- [34. Identidade híbrida](#34-identidade-híbrida)
- [35. IAM + Wazuh](#35-iam--wazuh)
- [36. Cenários de incidente](#36-cenários-de-incidente)
- [37. Projeto final](#37-projeto-final)
- [38. Evidências e GitHub](#38-evidências-e-github)
- [39. Checklist](#39-checklist)
- [40. Critério de conclusão](#40-critério-de-conclusão)
- [41. Referências oficiais](#41-referências-oficiais)

---

# 0. Como usar este laboratório

O laboratório foi deliberadamente reduzido para uma máquina com recursos limitados. Você **não precisa manter todas as VMs ligadas**.

Cada módulo informa:

- **🟢 Essencial:** obrigatório para avançar.
- **🟡 Prática:** exercício para consolidar o conhecimento.
- **🔵 Validação:** como saber se funcionou.
- **📝 Evidência:** o que registrar no GitHub.
- **⚠️ Falha comum:** o que verificar quando o resultado não for o esperado.

### Regra operacional

Nunca avance apenas porque a configuração foi salva. Avance somente quando a validação passar.

Fluxo:

```text
Objetivo
  ↓
Pré-requisitos
  ↓
Configuração
  ↓
Validação
  ↓
Evidência
  ↓
Próximo módulo
```

### Estratégia para economizar RAM

| Módulo | VMs ligadas |
|---|---|
| AD / DNS / DHCP / GPO | DC01 + CLIENT01 |
| IAM local | DC01 + CLIENT01 |
| Wazuh | DC01 + LINUX01 |
| Cloud IAM | Nenhuma |
| PIM / Conditional Access | Nenhuma |
| PowerShell / Graph | DC01 ou somente host |
| Identidade híbrida | Somente quando necessário |

Desligue as VMs ao concluir cada módulo.

---

# 1. Objetivos

Ao terminar o laboratório, você deverá conseguir explicar e executar:

- Identity Lifecycle.
- Joiner / Mover / Leaver.
- Provisioning / Deprovisioning.
- Active Directory.
- DNS e DHCP para domínio Microsoft.
- OUs, usuários, grupos e GPO.
- RBAC e Least Privilege.
- Microsoft Entra ID.
- Microsoft Entra roles e Azure RBAC.
- MFA.
- Conditional Access.
- Sign-in Logs e Audit Logs.
- Access Reviews.
- PIM e JIT.
- JEA.
- Fundamentos de PAM.
- PowerShell para IAM.
- Microsoft Graph.
- Service Principals e Managed Identities.
- Identidade híbrida.
- Monitoramento de eventos IAM com Wazuh.
- Investigação e revogação de acesso.

O foco não é decorar telas. O objetivo é saber **por que um acesso existe, quem o possui, qual o escopo, por quanto tempo e como revogá-lo**.

---

# 2. Arquitetura otimizada

## 2.1 Arquitetura principal

```text
HOST
 │
 └── VirtualBox
      │
      └── LAB-NET
           │
           ├── DC01
           │    ├── AD DS
           │    ├── DNS
           │    ├── DHCP
           │    └── GPO
           │
           ├── CLIENT01
           │    └── Windows Client
           │
           └── LINUX01 (somente nos módulos de SIEM)
                └── Wazuh
```

## 2.2 Cloud

```text
Microsoft Entra ID
 │
 ├── Users
 ├── Groups
 ├── Directory Roles
 ├── MFA
 ├── Conditional Access
 ├── PIM
 └── Workload Identities
       │
       └── Azure
            ├── Subscription
            ├── Resource Group
            └── Resources
```

## 2.3 O que não é obrigatório

Não crie inicialmente:

- segundo Domain Controller;
- servidor de arquivos;
- servidor de aplicação;
- PAM comercial;
- PAW dedicada;
- servidor de sincronização;
- várias VMs Linux.

Esses componentes podem ser adicionados depois, se houver recursos e necessidade pedagógica.

---

# 3. Inventário

## 3.1 Hardware recomendado

- 16 GB RAM: recomendado.
- 8 GB RAM: possível, usando apenas uma ou duas VMs por vez.
- CPU com virtualização habilitada.
- SSD recomendado.

## 3.2 Software

- Oracle VirtualBox.
- Windows Server para DC01.
- Windows Client para CLIENT01.
- Linux para LINUX01.
- Conta Microsoft para Entra ID.
- Azure Subscription apenas para os exercícios que exigirem recursos Azure.

## 3.3 Convenção de nomes

| Recurso | Nome |
|---|---|
| Domain Controller | `DC01` |
| Windows Client | `CLIENT01` |
| Linux/SIEM | `LINUX01` |
| Domínio | `corp.lab` |
| Rede | `LAB-NET` |

---

# 4. Planejamento de rede

## 4.1 Endereçamento

| Item | Valor |
|---|---|
| Rede | `192.168.50.0/24` |
| Gateway do laboratório | `192.168.50.1` |
| DC01 | `192.168.50.10` |
| LINUX01 | `192.168.50.20` |
| DHCP inicial | `192.168.50.100` |
| DHCP final | `192.168.50.200` |
| DNS interno | `192.168.50.10` |
| Domínio | `corp.lab` |

## 4.2 Por que uma rede isolada?

O laboratório poderá gerar autenticações, logs, testes de segurança e alterações de configuração. A rede Host-only permite comunicação entre as VMs sem depender da rede corporativa ou doméstica.

## 4.3 Por que o DHCP do VirtualBox ficará desativado?

Porque o **DC01 será o servidor DHCP do laboratório**. Dois servidores DHCP na mesma rede podem entregar configurações diferentes aos clientes, causando problemas de IP, DNS e gateway.

---

# 5. VirtualBox

## 🟢 Objetivo

Criar uma rede privada para as VMs.

## 5.1 Criar a Host-only Network

Abra o VirtualBox.

Procure o gerenciador de redes, que pode aparecer como:

`Tools → Network Manager`

ou, dependendo da versão:

`Arquivo → Ferramentas → Network Manager`

Abra **Host-only Networks** e clique em **Create**.

Configure:

```text
IPv4 Address: 192.168.50.1
IPv4 Network Mask: 255.255.255.0
```

Desative o servidor DHCP do VirtualBox.

### Por que?

Porque o DHCP será instalado no Windows Server posteriormente.

## 5.2 Criar DC01

Clique:

`New`

Nome:

`DC01`

Tipo:

`Microsoft Windows`

Configuração inicial:

- 2 vCPU.
- 4 GB RAM.
- 60 GB de disco.

Em:

`Settings → Network → Adapter 1`

selecione:

`Host-only Adapter`

Escolha:

`LAB-NET`

### 🔵 Validação

Antes de instalar o sistema, confirme que a placa está conectada à Host-only Network correta.

---

# 6. VM DC01

## 🟢 Objetivo

Instalar o Windows Server e preparar o futuro Domain Controller.

## 6.1 Instalação

Instale o Windows Server normalmente.

Após o primeiro login, abra:

`Server Manager → Local Server`

Altere o nome do computador para:

`DC01`

Reinicie.

### Por que alterar o nome antes do AD DS?

O nome do servidor será usado na administração, DNS e identificação do Domain Controller. Fazer isso antes da promoção evita retrabalho.

## 6.2 IP estático

Abra:

`Control Panel → Network and Internet → Network and Sharing Center → Change Adapter Settings`

Clique com botão direito na placa → `Properties`.

Abra:

`Internet Protocol Version 4 (TCP/IPv4)`

Selecione:

`Use the following IP address`

Configure:

```text
IP address:       192.168.50.10
Subnet mask:      255.255.255.0
Default gateway:  192.168.50.1
Preferred DNS:    192.168.50.10
```

### Por que IP estático?

O Domain Controller fornece DNS e serviços essenciais de autenticação. Clientes precisam encontrá-lo sempre no mesmo endereço.

### ⚠️ Observação

Antes de o DNS do domínio estar instalado, alguns testes de resolução de nomes podem falhar. Isso é esperado.

---

# 7. Active Directory

## 🟢 Objetivo

Transformar DC01 em Domain Controller do domínio `corp.lab`.

## 7.1 Instalar AD DS

Abra:

`Server Manager → Add Roles and Features`

Em **Server Roles**, marque:

`Active Directory Domain Services`

Quando aparecer:

`Add Features`

confirme.

Continue até:

`Install`

### Por que instalar AD DS antes de promover?

O papel AD DS fornece os componentes necessários para transformar o servidor em Domain Controller. A instalação do papel, sozinha, ainda não cria o domínio.

## 7.2 Promover o servidor

Após a instalação:

`Server Manager → Notifications`

Clique:

`Promote this server to a domain controller`

Selecione:

`Add a new forest`

Informe:

```text
Root domain name: corp.lab
```

Mantenha habilitados:

- DNS Server.
- Global Catalog.

Defina a senha do DSRM.

Finalize e reinicie.

## 7.3 🔵 Validação

Abra:

`Server Manager → Tools`

Confirme a existência de:

- Active Directory Users and Computers.
- DNS.
- Group Policy Management.

No PowerShell:

```powershell
ipconfig /all
nslookup corp.lab
dcdiag
```

Resultado esperado:

- DC01 possui `192.168.50.10`.
- DNS aponta para `192.168.50.10`.
- `corp.lab` resolve.
- `dcdiag` não apresenta falhas críticas.

---

# 8. DNS

## 🟢 Objetivo

Entender o DNS como componente essencial do Active Directory.

O fluxo é:

```text
Cliente
  ↓
DNS
  ↓
Localização do DC
  ↓
Kerberos / LDAP / autenticação
```

## 8.1 Abrir DNS

No DC01:

`Server Manager → Tools → DNS`

Verifique:

`Forward Lookup Zones → corp.lab`

Procure registros relacionados ao Domain Controller.

## 8.2 🔵 Validação

No CLIENT01, posteriormente:

```powershell
nslookup corp.lab
nslookup dc01.corp.lab
```

O DNS deve responder pelo DC01.

### ⚠️ Falha comum

Se o cliente usar DNS público, como `8.8.8.8`, o domínio `corp.lab` não será resolvido corretamente.

Em um domínio Microsoft, os clientes devem utilizar o DNS interno capaz de resolver os registros do AD.

---

# 9. DHCP

## 🟢 Objetivo

Fazer o DC01 entregar IP e DNS aos clientes.

## 9.1 Instalar DHCP

Abra:

`Server Manager → Add Roles and Features → Server Roles`

Marque:

`DHCP Server`

Finalize a instalação.

Depois:

`Server Manager → Tools → DHCP`

## 9.2 Criar escopo

Abra:

`DHCP → DC01 → IPv4`

Clique com botão direito em IPv4:

`New Scope`

Nome:

`LAB-SCOPE`

Configure:

```text
Start IP:       192.168.50.100
End IP:         192.168.50.200
Subnet Mask:    255.255.255.0
```

Configure as opções do escopo:

```text
Router/Gateway: 192.168.50.1
DNS Server:     192.168.50.10
DNS Domain:     corp.lab
```

Ative o escopo.

### Por que entregar o DNS 192.168.50.10?

Porque o DC01 é o DNS autoritativo do laboratório. O cliente precisa consultar o DNS interno para localizar o domínio e os serviços do AD.

## 9.3 🔵 Validação

No CLIENT01:

```powershell
ipconfig /release
ipconfig /renew
ipconfig /all
```

Confirme:

- IP entre `192.168.50.100` e `192.168.50.200`.
- DNS `192.168.50.10`.
- domínio `corp.lab` quando aplicável.

---

# 10. Estrutura de OUs

## 🟢 Objetivo

Organizar objetos e preparar escopo para GPO e delegação.

Abra:

`Server Manager → Tools → Active Directory Users and Computers`

No domínio `corp.lab`, crie:

```text
corp.lab
├── Users
├── Groups
├── Admins
├── Servers
├── Workstations
└── ServiceAccounts
```

### Por que usar OUs?

OUs permitem aplicar políticas e organizar administração por contexto. Não use a organização apenas como estética: cada OU deve ter uma finalidade administrativa.

---

# 11. Usuários e grupos

## 11.1 Criar usuários

Na OU `Users`:

`New → User`

Crie:

```text
joao.silva
maria.santos
ana.financeiro
carlos.rh
```

Crie uma conta administrativa separada na OU `Admins`:

```text
adm.iam
```

### Por que separar conta comum e administrativa?

Uma conta administrativa possui maior impacto em caso de comprometimento. A separação reduz a exposição do privilégio durante atividades comuns.

## 11.2 Criar grupos

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

### Regra de acesso

Prefira:

```text
Usuário → Grupo → Permissão → Recurso
```

Evite:

```text
Usuário → Permissão direta
```

### Por que?

Grupos facilitam provisionamento, revogação, auditoria e Access Review.

---

# 12. GPO

## 🟢 Objetivo

Aplicar controles de segurança de maneira centralizada.

Abra:

`Server Manager → Tools → Group Policy Management`

Crie:

`GPO-LAB-Security`

Vincule inicialmente à OU `Workstations`.

### Por que não aplicar no domínio inteiro imediatamente?

Uma política incorreta pode afetar todos os computadores. O laboratório deve reproduzir o princípio:

```text
Piloto → Teste → Validação → Expansão
```

## 12.1 Políticas iniciais

Pratique, de forma controlada:

- auditoria;
- bloqueio de tela;
- configurações de senha;
- Windows Firewall;
- restrições administrativas apropriadas.

Não aplique configurações agressivas sem antes criar snapshot da VM.

## 12.2 🔵 Validação

No CLIENT01:

```powershell
gpupdate /force
gpresult /r
```

Confirme se a GPO aparece como aplicada.

---

# 13. Windows Client

## 🟢 Objetivo

Criar uma estação que consuma os serviços de identidade do domínio.

Crie `CLIENT01` com:

- 2 vCPU.
- 4 GB RAM.
- 60 GB de disco.
- Host-only Adapter `LAB-NET`.

Instale o Windows.

Configure o adaptador para obter IP automaticamente.

### 🔵 Validação

Execute:

```powershell
ipconfig /all
```

Confirme:

- IP fornecido pelo DHCP do DC01.
- DNS `192.168.50.10`.

---

# 14. Joiner

## 🟢 Objetivo

Praticar o processo de entrada de um colaborador.

Modelo:

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

## 14.1 Exercício

Crie:

`joao.financeiro`

Atribua:

`GG-Financeiro`

Registre:

- solicitante;
- aprovador;
- departamento;
- grupo;
- data;
- responsável;
- justificativa.

### 🔵 Validação

Confirme:

```powershell
Get-ADUser joao.financeiro
Get-ADPrincipalGroupMembership joao.financeiro
```

### Conceito

Provisionamento não é apenas criar usuário. É criar uma identidade com autorização justificada e rastreável.

---

# 15. Mover

## 🟢 Objetivo

Simular mudança de função.

Mude `joao.financeiro` de Financeiro para TI.

Faça:

1. adicionar `GG-TI`;
2. verificar permissões antigas;
3. remover `GG-Financeiro` se não houver necessidade legítima;
4. validar novo acesso;
5. registrar evidência.

### Por que remover o grupo antigo?

Para evitar **Privilege Creep**: acúmulo de acessos que deixaram de ser necessários.

---

# 16. Leaver

## 🟢 Objetivo

Praticar desligamento e revogação.

Fluxo:

```text
Desligamento
 ↓
Disable Account
 ↓
Revisar grupos
 ↓
Remover acessos
 ↓
Revisar sessões/tokens quando aplicável
 ↓
Registrar evidência
```

No AD:

- desabilite a conta;
- remova grupos conforme política do exercício;
- mova para uma OU de contas desativadas se você criar essa OU;
- registre o procedimento.

### 🔵 Validação

```powershell
Get-ADUser joao.financeiro -Properties Enabled
```

Resultado esperado:

`Enabled = False`

### Importante

Em ambiente híbrido/cloud, o desligamento também deve considerar aplicações, VPN, Microsoft 365, Entra ID, grupos, roles, sessões e credenciais de workload.

---

# 17. Contas privilegiadas

## 🟢 Objetivo

Separar identidade administrativa da identidade de uso diário.

Use:

```text
Conta comum:     luiz
Conta admin:     adm.iam
```

A conta privilegiada não deve ser usada para navegação, e-mail ou atividades comuns.

### Modelo

```text
Usuário comum
 ↓
Atividade diária

Conta administrativa
 ↓
Administração
```

### 🔵 Validação

Documente quais tarefas exigem `adm.iam` e quais não exigem.

---

# 18. RBAC e Least Privilege

## 18.1 Conceito

RBAC associa permissões a funções, não a indivíduos isolados.

```text
Identidade
 ↓
Função
 ↓
Permissão
 ↓
Recurso
```

## 18.2 Exercício

Crie um cenário de leitura:

`GG-IAM-Readers`

E um cenário administrativo:

`GG-IAM-Admins`

Teste o que cada identidade consegue fazer.

### Perguntas obrigatórias

- O acesso é necessário?
- O escopo é o menor possível?
- O privilégio é permanente?
- Existe aprovação?
- Existe auditoria?
- Como o acesso será revogado?

---

# 19. Microsoft Entra ID

## 🟢 Objetivo

Migrar o modelo mental de IAM local para identidade cloud.

Conceitos:

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

Acesse o Microsoft Entra admin center.

Não crie recursos Azure antes de entender o modelo de identidade.

---

# 20. Entra Users e Groups

Crie usuários de laboratório:

```text
iam.user01
iam.user02
iam.admin01
iam.pimlab
```

Crie grupos:

```text
IAM-Lab-Users
IAM-Lab-Readers
IAM-Lab-Admins
```

Atribua usuários aos grupos conforme a função do exercício.

### Por que grupos?

A Microsoft recomenda grupos para facilitar delegação, acesso a aplicações e administração de identidades. Grupos também reduzem atribuições individuais e facilitam revisões.

### 🔵 Validação

Para cada usuário, registre:

- grupos;
- roles;
- aplicações;
- recursos acessíveis;
- justificativa.

---

# 21. Azure RBAC

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

Crie, se sua subscription permitir:

`rg-iam-lab`

Teste uma identidade com:

`Reader`

Depois, em um exercício controlado, teste:

`Contributor`

Após validar a diferença, remova o privilégio elevado.

### Por que?

Para compreender a diferença entre:

- autenticar;
- possuir uma role;
- possuir uma role em determinado escopo.

### Regra

Prefira o menor escopo:

```text
Resource > Resource Group > Subscription
```

quando a tarefa permitir.

---

# 22. MFA

## 🟢 Objetivo

Adicionar um fator adicional à autenticação.

Existem diferentes formas de habilitar MFA no ecossistema Microsoft Entra. Security Defaults podem fornecer MFA básico sem depender de Conditional Access; Conditional Access exige licenciamento adequado.

### Exercício básico

Habilite MFA para a identidade de laboratório conforme os recursos disponíveis no tenant.

Faça login e complete o registro/método de autenticação.

### 🔵 Validação

Verifique o resultado no:

`Microsoft Entra admin center → Sign-in logs`

Procure os detalhes de autenticação.

---

# 23. Conditional Access

## 🟢 Objetivo

Criar políticas do tipo:

```text
SE condição
ENTÃO controle
```

Exemplo:

```text
SE usuário privilegiado
ENTÃO exigir MFA
```

## 23.1 Licenciamento

Conditional Access requer Microsoft Entra ID P1 ou licença que inclua essa capacidade. Microsoft 365 Business Premium também inclui Conditional Access.

Políticas baseadas em risco dependem de Microsoft Entra ID Protection, associado ao P2.

Consulte a documentação oficial antes de executar o módulo porque licenciamento e funcionalidades podem mudar.

## 23.2 Primeira política

Crie:

`CA-LAB-Admins-MFA`

Aplique inicialmente somente a identidade de laboratório `iam.admin01`.

### Por que começar com escopo pequeno?

Para reduzir o risco de bloqueio administrativo.

## 23.3 Configuração

No portal:

`Entra ID → Protection → Conditional Access → Policies → New policy`

Configure:

- nome;
- usuários selecionados;
- aplicação de teste;
- condição necessária;
- grant control para MFA;
- primeiro modo `Report-only` quando apropriado.

### Por que Report-only?

Para observar o impacto da política antes de impor o bloqueio.

## 23.4 🔵 Validação

Faça login com o usuário de teste.

Depois abra:

`Entra ID → Monitoring & health → Sign-in logs`

Analise:

- usuário;
- aplicação;
- resultado;
- MFA;
- Conditional Access;
- Authentication Details.

## 23.5 What If

Use a ferramenta `What If` para simular uma solicitação antes de alterar a política.

Teste:

- usuário;
- aplicação;
- localização;
- dispositivo.

O objetivo é descobrir quais políticas seriam aplicadas.

---

# 24. Logs e auditoria

## 24.1 Entra Sign-in Logs

Use para investigar autenticações.

Perguntas:

- Quem autenticou?
- Quando?
- De qual IP?
- Qual aplicação?
- Qual resultado?
- MFA foi usado?
- Qual política de Conditional Access foi aplicada?

## 24.2 Entra Audit Logs

Use para investigar alterações administrativas.

Exemplos:

- usuário criado;
- usuário excluído;
- grupo alterado;
- role atribuída;
- aplicação alterada.

## 24.3 Windows Security Logs

No CLIENT01/DC01:

`Event Viewer → Windows Logs → Security`

Investigue eventos de:

- logon;
- falha de logon;
- criação de usuário;
- alteração de grupo;
- uso de conta privilegiada.

---

# 25. Access Review

## 🟢 Objetivo

Revisar se acessos continuam necessários.

Para cada identidade:

```text
Usuário
 ↓
Grupo / Role
 ↓
Recurso
 ↓
Justificativa
 ↓
Necessidade atual
```

Resultado:

- Aprovar.
- Revogar.
- Alterar.

### Exercício

Crie uma planilha ou Markdown com 10 acessos fictícios.

Para cada um, determine:

- manter;
- remover;
- alterar.

Justifique cada decisão.

### Licenciamento

Recursos específicos de Access Reviews podem exigir licenciamento Microsoft Entra P2 ou Governance, dependendo do cenário. Não assuma que todo tipo de revisão é gratuito.

---

# 26. PIM

## 🟢 Objetivo

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
Privilégio temporário
 ↓
Expiration
```

## 26.1 Licenciamento

Para usar PIM e suas configurações, a Microsoft exige Microsoft Entra ID P2 ou Microsoft Entra ID Governance, conforme a documentação atual.

Usuários com atribuições elegíveis ou temporárias, aprovadores e participantes de determinadas Access Reviews podem precisar de licença conforme o cenário.

## 26.2 Estratégia econômica do laboratório

Você pode concentrar os exercícios em uma única identidade de laboratório licenciada:

`iam.pimlab`

Fluxo:

```text
iam.pimlab
 ↓
Role A
 ↓
Teste
 ↓
Remover
 ↓
Role B
 ↓
Teste
 ↓
Remover
```

Isso não significa que uma licença cobre arbitrariamente qualquer usuário em produção. É uma estratégia de **laboratório individual** e deve respeitar os termos de licenciamento do tenant.

## 26.3 Exercício

Atribua uma role como `Eligible` para `iam.pimlab`.

Ative o privilégio.

Observe:

- MFA;
- justificativa;
- duração;
- estado ativo;
- expiração;
- auditoria.

### 🔵 Validação

Após a expiração, confirme que a identidade não mantém o privilégio ativo.

---

# 27. JIT

## 🟢 Objetivo

Entender Just-In-Time Access.

Modelo:

```text
Sem privilégio
 ↓
Necessidade
 ↓
Solicitação
 ↓
Aprovação/controle
 ↓
Ativação
 ↓
Privilégio temporário
 ↓
Expiração
```

PIM será utilizado como exercício prático de JIT para privilégios Azure/Entra quando disponível.

### Conceito essencial

JIT reduz a janela de exposição de uma identidade privilegiada.

---

# 28. JEA

## 🟢 Objetivo

Praticar **Just Enough Administration** no Windows PowerShell.

A ideia não é dar acesso administrativo completo. É permitir somente as operações necessárias.

Exemplo conceitual:

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

Crie uma sessão JEA de laboratório que permita uma operação administrativa limitada, como consultar ou reiniciar um serviço específico.

O operador não deve possuir acesso irrestrito ao PowerShell administrativo.

### 🔵 Validação

Teste:

- comando permitido;
- comando não permitido;
- acesso ao recurso autorizado;
- tentativa fora do escopo.

---

# 29. PAM

## 🟢 Objetivo

Entender PAM como disciplina de proteção de acesso privilegiado.

PAM pode incluir:

- contas administrativas separadas;
- Least Privilege;
- JIT;
- PIM;
- JEA;
- PAW;
- Jump Host;
- vault de credenciais;
- rotação de credenciais;
- aprovação;
- gravação/auditoria de sessão.

## 29.1 O que será feito gratuitamente

O laboratório não depende de um produto PAM comercial.

Você irá simular os princípios usando:

```text
Conta comum
Conta administrativa
Least Privilege
PIM
JIT
JEA
PAW conceitual
Jump Host conceitual
Auditoria
Revogação
```

## 29.2 PAW conceitual

Use o CLIENT01 como estação administrativa de laboratório.

Regra:

```text
Atividade diária → conta comum
Administração → conta privilegiada / estação administrativa
```

---

# 30. PowerShell

## 🟢 Objetivo

Automatizar tarefas repetitivas de IAM.

Pratique:

```powershell
Get-ADUser
New-ADUser
Disable-ADAccount
Get-ADGroup
Get-ADGroupMember
Add-ADGroupMember
Remove-ADGroupMember
```

## 30.1 Script Joiner

O script deverá receber:

- nome;
- sobrenome;
- departamento;
- grupo.

Executar:

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

## 30.2 Script Leaver

Executar:

```text
Localizar usuário
 ↓
Desabilitar
 ↓
Listar grupos
 ↓
Remover grupos conforme regra
 ↓
Registrar alterações
```

### Regra de segurança

Scripts de IAM devem validar entrada e evitar operações destrutivas em massa sem confirmação explícita.

---

# 31. Microsoft Graph

## 🟢 Objetivo

Administrar objetos do Entra por API.

Estude:

- Users.
- Groups.
- Applications.
- Service Principals.
- Directory Roles.
- Role Assignments.

Modelo:

```text
PowerShell / Script
 ↓
Microsoft Graph
 ↓
Microsoft Entra ID
 ↓
Objeto de identidade
```

## Exercício

Realize pelo Graph uma operação equivalente a uma tarefa já feita no portal.

Compare:

- portal;
- PowerShell;
- API.

O objetivo é entender que a interface é apenas uma camada de administração.

---

# 32. Service Principal

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

Compare com:

```text
Human Identity
```

### Segurança

Não conceda permissões excessivas a aplicações.

Registre:

- finalidade;
- proprietário;
- permissões;
- escopo;
- segredo/certificado quando houver;
- data de revisão.

---

# 33. Managed Identity

## 🟢 Objetivo

Entender identidade de workload sem armazenar credenciais manualmente.

Modelo:

```text
Azure Resource
 ↓
Managed Identity
 ↓
Token
 ↓
Azure Resource/API
```

A principal vantagem é reduzir a necessidade de armazenar secrets no código.

### Regra

Managed Identity não elimina Least Privilege. A identidade ainda precisa receber somente as permissões necessárias.

---

# 34. Identidade híbrida

## 🟡 Módulo avançado

Somente execute depois de dominar AD e Entra separadamente.

Conceito:

```text
Active Directory
 ↓
Sincronização
 ↓
Microsoft Entra ID
 ↓
Cloud Access
```

Estude:

- UPN.
- Source of Authority.
- sincronização.
- Password Hash Synchronization.
- Microsoft Entra Connect.
- Microsoft Entra Cloud Sync.

## Laboratório

Se os recursos da máquina permitirem, adicione posteriormente uma VM de sincronização.

Não mantenha essa VM ligada durante os demais módulos.

### Objetivo

Entender o ciclo:

```text
Criar no AD
 ↓
Sincronizar
 ↓
Aparecer no Entra
 ↓
Acessar cloud
 ↓
Desabilitar no AD
 ↓
Sincronizar
 ↓
Revogar
```

---

# 35. IAM + Wazuh

## 🟡 Módulo avançado

Ligue somente:

- DC01.
- LINUX01.

Não é necessário manter CLIENT01 ligado se o exercício não exigir interação do usuário.

## 35.1 Arquitetura

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

## 35.2 Eventos para investigar

Pratique detecção de:

- login bem-sucedido;
- login falho;
- criação de usuário;
- alteração de grupo;
- adição a grupo privilegiado;
- uso de conta administrativa;
- alterações suspeitas.

## 35.3 Exercício

Faça:

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
```

Perguntas:

- Quem?
- Quando?
- De onde?
- O que mudou?
- Qual privilégio?
- Qual recurso?
- É legítimo?
- Qual ação deve ser tomada?

---

# 36. Cenários de incidente

## Cenário 1 — Privilege Escalation

Simule a adição de uma conta comum a um grupo privilegiado.

Investigue:

- evento;
- responsável;
- horário;
- grupo;
- usuário;
- justificativa.

Depois remova o privilégio.

## Cenário 2 — Password Spray conceitual

Gere várias falhas controladas de autenticação no laboratório.

Procure:

- origem;
- quantidade;
- contas afetadas;
- intervalo de tempo.

Não faça testes contra sistemas externos.

## Cenário 3 — Leaver incompleto

Desabilite uma conta, mas deixe uma associação de grupo como cenário de revisão.

Identifique o acesso residual e corrija.

## Cenário 4 — Privilege Creep

Dê a uma identidade acesso de Financeiro e TI.

Depois mude a função para RH.

Faça uma Access Review e remova os acessos antigos.

---

# 37. Projeto final

## 🏢 Empresa fictícia

Use:

`ACME Corporation`

Departamentos:

- Financeiro.
- RH.
- TI.
- SOC.
- IAM.

## 37.1 Identidades

Crie 20 usuários:

```text
Financeiro: 5
RH:         4
TI:         6
SOC:        3
IAM:        2
```

## 37.2 Grupos

```text
GG-Financeiro
GG-RH
GG-TI
GG-SOC
GG-IAM
GG-IAM-Readers
GG-IAM-Admins
```

## 37.3 Contas administrativas

Crie identidades administrativas separadas.

Não use Global Administrator como conta diária.

## 37.4 Processos

Execute:

- 5 Joiners.
- 5 Movers.
- 5 Leavers.
- 5 Access Reviews.
- 3 alterações privilegiadas.
- 3 investigações de logs.
- 1 incidente completo.

## 37.5 Incidente final

Simule:

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

---

# 38. Evidências e GitHub

## 38.1 Estrutura recomendada

```text
01-IAM/
├── Estudo-Pratico-BluePrint.md
├── evidencias/
│   ├── 01-rede/
│   ├── 02-ad/
│   ├── 03-dns/
│   ├── 04-dhcp/
│   ├── 05-gpo/
│   ├── 06-users-groups/
│   ├── 07-jml/
│   ├── 08-rbac/
│   ├── 09-entra/
│   ├── 10-mfa/
│   ├── 11-conditional-access/
│   ├── 12-audit/
│   ├── 13-access-review/
│   ├── 14-pim/
│   ├── 15-jea-jit-pam/
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

## 38.2 Template de evidência

Para cada exercício, registre:

```markdown
# Nome do exercício

## Objetivo

## Ambiente

## Pré-requisitos

## Configuração

## Por que esta configuração?

## Validação

## Resultado esperado

## Resultado obtido

## Falhas encontradas

## Correção

## Evidências

## Aprendizado
```

Não publique:

- senhas;
- tokens;
- client secrets;
- certificados privados;
- chaves SSH privadas;
- cookies;
- dados pessoais reais.

Use somente dados fictícios.

---

# 39. Checklist

## 39.1 Infraestrutura

- [ ] VirtualBox instalado.
- [ ] Host-only Network criada.
- [ ] DHCP do VirtualBox desativado.
- [ ] DC01 criado.
- [ ] IP estático configurado.
- [ ] CLIENT01 criado.
- [ ] DHCP Windows funcionando.
- [ ] LINUX01 criado somente para SIEM.

## 39.2 Active Directory

- [ ] AD DS instalado.
- [ ] `corp.lab` criado.
- [ ] DNS validado.
- [ ] `dcdiag` validado.
- [ ] OUs criadas.
- [ ] Usuários criados.
- [ ] Grupos criados.
- [ ] GPO criada.
- [ ] Cliente ingressado no domínio.

## 39.3 IAM

- [ ] Joiner.
- [ ] Mover.
- [ ] Leaver.
- [ ] Provisioning.
- [ ] Deprovisioning.
- [ ] RBAC.
- [ ] Least Privilege.
- [ ] Privilege Creep.
- [ ] Access Review.
- [ ] Segregation of Duties.

## 39.4 Entra

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
- [ ] PIM.

## 39.5 Privileged Access

- [ ] Conta administrativa separada.
- [ ] Least Privilege.
- [ ] JIT.
- [ ] PIM.
- [ ] JEA.
- [ ] PAM conceitual.
- [ ] PAW conceitual.
- [ ] Auditoria.
- [ ] Revogação.

## 39.6 Automação

- [ ] PowerShell AD.
- [ ] Provisionamento automatizado.
- [ ] Desprovisionamento automatizado.
- [ ] Auditoria automatizada.
- [ ] Microsoft Graph.
- [ ] Service Principal.
- [ ] Managed Identity.

## 39.7 Segurança

- [ ] Windows Security Events.
- [ ] Wazuh Agent.
- [ ] Wazuh.
- [ ] Detecção.
- [ ] Investigação.
- [ ] Resposta.
- [ ] Evidências.

---

# 40. Critério de conclusão

O laboratório estará concluído quando você conseguir realizar cada processo sem copiar mecanicamente o tutorial.

Você deve conseguir:

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

## Perguntas finais

Para qualquer acesso, responda:

1. Quem é a identidade?
2. Como ela foi autenticada?
3. O que ela pode acessar?
4. Qual é a role?
5. Qual é o escopo?
6. Por que ela precisa do acesso?
7. Quem aprovou?
8. Por quanto tempo?
9. Como o acesso é monitorado?
10. Como será revogado?

Se você consegue responder essas dez perguntas com evidências, o laboratório cumpriu seu objetivo de IAM.

---

# 41. Referências oficiais

Consulte a documentação atual antes de executar recursos que dependam de licenciamento ou que tenham mudado de interface.

- Microsoft Entra ID: https://learn.microsoft.com/entra/identity/
- Microsoft Entra users/groups: https://learn.microsoft.com/entra/identity/users/
- Microsoft Entra RBAC: https://learn.microsoft.com/entra/identity/role-based-access-control/
- Conditional Access: https://learn.microsoft.com/entra/identity/conditional-access/
- Conditional Access planning: https://learn.microsoft.com/entra/identity/conditional-access/plan-conditional-access
- Microsoft Entra licensing: https://learn.microsoft.com/entra/fundamentals/licensing
- PIM: https://learn.microsoft.com/entra/id-governance/privileged-identity-management/
- Azure RBAC: https://learn.microsoft.com/azure/role-based-access-control/
- Microsoft Graph: https://learn.microsoft.com/graph/
- Active Directory Domain Services: https://learn.microsoft.com/windows-server/identity/ad-ds/
- Windows Security Auditing: https://learn.microsoft.com/windows/security/threat-protection/auditing/
- Wazuh: https://documentation.wazuh.com/
- CIS Benchmarks: https://www.cisecurity.org/cis-benchmarks

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
