'use strict';
const $ = id => document.getElementById(id);
const tasks = PHASES.flatMap(p => p.items);
let storage;
try { storage=window.localStorage; } catch { storage={getItem(){throw Error('indisponível')},setItem(){throw Error('indisponível')}}; }
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
function resetFilters(){for(const key of Object.keys(filters))filters[key]=key==='query'?'':'all';$('search').value='';for(const id of ['module','level','tech','cert','track'])$(id+'-filter').value='all';document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter==='all');b.setAttribute('aria-pressed',String(b.dataset.filter==='all'))});}
function reveal(id,options={}){
 if(id.startsWith('task-')&&!tasks.some(t=>'task-'+t.id===id)||id.startsWith('module-')&&!PHASES.some(p=>'module-'+p.id===id))return;
 if(!$(id)){resetFilters();render();}
 window.IAMNavigation?.show('studies',{history:false,focus:false});
 const target=$(id);if(!target)return;
 const phase=target.closest('.study-accordion');if(phase)phase.open=true;
 if(target.tagName==='DETAILS')target.open=true;
 if(!options.keepHash&&location.hash!=='#'+id)history.pushState(null,'','#'+id);
 target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
 target.querySelector('summary')?.focus({preventScroll:true});
 if(id.startsWith('task-'))commit(d=>{d.lastTask=id.slice(5)});
}
function nextTask(){const candidates=tasks.filter(t=>t.tracks.includes(state.track));return candidates.find(t=>t.id===state.lastTask&&!state.completed.includes(t.id))||candidates.find(t=>!state.completed.includes(t.id));}
function dashboard(){
 const completed=state.completed.length,real=state.completed.filter(id=>state.modes[id]==='real').length,sim=state.completed.filter(id=>state.modes[id]==='simulation').length,mixed=state.completed.filter(id=>state.modes[id]==='mixed').length;
 const pct=Math.round(completed/tasks.length*100);
 $('percent').textContent=pct+'%';$('count').textContent=completed+' / '+tasks.length+' lições com registro completo';$('progress-fill').style.width=pct+'%';$('progress').setAttribute('aria-valuenow',pct);
 $('real-count').textContent=real;$('simulation-count').textContent=sim;$('mixed-count').textContent=mixed;
 $('sidebar-progress-value').textContent=pct+'%';$('sidebar-progress-fill').style.width=pct+'%';
 $('phase-total').textContent=PHASES.length+' módulos';$('task-total').textContent=tasks.length+' lições';
 const current=nextTask();$('resume-title').textContent=current?current.title:'Percurso registrado. Revise suas evidências.';
 $('resume-module').textContent=current?PHASES.find(p=>p.items.includes(current)).title:'Práticas e simulações continuam diferenciadas no painel.';
 $('resume-link').href=current?'#task-'+current.id:'#estudos';$('resume-link').textContent=current?'Continuar →':'Revisar →';
 $('legacy-notice').hidden=!state.legacy.length;$('legacy-notice').textContent=state.legacy.length+' lições com histórico anterior preservado. O conteúdo mudou: reconfirme passos, testes e evidência para concluir a nova versão.';
 $('steps-completed').textContent=state.steps.length+' passos e '+state.tests.length+' testes confirmados. Registro pessoal; o portal não verifica seu ambiente.';
 $('route-choice').value=state.track;
 const list=$('module-progress-list');list.replaceChildren();
 for(const p of PHASES){const completed=p.items.filter(t=>state.completed.includes(t.id)).length;const a=link(p.title,'#module-'+p.id,'module-progress-row');a.append(node('span','module-mini-count',completed+' / '+p.items.length));list.append(a);}
}
function matches(task,phase){
 const cert=CERTIFICATIONS.find(c=>c.id===filters.cert);
 return (filters.module==='all'||filters.module===phase.id)&&(filters.level==='all'||filters.level===task.difficulty)&&(filters.tech==='all'||task.technologies.includes(filters.tech))&&(filters.track==='all'||task.tracks.includes(filters.track))&&(filters.cert==='all'||(cert?.moduleIds||[]).includes(phase.number))&&(filters.status==='all'||(filters.status==='done'?state.completed.includes(task.id):!state.completed.includes(task.id)))&&normalize([phase.title,task.title,...task.study.map(s=>s.topic+' '+s.detail),...task.guide.steps.map(s=>s.text)].join(' ')).includes(normalize(filters.query));
}
function block(title){const e=node('section','lesson-block');e.append(node('h4','',title));return e;}
function checkbox(id,text,checked,onchange){const label=node('label','check-row'),input=node('input');input.type='checkbox';input.id=id;input.checked=checked;input.addEventListener('change',()=>onchange(input.checked));label.append(input,node('span','',text));return label;}
function renderLesson(t){
 const complete=state.completed.includes(t.id),details=node('details','task'+(complete?' done':''));details.id='task-'+t.id;
 const summary=node('summary','task-summary');summary.append(node('span','task-title',t.title),node('span','task-badge',complete?'Concluída':state.legacy.includes(t.id)?'Revisar':'Pendente'));details.append(summary);
 const content=node('div','task-content'),intro=block('Antes de começar');
 intro.append(node('p','lesson-meta',({beginner:'Fundamentos',intermediate:'Intermediário',advanced:'Avançado'}[t.difficulty])+' · '+t.tracks.map(x=>({local:'Local',microsoft:'Microsoft/híbrido',premium:'Premium'}[x])).join(' / ')),node('p','',t.evidence));
 if(t.prerequisiteIds.length){const list=node('div','prerequisite-links');list.append(node('span','','Preparação: '));for(const id of t.prerequisiteIds){const prev=tasks.find(x=>x.id===id);list.append(link((state.completed.includes(id)?'✓ ':'↗ ')+(prev?.title||id),'#task-'+id));}intro.append(list);}
 intro.append(node('p','muted',t.lab.resource+' '+t.lab.costNote));
 if(t.kit)intro.append(link('↓ Baixar kit Aurora','assets/aurora-lab.zip','button secondary'));
 content.append(intro);
 const study=block('1. Entenda o conceito');for(const item of t.study){study.append(node('h5','',item.topic),node('p','',item.detail));}content.append(study);
 const recall=node('details','recall');recall.append(node('summary','','Explique com suas palavras'),node('p','',t.recall.question));const answer=node('details','answer');answer.append(node('summary','','Conferir explicação'),node('p','',t.recall.answer));recall.append(answer);content.append(recall);
 const lab=block('2. Execute e observe');lab.append(node('p','lesson-platform',t.guide.platform),node('p','muted',t.guide.where));
 const steps=node('ol','guide-steps');
 for(const s of t.guide.steps){const key=t.id+'/'+s.id,li=node('li','step-row'),inputId='step-'+t.id+'-'+s.id;li.append(node('h5','',s.title),node('p','',s.text));
  if(s.command){const pre=node('pre');pre.append(node('code','',s.command));const copy=node('button','copy-code','Copiar');copy.type='button';copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(s.command);message('Comando copiado. Confira placeholders e ambiente antes de executar.')}catch{message('Selecione o comando e copie pelo teclado.')}});li.append(pre,copy);}
  if(s.expected)li.append(node('p','expected','Resultado esperado: '+s.expected));
  li.append(checkbox(inputId,'Conferi esta etapa no modo declarado abaixo',state.steps.includes(key),checked=>{commit(d=>{d.steps=checked?[...d.steps,key]:d.steps.filter(x=>x!==key)});preserveRender(inputId);}));steps.append(li);
 }lab.append(steps);content.append(lab);
 const verification=block('3. Valide os resultados');
 for(const test of t.acceptance){const key=t.id+'/'+test.id,inputId='test-'+t.id+'-'+test.id;verification.append(checkbox(inputId,test.text,state.tests.includes(key),checked=>{commit(d=>{d.tests=checked?[...d.tests,key]:d.tests.filter(x=>x!==key)});preserveRender(inputId);}));}
 verification.append(node('p','challenge','Desafio: '+t.challenge),node('p','muted','Reversão: '+t.rollback));content.append(verification);
 const evidence=block('4. Registre sua execução');const modeLabel=node('label','field-label','Tipo de execução'),select=node('select','execution-mode-select');select.id='mode-'+t.id;
 for(const [value,text] of [['','Selecione'],['real','Prática real — executei todos os critérios'],['mixed','Parcial — parte real, parte simulada'],['simulation','Simulação — somente estudo documental']]){const opt=node('option','',text);opt.value=value;select.append(opt);}select.value=state.modes[t.id]||'';modeLabel.htmlFor=select.id;
 select.addEventListener('change',()=>{commit(d=>{if(select.value)d.modes[t.id]=select.value;else delete d.modes[t.id];d.completed=d.completed.filter(id=>id!==t.id)});preserveRender(select.id);});evidence.append(modeLabel,select);
 const noteLabel=node('label','field-label','Evidência: resultado observado, testes, arquivos locais e limitações'),notes=node('textarea','evidence-notes');notes.id='notes-'+t.id;noteLabel.htmlFor=notes.id;notes.maxLength=6000;notes.rows=4;notes.placeholder='Ex.: FIN 200, JUR 403; E001 único; logs em pasta local. Parte não executada: ... Não inclua segredos.';notes.value=state.notes[t.id]||'';
 notes.addEventListener('change',()=>{commit(d=>{d.notes[t.id]=notes.value});dashboard();const current=state.completed.includes(t.id);details.classList.toggle('done',current);summary.querySelector('.task-badge').textContent=current?'Concluída':'Pendente';const button=$('complete-'+t.id);if(button)button.textContent=current?'Reabrir lição':'Concluir registro';});evidence.append(noteLabel,notes,node('p','muted','Notas ficam neste navegador e no seu backup. O modo é autodeclarado; REAL não é uma validação automática do tenant.'));
 const buttons=node('div','lesson-actions'),finish=node('button','button',complete?'Reabrir lição':'Concluir registro');finish.id='complete-'+t.id;finish.type='button';
 finish.addEventListener('click',()=>{const wasComplete=state.completed.includes(t.id);if(!wasComplete&&!store.canComplete(t.id)){message('Confirme todos os passos e testes, escolha o modo e escreva uma evidência com pelo menos 12 caracteres.');select.focus();return;}commit(d=>{d.completed=wasComplete?d.completed.filter(id=>id!==t.id):[...d.completed,t.id];if(!wasComplete)d.legacy=d.legacy.filter(id=>id!==t.id)});preserveRender(finish.id);});
 const exportEvidence=node('button','button secondary','Baixar evidência');exportEvidence.type='button';exportEvidence.addEventListener('click',()=>download('Aurora-'+t.id+'.md','# '+t.title+'\n\nData: '+new Date().toISOString()+'\nVersão: '+CURRICULUM_VERSION+'\nModo: '+(state.modes[t.id]||'Não definido')+'\n\n'+(state.notes[t.id]||'Sem evidência registrada')+'\n\n'+t.acceptance.map(a=>'- ['+(state.tests.includes(t.id+'/'+a.id)?'x':' ')+'] '+a.text).join('\n')));buttons.append(finish,exportEvidence);evidence.append(buttons);content.append(evidence);
 const sources=block('Referências e limites');for(const source of t.sources)sources.append(external(source.label,source.url));sources.append(node('p','muted','Revisão editorial: '+t.reviewedAt+'. '+(t.testedAt?'Teste registrado: '+t.testedAt:'Procedimento de produto não executado automaticamente pelo portal. Confira a versão, suporte e licenças atuais.')));content.append(sources);
 details.append(content);return details;
}
function render(){
 dashboard();const list=$('roadmap-list');list.replaceChildren();let count=0;
 for(const phase of PHASES){const items=phase.items.filter(t=>matches(t,phase));if(!items.length)continue;count+=items.length;
  const card=node('details','study-accordion');card.id='module-'+phase.id;
  const head=node('summary','phase-header'),titles=node('span');titles.append(node('span','phase-index',phase.number===0?'INÍCIO':String(phase.number).padStart(2,'0')),node('strong','',phase.title),node('small','',phase.desc));head.append(titles,node('span','phase-count',phase.items.filter(t=>state.completed.includes(t.id)).length+' / '+phase.items.length));card.append(head);
  const blueprint=node('div','module-blueprint');blueprint.append(node('p','',phase.environment),node('p','muted',phase.requirements),node('p','expected','Entrega: '+phase.outcome));card.append(blueprint);
  const lessons=node('div','tasks');for(const t of items)lessons.append(renderLesson(t));card.append(lessons);list.append(card);
 }
 $('results-count').textContent=count+' de '+tasks.length+' lições';$('empty').hidden=count>0;
}
for(const p of PHASES){const opt=node('option','',p.title);opt.value=p.id;$('module-filter').append(opt);}
for(const tech of [...new Set(tasks.flatMap(t=>t.technologies))].sort()){const opt=node('option','',tech);opt.value=tech;$('tech-filter').append(opt);}
for(const c of CERTIFICATIONS){const opt=node('option','',c.code);opt.value=c.id;$('cert-filter').append(opt);}
for(const field of ['module','level','tech','cert','track'])$(field+'-filter').addEventListener('change',e=>{filters[field]=e.target.value;render();});
$('search').addEventListener('input',e=>{filters.query=e.target.value.trim();clearTimeout(searchTimer);searchTimer=setTimeout(render,140);});
$('search').addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();clearTimeout(searchTimer);filters.query='';e.target.value='';render();}});
$('clear-study-filters').addEventListener('click',()=>{resetFilters();render();$('search').focus();});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filters.status=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render();}));
$('collapse-all').addEventListener('click',()=>{document.querySelectorAll('#roadmap-list details[open]').forEach(d=>d.open=false);$('collapse-all').focus();});
$('route-choice').addEventListener('change',e=>{commit(d=>{d.track=e.target.value});dashboard();});
document.addEventListener('keydown',e=>{if(e.defaultPrevented||e.altKey||e.shiftKey||e.target.isContentEditable||['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))return;if(e.key==='/'||e.key.toLowerCase()==='k'&&(e.ctrlKey||e.metaKey)){e.preventDefault();window.IAMNavigation?.show('studies');$('search').focus();}});
$('export').addEventListener('click',()=>download('roadmap-iam-backup-v4.json',JSON.stringify(store.export(),null,2),'application/json'));
$('import-button').addEventListener('click',()=>$('import').click());
$('import').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>1000000)throw Error('Arquivo maior que 1 MB.');const data=JSON.parse(await file.text());store.validate(data);if(!confirm('Substituir o progresso desta sessão pelo backup?'))return;const saved=store.import(data);sync();render();window.IAMNavigation?.renderCertifications();message(saved?(store.notice()||'Backup importado e salvo.'): 'Importado somente nesta sessão. Exporte um backup antes de sair.');}catch(error){message('Importação não realizada: '+error.message);}finally{e.target.value='';}});
$('reset').addEventListener('click',()=>{if(!confirm('Zerar lições, evidências e certificações? Exporte antes se deseja guardar o histórico.'))return;const saved=store.reset();sync();render();window.IAMNavigation?.renderCertifications();message(saved?'Progresso zerado.':'Zerado somente nesta sessão; armazenamento indisponível.');});
window.IAMApp={reveal,render,resetFilters,store,getState:()=>state,commit,message};
sync();render();
if(store.notice())message(store.notice());
