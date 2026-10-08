# Currículo — roteiro de formação

O percurso respeita experiência prévia com AD e Entra ID. Faça diagnóstico por competência; o conteúdo básico é revisão, não pré-requisito de tempo fixo. Estude primeiro os fundamentos quando um teste diagnóstico indicar lacuna.

## Aulas sequenciais

1. [01 — Fundamentos essenciais e diagnóstico](modulos/01-fundamentos.md) — DNS, TLS, HTTP, Git e identidades.
2. [02 — Active Directory e protocolos](modulos/02-ad.md) — AD DS, LDAP, Kerberos, NTLM, GPO e objetos.
3. [03 — Microsoft Entra ID e RBAC](modulos/03-entra.md) — Tenant, usuários, grupos, directory roles e Azure RBAC.
4. [04 — Identidade híbrida](modulos/04-hibrido.md) — Entra Connect, hash sync, soft match, hard match e fonte autoritativa.
5. [05 — Joiner–Mover–Leaver](modulos/05-jml.md) — Nascimento, mudança e saída do colaborador.
6. [06 — SSO e federação](modulos/06-sso.md) — IdP, SP, trust, sessões, metadata e certificados.
7. [07 — OAuth 2.0 e OIDC](modulos/07-oauth.md) — Authorization Code + PKCE, ID Token, Access Token, scopes, claims.
8. [08 — SAML 2.0](modulos/08-saml.md) — Assertions XML, SP, IdP, ACS, NameID, assinatura e metadata.
9. [09 — SCIM 2.0](modulos/09-scim.md) — Resource schemas, Users, Groups, PATCH e desprovisionamento.
10. [10 — Microsoft Graph e segurança de API](modulos/10-graph.md) — Delegated vs app-only, scopes, consent, paginação e throttling.
11. [11 — PowerShell para IAM](modulos/11-powershell.md) — Objetos, pipeline, módulos, validação, tratamento de erros.
12. [12 — Python e REST APIs](modulos/12-python.md) — Requests, JSON, HTTP status, retries, paginação.
13. [13 — Fundamentos de IGA](modulos/13-iga.md) — Catálogo de entitlements, ownership, review e SoD.
14. [14 — Access Reviews e recertificação](modulos/14-reviews.md) — Campanhas, reviewers, decisões, evidências.
15. [15 — PIM e acesso privilegiado](modulos/15-pim.md) — Eligible vs active, JIT, aprovação, duração, auditoria.
16. [16 — PAM open source](modulos/16-pam.md) — Teleport Community, sessões, RBAC e acesso remoto.
17. [17 — Secrets e workload identity](modulos/17-segredos.md) — OpenBao, secrets, tokens, TTL, rotação e credenciais de máquina.
18. [18 — Azure IAM e identidade de workload](modulos/18-azure.md) — Azure RBAC, managed identity, service principals e recursos.
19. [19 — Fundamentos multicloud](modulos/19-multicloud.md) — AWS IAM, roles, policies, trust e conceitos comparados.
20. [20 — ITDR e defesa de identidades](modulos/20-itdr.md) — Risco de conta, tokens, logs, detecção e resposta.
21. [21 — Logs, telemetria e troubleshooting](modulos/21-logs.md) — Sign-in logs, audit logs, correlação, retenção.
22. [22 — Zero Trust e acesso adaptativo](modulos/22-zero-trust.md) — Verificar explicitamente, menor privilégio, assumir violação.
23. [23 — IaC, Git e CI/CD para IAM](modulos/23-iac.md) — Terraform/Bicep, revisão de código, pipelines e drift.
24. [24 — Auditoria e indicadores](modulos/24-auditoria.md) — Controle, evidência, risco residual, SLA e KPI.
25. [25 — Arquitetura IAM empresarial](modulos/25-architecture.md) — AD/Entra, federação, provisionamento, PAM, observabilidade e recuperação.

## Laboratórios guiados

- [01 — OIDC com Keycloak e PKCE](labs/01-keycloak-oidc.md)
- [02 — SAML 2.0 — Keycloak e SP de teste](labs/02-saml-keycloak.md)
- [03 — Provisionamento SCIM 2.0 — API de laboratório](labs/03-scim-local.md)
- [04 — Microsoft Graph — consultas delegadas e diagnóstico](labs/04-graph-readonly.md)
- [05 — JML reproduzível — CSV e PowerShell](labs/05-jml-simulacao.md)
- [06 — Acesso privilegiado — desenho e validação](labs/06-pam-lab.md)
- [07 — JML com Python e dry-run](labs/07-jml-python.md)
- [08 — Simulação local de PIM: ativação JIT, expiração e auditoria](labs/08-pim-simulador.md)

- [09 — SCIM em localhost](labs/09-scim-mock.md)
- [10 — Segregação de funções no terminal](labs/10-sod-offline.md)

## Projetos integradores

1. [Recuperação de identidade híbrida](projetos/01-hybrid-recovery.md) — Projetar procedimento de recuperação para conflito de atributos, usuário desabilitado e atraso de sync.
2. [Integração SSO OIDC e SAML](projetos/02-sso-federation.md) — Conectar IdP local e dois tipos de aplicação, documentando confiança, claims e segurança.
3. [Automação de JML com trilha de auditoria](projetos/03-jml-engineering.md) — Construir pipeline de Joiner–Mover–Leaver com dry-run, idempotência, aprovações e testes.
4. [IGA e acesso privilegiado](projetos/04-governance.md) — Desenhar catálogo de entitlements, SoD, revisão periódica e política de privilégios.
5. [Investigação de incidente de identidade](projetos/05-itdr.md) — Analisar logs sintéticos, definir causa-raiz e plano de resposta.
6. [Arquitetura IAM empresarial](projetos/06-enterprise-architecture.md) — Projetar para empresa fictícia de 500 pessoas com on-prem, cloud, SaaS, terceiros e aplicações internas.

## Como seguir sem gastar

- **Trilha totalmente local:** Keycloak, PowerShell, Python, cenários e datasets fictícios.
- **Trilha híbrida existente:** AD DS/Entra Connect já implantados no laboratório, somente com licenças adequadas.
- **Trilha Entra P2:** funcionalidades da conta corretamente licenciada, com limitações explicitadas.
- **Trilha Azure:** criar recurso somente com orçamento, alerta de custos e plano de exclusão.

**Dependências:** AD → híbrido → JML; protocolos → Graph e integrações; identidade/roles → IGA; logs → ITDR; todas as trilhas → arquitetura.

## Evidência e conclusão

Cada aula exige explicação, teste positivo, teste negativo e reversão. Cada projeto exige rubrica e nota mínima de 16/20. Use a [matriz de competências](matriz-de-competencias.md) para avaliar lacunas.

O material legado permanece em [01-IAM/IAM-Study-Lab.md](https://github.com/lpraxedess/Roadmap-Study/blob/main/01-IAM/IAM-Study-Lab.md).
