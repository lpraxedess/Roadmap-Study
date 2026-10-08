# Trilha de aprendizagem IAM — organizada em fases

**Ferramentas principais:** Active Directory DS e Microsoft Entra ID. **Não precisa instalar Docker ou Keycloak para começar.** Use primeiro o que já existe no seu laboratório.

**Método em todas as fases:** entender em linguagem direta → ver exemplo real → executar na ferramenta → verificar o resultado → investigar um erro controlado → concluir desafio sem roteiro.

## Fase 1 — Identidades, AD e Entra

**Objetivo:** saber administrar identidades e acessos do nascimento ao desligamento.

| Ordem | Tema | Aprenda | Faça no laboratório |
|---|---|---|---|
| 01 | [Fundamentos de autenticação e autorização](modulos/01-fundamentos.md) | Conta, credencial, grupos, DNS, sessão | Investigar um login e identificar cada camada |
| 02 | [Active Directory](modulos/02-ad.md) | AD DS, OU, grupos, Kerberos e LDAP | Inspecionar DC, usuários e membership |
| 03 | [Microsoft Entra ID](modulos/03-entra.md) | Tenant, usuário, grupo e papel | Localizar usuários e distinguir role de grupo |
| 04 | [Identidade híbrida](modulos/04-hibrido.md) | Origem autoritativa e sincronização | Seguir uma alteração AD→Entra quando disponível |
| **05** | **[JML — Joiner, Mover, Leaver](modulos/05-jml.md)** | **Por que criar, movimentar e desligar** | **Criar João, trocar Financeiro→TI e bloquear acesso no AD ou Entra** |

**Entrega de fase:** você executa JML manualmente e explica a diferença entre usuário *cloud-only* e sincronizado.

## Fase 2 — SSO e protocolos

**Objetivo:** entender como uma aplicação confia no provedor de identidade.

| Ordem | Tema | Prática |
|---|---|---|
| 06 | [SSO e federação](modulos/06-sso.md) | Identificar IdP, SP e sessão |
| 07 | [OAuth 2.0 e OIDC](modulos/07-oauth.md) | Reconhecer código, scope, ID Token e Access Token |
| 08 | [SAML 2.0](modulos/08-saml.md) | Interpretar metadata, EntityID e ACS |
| 09 | [SCIM](modulos/09-scim.md) | Criar/desativar conta em API de laboratório |

**Ferramenta preferencial:** enterprise applications do Entra quando você tiver aplicação de teste. Alternativas open source **opcionais** ficam em laboratórios complementares; não são pré-requisitos da fase 1.

## Fase 3 — Automatização de IAM

**Objetivo:** automatizar o que você **já aprendeu a fazer manualmente**.

| Ordem | Tema | Prática |
|---|---|---|
| 10 | [Microsoft Graph](modulos/10-graph.md) | Consultar a própria conta com \`User.Read\` |
| 11 | [PowerShell](modulos/11-powershell.md) | Validar entradas e erros antes de escrita |
| 12 | [Python e APIs](modulos/12-python.md) | Entender JSON, HTTP, retries e logs |

**Entrega:** plano JML em dry-run; **não confunda simular mudanças com executá-las no diretório**.

## Fase 4 — Governança e acesso privilegiado

**Objetivo:** aprovar, revisar e limitar privilégios.

| Ordem | Tema | Prática |
|---|---|---|
| 13 | [IGA e SoD](modulos/13-iga.md) | Identificar acessos incompatíveis |
| 14 | [Access Reviews](modulos/14-reviews.md) | Simular revisão, dono e revogação |
| 15 | [PIM](modulos/15-pim.md) | Verificar elegibilidade e ativação **quando licenciado** |
| 16 | [PAM](modulos/16-pam.md) | Modelar acesso administrativo por função |
| 17 | [Segredos e workloads](modulos/17-segredos.md) | Desenhar TTL, policy e rotação |

**Entrega:** justificativa de least privilege + evidências de revisão e, quando disponível, ativação real.

## Fase 5 — IAM em nuvem e defesa

**Objetivo:** entender controles aplicados a recursos e investigar incidentes.

| Ordem | Tema | Prática |
|---|---|---|
| 18 | [Azure RBAC e workload identity](modulos/18-azure.md) | Avaliar role, principal e scope |
| 19 | [Multicloud](modulos/19-multicloud.md) | Comparar políticas AWS e Azure |
| 20 | [ITDR](modulos/20-itdr.md) | Construir linha do tempo de incidentes |
| 21 | [Logs e troubleshooting](modulos/21-logs.md) | Identificar falha no log e causa-raiz |
| 22 | [Zero Trust](modulos/22-zero-trust.md) | Testar matriz de decisões de acesso |

**Entrega:** uma análise de incidente de identidade e um plano de contenção.

## Fase 6 — Engenharia, auditoria e arquitetura

**Objetivo:** tomar decisões e projetar IAM com riscos e custos explícitos.

| Ordem | Tema | Prática |
|---|---|---|
| 23 | [IaC, Git e CI/CD](modulos/23-iac.md) | Revisar permissões por diff antes de aplicar |
| 24 | [Auditoria IAM](modulos/24-auditoria.md) | Calcular KPI e documentar controle |
| 25 | [Arquitetura empresarial](modulos/25-architecture.md) | Criar diagrama, ADR e plano de contingência |

**Entrega:** arquitetura de referência para uma organização fictícia e decisão técnica justificável.

## Como escolher as práticas

**Regra principal:** primeiro AD DS/Entra. Se a prática precisar de aplicativo de teste, Azure ou licença inexistente, a aula deve deixar isso explícito e oferecer uma alternativa identificada como simulação. **Não compre licença nem instale ferramentas extras sem necessidade.**

[Iniciar módulo 05 com AD ou Entra](modulos/05-jml.md) · [Laboratórios complementares](labs/05-jml-simulacao.md)
