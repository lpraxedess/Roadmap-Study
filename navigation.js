'use strict';
// Trilha de certificações revisada com fontes oficiais em 22/10/2026.
// Status = planejamento pessoal, jamais verificação de credencial emitida.
const CERTIFICATIONS=[{"id":"sc900","code":"SC-900","level":"beginner","title":"Security, Compliance and Identity Fundamentals","issuer":"Microsoft","category":"Trilha principal","summary":"Fundamentos de identidade, Zero Trust, Microsoft Entra, segurança e conformidade.","labs":"Módulos 01, 03 e 09. Complementar Microsoft Defender e Purview no Microsoft Learn.","prerequisite":"Sem certificação prévia obrigatória. É recomendável conhecer noções de Azure e Microsoft 365.","next":"Explique autenticação, RBAC, MFA, identidade híbrida e governança. Faça a avaliação prática gratuita antes de agendar.","url":"https://learn.microsoft.com/pt-br/credentials/certifications/exams/sc-900/","moduleIds":[1,3,9]},{"id":"az900","code":"AZ-900","level":"beginner","title":"Azure Fundamentals","issuer":"Microsoft","category":"Complementar","summary":"Conceitos de nuvem, serviços Azure, arquitetura, cobrança e governança.","labs":"Módulos 01–03; estudar computação, rede, armazenamento e custos Azure fora do laboratório IAM.","prerequisite":"Nenhuma certificação formal obrigatória. Útil caso Azure ainda seja novidade.","next":"Explique tenant, assinatura, grupo de recursos, responsabilidade compartilhada e custos.","url":"https://learn.microsoft.com/pt-br/credentials/certifications/azure-fundamentals/","moduleIds":[1,2,3]},{"id":"cc","code":"ISC2 CC","level":"beginner","title":"Certified in Cybersecurity","issuer":"ISC2","category":"Complementar","summary":"Fundamentos de segurança, controle de acesso, redes, governança e resposta a incidentes.","labs":"Módulos 01, 02 e 09; complemente política de segurança e resposta a incidentes.","prerequisite":"Não exige experiência profissional para a certificação.","next":"Resolva exercícios de princípios de segurança e explique IAM em linguagem de riscos e controles.","url":"https://www.isc2.org/certifications/cc","moduleIds":[1,2,9]},{"id":"sc300","code":"SC-300","level":"intermediate","title":"Identity and Access Administrator Associate","issuer":"Microsoft","category":"Trilha principal","summary":"Administração de identidades, autenticação, acesso a aplicações, governança e troubleshooting no Entra.","labs":"Módulos 01–07 e 09; destaque Entra, híbrido, SSO, JML, PIM e Microsoft Graph.","prerequisite":"Não exige SC-900. Recomenda experiência com Entra, AD DS, Azure, PowerShell e KQL.","next":"Finalize o laboratório IAM ponta a ponta, revise lacunas do guia oficial e pratique casos de falha.","url":"https://learn.microsoft.com/pt-br/credentials/certifications/identity-and-access-administrator/","moduleIds":[1,2,3,4,5,6,7,9]},{"id":"az104","code":"AZ-104","level":"intermediate","title":"Azure Administrator Associate","issuer":"Microsoft","category":"Complementar","summary":"Administração de Azure com identidade, RBAC, redes, recursos de computação, storage e monitoramento.","labs":"Módulos 01–03 e 07. Exige novos laboratórios Azure além do roadmap IAM.","prerequisite":"Experiência prática com Azure, sistemas operacionais, rede, PowerShell e CLI.","next":"Monte laboratórios próprios de subscriptions, Azure RBAC, redes virtuais, storage e observabilidade.","url":"https://learn.microsoft.com/en-us/credentials/certifications/exams/az-104/","moduleIds":[1,2,3,7]},{"id":"sc500","code":"SC-500","level":"intermediate","title":"Cloud and AI Security Engineer Associate","issuer":"Microsoft","category":"Especialização","summary":"Controles de segurança em Azure, identidade, Key Vault, cargas híbridas e sistemas de IA.","labs":"Módulos 03, 06, 07 e 09. Complemente segurança de Azure, infraestrutura e IA.","prerequisite":"Conhecimento prático de administração Azure e identidades; vai além de IAM.","next":"Estude Key Vault, identidades gerenciadas, Defender for Cloud e governança de workloads de IA.","url":"https://learn.microsoft.com/en-us/credentials/certifications/cloud-and-ai-security-engineer-associate","moduleIds":[3,6,7,9]},{"id":"sc100","code":"SC-100","level":"advanced","title":"Cybersecurity Architect Expert","issuer":"Microsoft","category":"Trilha principal","summary":"Arquitetura Zero Trust, estratégia de segurança, IAM, proteção de infraestrutura e governança.","labs":"Módulos 01–10, projeto final e aprofundamento em arquitetura multinuvem, riscos e segurança além de IAM.","prerequisite":"Para obter o título Expert: SC-100 + uma certificação associada elegível (SC-300, SC-200 ou SC-500).","next":"Apresente arquitetura empresarial, trade-offs, riscos, controles e decisões técnicas documentadas.","url":"https://learn.microsoft.com/pt-br/credentials/certifications/cybersecurity-architect-expert/","moduleIds":[1,2,3,4,5,6,7,8,9,10]},{"id":"cissp","code":"CISSP","level":"advanced","title":"Certified Information Systems Security Professional","issuer":"ISC2","category":"Carreira sênior","summary":"Segurança abrangente, arquitetura, gestão de riscos, operações, IAM e governança.","labs":"Todos os módulos IAM; exige estudo adicional dos oito domínios oficiais da prova.","prerequisite":"Certificação completa requer cinco anos de experiência elegível e endosso (consulte regras de redução de experiência).","next":"Acumule experiência verificável e construa visão abrangente de segurança, não apenas de identidade.","url":"https://www.isc2.org/certifications/cissp","moduleIds":[1,2,3,4,5,6,7,8,9,10]},{"id":"cism","code":"CISM","level":"advanced","title":"Certified Information Security Manager","issuer":"ISACA","category":"Gestão","summary":"Gestão de segurança da informação, governança, riscos, programa de segurança e incidentes.","labs":"Módulos 05, 06, 09 e 10; complemente com governança organizacional e gestão de riscos.","prerequisite":"Para obter a certificação, cinco anos de experiência profissional em gestão de segurança nos domínios aplicáveis.","next":"Construa casos de negócio, estratégias de tratamento de riscos, indicadores e processos formais.","url":"https://www.isaca.org/credentialing/cism/get-cism-certified","moduleIds":[5,6,9,10]},{"id":"okta-pro","code":"OKTA PRO","level":"beginner","title":"Okta Certified Professional","issuer":"Okta","category":"IAM / SSO","summary":"Fundamentos de Okta Workforce Identity, diretório de usuários, SSO e políticas básicas.","labs":"Módulos 01, 03 e 04; criar ambiente Okta de teste quando disponível e integrar aplicação OIDC ou SAML.","prerequisite":"Não exige certificação anterior. Conferir o formato atual do exame prático no portal oficial.","next":"Praticar usuários, grupos, integrações de aplicações e políticas de autenticação.","url":"https://www.okta.com/pt-br/services/certification/","moduleIds":[1,3,4]},{"id":"sailpoint-leader","code":"SP LEADER","level":"beginner","title":"Identity Security Leader Credential","issuer":"SailPoint","category":"IGA / Governança","summary":"Credencial de conhecimento sobre governança, risco, ciclo de vida e valor empresarial da identidade.","labs":"Módulos 01, 05 e 09; montar matriz de acesso, JML e campanhas de revisão.","prerequisite":"Concluir a trilha formativa indicada pela SailPoint; verificar condições de acesso e emissão.","next":"Estudar identidade como controle de risco e documentar governança de acessos.","url":"https://community.sailpoint.com/programs/certifications-and-credentials","moduleIds":[1,5,9]},{"id":"okta-admin","code":"OKTA ADMIN","level":"intermediate","title":"Okta Certified Administrator","issuer":"Okta","category":"IAM / SSO","summary":"Administração de usuários, grupos, políticas e diagnóstico de problemas na plataforma Okta.","labs":"Módulos 03–05; complementar com laboratórios específicos do tenant Okta.","prerequisite":"Okta Certified Professional é pré-requisito declarado pelo programa.","next":"Aprofundar políticas, integrações, logs e troubleshooting de provisionamento.","url":"https://www.okta.com/pt-br/services/certification/","moduleIds":[3,4,5]},{"id":"cyberark-def","code":"DEFENDER PAM","level":"intermediate","title":"CyberArk Defender – PAM","issuer":"CyberArk / Idira","category":"PAM","summary":"Operação, administração e suporte de uma solução CyberArk de acesso privilegiado.","labs":"Módulo 06; usar JumpServer para conceitos gratuitos e complementar com ambiente CyberArk autorizado.","prerequisite":"Experiência com PAM recomendada; consultar guia atual da CyberArk University. Plataforma comercial pode exigir acesso específico.","next":"Estudar Vault, políticas de contas privilegiadas, rotação, sessões e trilhas de auditoria.","url":"https://training.cyberark.com/learn/course/external/view/elearning/113/defender-pam-sample-items-study-guide","moduleIds":[6]},{"id":"aws-security","code":"AWS SECURITY","level":"intermediate","title":"AWS Certified Security – Specialty","issuer":"AWS","category":"Cloud IAM","summary":"Segurança de workloads AWS, IAM, políticas, federação, criptografia, logs e resposta.","labs":"Módulos 04, 07 e 09; adicionar laboratório AWS IAM, IAM Identity Center e CloudTrail.","prerequisite":"Exame especializado; recomenda-se experiência prática em segurança AWS. Revisar versão atual do exame.","next":"Praticar IAM policies, roles, trust policies, SCPs e identidade federada na AWS.","url":"https://aws.amazon.com/pt/certification/","moduleIds":[4,7,9]},{"id":"sailpoint-admin","code":"SP ADMIN","level":"intermediate","title":"Identity Security Administrator Certification","issuer":"SailPoint","category":"IGA / Governança","summary":"Administração de soluções SailPoint e processos de governança de identidades.","labs":"Módulo 05; complementar com plataforma SailPoint e conectores autorizados.","prerequisite":"Programa informa 6 meses de experiência e disponibilidade para clientes e parceiros SailPoint.","next":"Estudar fontes autoritativas, provisionamento, certificações de acesso e políticas.","url":"https://community.sailpoint.com/programs/certifications-and-credentials","moduleIds":[5]},{"id":"okta-consult","code":"OKTA CONSULT","level":"advanced","title":"Okta Certified Consultant","issuer":"Okta","category":"IAM / SSO","summary":"Implantação e integração de Okta em cenários complexos, incluindo federação e ciclo de vida.","labs":"Módulos 03–05 e 09; desenvolver arquitetura SSO e SCIM com Okta.","prerequisite":"Okta Professional e Administrator são pré-requisitos oficiais.","next":"Documentar integrações, resolução de incidentes e decisões de arquitetura.","url":"https://www.okta.com/pt-br/services/certification/","moduleIds":[3,4,5,9]},{"id":"cyberark-sentry","code":"SENTRY PAM","level":"advanced","title":"CyberArk Sentry – PAM","issuer":"CyberArk / Idira","category":"PAM","summary":"Implantação e configuração avançada de controles de acesso privilegiado.","labs":"Módulos 06 e 09; complementar com laboratório comercial autorizado.","prerequisite":"Conhecimento operacional de CyberArk PAM; conferir pré-requisitos vigentes no catálogo oficial.","next":"Praticar desenho, instalação, integração, alta disponibilidade e recuperação.","url":"https://training.cyberark.com/learn/public/catalog/view/1","moduleIds":[6,9]},{"id":"sailpoint-engineer","code":"SP ENGINEER","level":"advanced","title":"Identity Security Engineer Certification","issuer":"SailPoint","category":"IGA / Governança","summary":"Implementação técnica e engenharia de soluções SailPoint de governança de identidade.","labs":"Módulos 05, 07 e 09; aprofundar conectores, APIs e fluxos de provisionamento.","prerequisite":"Programa informa 1–3 anos de experiência e disponibilidade para clientes e parceiros.","next":"Construir integrações, regras de identidade, aprovações e evidências de governança.","url":"https://community.sailpoint.com/programs/certifications-and-credentials","moduleIds":[5,7,9]}];
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
function focusPage(page){
 const title=views.get(page)?.querySelector('h1,h2');
 if(title){title.setAttribute('tabindex','-1');title.focus({preventScroll:true})}
}
function setPage(page,options={}){
 if(!views.has(page))page='overview';
 const changed=currentPage!==page||views.get(page).hidden;
 const update=()=>{
  currentPage=page;
  for(const [name,view] of views)view.hidden=name!==page;
  for(const link of pageLinks){
   const active=link.dataset.page===page;
   link.classList.toggle('is-active',active);
   if(active)link.setAttribute('aria-current','page');
   else link.removeAttribute('aria-current');
  }
  closeSidebar(false);
 };
 if(changed&&!options.instant&&!reduced.matches&&typeof document.startViewTransition==='function'){
  const transition=document.startViewTransition(update);
  if(options.focus)transition.finished.then(()=>focusPage(page)).catch(()=>focusPage(page));
 }else{
  update();
  if(options.focus)focusPage(page);
 }
 if(!options.keepHash&&location.hash!==pageHash[page]){
  const mode=options.replace?'replaceState':'pushState';
  history[mode](null,'',pageHash[page]);
 }
 if(!options.preserveScroll)window.scrollTo(0,0);
}
function showStudyItem(id,options={}){
 setPage('studies',{keepHash:true,preserveScroll:true,instant:true});
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
  if(!options.keepHash&&location.hash!=='#'+id)history.pushState(null,'','#'+id);
  target.scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'start'});
 }
}
for(const link of pageLinks)link.addEventListener('click',event=>{
 event.preventDefault();
 setPage(link.dataset.page,{focus:true});
});
document.addEventListener('click',event=>{
 const anchor=event.target.closest('a[href^="#"]');
 if(!anchor||sidebar.contains(anchor)||pageLinks.includes(anchor))return;
 const hash=anchor.getAttribute('href').slice(1);
 if(hash==='roadmap-title'||hash.startsWith('module-')||hash.startsWith('task-')){
  event.preventDefault();
  if(hash==='roadmap-title'){setPage('studies',{focus:true})}
  else showStudyItem(hash);
 }else if(hash==='certifications-title'||hash==='backup-title'){
  event.preventDefault();
  setPage('certifications',{focus:true});
  if(hash==='backup-title')document.getElementById(hash)?.scrollIntoView({behavior:reduced.matches?'auto':'smooth'});
 }else if(hash==='inicio'||hash==='infra-title'||hash==='method-title'){
  event.preventDefault();
  setPage('overview',{focus:true});
  if(hash==='infra-title'||hash==='method-title')document.getElementById(hash)?.scrollIntoView({behavior:reduced.matches?'auto':'smooth'});
 }
});
function restoreLocation(){
 const hash=location.hash.slice(1);
 if(hash==='estudos'||hash==='roadmap-title')setPage('studies',{keepHash:true,instant:true});
 else if(hash==='certificacoes'||hash==='certifications-title'||hash==='backup-title'){
  setPage('certifications',{keepHash:true,instant:true});
  if(hash==='backup-title')requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView());
 }else if(hash.startsWith('module-')||hash.startsWith('task-')){
  setPage('studies',{keepHash:true,instant:true});
  requestAnimationFrame(()=>showStudyItem(hash,{keepHash:true}));
 }else if(hash==='infra-title'||hash==='method-title'){
  setPage('overview',{keepHash:true,instant:true});
  requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView());
 }else setPage('overview',{keepHash:true,instant:true});
}
restoreLocation();
window.addEventListener('popstate',restoreLocation);
window.addEventListener('hashchange',restoreLocation);
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
const providerFilter=document.getElementById('cert-provider');
for(const issuer of [...new Set(CERTIFICATIONS.map(c=>c.issuer))].sort((a,b)=>a.localeCompare(b,'pt-BR'))){
 const option=el('option','',issuer==='CyberArk / Idira'?'CyberArk':issuer);
 option.value=issuer;
 providerFilter.append(option);
}
providerFilter.addEventListener('change',renderCertifications);
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
 const selectedProvider=providerFilter.value;
 let visible=0;
 for(const level of CERT_LEVELS){
  const filtered=CERTIFICATIONS.filter(c=>c.level===level.id&&(selectedProvider==='all'||c.issuer===selectedProvider));
  if(!filtered.length)continue;
  visible+=filtered.length;
  const section=el('section','cert-level cert-level-'+level.id);
  section.id='cert-stage-'+level.id;
  const head=el('div','cert-level-header');
  const heading=el('div','cert-level-heading');
  heading.append(el('h3','',level.title),el('p','',level.caption));
  head.append(el('span','cert-level-index',level.stage),heading);
  section.append(head);
  const grid=el('div','cert-list');
  for(const cert of filtered){
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
 document.getElementById('cert-visible-count').textContent=visible+' de '+CERTIFICATIONS.length+' certificações';
 refreshCertStats();
}
renderCertifications();
const warning=el('p','cert-storage-warning','');
warning.id='cert-storage-warning';
document.querySelector('.certifications').append(warning);
document.addEventListener('iam:certifications-imported',()=>{certStates=loadCertStates();renderCertifications()});
