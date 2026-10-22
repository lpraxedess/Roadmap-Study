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
// Três páginas internas. Estudos exibe dez módulos inicialmente recolhidos.
const pageLinks=[...sidebar.querySelectorAll('[data-page]')];
const views=new Map([...document.querySelectorAll('[data-page-view]')].map(view=>[view.dataset.pageView,view]));
const pageHash={overview:'#visao-geral',studies:'#estudos',certifications:'#certificacoes'};
let currentPage='overview';
function setPage(page,options={}){
 if(!views.has(page))page='overview';
 currentPage=page;
 for(const [name,view] of views)view.hidden=name!==page;
 for(const link of pageLinks){
  const active=link.dataset.page===page;
  link.classList.toggle('is-active',active);
  if(active)link.setAttribute('aria-current','page');
  else link.removeAttribute('aria-current');
 }
 closeSidebar(false);
 if(!options.keepHash&&history.replaceState)history.replaceState(null,'',pageHash[page]);
 if(!options.preserveScroll)window.scrollTo({top:0,behavior:'instant'});
}
function showStudyItem(id){
 setPage('studies',{keepHash:true,preserveScroll:true});
 const taskId=id.startsWith('task-')?id:null;
 let target=document.getElementById(id);
 if(!target){
  const search=document.getElementById('search');
  if(search&&search.value){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}))}
  const all=document.querySelector('[data-filter="all"]');
  if(all&&!all.classList.contains('active'))all.click();
  target=document.getElementById(id);
 }
 if(target){
  const module=target.closest('.study-accordion');
  if(module)module.open=true;
  if(taskId&&target.tagName==='DETAILS')target.open=true;
  target.scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'start'});
 }
}
for(const link of pageLinks)link.addEventListener('click',event=>{
 event.preventDefault();
 setPage(link.dataset.page);
});
document.addEventListener('click',event=>{
 const anchor=event.target.closest('a[href^="#"]');
 if(!anchor||sidebar.contains(anchor)||pageLinks.includes(anchor))return;
 const hash=anchor.getAttribute('href').slice(1);
 if(hash==='roadmap-title'||hash.startsWith('module-')||hash.startsWith('task-')){
  event.preventDefault();
  if(hash==='roadmap-title'){setPage('studies');document.getElementById('roadmap-title')?.scrollIntoView()}
  else showStudyItem(hash);
 }else if(hash==='certifications-title'){
  event.preventDefault();setPage('certifications');
 }else if(hash==='inicio'){
  event.preventDefault();setPage('overview');
 }
});
const initialHash=location.hash.slice(1);
if(initialHash==='estudos'||initialHash==='roadmap-title')setPage('studies',{keepHash:true});
else if(initialHash==='certificacoes'||initialHash==='certifications-title')setPage('certifications',{keepHash:true});
else if(initialHash.startsWith('module-')||initialHash.startsWith('task-')){setPage('studies',{keepHash:true});window.requestAnimationFrame(()=>showStudyItem(initialHash))}
else setPage('overview',{keepHash:true});
window.addEventListener('hashchange',()=>{
 const hash=location.hash.slice(1);
 if(hash==='estudos')setPage('studies',{keepHash:true});
 else if(hash==='certificacoes')setPage('certifications',{keepHash:true});
 else if(hash==='visao-geral')setPage('overview',{keepHash:true});
 else if(hash.startsWith('module-')||hash.startsWith('task-'))showStudyItem(hash);
});
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
  const heading=el('div','cert-level-heading');
  heading.append(el('h3','',level.title),el('p','',level.caption));
  head.append(el('span','cert-level-index',level.stage),heading);
  section.append(head);
  const grid=el('div','cert-list');
  for(const cert of CERTIFICATIONS.filter(c=>c.level===level.id)){
   const card=el('article','cert-card'+(cert.category==='Trilha principal'?' cert-primary':''));
   card.dataset.status=certStates[cert.id]||'planned';
   const top=el('div','cert-card-top');
   const identity=el('div','cert-card-identity');
   const meta=el('div','cert-card-meta');
   meta.append(el('span','cert-code',cert.code));
   if(cert.category==='Trilha principal')meta.append(el('span','cert-category','Trilha principal'));
   identity.append(meta,el('h4','',cert.title),el('p','cert-issuer',cert.issuer));
   const row=el('div','cert-choice'),label=el('label','cert-choice-label','Status'),select=el('select','cert-select');
   select.id='cert-state-'+cert.id;label.htmlFor=select.id;
   for(const option of CERT_STATUSES){
    const o=el('option','',option.text);
    o.value=option.value;o.selected=(certStates[cert.id]||'planned')===option.value;
    select.append(o);
   }
   select.setAttribute('aria-label','Situação da certificação '+cert.code);
   select.addEventListener('change',()=>{
    certStates[cert.id]=select.value;card.dataset.status=select.value;
    try{localStorage.setItem(CERT_STORAGE_KEY,JSON.stringify(certStates))}catch{showCertStorageWarning()}
    refreshCertStats();
   });
   row.append(label,select);
   top.append(identity,row);
   const summary=el('p','cert-summary',cert.summary);
   const details=el('details','cert-more');
   const disclosure=el('summary','cert-more-toggle','Ver preparação e requisitos');
   const body=el('div','cert-more-body');
   const labs=el('div','cert-detail'),labsName=el('span','cert-detail-name','LABORATÓRIOS RELACIONADOS'),labsValue=el('p','',cert.labs);
   labs.append(labsName,labsValue);
   const prerequisites=el('div','cert-detail'),preName=el('span','cert-detail-name','PRÉ-REQUISITOS'),preValue=el('p','',cert.prerequisite);
   prerequisites.append(preName,preValue);
   const next=el('p','cert-next','Como se preparar: '+cert.next);
   const a=el('a','cert-official','Consultar certificação oficial ↗');
   a.href=cert.url;a.target='_blank';a.rel='noopener noreferrer';
   body.append(labs,prerequisites,next,a);
   details.append(disclosure,body);
   card.append(top,summary,details);
   grid.append(card);
  }
  section.append(grid);
  levelsContainer.append(section);
 }
 refreshCertStats();
}
renderCertifications();
const warning=el('p','cert-storage-warning','');
warning.id='cert-storage-warning';
document.querySelector('.certifications').append(warning);
document.addEventListener('iam:certifications-imported',()=>{certStates=loadCertStates();renderCertifications()});
