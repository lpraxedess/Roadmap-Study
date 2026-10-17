/* IAM Atlas · navegação e estudo guiado, sem framework ou requisições externas */
function exNormalize(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR')}
function exSave(){return persist()}
function exJumpLab(labId){activeLab=labId;navigate('labs')}
function exProgressBadge(p){return text('span',p+'%','quiet-badge')}
function exGroupHeading(s){return text('h2',s,'group-heading')}
function exLink(url,label){return el('a',{href:url,target:'_blank',rel:'noopener noreferrer',class:'source-link',text:label})}
function exSection(title,expanded){
 const d=el('details',{class:'study-section'});d.open=!!expanded;
 d.append(text('summary',title));return d
}
function exList(items,ordered=true){
 const root=el(ordered?'ol':'ul',{class:'guide-list'});
 items.forEach(x=>root.append(text('li',x)));return root
}
function exBox(title,body,className='guide-surface'){
 return el('div',{class:className},[text('h3',title),text('p',body)])
}
function exStat(label,value,context=''){
 return el('div',{class:'stat-card'},[text('div',value,'stat-value'),text('strong',label),text('small',context)])
}
function exModuleTile(i){
 const m=modules[i],p=percent(i),row=el('button',{type:'button',class:'module-tile'});
 row.append(el('div',{class:'tile-main'},[
   text('span',m[0],'tile-kicker'),text('strong',m[1]),text('small',m.slice(3).length+' temas · '+(LAB_FOR_MODULE[i]||[]).length+' laboratórios vinculados')
 ]),el('div',{class:'tile-right'},[exProgressBadge(p),meter(p)]));
 row.onclick=()=>openModule(i);return row
}
function exOrderedTopics(){return LEARNING_ORDER.flatMap(i=>modules[i].slice(3).map((name,j)=>({m:i,s:j,name,level:score(i,j),desc:topicGuides[i][j].concept})))}
function exTopicRow(x){
 const row=el('div',{class:'topic-row'});
 const left=el('button',{type:'button',class:'topic-link'});
 left.append(text('strong',x.name),text('small',modules[x.m][1]+' · '+x.desc.slice(0,115)+(x.desc.length>115?'…':'')));
 left.onclick=()=>openSkill(x.m,x.s);
 const side=el('div',{class:'topic-actions'}),key=id(x.m,x.s),fav=!!favorites[key];
 const star=btn(fav?'★':'☆',()=>{favorites[key]=!favorites[key];star.textContent=favorites[key]?'★':'☆';star.setAttribute('aria-pressed',String(!!favorites[key]));exSave()},'favorite-btn');
 star.setAttribute('aria-label',(fav?'Remover dos favoritos: ':'Adicionar aos favoritos: ')+x.name);star.setAttribute('aria-pressed',String(fav));
 side.append(text('span',levels[x.level],'level'+(x.level===3?' master':'')),star);
 row.append(left,side);return row
}
function experienceDashboard(){
 const st=stats(),labsDone=LABS.filter(l=>l.evidence.every((_,i)=>(labState[l.id]||{})[i]===true)).length;
 const root=el('div');
 const hero=el('div',{class:'hero'});
 hero.append(text('div','IAM ATLAS / FORMAÇÃO GUIADA','eyebrow'),text('h1','Construa competências em identidade e acesso'),
 text('p','Teoria independente de fornecedor, aplicação progressiva em Entra ID, Intune, Azure e Purview, e avaliações documentadas.','hero-lead'));
 let cta=el('div',{class:'hero-actions'});
 cta.append(btn('Continuar meus estudos →',()=>{
  let t=exOrderedTopics().find(x=>x.level>0&&x.level<3)||exOrderedTopics().find(x=>x.level===0);
  if(t)openSkill(t.m,t.s);else navigate('review')
 },'btn primary'),btn('Ver laboratórios',()=>{activeLab=null;navigate('labs')},'btn'));
 hero.append(cta);root.append(hero);
 const cards=el('div',{class:'stat-grid'},[
  exStat('Domínio estimado',st.progress+'%','Autoavaliação; não equivale a certificação'),
  exStat('Tópicos dominados',st.mastered+' / '+st.total,'Conhecimento avaliado pelo próprio estudante'),
  exStat('Laboratórios registrados',labsDone+' / '+LABS.length,'Checklist completo, sem validação externa'),
 ]);
 root.append(cards);
 const next=exOrderedTopics().find(x=>x.level>0&&x.level<3)||exOrderedTopics().find(x=>x.level===0);
 let nextPanel=el('div',{class:'next-panel'});
 nextPanel.append(el('div',{},[text('span','PRÓXIMA COMPETÊNCIA','eyebrow'),text('h2',next?next.name:'Revisão e atualização contínuas'),
   text('p',next?modules[next.m][1]+' · '+levels[next.level]:'Percurso marcado integralmente. Revise evidências e novas versões das fontes.','muted')]));
 if(next)nextPanel.append(btn('Abrir aula →',()=>openSkill(next.m,next.s),'btn primary'));
 root.append(nextPanel);
 root.append(exGroupHeading('Percurso de aprendizagem'),text('p','Abra uma fase para ver os módulos. É permitido estudar um assunto fora de ordem quando possuir os pré-requisitos.','muted'));
 root.append(exPhaseSections(false));
 const follow=el('div',{class:'next-panel space-top'});follow.append(el('div',{},[
   text('h2','Portfólio e carreira'),text('p','A cada fase, produza diagrama de arquitetura, evidência de acesso permitido/negado e runbook de diagnóstico. O projeto final reúne essas entregas.','muted')
 ]),btn('Abrir projeto final →',()=>exJumpLab('lab-15'),'btn'));root.append(follow);
 return root
}
function exPhaseSections(openFirst){
 const wrap=el('div',{class:'phases'});
 let groups=[],last='';
 LEARNING_ORDER.forEach(i=>{let phase=LEARNING_PHASE[i];if(phase!==last){groups.push({phase,ids:[]});last=phase}groups[groups.length-1].ids.push(i)});
 groups.forEach((g,j)=>{
   let d=el('details',{class:'phase-panel'});d.open=j===0||!!openFirst;
   const p=Math.round(g.ids.reduce((a,i)=>a+percent(i),0)/g.ids.length);
   d.append(el('summary',{class:'phase-summary'},[text('strong',g.phase),text('span',g.ids.length+' módulos · '+p+'%','phase-meta')]));
   const list=el('div',{class:'phase-content'});g.ids.forEach(i=>list.append(exModuleTile(i)));d.append(list);wrap.append(d)
 });return wrap
}
function experienceRoadmap(){
 const root=el('div');root.append(sectionTitle('Mapa de formação IAM','29 módulos progressivos, sem bloquear exploração. Cada fase conecta os fundamentos aos laboratórios aplicados.','TRILHA DE APRENDIZAGEM'));
 root.append(exPhaseSections(false));root.append(el('div',{class:'next-panel space-top'},[
  el('div',{},[text('h2','Prática paralela'),text('p','Não espere concluir todos os módulos teóricos para praticar. Cada laboratório aponta os assuntos necessários.','muted')]),
  btn('Explorar os laboratórios →',()=>{activeLab=null;navigate('labs')},'btn primary')
 ]));return root
}
function experienceLibrary(){
 let root=el('div');root.append(sectionTitle('Biblioteca IAM','Pesquise por nome, assunto, conceito e módulo. Use os favoritos para montar seu próprio plano de revisão.','ENCONTRE UM TEMA'));
 const box=el('div',{class:'search-panel'});
 const input=el('input',{id:'globalSearch',class:'field search-input',type:'search',placeholder:'Buscar MFA, Graph, SAML, SCIM, RBAC...', 'aria-label':'Buscar tópicos'});input.value=filterQ;
 const category=el('select',{class:'field','aria-label':'Filtrar módulo'});category.append(el('option',{value:'',text:'Todos os módulos'}));
 LEARNING_ORDER.forEach(i=>category.append(el('option',{value:String(i),text:modules[i][1]})));
 const levelsSel=el('select',{class:'field','aria-label':'Filtrar por nível'});
 levelsSel.append(el('option',{value:'',text:'Qualquer nível'}));levels.forEach((l,i)=>levelsSel.append(el('option',{value:String(i),text:l})));
 const fav=el('label',{class:'filter-check'});
 const checkbox=el('input',{type:'checkbox'});fav.append(checkbox,text('span','Somente favoritos'));
 box.append(input,el('div',{class:'filter-row'},[category,levelsSel,fav]));root.append(box);
 const summary=text('p','','muted search-summary'),listing=el('div',{class:'topic-results'});root.append(summary,listing);
 let visible=35;
 const data=exOrderedTopics();
 const display=()=>{
  let q=exNormalize(input.value.trim());filterQ=input.value;
  let selected=category.value,lv=levelsSel.value;
  const arr=data.filter(x=>{
   if(selected!==''&&x.m!==+selected)return false;
   if(lv!==''&&x.level!==+lv)return false;
   if(checkbox.checked&&!favorites[id(x.m,x.s)])return false;
   return !q||exNormalize(x.name+' '+x.desc+' '+modules[x.m][1]).includes(q);
  });
  summary.textContent=arr.length+' tópicos encontrados · exibindo '+Math.min(visible,arr.length);
  listing.replaceChildren();
  arr.slice(0,visible).forEach(x=>listing.append(exTopicRow(x)));
  if(arr.length>visible)listing.append(btn('Mostrar mais '+Math.min(35,arr.length-visible)+' temas',()=>{visible+=35;display()},'btn load-more'));
  if(!arr.length)listing.append(text('p','Nenhum tópico encontrado. Remova filtros ou use um termo mais amplo.','empty'));
 };
 input.oninput=()=>{visible=35;display()};category.onchange=levelsSel.onchange=checkbox.onchange=()=>{visible=35;display()};
 display();return root
}
function experienceModule(){
 const root=el('div'),m=modules[activeModule],p=percent(activeModule),idx=LEARNING_ORDER.indexOf(activeModule);
 root.append(btn('← Ver todos os módulos',()=>navigate('roadmap'),'back-link'),sectionTitle(m[1],m[2],LEARNING_PHASE[activeModule]||m[0]));
 let head=el('div',{class:'module-info'},[exStat('Meu progresso',p+'%',m.slice(3).length+' assuntos neste módulo'),
  exBox('Objetivo técnico',MODULE_EDUCATION[activeModule][1]),
  exBox('Erro conceitual a evitar',MODULE_EDUCATION[activeModule][2])]);
 root.append(head);
 if(idx>0)root.append(el('div',{class:'hint-line'},[
  text('span','Etapa anterior recomendada: '),btn(modules[LEARNING_ORDER[idx-1]][1]+' ↗',()=>openModule(LEARNING_ORDER[idx-1]),'inline-link')
 ]));
 root.append(exGroupHeading('Aulas deste módulo'),text('p','Cada aula possui conceito, pré-requisitos, prática, teste adverso e critério de aceite.','muted'));
 let list=el('div',{class:'topic-results'});m.slice(3).forEach((name,j)=>list.append(exTopicRow({m:activeModule,s:j,name,desc:topicGuides[activeModule][j].concept,level:score(activeModule,j)})));root.append(list);
 let related=LAB_FOR_MODULE[activeModule]||[];
 if(related.length){root.append(exGroupHeading('Laboratórios associados'));let lb=el('div',{class:'compact-list'});
 related.forEach(r=>{let l=LABS.find(x=>x.id===r);if(l)lb.append(btn(l.title+' →',()=>exJumpLab(l.id),'btn'))});root.append(lb)}
 return root
}
function experienceSkill(){
 const m=activeModule,s=activeSkill,key=id(m,s),name=modules[m][s+3],info=LESSONS[key],root=el('div');
 if(!info)return sectionTitle('Conteúdo indisponível','Esta aula não foi encontrada no currículo.','IAM');
 root.append(btn('← '+modules[m][1],()=>openModule(m),'back-link'),
   sectionTitle(name,'Uma aula por competência: compreensão, execução, teste adverso, diagnóstico e fontes.','MÓDULO · '+modules[m][1]));
 const buttons=el('div',{class:'topic-toolbar'});
 const fav=btn(favorites[key]?'★ Favorito':'☆ Favoritar',()=>{favorites[key]=!favorites[key];fav.textContent=favorites[key]?'★ Favorito':'☆ Favoritar';fav.setAttribute('aria-pressed',String(!!favorites[key]));exSave()},'btn tiny');
 fav.setAttribute('aria-pressed',String(!!favorites[key]));
 buttons.append(fav,btn('Compartilhar link',()=>{
   const url=location.href;
   if(typeof navigator!=='undefined'&&navigator.clipboard?.writeText)navigator.clipboard.writeText(url).then(()=>{copyStatus.textContent='Link copiado.'}).catch(()=>{copyStatus.textContent='Copie o endereço do navegador.'});
   else copyStatus.textContent='Copie o endereço do navegador.';
 },'btn tiny'));
 const copyStatus=text('span','','caption');copyStatus.setAttribute('role','status');buttons.append(copyStatus);root.append(buttons);
 const warning=ACCESS_NOTES[m];
 if(warning)root.append(el('div',{class:'notice'},[text('strong','Licenciamento e cuidado: '),text('span',warning)]));
 let theory=exSection('01 · Entenda o conceito e as distinções',true);
 theory.append(exBox('Definição e mecanismo',info.knowledge),exBox('Por que isso importa?',info.significance),exBox('Onde aplicar?',info.context),
  exBox('Conceito que precisa relacionar',info.distinct),exBox('Evite este erro',info.mistake,'guide-surface warning-surface'));
 root.append(theory);
 let practice=exSection('02 · Prepare e execute a prática',true);
 practice.append(text('h3','Antes de começar'),exList(info.requirements,false),
  text('h3','Procedimento'),exList(info.steps),text('p','Use uma conta fictícia, evite recursos de produção e anote alterações necessárias para rollback.','hint-line'));
 root.append(practice);
 let verify=exSection('03 · Teste, investigue e comprove',false);
 verify.append(text('p','Critério de conclusão: '+info.acceptance,'acceptance'),exList(info.tests),
   exBox('Forma de trabalhar',info.discipline));root.append(verify);
 let portability=exSection('04 · Transfira o conceito para outras ferramentas',false);
 portability.append(exBox('Princípio transferível',MODULE_CONTEXT[m]?.[1]||info.distinct),
   exBox('Não assuma equivalência entre fabricantes',MODULE_CONTEXT[m]?.[2]||info.mistake));root.append(portability);
 let related=LAB_FOR_MODULE[m]||[];
 let resources=exSection('05 · Documentação e projeto relacionado',false);
 resources.append(exLink(info.reference,'Abrir documentação técnica deste assunto ↗'));
 if(related.length){resources.append(text('h3','Laboratórios integrados'));const links=el('div',{class:'compact-list'});
 related.slice(0,6).forEach(r=>{let l=LABS.find(x=>x.id===r);if(l)links.append(btn(l.title+' ↗',()=>exJumpLab(r),'btn tiny'))});resources.append(links)}
 root.append(resources);
 let practiceState=lessonChecks[key]||{};
 const assessment=el('section',{class:'study-assessment'});
 assessment.append(text('span','REGISTRO DE APRENDIZAGEM','eyebrow'),text('h2','Minha avaliação'),
   text('p','Autoavaliação separada da evidência: marque apenas tarefas efetivamente realizadas.','muted'));
 const checks=[
  ['theory','Consegui explicar o conceito e suas diferenças sem consultar.'],
  ['practice','Executei a atividade ou identifiquei explicitamente que foi simulação.'],
  ['failure','Testei resultado adverso ou analisei uma falha plausível com correção.']
 ];
 checks.forEach(([k,label])=>{
  const row=el('label',{class:'check-evidence'}),input=el('input',{type:'checkbox'});
  input.checked=practiceState[k]===true;input.onchange=()=>{lessonChecks[key]??={};lessonChecks[key][k]=input.checked;exSave();updateInfo()};
  row.append(input,text('span',label));assessment.append(row)
 });
 let choice=el('select',{class:'field','aria-label':'Natureza da experiência'});
 [['','Natureza da experiência (selecionar)'],['real','Prática executada no produto'],['simulado','Simulação documentada'],['teorico','Estudo teórico / análise']].forEach(([v,t])=>choice.append(el('option',{value:v,text:t})));
 choice.value=practiceState.mode||'';choice.onchange=()=>{lessonChecks[key]??={};lessonChecks[key].mode=choice.value;exSave();updateInfo()};
 assessment.append(choice);
 let lev=el('select',{class:'field','aria-label':'Nível de domínio'});levels.forEach((l,i)=>lev.append(el('option',{value:String(i),text:i+' — '+l})));
 lev.value=String(score(m,s));lev.onchange=()=>{state[key]=Number(lev.value);exSave();updateTop();updateInfo()};assessment.append(lev);
 const msg=text('p','','assessment-note');msg.setAttribute('role','status');
 function updateInfo(){let x=lessonChecks[key]||{},check=checks.filter(([k])=>x[k]===true).length;
 msg.textContent='Critérios autodeclarados: '+check+'/3 · Nível: '+levels[score(m,s)]+
 (score(m,s)>=2&&(!x.practice||!x.mode)?' · Falta indicar natureza/evidência da prática.':'')+
 (x.mode==='simulado'?' · Simulação não equivale à execução no serviço real.':'');
 }
 updateInfo();assessment.append(msg);
 assessment.append(text('h3','Anotações e dúvidas'));let textarea=el('textarea',{class:'field notes','aria-label':'Anotações do tema',placeholder:'O que observei? Quais erros apareceram? Quais dúvidas levar à documentação?'});textarea.value=notes[key]||'';
 textarea.oninput=()=>{notes[key]=textarea.value;exSave()};assessment.append(textarea);
 root.append(assessment);
 const nav=el('div',{class:'topic-next'}),previous=s>0?[m,s-1]:LEARNING_ORDER.indexOf(m)>0?[LEARNING_ORDER[LEARNING_ORDER.indexOf(m)-1],modules[LEARNING_ORDER[LEARNING_ORDER.indexOf(m)-1]].length-4]:null,
 next=s<modules[m].length-4?[m,s+1]:LEARNING_ORDER.indexOf(m)<LEARNING_ORDER.length-1?[LEARNING_ORDER[LEARNING_ORDER.indexOf(m)+1],0]:null;
 if(previous)nav.append(btn('← Aula anterior',()=>openSkill(...previous),'btn'));
 if(next)nav.append(btn('Próxima aula →',()=>openSkill(...next),'btn primary'));
 root.append(nav);return root
}


function experienceLabs(){
 const root=el('div'),lab=LABS.find(x=>x.id===activeLab);
 if(!lab){
   root.append(sectionTitle('Laboratórios progressivos',
   'Roteiros reproduzíveis com preparação, execução, diagnóstico, evidências e limpeza. Marque realização real, simulação ou apenas estudo.','PRÁTICA IAM'));
   const done=LABS.filter(l=>l.evidence.every((_,j)=>(labState[l.id]||{})[j]===true)).length;
   root.append(el('div',{class:'next-panel'},[
     el('div',{},[text('strong',done+' de '+LABS.length+' laboratórios com evidências autodeclaradas'),
       text('p','Todos são ambientes de aprendizagem. Não utilize credenciais corporativas ou recursos de produção.','muted')]),
     btn('Preparar meu laboratório →',()=>exJumpLab('lab-00'),'btn primary')
   ]));
   const list=el('div',{class:'lab-list'});
   LABS.forEach((l,i)=>{
     const total=l.steps.length,steps=(labStepState[l.id]||{}),
     marked=l.steps.filter((_,j)=>steps[j]===true).length;
     const row=el('button',{type:'button',class:'lab-tile'});
     row.append(text('span',String(i+1).padStart(2,'0')+' · '+l.phase,'tile-kicker'),
       text('strong',l.title),text('small',l.goal),
       el('div',{class:'tile-bottom'},[text('span',marked+'/'+total+' etapas executadas'),text('span',labModes[l.id]||'Não classificado','quiet-badge')]),meter(Math.round(marked/total*100)));
     row.onclick=()=>exJumpLab(l.id);list.append(row)
   });root.append(list);return root
 }
 root.append(btn('← Todos os laboratórios',()=>{activeLab=null;navigate('labs')},'back-link'),
 sectionTitle(lab.title,lab.goal,'LABORATÓRIO · '+lab.phase));
 const stepFlags=labStepState[lab.id]||{},checked=lab.steps.filter((_,j)=>stepFlags[j]===true).length;
 const intro=el('div',{class:'lab-intro'});
 intro.append(exBox('Ferramentas e duração',lab.tool+' · '+lab.duration),
   exBox('Licenciamento',lab.license),
   exBox('Resultado esperado',lab.expected));
 root.append(intro,el('div',{class:'notice'},[text('strong','Ambiente seguro: '),text('span',lab.safety)]));
 const modeRow=el('div',{class:'study-assessment'});
 modeRow.append(text('h2','Modalidade do laboratório'),text('p','Identifique se a atividade foi realmente executada no serviço, simulada ou estudada no papel.','muted'));
 const mode=el('select',{class:'field','aria-label':'Modalidade de realização do laboratório'});
 [['','Não classificado'],['real','Executado no serviço / produto'],['simulado','Executado em simulador ou ambiente alternativo'],['teorico','Somente estudo teórico']].forEach(([v,label])=>mode.append(el('option',{value:v,text:label})));
 mode.value=labModes[lab.id]||'';mode.onchange=()=>{labModes[lab.id]=mode.value;exSave()};modeRow.append(mode);
 root.append(modeRow);
 const pre=exSection('01 · Pré-requisitos e preparação',true);
 pre.append(exList(lab.prerequisites,false),exBox('Conhecimentos relacionados',lab.theory.join(' · ')));
 root.append(pre);
 const actions=exSection('02 · Execução passo a passo',true);
 const stepsWrap=el('div',{class:'step-list'});
 const progressText=text('p',checked+' de '+lab.steps.length+' etapas marcadas','caption');progressText.setAttribute('role','status');
 lab.steps.forEach((description,index)=>{
   const row=el('label',{class:'step-row'});
   const check=el('input',{type:'checkbox','aria-label':'Marcar etapa '+(index+1)});
   check.checked=stepFlags[index]===true;
   check.onchange=()=>{labStepState[lab.id]??={};labStepState[lab.id][index]=check.checked;
     exSave();const count=lab.steps.filter((_,j)=>(labStepState[lab.id]||{})[j]===true).length;
     progressText.textContent=count+' de '+lab.steps.length+' etapas marcadas'};
   row.append(check,text('span',String(index+1).padStart(2,'0'),'step-counter'),text('span',description));
   stepsWrap.append(row)
 });
 actions.append(progressText,stepsWrap);root.append(actions);
 const diagnostics=exSection('03 · Verifique e investigue',true);
 diagnostics.append(exBox('Saída esperada',lab.expected),
   exBox('Se não funcionar',lab.troubleshooting),
   exBox('Como desfazer',lab.cleanup));
 root.append(diagnostics);
 const alternative=exSection('04 · Alternativa sem licença / recursos',false);
 alternative.append(exBox('Exercício equivalente ou simulação',lab.fallback),text('p','Registre na modalidade acima: uma simulação não substitui experiência na interface comercial.','muted'));root.append(alternative);
 const checklist=exSection('05 · Evidências de conclusão',true);
 checklist.append(text('p','Guarde evidências sanitizadas fora do site. Estes checks são autodeclarados; não há envio de arquivos a um servidor.','muted'));
 const evState=labState[lab.id]||{};
 lab.evidence.forEach((evidence,index)=>{
   const row=el('label',{class:'check-evidence'}),input=el('input',{type:'checkbox','aria-label':'Evidência '+(index+1)});
   input.checked=evState[index]===true;
   input.onchange=()=>{labState[lab.id]??={};labState[lab.id][index]=input.checked;exSave();update()};
   row.append(input,text('span',evidence));checklist.append(row)
 });
 const summary=text('p','','assessment-note');summary.setAttribute('role','status');
 function update(){
   let n=lab.evidence.filter((_,j)=>(labState[lab.id]||{})[j]===true).length;
   summary.textContent=n+'/'+lab.evidence.length+' evidências marcadas'+(!labModes[lab.id]?' · Informe a modalidade do laboratório.':'')+
   (labModes[lab.id]==='teorico'?' · Somente teoria, sem execução real.':'');
 }
 update();checklist.append(summary);root.append(checklist);
 const related=exSection('06 · Conhecimentos relacionados e leitura oficial',false);
 const links=el('div',{class:'compact-list'});
 lab.modules.forEach(i=>{if(modules[i])links.append(btn(modules[i][1]+' →',()=>openModule(i),'btn tiny'))});
 related.append(links,exLink(lab.ref,'Consultar documentação técnica ↗'));root.append(related);
 return root
}
function experienceCertifications(){
 let root=el('div');
 root.append(sectionTitle('Certificações e competências','Aproveite a teoria como base e use os objetivos oficiais das provas para dirigir seus laboratórios. Os percentuais são autoavaliações, não simulados de exame.','DESENVOLVIMENTO PROFISSIONAL'));
 const principal=['sc900','sc300','az104','md102','sc401','sc100'];
 const renderCert=(cert)=>{
  const p=el('div',{class:'cert-tile'}),ids=CERT_SKILLS[cert.id]||[cert.after],
     goals=ids.reduce((n,i)=>n+modules[i].length-3,0),
     rated=ids.reduce((n,i)=>n+modules[i].slice(3).reduce((v,_,j)=>v+score(i,j),0),0),
     pct=goals?Math.round(rated/(goals*3)*100):0;
  p.append(el('div',{class:'cert-heading'},[text('strong',cert.name),text('span',cert.priority,'quiet-badge')]),
     text('p',cert.about,'muted'),text('p','Preparação: '+cert.preparation,'caption'),text('p','Domínio autodeclarado dos módulos vinculados: '+pct+'%','caption'),meter(pct));
  const tools=el('div',{class:'cert-links'});tools.append(exLink(cert.url,'Objetivos e informações oficiais ↗'));
  let marked=el('label',{class:'filter-check'}),ch=el('input',{type:'checkbox','aria-label':'Marcar obtida: '+cert.name});
  ch.checked=!!certState[cert.id];ch.onchange=()=>{certState[cert.id]=ch.checked;exSave()};
  marked.append(ch,text('span',cert.priority==='Estudo essencial'?'Framework estudado':'Certificação obtida'));tools.append(marked);p.append(tools);
  const linked=exSection('Ver módulos associados',false);
  let buttons=el('div',{class:'compact-list'});
  ids.forEach(i=>buttons.append(btn(modules[i][1],()=>openModule(i),'btn tiny')));linked.append(buttons);p.append(linked);
  return p
 };
 root.append(exGroupHeading('Trilha principal Microsoft'));let grid=el('div',{class:'cert-grid'});
 principal.forEach(id=>{let c=certifications.find(x=>x.id===id);if(c)grid.append(renderCert(c))});root.append(grid);
 const supplementary=certifications.filter(c=>!principal.includes(c.id)&&c.priority!=='Estudo essencial');
 if(supplementary.length){const more=exSection('Certificações complementares e outras plataformas · '+supplementary.length,false),g=el('div',{class:'cert-grid'});supplementary.forEach(c=>g.append(renderCert(c)));more.append(g);root.append(more)}
 const norms=certifications.filter(c=>c.priority==='Estudo essencial');
 if(norms.length){let d=exSection('Normas e frameworks (não são certificações)',false);const g=el('div',{class:'cert-grid'});norms.forEach(c=>g.append(renderCert(c)));d.append(g);root.append(d)}
 root.append(el('div',{class:'notice'},[text('strong','Observação: '),text('span','Os objetivos SC-300 terão versão atualizada a partir de 28/10/2026. Verifique a data de sua prova e os requisitos formais da certificação.')]));
 return root
}
function experienceReview(){
 const root=el('div');root.append(sectionTitle('Revisar conhecimentos',
  'Veja apenas os tópicos relevantes agora. Pesquise, selecione o nível e retorne às competências não consolidadas.','RETENÇÃO E REVISÃO'));
 const toolbar=el('div',{class:'search-panel'});
 const q=el('input',{class:'field search-input',type:'search',placeholder:'Filtrar revisão por assunto...', 'aria-label':'Pesquisar revisão'});
 const level=el('select',{class:'field','aria-label':'Grupo de progresso'});
 [['pending','Não iniciados / estudando'],['0','Não iniciados'],['1','Estudando'],['2','Praticados'],['3','Dominados'],['all','Todos']].forEach(([v,t])=>level.append(el('option',{value:v,text:t})));
 const fav=el('label',{class:'filter-check'}),check=el('input',{type:'checkbox'});
 fav.append(check,text('span','Favoritos'));toolbar.append(q,el('div',{class:'filter-row'},[level,fav]));root.append(toolbar);
 const summary=text('p','','muted'),results=el('div',{class:'topic-results'});root.append(summary,results);
 const topics=exOrderedTopics();let cap=35;
 const draw=()=>{
  let term=exNormalize(q.value);let items=topics.filter(t=>{
   if(term&&!exNormalize(t.name+' '+t.desc+' '+modules[t.m][1]).includes(term))return false;
   if(check.checked&&!favorites[id(t.m,t.s)])return false;
   if(level.value==='pending')return t.level<2;
   if(level.value==='all')return true;
   return String(t.level)===level.value;
  });
  summary.textContent=items.length+' temas nesta revisão';
  results.replaceChildren();items.slice(0,cap).forEach(x=>results.append(exTopicRow(x)));
  if(items.length>cap)results.append(btn('Ver mais temas',()=>{cap+=35;draw()},'btn load-more'));
  if(items.length===0)results.append(text('p','Nenhum tópico corresponde aos filtros.','empty'))
 };
 q.oninput=level.onchange=check.onchange=()=>{cap=35;draw()};draw();return root
}
