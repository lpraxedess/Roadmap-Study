import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const mock=[
"const mk=(tag='div')=>({tagName:tag.toUpperCase(),children:[],dataset:{},style:{},open:false,checked:false,value:'',textContent:'',classList:{add(){},remove(){},toggle(){}},append(...x){this.children.push(...x)},replaceChildren(...x){this.children=x},setAttribute(k,v){this[k]=v},focus(){},click(){}});",
"const nodes={'#overallTop':mk(),'#crumb':mk(),'#view':mk(),'#navToggle':mk()};",
"const nav=['dashboard','content','roadmap','labs','certs','review','settings'].map(v=>{let n=mk('button');n.dataset.view=v;return n});",
"const document={createElement:mk,querySelector:q=>nodes[q]||mk(),querySelectorAll:q=>nav,addEventListener(){},activeElement:null};",
"const localStorage={getItem:()=>null,setItem(){}};",
"const window={addEventListener(){},scrollTo(){}};",
"const location={hash:'',pathname:'/Roadmap-Study/',search:'',href:'https://example.invalid/'};",
"const history={pushState(_,__,url){location.hash='#'+url.split('#')[1]}};",
"const navigator={},alert=()=>{},confirm=()=>true;"
].join('\n');
const program=['data/catalog.js','data/expanded.js','data/learning.js','assets/experience.js','assets/app.js'].map(read).join('\n');
const run=lines=>JSON.parse(runInNewContext(mock+'\n'+program+'\n'+lines.join('\n'),{}, {timeout:15000}));
test('renderiza todas as páginas, 242 aulas e 16 laboratórios',()=>{
 const outputs=run([
 "let out=[];",
 "for(const [label,fn] of [['dashboard',experienceDashboard],['roadmap',experienceRoadmap],['content',experienceLibrary],['certs',experienceCertifications],['review',experienceReview]])out.push([label,fn().children.length]);",
 "for(let m=0;m<DATA.modules.length;m++){activeModule=m;out.push(['module-'+m,experienceModule().children.length]);for(let s=0;s<DATA.modules[m].length-3;s++){activeSkill=s;out.push(['topic-'+m+'-'+s,experienceSkill().children.length])}}",
 "for(const l of LABS){activeLab=l.id;out.push([l.id,experienceLabs().children.length])}",
 "activeLab=null;out.push(['labs',experienceLabs().children.length]);",
 "JSON.stringify(out)"
 ]);
 assert.equal(outputs.length,5+29+242+16+1);
 outputs.forEach(([label,n])=>assert.ok(n>0,'página vazia: '+label));
});
test('navegação com links diretos preserva índices de progresso',()=>{
 const output=run([
 "navigate('content');const a=location.hash;",
 "activeModule=9;activeSkill=0;navigate('skill');const b=location.hash;",
 "openLab('lab-02');const c=location.hash;",
 "JSON.stringify({a,b,c,legacy:KEY,labKey:LABKEY,checkKey:CHECKKEY,stepKey:STEPKEY})"
 ]);
 assert.equal(output.a,'#content');assert.equal(output.b,'#topic/9/0');assert.equal(output.c,'#lab/lab-02');
 assert.equal(output.legacy,'roadmap-iam-knowledge-v2');
 assert.equal(output.checkKey,'iam-atlas-lesson-checks-v1');
});
