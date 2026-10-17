# Currículo guiado — IAM Atlas

**29 módulos · 242 temas · 16 laboratórios · 24 entradas de certificação/frameworks**

## Percurso teórico recomendado

Cada módulo está organizado por competência, com conceito, pré-requisitos, prática, teste adverso, diagnóstico e links. Visite [a auditoria por tópico](./REVISAO-ITEM-A-ITEM.md) para consultar as instruções de todas as aulas.

### 1. Fundamentos de TI para IAM

**Fase:** 01 · Bases e identidades. **Área:** Fundamentos. **Tópicos:** 12

Entenda como sistemas e serviços identificam usuários e se comunicam.

1. TCP/IP
2. DNS
3. HTTP e HTTPS
4. TLS e certificados
5. Usuários e permissões Windows
6. Usuários e permissões Linux
7. Linha de comando (CLI)
8. PowerShell
9. Python básico
10. APIs REST
11. JSON
12. Git

### 2. Identidade e segurança

**Fase:** 01 · Bases e identidades. **Área:** Fundamentos. **Tópicos:** 13

Identidade é a representação digital; autenticação comprova identidade, autorização decide acesso e auditoria registra ações.

1. Identidade digital
2. Contas
3. Credenciais
4. Atributos de identidade
5. Autenticação, autorização e auditoria (AAA)
6. Menor privilégio
7. Zero Trust
8. Joiner (admissão)
9. Mover (movimentação)
10. Leaver (desligamento)
11. Políticas IAM
12. Riscos de identidade
13. Segregação de funções (SoD)

### 3. Comprovação de identidade e assurance

**Fase:** 01 · Bases e identidades. **Área:** Identidade. **Tópicos:** 7

Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos.

1. Identidade declarada e identidade verificada
2. Identity proofing e IAL
3. Authenticator assurance e AAL
4. Federation assurance e FAL
5. Identificadores imutáveis e correlação
6. Recuperação de conta e reproofing
7. Privacidade na gestão de identidades

### 4. Microsoft Entra ID

**Fase:** 01 · Bases e identidades. **Área:** Plataformas. **Tópicos:** 9

Serviço de identidade Microsoft para usuários, aplicações e controle de acesso na nuvem.

1. Tenant Entra ID
2. Usuários Entra ID
3. Grupos Entra ID
4. Roles Entra ID
5. Enterprise Applications
6. App Registrations
7. Conditional Access
8. MFA Entra ID
9. Graph API e federação híbrida

### 5. Administração avançada do Microsoft Entra

**Fase:** 02 · Autenticação e autorização. **Área:** Entra ID. **Tópicos:** 11

Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade.

1. Domínios verificados e configurações de tenant
2. Entra roles e escopos administrativos
3. Administrative Units
4. Grupos atribuídos e dinâmicos
5. Atributos personalizados de segurança
6. Licenças e atribuição por grupo
7. Entra Connect Sync versus Cloud Sync
8. Autenticação híbrida PHS, PTA e federação
9. Microsoft Graph e permissões delegadas
10. Microsoft Graph com application permissions
11. Governança de registros de aplicações

### 6. Senhas, MFA e passkeys

**Fase:** 02 · Autenticação e autorização. **Área:** Autenticação. **Tópicos:** 6

A autenticação deve resistir a roubo de credenciais, ataques de phishing e abuso de sessões.

1. Senhas e recuperação segura
2. TOTP
3. FIDO2 e WebAuthn
4. Passkeys
5. Sessões, cookies e revogação
6. Políticas condicionais e risco

### 7. Autenticação avançada e Identity Protection

**Fase:** 02 · Autenticação e autorização. **Área:** Autenticação. **Tópicos:** 9

Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável.

1. Temporary Access Pass (TAP)
2. Certificate-Based Authentication (CBA)
3. Authentication strengths
4. Passkeys resistentes a phishing
5. Passwordless e Windows Hello for Business
6. Identity Protection: riscos de usuário e entrada
7. Conditional Access report-only
8. Revogação de sessões e resposta a incidente
9. Contas de acesso emergencial

### 8. Autorização e políticas

**Fase:** 02 · Autenticação e autorização. **Área:** Acesso. **Tópicos:** 7

Autorização aplica regras a recursos: login bem-sucedido não concede todas as permissões.

1. RBAC
2. Modelagem de roles
3. ABAC
4. ACL
5. Negação por padrão
6. Entitlements e SoD
7. Testes de autorização no backend

### 9. SSO e SAML 2.0

**Fase:** 02 · Autenticação e autorização. **Área:** Federação. **Tópicos:** 8

Um IdP pode autenticar uma pessoa para múltiplas aplicações mediante relações de confiança.

1. Identity Provider (IdP)
2. Service Provider (SP)
3. SSO
4. Metadados SAML
5. Assertions SAML
6. Assinaturas SAML
7. Integração SAML de aplicativo
8. Investigação de falhas SSO

### 10. OAuth 2.0, OIDC e JWT

**Fase:** 02 · Autenticação e autorização. **Área:** Federação. **Tópicos:** 11

OAuth delega autorização; OIDC adiciona autenticação sobre OAuth e declarações de identidade.

1. Authorization Code com PKCE
2. Scopes
3. Claims
4. Consentimento OAuth
5. ID Token
6. Access Token
7. JWT
8. Issuer
9. Audience
10. State
11. Nonce

### 11. Keycloak e Authentik

**Fase:** 02 · Autenticação e autorização. **Área:** Plataformas. **Tópicos:** 4

IdPs de laboratório permitem criar fluxos, gerenciar usuários e integrar aplicações.

1. Instalar ambientes de laboratório isolados
2. Usuários, grupos, roles e políticas
3. Integrar aplicações OIDC e SAML
4. Logs e troubleshooting de autenticação

### 12. Identidades externas e acesso B2B

**Fase:** 03 · Plataformas e automação. **Área:** Federação. **Tópicos:** 8

Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento.

1. B2B collaboration e usuários convidados
2. B2B direct connect
3. Cross-tenant access settings
4. Cross-tenant synchronization
5. External ID para aplicações
6. Consentimento de aplicativos e publishers
7. SAML/OIDC entre tenants
8. Revisão de convidados inativos

### 13. Microsoft Intune e identidade de dispositivos

**Fase:** 03 · Plataformas e automação. **Área:** Dispositivos. **Tópicos:** 10

Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo.

1. Device registration versus Microsoft Entra Join
2. Enrollment MDM no Intune
3. Políticas de compliance
4. Conditional Access com dispositivo conforme
5. Configuração de endpoints versus compliance
6. Enrollment restrictions e escopo
7. App protection policies (MAM)
8. BitLocker, chaves e identidades
9. Windows Hello for Business e dispositivos
10. Desligamento e retire/wipe

### 14. Acesso adaptativo, Global Secure Access e proteção de sessões

**Fase:** 03 · Plataformas e automação. **Área:** Acesso adaptativo. **Tópicos:** 8

Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos.

1. Application Proxy para aplicações locais
2. Continuous Access Evaluation (CAE)
3. Authentication context
4. Protected actions
5. Global Secure Access: arquitetura
6. Entra Private Access
7. Entra Internet Access
8. Perfis de tráfego e cliente Global Secure Access

### 15. Azure RBAC e autorização de recursos

**Fase:** 03 · Plataformas e automação. **Área:** Nuvem. **Tópicos:** 10

Entenda escopos e atribuições efetivas de autorização para recursos cloud.

1. Tenant versus subscription versus management group
2. Azure RBAC: principal, role e scope
3. Roles predefinidas versus roles customizadas
4. NotActions e permissões efetivas
5. Azure Policy versus Azure RBAC
6. Managed identities no Azure
7. Azure Key Vault com RBAC
8. Azure PIM para recursos
9. Governança com escopos e tags
10. Azure Activity Log e auditoria RBAC

### 16. Cloud IAM e identidades de workload

**Fase:** 03 · Plataformas e automação. **Área:** Nuvem. **Tópicos:** 4

Recursos cloud e aplicações devem receber somente permissões necessárias e temporárias.

1. AWS IAM policies, roles e STS
2. IAM Identity Center e federação
3. Service principals e managed identities
4. Credenciais temporárias e auditoria

### 17. Identidades não humanas e federação de workloads

**Fase:** 03 · Plataformas e automação. **Área:** Workloads. **Tópicos:** 9

Governance de workloads, service principals, agentes, chaves e tokens de curta duração.

1. Service principal e application object
2. Client credentials e application permissions
3. Managed identity system-assigned versus user-assigned
4. Workload identity federation e OIDC
5. Rotação e expiração de credenciais
6. Contas de serviço e ownership
7. Agentes de IA e machine identity
8. Token exchange e on-behalf-of
9. CIEM e revisão de privilégios multi-cloud

### 18. SCIM e provisionamento JML

**Fase:** 03 · Plataformas e automação. **Área:** Automação. **Tópicos:** 8

A automação sincroniza o ciclo de vida de usuários e acessos entre RH, diretórios e aplicações.

1. SCIM Users
2. SCIM Groups
3. REST e SCIM
4. PATCH
5. Filtros SCIM
6. Paginação
7. Provisionamento e desprovisionamento
8. Reexecução idempotente e tratamento de falhas

### 19. IGA e revisão de acessos

**Fase:** 03 · Plataformas e automação. **Área:** Governança. **Tópicos:** 4

Governança verifica se permissões continuam apropriadas e justificadas ao longo do tempo.

1. Catálogo de acessos e ownership
2. Access requests e aprovações
3. Recertificação e evidências
4. SoD, contas órfãs e compliance

### 20. Entra Identity Governance em profundidade

**Fase:** 04 · Governança e defesa. **Área:** Governança. **Tópicos:** 10

Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis.

1. Access packages e catálogos
2. Entitlement Management: políticas e expiração
3. Access Reviews e recertificação
4. Lifecycle Workflows
5. Fonte autoritativa de RH
6. Provisionamento API-driven
7. Reconciliação e contas órfãs
8. Segregação de funções preventiva e detectiva
9. Privileged Identity Management (PIM)
10. Métricas de governança e evidências

### 21. PAM, PIM e JIT

**Fase:** 04 · Governança e defesa. **Área:** Privilegios. **Tópicos:** 6

Privilégios elevados exigem controle adicional, registro e duração limitada.

1. Cofre e gestão de segredos
2. Rotação de credenciais
3. Onboarding PAM
4. Contas de serviço
5. Sessões privilegiadas e auditoria
6. JIT, break-glass e revisão

### 22. Microsoft Purview e controle de acesso a dados

**Fase:** 04 · Governança e defesa. **Área:** Proteção de dados. **Tópicos:** 10

Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação.

1. Classificação e inventário da informação
2. Sensitivity labels
3. Criptografia e direitos associados a rótulos
4. Data Loss Prevention (DLP)
5. Tipos de informações sensíveis e trainable classifiers
6. Data lifecycle e retention
7. eDiscovery e investigação
8. Purview RBAC e separação administrativa
9. Proteção de informações em endpoints
10. Interação entre Entra, Intune e Purview

### 23. Logs, diagnóstico e ITSM

**Fase:** 04 · Governança e defesa. **Área:** Operação IAM. **Tópicos:** 8

IAM também envolve investigar falhas, mudanças e incidentes sem interromper usuários.

1. Logs IdP
2. Logs Active Directory
3. Logs Entra ID
4. Diagnóstico SAML
5. Diagnóstico OIDC
6. Diagnóstico SCIM
7. Gestão de incidentes e mudanças
8. Runbooks, rollback e evidências

### 24. KQL, telemetria e investigação IAM

**Fase:** 04 · Governança e defesa. **Área:** Operações. **Tópicos:** 9

Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis.

1. Sign-in logs e tipos de entrada
2. Audit logs de identidade
3. KQL: where, project e summarize
4. KQL: joins e correlação
5. Falhas de Conditional Access
6. Falhas de provisionamento SCIM
7. Incidentes de credenciais comprometidas
8. Dashboards e indicadores de detecção
9. Retenção, privacidade e cadeia de custódia

### 25. Active Directory e Windows Server

**Fase:** 05 · Híbrido e arquitetura. **Área:** Diretórios. **Tópicos:** 12

Diretórios centralizam objetos e relações de acesso em ambientes corporativos.

1. AD DS
2. Domínio e floresta
3. Controladores de domínio
4. Organizational Units (OU)
5. Usuários do AD
6. Grupos do AD
7. GPO
8. Delegação administrativa
9. Kerberos
10. Tickets Kerberos
11. Service Principal Names (SPN)
12. Troubleshooting com DNS e Event Viewer

### 26. LDAP e identidades híbridas

**Fase:** 05 · Híbrido e arquitetura. **Área:** Diretórios. **Tópicos:** 7

LDAP consulta diretórios; ambientes híbridos conectam identidades locais e nuvem.

1. Distinguished Name (DN)
2. LDAP bind
3. Filtros LDAP
4. LDAPS
5. Atributos e esquema de diretório
6. Sincronização, identidade híbrida e conflitos
7. Consulta e auditoria segura de diretório

### 27. IAM em AWS, Google Cloud e produtos especializados

**Fase:** 05 · Híbrido e arquitetura. **Área:** Multi-cloud. **Tópicos:** 9

Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros.

1. AWS IAM: users, groups, roles e policies
2. AWS STS e identidade federada
3. AWS Organizations, SCP e limites
4. AWS IAM Identity Center
5. Google Cloud IAM: principal, role e resource
6. Google Cloud Workload Identity Federation
7. Okta versus Microsoft Entra
8. SailPoint IGA e ciclo de vida
9. CyberArk PAM e contas privilegiadas

### 28. Engenharia de IAM e políticas de autorização

**Fase:** 05 · Híbrido e arquitetura. **Área:** Arquitetura. **Tópicos:** 9

Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis.

1. Policy Decision Point e Policy Enforcement Point
2. ReBAC e autorização por relações
3. ABAC orientado a recursos
4. OPA e policy-as-code
5. Provisionamento SCIM resiliente
6. Threat modeling para IAM
7. Fail-safe, resiliência e break-glass
8. Infraestrutura como código para IAM
9. Arquitetura de referência e projeto final

### 29. Zero Trust e arquitetura IAM

**Fase:** 05 · Híbrido e arquitetura. **Área:** Arquitetura. **Tópicos:** 4

Arquiteturas maduras tratam identidades humanas e de máquina com políticas adaptativas e monitoramento.

1. Arquitetura de confiança e decisões de acesso
2. Identidades não humanas e segredos
3. Threat modeling e resiliência
4. Projeto IAM ponta a ponta

## Laboratórios detalhados

Execute em tenant e recursos de laboratório sob seu controle. Verifique custo, permissões e licenças antes de criar recursos; trate como simulação quando o produto não estiver disponível.

### 1. Preparar laboratório seguro

**Objetivo:** Criar organização fictícia, estrutura de contas de teste e plano de rollback.

**Ferramentas:** Entra ID + VMs opcionais. **Licença:** Gratuito / sujeito a disponibilidade de tenant. **Tempo estimado:** 60–120 minutos

**Pré-requisitos:**
- Conta de administrador apenas do tenant de laboratório; jamais de empresa real.
- Identifique licenças disponíveis e anote o orçamento máximo, mesmo que zero.

**Procedimento:**
1. Desenhe a AtlasCorp com RH, Financeiro, TI, 3 pessoas fictícias e 3 grupos funcionais.
2. Acesse entra.microsoft.com em tenant de laboratório e localize Entra ID > Overview para registrar apenas tenant ID parcialmente mascarado.
3. Verifique as licenças disponíveis em Billing/Licenses ou na visão equivalente, sem iniciar compras.
4. Crie três usuários fictícios no diretório e defina atribuições mínimas; não utilize nomes reais.
5. Crie grupos GRP-RH, GRP-FIN e GRP-TI e adicione cada usuário ao grupo correspondente.
6. Crie uma matriz com usuário, ID mascarado, departamento, função e grupos.
7. Use uma conta administrativa separada; defina como recuperar acesso se a conta de teste ficar bloqueada.
8. Faça logout e valide que cada usuário de teste existe e possui os grupos pretendidos.
9. Retire qualquer função elevada adicionada apenas para testar e registre a limpeza.

**Resultado esperado:** Três usuários e três grupos registrados, associação consistente com o organograma e plano de recuperação/limpeza.

**Diagnóstico:** Se não conseguir criar usuário: revise tenant selecionado, permissão administrativa e limites/licenças; não eleve privilégio em tenant alheio.

**Limpeza:** Excluir apenas objetos fictícios do laboratório quando terminar o percurso; preserve contas que serão reutilizadas nos laboratórios seguintes.

**Evidências:**
- Inventário de objetos fictícios sem segredos.
- Diagrama de tenant, grupos e responsáveis.
- Plano de limpeza e custos/limitações.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Desenhe o tenant e implemente usuários/grupos no Keycloak isolado.

**Documentação:** https://learn.microsoft.com/en-us/entra/fundamentals/

### 2. Ciclo de vida Joiner–Mover–Leaver

**Objetivo:** Criar, mover e desligar identidade sem deixar privilégios órfãos.

**Ferramentas:** Entra ID + Graph. **Licença:** Operações básicas; automação avançada pode exigir licença. **Tempo estimado:** 90–150 minutos

**Pré-requisitos:**
- Lab-00 concluído ou ambiente equivalente.
- Planilha fictícia de RH com employeeId estável e cargo.

**Procedimento:**
1. Crie CSV sintético employeeId,displayName,department,manager,status sem CPF nem dados reais.
2. Escolha employeeId como chave de correlação e UPN como identificador de login; documente diferenças.
3. Simule evento Joiner de uma nova pessoa na planilha.
4. Crie a conta no Entra e atribua o grupo mínimo de acordo com seu departamento.
5. Registre grupos e acesso a uma aplicação fictícia antes de qualquer alteração.
6. Altere o departamento de RH para Financeiro e remova o grupo RH, sem acumular ambos por padrão.
7. Adicione somente grupos necessários a Financeiro e valide acesso autorizado versus recurso de RH negado.
8. Simule Leaver, bloqueie login de teste e documente revogação de sessões e permissões; observe que revogação pode não ser imediata em todos os serviços.
9. Compare relação de empregados ativos com contas no diretório e gere relatório de órfãos.
10. Faça auditoria de eventos e restaure somente as contas necessárias para os labs seguintes.

**Resultado esperado:** Matriz JML com acesso concedido, transferido e removido e nenhuma conta ativa sem dono.

**Diagnóstico:** Se grupos não refletirem mudança, cheque sincronização/escopo/fonte autoritativa e atraso de propagação; não crie um segundo usuário para contornar o erro.

**Limpeza:** Revogar acessos de desligados fictícios; conservar conta neutra para reutilização apenas se necessário.

**Evidências:**
- Matriz de acesso antes/depois do Mover.
- Log de retirada de permissões no Leaver.
- Relatório de contas órfãs.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Simule com CSV, script e Keycloak de laboratório.

**Documentação:** https://learn.microsoft.com/en-us/entra/id-governance/

### 3. Autenticação, passkeys e MFA

**Objetivo:** Demonstrar diferença entre credencial, segundo fator e política.

**Ferramentas:** Entra ID + sign-in logs. **Licença:** MFA básico varia; políticas CA exigem P1; risco exige P2. **Tempo estimado:** 90–180 minutos

**Pré-requisitos:**
- Lab-00 e conta de teste sem privilégios administrativos.
- Conditional Access somente com licenciamento elegível; acesso de emergência testado.

**Procedimento:**
1. No Entra, abra Protection > Authentication methods e identifique métodos disponíveis, sem alterar política global.
2. Associe um método elegível à conta piloto e conclua registro pelo próprio usuário.
3. Teste login válido e registre hora, aplicativo, método e resultado nos sign-in logs.
4. Provoque uma senha inválida com poucas tentativas no usuário fictício; evite travar contas reais.
5. Se houver Entra P1, crie grupo GRP-LAB-CA e inclua exclusivamente a conta piloto.
6. Crie política Conditional Access de MFA sobre aplicativo de teste em modo Report-only, com contas emergenciais excluídas.
7. Efetue novo login piloto e observe resultado report-only; anote se a avaliação exigiria MFA.
8. Valide se haveria impacto em contas de serviço, convidados ou administradores fora do piloto.
9. Ative somente se o teste estiver correto e existir método de recuperação; repita teste esperado e bloqueio controlado.
10. Desative/remova a política piloto e compare novamente sign-in logs; registre limitações de licença.

**Resultado esperado:** Comparação de métodos MFA e logs com decisão real versus report-only, sem bloquear contas de emergência.

**Diagnóstico:** Se não aparecer Conditional Access, primeiro confirme Entra P1; se método não for elegível, confirme Authentication methods policy e grupos.

**Limpeza:** Desligar política piloto e remover grupo teste; manter apenas os métodos de autenticação planejados para o tenant de laboratório.

**Evidências:**
- Fluxo de autenticação e método empregado.
- Duas decisões de login com evidências.
- Checklist de exclusão emergencial.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Configure MFA e OIDC em Keycloak e compare propriedades dos fatores.

**Documentação:** https://learn.microsoft.com/en-us/entra/identity/authentication/

### 4. Autorização e privilégios efetivos

**Objetivo:** Distinguir login, role do diretório, papel de aplicação e permissão Azure.

**Ferramentas:** Entra roles + Azure RBAC + API de teste. **Licença:** Sem custo em simulação; Azure pode gerar cobrança. **Tempo estimado:** 100–180 minutos

**Pré-requisitos:**
- Entendimento de RBAC versus autenticação.
- App de API fictícia ou simulador com GET e PATCH.

**Procedimento:**
1. Defina uma API fictícia /documents/{id} com duas operações: GET e PATCH.
2. Escreva matriz Leitor:GET, Editor:GET+PATCH, OutroProjeto:nenhum acesso a documentos alheios.
3. Implemente ou configure validação de role e owner no backend; esconder botões da UI não conta.
4. Autentique como Leitor e faça GET do documento permitido; registre status HTTP e ID do recurso sintético.
5. Como Leitor, tente PATCH; confirme 403 em ambiente configurado corretamente.
6. Como Editor, faça PATCH do documento autorizado e confirme sucesso.
7. Como Editor, tente acessar documento de outro projeto para testar autorização em nível de objeto.
8. Compare o modelo de app roles com uma função administrativa Entra e Azure RBAC em exemplos separados.
9. Remova a role temporária e repita GET/PATCH para verificar mudança efetiva de acesso.
10. Escreva testes automatizados para negação sem role e objeto de outro projeto.

**Resultado esperado:** Matriz de papéis e resultados 200/403 coerentes, inclusive validação de ownership no servidor.

**Diagnóstico:** Se acesso negado funcionar apenas na UI, a API está vulnerável; verifique middleware e validação em cada endpoint.

**Limpeza:** Apagar dados de documentos sintéticos e remover roles temporárias.

**Evidências:**
- Matriz de ações e papéis.
- Respostas permitida/negada no backend.
- Comparação entre três modelos RBAC.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** API local + Keycloak e recursos Azure modelados em tabela.

**Documentação:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

### 5. Federação SAML e OpenID Connect

**Objetivo:** Observar redirects, tokens, sessões e validação de confiança.

**Ferramentas:** Entra ID / Keycloak + app demo. **Licença:** Pode ser gratuito com IdP OSS. **Tempo estimado:** 120–210 minutos

**Pré-requisitos:**
- Conceitos de HTTP, cookies, TLS, OIDC e credenciais de app.
- IdP Keycloak local ou Entra e cliente de exemplo autorizado.

**Procedimento:**
1. Crie realm/tenant de teste, usuário fictício e client OIDC com redirect URI exata.
2. Configure fluxo Authorization Code com PKCE no cliente público e gere valores state e nonce.
3. Inicie autenticação e anote URLs de autorização, autorização do usuário e callback sem copiar secrets.
4. Troque code por tokens e identifique audience, issuer, exp, nonce e escopos de dados de teste.
5. Registre em tabela separada finalidade do ID token e do access token.
6. Acesse endpoint de API com access token destinado a ele; valide público e escopos.
7. Altere somente em ambiente de teste a redirect URI para valor não registrado; observe rejeição do IdP.
8. Simule audience indevida no token e demonstre rejeição pela API de teste.
9. Se praticar SAML, exporte metadados e verifique assinatura, ACS, entityID e validade das assertions.
10. Restaure URI correta e finalize sessão, apagando tokens salvos em ferramentas locais.

**Resultado esperado:** Duas integrações documentadas com validações de segurança e casos de falha intencionais.

**Diagnóstico:** Erros comuns: mismatch de redirect URI, issuer/audience, relógio e ausência de PKCE; compare mensagens dos dois lados.

**Limpeza:** Revogar secrets temporários, excluir client de teste não reutilizado e limpar histórico com credenciais.

**Evidências:**
- Diagrama de confiança IdP-SP/RP.
- Registro de login válido e inválido.
- Validações de estado, nonce, issuer e audience descritas.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Executar integralmente com Keycloak e cliente de exemplo local.

**Documentação:** https://openid.net/specs/openid-connect-core-1_0.html

### 6. Gerenciamento de convidados B2B

**Objetivo:** Conceder colaboração temporária com sponsor e revisão.

**Ferramentas:** Microsoft Entra External ID. **Licença:** Recursos dependem do tenant; pode ser simulado. **Tempo estimado:** 75–150 minutos

**Pré-requisitos:**
- Identidade externa diferente de usuário interno.
- Tenant de colaboração sob seu controle ou simulação de políticas.

**Procedimento:**
1. Defina cenário de parceiro externo com período de acesso de 30 dias e sponsor do Financeiro.
2. Especifique qual recurso será compartilhado e quais grupos concedem acesso.
3. Separe conceitos B2B collaboration, B2B direct connect e contas de cliente.
4. Revise cross-tenant settings inbound/outbound antes de qualquer convite.
5. Em ambiente elegível, convide usuário externo de teste e atribua somente grupo/aplicativo necessários.
6. Confira tipo de usuário, estado de resgate do convite e atribuição ao recurso.
7. Teste conta convidada autorizada e tentativa de acesso fora de escopo.
8. Defina prazo, notificações e revisão periódica do sponsor/owner.
9. Remova grupo e acesso do convidado, valide efeito real da remoção.
10. Documente etapas e diferença entre apagar convidado e revogar entitlement.

**Resultado esperado:** Acesso externo temporário com owner, escopo e revogação auditáveis.

**Diagnóstico:** Se convite aceito mas app nega acesso, verifique atribuição, CA aplicável a convidados e políticas de colaboração.

**Limpeza:** Remover convidados/grupos de teste e convites pendentes desnecessários.

**Evidências:**
- Matriz inbound/outbound.
- Workflow de convite, aprovação e remoção.
- Registro de revisão e owner.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Produza fluxo detalhado de B2B com tenant fictício e evidências simuladas.

**Documentação:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

### 7. Intune + Conditional Access

**Objetivo:** Comprovar como compliance alimenta decisões de acesso.

**Ferramentas:** Intune, Entra e dispositivo dedicado. **Licença:** Requer Intune + Entra P1 ou elegibilidade equivalente. **Tempo estimado:** 120–240 minutos

**Pré-requisitos:**
- Windows/dispositivo descartável autorizado e licença Intune + Entra P1 apropriada.
- Contas de emergência excluídas de Conditional Access.

**Procedimento:**
1. Verifique licença atribuída ao usuário piloto e requisitos de inscrição de dispositivo no Intune.
2. No Entra, identifique se o dispositivo é registered, joined ou hybrid joined; documente diferenças.
3. Faça enrollment no Intune somente do dispositivo reservado ao laboratório.
4. Crie política de conformidade para grupo/dispositivo piloto com requisito verificável e reversível.
5. Force sincronização permitida e observe o estado de compliance e seu horário de atualização.
6. No Entra, crie CA Report-only exigindo compliant device para aplicativo de teste e grupo piloto.
7. Faça login em dispositivo conforme e avalie a aba Conditional Access dos sign-in logs.
8. Simule estado não conforme alterando um requisito seguro e reversível em equipamento de teste.
9. Compare decisão esperada e executada; preserve evidência dos dois casos.
10. Desabilite política piloto, restaure requisito do dispositivo e confirme acesso normal.
11. Desinscreva dispositivo se ele não for necessário para o resto da formação.

**Resultado esperado:** Sinal de Intune compliance consumido pela política do Entra, com log por cenário e plano de reversão.

**Diagnóstico:** Se CA não recebe estado, cheque inscrição MDM, grupo atribuído, última sync, licença e plataforma suportada.

**Limpeza:** Remover políticas de teste e enrollment temporário; nunca aplicar retire/wipe em dispositivo pessoal.

**Evidências:**
- Identificador fictício de dispositivo e status.
- Avaliações de política de compliance.
- Sign-in logs correlacionados com Conditional Access.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Modele decisões CA a partir de sinais simulados de compliance e documente restrições.

**Documentação:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance

### 8. Managed Identity + Azure RBAC

**Objetivo:** Autorizar workload sem armazenar segredo no código.

**Ferramentas:** Azure + identidade gerenciada + recurso sandbox. **Licença:** Azure pode gerar custo; respeitar orçamento e remover recursos. **Tempo estimado:** 90–180 minutos

**Pré-requisitos:**
- Assinatura Azure autorizada com orçamento configurado.
- Permissão mínima para criar uma identidade gerenciada e recurso descartável.

**Procedimento:**
1. Crie resource group LAB-IAM e configure alertas/orçamento na assinatura de teste.
2. Defina recurso a ser acessado por uma workload e a operação de leitura necessária.
3. Crie managed identity apropriada (system-assigned no serviço ou user-assigned) e registre principal ID mascarado.
4. Crie recurso de teste de baixo custo ou utilize simulação se não houver assinatura.
5. Atribua papel mínimo à identidade no escopo do recurso, não na assinatura inteira.
6. Solicite token via mecanismo suportado pela workload, sem secret dentro do script.
7. Execute operação permitida e observe log do principal e escopo.
8. Tente operação de gravação sem privilégio e confirme rejeição.
9. Inspecione Azure Activity Log para operações de role assignment (sujeito à disponibilidade).
10. Remova role assignment, identidade e recursos criados; confira se o resource group ficou vazio.

**Resultado esperado:** Acesso por workload sem credencial estática, com papel de leitura e operação de escrita negada.

**Diagnóstico:** AccessDenied: cheque audience do token, principal correto, escopo da role e propagação da atribuição.

**Limpeza:** Eliminar resource group e recursos faturáveis, com comprovante de exclusão.

**Evidências:**
- Diagrama de principal, role e scope.
- Acesso permitido e negado.
- Inventário de recursos removidos.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Desenhe trust e teste autorização com IdP OSS e API local.

**Documentação:** https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview

### 9. Provisionamento SCIM idempotente

**Objetivo:** Demonstrar criação, alteração e desativação sem duplicatas.

**Ferramentas:** Servidor SCIM de teste + cliente REST. **Licença:** OSS gratuito; conectores podem exigir licença. **Tempo estimado:** 90–150 minutos

**Pré-requisitos:**
- Ambiente local para API SCIM 2.0 com dados sintéticos.
- Conhecimento de JSON e HTTP.

**Procedimento:**
1. Levante um servidor SCIM de laboratório ou mock que siga esquema básico RFC 7643.
2. Prepare payload de /Users com userName único, externalId e active=true.
3. Faça POST /Users e anote status, ID gerado e Location sem dados pessoais.
4. Faça GET /Users/{id} e confira mapeamento entre identificadores de origem e destino.
5. Execute PATCH para alterar department e confirme resposta com atributo atualizado.
6. Execute PATCH ou operação suportada que defina active=false e tente autenticação fictícia.
7. Simule timeout após sucesso do servidor e repita sem criar segunda conta.
8. Teste tentativa de POST com identificador duplicado e defina política de matching.
9. Implemente ou descreva paginação e tratamento de HTTP 429/5xx com backoff.
10. Finalize removendo usuários de teste e escreva contrato de atributos, erros e evidências.

**Resultado esperado:** SCIM /Users consistente, idempotente e auditável em cenários de criação, alteração e desligamento.

**Diagnóstico:** Se usuários duplicam após timeout, revisar correlação por externalId e leitura prévia antes de retry.

**Limpeza:** Apagar fixtures e tokens da API; não usar credenciais de aplicação de produção.

**Evidências:**
- Requests/Responses sanitizados.
- Estado final correto após retry.
- Mapa de atributos de origem e destino.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Use fixture JSON e mock API local com casos positivos e negativos.

**Documentação:** https://www.rfc-editor.org/rfc/rfc7644

### 10. IGA: acesso temporário e recertificação

**Objetivo:** Controlar solicitação, concessão, duração, aprovação e revisão.

**Ferramentas:** Entra Governance ou planilha auditável. **Licença:** Entra ID Governance/P2 conforme recurso; simulação aceita. **Tempo estimado:** 100–180 minutos

**Pré-requisitos:**
- Inventário de cinco direitos de acesso e owners.
- Licença Entra ID Governance/P2 conforme funcionalidade ou simulação auditável.

**Procedimento:**
1. Defina catálogo Financeiro com entitlements Leitor, Editor, Pagamentos e aprovação.
2. Para cada direito, indique owner, criticidade, validade, justificativa e aprovador.
3. Modele regra SoD: solicitar pagamento não deve aprovar a mesma operação.
4. Se habilitado, crie catálogo e access package apontando recursos de laboratório.
5. Configure política de solicitação, escopo de usuários e duração de concessão.
6. Simule pedido, aprovação e concessão de acesso temporário.
7. Teste pedido conflitante SoD e bloqueie ou registre compensação aprovada.
8. Inicie campanha de Access Review com owner e decisão manter/remover.
9. Confirme que decisões de remoção foram realmente aplicadas após encerramento/regras da campanha.
10. Registre trilha de quem solicitou, aprovou, revisou e quando o acesso expirou.

**Resultado esperado:** Governança com ciclo de solicitação/aprovação/revisão/aplicação e rastros por direito.

**Diagnóstico:** Access review decidido mas acesso ainda ativo: avalie se a campanha terminou e se as decisões foram aplicadas.

**Limpeza:** Encerrar campanha fictícia e retirar atribuições/grupos de teste.

**Evidências:**
- Inventário de entitlements e responsáveis.
- Trilha de aprovação e exceção.
- Campanha de revisão com decisões.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Simulação em planilha CSV versionada com logs dos estados.

**Documentação:** https://learn.microsoft.com/en-us/entra/id-governance/

### 11. PAM, PIM e break-glass

**Objetivo:** Diferenciar elevação temporária, gestão de segredo e recuperação emergencial.

**Ferramentas:** Entra PIM + Vault de laboratório. **Licença:** PIM requer elegibilidade de licença; cofre local OSS opcional. **Tempo estimado:** 100–180 minutos

**Pré-requisitos:**
- Conta piloto e papel privilegiado restrito; acesso emergencial testado.
- Licença PIM elegível ou simulação; Vault local isolado opcional.

**Procedimento:**
1. Escolha função administrativa sensível e liste operações que exigem elevação.
2. Registre justificativa, approver e janela de ativação JIT.
3. Se tiver PIM, configure elegibilidade somente da conta administrativa piloto.
4. Antes de ativar, confirme que operação privilegiada está negada.
5. Solicite ativação pelo prazo mínimo e cumpra autenticação/justificativa exigida.
6. Durante ativação, execute apenas uma operação reversível e observe evento de auditoria.
7. Após prazo, confirme que operação deixa de ser autorizada.
8. Modele separadamente cofre PAM para segredo sintético e sessão privilegiada controlada.
9. Documente conta emergencial independente e procedimento de monitoramento.
10. Remova elegibilidade e confira que nenhuma role permanente ficou atribuída indevidamente.

**Resultado esperado:** Evidência de privilégio ausente, ativado, expirado e auditoria, sem segredos reais.

**Diagnóstico:** Se a função permanece disponível, cheque roles permanentes herdadas ou associação a grupos elegíveis.

**Limpeza:** Remover elegibilidade piloto e encerrar Vault de desenvolvimento; não usar credenciais reais.

**Evidências:**
- Linha do tempo de elevação e expiração.
- Registro de sessão/operação privilegiada.
- Runbook de emergência com auditoria.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Modelo de aprovação + Vault local em VM isolada; não simular em produção.

**Documentação:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

### 12. Purview: classificação, rótulos e DLP

**Objetivo:** Proteger dados conforme identidade e sensibilidade do documento.

**Ferramentas:** Purview + arquivos fictícios. **Licença:** Requer licenças Purview/M365 compatíveis conforme recurso. **Tempo estimado:** 90–180 minutos

**Pré-requisitos:**
- Dados 100% sintéticos e M365/Purview elegível ou simulação.
- Proprietário da informação e matriz de classificação definidos.

**Procedimento:**
1. Crie arquivos fictícios: público, interno e confidencial com textos sintéticos.
2. Defina classificação, responsáveis e regras de compartilhamento de cada documento.
3. Verifique licenças Purview e papéis mínimos necessários sem usar Global Administrator por padrão.
4. No portal Purview, crie ou simule rótulo Confidencial com proteção adequada ao escopo.
5. Aplique rótulo a arquivo de teste, se disponível, e observe efeito real.
6. Compare leitura por usuário autorizado e não autorizado na aplicação suportada.
7. Defina política DLP para dado de teste com auditoria antes de bloqueio.
8. Execute tentativa controlada de compartilhamento e verifique evento ou ausência esperada.
9. Analise falso positivo/negativo e ajuste escopo da regra em laboratório.
10. Desative política piloto, revise rótulos e exclua arquivos de teste se necessário.

**Resultado esperado:** Documento sintético classificado com acesso coerente e DLP revisado sem impactar conteúdo real.

**Diagnóstico:** Rótulo sem criptografia pode não restringir leitura; diferencie classificação de proteção e valide suporte do aplicativo.

**Limpeza:** Remover escopos/políticas pilotos e arquivos sintéticos, sem afetar conteúdo corporativo.

**Evidências:**
- Taxonomia e donos dos dados.
- Matriz de acesso documento-grupo.
- Regra DLP e evidência de avaliação.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Simule classificação, controles e falsos positivos sobre arquivos sintéticos.

**Documentação:** https://learn.microsoft.com/en-us/purview/information-protection

### 13. Investigação IAM com KQL

**Objetivo:** Diferenciar falha de credencial, CA, sessão e provisionamento.

**Ferramentas:** Sign-in logs + AuditLogs + KQL. **Licença:** Entra logs básicos; exportação/workspace podem custar. **Tempo estimado:** 75–150 minutos

**Pré-requisitos:**
- Contas de teste e acesso de leitura aos logs.
- KQL em workspace elegível ou amostra estruturada de eventos sintéticos.

**Procedimento:**
1. Faça login válido e inválido controlados na conta fictícia.
2. Anote hora UTC, usuário, aplicativo, status e correlation ID do evento.
3. Abra Entra > Monitoring & health > Sign-in logs e filtre pela janela das tentativas.
4. Compare falha por credencial com falha de Conditional Access em evento apropriado.
5. Altere associação de grupo piloto e localize alteração em Audit logs.
6. Selecione campo e tabela KQL conforme schema real do workspace; não assuma nomes em outra fonte.
7. Execute consulta com where para reduzir período e project para exibir ator, resultado e horário.
8. Agregue falhas por aplicativo e usuário com summarize count() e explique falsos positivos.
9. Relacione hipótese, logs e ação corretiva a partir de incidente fictício.
10. Refaça teste e confirme resolução, preservando somente evidências anonimizadas.

**Resultado esperado:** Timeline coerente e consulta KQL com registros sintéticos ou tenant de teste, incluindo correção validada.

**Diagnóstico:** Se consulta retorna zero, revise ingestion/retention, timezone, tabela, permissões e filtros antes de concluir que não houve eventos.

**Limpeza:** Apagar logs exportados com PII e dados de teste após retenção definida.

**Evidências:**
- Linha do tempo de incidente sintético.
- Consulta KQL reproduzível.
- Runbook com causa e validação após correção.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Execute KQL conceitual sobre dados fictícios; não inclua logs pessoais reais.

**Documentação:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

### 14. Active Directory híbrido

**Objetivo:** Associar identidades locais a cloud sem confundir LDAP, Kerberos e sincronização.

**Ferramentas:** Windows Server AD DS + Entra. **Licença:** Windows Server avaliação sob termos aplicáveis; VMs isoladas. **Tempo estimado:** 120–240 minutos

**Pré-requisitos:**
- VM Windows Server de avaliação/licenciamento adequado em rede isolada.
- DNS de laboratório e snapshot antes das mudanças.

**Procedimento:**
1. Crie rede virtual isolada com servidor e cliente Windows ou Linux de teste.
2. Instale serviço DNS e AD DS na VM de teste e defina domínio reservado para laboratório.
3. Promova DC e valide registros DNS SRV necessários à localização de domínio.
4. Crie OU, usuário e grupo de exemplo; aplique política GPO inofensiva.
5. Associe cliente ao domínio e obtenha login de usuário de teste.
6. Execute klist e identifique ticket e servidor de domínio sem compartilhar secrets.
7. Realize consulta LDAP somente leitura por conta restrita preferindo TLS.
8. Identifique atributos que serão fontes autoritativas na sincronização híbrida.
9. Se disponível, teste Entra Connect/Cloud Sync conforme requisitos; caso contrário, desenhe o fluxo e dependências.
10. Simule troca de departamento no AD e compare evento na nuvem ou no mapeamento teórico.
11. Desfaça alterações conflitantes e restaure snapshot após coletar evidências.

**Resultado esperado:** AD com Kerberos, DNS e LDAP válidos e modelo de sincronização claro, sem misturar mecanismos.

**Diagnóstico:** Falha de logon pode envolver relógio, DNS, conectividade de DC e credenciais: diagnostique nessa ordem.

**Limpeza:** Desconectar VMs da rede e restaurar snapshot/limpar diretório de teste.

**Evidências:**
- Diagrama híbrido e identificadores de correlação.
- Resultados de DNS/Kerberos/LDAPS.
- Matriz de fonte de autoridade e falhas.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** OpenLDAP e Keycloak para parte prática; documentação para híbrido Microsoft.

**Documentação:** https://learn.microsoft.com/en-us/entra/identity/hybrid/

### 15. Federação de workload entre clouds

**Objetivo:** Comparar relações de confiança para workloads sem secrets permanentes.

**Ferramentas:** AWS STS + GCP WIF + Entra workload ID. **Licença:** Sandboxes AWS/GCP podem gerar custos. **Tempo estimado:** 110–180 minutos

**Pré-requisitos:**
- Conhecimentos OIDC/JWT, role trust e scoping.
- Acesso apenas a sandboxes de cloud com controle de custos.

**Procedimento:**
1. Defina pipeline sintético repo/projeto/branch com emissor OIDC e identidade de workload.
2. Mapeie issuer, audience e subject esperados por trust policy.
3. Desenhe papel Azure com workload identity federation e role mínima no recurso.
4. Desenhe papel AWS STS com trust de OIDC e permission policy separada.
5. Desenhe Google Cloud Workload Identity Pool e service account ou principal autorizado.
6. Simule token que corresponde ao subject/issuer esperado e observe decisão autorizada.
7. Simule token de outra branch/projeto e confirme negação prevista.
8. Compare duração de sessão, escopo e campos registrados em logs de cada cloud.
9. Identifique recursos que gerariam cobrança, sem criar serviços desnecessários.
10. Escreva documentação indicando equivalências conceituais e divergências semânticas.

**Resultado esperado:** Três relacionamentos de confiança documentados e caso adverso de subject/issuer negado.

**Diagnóstico:** Confiança aberta por wildcard amplo deve ser tratada como falha de segurança; limite claims de origem.

**Limpeza:** Excluir identidades/roles de teste e recursos faturáveis eventualmente criados.

**Evidências:**
- Diagrama emissor-trust-target por cloud.
- Tabela de políticas permitidas/negadas.
- Avaliação de expiração, risco e revogação.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Use somente diagramas e policies fictícias sem provisionar recursos pagos.

**Documentação:** https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html

### 16. Projeto final IAM ponta a ponta

**Objetivo:** Projetar e defender IAM empresarial com identidade humana, dispositivo, workload, dados e governança.

**Ferramentas:** Entra + Intune + Azure + Purview + OSS. **Licença:** Combine laboratórios executados e simulações onde licenças não permitem. **Tempo estimado:** 4–8 horas, distribuídas em sessões

**Pré-requisitos:**
- Laboratórios anteriores ou documentação de simulação identificada.
- Conta de laboratório, owners, exigências de licença, orçamento e rollback.

**Procedimento:**
1. Defina AtlasCorp com RH, Financeiro, TI, parceiros e aplicação interna; registre requisitos de negócio.
2. Desenhe identidades humanas, convidadas, dispositivo e workload com fontes autoritativas.
3. Produza modelo de roles, atributos, entitlements, scope e matriz de incompatibilidades SoD.
4. Implante ou simule usuários, SSO/OIDC e autorização de recursos na aplicação.
5. Configure um método forte de autenticação e avalie políticas CA em grupo piloto.
6. Integre sinal de compliance de dispositivo Intune ou documente simulação como tal.
7. Conceda leitura de recurso Azure a workload sem secret estático, com teste de escrita negada.
8. Estruture access package/aprovação, access review, conta emergencial e PIM em modo licenciado ou simulado.
9. Classifique documento de teste com rótulo Purview e defina política de dados quando habilitado.
10. Execute Joiner, Mover e Leaver com trilha de aprovação e retirada de acessos.
11. Provoque duas falhas controladas (OIDC inválido e CA/role negada) e faça investigação documentada com logs.
12. Apresente ameaças, controles, impacto de licença/custo, plano de rollback e indicadores operacionais.
13. Revise evidências removendo IDs reais, tokens e dados pessoais antes de compartilhar portfólio.

**Resultado esperado:** Portfólio completo com arquitetura, matriz de permissões, fluxos JML, testes positivos/negativos e diagnóstico.

**Diagnóstico:** Componentes indisponíveis devem ser rotulados como simulação e não como experiência operacional executada.

**Limpeza:** Remover recursos cloud de teste, políticas e permissões piloto; registrar custos finais.

**Evidências:**
- Arquitetura versionada com fronteiras de confiança.
- Evidências sanitizadas de testes positivos e negativos.
- RACI, métricas, auditoria, riscos residuais e rollback.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Separe claramente implementação real, simulação e item apenas teórico.

**Documentação:** https://csrc.nist.gov/pubs/sp/800/207/final

## Certificações e frameworks

Prioridade não é obrigação formal. Confirme o status da prova e suas competências na fonte oficial na data da inscrição.

| Programa | Nível | Prioridade | Fonte |
|---|---|---|---|
| Microsoft SC-900 | Fundamental | Essencial | https://learn.microsoft.com/pt-br/credentials/certifications/security-compliance-and-identity-fundamentals/ |
| AWS Security – Specialty | Avançado · Cloud | Opcional | https://aws.amazon.com/pt/certification/certified-security-specialty/ |
| Microsoft SC-300 | Intermediário | Essencial | https://learn.microsoft.com/pt-br/credentials/certifications/identity-and-access-administrator/ |
| Microsoft SC-100 | Especialista · Arquitetura | Opcional | https://learn.microsoft.com/pt-br/credentials/certifications/cybersecurity-architect-expert/ |
| ITIL Foundation | Fundamental · ITSM | Opcional | https://www.peoplecert.org/ |
| Okta Certified Professional | Fundamental · SSO | Opcional | https://www.okta.com/services/certification/ |
| Okta Certified Administrator | Intermediário · IAM | Opcional | https://www.okta.com/services/certification/ |
| Google Associate Cloud Engineer | Intermediário · Cloud | Opcional | https://cloud.google.com/learn/certification/cloud-engineer |
| Google Professional Cloud Security Engineer | Avançado · Cloud | Opcional | https://cloud.google.com/learn/certification/cloud-security-engineer |
| SailPoint Identity Security Engineer | Avançado · IGA | Opcional | https://university.sailpoint.com/ |
| CyberArk Defender | Avançado · PAM | Opcional | https://training.cyberark.com/ |
| ISO/IEC 27001 Lead Implementer | Intermediário · GRC | Opcional | https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001 |
| COBIT 2019 Foundation | Intermediário · GRC | Opcional | https://www.isaca.org/credentialing/cobit-foundation |
| ISACA CISA | Avançado · Auditoria | Opcional | https://www.isaca.org/credentialing/cisa |
| ISACA CISM | Avançado · Gestão | Opcional | https://www.isaca.org/credentialing/cism |
| ISC2 CCSP | Avançado · Cloud | Opcional | https://www.isc2.org/certifications/ccsp |
| ISC2 CISSP | Especialista · Segurança | Opcional | https://www.isc2.org/certifications/cissp |
| NIST CSF 2.0 / SP 800-63 / SP 800-207 | Framework · Zero Trust | Estudo essencial | https://www.nist.gov/cyberframework |
| CIS Critical Security Controls v8.1 | Framework · Controles | Estudo essencial | https://www.cisecurity.org/controls |
| NIST SP 800-53 | Framework · Controles | Estudo essencial | https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final |
| Microsoft AZ-104 | Intermediário · Azure | Complementar | https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/ |
| Microsoft MD-102 | Intermediário · Endpoint | Complementar | https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/ |
| Microsoft SC-401 | Intermediário · Dados | Complementar | https://learn.microsoft.com/en-us/credentials/certifications/information-security-administrator/ |
| Google Professional Cloud Security Engineer | Avançado · Multi-cloud | Opcional | https://cloud.google.com/learn/certification/cloud-security-engineer |

## Método de avaliação

As marcações por tópico e laboratório são **autodeclaradas**. A formação distingue aula estudada, experiência executada em produto e simulação. Não exponha segredos ou dados pessoais no repositório.

## Registro de fontes

As URLs citadas têm natureza introdutória ou normativa e podem não apontar ao procedimento exato na versão mais recente. Antes de realizar alterações, confira a documentação oficial e a licença do seu ambiente.
