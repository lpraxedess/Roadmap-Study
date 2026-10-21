'use strict';
const PHASES=[
{id:'fundamentos',title:'Fundamentos de TI',desc:'Base técnica para compreender identidade e acesso.',items:[
['redes','Redes, DNS, HTTP e TLS','Entenda endereçamento, resolução de nomes e conexão segura.','https://learn.microsoft.com/pt-br/training/paths/network-fundamentals/'],
['sistemas','Windows Server e PowerShell','Administre uma VM de laboratório e pratique comandos de consulta.','https://learn.microsoft.com/pt-br/powershell/scripting/overview'],
['seguranca','Segurança e menor privilégio','Pratique MFA, RBAC, recuperação de acesso e análise de logs.','https://learn.microsoft.com/pt-br/security/zero-trust/zero-trust-overview']]},
{id:'ad',title:'Active Directory',desc:'Diretório local e gestão de identidades.',items:[
['ad-estrutura','Domínio, OUs, usuários e grupos','Mapeie o AD existente e organize objetos de um laboratório isolado.','https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview'],
['ad-rbac','Permissões e GPO','Configure permissões em grupos de teste e valide acessos permitidos e negados.','https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview'],
['ad-auditoria','Auditoria e PowerShell','Consulte eventos e inventarie usuários e grupos.','https://learn.microsoft.com/pt-br/powershell/module/activedirectory/']]},
{id:'entra',title:'Microsoft Entra ID',desc:'IAM na nuvem, sincronização e acesso seguro.',items:[
['entra-tenant','Tenant e contas de emergência','Separe conta administrativa, piloto e recuperação antes de novas políticas.','https://learn.microsoft.com/pt-br/entra/identity/role-based-access-control/security-emergency-access'],
['entra-sync','Identidade híbrida e Cloud Sync','Planeje a sincronização a partir do AD com escopo reduzido.','https://learn.microsoft.com/pt-br/entra/identity/hybrid/cloud-sync/how-to-prerequisites'],
['entra-mfa','MFA, SSPR e acesso condicional','Teste políticas em Report-only antes de ativá-las.','https://learn.microsoft.com/pt-br/entra/identity/conditional-access/plan-conditional-access'],
['entra-apps','SSO, SAML e OpenID Connect','Integre aplicação de teste e diferencie autenticação de autorização.','https://learn.microsoft.com/pt-br/entra/identity/enterprise-apps/plan-sso-deployment'],
['entra-pim','PIM, governança e ciclo de vida','Planeje privilégio temporário e entrada, mudança e saída de usuários; verifique licenças.','https://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-configure'],
['entra-logs','Microsoft Graph e logs','Consulte usuários e eventos com evidências sem dados sensíveis.','https://learn.microsoft.com/pt-br/graph/overview']]},
{id:'intune',title:'Microsoft Intune',desc:'Gestão e proteção de dispositivos de laboratório.',items:[
['intune-enroll','Inscrição do Windows 11','Inscreva uma VM ou dispositivo de teste devidamente licenciado.','https://learn.microsoft.com/pt-br/intune/intune-service/enrollment/windows-enroll'],
['intune-config','Configurações e segurança','Teste políticas, Defender, firewall e BitLocker quando suportado.','https://learn.microsoft.com/pt-br/intune/intune-service/protect/security-baselines-configure'],
['intune-compliance','Conformidade integrada ao Entra','Verifique conformidade do dispositivo e decisão de acesso.','https://learn.microsoft.com/pt-br/intune/intune-service/protect/create-compliance-policy']]},
{id:'portfolio',title:'Projeto e portfólio',desc:'Comprove habilidades com entregas práticas.',items:[
['portfolio-doc','Documentar arquitetura e testes','Crie diagrama, objetivos, resultados e evidências anonimizadas.','https://docs.github.com/pt/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes'],
['portfolio-final','Validar o fluxo completo','Teste criação, sincronização, login, revogação e conformidade, quando disponíveis.','https://learn.microsoft.com/pt-br/security/zero-trust/zero-trust-overview']]}
];
const KEY='roadmap-iam-progress-v1';
const all=PHASES.flatMap(p=>p.items.map(([id,title,detail,url])=>({id,title,detail,url})));
const valid=new Set(all.map(t=>t.id));
let completed=new Set();
try{const saved=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(saved))completed=new Set(saved.filter(id=>typeof id==='string'&&valid.has(id)))}catch{}
const $=id=>document.getElementById(id);
const el=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x};
function save(){try{localStorage.setItem(KEY,JSON.stringify([...completed]));$('message').textContent='Progresso salvo neste navegador.'}catch{$('message').textContent='Não foi possível salvar. Exporte um backup.'}}
function render(){
const total=all.length,n=completed.size,pct=Math.round(n/total*100);
$('percent').textContent=pct+'%';$('count').textContent=n+' de '+total+' etapas concluídas';$('progress-fill').style.width=pct+'%';$('progress').setAttribute('aria-valuenow',String(pct));
const next=all.find(t=>!completed.has(t.id));$('next').textContent=next?'Próxima etapa: '+next.title:'Roadmap concluído. Continue praticando.';
const q=$('search').value.trim().toLocaleLowerCase('pt-BR'),filter=$('filter').value,list=$('roadmap-list');list.replaceChildren();let visible=0;
PHASES.forEach((p,i)=>{
const items=p.items.map(([id,title,detail,url])=>({id,title,detail,url})).filter(t=>(filter==='all'||(filter==='done')===completed.has(t.id))&&(t.title+' '+t.detail+' '+p.title).toLocaleLowerCase('pt-BR').includes(q));
if(!items.length)return;visible+=items.length;
const card=el('section','phase'),head=el('div','phase-header'),heading=el('div','phase-heading'),num=el('span','phase-index',String(i+1).padStart(2,'0')),info=el('div'),name=el('h3','',p.title),desc=el('p','',p.desc),count=el('span','phase-count',p.items.filter(t=>completed.has(t[0])).length+'/'+p.items.length);
card.setAttribute('aria-label',p.title);info.append(name,desc);heading.append(num,info);head.append(heading,count);card.append(head);
const tasks=el('div','tasks');
items.forEach(t=>{
const done=completed.has(t.id),row=el('div','task'+(done?' done':'')),check=el('input'),body=el('div'),title=el('label','task-title',t.title),detail=el('p','task-detail',t.detail),meta=el('div','task-meta'),chip=el('span','chip',done?'Concluída':'Pendente'),link=el('a','source','Material de estudo ↗');
check.type='checkbox';check.id='task-'+t.id;check.checked=done;check.setAttribute('aria-label','Concluir: '+t.title);title.htmlFor=check.id;link.href=t.url;link.target='_blank';link.rel='noopener noreferrer';
check.addEventListener('change',()=>{check.checked?completed.add(t.id):completed.delete(t.id);save();render()});
meta.append(chip,link);body.append(title,detail,meta);row.append(check,body);tasks.append(row)});
card.append(tasks);list.append(card)});
$('empty').hidden=visible>0}
$('search').addEventListener('input',render);$('filter').addEventListener('change',render);
$('export').addEventListener('click',()=>{const json=JSON.stringify({version:1,completed:[...completed],exportedAt:new Date().toISOString()},null,2),url=URL.createObjectURL(new Blob([json],{type:'application/json'})),a=el('a');a.href=url;a.download='roadmap-iam-progresso.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('message').textContent='Backup exportado.'});
$('import').addEventListener('change',async event=>{const file=event.target.files?.[0];if(!file)return;try{if(file.size>100000)throw Error('Arquivo acima de 100 KB');const data=JSON.parse(await file.text());if(data.version!==1||!Array.isArray(data.completed)||!data.completed.every(id=>typeof id==='string'&&valid.has(id)))throw Error('Formato ou identificadores inválidos');completed=new Set(data.completed);save();render();$('message').textContent='Progresso importado.'}catch(error){$('message').textContent='Falha ao importar: '+error.message}finally{event.target.value=''}});
$('reset').addEventListener('click',()=>{if(!confirm('Apagar todas as etapas concluídas neste navegador?'))return;completed.clear();save();render();$('message').textContent='Progresso zerado.'});
render();