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
