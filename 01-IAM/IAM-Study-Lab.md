# 🛡️ IAM Study Lab — Entra ID do básico ao avançado

> **Objetivo:** transformar estudo em competência prática de IAM. Execute a missão, valide o resultado, provoque uma falha controlada, investigue, corrija, revogue e documente.

![Entra](https://img.shields.io/badge/Microsoft-Entra_ID-0078D4?style=for-the-badge&logo=microsoft)
![IAM](https://img.shields.io/badge/IAM-Hands--On-6f42c1?style=for-the-badge)
![PAM](https://img.shields.io/badge/PAM-Teleport_CE-2ea44f2?style=for-the-badge)

---

## 🧭 Navegação

- [00 — Como usar](#00--como-usar)
- [01 — Estratégia de licença](#01--estratégia-de-licença)
- [02 — Laboratório econômico](#02--laboratório-econômico)
- [03 — IAM Fundamentals](#03--iam-fundamentals)
- [04 — Active Directory](#04--active-directory)
- [05 — Entra ID](#05--entra-id)
- [06 — MFA e SSPR](#06--mfa-e-sspr)
- [07 — Conditional Access](#07--conditional-access)
- [08 — RBAC, ABAC e Least Privilege](#08--rbac-abac-e-least-privilege)
- [09 — Logs, auditoria e KQL](#09--logs-auditoria-e-kql)
- [10 — B2B e identidade externa](#10--b2b-e-identidade-externa)
- [11 — SSO, SAML, OAuth 2.0 e OIDC](#11--sso-saml-oauth-20-e-oidc)
- [12 — App Registration, Service Principal e APIs](#12--app-registration-service-principal-e-apis)
- [13 — SCIM e provisioning](#13--scim-e-provisioning)
- [14 — Workload Identity](#14--workload-identity)
- [15 — JML](#15--jml)
- [16 — Access Reviews](#16--access-reviews)
- [17 — Entitlement Management](#17--entitlement-management)
- [18 — Lifecycle Workflows](#18--lifecycle-workflows)
- [19 — PIM](#19--pim)
- [20 — PAM com Teleport Community Edition](#20--pam-com-teleport-community-edition)
- [21 — JEA, PAW e Break-glass](#21--jea-paw-e-break-glass)
- [22 — PowerShell, Microsoft Graph e REST](#22--powershell-microsoft-graph-e-rest)
- [23 — Hybrid Identity](#23--hybrid-identity)
- [24 — Cloud IAM](#24--cloud-iam)
- [25 — IGA Enterprise: SailPoint](#25--iga-enterprise-sailpoint)
- [26 — PAM Enterprise](#26--pam-enterprise)
- [27 — ITSM](#27--itsm)
- [28 — Auditoria, compliance e evidências](#28--auditoria-compliance-e-evidências)
- [29 — Projeto final](#29--projeto-final)
- [30 — Portfólio e entrevista](#30--portfólio-e-entrevista)
- [31 — Critério de conclusão](#31--critério-de-conclusão)

---

# 00 — Como usar

## Regra principal

**Não avance porque leu. Avance porque conseguiu executar sem copiar o procedimento.**

Para cada missão use este ciclo:

1. **O que é** — defina em uma frase.
2. **Por que existe** — qual risco resolve.
3. **Quando usar** — cenário corporativo.
4. **Pré-requisitos** — licença, VM, conta e permissões.
5. **Configurar** — clique a clique ou comando a comando.
6. **Validar** — resultado esperado.
7. **Negar** — prove que o acesso indevido falha.
8. **Quebrar** — altere uma única variável.
9. **Investigar** — descubra a causa pelo log/erro.
10. **Corrigir** — restaure a configuração correta.
11. **Revogar** — remova o acesso.
12. **Repetir** — faça novamente sem consultar.
13. **Documentar** — salve evidência sem expor segredo.
14. **Explicar** — explique o cenário em até 60 segundos.

### ✅ Definition of Done

- [ ] Sei definir o conceito.
- [ ] Sei explicar o risco.
- [ ] Sei quando aplicar.
- [ ] Sei configurar.
- [ ] Sei testar permitido.
- [ ] Sei testar negado.
- [ ] Sei localizar o log.
- [ ] Sei diagnosticar uma falha.
- [ ] Sei revogar.
- [ ] Tenho evidência.
- [ ] Consigo repetir sem consulta.

---

# 01 — Estratégia de licença

## ⚠️ Regra do laboratório: 1 licença Entra ID P2

O laboratório foi desenhado para **uma única identidade licenciada**, usada estrategicamente e de forma sequencial.

A documentação atual da Microsoft confirma que o P2 habilita PIM e algumas capacidades de Access Reviews; o licenciamento de recursos de Identity Governance varia por recurso. **Lifecycle Workflows e várias capacidades avançadas de Entitlement Management exigem Microsoft Entra ID Governance/Entra Suite, não devem ser tratados neste manual como automaticamente cobertos por uma única P2.** Consulte a matriz de licenciamento antes de ativar qualquer recurso pago.

### Identidade licenciada

Use:

`LAB-P2-ADMIN`

Essa conta será utilizada para:

- PIM;
- testes de governança compatíveis com P2;
- Access Reviews quando a funcionalidade e o cenário forem licenciados;
- administração do laboratório;
- testes de RBAC e Conditional Access.

### Identidades de teste

Use contas gratuitas/não licenciadas quando o recurso permitir:

- `LAB-USER-ANA` — acesso permitido;
- `LAB-USER-JOAO` — acesso negado;
- `LAB-USER-MARIA` — JML;
- `LAB-USER-CARLOS` — privilégio;
- `LAB-BREAKGLASS` — recuperação.

### Estratégia de troca

Não atribua P2 permanentemente a vários usuários.

Fluxo:

`LAB-P2-ADMIN → executar cenário → remover licença quando necessário → atribuir ao próximo usuário → testar → documentar`

Para PIM, priorize um único administrador elegível e faça todas as ativações sequencialmente. A Microsoft informa que usuários com atribuições elegíveis, aprovadores e revisores podem precisar de licença P2/Governance conforme o cenário; portanto, **não crie múltiplos aprovadores licenciados no laboratório sem necessidade**.

### Recursos que NÃO devem ser simulados como P2 automaticamente

- Lifecycle Workflows completo;
- funcionalidades de Entitlement Management que exigem Governance;
- funcionalidades Enterprise de produtos de terceiros.

Quando a licença não cobrir a execução, faça:

`conceito → desenho → simulação manual → documentação → alternativa gratuita → comparação com produto corporativo`

---

# 02 — Laboratório econômico

## Arquitetura

```text
                    ┌─────────────────────┐
                    │   Microsoft Entra   │
                    │   1 × P2 estratégico │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼──────────────────┐
             │                 │                  │
          IAM/IGA           APIs/SSO            PIM
             │                 │                  │
      ┌──────┴──────┐          │                  │
      │             │          │                  │
   LAB-DC01     LAB-LINUX01    │                  │
      │             │          │                  │
      │          Teleport CE    │                  │
      │             │          │                  │
      └─────────────┴──────────┴──────────────────┘
```

## VMs

| VM | Função | Quando ligar | RAM sugerida |
|---|---|---|---:|
| `LAB-DC01` | AD DS/DNS/GPO/Hybrid | AD/Hybrid | 3–4 GB |
| `LAB-LINUX01` | Linux/SSH/PAM alvo | Teleport | 1–2 GB |
| `LAB-TELEPORT` | Teleport CE | PAM | 1–2 GB |
| `LAB-DB01` | banco para PAM | opcional | 1–2 GB |
| `LAB-K8S01` | Kubernetes | somente K8s | variável |

**Não mantenha todas ligadas.** O cenário padrão usa Entra + uma VM por vez.

## Rede VirtualBox

### Por que

O laboratório precisa de uma rede isolada para evitar dependência de DHCP doméstico e impedir que serviços de teste interfiram na LAN real.

### Criar

1. Abra **VirtualBox**.
2. Vá em **File → Tools → Network Manager**.
3. Abra a área de **Host-only Networks**.
4. Crie uma rede, por exemplo `vboxnet0`.
5. Use IPv4 `192.168.56.1` com máscara `255.255.255.0`.
6. **Desative o DHCP do VirtualBox**.

### Por que DHCP desligado

No laboratório de AD, o **Windows Server será o DHCP autoritativo**. Dois DHCPs na mesma rede podem entregar gateways/DNS incorretos e quebrar resolução, domínio e autenticação.

### Adaptadores das VMs

- Adaptador 1: **Host-only Adapter → vboxnet0**.
- Internet temporária: use NAT em um segundo adaptador somente quando precisar instalar pacotes/atualizações.

### IP planejado

| Host | IP |
|---|---|
| Host VirtualBox | `192.168.56.1` |
| `LAB-DC01` | `192.168.56.10` |
| `LAB-TELEPORT` | `192.168.56.20` |
| `LAB-LINUX01` | `192.168.56.30` |
| `LAB-DB01` | `192.168.56.40` |

DNS dos hosts do laboratório deve apontar para `192.168.56.10` quando o domínio AD estiver ativo.

---

# 03 — IAM Fundamentals

## O que é

IAM controla identidades, autenticação, autorização, acesso e ciclo de vida.

## Por que

O objetivo é garantir:

`identidade correta + acesso correto + recurso correto + momento correto + evidência`

## Faça antes de abrir o portal

Desenhe:

```text
Pessoa
  ↓
Identidade
  ↓
Autenticação
  ↓
Autorização
  ↓
Role
  ↓
Entitlement
  ↓
Recurso
  ↓
Log / Evidência
```

## Teste mental

Para qualquer pedido de acesso responda:

1. Quem é a identidade?
2. Como foi autenticada?
3. Quem autorizou?
4. Qual recurso?
5. Qual permissão?
6. Por quanto tempo?
7. Como revogar?
8. Como provar?

---

# 04 — Active Directory

## Objetivo

Construir a base híbrida que aparece em muitos ambientes IAM corporativos.

## 04.1 Criar VM

1. VirtualBox → **New**.
2. Nome: `LAB-DC01`.
3. Tipo: Microsoft Windows.
4. Instale Windows Server.
5. Configure o adaptador Host-only.
6. Dentro do Windows, abra configurações de rede.
7. Defina IP `192.168.56.10`.
8. Defina DNS para o próprio servidor depois de instalar DNS.

## 04.2 Instalar AD DS

1. **Server Manager**.
2. **Add roles and features**.
3. **Role-based or feature-based installation**.
4. Selecione o servidor.
5. Marque **Active Directory Domain Services**.
6. Aceite os recursos necessários.
7. Instale.
8. Após instalação, clique na notificação.
9. **Promote this server to a domain controller**.
10. Escolha **Add a new forest**.
11. Domínio de laboratório: `lab.local`.
12. Defina senha DSRM.
13. Conclua.
14. Reinicie.

## 04.3 Criar OUs

Abra **Tools → Active Directory Users and Computers**.

Crie:

```text
LAB
├── Users
├── Groups
├── Servers
├── Workstations
└── Admins
```

## 04.4 Criar grupos

Crie:

- `LAB-GRP-FINANCE`;
- `LAB-GRP-IT`;
- `LAB-GRP-ADMINS`;
- `LAB-GRP-READONLY`.

## 04.5 Missão RBAC via grupo

1. Crie ANA.
2. Adicione ANA em `LAB-GRP-FINANCE`.
3. Conceda a permissão ao grupo, não à conta.
4. Teste ANA.
5. Remova ANA do grupo.
6. Teste novamente.

### Por que

Permissões atribuídas a grupos são mais escaláveis e mais fáceis de revisar e revogar.

## 04.6 GPO

Crie uma GPO de laboratório para:

- política de senha;
- bloqueio de tela;
- auditoria básica.

Não aplique configurações destrutivas ao domínio inteiro sem snapshot.

## 04.7 Conceitos que precisam ser explicados durante a prática

- LDAP — diretório/protocolo de consulta;
- Kerberos — autenticação baseada em tickets;
- DNS — dependência crítica do AD;
- OU — estrutura administrativa, não grupo de segurança;
- GPO — configuração aplicada a usuários/computadores;
- grupo — mecanismo de organização/autorização;
- delegação — concessão administrativa limitada.

---

# 05 — Entra ID

## Objetivo

Dominar usuários, grupos, funções, recursos, aplicações e identidade cloud.

## 05.1 Criar usuário

1. Abra **Microsoft Entra admin center**.
2. **Identity → Users → All users**.
3. **New user → Create new user**.
4. Nome: `LAB-USER-ANA`.
5. Defina senha temporária.
6. Salve.

### Teste

Faça login com ANA.

### O que observar

- User principal name;
- object ID;
- account enabled;
- authentication methods;
- group memberships;
- assigned roles.

## 05.2 Criar grupo

1. **Identity → Groups → All groups**.
2. **New group**.
3. Security group.
4. Nome `LAB-GRP-FINANCE`.
5. Adicione ANA.
6. Salve.

### Teste

Remova ANA e confirme que o acesso baseado no grupo desaparece.

## 05.3 Directory roles

1. **Identity → Roles & admins**.
2. Escolha uma função de baixo impacto para estudo.
3. Leia permissões e escopo.
4. Não use Global Administrator para tarefas comuns.

### Pergunta de entrevista

Qual é a diferença entre:

`Directory Role` × `Azure RBAC Role` × `Application Role`?

---

# 06 — MFA e SSPR

## MFA — objetivo

Adicionar uma prova adicional à autenticação.

## Configuração segura de laboratório

Use ANA como única conta-alvo.

1. Abra os métodos de autenticação disponíveis.
2. Registre o método suportado pelo tenant.
3. Faça login.
4. Complete MFA.
5. Vá para **Monitoring & health → Sign-in logs**.
6. Localize o login.
7. Identifique como a autenticação foi satisfeita.

## Falha controlada

Teste um login sem satisfazer a condição.

Registre:

`usuário → aplicação → resultado → método → política`

## SSPR

Faça:

`senha esquecida → validação → redefinição → login`

### Explique

SSPR recupera a credencial; não concede autorização a recursos.

---

# 07 — Conditional Access

## O que

Mecanismo de decisão que aplica controles conforme contexto.

## Por que

Transforma uma regra de segurança em uma decisão automática de acesso.

## 07.1 Primeiro: proteger contra lockout

Antes de criar políticas:

1. Tenha `LAB-BREAKGLASS` fora das políticas de CA que poderiam bloqueá-la.
2. Mantenha credencial protegida fora do repositório.
3. Teste o login de emergência.
4. Documente o uso da conta.

## 07.2 Primeira política

1. **Protection → Conditional Access → Policies**.
2. **Create new policy**.
3. Nome `LAB-CA-001-MFA-ANA`.
4. Users → somente ANA.
5. Target resources → recurso mínimo necessário.
6. Grant → Require multifactor authentication.
7. **Enable policy → Report-only**.
8. Crie.

## 07.3 Validar

1. Faça login com ANA.
2. Abra **Sign-in logs**.
3. Abra o evento.
4. Veja **Conditional Access**.
5. Confirme se a política foi aplicada.

## 07.4 Ativar

Somente depois de validar Report-only:

`Report-only → evidência → revisão → On`

## 07.5 Cenários

Faça um por vez:

- MFA para usuário específico;
- MFA para grupo;
- aplicação específica;
- localização;
- dispositivo compatível;
- risco de login, quando disponível;
- sessão.

### Regra

Nunca altere várias condições ao mesmo tempo durante troubleshooting.

---

# 08 — RBAC, ABAC e Least Privilege

## RBAC

`Subject → Role → Permission → Resource`

### Missão

Crie três níveis:

- Reader;
- Operator;
- Administrator.

Teste cada ação permitida e uma ação negada.

## Azure RBAC

1. Crie um recurso temporário.
2. Abra **Access control (IAM)**.
3. **Add role assignment**.
4. Escolha a menor função necessária.
5. Selecione ANA ou grupo.
6. Defina o menor escopo.
7. Teste.
8. Remova.
9. Teste novamente.

### Compare escopos

`Subscription → Resource Group → Resource`

Quanto maior o escopo, maior o blast radius.

## ABAC

Modele:

`Subject + Action + Resource + Attributes → Decision`

Exemplo:

`Department=Finance + Read + FinanceData + Environment=Production → Allow`

Marketing → FinanceData → Deny.

### Resultado esperado

Você deve conseguir explicar por que RBAC escala por função e ABAC permite decisões condicionais por atributos.

---

# 09 — Logs, auditoria e KQL

## Objetivo

Parar de “achar” e começar a provar.

## Sign-in logs

1. Gere um login permitido.
2. Gere um login negado.
3. Abra **Entra → Monitoring & health → Sign-in logs**.
4. Filtre ANA.
5. Compare os eventos.

Observe:

- usuário;
- aplicação;
- IP;
- localização;
- resultado;
- Conditional Access;
- autenticação;
- timestamp.

## Audit logs

Gere uma alteração de grupo.

Depois:

1. Abra **Audit logs**.
2. Pesquise a alteração.
3. Identifique iniciador.
4. Identifique recurso alterado.
5. Identifique data/hora.

## KQL

Quando os dados estiverem disponíveis no Log Analytics, pratique consultas com campos equivalentes a:

`UserPrincipalName`, `AppDisplayName`, `ResultType`, `IPAddress`, `ConditionalAccessStatus`.

### Exercício

Produza um mini relatório:

`Evento → Evidência → Causa → Correção → Resultado`

---

# 10 — B2B e identidade externa

## O que

Permite colaboração com identidades externas sem tratá-las automaticamente como funcionários internos.

## Faça

1. **Identity → External Identities**.
2. Convide uma identidade de teste quando o cenário de tenant permitir.
3. Crie `LAB-GUEST-PARTNER`.
4. Coloque o guest no grupo mínimo.
5. Conceda um recurso de laboratório.
6. Teste.
7. Remova o acesso.
8. Teste novamente.

### Governança

Documente:

- sponsor;
- finalidade;
- recurso;
- prazo;
- revisão;
- revogação.

> **Licença:** governança avançada de guests pode exigir o add-on de Microsoft Entra ID Governance para guests. Não assuma que a P2 do laboratório cobre essas funções.

---

# 11 — SSO, SAML, OAuth 2.0 e OIDC

## 11.1 SAML

### Antes de configurar

Memorize:

`IdP → Assertion → SP`

Termos:

- IdP;
- SP;
- Entity ID;
- ACS URL;
- Assertion;
- claims;
- metadata;
- certificado.

### Prática

1. Escolha uma aplicação de laboratório SAML.
2. **Entra → Enterprise applications**.
3. Adicione a aplicação.
4. Abra **Single sign-on → SAML**.
5. Configure Entity ID e Reply URL conforme a aplicação.
6. Associe ANA.
7. Teste SSO.
8. Examine as claims.

### Falha

Altere somente uma claim/parâmetro.

Identifique se o problema está no IdP, assertion, claim, certificado ou SP.

## 11.2 OAuth 2.0

Fluxo:

`Client → Authorization Server → Access Token → Resource Server`

Aprenda:

- client;
- scope;
- consent;
- access token;
- refresh token;
- authorization code;
- PKCE.

## 11.3 OIDC

OIDC adiciona autenticação e identidade sobre OAuth 2.0.

Estude:

- issuer;
- authorization endpoint;
- token endpoint;
- ID token;
- claims;
- discovery;
- JWKS;
- redirect URI;
- audience.

### Missão

Configure uma aplicação OIDC de laboratório e valide:

`login → authorization code → token → ID token → claims → sessão`

### Quebre

Altere redirect URI ou audience em ambiente de teste e diagnostique.

---

# 12 — App Registration, Service Principal e APIs

## Conceitos

- **Application object:** definição global da aplicação no tenant.
- **Service Principal:** representação da aplicação no tenant.
- **API permission:** permissão solicitada.
- **Consent:** autorização para aquela permissão.

## Prática

1. **Identity → Applications → App registrations**.
2. **New registration**.
3. Nome `LAB-APP-TEST`.
4. Crie.
5. Observe Application ID e Object ID.
6. Localize o Service Principal em **Enterprise applications**.

## API permissions

1. Abra **API permissions**.
2. Adicione somente a permissão necessária.
3. Examine delegated vs application permissions.
4. Não conceda `*.ReadWrite.All` apenas para “funcionar”.
5. Teste.
6. Remova a permissão.
7. Teste novamente.

### Missão de segurança

Explique por que **Application permissions** normalmente têm maior impacto que uma permissão delegada restrita ao usuário.

---

# 13 — SCIM e provisioning

## O que

SCIM padroniza operações de identidade entre um IdP/IGA e uma aplicação.

## Fluxo

`Source → Provisioning → SCIM → Target Application`

## Teste

Use uma aplicação de laboratório que suporte SCIM.

Execute:

1. Create user.
2. Update attribute.
3. Add group.
4. Remove group.
5. Disable user.
6. Deprovision.

### Evidência

Para cada operação registre:

`source value → request → target result → log → rollback`

### Entrevista

Explique por que SCIM é diferente de SAML:

`SAML = autenticação/federação`

`SCIM = gerenciamento/provisioning de identidades`

---

# 14 — Workload Identity

## O que

Identidade de aplicações, serviços, pipelines e workloads.

## Conceitos

- Service Principal;
- Managed Identity;
- Federated Identity Credential;
- workload identity;
- segredo estático;
- certificado;
- token de curta duração.

## Missão Managed Identity

1. Crie uma VM/recurso temporário.
2. Habilite identidade gerenciada.
3. Abra **Access control (IAM)** do recurso alvo.
4. Conceda somente a role necessária.
5. Teste acesso do workload.
6. Remova a role.
7. Teste novamente.

### Pergunta

Por que identidade gerenciada reduz o problema de secrets hardcoded?

### Evolução

Repita usando workload federation para entender o padrão sem segredo persistente.

---

# 15 — JML

## Objetivo

Implementar Joiner, Mover e Leaver como processo auditável.

## 15.1 Joiner

Cenário:

`Maria entra em Financeiro.`

Execute:

1. Criar identidade.
2. Definir atributos.
3. Adicionar grupo Finance.
4. Atribuir acesso necessário.
5. Registrar aprovação.
6. Testar acesso.
7. Registrar evidência.

## 15.2 Mover

Mude Maria:

`Finance → IT`

Execute:

1. Alterar atributo de departamento.
2. Remover acesso Finance.
3. Adicionar acesso IT.
4. Executar teste de SoD.
5. Confirmar que acesso antigo não permanece.

## 15.3 Leaver

Execute:

1. Desabilitar identidade.
2. Revogar grupos.
3. Revogar aplicações.
4. Revogar privilégios.
5. Invalidar sessões quando aplicável.
6. Testar login.
7. Conferir logs.
8. Registrar evidência.

### Resultado esperado

Você deve conseguir desenhar JML sem depender de uma ferramenta específica.

---

# 16 — Access Reviews

## O que

Recertificação responde:

> “Essa pessoa ainda precisa desse acesso?”

A Microsoft usa Access Reviews para revisar grupos, aplicações e, conforme o cenário, funções privilegiadas.

## Prática com P2

Use o cenário mais simples suportado pela licença disponível.

1. Crie `LAB-GRP-REVIEW`.
2. Adicione ANA e JOAO.
3. Conceda um recurso de laboratório.
4. Abra **ID Governance → Access Reviews**.
5. Crie uma revisão para o grupo/aplicação compatível.
6. Use `LAB-P2-ADMIN` como revisor quando o cenário de licenciamento permitir.
7. Inicie a revisão.
8. Aprove ANA.
9. Rejeite JOAO.
10. Aplique o resultado conforme a opção disponível.
11. Confirme remoção.

### Teste de entendimento

Explique:

`Access assignment ≠ Access review`

Atribuição concede; revisão verifica se ainda deve existir.

### Evidência

Salve:

- escopo;
- revisor;
- decisão;
- data;
- resultado;
- acesso removido.

---

# 17 — Entitlement Management

## Objetivo

Aprender o modelo de **Access Package**.

## Atenção ao licenciamento

A documentação atual da Microsoft indica que o Entitlement Management tem capacidades cujo licenciamento varia; alguns tutoriais ainda documentam P2 para cenários específicos, enquanto a matriz atual reserva várias capacidades para Entra ID Governance/Entra Suite. **Antes de executar uma função específica, valide a matriz atual do tenant.**

## Se a função estiver disponível

1. **ID Governance → Entitlement management → Access packages**.
2. Crie catálogo `LAB-CATALOG`.
3. Crie `LAB-PACKAGE-FINANCE`.
4. Adicione um grupo/app/site de laboratório.
5. Configure quem pode solicitar.
6. Configure aprovação.
7. Configure expiração.
8. Solicite com ANA.
9. Aprove.
10. Teste acesso.
11. Revogue.

## Se a função estiver bloqueada por licença

Simule exatamente o mesmo processo em uma planilha/arquivo:

`Request → Approval → SoD → Provision → Expiration → Review → Revocation → Evidence`

Depois compare o desenho com Entra Entitlement Management e SailPoint.

---

# 18 — Lifecycle Workflows

## Objetivo

Automatizar JML no Entra.

## ⚠️ Licenciamento

A documentação atual da Microsoft indica que **Lifecycle Workflows requer Microsoft Entra ID Governance ou Microsoft Entra Suite** para o uso completo. Portanto, uma única P2 não deve ser tratada como suficiente para este laboratório.

## Prática sem licença adicional

Construa o workflow manualmente:

```text
HR Event
   ↓
Identity Attribute
   ↓
Joiner / Mover / Leaver
   ↓
Decision
   ↓
Access Change
   ↓
Evidence
```

Crie três cenários documentados:

- Joiner Finance;
- Mover Finance → IT;
- Leaver.

## Quando tiver licença Governance

Reexecute usando Lifecycle Workflows e compare:

`manual process → automated workflow → logs → rollback → audit evidence`

---

# 19 — PIM

## Objetivo

Aprender privilégio **just-in-time**, elegibilidade, ativação e controle do acesso administrativo.

A Microsoft confirma PIM com Entra ID P2 ou Entra ID Governance.

## Estratégia para 1 licença

Use:

`LAB-P2-ADMIN`

como a única identidade licenciada para as missões PIM.

Não crie cinco usuários elegíveis.

## 19.1 Preparação

1. Abra **Identity → Roles & admins**.
2. Escolha uma função de laboratório com menor impacto possível.
3. Abra **Privileged Identity Management**.
4. Crie uma atribuição elegível para `LAB-P2-ADMIN`.
5. Configure duração curta para laboratório.

## 19.2 Ativação

1. Entre como `LAB-P2-ADMIN`.
2. Abra PIM.
3. Localize a role.
4. Selecione **Activate**.
5. Informe justificativa.
6. Complete MFA quando solicitado.
7. Defina duração mínima necessária.
8. Ative.

## 19.3 Teste

Antes da ativação:

`ação administrativa → negada`

Durante a ativação:

`ação administrativa → permitida`

Após expiração:

`ação administrativa → negada`

## 19.4 Auditoria

Abra os logs e identifique:

- quem ativou;
- role;
- horário;
- justificativa;
- resultado.

### Explique

`Permanent admin → standing privilege`

`Eligible → privilege available when required`

`JIT → privilege active only during the approved window`

---

# 20 — PAM com Teleport Community Edition

## Objetivo

Aprender PAM com uma tecnologia gratuita/open source, sem tentar reproduzir todas as funções de CyberArk.

Teleport Community Edition é uma distribuição gratuita e open source que pode ser hospedada localmente. A documentação oficial mostra um cluster pequeno com Auth Service, Proxy Service e SSH Service, além de RBAC e auditoria. Recursos Enterprise, como Access Requests completos com UI/aprovação, não devem ser tratados como disponíveis no CE.

## Arquitetura mínima

```text
LAB-LINUX01
      │
      │ SSH/Teleport Agent
      ▼
LAB-TELEPORT
├── Auth Service
├── Proxy Service
└── Audit Events
      ▲
      │
   tsh/tctl
```

## 20.1 Criar VM

1. VirtualBox → New.
2. Nome `LAB-TELEPORT`.
3. Linux 64-bit.
4. 1–2 GB RAM para laboratório pequeno.
5. Adaptador Host-only.
6. IP `192.168.56.20`.
7. Opcionalmente use NAT durante instalação.

## 20.2 Instalar Teleport CE

Use a documentação oficial atual do Teleport para selecionar a versão estável. A instalação Community Edition utiliza o canal `oss`.

Depois valide:

`teleport version`

## 20.3 Criar cluster

Siga o guia oficial de **Deploy Teleport Community Edition** para criar o cluster de laboratório.

Entenda durante a configuração:

- Auth Service = autoridade do cluster;
- Proxy Service = ponto de acesso;
- SSH Service = proteção do servidor;
- CA/certificados = identidade criptográfica;
- RBAC = autorização;
- audit events = evidência.

## 20.4 Conectar LAB-LINUX01

1. Instale o agente Teleport no Linux alvo.
2. Gere o método de enrollment conforme a documentação atual.
3. Não coloque tokens permanentes no Git.
4. Inscreva o host.
5. Verifique o recurso com `tsh ls`.
6. Conecte usando `tsh ssh`.

## 20.5 RBAC

Crie dois perfis:

`lab-readonly`

`lab-admin`

Teste:

`readonly → acesso permitido somente ao necessário`

`admin → acesso administrativo`

## 20.6 Auditoria

Execute uma sessão.

Depois investigue:

- usuário;
- recurso;
- horário;
- comando/sessão conforme evento disponível;
- resultado.

## 20.7 Access Request — limite do CE

Teleport CE permite um fluxo de solicitação via CLI para demonstrar o conceito, mas **aprovação completa e recursos avançados de Access Requests são Enterprise**.

Use CE para aprender:

`request → role → duração → acesso → auditoria`

Não descreva no currículo que você implementou CyberArk/PAM Enterprise por ter usado Teleport CE.

### O que o Teleport CE cobre bem

- SSH seguro;
- identidade criptográfica;
- RBAC;
- acesso a infraestrutura;
- auditoria;
- fundamentos de least privilege;
- conceitos de Zero Trust.

### O que deve ser estudado conceitualmente para PAM Enterprise

- vault;
- credential rotation;
- password checkout;
- session management;
- JIT/JEA;
- privileged account discovery;
- break-glass;
- approval workflow;
- service accounts.

---

# 21 — JEA, PAW e Break-glass

## JEA

**Just Enough Administration** limita as ações administrativas.

### Missão

No Windows:

1. Crie endpoint de laboratório.
2. Defina comandos permitidos.
3. Crie usuário não administrador.
4. Teste comando permitido.
5. Teste comando proibido.
6. Registre resultado.

## PAW

Desenhe uma estação dedicada para administração privilegiada:

`admin workstation → MFA → PIM → recurso`

Não misture navegação comum e administração privilegiada como prática ideal.

## Break-glass

Use duas contas de emergência apenas em desenho conceitual se a licença/ambiente não justificar mais contas.

Regras:

- não usar no dia a dia;
- monitorar;
- proteger credencial;
- testar recuperação;
- documentar uso.

---

# 22 — PowerShell, Microsoft Graph e REST

## Objetivo

Sair da administração manual e aprender IAM Engineering.

## 22.1 PowerShell básico

Pratique:

- variáveis;
- arrays;
- objetos;
- loops;
- funções;
- CSV;
- tratamento de erros;
- logging.

## 22.2 Projeto 1 — CSV → usuários

Entrada:

```text
name,department,role
Ana,Finance,Reader
Joao,IT,Operator
Maria,Finance,Reader
```

Fluxo:

`CSV → validação → create/update → group → log`

### Regras

- não criar duplicados;
- validar campos;
- registrar sucesso/erro;
- nunca armazenar senha em texto puro.

## 22.3 Microsoft Graph

Aprenda:

`GET → lista`

`POST → cria`

`PATCH → altera`

`DELETE → remove`

Comece com permissões mínimas.

### Missão

Automatize:

1. listar usuários;
2. localizar ANA;
3. listar grupos;
4. adicionar/remover ANA de grupo;
5. gerar relatório CSV.

## 22.4 REST

Use uma aplicação de laboratório e pratique:

`request → authentication → authorization → response → error → retry`

### Erros que você precisa reconhecer

- `401` = autenticação ausente/inválida;
- `403` = autenticado, mas sem autorização;
- `404` = recurso não encontrado;
- `409` = conflito;
- `429` = rate limit;
- `5xx` = erro do servidor.

---

# 23 — Hybrid Identity

## Objetivo

Entender AD ↔ Entra.

## Arquitetura

```text
AD DS
  │
  │ sync
  ▼
Microsoft Entra ID
  │
  ├── Cloud apps
  ├── MFA
  └── Conditional Access
```

## Prática

Use `LAB-DC01` somente quando estudar Hybrid.

1. Prepare domínio.
2. Crie usuários.
3. Instale a solução de sincronização suportada pela Microsoft na versão atual.
4. Configure escopo pequeno.
5. Sincronize somente OUs de laboratório.
6. Observe atributos.
7. Altere usuário no AD.
8. Confirme alteração no Entra.
9. Desabilite no AD.
10. Confirme impacto.

### O que estudar

- source of authority;
- UPN;
- Immutable ID/âncoras conforme arquitetura atual;
- sync scope;
- troubleshooting;
- DNS;
- proxy;
- staging/simulação.

---

# 24 — Cloud IAM

## Prioridade

Depois de dominar Entra:

`Azure IAM → AWS IAM → GCP concepts`

## Azure

Pratique:

- subscription;
- resource group;
- resource;
- Azure RBAC;
- managed identity;
- service principal;
- Key Vault;
- least privilege.

## AWS

Aprenda conceitualmente e, se houver orçamento/free tier:

- IAM User;
- IAM Role;
- policy;
- resource-based policy;
- federation;
- STS;
- workload identity.

## GCP

Conheça:

- principal;
- role;
- policy;
- service account;
- workload identity federation.

### Exercício

Compare:

`Entra Role ↔ Azure RBAC ↔ AWS IAM Role ↔ GCP IAM Role`

---

# 25 — IGA Enterprise: SailPoint

## Objetivo

Aprender a linguagem de IGA mesmo sem licença comercial.

## O que estudar

- Identity;
- Account;
- Entitlement;
- Source/Application;
- Connector;
- Aggregation;
- Provisioning;
- Role;
- Lifecycle;
- Certification;
- Policy;
- SoD;
- Access Request;
- Workflow.

## Laboratório sem licença

Modele em arquivos JSON/CSV:

```text
Identity
 ├── Account
 ├── Role
 └── Entitlement
```

### Missão

Crie:

`ROLE-FINANCE-ANALYST`

com:

- ERP-READ;
- SHARE-FINANCE;
- REPORT-FINANCE.

Crie conflito:

`ROLE-FINANCE-ANALYST + ROLE-PAYMENT-APPROVER = SoD violation`

Depois simule:

`request → approval → SoD → provisioning → certification → revocation`

### Objetivo de carreira

Quando tiver acesso a SailPoint, reimplemente exatamente o mesmo cenário na ferramenta.

---

# 26 — PAM Enterprise

## Compare sem comprar

| Conceito | Teleport CE | PAM Enterprise |
|---|---|---|
| RBAC | ✅ | ✅ |
| SSH access | ✅ | ✅ |
| Auditoria | ✅ | ✅ |
| Identidade criptográfica | ✅ | depende da solução |
| Vault de credenciais | não é o foco principal | central |
| Password rotation | não equivalente | central |
| Session management | depende da edição/recurso | central |
| Approval workflow completo | Enterprise | comum |
| JIT | conceito/recursos variam | central |

Ferramentas para conhecer:

- CyberArk;
- Delinea;
- BeyondTrust;
- senhasegura.

### Exercício de entrevista

Explique:

`IAM → IGA → PAM`

IAM controla identidade/acesso.

IGA governa ciclo de vida, aprovação, revisão e políticas.

PAM protege acessos privilegiados e contas/ações de alto impacto.

---

# 27 — ITSM

## Objetivo

Conectar IAM à operação corporativa.

## Ciclo

```text
Request
 ↓
Approval
 ↓
Provision
 ↓
Validation
 ↓
Evidence
 ↓
Close
```

## Pratique em planilha ou ferramenta gratuita

Campos:

- ticket;
- requester;
- identity;
- resource;
- role;
- business justification;
- approver;
- date;
- expiration;
- executor;
- evidence;
- closure.

### Cenários

1. acesso novo;
2. mudança de função;
3. desligamento;
4. acesso privilegiado;
5. exceção.

---

# 28 — Auditoria, compliance e evidências

## Pergunta central

> “Como provar que este acesso foi autorizado e continua necessário?”

## Evidências

Para cada acesso mantenha:

`request → approval → assignment → use → review → revocation`

## Controles para estudar

- ISO 27001;
- NIST;
- LGPD;
- PCI DSS;
- CIS Controls;
- SOX;
- SOC 2.

## Matriz

| Controle | Pergunta |
|---|---|
| Least privilege | O acesso é mínimo? |
| JML | O ciclo de vida é controlado? |
| SoD | Existe conflito? |
| Access Review | Alguém recertificou? |
| PAM | Privilégio é temporário/controlado? |
| Logging | Existe evidência? |
| Approval | Quem autorizou? |
| Revocation | O acesso foi removido? |

### Exercício

Escolha ANA e produza um dossiê de acesso de uma página.

---

# 29 — Projeto final

## Cenário

Empresa fictícia:

`LAB-CORP`

Departamentos:

- Finance;
- IT;
- HR.

Aplicações:

- ERP;
- Service Desk;
- File Server;
- Linux Server.

## Arquitetura final

```text
                    HR
                     │
                     ▼
              Identity Source
                     │
                     ▼
              Entra / AD
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
        RBAC       JML       MFA/CA
          │          │          │
          └──────┬───┴──────────┘
                 ▼
              IGA flow
                 │
       ┌─────────┼─────────┐
       ▼         ▼         ▼
      ERP       SaaS     Linux
                           │
                           ▼
                       Teleport
```

## Cenário 1 — Joiner

Maria entra em Finance.

Resultado:

- identidade criada;
- grupo Finance;
- ERP Read;
- MFA;
- evidência.

## Cenário 2 — Mover

Maria vai para IT.

Resultado:

- Finance removido;
- IT adicionado;
- SoD verificado;
- evidência.

## Cenário 3 — Leaver

Maria deixa a empresa.

Resultado:

- identidade bloqueada;
- grupos removidos;
- aplicações revogadas;
- sessões tratadas;
- evidência.

## Cenário 4 — Privilege

Carlos precisa administrar Azure por 30 minutos.

Resultado:

`Eligible → MFA → Activate → Admin → Expire → Audit`

## Cenário 5 — PAM

Carlos precisa administrar Linux.

Resultado:

`Teleport → RBAC → SSH → audit → revoke`

## Cenário 6 — Access Review

Joao mantém acesso antigo.

Resultado:

`Review → Deny → Removal → Evidence`

## Cenário 7 — Incidente

Uma conta tenta acessar recurso sem autorização.

Você deve:

1. localizar log;
2. identificar identidade;
3. identificar política;
4. determinar causa;
5. conter;
6. revogar;
7. registrar evidência;
8. explicar o incidente.

---

# 30 — Portfólio e entrevista

## Repositório

Não publique:

- senha;
- token;
- secret;
- private key;
- recovery code;
- tenant secrets.

## Evidências permitidas

- diagramas;
- telas sem PII;
- logs sanitizados;
- scripts sem segredo;
- arquitetura;
- troubleshooting;
- decisões técnicas.

## Projetos para publicar

### Projeto 1

**Microsoft Entra IAM Lab**

Demonstrar:

- Users;
- Groups;
- RBAC;
- MFA;
- Conditional Access;
- Logs.

### Projeto 2

**JML + Access Governance**

Demonstrar:

- Joiner;
- Mover;
- Leaver;
- Access Review;
- SoD.

### Projeto 3

**PAM Home Lab with Teleport CE**

Demonstrar:

- RBAC;
- SSH;
- identity-based access;
- audit;
- least privilege.

### Projeto 4

**IAM Automation**

Demonstrar:

`CSV → PowerShell → Graph → groups → report`

## Perguntas que você precisa responder sem consulta

1. Authentication vs Authorization?
2. RBAC vs ABAC?
3. SAML vs OIDC?
4. OAuth2 é autenticação?
5. SAML vs SCIM?
6. Application vs Service Principal?
7. PIM vs PAM?
8. IAM vs IGA?
9. JML?
10. SoD?
11. Access Review?
12. Access Package?
13. Managed Identity?
14. Por que least privilege?
15. Como investigar login negado?
16. Como provar que um acesso foi autorizado?
17. Como automatizar 500 onboardings?
18. Como proteger uma conta privilegiada?
19. Como funciona AD → Entra?
20. Como reduzir standing privilege?

---

# 31 — Critério de conclusão

## 🟢 Nível 1 — IAM operacional

- [ ] AD básico
- [ ] Entra users/groups
- [ ] MFA
- [ ] Conditional Access
- [ ] RBAC
- [ ] logs
- [ ] JML manual

## 🔵 Nível 2 — IAM profissional

- [ ] SSO
- [ ] SAML
- [ ] OIDC
- [ ] OAuth2
- [ ] SCIM
- [ ] APIs
- [ ] PowerShell
- [ ] Access Reviews
- [ ] SoD
- [ ] Hybrid Identity

## 🟣 Nível 3 — IGA/PAM

- [ ] Entitlement Management
- [ ] Lifecycle Workflows — conceito e, com licença adequada, prática
- [ ] PIM
- [ ] Teleport CE
- [ ] PAM concepts
- [ ] SailPoint concepts
- [ ] audit/compliance

## 🔴 Nível 4 — IAM Engineering / Architecture

- [ ] Graph automation
- [ ] Python
- [ ] SQL
- [ ] Cloud IAM
- [ ] workload identity
- [ ] role engineering
- [ ] architecture
- [ ] Zero Trust
- [ ] metrics
- [ ] governance

---

# 🧠 Projeto de repetição acelerada

Depois de concluir cada módulo, destrua o cenário e reconstrua.

### Repetição 1

Com manual.

### Repetição 2

Somente com checklist.

### Repetição 3

Sem consulta.

### Repetição 4

Explique como se estivesse em uma entrevista.

### Repetição 5

Automatize o que foi repetitivo.

A meta não é memorizar cliques. A meta é reconhecer o problema, escolher o controle, implementá-lo, provar o resultado e automatizar quando fizer sentido.

---

# 📌 Referências oficiais

- Microsoft Entra licensing: https://learn.microsoft.com/en-us/entra/fundamentals/licensing
- Microsoft Entra ID Governance: https://learn.microsoft.com/en-us/entra/id-governance/
- PIM: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/
- Access Reviews: https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview
- Entitlement Management: https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview
- Lifecycle Workflows: https://learn.microsoft.com/en-us/entra/id-governance/what-are-lifecycle-workflows
- SC-300 Study Guide: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-300
- Teleport Community Edition: https://goteleport.com/docs/get-started/deploy-community/
- Teleport Feature Matrix: https://goteleport.com/docs/feature-matrix/
- Teleport Access Requests CE: https://goteleport.com/docs/identity-governance/access-requests/oss-role-requests/

---

> **Regra final do laboratório:** cada acesso deve ter motivo, escopo, duração, aprovação, teste, log e caminho de revogação. Cada privilégio deve ser temporário quando possível. Cada processo repetitivo deve ser candidato à automação.
