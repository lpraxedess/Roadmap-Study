'use strict';
/* Navegação em quatro destinos: Início, Jornada (estudo + laboratório), Arquitetura e Certificações. */
(() => {
 const hashes={overview:'visao-geral',studies:'estudos',architecture:'arquitetura',certifications:'certificacoes'};
 const views=[...document.querySelectorAll('[data-page-view]')];
 const links=[...document.querySelectorAll('[data-page]')];
 const sidebar=document.getElementById('sidebar'),scrim=document.getElementById('nav-scrim');
 const menuToggle=document.getElementById('menu-toggle'),menuClose=document.getElementById('menu-close');
 const mobile=matchMedia('(max-width: 980px)');
 let drawer=false;
 function setDrawer(open,restoreFocus=true){
  const next=Boolean(open&&mobile.matches);
  if(drawer===next&&sidebar.inert===Boolean(mobile.matches&&!next))return;
  drawer=next;
  document.body.classList.toggle('nav-open',drawer);
  menuToggle.setAttribute('aria-expanded',String(drawer));
  menuToggle.setAttribute('aria-label',drawer?'Fechar menu de navegação':'Abrir menu de navegação');
  sidebar.inert=mobile.matches&&!drawer;
  document.getElementById('main-content').inert=drawer;
  document.getElementById('site-footer').inert=drawer;
  if(drawer){
   sidebar.setAttribute('role','dialog');sidebar.setAttribute('aria-modal','true');
   menuClose.focus();
  }else{
   sidebar.removeAttribute('role');sidebar.removeAttribute('aria-modal');
   if(restoreFocus&&mobile.matches)menuToggle.focus();
  }
 }
 menuToggle.addEventListener('click',()=>setDrawer(!drawer));
 menuClose.addEventListener('click',()=>setDrawer(false));
 scrim.addEventListener('click',()=>setDrawer(false));
 mobile.addEventListener('change',()=>setDrawer(false,false));
 document.addEventListener('keydown',event=>{
  if(!drawer)return;
  if(event.key==='Escape'){event.preventDefault();setDrawer(false);return;}
  if(event.key!=='Tab')return;
  const focusable=[...sidebar.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.getClientRects().length);
  if(!focusable.length)return;
  const first=focusable[0],last=focusable[focusable.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 });

 const prefersReduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 let current=null;
 function swap(page,options={}){
  if(current===page){
   if(page==='studies'&&options.list!==false)window.IAMApp?.showStudyList();
   return;
  }
  if(page==='studies'&&options.list!==false)window.IAMApp?.showStudyList();
  if(page==='architecture'){window.IAMArchitecture?.render();window.IAMAtlas?.render();}
  if(page==='overview')window.IAMHome?.render();
  for(const view of views){
   view.hidden=view.dataset.pageView!==page;
   view.classList.remove('view-entering');
   if(!view.hidden){void view.offsetWidth;view.classList.add('view-entering');}
  }
  for(const a of links){
   const active=a.dataset.page===page;
   a.classList.toggle('is-active',active);
   if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  }
  current=page;
 }
 function show(page,options={}){
  if(drawer)setDrawer(false,false);
  if(page==='lab')page='studies';
  if(!hashes[page])page='overview';
  const update=()=>swap(page,options);
  // Entrada animada síncrona: preserva foco, rolagem e deep links para passos do atlas.
  update();
  if(options.history!==false&&location.hash!=='#'+hashes[page])history.pushState(null,'','#'+hashes[page]);
  if(options.focus!==false){
   const heading=document.getElementById('page-'+page)?.querySelector('h1,h2');
   heading?.focus({preventScroll:true});
   window.scrollTo({top:0,behavior:'instant'});
  }
  return page;
 }
 function focusTarget(id,section){
  show(section,{history:false,focus:false,list:section!=='studies'});
  const target=document.getElementById(id);if(!target)return;
  for(let parent=target;parent;parent=parent.parentElement)if(parent.tagName==='DETAILS')parent.open=true;
  const focusable=target.querySelector('h2,h3,h4,summary')||target;
  if(focusable.tabIndex<0)focusable.tabIndex=-1;
  focusable.focus({preventScroll:true});
  target.scrollIntoView({block:'start',behavior:prefersReduced()?'instant':'smooth'});
 }
 function labTarget(){
  show('studies',{history:false,focus:false});
  const env=document.getElementById('study-environment');
  if(!env)return;
  env.open=true;
  env.scrollIntoView({block:'start',behavior:prefersReduced()?'instant':'smooth'});
  const summary=env.querySelector('summary');summary?.focus({preventScroll:true});
 }
 function route(){
  if(drawer)setDrawer(false,false);
  const hash=decodeURIComponent(location.hash.slice(1));
  if(hash.startsWith('arch-')){focusTarget(hash,'architecture');return;}
  if(hash.startsWith('task-')||hash.startsWith('module-')){
   show('studies',{history:false,focus:false,list:false});
   requestAnimationFrame(()=>window.IAMApp?.reveal(hash,{keepHash:true}));
   return;
  }
  if(hash==='laboratorio'||hash==='study-environment'){labTarget();return;}
  if(hash==='backup-title'){focusTarget('backup-title','overview');return;}
  if(hash==='main-content'){document.getElementById('main-content')?.focus();return;}
  const page=Object.keys(hashes).find(key=>hashes[key]===hash)||'overview';
  show(page,{history:false,focus:true});
 }
 document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]');if(!a)return;
  const hash=a.getAttribute('href').slice(1);
  if(!hash||hash==='main-content')return;
  e.preventDefault();
  if(drawer)setDrawer(false,false);
  if(hash.startsWith('arch-')){
   if(location.hash!=='#'+hash)history.pushState(null,'','#'+hash);
   focusTarget(hash,'architecture');
  }else if(hash.startsWith('task-')||hash.startsWith('module-')){
   window.IAMApp?.reveal(hash);
  }else if(hash==='laboratorio'||hash==='study-environment'){
   if(location.hash!=='#laboratorio')history.pushState(null,'','#laboratorio');
   labTarget();
  }else if(hash==='backup-title'){
   if(location.hash!=='#backup-title')history.pushState(null,'','#backup-title');
   focusTarget('backup-title','overview');
  }else {
   const page=Object.keys(hashes).find(key=>hashes[key]===hash)||a.dataset.page||'overview';
   show(page);
  }
 });
 window.addEventListener('popstate',route);
 window.addEventListener('hashchange',route);
 // Prioridade do percurso IAM, não obrigação formal de certificação do fornecedor.
 // A SC-300 é o marco central desta trilha. As demais classificações são editoriais.
 const mandatory=new Set(['sc300']);
 const recommended=new Set(['sc900','az900','sc100']);
 const priorityNames={required:'Obrigatória na trilha',recommended:'Recomendada',optional:'Opcional',earned:'Concluída'};
 function plannedPriority(cert){
  if(mandatory.has(cert.id))return 'required';
  if(recommended.has(cert.id))return 'recommended';
  return 'optional';
 }
 function effectivePriority(cert,status){return status==='earned'?'earned':plannedPriority(cert);}
 function priorityLabel(priority){
  const badge=node('span','cert-priority cert-priority--'+priority);
  const light=node('span','cert-light cert-light--'+priority);
  light.setAttribute('aria-hidden','true');
  badge.append(light,node('span','cert-priority-label',priorityNames[priority]));
  return badge;
 }
 function renderCertifications(){
  const state=IAMApp.getState();
  const provider=document.getElementById('cert-provider').value;
  const priorityFilter=document.getElementById('cert-priority').value;
  const list=document.getElementById('certification-levels');
  list.replaceChildren();
  let count=0;
  const priorityOrder={required:0,recommended:1,optional:2,earned:3};
  for(const [level,title] of [['beginner','Fundamentos'],['intermediate','Especialização IAM'],['advanced','Arquitetura e carreira sênior']]){
   const certs=CERTIFICATIONS.filter(cert=>{
    if(cert.level!==level||(provider!=='all'&&cert.issuer!==provider))return false;
    const priority=effectivePriority(cert,state.certifications[cert.id]||'planned');
    return priorityFilter==='all'||priority===priorityFilter;
   }).sort((a,b)=>{
    const aP=plannedPriority(a),bP=plannedPriority(b);
    return priorityOrder[aP]-priorityOrder[bP]||a.code.localeCompare(b.code);
   });
   if(!certs.length)continue;
   const section=node('section','cert-level');
   const head=node('div','cert-level-heading');
   head.append(node('h2','',title),node('span','cert-level-total',certs.length+' opções'));
   section.append(head);
   const grid=node('div','cert-list');
   for(const cert of certs){
    count++;
    const status=state.certifications[cert.id]||'planned';
    const priority=effectivePriority(cert,status);
    const card=node('article','cert-card cert-card--compact');
    card.dataset.priority=priority;
    const top=node('div','cert-card-top');
    top.append(node('span','cert-code',cert.code),priorityLabel(priority));
    card.append(top,node('h3','cert-card-title',cert.title));
    const context=node('div','cert-card-context');
    context.append(node('span','cert-issuer',cert.issuer),node('span','cert-card-category',cert.category));
    card.append(context,node('p','cert-card-summary',cert.summary));
    const controls=node('div','cert-card-controls');
    const label=node('label','field-label','Meu progresso'),select=node('select','cert-select');
    select.id='cert-'+cert.id;label.htmlFor=select.id;
    select.setAttribute('aria-label','Progresso da certificação '+cert.code);
    for(const [value,title] of [['planned','Planejada'],['studying','Em preparação'],['earned','Concluída']]){
     const option=node('option','',title);option.value=value;select.append(option);
    }
    select.value=status;
    select.addEventListener('change',()=>{
     IAMApp.commit(d=>{d.certifications[cert.id]=select.value;});
     // Alterar status modifica a luz de imediato e reordena o conjunto quando filtrado.
     if(document.getElementById('cert-priority').value!=='all'){renderCertifications();return;}
     const newPriority=effectivePriority(cert,select.value);
     card.dataset.priority=newPriority;
     top.querySelector('.cert-priority')?.replaceWith(priorityLabel(newPriority));
     updateCertCount();
    });
    controls.append(label,select);
    card.append(controls);
    const details=node('details','cert-more');
    details.append(node('summary','','Conteúdo e requisitos'));
    const content=node('div','cert-more-content');
    content.append(node('p','',cert.prerequisite),node('p','',cert.labs),node('p','',cert.next),external('Abrir programa oficial ↗',cert.url));
    details.append(content);
    card.append(details);
    grid.append(card);
   }
   section.append(grid);list.append(section);
  }
  const empty=document.getElementById('cert-empty');
  if(!count){
   const message=node('p','cert-empty','Nenhuma certificação corresponde aos filtros escolhidos.');
   message.id='cert-empty';list.append(message);
  }else empty?.remove();
  document.getElementById('cert-visible-count').textContent=count+' de '+CERTIFICATIONS.length+' opções';
  updateCertCount();
 }
 function updateCertCount(){
  const s=IAMApp.getState();
  document.getElementById('cert-progress').textContent=Object.values(s.certifications).filter(value=>value==='earned').length+' / '+CERTIFICATIONS.length+' concluídas (autodeclarado)';
 }
 const provider=document.getElementById('cert-provider');
 for(const issuer of [...new Set(CERTIFICATIONS.map(c=>c.issuer))].sort()){
  const option=node('option','',issuer);option.value=issuer;provider.append(option);
 }
 provider.addEventListener('change',renderCertifications);
 document.getElementById('cert-priority').addEventListener('change',renderCertifications);
 window.IAMNavigation={show,renderCertifications,route};
 setDrawer(false,false);
 renderCertifications();route();
})();