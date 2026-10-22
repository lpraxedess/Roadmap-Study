'use strict';
const COST={"free":{"label":"INICIAR GRÁTIS","desc":"Laboratório básico no Entra ID Free ou software open source. Verifique limites e custos de infraestrutura."},"trial":{"label":"LICENÇA OU TRIAL","desc":"A funcionalidade Microsoft pode exigir P1, P2, ID Governance, Intune ou assinatura Azure. Não iniciar teste pago automaticamente."},"hybrid":{"label":"HÍBRIDO / OPEN SOURCE","desc":"Pode executar com AD e ferramenta open source; recursos Microsoft equivalentes não são necessariamente idênticos."}};
const KEY='roadmap-iam-progress-v2',OLD='roadmap-iam-progress-v1',STEP_KEY='roadmap-iam-steps-v1';
const tasks=PHASES.flatMap(p=>p.items),valid=new Set(tasks.map(t=>t.id));
let done=new Set(),checkedSteps=new Set(),filter='all',query='',storageAvailable=true;
const stepIds=new Set(PHASES.flatMap(p=>p.items.flatMap(t=>t.guide.steps.map((s,i)=>t.id+'#'+i)))),totalSteps=stepIds.size;
const $=id=>document.getElementById(id);
try{const data=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(data))done=new Set(data.filter(id=>valid.has(id)))}catch{storageAvailable=false}
try{const data=JSON.parse(localStorage.getItem(STEP_KEY)||'[]');if(Array.isArray(data))checkedSteps=new Set(data.filter(id=>stepIds.has(id)))}catch{storageAvailable=false}
const node=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
const svgIcon=name=>{const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','ui-icon');svg.setAttribute('aria-hidden','true');const use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href','#i-'+name);svg.append(use);return svg};
function save(){try{localStorage.setItem(KEY,JSON.stringify([...done]));localStorage.setItem(STEP_KEY,JSON.stringify([...checkedSteps]));storageAvailable=true;message('Progresso salvo neste navegador.')}catch{storageAvailable=false;message('Armazenamento indisponível. Exporte um backup antes de fechar a página.')}}
let toastTimer;
function message(s){
 $('message').textContent=s;
 const toast=$('global-toast');
 if(!toast||s==='Progresso salvo neste navegador.')return;
 toast.textContent=s;toast.classList.add('is-visible');
 clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),3500);
}
function refreshKeepingOpen(selector){const opened=new Set([...document.querySelectorAll('#roadmap-list details[open][id]')].map(d=>d.id));render();for(const id of opened){const item=document.getElementById(id);if(item)item.open=true}if(selector){const target=document.querySelector(selector);if(target)target.focus({preventScroll:true})}}
function updateStepTotals(){$('steps-completed').textContent=checkedSteps.size+' / '+totalSteps+' passos confirmados'}
function render(){
 const n=done.size,total=tasks.length,pct=Math.round(n/total*100);
 $('percent').textContent=pct+'%';$('count').textContent=n+' / '+total+' competências';
 $('progress-fill').style.width=pct+'%';$('progress').setAttribute('aria-valuenow',pct);
 const next=tasks.find(t=>!done.has(t.id));$('next').replaceChildren();if(next){const a=node('a','next-link','Continuar estudos → '+next.title);a.href='#task-'+next.id;a.addEventListener('click',()=>{if(filter!=='all'||query){filter='all';query='';$('search').value='';document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter==='all';b.classList.toggle('active',active);b.setAttribute('aria-pressed',active?'true':'false')});render()}const target=document.getElementById('task-'+next.id);if(target)target.open=true});$('next').append(a)}else $('next').textContent='Todas as competências concluídas.';
 $('phase-total').textContent=PHASES.length+' módulos';$('task-total').textContent=total+' competências';updateStepTotals();
 const continueLink=document.querySelector('.nav-start');
 if(continueLink){continueLink.href=next?'#task-'+next.id:'#roadmap-title';continueLink.textContent=next?'CONTINUAR →':'REVISAR →'}
 const sidebarValue=$('sidebar-progress-value'),sidebarFill=$('sidebar-progress-fill');
 if(sidebarValue)sidebarValue.textContent=pct+'%';
 if(sidebarFill)sidebarFill.style.width=pct+'%';
 const list=$('roadmap-list');list.replaceChildren();let visible=0;
 PHASES.forEach((p,i)=>{
  const items=p.items.filter(t=>(filter==='all'||(filter==='done'?done.has(t.id):!done.has(t.id)))&&[p.title,p.environment,p.outcome,t.title,t.evidence,t.guide.platform,t.guide.where,...t.guide.steps.map(s=>s.text),...t.study.map(s=>s.topic+' '+s.detail),...t.practice.map(s=>s.text)].join(' ').toLocaleLowerCase('pt-BR').includes(query));
  if(!items.length)return;visible+=items.length;
  const card=node('details','phase study-accordion'),head=node('summary','phase-header'),heading=node('div','phase-heading'),idx=node('span','phase-index',String(i+1).padStart(2,'0')),info=node('div'),title=node('h3','',p.title),desc=node('p','',p.desc),count=node('span','phase-count',p.items.filter(t=>done.has(t.id)).length+' / '+p.items.length);
  card.id='module-'+p.id;info.append(title,desc);heading.append(idx,info);head.append(heading,count);card.append(head);
  const blueprint=node('div','module-blueprint'),setup=node('div'),setupTag=node('span','content-label','AMBIENTE NECESSÁRIO'),setupText=node('p','',p.environment),outcome=node('div'),outcomeTag=node('span','content-label','ENTREGA DO MÓDULO'),outcomeText=node('p','',p.outcome),req=node('p','module-requirement','ℹ '+p.requirements);
  setup.append(setupTag,setupText);outcome.append(outcomeTag,outcomeText);blueprint.append(setup,outcome,req);card.append(blueprint);
  const body=node('div','tasks');
  items.forEach(t=>{
   const complete=done.has(t.id),details=node('details','task'+(complete?' done':'')),summary=node('summary','task-summary'),check=node('input','task-check'),name=node('span','task-title',t.title),badge=node('span','task-badge',complete?'Concluído':'Pendente'),chevron=node('span','chevron');
   chevron.append(svgIcon('chevron'));
   check.type='checkbox';check.checked=complete;check.setAttribute('aria-label','Concluir após confirmar os passos: '+t.title);
   check.addEventListener('click',e=>e.stopPropagation());
   check.addEventListener('change',()=>{if(check.checked&&t.guide.steps.some((s,i)=>!checkedSteps.has(t.id+'#'+i))){check.checked=false;details.open=true;const remaining=t.guide.steps.filter((s,i)=>!checkedSteps.has(t.id+'#'+i)).length;message('Confirme os '+remaining+' passos restantes antes de concluir.');const missing=details.querySelector('.step-confirm:not(:checked)');if(missing)missing.focus({preventScroll:true});return}check.checked?done.add(t.id):done.delete(t.id);save();refreshKeepingOpen('details[data-id="'+t.id+'"] .task-check')});
   summary.append(check,name,badge,chevron);details.dataset.id=t.id;details.id='task-'+t.id;details.append(summary);
   const content=node('div','task-content');
   const theory=node('div','content-block'),theoryLabel=node('span','content-label','ESTUDAR'),studyList=node('div','study-list');
   t.study.forEach(s=>{const item=node('div','study-item'),h=node('strong','',s.topic),p=node('p','',s.detail);item.append(h,p);studyList.append(item)});
   theory.append(theoryLabel,studyList);
   const lab=node('div','content-block'),labLabel=node('span','content-label','PRATICAR / VALIDAR'),steps=node('ol','practice-steps');
   t.practice.forEach(s=>{const li=node('li'),h=node('strong','',s.level),p=node('p','',s.text);li.append(h,p);steps.append(li)});
   lab.append(labLabel,steps);
   const link=node('a','resource','Abrir documentação oficial ↗');link.href=t.url;link.target='_blank';link.rel='noopener noreferrer';
   const orientation=node('div','lesson-orientation'),orientationTitle=node('span','content-label','ANTES DE COMEÇAR'),orientationPrereq=node('p','',t.prerequisite),orientationGoal=node('p','', 'Entrega verificável: '+t.evidence);orientation.append(orientationTitle,orientationPrereq,orientationGoal);
   const resource=node('div','lab-resources'),resourceLabel=node('span','content-label','RECURSOS DO LABORATÓRIO'),resourceName=node('p','',t.lab.resource),resourceCost=node('span','cost-tag '+t.cost,COST[t.cost].label),resourceNote=node('p','lab-cost-note',t.lab.costNote);
   resource.append(resourceLabel,resourceCost,resourceName,resourceNote);
   const guided=node('div','guided-lab'),guideHeader=node('div','guided-header'),guideTitle=node('span','content-label','GUIA OPERACIONAL · PASSO A PASSO'),guidePlatform=node('strong','',t.guide.platform),guidePath=node('code','',t.guide.where),guideLink=node('a','guide-link','Abrir plataforma ↗');
   guideLink.href=t.guide.platformUrl;guideLink.target='_blank';guideLink.rel='noopener noreferrer';
   guideHeader.append(guideTitle,guidePlatform,guidePath,guideLink);guided.append(guideHeader);
   const reviewed=t.review==='referencia-conferida',sourceNotice=node('div','source-notice '+(reviewed?'source-reviewed':'source-pending'),reviewed?'Fontes oficiais confrontadas com o roteiro · Não equivale a teste real.':'Referência indicada · Confira menus, requisitos e versão antes de executar.');
   const sourceLinks=node('div','source-links');
   (t.sources?.length?t.sources:[{label:'Documentação da competência',url:t.url}]).forEach(s=>{const a=node('a','',s.label+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';sourceLinks.append(a)});
   guided.append(sourceNotice,sourceLinks);
   const stepCounter=node('div','step-counter'),stepIntro=node('p','step-intro','Confirme um passo depois de executá-lo e verificar o resultado. Identifique simulações nas evidências.');
   const completedForTask=()=>t.guide.steps.filter((s,i)=>checkedSteps.has(t.id+'#'+i)).length;
   stepCounter.textContent=completedForTask()+' / '+t.guide.steps.length+' passos confirmados';guided.append(stepCounter,stepIntro);
   const guideSteps=node('ol','guide-steps');
   t.guide.steps.forEach((step,i)=>{const stepId=t.id+'#'+i,li=node('li','step-row'+(checkedSteps.has(stepId)?' step-checked':'')),h=node('strong','',step.title),p=node('p','',step.text),label=node('label','step-verify'),input=node('input','step-confirm'),caption=node('span','','Executei e conferi este passo');
    input.type='checkbox';input.checked=checkedSteps.has(stepId);input.setAttribute('aria-label','Confirmar '+step.title+' da competência '+t.title);
    input.addEventListener('change',()=>{if(input.checked)checkedSteps.add(stepId);else checkedSteps.delete(stepId);li.classList.toggle('step-checked',input.checked);stepCounter.textContent=completedForTask()+' / '+t.guide.steps.length+' passos confirmados';if(!input.checked&&done.has(t.id)){done.delete(t.id);save();refreshKeepingOpen();return}save();updateStepTotals()});
    label.append(input,caption);li.append(h,p,label);guideSteps.append(li)});
   guided.append(guideSteps);
   const validation=node('div','validation'),validationTitle=node('span','content-label','CRITÉRIO DE CONCLUSÃO'),validationText=node('p','',t.evidence),validationMode=node('span','validation-mode',t.mode);
   validation.append(validationTitle,validationText,validationMode);
   content.append(orientation,resource,theory,lab,guided,validation,link);details.append(content);body.append(details);
  });card.append(body);list.append(card);
 });
 $('empty').hidden=visible!==0;
 const results=$('results-count');if(results){const modules=list.querySelectorAll('.study-accordion').length;results.textContent=modules+' módulos · '+visible+' competências exibidas'}
 if(typeof window.CustomEvent==='function')window.dispatchEvent(new CustomEvent('iam:roadmap-rendered'));
}
const search=$('search');
search.addEventListener('input',e=>{query=e.target.value.trim().toLocaleLowerCase('pt-BR');render()});
search.addEventListener('keydown',event=>{if(event.key==='Escape'&&search.value){event.preventDefault();search.value='';search.dispatchEvent(new Event('input',{bubbles:true}))}});
document.addEventListener('keydown',event=>{
 if(event.defaultPrevented||event.altKey||event.shiftKey)return;
 const target=event.target;
 if(target&&(target.isContentEditable||['INPUT','TEXTAREA','SELECT'].includes(target.tagName)))return;
 if(event.key==='/'||(event.key.toLowerCase()==='k'&&(event.ctrlKey||event.metaKey))){
  event.preventDefault();
  if(document.getElementById('page-studies').hidden)document.querySelector('[data-page="studies"]')?.click();
  search.focus({preventScroll:true});
 }
});
$('collapse-all').addEventListener('click',()=>{
 const modules=[...document.querySelectorAll('#roadmap-list .study-accordion[open]')];
 for(const module of modules){module.querySelectorAll('details[open]').forEach(item=>item.open=false);module.open=false}
 $('collapse-all').classList.add('action-flash');
 setTimeout(()=>$('collapse-all')?.classList.remove('action-flash'),320);
});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b?'true':'false')});render()}));
function getCertificationsForBackup(){try{const value=JSON.parse(localStorage.getItem('roadmap-iam-certifications-v1')||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{}}catch{return {}}}
$('export').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({version:3,completed:[...done],steps:[...checkedSteps],certifications:getCertificationsForBackup(),exportedAt:new Date().toISOString()},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=node('a');a.href=url;a.download='roadmap-iam-backup.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);message('Backup exportado.')});
$('import').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>100000)throw Error('Arquivo muito grande');const data=JSON.parse(await file.text());if(![2,3].includes(data.version)||!Array.isArray(data.completed)||!data.completed.every(id=>typeof id==='string'&&valid.has(id)))throw Error('Formato incompatível');if(data.completed.length>tasks.length)throw Error('Backup contém itens demais');if(data.version===3&&(!Array.isArray(data.steps)||data.steps.length>totalSteps||!data.steps.every(id=>typeof id==='string'&&stepIds.has(id))))throw Error('Passos do backup inválidos');if(data.certifications!==undefined&&(data.certifications===null||typeof data.certifications!=='object'||Array.isArray(data.certifications)||Object.keys(data.certifications).length>30||!Object.entries(data.certifications).every(([key,value])=>/^[a-z0-9-]{1,30}$/.test(key)&&['planned','studying','earned'].includes(value))))throw Error('Plano de certificações inválido');if(!confirm('A importação substituirá seu progresso atual ('+done.size+' competências). Continuar?')){message('Importação cancelada.');return}done=new Set(data.completed);checkedSteps=new Set(data.version===3?data.steps:[]);save();render();if(data.certifications!==undefined){try{localStorage.setItem('roadmap-iam-certifications-v1',JSON.stringify(data.certifications));document.dispatchEvent(new Event('iam:certifications-imported'))}catch{storageAvailable=false}}message(storageAvailable?'Backup importado e salvo.':'Backup importado apenas nesta sessão; exporte uma cópia.')}catch(err){message('Erro: '+err.message)}finally{e.target.value=''}});
$('reset').addEventListener('click',()=>{if(confirm('Apagar competências, passos e plano de certificações deste navegador?')){done.clear();checkedSteps.clear();save();render();try{localStorage.removeItem('roadmap-iam-certifications-v1');document.dispatchEvent(new Event('iam:certifications-imported'))}catch{storageAvailable=false}message(storageAvailable?'Progresso e plano de certificações zerados.':'Progresso zerado apenas nesta sessão; armazenamento indisponível.')}});
render();
try{if(localStorage.getItem(OLD)&&!localStorage.getItem(KEY))message('Novo currículo: o progresso anterior não foi migrado. Exporte seu backup antigo antes de atualizar.')}catch{message('Armazenamento indisponível. Exporte um backup para preservar o progresso.')}
