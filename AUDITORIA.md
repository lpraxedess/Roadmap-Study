# Auditoria do IAM Atlas — 21/10/2026

Auditoria de estrutura, conteúdo, experiência de uso e manutenção. Esta análise combina leitura do código e de documentação oficial. Não equivale a uma certificação formal de segurança, nem a um teste de acessibilidade com usuários reais.

## 1. Achados corrigidos

| Severidade | Problema encontrado | Correção |
| --- | --- | --- |
| Alta | Três identificadores `t15`–`t17` eram reutilizados em competências diferentes, contaminando o registro de conclusão | Novas competências receberam IDs únicos `t18`–`t27`; os IDs `t0`–`t17` existentes foram preservados |
| Alta | Trilhas profissionais consultavam tópicos por posição em uma lista que é reorganizada por nível | Referência por ID estável com `topicById`; percursos revisados para especializações reais |
| Média | A Visão geral e o progresso eram seções separadas, criando navegação redundante | Progresso por nível e exportação/importação agora ficam na Visão geral; antigos links `#progresso` são direcionados à visão geral |
| Média | Busca global Ctrl+K/⌕ adicionava complexidade sem utilidade desejada | Busca global e código da paleta de comandos removidos; o filtro contextual permanece apenas no roadmap |
| Alta (conteúdo) | Itens didáticos continham apenas um resumo e um exercício em uma linha, sem indicação do que validar | 28 roteiros com pré-requisitos, três ou mais passos específicos, verificação observável e entregável de portfólio |
| Média | Laboratórios tinham passos sem critérios explícitos de aceite | Critérios de verificação e checklists persistentes adicionados aos seis laboratórios |
| Média | Prioridade de certificações confundia aprovação e importância, sem critérios visíveis | Selos com três categorias, legendas, justificativas e público-alvo; conclusão é um estado separado |
| Média | Três entradas genéricas tratavam programas dos fabricantes como se fossem uma certificação individual | Credenciais específicas e verificáveis: Okta Certified Professional, SailPoint Certified Identity Security Administrator, CyberArk Defender - PAM |
| Média | Backups JSON continham conclusões, mas não as etapas de estudo | Novo formato v2 inclui `checklists`; o importador segue compatível com backups antigos |
| Baixa | Material não refletia a organização real do código e currículo | README atualizado e guia de validação automatizada adicionado |

### Observação sobre progresso legado

Anteriormente, as competências adicionais reutilizavam `t15`, `t16` e `t17`. Não é possível inferir, a partir de um dado antigo de `localStorage`, qual dos dois assuntos homônimos o estudante pretendia marcar. A correção preserva essas marcações para os três tópicos originalmente atribuídos a esses IDs e impede novas colisões. Quem utilizou a versão anterior deve conferir manualmente esses três status. Igualmente, marcações antigas de programas genéricos de certificação devem ser revisadas ao adotar os nomes individuais.

## 2. Conteúdo — critérios de qualidade didática

**Sequência recomendada:** fundamentos técnicos → ciclo de vida e controles IAM → federação e provisionamento → governança e operações → segurança avançada → arquitetura e automação.

Cada competência passou a trazer:
1. Objetivo de aprendizagem e tempo *estimado*, não prescritivo.
2. Pré-requisitos e atividade estruturada com três ou mais ações.
3. Critério explícito de verificação do que foi aprendido.
4. Artefato concreto a ser colocado no portfólio.
5. Referência externa e aviso sobre ambientes autorizados.

Essa separação entre **tarefa, conhecimento e habilidade demonstrável** acompanha a orientação conceitual do NICE Framework do NIST:
- https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/getting-started

O conteúdo foi revisado para diferenciar autenticação (OIDC) de autorização delegada (OAuth 2.0), explicar controles como PKCE e validação de tokens e evitar exercícios com credenciais reais:
- https://openid.net/developers/how-connect-works/
- https://www.rfc-editor.org/rfc/rfc9700

O roteiro não substitui instrutor, laboratório executável ou supervisão técnica. Alguns guias pedem diagramas, planejamento e simulações documentais. A execução real de produtos como Entra, SailPoint e CyberArk pode depender de contas, ambientes e licenças externas.

## 3. Certificações — critérios adotados

- **Essencial:** alta prioridade *para o caminho especificado*, não requisito universal. A SC-300 é a principal credencial IAM diretamente ligada à operação Microsoft Entra.
- **Recomendada:** ajuda a consolidar fundamentos ou a validar um produto efetivamente utilizado. Exemplos: SC-900, ISC2 CC, Security+, Okta Certified Professional para quem usa Okta, SailPoint Administrator para IGA e CyberArk Defender - PAM para PAM.
- **Opcional:** amplia conhecimento para nuvem, arquitetura sênior, gestão ou segurança além da atuação IAM. Exemplos: AZ-900, AZ-104, SC-100, CISSP e CISM.

A conclusão da certificação só deve ser marcada após obtenção efetiva. Os requisitos de experiência, pré-requisitos, custos e validade são definidos pelo respectivo fabricante e podem mudar.

Fontes:
- https://learn.microsoft.com/pt-br/credentials/certifications/identity-and-access-administrator/
- https://learn.microsoft.com/pt-br/credentials/certifications/security-compliance-and-identity-fundamentals/
- https://www.okta.com/pt-br/services/certification/
- https://www.sailpoint.com/university/training-paths/identity-security-administrator
- https://training.cyberark.com/learn/course/external/view/elearning/113/defender-pam-sample-items-study-guide

## 4. Animação, design e desempenho

**Direção visual preservada:** preto predominante, grafite para profundidade, roxo para estados ativos e interações. Navegação lateral mantida; cards e módulos continuam com animações discretas.

- O grafo central representa 3D por projeção geométrica em **Canvas 2D**, sem WebGL ou downloads de bibliotecas.
- A animação é suspensa quando a visualização está fora da tela ou quando o documento está oculto.
- Eventos de movimento e rolagem evitam bloquear a experiência.
- Respeito a `prefers-reduced-motion` e foco de teclado para controles interativos.
- Remoção da paleta de comandos reduziu cerca de 4,5 KB de JavaScript e vários controles dispensáveis.
- Os arquivos permanecem independentes de `node_modules` e ferramentas de build.

**Referências de engenharia:**
- https://web.dev/articles/animations-guide?hl=pt-br — privilegiar transform e opacity quando possível.
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion — reduzir movimentos não essenciais.
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API — transições de estado (alternativa futura para simplificar trocas entre views).
- https://developers.google.com/search/docs/appearance/core-web-vitals?hl=pt-BR — metas e medições de LCP, INP e CLS.

## 5. Verificação automatizada

O workflow `.github/workflows/quality.yml` executa `node scripts/quality-check.mjs` a cada alteração na branch principal. Ele valida a sintaxe dos arquivos JavaScript, o script principal inline, presença de assets, estrutura do currículo e invariantes da navegação.

### Limites e próximas auditorias desejáveis

1. **Visual e acessibilidade:** realizar avaliação com navegador real em desktop/mobile, teclado e leitor de tela; checar contraste WCAG 2.2.
2. **Desempenho em dispositivo real:** medir LCP, INP e CLS com Lighthouse e Web Vitals; sem medição não se deve declarar pontuação.
3. **Refatoração estrutural:** `index.html` permanece relativamente extenso, com CSS legado de múltiplas revisões. Recomenda-se, numa segunda etapa, consolidar o CSS em módulos e extrair dados ainda existentes no HTML para estruturas declarativas, evitando regressões visuais.
4. **Laboratórios reproduzíveis:** acrescentar máquinas virtuais de exemplo, repositórios de exercícios, dados fictícios e testes automatizados de políticas, conforme o ambiente escolhido.
5. **Validação externa contínua:** revisar periodicamente links e requisitos de certificações, pois nomes, políticas e preços podem mudar.

**Resultado:** os principais problemas de consistência e navegação foram corrigidos; permanecem pendentes testes visuais instrumentados e a extração completa do CSS/JavaScript legados.
