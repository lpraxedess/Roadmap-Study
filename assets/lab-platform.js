/* Interface dos dois laboratórios do curso. Estado local, sem comunicação com os ambientes. */
function courseStages(track){
 return track==='onprem'?ONPREM_STAGES:CLOUD_CHAPTER_ORDER.map(id=>{
  const lab=LABS.find(x=>x.id===id);return {id,title:lab.title,goal:lab.goal};
 });
}
function courseStateOf(track,id){
 courseLabState[track]??={};
 courseLabState[track][id]??={steps:{},mode:'',note:''};
 return courseLabState[track][id];
}
function courseStepDone(track,chapter,index){
 return track==='cloud'?(companyStepState[chapter]||{})[index]===true:courseStateOf(track,chapter).steps[index]===true;
}
function courseProgress(track,chapter){
 const total=track==='cloud'?COMPANY_CHAPTERS[chapter].tasks.length:ONPREM_STAGES.find(x=>x.id===chapter).steps.length;
 let done=0;for(let i=0;i<total;i++)if(courseStepDone(track,chapter,i))done++;
 return {done,total,pct:Math.round(100*done/total)};
}
function courseTrackProgress(track){
 const stages=courseStages(track),all=stages.map(x=>courseProgress(track,x.id));
 return {done:all.reduce((s,x)=>s+x.done,0),total:all.reduce((s,x)=>s+x.total,0),
  stagesDone:all.filter(x=>x.done===x.total).length,stageCount:stages.length};
}
function courseSetNav(track=null,chapter=null){
 activeLabTrack=track;activeLabChapter=chapter;navigate('labs');
}
function courseInfo(label,value){
 return el('div',{class:'course-info'},[text('strong',label),text('p',value)]);
}
function courseCheck(title,checked,callback){
 const label=el('label',{class:'course-check'}),box=el('input',{type:'checkbox','aria-label':title});
 box.checked=checked;box.onchange=()=>callback(box.checked);label.append(box,text('span',title));return label;
}
function courseSelect(mode,onchange,description){
 const box=el('select',{class:'field','aria-label':description||'Tipo de execução'});
 [['','Selecione a modalidade'],['real','Executei em laboratório real'],['simulado','Simulação técnica / alternativa'],['teorico','Somente teoria / documentação']].forEach(([v,t])=>box.append(el('option',{value:v,text:t})));
 box.value=mode||'';box.onchange=()=>onchange(box.value);return box;
}
function courseEvidences(mode,note,onchange,title){
 const area=el('div',{class:'course-evidence'});
 area.append(text('h4','Registro da execução'),text('p','Informe modalidade e evidência sanitizada. Não coloque UPN real, credenciais, tokens, QR codes, secrets ou chaves privadas.','muted'));
 const select=courseSelect(mode,m=>onchange(m,input.value),title);
 const input=el('textarea',{class:'field',maxlength:'2500',placeholder:'Data UTC, ator fictício, cenário, esperado x observado, log/ID de correlação sanitizado, diagnóstico, rollback e limitação.'});
 input.value=note||'';input.onchange=()=>onchange(select.value,input.value.slice(0,2500));
 input.onblur=input.onchange;area.append(select,input);return area;
}
function courseSummary(){
 const root=el('div',{class:'course-home'});
 root.append(sectionTitle('Laboratórios IAM · AtlasCorp',
 'Duas jornadas profissionais, com a mesma empresa fictícia. A teoria permanece no Roadmap; esta área contém preparação, configuração, validação, investigação e rollback.','PRÁTICA · DO ZERO À ARQUITETURA'));
 root.append(el('div',{class:'notice'},[text('strong','Regra de execução: '),
  text('span','Todas as etapas são orientações; o site não acessa máquinas nem tenant. Concluído significa autoavaliação. Comece pelo laboratório local e avance ao Cloud quando dominar as bases. Não faça mudanças em produção.')]));
 const cards=el('div',{class:'course-tracks'});
 COURSE_TRACKS.forEach(t=>{
  const p=courseTrackProgress(t.id),card=el('article',{class:'course-track'});
  card.append(text('span',t.subtitle,'eyebrow'),text('h2',t.title),text('p',t.summary,'muted'),
   text('p',p.stagesDone+' / '+p.stageCount+' capítulos · '+p.done+' / '+p.total+' microetapas concluídas','course-counter'),meter(p.total?Math.round(p.done/p.total*100):0));
  card.append(btn('Abrir jornada →',()=>courseSetNav(t.id),'btn primary'));
  root.append(card);
 });
 root.append(text('h2','Como executar com segurança'));
 const ol=exList([
 'Leia a aula correspondente no Roadmap e confira o pré-requisito do capítulo.',
 'Faça snapshot/backups e registre licenciamento e custos antes de cada mudança.',
 'Execute a ação em ambiente próprio, com dados fictícios. Inspecione estado antes e depois.',
 'Faça testes positivos e negativos, consulte logs e documente diagnósticos.',
 'Registre modalidade real/simulada/teórica e resultado no navegador; exporte JSON regularmente.'
 ]);root.append(ol);
 return root;
}
function courseTracks(){
 const track=COURSE_TRACKS.find(t=>t.id===activeLabTrack);
 if(!track)return courseSummary();
 if(activeLabChapter)return activeLabTrack==='onprem'?courseOnpremDetail():courseCloudDetail();
 const root=el('div',{class:'course-overview'});
 root.append(btn('← Todos os laboratórios',()=>courseSetNav(),'back-link'),sectionTitle(track.title,track.summary,track.subtitle));
 root.append(courseInfo('Infraestrutura necessária',track.requirements),courseInfo('Licenças e limites',track.licensing));
 const objectives=el('section',{class:'panel course-board'});objectives.append(text('h2','Competências e entregas'),exList(track.objectives));
 root.append(objectives);
 const progress=courseTrackProgress(track.id);
 root.append(text('p',progress.done+' / '+progress.total+' microetapas · '+progress.stagesDone+' capítulos completos (autodeclarado)','course-counter'),meter(progress.total?Math.round(progress.done/progress.total*100):0));
 const list=el('div',{class:'course-stage-list'});
 courseStages(track.id).forEach((stage,index)=>{
  const p=courseProgress(track.id,stage.id);
  const b=el('button',{type:'button',class:'course-stage'});
  b.append(text('span',String(index+1).padStart(2,'0')+' · '+p.done+'/'+p.total+' microetapas','eyebrow'),
   text('strong',stage.title),text('small',stage.goal),meter(p.pct));b.onclick=()=>courseSetNav(track.id,stage.id);list.append(b);
 });root.append(list);
 root.append(el('p',{class:'muted',text:'Os procedimentos da jornada Cloud reutilizam as 94 tarefas da AtlasCorp e seu histórico original. O laboratório local acrescenta sua própria sequência, com progresso independente.'}));
 return root;
}
function courseStepList(step){
 const ol=el('ol',{class:'course-procedure'});
 const bits=step.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ú0-9])/).map(x=>x.trim()).filter(Boolean);
 (bits.length?bits:[step]).forEach(x=>ol.append(text('li',x)));return ol;
}
function courseOnpremDetail(){
 const stage=ONPREM_STAGES.find(x=>x.id===activeLabChapter);
 if(!stage)return courseSetNav('onprem');
 const root=el('div',{class:'course-detail'}),position=ONPREM_STAGES.indexOf(stage),data=courseStateOf('onprem',stage.id);
 root.append(btn('← Laboratório Presencial',()=>courseSetNav('onprem'),'back-link'),
 sectionTitle(String(position+1).padStart(2,'0')+' · '+stage.title,stage.goal,'ATLASCORP · ON-PREMISES'));
 root.append(courseInfo('Ferramentas e ambiente',stage.tools),
  courseInfo('Pré-condição de segurança','Utilize rede Host-only; até 2 VMs simultâneas; dados de pessoas fictícias; senhas fora do repositório; snapshot antes de mudança com potencial de bloqueio.'));
 const moduleId=COURSE_LOCAL_THEORY[stage.id];
 root.append(btn('Revisar teoria correspondente →',()=>openModule(moduleId),'btn'));
 root.append(text('h2','Execução microdetalhada'));
 stage.steps.forEach((line,i)=>{
  const block=el('details',{class:'course-task'});block.open=i===Object.keys(data.steps||{}).filter(k=>data.steps[k]).length;
  block.append(text('summary',String(i+1).padStart(2,'0')+' · '+line.split(/[.;]/)[0]));
  const body=el('div',{class:'course-task-body'});
  body.append(courseInfo('Ação',line),courseInfo('Como comprovar',i===stage.steps.length-1?stage.allow:'Registre estado anterior e posterior, saída/registro do comando ou configuração, ator, horário UTC e resultado observado.'));
  const checked=courseCheck('Executei ou validei esta microetapa e registrei resultado',data.steps[i]===true,value=>{
   data.steps[i]=value;persist();courseSetNav('onprem',stage.id);
  });body.append(checked);block.append(body);root.append(block);
 });
 const tests=el('section',{class:'panel course-board'});tests.append(text('h2','Validação, caso negativo e reversão'),
 courseInfo('Teste positivo',stage.allow),courseInfo('Teste negativo',stage.deny),
 courseInfo('Rollback / limpeza',stage.rollback),exLink(stage.source,'Documentação oficial / especificação ↗'));root.append(tests);
 root.append(courseEvidences(data.mode,data.note,(mode,note)=>{data.mode=mode;data.note=note;persist();},stage.title));
 root.append(courseBottom('onprem',position,ONPREM_STAGES));
 return root;
}
function courseCloudDetail(){
 const lab=LABS.find(x=>x.id===activeLabChapter),chapter=COMPANY_CHAPTERS[activeLabChapter];
 if(!lab||!chapter)return courseSetNav('cloud');
 const position=CLOUD_CHAPTER_ORDER.indexOf(lab.id),root=el('div',{class:'course-detail'});
 root.append(btn('← Laboratório Cloud',()=>courseSetNav('cloud'),'back-link'),
 sectionTitle(String(position+1).padStart(2,'0')+' · '+lab.title,chapter.incident,'ATLASCORP · CLOUD'));
 root.append(courseInfo('Por que esta etapa existe',chapter.why),
  courseInfo('Resultado profissional esperado',chapter.result),
  courseInfo('Pré-requisito operacional',CLOUD_PREREQUISITES[lab.id]||'Revisar inventário e direitos de uso.'),
  courseInfo('Licenciamento / limites',lab.license+' '+lab.fallback));
 if(chapter.prerequisites?.length)root.append(text('h3','Antes de configurar'),exList(chapter.prerequisites));
 if(chapter.decisions?.length)root.append(text('h3','Decisões de arquitetura'),exList(chapter.decisions));
 if(lab.modules?.length)root.append(btn('Revisar conteúdo do Roadmap →',()=>openModule(lab.modules[0]),'btn'));
 root.append(text('h2','Microprocedimentos da empresa'));
 chapter.tasks.forEach((task,i)=>{
  const complete=courseStepDone('cloud',lab.id,i),block=el('details',{class:'course-task'});
  block.open=!complete&&i===chapter.tasks.findIndex((t,j)=>(companyStepState[lab.id]||{})[j]!==true);
  block.append(text('summary',String(i+1).padStart(2,'0')+' · '+task.title));
  const body=el('div',{class:'course-task-body'});
  if(i>0&&!courseStepDone('cloud',lab.id,i-1))body.append(text('p','Atenção: microetapa anterior ainda não foi marcada; verifique dependências antes de configurar.','course-warning'));
  body.append(courseInfo('Onde configurar / preparar',task.path),
   courseInfo('Ação guiada',task.action),courseInfo('Justificativa de negócio e risco',task.reason),
   courseInfo('Teste positivo / evidência',task.proof),courseInfo('Falha / diagnóstico',task.issue));
  body.append(courseCheck('Concluí esta tarefa e validei o resultado',complete,value=>{
   companyStepState[lab.id]??={};companyStepState[lab.id][i]=value;persist();courseSetNav('cloud',lab.id);
  }));
  const key=stableTaskKey(lab.id,i),e=practiceProof[key]||{};
  body.append(courseEvidences(e.mode,e.note,(mode,note)=>{practiceProof[key]={mode,note};persist();},task.title));
  block.append(body);root.append(block);
 });
 const appendix=el('details',{class:'study-section'});appendix.append(text('summary','Roteiro completo de implementação e pontos adicionais de diagnóstico'));
 appendix.append(exList(lab.steps),courseInfo('Troubleshooting',lab.troubleshooting),
  courseInfo('Limpeza / rollback',lab.cleanup),courseInfo('Alternativa sem licença',lab.fallback));root.append(appendix);
 const done=el('section',{class:'panel course-board'});done.append(text('h2','Critérios de conclusão'));
 done.append(exList(chapter.verify));
 if(lab.evidence?.length)done.append(text('h3','Evidências esperadas'),exList(lab.evidence));
 done.append(exLink(lab.ref,'Referência oficial de apoio ↗'));root.append(done);
 root.append(courseBottom('cloud',position,CLOUD_CHAPTER_ORDER.map(id=>({id}))));
 return root;
}
function courseBottom(track,index,stages){
 const nav=el('div',{class:'course-bottom'});
 if(index>0)nav.append(btn('← Etapa anterior',()=>courseSetNav(track,stages[index-1].id),'btn'));
 if(index<stages.length-1)nav.append(btn('Próxima etapa →',()=>courseSetNav(track,stages[index+1].id),'btn primary'));
 return nav;
}
function experienceLaboratories(){return courseTracks();}
