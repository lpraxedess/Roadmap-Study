# Roadmap IAM

**Site:** https://lpraxedess.github.io/Roadmap-Study/

Site estático para acompanhar estudos de infraestrutura, Active Directory, Microsoft Entra ID e Intune.

## Funcionalidades
- 5 fases e 17 etapas, com materiais de estudo.
- Checkboxes, percentual concluído, próxima etapa, busca e filtros.
- Progresso salvo localmente no navegador, sem cadastro ou backend.
- Exportação/importação de backup em JSON validado.
- Responsivo, sem frameworks, dependências ou build.

## Estrutura
- `index.html`: página.
- `style.css`: estilos.
- `app.js`: roadmap e interações.
- `.nojekyll`: publicação estática.

Edite `PHASES` em `app.js` para alterar o conteúdo. Mantenha estáveis os identificadores de etapas para preservar os checkboxes existentes.

### GitHub Pages
Em **Settings → Pages**, selecione **Deploy from a branch → main → /(root)**. O endereço será https://lpraxedess.github.io/Roadmap-Study/.

### Dados e segurança
O site não acessa sistemas Microsoft nem valida automaticamente exercícios. Use somente ambientes autorizados e dados fictícios, escopo piloto, conta de emergência protegida e Report-only ao planejar acesso condicional. Recursos premium podem exigir licenças. O armazenamento local não sincroniza dispositivos: exporte backups.

### Migração
A versão anterior continha 36 laboratórios e 189 tarefas. Este projeto condensa o percurso em 17 marcos; marcações antigas não são importadas automaticamente devido à diferença entre IDs. Salve o progresso antigo antes de substituir o site, se necessário.
