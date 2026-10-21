# IAM Atlas — Plataforma prática de Identity & Access Management

Ambiente educacional estático para desenvolver competências de IAM, com dashboard preto, detalhes roxos, interações animadas e um grafo interativo de relações entre identidade, política e acesso.

**Site:** https://lpraxedess.github.io/Roadmap-Study/

## Estrutura de aprendizado

- **28 competências em 6 níveis**, com objetivos, pré-requisitos, atividades de laboratório, critérios de verificação e entregáveis.
- **6 laboratórios guiados** com passo a passo, checklist e validação.
- **5 trilhas profissionais**: IAM Analyst, IAM Engineer, IGA Specialist, PAM Specialist e IAM Architect.
- **12 certificações específicas**, separadas por dificuldade e priorizadas como **essencial**, **recomendada** ou **opcional** para determinada carreira.
- **Visão geral unificada:** dashboard, progresso por nível, próximos estudos, checklists e ferramentas de backup.
- **Roadmap filtrável** por competências pendentes ou concluídas.
- Visualização 3D **projetada em Canvas 2D** (sem bibliotecas ou WebGL) e animações compatíveis com a preferência do sistema por movimento reduzido.

### Como estudar

1. Siga os níveis do roadmap e leia o objetivo e os pré-requisitos de cada competência.
2. Execute os passos com **dados fictícios em ambiente próprio ou autorizado**.
3. Marque as atividades de cada competência e confira o critério de validação.
4. Guarde o entregável no portfólio; somente então marque a competência como concluída.
5. Escolha uma trilha profissional e uma certificação alinhada ao seu ambiente de trabalho.

**Atenção às certificações:** o selo **essencial** significa prioridade *para a trilha indicada*, não obrigatoriedade legal nem exigência universal de contratação. Exemplo: SC-300 para uma carreira orientada ao Microsoft Entra. A classificação é recomendação editorial do IAM Atlas; verifique os requisitos e a validade nos sites oficiais.

## Como os arquivos estão organizados

| Arquivo | Função |
| --- | --- |
| `index.html` | Interface principal, navegação, tópicos e persistência |
| `atlas-pro.css` | Componentes e estados do design system |
| `atlas-pro.js` | Visualização geométrica 3D, feedback e interações |
| `atlas-curriculum.js` | Conteúdo detalhado dos 28 estudos e validação dos laboratórios |
| `scripts/quality-check.mjs` | Validação estática de scripts, dados e consistência |
| `.github/workflows/quality.yml` | Auditoria de código automática em mudanças no repositório |
| `AUDITORIA.md` | Achados, correções e limites conhecidos |

O projeto é estático: **GitHub Pages, sem backend, build ou dependências externas**. A linguagem é HTML5, CSS3 e JavaScript moderno.

## Dados do usuário e backup

- O progresso e os checklists são salvos no **`localStorage`** do navegador.
- Não há conta, rastreamento ou sincronização entre dispositivos.
- Na **Visão geral**, use **Exportar progresso** para salvar um JSON com suas conclusões e checklists. **Importar backup** aceita o formato atual e também backups anteriores, que não incluem checklists.
- Limpar os registros apaga os dados de estudo salvos neste dispositivo. Não é possível recuperá-los sem backup.

## Publicação

GitHub: **Settings → Pages → Deploy from a branch → main → /(root)**.

## Segurança e limitações

Os laboratórios são guias de estudo, não ambientes virtuais hospedados. Alguns exercícios podem precisar de VMs, diretórios, aplicações de demonstração ou produtos de terceiros configurados pelo estudante. Algumas plataformas possuem custos ou requisitos próprios.

O IAM Atlas é independente e não tem vínculo com os fabricantes de certificação. Consulte sempre a documentação oficial atualizada.
