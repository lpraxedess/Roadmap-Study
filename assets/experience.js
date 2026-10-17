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
 const root=el('div'),m=modules[activeModule],p=percent(activeModule),sequence=ROADMAP_LEVELS.flatMap(l=>l.ids),idx=sequence.indexOf(activeModule);
 root.append(btn('← Ver todos os módulos',()=>navigate('roadmap'),'back-link'),sectionTitle(m[1],m[2],LEARNING_PHASE[activeModule]||m[0]));
 let head=el('div',{class:'module-info'},[exStat('Meu progresso',p+'%',m.slice(3).length+' assuntos neste módulo'),
  exBox('Objetivo técnico',MODULE_EDUCATION[activeModule][1]),
  exBox('Erro conceitual a evitar',MODULE_EDUCATION[activeModule][2])]);
 root.append(head);
 if(idx>0)root.append(el('div',{class:'hint-line'},[
  text('span','Módulo anterior: '),btn(modules[sequence[idx-1]][1]+' ↗',()=>openModule(sequence[idx-1]),'inline-link')
 ]));
 root.append(exGroupHeading('Aulas deste módulo'),text('p','Leia cada tema e, quando houver uma configuração necessária, aplique-a diretamente na etapa AtlasCorp da própria aula.','muted'));
 let list=el('div',{class:'topic-results'});m.slice(3).forEach((name,j)=>list.append(exTopicRow({m:activeModule,s:j,name,desc:topicGuides[activeModule][j].concept,level:score(activeModule,j)})));root.append(list);

 return root
}


/* Os três campos essenciais pertencem à aula. A AtlasCorp aparece aqui
 * somente se o tema tiver tarefas de aplicação genuína. */
function experienceSkill(){
 const m=activeModule,s=activeSkill,key=id(m,s),name=modules[m][s+3],
       info=LESSONS[key],root=el('div',{class:'lesson-page'});
 if(!info)return sectionTitle('Conteúdo indisponível','A aula não está cadastrada.','ROADMAP');
 const theory=TOPIC_LEARNING[key]||{},
       topicPractical=TOPIC_PRACTICE[key]||[],
       level=ROADMAP_LEVELS.find(t=>t.ids.includes(m));
 root.append(btn('← '+modules[m][1],()=>openModule(m),'back-link'));
 root.append(el('header',{class:'lesson-heading'},[
   text('div',(level?.name||'Roadmap')+' · '+modules[m][1],'eyebrow'),
   text('h1',name),
   text('p','Entenda a tecnologia e a necessidade de negócio antes de aplicá-la.','muted')
 ]));
 const concepts=el('section',{class:'lesson-explanation'});
 const parts=[
  {title:'O que é?',description:theory.definition},
  {title:'Para que serve?',description:theory.purpose},
  {title:'Como funciona?',description:theory.mechanism}
 ];
 parts.forEach((part,i)=>{
  concepts.append(el('div',{class:'lesson-concept'},[
   text('span',String(i+1).padStart(2,'0'),'lesson-index'),
   el('div',{},[text('h2',part.title),text('p',part.description)])
  ]));
 });
 if(theory.contrast)concepts.append(el('div',{class:'lesson-addendum'},[text('strong','Ponto de atenção: '),text('span',theory.contrast)]));
 root.append(concepts);
 const caution=exSection('Como tomar decisões e evitar falhas',false);
 caution.append(
   exBox('Pergunta que um profissional de IAM deve responder',theory.question),
   exBox('Como investigar e decidir',theory.technique),
   exBox('Erro a evitar',theory.risk,'guide-surface warning-surface')
 );
 root.append(caution);
 const check=exSection('Verifique se você compreendeu',false);
 check.append(exBox('Cenário de estudo',theory.scenario),
   exBox('O que deve entregar',theory.evidence),
   exBox('Critério de competência',theory.checkpoint));
 if(!topicPractical.length)check.append(text('p','Este exercício pode ser respondido com análise, diagrama ou explicação; não implica alterar seu tenant.','muted'));
 root.append(check);
 if(topicPractical.length){
  const stage=el('section',{class:'lesson-atlascorp'});
  stage.append(el('header',{class:'lesson-atlascorp-head'},[
   text('span','ETAPA PRÁTICA · ATLASCORP','eyebrow'),
   text('h2','Aplicando '+name+' na empresa'),
   text('p','Você está construindo a mesma empresa fictícia ao longo do Roadmap. As atividades abaixo pertencem a este tema e podem ser realizadas sem sair da aula.','muted')
  ]));
  const taskGroups=new Map;
  topicPractical.forEach(ref=>{
    if(!taskGroups.has(ref.labId))taskGroups.set(ref.labId,[]);
    taskGroups.get(ref.labId).push(ref.taskIndex);
  });
  const summary=text('p','','lesson-progress');
  const setStatus=()=>{
   const completed=topicPractical.filter(ref=>(companyStepState[ref.labId]||{})[ref.taskIndex]===true).length;
   const supported=topicPractical.filter(ref=>{let ev=practiceProof[stableTaskKey(ref.labId,ref.taskIndex)];return (companyStepState[ref.labId]||{})[ref.taskIndex]===true&&!!ev&&ev.mode==='real'}).length;
   summary.textContent=completed+'/'+topicPractical.length+' etapas marcadas · '+supported+' executadas no produto (autodeclarado)';
  };
  setStatus();summary.setAttribute('role','status');stage.append(summary);
  for(const [labId,indices] of taskGroups){
   const lab=LABS.find(x=>x.id===labId),
         chapter=COMPANY_CHAPTERS[labId];
   const group=el('div',{class:'lesson-scenario'});
   group.append(text('h3',lab.title),text('p',chapter.incident,'muted'),
     el('div',{class:'lesson-license'},[
      text('strong','Antes de começar: '),
      text('span',lab.license+' Utilize tenant próprio, usuários fictícios, grupo piloto e plano de reversão quando aplicar políticas.')
     ]));
   for(const taskIndex of indices){
    const task=chapter.tasks[taskIndex],
          done=(companyStepState[labId]||{})[taskIndex]===true;
    const block=el('details',{class:'lesson-step'});block.open=!done&&taskIndex===indices.find(i=>(companyStepState[labId]||{})[i]!==true);
    const heading=text('summary',task.title);block.append(heading);
    const body=el('div',{class:'lesson-step-body'});
    if(taskIndex>0&&(companyStepState[labId]||{})[taskIndex-1]!==true){
      body.append(el('p',{class:'lesson-preflight',text:'Pré-requisito prático ainda não marcado: "'+chapter.tasks[taskIndex-1].title+'". Você pode estudar esta aula, mas evite executar a configuração antes de preparar o ambiente.'}));
      const owner=Object.entries(TOPIC_PRACTICE).find(([otherKey,refs])=>refs.some(ref=>ref.labId===labId&&ref.taskIndex===taskIndex-1));
      if(owner&&owner[0]!==key){
       const [previousModule,previousSkill]=owner[0].split('-').map(Number);
       body.append(btn('Abrir o tema do pré-requisito →',()=>openSkill(previousModule,previousSkill),'btn tiny'));
      }
    }
    for(const [label,value] of [
      ['Onde configurar',task.path],
      ['Como configurar',task.action],
      ['Por que fazer',task.reason],
      ['Como testar o resultado',task.proof],
      ['Se não funcionar',task.issue]
    ]){
     body.append(el('div',{class:'lesson-instruction'},[
      text('strong',label),text('p',value)
     ]));
    }
    const checked=el('label',{class:'lesson-step-check'}),
          input=el('input',{type:'checkbox','aria-label':'Concluir: '+task.title});
    input.checked=done;
    input.onchange=()=>{
      companyStepState[labId]??={};
      companyStepState[labId][taskIndex]=input.checked;
      persist();setStatus();
      block.classList.toggle('completed',input.checked);
    };
    checked.append(input,text('span','Marquei esta etapa e documentei o resultado no ambiente adequado.'));
    body.append(checked);
    const evidenceKey=stableTaskKey(labId,taskIndex),past=practiceProof[evidenceKey]||{};
    const evidence=el('div',{class:'lesson-evidence'});
    evidence.append(text('strong','Como esta etapa foi estudada?'));
    const mode=el('select',{class:'field','aria-label':'Modalidade de execução: '+task.title});
    [['','Selecione a modalidade'],['real','Executei em serviço real de laboratório'],['simulado','Simulei tecnicamente'],['teorico','Somente estudei / analisei']].forEach(([value,title])=>mode.append(el('option',{value,text:title})));
    mode.value=past.mode||'';
    const proofNote=el('textarea',{class:'field lesson-proof-note',maxlength:'2500','aria-label':'Evidência e diagnóstico da tarefa: '+task.title,placeholder:'Evidência sanitizada, objeto usado, cenário permitido/negado, problema e correção. Não inclua senhas, tokens ou dados pessoais.'});
    proofNote.value=past.note||'';
    function updateEvidence(){
      practiceProof[evidenceKey]={mode:mode.value,note:proofNote.value.slice(0,2500)};
      persist();setStatus();
    }
    mode.onchange=updateEvidence;
    proofNote.onchange=updateEvidence;
    proofNote.onblur=updateEvidence;
    evidence.append(mode,proofNote);
    body.append(evidence);
    block.append(body);group.append(block);
   }
   stage.append(group);
  }
  root.append(stage);
 }
 const materials=exSection('Documentação para aprofundar',false);
 materials.append(exLink(theory.source||info.reference,'Fonte de referência do tema ↗'));
 (theory.links||[]).forEach(([label,url])=>materials.append(exLink(url,label+' ↗')));
 if(topicPractical.length){
  const seen=new Set;
  topicPractical.forEach(({labId})=>{
   if(seen.has(labId))return;
   seen.add(labId);
   const lab=LABS.find(x=>x.id===labId);
   if(lab&&lab.ref!==info.reference)materials.append(exLink(lab.ref,'Procedimento oficial complementar ↗'));
   (COMPANY_CHAPTERS[labId].docs||[]).forEach(u=>materials.append(exLink(u,'Orientação oficial adicional ↗')));
  });
 }
 root.append(materials);
 const journal=exSection('Meu progresso e anotações',false);
 const status=el('div',{class:'lesson-grade'});
 status.append(text('span','Autoavaliação · confirme que consegue explicar e aplicar sem consultar','caption'));
 const select=el('select',{class:'field','aria-label':'Grau de conhecimento'});
 levels.forEach((l,i)=>select.append(el('option',{value:String(i),text:i+' — '+l})));
 select.value=String(score(m,s));select.onchange=()=>{
  state[key]=Number(select.value);
  persist();updateTop();
 };
 status.append(select);
 const notesField=el('textarea',{class:'field notes','aria-label':'Minhas anotações',placeholder:'O que aprendi? Que resultado consegui? Execução real ou simulação? Dúvidas para aprofundar.'});
 notesField.value=notes[key]||'';notesField.onchange=()=>{notes[key]=notesField.value;persist()};notesField.onblur=()=>{notes[key]=notesField.value;persist()};
 journal.append(status,notesField);
 root.append(journal);
 const sequence=ROADMAP_LEVELS.flatMap(l=>l.ids),
       modulePos=sequence.indexOf(m);
 const previous=s>0?[m,s-1]:(modulePos>0?[sequence[modulePos-1],modules[sequence[modulePos-1]].length-4]:null);
 const next=s<modules[m].length-4?[m,s+1]:(modulePos<sequence.length-1?[sequence[modulePos+1],0]:null);
 const nav=el('nav',{class:'topic-next','aria-label':'Sequência das aulas'});
 if(previous)nav.append(btn('← Tema anterior',()=>openSkill(...previous),'btn'));
 if(next)nav.append(btn('Próximo tema →',()=>openSkill(...next),'btn primary'));
 root.append(nav);return root
}
