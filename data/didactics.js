/* ROADMAP - IAM · Pedagogia e evidências 2026-10
 * Metadados orientativos; não fingem validação por conexão ao tenant.
 * Os 242 identificadores de aulas e as 94 tarefas herdadas não são alterados.
 */
const PRACTICE_PROOF_KEY='roadmap-iam-practice-evidence-v1';
let practiceProof={};
function stableTaskKey(labId,taskIndex){
 const task=COMPANY_CHAPTERS[labId]?.tasks[taskIndex];
 if(!task)throw Error('Tarefa inexistente: '+labId+'/'+taskIndex);
 return labId+':'+task.title.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}
const SOURCE_REFINEMENTS={
 'Conditional Access':[
 ['Planejamento oficial de Conditional Access','https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access'],
 ['Análise de políticas Report-only','https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only']],
 'Conditional Access report-only':[
 ['Interpretar resultados Report-only','https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only']],
 'RBAC':[
 ['Modelo RBAC administrativo do Entra','https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-overview'],
 ['Diferenciar Entra roles e Azure RBAC','https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles']],
 'Roles Entra ID':[
 ['Referência de papéis administrativos Entra','https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-overview']],
 'Azure RBAC: principal, role e scope':[
 ['Diferenças entre papéis Azure e Entra','https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles']],
 'Authorization Code com PKCE':[
 ['Fluxo de código de autorização Microsoft','https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow']],
 'SCIM Users':[
 ['SCIM 2.0: operações HTTP e provisionamento (RFC 7644)','https://www.rfc-editor.org/rfc/rfc7644']],
 'SCIM Groups':[
 ['SCIM 2.0: protocolo (RFC 7644)','https://www.rfc-editor.org/rfc/rfc7644']],
 'PATCH':[
 ['PATCH no protocolo SCIM (RFC 7644)','https://www.rfc-editor.org/rfc/rfc7644']],
 'JIT, break-glass e revisão':[
 ['Acesso emergencial seguro no Entra','https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access']]
};
const MODULE_DECISION_CONTEXT={
 0:{question:'Uma falha ocorreu antes ou depois da autenticação?',risk:'Confundir DNS, conectividade e TLS com decisão de acesso.',focus:'Trace cliente → DNS → transporte → TLS → aplicação → identidade.'},
 1:{question:'Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?',risk:'Usar o login como única fonte de verdade sobre uma pessoa.',focus:'Separe pessoa, conta, identidade, atributo, credencial e direito.'},
 2:{question:'Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?',risk:'Considerar o AD e o Entra o mesmo serviço.',focus:'Modele KDC, tickets, OU, GPO e administração do domínio.'},
 3:{question:'Qual atributo é autoritativo e como ele é propagado?',risk:'Assumir que uma conta sincronizada permite alterar todos os atributos na nuvem.',focus:'Diferencie diretório, consultas LDAP e política de sincronização.'},
 4:{question:'Quem pode executar a ação no recurso específico?',risk:'Interpretar menu visível ou pertença a grupo como autorização válida na API.',focus:'Cheque role, escopo, permissão efetiva e teste negativo no backend.'},
 5:{question:'Qual autenticador prova identidade com nível de garantia apropriado?',risk:'Tratar qualquer MFA como resistente a phishing.',focus:'Compare fatores, origem, recuperação e força da autenticação.'},
 6:{question:'Emissor, destinatário, tempo e assinatura da assertion foram validados?',risk:'Aceitar assertion fora do público, do prazo ou sem confiança apropriada.',focus:'Separe IdP, SP, metadata, certificado, atributos e autorização local.'},
 7:{question:'O token é destinado ao cliente ou ao recurso da API?',risk:'Enviar ID token para API como se fosse um access token.',focus:'Valide authorization code/PKCE, state, nonce, issuer e audience.'},
 8:{question:'O IdP autenticou a identidade e a aplicação fez autorização própria?',risk:'Achar que o IdP substitui todas as verificações de aplicação.',focus:'Examine clients, roles, scopes, logs e limite do laboratório.'},
 9:{question:'A tarefa usa papel administrativo do Entra, grupo ou role da aplicação?',risk:'Dar Global Administrator quando seria suficiente uma atribuição de aplicativo.',focus:'Separe objetos tenant, aplicações, grupos e funções administrativas.'},
 10:{question:'Quem confia na identidade da workload e qual permissão ela assume?',risk:'Manter secrets permanentes ou trust amplo sem necessidade.',focus:'Separe autenticador, trust, principal, role e escopo.'},
 11:{question:'A operação é Joiner, Mover ou Leaver, e qual é o ID estável?',risk:'Duplicar identidades após retry ou manter permissões de funcionário desligado.',focus:'Mapeie externalId, PATCH, idempotência, desativação e logs.'},
 12:{question:'Quem é dono do direito, quem aprovou e a remoção foi aplicada?',risk:'Registrar revisão sem efetivamente retirar autorização.',focus:'Assinatura de solicitação, validade, acesso efetivo e trilha auditável.'},
 13:{question:'Quando o privilégio é ativado, por quem e durante quanto tempo?',risk:'Confundir PIM, vault e direito permanente.',focus:'JIT, aprovação, MFA, auditoria, expiração e recuperação.'},
 14:{question:'Qual evento comprova a decisão de autenticação e autorização?',risk:'Concluir ausência de ação a partir de uma busca de logs incompleta.',focus:'Correlacione ator, alvo, aplicativo, UTC, tipo do log e retenção.'},
 15:{question:'Onde fica cada fronteira de confiança e como recuperar de falhas?',risk:'Tratar Zero Trust como uma ferramenta única.',focus:'Desenhe IdP, PDP, PEP, aplicações, dados e ciclo de vida.'},
 16:{question:'IAL, AAL e FAL estão sendo usados para a finalidade correta?',risk:'Interpretar garantia de identidade como garantia de login.',focus:'Separar comprovação, autenticador, federação e recuperação.'},
 17:{question:'O escopo de delegação cobre exatamente os objetos necessários?',risk:'Confundir administrative units com isolamento total de diretório.',focus:'Papéis, grupos, Graph, delegação e auditoria.'},
 18:{question:'A condição foi validada em Report-only antes do enforcement?',risk:'Habilitar CA de alto impacto sem acesso de emergência.',focus:'Usuário, app, risco, método, dispositivo, sign-in log e rollback.'},
 19:{question:'O convidado tem sponsor, prazo e entitlement independente?',risk:'Manter parceiro com acesso indefinido.',focus:'Trust inbound/outbound, B2B, app assignment e offboarding.'},
 20:{question:'A condição de dispositivo reflete compliance Intune e não apenas cadastro?',risk:'Equacionar registered/joined com compliant.',focus:'MDM, estado, CA, logs, exceções e retire seguro.'},
 21:{question:'A role está no resource group/recurso e é data-plane ou management-plane?',risk:'Conceder Owner em subscription quando só precisa de leitura.',focus:'Role assignment, herança, NotActions, Activity Log e custos.'},
 22:{question:'Quais claims restringem a confiança do token de workload?',risk:'Aceitar tokens de projeto/branch não autorizados.',focus:'Issuer, subject, audience, recurso alvo e duração.'},
 23:{question:'Um access package termina com remoção efetiva?',risk:'Assumir que Entra P2 libera todos os recursos do Governance.',focus:'Licença, owner, pacote, aprovação, expiração e aplicação da revisão.'},
 24:{question:'Classificação aplica proteção efetiva ou só informação visual?',risk:'Confundir sensitivity label com autorização de usuário.',focus:'Classificação, criptografia, DLP, workload e falsos positivos.'},
 25:{question:'A consulta observa a fonte, schema e janela de eventos corretos?',risk:'Usar KQL sem validar origem da tabela ou atraso de ingestão.',focus:'Consultas e timeline, hipóteses, diagnóstico e correção.'},
 26:{question:'Os conceitos são portáveis ou a semântica de role é diferente?',risk:'Traduzir papéis AWS, GCP e Azure como se fossem equivalentes.',focus:'Trust, permissão efetiva, SCP/org policy e workloads.'},
 27:{question:'A política é avaliada e aplicada em toda chamada protegida?',risk:'Usar regra da interface como substituto da enforcement server-side.',focus:'Regras versionadas, testes positivos e negativos e PDP/PEP.'},
 28:{question:'Uma decisão de rede está sendo confundida com autorização da aplicação?',risk:'Implantar controle de tráfego sem planejar reversão da conectividade.',focus:'Private Access, Internet Access, sessão, CA e conectores.'}
};
const MODULE_CASE_SCENES={
 0:'Bruno não consegue alcançar a página de login do aplicativo financeiro. SecOps precisa identificar se a falha é anterior ao IdP, na conexão ou na aplicação.',
 1:'RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa.',
 2:'Uma unidade antiga utiliza domínio Windows com controlador, estações e compartilhamento interno. O time precisa entender a autenticação local e sua dependência de rede.',
 3:'A AtlasCorp integra um diretório corporativo antigo a serviços cloud. Uma divergência de atributo impede a correlação correta do usuário.',
 4:'Financeiro recebe solicitação de leitura e aprovação de documentos, enquanto TI opera a plataforma. Os direitos precisam ser distinguidos e auditados.',
 5:'Funcionário cadastrado pode usar método de autenticação inadequado para uma operação sensível. IAM analisa riscos de phishing e recuperação de conta.',
 6:'Portal externo aceita SSO, mas há diferença entre certificados, emissor da assertion e destinatário configurado.',
 7:'Aplicação de relatórios utiliza autorização OAuth/OIDC; o cliente e a API exigem tokens para finalidades diferentes.',
 8:'Equipe de desenvolvimento configura um IdP local para testar SSO e roles sem expor nenhuma interface administrativa à internet.',
 9:'AtlasCorp inicia sua administração de identidades em um tenant Entra. É necessário separar usuários, grupos, aplicativos e privilégios administrativos.',
 10:'Workload Financeiro deve ler recurso cloud sem client secret permanente nem papel administrativo amplo.',
 11:'RH comunica Joiner, Mover e Leaver; SaaS de destino não pode criar contas duplicadas nem deixar acesso órfão.',
 12:'Gestor aprova acesso temporário a dados financeiros. IAM precisa registrar dono, prazo, justificativa e aplicação da remoção.',
 13:'Renata precisa de privilégio administrativo somente durante uma janela de manutenção e a organização exige auditoria após expiração.',
 14:'SecOps recebeu reclamação de login negado; precisa correlacionar registros de autenticação com mudanças administrativas e decisões de política.',
 15:'Um arquiteto apresenta o desenho de identidade de AtlasCorp à segurança e à direção, incluindo falhas e responsáveis por cada decisão.',
 16:'RH precisa determinar confiança na pessoa cadastrada enquanto TI define a força do autenticador e a confiança da federação.',
 17:'IAM delega administração de grupos e usuários sem conceder acesso irrestrito ao diretório nem aos recursos Azure.',
 18:'Uma política de acesso deve reagir a usuários, aplicativos e sinais de risco sem bloquear administradores de recuperação.',
 19:'Fornecedor externo entra na AtlasCorp com sponsor e prazo definidos, recebendo exclusivamente o recurso necessário.',
 20:'Um dispositivo piloto altera seu estado de compliance e o Entra precisa decidir acesso à aplicação baseada em sinal Intune.',
 21:'Um recurso Azure precisa oferecer somente leitura para um principal específico, sem permitir escrita ou delegar a assinatura inteira.',
 22:'Pipeline de desenvolvimento solicita token federado para acessar recurso cloud; apenas uma origem de confiança autorizada deve ser aceita.',
 23:'Financeiro adota catálogo e pacote de acesso para concessões temporárias, aprovações e revisões automáticas quando licenciadas.',
 24:'Documento financeiro sintético é classificado; a equipe deve diferenciar rótulo informativo, criptografia e prevenção de vazamento.',
 25:'Uma investigação de acesso reúne eventos de vários serviços com horários, categorias e retenções diferentes.',
 26:'Arquiteto compara AWS, Google Cloud e Microsoft Azure sem assumir equivalência de política, trust e autorização.',
 27:'Aplicativo interno depende de uma política versionada para determinar se um usuário pode alterar determinado registro.',
 28:'Colaboradores remotos precisam acessar aplicativo privado; a rota de rede e a autorização da aplicação devem ser avaliadas separadamente.'
};
const SPECIAL_CASES={
 'TCP/IP':{scenario:'O navegador de Bruno falha antes da tela de login. Identifique o que verificar primeiro: conectividade IP, resolução DNS, negociação TLS e chegada ao IdP.',evidence:'Fluxo em quatro etapas com o ponto provável de falha. Não é necessário implantar infraestrutura de rede.'},
 'DNS':{scenario:'O endereço do aplicativo não resolve, mas outro serviço do mesmo tenant funciona. Compare registros, resolvedor e diferença entre DNS e erro de autenticação.',evidence:'Hipótese da falha e consulta apropriada (nslookup, Resolve-DnsName ou dig).'},
 'TLS e certificados':{scenario:'O navegador recusa a conexão ao portal fictício antes de exibir SSO. Examine nome do certificado, validade, CA, relógio e TLS.',evidence:'Diagnóstico por categoria; não desative validação TLS para forçar o acesso.'},
 'RBAC':{scenario:'Bruno pode ler um relatório financeiro, mas não editar; Camila (TI) não acessa o relatório; Renata aprova apenas ações permitidas.',evidence:'Matriz usuário-grupo-app role-ação com ao menos uma decisão permitida e duas negadas no serviço.'},
 'Conditional Access':{scenario:'Camila pertence ao grupo piloto e acessa o app de teste. Compare sua autenticação com a de uma pessoa fora do grupo.',evidence:'Tabela escopo, recurso, Grant control, Report-only e resultado real nos Sign-in logs, com plano de rollback.'},
 'Authorization Code com PKCE':{scenario:'O aplicativo testa callback conhecido e outro não registrado. O código de autorização não pode ser aceito por qualquer redirect.',evidence:'Fluxo com state, code challenge/verifier, audience e teste negativo de URI.'},
 'SCIM Users':{scenario:'O RH transfere Bruno de área. O destino SCIM deve atualizar o mesmo usuário e não criar um duplicado.',evidence:'ID/externalId original, PATCH, GET atualizado e conferência de active.'},
 'Kerberos':{scenario:'Um usuário de domínio faz login, mas falha no compartilhamento. Identifique TGT, ticket de serviço, SPN e autorização do share.',evidence:'Diagrama KDC/cliente/serviço e distinção entre autenticação e ACL.'},
 'Azure RBAC: principal, role e scope':{scenario:'Uma workload precisa ler recurso específico sem escrever e sem permissão geral na assinatura.',evidence:'Tabela principal-role-escopo, operação positiva e negativa, e confirmação de cleanup.'},
 'Data Loss Prevention (DLP)':{scenario:'Um documento sintético confidencial é compartilhado fora da empresa durante o piloto audit-only.',evidence:'Registro de política, aplicação, evento e análise de falso positivo sem conteúdo real.'},
 'Identity proofing e IAL':{scenario:'Compare cadastro de usuário em fórum com contratação que exige confiança formal na pessoa.',evidence:'Justifique IAL necessário separadamente da força MFA (AAL).'},
 'Passkeys':{scenario:'Compare resistência a phishing de passkey vinculada à origem com OTP compartilhado por usuário.',evidence:'Explique challenge, par de chaves e por que o servidor não recebe chave privada.'},
 'PIM':{scenario:'Conta administrativa piloto precisa alterar apenas uma configuração durante janela aprovada.',evidence:'Estado antes/ativado/expirado com logs sanitizados e retirada efetiva.'}
};
const TOPIC_LEARNING={};
DATA.modules.forEach((module,m)=>module.slice(3).forEach((name,s)=>{
 const key=m+'-'+s,g=topicGuides[m][s],base=LESSONS[key],overlay=TOPIC_THEORY[name]||{},chapter=MODULE_DECISION_CONTEXT[m];
 const unique=(a,b)=>{
  if(!b||a.trim().toLowerCase()===b.trim().toLowerCase()||a.includes(b)||b.includes(a))return a.length>=b.length?a:b;
  return a+' '+b;
 };
 const source=g.url||base.reference,practice=TOPIC_PRACTICE[key]||[];
 const definition=overlay.definition||unique(g.concept,base.knowledge);
 const purpose=overlay.purpose||unique(g.importance,base.significance);
 const mechanism=overlay.mechanism||[
  base.context,
  (g.when!==base.context?'Contexto do serviço: '+g.when:''),
  'Conexão com IAM: '+chapter.focus
 ].filter(Boolean).join(' ');
 const contrast=overlay.extra||chapter.risk;
 const exercise=SPECIAL_CASES[name]||{
  scenario:MODULE_CASE_SCENES[m]+' Analise onde o conhecimento de "'+name+'" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.',
  evidence:'Registre uma explicação específica de "'+name+'", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: '+g.verify
 };
 TOPIC_LEARNING[key]={
  definition,purpose,mechanism,contrast,
  question:chapter.question, risk:base.mistake,technique:chapter.focus,
  checkpoint:base.acceptance,scenario:exercise.scenario,evidence:exercise.evidence,
  source,links:SOURCE_REFINEMENTS[name]||[],isPractical:practice.length>0
 };
}));
