# 🟦 IAM Study Lab — Microsoft Entra ID do básico ao avançado

> **Objetivo:** transformar experiência de infraestrutura/SOC em domínio prático de IAM, IGA, PAM e IAM Engineering.
>
> **Método de cada laboratório:** `preparar → configurar → validar → quebrar → investigar → corrigir → revogar → evidenciar → explicar`.
>
> ⚠️ **Licenciamento:** o laboratório foi desenhado para **1 única licença Microsoft Entra ID P2**, atribuída a `LAB-P2`. Recursos premium devem ser testados somente no escopo licenciado ou em trial/licença adicional. Configurar uma política não significa que todos os usuários estejam licenciados.
>
> 🔐 **Segurança:** nunca publique senha, secret, token, chave privada, cookie, código MFA ou dados reais.

---

<a id="mapa-rapido"></a>
## 🧭 Mapa rápido

> Todos os links apontam para âncoras ASCII estáveis do GitHub. Marque o **Status** conforme avança.

| # | Tema | Nível | Status | Ir |
|---|---|---|---|---|
| 00 | Controle do laboratório | Base | - [ ] | [Abrir](#modulo-00---controle-do-laboratorio) |
| 01 | VirtualBox e topologia | Base | - [ ] | [Abrir](#modulo-01---virtualbox-e-topologia) |
| 02 | Fundamentos de IAM | Base | - [ ] | [Abrir](#modulo-02---fundamentos-iam) |
| 03 | Active Directory | Base | - [ ] | [Abrir](#modulo-03---active-directory) |
| 04 | Entra Users, Groups e atributos | Base | - [ ] | [Abrir](#modulo-04---entra-users-groups-e-atributos) |
| 05 | Administrative Units e least privilege | Júnior | - [ ] | [Abrir](#modulo-05---administrative-units-e-least-privilege) |
| 06 | Azure RBAC | Júnior | - [ ] | [Abrir](#modulo-06---azure-rbac) |
| 07 | Authentication Methods e MFA | Júnior | - [ ] | [Abrir](#modulo-07---authentication-methods-e-mfa) |
| 08 | SSPR e Password Writeback | Júnior/Pleno | - [ ] | [Abrir](#modulo-08---sspr-e-password-writeback) |
| 09 | Conditional Access | Júnior/Pleno | - [ ] | [Abrir](#modulo-09---conditional-access) |
| 10 | Identity Protection | Pleno | - [ ] | [Abrir](#modulo-10---identity-protection) |
| 11 | Device Identity e Authentication Strength | Pleno | - [ ] | [Abrir](#modulo-11---device-identity-e-authentication-strength) |
| 12 | Logs e troubleshooting | Júnior/Pleno | - [ ] | [Abrir](#modulo-12---logs-e-troubleshooting) |
| 13 | SSO, OAuth2 e OIDC | Pleno | - [ ] | [Abrir](#modulo-13---sso-oauth2-e-oidc) |
| 14 | SAML 2.0 | Pleno | - [ ] | [Abrir](#modulo-14---saml-20) |
| 15 | App Registrations e Service Principals | Pleno | - [ ] | [Abrir](#modulo-15---app-registrations-e-service-principals) |
| 16 | Workload Identity e Managed Identity | Pleno | - [ ] | [Abrir](#modulo-16---workload-identity-e-managed-identity) |
| 17 | SCIM e provisioning | Pleno | - [ ] | [Abrir](#modulo-17---scim-e-provisioning) |
| 18 | Microsoft Graph | Pleno | - [ ] | [Abrir](#modulo-18---microsoft-graph) |
| 19 | PowerShell e automação | Pleno | - [ ] | [Abrir](#modulo-19---powershell-e-automacao) |
| 20 | JML e birthright access | Pleno | - [ ] | [Abrir](#modulo-20---jml-e-birthright-access) |
| 21 | IGA, Role Engineering, ABAC e SoD | Pleno | - [ ] | [Abrir](#modulo-21---iga-role-engineering-abac-e-sod) |
| 22 | Entitlement Management | Pleno | - [ ] | [Abrir](#modulo-22---entitlement-management) |
| 23 | Access Reviews | Pleno | - [ ] | [Abrir](#modulo-23---access-reviews) |
| 24 | PIM | Avançado | - [ ] | [Abrir](#modulo-24---pim) |
| 25 | B2B e External ID | Pleno | - [ ] | [Abrir](#modulo-25---b2b-e-external-id) |
| 26 | Hybrid Identity | Avançado | - [ ] | [Abrir](#modulo-26---hybrid-identity) |
| 27 | PAM com Teleport CE | Avançado | - [ ] | [Abrir](#modulo-27---pam-com-teleport-ce) |
| 28 | Cloud IAM: Azure e AWS | Avançado | - [ ] | [Abrir](#modulo-28---cloud-iam---azure-e-aws) |
| 29 | ITSM, auditoria e evidências | Pleno | - [ ] | [Abrir](#modulo-29---itsm-auditoria-e-evidencias) |
| 30 | Zero Trust e métricas | Avançado | - [ ] | [Abrir](#modulo-30---zero-trust-e-metricas) |
| 31 | Projeto final e entrevista | Sênior | - [ ] | [Abrir](#modulo-31---projeto-final-e-entrevista) |
| 📚 | Referência rápida | — | — | [Abrir](#referencia-rapida) |

### 🚦 Navegação

Comece em 00 e avance em ordem. Os links `Anterior / Índice / Próximo` aparecem no fim de cada módulo.

---

## 🧪 Como executar os módulos

Cada módulo precisa produzir uma evidência. Não marque como concluído apenas porque a interface exibiu `Success`.

### Checklist por módulo

- [ ] Entendi o objetivo.
- [ ] Sei **quando** usar.
- [ ] Sei **por que** usar.
- [ ] Executei o passo a passo.
- [ ] Repeti sem consultar o roteiro.
- [ ] Fiz teste positivo.
- [ ] Fiz teste negativo.
- [ ] Encontrei o log/evidência.
- [ ] Revoguei/desfiz a alteração.
- [ ] Consigo explicar em uma entrevista.

### 🧠 Progressão

`1. seguir roteiro → 2. repetir → 3. quebrar → 4. resolver sem roteiro → 5. projetar e explicar`

### Ritmo sugerido

Estude 1 a 2 módulos por semana. Só avance quando o módulo atual passar no teste negativo sem consultar o roteiro. O teste negativo é onde o aprendizado acontece: se você nunca quebrou, nunca investigou.

---

<a id="modulo-00---controle-do-laboratorio"></a>
## Módulo 00 - Controle do laboratório

**🎯 Objetivo:** preparar contas, licenças, evidências e regras de segurança.

### Passo 1: Criar as identidades

No **Entra admin center → Identity → Users → All users → New user**, crie:

| Conta | Uso |
|---|---|
| `LAB-ADMIN` | administração/configuração |
| `LAB-P2` | único usuário com P2 |
| `LAB-USER01` | usuário comum |
| `LAB-USER02` | teste negativo/comparação |
| `LAB-BREAKGLASS-01` | emergência |
| `LAB-BREAKGLASS-02` | emergência |

**Por quê:** separar conta administrativa, conta de teste e emergência evita misturar privilégio com uso cotidiano.

### Passo 2: Atribuir a única P2

Em **Billing/Your products → Licenses → Microsoft Entra ID P2**, atribua a licença somente a `LAB-P2`.

**Conceito-chave:** licenciamento é por usuário beneficiado; uma licença não torna o tenant inteiro licenciado.

### Passo 3: Registrar evidência

Crie uma pasta local `evidencias/` com subpastas `00` a `31`. Nunca coloque segredos.

### Passo 4: Break-glass

Mantenha as duas contas de emergência fora de políticas de bloqueio/restrição durante o laboratório. Não use essas contas para tarefas normais.

### ✅ Teste positivo

`LAB-ADMIN` consegue administrar o tenant e `LAB-P2` consegue ser usado nos exercícios P2.

### ❌ Teste negativo

Tente executar um exercício P2 com `LAB-USER01` e registre a limitação/licenciamento encontrada.

### 🧾 Evidência

- Captura da licença em `LAB-P2`.
- Lista de contas.
- Matriz de escopo/licenciamento.

### 🧹 Cleanup

Não apague as contas de emergência. Desfaça somente objetos criados especificamente para o exercício.

[⬅️ Anterior](#mapa-rapido) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-01---virtualbox-e-topologia)

---

<a id="modulo-01---virtualbox-e-topologia"></a>
## Módulo 01 - VirtualBox e topologia

**🎯 Objetivo:** construir uma infraestrutura pequena, previsível e econômica.

### Passo 1: Criar rede

**VirtualBox → Tools → Network Manager → Host-only Networks → Create**.

Use `192.168.56.0/24` e **desative o DHCP do VirtualBox**.

**Por quê:** o laboratório terá DNS/DHCP controlados pelo Windows Server. Dois DHCPs podem entregar configurações diferentes.

### Passo 2: Criar VMs

| VM | Função | RAM |
|---|---|---:|
| `LAB-DC01` | AD DS + DNS + DHCP | 4 GB |
| `LAB-WIN11` | cliente | 4 GB |
| `LAB-LINUX01` | alvo PAM | 2 GB |
| `LAB-TELEPORT` | PAM | 2 GB |

Ligue somente as VMs necessárias para cada módulo.

### Passo 3: Configurar o DC

`LAB-DC01`: `192.168.56.10/24`, gateway vazio, DNS `192.168.56.10`.

### ✅ Teste positivo

Cliente recebe IP do DHCP do DC e resolve o DNS interno.

### ❌ Teste negativo

Desligue o DC e renove o IP do cliente. O VirtualBox não deve assumir o DHCP.

### 🧾 Evidência

`ipconfig /all`, `nslookup`, topologia e configuração da rede.

### 🧹 Cleanup

Mantenha a VM desligada quando não estiver estudando.

[⬅️ Anterior](#modulo-00---controle-do-laboratorio) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-02---fundamentos-iam)

---

<a id="modulo-02---fundamentos-iam"></a>
## Módulo 02 - Fundamentos de IAM

**🎯 Objetivo:** dominar a cadeia identidade → autenticação → autorização → recurso → auditoria.

### Passo 1: Criar usuário

**Entra → Identity → Users → All users → New user** → `LAB-USER01`.

**Conceito-chave:** uma identidade é o sujeito para o qual decisões de acesso serão tomadas.

### Passo 2: Criar grupo

**Groups → New group** → `GRP-FINANCE` → adicione `LAB-USER01`.

**Conceito-chave:** autorização por grupo reduz permissões individuais e prepara RBAC/IGA.

### Passo 3: Criar cenário de acesso

Associe o grupo a um recurso de teste. Depois remova o usuário do grupo.

### ✅ Teste positivo

Usuário dentro do grupo recebe o acesso esperado.

### ❌ Teste negativo

Usuário removido do grupo perde o acesso.

### 🎤 Pergunta de entrevista

**MFA concede acesso?** Não. MFA fortalece autenticação; autorização é outra decisão.

### 🧾 Evidência

Captura do usuário, do grupo e do resultado dos dois testes (acesso concedido e acesso removido).

### 🧹 Cleanup

Remova o usuário do grupo e apague objetos de teste, se criados.

[⬅️ Anterior](#modulo-01---virtualbox-e-topologia) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-03---active-directory)

---

<a id="modulo-03---active-directory"></a>
## Módulo 03 - Active Directory

**🎯 Objetivo:** construir a base on-premises para compreender identidade híbrida.

### Passo 1: Instalar AD DS

`Server Manager → Add Roles and Features → Active Directory Domain Services → Install`.

Depois **Promote this server to a domain controller → Add a new forest**. Use `lab.local`.

**Por quê:** AD DS fornece diretório, autenticação e estrutura de domínio.

### Passo 2: Validar DNS
```text
nslookup lab.local
dcdiag /test:dns
```

### Passo 3: Criar OUs

`Users`, `Groups`, `Servers`, `Workstations`, `Disabled`.

### Passo 4: Criar grupos

`GG-FINANCE`, `GG-IT`, `GG-IAM`.

### Passo 5: Criar GPO de auditoria

**Group Policy Management → Domain → Create a GPO** → `GPO-LAB-AUDIT`.

Evite usar a Default Domain Policy para toda configuração.

### Passo 6: Ingressar cliente

No Windows cliente, configure DNS para o DC e ingresse em `lab.local`.

### ✅ Teste positivo

Login de domínio funciona e `gpresult /r` mostra a GPO.

### ❌ Teste negativo

Troque temporariamente o DNS do cliente para um endereço incorreto e tente localizar o domínio.

### 🔍 Investigação

`ipconfig /all`, `nslookup`, `dcdiag`, `gpresult /r`, Event Viewer.

### 🧾 Evidência

Saída do `dcdiag`, do `gpresult /r`, login de domínio e GPO aplicada.

### 🧹 Cleanup

Desfaça a GPO e o join de teste se não forem mais necessários. Mantenha o DC ligado para os módulos seguintes.

[⬅️ Anterior](#modulo-02---fundamentos-iam) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-04---entra-users-groups-e-atributos)

---

<a id="modulo-04---entra-users-groups-e-atributos"></a>
## Módulo 04 - Entra Users, Groups e atributos

**🎯 Objetivo:** modelar identidade para automação e governança.

### Passo 1: Criar população

Crie `LAB-P2`, `LAB-USER01` e `LAB-USER02`.

### Passo 2: Criar grupos

`GRP-FINANCE`, `GRP-IT`, `GRP-IAM-READERS`, `GRP-IAM-ADMINS`, `GRP-LAB-CA`.

### Passo 3: Preencher atributos

Em `LAB-USER01`, defina Department, Job title, Manager e Usage location.

**Por quê:** atributos podem alimentar grupos dinâmicos, JML, políticas e governança.

### Passo 4: Alterar Department

`Finance → IT`.

Registre quais acessos uma arquitetura orientada a atributos deveria conceder/revogar.

### ✅ Teste positivo

Usuário aparece no grupo/população esperada.

### ❌ Teste negativo

Altere o atributo e confirme se um mecanismo dependente dele muda; se não houver automação ainda, documente que o atributo sozinho não concede acesso.

### 🧾 Evidência

Lista de usuários/grupos, atributos preenchidos e resultado do teste negativo.

### 🧹 Cleanup

Reverta o atributo `Department` ao valor original, se necessário.

[⬅️ Anterior](#modulo-03---active-directory) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-05---administrative-units-e-least-privilege)

---

<a id="modulo-05---administrative-units-e-least-privilege"></a>
## Módulo 05 - Administrative Units e least privilege

**🎯 Objetivo:** delegar administração sem entregar privilégio global.

### Passo 1: Criar a AU

**Entra → Identity → Administrative Units → Add** → `AU-FINANCE`.

### Passo 2: Adicionar membros

Adicione usuários financeiros.

### Passo 3: Atribuir role com escopo

Atribua uma role administrativa compatível com escopo de Administrative Unit.

**Por quê:** o administrador deve receber somente a autoridade necessária e dentro do menor escopo.

### ✅ Teste positivo

Administrador delegado altera um usuário dentro da AU.

### ❌ Teste negativo

Tenta alterar usuário fora da AU.

**Resultado esperado:** operação negada ou não disponível conforme a role escolhida.

### 🧾 Evidência

Role, principal, AU e resultado dos dois testes.

### 🧹 Cleanup

Remova a role delegada e os membros de teste da AU.

[⬅️ Anterior](#modulo-04---entra-users-groups-e-atributos) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-06---azure-rbac)

---

<a id="modulo-06---azure-rbac"></a>
## Módulo 06 - Azure RBAC

**🎯 Objetivo:** dominar autorização de recursos Azure por role + scope + principal.

### Passo 1: Criar resource group

**Azure Portal → Resource groups → Create** → `rg-iam-lab`.

### Passo 2: Atribuir role

**Access control (IAM) → Add role assignment**.

Escolha uma role mínima para o teste e aplique no Resource Group, não na assinatura.

**Por quê:** reduzir scope limita o impacto de uma credencial comprometida.

### ✅ Teste positivo

Principal consegue executar a ação permitida.

### ❌ Teste negativo

Tente uma ação fora da role.

### 🔍 Investigação

**Access control (IAM) → Check access** e Activity Log.

### 🧾 Evidência

Role assignment, resultado dos dois testes e entrada no Activity Log.

### 🧹 Cleanup

Remova a role assignment e o resource group de teste.

[⬅️ Anterior](#modulo-05---administrative-units-e-least-privilege) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-07---authentication-methods-e-mfa)

---

<a id="modulo-07---authentication-methods-e-mfa"></a>
## Módulo 07 - Authentication Methods e MFA

**🎯 Objetivo:** entender métodos de autenticação e aplicar MFA corretamente.

### Passo 1: Configurar política de métodos

**Entra → Protection → Authentication methods → Policies**.

Habilite um método para o grupo de laboratório.

**Por quê:** a política define quais autenticadores podem ser usados; isso não é autorização.

### Passo 2: Registrar autenticador

Registre Microsoft Authenticator com `LAB-P2`.

### Passo 3: Testar login e MFA

Teste login e MFA.

### ❌ Teste negativo

Desabilite temporariamente o método permitido para o usuário de teste e repita o fluxo.

### 🔍 Investigação

Sign-in logs e Authentication Methods Activity.

### 🧾 Evidência

Política de métodos, registro do autenticador e resultado do teste negativo.

### 🧹 Cleanup

Reabilite o método desabilitado no teste.

### Extensão

Estude Authentication Strength, passkeys/FIDO2, TAP e métodos resistentes a phishing.

[⬅️ Anterior](#modulo-06---azure-rbac) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-08---sspr-e-password-writeback)

---

<a id="modulo-08---sspr-e-password-writeback"></a>
## Módulo 08 - SSPR e Password Writeback

**🎯 Objetivo:** executar recuperação de senha e entender o fluxo híbrido.

### Passo 1: Configurar SSPR

**Entra → Protection → Password reset → Properties**.

Use `LAB-P2` no cenário licenciado.

**Por quê:** SSPR reduz a dependência de atendimento para recuperação de acesso.

### Passo 2: Registrar métodos

`LAB-P2` → **Security info** → registre o método exigido.

### Passo 3: Reset

Na tela de login, use **Forgot password**.

### ✅ Teste positivo

Nova senha funciona.

### ❌ Teste negativo

Tente o fluxo sem registro/método suficiente.

### Passo 4: Writeback

Somente após o laboratório híbrido estar preparado: habilite writeback e teste `Entra → AD`.

**Por quê:** writeback altera a senha no diretório on-premises e exige pré-requisitos específicos.

### 🧾 Evidência

Fluxo, horário, logs e resultado de sincronização.

### 🧹 Cleanup

Desabilite o writeback se foi ativado apenas para o teste.

[⬅️ Anterior](#modulo-07---authentication-methods-e-mfa) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-09---conditional-access)

---

<a id="modulo-09---conditional-access"></a>
## Módulo 09 - Conditional Access

**🎯 Objetivo:** criar políticas condicionais com segurança, usando Report-only antes de bloquear.

> ⚠️ **Licença:** CA exige licença apropriada para os usuários beneficiados. Com uma única P2, limite o teste premium a `LAB-P2` ou use trial/licença adicional.

### Passo 1: Criar grupo

`GRP-LAB-CA`.

### Passo 2: Criar política

**Protection → Conditional Access → Policies → New policy**.

Nome: `CA-LAB-MFA`.

Defina usuário/grupo, recurso, condição e Grant = MFA. Comece em **Report-only**.

**Por quê:** Report-only permite validar o impacto antes do enforcement.

### Passo 3: What If

Use **What If** para verificar se a política seria aplicada.

### Passo 4: Ativar

Somente após validar, mude para **On**.

### ✅ Teste positivo

Login → política aplica → MFA → acesso.

### ❌ Teste negativo

Crie uma política controlada de Block para o usuário de teste.

### 🔍 Investigação

Sign-in logs → Authentication Details → Conditional Access.

### 🧾 Evidência

Política em Report-only, resultado do What If e sign-in logs.

### 🧹 Cleanup

Desative ou remova a política de teste ao final.

### 🛑 Segurança

Nunca teste bloqueios sem excluir as contas de emergência das políticas restritivas.

[⬅️ Anterior](#modulo-08---sspr-e-password-writeback) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-10---identity-protection)

---

<a id="modulo-10---identity-protection"></a>
## Módulo 10 - Identity Protection

**🎯 Objetivo:** usar o P2 de forma estratégica para risco de identidade.

### Passo 1: Identidade licenciada

Use `LAB-P2` como identidade licenciada.

### Passo 2: Examinar risco

**Protection → Identity Protection** → examine Risky users e Risk detections.

**Por quê:** Identity Protection correlaciona sinais de risco para identificar comprometimento potencial.

### Passo 3: Criar política de risco

Crie uma política de risco de usuário/sessão conforme os recursos disponíveis e em escopo somente do laboratório.

### ✅ Teste positivo

Valide o comportamento esperado de uma identidade considerada de risco.

### ❌ Teste negativo

Usuário fora do escopo não deve ser afetado pela política.

### 🔍 Investigação

Risk detections + Sign-in logs + Conditional Access.

### 🧾 Evidência

Registre sinal, decisão e remediação. Não tente fabricar eventos de risco em produção.

### 🧹 Cleanup

Remova ou desative a política de risco criada para o teste.

[⬅️ Anterior](#modulo-09---conditional-access) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-11---device-identity-e-authentication-strength)

---

<a id="modulo-11---device-identity-e-authentication-strength"></a>
## Módulo 11 - Device Identity e Authentication Strength

**🎯 Objetivo:** relacionar identidade do usuário, dispositivo e força da autenticação.

### Passo 1: Registrar dispositivo

No Windows cliente, ingresse/registre o dispositivo conforme o cenário: Entra joined ou hybrid joined.

### Passo 2: Localizar o device

**Entra → Devices → All devices** e localize `LAB-WIN11`.

**Por quê:** o dispositivo é um sinal adicional para decisões de acesso.

### Passo 3: Authentication strength

Em **Authentication strengths**, crie/avalie uma strength que exija método resistente a phishing, quando disponível no tenant.

### ✅ Teste positivo

Método aceito satisfaz a strength.

### ❌ Teste negativo

Método fraco não satisfaz a strength.

### 🔍 Investigação

Device object + Sign-in logs + Authentication Details + CA.

### 🧾 Evidência

Device object, strength criada e resultado dos dois testes.

### 🧹 Cleanup

Desregistre o dispositivo de teste, se necessário.

[⬅️ Anterior](#modulo-10---identity-protection) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-12---logs-e-troubleshooting)

---

<a id="modulo-12---logs-e-troubleshooting"></a>
## Módulo 12 - Logs e troubleshooting

**🎯 Objetivo:** diagnosticar IAM pela evidência, não por tentativa aleatória.

### Passo 1: Sign-in logs

**Entra → Monitoring & health → Sign-in logs**.

Filtre por `LAB-P2`.

### Passo 2: Analisar evento

Abra um evento e identifique:

`usuário → aplicação → dispositivo → localização → autenticação → CA → resultado`.

### Passo 3: Audit logs

Abra **Audit logs** e identifique quem alterou o objeto/configuração.

### Passo 4: Provisioning logs

Para provisioning, use **Provisioning logs**.

### ❌ Teste negativo

Provoque uma falha controlada de autenticação e investigue até encontrar a causa.

### 🔍 Checklist de troubleshooting

1. Qual identidade?
2. Qual recurso?
3. Qual política?
4. Qual método?
5. Qual condição?
6. Qual role/scope?
7. Qual log comprova?
8. Qual correção?
9. Qual evidência?

### 🧾 Evidência

Captura do evento analisado e da causa raiz encontrada.

### 🧹 Cleanup

Reverta a falha provocada no teste negativo.

[⬅️ Anterior](#modulo-11---device-identity-e-authentication-strength) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-13---sso-oauth2-e-oidc)

---

<a id="modulo-13---sso-oauth2-e-oidc"></a>
## Módulo 13 - SSO, OAuth2 e OIDC

**🎯 Objetivo:** entender autenticação moderna e tokens.

### Passo 1: Aplicação de teste

Use uma aplicação de teste/OIDC compatível com Entra.

### Passo 2: Identificar endpoints

Identifique `issuer`, `authorization endpoint`, `token endpoint`, `client_id`, `redirect_uri`, scopes e claims.

### Passo 3: Authorization Code + PKCE

Execute Authorization Code + PKCE.

**Por quê:** PKCE reduz o risco de interceptação do authorization code em clientes públicos.

### Passo 4: Inspecionar tokens

Inspecione o ID token e access token apenas em ambiente de laboratório. Não publique tokens.

### ✅ Teste positivo

Fluxo de login termina no redirect correto e a aplicação recebe as claims esperadas.

### ❌ Teste negativo

Altere redirect URI ou scope para observar a rejeição.

### 💡 Conceito-chave

`OAuth2 = autorização delegada`; `OIDC = identidade sobre OAuth2`; `JWT = formato comum de token, não protocolo de autenticação`.

### 🧾 Evidência

Fluxo concluído, claims recebidas e rejeição do teste negativo.

### 🧹 Cleanup

Remova a aplicação/registro de teste.

[⬅️ Anterior](#modulo-12---logs-e-troubleshooting) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-14---saml-20)

---

<a id="modulo-14---saml-20"></a>
## Módulo 14 - SAML 2.0

**🎯 Objetivo:** configurar e diagnosticar SSO corporativo legado/moderno baseado em SAML.

### Passo 1: Criar aplicação

**Entra → Enterprise applications → New application** → use uma aplicação de teste, como SAML Toolkit, quando disponível.

### Passo 2: Configurar SAML

Configure Identifier, Reply URL, claims e certificado.

**Por quê:** SAML troca assertions assinadas entre IdP e aplicação.

### ✅ Teste positivo

SSO funciona e a aplicação recebe NameID/claims esperadas.

### ❌ Teste negativo

Altere Reply URL ou claim de forma controlada.

### 🔍 Investigação

SAML-tracer/browser devtools + Sign-in logs + configuração da Enterprise Application.

### 🎤 Pergunta de entrevista

Explique a diferença entre SAML assertion, OAuth access token e OIDC ID token.

### 🧾 Evidência

Configuração da Enterprise Application, SSO funcionando e rejeição controlada.

### 🧹 Cleanup

Remova a aplicação de teste.

[⬅️ Anterior](#modulo-13---sso-oauth2-e-oidc) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-15---app-registrations-e-service-principals)

---

<a id="modulo-15---app-registrations-e-service-principals"></a>
## Módulo 15 - App Registrations e Service Principals

**🎯 Objetivo:** separar aplicação registrada de sua identidade no tenant.

### Passo 1: Registrar aplicação

**Entra → App registrations → New registration** → `APP-IAM-LAB`.

### Passo 2: Observar identificadores

Observe Application ID, Directory ID e redirect URI.

### Passo 3: Localizar o service principal

Localize a Enterprise Application correspondente: o **service principal**.

**Por quê:** App Registration descreve a aplicação; Service Principal é a representação dela no tenant.

### Passo 4: API permissions

Adicione somente API permissions necessárias.

### ✅ Teste positivo

Aplicação autentica com a permissão prevista.

### ❌ Teste negativo

Remova uma permissão e observe a falha.

### 🧾 Evidência

App registration, service principal e resultado dos dois testes.

### 🧹 Cleanup

Remova o registro e o secret de teste.

### 🛑 Segurança

Prefira certificado/federação de workload quando possível. Nunca deixe client secret em GitHub.

[⬅️ Anterior](#modulo-14---saml-20) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-16---workload-identity-e-managed-identity)

---

<a id="modulo-16---workload-identity-e-managed-identity"></a>
## Módulo 16 - Workload Identity e Managed Identity

**🎯 Objetivo:** autenticar workloads sem depender de senha humana.

### Passo 1: Criar recurso

Crie um recurso Azure de laboratório que suporte Managed Identity.

### Passo 2: Ativar system-assigned

Ative **System-assigned managed identity**.

**Por quê:** o Azure gerencia a identidade e reduz a necessidade de secrets.

### Passo 3: Conceder role mínima

Conceda somente uma role mínima ao recurso necessário.

### ✅ Teste positivo

Workload acessa somente o recurso permitido.

### ❌ Teste negativo

Tente acessar outro recurso.

### 🧾 Evidência

Managed identity ativa, role concedida e resultado dos dois testes.

### 🧹 Cleanup

Remova o recurso de teste.

### Extensão

Configure **workload identity federation** com GitHub Actions em um projeto de teste, sem client secret.

[⬅️ Anterior](#modulo-15---app-registrations-e-service-principals) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-17---scim-e-provisioning)

---

<a id="modulo-17---scim-e-provisioning"></a>
## Módulo 17 - SCIM e provisioning

**🎯 Objetivo:** automatizar criação, atualização e desativação de identidades em aplicações.

### Passo 1: Escolher aplicação

Escolha uma aplicação SCIM de laboratório ou uma aplicação compatível com endpoint de teste.

### Passo 2: Configurar provisioning

**Enterprise applications → Provisioning → Automatic**.

Configure endpoint e credencial/token conforme a aplicação.

### Passo 3: Mapear atributos

Mapeie atributos como `userName`, `displayName`, `active`, department.

**Por quê:** SCIM padroniza provisioning/desprovisioning entre IdP e aplicação.

### Passo 4: Sync sob demanda

Execute sync sob demanda.

### ✅ Testes

1. Criar usuário.
2. Atualizar atributo.
3. Desabilitar usuário.
4. Remover escopo.

**Resultado esperado:** a aplicação acompanha o ciclo de vida.

### 🔍 Investigação

Provisioning logs e attribute mappings.

### 🧾 Evidência

Provisioning logs e resultado dos quatro testes.

### 🧹 Cleanup

Desative o provisioning e remova a aplicação de teste.

[⬅️ Anterior](#modulo-16---workload-identity-e-managed-identity) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-18---microsoft-graph)

---

<a id="modulo-18---microsoft-graph"></a>
## Módulo 18 - Microsoft Graph

**🎯 Objetivo:** operar IAM por API e compreender delegated vs application permissions.

### Passo 1: Instalar módulo

Instale Microsoft Graph PowerShell em uma máquina de laboratório.

### Passo 2: Autenticar

Autentique com escopo mínimo necessário.

### Passo 3: Listar usuários e grupos
```powershell
Get-MgUser -All
Get-MgGroup -All
```

### Passo 4: Repetir via REST

Repita uma consulta via REST/Graph Explorer com permissão mínima.

**Por quê:** IAM moderno exige capacidade de integrar e automatizar APIs.

### ❌ Teste negativo

Tente uma operação sem a permissão necessária.

### 🧾 Evidência

Saída dos comandos e erro do teste negativo.

### 🧹 Cleanup

Revogue as permissões concedidas para o teste.

### 🛑 Segurança

Diferencie claramente **delegated permissions** de **application permissions**. Application permissions podem agir sem usuário e exigem cuidado maior.

[⬅️ Anterior](#modulo-17---scim-e-provisioning) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-19---powershell-e-automacao)

---

<a id="modulo-19---powershell-e-automacao"></a>
## Módulo 19 - PowerShell e automação

**🎯 Objetivo:** transformar tarefas IAM repetitivas em automação auditável.

### Passo 1: Criar script

Crie `New-LabUser.ps1` que receba nome, department e grupo.

### Passo 2: Validar entradas

Faça o script validar entradas antes de alterar o tenant.

### Passo 3: Registrar log

Registre `timestamp`, operação, objeto e resultado em log.

### Passo 4: Modo WhatIf

Adicione modo `-WhatIf` quando suportado.

### ✅ Teste positivo

Cria usuário e registra sucesso.

### ❌ Teste negativo

Entrada inválida não deve modificar o tenant.

### 🧾 Evidência

Script, log gerado e resultado do teste negativo.

### 🧹 Cleanup

Remova usuários criados pelo script de teste.

### Evolução

PowerShell → Graph SDK → REST → Python → CI/CD.

[⬅️ Anterior](#modulo-18---microsoft-graph) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-20---jml-e-birthright-access)

---

<a id="modulo-20---jml-e-birthright-access"></a>
## Módulo 20 - JML e birthright access

**🎯 Objetivo:** modelar Joiner, Mover, Leaver com regras de acesso.

### Passo 1: Joiner

Crie `LAB-ANA` com Department=Finance.

Defina acessos básicos: grupo Finance + aplicação financeira.

### Passo 2: Mover

Altere Department para IT.

Revogue Finance e conceda IT.

### Passo 3: Leaver

Desabilite a conta, revogue sessões e remova acessos.

**Por quê:** JML é uma das bases de IAM operacional e IGA.

### ❌ Teste negativo

Usuário desligado tenta autenticar ou manter entitlement.

### 🧾 Evidência

Ticket → aprovação → alteração → log → revogação.

### 🧹 Cleanup

Desative ou remova `LAB-ANA` ao final.

[⬅️ Anterior](#modulo-19---powershell-e-automacao) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-21---iga-role-engineering-abac-e-sod)

---

<a id="modulo-21---iga-role-engineering-abac-e-sod"></a>
## Módulo 21 - IGA, Role Engineering, ABAC e SoD

**🎯 Objetivo:** sair de grupos simples e pensar como IGA Engineer.

### Passo 1: Inventário

Liste: personas, sistemas, entitlements e owners.

### Passo 2: Role Engineering

Crie uma role `Finance-Analyst` com acessos mínimos.

### Passo 3: ABAC

Defina uma regra conceitual usando atributos: Department + Job title + Location.

### Passo 4: SoD

Crie conflito: `Requester` não pode ser simultaneamente `Approver` para o mesmo acesso.

**Por quê:** SoD reduz fraude, abuso e conflito de responsabilidades.

### ✅ Teste positivo

Acesso permitido quando a combinação é válida.

### ❌ Teste negativo

Solicitação conflitante deve ser bloqueada ou encaminhada para exceção controlada.

### 🧾 Evidência

Matriz de roles, atributos, entitlements e conflitos.

### 🧹 Cleanup

Desfaça roles e atribuições de teste.

[⬅️ Anterior](#modulo-20---jml-e-birthright-access) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-22---entitlement-management)

---

<a id="modulo-22---entitlement-management"></a>
## Módulo 22 - Entitlement Management

**🎯 Objetivo:** controlar pacotes de acesso, aprovação, expiração e catálogo.

> ⚠️ **Licenciamento:** Entitlement Management depende do plano/capacidade disponível. Com uma única P2, execute somente cenários realmente cobertos pelo tenant/licença ou use trial.

### Passo 1: Criar catálogo

**Identity Governance → Entitlement management → Catalogs** → crie `CAT-IAM-LAB`.

### Passo 2: Adicionar recurso

Adicione grupo/aplicação como resource.

### Passo 3: Criar access package

Crie um access package com política de aprovação e expiração.

### ✅ Teste positivo

Usuário elegível solicita e recebe acesso conforme fluxo.

### ❌ Teste negativo

Usuário fora do escopo não consegue obter o pacote.

### 🧾 Evidência

Request → approval → assignment → expiration.

### 🧹 Cleanup

Remova o access package e o catálogo de teste.

[⬅️ Anterior](#modulo-21---iga-role-engineering-abac-e-sod) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-23---access-reviews)

---

<a id="modulo-23---access-reviews"></a>
## Módulo 23 - Access Reviews

**🎯 Objetivo:** praticar recertificação de acesso e evidência de governança.

> ⚠️ Configure o cenário respeitando o licenciamento disponível. Use `LAB-P2` como identidade de revisão quando o cenário suportado exigir P2.

### Passo 1: Criar access review

**Identity Governance → Access Reviews → New access review**.

Escolha grupo/aplicação de laboratório.

### Passo 2: Definir reviewer

Defina reviewer, duração e recorrência quando suportado.

### Passo 3: Criar casos

Crie um caso em que o acesso deve ser mantido e outro em que deve ser removido.

### ✅ Teste positivo

Reviewer aprova acesso válido.

### ❌ Teste negativo

Reviewer nega acesso desnecessário e confirme a consequência.

### 🧾 Evidência

Decisão + assignment + resultado da revogação.

### 🧹 Cleanup

Remova a access review de teste.

[⬅️ Anterior](#modulo-22---entitlement-management) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-24---pim)

---

<a id="modulo-24---pim"></a>
## Módulo 24 - PIM

**🎯 Objetivo:** operar privilégio administrativo de forma just-in-time.

> 🔐 **P2:** use `LAB-P2` para o cenário licenciado. Não transforme o usuário em Global Administrator permanente sem necessidade.

### Passo 1: Abrir PIM

**Identity Governance → Privileged Identity Management → Microsoft Entra roles**.

### Passo 2: Atribuir role elegível

Atribua uma role elegível de menor privilégio possível.

### Passo 3: Ativar role

Ative a role pelo período mínimo necessário, exigindo justificativa/MFA quando configurável.

**Por quê:** JIT reduz a janela de exposição do privilégio.

### Passo 4: Audit history

Verifique audit history.

### ✅ Teste positivo

Role ativa → operação autorizada → expiração.

### ❌ Teste negativo

Após expirar, a mesma operação privilegiada deve falhar.

### 🧾 Evidência

Ativação, justificativa, audit history e falha pós-expiração.

### 🧹 Cleanup

Desative a elegibilidade de teste.

### Extensão

Estude PIM para Azure resources, grupos, approval, notifications e emergency access.

[⬅️ Anterior](#modulo-23---access-reviews) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-25---b2b-e-external-id)

---

<a id="modulo-25---b2b-e-external-id"></a>
## Módulo 25 - B2B e External ID

**🎯 Objetivo:** controlar identidades externas e colaboração entre organizações.

### Passo 1: Criar convidado

Crie um usuário convidado de teste usando um endereço de laboratório.

### Passo 2: Observar origem

Observe User type, issuer e origem da identidade.

### Passo 3: Restrições

Configure restrições de colaboração/cross-tenant conforme o tenant permitir.

**Por quê:** B2B permite colaboração sem transformar o diretório externo em identidade interna plena.

### ✅ Teste positivo

Convidado acessa somente o recurso compartilhado.

### ❌ Teste negativo

Convidado tenta acessar recurso não compartilhado.

### 🧾 Evidência

Usuário convidado, acesso compartilhado e tentativa negada.

### 🧹 Cleanup

Remova o convidado e valide a revogação.

[⬅️ Anterior](#modulo-24---pim) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-26---hybrid-identity)

---

<a id="modulo-26---hybrid-identity"></a>
## Módulo 26 - Hybrid Identity

**🎯 Objetivo:** conectar identidade on-premises ao Entra e entender sincronização.

### Passo 1: Preparar on-premises

No `LAB-DC01`, prepare AD DS, DNS e usuários.

### Passo 2: Instalar Cloud Sync

Instale o agente do **Microsoft Entra Cloud Sync** em Windows Server. Para laboratório, pode ser no DC se recursos forem limitados; em produção, prefira servidor separado.

### Passo 3: Configurar escopo

Configure escopo de sincronização e UPN compatível com domínio verificado do tenant.

**Atenção:** `lab.local` é domínio interno; não trate como domínio verificado do Entra.

### Passo 4: Sincronizar

Sincronize usuário de teste.

### ✅ Teste positivo

Objeto on-premises aparece como sincronizado no Entra.

### ❌ Teste negativo

Retire o objeto do escopo e confirme a alteração após sincronização.

### 🔍 Compare

Cloud Sync × Entra Connect Sync: arquitetura, agentes, escopo, regras e casos de uso.

### 🧾 Evidência

Objeto sincronizado e resultado do teste negativo.

### 🧹 Cleanup

Remova o objeto do escopo e desative o sync de teste, se necessário.

[⬅️ Anterior](#modulo-25---b2b-e-external-id) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-27---pam-com-teleport-ce)

---

<a id="modulo-27---pam-com-teleport-ce"></a>
## Módulo 27 - PAM com Teleport CE

**🎯 Objetivo:** aprender PAM na prática sem depender de plataforma comercial.

### Passo 1: Subir Teleport

Use `LAB-TELEPORT` e `LAB-LINUX01`. Instale **Teleport Community Edition** conforme a documentação oficial da versão usada.

### Passo 2: Registrar recurso

Adicione o servidor Linux ao cluster Teleport.

### Passo 3: RBAC

Crie/ajuste uma role que permita somente o acesso necessário.

### Passo 4: Acesso privilegiado

Use o fluxo de acesso da Community Edition, incluindo role Access Request via CLI quando aplicável.

**Importante:** recursos avançados de Access Requests/approval via Web UI e SSO corporativo dependem da edição/capacidade disponível. Não trate CE como substituto integral de CyberArk/Delinea/BeyondTrust.

### Passo 5: Sessão

Conecte via `tsh`, execute comandos controlados e depois consulte auditoria/session recording.

### ✅ Teste positivo

Usuário autorizado acessa o host.

### ❌ Teste negativo

Role sem permissão não consegue executar a ação privilegiada.

### 💡 Conceito-chave

`request → approval → short-lived access → session → recording → audit`.

### 🧾 Evidência

Sessão registrada, recording e resultado do teste negativo.

### 🧹 Cleanup

Pare o Teleport e desligue as VMs ao final.

### 🔍 Comparar no mercado

CyberArk, Delinea, BeyondTrust e senhasegura.

[⬅️ Anterior](#modulo-26---hybrid-identity) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-28---cloud-iam---azure-e-aws)

---

<a id="modulo-28---cloud-iam---azure-e-aws"></a>
## Módulo 28 - Cloud IAM: Azure e AWS

**🎯 Objetivo:** transferir conceitos de IAM entre clouds.

### Passo 1: Azure

Repita RBAC com role mínima e scope mínimo.

### Passo 2: AWS

Crie um usuário/role de laboratório ou use IAM Identity Center conforme recursos disponíveis.

### Passo 3: Comparar

| Conceito | Azure | AWS |
|---|---|---|
| Diretório | Entra ID | IAM/Identity Center |
| Autorização | Azure RBAC | IAM policies/roles |
| Workload | Managed Identity | IAM Role |
| Auditoria | Activity/Sign-in logs | CloudTrail |

### ❌ Teste negativo

Conceda uma permissão propositalmente insuficiente e investigue a falha.

### 💡 Conceito-chave

Princípios de IAM são portáveis; a implementação muda por cloud.

### 🧾 Evidência

Role/usuário criado nas duas clouds e teste negativo documentado.

### 🧹 Cleanup

Remova os recursos de teste nas duas clouds.

[⬅️ Anterior](#modulo-27---pam-com-teleport-ce) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-29---itsm-auditoria-e-evidencias)

---

<a id="modulo-29---itsm-auditoria-e-evidencias"></a>
## Módulo 29 - ITSM, auditoria e evidências

**🎯 Objetivo:** transformar operação IAM em processo auditável.

### Passo 1: Criar ticket

Crie um ticket fictício de `Joiner`.

Campos mínimos: solicitante, aprovador, identidade, sistema, entitlement, justificativa, prazo.

### Passo 2: Executar alteração

Execute a alteração no laboratório.

### Passo 3: Anexar evidências

Anexe evidências: antes/depois, log, aprovação e resultado.

### Passo 4: Repetir fluxos

Repita para `Mover` e `Leaver`.

### ❌ Teste negativo

Tente executar uma solicitação sem aprovação.

### 📊 Métricas

- Tempo médio de provisionamento.
- Tempo de revogação.
- Acessos órfãos.
- Taxa de revisão concluída.
- Solicitações com SoD.
- Falhas de provisioning.
- Privilégios permanentes.

### 🧾 Evidência

Tickets, aprovações e evidências anexadas.

### 🧹 Cleanup

Encerre os tickets fictícios.

[⬅️ Anterior](#modulo-28---cloud-iam---azure-e-aws) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-30---zero-trust-e-metricas)

---

<a id="modulo-30---zero-trust-e-metricas"></a>
## Módulo 30 - Zero Trust e métricas

**🎯 Objetivo:** conectar IAM com Zero Trust, risco e melhoria contínua.

### Passo 1: Desenhar decisão de acesso
```text
Identity + Device + Signal + Resource + Risk → Policy → Decision → Session → Audit
```

### Passo 2: Revisar controles

Revise políticas CA, PIM, MFA, device e least privilege.

### Passo 3: Dashboard manual

Crie um dashboard manual com métricas do laboratório.

### ❌ Teste negativo

Identifique uma combinação que deve ser bloqueada: identidade arriscada + recurso sensível + autenticação fraca.

### 🧾 Evidência

Diagrama da decisão de acesso e dashboard com métricas.

### 🧹 Cleanup

Revise e desative políticas de teste que não forem mais necessárias.

### Resultado

Você consegue explicar IAM como controle contínuo, não apenas criação de usuário.

[⬅️ Anterior](#modulo-29---itsm-auditoria-e-evidencias) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-31---projeto-final-e-entrevista)

---

<a id="modulo-31---projeto-final-e-entrevista"></a>
## Módulo 31 - Projeto final e entrevista

**🎯 Objetivo:** demonstrar capacidade de projetar e operar uma solução IAM de ponta a ponta.

### Cenário

Uma empresa possui 200 usuários, Finance, IT e RH, aplicações SaaS, AD on-premises, Entra ID, administradores Azure e servidores Linux.

### 📦 Entregáveis

- [ ] Arquitetura Entra + AD.
- [ ] JML.
- [ ] RBAC/role engineering.
- [ ] MFA + Authentication Strength.
- [ ] Conditional Access.
- [ ] PIM.
- [ ] Access Reviews.
- [ ] Entitlement Management.
- [ ] SCIM/provisioning.
- [ ] SSO SAML/OIDC.
- [ ] PAM.
- [ ] Logs e auditoria.
- [ ] SoD.
- [ ] Automação Graph/PowerShell.
- [ ] Plano de emergência/break-glass.
- [ ] Métricas.

### 🎤 Simulação de entrevista

Responda sem consultar o material:

1. Diferença entre authentication e authorization.
2. Entra role × Azure RBAC.
3. Group × Administrative Unit.
4. App Registration × Service Principal.
5. SAML × OIDC × OAuth2.
6. SCIM e provisioning.
7. PIM e PAM.
8. JML e birthright access.
9. SoD e Access Reviews.
10. Managed Identity e workload federation.
11. Como investigar um login bloqueado.
12. Como evitar lockout com Conditional Access.
13. Como projetar break-glass.
14. Como reduzir privilégio permanente.
15. Como evidenciar auditoria IAM.

### 🏆 Critério de conclusão

Você concluiu o roadmap quando consegue **desenhar, implementar, quebrar, investigar, corrigir, revogar e explicar** a solução sem depender do roteiro.

[⬅️ Anterior](#modulo-30---zero-trust-e-metricas) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#referencia-rapida)

---

<a id="referencia-rapida"></a>
## 📚 Referência rápida

<a id="mapa-de-evolucao-profissional"></a>
### Mapa de evolução profissional

| Nível | Domínio esperado |
|---|---|
| **1 - Foundation** | AD, Entra, DNS, grupos, MFA, conceitos IAM |
| **2 - IAM Operations** | JML, provisioning, deprovisioning, ITSM, troubleshooting |
| **3 - Access Management** | CA, SSO, SAML, OIDC, OAuth2, SCIM, Graph |
| **4 - IGA/PAM/Automation** | SoD, roles, reviews, entitlement, PIM, PAM, PowerShell/Python |
| **5 - Engineering/Architecture** | híbrido, cloud, Zero Trust, automação, governança, arquitetura e liderança |

### Tecnologias para estudar

**Microsoft:** Entra ID, AD DS, Cloud Sync, Entra Connect, PIM, Identity Protection, Graph.
**IGA:** SailPoint, Saviynt, Entra ID Governance.
**Access Management:** Okta, Keycloak, SAML, OIDC, OAuth2, SCIM.
**PAM:** CyberArk, Delinea, BeyondTrust, senhasegura, Teleport.
**Automação:** PowerShell, Python, REST, JSON, SQL, Git.
**ITSM:** ServiceNow, Jira.
**Cloud:** Azure, AWS, GCP, OCI.

### 🔗 Fluxos para memorizar
```text
JML
Joiner → Birthright Access → Mover → Recalculate Access → Leaver → Revoke
```
```text
Access Management
Identity → Authentication → Conditional Access → Authorization → Session → Audit
```
```text
IGA
Request → Approval → SoD Check → Provision → Review → Revoke
```
```text
PAM
Request → Approval → JIT → Privileged Session → Recording → Audit
```

### 📖 Glossário essencial

| Termo | Definição curta |
|---|---|
| Identidade | Sujeito (usuário, workload, dispositivo) sobre o qual decisões de acesso são tomadas |
| Autenticação | Prova de quem você é (algo que você sabe, tem ou é) |
| Autorização | O que você pode fazer após autenticar |
| Auditoria | Registro verificável de quem fez o quê, quando e como |
| RBAC | Autorização por role atribuída a um principal em um escopo |
| ABAC | Autorização por regras sobre atributos (Department, Location, Job title) |
| SoD | Separação de funções: impede combinações conflitantes de acesso |
| JML | Ciclo de vida: Joiner, Mover, Leaver |
| JIT | Acesso just-in-time: privilégio ativado só quando necessário |
| PIM | Gestão de privilégio no Entra ID (roles elegíveis, ativação, aprovação) |
| PAM | Gestão de acesso privilegiado a infraestrutura/servidores |
| IGA | Governança de identidade: roles, reviews, entitlement, SoD |
| SCIM | Padrão de provisioning/deprovisioning entre IdP e aplicações |
| SSO | Um login para acessar múltiplos sistemas |
| OAuth2 | Protocolo de autorização delegada |
| OIDC | Camada de identidade sobre OAuth2 |
| SAML | Protocolo de SSO baseado em assertions XML assinadas |
| MFA | Autenticação com mais de um fator |
| Conditional Access | Políticas que decidem o acesso por sinais (usuário, device, risco, local) |
| Least privilege | Conceder somente o acesso mínimo necessário |
| Break-glass | Conta de emergência para acesso crítico quando o normal falha |
| Entitlement | Direito de acesso a um recurso |
| Service Principal | Representação de uma aplicação no tenant |
| Managed Identity | Identidade de workload gerenciada pelo Azure |

### 🧭 Atalhos

- [⬆️ Voltar ao mapa](#mapa-rapido)
- [🏁 Projeto final](#modulo-31---projeto-final-e-entrevista)
- [📚 Evolução profissional](#mapa-de-evolucao-profissional)

---

## ✅ Checklist final do documento

- [ ] Navegação do mapa testada.
- [ ] Links Anterior/Índice/Próximo testados.
- [ ] Cada módulo possui objetivo e passos.
- [ ] Cada módulo possui teste positivo/negativo.
- [ ] Evidências e troubleshooting estão definidos.
- [ ] Licenciamento de 1 P2 está explícito.
- [ ] P2 está concentrada em `LAB-P2`.
- [ ] Break-glass está separado do uso cotidiano.
- [ ] IGA, PAM e automação estão incluídos.
- [ ] Projeto final conecta o conteúdo ao mercado.
