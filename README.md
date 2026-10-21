# IAM Atlas — Plataforma interativa de IAM

O **IAM Atlas** é uma plataforma educacional independente para estudar **Identity & Access Management (IAM)**, com dashboard escuro, interações responsivas e progressão prática.

## Conteúdo

- **18 competências** distribuídas em **6 níveis**, com exercícios e documentação de referência.
- **6 laboratórios guiados** com etapas, objetivos e entregáveis.
- **5 trilhas profissionais**: IAM Analyst, IAM Engineer, IGA Specialist, PAM Specialist e IAM Architect.
- **12 certificações** organizadas em níveis básico, intermediário e avançado.
- Progresso individual por competência, laboratório e certificação; importação e exportação em JSON.

## Experiência de interface

- Dashboard **preto com detalhes roxos**, barra lateral fixa e design responsivo.
- **Visualização 3D de relações IAM**, renderizada com Canvas 2D e projeção geométrica 3D; gire arrastando ou usando as setas do teclado.
- Abertura animada de assuntos e certificações, efeitos sutis de profundidade e realces no cursor.
- **Busca rápida global** (Ctrl+K / Cmd+K ou tecla `/`), com navegação direta para assuntos e certificações.
- Filtros de competências: todas, pendentes e concluídas.
- Animações adaptadas a **prefers-reduced-motion**.

## Organização

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Conteúdo educacional, navegação e armazenamento local |
| `atlas-pro.css` | Design system, grid responsivo e estados visuais |
| `atlas-pro.js` | Gráfico 3D, busca global, microinterações e acessibilidade |

O projeto é estático: **não precisa de backend, instalação nem processo de build**. O gráfico 3D não depende de bibliotecas externas ou CDN.

## Publicação no GitHub Pages

Nas configurações do repositório: **Settings → Pages → Deploy from a branch → main → /(root)**.

**Acesso:** https://lpraxedess.github.io/Roadmap-Study/

## Privacidade e observações

O progresso é salvo em `localStorage` e não sai do navegador automaticamente. Para fazer backup ou migrar de dispositivo, utilize a exportação/importação JSON em **Meu progresso**.

Os exercícios devem ser realizados em ambientes próprios ou autorizados. O IAM Atlas não possui vínculo com os fabricantes citados; consulte sempre as páginas oficiais para requisitos atuais de certificação.
