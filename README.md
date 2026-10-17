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

As referências oficiais, decisões de segurança, exercícios de verificação e anotações ficam em seções recolhíveis. A leitura principal mantém três blocos, sem transformar todos os fundamentos em laboratórios artificiais.

**Cobertura:** 242 tópicos em 29 módulos; 63 desses tópicos possuem aplicação AtlasCorp. As 94 tarefas da empresa foram redistribuídas por assunto, mantendo suas chaves de progresso e os 16 capítulos como referência de origem.

## Evolução da empresa fictícia

A AtlasCorp começa com identidade e governança de dados. Aulas de Entra ID preparam usuários e grupos; o tema RBAC ensina papéis funcionais e autorização na aplicação; Conditional Access protege o grupo piloto; outras aulas incorporam SSO, Azure RBAC, SCIM, Intune, convidados, governança, PIM, Purview e operações avançadas.

**Cuidado conceitual:** grupo funcional, app role, papel administrativo Entra e Azure RBAC representam camadas distintas. Não se deve atribuir Global Administrator a um usuário por sua função profissional.

### Licenciamento

Conditional Access e Identity Protection dependem dos planos aplicáveis. Entra ID P2 não fornece automaticamente recursos Intune, Purview, Azure pagos ou todas as capacidades avançadas de Identity Governance. Confira o SKU e as opções disponíveis antes de executar a etapa; caso contrário, registre uma simulação identificada como tal.

Use apenas dados fictícios e ambientes autorizados. Teste Conditional Access primeiro em Report-only e garanta contas emergenciais protegidas e acessíveis.

## Progresso e privacidade

As marcações, notas e certificações ficam no armazenamento local do navegador; não há validação remota. Cada tarefa AtlasCorp também pode registrar se foi execução real, simulação ou apenas estudo, com uma anotação de evidência sanitizada. Os procedimentos AtlasCorp reutilizam as mesmas chaves do laboratório anterior, preservando o histórico de progresso. A exportação JSON utiliza agora a **versão 8** e inclui evidências detalhadas por tarefa, mantendo compatibilidade de importação com as versões anteriores (2 a 7). Links antigos de laboratório direcionam ao tema pertinente.

## Estrutura de arquivos

- index.html — navegação em três áreas.
- data/catalog.js, data/expanded.js, data/learning.js — conteúdo do currículo.
- data/company-lab.js — empresa e 94 tarefas práticas.
- data/topic-practice.js — associação das tarefas aos temas relevantes e explicações adicionais.
- data/didactics.js — guia de compreensão, decisão profissional, cenário e critério de avaliação para os 242 temas.
- docs/GUIA-POR-COMPETENCIA.md — manual offline de todas as aulas, fontes e etapas de prática.
- assets/experience.js — três blocos por aula e etapa AtlasCorp opcional.
- assets/v3.js — Painel, Roadmap, níveis e certificações.
- assets/app.js — estado, notas, backup e compatibilidade.
- assets/styles.css — identidade visual preta/azul.
- tests/*.test.mjs e .github/workflows/validate.yml — validação automatizada.

## Executar e testar

Use um servidor HTTP estático na pasta do projeto, por exemplo: python -m http.server 8000.

Com Node.js 22: node --check data/didactics.js e node --test tests/*.test.mjs.

Fontes: [Microsoft Entra licensing](https://learn.microsoft.com/en-us/entra/fundamentals/licensing), [Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview), [Entra roles](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference).

Os manuais completos continuam disponíveis em [Currículo](docs/CURRICULO.md), [AtlasCorp](docs/LABORATORIO-ATLASCORP.md) e [Aulas](docs/REVISAO-ITEM-A-ITEM.md), como consulta opcional. O site não depende de navegação para um laboratório separado.

## Auditoria e implementação

A revisão atual fortalece o estudo dos 242 temas usando as definições existentes, 29 contextos de decisão profissional, exemplos de análise, critérios por competência e fontes verificadas para assuntos críticos. O tema RBAC diferencia direito na aplicação, papéis Entra e Azure RBAC; o tema TCP/IP permanece conceitual. A navegação prática avisa quando outra etapa da empresa ainda não foi marcada.

**Interface:** fundo e superfícies predominantemente pretos; azul aparece para foco, links, estado ativo e ações. As fontes e detalhes técnicos extensos permanecem recolhíveis. A estrutura é acessível por teclado e possui suporte a preferência de movimento reduzido.

**Limites declarados:** a geração de cenários por competência usa o currículo existente e não substitui uma revisão manual por especialista de cada afirmação; a modalidade da execução e a evidência são autodeclaradas; licenças, menus e recursos de nuvem devem ser verificados no tenant próprio; a publicação visual do Pages ainda exige verificação em navegadores desktop/móvel. Consulte [relatório de auditoria](docs/RELATORIO-QUALIDADE-2026-10.md).


**Revisão:** outubro de 2026. A profundidade didática das aulas é ampliada progressivamente; consulte sempre fontes oficiais atualizadas.
