# AtlasCorp — laboratórios reproduzíveis

Esta pasta entrega componentes executáveis para a plataforma IAM. O GitHub Pages apenas apresenta os roteiros: NÃO instala softwares, NÃO executa comandos e NÃO configura contas ou serviços.

## Arquivos

| Componente | Local | Tipo |
|---|---|---|
| Baseline de Active Directory | local/scripts/Initialize-AtlasCorpAD.ps1 | PowerShell com WhatIf e confirmação |
| Teste do diretório | local/scripts/Test-AtlasCorpAD.ps1 | PowerShell somente leitura |
| Keycloak | local/docker-compose.yml | Container start-dev limitado a loopback |
| Aplicação de teste OIDC | local/oidc_app.py | Flask/Authlib, authorization code + PKCE |
| SP SAML 2.0 | local/saml-sp/app.cjs | Passport SAML, assinatura da assertion |
| SCIM Users | local/scim_server.py | Python stdlib, SQLite e Bearer, implementação parcial |
| Testes SCIM | local/tests/test_scim.py | Testes HTTP automatizados |

Consulte o guia de execução [local/README.md](local/README.md).

## Ordem para um iniciante

1. Crie as VMs em rede Host-only privada, com NAT somente para atualizações. Use **até 2 VMs simultaneamente**, pois o host tem 16 GB de RAM.
2. Instale Windows Server Evaluation e AD DS num domínio fictício atlas.lab. Faça snapshots e registre DNS/IP.
3. Rode scripts de inventário e criação do AD com WhatIf. Nunca execute em domínio diferente de laboratório.
4. Inicie Keycloak no Ubuntu de laboratório; configure usuários, realm e roles; valide login e logs.
5. Suba as aplicações OIDC e SAML somente em loopback e teste operações permitidas e negadas com roles distintas.
6. Execute a API SCIM para provisionamento, desativação e reconciliação por externalId.
7. Só depois avance ao tenant Entra ID e às políticas Cloud usando grupo piloto, contas de emergência e Report-only.
8. Registre evidências reais, simulações e teoria **separadamente**. Não declare prática real sem configuração observada.

## Licenciamento e orçamento

Teto de R$ 200 mensais para todas as licenças Microsoft, incluindo impostos. Os US$ 200 promocionais Azure já foram utilizados. Meta de consumo de recursos Azure: **R$ 0**, com Azure RBAC/Key Vault/Managed Identities apenas como complemento opcional e com aprovação explícita de custo. Capítulos de Azure, Purview e multi-cloud podem ser dispensados com motivo documentado, sem fingir execução.

## Critério de conclusão responsável

Para cada competência, guarde: mudança autorizada, ator fictício, cenário, pré-requisito, comando/versão, resultado esperado, resultado observado, prova de acesso permitido e negado, log UTC, rollback e classificação real/simulado/teórico. Questionários formativos não substituem demonstração prática.

As instruções e scripts são de **laboratório**, não de produção. Não guarde secrets, senhas, tokens, dados pessoais reais ou private keys no repositório ou no backup de navegador.
