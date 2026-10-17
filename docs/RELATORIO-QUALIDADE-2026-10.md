# Auditoria técnico-didática e visual — ROADMAP - IAM
**Revisão:** 17/10/2026 · **Destino:** GitHub Pages · **Sem conexão automática a tenant Microsoft.**

## Escopo examinado
- 29 módulos e 242 temas originais; sequência e navegação entre aulas.
- 94 atividades AtlasCorp ligadas a 63 temas, incluindo RBAC, SSO, SCIM, Conditional Access, IAM cloud, PIM e Purview.
- Estrutura estática de HTML, CSS e JavaScript; progressos, evidências, backups e testes.
- Documentação Microsoft Entra e RFC para áreas de segurança relevantes.

## Principais problemas identificados e medidas

| Dimensão | Risco identificado | Ação |
| --- | --- | --- |
| Didática | Os três campos de várias aulas eram resumos curtos; pouca orientação de tomada de decisão | Construída camada de conteúdo para **242 temas**, aproveitando as definições especializadas existentes, 29 contextos técnicos e exercícios de decisão por tema |
| Prática | Todas as tarefas registravam somente concluído/não concluído | Adicionada **modalidade de estudo** (real, simulação ou teoria) e campo de evidência por tarefa |
| Ordem | Tarefas AtlasCorp estão distribuídas ao longo do Roadmap e nem sempre surgem depois do trabalho antecedente | Aviso contextual de pré-requisito pendente e navegação direta à aula que contém a tarefa anterior, sem criar laboratório separado |
| Fontes | Algumas URLs levavam somente à entrada de uma documentação extensa | Adicionados links oficiais específicos para CA, Report-only, RBAC Entra/Azure, OAuth code flow, SCIM e acesso emergencial |
| Avaliação | A marcação de progresso pode ser interpretada como prova de competência | Critério por tema, cenário e entrega esperada; registro marcado como **autodeclarado**, sem alegar validação externa |
| Cor/legibilidade | Várias camadas antigas de CSS tinham tokens de cor diferentes e superfícies muito azuladas | Consolidado **um :root** com preto como base, superfícies escuras, azul somente como cor funcional, foco visível, fontes e alvos de toque melhorados |
| Dados | Arquivo JSON anterior não continha descrição/modalidade por atividade | Backup **versão 8** com evidência por tarefa; versões 2–7 continuam aceitas |
| Certificações | Alguns cartões não indicavam dependências formais ou atualização da prova | Incluído aviso da certificação **SC-100 Expert** e da atualização programada do guia **SC-300 para 28/10/2026** |
| Portabilidade | O catálogo trabalha majoritariamente no Entra | Mantidos princípios de autorização, federação, SCIM e IAM multi-cloud; diferenciação explícita entre papel Entra, Azure RBAC e app role |

## Arquitetura educacional atual

**Uma única jornada:** Painel → Roadmap por Iniciante / Intermediário / Avançado → aula. Cada aula tem três blocos de leitura principal:
1. O que é?
2. Para que serve?
3. Como funciona?

Abaixo aparecem, de modo recolhível: decisão e riscos, exercício de compreensão, documentação e anotações. **AtlasCorp é uma seção dentro da aula somente quando houver tarefa correspondente**. TCP/IP não exige uma instalação cloud artificial.

**Prática:** as 94 tarefas mantêm os seus identificadores de conclusão anteriores e possuem agora evidência independente da posição da tarefa (derivada de capítulo e título). O usuário vê o caminho de configuração, ação, justificativa, teste e diagnóstico. Antes de aplicar, deve verificar licenciamento e pré-requisitos.

## Fontes oficiais verificadas
- [Planejamento do Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access) — políticas, pilotos, combinações e cautelas de bloqueio.
- [Report-only](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only) — avaliação antes de enforcement e limitações.
- [Acesso emergencial](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access) — conta break-glass, continuidade e validação.
- [Entra RBAC](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-overview) e [diferença para Azure RBAC](https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles).
- [OAuth Authorization Code e PKCE](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow).
- [SCIM 2.0 — RFC 7644](https://www.rfc-editor.org/rfc/rfc7644).
- [SC-300](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-300) e [Cybersecurity Architect Expert](https://learn.microsoft.com/en-us/credentials/certifications/cybersecurity-architect-expert/).
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) para acessibilidade.

## Verificação de integridade
A suíte de testes valida contagem de módulos e aulas; mapeamento completo das tarefas; datas, referências e explicações; ausência de laboratório artificial em TCP/IP; comportamento de backup; evidências; páginas renderizadas em DOM simulado; sintaxe JavaScript; ordem de carregamento de scripts e tokens de CSS.

**Atenção:** testes estruturais automatizados demonstram consistência do código, não qualidade didática absoluta nem eficácia real das configurações em um tenant. Um teste DOM simulado não é equivalente a uma auditoria visual com browser real.

## Limitações que exigem ambiente real ou revisão humana
- Não foi validada visualmente a publicação GitHub Pages em desktop/celular, nem a execução efetiva do Actions hospedado após o commit final.
- Não foram executados CA, PIM, Intune, Purview, Azure pagos ou cenários multi-cloud num tenant efetivo; disponibilidades dependem de licença, permissões, plataforma e custos.
- As **242 aulas agora têm mais contexto e critérios**, mas não equivalem a um livro texto completo ou a uma revisão de especialista, linha a linha, de todas as afirmações. Use as fontes oficiais para aprofundamento e atualizações.
- A classificação real/simulado/teórico é autodeclarada; a plataforma não valida resultados no tenant. Evite declarar experiência de produto em atividades somente simuladas.
- Alguns identificadores históricos de tópicos usam posições por módulo para manter compatibilidade do progresso; a ordem de apresentação pode ser alterada sem mexer nesses índices. Refatoração total de identificadores exigiria migração cuidadosa de backups mais antigos.

## Próximos controles de qualidade
1. Abrir o Pages em navegador real e verificar menus móveis, teclado, viewport pequeno, importação/exportação e foco/contraste.
2. Rodar o fluxo AtlasCorp completo em tenant de laboratório P2 e revisar capturas sanitizadas, custos, licenças, políticas e rollback.
3. Analisar as dúvidas e falhas observadas em cada etapa, refinando os 242 conteúdos progressivamente.
4. Confirmar GitHub Actions do commit publicado e corrigir falhas de runner se houver.
