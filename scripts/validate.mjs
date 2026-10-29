import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFileSync(join(root,path),'utf8');
const html=read('index.html');
const scripts=['architecture.js','curriculum.js','certifications.js','state.js','app.js','architecture-view.js','navigation.js','lab-planner.js'];
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
for(const part of ['getStages','exportState','importState','reset','cap:200','seats:1']){
  assert.ok(read('lab-planner.js').includes(part),'Recurso do planejador ausente: '+part);
}
console.log('Validação concluída: '+phases.length+' módulos, '+lessons.length+' aulas, '+steps+' passos, '+checks+' testes.');
