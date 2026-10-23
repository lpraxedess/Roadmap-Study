import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script} from 'node:vm';
const app=readFileSync('app.js','utf8');
const curriculum=readFileSync('curriculum.js','utf8');
const html=readFileSync('index.html','utf8');
const css=readFileSync('style.css','utf8');
const navigation=readFileSync('navigation.js','utf8');
const motion=readFileSync('motion.js','utf8');
new Script(curriculum,{filename:'curriculum.js'});
new Script(app,{filename:'app.js'});
new Script(navigation,{filename:'navigation.js'});
new Script(motion,{filename:'motion.js'});
const match=curriculum.match(/const PHASES=(\[.*?\]);/s);
assert.ok(match,'PHASES precisa estar presente como JSON');
const phases=JSON.parse(match[1]);
const tasks=phases.flatMap(p=>p.items);
const stepKeys=tasks.flatMap(t=>t.guide.steps.map((_,i)=>t.id+'#'+i));
assert.equal(phases.length,10,'Quantidade de módulos');
assert.equal(tasks.length,37,'Quantidade de competências');
assert.equal(new Set(tasks.map(t=>t.id)).size,tasks.length,'IDs duplicados');
assert.equal(new Set(stepKeys).size,stepKeys.length,'Passos duplicados');
assert.equal(stepKeys.length,369,'Quantidade de passos');
for(const t of tasks){
 assert.ok(t.study.length>=2,t.id+': sem teoria');
 assert.ok(t.guide.steps.length>=9,t.id+': poucas etapas');
 assert.ok(t.guide.steps.every(s=>s.title&&s.text),t.id+': passo vazio');
 assert.equal(new Set(t.guide.steps.map(s=>s.title)).size,t.guide.steps.length,t.id+': títulos repetidos');
 assert.ok(['free','trial','hybrid'].includes(t.cost),t.id+': custo inválido');
 assert.ok(t.prerequisite&&t.evidence&&t.lab.costNote,t.id+': orientações incompletas');
 assert.ok(/^https:\/\//.test(t.url)&&/^https:\/\//.test(t.guide.platformUrl),t.id+': link inválido');
 assert.ok(['referencia-conferida','referencia-indicada'].includes(t.review),t.id+': revisão ausente');
 if(t.review==='referencia-conferida')assert.ok(t.sources.length>0,t.id+': fonte da revisão ausente');
}
for(const id of ['percent','count','progress-fill','progress','next','steps-completed','phase-total','task-total','roadmap-list','empty','search','export','import','reset','message']){
 assert.ok(html.includes('id="'+id+'"'),'Elemento ausente: '+id);
}
for(const selector of ['.step-verify','.source-notice','.method-steps','.step-status']){
 assert.ok(css.includes(selector),'Estilo ausente: '+selector);
}
assert.ok(app.includes("roadmap-iam-progress-v2"),'Chave histórica de progresso alterada');
assert.ok(app.includes("roadmap-iam-steps-v1"),'Persistência de passos ausente');
assert.ok(app.includes('version:3,completed'),'Exportação v3 ausente');
assert.ok(app.includes('![2,3].includes'),'Compatibilidade com importação v2 ausente');
assert.equal(tasks.filter(t=>t.review==='referencia-conferida').length,18);
console.log('VALIDAÇÃO ESTRUTURAL OK:',phases.length,'módulos,',tasks.length,'competências,',stepKeys.length,'passos, 18 referências confrontadas.');

const certMatch=navigation.match(/const CERTIFICATIONS=(\[.*?\]);\nconst CERT_STORAGE_KEY=/s);
assert.ok(certMatch,'Lista CERTIFICATIONS não encontrada');
const certs=JSON.parse(certMatch[1]);
assert.equal(certs.length,18,'Quantidade de certificações');
assert.equal(new Set(certs.map(c=>c.id)).size,certs.length,'IDs de certificações duplicados');
assert.equal(new Set(certs.map(c=>c.code)).size,certs.length,'Códigos de certificações duplicados');
for(const c of certs){
 assert.ok(['beginner','intermediate','advanced'].includes(c.level),c.code+': nível inválido');
 assert.ok(c.title&&c.summary&&c.prerequisite&&c.labs&&c.next,c.code+': conteúdo incompleto');
 assert.ok(/^https:\/\//.test(c.url),c.code+': URL oficial inválida');
}
assert.deepEqual(certs.filter(c=>c.category==='Trilha principal').map(c=>c.code),['SC-900','SC-300','SC-100']);
assert.ok(!certs.some(c=>['AZ-500','MS-102'].includes(c.code)),'Exames descontinuados ou em descontinuação não devem integrar a trilha');
for(const id of ['menu-toggle','sidebar','nav-scrim','menu-close','page-overview','page-studies','page-certifications','certifications-title','certification-levels','cert-progress']){
 assert.ok(html.includes('id="'+id+'"'),'ID de navegação ausente: '+id);
}
assert.ok(html.includes('src="navigation.js"'),'Script de navegação ausente');
assert.ok(html.includes('aria-expanded="false"'),'Botão de menu sem estado ARIA');
assert.ok(app.includes("card.id='module-'+p.id"),'Âncoras de módulos ausentes');
assert.ok(app.includes("iam:roadmap-rendered"),'Atualização do menu após render ausente');
assert.ok(app.includes('certifications:getCertificationsForBackup()'),'Certificações não incluídas no backup');
assert.ok(app.includes("iam:certifications-imported"),'Atualização após importação ausente');
for(const selector of ['.sidebar','.study-accordion','.nav-scrim','.cert-levels','.cert-card','.cert-select','.menu-toggle']){
 assert.ok(css.includes(selector),'Estilo ausente: '+selector);
}
console.log('CERTIFICAÇÕES E NAVEGAÇÃO OK:',certs.length,'certificações em 3 níveis, menu lateral, backup integrado.');


const navHTML=html.slice(html.indexOf('<nav class="sidebar-nav"'),html.indexOf('</nav>',html.indexOf('<nav class="sidebar-nav"')));
assert.equal((navHTML.match(/class="sidebar-link sidebar-primary/g)||[]).length,3,'Menu principal deve ter 3 opções');
for(const title of ['Visão geral','Estudos','Certificações'])assert.ok(navHTML.includes(title),'Menu sem '+title);
for(const view of ['overview','studies','certifications'])assert.ok(html.includes('data-page-view="'+view+'"'),'Página ausente: '+view);
assert.ok(navigation.includes('function setPage('),'Troca de páginas ausente');
assert.ok(navigation.includes("setPage('studies'"),'Navegação para estudos ausente');
assert.ok(app.includes("node('details','phase study-accordion')"),'Módulos precisam ser expansíveis');
assert.ok(app.includes("node('summary','phase-header')"),'Cabeçalho de módulo não é clicável');
assert.ok(css.includes('.site-page[hidden]'),'Páginas ocultas sem estilo');
console.log('NAVEGAÇÃO EM PÁGINAS OK: Visão geral / Estudos (10 módulos expansíveis) / Certificações.');

assert.ok(navigation.includes("el('details','cert-more')"),'Detalhes de certificação devem ser recolhidos');
assert.ok(navigation.includes("el('div','cert-list')"),'Certificações devem ser organizadas por lista');
assert.ok(css.includes('.cert-card-top')&&css.includes('.cert-more-body'),'Estilos compactos ausentes');
console.log('CERTIFICAÇÕES COMPACTAS OK: requisitos e laboratórios sob demanda.');

assert.equal((html.match(/class="experience-card"/g)||[]).length,4,'Quatro cartões interativos da visão geral');
assert.ok(html.includes('src="motion.js"'),'Animações progressivas não carregadas');
assert.ok(css.includes('.experience-grid')&&css.includes('.experience-art'),'Design studio ausente');
assert.ok(css.includes('prefers-reduced-motion:reduce'),'Respeitar movimento reduzido');
assert.ok(motion.includes('IntersectionObserver')&&motion.includes('pointermove'),'Interações progressivas ausentes');
assert.ok(motion.includes('reduce.matches'),'Animações devem respeitar acessibilidade');
console.log('INTERAÇÕES OK: 4 cartões e movimento acessível.');

assert.ok(!css.includes('/* Correção global: violeta único'),'Patch cromático antigo não removido');

for(const issuer of ['Okta','CyberArk / Idira','SailPoint','AWS'])assert.ok(certs.some(c=>c.issuer===issuer),'Fornecedor IAM ausente: '+issuer);
assert.ok(!motion.includes('MutationObserver')&&motion.includes("addEventListener('toggle'"),'Motion deve ter uma única fonte de transições, sem observers duplicados');
assert.ok(css.includes('.ui-icon{display:block;width:18px;height:18px'),'Alinhamento de ícones ausente');
assert.ok(css.includes('.site-page:not([hidden]){animation:fade-in'),'Animação de páginas ausente');
console.log('CARREIRA E MOVIMENTO OK: Okta, CyberArk, AWS, SailPoint; transições e ícones alinhados.');
assert.ok(css.length<42000,'CSS excessivo: evitar camadas de patches e regras obsoletas');
assert.ok(css.includes('.menu-toggle,.menu-close{display:none!important}'),'Botões de menu não devem aparecer no desktop');
assert.ok(css.includes('.phases{display:grid;gap:0'),'Lista de módulos precisa ser coesa');
assert.ok(css.includes('grid-template-columns:minmax(0,1fr) 76px 27px'),'Contadores e ícones dos módulos devem ter colunas consistentes');
assert.ok(css.includes('.cert-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))'),'Certificações devem usar grade responsiva');
console.log('REDESIGN LIMPO OK: CSS enxuto, menu contextual, listas compactas e alinhamento.');

assert.ok(css.includes('.app-shell{width:calc(100% - 40px);max-width:none'),'Layout desktop deve ocupar toda largura');
assert.ok(css.includes('.page-content{width:calc(100% - 36px);max-width:none'),'Conteúdo em tablet não deve ter limite de 900 px');
assert.ok(!css.includes('width:min(100% - 48px,1400px)'),'Limite antigo de 1400 px não removido');
console.log('VIEWPORT OK: largura fluida no desktop, tablet e celular.');

assert.ok(html.includes('src="curriculum.js"'),'Currículo separado não carregado');
assert.ok(html.indexOf('src="curriculum.js"')<html.indexOf('src="app.js"'),'Currículo precisa carregar antes do aplicativo');
assert.ok(curriculum.length>100000&&app.length<35000,'Separação de dados e código não aplicada');
assert.ok(!app.includes('const LAB='),'Configuração de laboratório obsoleta permanece no runtime');
assert.ok(app.includes("querySelectorAll('#roadmap-list details[open][id]')"),'Restauração de expansão precisa usar IDs estáveis');
assert.ok(!app.includes('opened.includes(d.dataset.id)'),'Bug de reabrir todos os módulos não corrigido');
assert.ok(navigation.includes('history.pushState'),'Histórico do navegador deve ser preservado');
assert.ok(navigation.includes('document.startViewTransition'),'Navegação fluida ausente');
assert.ok(navigation.includes('focusPage('),'Gerenciamento de foco entre páginas ausente');
assert.ok(navigation.includes("hash==='backup-title'"),'Atalho para backup deve abrir a página correta');
assert.ok(navigation.includes('providerFilter.addEventListener'),'Filtro de certificações ausente');
for(const id of ['sidebar-progress-value','sidebar-progress-fill','results-count','collapse-all','cert-provider','cert-visible-count','global-toast']){
 assert.ok(html.includes('id="'+id+'"'),'Controle ausente: '+id);
}
for(const id of ['i-mark','i-home','i-book','i-award','i-search','i-chevron','i-menu','i-close']){
 assert.ok(html.includes('id="'+id+'"'),'Ícone vetorial ausente: '+id);
}
assert.ok(app.includes("svgIcon('chevron')"),'Chevron consistente ausente nos tópicos');
assert.ok(css.includes('::view-transition-old(iam-content)'),'Transições visuais inconsistentes');
assert.ok(css.includes('.tap-ripple')&&motion.includes('pointerdown'),'Feedback visual ao clicar ausente');
assert.ok(css.includes('--accent:#39baff'),'Identidade deve usar o azul neon definido');
assert.ok(!css.includes('1400px'),'Largura do site não deve ser limitada a 1400px');
console.log('AUDITORIA DE UX OK: módulos estáveis, história, filtros, atalhos, SVG e animações acessíveis.');

for(const id of ['resume-title','resume-module','resume-link','module-progress-list','module-filter','level-filter','tech-filter','cert-study-filter','clear-study-filters'])assert.ok(html.includes('id="'+id+'"'),'Painel ou filtro ausente: '+id);
assert.ok(app.includes("const LAST_KEY='roadmap-iam-last-topic-v1'"),'Persistência do último tópico ausente');
assert.ok(app.includes('function updateLearningDashboard()'),'Resumo por módulo ausente');
assert.ok(app.includes('function resetStudyFilters()'),'Limpeza dos filtros ausente');
assert.ok(app.includes('lastTask:lastTask'),'Backup deve preservar último tópico');
assert.ok(app.includes('clearLastTask();save();render()'),'Zerar deve limpar o último tópico');
assert.ok(css.includes('.advanced-filters{')&&css.includes('.module-progress-list{'),'Estilos de filtros e progresso ausentes');
console.log('EVOLUÇÃO OK: retomada, progresso por módulo, filtros avançados e backup compatível.');

const curriculumData=JSON.parse(curriculum.match(/const PHASES=(\[.*?\]);/s)[1]);
const allCompetencies=curriculumData.flatMap(p=>p.items);
assert.equal(allCompetencies.length,37,'Número de competências alterado sem revisão');
assert.ok(allCompetencies.every(t=>t.sources?.length>0),'Todas as competências devem conter fontes oficiais');
assert.ok(allCompetencies.every(t=>t.guide.steps.some(s=>s.title.includes('Diagnosticar')&&!s.text.includes('revise pré-requisitos, versão da ferramenta'))),'Diagnósticos específicos ausentes');
const conditional=allCompetencies.find(t=>t.id==='iam-2-4');
for(const word of ['Security Defaults','Report-only','P1','emergência','rollback'])assert.ok(conditional.guide.steps.some(s=>s.text.includes(word)),'Guia CA incompleto: '+word);
assert.ok(navigation.includes('"moduleIds":['),'Certificações precisam mapear módulos por IDs estruturados');
assert.ok(app.includes('execution-mode-select')&&app.includes('executionModes:executionModes'),'Tipo de execução e backup ausentes');
assert.ok(css.includes('html,body{background:#050505}')&&css.includes('background:#121212'),'Base visual deve ser preta e grafite');
console.log('AUDITORIA DE CONTEÚDO OK: fontes, diagnósticos, CA, modos de execução e superfícies pretas.');
