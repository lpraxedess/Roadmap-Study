# Roadmap Study — IAM e Segurança da Informação

Portal de estudos em português com foco em **Identity and Access Management (IAM)** e trilha complementar de segurança operacional, organizado a partir de seis vagas de emprego analisadas.

## Acessar

Quando o GitHub Pages estiver habilitado: https://lpraxedess.github.io/Roadmap-Study/

## O que está incluído

- 18 módulos: teoria, aplicação corporativa, laboratório, critério de conclusão e documentação oficial.
- Rota de especialização IAM/PAM, incluindo **Authentik**, Keycloak, Active Directory, Entra ID, RBAC, MFA, SSO, SAML, OAuth 2.0, OIDC, SCIM, IGA, JML, PAM e ITSM.
- Rota complementar para as vagas generalistas: SIEM/Wazuh, SOC, EDR/XDR, gestão de vulnerabilidades, hardening, Google Workspace, DLP, MDM, backups e patching.
- Matriz curricular com seis anúncios: SPDM, Autopass, Tempest, DUX, inventCloud e Wtime.
- Busca e filtros; progresso em `localStorage` (apenas no navegador).
- Site HTML/CSS/JS sem dependências, responsivo e adequado a hospedagem estática.

## Publicar no GitHub Pages

Em **Settings → Pages**, escolha **Build and deployment → Deploy from a branch**, selecione `main` e `/(root)`, salve. O arquivo `index.html` será servido como página inicial. Caso o Pages já esteja ativo para este repositório, o novo commit pode ser publicado automaticamente. Disponibilidade e configuração dependem das permissões e do estado do serviço GitHub Pages.

## Verificações manuais sugeridas

1. Acessar o portal no celular e desktop.
2. Buscar `SCIM`, `Authentik` e `Wazuh` e verificar os resultados.
3. Filtrar cada categoria.
4. Marcar um módulo, recarregar a página e confirmar persistência.
5. Usar o botão de reinicialização e verificar o comportamento.
6. Conferir os links externos e erros de console.

## Limitações e próximas etapas

Esta entrega é um **MVP curricular**, não um curso completo já ministrado: a teoria e as práticas estão descritas resumidamente. Para chegar ao nível de apostila técnica, expandir cada módulo em páginas individuais com procedimentos reproduzíveis, comandos completos, questões, respostas e evidências. Não há conta de usuário, banco de dados, sincronização de progresso nem validação automática de laboratórios.

Os requisitos das vagas foram informados pelo usuário e **não devem ser interpretados como certificação de empregabilidade**. Experiência de laboratório não substitui vivência profissional.

## Segurança

Todos os laboratórios devem usar dados fictícios e ambientes próprios. Não versionar credenciais, tokens nem logs sensíveis.