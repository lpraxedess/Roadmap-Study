'use strict';
/* Atlas técnico de ponta a ponta da Aurora: deriva o mapa de todos os módulos e passos existentes.
   Nenhuma topologia apresentada aqui executa configuração nos sistemas. */
window.IAMAtlas=(()=>{
 const $=id=>document.getElementById(id);
 const node=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el};
 const link=(label,target,external=false)=>{const a=node('a','',label);a.href=target;if(external){a.target='_blank';a.rel='noopener noreferrer'}return a};
 const systems=[
  {id:'rh',layer:'00 / ORIGEM',label:'RH / motor de eventos',asset:'rh.csv · E001–E006',role:'Fonte do vínculo. Aprova admissão, transferência, desligamento e revisão; employeeId não muda.',in:'Evento fictício autorizado · J001 / M001 / L001 / R001',out:'Criação e revisão manual de contas e associações',test:'Alteração em RH não concede acesso sem provisionamento nos destinos.',lessons:['prep-route','iam-4-0']},
  {id:'host',layer:'01 / BANCADA',label:'HOST01 · Windows 11 Pro',asset:'Ryzen 5 5600 · 16 GB RAM · VirtualBox',role:'Máquina que hospeda VMs, navegador, PowerShell, Docker, Keycloak e APP01.',in:'Operador com privilégio controlado apenas no laboratório',out:'Rede host-only 192.168.56.0/24 · loopback para serviços locais',test:'AMD-V/SVM, espaço livre, isolamento da rede e uso de RAM.',lessons:['prep-windows']},
  {id:'dc',layer:'02 / DIRETÓRIO',label:'DC01 · AD DS + DNS',asset:'192.168.56.10 · aurora.test',role:'Domínio isolado: OUs, usuários, grupos, GPO, Kerberos, gMSA e DNS SRV.',in:'RH → alteração manual · CL01 → DNS/Kerberos/LDAP',out:'Escopo piloto para Cloud Sync · diretório Windows',test:'Registro SRV, autenticação em domínio, grupo e acesso negado.',lessons:['iam-1-0','iam-1-1','iam-1-2','iam-1-3']},
  {id:'cl',layer:'02 / DISPOSITIVO',label:'CL01 · Windows 11 Enterprise',asset:'192.168.56.20 · Windows cliente',role:'Estação ingressada em aurora.test. Posteriormente usada para inscrição e conformidade Intune.',in:'DC01: DNS, Kerberos, GPO · Entra/Intune: gestão apenas se habilitada',out:'Evidências de logon, políticas, BitLocker e compliance',test:'Quem não possui grupo/permissão não acessa; política do dispositivo é avaliada.',lessons:['iam-1-1','iam-7-0','iam-7-1']},
  {id:'entra',layer:'03 / NUVEM',label:'TENANT01 · Microsoft Entra',asset:'Tenant Free existente · onmicrosoft.com',role:'Diretório cloud: usuários e grupos do piloto, funções administrativas, MFA, logs, SSO e CA licenciado.',in:'Cloud Sync: somente OUs piloto · contas privilegiadas cloud-only separadas',out:'Aplicações corporativas, Graph, logs e acesso condicional se licenciado',test:'Correlação por identidade; bloqueio e sessões cloud não são automaticamente revogados por AD.',lessons:['iam-2-0','iam-2-1','iam-2-2','iam-2-4']},
  {id:'sync',layer:'03 / HÍBRIDO',label:'Agente de Cloud Sync',asset:'DC01 no laboratório · HTTPS de saída',role:'Transporta objetos permitidos do AD para Entra. Não substitui todos os fluxos de autorização.',in:'OU=Colaboradores + OU=Grupos · gMSA · portas e endpoints suportados',out:'Objetos sincronizados e logs de provisionamento na cloud',test:'Mudança no AD, propagação no Entra, conflitos, exclusões e reversão.',lessons:['iam-2-1']},
  {id:'idp',layer:'04 / FEDERAÇÃO',label:'IDP01 · Keycloak',asset:'localhost:8080 · realm aurora',role:'IdP independente da nuvem Microsoft para estudar SAML, OAuth e OIDC.',in:'Cadastro do piloto feito manualmente · clientes e papéis',out:'Authorization Code + PKCE → APP01 · tokens e logs',test:'State, nonce, redirect URI exata, issuer, audience e expiração.',lessons:['prep-local','iam-3-0','iam-3-1']},
  {id:'app',layer:'05 / APLICAÇÃO',label:'APP01 · Portal e API',asset:'localhost:8765 · aurora-api',role:'Cliente OIDC e API: autentica via Keycloak, autoriza no backend conforme cadastro e papéis.',in:'OIDC Code + PKCE · token com audience correta · SCIM manual',out:'/api/financeiro · /api/juridico · eventos.jsonl',test:'FIN 200 / JUR 403 para E001 inicial; token inválido 401.',lessons:['iam-3-1','iam-3-2','iam-4-0']},
  {id:'scim',layer:'05 / PROVISIONAMENTO',label:'Cadastro SCIM da APP01',asset:'/scim/v2/Users · cadastro.json',role:'Recebe POST/PATCH de usuário e estado. Provisionamento não é login.',in:'Operador envia Bearer S002 em chamada manual de laboratório',out:'Conta ativa, departamento e papéis atuais consultados a cada acesso',test:'Mover E001 de FIN a JUR e revogar acesso sem perder employeeId.',lessons:['iam-3-2','iam-6-3']},
  {id:'iga',layer:'06 / GOVERNANÇA',label:'IGA · JML / SoD / revisões',asset:'J001 · M001 · L001 · SOD01',role:'Aprovação, revisão de acesso, segregação de função e trilha de evidências.',in:'RH e gestores E003/E004 · políticas de acesso',out:'Conceder/remover conforme o ciclo de vida; aprovar exceções com prazo',test:'O acesso antigo deixa de existir após a transferência; o desligamento revoga.',lessons:['iam-4-0','iam-4-2','iam-4-3']},
  {id:'pam',layer:'07 / PRIVILEGIADOS',label:'PAM / PIM / emergência',asset:'A001–A004 · BG01/BG02',role:'Contas administrativas isoladas, privilégios temporários, sessões e recuperação.',in:'Solicitação aprovada e licença elegível PIM quando aplicável',out:'Ativação temporária, trilha de auditoria e recuperação',test:'Conta cotidiana não vira administradora. PIM simulado não equivale a ativação real.',lessons:['iam-5-0','iam-5-1','iam-5-2']},
  {id:'intune',layer:'08 / DISPOSITIVOS',label:'Intune / Device Trust',asset:'CL01 · MDM / Compliance',role:'Inscrição, conformidade, postura, BitLocker e políticas de segurança quando licenciado.',in:'Conta e dispositivo elegíveis; licença correta; fluxo MDM de teste',out:'Avaliação de conformidade → CA licenciado quando configurado',test:'Não inscrever nem apagar estação pessoal; validar política no piloto.',lessons:['iam-7-0','iam-7-1','iam-7-2']},
  {id:'azure',layer:'09 / WORKLOAD',label:'Azure / Graph / aplicações',asset:'S001 inventário · identidades gerenciadas',role:'Permissões de API, service principals, segredos, rotação e RBAC cloud opcionais.',in:'Assinatura Azure legítima se uma prática exigir recurso pago',out:'Tokens de aplicação, logs, Graph e recursos descartáveis',test:'Menor privilégio, rotação, ausência de recursos cloud permanentes.',lessons:['iam-6-0','iam-6-1','iam-6-2']},
  {id:'audit',layer:'10 / OBSERVABILIDADE',label:'Auditoria / resposta / portfólio',asset:'AD + Entra + Keycloak + APP01',role:'Correlaciona decisões, resultados positivos/negativos e retorno ao estado do teste.',in:'Logs e evidências sanitizadas dos sistemas realmente executados',out:'ADRs, diagramas, cenários de incidente e entregáveis de carreira',test:'Identificar causa-raiz, provar reversão e separar prática real de simulação.',lessons:['iam-8-0','iam-8-3','iam-9-0','iam-9-2']}
 ];
 let lastProgressSignature=null;
 const edges=[
  ['RH / evento','DC01 / AD DS','Manual / operador','Criar/desabilitar usuário, alterar departamento e grupos.','Validar J001, M001, L001 no AD e registrar hora.'],
  ['CL01 / Windows','DC01 / DNS + KDC','Rede host-only','DNS 53; Kerberos 88/464; LDAP 389; SMB 445; RPC necessário conforme tarefa.','Resolver SRV e autenticar conta comum no domínio.'],
  ['DC01 / AD DS','TENANT01 / Entra','Automático após configurar Cloud Sync','Agente com saída HTTPS, gMSA e escopo restrito de OU; contas privilegiadas fora.','Conferir logs, duplicatas, exclusões e atraso.'],
  ['RH / operador','IDP01 / Keycloak','Manual / laboratório','Criar/atualizar/desabilitar mesmo piloto no realm aurora.','Garantir que mudança AD/Entra não é apresentada como sync automática do Keycloak.'],
  ['Navegador HOST01','IDP01 / Keycloak','OIDC authorization code','Realm aurora, app registrada, redirect URI exata, PKCE S256, state/nonce.','Retorno do authorization code e autenticação real.'],
  ['IDP01 / Keycloak','APP01 / OIDC','Protocolo configurado','Troca de code no backend, validação de issuer, aud, exp e assinatura.','Token rejeitado sem parâmetros esperados.'],
  ['RH / operador','APP01 / SCIM','Manual / Bearer S002','POST/PATCH ao cadastro local de APP01; segredos fora do portal.','Conta e departamento atualizados, 200/401 no endpoint conforme token.'],
  ['APP01 / API','Cadastro / política','Automático a cada requisição','active + department + role decide /api/financeiro e /api/juridico.','Testes FIN/JUR 200 e 403 após cada movimento.'],
  ['Entra / administrador','Contas BG01/BG02','Cloud-only','Credenciais de emergência fora da sincronização e CA, conforme projeto.','Permanecem recuperáveis após falha de AD.'],
  ['Governança / revisores','AD / Entra / APP01','Aprovação humana','Revisões, SoD, JML e evidência por fronteira.','Aprovação não substitui o teste de acesso efetivo.'],
  ['PIM / Entra','Funções privilegiadas','Licenciado / opcional','Elegibilidade e ativação temporária quando disponível.','Provar ativação/expiração ou registrar como simulação.'],
  ['Intune / MDM','CL01 / compliance','Licenciado / opcional','Inscrição do dispositivo de laboratório, política e check-in.','Verificar compliance antes de usá-la em CA.'],
  ['CA / Entra','Aplicações integradas ao Entra','Licenciado / não presumido na APP01','Políticas no Entra afetam apenas recursos que usam esse fluxo de acesso; APP01 utiliza Keycloak no desenho atual.','Confirmar aplicativo protegido e conta de emergência excluída.'],
  ['Azure / workload','Graph / recursos','Opcional / custo variável','App registration, service principal, managed identity e consentimento mínimo.','Sem VM Azure permanente; remover grupo de recursos de teste.'],
  ['AD / Entra / Keycloak / APP01','Auditoria','Coleta / correlação','Eventos e timestamps registrados em cada fronteira; nenhuma coleta central automática presumida.','Causa-raiz, mitigação, prova negativa e reversão documentadas.']
 ];
 function section(title,description,className=''){
  const s=node('section','atlas-section '+className);const head=node('div','atlas-section-header');
  head.append(node('h3','',title));if(description)head.append(node('p','',description));s.append(head);return s;
 }
 function detail(label,className=''){
  const d=node('details',className);d.append(node('summary','',label));return d;
 }
 function tagged(parent,label,value){const p=node('p','atlas-kv');p.append(node('span','',label),node('strong','',value));parent.append(p)}
 function render(){
  const root=$('arch-atlas');if(!root)return;
  root.replaceChildren();
  const state=window.IAMApp?.getState()||{completed:[],steps:[]};
  // Atlas muito detalhado: não reconstruir centenas de etapas ao navegar sem alteração de progresso.
  const signature=state.completed.join('|')+'#'+state.steps.join('|');
  if(signature===lastProgressSignature&&root.childElementCount>0)return;
  lastProgressSignature=signature;
  const all=PHASES.flatMap(p=>p.items);
  const totalSteps=all.reduce((n,t)=>n+t.guide.steps.length,0);
  const hero=node('div','atlas-hero');
  hero.append(node('span','eyebrow','ATLAS TÉCNICO / VERSÃO COMPLETA'),node('h2','','A arquitetura não termina no diagrama.'),node('p','','Cada sistema tem função, endereço, fronteiras, configuração e testes. O mapa abaixo acompanha os módulos da trilha e detalha os '+totalSteps+' passos em '+all.length+' aulas. É grande por projeto: navegue por área e expanda a configuração que quiser inspecionar.'));
  const stats=node('div','atlas-stats');
  [[systems.length,'componentes e domínios'],[edges.length,'fronteiras descritas'],[ARCHITECTURE.events.length,'movimentações'],[PHASES.length,'módulos'],[all.length,'aulas'],[totalSteps,'microetapas']].forEach(([num,label])=>{const card=node('div','atlas-stat');card.append(node('strong','',String(num)),node('span','',label));stats.append(card)});
  hero.append(stats);root.append(hero);
  const jump=node('nav','atlas-jump');jump.setAttribute('aria-label','Navegar no atlas');
  [['#arch-atlas-systems','Sistemas'],['#arch-atlas-edges','Conexões'],['#arch-atlas-moves','Movimentações'],['#arch-atlas-catalog','Todas as aulas']].forEach(([href,text])=>jump.append(link(text,href)));
  root.append(jump);
  const physical=section('01 / Componentes, configurações e responsabilidades','A topologia final é descrita por camadas, com as fronteiras explícitas; cartões são âncoras para os temas relacionados.','atlas-systems');
  physical.id='arch-atlas-systems';
  const systemsGrid=node('div','atlas-systems-grid');
  for(const system of systems){
   const card=node('article','atlas-system-card');card.id='arch-map-'+system.id;
   card.append(node('span','eyebrow',system.layer),node('h4','',system.label),node('p','atlas-system-asset',system.asset),node('p','',system.role));
   const block=node('div','atlas-system-data');tagged(block,'ENTRADA',system.in);tagged(block,'SAÍDA',system.out);tagged(block,'VALIDAÇÃO',system.test);card.append(block);
   const references=node('div','atlas-system-links');
   for(const lessonId of system.lessons){const lesson=all.find(t=>t.id===lessonId);if(lesson)references.append(link(lesson.title,'#task-'+lessonId))}
   card.append(references);systemsGrid.append(card);
  }
  physical.append(systemsGrid);root.append(physical);
  const connections=section('02 / Relações entre serviços — o que realmente se comunica','Linhas automáticas só existem após configurar a integração. Um passo manual ou uma simulação nunca deve ser confundido com um conector pronto.','atlas-connections');
  connections.id='arch-atlas-edges';
  const legend=node('div','atlas-legend');
  [['Automático','Depois de configurar'],['Manual','Ação do operador'],['Licenciado','Depende de elegibilidade']].forEach(([name,label])=>{const e=node('span','atlas-legend-item');e.append(node('strong','',name),node('small','',label));legend.append(e)});
  connections.append(legend);
  const edgeGrid=node('div','atlas-edge-grid');
  for(let i=0;i<edges.length;i++){
   const [from,to,kind,config,verify]=edges[i];
   const item=node('article','atlas-edge');
   item.append(node('span','atlas-edge-index',String(i+1).padStart(2,'0')));
   const path=node('div','atlas-edge-path');path.append(node('strong','',from),node('span','atlas-edge-arrow','→'),node('strong','',to));item.append(path);
   item.append(node('span','atlas-edge-type',kind),node('p','',config),node('p','atlas-edge-check','Prova: '+verify));edgeGrid.append(item);
  }
  connections.append(edgeGrid);root.append(connections);
  const changes=section('03 / Movimentações e estados esperados','As mudanças são executadas em cada sistema existente. Confira diferença entre comportamento observado e estado de referência.','atlas-moves');
  changes.id='arch-atlas-moves';
  const cards=node('div','atlas-movements');
  for(const [code,name,who,actions,result,lesson] of ARCHITECTURE.events){
   const card=node('article','atlas-movement');card.id='arch-move-'+code;
   card.append(node('span','atlas-move-id',code),node('h4','',name),node('p','atlas-move-subject',who),node('p','',actions));
   tagged(card,'RESULTADO',result);
   card.append(link('Executar e registrar evidência →','#task-'+lesson));
   cards.append(card);
  }
  changes.append(cards);
  const warning=node('p','atlas-note','IMPORTANTE: no cenário atual, Cloud Sync propaga AD → Entra, mas não converte automaticamente alterações em Keycloak nem provisiona a APP01. Os fluxos de OIDC e SCIM são experimentos locais independentes, conectados por decisões e ações observáveis.');changes.append(warning);
  root.append(changes);
  const catalog=section('04 / Mapa completo de configuração — do básico ao avançado','Os 11 módulos e todas as 41 aulas estão abaixo. Abra uma aula para ver suas microetapas, comandos, contexto de execução, resultado, critérios e atalho ao leitor guiado.','atlas-catalog');
  catalog.id='arch-atlas-catalog';
  const tools=node('div','atlas-tools');
  const expand=node('button','button secondary','Expandir todas as aulas');expand.type='button';
  expand.setAttribute('aria-pressed','false');
  expand.addEventListener('click',()=>{
   const open=expand.getAttribute('aria-pressed')!=='true';
   for(const d of root.querySelectorAll('.atlas-lesson'))d.open=open;
   expand.setAttribute('aria-pressed',String(open));
   expand.textContent=open?'Recolher microetapas':'Expandir todas as aulas';
  });
  tools.append(expand,node('span','muted',totalSteps+' passos documentados · '+state.steps.length+' registrados no progresso'));
  catalog.append(tools);
  const index=node('nav','atlas-module-index');index.setAttribute('aria-label','Ir para módulo técnico');
  for(const phase of PHASES){const x=link(String(phase.number).padStart(2,'0')+' · '+phase.title,'#arch-phase-'+phase.id);index.append(x)}
  catalog.append(index);
  for(const phase of PHASES){
   const module=node('section','atlas-module');module.id='arch-phase-'+phase.id;
   const header=node('header','atlas-module-heading');
   const meta=node('span','atlas-module-number',String(phase.number).padStart(2,'0'));
   const title=node('div','atlas-module-heading-text');
   title.append(node('h4','',phase.title),node('p','',phase.desc));
   header.append(meta,title,node('span','atlas-module-count',phase.items.length+' aulas / '+phase.items.reduce((n,t)=>n+t.guide.steps.length,0)+' ações'));module.append(header);
   const contract=node('div','atlas-module-contract');
   tagged(contract,'AMBIENTE',phase.environment);tagged(contract,'PRÉ-REQUISITOS',phase.requirements);tagged(contract,'ENTREGA',phase.outcome);
   module.append(contract);
   const list=node('div','atlas-lesson-list');
   for(const lesson of phase.items){
    const l=node('details','atlas-lesson');l.id='arch-lesson-'+lesson.id;
    const summary=node('summary','atlas-lesson-head');
    summary.append(node('span','atlas-lesson-num',String(lesson.sequence).padStart(2,'0')));
    const heading=node('span','atlas-lesson-title');heading.append(node('strong','',lesson.title),node('small','',lesson.labAction));
    const complete=state.completed.includes(lesson.id);
    summary.append(heading,node('span','atlas-lesson-completion',complete?'VALIDADA':lesson.guide.steps.length+' PASSOS'));
    l.append(summary);
    const body=node('div','atlas-lesson-body');
    const info=node('div','atlas-lesson-meta');
    tagged(info,'IMPLEMENTAÇÃO',lesson.labAction||lesson.evidence||'Ver passos');
    tagged(info,'AMBIENTE',lesson.guide.steps.map(s=>s.host).filter(Boolean).filter((v,i,a)=>a.indexOf(v)===i).slice(0,3).join(' · '));
    tagged(info,'CUSTO',{free:'Local / gratuito',hybrid:'Híbrido / validar',trial:'Avaliação ou licença'}[lesson.cost]||'Verificar');
    if(lesson.prerequisiteIds?.length){
     const p=node('div','atlas-prereqs');p.append(node('span','','ANTES: '));
     for(const id of lesson.prerequisiteIds){
      const previous=all.find(t=>t.id===id);
      if(previous)p.append(link(previous.title,'#task-'+id));
     }
     info.append(p);
    }
    body.append(info);
    const lessonActions=node('div','atlas-lesson-actions');
    lessonActions.append(link('Abrir aula guiada →','#task-'+lesson.id));
    if(lesson.guide.platformUrl||lesson.url)lessonActions.append(link('Documentação técnica ↗',lesson.guide.platformUrl||lesson.url,true));
    body.append(lessonActions);
    const stepList=node('ol','atlas-step-list');
    for(let i=0;i<lesson.guide.steps.length;i++){
     const step=lesson.guide.steps[i],id=lesson.id+'/'+step.id,confirmed=state.steps.includes(id);
     const stepNode=node('li','atlas-step'+(confirmed?' is-verified':''));stepNode.id='arch-step-'+lesson.id+'-'+step.id;
     const top=node('div','atlas-step-header');
     top.append(node('span','atlas-step-index',String(i+1).padStart(2,'0')),node('strong','',step.title),node('span','atlas-step-state',confirmed?'CONFERIDO':'A CONFERIR'));stepNode.append(top);
     tagged(stepNode,'ONDE',step.host||'Conferir aula');
     stepNode.append(node('p','atlas-step-instruction',step.text));
     if(step.why)tagged(stepNode,'POR QUÊ',step.why);
     if(step.command){
      const code=detail('Ver comando ou configuração','atlas-step-command');
      const pre=node('pre');const codeText=node('code','',step.command);pre.append(codeText);code.append(pre);stepNode.append(code);
     }
     tagged(stepNode,'RESULTADO ESPERADO',step.expected||lesson.evidence||'Conferir resultado na aula');
     stepList.append(stepNode);
    }
    body.append(stepList);
    if(lesson.acceptance?.length){
     const acceptance=detail('Critérios de aceite e evidências ('+lesson.acceptance.length+')','atlas-acceptance');
     const criteria=node('ul');
     for(const c of lesson.acceptance)criteria.append(node('li','',c.text));
     acceptance.append(criteria);body.append(acceptance);
    }
    l.append(body);list.append(l);
   }
   module.append(list);catalog.append(module);
  }
  root.append(catalog);
 }
 return {render,components:systems.length,connections:edges.length};
})();