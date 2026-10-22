import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script} from 'node:vm';
const app=readFileSync('app.js','utf8');
const html=readFileSync('index.html','utf8');
const css=readFileSync('style.css','utf8');
new Script(app,{filename:'app.js'});
const match=app.match(/const PHASES=(\\[.*?\\]);\\nconst LAB=/s);
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
