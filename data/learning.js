/* IAM Atlas · Revisão pedagógica 2026-10-16
   O conteúdo legado permanece compatível com os dados em localStorage.
   Fontes são pontos de partida oficiais; consultar versão vigente antes de implantar. */
addModule('Acesso adaptativo','Acesso adaptativo, Global Secure Access e proteção de sessões',
 'Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos.',
 'https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access',
 'Entra ID, Global Secure Access, aplicativos de teste e políticas de CA',
 'Recursos Entra Private Access / Internet Access podem exigir Entra Suite ou licenças próprias; não testar em produção',[
 ['Application Proxy para aplicações locais','O proxy de aplicações publica determinados aplicativos internos por um serviço de acesso remoto, com controles e dependências de conectores.','Desenhe aplicação interna e conector isolado | Escolha pré-autenticação e quem pode acessar | Modele falha de conector e procedimento de recuperação','Desenho do fluxo cliente -> serviço -> conector -> aplicação e teste de usuário não atribuído.','https://learn.microsoft.com/en-us/entra/identity/app-proxy/what-is-application-proxy'],
 ['Continuous Access Evaluation (CAE)','CAE permite que serviços compatíveis reajam mais rapidamente a determinados eventos e mudanças de política; o comportamento depende da implementação.','Identifique um evento crítico compatível | Compare tokens válidos com revogação de sessão | Modele latência e limites de propagação','Linha temporal com evento, alteração de decisão e limitações reais.','https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation'],
 ['Authentication context','Authentication context permite associar exigências adicionais de acesso condicional a operações ou recursos específicos em aplicações compatíveis.','Defina operação de leitura geral e aprovação sensível | Vincule contexto de autenticação a ação sensível em arquitetura fictícia | Verifique a decisão de step-up','Mapa recurso-contexto-política com duas decisões e requisitos de integração.','https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-authentication-context'],
 ['Protected actions','Operações administrativas protegidas podem exigir critérios adicionais por Conditional Access; não equivalem a proteger toda ação de API.','Identifique alteração administrativa sensível | Modele contexto de autenticação para ação protegida | Teste em tenant elegível ou descreva comportamento de rejeição','Matriz de operações protegidas, permissões e autenticação exigida.','https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/protected-actions-overview'],
 ['Global Secure Access: arquitetura','Global Secure Access integra identidade e acesso de rede; Entra Private Access e Internet Access não substituem as funções de um IdP.','Identifique usuários, dispositivos, app privado e tráfego internet | Desenhe política de tráfego e controle de acesso | Documente dependências e licenças','Diagrama distinguindo autenticação de tráfego, roteamento e autorização de aplicação.','https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access'],
 ['Entra Private Access','Private Access oferece acesso orientado a identidade a aplicações privadas sob políticas e conectividade configurada.','Escolha aplicação fictícia interna | Modele conector e segmentação de destinos | Compare usuário atribuído e não atribuído','Diagrama de políticas e condição de rede com decisão permitida/negada.','https://learn.microsoft.com/en-us/entra/global-secure-access/concept-private-access'],
 ['Entra Internet Access','Internet Access aplica políticas de acesso a tráfego para destinos suportados, com distinção de proteção web e autorização da aplicação.','Identifique categorias de destino fictícias | Modele política para grupo de teste | Analise efeito em conexão e exceção de rede','Tabela política-destino-grupo com análise de bloqueio e rollback.','https://learn.microsoft.com/en-us/entra/global-secure-access/concept-internet-access'],
 ['Perfis de tráfego e cliente Global Secure Access','Clientes, perfis e encaminhamento determinam que tráfego passa pelos controles Global Secure Access.','Desenhe perfil para tráfego Microsoft 365 | Identifique configuração de cliente em dispositivo de teste | Modele conectividade perdida e retirada segura do perfil','Checklist de rota, usuário, dispositivo, logs e restauração de conexão.','https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client']
]);
LEARNING_ORDER.splice(LEARNING_ORDER.indexOf(20)+1,0,28);
LEARNING_PHASE[28]='03 · Plataformas e automação';
MODULE_CONTEXT.push(['Acesso adaptativo','Acesso à rede e validação de sessão são camadas adicionais; não equivalem à autorização em uma API.','Global Secure Access, proxies e gateways podem complementar sistemas IdP e enforcement local.']);
LABS.find(l=>l.id==='lab-02').modules.push(28);
LABS.find(l=>l.id==='lab-06').modules.push(28);
LAB_FOR_MODULE[28]=['lab-02','lab-06'];
CERT_SKILLS.sc300.push(28);
const MODULE_EDUCATION = [
 ['DNS, rede e TLS','Examine o fluxo requisição -> DNS -> conexão -> TLS -> serviço; confirme o relógio e a cadeia de confiança antes de diagnosticar IAM.','Um login pode falhar sem sequer alcançar o IdP.','Construa evidências repetíveis com comandos e saída esperada.'],
 ['Identidade versus conta','Separe pessoa, identidade, conta, credencial, direito e evidência; JML é um processo de negócio, não apenas um script.','Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.','Use IDs estáveis e rastreie origem, dono, objetivo e revogação.'],
 ['Domínio e Kerberos','Explique domínios, trust, KDC, TGT/TGS, tickets de serviço e dependência de tempo/DNS.','Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.','Capture eventos e tickets somente no laboratório autorizado.'],
 ['LDAP e integração híbrida','Diferencie protocolo LDAP, diretório, identidade sincronizada, PHS, PTA e federação.','LDAPS não substitui controles de bind e autorização do objeto consultado.','Confira escopo da consulta e não exponha atributos desnecessários.'],
 ['Modelos de autorização','Compare permissões efetivas, herança, deny, role, atributo e relação; aplique autorização em cada endpoint.','Remover um botão não protege a operação no servidor.','Teste usuário não autorizado e acesso a recurso de outra equipe.'],
 ['Métodos de autenticação','Compare fatores, resistência a phishing, vinculação de sessão, recuperação e canais de registro.','MFA baseado em código e push não significa resistência a phishing.','Utilize grupo piloto, Report-only e procedimentos de recuperação.'],
 ['Federação SAML','Localize emissor, destinatário, assertion, assinatura, certificado, audiência e tempo.','Um assertion válido para outra aplicação não deve ser aceito.','Compare logs do IdP e do SP com correlation ID e relógios corretos.'],
 ['OAuth, OIDC e tokens','Distinga ID token, access token, refresh token, consent, client type e PKCE.','Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.','Valide issuer, audience, assinatura, validade, state e nonce no componente apropriado.'],
 ['IdP de laboratório','Pratique usuários, grupos, autenticação, clients, protocolos e logs em ambiente isolado.','O IdP emite tokens; a aplicação ainda impõe suas decisões de autorização.','Não exponha interface administrativa nem credenciais do laboratório.'],
 ['Administração Entra','Separe tenant, roles Entra, enterprise apps, app registrations, grupos e APIs.','Azure RBAC e papéis administrativos Entra não são equivalentes.','Verifique privilégios e licenças antes de cada alteração.'],
 ['Autorização cloud','Compare permission policy e trust policy, assunção de role, escopo e tokens temporários.','Uma role confiável para uma identidade não significa autorização irrestrita.','Faça teste permitido, negado e de expiração.'],
 ['SCIM e integração','Separe contrato de atributos, matching, idempotência, desativação e retries.','Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.','Teste criação duplicada, falha parcial e remoção.'],
 ['Governança de direitos','Trabalhe catálogo, ownership, solicitação, aprovação, recertificação, segregação e expiração.','Marcar acesso revisado sem aplicar remoção é evidência incompleta.','Exija dono, justificativa, prazo e rastro da decisão.'],
 ['Privilégio e cofre','Distinga cofre/segredo, sessão privilegiada, PIM e JIT; acompanhe ativação e expiração.','Vault dev é inadequado para segredos reais ou produção.','Teste recuperação emergencial sem contas reais.'],
 ['Operação','Siga hipótese, coleta, correlação, diagnóstico, correção e revalidação.','Erros similares de login podem ter causas de políticas, redes e aplicações distintas.','Redija runbook de rollback e mantenha logs sanitizados.'],
 ['Arquitetura IAM','Separe decisor de política, executor, IdP, diretório, aplicação e auditoria.','Zero Trust não é um produto nem implica desabilitar controles locais.','Construa diagrama com fronteiras de confiança, riscos e recuperação.'],
 ['Garantias de identidade','Distinga IAL (prova), AAL (autenticador) e FAL (federação); avalie o contexto de risco.','Níveis não são simplesmente degraus de uma mesma escala.','Justifique escolha de prova de identidade e recuperação.'],
 ['Administração Entra avançada','Conheça objetos do tenant, administrative units, licenças, atributos, delegação e Graph.','Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.','Verifique permissions e consentimentos em contexto delegado versus aplicação.'],
 ['Políticas e risco','Associe usuário, app, dispositivo, sinal de risco e controles com escopo e exceções explícitas.','Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.','Valide sign-in logs, risco, conta emergencial e rollback.'],
 ['Identidades externas','Distinga convidados, colaboração B2B, direct connect, sincronização entre tenants e clientes externos.','Convidado não é membro administrativo nem identidade de cliente em todos os cenários.','Controle sponsor, expiração, aprovação e remoção.'],
 ['Dispositivos gerenciados','Compare registered/joined/hybrid joined, enrollment, compliance e MAM.','Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.','Teste dispositivo piloto com e sem conformidade; não faça wipe em dispositivo pessoal.'],
 ['Azure RBAC','Aprenda management group, subscription, resource group, role assignment, escopo e herança.','NotActions não constitui explicit deny global; outras concessões continuam possíveis.','Calcule permissões efetivas antes/depois de revogar role.'],
 ['Identidade de workloads','Diferencie principal, identidade gerenciada, segredo, credenciais temporárias e federação OIDC.','Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.','Teste trust pelo subject e mínimo privilégio de cada serviço.'],
 ['IGA em Entra','Associe catálogo e access package a owner, período, aprovação, revisão e ciclo de vida.','P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.','Documente aplicação da remoção, não só a decisão de revisão.'],
 ['Purview e dados','Classifique informação, atribua Sensitivity Labels e avalie DLP e proteção criptográfica.','Classificação e DLP não equivalem a IAM de usuário.','Teste acesso permitido e negado a documento sintético.'],
 ['Observabilidade','Separe SigninLogs, AuditLogs e provisioning logs; consulte tipos e schemas corretos no workspace.','Ausência de evento não prova ausência da ação; retenção e ingestão variam.','Produza timeline, query, hipótese e validação pós-correção.'],
 ['Multi-cloud','Compare identidades, trust, permissão efetiva, herança, federação e revisões em AWS, GCP e SaaS.','Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.','Use matriz comparativa e não invente correspondência técnica exata.'],
 ['Policy-as-code','Distinga autenticação, decisão e enforcement; políticas testáveis precisam negar condições não satisfeitas.','Um erro de PDP não deve liberar automaticamente acesso não autorizado.','Execute testes positivos e negativos e mantenha mudanças versionadas.'],
 ['Global Secure Access','Separe segurança de tráfego, acesso a aplicações privadas, identidade, CA e autorização de recursos.','Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.','Desenhe fluxo de rede e teste falhas de conector e política.']
];
const TOPIC_CLARIFICATIONS = {
 'Identidade digital':'Identidade não é uma conta específica: a organização deve manter correlação com a pessoa, entidade legal ou workload representado.',
 'Contas':'Conta é representação operacional em um sistema; uma pessoa pode ter várias contas e direitos distintos.',
 'Credenciais':'Segredos, certificados e chaves têm ciclos próprios de emissão, armazenamento, validade, recuperação e revogação.',
 'Atributos de identidade':'Atributos confiáveis dependem de fonte autoritativa, finalidade, atualização e política de propagação.',
 'Autenticação, autorização e auditoria (AAA)':'Autenticação valida credenciais, autorização decide ações e auditoria registra decisões e eventos; uma etapa não substitui a outra.',
 'Menor privilégio':'Permissões devem atender à tarefa necessária, por recurso e prazo, e ser reduzidas se não utilizadas.',
 'Zero Trust':'Zero Trust exige verificação explícita, menor privilégio e pressuposto de comprometimento; não se resume a MFA.',
 'Segregação de funções (SoD)':'SoD previne concentração de atividades conflitantes, como criar e aprovar uma mesma transação.',
 'AD DS':'AD DS oferece diretório e autenticação em domínios Windows, não é o mesmo serviço que Entra ID cloud.',
 'Kerberos':'Ticket Kerberos prova autenticação para serviço, mas o serviço ainda deve verificar sua autorização.',
 'LDAP bind':'Bind autentica uma sessão LDAP; permissões de consulta e modificação são avaliadas separadamente.',
 'LDAPS':'LDAPS protege transporte por TLS; não torna bind nem ACL inerentemente seguros.',
 'RBAC':'Role define permissões sobre ações e recursos, sujeita ao escopo e regras de avaliação do sistema.',
 'ABAC':'ABAC decide usando atributos de sujeito, recurso, ação e contexto com fontes confiáveis.',
 'ACL':'ACL relaciona sujeito e permissões por objeto; avalie herança e prioridades de negação.',
 'TOTP':'TOTP é segundo fator baseado em segredo compartilhado, mas não oferece resistência completa a phishing em tempo real.',
 'Passkeys':'Passkeys implementam autenticação com chaves públicas e vinculação à origem em WebAuthn/FIDO2.',
 'FIDO2 e WebAuthn':'WebAuthn permite operações criptográficas por autenticadores; verifique origem, desafio e registro seguro.',
 'SSO':'SSO pode reduzir logins repetidos, mas não remove a obrigação de autorização individual em aplicações.',
 'Assertions SAML':'Assertion contém declarações assinadas ou protegidas; validar destinatário e prazo importa tanto quanto assinar.',
 'Authorization Code com PKCE':'PKCE protege a troca do authorization code; state e validação de redirect continuam necessários.',
 'Scopes':'Scopes OAuth não descrevem automaticamente o direito a cada objeto individual de uma API.',
 'Claims':'Claims são afirmações sobre sujeito e contexto, devem ser verificadas quanto a emissor, público e validade.',
 'Consentimento OAuth':'Consentimento deve ser limitado às permissões necessárias e governado especialmente em aplicativos terceiros.',
 'ID Token':'ID token autentica o usuário para o cliente OIDC e não deve ser aceito como access token por API.',
 'Access Token':'Access token autoriza chamada a recurso designado; formato não é necessariamente JWT.',
 'JWT':'JWT é formato de claims potencialmente assinado e/ou criptografado; não é um protocolo de login.',
 'Issuer':'Issuer identifica emissor e precisa ser comparado com a fonte esperada, não apenas extraído do token.',
 'Audience':'Audience vincula token ao destinatário autorizado; token válido para outro recurso deve ser rejeitado.',
 'State':'State ajuda defender contra CSRF e associa resposta OAuth à requisição iniciada pelo cliente.',
 'Nonce':'Nonce associa ID token à requisição de autenticação para mitigar replay em OIDC.',
 'Tenant Entra ID':'Tenant é limite de diretório da organização; não equivale a subscription Azure.',
 'Conditional Access':'Conditional Access combina atribuições, condições e controles; primeiro teste em report-only e proteja acesso emergencial.',
 'MFA Entra ID':'Diferencie MFA, authentication strength, experiência de registro e política; métodos não são igualmente resistentes a phishing.',
 'AWS IAM policies, roles e STS':'Trust policy controla quem assume role; permission policy controla as ações permitidas depois da assunção.',
 'Service principals e managed identities':'Service principal representa aplicação/workload; managed identity gerencia credenciais em Azure de forma integrada.',
 'SCIM Users':'SCIM sincroniza contas por API padronizada; active=false não deve ser confundido com exclusão definitiva.',
 'SCIM Groups':'Grupos SCIM sincronizam associações; a autorização final ainda depende do aplicativo de destino.',
 'PATCH':'PATCH SCIM permite atualizar atributos e operações específicas segundo RFC 7644, com idempotência analisada.',
 'Reexecução idempotente e tratamento de falhas':'Retry precisa evitar criar contas duplicadas ou reativar indevidamente identidades desativadas.',
 'Access requests e aprovações':'Aprovação deve ser feita pelo owner autorizado; aprovação não elimina necessidade de expiração e revisão.',
 'Recertificação e evidências':'A decisão de revisão e a implementação da retirada de acesso são eventos separados e devem ser confirmados.',
 'JIT, break-glass e revisão':'JIT fornece privilégio temporário; break-glass é recuperação excepcional monitorada, não um atalho operacional.',
 'NotActions e permissões efetivas':'Em Azure, NotActions não é explicit deny e não revoga permissões concedidas por outras role assignments.',
 'Administrative Units':'Unidade administrativa delimita administração suportada sobre objetos; não bloqueia toda visibilidade de membros fora do escopo.',
 'Identity proofing e IAL':'IAL mede garantia de comprovação da identidade e não a força do login por si só.',
 'Authenticator assurance e AAL':'AAL mede força do mecanismo de autenticação, diferente de identity proofing e federação.',
 'Federation assurance e FAL':'FAL aborda garantias de federação, com regras de confiança e proteção de assertions.',
 'Conditional Access report-only':'Report-only registra avaliação prevista sem bloquear; confirme essa diferença ao analisar logs.',
 'Authentication strengths':'Authentication strength define métodos de autenticação aceitos para controlar recursos protegidos.',
 'Device registration versus Microsoft Entra Join':'Registro e ingresso no domínio cloud apresentam propriedades e gerenciamento diferentes; Hybrid Join combina AD e Entra.',
 'Políticas de compliance':'Conformidade Intune é sinal de estado do dispositivo; não é autenticação, nem garante segurança absoluta.',
 'Conditional Access com dispositivo conforme':'Política de CA no Entra usa resultado de compliance do Intune como condição e requisito de acesso.',
 'Azure Policy versus Azure RBAC':'Azure Policy avalia regras de configuração e conformidade, enquanto Azure RBAC decide permissão do principal.',
 'Workload identity federation e OIDC':'Trust deve restringir issuer, subject e audience; federação minimiza segredos estáticos quando bem implementada.',
 'Access packages e catálogos':'Catálogo organiza recursos; access package define conjunto e condições para concessão governada.',
 'Access Reviews e recertificação':'Revisão pode indicar remoção, mas acesso só muda quando a decisão é aplicada de acordo com política.',
 'Microsoft Purview e controle de acesso a dados':'Rótulos e políticas de dados complementam a identidade; não substituem autorização do aplicativo.'
};
const LESSONS={};
DATA.modules.forEach((m,i)=>m.slice(3).forEach((name,j)=>{
 const guide=topicGuides[i][j],practice=practicalGuides[name]||{},meta=MODULE_EDUCATION[i]||MODULE_EDUCATION[0];
 const index=i+'-'+j,steps=practice.steps||guide.practice.split('\n').filter(Boolean);
 const concept=TOPIC_CLARIFICATIONS[name]||guide.concept;
 const prerequisites=i===0?['Acesso a computador próprio ou VM de laboratório.','Comandos básicos de terminal e ambiente isolado.']:
   ['Conheça os termos do módulo: '+meta[0]+'.','Use identidades, dados e recursos de laboratório, nunca produção.'];
 const tests=[
   'Resultado positivo: execute a etapa "'+(steps[0]||name)+'" e guarde saída ou diagrama verificável.',
   'Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.',
   'Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.'
 ];
 const quality={knowledge:concept,significance:guide.importance,context:guide.when,
                   distinct:meta[1],mistake:meta[2],discipline:meta[3],
                   requirements:prerequisites,tests,steps,acceptance:guide.verify,
                   reference:practice.source||guide.url};
 LESSONS[index]=quality;
}));

/* Laboratórios guiados: ambientes descartáveis, pré-checagens, execução, teste adverso e limpeza. */
const LAB_DEEP={
 'lab-00':{
 duration:'60–120 minutos',prereq:['Conta de administrador apenas do tenant de laboratório; jamais de empresa real.','Identifique licenças disponíveis e anote o orçamento máximo, mesmo que zero.'],
 steps:['Desenhe a AtlasCorp com RH, Financeiro, TI, 3 pessoas fictícias e 3 grupos funcionais.','Acesse entra.microsoft.com em tenant de laboratório e localize Entra ID > Overview para registrar apenas tenant ID parcialmente mascarado.','Verifique as licenças disponíveis em Billing/Licenses ou na visão equivalente, sem iniciar compras.','Crie três usuários fictícios no diretório e defina atribuições mínimas; não utilize nomes reais.','Crie grupos GRP-RH, GRP-FIN e GRP-TI e adicione cada usuário ao grupo correspondente.','Crie uma matriz com usuário, ID mascarado, departamento, função e grupos.','Use uma conta administrativa separada; defina como recuperar acesso se a conta de teste ficar bloqueada.','Faça logout e valide que cada usuário de teste existe e possui os grupos pretendidos.','Retire qualquer função elevada adicionada apenas para testar e registre a limpeza.'],
 expected:'Três usuários e três grupos registrados, associação consistente com o organograma e plano de recuperação/limpeza.',
 failure:'Se não conseguir criar usuário: revise tenant selecionado, permissão administrativa e limites/licenças; não eleve privilégio em tenant alheio.',
 cleanup:'Excluir apenas objetos fictícios do laboratório quando terminar o percurso; preserve contas que serão reutilizadas nos laboratórios seguintes.'
 },
 'lab-01':{
 duration:'90–150 minutos',prereq:['Lab-00 concluído ou ambiente equivalente.','Planilha fictícia de RH com employeeId estável e cargo.'],
 steps:['Crie CSV sintético employeeId,displayName,department,manager,status sem CPF nem dados reais.','Escolha employeeId como chave de correlação e UPN como identificador de login; documente diferenças.','Simule evento Joiner de uma nova pessoa na planilha.','Crie a conta no Entra e atribua o grupo mínimo de acordo com seu departamento.','Registre grupos e acesso a uma aplicação fictícia antes de qualquer alteração.','Altere o departamento de RH para Financeiro e remova o grupo RH, sem acumular ambos por padrão.','Adicione somente grupos necessários a Financeiro e valide acesso autorizado versus recurso de RH negado.','Simule Leaver, bloqueie login de teste e documente revogação de sessões e permissões; observe que revogação pode não ser imediata em todos os serviços.','Compare relação de empregados ativos com contas no diretório e gere relatório de órfãos.','Faça auditoria de eventos e restaure somente as contas necessárias para os labs seguintes.'],
 expected:'Matriz JML com acesso concedido, transferido e removido e nenhuma conta ativa sem dono.',
 failure:'Se grupos não refletirem mudança, cheque sincronização/escopo/fonte autoritativa e atraso de propagação; não crie um segundo usuário para contornar o erro.',
 cleanup:'Revogar acessos de desligados fictícios; conservar conta neutra para reutilização apenas se necessário.'
 },
 'lab-02':{
 duration:'90–180 minutos',prereq:['Lab-00 e conta de teste sem privilégios administrativos.','Conditional Access somente com licenciamento elegível; acesso de emergência testado.'],
 steps:['No Entra, abra Protection > Authentication methods e identifique métodos disponíveis, sem alterar política global.','Associe um método elegível à conta piloto e conclua registro pelo próprio usuário.','Teste login válido e registre hora, aplicativo, método e resultado nos sign-in logs.','Provoque uma senha inválida com poucas tentativas no usuário fictício; evite travar contas reais.','Se houver Entra P1, crie grupo GRP-LAB-CA e inclua exclusivamente a conta piloto.','Crie política Conditional Access de MFA sobre aplicativo de teste em modo Report-only, com contas emergenciais excluídas.','Efetue novo login piloto e observe resultado report-only; anote se a avaliação exigiria MFA.','Valide se haveria impacto em contas de serviço, convidados ou administradores fora do piloto.','Ative somente se o teste estiver correto e existir método de recuperação; repita teste esperado e bloqueio controlado.','Desative/remova a política piloto e compare novamente sign-in logs; registre limitações de licença.'],
 expected:'Comparação de métodos MFA e logs com decisão real versus report-only, sem bloquear contas de emergência.',
 failure:'Se não aparecer Conditional Access, primeiro confirme Entra P1; se método não for elegível, confirme Authentication methods policy e grupos.',
 cleanup:'Desligar política piloto e remover grupo teste; manter apenas os métodos de autenticação planejados para o tenant de laboratório.'
 },
 'lab-03':{
 duration:'100–180 minutos',prereq:['Entendimento de RBAC versus autenticação.','App de API fictícia ou simulador com GET e PATCH.'],
 steps:['Defina uma API fictícia /documents/{id} com duas operações: GET e PATCH.','Escreva matriz Leitor:GET, Editor:GET+PATCH, OutroProjeto:nenhum acesso a documentos alheios.','Implemente ou configure validação de role e owner no backend; esconder botões da UI não conta.','Autentique como Leitor e faça GET do documento permitido; registre status HTTP e ID do recurso sintético.','Como Leitor, tente PATCH; confirme 403 em ambiente configurado corretamente.','Como Editor, faça PATCH do documento autorizado e confirme sucesso.','Como Editor, tente acessar documento de outro projeto para testar autorização em nível de objeto.','Compare o modelo de app roles com uma função administrativa Entra e Azure RBAC em exemplos separados.','Remova a role temporária e repita GET/PATCH para verificar mudança efetiva de acesso.','Escreva testes automatizados para negação sem role e objeto de outro projeto.'],
 expected:'Matriz de papéis e resultados 200/403 coerentes, inclusive validação de ownership no servidor.',
 failure:'Se acesso negado funcionar apenas na UI, a API está vulnerável; verifique middleware e validação em cada endpoint.',
 cleanup:'Apagar dados de documentos sintéticos e remover roles temporárias.'
 },
 'lab-04':{
 duration:'120–210 minutos',prereq:['Conceitos de HTTP, cookies, TLS, OIDC e credenciais de app.','IdP Keycloak local ou Entra e cliente de exemplo autorizado.'],
 steps:['Crie realm/tenant de teste, usuário fictício e client OIDC com redirect URI exata.','Configure fluxo Authorization Code com PKCE no cliente público e gere valores state e nonce.','Inicie autenticação e anote URLs de autorização, autorização do usuário e callback sem copiar secrets.','Troque code por tokens e identifique audience, issuer, exp, nonce e escopos de dados de teste.','Registre em tabela separada finalidade do ID token e do access token.','Acesse endpoint de API com access token destinado a ele; valide público e escopos.','Altere somente em ambiente de teste a redirect URI para valor não registrado; observe rejeição do IdP.','Simule audience indevida no token e demonstre rejeição pela API de teste.','Se praticar SAML, exporte metadados e verifique assinatura, ACS, entityID e validade das assertions.','Restaure URI correta e finalize sessão, apagando tokens salvos em ferramentas locais.'],
 expected:'Duas integrações documentadas com validações de segurança e casos de falha intencionais.',
 failure:'Erros comuns: mismatch de redirect URI, issuer/audience, relógio e ausência de PKCE; compare mensagens dos dois lados.',
 cleanup:'Revogar secrets temporários, excluir client de teste não reutilizado e limpar histórico com credenciais.'
 },
 'lab-05':{
 duration:'75–150 minutos',prereq:['Identidade externa diferente de usuário interno.','Tenant de colaboração sob seu controle ou simulação de políticas.'],
 steps:['Defina cenário de parceiro externo com período de acesso de 30 dias e sponsor do Financeiro.','Especifique qual recurso será compartilhado e quais grupos concedem acesso.','Separe conceitos B2B collaboration, B2B direct connect e contas de cliente.','Revise cross-tenant settings inbound/outbound antes de qualquer convite.','Em ambiente elegível, convide usuário externo de teste e atribua somente grupo/aplicativo necessários.','Confira tipo de usuário, estado de resgate do convite e atribuição ao recurso.','Teste conta convidada autorizada e tentativa de acesso fora de escopo.','Defina prazo, notificações e revisão periódica do sponsor/owner.','Remova grupo e acesso do convidado, valide efeito real da remoção.','Documente etapas e diferença entre apagar convidado e revogar entitlement.'],
 expected:'Acesso externo temporário com owner, escopo e revogação auditáveis.',
 failure:'Se convite aceito mas app nega acesso, verifique atribuição, CA aplicável a convidados e políticas de colaboração.',
 cleanup:'Remover convidados/grupos de teste e convites pendentes desnecessários.'
 },
 'lab-06':{
 duration:'120–240 minutos',prereq:['Windows/dispositivo descartável autorizado e licença Intune + Entra P1 apropriada.','Contas de emergência excluídas de Conditional Access.'],
 steps:['Verifique licença atribuída ao usuário piloto e requisitos de inscrição de dispositivo no Intune.','No Entra, identifique se o dispositivo é registered, joined ou hybrid joined; documente diferenças.','Faça enrollment no Intune somente do dispositivo reservado ao laboratório.','Crie política de conformidade para grupo/dispositivo piloto com requisito verificável e reversível.','Force sincronização permitida e observe o estado de compliance e seu horário de atualização.','No Entra, crie CA Report-only exigindo compliant device para aplicativo de teste e grupo piloto.','Faça login em dispositivo conforme e avalie a aba Conditional Access dos sign-in logs.','Simule estado não conforme alterando um requisito seguro e reversível em equipamento de teste.','Compare decisão esperada e executada; preserve evidência dos dois casos.','Desabilite política piloto, restaure requisito do dispositivo e confirme acesso normal.','Desinscreva dispositivo se ele não for necessário para o resto da formação.'],
 expected:'Sinal de Intune compliance consumido pela política do Entra, com log por cenário e plano de reversão.',
 failure:'Se CA não recebe estado, cheque inscrição MDM, grupo atribuído, última sync, licença e plataforma suportada.',
 cleanup:'Remover políticas de teste e enrollment temporário; nunca aplicar retire/wipe em dispositivo pessoal.'
 },
 'lab-07':{
 duration:'90–180 minutos',prereq:['Assinatura Azure autorizada com orçamento configurado.','Permissão mínima para criar uma identidade gerenciada e recurso descartável.'],
 steps:['Crie resource group LAB-IAM e configure alertas/orçamento na assinatura de teste.','Defina recurso a ser acessado por uma workload e a operação de leitura necessária.','Crie managed identity apropriada (system-assigned no serviço ou user-assigned) e registre principal ID mascarado.','Crie recurso de teste de baixo custo ou utilize simulação se não houver assinatura.','Atribua papel mínimo à identidade no escopo do recurso, não na assinatura inteira.','Solicite token via mecanismo suportado pela workload, sem secret dentro do script.','Execute operação permitida e observe log do principal e escopo.','Tente operação de gravação sem privilégio e confirme rejeição.','Inspecione Azure Activity Log para operações de role assignment (sujeito à disponibilidade).','Remova role assignment, identidade e recursos criados; confira se o resource group ficou vazio.'],
 expected:'Acesso por workload sem credencial estática, com papel de leitura e operação de escrita negada.',
 failure:'AccessDenied: cheque audience do token, principal correto, escopo da role e propagação da atribuição.',
 cleanup:'Eliminar resource group e recursos faturáveis, com comprovante de exclusão.'
 },
 'lab-08':{
 duration:'90–150 minutos',prereq:['Ambiente local para API SCIM 2.0 com dados sintéticos.','Conhecimento de JSON e HTTP.'],
 steps:['Levante um servidor SCIM de laboratório ou mock que siga esquema básico RFC 7643.','Prepare payload de /Users com userName único, externalId e active=true.','Faça POST /Users e anote status, ID gerado e Location sem dados pessoais.','Faça GET /Users/{id} e confira mapeamento entre identificadores de origem e destino.','Execute PATCH para alterar department e confirme resposta com atributo atualizado.','Execute PATCH ou operação suportada que defina active=false e tente autenticação fictícia.','Simule timeout após sucesso do servidor e repita sem criar segunda conta.','Teste tentativa de POST com identificador duplicado e defina política de matching.','Implemente ou descreva paginação e tratamento de HTTP 429/5xx com backoff.','Finalize removendo usuários de teste e escreva contrato de atributos, erros e evidências.'],
 expected:'SCIM /Users consistente, idempotente e auditável em cenários de criação, alteração e desligamento.',
 failure:'Se usuários duplicam após timeout, revisar correlação por externalId e leitura prévia antes de retry.',
 cleanup:'Apagar fixtures e tokens da API; não usar credenciais de aplicação de produção.'
 },
 'lab-09':{
 duration:'100–180 minutos',prereq:['Inventário de cinco direitos de acesso e owners.','Licença Entra ID Governance/P2 conforme funcionalidade ou simulação auditável.'],
 steps:['Defina catálogo Financeiro com entitlements Leitor, Editor, Pagamentos e aprovação.','Para cada direito, indique owner, criticidade, validade, justificativa e aprovador.','Modele regra SoD: solicitar pagamento não deve aprovar a mesma operação.','Se habilitado, crie catálogo e access package apontando recursos de laboratório.','Configure política de solicitação, escopo de usuários e duração de concessão.','Simule pedido, aprovação e concessão de acesso temporário.','Teste pedido conflitante SoD e bloqueie ou registre compensação aprovada.','Inicie campanha de Access Review com owner e decisão manter/remover.','Confirme que decisões de remoção foram realmente aplicadas após encerramento/regras da campanha.','Registre trilha de quem solicitou, aprovou, revisou e quando o acesso expirou.'],
 expected:'Governança com ciclo de solicitação/aprovação/revisão/aplicação e rastros por direito.',
 failure:'Access review decidido mas acesso ainda ativo: avalie se a campanha terminou e se as decisões foram aplicadas.',
 cleanup:'Encerrar campanha fictícia e retirar atribuições/grupos de teste.'
 },
 'lab-10':{
 duration:'100–180 minutos',prereq:['Conta piloto e papel privilegiado restrito; acesso emergencial testado.','Licença PIM elegível ou simulação; Vault local isolado opcional.'],
 steps:['Escolha função administrativa sensível e liste operações que exigem elevação.','Registre justificativa, approver e janela de ativação JIT.','Se tiver PIM, configure elegibilidade somente da conta administrativa piloto.','Antes de ativar, confirme que operação privilegiada está negada.','Solicite ativação pelo prazo mínimo e cumpra autenticação/justificativa exigida.','Durante ativação, execute apenas uma operação reversível e observe evento de auditoria.','Após prazo, confirme que operação deixa de ser autorizada.','Modele separadamente cofre PAM para segredo sintético e sessão privilegiada controlada.','Documente conta emergencial independente e procedimento de monitoramento.','Remova elegibilidade e confira que nenhuma role permanente ficou atribuída indevidamente.'],
 expected:'Evidência de privilégio ausente, ativado, expirado e auditoria, sem segredos reais.',
 failure:'Se a função permanece disponível, cheque roles permanentes herdadas ou associação a grupos elegíveis.',
 cleanup:'Remover elegibilidade piloto e encerrar Vault de desenvolvimento; não usar credenciais reais.'
 },
 'lab-11':{
 duration:'90–180 minutos',prereq:['Dados 100% sintéticos e M365/Purview elegível ou simulação.','Proprietário da informação e matriz de classificação definidos.'],
 steps:['Crie arquivos fictícios: público, interno e confidencial com textos sintéticos.','Defina classificação, responsáveis e regras de compartilhamento de cada documento.','Verifique licenças Purview e papéis mínimos necessários sem usar Global Administrator por padrão.','No portal Purview, crie ou simule rótulo Confidencial com proteção adequada ao escopo.','Aplique rótulo a arquivo de teste, se disponível, e observe efeito real.','Compare leitura por usuário autorizado e não autorizado na aplicação suportada.','Defina política DLP para dado de teste com auditoria antes de bloqueio.','Execute tentativa controlada de compartilhamento e verifique evento ou ausência esperada.','Analise falso positivo/negativo e ajuste escopo da regra em laboratório.','Desative política piloto, revise rótulos e exclua arquivos de teste se necessário.'],
 expected:'Documento sintético classificado com acesso coerente e DLP revisado sem impactar conteúdo real.',
 failure:'Rótulo sem criptografia pode não restringir leitura; diferencie classificação de proteção e valide suporte do aplicativo.',
 cleanup:'Remover escopos/políticas pilotos e arquivos sintéticos, sem afetar conteúdo corporativo.'
 },
 'lab-12':{
 duration:'75–150 minutos',prereq:['Contas de teste e acesso de leitura aos logs.','KQL em workspace elegível ou amostra estruturada de eventos sintéticos.'],
 steps:['Faça login válido e inválido controlados na conta fictícia.','Anote hora UTC, usuário, aplicativo, status e correlation ID do evento.','Abra Entra > Monitoring & health > Sign-in logs e filtre pela janela das tentativas.','Compare falha por credencial com falha de Conditional Access em evento apropriado.','Altere associação de grupo piloto e localize alteração em Audit logs.','Selecione campo e tabela KQL conforme schema real do workspace; não assuma nomes em outra fonte.','Execute consulta com where para reduzir período e project para exibir ator, resultado e horário.','Agregue falhas por aplicativo e usuário com summarize count() e explique falsos positivos.','Relacione hipótese, logs e ação corretiva a partir de incidente fictício.','Refaça teste e confirme resolução, preservando somente evidências anonimizadas.'],
 expected:'Timeline coerente e consulta KQL com registros sintéticos ou tenant de teste, incluindo correção validada.',
 failure:'Se consulta retorna zero, revise ingestion/retention, timezone, tabela, permissões e filtros antes de concluir que não houve eventos.',
 cleanup:'Apagar logs exportados com PII e dados de teste após retenção definida.'
 },
 'lab-13':{
 duration:'120–240 minutos',prereq:['VM Windows Server de avaliação/licenciamento adequado em rede isolada.','DNS de laboratório e snapshot antes das mudanças.'],
 steps:['Crie rede virtual isolada com servidor e cliente Windows ou Linux de teste.','Instale serviço DNS e AD DS na VM de teste e defina domínio reservado para laboratório.','Promova DC e valide registros DNS SRV necessários à localização de domínio.','Crie OU, usuário e grupo de exemplo; aplique política GPO inofensiva.','Associe cliente ao domínio e obtenha login de usuário de teste.','Execute klist e identifique ticket e servidor de domínio sem compartilhar secrets.','Realize consulta LDAP somente leitura por conta restrita preferindo TLS.','Identifique atributos que serão fontes autoritativas na sincronização híbrida.','Se disponível, teste Entra Connect/Cloud Sync conforme requisitos; caso contrário, desenhe o fluxo e dependências.','Simule troca de departamento no AD e compare evento na nuvem ou no mapeamento teórico.','Desfaça alterações conflitantes e restaure snapshot após coletar evidências.'],
 expected:'AD com Kerberos, DNS e LDAP válidos e modelo de sincronização claro, sem misturar mecanismos.',
 failure:'Falha de logon pode envolver relógio, DNS, conectividade de DC e credenciais: diagnostique nessa ordem.',
 cleanup:'Desconectar VMs da rede e restaurar snapshot/limpar diretório de teste.'
 },
 'lab-14':{
 duration:'110–180 minutos',prereq:['Conhecimentos OIDC/JWT, role trust e scoping.','Acesso apenas a sandboxes de cloud com controle de custos.'],
 steps:['Defina pipeline sintético repo/projeto/branch com emissor OIDC e identidade de workload.','Mapeie issuer, audience e subject esperados por trust policy.','Desenhe papel Azure com workload identity federation e role mínima no recurso.','Desenhe papel AWS STS com trust de OIDC e permission policy separada.','Desenhe Google Cloud Workload Identity Pool e service account ou principal autorizado.','Simule token que corresponde ao subject/issuer esperado e observe decisão autorizada.','Simule token de outra branch/projeto e confirme negação prevista.','Compare duração de sessão, escopo e campos registrados em logs de cada cloud.','Identifique recursos que gerariam cobrança, sem criar serviços desnecessários.','Escreva documentação indicando equivalências conceituais e divergências semânticas.'],
 expected:'Três relacionamentos de confiança documentados e caso adverso de subject/issuer negado.',
 failure:'Confiança aberta por wildcard amplo deve ser tratada como falha de segurança; limite claims de origem.',
 cleanup:'Excluir identidades/roles de teste e recursos faturáveis eventualmente criados.'
 },
 'lab-15':{
 duration:'4–8 horas, distribuídas em sessões',prereq:['Laboratórios anteriores ou documentação de simulação identificada.','Conta de laboratório, owners, exigências de licença, orçamento e rollback.'],
 steps:['Defina AtlasCorp com RH, Financeiro, TI, parceiros e aplicação interna; registre requisitos de negócio.','Desenhe identidades humanas, convidadas, dispositivo e workload com fontes autoritativas.','Produza modelo de roles, atributos, entitlements, scope e matriz de incompatibilidades SoD.','Implante ou simule usuários, SSO/OIDC e autorização de recursos na aplicação.','Configure um método forte de autenticação e avalie políticas CA em grupo piloto.','Integre sinal de compliance de dispositivo Intune ou documente simulação como tal.','Conceda leitura de recurso Azure a workload sem secret estático, com teste de escrita negada.','Estruture access package/aprovação, access review, conta emergencial e PIM em modo licenciado ou simulado.','Classifique documento de teste com rótulo Purview e defina política de dados quando habilitado.','Execute Joiner, Mover e Leaver com trilha de aprovação e retirada de acessos.','Provoque duas falhas controladas (OIDC inválido e CA/role negada) e faça investigação documentada com logs.','Apresente ameaças, controles, impacto de licença/custo, plano de rollback e indicadores operacionais.','Revise evidências removendo IDs reais, tokens e dados pessoais antes de compartilhar portfólio.'],
 expected:'Portfólio completo com arquitetura, matriz de permissões, fluxos JML, testes positivos/negativos e diagnóstico.',
 failure:'Componentes indisponíveis devem ser rotulados como simulação e não como experiência operacional executada.',
 cleanup:'Remover recursos cloud de teste, políticas e permissões piloto; registrar custos finais.'
 }
};
LABS.forEach(lab=>{
 const p=LAB_DEEP[lab.id];if(!p)throw Error('Detalhamento ausente: '+lab.id);
 lab.prerequisites=p.prereq;lab.steps=p.steps;lab.expected=p.expected;lab.troubleshooting=p.failure;
 lab.cleanup=p.cleanup;lab.duration=p.duration;
 lab.safety='Ambiente autorizado e contas fictícias. Não compartilhe tokens, senhas, dados pessoais ou capturas identificáveis. Faça backup e registre rollback antes de mudar políticas.';
 lab.evidence=lab.evidence.concat(['Teste adverso, diagnóstico e correção registrados.','Checklist de limpeza/rollback concluído ou justificado.']);
});
