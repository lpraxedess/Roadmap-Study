# Publicar o portal gratuitamente

A documentação utiliza **MkDocs Material**. O GitHub Pages precisa ser ativado nas configurações do repositório para disponibilizar o site.

## Testar localmente

Requer Python 3.10+ e Git:

```bash
python -m venv .venv
# Linux/macOS
source .venv/bin/activate
# Windows PowerShell: .venv\Scripts\Activate.ps1
python -m pip install -r requirements-docs.txt
mkdocs serve
```

Acesse o endereço local exibido no terminal.

## Gerar o site

```bash
mkdocs build --strict
```

## Publicar no GitHub Pages

Após revisar as configurações e permissões da conta, é possível publicar com:

```bash
mkdocs gh-deploy
```

Esse comando cria/atualiza a branch de publicação `gh-pages`. No GitHub, em **Settings → Pages**, selecione **Deploy from a branch** e a branch `gh-pages` (raiz). A URL esperada, **depois de publicar**, é `https://lpraxedess.github.io/Roadmap-Study/`.

**Não execute publicação sem revisar conteúdo e eventuais dados privados.** O repositório e o site são públicos.
