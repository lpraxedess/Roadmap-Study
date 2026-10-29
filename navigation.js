'use strict';
/* Navegação em quatro destinos: Início, Jornada (estudo + laboratório), Arquitetura e Certificações. */
(() => {
 const hashes={overview:'visao-geral',studies:'estudos',architecture:'arquitetura',certifications:'certificacoes'};
 const views=[...document.querySelectorAll('[data-page-view]')];
 const links=[...document.querySelectorAll('[data-page]')];
 const prefersReduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 let current=null;
 function swap(page,options={}){
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
 function renderCertifications(){
  const state=IAMApp.getState(),provider=document.getElementById('cert-provider').value,list=document.getElementById('certification-levels');
  list.replaceChildren();let count=0;
  for(const [level,title] of [['beginner','Fundamentos'],['intermediate','Especialização'],['advanced','Arquitetura e experiência']]){
   const certs=CERTIFICATIONS.filter(c=>c.level===level&&(provider==='all'||c.issuer===provider));if(!certs.length)continue;
   const section=node('section','cert-level');section.append(node('h3','',title));const grid=node('div','cert-list');
   for(const c of certs){
    count++;const card=node('article','cert-card'),top=node('div','cert-card-top');
    top.append(node('span','cert-code',c.code),node('span','muted',c.issuer));
    card.append(top,node('h4','',c.title),node('p','',c.summary));
    const label=node('label','field-label','Meu plano'),select=node('select','cert-select');
    select.id='cert-'+c.id;label.htmlFor=select.id;
    for(const [value,text] of [['planned','Planejada'],['studying','Em preparação'],['earned','Conquistada (autodeclarado)']]){
     const option=node('option','',text);option.value=value;select.append(option);
    }
    select.value=state.certifications[c.id]||'planned';
    select.addEventListener('change',()=>{IAMApp.commit(d=>{d.certifications[c.id]=select.value;});updateCertCount();});
    card.append(label,select);
    const details=node('details','cert-more');
    details.append(node('summary','','Preparação e requisitos'),node('p','',c.prerequisite),node('p','',c.labs),node('p','',c.next),external('Conferir programa oficial',c.url));
    card.append(details);grid.append(card);
   }
   section.append(grid);list.append(section);
  }
  document.getElementById('cert-visible-count').textContent=count+' opções';updateCertCount();
 }
 function updateCertCount(){
  const s=IAMApp.getState();
  document.getElementById('cert-progress').textContent=Object.values(s.certifications).filter(v=>v==='earned').length+' / '+CERTIFICATIONS.length+' marcadas como conquistadas';
 }
 const provider=document.getElementById('cert-provider');
 for(const issuer of [...new Set(CERTIFICATIONS.map(c=>c.issuer))].sort()){
  const option=node('option','',issuer);option.value=issuer;provider.append(option);
 }
 provider.addEventListener('change',renderCertifications);
 window.IAMNavigation={show,renderCertifications,route};
 renderCertifications();route();
})();