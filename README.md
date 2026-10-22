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
- `style.css`: layout e animações, incluindo preferência por movimento reduzido.
- `app.js`: currículo, interações e armazenamento local (sem backend).
- `AUDITORIA-DOCUMENTAL.md`: fontes verificadas, limitações e correções fundamentadas.
- `tests/validate-roadmap.mjs`: verificações estruturais e sintáticas com Node.js, sem dependências externas.

## Testes

```sh
node --check app.js
node tests/validate-roadmap.mjs
```

Estes testes **não** representam execução real dos laboratórios nem teste de navegação visual em um browser. Fontes e caminhos de menu podem mudar. Consulte os links atualizados antes de aplicar configurações.

## Dados e privacidade

O progresso geral permanece em `roadmap-iam-progress-v2`; as confirmações dos passos usam `roadmap-iam-steps-v1`, ambos no armazenamento local do navegador. Nada é enviado para servidor do projeto.

## Menu lateral e certificações — 22/10/2026

- **Desktop:** menu lateral persistente, com atalhos para os dez módulos e progresso de cada módulo.
- **Celular e tablet:** botão **Menu** abre um painel; feche pelo botão, pelo fundo escurecido ou com `Escape`. A navegação permite teclado e mantém indicador da seção ativa.
- **Roadmap de certificações:** nove opções distribuídas entre iniciante, intermediário e avançado. Eixo recomendado: **SC-900 → SC-300 → SC-100**; as demais são caminhos complementares, não requisitos obrigatórios.
- Status das certificações: **Planejada / Em preparação / Conquistada**. Armazenado em `roadmap-iam-certifications-v1`, exportável/importável no backup JSON v3.
- O status **Conquistada é autodeclarado** e não comprova emissão da certificação. Consulte os links oficiais para requisitos, disponibilidade e preços.

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
