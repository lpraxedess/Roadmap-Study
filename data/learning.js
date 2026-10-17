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
