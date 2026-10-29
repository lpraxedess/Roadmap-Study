import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFileSync(join(root,path),'utf8');
const html=read('index.html');
const scripts=['architecture.js','curriculum.js','certifications.js','state.js','app.js','architecture-view.js','navigation.js','lab-planner.js','lab-profile.js'];
const styles=['style.css','experience.css'];
for(const file of [...scripts,...styles])assert.ok(existsSync(join(root,file)),file+' ausente');
for(const file of scripts) {
  assert.ok(html.includes('src="'+file),file+' não carregado no HTML');
  new vm.Script(read(file),{filename:file});
}
for(const file of styles)assert.ok(html.includes('href="'+file),file+' não carregado');
for(const page of ['overview','lab','architecture','studies','certifications']) {
  assert.match(html,new RegExp('data-page-view="'+page+'"'),'Página '+page+' ausente');
  assert.match(html,new RegExp('data-page="'+page+'"'),'Link para '+page+' ausente');
}
assert.ok(read('navigation.js').includes("lab:'laboratorio'"),'Rota laboratório não habilitada');
assert.ok(read('app.js').includes('labPlanner:window.IAMLab'),'Backup do plano ausente');
assert.ok(read('app.js').includes('hardware:window.IAMHardware'),'Perfil de hardware ausente no backup');
assert.ok(read('app.js').includes('readerPositions:{...guidePositions}'),'Microetapa do leitor ausente no backup');
assert.match(html,/id="lab-profile"/,'Painel de hardware ausente');

const ctx=vm.createContext({});
const phases=vm.runInContext(read('curriculum.js')+'\nPHASES',ctx);
const lessons=phases.flatMap(p=>p.items);
const ids=new Set(lessons.map(t=>t.id));
assert.equal(phases.length,11,'Quantidade de módulos');
assert.equal(lessons.length,41,'Quantidade de lições');
assert.equal(ids.size,lessons.length,'IDs repetidos');
let steps=0,checks=0;
for(const task of lessons){
  assert.ok(task.title&&task.labAction,'Lição sem objetivo: '+task.id);
  assert.ok(Array.isArray(task.study)&&task.study.length,'Conceitos ausentes: '+task.id);
  assert.ok(task.guide&&Array.isArray(task.guide.steps)&&task.guide.steps.length,'Passos ausentes: '+task.id);
  assert.ok(Array.isArray(task.acceptance)&&task.acceptance.length,'Critérios ausentes: '+task.id);
  assert.ok(task.tracks?.length&&task.technologies?.length,'Metadados ausentes: '+task.id);
  assert.ok((task.prerequisiteIds||[]).every(id=>ids.has(id)),'Pré-requisito inexistente: '+task.id);
  const uniqueSteps=new Set(task.guide.steps.map(s=>s.id));
  assert.equal(uniqueSteps.size,task.guide.steps.length,'IDs de passo repetidos: '+task.id);
  for(const step of task.guide.steps){
    assert.ok(step.id&&step.title&&step.host&&step.text&&step.expected,'Microetapa incompleta: '+task.id+'/'+step.id);
  }
  assert.equal(new Set(task.acceptance.map(c=>c.id)).size,task.acceptance.length,'Teste repetido: '+task.id);
  steps+=task.guide.steps.length;checks+=task.acceptance.length;
}
assert.ok(steps>=290&&checks>=120,'Conteúdo inferior ao esperado');
for(const part of ['getStages','exportState','importState','reset','cap:200','seats:1',"time:'Marco",'57.30']){
  assert.ok(read('lab-planner.js').includes(part),'Recurso do planejador ausente: '+part);
}
for(const part of ['Ryzen 5 5600','16 GB','1 TB NVMe','Microsoft Entra','getStages','importState']) {
  const combined=read('lab-profile.js')+'\n'+read('lab-planner.js');
  if(part==='getStages')assert.ok(combined.includes(part));
  else assert.ok(combined.includes(part),'Perfil incompleto: '+part);
}

assert.ok(existsSync(join(root,'docs/GUIA-VIRTUALBOX.md')),'Guia VirtualBox ausente');
const vboxGuide=read('docs/GUIA-VIRTUALBOX.md');
for(const word of ['192.168.56.1','192.168.56.10','192.168.56.20','Host-only','Cloud Sync','TPM 2.0']){
  assert.ok(vboxGuide.includes(word),'Guia VirtualBox incompleto: '+word);
}
assert.ok(read('lab-profile.js').includes("os:'windows11'"),'Windows 11 não é perfil padrão');
assert.ok(read('lab-profile.js').includes("hypervisor:'virtualbox'"),'VirtualBox não é perfil padrão');
assert.ok(read('lab-profile.js').includes('vbox-walkthrough'),'Guia VirtualBox não integrado à interface');
assert.ok(read('lab-planner.js').includes('AURORA-LAB')||read('lab-planner.js').includes('host-only'),'Rede host-only não encontrada');
assert.ok(read('lab-planner.js').includes('virtualbox'),'Checklist do VirtualBox não encontrado');

class MockElement {
  constructor(tag){this.tag=tag;this.children=[];this.attributes={};this.events={};this.style={};
    this.value='';this.textContent='';this.classList={toggle(){},add(){},remove(){}};}
  set id(v){this._id=v;elements.set(v,this)}
  get id(){return this._id}
  append(...items){this.children.push(...items);return this}
  prepend(...items){this.children.unshift(...items);return this}
  replaceChildren(...items){this.children=items}
  setAttribute(name,value){this.attributes[name]=value}
  addEventListener(name,fn){this.events[name]=fn}
  focus(){}
}
const elements=new Map(),localData=new Map();
const fakeStorage={
  getItem(key){return localData.has(key)?localData.get(key):null},
  setItem(key,value){localData.set(key,String(value))}
};
const fakeDom={
  getElementById(id){return elements.get(id)||null},
  createElement(tag){return new MockElement(tag)}
};
elements.set('lab-profile',new MockElement('div'));
elements.set('lab-planner',new MockElement('div'));
const fakeWindow={};
const env=vm.createContext({window:fakeWindow,document:fakeDom,localStorage:fakeStorage,alert(){}});
vm.runInContext(read('lab-planner.js'),env,{filename:'lab-planner.js'});
vm.runInContext(read('lab-profile.js'),env,{filename:'lab-profile.js'});
const initialProfile=fakeWindow.IAMHardware.exportState();
assert.equal(initialProfile.os,'windows11');
assert.equal(initialProfile.hypervisor,'virtualbox');
assert.equal(initialProfile.ramGb,16);
assert.equal(fakeWindow.IAMLab.getStages().length,10);
assert.ok(elements.has('hardware-advice'),'Verificação pré-voo não foi renderizada');
assert.ok(elements.has('lab-budget-summary'),'Orçamento não foi renderizado');
const fullProfile={...initialProfile,vboxVersion:'7.2',virtualization:'enabled',freeGb:240};
fakeWindow.IAMHardware.importState(fullProfile);
assert.equal(fakeWindow.IAMHardware.exportState().vboxVersion,'7.2');
fakeWindow.IAMLab.importState({version:1,checks:{'base-virtualbox':true},budget:{cap:200,license:0,seats:1,azure:0,extras:0,reserve:35},active:'base'});
assert.equal(fakeWindow.IAMLab.exportState().checks['base-virtualbox'],true);
fakeWindow.IAMHardware.reset();fakeWindow.IAMLab.reset();
assert.equal(fakeWindow.IAMHardware.exportState().os,'windows11','Reset perdeu o SO confirmado');
assert.equal(fakeWindow.IAMHardware.exportState().hypervisor,'virtualbox','Reset perdeu o virtualizador');
assert.equal(fakeWindow.IAMLab.exportState().budget.cap,200);

console.log('Validação concluída: '+phases.length+' módulos, '+lessons.length+' aulas, '+steps+' passos, '+checks+' testes.');
