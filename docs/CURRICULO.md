# Currículo IAM Atlas

> Inventário do conteúdo versão 16/10/2026. Os índices internos são estáveis para preservar progresso salvo.

**28 módulos · 234 tópicos · 16 laboratórios · 24 certificações/frameworks**

## Trilha conceitual (sequência sugerida)

### 01. Fundamentos de TI para IAM

Categoria: Fundamentos. Fase: 01 · Bases e identidades.

Entenda como sistemas e serviços identificam usuários e se comunicam.

**Assuntos (12):** TCP/IP · DNS · HTTP e HTTPS · TLS e certificados · Usuários e permissões Windows · Usuários e permissões Linux · Linha de comando (CLI) · PowerShell · Python básico · APIs REST · JSON · Git

**Fonte inicial:** https://learn.microsoft.com/en-us/windows-server/networking/technologies/network-subsystem/net-sub-interface

### 02. Identidade e segurança

Categoria: Fundamentos. Fase: 01 · Bases e identidades.

Identidade é a representação digital; autenticação comprova identidade, autorização decide acesso e auditoria registra ações.

**Assuntos (13):** Identidade digital · Contas · Credenciais · Atributos de identidade · Autenticação, autorização e auditoria (AAA) · Menor privilégio · Zero Trust · Joiner (admissão) · Mover (movimentação) · Leaver (desligamento) · Políticas IAM · Riscos de identidade · Segregação de funções (SoD)

**Fonte inicial:** https://learn.microsoft.com/en-us/entra/identity/

### 03. Comprovação de identidade e assurance

Categoria: Identidade. Fase: 01 · Bases e identidades.

Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos.

**Assuntos (7):** Identidade declarada e identidade verificada · Identity proofing e IAL · Authenticator assurance e AAL · Federation assurance e FAL · Identificadores imutáveis e correlação · Recuperação de conta e reproofing · Privacidade na gestão de identidades

**Fonte inicial:** https://pages.nist.gov/800-63-4/

### 04. Microsoft Entra ID

Categoria: Plataformas. Fase: 01 · Bases e identidades.

Serviço de identidade Microsoft para usuários, aplicações e controle de acesso na nuvem.

**Assuntos (9):** Tenant Entra ID · Usuários Entra ID · Grupos Entra ID · Roles Entra ID · Enterprise Applications · App Registrations · Conditional Access · MFA Entra ID · Graph API e federação híbrida

**Fonte inicial:** https://learn.microsoft.com/en-us/entra/identity/

### 05. Administração avançada do Microsoft Entra

Categoria: Entra ID. Fase: 02 · Autenticação e autorização.

Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade.

**Assuntos (11):** Domínios verificados e configurações de tenant · Entra roles e escopos administrativos · Administrative Units · Grupos atribuídos e dinâmicos · Atributos personalizados de segurança · Licenças e atribuição por grupo · Entra Connect Sync versus Cloud Sync · Autenticação híbrida PHS, PTA e federação · Microsoft Graph e permissões delegadas · Microsoft Graph com application permissions · Governança de registros de aplicações

**Fonte inicial:** https://learn.microsoft.com/en-us/entra/fundamentals/

### 06. Senhas, MFA e passkeys

Categoria: Autenticação. Fase: 02 · Autenticação e autorização.

A autenticação deve resistir a roubo de credenciais, ataques de phishing e abuso de sessões.

**Assuntos (6):** Senhas e recuperação segura · TOTP · FIDO2 e WebAuthn · Passkeys · Sessões, cookies e revogação · Políticas condicionais e risco

**Fonte inicial:** https://learn.microsoft.com/en-us/entra/identity/authentication/

### 07. Autenticação avançada e Identity Protection

Categoria: Autenticação. Fase: 02 · Autenticação e autorização.

Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável.

**Assuntos (9):** Temporary Access Pass (TAP) · Certificate-Based Authentication (CBA) · Authentication strengths · Passkeys resistentes a phishing · Passwordless e Windows Hello for Business · Identity Protection: riscos de usuário e entrada · Conditional Access report-only · Revogação de sessões e resposta a incidente · Contas de acesso emergencial

**Fonte inicial:** https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass

### 08. Autorização e políticas

Categoria: Acesso. Fase: 02 · Autenticação e autorização.

Autorização aplica regras a recursos: login bem-sucedido não concede todas as permissões.

**Assuntos (7):** RBAC · Modelagem de roles · ABAC · ACL · Negação por padrão · Entitlements e SoD · Testes de autorização no backend

**Fonte inicial:** https://csrc.nist.gov/projects/role-based-access-control

### 09. SSO e SAML 2.0

Categoria: Federação. Fase: 02 · Autenticação e autorização.

Um IdP pode autenticar uma pessoa para múltiplas aplicações mediante relações de confiança.

**Assuntos (8):** Identity Provider (IdP) · Service Provider (SP) · SSO · Metadados SAML · Assertions SAML · Assinaturas SAML · Integração SAML de aplicativo · Investigação de falhas SSO

**Fonte inicial:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

### 10. OAuth 2.0, OIDC e JWT

Categoria: Federação. Fase: 02 · Autenticação e autorização.

OAuth delega autorização; OIDC adiciona autenticação sobre OAuth e declarações de identidade.

**Assuntos (11):** Authorization Code com PKCE · Scopes · Claims · Consentimento OAuth · ID Token · Access Token · JWT · Issuer · Audience · State · Nonce

**Fonte inicial:** https://www.rfc-editor.org/rfc/rfc7636

### 11. Keycloak e Authentik

Categoria: Plataformas. Fase: 02 · Autenticação e autorização.

IdPs de laboratório permitem criar fluxos, gerenciar usuários e integrar aplicações.

**Assuntos (4):** Instalar ambientes de laboratório isolados · Usuários, grupos, roles e políticas · Integrar aplicações OIDC e SAML · Logs e troubleshooting de autenticação

**Fonte inicial:** https://www.keycloak.org/documentation

### 12. Identidades externas e acesso B2B

Categoria: Federação. Fase: 03 · Plataformas e automação.

Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento.

**Assuntos (8):** B2B collaboration e usuários convidados · B2B direct connect · Cross-tenant access settings · Cross-tenant synchronization · External ID para aplicações · Consentimento de aplicativos e publishers · SAML/OIDC entre tenants · Revisão de convidados inativos

**Fonte inicial:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

### 13. Microsoft Intune e identidade de dispositivos

Categoria: Dispositivos. Fase: 03 · Plataformas e automação.

Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo.

**Assuntos (10):** Device registration versus Microsoft Entra Join · Enrollment MDM no Intune · Políticas de compliance · Conditional Access com dispositivo conforme · Configuração de endpoints versus compliance · Enrollment restrictions e escopo · App protection policies (MAM) · BitLocker, chaves e identidades · Windows Hello for Business e dispositivos · Desligamento e retire/wipe

**Fonte inicial:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

### 14. Azure RBAC e autorização de recursos

Categoria: Nuvem. Fase: 03 · Plataformas e automação.

Entenda escopos e atribuições efetivas de autorização para recursos cloud.

**Assuntos (10):** Tenant versus subscription versus management group · Azure RBAC: principal, role e scope · Roles predefinidas versus roles customizadas · NotActions e permissões efetivas · Azure Policy versus Azure RBAC · Managed identities no Azure · Azure Key Vault com RBAC · Azure PIM para recursos · Governança com escopos e tags · Azure Activity Log e auditoria RBAC

**Fonte inicial:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

### 15. Cloud IAM e identidades de workload

Categoria: Nuvem. Fase: 03 · Plataformas e automação.

Recursos cloud e aplicações devem receber somente permissões necessárias e temporárias.

**Assuntos (4):** AWS IAM policies, roles e STS · IAM Identity Center e federação · Service principals e managed identities · Credenciais temporárias e auditoria

**Fonte inicial:** https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

### 16. Identidades não humanas e federação de workloads

Categoria: Workloads. Fase: 03 · Plataformas e automação.

Governance de workloads, service principals, agentes, chaves e tokens de curta duração.

**Assuntos (9):** Service principal e application object · Client credentials e application permissions · Managed identity system-assigned versus user-assigned · Workload identity federation e OIDC · Rotação e expiração de credenciais · Contas de serviço e ownership · Agentes de IA e machine identity · Token exchange e on-behalf-of · CIEM e revisão de privilégios multi-cloud

**Fonte inicial:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

### 17. SCIM e provisionamento JML

Categoria: Automação. Fase: 03 · Plataformas e automação.

A automação sincroniza o ciclo de vida de usuários e acessos entre RH, diretórios e aplicações.

**Assuntos (8):** SCIM Users · SCIM Groups · REST e SCIM · PATCH · Filtros SCIM · Paginação · Provisionamento e desprovisionamento · Reexecução idempotente e tratamento de falhas

**Fonte inicial:** https://www.rfc-editor.org/rfc/rfc7643

### 18. IGA e revisão de acessos

Categoria: Governança. Fase: 03 · Plataformas e automação.

Governança verifica se permissões continuam apropriadas e justificadas ao longo do tempo.

**Assuntos (4):** Catálogo de acessos e ownership · Access requests e aprovações · Recertificação e evidências · SoD, contas órfãs e compliance

**Fonte inicial:** https://learn.microsoft.com/en-us/entra/id-governance/

### 19. Entra Identity Governance em profundidade

Categoria: Governança. Fase: 04 · Governança e defesa.

Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis.

**Assuntos (10):** Access packages e catálogos · Entitlement Management: políticas e expiração · Access Reviews e recertificação · Lifecycle Workflows · Fonte autoritativa de RH · Provisionamento API-driven · Reconciliação e contas órfãs · Segregação de funções preventiva e detectiva · Privileged Identity Management (PIM) · Métricas de governança e evidências

**Fonte inicial:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

### 20. PAM, PIM e JIT

Categoria: Privilegios. Fase: 04 · Governança e defesa.

Privilégios elevados exigem controle adicional, registro e duração limitada.

**Assuntos (6):** Cofre e gestão de segredos · Rotação de credenciais · Onboarding PAM · Contas de serviço · Sessões privilegiadas e auditoria · JIT, break-glass e revisão

**Fonte inicial:** https://developer.hashicorp.com/vault/docs

### 21. Microsoft Purview e controle de acesso a dados

Categoria: Proteção de dados. Fase: 04 · Governança e defesa.

Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação.

**Assuntos (10):** Classificação e inventário da informação · Sensitivity labels · Criptografia e direitos associados a rótulos · Data Loss Prevention (DLP) · Tipos de informações sensíveis e trainable classifiers · Data lifecycle e retention · eDiscovery e investigação · Purview RBAC e separação administrativa · Proteção de informações em endpoints · Interação entre Entra, Intune e Purview

**Fonte inicial:** https://learn.microsoft.com/en-us/purview/information-protection

### 22. Logs, diagnóstico e ITSM

Categoria: Operação IAM. Fase: 04 · Governança e defesa.

IAM também envolve investigar falhas, mudanças e incidentes sem interromper usuários.

**Assuntos (8):** Logs IdP · Logs Active Directory · Logs Entra ID · Diagnóstico SAML · Diagnóstico OIDC · Diagnóstico SCIM · Gestão de incidentes e mudanças · Runbooks, rollback e evidências

**Fonte inicial:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

### 23. KQL, telemetria e investigação IAM

Categoria: Operações. Fase: 04 · Governança e defesa.

Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis.

**Assuntos (9):** Sign-in logs e tipos de entrada · Audit logs de identidade · KQL: where, project e summarize · KQL: joins e correlação · Falhas de Conditional Access · Falhas de provisionamento SCIM · Incidentes de credenciais comprometidas · Dashboards e indicadores de detecção · Retenção, privacidade e cadeia de custódia

**Fonte inicial:** https://learn.microsoft.com/en-us/kusto/query/

### 24. Active Directory e Windows Server

Categoria: Diretórios. Fase: 05 · Híbrido e arquitetura.

Diretórios centralizam objetos e relações de acesso em ambientes corporativos.

**Assuntos (12):** AD DS · Domínio e floresta · Controladores de domínio · Organizational Units (OU) · Usuários do AD · Grupos do AD · GPO · Delegação administrativa · Kerberos · Tickets Kerberos · Service Principal Names (SPN) · Troubleshooting com DNS e Event Viewer

**Fonte inicial:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

### 25. LDAP e identidades híbridas

Categoria: Diretórios. Fase: 05 · Híbrido e arquitetura.

LDAP consulta diretórios; ambientes híbridos conectam identidades locais e nuvem.

**Assuntos (7):** Distinguished Name (DN) · LDAP bind · Filtros LDAP · LDAPS · Atributos e esquema de diretório · Sincronização, identidade híbrida e conflitos · Consulta e auditoria segura de diretório

**Fonte inicial:** https://www.openldap.org/doc/admin26/

### 26. IAM em AWS, Google Cloud e produtos especializados

Categoria: Multi-cloud. Fase: 05 · Híbrido e arquitetura.

Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros.

**Assuntos (9):** AWS IAM: users, groups, roles e policies · AWS STS e identidade federada · AWS Organizations, SCP e limites · AWS IAM Identity Center · Google Cloud IAM: principal, role e resource · Google Cloud Workload Identity Federation · Okta versus Microsoft Entra · SailPoint IGA e ciclo de vida · CyberArk PAM e contas privilegiadas

**Fonte inicial:** https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

### 27. Engenharia de IAM e políticas de autorização

Categoria: Arquitetura. Fase: 05 · Híbrido e arquitetura.

Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis.

**Assuntos (9):** Policy Decision Point e Policy Enforcement Point · ReBAC e autorização por relações · ABAC orientado a recursos · OPA e policy-as-code · Provisionamento SCIM resiliente · Threat modeling para IAM · Fail-safe, resiliência e break-glass · Infraestrutura como código para IAM · Arquitetura de referência e projeto final

**Fonte inicial:** https://www.openpolicyagent.org/docs/

### 28. Zero Trust e arquitetura IAM

Categoria: Arquitetura. Fase: 05 · Híbrido e arquitetura.

Arquiteturas maduras tratam identidades humanas e de máquina com políticas adaptativas e monitoramento.

**Assuntos (4):** Arquitetura de confiança e decisões de acesso · Identidades não humanas e segredos · Threat modeling e resiliência · Projeto IAM ponta a ponta

**Fonte inicial:** https://csrc.nist.gov/pubs/sp/800/207/final

## Laboratórios (trilha prática)

### 01. Preparar laboratório seguro

**Objetivo:** Criar organização fictícia, estrutura de contas de teste e plano de rollback.

**Ferramenta:** Entra ID + VMs opcionais. **Licença/custo:** Gratuito / sujeito a disponibilidade de tenant

**Teoria relacionada:** identidade digital, diretórios, menor privilégio

**Passos:**
1. Defina empresa fictícia AtlasCorp com áreas RH, Financeiro e TI.
2. Registre tenant ID, licenças e limites de uso sem salvar dados sensíveis.
3. Crie usuários fictícios ana.rh, bruno.fin e carla.ti e grupos correspondentes.
4. Estabeleça conta de administração separada e procedimento seguro de acesso emergencial.
5. Documente modelo de nomes, IDs e lista de limpeza do ambiente.

**Evidências obrigatórias:**
- Inventário de objetos fictícios sem segredos.
- Diagrama de tenant, grupos e responsáveis.
- Plano de limpeza e custos/limitações.

**Sem licença:** Desenhe o tenant e implemente usuários/grupos no Keycloak isolado.

**Fonte:** https://learn.microsoft.com/en-us/entra/fundamentals/

### 02. Ciclo de vida Joiner–Mover–Leaver

**Objetivo:** Criar, mover e desligar identidade sem deixar privilégios órfãos.

**Ferramenta:** Entra ID + Graph. **Licença/custo:** Operações básicas; automação avançada pode exigir licença

**Teoria relacionada:** identidade versus conta, JML, ownership, SCIM

**Passos:**
1. Cadastre nova pessoa fictícia em RH e mapeie seus atributos.
2. Crie identidade e atribua grupos mínimos para o cargo.
3. Mude o departamento e compare acessos antigos e novos.
4. Desabilite a conta, revise sessões e remova concessões conforme política.
5. Confronte inventário RH x Entra x aplicação e trate exceções.

**Evidências obrigatórias:**
- Matriz de acesso antes/depois do Mover.
- Log de retirada de permissões no Leaver.
- Relatório de contas órfãs.

**Sem licença:** Simule com CSV, script e Keycloak de laboratório.

**Fonte:** https://learn.microsoft.com/en-us/entra/id-governance/

### 03. Autenticação, passkeys e MFA

**Objetivo:** Demonstrar diferença entre credencial, segundo fator e política.

**Ferramenta:** Entra ID + sign-in logs. **Licença/custo:** MFA básico varia; políticas CA exigem P1; risco exige P2

**Teoria relacionada:** AAL, FIDO2, sessão, risco

**Passos:**
1. Crie usuário e grupo piloto não administrativos.
2. Configure método de autenticação disponível no tenant de teste.
3. Teste login bem-sucedido e falha controlada.
4. Avalie Conditional Access primeiro em modo Report-only, se licenciado.
5. Verifique políticas aplicáveis nos sign-in logs e documente rollback.

**Evidências obrigatórias:**
- Fluxo de autenticação e método empregado.
- Duas decisões de login com evidências.
- Checklist de exclusão emergencial.

**Sem licença:** Configure MFA e OIDC em Keycloak e compare propriedades dos fatores.

**Fonte:** https://learn.microsoft.com/en-us/entra/identity/authentication/

### 04. Autorização e privilégios efetivos

**Objetivo:** Distinguir login, role do diretório, papel de aplicação e permissão Azure.

**Ferramenta:** Entra roles + Azure RBAC + API de teste. **Licença/custo:** Sem custo em simulação; Azure pode gerar cobrança

**Teoria relacionada:** RBAC, ABAC, default deny, scope

**Passos:**
1. Defina recurso Documentos com leitura e escrita.
2. Crie usuários Leitor e Editor em aplicação de teste.
3. Comprove 200 em operação permitida e 403 na proibida.
4. Compare com Entra role administrativa e Azure RBAC em escopos fictícios.
5. Remova concessão e repita o teste.

**Evidências obrigatórias:**
- Matriz de ações e papéis.
- Respostas permitida/negada no backend.
- Comparação entre três modelos RBAC.

**Sem licença:** API local + Keycloak e recursos Azure modelados em tabela.

**Fonte:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

### 05. Federação SAML e OpenID Connect

**Objetivo:** Observar redirects, tokens, sessões e validação de confiança.

**Ferramenta:** Entra ID / Keycloak + app demo. **Licença/custo:** Pode ser gratuito com IdP OSS

**Teoria relacionada:** SAML, OIDC, PKCE, JWT

**Passos:**
1. Registre aplicação fictícia com redirect URI de teste.
2. Configure login OIDC Authorization Code com PKCE ou SAML.
3. Capture metadados não sigilosos e identifique issuer e audience.
4. Simule redirect incorreto ou token expirado e interprete a falha.
5. Registre a correção, remova credenciais de teste e documente riscos.

**Evidências obrigatórias:**
- Diagrama de confiança IdP-SP/RP.
- Registro de login válido e inválido.
- Validações de estado, nonce, issuer e audience descritas.

**Sem licença:** Executar integralmente com Keycloak e cliente de exemplo local.

**Fonte:** https://openid.net/specs/openid-connect-core-1_0.html

### 06. Gerenciamento de convidados B2B

**Objetivo:** Conceder colaboração temporária com sponsor e revisão.

**Ferramenta:** Microsoft Entra External ID. **Licença/custo:** Recursos dependem do tenant; pode ser simulado

**Teoria relacionada:** B2B, cross-tenant, lifecycle

**Passos:**
1. Desenhe projeto que exige convidado externo temporário.
2. Defina quem convida, aprova e é dono do recurso.
3. Configure acesso em tenant(s) de teste elegível ou simule.
4. Revogue colaboração e verifique retirada de grupo e aplicação.
5. Documente tratamento de convidados inativos.

**Evidências obrigatórias:**
- Matriz inbound/outbound.
- Workflow de convite, aprovação e remoção.
- Registro de revisão e owner.

**Sem licença:** Produza fluxo detalhado de B2B com tenant fictício e evidências simuladas.

**Fonte:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

### 07. Intune + Conditional Access

**Objetivo:** Comprovar como compliance alimenta decisões de acesso.

**Ferramenta:** Intune, Entra e dispositivo dedicado. **Licença/custo:** Requer Intune + Entra P1 ou elegibilidade equivalente

**Teoria relacionada:** device identity, compliance, Zero Trust

**Passos:**
1. Prepare um dispositivo de laboratório com propriedade autorizada.
2. Inscreva no Intune se tiver licença e configure política de compliance.
3. Observe estado compliant e noncompliant em teste controlado.
4. Crie política de CA report-only para grupo piloto exigindo dispositivo conforme.
5. Compare log e somente então avalie habilitação; preserve exclusões emergenciais.

**Evidências obrigatórias:**
- Identificador fictício de dispositivo e status.
- Avaliações de política de compliance.
- Sign-in logs correlacionados com Conditional Access.

**Sem licença:** Modele decisões CA a partir de sinais simulados de compliance e documente restrições.

**Fonte:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance

### 08. Managed Identity + Azure RBAC

**Objetivo:** Autorizar workload sem armazenar segredo no código.

**Ferramenta:** Azure + identidade gerenciada + recurso sandbox. **Licença/custo:** Azure pode gerar custo; respeitar orçamento e remover recursos

**Teoria relacionada:** workload identity, role assignment, scope

**Passos:**
1. Projete workload que precisa ler recurso específico.
2. Crie managed identity de laboratório, se houver assinatura autorizada.
3. Atribua somente Reader ou role específica no recurso apropriado.
4. Teste operação permitida e operação explicitamente não autorizada.
5. Colete Activity Log e remova role e recursos para evitar cobrança.

**Evidências obrigatórias:**
- Diagrama de principal, role e scope.
- Acesso permitido e negado.
- Inventário de recursos removidos.

**Sem licença:** Desenhe trust e teste autorização com IdP OSS e API local.

**Fonte:** https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview

### 09. Provisionamento SCIM idempotente

**Objetivo:** Demonstrar criação, alteração e desativação sem duplicatas.

**Ferramenta:** Servidor SCIM de teste + cliente REST. **Licença/custo:** OSS gratuito; conectores podem exigir licença

**Teoria relacionada:** SCIM, PATCH, idempotência, JML

**Passos:**
1. Inicie endpoint SCIM 2.0 isolado ou use um simulador autorizado.
2. Faça POST /Users com dados sintéticos e registre ID.
3. Aplique PATCH e desative conta via active=false.
4. Simule timeout seguido de retry e verifique ausência de duplicação.
5. Documente erros, paginação e mapeamento de atributos.

**Evidências obrigatórias:**
- Requests/Responses sanitizados.
- Estado final correto após retry.
- Mapa de atributos de origem e destino.

**Sem licença:** Use fixture JSON e mock API local com casos positivos e negativos.

**Fonte:** https://www.rfc-editor.org/rfc/rfc7644

### 10. IGA: acesso temporário e recertificação

**Objetivo:** Controlar solicitação, concessão, duração, aprovação e revisão.

**Ferramenta:** Entra Governance ou planilha auditável. **Licença/custo:** Entra ID Governance/P2 conforme recurso; simulação aceita

**Teoria relacionada:** entitlements, SoD, Access Reviews

**Passos:**
1. Crie catálogo fictício com cinco entitlements e respectivos owners.
2. Defina access package com justificativa e prazo.
3. Simule fluxo de aprovação e conflito SoD.
4. Realize revisão periódica com decisões manter/remover.
5. Registre evidências de expiração e revogação.

**Evidências obrigatórias:**
- Inventário de entitlements e responsáveis.
- Trilha de aprovação e exceção.
- Campanha de revisão com decisões.

**Sem licença:** Simulação em planilha CSV versionada com logs dos estados.

**Fonte:** https://learn.microsoft.com/en-us/entra/id-governance/

### 11. PAM, PIM e break-glass

**Objetivo:** Diferenciar elevação temporária, gestão de segredo e recuperação emergencial.

**Ferramenta:** Entra PIM + Vault de laboratório. **Licença/custo:** PIM requer elegibilidade de licença; cofre local OSS opcional

**Teoria relacionada:** PIM, PAM, JIT, least privilege

**Passos:**
1. Identifique role crítica e processo de autorização.
2. Configure ou modele ativação elegível por prazo e justificativa.
3. Registre acesso antes, durante e depois do prazo.
4. Modele uso de Vault de desenvolvimento isolado para segredo fictício.
5. Teste procedimento de emergência apenas em ambiente controlado.

**Evidências obrigatórias:**
- Linha do tempo de elevação e expiração.
- Registro de sessão/operação privilegiada.
- Runbook de emergência com auditoria.

**Sem licença:** Modelo de aprovação + Vault local em VM isolada; não simular em produção.

**Fonte:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

### 12. Purview: classificação, rótulos e DLP

**Objetivo:** Proteger dados conforme identidade e sensibilidade do documento.

**Ferramenta:** Purview + arquivos fictícios. **Licença/custo:** Requer licenças Purview/M365 compatíveis conforme recurso

**Teoria relacionada:** classificação, sensibilidade, DLP, autorização

**Passos:**
1. Defina taxonomia Público/Interno/Confidencial para documentos fictícios.
2. Crie ou simule sensitivity label Confidencial.
3. Modele criptografia e acesso permitido a um grupo, negado a outro.
4. Defina regra DLP em modo de auditoria antes de qualquer bloqueio.
5. Documente evento, exceções e revisão com owner de informação.

**Evidências obrigatórias:**
- Taxonomia e donos dos dados.
- Matriz de acesso documento-grupo.
- Regra DLP e evidência de avaliação.

**Sem licença:** Simule classificação, controles e falsos positivos sobre arquivos sintéticos.

**Fonte:** https://learn.microsoft.com/en-us/purview/information-protection

### 13. Investigação IAM com KQL

**Objetivo:** Diferenciar falha de credencial, CA, sessão e provisionamento.

**Ferramenta:** Sign-in logs + AuditLogs + KQL. **Licença/custo:** Entra logs básicos; exportação/workspace podem custar

**Teoria relacionada:** correlação, KQL, incidentes

**Passos:**
1. Produza tentativas de entrada válidas e inválidas com conta de teste.
2. Relacione horário, usuário, aplicação, correlation ID e resultado.
3. Escreva consulta KQL filtrando falhas em dados sintéticos ou workspace disponível.
4. Altere uma associação de grupo e localize o evento de auditoria.
5. Documente hipótese, evidência, correção e teste de confirmação.

**Evidências obrigatórias:**
- Linha do tempo de incidente sintético.
- Consulta KQL reproduzível.
- Runbook com causa e validação após correção.

**Sem licença:** Execute KQL conceitual sobre dados fictícios; não inclua logs pessoais reais.

**Fonte:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

### 14. Active Directory híbrido

**Objetivo:** Associar identidades locais a cloud sem confundir LDAP, Kerberos e sincronização.

**Ferramenta:** Windows Server AD DS + Entra. **Licença/custo:** Windows Server avaliação sob termos aplicáveis; VMs isoladas

**Teoria relacionada:** Kerberos, LDAP, fonte autoritativa

**Passos:**
1. Monte AD DS e cliente em rede virtual isolada.
2. Crie OU, grupos e usuários de laboratório.
3. Valide DNS SRV, klist e consulta LDAPS segura.
4. Desenhe ou implemente sincronização elegível para Entra.
5. Execute Mover e observe impactos em atributos de origem/destino.

**Evidências obrigatórias:**
- Diagrama híbrido e identificadores de correlação.
- Resultados de DNS/Kerberos/LDAPS.
- Matriz de fonte de autoridade e falhas.

**Sem licença:** OpenLDAP e Keycloak para parte prática; documentação para híbrido Microsoft.

**Fonte:** https://learn.microsoft.com/en-us/entra/identity/hybrid/

### 15. Federação de workload entre clouds

**Objetivo:** Comparar relações de confiança para workloads sem secrets permanentes.

**Ferramenta:** AWS STS + GCP WIF + Entra workload ID. **Licença/custo:** Sandboxes AWS/GCP podem gerar custos

**Teoria relacionada:** STS, OIDC issuer, trust policy

**Passos:**
1. Desenhe pipeline OIDC com sujeito identificável.
2. Mapeie condições de trust no Azure, AWS e GCP.
3. Simule credencial aceita e negada quando subject difere.
4. Compare duração e escopo de permissões temporárias.
5. Documente plano de remoção e limites de equivalência.

**Evidências obrigatórias:**
- Diagrama emissor-trust-target por cloud.
- Tabela de políticas permitidas/negadas.
- Avaliação de expiração, risco e revogação.

**Sem licença:** Use somente diagramas e policies fictícias sem provisionar recursos pagos.

**Fonte:** https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html

### 16. Projeto final IAM ponta a ponta

**Objetivo:** Projetar e defender IAM empresarial com identidade humana, dispositivo, workload, dados e governança.

**Ferramenta:** Entra + Intune + Azure + Purview + OSS. **Licença/custo:** Combine laboratórios executados e simulações onde licenças não permitem

**Teoria relacionada:** Zero Trust, IAM, IGA, PAM, auditoria

**Passos:**
1. Consolide cenário AtlasCorp com RH, Financeiro, TI e parceiro externo.
2. Entregue desenho da arquitetura e matriz de acesso por identidade/recurso/dado.
3. Implemente login federado e três casos permitidos ou negados.
4. Execute JML, revisão de acesso e elevação privilegiada controlada.
5. Inclua conformidade de endpoint, proteção de dado e identidade de workload.
6. Apresente investigação IAM e plano de rollback, custo e continuidade.

**Evidências obrigatórias:**
- Arquitetura versionada com fronteiras de confiança.
- Evidências sanitizadas de testes positivos e negativos.
- RACI, métricas, auditoria, riscos residuais e rollback.

**Sem licença:** Separe claramente implementação real, simulação e item apenas teórico.

**Fonte:** https://csrc.nist.gov/pubs/sp/800/207/final

## Certificações e frameworks

> O currículo não substitui os objetivos oficiais de cada exame nem garante aprovação.

| Item | Categoria | Prioridade | Fonte |
| --- | --- | --- | --- |
| Microsoft SC-900 | Fundamental | Essencial | [Oficial](https://learn.microsoft.com/pt-br/credentials/certifications/security-compliance-and-identity-fundamentals/) |
| AWS Security – Specialty | Avançado · Cloud | Opcional | [Oficial](https://aws.amazon.com/pt/certification/certified-security-specialty/) |
| Microsoft SC-300 | Intermediário | Essencial | [Oficial](https://learn.microsoft.com/pt-br/credentials/certifications/identity-and-access-administrator/) |
| Microsoft SC-100 | Especialista · Arquitetura | Opcional | [Oficial](https://learn.microsoft.com/pt-br/credentials/certifications/cybersecurity-architect-expert/) |
| ITIL Foundation | Fundamental · ITSM | Opcional | [Oficial](https://www.peoplecert.org/) |
| Okta Certified Professional | Fundamental · SSO | Opcional | [Oficial](https://www.okta.com/services/certification/) |
| Okta Certified Administrator | Intermediário · IAM | Opcional | [Oficial](https://www.okta.com/services/certification/) |
| Google Associate Cloud Engineer | Intermediário · Cloud | Opcional | [Oficial](https://cloud.google.com/learn/certification/cloud-engineer) |
| Google Professional Cloud Security Engineer | Avançado · Cloud | Opcional | [Oficial](https://cloud.google.com/learn/certification/cloud-security-engineer) |
| SailPoint Identity Security Engineer | Avançado · IGA | Opcional | [Oficial](https://university.sailpoint.com/) |
| CyberArk Defender | Avançado · PAM | Opcional | [Oficial](https://training.cyberark.com/) |
| ISO/IEC 27001 Lead Implementer | Intermediário · GRC | Opcional | [Oficial](https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001) |
| COBIT 2019 Foundation | Intermediário · GRC | Opcional | [Oficial](https://www.isaca.org/credentialing/cobit-foundation) |
| ISACA CISA | Avançado · Auditoria | Opcional | [Oficial](https://www.isaca.org/credentialing/cisa) |
| ISACA CISM | Avançado · Gestão | Opcional | [Oficial](https://www.isaca.org/credentialing/cism) |
| ISC2 CCSP | Avançado · Cloud | Opcional | [Oficial](https://www.isc2.org/certifications/ccsp) |
| ISC2 CISSP | Especialista · Segurança | Opcional | [Oficial](https://www.isc2.org/certifications/cissp) |
| NIST CSF 2.0 / SP 800-63 / SP 800-207 | Framework · Zero Trust | Estudo essencial | [Oficial](https://www.nist.gov/cyberframework) |
| CIS Critical Security Controls v8.1 | Framework · Controles | Estudo essencial | [Oficial](https://www.cisecurity.org/controls) |
| NIST SP 800-53 | Framework · Controles | Estudo essencial | [Oficial](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) |
| Microsoft AZ-104 | Intermediário · Azure | Complementar | [Oficial](https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/) |
| Microsoft MD-102 | Intermediário · Endpoint | Complementar | [Oficial](https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/) |
| Microsoft SC-401 | Intermediário · Dados | Complementar | [Oficial](https://learn.microsoft.com/en-us/credentials/certifications/information-security-administrator/) |
| Google Professional Cloud Security Engineer | Avançado · Multi-cloud | Opcional | [Oficial](https://cloud.google.com/learn/certification/cloud-security-engineer) |

## Metodologia de avaliação

Cada tópico contém conceito, por que importa, onde aplicar, passos práticos, critério de aceite e fonte. Concluir a prática exige registrar evidências (sanitizadas) de resultado esperado, acesso negado ou falha tratada. Onde a execução não é possível, deve ser documentada como simulação ou exercício teórico — jamais apresentada como experiência no produto.

Progresso de tópicos, evidências de laboratório e obtenção de certificados são autoavaliados e independentes.
