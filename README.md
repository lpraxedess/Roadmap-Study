# IAM / ROADMAP

Roadmap progressivo de IAM, disponível como site estático em https://lpraxedess.github.io/Roadmap-Study/.

## Usar o projeto

1. Prepare contas **fictícias** e um tenant de **laboratório**. Não use produção.
2. Abra uma competência e leia seus pré-requisitos, teoria e links oficiais.
3. Execute cada passo; confirme a opção **Executei e conferi este passo** apenas quando o resultado estiver verificado.
4. Registre evidências sem senhas, tokens, recovery keys ou dados pessoais reais.
5. Conclua a competência depois dos passos e dos testes de aceite. Uma **simulação** deve ser identificada claramente.
6. Use **Exportar** para salvar progresso e passos (backup v3). Backups v2 continuam importáveis.
7. Verifique licenciamento antes de usar PIM, Conditional Access, Intune, Identity Governance e recursos Azure.

## Organização

- `index.html`: interface da página.
- `style.css`: sistema visual, layout responsivo e feedback de interação.
- `curriculum.js`: os 10 módulos, 37 competências e 369 passos, separados do código da interface.
- `app.js`: renderização dos estudos, filtros e armazenamento local (sem backend).
- `navigation.js`: troca de páginas, menu acessível, histórico e 18 certificações.
- `motion.js`: feedback de toque/click, animações discretas e respeito a movimento reduzido.
- `AUDITORIA-DOCUMENTAL.md`: fontes verificadas, limitações e correções fundamentadas.
- `AUDITORIA-UX-TECNICA.md`: diagnóstico de interface, refatoração e cobertura de testes.
- `tests/validate-roadmap.mjs`: verificações estruturais e de regressões.
- `tests/ui-smoke.mjs`: teste de interface em Chrome/Chromium real via CDP (desktop e mobile), sem pacotes npm; gera capturas em `_artifacts/` durante o CI.

## Testes

```sh
node --check curriculum.js
node --check app.js
node --check navigation.js
node --check motion.js
node tests/validate-roadmap.mjs
node tests/ui-smoke.mjs  # requer Chrome ou Chromium no PATH
```

Os testes estruturais não executam laboratórios reais; o teste de navegador cobre troca de páginas, drawer móvel, filtros, persistência e overflow horizontal em múltiplas larguras, mas **não substitui uma revisão visual humana**. Fontes e caminhos de menu podem mudar. Consulte os links atualizados antes de aplicar configurações.

## Dados e privacidade

O progresso geral permanece em `roadmap-iam-progress-v2`; as confirmações dos passos usam `roadmap-iam-steps-v1`, ambos no armazenamento local do navegador. Nada é enviado para servidor do projeto.

## Menu lateral e certificações — 22/10/2026

- **Desktop:** menu lateral persistente com **3 páginas**: Visão geral, Estudos e Certificações. Os dez módulos ficam dentro de Estudos, inicialmente recolhidos. Progresso geral aparece na lateral.
- **Celular e tablet:** botão **Menu** abre um painel; feche pelo botão, pelo fundo escurecido ou com `Escape`. A navegação permite teclado e mantém indicador da seção ativa.
- **Roadmap de certificações:** 18 opções de Microsoft, ISC2, ISACA, Okta, CyberArk, SailPoint e AWS, com filtro por fornecedor, agrupadas por nível. Eixo recomendado: **SC-900 → SC-300 → SC-100**; as demais são caminhos complementares, não requisitos obrigatórios.
- Status das certificações: **Planejada / Em preparação / Conquistada**. Armazenado em `roadmap-iam-certifications-v1`, exportável/importável no backup JSON v3.
- O status **Conquistada é autodeclarado** e não comprova emissão da certificação. Consulte os links oficiais para requisitos, disponibilidade e preços.
- **Busca rápida:** pressione `/` ou `Ctrl/⌘ + K` para abrir Estudos e focar a busca; `Escape` limpa a pesquisa. Use **Recolher módulos** para fechar os módulos abertos.
- **Navegação:** utiliza histórico do navegador e transições de página progressivas quando suportadas; respeita `prefers-reduced-motion` do sistema. Os ícones usam SVG local, sem dependências externas.
- Os códigos de certificação e requisitos podem mudar: confirme os detalhes sempre no fornecedor oficial.

### Atualizações de exames importantes

- AZ-500 descontinuada em **31/08/2026**; a alternativa Cloud + AI Security Engineer é **SC-500**.
- MS-102 tem encerramento anunciado em **30/11/2026**; não foi incluída na trilha recomendada.
- SC-100 **não exige SC-900**, mas o título Expert exige **SC-100 e pelo menos uma credencial associada elegível**, como SC-300, SC-200 ou SC-500.
- CISSP e CISM exigem **experiência profissional comprovada** para o título completo.

Referências oficiais:
- [SC-900](https://learn.microsoft.com/pt-br/credentials/certifications/exams/sc-900/)
- [SC-300](https://learn.microsoft.com/pt-br/credentials/certifications/identity-and-access-administrator/)
- [SC-100](https://learn.microsoft.com/pt-br/credentials/certifications/cybersecurity-architect-expert/)
- [SC-500](https://learn.microsoft.com/en-us/credentials/certifications/cloud-and-ai-security-engineer-associate)
- [Provas Microsoft descontinuadas](https://learn.microsoft.com/en-us/credentials/support/retired-certification-exams)
- [CISSP](https://www.isc2.org/certifications/cissp)
- [CISM](https://www.isaca.org/credentialing/cism/get-cism-certified)
- [Okta](https://www.okta.com/pt-br/services/certification/)
- [CyberArk / Idira](https://training.cyberark.com/)
- [SailPoint](https://community.sailpoint.com/programs/certifications-and-credentials)
- [AWS](https://aws.amazon.com/pt/certification/)

## Continuidade e filtros de estudo

O painel inicial apresenta **Retomar estudos** e progresso percentual por módulo. Ao abrir uma competência, seu identificador é salvo localmente em `roadmap-iam-last-topic-v1`; o botão **Retomar** reabre a competência, inclusive após recarregar a página. O backup JSON v3 exporta opcionalmente `lastTask`, sem alterar as chaves de progresso anteriores. A importação aceita backups v2 e v3; **Zerar** também apaga o último tópico.

Em **Estudos**, os filtros avançados permitem selecionar módulo, faixa de aprofundamento (01–03 fundamentos, 04–07 intermediário e 08–10 avançado), tecnologia mencionada no material e certificação. A associação entre certificações e módulos utiliza as referências de laboratórios cadastradas e serve como orientação, não como equivalência oficial entre conteúdos e exames. A busca textual continua combinável com os filtros e o botão **Limpar filtros** restaura a lista completa.

Os testes automatizados verificam retomada, persistência, filtros, navegação e responsividade. As faixas de aprofundamento são uma classificação editorial da trilha, não uma dificuldade oficial emitida por certificadoras.
