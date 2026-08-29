# 🛡️ Microsoft Entra ID — IAM Study Lab

> **Laboratório prático do básico ao avançado, orientado a carreira em IAM.**
>
> A regra deste manual é simples: **entender → preparar → configurar → testar → quebrar de propósito → investigar → corrigir → revogar → documentar**.
>
> O objetivo não é decorar telas do portal. É aprender a transformar um requisito de segurança em **identidade, autenticação, autorização, governança, privilégio, automação e evidência**.

![Microsoft Entra](https://img.shields.io/badge/Microsoft-Entra%20ID-0078D4?style=for-the-badge&logo=microsoft)
![IAM](https://img.shields.io/badge/Focus-IAM-6f42c1?style=for-the-badge)
![Hands On](https://img.shields.io/badge/Lab-Hands--On-2ea44f?style=for-the-badge)
![Level](https://img.shields.io/badge/Level-Basic%20%E2%86%92%20Advanced-orange?style=for-the-badge)

---

## 🧭 Como usar este manual

Não execute tudo de uma vez.

Cada módulo foi desenhado para funcionar como uma pequena missão independente. Quando o módulo terminar, você deve conseguir explicar o conceito e provar o comportamento sem olhar novamente para o tutorial.

### 🔁 Ciclo obrigatório

```text
📖 CONCEITO
   ↓
🎯 POR QUE?
   ↓
🕐 QUANDO?
   ↓
🧰 PRÉ-REQUISITOS
   ↓
⚙️ CONFIGURAÇÃO
   ↓
✅ TESTE POSITIVO
   ↓
⛔ TESTE NEGATIVO
   ↓
🔎 LOG / EVIDÊNCIA
   ↓
🧯 TROUBLESHOOTING
   ↓
↩️ REVOGAÇÃO / ROLLBACK
   ↓
📝 DOCUMENTAÇÃO
```

> **Regra de ouro:** se você apenas configurou e funcionou, você fez um tutorial. Se você configurou, testou, provocou uma falha, encontrou a causa nos logs, corrigiu e revogou, você fez um laboratório de IAM.

---

## 🗺️ Mapa do laboratório

| Fase | Tema | Resultado |
|---|---|---|
| 🟢 01 | Fundamentos | Modelo mental de IAM/Entra |
| 🟢 02 | Tenant e identidades | Ambiente de laboratório seguro |
| 🟢 03 | Users e Groups | Administração básica |
| 🟢 04 | Roles e RBAC | Least privilege |
| 🟢 05 | Authentication | MFA e métodos |
| 🟢 06 | SSPR | Recuperação controlada |
| 🟡 07 | Conditional Access | Política Zero Trust |
| 🟡 08 | Logs | Investigação IAM |
| 🟡 09 | B2B/Guest | Identidade externa |
| 🟡 10 | Enterprise Apps / SSO | Federação de aplicações |
| 🟡 11 | App Registration | Identidade de aplicação |
| 🟡 12 | API Permissions | Delegated/Application permissions |
| 🟡 13 | Service Principal | Workload identity |
| 🟡 14 | Managed Identity | Acesso sem secret |
| 🟠 15 | Workload Federation | CI/CD sem secret persistente |
| 🟠 16 | PIM/JIT | Privilégio temporário |
| 🟠 17 | Access Reviews | Recertificação de acesso |
| 🟠 18 | Entitlement Management | Solicitação/aprovação/expiração |
| 🟠 19 | Lifecycle Workflows | JML automatizado |
| 🟠 20 | Identity Protection | IAM baseado em risco |
| 🟠 21 | Graph/PowerShell | Automação |
| 🔴 22 | PAM/JEA/PAW | Modelo privilegiado |
| 🔴 23 | Incidentes IAM | Investigação ponta a ponta |
| 🔴 24 | Projeto final | Simulação corporativa |

---

# 1. 🎯 Objetivo profissional

Este laboratório foi desenhado para desenvolver competências esperadas de um profissional de IAM Microsoft:

- administração de identidades;
- autenticação e MFA;
- autorização e RBAC;
- Conditional Access;
- Identity Governance;
- PIM e privilégio just-in-time;
- aplicações e SSO;
- Service Principals e Workload Identities;
- Managed Identity;
- Microsoft Graph;
- automação com PowerShell;
- investigação por logs;
- JML — Joiner, Mover, Leaver;
- least privilege;
- segregação de funções;
- PAM/JIT/JEA/PAW;
- documentação e evidência.

O [Microsoft Entra ID](https://learn.microsoft.com/pt-br/entra/identity/) é usado para gerenciar identidades e controlar acesso a aplicações, dados e recursos. O laboratório usa essa plataforma como eixo central. citeturn0search6

---

# 2. 🧠 Modelo mental de IAM

Antes do portal, memorize o fluxo:

```text
IDENTIDADE
    ↓
AUTENTICAÇÃO
    ↓
CONTEXTO / SINAIS
    ↓
POLÍTICA
    ↓
AUTORIZAÇÃO
    ↓
RECURSO
    ↓
LOG
    ↓
GOVERNANÇA
    ↓
REVOGAÇÃO
```

### Quatro perguntas de IAM

| Pergunta | Área |
|---|---|
| Quem é? | Identity |
| Como prova? | Authentication |
| O que pode fazer? | Authorization / RBAC |
| Como garantir que continue correto? | Governance |

### Exemplo corporativo

> Um analista financeiro precisa acessar uma aplicação de RH somente durante o período em que trabalha no projeto.

A solução não é simplesmente "dar acesso".

Ela pode envolver:

```text
Usuário
  ↓
Grupo / Access Package
  ↓
Aplicação
  ↓
RBAC
  ↓
Conditional Access
  ↓
MFA
  ↓
Expiração
  ↓
Access Review
  ↓
Revogação
  ↓
Logs
```

É esse raciocínio que o laboratório quer desenvolver.

---

# 3. 💻 Arquitetura mínima e otimizada

## 3.1 O princípio

Você **não precisa manter várias VMs ligadas** para estudar Entra ID.

A arquitetura principal é:

```text
┌──────────────────────────────┐
│          SEU PC              │
│                              │
│  🌐 Browser                  │
│  💻 PowerShell               │
│  🔌 Microsoft Graph          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Microsoft Entra ID      │
│                              │
│ Users / Groups               │
│ Roles / RBAC                 │
│ Authentication               │
│ Conditional Access           │
│ Applications                 │
│ Workload Identities          │
│ Governance                   │
│ Logs                         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Azure Subscription      │
│   somente quando necessário  │
└──────────────────────────────┘
```

### Quando usar VM?

Somente quando o exercício exigir:

- Windows Device para Conditional Access;
- aplicação de laboratório;
- identidade híbrida;
- AD DS/Entra Connect;
- testes de PowerShell isolados.

### Regra de economia

> **VM desligada não participa do laboratório.**

Não mantenha `DC01`, `WIN11`, `LINUX01` e outras máquinas ligadas enquanto trabalha apenas no portal Entra.

---

# 4. 💰 Licenciamento e estratégia de custo

Licenciamento da Microsoft muda ao longo do tempo. Sempre valide a funcionalidade no [Microsoft Entra licensing](https://learn.microsoft.com/en-us/entra/fundamentals/licensing) antes do exercício.

Atualmente, Conditional Access exige Microsoft Entra ID P1 ou uma licença que o inclua; políticas baseadas em risco dependem de Microsoft Entra ID Protection/P2. Security Defaults fornecem proteção básica para tenants sem Conditional Access. citeturn0search2turn0search14

PIM e recursos avançados de Identity Governance dependem do licenciamento correspondente, como Microsoft Entra ID Governance/P2 conforme o cenário. citeturn0search8turn0search16

## 4.1 Estratégia prática

| Recurso | Laboratório |
|---|---|
| Users / Groups | Base |
| MFA / Security Defaults | Base |
| Conditional Access | P1/trial ou licença equivalente |
| CA baseado em risco | P2/trial |
| PIM | P2/Governance/trial |
| Access Reviews | Governance/licença correspondente |
| Entitlement Management | Governance/licença correspondente |
| Lifecycle Workflows | Governance/licença correspondente |
| Workload Identity | Conforme recurso/licença |

> Não compre várias licenças apenas para criar vários usuários de laboratório. Quando uma funcionalidade exigir licença, use o menor conjunto de identidades necessário para demonstrar o cenário e valide os requisitos atuais antes de ativar o recurso.

---

# 5. 🔐 Preparação segura do tenant

## 5.1 Antes de qualquer configuração

Registre localmente:

- Tenant ID;
- domínio inicial;
- nome da assinatura Azure, se existir;
- licenças disponíveis;
- usuário administrativo utilizado;
- data de início do laboratório.

### Por quê?

Porque uma investigação profissional começa comparando o **estado anterior** com o **estado posterior**.

---

## 5.2 Conta de emergência

Crie uma conta de emergência separada da conta administrativa utilizada no dia a dia.

### Por que?

Se uma política de Conditional Access impedir o acesso administrativo normal, a conta de emergência serve como caminho controlado de recuperação.

### Regra

A conta não deve ser usada para tarefas rotineiras.

### Teste obrigatório

Antes de criar políticas:

1. confirme que a conta existe;
2. confirme que você sabe como recuperar o acesso;
3. confirme que o método de autenticação funciona;
4. registre como a conta será monitorada.

As boas práticas da Microsoft recomendam monitorar atividades de contas privilegiadas e de emergência. citeturn0search15

---

## 5.3 Identidades do laboratório

Crie somente as seguintes identidades inicialmente:

| Nome | Tipo | Função |
|---|---|---|
| `LAB-BREAKGLASS` | emergência | recuperação |
| `LAB-IAM-ADMIN` | administrativa | administração |
| `LAB-IAM-READER` | leitura | auditoria |
| `LAB-USER-ANA` | usuário | cenário permitido |
| `LAB-USER-JOAO` | usuário | cenário negado |
| `LAB-USER-MARIA` | usuário | JML |
| `LAB-GUEST-PARTNER` | guest | B2B |

Não crie dezenas de usuários. O objetivo é reutilizar as mesmas identidades em diferentes cenários.

---

# 6. 🏷️ Convenções

Use nomes previsíveis:

```text
LAB-USER-*
LAB-GRP-*
LAB-ROLE-*
LAB-CA-*
LAB-APP-*
LAB-SP-*
LAB-PIM-*
LAB-AR-*
LAB-PACK-*
LAB-JML-*
```

Exemplos:

```text
LAB-GRP-FINANCE
LAB-GRP-IAM-READERS
LAB-CA-001-MFA
LAB-CA-002-BLOCK-LEGACY
LAB-APP-GRAPH
LAB-PIM-IAM-ADMIN
LAB-AR-FINANCE
```

### Regra de segurança

Nunca coloque no GitHub:

- senha;
- client secret;
- certificado privado;
- access token;
- refresh token;
- cookie;
- recovery code;
- código MFA;
- dados pessoais reais.

---

# 7. 🟢 Fase 01 — Fundamentos do Entra ID

## O que é?

O Microsoft Entra ID é o serviço de identidade e acesso usado para usuários, grupos, aplicações, dispositivos, funções e políticas.

## Por que usar?

Porque IAM moderno não depende apenas de rede. A identidade passa a ser um dos principais elementos de controle.

## Quando usar?

Sempre que você precisar controlar **quem acessa o quê, como, de onde e em quais condições**.

## Onde estudar

No [Microsoft Entra admin center](https://entra.microsoft.com/), localize:

- Users;
- Groups;
- Roles and administrators;
- Protection;
- Conditional Access;
- Enterprise applications;
- App registrations;
- Monitoring;
- Identity Governance.

## Exercício

Escolha `LAB-USER-ANA` e responda:

```text
Quem é?
↓
Está habilitada?
↓
Quais grupos possui?
↓
Quais roles possui?
↓
Quais aplicações utiliza?
↓
Como autenticou?
↓
Quais políticas foram aplicadas?
↓
Quais alterações foram feitas nessa identidade?
```

### Resultado esperado

Você consegue localizar a identidade e explicar seu caminho de acesso.

---

# 8. 🟢 Fase 02 — Users

## O que é?

Uma identidade humana usada para autenticação e acesso.

## Por que?

É a unidade básica para testar autenticação, autorização e ciclo de vida.

## Quando?

Funcionários, administradores, terceiros e convidados, respeitando o tipo de identidade adequado.

## Criar usuário

Caminho:

**Entra ID → Users → All users → New user → Create new user**

Crie:

```text
LAB-USER-ANA
LAB-USER-JOAO
LAB-USER-MARIA
```

Use dados fictícios.

## Teste positivo

1. Abra uma janela privada.
2. Acesse um recurso de teste disponível.
3. Entre com `LAB-USER-ANA`.
4. Confirme o acesso.

## Teste negativo

1. Use `LAB-USER-ANA`.
2. Tente acessar uma função administrativa.
3. Confirme que não possui privilégios administrativos.

## Investigar

Abra:

**Entra ID → Monitoring & health → Sign-in logs**

Verifique:

- usuário;
- aplicação;
- data/hora;
- resultado;
- IP/localização quando disponível;
- dispositivo;
- Conditional Access;
- autenticação.

## Troubleshooting

| Sintoma | Verificação |
|---|---|
| Login falha | usuário habilitado, senha e método |
| MFA inesperado | Security Defaults / CA |
| Acesso administrativo | roles e memberships |
| Aplicação não aparece | atribuição da aplicação |

## Revogação

Desabilite temporariamente o usuário e repita o login.

### O que aprender

```text
Identity ≠ Access
```

Criar uma identidade não significa conceder privilégio.

---

# 9. 🟢 Fase 03 — Groups

## O que são?

Grupos permitem administrar acesso de forma coletiva.

## Por que?

Em vez de:

```text
Ana → aplicação
João → aplicação
Maria → aplicação
```

prefira:

```text
Ana ─┐
João ├→ LAB-GRP-APP-USERS → aplicação
Maria┘
```

Isso facilita governança e revogação.

## Criar grupo

Caminho:

**Entra ID → Groups → All groups → New group**

Crie:

```text
LAB-GRP-USERS
LAB-GRP-FINANCE
LAB-GRP-IAM-READERS
LAB-GRP-APP-USERS
```

Tipo:

`Security`

## Exercício

1. Adicione `LAB-USER-ANA` a `LAB-GRP-FINANCE`.
2. Conceda acesso de laboratório ao grupo.
3. Teste o acesso.
4. Remova Ana.
5. Teste novamente.

## O que provar?

```text
Membership presente → acesso
Membership removido → acesso revogado
```

### Boas práticas

- use grupos por função/necessidade;
- evite grupos administrativos gigantes;
- documente finalidade;
- revise memberships;
- evite atribuições diretas desnecessárias.

---

# 10. 🟢 Fase 04 — Microsoft Entra Roles e RBAC

## Conceito

RBAC associa uma identidade a uma função com permissões em determinado escopo.

```text
Principal → Role → Scope → Permission
```

## Por que?

Para aplicar **least privilege**.

A Microsoft recomenda funções com o menor nível de privilégio necessário e, para privilégios elevados, acesso temporário/JIT quando possível. citeturn0search1turn0search13

## Quando?

Quando alguém precisa administrar um recurso sem receber permissões globais.

## Exercício 1 — Reader

Caminho:

**Entra ID → Roles and administrators**

Escolha uma função de leitura apropriada ao cenário.

Atribua a `LAB-IAM-READER`.

### Teste positivo

Consulte o recurso permitido.

### Teste negativo

Tente alterá-lo.

### Resultado esperado

Consulta permitida; alteração negada.

## Exercício 2 — excesso de privilégio

1. Conceda temporariamente uma função administrativa de baixo impacto.
2. Faça uma alteração controlada.
3. Abra Audit Logs.
4. Identifique o ator.
5. Remova a função.
6. Repita a alteração.

### Pergunta

> O que aconteceu quando a função foi removida?

### Objetivo

Aprender que autorização é dinâmica e auditável.

---

# 11. 🟢 Fase 05 — Authentication e MFA

## Conceito

Autenticação responde:

> "Como a identidade prova que é quem diz ser?"

MFA adiciona fatores adicionais.

Não confunda:

```text
Authentication → quem é?
Authorization  → o que pode fazer?
```

## 11.1 Security Defaults

Use para conhecer a camada básica de proteção quando Conditional Access não estiver sendo usado.

Não misture a estratégia de Security Defaults com um desenho de Conditional Access sem entender a interação entre eles.

### Teste

1. Use `LAB-USER-ANA`.
2. Registre o Microsoft Authenticator quando solicitado.
3. Saia.
4. Entre novamente.
5. Confirme o desafio adicional.

## 11.2 Authentication Methods

Quando disponíveis, estude e teste:

- Microsoft Authenticator;
- passkeys/FIDO2;
- Temporary Access Pass;
- políticas de métodos de autenticação.

### Cenário

```text
Usuário novo
   ↓
Registro
   ↓
MFA
   ↓
Login
   ↓
Perda do método
   ↓
Recuperação controlada
```

### Teste negativo

Use um usuário que não esteja corretamente registrado e confirme que o acesso não pode ser concluído quando a política exigir o método.

---

# 12. 🟢 Fase 06 — SSPR

## O que é?

Self-Service Password Reset permite recuperação da senha pelo próprio usuário, conforme configuração e licenciamento.

## Por que?

Reduz chamados e cria um processo controlado de recuperação.

## Quando?

Quando a organização deseja permitir recuperação sem intervenção manual para todos os casos elegíveis.

## Cenário positivo

```text
Senha esquecida
↓
Usuário valida identidade
↓
Nova senha
↓
Login
```

## Cenário negativo

Falhe deliberadamente na validação.

Resultado esperado: redefinição não deve ocorrer sem a comprovação necessária.

## Evidência

Registre apenas evidências sanitizadas do processo e do resultado.

---

# 13. 🟡 Fase 07 — Conditional Access básico

## Conceito

Conditional Access é um mecanismo de política do tipo **se-então**:

```text
SE
usuário + aplicação + sinais

ENTÃO
permitir / exigir controle / bloquear
```

Ele é o mecanismo de política Zero Trust do Entra. citeturn0search2turn0search10

## Por que?

Porque MFA sozinho não responde a todos os cenários.

Exemplo:

> "Administradores precisam de autenticação forte quando acessam recursos administrativos."

## Quando?

Quando o acesso precisa depender de contexto: usuário, aplicação, localização, dispositivo, risco ou outros sinais suportados.

## Regra de implantação

```text
Report-only
↓
Usuário de teste
↓
Sign-in Logs
↓
What If
↓
Ajustar
↓
Enable
```

A Microsoft recomenda planejamento cuidadoso e uso de usuários/grupos de teste antes de implantação ampla. citeturn0search5

## 13.1 Política MFA

Caminho:

**Entra ID → Protection → Conditional Access → Policies → New policy**

Nome:

```text
LAB-CA-001-REQUIRE-MFA
```

### Configuração

**Users:** somente `LAB-USER-ANA` inicialmente.

**Target resources:** recurso de laboratório.

**Grant:** Require multifactor authentication ou controle equivalente disponível.

**Enable:** Report-only.

### Teste

Faça login com Ana.

### Validação

Abra **Sign-in logs** e observe o resultado da política.

### Ativação

Somente depois de confirmar o comportamento, altere para `On`.

## 13.2 Teste negativo

Crie uma situação na qual a condição não seja atendida e confirme o bloqueio ou desafio esperado.

## 13.3 Rollback

Se a política causar comportamento inesperado:

1. volte para Report-only ou desabilite conforme o plano de recuperação;
2. mantenha a conta de emergência fora do escopo planejado;
3. investigue Sign-in Logs;
4. use What If;
5. corrija;
6. repita o teste.

---

# 14. 🟡 Fase 08 — Conditional Access avançado

## Objetivo

Sair de "MFA para todos" e aprender política baseada em contexto.

Aplique somente os sinais que realmente resolvem o requisito.

## Cenário A — Administradores

```text
SE usuário é administrativo
E acessa recurso administrativo
ENTÃO exigir autenticação forte
```

## Cenário B — Aplicação

```text
SE usuário acessa aplicação X
ENTÃO aplicar controle Y
```

## Cenário C — Localização

```text
SE acesso vem de localização não permitida
ENTÃO bloquear
```

Use dados reais do laboratório e valide como o Entra interpreta a localização. Não presuma que o IP residencial terá o comportamento que você imagina.

## Cenário D — Legacy Authentication

Crie:

```text
LAB-CA-002-BLOCK-LEGACY
```

Primeiro Report-only.

Depois provoque ou simule um cenário compatível com autenticação legada e confirme a decisão nos logs.

## Cenário E — Dispositivo

Quando você possuir uma máquina de teste adequada, explore:

```text
dispositivo compatível → acesso

dispositivo não compatível → bloqueio
```

## Cenário F — Risco

Quando houver licença compatível, teste:

- sign-in risk;
- user risk;
- remediação;
- MFA;
- bloqueio.

Políticas baseadas em risco exigem recursos de Microsoft Entra ID Protection/P2. citeturn0search2

## What If

Use a ferramenta **What If** para responder:

- qual política seria aplicada?
- qual condição causaria bloqueio?
- qual exclusão mudou o resultado?
- quais políticas não seriam aplicadas?

### Exercício

Crie uma política de laboratório em Report-only, execute What If e compare a previsão com o Sign-in Log real.

### Objetivo profissional

Aprender a diferenciar:

```text
"A política deveria aplicar"

vs.

"A política realmente aplicou"
```

---

# 15. 🟡 Fase 09 — Logs e investigação

## Por que logs são essenciais?

IAM sem evidência não permite responder corretamente a uma investigação.

A Microsoft recomenda estratégia de monitoramento envolvendo, entre outros, Sign-in activity, Audit Logs e eventos de risco quando disponíveis. citeturn0search4turn0search17

## 15.1 Sign-in Logs

Caminho:

**Entra ID → Monitoring & health → Sign-in logs**

Investigue:

- sucesso;
- falha;
- MFA;
- Conditional Access;
- aplicação;
- dispositivo;
- localização;
- risco;
- código de erro.

## 15.2 Audit Logs

Caminho:

**Entra ID → Monitoring & health → Audit logs**

Procure alterações em:

- usuários;
- grupos;
- roles;
- aplicações;
- credenciais;
- políticas.

## 15.3 Exercício de timeline

Execute:

```text
Criar usuário
↓
Adicionar grupo
↓
Atribuir role
↓
Alterar objeto
↓
Remover role
↓
Remover grupo
↓
Desabilitar usuário
```

Depois reconstrua tudo somente com os logs.

Você precisa conseguir responder:

```text
QUEM?
O QUÊ?
QUANDO?
QUAL OBJETO?
QUAL RESULTADO?
```

---

# 16. 🟡 Fase 10 — Guest / B2B

## O que é?

Permite colaboração com identidades externas sem transformar o convidado em uma identidade interna comum.

## Quando usar?

- parceiros;
- fornecedores;
- consultores;
- colaboração externa.

## Criar guest

Caminho:

**Entra ID → Users → New user → Invite external user**

Use uma identidade de teste controlada.

## Cenários

### Positivo

Guest convidado e autorizado → acesso permitido.

### Negativo

Guest sem autorização → acesso negado.

### Revogação

Remova o acesso e confirme que o acesso desapareceu.

### Investigação

Procure criação, convite, alterações de membership e autenticação nos logs.

---

# 17. 🟡 Fase 11 — Enterprise Applications e SSO

## Conceito

Enterprise Application representa a aplicação consumida/integradada pelo tenant.

SSO reduz múltiplos processos de autenticação e centraliza políticas de acesso.

## Quando usar?

Quando uma organização precisa integrar aplicações SaaS ou corporativas ao Entra.

## Laboratório

Use uma aplicação de teste compatível com o método de SSO disponível.

Caminho:

**Entra ID → Enterprise applications → New application**

## Exercício

1. Adicione a aplicação.
2. Configure o método suportado.
3. Exija atribuição de usuário/grupo quando aplicável.
4. Atribua `LAB-USER-ANA`.
5. Teste.
6. Remova a atribuição.
7. Teste novamente.

## Objetivo

Provar:

```text
Identidade + Aplicação + Atribuição + Política = Decisão de acesso
```

---

# 18. 🟡 Fase 12 — App Registration

## O que é?

Define a identidade/configuração de uma aplicação que utiliza o Entra para autenticação ou acesso a APIs.

## Por que?

Porque aplicações também são identidades.

## Quando?

Quando você desenvolve ou integra uma aplicação que precisa autenticar usuários ou atuar como workload.

## Criar

Caminho:

**Entra ID → App registrations → New registration**

Nome:

```text
LAB-APP-GRAPH
```

## O que observar

- Application/Client ID;
- Directory/Tenant ID;
- Redirect URI quando aplicável;
- Authentication;
- API permissions;
- Certificates & secrets;
- Manifest.

### Exercício

Registre uma aplicação de laboratório e identifique os objetos associados.

### Pergunta obrigatória

> Qual é a diferença entre Application Object e Service Principal?

Você deve saber responder antes de continuar.

---

# 19. 🟡 Fase 13 — API Permissions e consentimento

## Dois modelos fundamentais

### Delegated permissions

```text
Usuário
  ↓
Aplicação
  ↓
API
```

A aplicação atua em contexto de usuário.

### Application permissions

```text
Aplicação
  ↓
API
```

O workload atua sem usuário interativo.

## Por que isso importa?

Application permissions podem ter impacto elevado porque o workload pode atuar autonomamente.

## Exercício least privilege

1. Conceda somente uma permissão necessária.
2. Teste.
3. Remova a permissão.
4. Teste novamente.
5. Registre o resultado.

## Teste negativo

Conceda deliberadamente uma permissão excessiva em ambiente de laboratório.

Depois:

```text
identificar
↓
justificar o risco
↓
remover
↓
validar funcionamento
```

---

# 20. 🟡 Fase 14 — Service Principal

## Conceito

O Service Principal é a representação da aplicação dentro de um tenant.

Modelo mental:

```text
Application Object
        ↓
Service Principal
        ↓
Tenant
        ↓
Permissions / Roles
```

## Por que?

Permite controlar como a aplicação atua dentro daquele tenant.

## Exercício

Localize o Service Principal da aplicação `LAB-APP-GRAPH`.

Compare:

- identidade da aplicação;
- identidade no tenant;
- permissões;
- roles;
- credenciais.

## Segurança

Revise regularmente:

- aplicações sem uso;
- credenciais antigas;
- permissões excessivas;
- Service Principals privilegiados.

A documentação atual do Workload ID recomenda remover aplicações não utilizadas, remover credenciais desnecessárias e revisar identidades de workload privilegiadas. citeturn0search11

---

# 21. 🟡 Fase 15 — Managed Identity

## O que é?

Identidade gerenciada pelo Azure para um recurso.

## Por que?

Evita armazenar credenciais persistentes em código/configuração quando o serviço suportar Managed Identity.

## Quando?

Quando um workload Azure precisa acessar outro recurso Azure e o cenário suporta identidade gerenciada.

## Arquitetura

```text
Azure Resource
      ↓
Managed Identity
      ↓
RBAC
      ↓
Resource
```

## Laboratório

Crie um recurso temporário compatível.

Habilite Managed Identity.

Conceda somente a role necessária.

### Teste positivo

Managed Identity + role correta → acesso permitido.

### Teste negativo

Remova a role → acesso negado.

### Objetivo

Provar que o workload pode autenticar sem um secret armazenado pela aplicação.

---

# 22. 🟠 Fase 16 — Workload Identity Federation

## Conceito

Permite que um workload externo estabeleça confiança com o Entra sem depender de um secret persistente tradicional.

## Quando usar?

Cenários como CI/CD e workloads externos que suportam federação.

A documentação atual do Workload ID cobre federação, Managed Identity, proteção de Service Principals e Conditional Access para workload identities. citeturn0search11

## Modelo

```text
Workload externo
      ↓
Token
      ↓
Entra
      ↓
Trust / Federation
      ↓
Role / Permission
      ↓
Recurso
```

## Testes negativos obrigatórios

Altere um elemento por vez:

- issuer incorreto;
- subject incorreto;
- audience incorreta;
- role removida.

Resultado esperado: autenticação/autorização falha.

### Objetivo profissional

Aprender que uma workload identity também precisa de:

```text
identidade
+ confiança
+ privilégio mínimo
+ ciclo de vida
+ monitoramento
```

---

# 23. 🟠 Fase 17 — PIM e JIT

## Conceito

PIM controla acesso privilegiado usando elegibilidade, ativação temporária, aprovação e outros controles conforme o cenário.

A Microsoft descreve PIM como mecanismo para reduzir acesso excessivo e permanente por meio de acesso privilegiado just-in-time e controles de ativação. citeturn0search9turn0search16

## Por que?

Evitar:

```text
Administrador
↓
Privilegio permanente
↓
Conta comprometida
↓
Impacto elevado
```

Preferir:

```text
Usuário elegível
↓
Solicita ativação
↓
MFA / aprovação / justificativa
↓
Privilégio temporário
↓
Expiração
```

## Licenciamento

PIM exige licenciamento compatível. Se o tenant não possuir o recurso, não tente transformar a ausência de licença em uma configuração falsa. Estude o fluxo conceitualmente e execute quando houver trial/licença adequada.

## Laboratório

Escolha uma role de baixo impacto.

1. Configure elegibilidade.
2. Defina duração curta.
3. Exija justificativa/MFA/aprovação quando disponível.
4. Ative.
5. Execute uma ação permitida.
6. Aguarde/force expiração conforme o recurso permitir.
7. Repita a ação.

### Testes

```text
Sem ativação → negado
Ativado → permitido
Expirado → negado
```

### Investigação

Procure:

- atribuição;
- ativação;
- aprovador;
- justificativa;
- alteração realizada;
- expiração.

---

# 24. 🟠 Fase 18 — Access Reviews

## O que é?

Recertificação de acesso.

## Pergunta que resolve

> "Esta identidade ainda precisa deste acesso?"

## Quando usar?

- grupos privilegiados;
- convidados;
- aplicações;
- acessos temporários;
- funções administrativas.

## Exercício

1. Dê acesso a `LAB-USER-ANA`.
2. Crie uma Access Review quando disponível.
3. Faça a revisão como reviewer.
4. Escolha `Deny`.
5. Execute a remoção/ação configurada.
6. Confirme o acesso.

### Resultado

```text
Acesso concedido
↓
Revisão
↓
Deny
↓
Revogação
```

Identity Governance existe justamente para controlar, monitorar e auditar quem possui acesso e se esse acesso continua adequado. citeturn0search3turn0search8

---

# 25. 🟠 Fase 19 — Entitlement Management

## Conceito

Organiza recursos em Access Packages com políticas de solicitação, aprovação, duração e revisão conforme disponibilidade/licenciamento.

## Por que?

Evita que cada acesso seja tratado como exceção manual.

## Modelo

```text
Usuário
 ↓
Request
 ↓
Approval
 ↓
Access Package
 ↓
Resource
 ↓
Expiration / Review
```

## Exercício

Crie:

```text
LAB-PACK-FINANCE
```

Inclua um grupo de laboratório.

Simule:

```text
Solicitação
↓
Aprovação
↓
Concessão
↓
Uso
↓
Expiração / revisão
↓
Revogação
```

### Objetivo

Diferenciar **autorização técnica** de **governança do ciclo de acesso**.

---

# 26. 🟠 Fase 20 — Lifecycle Workflows

## Conceito

Automatiza ações do ciclo de vida da identidade conforme os recursos disponíveis.

## Modelo

```text
JOINER
 ↓
identidade + acesso inicial

MOVER
 ↓
remover acesso antigo + conceder novo

LEAVER
 ↓
desativar + remover acesso + preservar evidência
```

## Cenário Joiner

Maria entra na empresa.

Resultado esperado:

- identidade criada;
- grupo correto;
- acesso correto;
- MFA configurado conforme política.

## Cenário Mover

Maria muda de Finance para RH.

Resultado esperado:

```text
Finance access → removido
RH access      → concedido
```

## Cenário Leaver

Maria deixa a empresa.

Resultado esperado:

```text
Login → bloqueado
Groups → revisados
Applications → revisadas
Roles → removidas
Evidence → preservada
```

A Microsoft descreve Identity Governance como uma camada para controlar o ciclo de vida de identidade, acesso e privilégios. citeturn0search8

---

# 27. 🟠 Fase 21 — Identity Protection

## Conceito

Adiciona sinais de risco à decisão de identidade.

## Quando?

Quando a organização precisa responder a situações em que o comportamento de autenticação indica risco elevado.

## Dependência

Recursos baseados em risco exigem licenciamento compatível, normalmente Microsoft Entra ID P2. citeturn0search2

## Fluxo

```text
Evento
 ↓
Detecção de risco
 ↓
Classificação
 ↓
Conditional Access
 ↓
MFA / remediação / bloqueio
 ↓
Investigação
```

## Laboratório

Use eventos de teste/simulação suportados pelo produto. Não tente produzir ataques reais contra o tenant.

### O que investigar

- risky users;
- risk detections;
- sign-in risk;
- user risk;
- política aplicada;
- ação de remediação.

---

# 28. 🟠 Fase 22 — Microsoft Graph + PowerShell

## Por que?

Portal é ótimo para aprender. Automação é necessária para escala.

## Instalar

No PowerShell:

```powershell
Install-Module Microsoft.Graph -Scope CurrentUser
```

## Conectar

Use autenticação interativa e o menor conjunto de scopes necessário.

```powershell
Connect-MgGraph -Scopes "User.Read.All"
```

## Consultar usuários

```powershell
Get-MgUser -All |
    Select-Object DisplayName,UserPrincipalName,AccountEnabled
```

## Exercício 1 — relatório

Gere relatório com:

- DisplayName;
- UPN;
- AccountEnabled;
- Id;
- criação quando disponível.

## Exercício 2 — JML

Modele:

```text
CSV
 ↓
Validação
 ↓
Create User
 ↓
Group Membership
 ↓
Relatório
```

## Exercício 3 — Leaver

Automatize em ambiente controlado:

```text
Disable
 ↓
Membership review
 ↓
Role review
 ↓
Report
```

### Regra de segurança

Nunca coloque client secret, senha ou token dentro do `.ps1`.

---

# 29. 🔴 Fase 23 — PAM, JEA e PAW

## PAM

Privileged Access Management é a disciplina de controlar contas, credenciais, sessões e privilégios administrativos.

Nem todo laboratório precisa de um produto PAM comercial.

## O que você pode simular

```text
Conta normal
      ↓
Conta administrativa separada
      ↓
JIT / PIM
      ↓
PAW / estação controlada
      ↓
Recurso privilegiado
      ↓
Auditoria
```

## JEA

Just Enough Administration limita o que uma conta administrativa pode executar.

### Exercício conceitual

Defina uma função administrativa que precisa apenas de três operações.

Compare:

```text
Administração ampla
vs.
Administração mínima
```

## PAW

Privileged Access Workstation é uma estação dedicada/controlada para tarefas privilegiadas.

### Laboratório otimizado

Não mantenha uma PAW virtual permanentemente ligada.

Use uma VM somente durante o exercício de acesso administrativo controlado.

### Objetivo

Entender que proteger privilégio não significa apenas proteger a role; significa proteger também o **caminho usado para exercer a role**.

---

# 30. 🔴 Fase 24 — Cenários de investigação

Agora pare de seguir o tutorial.

Você receberá um incidente e deverá investigar.

## Incidente 01 — Privilégio inesperado

### Situação

`LAB-USER-ANA` aparece com privilégio que não deveria possuir.

### Sua missão

Descobrir:

```text
Quem concedeu?
Quando?
Qual role?
Direto ou via grupo?
Qual ação foi executada?
O acesso continua ativo?
```

### Resposta esperada

Audit Logs + Users + Groups + Roles.

---

## Incidente 02 — Conditional Access bloqueando usuário

### Situação

Ana não consegue acessar uma aplicação.

### Investigue

1. Sign-in Logs.
2. Conditional Access.
3. What If.
4. Condições.
5. Exclusions.
6. Grant/session controls.

### Objetivo

Não desabilite a política imediatamente.

Primeiro descubra **qual regra causou o resultado**.

---

## Incidente 03 — Guest residual

### Situação

O guest foi removido de um grupo, mas ainda possui acesso.

### Investigue

```text
Direct assignment?
Group 1?
Group 2?
Application assignment?
Access Package?
```

### Objetivo

Descobrir caminhos de acesso indiretos.

---

## Incidente 04 — Secret comprometido

### Situação

Uma aplicação possui um secret que não deveria existir.

### Ação

```text
Identificar
↓
Registrar evidência
↓
Revogar secret
↓
Testar falha
↓
Migrar para mecanismo adequado
↓
Validar
```

Nunca publique o secret como evidência.

---

## Incidente 05 — Leaver incompleto

### Situação

Usuário foi desabilitado, mas ainda existe acesso residual.

### Investigue

- groups;
- roles;
- applications;
- guest relationships;
- workload access;
- tokens/sessões conforme mecanismo suportado.

### Pergunta de entrevista

> Por que desabilitar o usuário não é automaticamente sinônimo de offboarding completo?

---

# 31. 🔴 Fase 25 — Projeto corporativo final

## Empresa fictícia

**ACME Brasil**

Departamentos:

```text
TI
IAM
SOC
Financeiro
RH
```

## Requisitos

### Identidades

- usuários;
- grupos;
- convidados;
- contas administrativas;
- conta de emergência.

### Autenticação

- MFA;
- método de autenticação adequado;
- SSPR.

### Autorização

- RBAC;
- grupos;
- least privilege;
- segregação de funções.

### Conditional Access

- MFA para cenário definido;
- bloqueio de autenticação legada;
- aplicação específica;
- administração privilegiada;
- risco quando licenciado.

### Governança

- Access Review;
- Access Package;
- JML;
- revisão de guest.

### Privilege

- PIM/JIT quando licenciado;
- ativação;
- expiração;
- auditoria.

### Applications

- Enterprise Application;
- SSO;
- App Registration;
- Service Principal;
- API permissions.

### Workload

- Managed Identity;
- Workload Federation quando possível.

### Automação

- Graph;
- PowerShell;
- relatório;
- JML.

### Monitoramento

- Sign-in Logs;
- Audit Logs;
- investigação de alteração privilegiada.

---

# 32. 🧪 Matriz de testes

| ID | Cenário | Resultado esperado | Evidência |
|---|---|---|---|
| T01 | Login normal | Permitido | Sign-in Log |
| T02 | Usuário sem acesso | Negado | Sign-in Log |
| T03 | MFA | Desafio | Sign-in Log |
| T04 | CA Report-only | Impacto registrado | CA/Log |
| T05 | CA bloqueio | Negado | Log |
| T06 | What If | Política identificada | Screenshot |
| T07 | RBAC Reader | Leitura | Evidência |
| T08 | RBAC sem permissão | Negado | Evidência |
| T09 | Grupo concede acesso | Permitido | Evidência |
| T10 | Grupo removido | Negado | Evidência |
| T11 | Guest | Acesso controlado | Log |
| T12 | Guest removido | Negado | Log |
| T13 | SSO | Login funcional | Log |
| T14 | App Registration | Identidade criada | Evidência |
| T15 | API permission | Acesso autorizado | Log |
| T16 | API permission removida | Negado | Log |
| T17 | Service Principal | Identidade encontrada | Evidência |
| T18 | Managed Identity | Acesso sem secret | Log |
| T19 | Role removida | Negado | Evidência |
| T20 | Federation válida | Permitido | Log |
| T21 | Federation inválida | Negado | Log |
| T22 | PIM sem ativação | Negado | Log |
| T23 | PIM ativado | Permitido | Log |
| T24 | PIM expirado | Negado | Log |
| T25 | Access Review deny | Revogado | Review |
| T26 | Joiner | Acesso correto | Evidência |
| T27 | Mover | Acesso antigo removido | Evidência |
| T28 | Leaver | Identidade bloqueada | Evidência |
| T29 | Secret revogado | Falha esperada | Log |
| T30 | Privilégio excessivo | Detectado/removido | Audit Log |

---

# 33. 📸 Evidências

Crie localmente:

```text
01-IAM/
└── evidence/
    ├── 01-foundation/
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

## Modelo de evidência

Para cada exercício registre:

```text
ID:
Objetivo:
Data:
Pré-requisito:
Configuração:
Teste positivo:
Teste negativo:
Resultado:
Log consultado:
Problema encontrado:
Correção:
Rollback:
Lição aprendida:
```

### Sanitização

Antes de colocar qualquer screenshot no GitHub:

- remova e-mails reais;
- remova Tenant ID quando não for necessário;
- remova IP público;
- remova secrets;
- remova tokens;
- remova cookies;
- remova recovery codes;
- remova dados pessoais.

---

# 34. 🧩 Troubleshooting padrão

Quando algo falhar, não altere dez coisas ao mesmo tempo.

Use:

```text
1. Reproduzir
2. Registrar horário
3. Identificar usuário
4. Identificar aplicação
5. Verificar Sign-in Log
6. Verificar Audit Log
7. Verificar Conditional Access
8. Usar What If quando aplicável
9. Isolar uma variável
10. Corrigir
11. Repetir
12. Documentar
```

## Regra

> **Um problema de IAM deve gerar uma hipótese testável.**

Exemplo:

> "Acesso foi negado porque a política `LAB-CA-001` exigiu MFA e o usuário não concluiu o requisito."

Isso é melhor do que:

> "O Entra bloqueou."

---

# 35. 📊 Checklist de competência

## Básico

- [ ] explicar tenant;
- [ ] criar usuário;
- [ ] criar grupo;
- [ ] administrar membership;
- [ ] explicar authentication vs authorization;
- [ ] explicar RBAC;
- [ ] aplicar least privilege.

## Intermediário

- [ ] configurar MFA;
- [ ] testar SSPR;
- [ ] criar Conditional Access;
- [ ] usar Report-only;
- [ ] usar What If;
- [ ] interpretar Sign-in Logs;
- [ ] interpretar Audit Logs;
- [ ] administrar guest;
- [ ] configurar SSO.

## Avançado

- [ ] explicar Application vs Service Principal;
- [ ] diferenciar delegated/application permissions;
- [ ] aplicar least privilege a API permissions;
- [ ] usar Managed Identity;
- [ ] explicar Workload Federation;
- [ ] configurar/testar PIM quando licenciado;
- [ ] executar Access Review;
- [ ] modelar Access Package;
- [ ] modelar JML;
- [ ] investigar identidade de workload;
- [ ] automatizar com Graph;
- [ ] explicar PAM/JEA/PAW.

## Profissional

Você terminou quando consegue responder sem o manual:

> **Quem acessou?**
>
> **Como autenticou?**
>
> **Qual aplicação acessou?**
>
> **Qual política foi aplicada?**
>
> **Qual privilégio possuía?**
>
> **Por que a autorização foi permitida ou negada?**
>
> **Quem concedeu o acesso?**
>
> **Esse acesso deveria continuar existindo?**
>
> **Como revogar?**
>
> **Qual evidência prova o que aconteceu?**

---

# 36. 🏆 Desafio final sem tutorial

Crie o cenário abaixo sem consultar as etapas anteriores.

> A empresa precisa integrar uma aplicação SaaS. Somente usuários do grupo Finance podem acessá-la. Administradores devem utilizar autenticação forte. O acesso deve ser revisado periodicamente. Uma aplicação de backend precisa acessar um recurso Azure sem armazenar secret. Um administrador não pode permanecer permanentemente privilegiado.

Você deverá montar:

```text
Users
  ↓
Groups
  ↓
Application
  ↓
RBAC / Assignment
  ↓
Conditional Access
  ↓
MFA
  ↓
Access Review
  ↓
PIM/JIT
  ↓
Managed Identity
  ↓
Logs
  ↓
Investigation
  ↓
Revocation
```

### Critério de aprovação

Não basta funcionar.

Você precisa entregar:

1. arquitetura;
2. requisitos;
3. matriz de acesso;
4. configurações;
5. testes positivos;
6. testes negativos;
7. evidências;
8. logs;
9. troubleshooting;
10. rollback;
11. riscos identificados;
12. melhorias recomendadas.

---

# 37. 📚 Referências oficiais

Priorize documentação oficial e valide licenciamento antes de executar recursos avançados.

- [Microsoft Entra ID](https://learn.microsoft.com/pt-br/entra/identity/)
- [Conditional Access](https://learn.microsoft.com/pt-br/entra/identity/conditional-access/)
- [Planejamento de Conditional Access](https://learn.microsoft.com/pt-br/entra/identity/conditional-access/plan-conditional-access)
- [Conditional Access — visão geral e licenciamento](https://learn.microsoft.com/pt-br/entra/identity/conditional-access/overview)
- [Microsoft Entra licensing](https://learn.microsoft.com/en-us/entra/fundamentals/licensing)
- [Identity Governance](https://learn.microsoft.com/pt-br/entra/id-governance/)
- [Identity Governance — visão geral](https://learn.microsoft.com/pt-br/entra/id-governance/identity-governance-overview)
- [Boas práticas de Identity Governance](https://learn.microsoft.com/en-us/entra/id-governance/best-practices-secure-id-governance)
- [Privileged Identity Management](https://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/)
- [Planejamento de PIM](https://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-deployment-plan)
- [Microsoft Entra Workload ID](https://learn.microsoft.com/en-us/entra/workload-id/)
- [Conditional Access para Workload Identities](https://learn.microsoft.com/pt-br/entra/identity/conditional-access/workload-identity)
- [Boas práticas de segurança do Entra](https://learn.microsoft.com/en-us/entra/architecture/secure-best-practices)
- [Operações de segurança do Entra](https://learn.microsoft.com/pt-br/entra/architecture/security-operations-introduction)
- [Contas privilegiadas](https://learn.microsoft.com/en-us/entra/architecture/security-operations-privileged-accounts)

---

# 🚀 Resultado final

Ao concluir este laboratório, o objetivo não é apenas saber navegar pelo Microsoft Entra.

Você deverá conseguir pegar um requisito como:

> **"Somente pessoas autorizadas devem acessar o recurso, com privilégio mínimo, autenticação adequada, acesso privilegiado temporário, governança contínua e evidência auditável."**

E transformá-lo em:

```text
REQUISITO
   ↓
IDENTIDADE
   ↓
GRUPO / ROLE
   ↓
AUTENTICAÇÃO
   ↓
CONDITIONAL ACCESS
   ↓
RBAC
   ↓
PIM / JIT
   ↓
APLICAÇÃO / WORKLOAD
   ↓
GOVERNANÇA
   ↓
LOG
   ↓
INVESTIGAÇÃO
   ↓
REVOGAÇÃO
   ↓
EVIDÊNCIA
```

> 🛡️ **Esse é o objetivo do Study IAM: sair do "sei configurar Entra" para "sei projetar, implementar, testar, investigar e governar identidade e acesso".**
