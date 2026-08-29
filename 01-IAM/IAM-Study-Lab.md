# 🛡️ Microsoft Entra ID — IAM Study Lab

> Laboratório prático, progressivo e otimizado para aprender Microsoft Entra ID do básico ao avançado. Cada módulo explica **o que é, por que existe, quando usar, onde configurar, como testar, como investigar e como desfazer**.

**Método:** entender → preparar → configurar → testar positivo → testar negativo → investigar logs → corrigir → evidenciar → revogar.

> **Foco:** Microsoft Entra ID. Active Directory, híbrido e VMs entram somente quando forem necessários para demonstrar um cenário de identidade.

---

## 🧭 Navegação

- [1. Como estudar](#1-como-estudar)
- [2. Arquitetura mínima](#2-arquitetura-mínima)
- [3. Licenciamento e custo](#3-licenciamento-e-custo)
- [4. Identidades e convenções](#4-identidades-e-convenções)
- [5. Preparação e segurança](#5-preparação-e-segurança)
- [6. Fundamentos do Entra](#6-fundamentos-do-entra)
- [7. Usuários](#7-usuários)
- [8. Grupos](#8-grupos)
- [9. Funções e RBAC](#9-funções-e-rbac)
- [10. Autenticação e MFA](#10-autenticação-e-mfa)
- [11. SSPR](#11-sspr)
- [12. Conditional Access básico](#12-conditional-access-básico)
- [13. Conditional Access avançado](#13-conditional-access-avançado)
- [14. Logs e investigação](#14-logs-e-investigação)
- [15. Guest e B2B](#15-guest-e-b2b)
- [16. Enterprise Applications e SSO](#16-enterprise-applications-e-sso)
- [17. App Registration](#17-app-registration)
- [18. Permissões de API e consentimento](#18-permissões-de-api-e-consentimento)
- [19. Service Principal](#19-service-principal)
- [20. Managed Identity](#20-managed-identity)
- [21. Workload Identity Federation](#21-workload-identity-federation)
- [22. PIM e JIT](#22-pim-e-jit)
- [23. Access Reviews](#23-access-reviews)
- [24. Entitlement Management](#24-entitlement-management)
- [25. Lifecycle Workflows](#25-lifecycle-workflows)
- [26. Identity Protection](#26-identity-protection)
- [27. Microsoft Graph e PowerShell](#27-microsoft-graph-e-powershell)
- [28. JML completo](#28-jml-completo)
- [29. PAM, JEA e PAW](#29-pam-jea-e-paw)
- [30. Cenários de investigação](#30-cenários-de-investigação)
- [31. Projeto final](#31-projeto-final)
- [32. Matriz de validação](#32-matriz-de-validação)
- [33. Evidências](#33-evidências)
- [34. Critérios de conclusão](#34-critérios-de-conclusão)
- [35. Fontes oficiais](#35-fontes-oficiais)

---

# 1. Como estudar

## 1.1 Regra do laboratório

Não considere uma configuração concluída porque o portal aceitou o formulário.

Um exercício está concluído somente quando você consegue explicar:

1. **O que** foi configurado.
2. **Por que** o controle existe.
3. **Quando** uma empresa usaria esse controle.
4. **Quem** é afetado.
5. **Qual recurso** será protegido.
6. **Qual resultado** deveria ocorrer.
7. **Como provar** o resultado.
8. **Como detectar uma falha**.
9. **Como revogar ou desfazer** a alteração.

O Microsoft Entra centraliza identidade e controle de acesso a usuários, aplicativos, dados e recursos. citehttps://learn.microsoft.com/pt-br/entra/identity/

## 1.2 Padrão de todos os módulos

Use sempre esta sequência:

**CONCEITO** → entenda o mecanismo.

**POR QUE** → associe o mecanismo a um problema real.

**QUANDO** → identifique o cenário de uso.

**PRÉ-REQUISITOS** → confirme licença, função e recurso.

**CONFIGURAÇÃO** → siga o caminho indicado no portal.

**TESTE POSITIVO** → confirme o comportamento permitido.

**TESTE NEGATIVO** → confirme o comportamento proibido.

**LOG** → encontre a evidência técnica.

**TROUBLESHOOTING** → descubra por que algo não funcionou.

**REVOGAÇÃO** → remova o acesso ou volte ao estado anterior.

**EVIDÊNCIA** → registre somente dados sanitizados.

## 1.3 Regra para políticas de segurança

Para Conditional Access e controles potencialmente destrutivos:

`Report-only → teste com conta de laboratório → Sign-in Logs → What If → ajuste → Enable`

Não crie uma política global de bloqueio como primeiro exercício.

---

# 2. Arquitetura mínima

Você não precisa manter várias VMs ligadas.

```text
PC
├── Navegador
├── PowerShell
└── Microsoft Graph PowerShell
        │
        ▼
Microsoft Entra ID — Tenant LAB
├── Users / Groups
├── Roles / RBAC
├── Authentication
├── Conditional Access
├── Logs
├── Applications
├── Workload Identities
└── Identity Governance
        │
        └── Azure Subscription
             └── somente módulos Azure
```

### Por que essa arquitetura?

A maior parte do estudo de Entra ocorre no tenant e não exige uma infraestrutura local. Isso reduz RAM, CPU e tempo de administração.

### Quando usar VM?

Somente para:

- testar PowerShell isolado;
- hospedar aplicação de laboratório;
- testar dispositivo Windows em cenários de Conditional Access;
- demonstrar identidade híbrida;
- criar um cliente para testes específicos.

Desligue a VM quando o módulo não depender dela.

---

# 3. Licenciamento e custo

Licenciamento muda com o tempo. Antes de ativar uma funcionalidade, confirme a documentação oficial e a licença atribuída ao usuário/recurso.

Conditional Access exige Microsoft Entra ID P1 ou licença que inclua P1; políticas baseadas em risco dependem de Microsoft Entra ID Protection/P2. Security Defaults fornecem proteção básica sem exigir Conditional Access. citehttps://learn.microsoft.com/pt-br/entra/identity/conditional-access/overview

PIM é recurso de acesso privilegiado do Microsoft Entra ID Governance/P2 conforme o cenário de licenciamento. citehttps://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-getting-started

### Estratégia econômica

**Sem licença Premium:**

- tenant;
- usuários;
- grupos;
- funções básicas;
- Security Defaults;
- MFA básico;
- aplicações disponíveis;
- Graph dentro das permissões disponíveis.

**P1/trial:**

- Conditional Access;
- bloqueio de autenticação legada;
- políticas por aplicação;
- políticas administrativas;
- controles por localização/dispositivo quando disponíveis.

**P2/Governance/trial:**

- PIM;
- Identity Protection baseada em risco;
- recursos avançados de governança conforme licença.

> Não atribua licença a todos os usuários automaticamente. Crie somente as identidades de teste necessárias e valide o requisito da funcionalidade antes de ativá-la.

---

# 4. Identidades e convenções

Crie um conjunto pequeno de identidades.

| Nome | Tipo | Uso |
|---|---|---|
| `LAB-BREAKGLASS` | emergência | recuperação |
| `LAB-IAM-ADMIN` | administrativa | administração |
| `LAB-IAM-READER` | leitura | auditoria |
| `LAB-USER-ANA` | usuário | teste normal |
| `LAB-USER-JOAO` | usuário | teste negativo |
| `LAB-USER-MARIA` | usuário | JML |
| `LAB-GUEST-PARTNER` | guest | B2B |
| `LAB-APP-GRAPH` | aplicação | workload |

### Convenções

```text
LAB-USER-*
LAB-GRP-*
LAB-APP-*
LAB-CA-*
LAB-RBAC-*
LAB-PIM-*
LAB-AR-*
LAB-PACK-*
```

Nunca publique senha, secret, token, cookie, recovery code ou código MFA.

---

# 5. Preparação e segurança

## 5.1 Inventário

Antes de alterar o tenant, registre localmente:

- Tenant ID;
- domínio inicial;
- assinatura Azure, se existir;
- licenças/trials;
- administradores;
- recursos existentes.

### Por que?

Você precisa saber o estado inicial para conseguir explicar o que mudou.

## 5.2 Conta de emergência

Tenha uma conta de emergência separada da conta administrativa normal. Ela deve ser usada somente para recuperação controlada.

### Teste

Confirme que você consegue autenticar nela antes de criar políticas que possam causar lockout.

### Depois

Não use essa conta no trabalho diário. Monitore qualquer utilização.

## 5.3 MFA antes de políticas

Cadastre o método de autenticação da conta administrativa e das contas de teste antes de exigir MFA por Conditional Access.

---

# 6. Fundamentos do Entra

## O que é?

É o diretório de identidades da Microsoft para usuários, grupos, aplicações, dispositivos, funções e outros objetos de identidade.

## Por que importa para IAM?

IAM precisa responder quatro perguntas:

`Quem é? → Como prova quem é? → O que pode fazer? → Como controlar/revogar?`

## Como explorar

Abra o **Microsoft Entra admin center** e localize:

- Microsoft Entra ID → Overview;
- Users;
- Groups;
- Roles and administrators;
- Protection;
- Conditional Access;
- Enterprise applications;
- App registrations;
- Monitoring;
- Identity Governance.

### Exercício

Escolha um usuário e descubra:

`identidade → grupos → licenças → roles → aplicações → sign-ins → alterações`

Esse exercício cria o modelo mental que será usado em todo o manual.

---

# 7. Usuários

## O que são?

Identidades humanas usadas para autenticação e acesso.

## Quando usar?

Para pessoas: funcionários, terceiros, convidados e administradores.

## 7.1 Criar usuário

Caminho:

**Entra ID → Users → All users → New user → Create new user**

Crie `LAB-USER-ANA`.

Preencha somente dados fictícios necessários.

### Por que?

Precisamos de uma identidade controlada para observar autenticação, autorização e logs.

### Teste positivo

Abra janela privada → `https://myapps.microsoft.com` ou recurso disponível → autentique `LAB-USER-ANA`.

### Teste negativo

Entre no centro administrativo. A conta não deve possuir privilégios administrativos.

### Validação

**Entra ID → Monitoring & health → Sign-in logs**.

Confirme:

- usuário;
- aplicação;
- data/hora;
- resultado;
- IP/localização conforme disponível;
- Conditional Access quando aplicável.

### Falhas comuns

**Senha rejeitada:** confirme usuário/UPN e estado `Account enabled`.

**MFA inesperado:** verifique Security Defaults/Conditional Access.

**Acesso administrativo:** investigue memberships e roles.

---

# 8. Grupos

## O que são?

Coleções de identidades usadas para administrar acesso, aplicações, licenças e políticas.

## Por que usar grupos?

Evita atribuir permissões usuário por usuário.

Modelo recomendado:

`Usuário → Grupo → Acesso`

## 8.1 Criar grupos

Caminho:

**Entra ID → Groups → All groups → New group**

Crie:

```text
LAB-GRP-USERS
LAB-GRP-IAM-READERS
LAB-GRP-IAM-ADMINS
LAB-GRP-FINANCE
LAB-GRP-APP-USERS
```

Use **Security** para grupos de segurança.

### Teste

Adicione `LAB-USER-ANA` a `LAB-GRP-FINANCE`.

Remova e confirme que o acesso concedido pelo grupo desapareceu.

### O que aprender

O grupo não é apenas organização. Ele pode ser o elo entre identidade e autorização.

---

# 9. Funções e RBAC

## O que é RBAC?

Role-Based Access Control associa uma identidade a uma função que concede operações em determinado escopo.

Modelo:

`Principal → Role → Scope → Permission`

## Quando usar?

Quando a organização precisa conceder administração sem transformar todo administrador em Global Administrator.

## 9.1 Criar leitor

Caminho:

**Entra ID → Roles and administrators**

Escolha uma função de leitura adequada ao exercício.

Atribua a `LAB-IAM-READER`.

### Teste positivo

Como `LAB-IAM-READER`, consulte o recurso permitido.

### Teste negativo

Tente modificar um objeto.

Resultado esperado: operação negada.

## 9.2 Exercício de excesso de privilégio

1. Atribua temporariamente uma role administrativa de baixo impacto.
2. Faça uma alteração controlada.
3. Observe o Audit Log.
4. Remova a role.
5. Tente repetir a alteração.

### O que provar?

`role presente → ação permitida`

`role removida → ação negada`

Esse é o fundamento de least privilege.

---

# 10. Autenticação e MFA

## Conceito

Autenticação comprova a identidade. MFA adiciona um fator adicional.

Não confunda:

`Autenticação ≠ Autorização`

MFA responde **quem é**; RBAC/CA responde **se pode acessar e sob quais condições**.

## 10.1 Security Defaults

Use quando o tenant não estiver usando Conditional Access e você quiser aprender o mecanismo básico de proteção.

Caminho administrativo: procure **Properties → Manage security defaults** conforme o centro de administração atual.

### Teste

1. Use usuário de laboratório.
2. Faça registro do Authenticator.
3. Saia.
4. Entre novamente.
5. Confirme o segundo fator.

### Falha comum

Se o tenant já usa Conditional Access, não tente habilitar Security Defaults simultaneamente. O desenho deve usar uma estratégia coerente.

## 10.2 Métodos de autenticação

Quando disponíveis, pratique:

- Microsoft Authenticator;
- passkey/FIDO2;
- Temporary Access Pass;
- política de métodos de autenticação.

### Cenário

`usuário novo → registra método → login → método perdido → recuperação`

### Pergunta

Como recuperar a identidade sem criar um bypass permanente?

---

# 11. SSPR

## O que é?

Self-Service Password Reset permite ao usuário recuperar/redefinir a senha conforme a política configurada.

## Quando usar?

Para reduzir dependência do help desk e controlar recuperação de conta.

## Como testar

1. Configure SSPR conforme o plano/licença do tenant.
2. Defina o grupo de teste.
3. Registre os métodos necessários.
4. Abra uma sessão privada.
5. Inicie o fluxo de redefinição.
6. Complete a verificação.
7. Defina nova senha.
8. Faça login novamente.

### Teste negativo

Não forneça o fator de verificação correto.

Resultado esperado: reset não autorizado.

### Validação

Investigue os logs de autenticação e os eventos administrativos disponíveis.

---

# 12. Conditional Access básico

## O que é?

É um mecanismo de decisão `if/then` que combina sinais e aplica uma decisão de acesso. A Microsoft o posiciona como mecanismo de política Zero Trust. citehttps://learn.microsoft.com/pt-br/entra/identity/conditional-access/overview

## Quando usar?

Quando MFA global não é suficiente e a empresa precisa considerar usuário, aplicação, dispositivo, localização, risco ou outros sinais.

## 12.1 Antes de criar a política

Tenha:

- usuário de teste;
- grupo de teste;
- método MFA registrado;
- conta de emergência protegida;
- plano de rollback.

## 12.2 Criar política MFA

Caminho:

**Entra ID → Protection → Conditional Access → Policies → New policy**

Nome:

`LAB-CA-001-REQUIRE-MFA`

Configure:

**Users:** grupo `LAB-GRP-USERS`.

**Target resources:** um recurso de laboratório.

**Grant:** Require multifactor authentication.

**Enable:** Report-only.

### Por que Report-only?

Permite observar o impacto sem bloquear o acesso.

### Teste

Faça login com `LAB-USER-ANA`.

### Validação

Abra o Sign-in Log e examine a seção de Conditional Access.

Procure o resultado da política.

### Ativar

Somente depois de confirmar o resultado esperado, altere para **On**.

### Rollback

Se o resultado estiver errado:

1. desabilite a política;
2. confirme acesso da conta de teste;
3. analise os sinais e exclusões;
4. corrija;
5. repita em Report-only.

---

# 13. Conditional Access avançado

Aplique sempre um cenário por vez.

## 13.1 Bloquear autenticação legada

### Por que?

Protocolos antigos podem não suportar controles modernos como MFA.

### Como

Crie:

`LAB-CA-002-BLOCK-LEGACY`

Condição: clientes de autenticação legada.

Ação: Block access.

Primeiro Report-only.

### Teste

Use somente cliente/protocolo de laboratório que permita demonstrar o comportamento.

### Validação

Sign-in Logs → detalhes da autenticação → Conditional Access.

## 13.2 Política para administradores

Crie:

`LAB-CA-003-ADMIN-MFA`

Escopo: funções administrativas de teste.

Ação: MFA/autenticação forte conforme a licença.

### Por que?

O comprometimento de uma conta privilegiada possui impacto muito maior.

## 13.3 Política por aplicação

Crie uma Enterprise Application de laboratório e aplique CA somente a ela.

Teste:

`app + usuário permitido → MFA`

`app + usuário excluído → comportamento esperado`

## 13.4 Localização

Defina um Named Location somente se você compreender o IP de origem do laboratório.

Teste:

`localização A → permitido`

`localização B → bloqueado`

Não confunda endereço privado de VM com IP público observado pelo serviço.

## 13.5 Dispositivo

Quando houver Windows/Intune ou recurso compatível, teste:

`dispositivo em conformidade → acesso`

`dispositivo fora de conformidade → bloqueio/requisito`

## 13.6 What If

Abra a ferramenta **What If**.

Informe usuário, aplicação e condições.

Use-a para responder:

- quais políticas aplicariam?
- qual bloquearia?
- qual exclusão alteraria o resultado?

### Exercício

Crie uma política de teste conflitante em Report-only e explique o resultado antes de habilitá-la.

---

# 14. Logs e investigação

## 14.1 Sign-in Logs

Caminho:

**Entra ID → Monitoring & health → Sign-in logs**.

Investigue:

- usuário;
- aplicação;
- resultado;
- IP;
- localização;
- MFA;
- Conditional Access;
- detalhes de autenticação.

## 14.2 Audit Logs

Caminho:

**Entra ID → Monitoring & health → Audit logs**.

Procure alterações em:

- usuários;
- grupos;
- memberships;
- roles;
- aplicações;
- credenciais;
- políticas.

## 14.3 Exercício de investigação

Execute:

1. criar usuário;
2. adicionar grupo;
3. atribuir role;
4. remover role;
5. remover grupo;
6. desabilitar usuário.

Depois não use sua memória: reconstrua tudo a partir dos logs.

Responda:

`Quem → o quê → quando → qual objeto → resultado`

### Falha comum

Pesquisar somente por nome. Pesquise também por operação, objeto e janela de tempo.

---

# 15. Guest e B2B

## Conceito

Guest permite colaboração com identidade externa sem transformar a pessoa em funcionário interno.

## Quando usar?

Parceiros, fornecedores, consultores e colaboradores externos.

## Criar

Caminho:

**Entra ID → Users → New user → Invite external user**

Use uma identidade externa controlada.

## Teste

1. Convide o guest.
2. Conceda acesso somente a um grupo/aplicação de laboratório.
3. Teste acesso.
4. Remova o acesso.
5. Teste novamente.
6. Remova o guest.

### Cenário importante

Conceda acesso por grupo e aplicação separadamente. Remova somente um caminho e descubra se o usuário ainda possui acesso pelo segundo caminho.

Esse exercício ensina **access path analysis**.

---

# 16. Enterprise Applications e SSO

## Conceito

Enterprise Application representa a instância do aplicativo consumida pelo tenant e seus controles de acesso.

SSO permite que o Entra participe da autenticação do aplicativo.

## Quando usar?

SaaS, aplicações corporativas e sistemas que suportam SAML/OIDC/OAuth conforme o cenário.

## Laboratório

Escolha uma aplicação de teste compatível.

Caminho:

**Entra ID → Enterprise applications → New application**

Atribua `LAB-USER-ANA`.

Se a aplicação exigir atribuição, habilite o controle correspondente.

### Testes

`usuário atribuído → acesso`

`usuário não atribuído → negado`

`CA aplicada → MFA/controle esperado`

### O que investigar?

- atribuição;
- autenticação;
- CA;
- logs;
- grupos.

---

# 17. App Registration

## Conceito

App Registration descreve uma aplicação conhecida pelo Entra. A aplicação pode usar OAuth 2.0/OpenID Connect e receber identidade/credenciais para chamar recursos.

## Quando usar?

Quando você precisa registrar uma aplicação própria ou integração que autentique contra o Entra.

## Criar

Caminho:

**Entra ID → App registrations → New registration**

Nome:

`LAB-APP-GRAPH`

Escolha o tipo de contas somente de acordo com o cenário de laboratório.

### Resultado esperado

A aplicação terá um registro e um identificador de aplicação/client ID.

### Exercício de credencial

Se precisar demonstrar secret:

1. crie secret com validade curta;
2. copie o valor somente para local seguro;
3. teste a autenticação;
4. revogue/delete;
5. teste novamente.

### O que aprender?

Secret é uma credencial. Se o workload puder usar Managed Identity ou Federation, prefira eliminar segredo persistente.

---

# 18. Permissões de API e consentimento

## Conceitos

**Delegated permission:** aplicação age em nome do usuário.

`Usuário → App → API`

**Application permission:** aplicação age como workload, sem usuário interativo.

`App → API`

## Quando usar?

Integrações automatizadas e aplicações que precisam consultar/modificar dados.

## Como praticar

No App Registration:

**API permissions → Add a permission**

Escolha somente a permissão mínima necessária.

### Teste

1. conceda permissão;
2. execute operação permitida;
3. remova a permissão;
4. repita;
5. confirme falha.

### Exercício de least privilege

Dê inicialmente uma permissão excessiva em laboratório, prove que funciona, reduza para a mínima e prove novamente.

O objetivo não é decorar permissões; é aprender a raciocinar:

`qual dado → qual operação → qual identidade → qual permissão mínima`

---

# 19. Service Principal

## Conceito

O Service Principal é a identidade da aplicação dentro de um tenant.

Não confunda:

`Application object ≠ Service Principal`

O primeiro descreve a aplicação; o segundo é a representação dessa aplicação no tenant.

## Laboratório

Crie App Registration e observe o Service Principal correspondente em **Enterprise applications**.

### Teste

Conceda uma função de baixo impacto ao Service Principal em um recurso de laboratório.

Teste acesso.

Remova a função.

Teste novamente.

### Pergunta de entrevista

Por que um Service Principal com Owner/Contributor/Global Administrator pode ser mais perigoso do que um usuário comum?

---

# 20. Managed Identity

## Conceito

É uma identidade gerenciada pela plataforma Azure para um recurso, permitindo autenticação sem você armazenar um secret da aplicação.

## Quando usar?

Quando o workload roda em Azure e o serviço suporta Managed Identity.

## Laboratório

Crie um recurso Azure temporário compatível.

Habilite **System assigned managed identity**.

### Por que?

A identidade passa a existir junto com o recurso e pode obter tokens para acessar recursos autorizados.

## RBAC

Conceda à Managed Identity somente a role mínima necessária no recurso de destino.

Modelo:

`VM/App Service → Managed Identity → Role → Resource`

### Teste positivo

`role presente → operação permitida`

### Teste negativo

Remova a role → repita → operação negada.

### O que comparar?

`secret armazenado manualmente` versus `identidade gerenciada`.

---

# 21. Workload Identity Federation

## Conceito

Permite que um workload externo apresente uma identidade federada em vez de guardar um secret permanente. Workload identities no Entra incluem aplicações, service principals e managed identities. citehttps://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

## Quando usar?

CI/CD, GitHub Actions e outros provedores que suportem OIDC/federação.

## Modelo

`Workload externo → OIDC token → Entra confere trust → token de acesso → recurso`

## Testes negativos

Altere uma condição de confiança em laboratório:

- issuer incorreto;
- subject incorreto;
- audience incorreta;
- role removida.

Resultado esperado: autenticação/autorização falha.

### Por que isso é importante?

Você aprende que autenticar o workload e autorizar o workload são problemas diferentes.

---

# 22. PIM e JIT

## Conceito

PIM controla acesso privilegiado com elegibilidade, ativação e duração. Ele reduz privilégio permanente e permite monitoramento das ativações. citehttps://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-getting-started

## Quando usar?

Administradores, funções críticas e recursos onde privilégio permanente não é aceitável.

## Pré-requisito

Confirme licença compatível antes do exercício.

## Laboratório econômico

Não crie vários usuários licenciados. Use o menor conjunto de identidades necessário para demonstrar:

`eligible → activate → use → expire → revoke`

## Configuração

Caminho:

**Identity Governance → Privileged Identity Management → Microsoft Entra roles**

Escolha uma role de laboratório de baixo impacto.

Configure elegibilidade para a conta administrativa de teste.

Se disponível, configure:

- MFA;
- justificativa;
- duração curta;
- aprovação.

### Testes

**Sem ativação:** ação administrativa deve falhar.

**Após ativação:** ação deve funcionar durante a janela.

**Após expiração:** ação deve falhar novamente.

### Investigação

Verifique:

`eligible → activation → role active → operation → expiration`

### O que você deve saber explicar?

Diferença entre:

`Permanent assignment`

`Eligible assignment`

`Activated assignment`

`JIT`

---

# 23. Access Reviews

## Conceito

Access Review pergunta se uma identidade ainda precisa de determinado acesso.

## Quando usar?

Acessos de alto impacto, guests, grupos, aplicações e privilégios.

## Laboratório

Crie um grupo:

`LAB-GRP-REVIEW`

Adicione `LAB-USER-ANA`.

Quando o recurso estiver disponível, crie uma revisão.

### Cenário

1. usuário recebe acesso;
2. revisão começa;
3. reviewer decide `Deny`;
4. acesso é removido;
5. valide.

### Pergunta

Por que uma revisão de acesso não substitui o controle preventivo?

Resposta esperada: revisão é controle de governança/detecção/correção; não impede necessariamente a concessão inicial.

---

# 24. Entitlement Management

## Conceito

Governança do ciclo de acesso por pacotes, políticas, solicitação, aprovação, expiração e revisão.

## Quando usar?

Quando a empresa quer transformar acesso em um processo controlado em vez de concedê-lo manualmente.

## Modelo

`Access Package → Policy → Request → Approval → Assignment → Expiration → Review`

## Laboratório

Quando disponível:

1. crie `LAB-PACK-FINANCE`;
2. inclua grupo de laboratório;
3. configure solicitante;
4. configure aprovador;
5. solicite acesso;
6. aprove;
7. confirme acesso;
8. remova/expire;
9. confirme revogação.

### O que aprender?

Autorização técnica responde **pode acessar?**

Governança responde **como esse acesso foi solicitado, aprovado, revisado e retirado?**

---

# 25. Lifecycle Workflows

## Conceito

Automação de tarefas de ciclo de vida de identidade.

## Quando usar?

Joiner, mover e leaver em ambientes onde o ciclo pode ser automatizado.

## Exercício Joiner

Crie uma identidade de teste com atributos de departamento.

Fluxo esperado:

`identidade → grupo → acesso → autenticação`

## Exercício Mover

Altere:

`Finance → RH`

Esperado:

`grupo Finance removido → grupo RH concedido → acessos antigos revistos`

## Exercício Leaver

Fluxo:

`desabilitar → remover acesso → remover privilégio → revisar aplicações → preservar evidências`

### Pergunta

Por que somente desabilitar o login não é um offboarding completo?

Porque memberships, aplicações, credenciais, grupos, ownership e privilégios podem permanecer.

---

# 26. Identity Protection

## Conceito

Usa sinais de risco para identificar usuários/entradas potencialmente comprometidos.

## Quando usar?

Quando a organização possui licença/recurso compatível e quer combinar risco com Conditional Access.

## Estude

- user risk;
- sign-in risk;
- risk detections;
- risky users;
- remediation.

## Modelo

`Sinal de risco → avaliação → política → MFA/bloqueio/remediação → investigação`

Não tente provocar ataques reais para gerar risco. Use simulação/documentação quando disponível.

---

# 27. Microsoft Graph e PowerShell

## Por que?

Portal é ótimo para aprender o conceito; automação é necessária para operação em escala.

## Instalar

No PowerShell:

```powershell
Install-Module Microsoft.Graph -Scope CurrentUser
```

Se solicitado, confirme instalação do módulo.

## Conectar

Use somente scopes necessários.

```powershell
Connect-MgGraph -Scopes "User.Read.All"
```

O navegador solicitará autenticação/consentimento conforme o cenário.

## Consultar usuários

```powershell
Get-MgUser -All |
    Select-Object DisplayName, UserPrincipalName, AccountEnabled
```

## Criar usuário de laboratório

Antes de automatizar criação, descubra no portal quais propriedades são realmente necessárias.

Depois implemente:

`CSV → validação → criação → grupo → relatório`

## Leaver automatizado

Implemente de forma controlada:

`entrada UPN → validar → desabilitar → consultar memberships → registrar → relatório`

Não automatize exclusão irreversível como primeiro exercício.

### Regra de segurança

Automação IAM deve ter:

- validação de entrada;
- menor privilégio;
- logging;
- modo dry-run quando possível;
- tratamento de erro;
- confirmação para ações destrutivas.

---

# 28. JML completo

## Caso

`LAB-USER-MARIA`

Departamento inicial: Finance.

## Joiner

1. criar usuário;
2. habilitar autenticação;
3. adicionar grupo Finance;
4. conceder aplicação Finance;
5. confirmar acesso;
6. confirmar logs.

## Mover

1. alterar departamento para RH;
2. remover grupo Finance;
3. remover acesso Finance;
4. adicionar grupo RH;
5. conceder aplicação RH;
6. testar acesso antigo;
7. testar acesso novo.

## Leaver

1. desabilitar conta;
2. confirmar login negado;
3. revisar grupos;
4. revisar aplicações;
5. revisar roles;
6. revisar ownership quando aplicável;
7. registrar evidência.

### Teste final

O usuário não deve conseguir recuperar acesso apenas porque ainda existe membership residual.

---

# 29. PAM, JEA e PAW

## PAM

Privileged Access Management é a disciplina de proteger contas, sessões, credenciais e acessos privilegiados.

Não é necessário instalar um produto PAM comercial para aprender os fundamentos.

## O que praticar

`conta administrativa separada → least privilege → JIT/PIM → MFA → auditoria → revogação`

## JEA

Just Enough Administration restringe quais operações administrativas uma identidade pode executar.

### Laboratório

Se usar PowerShell em VM, crie uma função administrativa limitada que permita somente operações específicas.

Teste:

`comando permitido → sucesso`

`comando não permitido → bloqueio`

## PAW

Privileged Access Workstation é uma estação dedicada a operações administrativas sensíveis.

No laboratório, simule com uma VM Windows separada ou perfil administrativo dedicado.

### Regra

Não use a estação administrativa para navegação diária e tarefas pessoais no exercício.

---

# 30. Cenários de investigação

Todos os testes são feitos somente no tenant de laboratório.

## C01 — Privilégio excessivo

1. conceda role controlada;
2. execute alteração;
3. pesquise Audit Logs;
4. identifique ator;
5. remova role;
6. valide bloqueio.

## C02 — Membership privilegiado

1. adicione usuário a grupo privilegiado;
2. faça login;
3. investigue alteração;
4. remova membership.

## C03 — Conditional Access incorreto

1. crie política em Report-only;
2. execute login;
3. analise Sign-in Log;
4. use What If;
5. corrija.

## C04 — Guest residual

1. conceda acesso por grupo;
2. conceda acesso por aplicação;
3. remova o grupo;
4. descubra se o guest ainda acessa pela aplicação;
5. remova o segundo caminho.

## C05 — Leaver incompleto

1. crie acessos por múltiplos caminhos;
2. desabilite usuário;
3. audite memberships e aplicações;
4. documente tudo que permaneceria residual;
5. corrija.

## C06 — Service Principal excessivo

1. crie SP;
2. conceda role maior que necessária;
3. identifique risco;
4. reduza role;
5. teste novamente.

## C07 — Secret revogado

1. crie secret temporário;
2. autentique;
3. revogue;
4. repita;
5. confirme falha.

## C08 — PIM

`eligible → activate → operation → expire → operation denied`

---

# 31. Projeto final

## Empresa fictícia

`ACME Brasil`

Departamentos:

- IAM;
- SOC;
- TI;
- Financeiro;
- RH.

## Requisitos

### Identidade

- usuários;
- grupos;
- guests;
- contas administrativas;
- break-glass.

### Autenticação

- MFA;
- método moderno quando disponível;
- SSPR.

### Autorização

- grupos;
- RBAC;
- least privilege;
- segregação de funções.

### Conditional Access

- MFA administrativo;
- bloqueio de autenticação legada;
- política por aplicação;
- localização/dispositivo quando disponíveis.

### Privilégio

- PIM/JIT quando licenciado;
- duração curta;
- MFA/justificativa/aprovação quando disponível;
- auditoria.

### Aplicações

- Enterprise Application;
- SSO;
- App Registration;
- Service Principal;
- delegated/application permissions.

### Workload

- Managed Identity;
- Federation quando possível.

### Governança

- Access Review;
- Access Package quando disponível;
- JML;
- revisão de guests.

### Automação

- Graph;
- relatório;
- Joiner;
- Leaver.

### Investigação

Você deve conseguir explicar:

`quem autenticou → qual aplicação → qual recurso → de onde → quais políticas → qual privilégio → qual alteração → qual evidência → como revogar`

---

# 32. Matriz de validação

| ID | Cenário | Positivo | Negativo | Log |
|---|---|---|---|---|
| T01 | Login | permitido | credencial inválida | Sign-in |
| T02 | Grupo | acesso concedido | membership removido | Audit |
| T03 | RBAC Reader | leitura | alteração | Audit |
| T04 | MFA | MFA solicitado | fator inválido | Sign-in |
| T05 | SSPR | reset concluído | validação falha | logs |
| T06 | CA MFA | acesso + MFA | política sem requisito | Sign-in |
| T07 | CA Legacy | moderno permitido | legado bloqueado | Sign-in |
| T08 | CA Location | local permitido | local bloqueado | Sign-in |
| T09 | CA Admin | admin protegido | condição ausente | Sign-in |
| T10 | What If | política identificada | conflito | What If |
| T11 | Guest | acesso | guest removido | Audit/Sign-in |
| T12 | SSO | login | assignment removido | Sign-in |
| T13 | API delegated | operação | permission removida | logs |
| T14 | API application | operação | permission removida | logs |
| T15 | Managed Identity | acesso | role removida | Azure logs |
| T16 | Federation | token aceito | claim inválida | logs |
| T17 | PIM | ativação | sem ativação/expirado | PIM/Audit |
| T18 | Access Review | acesso mantido | deny remove | Review |
| T19 | JML Joiner | acesso correto | grupo ausente | Audit |
| T20 | JML Mover | novo acesso | antigo removido | Audit |
| T21 | JML Leaver | login bloqueado | acesso residual | Audit |
| T22 | SP | operação | role removida | Audit |
| T23 | Secret | autentica | revogado falha | logs |
| T24 | Privilege escalation | detectado | removido | Audit |

---

# 33. Evidências

Use uma estrutura local:

```text
01-IAM/
└── evidence/
    ├── 01-foundation/
    ├── 02-users-groups/
    ├── 03-rbac/
    ├── 04-authentication/
    ├── 05-conditional-access/
    ├── 06-logs/
    ├── 07-guests/
    ├── 08-applications/
    ├── 09-workload/
    ├── 10-pim/
    ├── 11-governance/
    ├── 12-automation/
    └── 13-investigation/
```

Nomeie evidências:

`T07-CA-Legacy-blocked.png`

`T17-PIM-expired.png`

`C01-Privilege-escalation-audit.png`

Antes de publicar, remova:

- senhas;
- secrets;
- tokens;
- cookies;
- recovery codes;
- QR codes;
- dados pessoais reais;
- IPs públicos desnecessários.

---

# 34. Critérios de conclusão

Você concluiu o laboratório quando consegue, sem copiar o passo a passo:

- criar e administrar usuários;
- modelar grupos;
- explicar RBAC e least privilege;
- configurar/testar MFA;
- executar SSPR;
- construir Conditional Access com Report-only;
- usar What If;
- investigar Sign-in Logs;
- investigar Audit Logs;
- administrar guest/B2B;
- explicar Enterprise Application e SSO;
- criar App Registration;
- diferenciar Application e Service Principal;
- explicar delegated vs application permissions;
- testar Managed Identity;
- explicar Workload Identity Federation;
- usar PIM/JIT quando licenciado;
- executar Access Review quando disponível;
- explicar Entitlement Management;
- modelar JML;
- explicar Identity Protection;
- automatizar tarefas simples com Graph;
- investigar privilege escalation;
- revogar acesso;
- explicar o caminho completo de uma autorização.

## Teste de maturidade

Escolha uma solicitação corporativa:

> “Somente o time Finance deve acessar a aplicação financeira, administradores devem usar privilégio temporário e todo acesso precisa ser revisável.”

Você deve conseguir desenhar e implementar:

`Usuário → Grupo → App → CA/MFA → RBAC → PIM → Access Review → Logs → Revogação`

Se consegue fazer isso e explicar cada decisão, o laboratório cumpriu seu objetivo.

---

# 35. Fontes oficiais

- Microsoft Entra ID: https://learn.microsoft.com/pt-br/entra/identity/
- Usuários e grupos: https://learn.microsoft.com/pt-br/entra/identity/users/
- Conditional Access: https://learn.microsoft.com/pt-br/entra/identity/conditional-access/
- Planejamento de Conditional Access: https://learn.microsoft.com/pt-br/entra/identity/conditional-access/plan-conditional-access
- PIM: https://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-getting-started
- PIM deployment: https://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-deployment-plan
- Identity Governance: https://learn.microsoft.com/pt-br/entra/id-governance/identity-governance-overview
- Workload Identity: https://learn.microsoft.com/en-us/entra/workload-id/
- Workload identities overview: https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview
- Microsoft Graph PowerShell: https://learn.microsoft.com/en-us/powershell/microsoftgraph/

---

# 🏁 Modelo mental final

IAM no Entra não é decorar menus.

O raciocínio profissional é:

`IDENTIDADE`

↓

`AUTENTICAÇÃO`

↓

`SINAIS / CONTEXTO`

↓

`CONDITIONAL ACCESS`

↓

`AUTORIZAÇÃO / RBAC`

↓

`PRIVILÉGIO / PIM`

↓

`APLICAÇÃO / WORKLOAD`

↓

`GOVERNANÇA`

↓

`LOG / AUDITORIA`

↓

`AUTOMAÇÃO`

↓

`REVOGAÇÃO`

O objetivo do laboratório é conseguir implementar, testar, investigar e explicar esse fluxo de ponta a ponta.