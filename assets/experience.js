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
 const root=el('div');root.append(sectionTitle('Mapa de formação IAM','28+ módulos progressivos, sem bloquear exploração. Cada fase conecta os fundamentos aos laboratórios aplicados.','TRILHA DE APRENDIZAGEM'));
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
