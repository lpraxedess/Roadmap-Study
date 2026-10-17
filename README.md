# ROADMAP - IAM

Formação progressiva de identidade e gestão de acessos (IAM), com fundamentos independentes de fabricante e aplicação principal em Microsoft Entra ID P2, com módulos opcionais de Azure, Intune, Purview, AD híbrido e multi-cloud.

O site é estático e não se conecta ao tenant Microsoft nem altera recursos automaticamente.

## Navegação

O projeto possui três áreas: **Painel** (progresso e backup), **Roadmap de estudos** (29 módulos e 242 aulas) e **Certificações** (trilhas por nível).

**A AtlasCorp não é uma página de laboratório separada.** Suas tarefas aparecem diretamente dentro dos temas que exigem configuração ou verificação prática. Assuntos como TCP/IP permanecem conceituais, sem criar ações artificiais no tenant.

## Como cada tema funciona

1. **O que é?** — definição e elementos essenciais.
2. **Para que serve?** — finalidade em IAM, aplicações e benefícios.
3. **Como funciona?** — mecanismo e decisões técnicas.
4. **Aplicando na AtlasCorp** — bloco exibido **somente se houver uma tarefa relevante**. Contém cenário da empresa, onde configurar, como executar, justificativa, teste, investigação e registro do resultado na mesma aula.

As fontes oficiais e as anotações ficam em seções opcionais e recolhíveis, sem multiplicar campos obrigatórios.

**Cobertura:** 242 tópicos em 29 módulos; 65 desses tópicos possuem aplicação AtlasCorp. As 94 tarefas da empresa foram redistribuídas por assunto, mantendo suas chaves de progresso e os 16 capítulos como referência de origem.

## Evolução da empresa fictícia

A AtlasCorp começa com identidade e governança de dados. Aulas de Entra ID preparam usuários e grupos; o tema RBAC ensina papéis funcionais e autorização na aplicação; Conditional Access protege o grupo piloto; outras aulas incorporam SSO, Azure RBAC, SCIM, Intune, convidados, governança, PIM, Purview e operações avançadas.

**Cuidado conceitual:** grupo funcional, app role, papel administrativo Entra e Azure RBAC representam camadas distintas. Não se deve atribuir Global Administrator a um usuário por sua função profissional.

### Licenciamento

Conditional Access e Identity Protection dependem dos planos aplicáveis. Entra ID P2 não fornece automaticamente recursos Intune, Purview, Azure pagos ou todas as capacidades avançadas de Identity Governance. Confira o SKU e as opções disponíveis antes de executar a etapa; caso contrário, registre uma simulação identificada como tal.

Use apenas dados fictícios e ambientes autorizados. Teste Conditional Access primeiro em Report-only e garanta contas emergenciais protegidas e acessíveis.

## Progresso e privacidade

As marcações, notas e certificados ficam em armazenamento local do navegador; não há validação remota. Os procedimentos AtlasCorp reutilizam as mesmas chaves do laboratório anterior, preservando o histórico de progresso. A importação/exportação JSON e compatibilidade de backups anteriores continuam no Painel. Links antigos de laboratório direcionam ao tema pertinente.

## Estrutura de arquivos

- index.html — navegação em três áreas.
- data/catalog.js, data/expanded.js, data/learning.js — conteúdo do currículo.
- data/company-lab.js — empresa e 94 tarefas práticas.
- data/topic-practice.js — associação das tarefas aos temas relevantes e explicações adicionais.
- assets/experience.js — três blocos por aula e etapa AtlasCorp opcional.
- assets/v3.js — Painel, Roadmap, níveis e certificações.
- assets/app.js — estado, notas, backup e compatibilidade.
- assets/styles.css — identidade visual preta/azul.
- tests/*.test.mjs e .github/workflows/validate.yml — validação automatizada.

## Executar e testar

Use um servidor HTTP estático na pasta do projeto, por exemplo: python -m http.server 8000.

Com Node.js 22: node --test tests/*.test.mjs.

Fontes: [Microsoft Entra licensing](https://learn.microsoft.com/en-us/entra/fundamentals/licensing), [Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview), [Entra roles](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference).

Os manuais completos continuam disponíveis em [Currículo](docs/CURRICULO.md), [AtlasCorp](docs/LABORATORIO-ATLASCORP.md) e [Aulas](docs/REVISAO-ITEM-A-ITEM.md), como consulta opcional. O site não depende de navegação para um laboratório separado.

**Revisão:** outubro de 2026. A profundidade didática das aulas é ampliada progressivamente; consulte sempre fontes oficiais atualizadas.
