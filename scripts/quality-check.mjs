/* Static quality gate: no npm packages needed. Run: node scripts/quality-check.mjs */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync('index.html','utf8');
const css=readFileSync('atlas-pro.css','utf8');
const motion=readFileSync('atlas-pro.js','utf8');
const curriculum=readFileSync('atlas-curriculum.js','utf8');
function validateJS(source,name){try{new vm.Script(source,{filename:name})}catch(e){throw new Error('JavaScript invalid in '+name+': '+e.message)}}
validateJS(motion,'atlas-pro.js');
validateJS(curriculum,'atlas-curriculum.js');
const match=html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match,'Inline application script is missing');
validateJS(match[1],'index.html:inline');
const dom={};
vm.runInNewContext(curriculum,{window:dom});
const lessons=dom.IAMAtlasCurriculum.lessons;
const labs=dom.IAMAtlasCurriculum.labs;
assert.equal(Object.keys(lessons).length,28,'Expected 28 guided competencies');
assert.equal(Object.keys(labs).length,6,'Expected six lab criteria');
for(let i=0;i<28;i++){const row=lessons['t'+i];assert.ok(row,'Missing topic t'+i);assert.ok(row.prerequisites&&row.deliverable&&row.verification);assert.ok(Array.isArray(row.steps)&&row.steps.length>=3,'Missing steps for t'+i)}
assert.ok(html.includes("id:'t'+(18+i)"),'Added topics must have unique stable IDs');
assert.ok(html.includes("const topicById="),'Career paths must resolve topics by persistent ID');
assert.ok(!html.includes('data-atlas-command'),'Global command search must be removed');
assert.ok(!html.includes('data-page="progresso"'),'Progress must be integrated in overview');
assert.ok(html.includes('atlas-backup-actions'),'Overview backup tools required');
assert.ok(html.includes('atlasCertLegend()'),'Certification priority legend missing');
assert.ok(html.includes('atlas-curriculum.js?v='),'Curriculum script must load');
assert.ok(html.includes('atlas-pro.js?v='),'Interaction script must load');
assert.ok(html.includes('atlas-pro.css?v='),'Interface styles must load');
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length,'CSS braces unbalanced');
console.log('IAM Atlas quality OK: scripts parse; 28 unique lessons, 6 labs, unified overview, cert legend and assets.');
