# IAM Atlas — Roadmap de Identity & Access Management

Guia progressivo de **IAM do básico à arquitetura avançada**, com teoria independente de fornecedor, laboratórios guiados e mapeamento de certificações. O foco operacional principal é **Microsoft Entra ID + Intune + Azure + Purview**; os mesmos princípios são comparados com AD DS, AWS IAM, Google Cloud IAM, Okta, Keycloak, SailPoint e CyberArk.

> Ferramenta educativa estática, não um sistema IAM que aplica políticas em produção.

## O que você encontra

- **28 módulos, 234 tópicos**, cada qual com descrição, contexto, roteiro e critério de conclusão.
- **16 laboratórios progressivos** com passos, pré-requisitos, licenças, evidências e alternativas sem licença.
- **24 entradas de certificações e frameworks** incluindo SC-900, SC-300, AZ-104, MD-102, SC-401, SC-100 e caminhos opcionais.
- Acompanhamento **autodeclarado** do nível de cada assunto (0 a 3), evidências de laboratório separadas e anotações locais.
- Busca, navegação, links diretos (exemplo: #topic/9/0 e #lab/lab-06), backup e restauração JSON.

## Como estudar

1. Comece por Fundamentos de TI, Identidade e segurança e Comprovação de identidade. Os módulos são pré-requisitos sugeridos, não bloqueios rígidos.
2. Prepare o laboratório inicial com contas fictícias, grupo piloto, inventário, orçamento e procedimento de limpeza.
3. Leia cada tópico, entenda o princípio transversal e consulte a documentação oficial.
4. Execute os passos no laboratório relacionado; se faltar licença, use a alternativa proposta e documente claramente a simulação.
5. Aplique o critério de conclusão e registre resultados verificáveis. A plataforma **não examina nem valida automaticamente o domínio**.
6. Evolua o mesmo ambiente: autenticação, SSO, autorização, device compliance, governança, dados e monitoramento.
7. Conclua o projeto final de IAM, separando implementação real, simulação e estudo teórico.

### Níveis de estudo

| Nível | Interpretação |
| --- | --- |
| 0 — Não iniciado | Não estudado |
| 1 — Estudando | Explica fundamentos |
| 2 — Pratiquei | Reproduziu laboratório ou evidência equivalente quando a prática não se aplica |
| 3 — Domino | Implementa, avalia e diagnostica sem roteiro |

O percentual exibido é **autoavaliação, não prova objetiva de competência nem de prontidão para exame**. Cada laboratório mantém checklist de evidências independente.

## Licenciamento e segurança

Condições de licença variam com produto, tenant, plano, região e atualização. Em geral, **Conditional Access** exige Entra ID P1; políticas de risco necessitam de P2. Recursos de Entra ID Governance, Intune, Purview e retenção/exportação de logs podem exigir licenças específicas. Recursos de Azure, AWS e Google Cloud podem gerar **cobranças reais**. Confira os [requisitos de licenciamento do Microsoft Entra](https://learn.microsoft.com/en-us/entra/fundamentals/licensing) antes de iniciar.

Use somente ambientes e contas de teste sob sua administração. Nunca publique senhas, tokens, credenciais, segredos ou dados reais. Não ative bloqueios globais sem contas de emergência, piloto e plano de reversão. Não execute wipe em dispositivo de uso real.

## Estrutura do repositório

| Caminho | Finalidade |
| --- | --- |
| index.html | Entrada estática do GitHub Pages |
| assets/styles.css | Aparência responsiva |
| assets/app.js | Interface e persistência local |
| data/catalog.js | Conteúdo legado e identificadores originais |
| data/expanded.js | Correções, 111 tópicos, laboratórios e novas certificações |
| docs/CURRICULO.md | Inventário do conteúdo |
| tests/catalog.test.mjs | Testes automatizados |
| .github/workflows/validate.yml | Validação CI |

Não há dependências externas, compilação ou backend. Os scripts JavaScript são carregados em ordem.

## Execução local

~~~sh
python -m http.server 8000
~~~

Abra http://localhost:8000.

Para verificar com Node 20 ou superior:

~~~sh
node --test tests/catalog.test.mjs
node --check assets/app.js
node --check data/catalog.js
node --check data/expanded.js
~~~

## Progresso e privacidade

O progresso e as anotações ficam em localStorage no navegador; **não sincronizam entre dispositivos**. Faça backup JSON antes de limpar dados. A importação continua aceitando backups versão 5 anteriores (schema iam-atlas-123-v1), restaurando níveis, notas e certificações. Novos backups incluem os checklists dos laboratórios.

Os 16 módulos originais mantiveram seus índices para preservar chaves antigas. Os novos módulos são anexados ao catálogo e aparecem na ordem do percurso pedagógico.

## Referências oficiais

- [NIST SP 800-63](https://pages.nist.gov/800-63-4/)
- [NIST Zero Trust SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)
- [Microsoft SC-300 — objetivos oficiais](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-300)
- [Microsoft Entra](https://learn.microsoft.com/en-us/entra/)
- [Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/)
- [Azure RBAC](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview)
- [Microsoft Purview](https://learn.microsoft.com/en-us/purview/)
- [SCIM RFC 7644](https://www.rfc-editor.org/rfc/rfc7644)
- [OpenID Connect](https://openid.net/developers/specs/)
- [AWS IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
- [Google Cloud IAM](https://cloud.google.com/iam/docs/overview)

**Revisado em 16 de outubro de 2026.** Consulte documentação e objetivos de certificação vigentes antes de prestar exames ou alterar ambientes reais.
