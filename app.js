'use strict';
const $ = id => document.getElementById(id);
const tasks = PHASES.flatMap(p => p.items);
const orderedTasks=[...tasks].sort((a,b)=>a.sequence-b.sequence);
const guidePositions={},expandedGuides=new Set();
let currentLesson=null;
let storage;
try { storage=window.localStorage; } catch { storage={getItem(){throw Error('indisponível')},setItem(){throw Error('indisponível')}}; }
const readerPositionKey='iam-lesson-reader-position-v1';
const savedPositions=(()=>{
 try{const v=JSON.parse(storage.getItem(readerPositionKey));return v&&typeof v==='object'&&!Array.isArray(v)?v:{}}catch{return {}}
})();
for(const t of tasks){const i=savedPositions[t.id];if(Number.isInteger(i)&&i>=0&&i<t.guide.steps.length)guidePositions[t.id]=i;}
function rememberPosition(id,index){
 const t=tasks.find(x=>x.id===id);
 if(!t||!Number.isInteger(index)||index<0||index>=t.guide.steps.length)return;
 guidePositions[id]=index;
 try{storage.setItem(readerPositionKey,JSON.stringify(guidePositions))}catch{}
}
function restorePositions(data){
 for(const key of Object.keys(guidePositions))delete guidePositions[key];
 if(data&&typeof data==='object'&&!Array.isArray(data))for(const t of tasks){
   const i=data[t.id];if(Number.isInteger(i)&&i>=0&&i<t.guide.steps.length)guidePositions[t.id]=i;
 }
 try{storage.setItem(readerPositionKey,JSON.stringify(guidePositions))}catch{}
}
const store = IAMState.create(PHASES,CERTIFICATIONS,storage);
let state=store.get(), searchTimer, toastTimer;
const filters={query:'',module:'all',level:'all',tech:'all',cert:'all',status:'all',track:'all'};
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function node(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
function link(text,href,cls=''){const el=node('a',cls,text);el.href=href;return el;}
function external(text,url){const a=link(text+' ↗',url);a.target='_blank';a.rel='noopener noreferrer';return a;}
function message(text){$('message').textContent=text;const toast=$('global-toast');toast.textContent=text;toast.classList.add('is-visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),5000);}
function sync(){state=store.get();$('storage-warning').hidden=store.available();}
function commit(change){const ok=store.update(change);sync();if(!ok)message('Não foi possível salvar. Exporte um backup desta sessão antes de sair.');return ok;}
function download(name,text,type='text/plain;charset=utf-8') {const url=URL.createObjectURL(new Blob([text],{type}));const a=link('',url);a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function preserveRender(focusId){const open=[...document.querySelectorAll('#roadmap-list details[open][id]')].map(e=>e.id);const active=focusId||document.activeElement?.id;render();for(const id of open)if($(id))$(id).open=true;if(active&&$(active))$(active).focus({preventScroll:true});}
function resetFilters(){for(const key of Object.keys(filters))filters[key]=key==='query'?'':'all';$('search').value='';for(const id of ['module','level','tech','cert','track'])if($(id+'-filter'))$(id+'-filter').value='all';document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter==='all');b.setAttribute('aria-pressed',String(b.dataset.filter==='all'))});}
function showStudyList(){
 currentLesson=null;document.querySelector('.roadmap').hidden=false;$('lesson-reader').hidden=true;
}
function openLesson(id,focus=true){
 const t=tasks.find(t=>t.id===id);if(!t)return;
 currentLesson=id;document.querySelector('.roadmap').hidden=true;
 const reader=$('lesson-reader');reader.hidden=false;reader.replaceChildren(link('← Voltar à trilha','#estudos','reader-back'),renderLesson(t));
 if(focus){const title=reader.querySelector('h2');title.focus({preventScroll:true});window.scrollTo(0,0);}
}
function reveal(id,options={}){
 const isTask=id.startsWith('task-'),t=tasks.find(t=>'task-'+t.id===id);
 if(isTask&&!t)return;
 if(!isTask&&!PHASES.some(p=>'module-'+p.id===id))return;
 window.IAMNavigation?.show('studies',{history:false,focus:false});
 if(!options.keepHash&&location.hash!=='#'+id)history.pushState(null,'','#'+id);
 if(isTask){commit(d=>{d.lastTask=t.id});dashboard();openLesson(t.id);}
 else {showStudyList();if(!$(id)){resetFilters();render();}$(id)?.scrollIntoView({block:'start'});}
}
function nextTask(){const candidates=orderedTasks;return candidates.find(t=>t.id===state.lastTask&&!state.completed.includes(t.id))||candidates.find(t=>!state.completed.includes(t.id));}
function dashboard(){
 const completed=state.completed.length,real=state.completed.filter(id=>state.modes[id]==='real').length,sim=state.completed.filter(id=>state.modes[id]==='simulation').length,mixed=state.completed.filter(id=>state.modes[id]==='mixed').length;
 const pct=Math.round(completed/tasks.length*100);
 $('percent').textContent=pct+'%';$('count').textContent=completed+' / '+tasks.length+' aulas concluídas';$('progress-fill').style.width=pct+'%';$('progress').setAttribute('aria-valuenow',pct);
 $('real-count').textContent=real;$('simulation-count').textContent=sim;$('mixed-count').textContent=mixed;
 $('sidebar-progress-value').textContent=pct+'%';$('sidebar-progress-fill').style.width=pct+'%';
 if($('nav-progress-value'))$('nav-progress-value').textContent=pct+'%';
 if($('nav-progress-fill'))$('nav-progress-fill').style.width=pct+'%';
 $('phase-total').textContent=PHASES.length+' módulos';$('task-total').textContent=tasks.length+' lições';
 const current=nextTask();$('resume-title').textContent=current?current.title:'Percurso registrado. Revise suas evidências.';
 $('resume-module').textContent=current?PHASES.find(p=>p.items.includes(current)).title:'Práticas e simulações continuam diferenciadas no painel.';
 $('resume-link').href=current?'#task-'+current.id:'#estudos';$('resume-link').textContent=current?'Continuar →':'Revisar →';
 $('legacy-notice').hidden=!state.legacy.length;$('legacy-notice').textContent=state.legacy.length+' lições com histórico anterior preservado. O conteúdo mudou: reconfirme passos, testes e evidência para concluir a nova versão.';
 $('steps-completed').textContent=state.steps.length+' passos e '+state.tests.length+' testes confirmados. Registro pessoal; o portal não verifica seu ambiente.';
 if($('route-choice'))$('route-choice').value=state.track;
 const list=$('module-progress-list');list.replaceChildren();
 for(const p of PHASES){const completed=p.items.filter(t=>state.completed.includes(t.id)).length;const a=link(p.title,'#module-'+p.id,'module-progress-row');a.append(node('span','module-mini-count',completed+' / '+p.items.length));list.append(a);}
 window.IAMHome?.render();
}
function matches(task,phase){
 const cert=CERTIFICATIONS.find(c=>c.id===filters.cert);
 return (filters.module==='all'||filters.module===phase.id)&&(filters.level==='all'||filters.level===task.difficulty)&&(filters.tech==='all'||task.technologies.includes(filters.tech))&&(filters.track==='all'||task.tracks.includes(filters.track))&&(filters.cert==='all'||(cert?.moduleIds||[]).includes(phase.number))&&(filters.status==='all'||(filters.status==='done'?state.completed.includes(task.id):!state.completed.includes(task.id)))&&normalize([phase.title,task.title,...task.study.map(s=>s.topic+' '+s.detail),...task.guide.steps.map(s=>s.text)].join(' ')).includes(normalize(filters.query));
}
function block(title){const e=node('section','lesson-block');e.append(node('h4','',title));return e;}
function checkbox(id,text,checked,onchange){const label=node('label','check-row'),input=node('input');input.type='checkbox';input.id=id;input.checked=checked;input.addEventListener('change',()=>onchange(input.checked));label.append(input,node('span','',text));return label;}
function renderLesson(t){
 const complete=state.completed.includes(t.id),details=node('article','task lesson-reader-card'+(complete?' done':''));details.id='task-'+t.id;
 const summary=node('header','reader-heading'),title=node('h2','',t.title);title.tabIndex=-1;summary.append(title,node('span','task-badge',complete?'Concluída':state.legacy.includes(t.id)?'Revisar':'Em estudo'));details.append(summary);
 summary.addEventListener('click',()=>{if(!details.open){commit(d=>{d.lastTask=t.id});dashboard();}});
 const content=node('div','task-content'),intro=block('Nesta aula');
 intro.append(node('p','lesson-meta',({beginner:'Fundamentos',intermediate:'Intermediário',advanced:'Avançado'}[t.difficulty])+' · '+'Atividade '+String(t.sequence).padStart(2,'0')));
 intro.append(node('p','lesson-action','O que você vai construir: '+t.labAction));
 const lessonContext=node('div','lesson-context');
 const costLabel={free:'Prática gratuita/local',hybrid:'Híbrido · confira pré-requisitos',trial:'Requer avaliação ou licença'}[t.cost]||'Conferir custo';
 const chip=node('span','lesson-chip',costLabel);lessonContext.append(chip);
 lessonContext.append(node('span','lesson-chip',t.guide.steps.length+' passos guiados'));
 const prereqs=(t.prerequisiteIds||[]).map(id=>tasks.find(item=>item.id===id)).filter(Boolean);
 if(prereqs.length){const prerequisite=node('div','lesson-prereqs');prerequisite.append(node('strong','','Antes desta aula: '));for(const previous of prereqs){const ready=state.completed.includes(previous.id);prerequisite.append(link((ready?'✓ ':'↗ ')+previous.title,'#task-'+previous.id));}intro.append(prerequisite);}
 intro.append(lessonContext);
 if(t.cost==='trial')intro.append(node('p','lab-note','Recurso licenciado: confirme elegibilidade, preço e período de avaliação antes de ativar. Use a alternativa documental quando indisponível e registre como simulação.'));
 content.append(intro);
 const study=block('1. Entenda o conceito');for(const item of t.study){study.append(node('h5','',item.topic),node('p','',item.detail));}content.append(study);
 const lab=block('2. Execute e observe');
 const steps=node('ol','guide-steps');
 const firstPending=t.guide.steps.findIndex(step=>!state.steps.includes(t.id+'/'+step.id));
 const active=Math.min(t.guide.steps.length-1,Math.max(0,guidePositions[t.id]??(firstPending<0?t.guide.steps.length-1:firstPending)));
 const showAll=expandedGuides.has(t.id),position=node('p','guide-position','Passo '+(active+1)+' de '+t.guide.steps.length);
 lab.append(position);
 steps.start=showAll?1:active+1;
 for(const s of t.guide.steps){const key=t.id+'/'+s.id,li=node('li','step-row'),inputId='step-'+t.id+'-'+s.id;li.hidden=!showAll&&t.guide.steps.indexOf(s)!==active;li.value=t.guide.steps.indexOf(s)+1;li.append(node('p','step-host','Onde executar: '+s.host),node('h5','',s.title),node('p','',s.text));if(s.why)li.append(node('p','step-why','Por que fazer: '+s.why));
  if(s.command){const pre=node('pre');pre.append(node('code','',s.command));const copy=node('button','copy-code','Copiar');copy.type='button';copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(s.command);message('Comando copiado. Confira placeholders e ambiente antes de executar.')}catch{message('Selecione o comando e copie pelo teclado.')}});if(s.command.split('\n').length>18){const codePanel=node('details','code-panel');codePanel.append(node('summary','','Ver código desta etapa ('+s.command.split('\n').length+' linhas)'),pre,copy);li.append(codePanel);}else li.append(pre,copy);}
  if(s.expected)li.append(node('p','expected','Resultado esperado: '+s.expected));
  li.append(checkbox(inputId,'Etapa conferida',state.steps.includes(key),checked=>{commit(d=>{d.steps=checked?[...d.steps,key]:d.steps.filter(x=>x!==key)});const index=t.guide.steps.indexOf(s);if(checked&&!showAll&&index<t.guide.steps.length-1){rememberPosition(t.id,index+1);preserveRender('step-'+t.id+'-'+t.guide.steps[index+1].id);}else preserveRender(inputId);}));steps.append(li);
 }lab.append(steps);const guideNav=node('div','guide-navigation');for(const [label,delta] of [['← Passo anterior',-1],['Próximo passo →',1]]){const button=node('button','button secondary',label);button.type='button';button.disabled=showAll||(delta<0?active===0:active===t.guide.steps.length-1);button.id='guide-'+(delta<0?'prev-':'next-')+t.id;button.addEventListener('click',()=>{rememberPosition(t.id,active+delta);preserveRender('step-'+t.id+'-'+t.guide.steps[active+delta].id);});guideNav.append(button);}const all=node('button','text-action',showAll?'Mostrar um passo por vez':'Ver todos os passos');all.type='button';all.id='guide-all-'+t.id;all.addEventListener('click',()=>{if(showAll)expandedGuides.delete(t.id);else expandedGuides.add(t.id);preserveRender(all.id);});guideNav.append(all);lab.append(guideNav);content.append(lab);
 const evidence=block('3. Validar e registrar evidência');
 const stepsDone=t.guide.steps.filter(step=>state.steps.includes(t.id+'/'+step.id)).length;
 const criteria=t.acceptance||[];
 const testsDone=criteria.filter(check=>state.tests.includes(t.id+'/'+check.id)).length;
 evidence.append(node('p','muted','Passos conferidos: '+stepsDone+'/'+t.guide.steps.length+' · Critérios de aceite: '+testsDone+'/'+criteria.length+'. Registre apenas verificações feitas no seu laboratório.'));
 const checks=node('div','lesson-acceptance');
 for(const test of criteria){const key=t.id+'/'+test.id;checks.append(checkbox('accept-'+t.id+'-'+test.id,test.text,state.tests.includes(key),checked=>{commit(d=>{d.tests=checked?[...new Set([...d.tests,key])]:d.tests.filter(x=>x!==key)});preserveRender('accept-'+t.id+'-'+test.id);}));}
 evidence.append(checks);
 const status=node('label','field-label','Modalidade da execução');status.htmlFor='mode-'+t.id;
 const mode=node('select','lesson-mode');mode.id='mode-'+t.id;
 for(const [value,label] of [['','Selecione após executar'],['real','Prática real (validada)'],['mixed','Execução parcial / híbrida'],['simulation','Somente simulação ou documentação']]){const opt=node('option','',label);opt.value=value;mode.append(opt);}
 mode.value=state.modes[t.id]||'';
 mode.addEventListener('change',()=>{commit(d=>{if(mode.value)d.modes[t.id]=mode.value;else delete d.modes[t.id]});preserveRender(mode.id);});
 evidence.append(status,mode);
 const notesLabel=node('label','field-label','Evidência e observações (sem segredos)');notesLabel.htmlFor='notes-'+t.id;
 const notes=node('textarea','lesson-notes');notes.id='notes-'+t.id;notes.rows=4;notes.maxLength=6000;notes.placeholder='Onde executei; resultado observado; falha e correção; link/caminho das evidências sanitizadas.';notes.value=state.notes[t.id]||'';
 const saveNotes=node('button','button secondary','Salvar evidência');saveNotes.type='button';
 saveNotes.addEventListener('click',()=>{const value=notes.value.trim();commit(d=>{if(value)d.notes[t.id]=value;else delete d.notes[t.id]});message('Observações salvas localmente. Exporte backup regularmente.');});
 evidence.append(notesLabel,notes,saveNotes);
 const ready=stepsDone===t.guide.steps.length&&testsDone===criteria.length&&!!state.modes[t.id];
 const completion=checkbox('complete-'+t.id,'Marcar aula como concluída',complete,checked=>{if(checked&&!ready){message('Confirme os passos, testes e modalidade antes de concluir.');preserveRender('complete-'+t.id);return;}commit(d=>{d.completed=checked?[...new Set([...d.completed,t.id])]:d.completed.filter(id=>id!==t.id);if(checked)d.legacy=d.legacy.filter(id=>id!==t.id)});preserveRender('complete-'+t.id);});
 if(!ready&&!complete){const input=completion.querySelector('input');input.disabled=true;}
 evidence.append(completion,node('p','muted',ready?'Validações registradas. A conclusão depende da sua confirmação.':'Conclua os passos e critérios acima e selecione a modalidade. Simulação não conta como execução real.'));
 content.append(evidence);
 const index=orderedTasks.findIndex(x=>x.id===t.id),lessonNav=node('nav','lesson-sequence');lessonNav.setAttribute('aria-label','Ordem de construção');if(index>0)lessonNav.append(link('← Tema anterior: '+orderedTasks[index-1].title,'#task-'+orderedTasks[index-1].id));if(index<orderedTasks.length-1)lessonNav.append(link('Próximo tema: '+orderedTasks[index+1].title+' →','#task-'+orderedTasks[index+1].id));content.append(lessonNav);details.append(content);return details;
}
function render(){
 dashboard();const list=$('roadmap-list');list.replaceChildren();let count=0;
 for(const phase of PHASES){const items=phase.items.filter(t=>matches(t,phase));if(!items.length)continue;count+=items.length;
  const card=node('section','study-accordion');card.id='module-'+phase.id;
  const head=node('div','phase-header'),titles=node('span');titles.append(node('span','phase-index',phase.number===0?'INÍCIO':String(phase.number).padStart(2,'0')),node('strong','',phase.title),node('small','',phase.desc));head.append(titles,node('span','phase-count',phase.items.filter(t=>state.completed.includes(t.id)).length+' / '+phase.items.length));card.append(head);
  const blueprint=node('details','module-blueprint');blueprint.append(node('summary','','Sobre este módulo'));blueprint.append(node('p','',phase.environment),node('p','muted',phase.requirements),node('p','expected','Entrega: '+phase.outcome));card.append(blueprint);
  const lessons=node('div','tasks');for(const t of [...items].sort((a,b)=>a.sequence-b.sequence)){const a=link('','#task-'+t.id,'lesson-entry');a.append(node('span','entry-number',String(t.sequence).padStart(2,'0')),node('span','entry-title',t.title),node('span','entry-status',state.completed.includes(t.id)?'✓ Concluída':'Estudar →'));lessons.append(a);}card.append(lessons);list.append(card);
 }
 $('results-count').textContent=count+' de '+tasks.length+' lições';$('empty').hidden=count>0;if(currentLesson)openLesson(currentLesson,false);
}
const reader=node('div','lesson-reader');reader.id='lesson-reader';reader.hidden=true;$('page-studies').append(reader);
for(const p of PHASES){const opt=node('option','',p.title);opt.value=p.id;$('module-filter').append(opt);}
for(const tech of [...new Set(tasks.flatMap(t=>t.technologies))].sort()){const opt=node('option','',tech);opt.value=tech;$('tech-filter').append(opt);}
for(const c of CERTIFICATIONS){const opt=node('option','',c.code);opt.value=c.id;$('cert-filter').append(opt);}
for(const field of ['module','level','tech','cert'])$(field+'-filter').addEventListener('change',e=>{filters[field]=e.target.value;render();});
$('search').addEventListener('input',e=>{filters.query=e.target.value.trim();clearTimeout(searchTimer);searchTimer=setTimeout(render,140);});
$('search').addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();clearTimeout(searchTimer);filters.query='';e.target.value='';render();}});
$('clear-study-filters').addEventListener('click',()=>{resetFilters();render();$('search').focus();});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filters.status=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render();}));
$('collapse-all').addEventListener('click',()=>{document.querySelectorAll('#roadmap-list details[open]').forEach(d=>d.open=false);$('collapse-all').focus();});
$('route-choice')?.addEventListener('change',e=>{commit(d=>{d.track=e.target.value});dashboard();});
document.addEventListener('keydown',e=>{if(e.defaultPrevented||e.altKey||e.shiftKey||e.target.isContentEditable||['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))return;if(e.key==='/'||e.key.toLowerCase()==='k'&&(e.ctrlKey||e.metaKey)){e.preventDefault();window.IAMNavigation?.show('studies');$('search').focus();}});
$('export').addEventListener('click',()=>download('roadmap-iam-backup-v4.json',JSON.stringify({...store.export(),labPlanner:window.IAMLab?.exportState?.(),hardware:window.IAMHardware?.exportState?.(),readerPositions:{...guidePositions}},null,2),'application/json'));
$('import-button').addEventListener('click',()=>$('import').click());
$('import').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>1000000)throw Error('Arquivo maior que 1 MB.');const data=JSON.parse(await file.text());store.validate(data);if(!confirm('Substituir o progresso desta sessão pelo backup?'))return;const saved=store.import(data);if(data.labPlanner)window.IAMLab?.importState?.(data.labPlanner);if(data.hardware)window.IAMHardware?.importState?.(data.hardware);restorePositions(data.readerPositions);sync();render();window.IAMNavigation?.renderCertifications();message(saved?(store.notice()||'Backup importado e salvo.'): 'Importado somente nesta sessão. Exporte um backup antes de sair.');}catch(error){message('Importação não realizada: '+error.message);}finally{e.target.value='';}});
$('reset').addEventListener('click',()=>{if(!confirm('Zerar lições, evidências, certificações, checklist e confirmações de hardware? Exporte antes se deseja guardar o histórico.'))return;const saved=store.reset();window.IAMLab?.reset?.();window.IAMHardware?.reset?.();restorePositions(null);sync();render();window.IAMNavigation?.renderCertifications();message(saved?'Progresso zerado.':'Zerado somente nesta sessão; armazenamento indisponível.');});
window.IAMApp={showStudyList,reveal,render,resetFilters,store,getState:()=>state,commit,message};
sync();render();
if(store.notice())message(store.notice());
