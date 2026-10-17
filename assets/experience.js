/* ROADMAP - IAM: utilitários e páginas de módulo/aula. As outras telas estão em assets/v3.js. */
function exNormalize(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR')}

function exSave(){return persist()}

function exJumpLab(labId){activeLab=labId;navigate('labs')}

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


