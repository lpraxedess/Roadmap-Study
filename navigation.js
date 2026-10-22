'use strict';
// Trilha de certificações revisada com fontes oficiais em 22/10/2026.
// Status = planejamento pessoal, jamais verificação de credencial emitida.
const CERTIFICATIONS=[
 {"id":"sc900","code":"SC-900","level":"beginner","title":"Security, Compliance and Identity Fundamentals","issuer":"Microsoft","category":"Trilha principal","summary":"Fundamentos de identidade, Zero Trust, Microsoft Entra, segurança e conformidade.","labs":"Módulos 01, 03 e 09. Complementar Microsoft Defender e Purview no Microsoft Learn.","prerequisite":"Sem certificação prévia obrigatória. É recomendável conhecer noções de Azure e Microsoft 365.","next":"Explique autenticação, RBAC, MFA, identidade híbrida e governança. Faça a avaliação prática gratuita antes de agendar.","url":"https://learn.microsoft.com/pt-br/credentials/certifications/exams/sc-900/"},
 {"id":"az900","code":"AZ-900","level":"beginner","title":"Azure Fundamentals","issuer":"Microsoft","category":"Complementar","summary":"Conceitos de nuvem, serviços Azure, arquitetura, cobrança e governança.","labs":"Módulos 01–03; estudar computação, rede, armazenamento e custos Azure fora do laboratório IAM.","prerequisite":"Nenhuma certificação formal obrigatória. Útil caso Azure ainda seja novidade.","next":"Explique tenant, assinatura, grupo de recursos, responsabilidade compartilhada e custos.","url":"https://learn.microsoft.com/pt-br/credentials/certifications/azure-fundamentals/"},
 {"id":"cc","code":"ISC2 CC","level":"beginner","title":"Certified in Cybersecurity","issuer":"ISC2","category":"Complementar","summary":"Fundamentos de segurança, controle de acesso, redes, governança e resposta a incidentes.","labs":"Módulos 01, 02 e 09; complemente política de segurança e resposta a incidentes.","prerequisite":"Não exige experiência profissional para a certificação.","next":"Resolva exercícios de princípios de segurança e explique IAM em linguagem de riscos e controles.","url":"https://www.isc2.org/certifications/cc"},
 {"id":"sc300","code":"SC-300","level":"intermediate","title":"Identity and Access Administrator Associate","issuer":"Microsoft","category":"Trilha principal","summary":"Administração de identidades, autenticação, acesso a aplicações, governança e troubleshooting no Entra.","labs":"Módulos 01–07 e 09; destaque Entra, híbrido, SSO, JML, PIM e Microsoft Graph.","prerequisite":"Não exige SC-900. Recomenda experiência com Entra, AD DS, Azure, PowerShell e KQL.","next":"Finalize o laboratório IAM ponta a ponta, revise lacunas do guia oficial e pratique casos de falha.","url":"https://learn.microsoft.com/pt-br/credentials/certifications/identity-and-access-administrator/"},
 {"id":"az104","code":"AZ-104","level":"intermediate","title":"Azure Administrator Associate","issuer":"Microsoft","category":"Complementar","summary":"Administração de Azure com identidade, RBAC, redes, recursos de computação, storage e monitoramento.","labs":"Módulos 01–03 e 07. Exige novos laboratórios Azure além do roadmap IAM.","prerequisite":"Experiência prática com Azure, sistemas operacionais, rede, PowerShell e CLI.","next":"Monte laboratórios próprios de subscriptions, Azure RBAC, redes virtuais, storage e observabilidade.","url":"https://learn.microsoft.com/en-us/credentials/certifications/exams/az-104/"},
 {"id":"sc500","code":"SC-500","level":"intermediate","title":"Cloud and AI Security Engineer Associate","issuer":"Microsoft","category":"Especialização","summary":"Controles de segurança em Azure, identidade, Key Vault, cargas híbridas e sistemas de IA.","labs":"Módulos 03, 06, 07 e 09. Complemente segurança de Azure, infraestrutura e IA.","prerequisite":"Conhecimento prático de administração Azure e identidades; vai além de IAM.","next":"Estude Key Vault, identidades gerenciadas, Defender for Cloud e governança de workloads de IA.","url":"https://learn.microsoft.com/en-us/credentials/certifications/cloud-and-ai-security-engineer-associate"},
 {"id":"sc100","code":"SC-100","level":"advanced","title":"Cybersecurity Architect Expert","issuer":"Microsoft","category":"Trilha principal","summary":"Arquitetura Zero Trust, estratégia de segurança, IAM, proteção de infraestrutura e governança.","labs":"Módulos 01–10, projeto final e aprofundamento em arquitetura multinuvem, riscos e segurança além de IAM.","prerequisite":"Para obter o título Expert: SC-100 + uma certificação associada elegível (SC-300, SC-200 ou SC-500).","next":"Apresente arquitetura empresarial, trade-offs, riscos, controles e decisões técnicas documentadas.","url":"https://learn.microsoft.com/pt-br/credentials/certifications/cybersecurity-architect-expert/"},
 {"id":"cissp","code":"CISSP","level":"advanced","title":"Certified Information Systems Security Professional","issuer":"ISC2","category":"Carreira sênior","summary":"Segurança abrangente, arquitetura, gestão de riscos, operações, IAM e governança.","labs":"Todos os módulos IAM; exige estudo adicional dos oito domínios oficiais da prova.","prerequisite":"Certificação completa requer cinco anos de experiência elegível e endosso (consulte regras de redução de experiência).","next":"Acumule experiência verificável e construa visão abrangente de segurança, não apenas de identidade.","url":"https://www.isc2.org/certifications/cissp"},
 {"id":"cism","code":"CISM","level":"advanced","title":"Certified Information Security Manager","issuer":"ISACA","category":"Gestão","summary":"Gestão de segurança da informação, governança, riscos, programa de segurança e incidentes.","labs":"Módulos 05, 06, 09 e 10; complemente com governança organizacional e gestão de riscos.","prerequisite":"Para obter a certificação, cinco anos de experiência profissional em gestão de segurança nos domínios aplicáveis.","next":"Construa casos de negócio, estratégias de tratamento de riscos, indicadores e processos formais.","url":"https://www.isaca.org/credentialing/cism/get-cism-certified"}
];
const CERT_STORAGE_KEY='roadmap-iam-certifications-v1';
const CERT_STATUSES=[
 {value:'planned',text:'Planejada'},
 {value:'studying',text:'Em preparação'},
 {value:'earned',text:'Conquistada'}
];
const CERT_LEVELS=[
 {id:'beginner',title:'Iniciante',caption:'Fundamentos · estabelecer a base',stage:'01'},
 {id:'intermediate',title:'Intermediário',caption:'Execução · especializar em IAM',stage:'02'},
 {id:'advanced',title:'Avançado',caption:'Arquitetura · consolidar experiência',stage:'03'}
];
const sidebar=document.getElementById('sidebar');
const drawerToggle=document.getElementById('menu-toggle');
const drawerClose=document.getElementById('menu-close');
const drawerScrim=document.getElementById('nav-scrim');
const responsive=window.matchMedia('(max-width:1050px)');
const reduced=window.matchMedia('(prefers-reduced-motion:reduce)');
function el(tag,cls,content){
 const n=document.createElement(tag);
 if(cls)n.className=cls;
 if(content!==undefined)n.textContent=content;
 return n;
}
function openSidebar(){
 if(!responsive.matches)return;
 document.body.classList.add('nav-open');
 sidebar.inert=false;
 drawerToggle.setAttribute('aria-expanded','true');
 drawerToggle.setAttribute('aria-label','Fechar menu lateral');
 const first=sidebar.querySelector('a.sidebar-link');
 if(first)first.focus({preventScroll:true});
}
function closeSidebar(restoreFocus=false){
 document.body.classList.remove('nav-open');
 drawerToggle.setAttribute('aria-expanded','false');
 drawerToggle.setAttribute('aria-label','Abrir menu lateral');
 sidebar.inert=responsive.matches;
 if(restoreFocus&&responsive.matches)drawerToggle.focus({preventScroll:true});
}
drawerToggle.addEventListener('click',()=>document.body.classList.contains('nav-open')?closeSidebar(true):openSidebar());
drawerClose.addEventListener('click',()=>closeSidebar(true));
drawerScrim.addEventListener('click',()=>closeSidebar(true));
function onViewportChange(){closeSidebar(false)}
if(typeof responsive.addEventListener==='function')responsive.addEventListener('change',onViewportChange);
else if(typeof responsive.addListener==='function')responsive.addListener(onViewportChange);
document.addEventListener('keydown',event=>{
 if(!document.body.classList.contains('nav-open'))return;
 if(event.key==='Escape'){event.preventDefault();closeSidebar(true);return}
 if(event.key!=='Tab')return;
 const controls=[...sidebar.querySelectorAll('a[href],button:not([disabled])')].filter(n=>!n.hidden);
 if(!controls.length)return;
 const first=controls[0],last=controls[controls.length-1];
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
 if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
});
closeSidebar(false);
const menuTarget=document.getElementById('sidebar-modules');
for(const [index,phase] of PHASES.entries()){
 const a=el('a','sidebar-link sidebar-module');
 a.href='#module-'+phase.id;
 a.dataset.navTarget='module-'+phase.id;
 a.setAttribute('aria-label','Módulo '+(index+1)+': '+phase.title);
 const number=el('span','sidebar-module-no',String(index+1).padStart(2,'0'));
 const name=el('span','sidebar-module-name',phase.title);
 const counter=el('span','sidebar-module-progress','0/'+phase.items.length);
 counter.id='sidebar-count-'+phase.id;
 a.append(number,name,counter);menuTarget.append(a);
}
document.getElementById('sidebar-modules-total').textContent=String(PHASES.length);
function refreshModuleProgress(){
 const completed=typeof done!=='undefined'?done:new Set();
 for(const p of PHASES){
  const value=p.items.filter(t=>completed.has(t.id)).length;
  const badge=document.getElementById('sidebar-count-'+p.id);
  if(badge){badge.textContent=value+'/'+p.items.length;badge.classList.toggle('is-complete',value===p.items.length)}
 }
}
function revealNavTarget(targetId){
 let target=document.getElementById(targetId);
 if(!target&&targetId.startsWith('module-')){
  const search=document.getElementById('search');
  if(search&&search.value){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}))}
  const filter=document.querySelector('[data-filter="all"]');
  if(filter&&!filter.classList.contains('active'))filter.click();
  target=document.getElementById(targetId);
 }
 return target;
}
sidebar.addEventListener('click',event=>{
 const a=event.target.closest('a[href^="#"]');
 if(!a)return;
 const id=a.getAttribute('href').slice(1);
 const target=revealNavTarget(id);
 if(!target)return;
 event.preventDefault();
 closeSidebar(false);
 if(history.replaceState)history.replaceState(null,'','#'+id);
 target.scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'start'});
 highlightNav(id);
});
function highlightNav(id){
 sidebar.querySelectorAll('.sidebar-link').forEach(a=>{
  const active=a.dataset.navTarget===id;
  a.classList.toggle('is-active',active);
  if(active)a.setAttribute('aria-current','location');
  else a.removeAttribute('aria-current');
 });
}
let scrollQueued=false;
const navTargets=[...sidebar.querySelectorAll('a[data-nav-target]')].map(a=>a.dataset.navTarget);
function updateActiveNav(){
 scrollQueued=false;
 let active='inicio';
 for(const id of navTargets){
  const target=document.getElementById(id);
  if(target&&target.getBoundingClientRect().top<=178)active=id;
 }
 highlightNav(active);
}
window.addEventListener('scroll',()=>{if(scrollQueued)return;scrollQueued=true;window.requestAnimationFrame(updateActiveNav)},{passive:true});
window.addEventListener('iam:roadmap-rendered',()=>{refreshModuleProgress();if(!scrollQueued){scrollQueued=true;window.requestAnimationFrame(updateActiveNav)}});
refreshModuleProgress();
updateActiveNav();

// Certificações: plano de carreira independente de conclusão das competências.
const certIds=new Set(CERTIFICATIONS.map(c=>c.id));
function loadCertStates(){
 try{
  const parsed=JSON.parse(localStorage.getItem(CERT_STORAGE_KEY)||'{}');
  if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return {};
  return Object.fromEntries(Object.entries(parsed).filter(([id,status])=>certIds.has(id)&&CERT_STATUSES.some(x=>x.value===status)));
 }catch{return {}}
}
let certStates=loadCertStates();
const levelsContainer=document.getElementById('certification-levels');
function refreshCertStats(){
 const count=CERTIFICATIONS.filter(c=>certStates[c.id]==='earned').length;
 document.getElementById('cert-progress').textContent=count+' / '+CERTIFICATIONS.length+' certificações conquistadas';
}
function showCertStorageWarning(){
 const node=document.getElementById('cert-storage-warning');
 if(node)node.textContent='Armazenamento do navegador indisponível. O status das certificações pode não persistir.';
}
function renderCertifications(){
 levelsContainer.replaceChildren();
 for(const level of CERT_LEVELS){
  const section=el('section','cert-level cert-level-'+level.id);
  section.id='cert-stage-'+level.id;
  const head=el('div','cert-level-header');
  head.append(el('span','cert-level-index',level.stage),el('div','cert-level-heading'));
  head.lastChild.append(el('h3','',level.title),el('p','',level.caption));
  section.append(head);
  for(const cert of CERTIFICATIONS.filter(c=>c.level===level.id)){
   const card=el('article','cert-card'+(cert.category==='Trilha principal'?' cert-primary':''));
   card.dataset.status=certStates[cert.id]||'planned';
   const eyebrow=el('div','cert-card-meta');
   eyebrow.append(el('span','cert-code',cert.code),el('span','cert-category',cert.category));
   const title=el('h4','',cert.title);
   const issuer=el('p','cert-issuer',cert.issuer);
   const summary=el('p','cert-summary',cert.summary);
   const labs=el('div','cert-detail'),labsName=el('span','cert-detail-name','ALINHAMENTO AO ROADMAP'),labsValue=el('p','',cert.labs);
   labs.append(labsName,labsValue);
   const prerequisites=el('div','cert-detail'),preName=el('span','cert-detail-name','REQUISITOS E CUIDADOS'),preValue=el('p','',cert.prerequisite);
   prerequisites.append(preName,preValue);
   const next=el('p','cert-next','Como se preparar: '+cert.next);
   const a=el('a','cert-official','Documentação e exame oficiais ↗');
   a.href=cert.url;a.target='_blank';a.rel='noopener noreferrer';
   const row=el('div','cert-choice'),label=el('label','cert-choice-label','Seu status'),select=el('select','cert-select');
   select.id='cert-state-'+cert.id;
   label.htmlFor=select.id;
   for(const option of CERT_STATUSES){
    const o=el('option','',option.text);
    o.value=option.value;o.selected=(certStates[cert.id]||'planned')===option.value;
    select.append(o);
   }
   select.setAttribute('aria-label','Situação da certificação '+cert.code);
   select.addEventListener('change',()=>{
    certStates[cert.id]=select.value;
    card.dataset.status=select.value;
    try{localStorage.setItem(CERT_STORAGE_KEY,JSON.stringify(certStates))}
    catch{showCertStorageWarning()}
    refreshCertStats();
   });
   row.append(label,select);
   card.append(eyebrow,title,issuer,summary,labs,prerequisites,next,a,row);
   section.append(card);
  }
  levelsContainer.append(section);
 }
 refreshCertStats();
}
renderCertifications();
const warning=el('p','cert-storage-warning','');
warning.id='cert-storage-warning';
document.querySelector('.certifications').append(warning);
document.addEventListener('iam:certifications-imported',()=>{certStates=loadCertStates();renderCertifications()});
