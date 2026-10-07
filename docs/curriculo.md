# Currículo por competências

| Trilha | Resultado verificável | Laboratório prioritário |
|---|---|---|
| 01. Fundamentos e diagnóstico | Explicar DNS, TLS, HTTP, Git, identidade e autorização | Diagnóstico e revisão |
| 02. AD e Entra avançados | Diagnosticar autenticação e sincronização híbrida | AD DS / Entra Connect existente |
| 03. IAM Operations | Executar JML e revogação com trilha de auditoria | AD e PowerShell |
| 04. Access Management | Configurar e diagnosticar OIDC, OAuth, SAML e SCIM | Keycloak e aplicações de teste |
| 05. IAM Engineering | Consumir APIs com autenticação segura, idempotência e logs | Microsoft Graph / PowerShell / Python |
| 06. IGA | Modelar entitlement, SoD, revisão e remediação | Simulação própria; avaliar midPoint |
| 07. PAM | Controlar privilégios, sessões e segredos | Teleport Community / OpenBao |
| 08. Cloud IAM | Aplicar menor privilégio e identidades de workload | Azure; AWS apenas se viável |
| 09. Identity Security | Detectar, investigar e responder a abuso de identidade | Logs de teste e ferramentas abertas |
| 10. Arquitetura | Defender arquitetura, custo, migração e recuperação | Projeto empresarial integrador |

## Dependências

- App registration e conceitos de cliente **antes** do laboratório de OIDC com Entra.
- AD e sincronização híbrida **antes** de password writeback e hybrid join.
- OAuth 2.0/OIDC **antes** de automação delegada com Microsoft Graph.
- Papéis, JML e autorização **antes** de IGA e SoD.
- Logs e auditoria **antes** de ITDR e incidentes.
- Princípios de acesso privilegiado **antes** de PAM/PIM.

## Projetos de saída

1. Diagnóstico e recuperação de sincronização híbrida.
2. SSO OIDC e SAML com testes negativos.
3. JML automatizado com Microsoft Graph e PowerShell.
4. Governança de acesso e segregação de funções.
5. PAM e segredos em laboratório local.
6. Investigação de incidente de identidade.
7. Arquitetura IAM para organização fictícia com ADRs, riscos e orçamento.

**Atenção:** esta é a estrutura-alvo. O arquivo legado preservado contém o material original; as novas aulas serão desenvolvidas e validadas por unidade.
