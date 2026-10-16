import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const sources = read('data/catalog.js') + '\n' + read('data/expanded.js');
const payload = runInNewContext(sources + '\nJSON.stringify({modules:DATA.modules,guides:topicGuides,practicals:practicalGuides,labs:LABS,certs:certifications,order:LEARNING_ORDER,phase:LEARNING_PHASE,contexts:MODULE_CONTEXT,links:LAB_FOR_MODULE})');
const d = JSON.parse(payload);
const entries = d.modules.flatMap((m,i) => m.slice(3).map((name,j) => ({name, guide:d.guides[i]?.[j],practice:d.practicals[name]})));

test('28 módulos e 234 tópicos com IDs anteriores preservados',()=>{
 assert.equal(d.modules.length,28);
 assert.equal(entries.length,234);
 assert.equal(d.modules[0][1],'Fundamentos de TI para IAM');
 assert.equal(d.modules[9][1],'Microsoft Entra ID');
 assert.equal(d.modules[15][1],'Zero Trust e arquitetura IAM');
});
test('catálogo oferece guias e exercícios para todo tópico',()=>{
 assert.equal(d.guides.length,d.modules.length);
 for(const e of entries){
  assert.ok(e.guide, 'guia ausente: '+e.name);
  for(const key of ['concept','importance','when','practice','verify','tools','url']) {
   assert.equal(typeof e.guide[key],'string',e.name+' sem '+key);
   assert.ok(e.guide[key].trim().length>15,e.name+' possui '+key+' curto');
  }
  assert.ok(e.practice,'prática ausente: '+e.name);
  assert.ok(e.practice.steps.length>=3,'etapas insuficientes: '+e.name);
  assert.match(e.guide.url,/^https?:\/\//,e.name+' sem link de fonte');
  assert.doesNotMatch(e.guide.verify,/^Explique como /i,'verificação genérica: '+e.name);
 }
});
test('nomes únicos preservam índice de práticas e ligações',()=>{
 assert.equal(new Set(entries.map(x=>x.name)).size,entries.length);
 assert.equal(Object.keys(d.practicals).length,entries.length);
});
test('trilha pedagógica percorre cada módulo uma vez',()=>{
 assert.equal(d.order.length,d.modules.length);
 assert.equal(new Set(d.order).size,d.modules.length);
 d.order.forEach(i=>assert.ok(d.modules[i] && d.phase[i]));
});
test('16 laboratórios têm objetivo, requisitos, evidências e alternativa',()=>{
 assert.equal(d.labs.length,16);
 assert.equal(new Set(d.labs.map(l=>l.id)).size,d.labs.length);
 for(const lab of d.labs){
   assert.match(lab.id,/^lab-\d\d$/);
   assert.ok(lab.goal.length>15);
   assert.ok(lab.license.length>8);
   assert.ok(lab.fallback.length>10);
   assert.ok(lab.steps.length>=4);
   assert.ok(lab.evidence.length>=3);
   assert.match(lab.ref,/^https:\/\//);
   lab.modules.forEach(i=>assert.ok(d.modules[i],'módulo inválido: '+i));
 }
});
test('todos os módulos relacionam pelo menos um laboratório',()=>{
 d.modules.forEach((_,i)=>assert.ok(d.links[i]?.length,'módulo sem prática integrada: '+i));
});
test('certificações e frameworks sem IDs repetidos e com URLs',()=>{
 assert.equal(d.certs.length,24);
 assert.equal(new Set(d.certs.map(c=>c.id)).size,d.certs.length);
 for(const c of d.certs){
  assert.ok(d.modules[c.after], 'certificação com índice de módulo inexistente: '+c.id);
  assert.match(c.url,/^https:\/\//,c.id);
 }
 for(const id of ['sc900','sc300','az104','md102','sc401','sc100'])assert.ok(d.certs.some(c=>c.id===id));
});
test('informações transversais estão associadas a todos os módulos',()=>{
 assert.equal(d.contexts.length,d.modules.length);
 d.contexts.forEach((context,i)=>assert.equal(context.length,3,'sem contexto '+i));
});
test('index carrega assets separados na ordem correta',()=>{
 const html=read('index.html');
 const a=html.indexOf('data/catalog.js'), b=html.indexOf('data/expanded.js'), c=html.indexOf('assets/app.js');
 assert.ok(a>0&&b>a&&c>b);
 assert.ok(html.includes('assets/styles.css'));
 assert.ok(!html.includes('const DATA='));
});
test('aplicação inclui navegação, backup e restauração de evidências',()=>{
 const app=read('assets/app.js');
 for(const fragment of ['LABKEY','function labsView','function certsView','function restoreHash','labs:labState','LEARNING_ORDER']) assert.ok(app.includes(fragment),fragment);
});
