# ROADMAP - IAM — Currículo de formação

**29 módulos · 242 tópicos · 16 capítulos de laboratório corporativo · 94 procedimentos microguiados**

Este documento funciona como índice estrutural. Para evitar redundância, a [revisão item a item](./REVISAO-ITEM-A-ITEM.md) contém as 242 aulas completas e o [laboratório corporativo](./LABORATORIO-ATLASCORP.md) contém todo o procedimento da empresa AtlasCorp.

## Uma única sequência teórica

Abra o **Painel** para retomar o estudo ou o **Roadmap de estudos** para escolher o módulo. Cada aula apresenta O que é, Para que serve e Como funciona. Quando existe aplicação prática, a etapa AtlasCorp aparece dentro da própria aula. Não há laboratório paralelo.

## 1. Iniciante — Conceitos, infraestrutura, identidade e protocolos

Construa a linguagem técnica necessária antes de administrar o tenant: redes, diretórios, autenticação, autorização e federação.

**11 módulos, 96 temas**

### 1.1 Fundamentos de TI para IAM

Entenda como sistemas e serviços identificam usuários e se comunicam. **12 aulas.**

Assuntos: TCP/IP · DNS · HTTP e HTTPS · TLS e certificados · Usuários e permissões Windows · Usuários e permissões Linux · Linha de comando (CLI) · PowerShell · Python básico · APIs REST · JSON · Git

Link no Pages: #module/0

### 1.2 Identidade e segurança

Identidade é a representação digital; autenticação comprova identidade, autorização decide acesso e auditoria registra ações. **13 aulas.**

Assuntos: Identidade digital · Contas · Credenciais · Atributos de identidade · Autenticação, autorização e auditoria (AAA) · Menor privilégio · Zero Trust · Joiner (admissão) · Mover (movimentação) · Leaver (desligamento) · Políticas IAM · Riscos de identidade · Segregação de funções (SoD)

Link no Pages: #module/1

### 1.3 Comprovação de identidade e assurance

Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. **7 aulas.**

Assuntos: Identidade declarada e identidade verificada · Identity proofing e IAL · Authenticator assurance e AAL · Federation assurance e FAL · Identificadores imutáveis e correlação · Recuperação de conta e reproofing · Privacidade na gestão de identidades

Link no Pages: #module/16

### 1.4 Active Directory e Windows Server

Diretórios centralizam objetos e relações de acesso em ambientes corporativos. **12 aulas.**

Assuntos: AD DS · Domínio e floresta · Controladores de domínio · Organizational Units (OU) · Usuários do AD · Grupos do AD · GPO · Delegação administrativa · Kerberos · Tickets Kerberos · Service Principal Names (SPN) · Troubleshooting com DNS e Event Viewer

Link no Pages: #module/2

### 1.5 LDAP e identidades híbridas

LDAP consulta diretórios; ambientes híbridos conectam identidades locais e nuvem. **7 aulas.**

Assuntos: Distinguished Name (DN) · LDAP bind · Filtros LDAP · LDAPS · Atributos e esquema de diretório · Sincronização, identidade híbrida e conflitos · Consulta e auditoria segura de diretório

Link no Pages: #module/3

### 1.6 Autorização e políticas

Autorização aplica regras a recursos: login bem-sucedido não concede todas as permissões. **7 aulas.**

Assuntos: RBAC · Modelagem de roles · ABAC · ACL · Negação por padrão · Entitlements e SoD · Testes de autorização no backend

Link no Pages: #module/4

### 1.7 Senhas, MFA e passkeys

A autenticação deve resistir a roubo de credenciais, ataques de phishing e abuso de sessões. **6 aulas.**

Assuntos: Senhas e recuperação segura · TOTP · FIDO2 e WebAuthn · Passkeys · Sessões, cookies e revogação · Políticas condicionais e risco

Link no Pages: #module/5

### 1.8 SSO e SAML 2.0

Um IdP pode autenticar uma pessoa para múltiplas aplicações mediante relações de confiança. **8 aulas.**

Assuntos: Identity Provider (IdP) · Service Provider (SP) · SSO · Metadados SAML · Assertions SAML · Assinaturas SAML · Integração SAML de aplicativo · Investigação de falhas SSO

Link no Pages: #module/6

### 1.9 OAuth 2.0, OIDC e JWT

OAuth delega autorização; OIDC adiciona autenticação sobre OAuth e declarações de identidade. **11 aulas.**

Assuntos: Authorization Code com PKCE · Scopes · Claims · Consentimento OAuth · ID Token · Access Token · JWT · Issuer · Audience · State · Nonce

Link no Pages: #module/7

### 1.10 Keycloak e Authentik

IdPs de laboratório permitem criar fluxos, gerenciar usuários e integrar aplicações. **4 aulas.**

Assuntos: Instalar ambientes de laboratório isolados · Usuários, grupos, roles e políticas · Integrar aplicações OIDC e SAML · Logs e troubleshooting de autenticação

Link no Pages: #module/8

### 1.11 Microsoft Entra ID

Serviço de identidade Microsoft para usuários, aplicações e controle de acesso na nuvem. **9 aulas.**

Assuntos: Tenant Entra ID · Usuários Entra ID · Grupos Entra ID · Roles Entra ID · Enterprise Applications · App Registrations · Conditional Access · MFA Entra ID · Graph API e federação híbrida

Link no Pages: #module/9

## 2. Intermediário — Operação Microsoft e IAM aplicado

Conecte os fundamentos à operação de identidades, Conditional Access, aplicações, dispositivos, Azure, JML e investigação.

**10 módulos, 80 temas**

### 2.1 Administração avançada do Microsoft Entra

Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. **11 aulas.**

Assuntos: Domínios verificados e configurações de tenant · Entra roles e escopos administrativos · Administrative Units · Grupos atribuídos e dinâmicos · Atributos personalizados de segurança · Licenças e atribuição por grupo · Entra Connect Sync versus Cloud Sync · Autenticação híbrida PHS, PTA e federação · Microsoft Graph e permissões delegadas · Microsoft Graph com application permissions · Governança de registros de aplicações

Link no Pages: #module/17

### 2.2 Autenticação avançada e Identity Protection

Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. **9 aulas.**

Assuntos: Temporary Access Pass (TAP) · Certificate-Based Authentication (CBA) · Authentication strengths · Passkeys resistentes a phishing · Passwordless e Windows Hello for Business · Identity Protection: riscos de usuário e entrada · Conditional Access report-only · Revogação de sessões e resposta a incidente · Contas de acesso emergencial

Link no Pages: #module/18

### 2.3 Identidades externas e acesso B2B

Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. **8 aulas.**

Assuntos: B2B collaboration e usuários convidados · B2B direct connect · Cross-tenant access settings · Cross-tenant synchronization · External ID para aplicações · Consentimento de aplicativos e publishers · SAML/OIDC entre tenants · Revisão de convidados inativos

Link no Pages: #module/19

### 2.4 Microsoft Intune e identidade de dispositivos

Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. **10 aulas.**

Assuntos: Device registration versus Microsoft Entra Join · Enrollment MDM no Intune · Políticas de compliance · Conditional Access com dispositivo conforme · Configuração de endpoints versus compliance · Enrollment restrictions e escopo · App protection policies (MAM) · BitLocker, chaves e identidades · Windows Hello for Business e dispositivos · Desligamento e retire/wipe

Link no Pages: #module/20

### 2.5 Azure RBAC e autorização de recursos

Entenda escopos e atribuições efetivas de autorização para recursos cloud. **10 aulas.**

Assuntos: Tenant versus subscription versus management group · Azure RBAC: principal, role e scope · Roles predefinidas versus roles customizadas · NotActions e permissões efetivas · Azure Policy versus Azure RBAC · Managed identities no Azure · Azure Key Vault com RBAC · Azure PIM para recursos · Governança com escopos e tags · Azure Activity Log e auditoria RBAC

Link no Pages: #module/21

### 2.6 Cloud IAM e identidades de workload

Recursos cloud e aplicações devem receber somente permissões necessárias e temporárias. **4 aulas.**

Assuntos: AWS IAM policies, roles e STS · IAM Identity Center e federação · Service principals e managed identities · Credenciais temporárias e auditoria

Link no Pages: #module/10

### 2.7 SCIM e provisionamento JML

A automação sincroniza o ciclo de vida de usuários e acessos entre RH, diretórios e aplicações. **8 aulas.**

Assuntos: SCIM Users · SCIM Groups · REST e SCIM · PATCH · Filtros SCIM · Paginação · Provisionamento e desprovisionamento · Reexecução idempotente e tratamento de falhas

Link no Pages: #module/11

### 2.8 IGA e revisão de acessos

Governança verifica se permissões continuam apropriadas e justificadas ao longo do tempo. **4 aulas.**

Assuntos: Catálogo de acessos e ownership · Access requests e aprovações · Recertificação e evidências · SoD, contas órfãs e compliance

Link no Pages: #module/12

### 2.9 Logs, diagnóstico e ITSM

IAM também envolve investigar falhas, mudanças e incidentes sem interromper usuários. **8 aulas.**

Assuntos: Logs IdP · Logs Active Directory · Logs Entra ID · Diagnóstico SAML · Diagnóstico OIDC · Diagnóstico SCIM · Gestão de incidentes e mudanças · Runbooks, rollback e evidências

Link no Pages: #module/14

### 2.10 Acesso adaptativo, Global Secure Access e proteção de sessões

Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. **8 aulas.**

Assuntos: Application Proxy para aplicações locais · Continuous Access Evaluation (CAE) · Authentication context · Protected actions · Global Secure Access: arquitetura · Entra Private Access · Entra Internet Access · Perfis de tráfego e cliente Global Secure Access

Link no Pages: #module/28

## 3. Avançado — Governança, privilégios, multi-cloud e arquitetura

Trate identidades não humanas, privilégio, dados, governança, incidentes, políticas como código e arquitetura Zero Trust.

**8 módulos, 66 temas**

### 3.1 PAM, PIM e JIT

Privilégios elevados exigem controle adicional, registro e duração limitada. **6 aulas.**

Assuntos: Cofre e gestão de segredos · Rotação de credenciais · Onboarding PAM · Contas de serviço · Sessões privilegiadas e auditoria · JIT, break-glass e revisão

Link no Pages: #module/13

### 3.2 Identidades não humanas e federação de workloads

Governance de workloads, service principals, agentes, chaves e tokens de curta duração. **9 aulas.**

Assuntos: Service principal e application object · Client credentials e application permissions · Managed identity system-assigned versus user-assigned · Workload identity federation e OIDC · Rotação e expiração de credenciais · Contas de serviço e ownership · Agentes de IA e machine identity · Token exchange e on-behalf-of · CIEM e revisão de privilégios multi-cloud

Link no Pages: #module/22

### 3.3 Entra Identity Governance em profundidade

Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. **10 aulas.**

Assuntos: Access packages e catálogos · Entitlement Management: políticas e expiração · Access Reviews e recertificação · Lifecycle Workflows · Fonte autoritativa de RH · Provisionamento API-driven · Reconciliação e contas órfãs · Segregação de funções preventiva e detectiva · Privileged Identity Management (PIM) · Métricas de governança e evidências

Link no Pages: #module/23

### 3.4 Microsoft Purview e controle de acesso a dados

Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. **10 aulas.**

Assuntos: Classificação e inventário da informação · Sensitivity labels · Criptografia e direitos associados a rótulos · Data Loss Prevention (DLP) · Tipos de informações sensíveis e trainable classifiers · Data lifecycle e retention · eDiscovery e investigação · Purview RBAC e separação administrativa · Proteção de informações em endpoints · Interação entre Entra, Intune e Purview

Link no Pages: #module/24

### 3.5 KQL, telemetria e investigação IAM

Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. **9 aulas.**

Assuntos: Sign-in logs e tipos de entrada · Audit logs de identidade · KQL: where, project e summarize · KQL: joins e correlação · Falhas de Conditional Access · Falhas de provisionamento SCIM · Incidentes de credenciais comprometidas · Dashboards e indicadores de detecção · Retenção, privacidade e cadeia de custódia

Link no Pages: #module/25

### 3.6 IAM em AWS, Google Cloud e produtos especializados

Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. **9 aulas.**

Assuntos: AWS IAM: users, groups, roles e policies · AWS STS e identidade federada · AWS Organizations, SCP e limites · AWS IAM Identity Center · Google Cloud IAM: principal, role e resource · Google Cloud Workload Identity Federation · Okta versus Microsoft Entra · SailPoint IGA e ciclo de vida · CyberArk PAM e contas privilegiadas

Link no Pages: #module/26

### 3.7 Engenharia de IAM e políticas de autorização

Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. **9 aulas.**

Assuntos: Policy Decision Point e Policy Enforcement Point · ReBAC e autorização por relações · ABAC orientado a recursos · OPA e policy-as-code · Provisionamento SCIM resiliente · Threat modeling para IAM · Fail-safe, resiliência e break-glass · Infraestrutura como código para IAM · Arquitetura de referência e projeto final

Link no Pages: #module/27

### 3.8 Zero Trust e arquitetura IAM

Arquiteturas maduras tratam identidades humanas e de máquina com políticas adaptativas e monitoramento. **4 aulas.**

Assuntos: Arquitetura de confiança e decisões de acesso · Identidades não humanas e segredos · Threat modeling e resiliência · Projeto IAM ponta a ponta

Link no Pages: #module/15

## Uma empresa fictícia para todos os laboratórios

A empresa AtlasCorp tem RH, Financeiro, TI, IAM, SecOps e parceria externa. O ambiente começa com identidades, grupos e licença Entra P2; os mesmos recursos são reaproveitados ao longo de 16 capítulos.

1. **Preparar laboratório seguro** — 01 · Implantação da empresa: 5 procedimentos; AtlasCorp inicia sua operação e precisa separar acesso administrativo de identidade dos funcionários. Link: #lab/lab-00
2. **Ciclo de vida Joiner–Mover–Leaver** — 01 · Implantação da empresa: 5 procedimentos; RH contrata Camila para TI, transfere Bruno de Financeiro para outra função e desliga um contratado. Link: #lab/lab-01
3. **Autenticação, passkeys e MFA** — 02 · Autenticação e políticas P2: 18 procedimentos; AtlasCorp precisa exigir MFA de funcionários e proteção maior para administradores sem bloquear toda a empresa. Link: #lab/lab-02
4. **Autorização e privilégios efetivos** — 02 · Autenticação e políticas P2: 5 procedimentos; O Financeiro precisa ler relatórios, mas somente um aprovador pode alterar registros de pagamento. Link: #lab/lab-03
5. **Federação SAML e OpenID Connect** — 02 · Autenticação e políticas P2: 5 procedimentos; AtlasCorp conecta seu portal financeiro a um provedor centralizado de identidade. Link: #lab/lab-04
6. **Gerenciamento de convidados B2B** — 03 · Operação e dispositivos: 4 procedimentos; Consultor externo presta serviço temporário ao Financeiro e não deve manter acesso após o projeto. Link: #lab/lab-05
7. **Intune + Conditional Access** — 03 · Operação e dispositivos: 5 procedimentos; AtlasCorp autoriza documentos sensíveis somente de dispositivos sob gestão e conformidade verificável. Link: #lab/lab-06
8. **Managed Identity + Azure RBAC** — 03 · Operação e dispositivos: 5 procedimentos; Serviço financeiro consulta dados no Azure sem manter password ou client secret no código. Link: #lab/lab-07
9. **Provisionamento SCIM idempotente** — 04 · Governança e automação: 5 procedimentos; AtlasCorp decide sincronizar o ciclo de vida dos funcionários com aplicação SaaS usando SCIM. Link: #lab/lab-08
10. **IGA: acesso temporário e recertificação** — 04 · Governança e automação: 5 procedimentos; Financeiro solicita acesso temporário para Bruno e precisa passar por aprovação e recertificação. Link: #lab/lab-09
11. **PAM, PIM e break-glass** — 04 · Governança e automação: 5 procedimentos; Renata administra uma função sensível apenas durante janela de manutenção aprovada. Link: #lab/lab-10
12. **Purview: classificação, rótulos e DLP** — 05 · Defesa e dados: 5 procedimentos; Equipe de Financeiro classifica relatórios e precisa limitar exposição acidental de dados. Link: #lab/lab-11
13. **Investigação IAM com KQL** — 05 · Defesa e dados: 5 procedimentos; SecOps investiga repetidas falhas de acesso ao aplicativo de Financeiro após política Conditional Access. Link: #lab/lab-12
14. **Active Directory híbrido** — 06 · Integração e arquitetura: 5 procedimentos; Empresa herdou Active Directory e precisa entender a correlação de identidades locais/cloud. Link: #lab/lab-13
15. **Federação de workload entre clouds** — 06 · Integração e arquitetura: 5 procedimentos; Pipeline AtlasCorp precisa acessar ambientes Azure, AWS e Google Cloud com credenciais temporárias. Link: #lab/lab-14
16. **Projeto final IAM ponta a ponta** — 07 · Capstone: 7 procedimentos; Auditoria exige mostrar que AtlasCorp controla admissão, acesso, autenticação, dispositivos, dados, exceções e revogação. Link: #lab/lab-15

Os 16 capítulos abaixo permanecem como referência histórica e manual offline. No site, as 94 tarefas são incorporadas aos 65 temas pertinentes do Roadmap. **Não habilite políticas de bloqueio fora de grupos piloto ou sem recuperação de emergência.**

## Certificações por nível

Não existe certificação universalmente obrigatória para exercer IAM. SC-300 é meta central da formação; SC-900 é recomendação de base, AZ-104, MD-102 e SC-401 são complementares, demais trajetórias opcionais.

### Iniciante

Conheça vocabulário técnico, identidade e operações básicas.

- Microsoft SC-900: Fundamentos de segurança, conformidade, identidade e tecnologias Microsoft. [Fonte oficial](https://learn.microsoft.com/pt-br/credentials/certifications/security-compliance-and-identity-fundamentals/)
- ITIL Foundation: Gestão de serviços, incidentes e mudanças [Fonte oficial](https://www.peoplecert.org/)
- Okta Certified Professional: SSO, usuários e administração do Okta; sem pré-requisito de certificação [Fonte oficial](https://www.okta.com/services/certification/)

### Intermediário

Administração de identidade e certificações complementares da plataforma.

- Microsoft SC-300: Administração de identidade, autenticação, aplicações e governança com Microsoft Entra. [Fonte oficial](https://learn.microsoft.com/pt-br/credentials/certifications/identity-and-access-administrator/)
- Microsoft AZ-104: Administração Azure, incluindo identidades, funções e governança de recursos; não é exclusiva de IAM. [Fonte oficial](https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/)
- Microsoft MD-102: Gerenciamento de endpoints, identidade de dispositivo, Intune e compliance. [Fonte oficial](https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/)
- Microsoft SC-401: Microsoft Purview, classificação, proteção, risco e segurança da informação. [Fonte oficial](https://learn.microsoft.com/en-us/credentials/certifications/information-security-administrator/)
- Okta Certified Administrator: Administração Okta; exige Okta Certified Professional [Fonte oficial](https://www.okta.com/services/certification/)
- Google Associate Cloud Engineer: Operações Google Cloud, projetos e IAM [Fonte oficial](https://cloud.google.com/learn/certification/cloud-engineer)
- ISO/IEC 27001 Lead Implementer: Certificação de organismo externo, não emitida pela ISO [Fonte oficial](https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001)
- COBIT 2019 Foundation: Governança de TI e controles ISACA [Fonte oficial](https://www.isaca.org/credentialing/cobit-foundation)

### Avançado

Governança especializada, segurança cloud, arquitetura e requisitos profissionais.

- Microsoft SC-100: Arquitetura Zero Trust, identidade, segurança de infraestrutura, operações e aplicações. [Fonte oficial](https://learn.microsoft.com/pt-br/credentials/certifications/cybersecurity-architect-expert/)
- AWS Security – Specialty: Segurança AWS abrangente, incluindo IAM, federação, logs, criptografia e infraestrutura. [Fonte oficial](https://aws.amazon.com/pt/certification/certified-security-specialty/)
- Google Professional Cloud Security Engineer: Segurança cloud, IAM e proteção de dados Google Cloud [Fonte oficial](https://cloud.google.com/learn/certification/cloud-security-engineer)
- SailPoint Identity Security Engineer: Governança e engenharia de identidades; verificar condições atuais do exame [Fonte oficial](https://university.sailpoint.com/)
- CyberArk Defender: Administração de cofres e acessos privilegiados; verificar trilha atual [Fonte oficial](https://training.cyberark.com/)
- ISACA CISA: Auditoria de sistemas e acessos; requisitos de experiência [Fonte oficial](https://www.isaca.org/credentialing/cisa)
- ISACA CISM: Gestão de riscos e segurança; requisitos de experiência [Fonte oficial](https://www.isaca.org/credentialing/cism)
- ISC2 CCSP: Segurança e governança cloud; experiência profissional [Fonte oficial](https://www.isc2.org/certifications/ccsp)
- ISC2 CISSP: Arquitetura de segurança e IAM; experiência profissional [Fonte oficial](https://www.isc2.org/certifications/cissp)

### Normas/frameworks não são certificados

- NIST CSF 2.0 / SP 800-63 / SP 800-207 — https://www.nist.gov/cyberframework
- CIS Critical Security Controls v8.1 — https://www.cisecurity.org/controls
- NIST SP 800-53 — https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final

## Evidências para carreira

- Por tópico: saiba explicar conceito e tradeoffs, reproduzir casos permitidos/negados e diagnosticar falha.
- Por capítulo: guarde logs sanitizados, contexto do ticket e passos reprodutíveis de configuração.
- No capstone: entregue arquitetura, matriz de permissões, JML, CA, PIM, dispositivo, dados, incidentes e plano de rollback.
- Diferencie no portfólio **prática real**, **simulação** e **estudo teórico**.

**Revisado em 17/10/2026.** Requisitos de licenciamento e menus administrativos devem ser conferidos nas fontes oficiais vigentes.