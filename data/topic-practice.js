/* ROADMAP - IAM · conexão direta entre temas e tarefas existentes da AtlasCorp.
 * Cada tarefa aparece integralmente dentro da aula correspondente, nunca como link.
 * Os IDs do laboratório e índices de suas tarefas são mantidos para preservar o progresso.
 * O campo pode estar ausente: fundamentos como TCP/IP não exigem implementação em Entra.
 */
const TOPIC_TASK_NAMES={
 'lab-00':[
 'Tenant Entra ID','Usuários Entra ID','Grupos Entra ID',
 'Roles Entra ID','Segregação de funções (SoD)'],
 'lab-01':[
 'Joiner (admissão)','Usuários Entra ID','Grupos atribuídos e dinâmicos',
 'Revogação de sessões e resposta a incidente','Reconciliação e contas órfãs'],
 'lab-02':[
 'Conditional Access','MFA Entra ID','MFA Entra ID',
 'Conditional Access','Conditional Access',
 'Conditional Access report-only','Conditional Access report-only',
 'Conditional Access','Authentication strengths',
 'Authentication strengths','MFA Entra ID',
 'Identity Protection: riscos de usuário e entrada',
 'Identity Protection: riscos de usuário e entrada',
 'Identity Protection: riscos de usuário e entrada',
 'Identity Protection: riscos de usuário e entrada',
 'Sessões, cookies e revogação','Conditional Access',
 'Logs Entra ID'],
 'lab-03':[
 'RBAC','RBAC','RBAC','RBAC','RBAC'],
 'lab-04':[
 'App Registrations','Authorization Code com PKCE','ID Token',
 'Audience','Enterprise Applications'],
 'lab-05':[
 'B2B collaboration e usuários convidados','Cross-tenant access settings',
 'B2B collaboration e usuários convidados','Revisão de convidados inativos'],
 'lab-06':[
 'Enrollment MDM no Intune','Políticas de compliance',
 'Conditional Access com dispositivo conforme','Conditional Access com dispositivo conforme',
 'Desligamento e retire/wipe'],
 'lab-07':[
 'Tenant versus subscription versus management group',
 'Azure RBAC: principal, role e scope','Managed identities no Azure',
 'Azure RBAC: principal, role e scope','Azure Activity Log e auditoria RBAC'],
 'lab-08':[
 'SCIM Users','SCIM Users','PATCH','Provisionamento e desprovisionamento',
 'Reexecução idempotente e tratamento de falhas'],
 'lab-09':[
 'Access packages e catálogos','Access packages e catálogos',
 'Entitlement Management: políticas e expiração',
 'Access requests e aprovações','Access Reviews e recertificação'],
 'lab-10':[
 'Entra roles e escopos administrativos',
 'Privileged Identity Management (PIM)',
 'Privileged Identity Management (PIM)',
 'Privileged Identity Management (PIM)',
 'JIT, break-glass e revisão'],
 'lab-11':[
 'Classificação e inventário da informação',
 'Classificação e inventário da informação',
 'Sensitivity labels','Criptografia e direitos associados a rótulos',
 'Data Loss Prevention (DLP)'],
 'lab-12':[
 'Sign-in logs e tipos de entrada',
 'Falhas de Conditional Access',
 'Audit logs de identidade',
 'KQL: where, project e summarize',
 'Gestão de incidentes e mudanças'],
 'lab-13':[
 'AD DS','Usuários do AD','Kerberos',
 'Sincronização, identidade híbrida e conflitos',
 'Autenticação híbrida PHS, PTA e federação'],
 'lab-14':[
 'Workload identity federation e OIDC',
 'Workload identity federation e OIDC',
 'AWS STS e identidade federada',
 'Google Cloud Workload Identity Federation',
 'CIEM e revisão de privilégios multi-cloud'],
 'lab-15':[
 'Projeto IAM ponta a ponta','Projeto IAM ponta a ponta',
 'Projeto IAM ponta a ponta','Projeto IAM ponta a ponta',
 'Projeto IAM ponta a ponta','Projeto IAM ponta a ponta',
 'Projeto IAM ponta a ponta']
};
const TOPIC_KEYS_BY_NAME=new Map;
DATA.modules.forEach((module,mi)=>module.slice(3).forEach((topic,ti)=>{
 if(TOPIC_KEYS_BY_NAME.has(topic))throw Error('Tópico ambíguo: '+topic);
 TOPIC_KEYS_BY_NAME.set(topic,mi+'-'+ti);
}));
const TOPIC_PRACTICE={};
Object.entries(TOPIC_TASK_NAMES).forEach(([labId,names])=>{
 const chapter=COMPANY_CHAPTERS[labId];
 if(!chapter||chapter.tasks.length!==names.length)throw Error('Mapeamento incompleto: '+labId);
 names.forEach((topicName,taskIndex)=>{
  const key=TOPIC_KEYS_BY_NAME.get(topicName);
  if(!key)throw Error('Tópico não encontrado: '+topicName);
  (TOPIC_PRACTICE[key]??=[]).push({labId,taskIndex});
 });
});
/* Explicações específicas, sem inventar configuração para conceitos que só exigem
 * entendimento teórico. Quando ausentes, os guias curriculares existentes alimentam
 * os três blocos essenciais de leitura. */
const TOPIC_THEORY={
 'TCP/IP':{
 definition:'TCP/IP é a família de protocolos que permite a comunicação entre dispositivos e serviços em redes IP. O IP é responsável por endereçamento e encaminhamento dos pacotes; o TCP oferece um transporte orientado à conexão, com sequência, confirmação, retransmissão e controle de fluxo. Nem todo tráfego IP utiliza TCP: UDP também é comum.',
 purpose:'IAM depende de conectividade entre navegador, provedor de identidade, aplicações e APIs. Conhecer endereços IP, portas, TCP/UDP e rotas ajuda a separar falhas de rede de falhas de autenticação ou autorização.',
 mechanism:'Quando o usuário acessa uma aplicação cloud, o cliente resolve um destino, estabelece a conexão (por exemplo TCP na porta 443), negocia a segurança de transporte por TLS e só então envia requisições HTTP. O fato de a conexão funcionar não prova que a identidade foi autenticada nem que o recurso esteja autorizado.',
 extra:'Neste roadmap, TCP/IP é um conhecimento de base para diagnosticar aplicações cloud. Não é necessário instalar um servidor nem alterar políticas de rede da AtlasCorp para concluir este tema.'
 },
 'DNS':{
 definition:'DNS traduz nomes de domínio em registros utilizados pela infraestrutura, como A, AAAA, CNAME e SRV. Aplicações cloud dependem de resolução correta do domínio do IdP, de seus endpoints e dos sistemas integrados.',
 purpose:'Evita atribuir a MFA ou SSO uma falha que ocorreu antes da autenticação. Em AD híbrido, registros SRV têm importância adicional na descoberta de controladores de domínio.',
 mechanism:'O cliente consulta um resolvedor DNS, recebe os registros apropriados e usa os endereços retornados para iniciar a conexão. Resposta incorreta, cache desatualizado ou domínio não resolvido pode impedir a navegação, mesmo com credenciais e permissões corretas.',
 extra:'A análise de um erro DNS pode ser demonstrada no terminal, mas o tenant Entra não exige que você configure um DNS de laboratório só para estudar este fundamento.'
 },
 'HTTP e HTTPS':{
 definition:'HTTP define mensagens de requisição e resposta usadas por navegadores e APIs, com métodos como GET, POST e PATCH, cabeçalhos e códigos de status. HTTPS é HTTP transportado em uma conexão protegida por TLS.',
 purpose:'As integrações de IAM utilizam redirecionamentos, endpoints de autorização, APIs REST e respostas HTTP. Entender esses elementos facilita investigar falhas de login, chamadas Graph e provisionamento SCIM.',
 mechanism:'O cliente estabelece conexão TLS com o servidor, envia método, caminho, cabeçalhos e eventual corpo; o servidor responde com status e conteúdo. Um status 401 ou 403 pode refletir problemas diferentes e deve ser interpretado em contexto.',
 extra:'Como requisito básico de cloud IAM, não é necessário configurar um servidor IIS para validar a compreensão de HTTP/HTTPS.'
 },
 'TLS e certificados':{
 definition:'TLS estabelece um canal criptografado entre cliente e servidor, usando negociação de algoritmos e autenticação do endpoint normalmente baseada em certificados digitais. O certificado associa chave pública a uma identidade sob regras de confiança.',
 purpose:'Evita interceptação e alteração de mensagens em comunicações com IdPs, APIs e conectores, além de auxiliar no diagnóstico de cadeias, validade e nomes incorretos de certificados.',
 mechanism:'Antes de enviar dados de login, o cliente verifica a cadeia de confiança e se o certificado atende ao nome esperado e está válido. Erros de relógio, CA desconhecida ou nome incompatível interrompem ou tornam insegura a conexão.',
 extra:'A instalação de uma PKI própria não é requisito para prosseguir no laboratório cloud; ela pode ser estudada depois em integração híbrida.'
 },
 'Identidade digital':{
 definition:'Uma identidade digital é a representação de uma pessoa, serviço, dispositivo ou outra entidade no contexto de um domínio de confiança. Ela se relaciona a identificadores estáveis, atributos, contas e processos de gestão.',
 purpose:'IAM precisa responder quem é a entidade, de onde vêm seus atributos, quem é responsável por ela e quais decisões de acesso podem ser tomadas.',
 mechanism:'A fonte autoritativa registra uma entidade; um diretório ou IdP a representa em objetos e contas; grupos, roles e políticas associam direitos, e registros de auditoria documentam o ciclo de vida. Uma pessoa pode ter várias contas e uma conta não equivale à pessoa.'
 },
 'RBAC':{
 definition:'RBAC (Role-Based Access Control) é um modelo de autorização que organiza permissões em funções (roles) e atribui essas funções a sujeitos. A decisão depende da role, da operação e do recurso, podendo incluir escopo e regras adicionais.',
 purpose:'Permite conceder acesso conforme as responsabilidades do trabalho, com mínimo privilégio, revisão e segregação de funções. Por exemplo, um analista financeiro pode consultar relatórios sem receber a permissão de aprová-los ou modificar pagamentos.',
 mechanism:'Na AtlasCorp, grupos como SG-ATL-FIN-APP-READ organizam quem precisa de um direito de negócio. A aplicação pode expor uma app role Leitor e associá-la ao grupo; a API ainda deve validar o token e a autorização para cada ação/recurso. Já Entra ID → Roles and administrators delega tarefas administrativas do diretório, e Azure RBAC controla recursos Azure: são superfícies distintas, não equivalentes.',
 extra:'Exemplo AtlasCorp: Bruno → SG-ATL-FIN-APP-READ → app role Leitor → consulta permitida e alteração negada; Renata → grupo de Aprovadores → role de aprovação autorizada; Camila (TI) → sem acesso financeiro. Nenhuma dessas funções de negócio exige Global Administrator. O aplicativo precisa implementar a autorização para cada ação e recurso.'
 },
 'Modelagem de roles':{
 definition:'Modelar roles é definir conjuntos coerentes de ações e recursos necessários a uma atividade profissional, evitando conceder privilégios excessivos para tarefas comuns.',
 purpose:'Estabelece permissões auditáveis e reduz conflitos de interesse e aprovações arbitrárias. A role precisa de owner, justificativa, escopo e critérios de concessão/revogação.',
 mechanism:'Parta de tarefas de negócio, identifique ações permitidas, crie papéis separados (Leitor, Editor, Aprovador) e teste casos de permissão e negação. Não confunda um grupo organizacional com uma role efetivamente consumida por uma API.'
 },
 'Usuários Entra ID':{
 definition:'O Microsoft Entra ID representa identidades por objetos de usuário dentro do tenant. Usuários podem ser criados diretamente na nuvem, sincronizados de uma origem local ou convidados de outra organização, dependendo do cenário.',
 purpose:'Fornece contas autenticáveis, atributos de negócio e identidades de referência para atribuições e ciclo de vida.',
 mechanism:'Em um tenant de laboratório, crie contas fictícias em Entra ID → Users. Associe identificador e owner, aplique processo de Joiner e somente depois conceda grupos, app roles ou papéis administrativos quando justificados.'
 },
 'Grupos Entra ID':{
 definition:'Grupos do Microsoft Entra ID reúnem identidades para facilitar a atribuição de aplicativos, licenças e outros recursos, conforme o suporte específico de cada serviço.',
 purpose:'Reduz concessões individuais e facilita governança, recertificação e desligamento.',
 mechanism:'Em Entra ID → Groups, crie grupo de segurança, registre owner, escopo e membros. Para conceder acesso real a uma aplicação, também é necessário configurar a aplicação para utilizar aquele grupo, sua atribuição ou uma role correspondente. Criar o grupo isoladamente não entrega permissão de negócio.'
 },
 'Roles Entra ID':{
 definition:'Papéis administrativos do Microsoft Entra ID autorizam tarefas de gestão do diretório, como administrar grupos, usuários ou configurações de autenticação. Não representam automaticamente os cargos nem os direitos em aplicativos da empresa.',
 purpose:'Distribui responsabilidades administrativas por menor privilégio, permitindo delegar atividades sem usar Global Administrator para tarefas rotineiras.',
 mechanism:'Entra ID → Roles and administrators permite examinar papéis internos, permissões e atribuições. Compare Groups Administrator com um grupo funcional de Financeiro e com Azure Reader, que se aplica a recursos Azure, não ao diretório.'
 },
 'Enterprise Applications':{
 definition:'Uma enterprise application é a representação de uma aplicação/serviço integrado no tenant, geralmente associada a um service principal, com opções de SSO, atribuição de usuários/grupos e configurações próprias.',
 purpose:'Conecta a identidade corporativa ao aplicativo, permitindo controlar quem pode acessar e, se suportado, que função exercerá.',
 mechanism:'Em Entra ID → Enterprise applications → aplicativo → Users and groups, atribua identidades e app roles que a aplicação expõe. Teste tanto autenticação quanto autorização no serviço; o simples vínculo com um grupo não prova controle por ação ou por registro.'
 },
 'Conditional Access':{
 definition:'Conditional Access (CA) é o mecanismo de políticas do Entra que avalia atribuições, condições e controles de acesso, como exigir MFA ou dispositivo conforme para determinado usuário e aplicativo.',
 purpose:'Reduz risco em acessos a recursos ao aplicar requisitos proporcionais ao contexto. Requer licença elegível e planejamento para não bloquear usuários e contas emergenciais.',
 mechanism:'Defina quem está no escopo, que recurso será acessado e que controle é exigido. Comece com grupo piloto e Report-only, confirme avaliação nos Sign-in logs e somente depois habilite a política para esse grupo. Authentication methods define quais métodos podem ser registrados; CA determina em que contexto devem ser usados.'
 },
 'MFA Entra ID':{
 definition:'Autenticação multifator combina categorias independentes de fatores para reduzir dependência de uma única credencial. Métodos de MFA diferem em garantia e resistência a phishing.',
 purpose:'Protege identidades contra comprometimento de senha, particularmente em acessos privilegiados e de alto risco.',
 mechanism:'Habilite métodos apropriados para grupo piloto, registre-os no perfil de segurança do usuário e aplique requisitos por Conditional Access no aplicativo de teste. Compare métodos resistentes a phishing com aqueles vulneráveis a proxy adversário.'
 },
 'Authentication strengths':{
 definition:'Authentication strengths são políticas de Conditional Access que definem conjuntos de combinações de autenticação aceitáveis para acessar recursos.',
 purpose:'Permitem exigir mecanismos mais fortes, como autenticação resistente a phishing, em operações administrativas ou dados críticos.',
 mechanism:'Crie escopo piloto, verifique métodos já registrados e selecione a strength na opção Grant da política CA. Teste método atendido e não atendido; preservar conta de emergência e Report-only reduz risco de bloqueio.'
 },
 'SCIM Users':{
 definition:'SCIM padroniza uma API HTTP para gerenciar identidades entre sistemas, com recursos como /Users, atributos normalizados e operações de criação e atualização.',
 purpose:'Automatiza Joiner, Mover e Leaver em aplicações que suportam SCIM, com correlação consistente e tratamento de falhas.',
 mechanism:'Mapeie employeeId ou externalId a uma identidade persistente; envie recursos sintéticos a /Users em um servidor de teste, leia o identificador retornado e valide alterações e desativação sem gerar duplicidades.'
 },
 'Azure RBAC: principal, role e scope':{
 definition:'Azure RBAC controla quem pode realizar quais operações sobre recursos Azure. Uma atribuição conecta principal, role e escopo, como recurso, resource group, assinatura ou management group.',
 purpose:'Aplicar menor privilégio a identidades humanas e de workloads na gestão e no acesso a recursos Azure.',
 mechanism:'No recurso apropriado, abra Access control (IAM) → Add role assignment, escolha a role de dados/gestão mínima e o principal correto. Reader é papel de plano de gerenciamento e não concede automaticamente acesso aos dados de todo recurso.'
 },
 'Políticas de compliance':{
 definition:'Políticas de compliance do Intune avaliam requisitos de postura em dispositivos gerenciados, gerando sinal que pode ser consumido por Conditional Access.',
 purpose:'Restringir operações sensíveis conforme conformidade do dispositivo, além da identidade e da autenticação do usuário.',
 mechanism:'Crie e atribua política apenas ao dispositivo/grupo piloto no Intune; aguarde sincronização e observe o resultado. Em seguida, no Entra CA, use Require device to be marked as compliant para aplicativo piloto, analisando Sign-in logs.'
 }
};
