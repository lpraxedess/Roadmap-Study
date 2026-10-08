# Auditoria técnica e pedagógica — 07/10/2026

## Escopo verificado


## Correções implementadas

| Prioridade | Achado | Correção |
|---|---|---|
| Alta | HTML das aulas era inserido diretamente no DOM sem sanitização de origem | `bleach` sanitiza HTML no build; teste de conteúdo rejeita scripts e URLs javascript |
| Alta | Workflow concedia `contents: write` também à execução de PR | `contents: read` por padrão; escrita limitada ao job de publicação na main |
| Média | Consulta `Get-MgUser -Top 1` era apresentada junto com `User.Read`, que não basta para listar usuários | Exemplo de `/me` com `User.Read`, sem sugerir consentimento excessivo |
| Média | Busca do portal filtrava apenas a categoria atual | Busca geral abrange aulas, laboratórios e projetos |
| Média | Importação de progresso aceitava array sem validação de tipos ou tamanho lógico | Limite de registros e verificação de tipo, além do limite de arquivo |
| Baixa | URLs com hash inválido podiam interromper a renderização | Fallback para dashboard e título dinâmico de página |
| Média | Publicação reconstruía o conteúdo em outro job, sem reaproveitar o artefato testado | Build gera artefato; deploy publica o mesmo bundle validado |

## Lacunas ainda abertas — não confundir com funcionalidades prontas

1. **Profundidade pedagógica:** várias aulas têm estrutura repetida e orientações genéricas. Precisam de exemplos executáveis, diagramas, soluções comentadas e casos reais simulados.
2. **Laboratórios:** SAML, SCIM, PAM, IGA e cloud exigem escolhas de versões, ferramentas-alvo e scripts de instalação/reversão para serem inteiramente reproduzíveis.
3. **Avaliação:** o botão de conclusão é auto declaração, não avaliação automática de competência. Projetos requerem revisão humana ou critérios externos.
4. **Acessibilidade:** realizar testes manuais de teclado, leitor de tela e contraste em desktop e celular; a interface ainda não tem certificação WCAG.
5. **Qualidade de software:** criar testes automatizados de navegação, busca, importação/exportação e renderização com navegador (Playwright).
6. **Licenciamento:** não presumir que Entra ID P2 individual inclua recursos de Governance, Workload ID, Azure ou funcionalidades atribuídas a outras identidades.
7. **Segurança de conteúdo:** atualizar versões dos produtos e rever links externos periodicamente; laboratório Keycloak usa modo `start-dev` exclusivamente local.

## Regras de qualidade para futuras aulas

- Explicação conceitual e arquitetura, incluindo por que o controle existe.
- Pré-requisitos verificáveis, hardware mínimo, custo e licença.
- Passos executáveis com versão de referência e resultado esperado.
- Teste positivo, teste negativo, troubleshooting e rollback.
- Evidências sanitizadas e critérios mensuráveis de conclusão.
- Alternativa local/open source quando licença ou nuvem não estiver disponível.

## Validação

O CI executa testes do script JML, verificação sintática do JavaScript, build do site e checagem estrutural do pacote. A publicação em Pages deve ser verificada separadamente após a integração. **Um build bem-sucedido não comprova que todos os laboratórios foram executados nem que o aluno adquiriu experiência sênior.**
