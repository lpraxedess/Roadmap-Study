# 🟦 IAM Study Lab — Microsoft Entra ID do básico ao avançado

> **Objetivo:** transformar experiência de infraestrutura/SOC em domínio prático de IAM, IGA, PAM e IAM Engineering.
>
> **Método de cada laboratório:** `preparar → configurar → validar → quebrar → investigar → corrigir → revogar → evidenciar → explicar`.
>
> ⚠️ **Licenciamento:** o laboratório foi desenhado para **1 única licença Microsoft Entra ID P2**, atribuída a `LAB-P2`. Recursos premium devem ser testados somente no escopo licenciado ou em trial/licença adicional. Configurar uma política não significa que todos os usuários estejam licenciados.
>
> 🔐 Nunca publique senha, secret, token, chave privada, cookie, código MFA ou dados reais.

---

## 🧭 Mapa rapido

> **Todos os links abaixo apontam para âncoras ASCII estáveis do GitHub.**

| # | Tema | Nível | Ir |
|---|---|---|---|
| 00 | Controle do laboratório | Base | [Abrir](#modulo-00---controle-do-laboratorio) |
| 01 | VirtualBox e topologia | Base | [Abrir](#modulo-01---virtualbox-e-topologia) |
| 02 | Fundamentos IAM | Base | [Abrir](#modulo-02---fundamentos-iam) |
| 03 | Active Directory | Base | [Abrir](#modulo-03---active-directory) |
| 04 | Entra Users, Groups e atributos | Base | [Abrir](#modulo-04---entra-users-groups-e-atributos) |
| 05 | Administrative Units e least privilege | Júnior | [Abrir](#modulo-05---administrative-units-e-least-privilege) |
| 06 | Azure RBAC | Júnior | [Abrir](#modulo-06---azure-rbac) |
| 07 | Authentication Methods e MFA | Júnior | [Abrir](#modulo-07---authentication-methods-e-mfa) |
| 08 | SSPR e Password Writeback | Júnior/Pleno | [Abrir](#modulo-08---sspr-e-password-writeback) |
| 09 | Conditional Access | Júnior/Pleno | [Abrir](#modulo-09---conditional-access) |
| 10 | Identity Protection | Pleno | [Abrir](#modulo-10---identity-protection) |
| 11 | Device Identity e Authentication Strength | Pleno | [Abrir](#modulo-11---device-identity-e-authentication-strength) |
| 12 | Logs e troubleshooting | Júnior/Pleno | [Abrir](#modulo-12---logs-e-troubleshooting) |
| 13 | SSO, OAuth2 e OIDC | Pleno | [Abrir](#modulo-13---sso-oauth2-e-oidc) |
| 14 | SAML 2.0 | Pleno | [Abrir](#modulo-14---saml-20) |
| 15 | App Registrations e Service Principals | Pleno | [Abrir](#modulo-15---app-registrations-e-service-principals) |
| 16 | Workload Identity e Managed Identity | Pleno | [Abrir](#modulo-16---workload-identity-e-managed-identity) |
| 17 | SCIM e provisioning | Pleno | [Abrir](#modulo-17---scim-e-provisioning) |
| 18 | Microsoft Graph | Pleno | [Abrir](#modulo-18---microsoft-graph) |
| 19 | PowerShell e automação | Pleno | [Abrir](#modulo-19---powershell-e-automacao) |
| 20 | JML e birthright access | Pleno | [Abrir](#modulo-20---jml-e-birthright-access) |
| 21 | IGA, Role Engineering, ABAC e SoD | Pleno | [Abrir](#modulo-21---iga-role-engineering-abac-e-sod) |
| 22 | Entitlement Management | Pleno | [Abrir](#modulo-22---entitlement-management) |
| 23 | Access Reviews | Pleno | [Abrir](#modulo-23---access-reviews) |
| 24 | PIM | Avançado | [Abrir](#modulo-24---pim) |
| 25 | B2B e External ID | Pleno | [Abrir](#modulo-25---b2b-e-external-id) |
| 26 | Hybrid Identity | Avançado | [Abrir](#modulo-26---hybrid-identity) |
| 27 | PAM com Teleport CE | Avançado | [Abrir](#modulo-27---pam-com-teleport-ce) |
| 28 | Cloud IAM — Azure e AWS | Avançado | [Abrir](#modulo-28---cloud-iam---azure-e-aws) |
| 29 | ITSM, auditoria e evidências | Pleno | [Abrir](#modulo-29---itsm-auditoria-e-evidencias) |
| 30 | Zero Trust e métricas | Avançado | [Abrir](#modulo-30---zero-trust-e-metricas) |
| 31 | Projeto final e entrevista | Sênior | [Abrir](#modulo-31---projeto-final-e-entrevista) |
| 📚 | Referência rápida | — | [Abrir](#referencia-rapida) |

### 🚦 Navegação

**Comece em 00 e avance em ordem.** Os links `Anterior / Índice / Próximo` aparecem no fim de cada módulo.

---

## 🧪 Como executar os módulos

Cada módulo precisa produzir uma evidência. Não marque como concluído apenas porque a interface exibiu `Success`.

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

---

# Modulo 00 - Controle do laboratorio

**🎯 Objetivo:** preparar contas, licenças, evidências e regras de segurança.

### PASSO 1 — Criar as identidades

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

### PASSO 2 — Atribuir a única P2

Em **Billing/Your products → Licenses → Microsoft Entra ID P2**, atribua a licença somente a `LAB-P2`.

**Conhecimento adquirido:** licenciamento por usuário beneficiado; uma licença não torna o tenant inteiro licenciado.

### PASSO 3 — Registrar evidência

Crie uma pasta local `evidencias/` com subpastas `00` a `31`. Nunca coloque segredos.

### PASSO 4 — Break-glass

Mantenha as duas contas de emergência fora de políticas de bloqueio/restrição durante o laboratório. Não use essas contas para tarefas normais.

### TESTE POSITIVO

`LAB-ADMIN` consegue administrar o tenant e `LAB-P2` consegue ser usado nos exercícios P2.

### TESTE NEGATIVO

Tente executar um exercício P2 com `LAB-USER01` e registre a limitação/licenciamento encontrada.

### 🧾 Evidência

- captura da licença em `LAB-P2`;
- lista de contas;
- matriz de escopo/licenciamento.

### 🧹 Cleanup

Não apagar as contas de emergência. Desfaça somente objetos criados especificamente para o exercício.

- [⬅️ Anterior](#mapa-rapido) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-01---virtualbox-e-topologia)

---

# Modulo 01 - VirtualBox e topologia

**🎯 Objetivo:** construir uma infraestrutura pequena, previsível e econômica.

### PASSO 1 — Criar rede

**VirtualBox → Tools → Network Manager → Host-only Networks → Create**.

Use `192.168.56.0/24` e **desative o DHCP do VirtualBox**.

**Por quê:** o laboratório terá DNS/DHCP controlados pelo Windows Server. Dois DHCPs podem entregar configurações diferentes.

### PASSO 2 — Criar VMs

| VM | Função | RAM |
|---|---|---:|
| `LAB-DC01` | AD DS + DNS + DHCP | 4 GB |
| `LAB-WIN11` | cliente | 4 GB |
| `LAB-LINUX01` | alvo PAM | 2 GB |
| `LAB-TELEPORT` | PAM | 2 GB |

Ligue somente as VMs necessárias para cada módulo.

### PASSO 3 — Configurar o DC

`LAB-DC01`: `192.168.56.10/24`, gateway vazio, DNS `192.168.56.10`.

### TESTE POSITIVO

Cliente recebe IP do DHCP do DC e resolve o DNS interno.

### TESTE NEGATIVO

Desligue o DC e renove o IP do cliente. O VirtualBox não deve assumir o DHCP.

### 🧾 Evidência

`ipconfig /all`, `nslookup`, topologia e configuração da rede.

### 🧹 Cleanup

Mantenha a VM desligada quando não estiver estudando.

- [⬅️ Anterior](#modulo-00---controle-do-laboratorio) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-02---fundamentos-iam)

---

# Modulo 02 - Fundamentos IAM

**🎯 Objetivo:** dominar a cadeia identidade → autenticação → autorização → recurso → auditoria.

### PASSO 1 — Criar usuário

**Entra → Identity → Users → All users → New user** → `LAB-USER01`.

**Você aprendeu:** uma identidade é o sujeito para o qual decisões de acesso serão tomadas.

### PASSO 2 — Criar grupo

**Groups → New group** → `GRP-FINANCE` → adicione `LAB-USER01`.

**Você aprendeu:** autorização por grupo reduz permissões individuais e prepara RBAC/IGA.

### PASSO 3 — Criar cenário de acesso

Associe o grupo a um recurso de teste. Depois remova o usuário do grupo.

### TESTE POSITIVO

Usuário dentro do grupo recebe o acesso esperado.

### TESTE NEGATIVO

Usuário removido do grupo perde o acesso.

### Pergunta de entrevista

**MFA concede acesso?** Não. MFA fortalece autenticação; autorização é outra decisão.

- [⬅️ Anterior](#modulo-01---virtualbox-e-topologia) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-03---active-directory)

---

# Modulo 03 - Active Directory

**🎯 Objetivo:** construir a base on-premises para compreender identidade híbrida.

### PASSO 1 — Instalar AD DS

`Server Manager → Add Roles and Features → Active Directory Domain Services → Install`.

Depois **Promote this server to a domain controller → Add a new forest**.

Use `lab.local`.

**Por quê:** AD DS fornece diretório, autenticação e estrutura de domínio.

### PASSO 2 — Validar DNS

Execute:

`nslookup lab.local`

`dcdiag /test:dns`

### PASSO 3 — Criar OUs

`Users`, `Groups`, `Servers`, `Workstations`, `Disabled`.

### PASSO 4 — Criar grupos

`GG-FINANCE`, `GG-IT`, `GG-IAM`.

### PASSO 5 — Criar GPO de auditoria

**Group Policy Management → Domain → Create a GPO** → `GPO-LAB-AUDIT`.

Evite usar a Default Domain Policy para toda configuração.

### PASSO 6 — Ingressar cliente

No Windows cliente, configure DNS para o DC e ingresse em `lab.local`.

### TESTE POSITIVO

Login de domínio funciona e `gpresult /r` mostra a GPO.

### TESTE NEGATIVO

Troque temporariamente o DNS do cliente para um endereço incorreto e tente localizar o domínio.

### Investigue

`ipconfig /all`, `nslookup`, `dcdiag`, `gpresult /r`, Event Viewer.

- [⬅️ Anterior](#modulo-02---fundamentos-iam) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-04---entra-users-groups-e-atributos)

---

# Modulo 04 - Entra Users Groups e atributos

**🎯 Objetivo:** modelar identidade para automação e governança.

### PASSO 1 — Criar população

Crie `LAB-P2`, `LAB-USER01` e `LAB-USER02`.

### PASSO 2 — Criar grupos

`GRP-FINANCE`, `GRP-IT`, `GRP-IAM-READERS`, `GRP-IAM-ADMINS`, `GRP-LAB-CA`.

### PASSO 3 — Preencher atributos

Em `LAB-USER01`, defina Department, Job title, Manager e Usage location.

**Por quê:** atributos podem alimentar grupos dinâmicos, JML, políticas e governança.

### PASSO 4 — Alterar Department

`Finance → IT`.

Registre quais acessos uma arquitetura orientada a atributos deveria conceder/revogar.

### TESTE POSITIVO

Usuário aparece no grupo/população esperada.

### TESTE NEGATIVO

Altere o atributo e confirme se um mecanismo dependente dele muda; se não houver automação ainda, documente que o atributo sozinho não concede acesso.

- [⬅️ Anterior](#modulo-03---active-directory) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-05---administrative-units-e-least-privilege)

---

# Modulo 05 - Administrative Units e least privilege

**🎯 Objetivo:** delegar administração sem entregar privilégio global.

### PASSO 1

**Entra → Identity → Administrative Units → Add** → `AU-FINANCE`.

### PASSO 2

Adicione usuários financeiros.

### PASSO 3

Atribua uma role administrativa compatível com escopo de Administrative Unit.

**Por quê:** o administrador deve receber somente a autoridade necessária e dentro do menor escopo.

### TESTE POSITIVO

Administrador delegado altera um usuário dentro da AU.

### TESTE NEGATIVO

Tenta alterar usuário fora da AU.

**Resultado esperado:** operação negada ou não disponível conforme a role escolhida.

### 🧾 Evidência

Role, principal, AU e resultado dos dois testes.

- [⬅️ Anterior](#modulo-04---entra-users-groups-e-atributos) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-06---azure-rbac)

---

# Modulo 06 - Azure RBAC

**🎯 Objetivo:** dominar autorização de recursos Azure por role + scope + principal.

### PASSO 1

**Azure Portal → Resource groups → Create** → `rg-iam-lab`.

### PASSO 2

**Access control (IAM) → Add role assignment**.

Escolha uma role mínima para o teste e aplique no Resource Group, não na assinatura.

**Por quê:** reduzir scope limita impacto de uma credencial comprometida.

### TESTE POSITIVO

Principal consegue executar a ação permitida.

### TESTE NEGATIVO

Tente uma ação fora da role.

### Investigue

**Access control (IAM) → Check access** e Activity Log.

- [⬅️ Anterior](#modulo-05---administrative-units-e-least-privilege) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-07---authentication-methods-e-mfa)

---

# Modulo 07 - Authentication Methods e MFA

**🎯 Objetivo:** entender métodos de autenticação e aplicar MFA corretamente.

### PASSO 1

**Entra → Protection → Authentication methods → Policies**.

Habilite um método para o grupo de laboratório.

**Por quê:** a política define quais autenticadores podem ser usados; isso não é autorização.

### PASSO 2

Registre Microsoft Authenticator com `LAB-P2`.

### PASSO 3

Teste login e MFA.

### TESTE NEGATIVO

Desabilite temporariamente o método permitido para o usuário de teste e repita o fluxo.

### Investigue

Sign-in logs e Authentication Methods Activity.

### Extensão

Estude Authentication Strength, passkeys/FIDO2, TAP e métodos resistentes a phishing.

- [⬅️ Anterior](#modulo-06---azure-rbac) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-08---sspr-e-password-writeback)

---

# Modulo 08 - SSPR e Password Writeback

**🎯 Objetivo:** executar recuperação de senha e entender o fluxo híbrido.

### PASSO 1 — SSPR

**Entra → Protection → Password reset → Properties**.

Use `LAB-P2` no cenário licenciado.

**Por quê:** SSPR reduz dependência de atendimento para recuperação de acesso.

### PASSO 2 — Registrar métodos

`LAB-P2` → **Security info** → registre o método exigido.

### PASSO 3 — Reset

Na tela de login, use **Forgot password**.

### TESTE POSITIVO

Nova senha funciona.

### TESTE NEGATIVO

Tente o fluxo sem registro/método suficiente.

### PASSO 4 — Writeback

Somente após o laboratório híbrido estar preparado: habilite writeback e teste `Entra → AD`.

**Por quê:** writeback altera a senha no diretório on-premises e exige pré-requisitos específicos.

### Evidência

Fluxo, horário, logs e resultado de sincronização.

- [⬅️ Anterior](#modulo-07---authentication-methods-e-mfa) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-09---conditional-access)

---

# Modulo 09 - Conditional Access

**🎯 Objetivo:** criar políticas condicionais com segurança, usando Report-only antes de bloquear.

> ⚠️ **Licença:** CA exige licença apropriada para os usuários beneficiados. Com uma única P2, limite o teste premium a `LAB-P2` ou use trial/licença adicional.

### PASSO 1 — Criar grupo

`GRP-LAB-CA`.

### PASSO 2 — Criar política

**Protection → Conditional Access → Policies → New policy**.

Nome: `CA-LAB-MFA`.

Defina usuário/grupo, recurso, condição e Grant = MFA. Comece em **Report-only**.

**Por quê:** Report-only permite validar impacto antes de enforcement.

### PASSO 3 — What If

Use **What If** para verificar se a política seria aplicada.

### PASSO 4 — Ativar

Somente após validar, mude para **On**.

### TESTE POSITIVO

Login → política aplica → MFA → acesso.

### TESTE NEGATIVO

Crie uma política controlada de Block para o usuário de teste.

### Investigue

Sign-in logs → Authentication Details → Conditional Access.

### 🛑 Segurança

Nunca teste bloqueios sem excluir as contas de emergência das políticas restritivas.

- [⬅️ Anterior](#modulo-08---sspr-e-password-writeback) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-10---identity-protection)

---

# Modulo 10 - Identity Protection

**🎯 Objetivo:** usar o P2 de forma estratégica para risco de identidade.

### PASSO 1

Use `LAB-P2` como identidade licenciada.

### PASSO 2

**Protection → Identity Protection** → examine Risky users e Risk detections.

**Por quê:** Identity Protection correlaciona sinais de risco para identificar comprometimento potencial.

### PASSO 3

Crie uma política de risco de usuário/sessão conforme os recursos disponíveis e em escopo somente do laboratório.

### TESTE POSITIVO

Valide o comportamento esperado de uma identidade considerada de risco.

### TESTE NEGATIVO

Usuário fora do escopo não deve ser afetado pela política.

### Investigue

Risk detections + Sign-in logs + Conditional Access.

### Evidência

Registre sinal, decisão e remediação. Não tente fabricar eventos de risco em produção.

- [⬅️ Anterior](#modulo-09---conditional-access) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-11---device-identity-e-authentication-strength)

---

# Modulo 11 - Device Identity e Authentication Strength

**🎯 Objetivo:** relacionar identidade do usuário, dispositivo e força da autenticação.

### PASSO 1

No Windows cliente, ingresse/registre o dispositivo conforme o cenário: Entra joined ou hybrid joined.

### PASSO 2

**Entra → Devices → All devices** e localize `LAB-WIN11`.

**Por quê:** dispositivo é um sinal adicional para decisões de acesso.

### PASSO 3

Em **Authentication strengths**, crie/avalie uma strength que exija método resistente a phishing, quando disponível no tenant.

### TESTE POSITIVO

Método aceito satisfaz a strength.

### TESTE NEGATIVO

Método fraco não satisfaz a strength.

### Investigue

Device object + Sign-in logs + Authentication Details + CA.

- [⬅️ Anterior](#modulo-10---identity-protection) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-12---logs-e-troubleshooting)

---

# Modulo 12 - Logs e troubleshooting

**🎯 Objetivo:** diagnosticar IAM pela evidência, não por tentativa aleatória.

### PASSO 1

**Entra → Monitoring & health → Sign-in logs**.

Filtre por `LAB-P2`.

### PASSO 2

Abra um evento e identifique:

`usuário → aplicação → dispositivo → localização → autenticação → CA → resultado`.

### PASSO 3

Abra **Audit logs** e identifique quem alterou o objeto/configuração.

### PASSO 4

Para provisioning, use **Provisioning logs**.

### TESTE NEGATIVO

Provoque uma falha controlada de autenticação e investigue até encontrar a causa.

### Checklist de troubleshooting

1. Qual identidade?
2. Qual recurso?
3. Qual política?
4. Qual método?
5. Qual condição?
6. Qual role/scope?
7. Qual log comprova?
8. Qual correção?
9. Qual evidência?

- [⬅️ Anterior](#modulo-11---device-identity-e-authentication-strength) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-13---sso-oauth2-e-oidc)

---

# Modulo 13 - SSO OAuth2 e OIDC

**🎯 Objetivo:** entender autenticação moderna e tokens.

### PASSO 1

Use uma aplicação de teste/OIDC compatível com Entra.

### PASSO 2

Identifique `issuer`, `authorization endpoint`, `token endpoint`, `client_id`, `redirect_uri`, scopes e claims.

### PASSO 3

Execute Authorization Code + PKCE.

**Por quê:** PKCE reduz risco de interceptação do authorization code em clientes públicos.

### PASSO 4

Inspecione o ID token e access token apenas em ambiente de laboratório. Não publique tokens.

### TESTE POSITIVO

Fluxo de login termina no redirect correto e a aplicação recebe as claims esperadas.

### TESTE NEGATIVO

Altere redirect URI ou scope para observar a rejeição.

### Aprenda

`OAuth2 = autorização delegada`; `OIDC = identidade sobre OAuth2`; `JWT = formato comum de token, não protocolo de autenticação.`

- [⬅️ Anterior](#modulo-12---logs-e-troubleshooting) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-14---saml-20)

---

# Modulo 14 - SAML 2.0

**🎯 Objetivo:** configurar e diagnosticar SSO corporativo legado/moderno baseado em SAML.

### PASSO 1

**Entra → Enterprise applications → New application** → use uma aplicação de teste, como SAML Toolkit, quando disponível.

### PASSO 2

Configure Identifier, Reply URL, claims e certificado.

**Por quê:** SAML troca assertions assinadas entre IdP e aplicação.

### TESTE POSITIVO

SSO funciona e a aplicação recebe NameID/claims esperadas.

### TESTE NEGATIVO

Altere Reply URL ou claim de forma controlada.

### Investigue

SAML-tracer/browser devtools + Sign-in logs + configuração da Enterprise Application.

### Entrevista

Explique diferença entre SAML assertion, OAuth access token e OIDC ID token.

- [⬅️ Anterior](#modulo-13---sso-oauth2-e-oidc) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-15---app-registrations-e-service-principals)

---

# Modulo 15 - App Registrations e Service Principals

**🎯 Objetivo:** separar aplicação registrada de sua identidade no tenant.

### PASSO 1

**Entra → App registrations → New registration** → `APP-IAM-LAB`.

### PASSO 2

Observe Application ID, Directory ID e redirect URI.

### PASSO 3

Localize a Enterprise Application correspondente: o **service principal**.

**Por quê:** App Registration descreve a aplicação; Service Principal é a representação dela no tenant.

### PASSO 4

Adicione somente API permissions necessárias.

### TESTE POSITIVO

Aplicação autentica com a permissão prevista.

### TESTE NEGATIVO

Remova uma permissão e observe a falha.

### Segurança

Prefira certificado/federação de workload quando possível. Nunca deixe client secret em GitHub.

- [⬅️ Anterior](#modulo-14---saml-20) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-16---workload-identity-e-managed-identity)

---

# Modulo 16 - Workload Identity e Managed Identity

**🎯 Objetivo:** autenticar workloads sem depender de senha humana.

### PASSO 1

Crie um recurso Azure de laboratório que suporte Managed Identity.

### PASSO 2

Ative **System-assigned managed identity**.

**Por quê:** Azure gerencia a identidade e reduz necessidade de secrets.

### PASSO 3

Conceda somente uma role mínima ao recurso necessário.

### TESTE POSITIVO

Workload acessa somente o recurso permitido.

### TESTE NEGATIVO

Tente acessar outro recurso.

### Extensão

Configure **workload identity federation** com GitHub Actions em um projeto de teste, sem client secret.

- [⬅️ Anterior](#modulo-15---app-registrations-e-service-principals) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-17---scim-e-provisioning)

---

# Modulo 17 - SCIM e provisioning

**🎯 Objetivo:** automatizar criação, atualização e desativação de identidades em aplicações.

### PASSO 1

Escolha uma aplicação SCIM de laboratório ou uma aplicação compatível com endpoint de teste.

### PASSO 2

**Enterprise applications → Provisioning → Automatic**.

Configure endpoint e credencial/token conforme a aplicação.

### PASSO 3

Mapeie atributos como `userName`, `displayName`, `active`, department.

**Por quê:** SCIM padroniza provisioning/desprovisioning entre IdP e aplicação.

### PASSO 4

Execute sync sob demanda.

### TESTES

1. Criar usuário.
2. Atualizar atributo.
3. Desabilitar usuário.
4. Remover escopo.

### Resultado esperado

Aplicação acompanha o ciclo de vida.

### Investigue

Provisioning logs e attribute mappings.

- [⬅️ Anterior](#modulo-16---workload-identity-e-managed-identity) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-18---microsoft-graph)

---

# Modulo 18 - Microsoft Graph

**🎯 Objetivo:** operar IAM por API e compreender delegated vs application permissions.

### PASSO 1

Instale Microsoft Graph PowerShell em uma máquina de laboratório.

### PASSO 2

Autentique com escopo mínimo necessário.

### PASSO 3

Liste usuários e grupos.

Exemplo conceitual:

`Get-MgUser -All`

`Get-MgGroup -All`

### PASSO 4

Repita uma consulta via REST/Graph Explorer com permissão mínima.

**Por quê:** IAM moderno exige capacidade de integrar e automatizar APIs.

### TESTE NEGATIVO

Tente uma operação sem a permissão necessária.

### Segurança

Diferencie claramente **delegated permissions** de **application permissions**. Application permissions podem agir sem usuário e exigem cuidado maior.

- [⬅️ Anterior](#modulo-17---scim-e-provisioning) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-19---powershell-e-automacao)

---

# Modulo 19 - PowerShell e automacao

**🎯 Objetivo:** transformar tarefas IAM repetitivas em automação auditável.

### PASSO 1

Crie `New-LabUser.ps1` que receba nome, department e grupo.

### PASSO 2

Faça o script validar entradas antes de alterar o tenant.

### PASSO 3

Registre `timestamp`, operação, objeto e resultado em log.

### PASSO 4

Adicione modo `-WhatIf` quando suportado.

### TESTE POSITIVO

Cria usuário e registra sucesso.

### TESTE NEGATIVO

Entrada inválida não deve modificar o tenant.

### Evolução

PowerShell → Graph SDK → REST → Python → CI/CD.

- [⬅️ Anterior](#modulo-18---microsoft-graph) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-20---jml-e-birthright-access)

---

# Modulo 20 - JML e birthright access

**🎯 Objetivo:** modelar Joiner, Mover, Leaver com regras de acesso.

### PASSO 1 — Joiner

Crie `LAB-ANA` com Department=Finance.

Defina acessos básicos: grupo Finance + aplicação financeira.

### PASSO 2 — Mover

Altere Department para IT.

Revogue Finance e conceda IT.

### PASSO 3 — Leaver

Desabilite a conta, revogue sessões e remova acessos.

**Por quê:** JML é uma das bases de IAM operacional e IGA.

### TESTE NEGATIVO

Usuário desligado tenta autenticar ou manter entitlement.

### Evidência

Ticket → aprovação → alteração → log → revogação.

- [⬅️ Anterior](#modulo-19---powershell-e-automacao) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-21---iga-role-engineering-abac-e-sod)

---

# Modulo 21 - IGA Role Engineering ABAC e SoD

**🎯 Objetivo:** sair de grupos simples e pensar como IGA Engineer.

### PASSO 1 — Inventário

Liste: personas, sistemas, entitlements e owners.

### PASSO 2 — Role Engineering

Crie uma role `Finance-Analyst` com acessos mínimos.

### PASSO 3 — ABAC

Defina uma regra conceitual usando atributos: Department + Job title + Location.

### PASSO 4 — SoD

Crie conflito: `Requester` não pode ser simultaneamente `Approver` para o mesmo acesso.

**Por quê:** SoD reduz fraude, abuso e conflito de responsabilidades.

### TESTE POSITIVO

Acesso permitido quando a combinação é válida.

### TESTE NEGATIVO

Solicitação conflitante deve ser bloqueada ou encaminhada para exceção controlada.

### Evidência

Matriz de roles, atributos, entitlements e conflitos.

- [⬅️ Anterior](#modulo-20---jml-e-birthright-access) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-22---entitlement-management)

---

# Modulo 22 - Entitlement Management

**🎯 Objetivo:** controlar pacotes de acesso, aprovação, expiração e catálogo.

> ⚠️ **Licenciamento:** Entitlement Management depende do plano/capacidade disponível. Com uma única P2, execute somente cenários realmente cobertos pelo tenant/licença ou use trial.

### PASSO 1

**Identity Governance → Entitlement management → Catalogs** → crie `CAT-IAM-LAB`.

### PASSO 2

Adicione grupo/aplicação como resource.

### PASSO 3

Crie um access package com política de aprovação e expiração.

### TESTE POSITIVO

Usuário elegível solicita e recebe acesso conforme fluxo.

### TESTE NEGATIVO

Usuário fora do escopo não consegue obter o pacote.

### Evidência

Request → approval → assignment → expiration.

- [⬅️ Anterior](#modulo-21---iga-role-engineering-abac-e-sod) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-23---access-reviews)

---

# Modulo 23 - Access Reviews

**🎯 Objetivo:** praticar recertificação de acesso e evidência de governança.

> ⚠️ Configure o cenário respeitando o licenciamento disponível. Use `LAB-P2` como identidade de revisão quando o cenário suportado exigir P2.

### PASSO 1

**Identity Governance → Access Reviews → New access review**.

Escolha grupo/aplicação de laboratório.

### PASSO 2

Defina reviewer, duração e recorrência quando suportado.

### PASSO 3

Crie um caso em que o acesso deve ser mantido e outro em que deve ser removido.

### TESTE POSITIVO

Reviewer aprova acesso válido.

### TESTE NEGATIVO

Reviewer nega acesso desnecessário e confirme a consequência.

### Evidência

Decisão + assignment + resultado da revogação.

- [⬅️ Anterior](#modulo-22---entitlement-management) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-24---pim)

---

# Modulo 24 - PIM

**🎯 Objetivo:** operar privilégio administrativo de forma just-in-time.

> 🔐 **P2:** use `LAB-P2` para o cenário licenciado. Não transforme o usuário em Global Administrator permanente sem necessidade.

### PASSO 1

**Identity Governance → Privileged Identity Management → Microsoft Entra roles**.

### PASSO 2

Atribua uma role elegível de menor privilégio possível.

### PASSO 3

Ative a role pelo período mínimo necessário, exigindo justificativa/MFA quando configurável.

**Por quê:** JIT reduz janela de exposição do privilégio.

### PASSO 4

Verifique audit history.

### TESTE POSITIVO

Role ativa → operação autorizada → expiração.

### TESTE NEGATIVO

Após expirar, a mesma operação privilegiada deve falhar.

### Extensão

Estude PIM para Azure resources, grupos, approval, notifications e emergency access.

- [⬅️ Anterior](#modulo-23---access-reviews) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-25---b2b-e-external-id)

---

# Modulo 25 - B2B e External ID

**🎯 Objetivo:** controlar identidades externas e colaboração entre organizações.

### PASSO 1

Crie um usuário convidado de teste usando um endereço de laboratório.

### PASSO 2

Observe User type, issuer e origem da identidade.

### PASSO 3

Configure restrições de colaboração/cross-tenant conforme o tenant permitir.

**Por quê:** B2B permite colaboração sem transformar o diretório externo em identidade interna plena.

### TESTE POSITIVO

Convidado acessa somente o recurso compartilhado.

### TESTE NEGATIVO

Convidado tenta acessar recurso não compartilhado.

### Cleanup

Remova o convidado e valide revogação.

- [⬅️ Anterior](#modulo-24---pim) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-26---hybrid-identity)

---

# Modulo 26 - Hybrid Identity

**🎯 Objetivo:** conectar identidade on-premises ao Entra e entender sincronização.

### PASSO 1

No `LAB-DC01`, prepare AD DS, DNS e usuários.

### PASSO 2

Instale o agente do **Microsoft Entra Cloud Sync** em Windows Server. Para laboratório, pode ser no DC se recursos forem limitados; em produção, prefira servidor separado.

### PASSO 3

Configure escopo de sincronização e UPN compatível com domínio verificado do tenant.

**Atenção:** `lab.local` é domínio interno; não trate como domínio verificado do Entra.

### PASSO 4

Sincronize usuário de teste.

### TESTE POSITIVO

Objeto on-premises aparece como sincronizado no Entra.

### TESTE NEGATIVO

Retire o objeto do escopo e confirme a alteração após sincronização.

### Compare

Cloud Sync × Entra Connect Sync: arquitetura, agentes, escopo, regras e casos de uso.

- [⬅️ Anterior](#modulo-25---b2b-e-external-id) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-27---pam-com-teleport-ce)

---

# Modulo 27 - PAM com Teleport CE

**🎯 Objetivo:** aprender PAM na prática sem depender de plataforma comercial.

### PASSO 1 — Subir Teleport

Use `LAB-TELEPORT` e `LAB-LINUX01`. Instale **Teleport Community Edition** conforme a documentação oficial da versão usada.

### PASSO 2 — Registrar recurso

Adicione o servidor Linux ao cluster Teleport.

### PASSO 3 — RBAC

Crie/ajuste uma role que permita somente o acesso necessário.

### PASSO 4 — Acesso privilegiado

Use o fluxo de acesso da Community Edition, incluindo role Access Request via CLI quando aplicável.

**Importante:** recursos avançados de Access Requests/approval via Web UI e SSO corporativo dependem da edição/capacidade disponível. Não trate CE como substituto integral de CyberArk/Delinea/BeyondTrust.

### PASSO 5 — Sessão

Conecte via `tsh`, execute comandos controlados e depois consulte auditoria/session recording.

### TESTE POSITIVO

Usuário autorizado acessa o host.

### TESTE NEGATIVO

Role sem permissão não consegue executar a ação privilegiada.

### O que você aprendeu

`request → approval → short-lived access → session → recording → audit`.

### Comparar no mercado

CyberArk, Delinea, BeyondTrust e senhasegura.

- [⬅️ Anterior](#modulo-26---hybrid-identity) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-28---cloud-iam---azure-e-aws)

---

# Modulo 28 - Cloud IAM Azure e AWS

**🎯 Objetivo:** transferir conceitos de IAM entre clouds.

### PASSO 1 — Azure

Repita RBAC com role mínima e scope mínimo.

### PASSO 2 — AWS

Crie um usuário/role de laboratório ou use IAM Identity Center conforme recursos disponíveis.

### PASSO 3 — Compare

| Conceito | Azure | AWS |
|---|---|---|
| Diretório | Entra ID | IAM/Identity Center |
| Autorização | Azure RBAC | IAM policies/roles |
| Workload | Managed Identity | IAM Role |
| Auditoria | Activity/Sign-in logs | CloudTrail |

### TESTE NEGATIVO

Conceda uma permissão propositalmente insuficiente e investigue a falha.

### Aprendeu

Princípios de IAM são portáveis; implementação muda por cloud.

- [⬅️ Anterior](#modulo-27---pam-com-teleport-ce) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-29---itsm-auditoria-e-evidencias)

---

# Modulo 29 - ITSM auditoria e evidencias

**🎯 Objetivo:** transformar operação IAM em processo auditável.

### PASSO 1

Crie um ticket fictício de `Joiner`.

Campos mínimos: solicitante, aprovador, identidade, sistema, entitlement, justificativa, prazo.

### PASSO 2

Execute a alteração no laboratório.

### PASSO 3

Anexe evidências: antes/depois, log, aprovação e resultado.

### PASSO 4

Repita para `Mover` e `Leaver`.

### TESTE NEGATIVO

Tente executar uma solicitação sem aprovação.

### Métricas

- tempo médio de provisionamento;
- tempo de revogação;
- acessos órfãos;
- taxa de revisão concluída;
- solicitações com SoD;
- falhas de provisioning;
- privilégios permanentes.

- [⬅️ Anterior](#modulo-28---cloud-iam---azure-e-aws) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-30---zero-trust-e-metricas)

---

# Modulo 30 - Zero Trust e metricas

**🎯 Objetivo:** conectar IAM com Zero Trust, risco e melhoria contínua.

### PASSO 1

Desenhe a decisão de acesso:

`Identity + Device + Signal + Resource + Risk → Policy → Decision → Session → Audit`

### PASSO 2

Revise políticas CA, PIM, MFA, device e least privilege.

### PASSO 3

Crie um dashboard manual com métricas do laboratório.

### TESTE NEGATIVO

Identifique uma combinação que deve ser bloqueada: identidade arriscada + recurso sensível + autenticação fraca.

### Resultado

Você consegue explicar IAM como controle contínuo, não apenas criação de usuário.

- [⬅️ Anterior](#modulo-29---itsm-auditoria-e-evidencias) · [🏠 Índice](#mapa-rapido) · [➡️ Próximo](#modulo-31---projeto-final-e-entrevista)

---

# Modulo 31 - Projeto final e entrevista

**🎯 Objetivo:** demonstrar capacidade de projetar e operar uma solução IAM de ponta a ponta.

## Cenário

Uma empresa possui 200 usuários, Finance, IT e RH, aplicações SaaS, AD on-premises, Entra ID, administradores Azure e servidores Linux.

### Entregáveis

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

- [⬅️ Anterior](#modulo-30---zero-trust-e-metricas) · [🏠 Índice](#mapa-rapido) · [➡️ Referência](#referencia-rapida)

---

# 📚 Referencia rapida

## Mapa de evolução profissional

| Nível | Domínio esperado |
|---|---|
| **1 — Foundation** | AD, Entra, DNS, grupos, MFA, conceitos IAM |
| **2 — IAM Operations** | JML, provisioning, deprovisioning, ITSM, troubleshooting |
| **3 — Access Management** | CA, SSO, SAML, OIDC, OAuth2, SCIM, Graph |
| **4 — IGA/PAM/Automation** | SoD, roles, reviews, entitlement, PIM, PAM, PowerShell/Python |
| **5 — Engineering/Architecture** | híbrido, cloud, Zero Trust, automação, governança, arquitetura e liderança |

## Tecnologias para estudar

**Microsoft:** Entra ID, AD DS, Cloud Sync, Entra Connect, PIM, Identity Protection, Graph.

**IGA:** SailPoint, Saviynt, Entra ID Governance.

**Access Management:** Okta, Keycloak, SAML, OIDC, OAuth2, SCIM.

**PAM:** CyberArk, Delinea, BeyondTrust, senhasegura, Teleport.

**Automação:** PowerShell, Python, REST, JSON, SQL, Git.

**ITSM:** ServiceNow, Jira.

**Cloud:** Azure, AWS, GCP, OCI.

## 🔗 Fluxos para memorizar

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

## 🧭 Atalhos

- [⬆️ Voltar ao mapa](#mapa-rapido)
- [🏁 Projeto final](#modulo-31---projeto-final-e-entrevista)
- [📚 Evolução profissional](#mapa-de-evolucao-profissional)

---

## ✅ Checklist final do documento

- [ ] Navegação do mapa testada.
- [ ] Links Anterior/Índice/Próximo testados.
- [ ] Cada módulo possui objetivo e passos.
- [ ] Cada módulo possui teste positivo/negativo quando aplicável.
- [ ] Evidências e troubleshooting estão definidos.
- [ ] Licenciamento de 1 P2 está explícito.
- [ ] P2 está concentrada em `LAB-P2`.
- [ ] Break-glass está separado do uso cotidiano.
- [ ] IGA, PAM e automação estão incluídos.
- [ ] Projeto final conecta o conteúdo ao mercado.
