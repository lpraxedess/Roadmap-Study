# Laboratório corporativo — AtlasCorp

**ROADMAP - IAM · Guia de execução do iniciante ao avançado · Revisão 17/10/2026.**

Esta empresa é fictícia e todas as contas, políticas, grupos e dados devem existir apenas em um tenant e recursos de laboratório sob sua administração. O guia não substitui políticas de segurança ou testes de produção autorizados.

## Empresa e regras de operação

**Empresa:** AtlasCorp. **Ambiente:** tenant EXCLUSIVO de laboratório.

**Papéis responsáveis:**
- RH solicita e confirma vínculo
- Gestor aprova direitos
- TI provisiona e remove
- IAM desenha e revisa políticas
- SecOps investiga eventos
- Owner do recurso confirma acesso

**Identidades fictícias:**
- ana.rh@<dominio-lab> — analista de RH
- bruno.fin@<dominio-lab> — financeiro
- camila.ti@<dominio-lab> — TI
- renata.admin@<dominio-lab> — administração separada
- convidado.parceiro@<dominio-externo> — parceiro

**Grupos iniciais:**
- SG-ATL-RH-BASE
- SG-ATL-FIN-BASE
- SG-ATL-TI-BASE
- SG-ATL-LAB-CA-PILOT
- SG-ATL-FIN-APP-READ
- SG-ATL-FIN-APP-APPROVE
- SG-ATL-PIM-ADMINS

**Regras transversais:**
- Cada identidade tem um owner, justificativa, escopo e encerramento definido.
- Grupos de função expressam direitos de negócio; grupos piloto expressam escopo de política.
- A autenticação comprova identidade; a autorização é aplicada pelo aplicativo ou recurso.
- P2 permite Conditional Access e proteção baseada em risco, mas NÃO inclui automaticamente Intune, Purview, Azure ou todos os recursos avançados de Governance.
- Para políticas de CA, comece com Report-only e mantenha contas emergenciais verificadas fora do escopo de bloqueio.
- Nunca use dados reais, segredos de produção nem desabilite controles de um tenant corporativo.

## Licenças e pré-requisitos

Microsoft Entra ID P2 habilita funcionalidades de Identity Protection/risco e recursos de CA, mas não fornece automaticamente licenças Intune, Purview, recursos pagos Azure nem todos os recursos avançados de Entra ID Governance. O uso dos recursos requer plano compatível e condições da documentação Microsoft atual.

Antes de habilitar qualquer política Conditional Access: tenha contas emergenciais protegidas e testadas, piloto de usuários, método de autenticação registrado, Report-only, leitura de Sign-in logs e mudança reversível. Não execute testes de ataque reais para gerar riscos.

## Jornada passo a passo

### 1. Preparar laboratório seguro

**Fase:** 01 · Implantação da empresa. **Cenário:** AtlasCorp inicia sua operação e precisa separar acesso administrativo de identidade dos funcionários.

**Por que configurar:** Antes de qualquer política de acesso, a organização precisa definir fonte de identidade, papéis de trabalho e conta emergencial. Isso evita permissões improvisadas e bloqueio total do tenant.

**Resultado esperado:** Tenant de testes inventariado; grupos com propósito explícito; usuários sintéticos e controle de privilégio.

**Requisitos de licença:** Gratuito / sujeito a disponibilidade de tenant

**Pré-requisitos:**
- Tenant próprio de laboratório com autorização administrativa.
- Entra ID P2 para exercício de risco; Microsoft 365/Azure são adicionais conforme o serviço.

**Decisões de arquitetura:**
- RH é fonte de dados de contratação; IAM define regras; gestor valida direitos.
- UPN é identificador de login; guarde ID persistente para correlacionar identidade.
- Mantenha duas contas emergenciais adequadamente protegidas, documentadas e monitoradas, excluídas de políticas experimentais.

#### 1.1 Inventariar licenças

**Onde configurar:** entra.microsoft.com → Entra ID → Billing → Licenses (navegação pode variar)

**Como executar:** Abra o tenant correto, confira P2 nos produtos licenciados e registre quais recursos dependem de planos adicionais. Não atribua P2 a usuários inexistentes.

**Por que:** Se um recurso não está habilitado, o laboratório precisa oferecer alternativa, nunca tratar ausência como falha de IAM.

**Como validar:** Registro sanitizado: SKU, usuário de teste, restrições e orçamento.

**Se falhar:** Se o menu não aparecer, confira papel de leitura de licenças e diretório selecionado.

#### 1.2 Estabelecer identidades-piloto

**Onde configurar:** Entra ID → Users → All users → New user

**Como executar:** Crie camila.ti e ana.rh como usuários de laboratório; configure senha inicial forte e política de troca conforme fluxo suportado. Use nomes e dados fictícios.

**Por que:** Uma pessoa recebe conta individual, que deve poder ser correlacionada ao RH.

**Como validar:** Dois usuários visíveis, com object IDs mascarados no inventário.

**Se falhar:** Erro: falta permissão de User Administrator ou domínio incorreto.

#### 1.3 Organizar grupos de negócio

**Onde configurar:** Entra ID → Groups → All groups → New group

**Como executar:** Crie SG-ATL-RH-BASE, SG-ATL-FIN-BASE e SG-ATL-TI-BASE como grupos de segurança e configure owner para cada um.

**Por que:** O acesso deriva da função, evitando concessões individuais difíceis de revisar.

**Como validar:** Grupo, owner, finalidade, classificação e membros registrados.

**Se falhar:** Se grupo não fornece acesso, ele ainda precisa ser associado a app, role ou controle de recurso.

#### 1.4 Preservar recuperação administrativa

**Onde configurar:** Entra ID → Roles and administrators / Emergency access guidance

**Como executar:** Projete e valide contas de emergência segundo orientação oficial; evite depender apenas do mesmo mecanismo de MFA do piloto. Não remova a última conta administrativa testada.

**Por que:** Recuperação é controle de disponibilidade, não exceção irrestrita ao menor privilégio.

**Como validar:** Runbook com onde estão os fatores, responsáveis, monitoramento e teste planejado.

**Se falhar:** Teste de acesso emergencial deve ser feito em processo controlado, sem derrubar sessões válidas.

#### 1.5 Definir separação de funções

**Onde configurar:** Inventário AtlasCorp → RACI e grupos

**Como executar:** Documente funções de RH, gestores, TI, IAM e SecOps. Crie matriz: empregado | área | gestor | grupo | app | justificativa | expiração.

**Por que:** A decisão de acesso deve ser rastreável ao dono do recurso e ao vínculo da pessoa.

**Como validar:** Matriz AtlasCorp aprovada e grupos criados sem privilégios administrativos supérfluos.

**Se falhar:** Se não houver aprovação, mantenha usuário sem acesso específico à aplicação.

**Critérios de aceite da etapa:**
- Teste que um usuário TI não pertence ao grupo de RH.
- Confira que nenhuma conta teste recebeu Global Administrator.
- Comprove capacidade de reversão antes do próximo capítulo.

**Troubleshooting adicional:** Se não conseguir criar usuário: revise tenant selecionado, permissão administrativa e limites/licenças; não eleve privilégio em tenant alheio.

**Rollback e limpeza:** Excluir apenas objetos fictícios do laboratório quando terminar o percurso; preserve contas que serão reutilizadas nos laboratórios seguintes.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Inventário de objetos fictícios sem segredos.
- Diagrama de tenant, grupos e responsáveis.
- Plano de limpeza e custos/limitações.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Desenhe o tenant e implemente usuários/grupos no Keycloak isolado.

**Fonte oficial do capítulo:** https://learn.microsoft.com/en-us/entra/fundamentals/

### 2. Ciclo de vida Joiner–Mover–Leaver

**Fase:** 01 · Implantação da empresa. **Cenário:** RH contrata Camila para TI, transfere Bruno de Financeiro para outra função e desliga um contratado.

**Por que configurar:** Identidade, privilégios e dados são estados diferentes. Um processo JML de verdade precisa tratar concessão, movimento e retirada de direitos com responsabilidade.

**Resultado esperado:** Fluxo de admissão, alteração de cargo e desligamento registrado e reexecutável.

**Requisitos de licença:** Operações básicas; automação avançada pode exigir licença

**Pré-requisitos:**
- Grupos do capítulo inicial existentes.
- Registro fictício RH com employeeId persistente e gestor responsável.

**Decisões de arquitetura:**
- Grupo funcional não deve ser a única defesa: aplicativo também verifica recursos e ações.
- Troca de departamento remove concessões antigas, incluindo exceções e entitlements temporários.
- Leaver envolve desabilitar login, retirar grupos, revisar sessões, apps, tokens e dispositivos conforme o sistema.

#### 2.1 Autorizar a admissão

**Onde configurar:** Registro RH → solicitação de acesso fictícia

**Como executar:** Crie ticket RH-JOIN-001 com employeeId 1001, gestor, data de início, departamento TI e prazo. O gestor confirma acessos básicos; IAM valida SoD.

**Por que:** A conta não deve surgir sem dono e justificativa.

**Como validar:** Ticket com solicitante, aprovador, escopo e decisão.

**Se falhar:** Se houver dado ausente, não invente atributo no diretório.

#### 2.2 Criar e associar identidade

**Onde configurar:** Entra ID → Users → New user

**Como executar:** Crie camila.ti com employeeId de teste, departamento e gestor fictício quando os atributos forem disponíveis. Atribua SG-ATL-TI-BASE.

**Por que:** Permissões são ligadas a dados e à função, não a concessões arbitrárias.

**Como validar:** Usuário aparece no grupo esperado e não pertence a FIN-BASE.

**Se falhar:** Se for usuário híbrido, corrija na fonte autoritativa e aguarde sincronização.

#### 2.3 Demonstrar Mover

**Onde configurar:** Entra ID → Users → Groups

**Como executar:** Mude bruno.fin para a nova área no registro RH. Remova grupos antigos, peça validação do novo gestor e atribua grupo correto.

**Por que:** Acúmulo de acesso antigo é um dos riscos centrais de IAM.

**Como validar:** Comparativo de grupos antes/depois e acesso negado ao recurso antigo.

**Se falhar:** Verifique acesso direto por app role além da membresia no grupo.

#### 2.4 Executar Leaver no ambiente teste

**Onde configurar:** Entra ID → Users → Properties / Authentication methods / Audit logs

**Como executar:** Aplique bloqueio de login ao usuário de desligamento fictício, revise sessões e remova permissões, grupos e atribuições a apps.

**Por que:** Leaver é processo com sequência e cobertura, não apenas exclusão de objeto.

**Como validar:** Registro de alterações, tentativas negadas de login e owner de cada acesso removido.

**Se falhar:** Tokens existentes e sessões podem ter janela de validade; valide comportamento do aplicativo.

#### 2.5 Buscar contas órfãs

**Onde configurar:** Planilhas RH e Entra → cruzamento por ID

**Como executar:** Compare identidades ativas com lista de empregados de teste. Encontre conta sem fonte RH e crie ticket de investigação.

**Por que:** Reconciliação detecta desvio entre o esperado e o realmente configurado.

**Como validar:** Tabela com contas correspondidas, órfãs e ação.

**Se falhar:** Não exclua contas desconhecidas antes de confirmar finalidade e proprietário.

**Critérios de aceite da etapa:**
- Joiner recebe exatamente seus direitos aprovados.
- Mover perde o direito anterior antes de ganhar incompatibilidades.
- Leaver não consegue nova autenticação e há evidência de desprovisionamento.

**Troubleshooting adicional:** Se grupos não refletirem mudança, cheque sincronização/escopo/fonte autoritativa e atraso de propagação; não crie um segundo usuário para contornar o erro.

**Rollback e limpeza:** Revogar acessos de desligados fictícios; conservar conta neutra para reutilização apenas se necessário.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Matriz de acesso antes/depois do Mover.
- Log de retirada de permissões no Leaver.
- Relatório de contas órfãs.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Simule com CSV, script e Keycloak de laboratório.

**Fonte oficial do capítulo:** https://learn.microsoft.com/en-us/entra/id-governance/

### 3. Autenticação, passkeys e MFA

**Fase:** 02 · Autenticação e políticas P2. **Cenário:** AtlasCorp precisa exigir MFA de funcionários e proteção maior para administradores sem bloquear toda a empresa.

**Por que configurar:** Conditional Access usa sinais e condições para permitir, impor método ou bloquear acesso. Uma licença Entra P2 traz recursos P1 e Identity Protection, mas não configura automaticamente políticas.

**Resultado esperado:** Política MFA com grupo piloto, autenticação resistente a phishing para papéis sensíveis e testes com Sign-in logs.

**Requisitos de licença:** MFA básico varia; políticas CA exigem P1; risco exige P2

**Pré-requisitos:**
- Entra ID P2 licenciado para usuários abrangidos; tenant de laboratório e conta Conditional Access Administrator.
- Grupos SG-ATL-LAB-CA-PILOT e contas emergenciais previamente verificadas.
- Método MFA registrado no usuário piloto e aplicativo de teste com login.

**Decisões de arquitetura:**
- MFA é requisito mínimo de piloto; preferir authentication strength resistente a phishing em contas críticas, quando suportada.
- Evite políticas "All users/All resources" enquanto testa. Amplie depois de ler relatório de impacto.
- Não force fatores que o usuário não consegue registrar ou recuperar.
- Não confunda MFA de usuário com políticas de workloads; contas não interativas usam controles próprios.

#### 3.1 Preparar um escopo reversível

**Onde configurar:** Entra ID → Groups → All groups

**Como executar:** Crie SG-ATL-LAB-CA-PILOT se ainda não existir. Inclua somente camila.ti de laboratório e registre contas de emergência que não deverão entrar no piloto.

**Por que:** Dá para comparar resultado e corrigir política sem bloqueio de todos os usuários.

**Como validar:** Membros esperados e a justificativa da exclusão de emergência.

**Se falhar:** Se o grupo contém administradores, use conta de teste sem privilégio.

#### 3.2 Definir métodos disponíveis

**Onde configurar:** Entra ID → Protection → Authentication methods → Policies

**Como executar:** Inspecione políticas de métodos. Habilite Microsoft Authenticator/FIDO2 para grupo de teste quando necessário e permitido. Não desabilite métodos de toda a organização.

**Por que:** Authentication methods define o que o usuário pode registrar; CA define o que precisa usar em um contexto.

**Como validar:** Usuário piloto visualiza e registra método permitido.

**Se falhar:** Ausência de método pode ser grupo errado, licenciamento ou registro incompleto.

#### 3.3 Concluir registro da conta-piloto

**Onde configurar:** https://mysignins.microsoft.com/security-info

**Como executar:** Como camila.ti, registre autenticação disponível em sessão controlada. Para teste de phishing-resistance, use passkey FIDO2 autenticada e suportada pelo navegador/dispositivo.

**Por que:** MFA forte precisa ser registrado antes da política de acesso ficar obrigatória.

**Como validar:** Método visível em Security info, sem compartilhar detalhes pessoais.

**Se falhar:** Se FIDO2 não é suportado, escolha MFA compatível e documente diferença de garantia.

#### 3.4 Construir política de MFA

**Onde configurar:** Entra ID → Conditional Access → Policies → New policy

**Como executar:** Nomeie CA-ATL-001-PILOT-MFA. Em Users or workload identities, Include → Select users and groups → SG-ATL-LAB-CA-PILOT. Em Target resources, escolha a aplicação de teste ou conjunto controlado. Em Grant, marque Grant access → Require authentication strength → Multifactor authentication (ou controle equivalente na UI atual).

**Por que:** A política vincula contexto de usuário/recurso a um controle, distinto do método permitido.

**Como validar:** Captura redigida dos campos Include, Target resources e Grant.

**Se falhar:** Se target app não aparecer, confirme enterprise application e sessão suportada.

#### 3.5 Manter a política em Report-only

**Onde configurar:** Conditional Access → CA-ATL-001-PILOT-MFA → Enable policy

**Como executar:** Escolha Report-only antes de criar. Não selecione On imediatamente. Abra What If quando disponível e simule escopo com usuário e recurso.

**Por que:** Avalia o impacto sem aplicar bloqueio à autenticação.

**Como validar:** Resultado de What If e propriedade Report-only.

**Se falhar:** What If não substitui análise do sign-in real; simulações não cobrem todos os sinais.

#### 3.6 Gerar dois logins de comparação

**Onde configurar:** Navegador privado → app de teste

**Como executar:** Como camila.ti, faça login e anote horário UTC, aplicativo, correlation ID e a aba Conditional Access. Depois teste um usuário fictício fora do grupo.

**Por que:** Verifica escopo e evita que regras atinjam pessoas não pretendidas.

**Como validar:** Duas entradas comparáveis em Sign-in logs, com report-only aplicado apenas ao piloto.

**Se falhar:** Se não aparece log, espere ingestão e confira filtro/usuário/aplicativo.

#### 3.7 Interpretar o relatório

**Onde configurar:** Entra ID → Monitoring & health → Sign-in logs

**Como executar:** Abra entrada, consulte Conditional Access e Authentication Details. Diferencie Report-only: success/failure/not applied de sucesso efetivo do login.

**Por que:** Uma avaliação negativa em Report-only não significa que o acesso tenha sido realmente bloqueado.

**Como validar:** Tabela usuário | política | requisito projetado | resultado real.

**Se falhar:** Se política foi "Not applied", revise group, target resource e conditions.

#### 3.8 Ativar para o grupo piloto

**Onde configurar:** Conditional Access → CA-ATL-001-PILOT-MFA

**Como executar:** Somente se o registro de métodos, recuperação emergencial e testes report-only estiverem corretos, altere Enable policy para On. Use apenas o escopo piloto.

**Por que:** Habilitar após evidência reduz risco de lockout.

**Como validar:** Captura da política habilitada e login com segundo fator no usuário piloto.

**Se falhar:** Caso crítico: use conta de emergência para desabilitar a política piloto.

#### 3.9 Testar aceitação e negação

**Onde configurar:** Aplicação piloto e Sign-in logs

**Como executar:** Teste método que satisfaz a authentication strength; depois tente método ausente/inferior conforme o cenário seguro, sem forçar lockout da conta. Compare o resultado real e os detalhes de autenticação.

**Por que:** Mostra que Grant controla exigência de método, não membership de application role.

**Como validar:** Uma sessão atendendo o controle; outra com challenge/negação ou simulação registrada.

**Se falhar:** Se já existe sessão autenticada, novo desafio pode não surgir; documente sessões anteriores.

#### 3.10 Criar proteção para administradores

**Onde configurar:** Conditional Access → Policies → New policy

**Como executar:** Projete CA-ATL-002-ADMIN-PHISHING-RESISTANT para role administrativa de teste: selecione Directory roles suportadas ou grupo administrativo específico; Grant → Require authentication strength → Phishing-resistant MFA; mantenha Report-only. Exclua contas de emergência sob controles independentes.

**Por que:** Administração de identidades exige garantia de autenticação maior que o uso rotineiro.

**Como validar:** Matriz de administradores cobertos, exceções e métodos resistentes disponíveis.

**Se falhar:** CA por Directory roles não se estende automaticamente a funções customizadas ou escopo de Administrative Units.

#### 3.11 Distinguir políticas e métodos

**Onde configurar:** Entra → Protection → Authentication methods / Conditional Access

**Como executar:** Documente a diferença entre: quem pode registrar Microsoft Authenticator/passkey (Authentication methods), quando é exigido um método (CA authentication strength) e a autorização final da aplicação. Faça diagrama usuário → método → CA → recurso.

**Por que:** Regra de método e regra de acesso se complementam, mas uma não substitui a outra.

**Como validar:** Matriz: usuário | método registrado | strength exigida | app | decisão.

**Se falhar:** Um usuário pode ter método registrado e ainda falhar por CA ou falta de autorização na app.

#### 3.12 Analisar riscos no Identity Protection

**Onde configurar:** Entra ID → Protection → Identity Protection → Risky users / Risky sign-ins

**Como executar:** Com uma conta licenciada P2, abra relatórios de usuários/entradas arriscadas existentes (se houver) e identifique diferença entre user risk e sign-in risk. Não execute ataques nem dependa de gerar risco real para completar o exercício.

**Por que:** Risco de conta se refere a possível comprometimento da identidade; risco de entrada avalia uma tentativa específica.

**Como validar:** Tabela com definições de nível de risco, proprietários da resposta e ações esperadas, mesmo quando não há registros reais.

**Se falhar:** Tenant limpo pode não possuir eventos de risco; registre "não observado" em vez de inventar uma detecção.

#### 3.13 Definir política CA de sign-in risk

**Onde configurar:** Entra ID → Conditional Access → Policies → New policy

**Como executar:** Crie CA-ATL-004-SIGNIN-RISK: inclua APENAS o grupo piloto (contas de emergência fora do escopo), Target resources conforme cenário controlado, Conditions → Sign-in risk → Medium/High, Grant access → Require authentication strength (MFA forte adequado). Configure sessão Sign-in frequency apropriada, primeiro em Report-only.

**Por que:** P2 permite usar sinais de risco de entrada para exigir nova garantia. Escolha os limiares conforme risco e método registrado.

**Como validar:** Registro dos campos User/Target/Sign-in risk/Grant/Session e política Report-only.

**Se falhar:** Se não houver evento com nível Medium/High, não espere que um login comum aplique a regra. Teste a estrutura e documente limitação.

#### 3.14 Definir política CA de user risk

**Onde configurar:** Entra ID → Conditional Access → Policies → New policy

**Como executar:** Crie política separada CA-ATL-005-USER-RISK: grupo piloto, Target resources → All resources apenas se for seguro para esse grupo, Conditions → User risk → High, Grant access → Require risk remediation e strength apropriada. Observe que as configurações adicionais de sessão/strength podem ser incluídas automaticamente. Comece em Report-only.

**Por que:** O comprometimento da identidade exige recuperação própria. Microsoft recomenda não combinar user risk e sign-in risk na MESMA política.

**Como validar:** Capturas sanitizadas das duas políticas separadas e sua lógica de decisão.

**Se falhar:** Não configure senha-change de usuários híbridos sem requisitos de password writeback e autoatendimento de recuperação.

#### 3.15 Verificar status sem fabricar risco

**Onde configurar:** Entra ID → Conditional Access → What If / Sign-in logs

**Como executar:** Use What If para validar atribuição de usuário, aplicativo e condições suportadas; depois consulte sign-in logs conhecidos, verifique se as políticas de risco foram aplicadas ou não. Caso inexista risco detectado, marque testes de enforcement como "não executáveis neste ambiente" e explique a diferença.

**Por que:** Uma condição de risco não pode ser demonstrada como acionada apenas por selecionar o nível em uma política.

**Como validar:** Registro: política existe, é Report-only, teste de escopo e estado efetivo não acionado ou incidente real do tenant de teste (sem dado pessoal).

**Se falhar:** What If e Report-only não fabricam sinais P2 nem substituem detecção real.

#### 3.16 Examinar sessão e localização

**Onde configurar:** Conditional Access → Conditions → Network / Session

**Como executar:** Projete uma localização nomeada somente se houver rede/IP sob sua administração. Compare Sign-in frequency e Persistent browser session para app de laboratório sem causar loop excessivo de autenticação. Não classifique toda a internet como rede confiável.

**Por que:** A localização pode ser sinal adicional; sessão e avaliação contínua dependem do aplicativo e de protocolos.

**Como validar:** Tabela políticas + impacto de rede/sessão, horários UTC de avaliação e plano de exceção.

**Se falhar:** Endereço compartilhado ou VPN pode invalidar pressupostos de localização.

#### 3.17 Revisar combinação de políticas CA

**Onde configurar:** Conditional Access → Policies / Sign-in logs

**Como executar:** Documente quando duas regras independentes se aplicam simultaneamente: por exemplo MFA e dispositivo conforme. Teste a política piloto MFA separadamente antes de introduzir novas condições. Confirme que todos os requisitos aplicáveis podem precisar ser satisfeitos.

**Por que:** Policies combinadas têm efeito cumulativo. Reduz riscos de bloqueio por interseções não planejadas.

**Como validar:** Matriz de resultados esperados para usuário, dispositivo, app e condição de risco.

**Se falhar:** Não interprete êxito de uma política isolada como êxito do conjunto efetivo.

#### 3.18 Encerrar e auditar a mudança

**Onde configurar:** Entra ID → Conditional Access e Audit logs

**Como executar:** Registre change ticket, aprovador, versão da política, data de ativação e rollback. Se estava praticando com política real, retorne a Report-only ou desabilite a política ao encerrar.

**Por que:** Segurança requer processo auditável e reversível.

**Como validar:** Registro de mudança com hora, autor e evidência de retorno.

**Se falhar:** Falta de aprovação ou escopo confuso impede promoção além do piloto.

**Critérios de aceite da etapa:**
- Política em Report-only com resultado de logs explicado corretamente.
- Política habilitada exclusivamente no grupo de teste com MFA acionado.
- Conta fora do grupo não foi afetada; recuperação de emergência validada.
- Diferença entre MFA e phishing-resistant authentication strength documentada.
- User risk e sign-in risk tratados em duas políticas P2 separadas, ambas inicialmente Report-only.
- Ausência de evento arriscado registrada como limitação, sem fingir teste real de enforcement.

**Troubleshooting adicional:** Se não aparecer Conditional Access, primeiro confirme Entra P1; se método não for elegível, confirme Authentication methods policy e grupos.

**Rollback e limpeza:** Desligar política piloto e remover grupo teste; manter apenas os métodos de autenticação planejados para o tenant de laboratório.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Fluxo de autenticação e método empregado.
- Duas decisões de login com evidências.
- Checklist de exclusão emergencial.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Configure MFA e OIDC em Keycloak e compare propriedades dos fatores.

**Fonte oficial do capítulo:** https://learn.microsoft.com/en-us/entra/identity/authentication/

**Documentação complementar:**
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-mfa-strength
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only
- https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-risk-based-user
- https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies

### 4. Autorização e privilégios efetivos

**Fase:** 02 · Autenticação e políticas P2. **Cenário:** O Financeiro precisa ler relatórios, mas somente um aprovador pode alterar registros de pagamento.

**Por que configurar:** Grupos podem atribuir roles, mas uma aplicação deve validar permissão e propriedade de cada recurso.

**Resultado esperado:** Aplicação teste diferencia usuários, roles de negócio e autorização real na API.

**Requisitos de licença:** Sem custo em simulação; Azure pode gerar cobrança

**Pré-requisitos:**
- Grupo Financeiro e aprovação de responsável pela aplicação.
- API ou aplicação fictícia com recurso e logs de autorização.

**Decisões de arquitetura:**
- SG-ATL-FIN-APP-READ permite leitura de relatório de seu departamento.
- SG-ATL-FIN-APP-APPROVE deve exigir owner e SoD antes de conceder direito.
- Entra directory role e Azure RBAC não substituem a autorização em nível de objeto da API.

#### 4.1 Mapear ações e atores

**Onde configurar:** Matriz negócio → ação → recurso

**Como executar:** Crie duas operações GET e PATCH e três perfis: Camila (TI), Bruno (Financeiro), Renata (Aprovadora). Marque ações permitidas e negadas.

**Por que:** As decisões precisam existir antes de serem codificadas.

**Como validar:** Tabela de verdade com operações e escopos.

**Se falhar:** Não confunda "pode autenticar" com "pode modificar relatório".

#### 4.2 Definir grupos de negócio

**Onde configurar:** Entra ID → Groups

**Como executar:** Crie SG-ATL-FIN-APP-READ e SG-ATL-FIN-APP-APPROVE, com owner e critério para aprovação. Associe Bruno ao READ.

**Por que:** Atribuir entitlement via grupo facilita revisão e desligamento.

**Como validar:** Inventário de membros e owners.

**Se falhar:** A app precisa mapear explicitamente grupo ou app role a ações.

#### 4.3 Atribuir acesso à aplicação

**Onde configurar:** Entra ID → Enterprise applications → Users and groups

**Como executar:** Em enterprise application de teste com app roles expostas, vincule grupo READ à role de leitura; se app não oferece roles, implemente mapeamento no backend de teste.

**Por que:** Acessar a aplicação e autorizar uma ação específica são decisões distintas.

**Como validar:** Entitlement de app e usuário autorizado.

**Se falhar:** Alguns tipos de app e licenças limitam group-based assignment; confirme suporte.

#### 4.4 Provar casos permitidos/negados

**Onde configurar:** API local → GET/PATCH /reports/{id}

**Como executar:** Faça GET permitido com Bruno e PATCH proibido. Com usuário de TI, tente ler relatório restrito. Respostas 200/403 são exemplos; siga a semântica da API de teste.

**Por que:** A verificação tem que ocorrer no servidor e por objeto.

**Como validar:** Saída de cada teste, recurso e ator mascarados.

**Se falhar:** Se ocultar botão gera 403 apenas na UI, corrija verificação no backend.

#### 4.5 Revogar acesso

**Onde configurar:** Entra ID → Groups / app roles

**Como executar:** Remova Bruno do grupo de leitura ou da app role e verifique a nova sessão, considerando validade de tokens emitidos.

**Por que:** O ciclo de vida precisa resultar em mudança efetiva.

**Como validar:** Teste de acesso após revogação e observação de sessão.

**Se falhar:** Se ainda acessa, avalie cache, token anterior e concessões diretas adicionais.

**Critérios de aceite da etapa:**
- Três identidades com decisões coerentes para GET/PATCH.
- Mínimo privilégio e escopo por departamento testados.
- Revogação efetiva registrada.

**Troubleshooting adicional:** Se acesso negado funcionar apenas na UI, a API está vulnerável; verifique middleware e validação em cada endpoint.

**Rollback e limpeza:** Apagar dados de documentos sintéticos e remover roles temporárias.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Matriz de ações e papéis.
- Respostas permitida/negada no backend.
- Comparação entre três modelos RBAC.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** API local + Keycloak e recursos Azure modelados em tabela.

**Fonte oficial do capítulo:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

### 5. Federação SAML e OpenID Connect

**Fase:** 02 · Autenticação e políticas P2. **Cenário:** AtlasCorp conecta seu portal financeiro a um provedor centralizado de identidade.

**Por que configurar:** SSO evita novos bancos de senhas nas aplicações e cria dependências de confiança que precisam ser verificadas.

**Resultado esperado:** Fluxo OIDC com PKCE e validação separada de identidade e autorização.

**Requisitos de licença:** Pode ser gratuito com IdP OSS

**Pré-requisitos:**
- App sandbox e IdP de teste.
- Redirect URI exata, issuer e audience esperados.

**Decisões de arquitetura:**
- Preferir Authorization Code + PKCE para clientes públicos.
- A API usa access token destinado a ela, não ID token.
- A app valida assinatura, expiração, emissor, público e proteção de CSRF conforme o fluxo.

#### 5.1 Registrar app

**Onde configurar:** Entra ID → App registrations → New registration

**Como executar:** Registre aplicação Financeiro-LAB, defina Supported account types adequados ao laboratório e redirect URI específica (localhost HTTPS quando aplicável).

**Por que:** Relação cliente-IdP requer identificação e destinos cadastrados.

**Como validar:** Application/client ID mascarado e redirect registrado.

**Se falhar:** Redirect URI diferente do callback quebra o fluxo.

#### 5.2 Configurar protocolo

**Onde configurar:** App cliente de teste → OIDC

**Como executar:** Use Authorization Code e PKCE; gere verifier/challenge e state. Verifique parâmetros no redirect ao IdP.

**Por que:** Protege a troca de code e a associação da resposta à requisição.

**Como validar:** Fluxo de autorização documentado sem códigos nem tokens reais.

**Se falhar:** Ausência de PKCE em cliente público é falha de projeto.

#### 5.3 Conferir tokens

**Onde configurar:** Aplicação → validação OIDC/OAuth

**Como executar:** Inspecione somente cabeçalhos/claims não sensíveis. Identifique ID token para o cliente e access token para API, e valide seus destinatários.

**Por que:** Token aceito para destinatário errado pode permitir uso indevido.

**Como validar:** Matriz ID token versus access token com audience e finalidade.

**Se falhar:** JWT não é obrigatório como formato de access token.

#### 5.4 Testar falhas

**Onde configurar:** App local → callbacks e API

**Como executar:** Tente redirect não registrado e, em teste controlado, token com audience incorreto ou expiração; a app/API deve negar.

**Por que:** Falhas de confiança devem ser observáveis e corrigíveis.

**Como validar:** Testes negativo e positivo com causa diagnosticada.

**Se falhar:** Se token inválido é aceito, pare e corrija validação do serviço.

#### 5.5 Vincular grupo a aplicação

**Onde configurar:** Entra ID → Enterprise applications → Users and groups

**Como executar:** Associe grupo de usuário autorizado à aplicação com atribuição conforme suporte do tipo de app.

**Por que:** SSO não deve conceder acesso sem aprovação de negócio.

**Como validar:** Usuário atribuído e não atribuído tratados de forma distinta.

**Se falhar:** Confirme políticas e edição de Enterprise Application usadas no tenant.

**Critérios de aceite da etapa:**
- Login federado e permissões em API testadas separadamente.
- Redirect não cadastrado rejeitado.
- Diferenças OIDC/OAuth e responsabilidade da aplicação registradas.

**Troubleshooting adicional:** Erros comuns: mismatch de redirect URI, issuer/audience, relógio e ausência de PKCE; compare mensagens dos dois lados.

**Rollback e limpeza:** Revogar secrets temporários, excluir client de teste não reutilizado e limpar histórico com credenciais.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Diagrama de confiança IdP-SP/RP.
- Registro de login válido e inválido.
- Validações de estado, nonce, issuer e audience descritas.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Executar integralmente com Keycloak e cliente de exemplo local.

**Fonte oficial do capítulo:** https://openid.net/specs/openid-connect-core-1_0.html

### 6. Gerenciamento de convidados B2B

**Fase:** 03 · Operação e dispositivos. **Cenário:** Consultor externo presta serviço temporário ao Financeiro e não deve manter acesso após o projeto.

**Por que configurar:** Acesso externo precisa de sponsor, escopo, expiração, revisão e controle de confiança entre tenants.

**Resultado esperado:** Processo B2B fictício com aprovação de parceiro e revogação rastreável.

**Requisitos de licença:** Recursos dependem do tenant; pode ser simulado

**Pré-requisitos:**
- Parceiro ou tenant secundário controlado, ou simulação.
- Aplicação e grupo de teste com owner.

**Decisões de arquitetura:**
- Guest B2B não é automaticamente empregado.
- Patrocinador responde pela necessidade de acesso.

#### 6.1 Autorizar parceria

**Onde configurar:** Ticket fornecedor → segurança e Financeiro

**Como executar:** Registre empresa parceira, responsável interno, recurso específico e data de expiração.

**Por que:** Todo convidado precisa de proprietário de acesso.

**Como validar:** Aprovação do sponsor e prazo de 30 dias.

**Se falhar:** Sem sponsor não conceda acesso.

#### 6.2 Restringir colaboração

**Onde configurar:** Entra ID → External Identities → Cross-tenant access settings

**Como executar:** Revise colaboração inbound/outbound. Em tenant de teste, modele relação com o parceiro antes do convite.

**Por que:** A confiança deve abranger somente organizações e aplicações necessárias.

**Como validar:** Mapa de confiança e condições de convidado.

**Se falhar:** External ID e B2B direct connect não são iguais.

#### 6.3 Convidar e atribuir

**Onde configurar:** Entra ID → Users → New user → Invite external user

**Como executar:** Envie convite para identidade de parceiro de teste, associe somente grupo do recurso aprovado.

**Por que:** Assegura menor privilégio com rastreabilidade de sponsor.

**Como validar:** Guest visível, convite aceito e recurso permitido.

**Se falhar:** Se resgate falha, confira restrictions e política de colaboração.

#### 6.4 Testar escopo e expiração

**Onde configurar:** Aplicativo Financeiro → conta externa

**Como executar:** Verifique recurso permitido e tentativa negada em recurso restrito; execute remoção de associação e prove perda de acesso.

**Por que:** Convidado não deve receber direitos implícitos amplos.

**Como validar:** Dois testes + evidência de remoção.

**Se falhar:** Sessões anteriores podem persistir por tempo limitado.

**Critérios de aceite da etapa:**
- Convite com sponsor e prazo.
- Acesso autorizado e acesso excessivo negado.
- Entitlement revogado ao término.

**Troubleshooting adicional:** Se convite aceito mas app nega acesso, verifique atribuição, CA aplicável a convidados e políticas de colaboração.

**Rollback e limpeza:** Remover convidados/grupos de teste e convites pendentes desnecessários.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Matriz inbound/outbound.
- Workflow de convite, aprovação e remoção.
- Registro de revisão e owner.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Produza fluxo detalhado de B2B com tenant fictício e evidências simuladas.

**Fonte oficial do capítulo:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

### 7. Intune + Conditional Access

**Fase:** 03 · Operação e dispositivos. **Cenário:** AtlasCorp autoriza documentos sensíveis somente de dispositivos sob gestão e conformidade verificável.

**Por que configurar:** A identidade do dispositivo gera sinal independente do usuário. Intune calcula conformidade e Entra CA faz decisão de acesso.

**Resultado esperado:** Política piloto de acesso a app sensível exigindo dispositivo marcado como conforme.

**Requisitos de licença:** Requer Intune + Entra P1 ou elegibilidade equivalente

**Pré-requisitos:**
- Intune licenciado e dispositivo exclusivamente de teste.
- Entra P2 para o CA da conta piloto; enrollment MDM elegível.

**Decisões de arquitetura:**
- P2 sozinho não fornece licença Intune.
- Registered, joined e hybrid joined são estados diferentes.
- Um dispositivo noncompliant não deve bloquear todos os colaboradores sem piloto.

#### 7.1 Validar gestão de dispositivos

**Onde configurar:** intune.microsoft.com → Devices → All devices

**Como executar:** Confirme licença Intune, plataforma suportada e escopo de MDM. Inscreva somente dispositivo descartável de teste, sem remover controles de equipamento de uso real.

**Por que:** Conformidade depende de inscrição e política suportada.

**Como validar:** Device ID de teste e estado de gerenciamento.

**Se falhar:** Se o dispositivo não aparece, cheque enrollment restrictions e atribuição de licença.

#### 7.2 Criar política compliance

**Onde configurar:** Intune → Devices → Compliance → Policies → Create

**Como executar:** Selecione plataforma de teste, configure requisito seguro (ex.: PIN/bloqueio de tela suportado) e atribua somente grupo piloto.

**Por que:** Postura é calculada por parâmetros verificáveis, não por opinião do operador.

**Como validar:** Política e avaliação compliant/noncompliant no Intune.

**Se falhar:** Aguarde sincronização; falha de avaliação não equivale a usuário sem login.

#### 7.3 Conectar sinal ao CA

**Onde configurar:** Entra → Protection → Conditional Access → Policies → New

**Como executar:** Crie CA-ATL-003-DEVICE-COMPLIANT. Escopo: grupo de teste + recurso definido; Grant: Require device to be marked as compliant; Report-only inicialmente.

**Por que:** O Entra utiliza sinal Intune como requisito, não inventa conformidade por si.

**Como validar:** Policy report-only e avaliação de dispositivo nos sign-ins.

**Se falhar:** Se o controle não aparecer, confira licença e plataforma suportada.

#### 7.4 Gerar casos realistas

**Onde configurar:** Dispositivo de teste + sign-in logs

**Como executar:** Teste compliant e um estado de noncompliance reversível, correlacionando usuário/dispositivo/hora/política. Se tudo estiver validado, habilite temporariamente só grupo piloto.

**Por que:** Compara decisão de acesso e postura real.

**Como validar:** Log de ambos estados com condições aplicadas.

**Se falhar:** Sem device ID no sign-in, confira join/registro e navegador cliente.

#### 7.5 Reverter o ambiente

**Onde configurar:** Intune e Entra → políticas piloto

**Como executar:** Volte CA para Report-only/Off, restaure compliance e remova enrollment descartável somente após registrar evidência.

**Por que:** Rollback previne impactos de acesso e dados.

**Como validar:** Plano completo de estado final.

**Se falhar:** Nunca use wipe em dispositivo pessoal.

**Critérios de aceite da etapa:**
- Licenças Entra e Intune diferenciadas.
- Política CA report-only com compliance avaliada.
- Condição revertida e dispositivo de teste protegido.

**Troubleshooting adicional:** Se CA não recebe estado, cheque inscrição MDM, grupo atribuído, última sync, licença e plataforma suportada.

**Rollback e limpeza:** Remover políticas de teste e enrollment temporário; nunca aplicar retire/wipe em dispositivo pessoal.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Identificador fictício de dispositivo e status.
- Avaliações de política de compliance.
- Sign-in logs correlacionados com Conditional Access.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Modele decisões CA a partir de sinais simulados de compliance e documente restrições.

**Fonte oficial do capítulo:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance

### 8. Managed Identity + Azure RBAC

**Fase:** 03 · Operação e dispositivos. **Cenário:** Serviço financeiro consulta dados no Azure sem manter password ou client secret no código.

**Por que configurar:** Identidade de workload reduz credencial estática, enquanto Azure RBAC delimita as operações da workload.

**Resultado esperado:** Managed identity com Reader em escopo mínimo, teste de leitura e escrita negada.

**Requisitos de licença:** Azure pode gerar custo; respeitar orçamento e remover recursos

**Pré-requisitos:**
- Assinatura Azure autorizada, orçamento e resource group descartável.
- Service e recurso suportados para managed identity.

**Decisões de arquitetura:**
- Crie os recursos somente se houver assinatura própria e controle de custos.
- Managed identity autentica workload; Azure RBAC determina ações.

#### 8.1 Definir orçamento

**Onde configurar:** Azure portal → Cost Management + Billing → Budgets

**Como executar:** Registre orçamento e categoria de custos; se indisponível, mantenha atividade como simulação.

**Por que:** Laboratório de IAM cloud pode gerar despesa involuntária.

**Como validar:** Orçamento e previsão/alerta registrados.

**Se falhar:** Sem controle de custo não crie recursos reais.

#### 8.2 Criar escopo mínimo

**Onde configurar:** Azure portal → Resource groups → Create

**Como executar:** Crie RG-IAM-ATL-LAB na região adequada; configure tags owner, purpose e cleanup.

**Por que:** Escopo identifica limite de recursos temporários.

**Como validar:** Resource group identificado e plano de descarte.

**Se falhar:** Erro de criação pode ser falta de RBAC ou restrição Policy.

#### 8.3 Configurar managed identity

**Onde configurar:** Azure recurso suportado → Identity

**Como executar:** Ative System-assigned ou crie User-assigned, justificando decisão e registando principal ID mascarado.

**Por que:** Elimina necessidade de distribuir segredo persistente em scripts.

**Como validar:** Principal distinto do usuário humano.

**Se falhar:** Ativar identidade não concede automaticamente acesso ao recurso.

#### 8.4 Conceder Reader

**Onde configurar:** Recurso Azure de destino → Access Control (IAM) → Add role assignment

**Como executar:** Atribua papel apropriado para leitura somente à identidade no próprio recurso ou resource group isolado.

**Por que:** Role e scope governam a autorização cloud.

**Como validar:** Teste leitura permitida e escrita negada.

**Se falhar:** Reader amplo demais para segredo: use role data-plane apropriada por serviço.

#### 8.5 Revogar e limpar

**Onde configurar:** Resource group → Role assignments / Delete

**Como executar:** Exclua role e recursos após registrar Activity Log e teste de negação.

**Por que:** Cloud IAM precisa de ciclo de vida e auditoria.

**Como validar:** Concessão/revogação documentadas e custo encerrado.

**Se falhar:** Propagação de RBAC pode exigir tempo; não crie privilégios extras para acelerar.

**Critérios de aceite da etapa:**
- Workload sem senha no código.
- Acesso positivo e negativo.
- Resource group e custos de teste encerrados.

**Troubleshooting adicional:** AccessDenied: cheque audience do token, principal correto, escopo da role e propagação da atribuição.

**Rollback e limpeza:** Eliminar resource group e recursos faturáveis, com comprovante de exclusão.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Diagrama de principal, role e scope.
- Acesso permitido e negado.
- Inventário de recursos removidos.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Desenhe trust e teste autorização com IdP OSS e API local.

**Fonte oficial do capítulo:** https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview

### 9. Provisionamento SCIM idempotente

**Fase:** 04 · Governança e automação. **Cenário:** AtlasCorp decide sincronizar o ciclo de vida dos funcionários com aplicação SaaS usando SCIM.

**Por que configurar:** Provisionamento confiável precisa correlacionar identities, interpretar PATCH e lidar com erros sem duplicar contas.

**Resultado esperado:** Fluxo Users SCIM com criação, Mover, disable e retry idempotente.

**Requisitos de licença:** OSS gratuito; conectores podem exigir licença

**Pré-requisitos:**
- Servidor SCIM/Mock isolado com RFC 7643/7644.
- Payload com externalId e userName fictícios.

**Decisões de arquitetura:**
- Um usuário provisionado não está automaticamente autorizado.
- Atributo de matching deve ser persistente e único.

#### 9.1 Definir contrato

**Onde configurar:** Documente mapeamento HR → Entra → /Users

**Como executar:** Escolha sourceId, externalId, userName, active, department e campos obrigatórios.

**Por que:** Previne alteração de identificador ao mudar nome/departamento.

**Como validar:** Contrato com exemplos de entrada e saída.

**Se falhar:** Não use dados reais em payload.

#### 9.2 Criar usuário SCIM

**Onde configurar:** API mock → POST /Users

**Como executar:** Envie JSON sintético e confira Location, status e ID retornado.

**Por que:** Valida a transformação de dados e correlação.

**Como validar:** 200/201 esperado conforme implementação e RFC/contrato.

**Se falhar:** Se o ID não é retornado, corrija endpoint/mock.

#### 9.3 Mover sem duplicar

**Onde configurar:** API mock → PATCH /Users/{id}

**Como executar:** Altere departamento, preserve externalId, teste GET e idempotência.

**Por que:** Mover é atualização da mesma entidade, não um Joiner duplicado.

**Como validar:** ID persistido, atributos atualizados.

**Se falhar:** Se cria outro recurso, revise regra de matching.

#### 9.4 Desativar conta

**Onde configurar:** API mock → PATCH active=false

**Como executar:** Documente que desativar identidade SCIM e bloquear login são controles relacionados porém distintos.

**Por que:** Leaver depende de comportamento do aplicativo de destino.

**Como validar:** Estado active=false comprovado e autorização revisada.

**Se falhar:** Apps podem manter sessão; revise tokens/sessões.

#### 9.5 Simular falha e retry

**Onde configurar:** Mock → timeout/reexecução

**Como executar:** Simule timeout depois de POST efetivo, faça busca por externalId e evite duplicar ao repetir.

**Por que:** Retry robusto é condição de escala corporativa.

**Como validar:** Um único usuário após duas tentativas.

**Se falhar:** Se duplicou, ajuste idempotência/correlação antes de produção.

**Critérios de aceite da etapa:**
- Mapeamento e owner formalizados.
- PATCH e deactivate aplicados.
- Retry não duplica objetos.

**Troubleshooting adicional:** Se usuários duplicam após timeout, revisar correlação por externalId e leitura prévia antes de retry.

**Rollback e limpeza:** Apagar fixtures e tokens da API; não usar credenciais de aplicação de produção.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Requests/Responses sanitizados.
- Estado final correto após retry.
- Mapa de atributos de origem e destino.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Use fixture JSON e mock API local com casos positivos e negativos.

**Fonte oficial do capítulo:** https://www.rfc-editor.org/rfc/rfc7644

### 10. IGA: acesso temporário e recertificação

**Fase:** 04 · Governança e automação. **Cenário:** Financeiro solicita acesso temporário para Bruno e precisa passar por aprovação e recertificação.

**Por que configurar:** A concessão pode existir por grupo, pacote de acesso ou conexão IGA, mas precisa de dono, regra e aplicação de retirada.

**Resultado esperado:** Solicitação e aprovação de entitlement com prazo, revisão e decisão aplicada.

**Requisitos de licença:** Entra ID Governance/P2 conforme recurso; simulação aceita

**Pré-requisitos:**
- Entra P2; recursos avançados podem exigir SKU adicional Entra ID Governance.
- Catálogo fictício de Financeiro com owners.

**Decisões de arquitetura:**
- P2 não garante todas as funcionalidades modernas de Entitlement Management/Lifecycle Workflows.
- Owner é responsável por decisão de necessidade do direito.
- Conflitos SoD devem ser bloqueados ou tratados com exceção formal.

#### 10.1 Inventariar SKU do recurso

**Onde configurar:** Entra → Billing → Licenses → Licensed features

**Como executar:** Confirme se Access Reviews, Entitlement Management e Lifecycle Workflows estão licenciados; não presuma por ter P2.

**Por que:** Governança avançada tem licenças e pré-requisitos independentes.

**Como validar:** Matriz SKU → feature → plano B.

**Se falhar:** Sem SKU correto, use simulação documentada.

#### 10.2 Criar catálogo de acesso

**Onde configurar:** Entra ID Governance → Entitlement Management → Catalogs

**Como executar:** Defina catálogo FIN-ATL, owner, descrição, aplicações/grupos sob responsabilidade de Financeiro.

**Por que:** Direitos dispersos ficam organizados por propósito/owner.

**Como validar:** Catálogo e conjunto de recursos inventariados.

**Se falhar:** Se Entitlement Management não existir, simule com ticket e grupo.

#### 10.3 Definir access package

**Onde configurar:** Entitlement Management → Access packages → New

**Como executar:** Crie FIN-ATL-LEITURA, vincule SG-ATL-FIN-APP-READ, defina solicitantes, approval e expiração de teste.

**Por que:** Concessão é condicionada a tempo e aprovação.

**Como validar:** Regras de política e deadline visíveis.

**Se falhar:** Um package pode exigir licença Governance adicional.

#### 10.4 Executar solicitação

**Onde configurar:** Portal My Access / fluxo de solicitação

**Como executar:** Bruno solicita acesso, gestor aprova, e IAM verifica group membership após decisão.

**Por que:** Aprovação precisa produzir efeito mensurável.

**Como validar:** Linha do tempo pedido → approval → membership → app.

**Se falhar:** Se aceito mas sem acesso, confira atualização/atribuição ao app.

#### 10.5 Recertificar e aplicar decisão

**Onde configurar:** Identity Governance → Access Reviews

**Como executar:** Faça review com owner em período curto de lab. Decida remover e aplique decisão conforme configuração; confira grupo e app.

**Por que:** A revisão só fecha quando a mudança é executada, não ao clicar "deny".

**Como validar:** Logs de reviewer e retirada do entitlement.

**Se falhar:** O modo de aplicação e janela da campanha importam.

**Critérios de aceite da etapa:**
- Licença separada do Entra P2 investigada.
- Fluxo de concessão aprovado e depois retirado.
- Review com decisão aplicada e auditada.

**Troubleshooting adicional:** Access review decidido mas acesso ainda ativo: avalie se a campanha terminou e se as decisões foram aplicadas.

**Rollback e limpeza:** Encerrar campanha fictícia e retirar atribuições/grupos de teste.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Inventário de entitlements e responsáveis.
- Trilha de aprovação e exceção.
- Campanha de revisão com decisões.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Simulação em planilha CSV versionada com logs dos estados.

**Fonte oficial do capítulo:** https://learn.microsoft.com/en-us/entra/id-governance/

### 11. PAM, PIM e break-glass

**Fase:** 04 · Governança e automação. **Cenário:** Renata administra uma função sensível apenas durante janela de manutenção aprovada.

**Por que configurar:** PIM fornece elegibilidade e ativação temporária para funções Microsoft suportadas; PAM/cofres atendem outra superfície de privilégio.

**Resultado esperado:** Elevação JIT com justificativa, MFA quando exigido e retirada automática.

**Requisitos de licença:** PIM requer elegibilidade de licença; cofre local OSS opcional

**Pré-requisitos:**
- Entra P2 válido para usuários aplicáveis ou produto ID Governance.
- Conta administrativa separada e acesso de emergência seguro.

**Decisões de arquitetura:**
- Não conceda Global Administrator para exercícios simples.
- PIM elegível difere de assignment permanente.
- Se houver acesso herdado/permanente a operação ainda pode funcionar após expiração.

#### 11.1 Escolher função restrita

**Onde configurar:** Entra ID → Roles and administrators

**Como executar:** Selecione papel que possibilita operação reversível, como grupos em laboratório, com escopo mais baixo disponível.

**Por que:** Demonstra menor privilégio antes de aprender elevação.

**Como validar:** Tabela tarefa → role → risco.

**Se falhar:** Evite usar Global Administrator por comodidade.

#### 11.2 Criar elegibilidade

**Onde configurar:** Entra ID Governance → Privileged Identity Management → Microsoft Entra roles

**Como executar:** Atribua elegibilidade à conta renata.admin com duração, justificativa e aprovação caso disponível.

**Por que:** Reduz janela de privilégio permanente.

**Como validar:** Role eligibility com owner e validade.

**Se falhar:** Se não aparece PIM, verifique P2 do usuário e roles do operador.

#### 11.3 Testar antes da ativação

**Onde configurar:** Entra ID → ação administrativa de teste

**Como executar:** Tente operação antes de ativar e confirme que não possui função efetiva, caso não haja outra role herdada.

**Por que:** Demonstra baseline de privilégio.

**Como validar:** Operação negada e memberships auditados.

**Se falhar:** Se funciona, investigue role permanente adicional.

#### 11.4 Ativar sob aprovação

**Onde configurar:** PIM → My roles → Activate

**Como executar:** Ative função temporária, forneça justificativa e faça MFA exigido. Anote hora de ativação/expiração.

**Por que:** Cria evento de autorização administrativo rastreável.

**Como validar:** Evento de ativação e operação permitida.

**Se falhar:** A ativação pode exigir refresh/relogin por latência de token.

#### 11.5 Validar expiração e emergência

**Onde configurar:** PIM / Audit logs

**Como executar:** Espere fim da janela, teste operação novamente e valide negado; documente conta emergency separada que não dependa do PIM.

**Por que:** Verifica princípio de privilégio temporário e continuidade.

**Como validar:** Antes/durante/depois com logs.

**Se falhar:** Permissões permanentes alternativas podem invalidar teste.

**Critérios de aceite da etapa:**
- PIM ligado apenas ao papel necessário.
- Autorização muda após ativar/expirar.
- Conta break-glass permanece auditada e protegida.

**Troubleshooting adicional:** Se a função permanece disponível, cheque roles permanentes herdadas ou associação a grupos elegíveis.

**Rollback e limpeza:** Remover elegibilidade piloto e encerrar Vault de desenvolvimento; não usar credenciais reais.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Linha do tempo de elevação e expiração.
- Registro de sessão/operação privilegiada.
- Runbook de emergência com auditoria.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Modelo de aprovação + Vault local em VM isolada; não simular em produção.

**Fonte oficial do capítulo:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

### 12. Purview: classificação, rótulos e DLP

**Fase:** 05 · Defesa e dados. **Cenário:** Equipe de Financeiro classifica relatórios e precisa limitar exposição acidental de dados.

**Por que configurar:** Purview atua sobre proteção da informação; não substitui atribuições IAM no diretório ou na aplicação.

**Resultado esperado:** Sensitivity labels e DLP pilotadas com dados fictícios e regras claras de uso.

**Requisitos de licença:** Requer licenças Purview/M365 compatíveis conforme recurso

**Pré-requisitos:**
- Microsoft Purview/M365 apropriados, separados do Entra ID P2.
- Documentos e classificações totalmente sintéticos.

**Decisões de arquitetura:**
- Label sem configuração de criptografia não impede leitura por si.
- DLP primeiro em modo de auditoria; habilitar bloqueio após análise de falso positivo.

#### 12.1 Confirmar direito de licenciamento

**Onde configurar:** purview.microsoft.com → Settings / Solutions disponíveis

**Como executar:** Verifique se a licença M365/Purview permite Information Protection, labels e DLP no workload que será testado.

**Por que:** P2 não inclui automaticamente direitos para todas as soluções Purview.

**Como validar:** Matriz feature/licença e alternativa.

**Se falhar:** Sem licença, registre a simulação com arquivos sintéticos.

#### 12.2 Definir informação e owner

**Onde configurar:** Inventário AtlasCorp → classificação

**Como executar:** Classifique 3 documentos sintéticos como Público, Interno e Confidencial e determine grupo permitido.

**Por que:** Proteção depende da sensibilidade e do responsável pelo dado.

**Como validar:** Catálogo de documentos, rótulo e acesso.

**Se falhar:** Não insira dados pessoais em amostras.

#### 12.3 Criar e publicar sensitivity label

**Onde configurar:** Purview → Information Protection → Sensitivity labels

**Como executar:** Crie etiqueta Confidencial e configure opções compatíveis com a plataforma; publique para grupo piloto e aguarde propagação.

**Por que:** Uma label precisa estar disponível ao usuário antes de testar aplicação.

**Como validar:** Etiqueta visível em arquivo de teste e política de publicação.

**Se falhar:** Se não aparece, confira licença, grupo e atraso de publicação.

#### 12.4 Avaliar proteção real

**Onde configurar:** App Office de teste → documento

**Como executar:** Aplique etiqueta e compare comportamento de usuário autorizado e não autorizado. Se não houver criptografia habilitada, não espere bloqueio de abertura.

**Por que:** Separar classificação de controle de acesso evita falsos pressupostos.

**Como validar:** Tabela com efeito real vs esperado.

**Se falhar:** DLP e label podem não produzir a mesma resposta.

#### 12.5 Criar DLP audit-only

**Onde configurar:** Purview → Data Loss Prevention → Policies

**Como executar:** Defina regra para dados sintéticos de teste no local suportado; configure auditoria em vez de bloqueio e verifique evento.

**Por que:** Permite ajustar precisão sem interromper operações legítimas.

**Como validar:** Evento controlado, avaliação de falsos positivos e rollback.

**Se falhar:** Se não existe evento, veja janela de propagação e cobertura de workload.

**Critérios de aceite da etapa:**
- Rótulo e DLP corretamente diferenciados.
- Documento classificado e restrição demonstrada somente onde configurada.
- Política piloto reversível e sem dados reais.

**Troubleshooting adicional:** Rótulo sem criptografia pode não restringir leitura; diferencie classificação de proteção e valide suporte do aplicativo.

**Rollback e limpeza:** Remover escopos/políticas pilotos e arquivos sintéticos, sem afetar conteúdo corporativo.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Taxonomia e donos dos dados.
- Matriz de acesso documento-grupo.
- Regra DLP e evidência de avaliação.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Simule classificação, controles e falsos positivos sobre arquivos sintéticos.

**Fonte oficial do capítulo:** https://learn.microsoft.com/en-us/purview/information-protection

### 13. Investigação IAM com KQL

**Fase:** 05 · Defesa e dados. **Cenário:** SecOps investiga repetidas falhas de acesso ao aplicativo de Financeiro após política Conditional Access.

**Por que configurar:** Mudanças de autenticação precisam ser confirmadas em logs com hipótese, correção e nova verificação.

**Resultado esperado:** Investigação reproduzível com sign-ins, audit logs e consultas KQL quando houver workspace.

**Requisitos de licença:** Entra logs básicos; exportação/workspace podem custar

**Pré-requisitos:**
- Usuários sintéticos e políticas piloto dos capítulos anteriores.
- Acesso de leitura a sign-in logs, AuditLogs e workspace se licenciado.

**Decisões de arquitetura:**
- Login negado pode ser MFA, autorização da app, dispositivo, credencial ou política.
- Ausência de log pode resultar de atraso, retenção ou filtro errado.

#### 13.1 Produzir dois eventos conhecidos

**Onde configurar:** Entra → sign-in de conta fictícia

**Como executar:** Faça login válido e inválido sem provocar bloqueio prolongado. Anote UTC, aplicativo, usuário e correlation ID.

**Por que:** Investigar um evento conhecido valida a observabilidade.

**Como validar:** Linha do tempo com status.

**Se falhar:** Se nenhum log aparece, confira ingestão e retenção.

#### 13.2 Ler Conditional Access

**Onde configurar:** Entra ID → Monitoring & health → Sign-in logs → evento

**Como executar:** Veja status, Authentication details, policies e diferença entre report-only e política On.

**Por que:** Separar avaliação prevista de enforcement real.

**Como validar:** Matriz política → condição → resultado.

**Se falhar:** Cuidado com política não aplicada por grupo/app errado.

#### 13.3 Correlacionar alterações

**Onde configurar:** Entra ID → Audit logs

**Como executar:** Modifique membership de grupo de teste, filtre período/ator e encontre operação correspondente.

**Por que:** Mudança de autorização também precisa de auditoria.

**Como validar:** Evento administrativo com ator e alvo.

**Se falhar:** Se não aparecer, verifique operação correta e latência.

#### 13.4 Criar consulta KQL

**Onde configurar:** Workspace Log Analytics (opcional)

**Como executar:** Na tabela real do ambiente, filtre sign-in failures por TimeGenerated/Status, projete colunas e agregue por aplicação. Ajuste schema para não assumir tabela disponível.

**Por que:** Padroniza triagem e relatórios.

**Como validar:** KQL reproduzível e saída interpretada.

**Se falhar:** Se não houver workspace, use dados sintéticos e documente simulação.

#### 13.5 Executar remediação

**Onde configurar:** Ticket de incidente → política piloto

**Como executar:** Demonstre causa raiz de bloqueio não intencional, ajuste somente política piloto, repita acesso e registre correção.

**Por que:** Sem revalidação, diagnóstico não prova resolução.

**Como validar:** Antes/depois correlacionado e aprovação da mudança.

**Se falhar:** Não afrouxe política global para consertar app de teste.

**Critérios de aceite da etapa:**
- Hipótese sustentada por logs.
- Evento de alteração de grupo localizado.
- Erro corrigido e revalidado.

**Troubleshooting adicional:** Se consulta retorna zero, revise ingestion/retention, timezone, tabela, permissões e filtros antes de concluir que não houve eventos.

**Rollback e limpeza:** Apagar logs exportados com PII e dados de teste após retenção definida.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Linha do tempo de incidente sintético.
- Consulta KQL reproduzível.
- Runbook com causa e validação após correção.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Execute KQL conceitual sobre dados fictícios; não inclua logs pessoais reais.

**Fonte oficial do capítulo:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

### 14. Active Directory híbrido

**Fase:** 06 · Integração e arquitetura. **Cenário:** Empresa herdou Active Directory e precisa entender a correlação de identidades locais/cloud.

**Por que configurar:** AD DS, Kerberos, LDAP e sincronização em Entra executam funções diferentes, mesmo quando combinados em ambiente híbrido.

**Resultado esperado:** Modelo de identidade híbrida com atributos autoritativos, prova de autenticação e consulta de diretório.

**Requisitos de licença:** Windows Server avaliação sob termos aplicáveis; VMs isoladas

**Pré-requisitos:**
- VM Windows Server licenciado/avaliação em rede isolada ou simulação equivalente.
- DNS correto e snapshot para rollback.

**Decisões de arquitetura:**
- Nunca sincronize diretório de laboratório com tenant corporativo real.
- Defina fonte autoritativa e estratégia de correlação antes de ligar sync.

#### 14.1 Montar AD de laboratório

**Onde configurar:** Windows Server → Server Manager → Add Roles

**Como executar:** Prepare domínio de laboratório isolado, DNS e AD DS, sem roteamento para a rede de produção.

**Por que:** Domínio e DC fornecem diretório/autenticação de Windows.

**Como validar:** DNS SRV e DC de laboratório operantes.

**Se falhar:** Falha Kerberos pode decorrer de DNS/tempo.

#### 14.2 Provar identidade local

**Onde configurar:** Active Directory Users and Computers → OU Users

**Como executar:** Crie OU, usuário, grupo e atributo estável; configure direitos mínimos.

**Por que:** Prepara fonte de identidade local com lifecycle separado.

**Como validar:** Conjunto de objetos e membership registrado.

**Se falhar:** Não copie hash/senhas para evidências.

#### 14.3 Verificar autenticação

**Onde configurar:** Cliente no domínio → klist e eventos

**Como executar:** Faça login com usuário de teste, consulte ticket e explique TGT versus serviço.

**Por que:** Kerberos autentica para serviço, não concede automaticamente todas as permissões.

**Como validar:** Ticket e evento sanitizados.

**Se falhar:** Clock skew e DNS devem ser verificados antes de recriar contas.

#### 14.4 Planejar sincronização

**Onde configurar:** Entra Connect Sync ou Cloud Sync, conforme requisitos

**Como executar:** Desenhe UPN, sourceAnchor, atributos e filtros de OU; implemente apenas em ambiente isolado e elegível.

**Por que:** Identificadores precisam ser preservados em Mover.

**Como validar:** Topologia e matriz fonte→destino.

**Se falhar:** Se alteração de atributo é read-only na nuvem, corrija na fonte local.

#### 14.5 Testar continuidade

**Onde configurar:** Diagrama: DC indisponível / sync atrasado

**Como executar:** Modele falhas de rede, sincronização e autenticação e efeito em cloud.

**Por que:** Cria entendimento de dependência híbrida.

**Como validar:** Matriz de falhas e recuperação.

**Se falhar:** PHS, PTA e federação reagem de modo distinto à queda do AD.

**Critérios de aceite da etapa:**
- DNS/Kerberos e LDAP comprovados ou simulados.
- Correlações e fontes autoritativas documentadas.
- Falha híbrida explicada.

**Troubleshooting adicional:** Falha de logon pode envolver relógio, DNS, conectividade de DC e credenciais: diagnostique nessa ordem.

**Rollback e limpeza:** Desconectar VMs da rede e restaurar snapshot/limpar diretório de teste.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Diagrama híbrido e identificadores de correlação.
- Resultados de DNS/Kerberos/LDAPS.
- Matriz de fonte de autoridade e falhas.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** OpenLDAP e Keycloak para parte prática; documentação para híbrido Microsoft.

**Fonte oficial do capítulo:** https://learn.microsoft.com/en-us/entra/identity/hybrid/

### 15. Federação de workload entre clouds

**Fase:** 06 · Integração e arquitetura. **Cenário:** Pipeline AtlasCorp precisa acessar ambientes Azure, AWS e Google Cloud com credenciais temporárias.

**Por que configurar:** OIDC federation para workload evita segredos long-lived, mas deve restringir emitter/subject/audience e roles efetivas.

**Resultado esperado:** Trust model multi-cloud comparável sem confundir permissões e identities dos provedores.

**Requisitos de licença:** Sandboxes AWS/GCP podem gerar custos

**Pré-requisitos:**
- IAM e OAuth/OIDC concluídos.
- Sandboxes isolados nas clouds ou políticas fictícias.

**Decisões de arquitetura:**
- Cloud IAM não é a mesma coisa em AWS/GCP/Azure.
- Trust policy e permission policy têm propósitos distintos em AWS.

#### 15.1 Definir identidade do pipeline

**Onde configurar:** Projeto GitHub fictício → issuer/subject/audience

**Como executar:** Escreva emissor, repo/branch ou ambiente permitido e audiência de destino.

**Por que:** Uma trust ampla pode aceitar qualquer branch/repo.

**Como validar:** Tabela de claims permitidas/rejeitadas.

**Se falhar:** Não insira segredo estático no repositório.

#### 15.2 Mapear Azure federation

**Onde configurar:** Entra → App registration / Managed identity → Federated credentials

**Como executar:** Desenhe trust externa para principal e atribua role mínima ao recurso Azure.

**Por que:** Separa autenticação por OIDC de autorização no recurso.

**Como validar:** Policy de trust e role scope.

**Se falhar:** Subject errado deve rejeitar token.

#### 15.3 Mapear AWS role

**Onde configurar:** AWS IAM → Identity providers / Roles

**Como executar:** Crie ou modele OIDC provider e trust relationship de sts:AssumeRoleWithWebIdentity restringindo subject/audience, mais permission policy separada.

**Por que:** Trust controla quem assume; permission policy o que pode fazer.

**Como validar:** Role aceita claims corretas e nega branch divergente.

**Se falhar:** Condições com wildcard amplo expõem conta.

#### 15.4 Mapear GCP federation

**Onde configurar:** GCP IAM → Workload Identity Pools

**Como executar:** Projete pool, provider, attribute mapping/condition e recurso ou service account alvo.

**Por que:** GCP possui semântica de principal e resource bindings própria.

**Como validar:** Mapeamento de trust e acesso mínimo.

**Se falhar:** Não presuma equivalência com role assignment Azure.

#### 15.5 Concluir segurança

**Onde configurar:** Inventário → credenciais e custos

**Como executar:** Compare validade, rotação, isolamento, logging e cleanup das 3 clouds.

**Por que:** Portabilidade exige analisar mecanismos, não traduzir nomes de botão.

**Como validar:** Matriz de três ambientes e testes adversos.

**Se falhar:** Documente simulação caso não tenha sandbox.

**Critérios de aceite da etapa:**
- Issuer, subject e audience bem restritos.
- Papel por serviço e escopo mínimo documentados.
- Tokens de origem não autorizada rejeitados em testes/simulação.

**Troubleshooting adicional:** Confiança aberta por wildcard amplo deve ser tratada como falha de segurança; limite claims de origem.

**Rollback e limpeza:** Excluir identidades/roles de teste e recursos faturáveis eventualmente criados.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Diagrama emissor-trust-target por cloud.
- Tabela de políticas permitidas/negadas.
- Avaliação de expiração, risco e revogação.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Use somente diagramas e policies fictícias sem provisionar recursos pagos.

**Fonte oficial do capítulo:** https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html

### 16. Projeto final IAM ponta a ponta

**Fase:** 07 · Capstone. **Cenário:** Auditoria exige mostrar que AtlasCorp controla admissão, acesso, autenticação, dispositivos, dados, exceções e revogação.

**Por que configurar:** Projetos IAM corporativos exigem desenho de arquitetura, controles operacionais e demonstração de decisão autorizada e negada.

**Resultado esperado:** Portfólio demonstrável: arquitetura, direitos, políticas, testes, investigação, riscos e retorno de serviços.

**Requisitos de licença:** Combine laboratórios executados e simulações onde licenças não permitem

**Pré-requisitos:**
- Capítulos anteriores concluídos ou categorizados como simulação.
- Custos de cloud e responsabilidades mapeados.

**Decisões de arquitetura:**
- Não apresente simulação como implantação real.
- Toda decisão de acesso deve ter dono, objetivo, execução e auditoria.
- Resiliência, recuperação e privacidade são requisitos, não apêndices.

#### 16.1 Consolidar contexto

**Onde configurar:** Portfólio AtlasCorp → arquitetura

**Como executar:** Crie diagrama usuários, RH, Entra, grupos, aplicações, Intune, Azure, Purview, SIEM e workloads.

**Por que:** Mostra fronteiras de confiança e dependências.

**Como validar:** Diagrama versionado com origem e dono de cada identidade.

**Se falhar:** Não misture simulações e serviços reais no desenho sem legenda.

#### 16.2 Apresentar matrizes

**Onde configurar:** Portfólio → RACI, SoD e matriz de privilégios

**Como executar:** Liste Joiner/Mover/Leaver, roles, recursos, owners, escopos e justificativas.

**Por que:** Demonstra governança orientada ao risco.

**Como validar:** Matrizes com decisões aprovadas.

**Se falhar:** Direito sem owner é exceção a corrigir.

#### 16.3 Mostrar login e autorização

**Onde configurar:** App de teste + Entra CA

**Como executar:** Reproduza um login com método apropriado, app assignment e ação autorizada/negada.

**Por que:** Demonstra que autenticação e autorização são controles diferentes.

**Como validar:** Logs e responses 2xx/4xx sanitizados.

**Se falhar:** Se app só verifica front-end, implemente backend authorization.

#### 16.4 Correlacionar device/data

**Onde configurar:** Intune + Purview quando licenciados

**Como executar:** Teste condição de dispositivo e política do dado nos respectivos workloads, ou registre simulações.

**Por que:** Sinais complementares de Zero Trust.

**Como validar:** Status de compliance e proteção de documento com escopo.

**Se falhar:** P2 sozinho não licencia os outros produtos.

#### 16.5 Demonstrar governança avançada

**Onde configurar:** PIM / Access Reviews / tickets

**Como executar:** Mostre concessão, ativação temporária e retirada real ou simulada.

**Por que:** Evita privilégios permanentes e contas órfãs.

**Como validar:** Logs de solicitação, aprovação e remoção.

**Se falhar:** P2 e ID Governance têm coberturas distintas.

#### 16.6 Investigar incidente

**Onde configurar:** Sign-in / audit / incident logs

**Como executar:** Provoque condição controlada de bloqueio, documente hipótese e teste correção.

**Por que:** Uma defesa só está madura quando pode ser operada.

**Como validar:** Runbook com evidências antes e depois.

**Se falhar:** Não execute incidente simulado em tenant real.

#### 16.7 Fazer revisão de segurança

**Onde configurar:** Portfólio → checklist final

**Como executar:** Liste licenças, custo, riscos residuais, segredos excluídos, privilégios removidos, backups e recuperação.

**Por que:** Conclui processo como um projeto de empresa.

**Como validar:** Relatório final seguro para mostrar em entrevista.

**Se falhar:** Redija identificadores de tenant, tokens e informações pessoais.

**Critérios de aceite da etapa:**
- Pelo menos um caso positivo e um negativo executados com evidência.
- JML e privilégio com owner e retirada comprovados.
- Licenças, riscos e recursos simulados explicitamente identificados.
- Ambiente de teste limpo e custos controlados.

**Troubleshooting adicional:** Componentes indisponíveis devem ser rotulados como simulação e não como experiência operacional executada.

**Rollback e limpeza:** Remover recursos cloud de teste, políticas e permissões piloto; registrar custos finais.

**Evidências que devem ser preservadas fora do GitHub Pages:**
- Arquitetura versionada com fronteiras de confiança.
- Evidências sanitizadas de testes positivos e negativos.
- RACI, métricas, auditoria, riscos residuais e rollback.
- Teste adverso, diagnóstico e correção registrados.
- Checklist de limpeza/rollback concluído ou justificado.

**Sem licença:** Separe claramente implementação real, simulação e item apenas teórico.

**Fonte oficial do capítulo:** https://csrc.nist.gov/pubs/sp/800/207/final

## Evidências e portfólio

Classifique cada capítulo como prática real em tenant, simulação técnica ou estudo exclusivamente teórico. Não reivindique em currículo experiência prática sobre recursos executados apenas em simulação.

O site usa localStorage para registrar etapas marcadas; não há sincronização com contas Microsoft, login no tenant nem envio de evidências.