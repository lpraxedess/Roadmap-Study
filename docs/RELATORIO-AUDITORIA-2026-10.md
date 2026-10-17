# Auditoria minuciosa do ROADMAP - IAM — 16/10/2026

## Escopo e metodologia

Código, dados curriculares, interface e testes do repositório foram examinados com checagem de consistência tema a tema. O inventário de cada tema está em [REVISAO-ITEM-A-ITEM.md](./REVISAO-ITEM-A-ITEM.md). Foram comparados pontos críticos com fontes oficiais como NIST SP 800-63, Microsoft Learn SC-300, Entra Conditional Access, Entra ID Governance, Azure RBAC e Purview. Foram executados testes de sintaxe, integridade e renderização em DOM simulado.

**Não verificado:** a publicação pública do GitHub Pages não foi carregada no navegador pela ferramenta disponível; não houve teste visual pixel a pixel ou operação em tenants Microsoft, nem verificação HTTP individual de todos os links.

## Achados e alterações

| Criticidade | Achado anterior | Ajuste implementado |
|---|---|---|
| Alta | Definições curtas e distinções incorretas em pontos sensíveis como ID/access token, RBAC, compliance e federation assurance | Revisões individualizadas de conceitos críticos, contexto por módulo e explicitação de erros comuns |
| Alta | Etapas práticas limitadas a 3–5 ações sem preparo/rollback/diagnóstico | 16 roteiros com 9–13 ações, pré-requisitos, caso negativo, resultado, troubleshooting e limpeza |
| Alta | Critérios autodeclarados não distinguiam execução real de simulação | Classificação da modalidade, checklist teórico, operacional e de diagnóstico por aula e laboratório |
| Alta | Escopo SC-300 omitia Global Secure Access, Application Proxy, CAE e Authentication Context | Novo módulo de acesso adaptativo e integração às fases e laboratórios |
| Média | Biblioteca e revisão renderizavam listas muito extensas | Paginação visual de 35 tópicos, filtros, favoritos e pesquisa sem acento |
| Média | 28 módulos em listagem extensa e navegação móvel com 7 itens sempre visíveis | Fases recolhíveis, menu responsivo, cabeçalho compacto e layouts dimensionados |
| Média | Rodapé/cabeçalho de rotas internas e histórico do navegador inconsistentes | Breadcrumb para laboratórios e certificações, URLs profundas e navegação por histórico |
| Média | Backup antigo não guardava modalidade, checklist teórico e etapas executadas | Backup JSON versão 6; importação mantém suporte à versão 5 e índices anteriores |
| Média | CI anterior não abrangia novos scripts e não percorria telas | Testes de sintaxe e integridade estendidos, simulação de todas as aulas |
| Baixa | Falta de guia consolidado para auditoria por tópico | Documentação detalhada com fonte, pré-requisitos, ação, aceite e teste adverso |

## Competências e progressão

- **Fundamentos:** sistemas, DNS, TLS, diretórios, identidade, atributos, RBAC/ABAC.
- **Autenticação:** MFA, passkeys, SAML/OIDC, risco, Conditional Access, federação, B2B.
- **Plataformas:** Entra, Intune, Azure RBAC, identidades de workloads, Global Secure Access, SCIM.
- **Governança e dados:** recertificação, SoD, Entitlement Management, PIM/PAM, Purview, DLP.
- **Operação e arquitetura:** KQL, incidentes, AD híbrido, AWS/GCP, policy-as-code, projetos ponta a ponta.

O aluno pode iniciar os laboratórios básicos antes de completar toda a teoria. O resultado é autodeclarado e requer evidência (armazenada fora do site).

## Limitações de fontes e certificações

- Os links fornecidos para aulas são **referências de aprofundamento**. Alguns redirecionam a portais ou páginas gerais; a documentação de produtos muda ao longo do tempo.
- A atualização de objetivos SC-300 indicada no guia oficial para **28/10/2026** ainda é futura na data desta auditoria, **16/10/2026**.
- Conditional Access exige licença elegível (tipicamente Entra P1); políticas por risco exigem recursos P2; Entra Governance/Intune/Purview possuem regras próprias.
- Simulação ou estudo de documentação não substitui a execução efetiva no produto quando a evidência exigida for operacional.
- Não use tenants de produção, chaves reais, dados corporativos, privilégios desnecessários ou políticas globais sem plano de rollback.

## Verificações executadas

- Scripts: análise sintática em JavaScript.
- Integridade: todas as aulas têm guia, três ou mais passos, requisitos, verificação e referência.
- Estrutura: ordem da trilha cobre todos os módulos sem duplicação; relação de laboratórios é válida.
- Interface: páginas renderizadas em DOM simulado para todos os módulos, aulas, laboratórios e telas principais.
- Compatibilidade: índices do conteúdo legado mantidos; importação anterior versão 5 ainda contemplada.

**Pendência operacional:** abrir o Pages publicado em navegadores reais (desktop e celular), testar menu, teclado, backup import/export com dados reais de teste e observar os resultados do GitHub Actions após publicar.

## Fontes técnicas prioritárias

- https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-300
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview
- https://learn.microsoft.com/en-us/entra/fundamentals/licensing
- https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview
- https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units
- https://learn.microsoft.com/en-us/purview/get-started-with-sensitivity-labels
- https://csrc.nist.gov/pubs/sp/800/207/final
- https://pages.nist.gov/800-63-4/


**Atualização de interface (17/10/2026):** o Painel, Conteúdo e Roadmap redundantes foram reorganizados em Painel + Roadmap por três níveis; Revisar e Dados deixaram de ser páginas individuais. O laboratório AtlasCorp reúne 16 capítulos e 94 microprocedimentos. Consulte [o novo runbook](./LABORATORIO-ATLASCORP.md) e o [currículo atualizado](./CURRICULO.md). Esta observação registra a evolução posterior à auditoria original.
