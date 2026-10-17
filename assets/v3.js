/* ROADMAP - IAM · three-column product information architecture.
   Core app retains stable legacy IDs; legacy routes redirect to Roadmap or Painel. */
const ROADMAP_LEVELS=[
 {id:'beginner',name:'Iniciante',subtitle:'Conceitos, identidade e primeiros controles',description:'Entenda as bases, conheça o Entra e aplique os primeiros controles corporativos sem configurar infraestrutura desnecessária.',ids:[0,1,16,5,9,4,6,7,8,2,3]},
 {id:'intermediate',name:'Intermediário',subtitle:'Administração cloud e operações IAM',description:'Aprofunde autenticação, identidade externa, dispositivos, Azure, provisionamento e investigação operacional.',ids:[17,18,19,20,21,10,11,12,14,28]},
 {id:'advanced',name:'Avançado',subtitle:'Governança, privilégios e arquitetura',description:'Evolua a AtlasCorp com governança, segurança de workloads, dados, multi-cloud e arquitetura.',ids:[13,22,23,24,25,26,27,15]}
];
/* Uma única ordem para Roadmap, aula seguinte e visão de progresso.
   Os índices antigos de temas e laboratórios permanecem intocados. */
LEARNING_ORDER.splice(0,LEARNING_ORDER.length,...ROADMAP_LEVELS.flatMap(level=>level.ids));
ROADMAP_LEVELS.forEach(level=>level.ids.forEach(moduleId=>{LEARNING_PHASE[moduleId]=level.name}));
const CERT_LEVELS=[
 {id:'beginner',name:'Iniciante',intro:'Conheça vocabulário técnico, identidade e operações básicas.',certs:['sc900','itil','oktap']},
 {id:'intermediate',name:'Intermediário',intro:'Administração de identidade e certificações complementares da plataforma.',certs:['sc300','az104','md102','sc401','oktaa','gcpace','iso','cobit']},
 {id:'advanced',name:'Avançado',intro:'Governança especializada, segurança cloud, arquitetura e requisitos profissionais.',certs:['sc100','awssec','gcps','sailpoint','cyberark','cisa','cism','ccsp','cissp']}
];
const CERT_FRAMES=['nist','cis','nist53'];
const CERT_SHOWN=new Set([...CERT_LEVELS.flatMap(l=>l.certs),...CERT_FRAMES]);
const COMPANY_STEP_KEY='roadmap-iam-company-procedures-v1';
let companyStepState={};
function levelOfModule(id){return ROADMAP_LEVELS.find(l=>l.ids.includes(id))||ROADMAP_LEVELS[2]}
function goStudy(){navigate('roadmap')}
function goCompany(id){activeLab=id||null;navigate('labs')}
function uxButton(name,handler,cl='btn'){return btn(name,handler,cl)}
function uxTop(title,subtitle,area){
 return el('header',{class:'v3-heading'},[text('div',area,'eyebrow'),text('h1',title),text('p',subtitle,'muted')])
}
function uxChip(textValue,cl=''){return text('span',textValue,'v3-chip '+cl)}
function uxProgressCount(labId){
 const steps=COMPANY_CHAPTERS[labId].tasks||[],saved=companyStepState[labId]||{};
 return {total:steps.length,done:steps.filter((_,i)=>saved[i]===true).length}
}
function uxLevelProgress(l){let total=0,sum=0;
 l.ids.forEach(i=>{let topics=modules[i].length-3;total+=topics*3;for(let j=0;j<topics;j++)sum+=score(i,j)});
 return {total,percent:total?Math.round(sum/total*100):0}
}
function experienceDashboard(){
 const root=el('div'),st=stats();
 root.append(el('header',{class:'v3-hero'},[
  text('div','ROADMAP - IAM','eyebrow'),
  text('h1','Sua evolução em identidade e acesso'),
  text('p','Do iniciante ao avançado: estude cada assunto e, quando necessário, aplique a configuração da AtlasCorp dentro da própria aula.','hero-lead')
 ]));
 const actions=el('div',{class:'v3-primary-actions'},[
  uxButton('Abrir roadmap de estudos →',goStudy,'btn primary v3-main-action'),
  uxButton('Continuar o próximo tema →',()=>{const t=ROADMAP_LEVELS.flatMap(l=>l.ids.flatMap(m=>modules[m].slice(3).map((name,s)=>({m,s,level:score(m,s)})))).find(x=>x.level<3);if(t)openSkill(t.m,t.s);else goStudy()},'btn v3-main-action')
 ]);
 root.append(actions);
 const metrics=el('div',{class:'v3-dashboard-metrics'},[
   exStat('Tópicos estudados',st.started+' / '+st.total,'Conhecimento autodeclarado'),
   exStat('Tópicos dominados',st.mastered+' / '+st.total,'Recomendamos sempre revisão por evidência'),
   exStat('Domínio estimado',st.progress+'%','Não representa avaliação independente')
 ]);root.append(metrics);
 const ordered=ROADMAP_LEVELS.flatMap(l=>l.ids.flatMap(m=>modules[m].slice(3).map((name,s)=>({m,s,name,level:score(m,s)}))));const t=ordered.find(x=>x.level>0&&x.level<3)||ordered.find(x=>x.level===0);
 if(t)root.append(el('div',{class:'v3-resume'},[
  el('div',{},[text('span','CONTINUAR APRENDIZAGEM','eyebrow'),text('h2',t.name),text('p',modules[t.m][1]+' · '+levelOfModule(t.m).name,'muted')]),
  uxButton('Estudar este tema →',()=>openSkill(t.m,t.s),'btn')
 ]));
 const levelBox=el('div',{class:'v3-level-strip'});
 ROADMAP_LEVELS.forEach(level=>{
  const p=uxLevelProgress(level),row=el('button',{type:'button',class:'v3-level-overview'});
  row.append(text('strong',level.name),text('small',level.ids.length+' módulos · '+p.percent+'%'),meter(p.percent));row.onclick=goStudy;levelBox.append(row)
 });
 root.append(text('h2','Seu percurso'),' ',levelBox);
 const details=el('details',{class:'v3-utility-panel'});
 details.append(text('summary','Backup, restauração e privacidade dos meus dados'));
 let panel=settings();details.append(panel);root.append(details);
 return root
}
function experienceRoadmap(){
 const root=el('div');
 root.append(uxTop('Roadmap de estudos','Aulas por nível, com teoria e configurações da empresa fictícia AtlasCorp integradas somente aos temas pertinentes.','CONTEÚDO · DO BÁSICO AO AVANÇADO'));
 const search=el('input',{class:'field v3-roadmap-search',type:'search',placeholder:'Pesquisar módulos e assuntos (ex.: OAuth, MFA, SCIM)...','aria-label':'Buscar no roadmap'});
 root.append(search);
 const levelsBox=el('div',{class:'v3-roadmap-levels'}),feedback=text('p','','muted');root.append(feedback,levelsBox);
 const draw=()=>{
  let needle=exNormalize(search.value.trim()),visible=0;
  levelsBox.replaceChildren();
  ROADMAP_LEVELS.forEach((level,i)=>{
   const list=level.ids.filter(id=>exNormalize(modules[id].slice(1).join(' ')).includes(needle));
   if(!list.length)return;
   visible+=list.length;
   const p=uxLevelProgress(level),box=el('section',{class:'v3-level-group level-'+level.id});
   let summary=el('div',{class:'v3-level-heading'},[
    el('div',{},[text('div',String(i+1).padStart(2,'0')+' · '+level.name,'v3-level-kicker'),
      text('h2',level.subtitle),text('p',level.description,'muted')]),
    el('div',{class:'v3-level-progress'},[text('strong',p.percent+'%'),text('small',list.length+' módulos'),meter(p.percent)])
   ]);box.append(summary);
   const rows=el('div',{class:'v3-module-list'});
   list.forEach((id,index)=>{
    const m=modules[id],percentValue=percent(id),
      row=el('button',{class:'v3-module-row',type:'button'});
    row.append(text('span',String(index+1).padStart(2,'0'),'v3-module-num'),
      el('span',{class:'v3-module-body'},[text('strong',m[1]),text('small',m[2]),text('span',(m.length-3)+' tópicos · '+m.slice(3).filter((_,j)=>(TOPIC_PRACTICE[id+'-'+j]||[]).length>0).length+' com etapa AtlasCorp','v3-module-count')]),
      el('span',{class:'v3-module-percentage'},[text('strong',percentValue+'%'),meter(percentValue)]));
    row.onclick=()=>openModule(id);rows.append(row)
   });box.append(rows);levelsBox.append(box)
  });
  feedback.textContent=needle?visible+' módulos encontrados':'Abra um módulo para ler suas aulas. A AtlasCorp aparece dentro dos temas com aplicação prática, sem laboratório separado.';
  if(!visible)levelsBox.append(text('p','Nenhum módulo encontrado. Tente nome de protocolo ou recurso diferente.','empty'))
 };
 search.oninput=draw;draw();return root
}
function uxCertPriority(c){
 if(c.id==='sc300')return {label:'Principal da formação',cl:'main',note:'Meta central sugerida para o percurso focado em Entra ID; não é obrigatória para trabalhar em IAM.'};
 if(c.id==='sc900')return {label:'Base recomendada',cl:'recommended',note:'Marco introdutório útil, mas não pré-requisito formal para a SC-300.'};
 if(c.priority==='Complementar')return {label:'Complementar',cl:'complement',note:'Aprofunda uma área correlata do ecossistema Microsoft.'};
 return {label:'Opcional',cl:'optional',note:'Especialização de acordo com a carreira, plataforma ou experiência.'};
}
function uxCertificate(c){
 const priority=uxCertPriority(c),card=el('article',{class:'v3-certificate cert-'+priority.cl});
 card.append(el('div',{class:'v3-cert-title'},[
   el('div',{},[text('h3',c.name),text('p',c.full,'muted')]),
   text('span',priority.label,'cert-priority')
 ]),text('p',c.about,'muted'),text('p',c.preparation,'v3-preparation'),text('p',priority.note,'v3-priority-note'));
 const links=el('div',{class:'v3-cert-actions'});
 links.append(exLink(c.url,'Ver programa oficial ↗'));
 const check=el('label',{class:'filter-check'}),input=el('input',{type:'checkbox'});
 input.checked=certState[c.id]===true||(c.id==='gcps'&&certState.gcpiam===true);input.onchange=()=>{certState[c.id]=input.checked;if(c.id==='gcps')certState.gcpiam=input.checked;persist()};
 check.append(input,text('span','Certificação obtida'));links.append(check);card.append(links);
 let linked=exSection('Ver conhecimentos relacionados',false),box=el('div',{class:'compact-list'});
 (CERT_SKILLS[c.id]||[c.after]).forEach(i=>{if(modules[i])box.append(uxButton(modules[i][1],()=>openModule(i),'btn tiny'))});
 linked.append(box);card.append(linked);
 return card
}
function experienceCertifications(){
 const root=el('div');root.append(uxTop('Certificações por nível','Certificações não são obrigatórias para ingressar em IAM. A SC-300 é o objetivo principal sugerido desta formação; as demais são complementares ou opcionais.','CERTIFICAÇÕES · PLANEJAMENTO DE CARREIRA'));
 const legend=el('div',{class:'v3-legend'});
 [['main','Meta principal'],['recommended','Recomendada'],['complement','Complementar'],['optional','Opcional']].forEach(([cl,label])=>legend.append(el('div',{class:'v3-legend-item leg-'+cl},[text('span',label)])));
 root.append(legend);
 CERT_LEVELS.forEach((l,i)=>{
  let section=el('section',{class:'v3-cert-section'});
  section.append(el('header',{class:'v3-cert-level-header'},[
   text('span',String(i+1).padStart(2,'0')+' / '+l.name,'v3-level-kicker'),
   text('h2',l.intro)
  ]));
  const grid=el('div',{class:'v3-cert-grid'});
  l.certs.forEach(id=>{let c=certifications.find(x=>x.id===id);if(c)grid.append(uxCertificate(c))});
  section.append(grid);root.append(section)
 });
 let ref=el('details',{class:'v3-utility-panel'});
 ref.append(text('summary','Normas e frameworks para estudo (não são certificações)'));
 let g=el('div',{class:'v3-cert-grid'});
 CERT_FRAMES.forEach(id=>{
  const c=certifications.find(x=>x.id===id);
  if(!c)return;let item=el('article',{class:'v3-certificate cert-optional'});
  item.append(text('h3',c.name),text('p',c.about,'muted'),exLink(c.url,'Ler referência oficial ↗'));g.append(item)
 });ref.append(g);root.append(ref);
 root.append(el('div',{class:'v3-note'},[text('strong','Como interpretar as prioridades: '),
 text('span','“Principal” é a meta pedagógica deste guia, não exigência legal ou obrigatória do mercado. Requisitos oficiais e status de exames devem ser confirmados antes da inscrição. O catálogo antigo contém uma entrada duplicada de Google Cloud Security Engineer; a tela exibe uma vez, sem apagar seu registro salvo.')]));
 return root
}
function uxLabTile(lab,index){
 const details=COMPANY_CHAPTERS[lab.id],progress=uxProgressCount(lab.id),pct=Math.round(progress.done/progress.total*100);
 const row=el('button',{type:'button',class:'v3-lab-row'});
 row.append(text('span',String(index+1).padStart(2,'0'),'v3-module-num'),
   el('span',{class:'v3-module-body'},[
    text('strong',lab.title),text('small',details.incident),
    text('span',progress.done+'/'+progress.total+' procedimentos concluídos','v3-module-count')
   ]),el('span',{class:'v3-module-percentage'},[text('strong',pct+'%'),meter(pct)]));
 row.onclick=()=>goCompany(lab.id);return row
}
function uxLabOverview(){
 const root=el('div');
 root.append(uxTop('Laboratório corporativo AtlasCorp',
 'Uma única empresa fictícia, do primeiro funcionário até a arquitetura avançada. Cada capítulo reutiliza os mesmos usuários, grupos, aplicativos, políticas e decisões de negócio.','PRÁTICA REALISTA · MICROGUIADA'));
 const alertBox=el('div',{class:'v3-company-intro'});
 alertBox.append(exBox('Ambiente','Tenant próprio de laboratório, Microsoft Entra ID P2 e serviços complementares quando licenciados.'),
 exBox('Empresa',COMPANY.name+' · RH, Financeiro, TI, IAM, SecOps e parceiros externos.'),
 exBox('Objetivo','Criar, autorizar, autenticar, proteger, monitorar, revisar e desligar identidades com evidências.'));
 root.append(alertBox);
 let start=el('div',{class:'v3-resume'},[
 el('div',{},[text('strong','Comece pelo cenário corporativo, mesmo que já conheça a teoria.'),
 text('p','As configurações evoluem por etapas; use usuários de teste e nunca habilite bloqueios globais sem contingência.','muted')]),
 uxButton('Começar preparação →',()=>goCompany('lab-00'),'btn primary')
 ]);
 root.append(start);
 root.append(text('h2','Sequência corporativa'));
 const groups=new Map;
 LABS.forEach((lab,i)=>{let tr=COMPANY_CHAPTERS[lab.id].track;if(!groups.has(tr))groups.set(tr,[]);groups.get(tr).push([lab,i])});
 for(const [title,arr] of groups){
  const block=el('section',{class:'v3-lab-stage'});
  block.append(text('h3',title));const rows=el('div',{class:'v3-module-list'});
  arr.forEach(([lab,index])=>rows.append(uxLabTile(lab,index)));block.append(rows);root.append(block)
 }
 const rules=el('details',{class:'v3-utility-panel'});
 rules.append(text('summary','Regras operacionais da AtlasCorp / identidade e privilégios'));
 rules.append(exList(COMPANY.rules,false));
 root.append(rules);return root
}
function uxHowToTask(chapter,task,labId,index){
 const saved=companyStepState[labId]||{},checked=saved[index]===true;
 const d=el('details',{class:'v3-procedure'});
 if(index===0)d.open=true;
 const name=el('summary',{class:'v3-procedure-title'});
 name.append(text('span',String(index+1).padStart(2,'0'),'v3-step-id'),text('strong',task.title),
   text('span',checked?'Concluído':'Pendente','v3-step-state'));
 d.append(name);
 const body=el('div',{class:'v3-procedure-body'});
 const row=(label,value)=>body.append(el('div',{class:'v3-instruction'},[text('strong',label),text('p',value)]));
 row('Onde configurar',task.path);row('Como executar',task.action);row('Por que usar',task.reason);
 row('Como testar e comprovar',task.proof);row('Se algo der errado',task.issue);
 const checkRow=el('label',{class:'v3-procedure-check'}),check=el('input',{type:'checkbox'});
 check.checked=checked;check.onchange=()=>{companyStepState[labId]??={};companyStepState[labId][index]=check.checked;
  persist();status.textContent='Procedimento '+(index+1)+' '+(check.checked?'marcado como concluído.':'desmarcado.');
  name.children[name.children.length-1].textContent=check.checked?'Concluído':'Pendente';
 };
 checkRow.append(check,text('span','Executei ou documentei esta etapa e tenho evidência.'));body.append(checkRow);
 const status=text('p','','caption');status.setAttribute('role','status');body.append(status);d.append(body);return d
}
function uxLabDetail(lab){
 const root=el('div'),ch=COMPANY_CHAPTERS[lab.id],idx=LABS.indexOf(lab),progress=uxProgressCount(lab.id);
 root.append(uxButton('← Voltar à jornada da empresa',()=>goCompany(null),'back-link'),
 uxTop(lab.title,ch.incident,'CAPÍTULO '+String(idx+1).padStart(2,'0')+' / '+LABS.length+' · '+ch.track));
 root.append(el('div',{class:'v3-company-status'},[
  text('strong','Seu acompanhamento: '+progress.done+'/'+progress.total+' procedimentos'),
  meter(Math.round(progress.done/progress.total*100)),
  text('small',lab.duration+' · '+lab.tool)
 ]));
 const about=el('div',{class:'v3-company-intro'},[exBox('Problema de negócio',ch.why),exBox('Entrega esperada',ch.result)]);
 root.append(about);
 const pre=exSection('Preparação: requisitos, ambiente e licença',true);
 pre.append(text('h3','Antes de iniciar'),exList(ch.prerequisites.concat(lab.prerequisites),false),
 exBox('Licenças do capítulo',lab.license),
 exBox('Segurança operacional',lab.safety));
 root.append(pre);
 const decisions=exSection('Projeto: o que configurar e por quê',true);
 decisions.append(exList(ch.decisions,false));root.append(decisions);
 root.append(el('header',{class:'v3-procedure-header'},[
  text('span','CONFIGURAÇÃO MICROGUIADA','eyebrow'),
  text('h2','Faça no produto, entenda o controle e teste o resultado'),
  text('p','Abra cada procedimento. O roteiro indica a área administrativa, o motivo da configuração, a evidência esperada e o diagnóstico inicial. Os nomes de telas podem variar por versão.','muted')
 ]));
 const steps=el('div',{class:'v3-procedures'});
 ch.tasks.forEach((task,i)=>steps.append(uxHowToTask(ch,task,lab.id,i)));root.append(steps);
 const detailed=exSection('Checklist operacional complementar',false);
 detailed.append(text('p','Estes passos mantêm o roteiro original e podem ser usados como lista de verificação ou aprofundamento.','muted'));
 const old=el('div',{class:'step-list'});lab.steps.forEach((s,i)=>{
   const row=el('label',{class:'step-row'}),input=el('input',{type:'checkbox'});
   input.checked=(labStepState[lab.id]||{})[i]===true;
   input.onchange=()=>{labStepState[lab.id]??={};labStepState[lab.id][i]=input.checked;persist()};
   row.append(input,text('span',String(i+1).padStart(2,'0'),'step-counter'),text('span',s));old.append(row)
 });detailed.append(old);root.append(detailed);
 const checks=exSection('Validação corporativa: aceite e evidências',true);
 checks.append(text('p','Critérios mínimos que demonstram que o controle funciona. Não use tokens, senhas nem dados reais em capturas.','muted'));
 checks.append(exList(ch.verify,false));
 lab.evidence.forEach((item,i)=>{
  const label=el('label',{class:'check-evidence'}),input=el('input',{type:'checkbox'});
  input.checked=(labState[lab.id]||{})[i]===true;
  input.onchange=()=>{labState[lab.id]??={};labState[lab.id][i]=input.checked;persist()};
  label.append(input,text('span',item));checks.append(label)
 });
 const mode=el('select',{class:'field','aria-label':'Modalidade realmente utilizada no capítulo'});
 [['','Qual foi a modalidade da execução?'],['real','Executado no produto real de laboratório'],['simulado','Simulação em ferramenta alternativa'],['teorico','Apenas estudo teórico']].forEach(([value,title])=>mode.append(el('option',{value,text:title})));
 mode.value=labModes[lab.id]||'';mode.onchange=()=>{labModes[lab.id]=mode.value;persist()};
 checks.append(mode,text('p','Checklist autodeclarado; imagens, logs e documentos ficam sob sua responsabilidade, fora do Pages.','caption'));root.append(checks);
 const troubleshooting=exSection('Incidentes e plano de reversão',false);
 troubleshooting.append(exBox('Causa provável e triagem',lab.troubleshooting),exBox('Reversão e limpeza',lab.cleanup),
  exBox('Se faltar licença ou dispositivo',lab.fallback));root.append(troubleshooting);
 const related=exSection('Teoria relacionada e documentação oficial',false);
 const links=el('div',{class:'compact-list'});
 lab.modules.forEach(i=>{if(modules[i])links.append(uxButton(modules[i][1],()=>openModule(i),'btn tiny'))});
 related.append(links,exLink(lab.ref,'Fonte do laboratório ↗'));
 (ch.docs||[]).forEach(url=>related.append(exLink(url,'Complemento oficial ↗')));root.append(related);
 const next=el('div',{class:'v3-lab-next'});
 if(idx>0)next.append(uxButton('← Capítulo anterior',()=>goCompany(LABS[idx-1].id),'btn'));
 if(idx<LABS.length-1)next.append(uxButton('Próximo capítulo →',()=>goCompany(LABS[idx+1].id),'btn primary'));
 else next.append(uxButton('Revisar roadmap →',goStudy,'btn primary'));
 root.append(next);return root
}
function experienceLabs(){
 const l=LABS.find(x=>x.id===activeLab);
 return l?uxLabDetail(l):uxLabOverview()
}
