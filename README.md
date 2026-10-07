# IAM Academy — Roadmap Study

**Portal de aprendizagem de Identity & Access Management do IAM operacional à arquitetura**, com Microsoft Entra ID e laboratórios open source para avançar sem depender de produtos comerciais.

## Abrir o portal

**[IAM Academy — GitHub Pages](https://lpraxedess.github.io/Roadmap-Study/)**

> A URL só estará acessível quando o GitHub Pages estiver habilitado para o repositório, usando a branch `gh-pages` e diretório raiz. Veja [instruções](docs/publicacao.md).

A plataforma oferece dashboard, trilha de aulas, laboratórios, projetos, busca, modo claro/escuro, acompanhamento de progresso local e exportação/importação dos dados de estudo. Não exige conta ou servidor de aplicação.

## Como está organizado

- `site/`: interface visual em HTML/CSS/JS e gerador estático Python.
- `docs/modulos/`: 25 aulas estruturadas.
- `docs/labs/`: 7 laboratórios guiados.
- `docs/projetos/`: 6 projetos integradores.
- `scripts/`: simulação e testes de JML.
- `docs/`: guias, currículo, matriz, custos, publicação.
- `01-IAM/IAM-Study-Lab.md`: arquivo legado preservado com 32 módulos como referência.

## Rodar o site localmente

Requer Python 3.10+:

```bash
python -m pip install -r requirements-docs.txt
python site/build.py
python site/check_build.py
python -m http.server 8000 --directory dist
```

Acesse `http://localhost:8000/`. Não abra `dist/index.html` por `file://`, pois o navegador pode bloquear o carregamento de JSON local.

## Como publicar

Push na branch `main` dispara os testes, gera `dist/` e publica na branch `gh-pages`, usando GitHub Actions. Se necessário, habilite **Settings → Pages → Deploy from a branch → gh-pages → / (root)**. O repositório deve permitir que Actions escreva conteúdo.

## Licenças, custo e segurança

Uma licença Entra ID P2 é utilizada apenas no escopo de uso devidamente licenciado. SSO, OIDC, SAML, SCIM, PAM e JML contam com alternativas abertas ou simulações locais. Azure pode gerar custos; revise cada laboratório antes de provisionar.

**Portfólio separado:** [Projetos](https://github.com/lpraxedess/Projetos) é somente referenciado; nenhuma alteração é feita nesse outro repositório.

**Limite de progresso:** os dados ficam no `localStorage` do navegador. Para manter backup ou transferir entre dispositivos, exporte o arquivo JSON na área Competências.

## Evolução do conteúdo

As aulas organizam objetivos, procedimentos, falhas e critérios de conclusão; nem todos os laboratórios representam uma instalação validada ponta a ponta para cada sistema e versão. Trate os roteiros avançados como projetos de estudo que requerem adaptação e revisão técnica, especialmente quando houver licenciamento e infraestrutura externa.
