# Auditoria de UX e organização — IAM Roadmap

Revisão: 29 de outubro de 2026.

## Diagnóstico e correções

| Gravidade | Problema | Evidência anterior | Solução implementada |
|---|---|---|---|
| Alta | Site não usa a largura disponível | app-shell max-width 1740px e page-content max-width 1360px | Shell e conteúdo com largura total, padding fluido e grids responsivos |
| Alta | Laboratório distante do estudo | Páginas distintas para roteiro e recursos | Rota Jornada concentra as 41 aulas, configuração do ambiente e orçamento |
| Alta | Excesso de menus laterais e navegação | Sidebar, índices, filtros, módulos e controles paralelos | Menu lateral único com quatro destinos, filtros recolhidos e drawer móvel acessível |
| Alta | Arquitetura não reúne todas as configurações | Diagrama parcial mais tabelas | Atlas derivado das aulas, com 14 sistemas, 15 fronteiras, seis movimentos e 296 microetapas |
| Média | Visual azul e superfícies inconsistentes | Múltiplas camadas CSS | Paleta preta, grafite e branco, no arquivo monochrome.css |
| Média | Pouca animação de navegação | Apenas movimento curto de entrada | Transições de entrada, microinterações, tabs e progresso fluido |
| Média | Home pouco informativa | Introdução e quadro de progresso | Home com prévia do laboratório, continuação, métricas e 11 módulos |
| Média | Falta de inspeção visual automatizada | Apenas validação de sintaxe | Teste Playwright para desktop/mobile, navegação e overflow |

## Nova navegação

1. **Início:** progresso, próxima lição, topologia da Aurora, visão das 11 fases e ações imediatas.
2. **Jornada:** estudo e laboratório são a mesma experiência. Painel expansível de Windows 11 Pro, VirtualBox, marcos e custo; 41 aulas em sequência.
3. **Arquitetura:** mostra o estado final: configuração, ativos, identidades, fluxos, regras, movimentações e atlas completo.
4. **Certificações:** cartões compactos com LED vermelho para prioridade central da trilha (SC-300), amarelo para recomendadas (SC-900/AZ-900/SC-100), cinza para opcionais e verde para concluídas. A classificação é editorial, não uma exigência oficial.

Links existentes para #laboratorio continuam funcionando e abrem o painel integrado à Jornada. Links #task- e #module- continuam abrindo as aulas. Links #arch- levam às partes do atlas e da arquitetura.

## Design system

- Fundo preto #050505, superfícies grafite e destaques brancos/cinza com brilho moderado.
- Menu lateral compacto de 252px no desktop; o conteúdo ocupa toda a largura restante, sem limite central de 1360px.
- Textos de leitura preservam largura confortável em colunas, enquanto o shell ocupa a janela.
- Barra superior adaptável, com rolagem horizontal de links em celular.
- Entradas de página com transição em torno de 580 ms, cards animados e indicador ativo de navegação.
- Preferência por movimento reduzido respeitada.
- Tabelas largas têm rolagem local. Diagramas podem ser ampliados; atlas ocupa a largura inteira e pode crescer verticalmente.

## Cobertura técnica da topologia

O Atlas lê o mesmo curriculum.js utilizado pelo leitor de aulas. Cada uma das 296 microetapas aparece com título, ambiente, instrução, finalidade, comando quando existe e resultado esperado, sem duplicar os dados na base.

**14 sistemas/componentes:** RH, HOST01, DC01, CL01, Entra, Cloud Sync, Keycloak, APP01, SCIM, IGA, PAM/PIM, Intune, Azure/workloads e Auditoria.

**15 relações:** comunicação de diretório, sincronização, login, provisionamento, autorização, governança, dispositivos, serviços e logs.

**Seis movimentações:** J001, M001, L001, R001, SOD01 e SEC01, com teste e ligação à lição correspondente.

Limites importantes: Cloud Sync propaga objetos AD → Entra no escopo configurado, mas não alimenta automaticamente Keycloak ou cadastro SCIM. Conditional Access do Entra não protege automaticamente a APP01 autenticada pelo Keycloak. A arquitetura registra essas fronteiras para evitar falsos laboratórios integrados.

## Como verificar

1. Executar node scripts/validate.mjs para checar sintaxe, conteúdo, rotas e contagens.
2. Executar node scripts/e2e.mjs com Playwright Chromium para testar janela de 1600px, celular de 390px, navegação, laboratório e atlas.
3. Conferir o relatório e as capturas de tela do GitHub Actions.
4. Em testes reais, verificar layout, foco, leitura de código, contraste, responsividade e a opção de movimento reduzido.

Os testes cobrem comportamento básico, mas não substituem revisão visual completa em vários dispositivos.

## Limitações e evolução

O portal é estático (GitHub Pages). Não cria recursos em AD/Entra/Azure nem valida automaticamente as operações; o estudante registra a execução real, parcial ou simulada. O projeto preserva os estilos antigos por compatibilidade, aplicando o tema monocromático por último. Uma limpeza futura poderá consolidar CSS redundante após validação completa, sem afetar o estudo.

O orçamento permanece limitado a R$ 200/mês e a recomendação inicial continua R$ 0.
## Revisão incremental — menu lateral e certificações (29/10/2026)

A pedido do estudante, o menu lateral retornou sem desfazer o layout em preto/grafite e o atlas técnico completo. No desktop o menu permanece à esquerda, usa aproximadamente 228–252px conforme resolução e mostra quatro destinos mais um resumo do progresso. Em telas estreitas, transforma-se em drawer com botão, backdrop, fechamento por Escape, foco contido no diálogo e conteúdo principal inerte enquanto está aberto.

A listagem de certificações foi compactada em cartões menores, com nome e resumo limitado a duas linhas por padrão, detalhes técnicos expansíveis e filtros por fornecedor/categoria. LEDs luminosos indicam prioridade editorial e acompanhamento: vermelho (SC-300, marco central da trilha IAM), amarelo (SC-900, AZ-900 e SC-100), cinza (alternativas/opcionais) e verde (concluída, status autodeclarado). O status verde **substitui** a cor da prioridade da certificação. O roteiro não exige certificação prévia para começar; nenhuma classificação editorial altera os pré-requisitos oficiais dos fornecedores.

O teste Chromium inclui confirmação de menu lateral desktop e móvel, persistência do progresso das certificações, troca de filtros e prevenção de overflow em 390, 1600 e 2560px.

## Auditoria de usabilidade adicional — 29/10/2026

### Ajustes aplicados nesta revisão

| Prioridade | Achado | Correção |
|---|---|---|
| Alta | As quatro luzes e a explicação de classificação eram repetidas sobre os próprios cartões das certificações. | Removidas a legenda visual e a nota. O cartão preserva seu LED, a prioridade legível e o filtro correspondente. |
| Alta | A aula tinha duas camadas de confirmação: microetapas já conferidas e uma seção obrigatória “Validar e registrar evidência”. | A seção redundante foi substituída por **Concluir aula**: progresso das microetapas, seleção da modalidade real/parcial/simulação e conclusão. Nenhum formulário adicional de evidências é obrigatório. |
| Média | Notas pessoais e testes extras ocupavam muita área visual e interrompiam o aprendizado. | Notas permanecem disponíveis em bloco **opcional e recolhido**. Critérios técnicos e resultados esperados continuam documentados no currículo e na topologia, sem checklist duplicado na aula. |
| Média | Filtros muito específicos podiam resultar em uma listagem vazia sem ação evidente de recuperação. | O estado vazio agora mostra **Limpar filtros**, retornando imediatamente às aulas. |
| Alta | O atalho **Continuar** no cabeçalho estava fixo na primeira aula. | Agora segue a próxima aula pendente conforme o progresso salvo. |
| Baixa | Existia botão oculto “Recolher módulos” sem função visível e link de documentação com seta repetida. | Controle morto removido e link corrigido. |
| Média | O Atlas completo era reconstruído ao voltar à Arquitetura, apesar de não haver alteração em progresso. | Cache simples da renderização por assinatura de aulas/microetapas concluídas; reconstrução apenas quando os dados relevantes mudam. |

O progresso pré-existente, inclusive confirmações antigas de testes e notas exportadas, continua preservado no armazenamento e nos backups. A interface de conclusão da aula **não exibe nem exige** a antiga lista separada de testes.

### Pendências não bloqueantes identificadas

- **CSS legado acumulado:** o projeto carrega base, experiências anteriores, tema monocromático e ajustes laterais. A consolidação reduziria manutenção e risco de conflitos de especificidade; exige revisão visual completa para não perder o estilo aprovado.
- **Atlas grande no primeiro acesso:** são 296 microetapas apresentadas na arquitetura. A navegação posterior evita reconstruções desnecessárias, mas o primeiro render ainda cria muitos elementos. Uma possível etapa futura é carregar o conteúdo interno de cada módulo somente quando expandido, preservando links diretos.
- **Acessibilidade assistiva:** testes automatizados cobrem navegação e foco básico, mas ainda é recomendado testar manualmente leitores de tela (NVDA no Windows 11), contraste dos LEDs e comportamento ao ampliar o navegador para 200%.
- **Persistência local:** o portal não fornece sincronização de dados entre dispositivos. Continua necessário exportar backups, sem registrar senhas, tokens ou dados reais no navegador.

A revisão conserva o princípio de estudar no próprio ritmo e de separar execuções reais de simulações, sem exigir documentação burocrática extra por aula.
