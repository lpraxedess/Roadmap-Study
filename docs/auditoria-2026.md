# Auditoria integral — revisão do curso e tema preto

## Escopo analisado

- 25 módulos de IAM do fundamental à arquitetura; conteúdo original preservado.
- 10 laboratórios: implementação real em software, mock HTTP e simulações/offline.
- Seis projetos integradores e matriz de competências.
- Portal GitHub Pages, CSS, gerador Markdown→HTML, quizzes, notas locais, pipeline GitHub Actions e scripts Python.
- Nenhuma dependência do repositório externo de portfólio.

## Achados e decisões

| Prioridade | Achado concreto | Ação |
|---|---|---|
| Crítica (pedagogia) | Módulo 05 chamava de prática JML um CSV que não altera contas | **Corrigido:** Joiner, Mover e Leaver manuais com Keycloak, etapas e testes de login |
| Alta (usabilidade) | Tema chamava-se dark, porém fundos, cards e áreas de código permaneciam azul-marinho | **Corrigido:** camada CSS preta/cinza, `#050505` como fundo, menu preto, painéis cinza e cor de destaque discreta |
| Alta (coerência) | Índice ainda apresentava laboratório 05 como CSV/PowerShell | **Corrigido:** índice aponta para o laboratório manual real; script permanece uma etapa posterior identificada como dry-run |
| Média (prática) | Laboratório 03 exigia escolher um servidor SCIM por conta própria | **Corrigido:** direciona à API didática local já fornecida no Lab 09 e informa limitações |
| Média (segurança) | Operação de exclusão aparecia misturada ao desligamento | **Corrigido:** retenção antes de exclusão; deleção opcional somente para usuário fictício |
| Média (transparência) | Aulas curtas seguiam mesmo formato, mas algumas são simulações em papel/CSV | **Registrado:** diferencia execução em produto, mock HTTP, simulação e arquitetura; sem afirmar equivalência |
| Média (qualidade) | Verificações de compilação não protegiam o tema preto | **Corrigido:** teste exige arquivo CSS preto no build e meta theme-color escuro |

## Revisão temática dos 25 módulos

| Unidades | Estado após revisão | Aprofundamento que ainda falta |
|---|---|---|
| 01–04 — Fundamentos, AD, Entra, híbrido | Conceito e exercício com dependência do ambiente | Guias de instalação completos e testes com VMs provisionadas |
| **05 — JML** | **Laboratório manual guiado em Keycloak com conta real no ambiente local** | Integração com aplicação para comprovar autorização final e segunda trilha AD/Entra |
| 06–08 — SSO/OIDC/SAML | OIDC tem lab de fluxo PKCE; SAML ainda depende de SP selecionado | App/SP de teste empacotado, validação de logout e certificados |
| 09–12 — SCIM, Graph, programação | SCIM mock e JML Python executáveis, Graph depende de tenant | Provisionamento SCIM integrado a IdP real; automação com API para operações reais |
| 13–14 — IGA, Access Reviews | SoD offline e campanhas fictícias | Ferramenta IGA local e workflows de revisão reais |
| 15 — PIM | Explicação detalhada e simulador JIT offline; Microsoft sob licença | Validar cenário real licenciado e regras aplicáveis |
| 16–17 — PAM/Secrets | Modelagem e roteiro dependente de instalação | Instalação/revogação e logs demonstrados em ambiente aberto |
| 18–19 — Cloud IAM | Conceitos e revisão estática de policies | Lab com recurso de custo controlado quando houver assinatura |
| 20–22 — ITDR, Logs, Zero Trust | Exercícios sintéticos e cenários | Pipelines de ingestão, correlação e resposta reproduzíveis |
| 23–25 — IaC, auditoria, arquitetura | Exercícios de revisão, critérios e projetos | Ambientes IaC testados, arquitetura de referência com DR e métricas |

## Critério para chamar um laboratório de **prático**

- **Implantação guiada:** ambiente definido e instrução de instalação/acesso sem lacunas essenciais.
- **Ação observável:** criação, alteração ou negação ocorre no sistema de laboratório (e não apenas num plano JSON).
- **Validação:** resultado esperado e teste positivo/negativo.
- **Diagnóstico:** erro induzido com caminho de investigação.
- **Limpeza:** reversão/descarte sem riscos.
- **Limites:** quando houver mock ou simulação, título e texto devem deixar isso explícito.

A publicação automática é um teste técnico de compilação; **não** comprova execução de cada laboratório em Docker, Keycloak, Windows Server ou Microsoft Entra.

## Próxima prioridade de conteúdo

Transformar SSO/SAML e PAM em ambientes localmente empacotados, depois SCIM real, IGA e Graph. Essa evolução é distinta da auditoria visual/técnica feita nesta revisão.
