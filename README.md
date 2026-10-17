# ROADMAP - IAM

**Formação progressiva em Identity & Access Management**: teoria independente de fabricante, aplicação prática guiada em Microsoft Entra ID P2 e integração com Azure, Intune e Purview quando houver licenciamento específico.

Este é um projeto educacional **estático**, publicado por GitHub Pages. Não se conecta ao tenant Microsoft nem modifica recursos cloud automaticamente.

## Navegação (quatro seções)

| Área | Objetivo | O que aparece |
| --- | --- | --- |
| **Painel** | Ponto de entrada | Progresso, próxima aula, acesso ao roadmap e ao laboratório, backup/restauração discreto |
| **Roadmap de estudos** | **Única biblioteca teórica** | 29 módulos e 242 aulas, organizados em Iniciante, Intermediário e Avançado, com pesquisa |
| **Laboratório AtlasCorp** | **Uma única empresa simulada** | 16 capítulos cumulativos, com 94 procedimentos detalhados, evidências, diagnóstico e rollback |
| **Certificações** | Desenvolvimento profissional | Iniciante, Intermediário e Avançado; meta principal, recomendadas, complementares e opcionais |

As páginas redundantes de Conteúdo, Revisar e Dados não estão mais na navegação. O backup permanece no Painel; links antigos continuam sendo tratados como rotas de compatibilidade.

### Roadmap: 29 módulos e 242 temas

Cada aula contém conceito, aplicação, pré-requisitos, instruções práticas, teste negativo, verificação, diferenças entre plataformas e links oficiais. Os temas são estudados com a sequência sugerida por nível:

- **Iniciante — 11 módulos:** fundamentos de TI e redes, identidade, diretórios, autorização, autenticação, federação e primeiros passos Microsoft Entra ID.
- **Intermediário — 10 módulos:** administração Entra, MFA/Conditional Access, colaboração externa, Intune, Azure RBAC, JML, SCIM, operação e acesso adaptativo.
- **Avançado — 8 módulos:** PAM/PIM, identidades não humanas, governança e proteção de dados, telemetria, multi-cloud, policy-as-code e arquitetura Zero Trust.

A escolha de nível é pedagógica: não corresponde automaticamente à exigência formal de um exame.

## Laboratório corporativo AtlasCorp

A AtlasCorp é a mesma empresa fictícia em todos os capítulos. O currículo acompanha suas identidades desde a **contratação e o primeiro login** até **autorização, governo do acesso, risco e resposta a incidentes**.

Há RH, Financeiro, TI, IAM, SecOps, gestores, convidados externos, aplicações, dispositivos e workloads. Os grupos e políticas recebem nomes consistentes, evitando o efeito de 16 laboratórios isolados.

O guia inclui, por exemplo:

1. Criar e inventariar o tenant de laboratório, verificar P2 e estabelecer contas emergenciais.
2. Admitir Camila, criar sua conta, cadastrar atributos, escolher grupos e associar recursos.
3. Configurar métodos MFA, registrar passkey quando possível, criar Conditional Access **Report-only** para grupo piloto, executar logins, analisar Sign-in logs, habilitar somente o piloto e recuperar se necessário.
4. Configurar separadamente políticas P2 de **sign-in risk** e **user risk**, com explicações de quando usá-las e o que é possível testar sem gerar riscos reais artificialmente.
5. Conceder roles/grupos para Financeiro e validar acesso permitido/negado no backend.
6. Implementar SSO por OIDC, acesso de convidados, device compliance do Intune e acesso de workload via Azure RBAC.
7. Governar direitos com aprovação, revisão, PIM; proteger dados no Purview e investigar falhas.
8. Executar Mover/Leaver, recolher evidências e entregar um projeto final completo.

Cada um dos **94 procedimentos microguiados** mostra: **onde configurar, como configurar, por que configurar, o que testar e o que investigar se falhar**. Os 16 capítulos ainda têm o checklist operacional original, critérios de aceite, documentação e alternativas de simulação.

**Guia integral:** [docs/LABORATORIO-ATLASCORP.md](docs/LABORATORIO-ATLASCORP.md).

### Entra ID P2 não inclui todos os produtos

Conditional Access básico requer P1 (também incluído no P2); Identity Protection e políticas de risco dependem de P2/planos elegíveis. PIM pode ser utilizado sob condições de licença P2. **Intune, Purview, custos Azure, Azure subscriptions e todas as funções avançadas de Entra ID Governance não estão automaticamente incluídos no Entra P2.** Para cada recurso, confira o requisito do cenário na documentação vigente.

Não use tenants de produção, contas corporativas reais, dados pessoais, tokens, segredos ou equipamentos de uso pessoal para executar ações destrutivas. Políticas de bloqueio requerem grupo piloto, contas emergenciais protegidas e testadas, análise de impacto, Report-only e plano de reversão.

**Fontes essenciais:** [licenciamento Entra](https://learn.microsoft.com/en-us/entra/fundamentals/licensing), [licenciamento Identity Governance](https://learn.microsoft.com/en-us/entra/id-governance/licensing-fundamentals), [Conditional Access com MFA](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-mfa-strength), [políticas de risco](https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies).

## Certificações

São separadas por **Iniciante, Intermediário e Avançado**. Cores nas bordas dos cartões distinguem a meta principal (SC-300), a recomendação introdutória (SC-900), especializações complementares (AZ-104, MD-102, SC-401) e opcionais (cloud, IGA, PAM, segurança e auditoria).

**Não existe uma certificação universalmente obrigatória para trabalhar em IAM.** O termo “principal” reflete a trajetória sugerida neste projeto, não obrigação legal, de mercado ou de certificação. A tela evita exibir em duplicidade uma entrada de Google Professional Cloud Security Engineer presente no catálogo histórico, preservando o registro salvo anteriormente.

## Progresso, backup e privacidade

Níveis por tópico (0–3), favoritas, anotações, etapas do laboratório e certificações são armazenados em **localStorage** no navegador. A marcação é autodeclarada; evidências ficam fora do site.

Em **Painel → Backup, restauração e privacidade** é possível exportar/importar JSON e limpar dados. A nova exportação usa **versão 7** e inclui o progresso dos procedimentos AtlasCorp. Importações anteriores, inclusive versão 5 e 6, continuam suportadas, com os índices originais mantidos; registros do laboratório novo só existem em backups versão 7.

Armazene o JSON com cuidado: embora o site não envie dados a um servidor, suas anotações podem conter informações que você decidiu registrar.

## Arquivos

| Caminho | Conteúdo |
| --- | --- |
| index.html | Página estática, marca e navegação |
| assets/styles.css | Interface responsiva preta/azul |
| assets/app.js | Navegação, persistência e compatibilidade de backup |
| assets/experience.js | Aula, módulo e componentes compartilhados |
| assets/v3.js | Painel, roadmap por nível, laboratório e certificações |
| data/catalog.js + data/expanded.js | 242 tópicos e catálogo de certificações |
| data/learning.js | Revisão pedagógica das aulas e contexto dos 16 laboratórios |
| data/company-lab.js | AtlasCorp, 16 capítulos e 94 procedimentos corporativos |
| docs/LABORATORIO-ATLASCORP.md | Manual operacional integral |
| docs/CURRICULO.md | Inventário de módulos e laboratório original |
| docs/REVISAO-ITEM-A-ITEM.md | Descrição das 242 aulas |
| tests/*.test.mjs | Testes de integridade e interação |
| .github/workflows/validate.yml | Verificação automatizada no GitHub |

## Executar localmente e testar

O site usa JavaScript puro, sem dependências ou backend. Sirva a pasta por HTTP, por exemplo:

~~~bash
python -m http.server 8000
~~~

Abra http://localhost:8000. Com Node 22 ou superior:

~~~bash
node --check assets/app.js
node --check assets/experience.js
node --check assets/v3.js
node --check data/company-lab.js
node --test tests/*.test.mjs
~~~

O Pages publica os arquivos estáticos. Se ocorrer erro ao carregar uma aula, abra o console para verificar scripts e confira o status da publicação.

**Revisão:** 17/10/2026. Interfaces de produtos, licenciamento e conteúdo de certificações mudam; antes de aplicar uma configuração real, valide o procedimento no Microsoft Learn ou documentação oficial do fabricante.
