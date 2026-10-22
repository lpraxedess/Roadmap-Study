# Auditoria técnica e de experiência — IAM / ROADMAP

**Data:** 22/10/2026  
**Escopo:** código-fonte, layout, navegação, persistência, animações e testes automatizados.  
**Não incluído:** execução real dos laboratórios de IAM nem revalidação individual de todos os certificados e links. Consulte `AUDITORIA-DOCUMENTAL.md` para a revisão documental específica.

## Diagnóstico

| Área | Problema identificado | Correção |
| --- | --- | --- |
| Organização do código | Currículo e lógica coexistiam em `app.js` de cerca de 160 KB | Extraídos 10 módulos / 37 competências / 369 passos para `curriculum.js`; `app.js` passou a concentrar interface e armazenamento (~16 KB) |
| Estado dos módulos | O restaurador salvava `dataset.id` dos módulos, que não existia, e podia reabrir todos ao marcar uma competência | Restauração limitada aos IDs reais de `#roadmap-list details[open][id]` |
| Navegação | Uso de `replaceState` para todas as páginas apagava passos do histórico; âncora do backup podia apontar para página oculta | `pushState`, suporte a Voltar/Avançar, links profundos, foco programático no título e resolução de `#backup-title` |
| Hierarquia visual | Ícones Unicode desalinhados, conteúdo com bordas excessivas e diferenciação insuficiente de interação | SVG com mesmo `viewBox`, azul neon concentrado em ações/progresso, texto branco e superfícies pretas/grafite |
| Animações | Mais de um observador tentava animar a mesma troca de página | Transição de páginas com View Transitions API (fallback CSS), animação controlada de accordions e feedback breve de clique |
| Responsividade | Restrições antigas de largura desperdiçavam espaço; risco de overflow em celular | Grade fluida, drawer sob 1050 px, controles com quebras menores e otimização extra em 320 px |
| Certificações | 18 itens sem refinamento por fornecedor | Filtro por emissor mantendo estado de cada certificação e grupos por nível |
| Navegação nos estudos | Busca dependia de mouse; fechar módulos exigia clicar um a um | Atalhos `/` e `Ctrl/⌘+K`, `Escape` para limpar e botão **Recolher módulos** |
| Feedback e acessibilidade | A confirmação nem sempre aparecia na página ativa | Barra de evolução na lateral, avisos transitórios e foco preservado; `prefers-reduced-motion` respeitado |
| Testes | Cobertura somente de integridade estática | Inclusão de teste sem dependências npm com Chrome real via CDP: navegação, conclusão, persistência, filtros, histórico, drawer e largura |

## Direção visual

A interface mantém fundo **#050506** e superfícies escuras, com azul neon **#39baff** como destaque. A navegação tem peso visual reduzido para priorizar o material de estudo. Ícones SVG locais evitam desalinhamento e downloads extras. O conteúdo denso usa listas compactas e só expande instruções longas quando necessário.

Inspirado em princípios publicados de design de interfaces densas e plataformas de aprendizagem:

- [Linear — A calmer interface for a product in motion](https://linear.app/now/behind-the-latest-design-refresh)
- [Microsoft Learn — Browse all training](https://learn.microsoft.com/en-us/training/modules/)
- [W3C — Animation from Interactions (WCAG 2.3.3)](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)
- [Chrome — Same-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)

## Contratos preservados

- **Dados locais:** `roadmap-iam-progress-v2`, `roadmap-iam-steps-v1` e `roadmap-iam-certifications-v1`.
- **Backup:** JSON v3 (continua importando v2), com competências, passos e situação de certificações.
- **Navegação:** apenas três entradas na lateral: Visão geral, Estudos e Certificações. Dez módulos inicialmente recolhidos em Estudos.
- **Conteúdo:** 10 módulos, 37 competências, 369 passos, 18 certificações, respectivas fontes e avisos de licenciamento preservados.

## Verificação

- `node --check curriculum.js app.js navigation.js motion.js` (comandos individuais no CI).
- `node tests/validate-roadmap.mjs`: integridade de IDs, dados, armazenamento e controles.
- `node tests/ui-smoke.mjs`: Chrome headless real, incluindo captura dos estados de desktop e celular. Testa larguras representativas, inclusive 320 px e 2560 px.
- Ações do GitHub armazenam capturas de tela da execução na pasta de artefatos do workflow por sete dias.

**Limites:** testes de navegador automatizados não substituem exploração manual em leitores de tela, dispositivos e navegadores alternativos. As certificações, custos e nomes de exames devem ser conferidos nos portais oficiais antes da inscrição.
