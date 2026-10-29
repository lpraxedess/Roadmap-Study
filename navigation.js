'use strict';
(() => {
 const sidebar=document.getElementById('sidebar'),toggle=document.getElementById('menu-toggle'),close=document.getElementById('menu-close'),scrim=document.getElementById('nav-scrim');
 const mobile=matchMedia('(max-width: 980px)'),views=[...document.querySelectorAll('[data-page-view]')],links=[...document.querySelectorAll('[data-page]')];
 const hashes={overview:'visao-geral',lab:'laboratorio',studies:'estudos',architecture:'arquitetura',certifications:'certificacoes'};
 let drawer=false;
 function setDrawer(open,restore=true){
  drawer=open&&mobile.matches;document.body.classList.toggle('nav-open',drawer);toggle.setAttribute('aria-expanded',String(drawer));
  sidebar.inert=mobile.matches&&!drawer;
  for(const id of ['topbar','main-content','site-footer'])document.getElementById(id).inert=drawer;
  if(drawer){sidebar.setAttribute('role','dialog');sidebar.setAttribute('aria-modal','true');close.focus();}
  else{sidebar.removeAttribute('role');sidebar.removeAttribute('aria-modal');if(restore&&mobile.matches)toggle.focus();}
 }
 function show(page,options={}){
  if(!hashes[page])page='overview';
  setDrawer(false,false);
  if(page==='studies')window.IAMApp?.showStudyList();
  if(page==='architecture')window.IAMArchitecture?.render();
  if(page==='lab')window.IAMLab?.render();
  for(const v of views)v.hidden=v.dataset.pageView!==page;
  for(const a of links){const active=a.dataset.page===page;a.classList.toggle('is-active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');}
  if(options.history!==false&&location.hash!=='#'+hashes[page])history.pushState(null,'','#'+hashes[page]);
  if(options.focus!==false){const title=document.getElementById('page-'+page).querySelector('h1,h2');title.focus({preventScroll:true});window.scrollTo(0,0);}
 }
 function architectureTarget(hash){show('architecture',{history:false,focus:false});const target=document.getElementById(hash);if(target){if(target.tagName==='DETAILS')target.open=true;const title=target.querySelector('h3,summary')||target;title.setAttribute('tabindex','-1');title.focus({preventScroll:true});target.scrollIntoView({block:'start'});}}
 function route(){const hash=location.hash.slice(1);if(hash.startsWith('arch-')){architectureTarget(hash);}else if(hash.startsWith('task-')||hash.startsWith('module-')){show('studies',{history:false,focus:false});requestAnimationFrame(()=>IAMApp.reveal(hash,{keepHash:true}));}else if(hash==='infra-title'||hash==='backup-title'){show('overview',{history:false,focus:false});const el=document.getElementById(hash);el.focus({preventScroll:true});el.scrollIntoView();}else show(Object.keys(hashes).find(k=>hashes[k]===hash)||'overview',{history:false,focus:true});}
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const hash=a.getAttribute('href').slice(1);if(!hash)return;e.preventDefault();if(hash.startsWith('arch-')){if(location.hash!=='#'+hash)history.pushState(null,'','#'+hash);architectureTarget(hash);}else if(hash.startsWith('task-')||hash.startsWith('module-'))IAMApp.reveal(hash);else if(hash==='infra-title'||hash==='backup-title'){show('overview');history.replaceState(null,'','#'+hash);const el=document.getElementById(hash);el.focus({preventScroll:true});el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}else show(Object.keys(hashes).find(k=>hashes[k]===hash)||a.dataset.page||'overview');});
 toggle.addEventListener('click',()=>setDrawer(!drawer));close.addEventListener('click',()=>setDrawer(false));scrim.addEventListener('click',()=>setDrawer(false));
 document.addEventListener('keydown',e=>{if(!drawer)return;if(e.key==='Escape'){e.preventDefault();setDrawer(false);return;}if(e.key!=='Tab')return;const controls=[...sidebar.querySelectorAll('a[href],button')].filter(el=>el.getClientRects().length);const first=controls[0],last=controls.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
 mobile.addEventListener('change',()=>setDrawer(false,false));window.addEventListener('popstate',route);window.addEventListener('hashchange',route);
 function renderCertifications(){
  const state=IAMApp.getState(),provider=document.getElementById('cert-provider').value,list=document.getElementById('certification-levels');list.replaceChildren();let count=0;
  for(const [level,title] of [['beginner','Fundamentos'],['intermediate','Especialização'],['advanced','Arquitetura e experiência']]){
   const certs=CERTIFICATIONS.filter(c=>c.level===level&&(provider==='all'||c.issuer===provider));if(!certs.length)continue;
   const section=node('section','cert-level');section.append(node('h3','',title));const grid=node('div','cert-list');
   for(const c of certs){count++;const card=node('article','cert-card'),top=node('div','cert-card-top');top.append(node('span','cert-code',c.code),node('span','muted',c.issuer));card.append(top,node('h4','',c.title),node('p','',c.summary));
    const label=node('label','field-label','Meu plano'),select=node('select','cert-select');select.id='cert-'+c.id;label.htmlFor=select.id;
    for(const [value,text] of [['planned','Planejada'],['studying','Em preparação'],['earned','Conquistada (autodeclarado)']]){const o=node('option','',text);o.value=value;select.append(o);}select.value=state.certifications[c.id]||'planned';select.addEventListener('change',()=>{IAMApp.commit(d=>{d.certifications[c.id]=select.value});updateCertCount();});card.append(label,select);
    const details=node('details','cert-more');details.append(node('summary','','Preparação e requisitos'),node('p','',c.prerequisite),node('p','',c.labs),node('p','',c.next),external('Conferir programa oficial',c.url));card.append(details);grid.append(card);
   }section.append(grid);list.append(section);
  }document.getElementById('cert-visible-count').textContent=count+' opções';updateCertCount();
 }
 function updateCertCount(){const s=IAMApp.getState();document.getElementById('cert-progress').textContent=Object.values(s.certifications).filter(v=>v==='earned').length+' / '+CERTIFICATIONS.length+' marcadas como conquistadas';}
 const provider=document.getElementById('cert-provider');for(const issuer of [...new Set(CERTIFICATIONS.map(c=>c.issuer))].sort()){const o=node('option','',issuer);o.value=issuer;provider.append(o);}provider.addEventListener('change',renderCertifications);
 window.IAMNavigation={show,renderCertifications};setDrawer(false,false);renderCertifications();route();
})();
