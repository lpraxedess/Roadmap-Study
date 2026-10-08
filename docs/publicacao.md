# Publicação do IAM Academy no GitHub Pages

O portal usa **HTML, CSS e JavaScript** para a interface visual. O conteúdo das aulas está em Markdown apenas como fonte interna, convertida para HTML e JSON pelo gerador Python.

## Build local

```bash
python -m pip install -r requirements-docs.txt
python site/build.py
python site/check_build.py
python -m http.server 8000 --directory dist
```

Acesse `http://localhost:8000/`. O diretório `dist/` não precisa ser versionado no Git.

## Publicação automática

O workflow `.github/workflows/docs.yml`:

1. Executa os testes da simulação JML.
2. Gera o site em `dist/` a partir de `docs/`.
3. Valida a estrutura do bundle e o conteúdo.
4. Se a branch for `main`, publica `dist/` na branch `gh-pages`.

### Ativar o GitHub Pages

No GitHub, abra **Settings → Pages**, escolha **Deploy from a branch**, selecione **gh-pages** e **/(root)**. A opção `gh-pages` aparece após a primeira publicação bem-sucedida.

Confira também **Settings → Actions → General → Workflow permissions**, garantindo que a ação tenha permissões de escrita para criar/atualizar `gh-pages`. Organizações podem restringir essas permissões.

Depois da ativação, o endereço previsto é:

```text
https://lpraxedess.github.io/Roadmap-Study/
```

A URL só pode ser tratada como publicada quando a implantação terminar e o endereço abrir no navegador.

## Progresso e privacidade

O site não usa banco, login nem servidores de usuários. As marcações de conclusão ficam no navegador atual e podem ser exportadas/importadas na aba Competências. Não faça upload de arquivos contendo tokens, credenciais, dados pessoais ou registros de ambientes profissionais.

## Separação dos repositórios

