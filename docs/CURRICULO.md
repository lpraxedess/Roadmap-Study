# ROADMAP - IAM — Currículo atualizado

> 29 módulos, 242 temas, 63 temas com aplicação AtlasCorp e 94 tarefas corporativas reutilizadas. O Roadmap é a única sequência didática da aplicação.

## Como estudar

Cada tema exibe **O que é?**, **Para que serve?** e **Como funciona?**. Quando o assunto é realmente aplicável ao ambiente corporativo, a tarefa **AtlasCorp** aparece dentro da mesma aula, com configuração, justificativa, teste e diagnóstico. A ausência dessa etapa é intencional em conceitos fundamentais como TCP/IP.

Os tópicos estão sequenciados do iniciante ao avançado. As configurações Cloud no Entra começam após os fundamentos. Simulações de AD híbrido, Intune, Purview e clouds externas dependem de licenças e ambientes compatíveis. Nenhuma etapa autoriza alterar produção.

## Trilha curricular

## 1. Iniciante: Conceitos, identidade e primeiros controles

Entenda as bases, conheça o Entra e aplique os primeiros controles corporativos sem configurar infraestrutura desnecessária.

**11 módulos / 96 temas.**

### 1. Fundamentos de TI para IAM

Entenda como sistemas e serviços identificam usuários e se comunicam.

- TCP/IP
- DNS
- HTTP e HTTPS
- TLS e certificados
- Usuários e permissões Windows
- Usuários e permissões Linux
- Linha de comando (CLI)
- PowerShell
- Python básico
- APIs REST
- JSON
- Git

### 2. Identidade e segurança

Identidade é a representação digital; autenticação comprova identidade, autorização decide acesso e auditoria registra ações.

- Identidade digital
- Contas
- Credenciais
- Atributos de identidade
- Autenticação, autorização e auditoria (AAA)
- Menor privilégio
- Zero Trust
- Joiner (admissão) — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Mover (movimentação)
- Leaver (desligamento)
- Políticas IAM
- Riscos de identidade
- Segregação de funções (SoD) — **AtlasCorp: 1 atividade(s) incorporada(s)**

### 3. Comprovação de identidade e assurance

Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos.

- Identidade declarada e identidade verificada
- Identity proofing e IAL
- Authenticator assurance e AAL
- Federation assurance e FAL
- Identificadores imutáveis e correlação
- Recuperação de conta e reproofing
- Privacidade na gestão de identidades

### 4. Senhas, MFA e passkeys

A autenticação deve resistir a roubo de credenciais, ataques de phishing e abuso de sessões.

- Senhas e recuperação segura
- TOTP
- FIDO2 e WebAuthn
- Passkeys
- Sessões, cookies e revogação — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Políticas condicionais e risco

### 5. Microsoft Entra ID

Serviço de identidade Microsoft para usuários, aplicações e controle de acesso na nuvem.

- Tenant Entra ID — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Usuários Entra ID — **AtlasCorp: 2 atividade(s) incorporada(s)**
- Grupos Entra ID — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Roles Entra ID — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Enterprise Applications — **AtlasCorp: 2 atividade(s) incorporada(s)**
- App Registrations — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Conditional Access — **AtlasCorp: 5 atividade(s) incorporada(s)**
- MFA Entra ID — **AtlasCorp: 3 atividade(s) incorporada(s)**
- Graph API e federação híbrida

### 6. Autorização e políticas

Autorização aplica regras a recursos: login bem-sucedido não concede todas as permissões.

- RBAC — **AtlasCorp: 2 atividade(s) incorporada(s)**
- Modelagem de roles — **AtlasCorp: 1 atividade(s) incorporada(s)**
- ABAC
- ACL
- Negação por padrão
- Entitlements e SoD
- Testes de autorização no backend — **AtlasCorp: 1 atividade(s) incorporada(s)**

### 7. SSO e SAML 2.0

Um IdP pode autenticar uma pessoa para múltiplas aplicações mediante relações de confiança.

- Identity Provider (IdP)
- Service Provider (SP)
- SSO
- Metadados SAML
- Assertions SAML
- Assinaturas SAML
- Integração SAML de aplicativo
- Investigação de falhas SSO

### 8. OAuth 2.0, OIDC e JWT

OAuth delega autorização; OIDC adiciona autenticação sobre OAuth e declarações de identidade.

- Authorization Code com PKCE — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Scopes
- Claims
- Consentimento OAuth
- ID Token — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Access Token
- JWT
- Issuer
- Audience — **AtlasCorp: 1 atividade(s) incorporada(s)**
- State
- Nonce

### 9. Keycloak e Authentik

IdPs de laboratório permitem criar fluxos, gerenciar usuários e integrar aplicações.

- Instalar ambientes de laboratório isolados
- Usuários, grupos, roles e políticas
- Integrar aplicações OIDC e SAML
- Logs e troubleshooting de autenticação

### 10. Active Directory e Windows Server

Diretórios centralizam objetos e relações de acesso em ambientes corporativos.

- AD DS — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Domínio e floresta
- Controladores de domínio
- Organizational Units (OU)
- Usuários do AD — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Grupos do AD
- GPO
- Delegação administrativa
- Kerberos — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Tickets Kerberos
- Service Principal Names (SPN)
- Troubleshooting com DNS e Event Viewer

### 11. LDAP e identidades híbridas

LDAP consulta diretórios; ambientes híbridos conectam identidades locais e nuvem.

- Distinguished Name (DN)
- LDAP bind
- Filtros LDAP
- LDAPS
- Atributos e esquema de diretório
- Sincronização, identidade híbrida e conflitos — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Consulta e auditoria segura de diretório

## 2. Intermediário: Administração cloud e operações IAM

Aprofunde autenticação, identidade externa, dispositivos, Azure, provisionamento e investigação operacional.

**10 módulos / 80 temas.**

### 12. Administração avançada do Microsoft Entra

Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade.

- Domínios verificados e configurações de tenant
- Entra roles e escopos administrativos — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Administrative Units
- Grupos atribuídos e dinâmicos — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Atributos personalizados de segurança
- Licenças e atribuição por grupo
- Entra Connect Sync versus Cloud Sync
- Autenticação híbrida PHS, PTA e federação — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Microsoft Graph e permissões delegadas
- Microsoft Graph com application permissions
- Governança de registros de aplicações

### 13. Autenticação avançada e Identity Protection

Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável.

- Temporary Access Pass (TAP)
- Certificate-Based Authentication (CBA)
- Authentication strengths — **AtlasCorp: 2 atividade(s) incorporada(s)**
- Passkeys resistentes a phishing
- Passwordless e Windows Hello for Business
- Identity Protection: riscos de usuário e entrada — **AtlasCorp: 4 atividade(s) incorporada(s)**
- Conditional Access report-only — **AtlasCorp: 2 atividade(s) incorporada(s)**
- Revogação de sessões e resposta a incidente — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Contas de acesso emergencial

### 14. Identidades externas e acesso B2B

Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento.

- B2B collaboration e usuários convidados — **AtlasCorp: 2 atividade(s) incorporada(s)**
- B2B direct connect
- Cross-tenant access settings — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Cross-tenant synchronization
- External ID para aplicações
- Consentimento de aplicativos e publishers
- SAML/OIDC entre tenants
- Revisão de convidados inativos — **AtlasCorp: 1 atividade(s) incorporada(s)**

### 15. Microsoft Intune e identidade de dispositivos

Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo.

- Device registration versus Microsoft Entra Join
- Enrollment MDM no Intune — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Políticas de compliance — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Conditional Access com dispositivo conforme — **AtlasCorp: 2 atividade(s) incorporada(s)**
- Configuração de endpoints versus compliance
- Enrollment restrictions e escopo
- App protection policies (MAM)
- BitLocker, chaves e identidades
- Windows Hello for Business e dispositivos
- Desligamento e retire/wipe — **AtlasCorp: 1 atividade(s) incorporada(s)**

### 16. Azure RBAC e autorização de recursos

Entenda escopos e atribuições efetivas de autorização para recursos cloud.

- Tenant versus subscription versus management group — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Azure RBAC: principal, role e scope — **AtlasCorp: 2 atividade(s) incorporada(s)**
- Roles predefinidas versus roles customizadas
- NotActions e permissões efetivas
- Azure Policy versus Azure RBAC
- Managed identities no Azure — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Azure Key Vault com RBAC
- Azure PIM para recursos
- Governança com escopos e tags
- Azure Activity Log e auditoria RBAC — **AtlasCorp: 1 atividade(s) incorporada(s)**

### 17. Cloud IAM e identidades de workload

Recursos cloud e aplicações devem receber somente permissões necessárias e temporárias.

- AWS IAM policies, roles e STS
- IAM Identity Center e federação
- Service principals e managed identities
- Credenciais temporárias e auditoria

### 18. SCIM e provisionamento JML

A automação sincroniza o ciclo de vida de usuários e acessos entre RH, diretórios e aplicações.

- SCIM Users — **AtlasCorp: 2 atividade(s) incorporada(s)**
- SCIM Groups
- REST e SCIM
- PATCH — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Filtros SCIM
- Paginação
- Provisionamento e desprovisionamento — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Reexecução idempotente e tratamento de falhas — **AtlasCorp: 1 atividade(s) incorporada(s)**

### 19. IGA e revisão de acessos

Governança verifica se permissões continuam apropriadas e justificadas ao longo do tempo.

- Catálogo de acessos e ownership
- Access requests e aprovações — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Recertificação e evidências
- SoD, contas órfãs e compliance

### 20. Logs, diagnóstico e ITSM

IAM também envolve investigar falhas, mudanças e incidentes sem interromper usuários.

- Logs IdP
- Logs Active Directory
- Logs Entra ID — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Diagnóstico SAML
- Diagnóstico OIDC
- Diagnóstico SCIM
- Gestão de incidentes e mudanças — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Runbooks, rollback e evidências

### 21. Acesso adaptativo, Global Secure Access e proteção de sessões

Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos.

- Application Proxy para aplicações locais
- Continuous Access Evaluation (CAE)
- Authentication context
- Protected actions
- Global Secure Access: arquitetura
- Entra Private Access
- Entra Internet Access
- Perfis de tráfego e cliente Global Secure Access

## 3. Avançado: Governança, privilégios e arquitetura

Evolua a AtlasCorp com governança, segurança de workloads, dados, multi-cloud e arquitetura.

**8 módulos / 66 temas.**

### 22. PAM, PIM e JIT

Privilégios elevados exigem controle adicional, registro e duração limitada.

- Cofre e gestão de segredos
- Rotação de credenciais
- Onboarding PAM
- Contas de serviço
- Sessões privilegiadas e auditoria
- JIT, break-glass e revisão — **AtlasCorp: 1 atividade(s) incorporada(s)**

### 23. Identidades não humanas e federação de workloads

Governance de workloads, service principals, agentes, chaves e tokens de curta duração.

- Service principal e application object
- Client credentials e application permissions
- Managed identity system-assigned versus user-assigned
- Workload identity federation e OIDC — **AtlasCorp: 2 atividade(s) incorporada(s)**
- Rotação e expiração de credenciais
- Contas de serviço e ownership
- Agentes de IA e machine identity
- Token exchange e on-behalf-of
- CIEM e revisão de privilégios multi-cloud — **AtlasCorp: 1 atividade(s) incorporada(s)**

### 24. Entra Identity Governance em profundidade

Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis.

- Access packages e catálogos — **AtlasCorp: 2 atividade(s) incorporada(s)**
- Entitlement Management: políticas e expiração — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Access Reviews e recertificação — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Lifecycle Workflows
- Fonte autoritativa de RH
- Provisionamento API-driven
- Reconciliação e contas órfãs — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Segregação de funções preventiva e detectiva
- Privileged Identity Management (PIM) — **AtlasCorp: 3 atividade(s) incorporada(s)**
- Métricas de governança e evidências

### 25. Microsoft Purview e controle de acesso a dados

Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação.

- Classificação e inventário da informação — **AtlasCorp: 2 atividade(s) incorporada(s)**
- Sensitivity labels — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Criptografia e direitos associados a rótulos — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Data Loss Prevention (DLP) — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Tipos de informações sensíveis e trainable classifiers
- Data lifecycle e retention
- eDiscovery e investigação
- Purview RBAC e separação administrativa
- Proteção de informações em endpoints
- Interação entre Entra, Intune e Purview

### 26. KQL, telemetria e investigação IAM

Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis.

- Sign-in logs e tipos de entrada — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Audit logs de identidade — **AtlasCorp: 1 atividade(s) incorporada(s)**
- KQL: where, project e summarize — **AtlasCorp: 1 atividade(s) incorporada(s)**
- KQL: joins e correlação
- Falhas de Conditional Access — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Falhas de provisionamento SCIM
- Incidentes de credenciais comprometidas
- Dashboards e indicadores de detecção
- Retenção, privacidade e cadeia de custódia

### 27. IAM em AWS, Google Cloud e produtos especializados

Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros.

- AWS IAM: users, groups, roles e policies
- AWS STS e identidade federada — **AtlasCorp: 1 atividade(s) incorporada(s)**
- AWS Organizations, SCP e limites
- AWS IAM Identity Center
- Google Cloud IAM: principal, role e resource
- Google Cloud Workload Identity Federation — **AtlasCorp: 1 atividade(s) incorporada(s)**
- Okta versus Microsoft Entra
- SailPoint IGA e ciclo de vida
- CyberArk PAM e contas privilegiadas

### 28. Engenharia de IAM e políticas de autorização

Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis.

- Policy Decision Point e Policy Enforcement Point
- ReBAC e autorização por relações
- ABAC orientado a recursos
- OPA e policy-as-code
- Provisionamento SCIM resiliente
- Threat modeling para IAM
- Fail-safe, resiliência e break-glass
- Infraestrutura como código para IAM
- Arquitetura de referência e projeto final

### 29. Zero Trust e arquitetura IAM

Arquiteturas maduras tratam identidades humanas e de máquina com políticas adaptativas e monitoramento.

- Arquitetura de confiança e decisões de acesso
- Identidades não humanas e segredos
- Threat modeling e resiliência
- Projeto IAM ponta a ponta — **AtlasCorp: 7 atividade(s) incorporada(s)**

## Aplicação corporativa nas aulas

Os **94 procedimentos já existentes da AtlasCorp** foram distribuídos por **63 temas**, com o mesmo registro de progresso do laboratório anterior. Isso evita duplicar execução e avaliação. As 16 áreas abaixo identificam a origem das tarefas, mas **não representam uma seção de navegação independente**.

### Preparar laboratório seguro

5 procedimentos integrados:
1. **Inventariar licenças** → Tenant Entra ID.
2. **Estabelecer identidades-piloto** → Usuários Entra ID.
3. **Organizar grupos de negócio** → Grupos Entra ID.
4. **Preservar recuperação administrativa** → Roles Entra ID.
5. **Definir separação de funções** → Segregação de funções (SoD).

### Ciclo de vida Joiner–Mover–Leaver

5 procedimentos integrados:
1. **Autorizar a admissão** → Joiner (admissão).
2. **Criar e associar identidade** → Usuários Entra ID.
3. **Demonstrar Mover** → Grupos atribuídos e dinâmicos.
4. **Executar Leaver no ambiente teste** → Revogação de sessões e resposta a incidente.
5. **Buscar contas órfãs** → Reconciliação e contas órfãs.

### Autenticação, passkeys e MFA

18 procedimentos integrados:
1. **Preparar um escopo reversível** → Conditional Access.
2. **Definir métodos disponíveis** → MFA Entra ID.
3. **Concluir registro da conta-piloto** → MFA Entra ID.
4. **Construir política de MFA** → Conditional Access.
5. **Manter a política em Report-only** → Conditional Access.
6. **Gerar dois logins de comparação** → Conditional Access report-only.
7. **Interpretar o relatório** → Conditional Access report-only.
8. **Ativar para o grupo piloto** → Conditional Access.
9. **Testar aceitação e negação** → Authentication strengths.
10. **Criar proteção para administradores** → Authentication strengths.
11. **Distinguir políticas e métodos** → MFA Entra ID.
12. **Analisar riscos no Identity Protection** → Identity Protection: riscos de usuário e entrada.
13. **Definir política CA de sign-in risk** → Identity Protection: riscos de usuário e entrada.
14. **Definir política CA de user risk** → Identity Protection: riscos de usuário e entrada.
15. **Verificar status sem fabricar risco** → Identity Protection: riscos de usuário e entrada.
16. **Examinar sessão e localização** → Sessões, cookies e revogação.
17. **Revisar combinação de políticas CA** → Conditional Access.
18. **Encerrar e auditar a mudança** → Logs Entra ID.

### Autorização e privilégios efetivos

5 procedimentos integrados:
1. **Mapear ações e atores** → RBAC.
2. **Definir grupos de negócio** → RBAC.
3. **Atribuir acesso à aplicação** → RBAC.
4. **Provar casos permitidos/negados** → RBAC.
5. **Revogar acesso** → RBAC.

### Federação SAML e OpenID Connect

5 procedimentos integrados:
1. **Registrar app** → App Registrations.
2. **Configurar protocolo** → Authorization Code com PKCE.
3. **Conferir tokens** → ID Token.
4. **Testar falhas** → Audience.
5. **Vincular grupo a aplicação** → Enterprise Applications.

### Gerenciamento de convidados B2B

4 procedimentos integrados:
1. **Autorizar parceria** → B2B collaboration e usuários convidados.
2. **Restringir colaboração** → Cross-tenant access settings.
3. **Convidar e atribuir** → B2B collaboration e usuários convidados.
4. **Testar escopo e expiração** → Revisão de convidados inativos.

### Intune + Conditional Access

5 procedimentos integrados:
1. **Validar gestão de dispositivos** → Enrollment MDM no Intune.
2. **Criar política compliance** → Políticas de compliance.
3. **Conectar sinal ao CA** → Conditional Access com dispositivo conforme.
4. **Gerar casos realistas** → Conditional Access com dispositivo conforme.
5. **Reverter o ambiente** → Desligamento e retire/wipe.

### Managed Identity + Azure RBAC

5 procedimentos integrados:
1. **Definir orçamento** → Tenant versus subscription versus management group.
2. **Criar escopo mínimo** → Azure RBAC: principal, role e scope.
3. **Configurar managed identity** → Managed identities no Azure.
4. **Conceder Reader** → Azure RBAC: principal, role e scope.
5. **Revogar e limpar** → Azure Activity Log e auditoria RBAC.

### Provisionamento SCIM idempotente

5 procedimentos integrados:
1. **Definir contrato** → SCIM Users.
2. **Criar usuário SCIM** → SCIM Users.
3. **Mover sem duplicar** → PATCH.
4. **Desativar conta** → Provisionamento e desprovisionamento.
5. **Simular falha e retry** → Reexecução idempotente e tratamento de falhas.

### IGA: acesso temporário e recertificação

5 procedimentos integrados:
1. **Inventariar SKU do recurso** → Access packages e catálogos.
2. **Criar catálogo de acesso** → Access packages e catálogos.
3. **Definir access package** → Entitlement Management: políticas e expiração.
4. **Executar solicitação** → Access requests e aprovações.
5. **Recertificar e aplicar decisão** → Access Reviews e recertificação.

### PAM, PIM e break-glass

5 procedimentos integrados:
1. **Escolher função restrita** → Entra roles e escopos administrativos.
2. **Criar elegibilidade** → Privileged Identity Management (PIM).
3. **Testar antes da ativação** → Privileged Identity Management (PIM).
4. **Ativar sob aprovação** → Privileged Identity Management (PIM).
5. **Validar expiração e emergência** → JIT, break-glass e revisão.

### Purview: classificação, rótulos e DLP

5 procedimentos integrados:
1. **Confirmar direito de licenciamento** → Classificação e inventário da informação.
2. **Definir informação e owner** → Classificação e inventário da informação.
3. **Criar e publicar sensitivity label** → Sensitivity labels.
4. **Avaliar proteção real** → Criptografia e direitos associados a rótulos.
5. **Criar DLP audit-only** → Data Loss Prevention (DLP).

### Investigação IAM com KQL

5 procedimentos integrados:
1. **Produzir dois eventos conhecidos** → Sign-in logs e tipos de entrada.
2. **Ler Conditional Access** → Falhas de Conditional Access.
3. **Correlacionar alterações** → Audit logs de identidade.
4. **Criar consulta KQL** → KQL: where, project e summarize.
5. **Executar remediação** → Gestão de incidentes e mudanças.

### Active Directory híbrido

5 procedimentos integrados:
1. **Montar AD de laboratório** → AD DS.
2. **Provar identidade local** → Usuários do AD.
3. **Verificar autenticação** → Kerberos.
4. **Planejar sincronização** → Sincronização, identidade híbrida e conflitos.
5. **Testar continuidade** → Autenticação híbrida PHS, PTA e federação.

### Federação de workload entre clouds

5 procedimentos integrados:
1. **Definir identidade do pipeline** → Workload identity federation e OIDC.
2. **Mapear Azure federation** → Workload identity federation e OIDC.
3. **Mapear AWS role** → AWS STS e identidade federada.
4. **Mapear GCP federation** → Google Cloud Workload Identity Federation.
5. **Concluir segurança** → CIEM e revisão de privilégios multi-cloud.

### Projeto final IAM ponta a ponta

7 procedimentos integrados:
1. **Consolidar contexto** → Projeto IAM ponta a ponta.
2. **Apresentar matrizes** → Projeto IAM ponta a ponta.
3. **Mostrar login e autorização** → Projeto IAM ponta a ponta.
4. **Correlacionar device/data** → Projeto IAM ponta a ponta.
5. **Demonstrar governança avançada** → Projeto IAM ponta a ponta.
6. **Investigar incidente** → Projeto IAM ponta a ponta.
7. **Fazer revisão de segurança** → Projeto IAM ponta a ponta.

O manual [AtlasCorp](./LABORATORIO-ATLASCORP.md) é material de consulta e referência offline, não uma página separada no Roadmap.

## Certificações

As certificações servem como marcos opcionais de carreira; não existe certificado universalmente obrigatório para começar em IAM. Verifique o programa oficial e os requisitos formais atuais antes de se inscrever.

### Iniciante

Conheça vocabulário técnico, identidade e operações básicas.

- Microsoft SC-900: [programa oficial](https://learn.microsoft.com/pt-br/credentials/certifications/security-compliance-and-identity-fundamentals/)
- ITIL Foundation: [programa oficial](https://www.peoplecert.org/)
- Okta Certified Professional: [programa oficial](https://www.okta.com/services/certification/)

### Intermediário

Administração de identidade e certificações complementares da plataforma.

- Microsoft SC-300: [programa oficial](https://learn.microsoft.com/pt-br/credentials/certifications/identity-and-access-administrator/)
- Microsoft AZ-104: [programa oficial](https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/)
- Microsoft MD-102: [programa oficial](https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/)
- Microsoft SC-401: [programa oficial](https://learn.microsoft.com/en-us/credentials/certifications/information-security-administrator/)
- Okta Certified Administrator: [programa oficial](https://www.okta.com/services/certification/)
- Google Associate Cloud Engineer: [programa oficial](https://cloud.google.com/learn/certification/cloud-engineer)
- ISO/IEC 27001 Lead Implementer: [programa oficial](https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001)
- COBIT 2019 Foundation: [programa oficial](https://www.isaca.org/credentialing/cobit-foundation)

### Avançado

Governança especializada, segurança cloud, arquitetura e requisitos profissionais.

- Microsoft SC-100: [programa oficial](https://learn.microsoft.com/pt-br/credentials/certifications/cybersecurity-architect-expert/)
- AWS Security – Specialty: [programa oficial](https://aws.amazon.com/pt/certification/certified-security-specialty/)
- Google Professional Cloud Security Engineer: [programa oficial](https://cloud.google.com/learn/certification/cloud-security-engineer)
- SailPoint Identity Security Engineer: [programa oficial](https://university.sailpoint.com/)
- CyberArk Defender: [programa oficial](https://training.cyberark.com/)
- ISACA CISA: [programa oficial](https://www.isaca.org/credentialing/cisa)
- ISACA CISM: [programa oficial](https://www.isaca.org/credentialing/cism)
- ISC2 CCSP: [programa oficial](https://www.isc2.org/certifications/ccsp)
- ISC2 CISSP: [programa oficial](https://www.isc2.org/certifications/cissp)

## Segurança, licenças e critérios de prática

- Use tenant próprio, usuários e dados fictícios. Diferencie leitura teórica, simulação e execução real.
- Atribuição a grupo funcional, app role, papel administrativo Entra e Azure RBAC não são o mesmo tipo de permissão.
- Entra P2 não licencia automaticamente Intune, Purview, Azure pago nem todos os serviços avançados de Governance.
- Conditional Access deve ser testado com grupo piloto, Report-only, avaliação de logs, acesso emergencial e rollback.
- Para aprofundamento teórico de cada tema, consulte as referências da aula e [o inventário das aulas](./REVISAO-ITEM-A-ITEM.md).

**Revisão:** outubro de 2026.