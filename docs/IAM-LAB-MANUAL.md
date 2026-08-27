# 🛡️ Laboratório IAM — Manual Prático

> Projeto prático para desenvolver competências de IAM com Active Directory, Microsoft Entra ID, Azure RBAC, MFA, Conditional Access, PIM, JIT, JEA, auditoria, PowerShell, Microsoft Graph e integração com SIEM.

## 🧭 Navegação

- [Objetivo](#objetivo)
- [Arquitetura](#arquitetura)
- [Estratégia para máquina limitada](#estratégia-para-máquina-limitada)
- [Pré-requisitos](#pré-requisitos)
- [Fase 1 — Rede VirtualBox](#fase-1--rede-virtualbox)
- [Fase 2 — Domain Controller](#fase-2--domain-controller)
- [Fase 3 — DNS e Active Directory](#fase-3--dns-e-active-directory)
- [Fase 4 — OUs, usuários e grupos](#fase-4--ous-usuários-e-grupos)
- [Fase 5 — DHCP](#fase-5--dhcp)
- [Fase 6 — Windows Client e Domain Join](#fase-6--windows-client-e-domain-join)
- [Fase 7 — GPO](#fase-7--gpo)
- [Fase 8 — Joiner, Mover e Leaver](#fase-8--joiner-mover-e-leaver)
- [Fase 9 — Entra ID](#fase-9--entra-id)
- [Fase 10 — Azure RBAC](#fase-10--azure-rbac)
- [Fase 11 — MFA](#fase-11--mfa)
- [Fase 12 — Conditional Access](#fase-12--conditional-access)
- [Fase 13 — PIM](#fase-13--pim)
- [Fase 14 — PAM, JIT e JEA](#fase-14--pam-jit-e-jea)
- [Fase 15 — Auditoria](#fase-15--auditoria)
- [Fase 16 — Access Review e SoD](#fase-16--access-review-e-sod)
- [Fase 17 — PowerShell e Graph](#fase-17--powershell-e-graph)
- [Fase 18 — Workload Identity](#fase-18--workload-identity)
- [Fase 19 — IAM híbrido](#fase-19--iam-híbrido)
- [Fase 20 — IAM + SIEM](#fase-20--iam--siem)
- [Fase 21 — Projeto final](#fase-21--projeto-final)
- [Evidências e GitHub](#evidências-e-github)
- [Checklist](#checklist)

---

## Objetivo

Construir um ambiente corporativo fictício em que o ciclo completo da identidade seja praticado:

`Identidade → Autenticação → Autorização → Privilégio → Monitoramento → Revisão → Revogação`

O laboratório não pretende apenas ensinar onde clicar. Cada exercício explica primeiro **o que está sendo configurado e por quê**, depois mostra o caminho na interface, o teste e a evidência que deve ser registrada.

---

## Arquitetura

### On-premises

```text
HOST
└── VirtualBox
    └── LAB Network — 192.168.50.0/24
        ├── LAB-DC01 — 192.168.50.10
        │   ├── AD DS
        │   ├── DNS
        │   └── DHCP
        ├── LAB-CLIENT01 — DHCP
        └── LAB-LINUX01 — somente quando necessário
            └── Wazuh
```

### Cloud

```text
Microsoft Entra ID
├── Users
├── Groups
├── Directory Roles
├── MFA
├── Conditional Access
└── PIM
    └── Azure RBAC
        └── Resource Group
            └── Recursos do laboratório
```

O Active Directory depende do DNS para descoberta dos controladores de domínio e serviços do domínio; portanto, o DNS interno do laboratório será o próprio `LAB-DC01`. citeturn0search1turn0search19

---

## Estratégia para máquina limitada

Não mantenha todas as VMs ligadas.

### Módulo AD

Ligar:

- `LAB-DC01`
- `LAB-CLIENT01`

### Módulo SIEM

Ligar:

- `LAB-DC01`
- `LAB-LINUX01`

### Módulo Cloud IAM

Não exige VM:

- navegador
- Microsoft Entra Admin Center
- Azure Portal

### Regra

Ao terminar um módulo:

1. Salve as alterações.
2. Desligue a VM que não será utilizada.
3. Inicie apenas as VMs necessárias para o próximo exercício.

---

## Pré-requisitos

### Hardware recomendado

- 16 GB RAM
- CPU com 4 threads ou mais
- SSD
- virtualização habilitada na BIOS/UEFI

### Distribuição de RAM

Sugestão para uma máquina de 16 GB:

- `LAB-DC01`: 4 GB
- `LAB-CLIENT01`: 4 GB
- `LAB-LINUX01`: 4 GB somente durante o módulo SIEM
- host e demais aplicações: aproximadamente 4 GB

Se a máquina possuir menos RAM, reduza recursos e mantenha apenas duas VMs simultâneas.

### Software

- Oracle VirtualBox
- Windows Server
- Windows Client
- Rocky Linux ou outra distribuição Linux suportada pelo Wazuh
- conta Microsoft para o tenant de laboratório
- Azure Subscription somente para os exercícios que exigirem recursos Azure

Nunca coloque senhas, tokens, chaves, certificados ou dados pessoais reais no repositório.

---

# Fase 1 — Rede VirtualBox

## 1.1 Por que usar Host-only?

A rede Host-only permite comunicação entre host e VMs sem conectar a rede do laboratório diretamente à Internet. O VirtualBox possui DHCP próprio para Host-only, mas neste projeto ele será desligado porque o Windows Server será o DHCP oficial do laboratório. citeturn0search10turn0search12

## 1.2 Criar a rede

No VirtualBox:

1. Abra **VirtualBox Manager**.
2. Abra **Tools / Ferramentas**.
3. Abra **Network / Rede** ou **Network Manager / Gerenciador de Rede**, conforme a versão.
4. Crie uma rede **Host-only**.
5. Edite a rede criada.
6. Configure o adaptador do host com:

   - IPv4: `192.168.50.1`
   - máscara: `255.255.255.0`

7. Localize a seção **DHCP Server**.
8. Desative o DHCP do VirtualBox.

### Por que o DHCP fica desativado?

Porque haverá um segundo DHCP, o Windows Server. Dois DHCPs competindo na mesma rede podem entregar IP, DNS ou gateway diferentes. Para o laboratório, a autoridade DHCP deve ser única.

Resultado esperado:

```text
Host-only Network
IPv4: 192.168.50.1/24
VirtualBox DHCP: OFF
```

---

# Fase 2 — Domain Controller

## 2.1 Criar a VM

No VirtualBox:

1. Clique **New / Novo**.
2. Nome: `LAB-DC01`.
3. Tipo: Microsoft Windows.
4. RAM: 4096 MB.
5. CPU: 2 vCPU.
6. Disco: 60 GB dinamicamente alocado.
7. Antes de iniciar, abra **Settings → Network**.
8. Em **Adapter 1**, marque **Enable Network Adapter**.
9. Em **Attached to**, selecione **Host-only Adapter**.
10. Selecione a rede criada.

Inicialmente não use bridge nem exponha o DC diretamente à rede doméstica.

## 2.2 Instalar Windows Server

Instale o Windows Server normalmente.

Após o primeiro login:

1. Abra **Server Manager**.
2. Clique **Local Server**.
3. Localize **Computer Name**.
4. Clique no nome atual.
5. Altere para `LAB-DC01`.
6. Reinicie.

### Por que fazer isso antes do AD?

O hostname do controlador deve ser definido antes da promoção para evitar retrabalho e manter uma convenção clara de inventário.

---

# Fase 3 — DNS e Active Directory

## 3.1 Configurar IP fixo

No Windows Server:

1. Abra **Control Panel**.
2. **Network and Internet**.
3. **Network and Sharing Center**.
4. **Change adapter settings**.
5. Clique com botão direito no adaptador.
6. **Properties**.
7. Selecione **Internet Protocol Version 4 (TCP/IPv4)**.
8. **Properties**.
9. Selecione configuração manual.

Use:

```text
IP:       192.168.50.10
Mask:     255.255.255.0
Gateway:  192.168.50.1
DNS:      192.168.50.10
```

### Por que DNS aponta para o próprio servidor?

Depois da promoção, o servidor será o DNS integrado ao Active Directory. Os clientes também deverão utilizar esse DNS para localizar registros do domínio.

## 3.2 Instalar AD DS

No **Server Manager**:

1. **Manage → Add Roles and Features**.
2. Avance até **Server Roles**.
3. Marque **Active Directory Domain Services**.
4. Clique **Add Features**.
5. Continue até **Install**.
6. Aguarde a conclusão.

### Importante

Instalar o papel AD DS não é o mesmo que criar um Domain Controller. A promoção será feita na etapa seguinte.

## 3.3 Promover o servidor

No **Server Manager**:

1. Abra a notificação no topo.
2. Clique **Promote this server to a domain controller**.
3. Escolha **Add a new forest**.
4. Root domain: `corp.lab`.
5. Mantenha **DNS Server** e **Global Catalog** habilitados.
6. Defina a senha de DSRM.
7. Avance até a validação de pré-requisitos.
8. Clique **Install**.
9. Aguarde o reboot.

### Por que `corp.lab`?

É um domínio reservado ao laboratório. Não utilize o domínio corporativo real nem um domínio público que você não controle.

## 3.4 Validar

Depois do reboot, abra PowerShell como administrador e execute:

```text
ipconfig /all
nslookup corp.lab
dcdiag
```

Resultado esperado:

- IP `192.168.50.10`
- DNS `192.168.50.10`
- resolução de `corp.lab`
- `dcdiag` sem falhas críticas relacionadas ao domínio

Se `nslookup` falhar, não avance para Domain Join. Corrija DNS primeiro.

---

# Fase 4 — OUs, usuários e grupos

## 4.1 Criar OUs

Abra:

**Server Manager → Tools → Active Directory Users and Computers**.

No domínio `corp.lab`:

1. Clique com botão direito.
2. **New → Organizational Unit**.
3. Crie:

```text
Users
Groups
Servers
Workstations
Admins
ServiceAccounts
```

### Por que usar OUs?

OUs permitem aplicar GPOs e delegação administrativa por contexto. Não use a OU padrão `Users` como depósito de todos os objetos do laboratório.

## 4.2 Criar usuários

Na OU `Users`:

1. Botão direito.
2. **New → User**.
3. Crie:

```text
joao.silva
maria.santos
ana.financeiro
carlos.rh
```

Crie uma conta administrativa separada na OU `Admins`:

```text
adm.luiz
```

### Por que separar conta comum e administrativa?

A conta administrativa deve ser utilizada somente quando o trabalho exigir privilégio. Isso reduz a exposição da credencial privilegiada.

## 4.3 Criar grupos

Na OU `Groups`, crie:

```text
GG-Financeiro
GG-RH
GG-TI
GG-SOC
GG-IAM
GG-IAM-Admins
GG-IAM-Readers
```

A regra do laboratório será:

`Usuário → Grupo → Permissão`

Evite atribuir permissões diretamente a usuários quando um grupo representar corretamente a função.

---

# Fase 5 — DHCP

## 5.1 Instalar

No **Server Manager**:

1. **Manage → Add Roles and Features**.
2. Marque **DHCP Server**.
3. Instale.
4. Após a instalação, abra **Tools → DHCP**.

## 5.2 Criar escopo

No console DHCP:

1. Expanda o servidor.
2. Expanda **IPv4**.
3. Botão direito em IPv4.
4. **New Scope**.
5. Nome: `LAB-LAN`.
6. Faixa inicial: `192.168.50.100`.
7. Faixa final: `192.168.50.200`.
8. Máscara: `255.255.255.0`.
9. Gateway: `192.168.50.1`.
10. DNS: `192.168.50.10`.
11. Ative o escopo.

### Por que o DNS entregue é `192.168.50.10`?

Porque os clientes do domínio precisam consultar o DNS que conhece os registros AD DS.

---

# Fase 6 — Windows Client e Domain Join

## 6.1 Criar VM

Crie `LAB-CLIENT01` com:

- 4 GB RAM
- 2 vCPU
- 60 GB disco
- Host-only Adapter na mesma rede

## 6.2 Obter IP

Após instalar o Windows:

1. Abra PowerShell.
2. Execute `ipconfig /all`.
3. Confirme que o endereço está dentro da faixa DHCP.
4. Confirme DNS `192.168.50.10`.

Se o DNS estiver diferente, não faça Domain Join ainda.

## 6.3 Fazer Domain Join

No Windows Client:

1. Abra **Settings → System → About**.
2. Acesse a opção de domínio/renomeação disponível na edição do Windows.
3. Escolha ingresso em domínio.
4. Informe `corp.lab`.
5. Use uma credencial com permissão para ingressar o computador.
6. Reinicie.

Após reiniciar, selecione login com outro usuário e use uma identidade do domínio.

Valide:

```text
whoami
ipconfig /all
```

Resultado esperado:

```text
corp\usuario
```

---

# Fase 7 — GPO

## 7.1 Criar GPO de laboratório

Abra:

**Server Manager → Tools → Group Policy Management**.

1. Expanda `Forest → Domains → corp.lab`.
2. Botão direito em `Workstations`.
3. Crie e vincule `GPO-LAB-Security`.

### Por que vincular primeiro à OU de Workstations?

Porque uma política em teste deve possuir escopo controlado. Evite aplicar mudanças experimentais ao domínio inteiro.

## 7.2 Exercícios

Pratique, em ambiente controlado:

- política de senha
- auditoria
- bloqueio de tela
- Windows Firewall
- configurações de PowerShell
- restrições administrativas

Depois execute no cliente:

```text
gpupdate /force
gpresult /r
```

A evidência deve mostrar se a GPO foi realmente aplicada.

---

# Fase 8 — Joiner, Mover e Leaver

## 8.1 Joiner

Cenário: funcionário entra na empresa.

Processo:

`Solicitação → Aprovação → Identidade → Grupo → Acesso → Evidência`

Crie `joao.financeiro`.

Adicione ao grupo `GG-Financeiro`.

Registre:

- solicitante
- aprovador
- departamento
- grupo
- data
- responsável

## 8.2 Mover

Mova `joao.financeiro` de Financeiro para TI.

Processo:

`Novo contexto → revisar acessos antigos → adicionar novo acesso → remover acesso desnecessário → validar`

Não apenas adicione `GG-TI`. Verifique e remova `GG-Financeiro` se o novo cargo não exigir mais esse acesso.

### Conceito praticado

`Privilege Creep`: acúmulo de privilégios decorrente de mudanças de função sem revisão dos acessos antigos.

## 8.3 Leaver

Simule desligamento.

Processo:

`Disable → remover grupos → remover roles → revogar acessos → revisar sessões → registrar evidência`

No AD, desabilite a conta e confirme que o login deixou de funcionar.

---

# Fase 9 — Entra ID

## 9.1 Preparação

Entre no tenant de laboratório pelo Microsoft Entra Admin Center.

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

## 9.2 Modelo mental

No Entra, diferencie:

- identidade
- grupo
- diretório
- role
- permission
- recurso
- scope

Não confunda **Microsoft Entra directory roles** com **Azure RBAC**. Azure RBAC controla acesso aos recursos Azure; as roles do diretório administram capacidades no Microsoft Entra. O Azure RBAC é baseado em funções e escopos. citeturn0search9turn0search16

---

# Fase 10 — Azure RBAC

## 10.1 Criar Resource Group

No Azure Portal:

1. Pesquise **Resource groups**.
2. Clique **Create**.
3. Selecione a subscription de laboratório.
4. Nome: `rg-iam-lab`.
5. Crie o recurso.

## 10.2 Entender Scope antes de atribuir role

O Azure possui escopos hierárquicos:

`Management Group → Subscription → Resource Group → Resource`

Uma atribuição em escopo superior pode ser herdada por recursos abaixo. Portanto, o escopo deve ser o menor que atende à necessidade. citeturn0search6turn0search18

## 10.3 Exercício Reader

1. Abra `rg-iam-lab`.
2. **Access control (IAM)**.
3. **Add → Add role assignment**.
4. Escolha `Reader`.
5. Selecione `iam.user01`.
6. Revise o escopo.
7. Atribua.
8. Faça login com a identidade.
9. Tente consultar recursos.
10. Registre o resultado.

Depois remova a atribuição e valide novamente.

## 10.4 Exercício Contributor

Repita com `Contributor` somente para compreender a diferença de privilégio.

Depois remova a role.

### Boa prática

Não conceda `Contributor` em subscription quando um Resource Group for suficiente. A Microsoft recomenda least privilege e escopos menores para reduzir impacto em caso de comprometimento. citeturn0search11

---

# Fase 11 — MFA

## 11.1 Primeiro exercício

Use uma identidade administrativa de laboratório.

Ative MFA pelo mecanismo disponível no tenant.

A Microsoft disponibiliza MFA básico por padrões de segurança sem custo adicional; controles avançados via Conditional Access possuem requisitos de licenciamento próprios. citeturn0search8

## 11.2 Testar

1. Abra uma janela privada do navegador.
2. Entre com `iam.admin01`.
3. Complete o registro/desafio MFA.
4. Confirme o acesso.
5. Abra **Sign-in logs**.
6. Localize a autenticação.
7. Observe método de autenticação e resultado.

---

# Fase 12 — Conditional Access

## 12.1 Licenciamento

Conditional Access exige Microsoft Entra ID P1 ou uma licença que inclua o recurso. Políticas baseadas em risco exigem Microsoft Entra ID P2. Confirme o licenciamento do tenant antes de iniciar. citeturn0search0turn0search2

## 12.2 Primeira política

Não comece com todos os usuários.

Crie:

`CA-LAB-Require-MFA-Admins`

Selecione somente `iam.admin01`.

Configuração conceitual:

`Usuário administrativo → acesso → exigir MFA`

## 12.3 Por que testar com escopo pequeno?

Uma política incorreta pode bloquear a própria administração. A documentação da Microsoft recomenda implantação progressiva e análise dos logs antes de ampliar políticas. citeturn0search2

## 12.4 Testar

1. Salve a política.
2. Entre com `iam.admin01`.
3. Confirme o MFA.
4. Abra **Sign-in logs**.
5. Analise a coluna/área de Conditional Access.
6. Confirme qual política foi aplicada.

## 12.5 What If

Antes de expandir a política:

1. Abra **Conditional Access → Policies → What If**.
2. Informe usuário, aplicação e demais condições.
3. Execute a simulação.
4. Verifique quais políticas seriam aplicadas.

O objetivo é prever impacto antes de alterar o escopo.

---

# Fase 13 — PIM

## 13.1 Licenciamento

PIM não deve ser tratado como recurso gratuito. A documentação atual da Microsoft exige Microsoft Entra ID P2 ou Microsoft Entra ID Governance para PIM. citeturn0search5turn0search13

## 13.2 Estratégia econômica

Para estudar PIM, utilize uma única identidade licenciada:

`iam.pimlab`

Você pode atribuir uma role, testar, remover e reutilizar a mesma identidade para outro exercício.

Não é necessário manter diversos usuários licenciados apenas para aprender o fluxo.

## 13.3 Conceito

PIM transforma privilégio permanente em privilégio controlado:

`Eligible → Activate → MFA/Justification → Temporary Access → Expiration`

## 13.4 Exercício

1. Abra **Microsoft Entra ID → Roles and admins**.
2. Escolha uma role apropriada ao laboratório.
3. Abra o gerenciamento de PIM.
4. Adicione `iam.pimlab` como **Eligible**.
5. Não conceda privilégio permanente desnecessário.
6. Ative a role com `Activate`.
7. Informe justificativa.
8. Complete MFA se solicitado.
9. Configure a duração mínima necessária.
10. Confirme a ativação.
11. Valide o acesso.
12. Aguarde a expiração ou remova a atribuição.
13. Valide que o privilégio não está mais ativo.

## 13.5 Evidência

Registre:

- usuário
- role
- estado Eligible
- horário de ativação
- justificativa
- duração
- resultado
- horário de expiração

---

# Fase 14 — PAM, JIT e JEA

## 14.1 PAM

PAM é o conjunto de controles para acesso privilegiado. O laboratório não precisa de uma plataforma comercial para estudar os princípios.

Pratique:

- conta administrativa separada
- least privilege
- MFA
- JIT
- PIM
- JEA
- estação administrativa
- jump host conceitual
- auditoria
- revisão

## 14.2 JIT

JIT significa acesso concedido somente quando necessário e, idealmente, por tempo limitado.

O exercício de PIM representa o principal laboratório de JIT em cloud.

## 14.3 JEA

JEA significa Just Enough Administration.

O objetivo é permitir somente as operações administrativas necessárias, em vez de entregar uma sessão administrativa completa.

Exercício conceitual:

`Operador → função JEA → comandos permitidos → recurso`

O operador deve conseguir executar a tarefa definida, mas não administrar arbitrariamente o servidor.

---

# Fase 15 — Auditoria

## 15.1 Active Directory

No `LAB-DC01`:

**Event Viewer → Windows Logs → Security**

Procure eventos de:

- logon
- falha de logon
- criação de usuário
- alteração de usuário
- alteração de grupo
- inclusão em grupo privilegiado
- alteração de política

## 15.2 Exercício

1. Crie `teste.iam`.
2. Adicione o usuário a um grupo.
3. Remova o usuário do grupo.
4. Consulte o Security Event Log.
5. Identifique quem fez a alteração.
6. Identifique horário.
7. Identifique objeto.
8. Registre evidência.

## 15.3 Entra

Use:

- Sign-in logs
- Audit logs

Para cada evento responda:

`Quem? Quando? De onde? O quê? Resultado?`

---

# Fase 16 — Access Review e SoD

## 16.1 Access Review

Faça uma revisão manual mesmo que o recurso automatizado não esteja licenciado.

Para cada acesso:

`Usuário → Grupo/Role → Recurso → Motivo → Necessidade atual → Decisão`

Decisões:

- Aprovar
- Revogar
- Alterar

## 16.2 Segregation of Duties

Crie dois papéis conceituais:

`IAM-Operator`
`IAM-Approver`

O operador executa.

O aprovador autoriza.

O objetivo é impedir que alterações sensíveis sejam totalmente controladas por uma única identidade quando o processo exigir segregação.

---

# Fase 17 — PowerShell e Graph

## 17.1 Active Directory

Pratique:

```text
Get-ADUser
New-ADUser
Get-ADGroup
Get-ADGroupMember
Add-ADGroupMember
Remove-ADGroupMember
Disable-ADAccount
```

## 17.2 Projeto de automação

Crie:

`powershell/provision-user.ps1`

Entrada:

- nome
- sobrenome
- departamento
- cargo

Processamento:

`Criar usuário → preencher atributos → adicionar grupo → registrar resultado`

Crie também:

`powershell/disable-user.ps1`

Fluxo:

`Disable → obter grupos → remover grupos → registrar alterações`

## 17.3 Microsoft Graph

Depois de dominar a GUI, estude administração de:

- Users
- Groups
- Applications
- Service Principals
- Directory Roles
- Role Assignments

O objetivo é entender IAM como API e não apenas como interface web.

---

# Fase 18 — Workload Identity

## 18.1 Service Principal

Estude a diferença entre:

`Application` e `Service Principal`.

Modelo:

`Application → Service Principal → Permissions → Resource`

## 18.2 Managed Identity

Pratique o conceito:

`Azure Resource → Managed Identity → Token → Azure Resource`

O objetivo é reduzir o uso de segredos armazenados em scripts ou aplicações.

A regra continua sendo least privilege.

---

# Fase 19 — IAM híbrido

Depois de dominar AD e Entra separadamente, estude:

`Active Directory → sincronização → Microsoft Entra ID`

Conceitos:

- UPN
- source of authority
- sincronização
- Password Hash Synchronization
- Entra Connect
- Entra Cloud Sync
- hybrid identity

Não trate o laboratório híbrido como pré-requisito para os módulos anteriores. Ele é uma etapa avançada.

---

# Fase 20 — IAM + SIEM

## 20.1 Ativar Linux somente nesta fase

Ligue:

- `LAB-DC01`
- `LAB-LINUX01`

Não é necessário manter o Linux ligado durante os módulos AD ou Cloud.

## 20.2 Wazuh

Instale o Wazuh conforme a documentação oficial e conecte o Windows ao ambiente de monitoramento.

Fluxo:

`Windows Security Events → Wazuh Agent → Wazuh → Alert → Investigation`

## 20.3 Detecção

Crie exercícios para identificar:

- múltiplas falhas de login
- login bem-sucedido após falhas
- alteração de grupo privilegiado
- criação de usuário
- desativação de usuário

## 20.4 Investigação

Para cada alerta determine:

- identidade
- origem
- horário
- recurso
- ação
- resultado
- privilégio envolvido

Depois classifique:

`Benigno / Suspeito / Incidente`

---

# Fase 21 — Projeto final

## Empresa fictícia

Nome: `ACME Corporation`

Departamentos:

- Financeiro
- RH
- TI
- SOC
- IAM

## Usuários

Crie 20 identidades distribuídas entre os departamentos.

## Grupos

```text
GG-Financeiro
GG-RH
GG-TI
GG-SOC
GG-IAM
GG-IAM-Admins
GG-IAM-Readers
```

## Cenários obrigatórios

### Cenário 1 — Joiner

Novo funcionário → identidade → grupo → acesso → MFA → evidência.

### Cenário 2 — Mover

Mudança de departamento → revisar acessos → adicionar novo acesso → remover acesso antigo → evidência.

### Cenário 3 — Leaver

Desligamento → desabilitar → revogar → revisar → evidência.

### Cenário 4 — Privilégio

Identidade → Eligible → Activate → MFA → justificativa → expiração.

### Cenário 5 — Incidente

Falhas de login → login bem-sucedido → alteração de grupo privilegiado → SIEM → investigação → revogação.

---

# Evidências e GitHub

Estrutura sugerida:

```text
docs/
└── IAM-LAB-MANUAL.md

powershell/
├── provision-user.ps1
├── disable-user.ps1
├── audit-groups.ps1
└── access-review.ps1

evidencias/
├── 01-rede/
├── 02-ad/
├── 03-dns/
├── 04-dhcp/
├── 05-gpo/
├── 06-jml/
├── 07-rbac/
├── 08-entra/
├── 09-mfa/
├── 10-conditional-access/
├── 11-pim/
├── 12-auditoria/
├── 13-access-review/
├── 14-powershell/
├── 15-graph/
├── 16-hybrid/
└── 17-siem/
```

Para cada exercício, crie um `README.md` contendo:

1. Objetivo.
2. Pré-requisitos.
3. O que foi configurado.
4. Por que foi configurado.
5. Passo a passo.
6. Resultado esperado.
7. Resultado obtido.
8. Evidência.
9. Problema encontrado.
10. Correção.
11. Aprendizado.

Não publique screenshots contendo:

- senhas
- tokens
- chaves
- códigos MFA
- e-mails pessoais
- IPs públicos reais
- identificadores sensíveis

---

# Checklist

## Infraestrutura

- [ ] VirtualBox instalado
- [ ] Host-only Network criada
- [ ] DHCP do VirtualBox desativado
- [ ] LAB-DC01 criado
- [ ] IP fixo configurado
- [ ] DNS validado
- [ ] AD DS instalado
- [ ] Domain Controller promovido
- [ ] DHCP Windows configurado
- [ ] LAB-CLIENT01 criado
- [ ] Domain Join validado
- [ ] GPO validada

## IAM

- [ ] Joiner
- [ ] Mover
- [ ] Leaver
- [ ] Provisioning
- [ ] Deprovisioning
- [ ] RBAC
- [ ] Least Privilege
- [ ] Access Review
- [ ] SoD

## Entra

- [ ] Users
- [ ] Groups
- [ ] Directory Roles
- [ ] Azure RBAC
- [ ] MFA
- [ ] Sign-in Logs
- [ ] Audit Logs
- [ ] Conditional Access
- [ ] What If
- [ ] PIM

## Privileged Access

- [ ] Conta administrativa separada
- [ ] MFA
- [ ] JIT
- [ ] PIM
- [ ] JEA
- [ ] PAW/jump host conceitual
- [ ] Auditoria
- [ ] Revogação

## Automação

- [ ] PowerShell AD
- [ ] Provisionamento automatizado
- [ ] Leaver automatizado
- [ ] Microsoft Graph
- [ ] Service Principal
- [ ] Managed Identity

## Segurança

- [ ] Windows Security Events
- [ ] Wazuh
- [ ] Detecção de login
- [ ] Detecção de privilégio
- [ ] Investigação
- [ ] Resposta
- [ ] Evidências

---

# Critério de conclusão

O laboratório estará concluído quando você conseguir executar um ciclo completo sem seguir cegamente o tutorial:

`Planejar → Implementar → Testar → Auditar → Investigar → Corrigir → Revogar → Documentar`

E conseguir explicar, para cada acesso:

`WHO?` — quem é a identidade?

`WHAT?` — o que ela pode acessar?

`WHY?` — por que precisa?

`SCOPE?` — qual o escopo?

`HOW LONG?` — por quanto tempo?

`WHO APPROVED?` — quem aprovou?

`HOW MONITORED?` — como será monitorado?

`HOW REVOKED?` — como será revogado?

---

# Referências oficiais

- Microsoft Entra Conditional Access: https://learn.microsoft.com/pt-br/entra/identity/conditional-access/overview
- Planejamento de Conditional Access: https://learn.microsoft.com/pt-br/entra/identity/conditional-access/plan-conditional-access
- PIM e licenciamento: https://learn.microsoft.com/pt-br/entra/id-governance/licensing-fundamentals
- Comece a usar PIM: https://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-getting-started
- Azure RBAC: https://learn.microsoft.com/pt-br/azure/role-based-access-control/overview
- Azure RBAC — boas práticas: https://learn.microsoft.com/en-us/azure/role-based-access-control/best-practices
- Azure RBAC — escopo: https://learn.microsoft.com/en-us/azure/role-based-access-control/scope-overview
- DNS e AD DS: https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/plan/dns-and-ad-ds
- VirtualBox Host-only Networking: https://docs.oracle.com/en/virtualization/virtualbox/7.1/user/networkingdetails.html
- Wazuh Documentation: https://documentation.wazuh.com/
- CIS Benchmarks: https://www.cisecurity.org/cis-benchmarks
