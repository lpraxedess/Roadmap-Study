import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script} from 'node:vm';
const app=readFileSync('app.js','utf8');
const html=readFileSync('index.html','utf8');
const css=readFileSync('style.css','utf8');
const navigation=readFileSync('navigation.js','utf8');
const motion=readFileSync('motion.js','utf8');
new Script(app,{filename:'app.js'});
new Script(navigation,{filename:'navigation.js'});
new Script(motion,{filename:'motion.js'});
const match=app.match(/const PHASES=(\[.*?\]);\nconst LAB=/s);
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
assert.equal(certs.length,9,'Quantidade de certificações');
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
assert.ok(app.includes("node('details','phase reveal study-accordion')"),'Módulos precisam ser expansíveis');
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
console.log('STUDIO DESIGN OK: 4 cartões, movimento acessível e tema preto/violeta.');
