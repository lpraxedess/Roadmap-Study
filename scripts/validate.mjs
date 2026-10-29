import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFileSync(join(root,path),'utf8');
const html=read('index.html');
const scripts=['architecture.js','curriculum.js','certifications.js','state.js','app.js','architecture-view.js','architecture-atlas.js','home-studio.js','lab-planner.js','lab-profile.js','navigation.js'];
const styles=['style.css','experience.css','monochrome.css','sidebar-cert.css'];
for(const path of [...scripts,...styles,'docs/GUIA-VIRTUALBOX.md'])assert.ok(existsSync(join(root,path)),path+' ausente');
for(const path of scripts){
 assert.ok(html.includes('src="'+path+'?'),path+' não está carregado');
 new vm.Script(read(path),{filename:path});
}
for(const path of styles)assert.ok(html.includes('href="'+path+'?'),path+' não está carregado');
for(const page of ['overview','studies','architecture','certifications']){
 assert.ok(html.includes('data-page-view="'+page+'"'),'Página '+page+' ausente');
 assert.ok(html.includes('data-page="'+page+'"'),'Navegação '+page+' ausente');
}
assert.ok(!html.includes('data-page-view="lab"'),'Laboratório não deve ocupar rota independente');
assert.ok(html.includes('<aside class="sidebar"'),'Menu lateral não foi restaurado');
assert.ok(html.includes('id="nav-scrim"'),'Máscara do drawer ausente');
assert.ok(html.includes('id="menu-toggle"'),'Botão do menu móvel ausente');
assert.ok(html.includes('id="menu-close"'),'Botão de fechamento do menu ausente');
assert.ok(html.includes('id="nav-progress-value"'),'Indicador de progresso no menu ausente');
assert.equal((html.match(/data-page="(?:overview|studies|architecture|certifications)"/g)||[]).length,4,'Deve haver apenas quatro opções de navegação');
assert.equal((html.match(/id="lab-profile"/g)||[]).length,1,'Painel do hardware duplicado');
assert.equal((html.match(/id="lab-planner"/g)||[]).length,1,'Planejador duplicado');
assert.ok(html.includes('id="study-environment"'),'Laboratório não integrado à Jornada');
assert.ok(html.includes('id="arch-atlas"'),'Atlas não carregado na arquitetura');
assert.ok(read('navigation.js').includes("if(hash==='laboratorio'"),'Redirecionamento legado do laboratório ausente');
assert.ok(read('monochrome.css').includes('max-width:none!important'),'Conteúdo continua limitado em monitores grandes');
assert.ok(read('monochrome.css').includes('mono-entrance'),'Transição visual de navegação ausente');
assert.ok(read('monochrome.css').includes('--bg:#050505'),'Tema preto não definido');
assert.ok(read('sidebar-cert.css').includes('grid-template-columns:252px minmax(0,1fr)'),'Sidebar não ocupa coluna própria');
assert.ok(read('sidebar-cert.css').includes('.cert-light--required'),'Luz vermelha ausente');
assert.ok(read('sidebar-cert.css').includes('.cert-light--recommended'),'Luz amarela ausente');
assert.ok(read('sidebar-cert.css').includes('.cert-light--optional'),'Luz cinza ausente');
assert.ok(read('sidebar-cert.css').includes('.cert-light--earned'),'Luz verde ausente');
assert.ok(read('navigation.js').includes("const mandatory=new Set(['sc300'])"),'SC-300 não definida como foco da trilha');
assert.ok(read('navigation.js').includes("effectivePriority(cert,status)"),'Luz de conclusão não conectada ao progresso');
assert.ok(read('navigation.js').includes("const mobile=matchMedia"),'Drawer móvel e teclado não configurados');
assert.ok(html.includes('id="cert-priority"'),'Filtro de prioridade ausente');
assert.ok(!html.includes('cert-classification-note'),'Legenda explicativa não foi removida');
assert.ok(!html.includes('cert-legend'),'Legenda de luzes redundante ainda aparece');
assert.ok(!read('sidebar-cert.css').includes('.cert-legend{'),'Estilos mortos da legenda não removidos');
assert.ok(!read('app.js').includes('Validar e registrar evidência'),'Seção redundante ainda aparece na aula');
assert.ok(read('app.js').includes("block('3. Concluir aula')"),'Conclusão simplificada ausente');
assert.ok(read('app.js').includes('lesson-notes-optional'),'Anotações antigas não estão acessíveis');
assert.ok(html.includes('id="empty-clear-filters"'),'Estado vazio sem ação de recuperação');
assert.ok(read('app.js').includes("$('empty-clear-filters')"),'Estado vazio não limpa filtros');
assert.ok(read('app.js').includes('labPlanner:window.IAMLab'),'Backup do plano ausente');
assert.ok(read('app.js').includes('hardware:window.IAMHardware'),'Backup do hardware ausente');
assert.ok(read('app.js').includes('readerPositions:{...guidePositions}'),'Posição de leitura ausente');
assert.ok(read('app.js').includes("$('nav-progress-value')"),'Menu não acompanha o progresso');

const studyCtx=vm.createContext({});
const phases=vm.runInContext(read('curriculum.js')+'\nPHASES',studyCtx);
const lessons=phases.flatMap(p=>p.items);
const ids=new Set(lessons.map(t=>t.id));
assert.equal(phases.length,11,'Módulos inesperados');
assert.equal(lessons.length,41,'Aulas inesperadas');
assert.equal(ids.size,lessons.length,'IDs duplicados');
let steps=0,tests=0;
for(const lesson of lessons){
 assert.ok(lesson.title&&lesson.labAction,'Objetivo ausente: '+lesson.id);
 assert.ok(lesson.guide?.steps?.length,'Passos ausentes: '+lesson.id);
 assert.ok(lesson.acceptance?.length,'Critérios ausentes: '+lesson.id);
 assert.ok((lesson.prerequisiteIds||[]).every(id=>ids.has(id)),'Pré-requisito inválido: '+lesson.id);
 assert.equal(new Set(lesson.guide.steps.map(s=>s.id)).size,lesson.guide.steps.length,'IDs de passos duplicados: '+lesson.id);
 for(const step of lesson.guide.steps)assert.ok(step.id&&step.title&&step.host&&step.text&&step.expected,'Passo incompleto: '+lesson.id+'/'+step.id);
 steps+=lesson.guide.steps.length;tests+=lesson.acceptance.length;
}
assert.equal(steps,296,'Microetapas inesperadas');
assert.ok(tests>=120,'Critérios insuficientes');
const networkGuide=read('docs/GUIA-VIRTUALBOX.md');
for(const snippet of ['192.168.56.1','192.168.56.10','192.168.56.20','Host-only','Cloud Sync','TPM 2.0'])assert.ok(networkGuide.includes(snippet),'Guia VirtualBox incompleto: '+snippet);

const elements=new Map(),localData=new Map();
class MockElement{
 constructor(tag){this.tag=tag;this.children=[];this.attributes={};this.events={};this.style={};this.value='';this.textContent='';this.className='';
  this.classList={toggle(){},add(){},remove(){}};}
 set id(value){this._id=value;elements.set(value,this)}
 get id(){return this._id}
 append(...items){for(const item of items){if(item===this)throw Error('Elemento não pode conter a si mesmo');this.children.push(item)}return this}
 prepend(...items){this.children.unshift(...items);return this}
 replaceChildren(...items){this.children=items}
 setAttribute(name,value){this.attributes[name]=value}
 addEventListener(name,fn){this.events[name]=fn}
 focus(){}
}
const localStorage={getItem:key=>localData.has(key)?localData.get(key):null,setItem:(key,value)=>localData.set(key,String(value))};
const document={getElementById:id=>elements.get(id)||null,createElement:tag=>new MockElement(tag)};
for(const id of ['lab-profile','lab-planner','home-path','arch-atlas'])elements.set(id,new MockElement('div'));
const window={IAMApp:{getState:()=>({completed:[],steps:[]})}};
const env=vm.createContext({window,document,localStorage,alert(){}});
for(const file of ['curriculum.js','architecture.js','lab-planner.js','lab-profile.js','home-studio.js','architecture-atlas.js']){
 vm.runInContext(read(file),env,{filename:file});
}
const profile=window.IAMHardware.exportState();
assert.equal(profile.os,'windows11pro');
assert.equal(profile.hypervisor,'virtualbox');
assert.equal(profile.ramGb,16);
assert.equal(window.IAMLab.getStages().length,10);
assert.ok(elements.has('hardware-advice'),'Pré-voo não renderizado');
assert.ok(elements.has('lab-budget-summary'),'Orçamento não renderizado');
window.IAMHardware.importState({...profile,vboxVersion:'7.2',virtualization:'enabled',freeGb:220});
assert.equal(window.IAMHardware.exportState().vboxVersion,'7.2');
window.IAMLab.importState({version:1,checks:{'base-virtualbox':true},budget:{cap:200,license:0,seats:1,azure:0,extras:0,reserve:35},active:'ad'});
assert.equal(window.IAMLab.exportState().checks['base-virtualbox'],true);
window.IAMHardware.reset();window.IAMLab.reset();
assert.equal(window.IAMHardware.exportState().os,'windows11pro');
assert.equal(window.IAMLab.exportState().budget.cap,200);

function descendants(root){const stack=[root],out=[],seen=new Set();while(stack.length){const item=stack.pop();if(!item||typeof item!=='object'||seen.has(item))continue;seen.add(item);out.push(item);for(const child of item.children||[])stack.push(child);}return out}
function countClass(root,cls){return descendants(root).filter(e=>(e.className||'').split(/\s+/).includes(cls)).length}
assert.equal(countClass(elements.get('home-path'),'home-path-card'),11,'Home não lista os módulos');
window.IAMAtlas.render();
assert.equal(countClass(elements.get('arch-atlas'),'atlas-system-card'),14,'Sistemas não detalhados');
assert.equal(countClass(elements.get('arch-atlas'),'atlas-edge'),15,'Conexões não detalhadas');
assert.equal(countClass(elements.get('arch-atlas'),'atlas-movement'),6,'Movimentações não detalhadas');
assert.equal(countClass(elements.get('arch-atlas'),'atlas-module'),11,'Módulos do atlas ausentes');
assert.equal(countClass(elements.get('arch-atlas'),'atlas-lesson'),41,'Aulas do atlas ausentes');
assert.equal(countClass(elements.get('arch-atlas'),'atlas-step'),296,'Microetapas do atlas ausentes');

console.log('OK: tema monocromático full-width, navegação única, '+phases.length+' módulos, '+lessons.length+' aulas, '+steps+' passos, '+tests+' critérios, 14 sistemas, 15 conexões, 6 eventos.');
