# IAM Academy — Roadmap-Study

Curso autoguiado de Identity & Access Management, do operacional à arquitetura. Microsoft Entra ID e alternativas open source, priorizando **prática real, laboratório gratuito, teste negativo e diagnóstico**.

**Portal (preto permanente):** https://lpraxedess.github.io/Roadmap-Study/

## Início rápido

1. [Trilha em seis fases por tema](docs/curriculo.md)
2. [Guia do aluno](docs/guia-do-aluno.md)
3. [Aula 05: JML com usuários e grupos no AD ou Entra](docs/modulos/05-jml.md)
4. [Laboratórios](docs/labs/05-jml-simulacao.md) — arquivo de laboratório guiado no Active Directory ou Entra.
5. [Aula 15: PIM e ativação de privilégio](docs/modulos/15-pim.md)

## Estrutura

- `site/`: portal visual, tema preto, quizzes de fixação e anotações locais.
- `docs/modulos/`: 25 unidades com conceito, motivo, vantagens, limites, prática, teste negativo e desafio.
- `docs/labs/`: 10 roteiros, **com níveis diferentes de maturidade e execução**. Dê preferência aos identificados como prática real.
- `docs/projetos/`: seis projetos integradores do próprio curso.
- `scripts/`: laboratórios *de simulação* Python para automação, SCIM didático e SoD.
- `01-IAM/IAM-Study-Lab.md`: material original preservado como arquivo histórico.

## Qualidade e honestidade sobre os laboratórios

**Não confunda** simulação CSV, especificação conceitual, laboratório real em software local ou execução em Microsoft. A aula de JML ensina criação, movimentação e bloqueio no Active Directory ou Microsoft Entra de laboratório, sem dependência de Docker. Outras unidades com ferramentas externas ainda exigem validação prática específica; um build do site não valida o produto.

## Rodar localmente

```bash
python -m pip install -r requirements-docs.txt
python site/build.py
python site/check_build.py
python -m http.server 8000 --directory dist
```

Abra http://localhost:8000. Em push na `main`, o GitHub Actions valida e envia o pacote para `gh-pages`.

## Custos e segurança

Uma licença Entra ID P2 **não** cobre automaticamente outros usuários, Azure ou produtos Governance. Laboratórios open source são a rota principal. Use dados fictícios e não exponha contêineres em modo de desenvolvimento à Internet. O progresso no site fica apenas no navegador; exporte regularmente.

O Roadmap-Study é uma formação independente e não integra outros repositórios.
