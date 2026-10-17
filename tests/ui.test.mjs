import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const mock=[
"const mk=(tag='div')=>({tagName:tag.toUpperCase(),children:[],dataset:{},style:{},open:false,checked:false,value:'',textContent:'',classList:{add(){},remove(){},toggle(){}},append(...x){this.children.push(...x)},replaceChildren(...x){this.children=x},setAttribute(k,v){this[k]=v},focus(){},click(){}});",
"const nodes={'#overallTop':mk(),'#crumb':mk(),'#view':mk(),'#navToggle':mk()};",
"const nav=['dashboard','roadmap','certs'].map(v=>{let n=mk('button');n.dataset.view=v;return n});",
"const document={createElement:mk,querySelector:q=>nodes[q]||mk(),querySelectorAll:q=>nav,addEventListener(){},activeElement:null};",
"const storage={};const localStorage={getItem:k=>storage[k]||null,setItem:(k,v)=>{storage[k]=v}};",
"const window={addEventListener(){},scrollTo(){}};",
"const location={hash:'',pathname:'/Roadmap-Study/',search:'',href:'https://example.invalid/'};",
"const history={pushState(_,__,url){location.hash='#'+url.split('#')[1]}};",
"const navigator={},alert=()=>{},confirm=()=>true;"
].join('\n');
const program=[
'data/catalog.js','data/expanded.js','data/learning.js','data/company-lab.js','data/topic-practice.js',
'assets/experience.js','assets/v3.js','assets/app.js'].map(read).join('\n');
const run=code=>JSON.parse(runInNewContext(mock+'\n'+program+'\n'+code,{}, {timeout:20000}));
test('painel, roadmap, certificações, 29 módulos e 242 aulas são montados',()=>{
 const output=run([
 'let out=[];',
 "for(const [label,fn] of [['dashboard',experienceDashboard],['roadmap',experienceRoadmap],['certs',experienceCertifications]])out.push([label,fn().children.length]);",
 "for(let m=0;m<DATA.modules.length;m++){activeModule=m;out.push(['module-'+m,experienceModule().children.length]);for(let s=0;s<DATA.modules[m].length-3;s++){activeSkill=s;out.push(['topic-'+m+'-'+s,experienceSkill().children.length])}}",
 'JSON.stringify(out)'
 ].join('\n'));
 assert.equal(output.length,3+29+242);
 output.forEach(([label,n])=>assert.ok(n>0,'página vazia: '+label));
});
test('roadmap apresenta níveis iniciante, intermediário e avançado',()=>{
 const result=run("JSON.stringify({sizes:ROADMAP_LEVELS.map(x=>x.ids.length),all:ROADMAP_LEVELS.flatMap(x=>x.ids),names:ROADMAP_LEVELS.map(x=>x.name)})");
 assert.deepEqual(result.sizes,[11,10,8]);
 assert.deepEqual(result.names,['Iniciante','Intermediário','Avançado']);
 assert.equal(new Set(result.all).size,29);
});
test('a jornada empresarial contém 16 capítulos com microprocedimentos e critérios',()=>{
 const result=run("JSON.stringify(LABS.map(l=>({id:l.id,steps:COMPANY_CHAPTERS[l.id].tasks.length,valid:COMPANY_CHAPTERS[l.id].tasks.every(t=>t.title.length>8&&t.path.length>8&&[t.action,t.reason,t.proof,t.issue].every(v=>typeof v==='string'&&v.length>18)),checks:COMPANY_CHAPTERS[l.id].verify.length})))");
 assert.equal(result.length,16);
 result.forEach(x=>{assert.ok(x.steps>=4,x.id);assert.equal(x.valid,true,x.id);assert.ok(x.checks>=3,x.id)});
 const p2=result.find(x=>x.id==='lab-02');assert.ok(p2.steps>=15,'Conditional Access P2 insuficiente');
});
test('prioridade de certificação usa classificação transparente',()=>{
 const c=run("JSON.stringify({groups:CERT_LEVELS.map(l=>l.certs),main:uxCertPriority(certifications.find(c=>c.id==='sc300')).label,frame:CERT_FRAMES})");
 assert.equal(c.main,'Principal da formação');
 assert.equal(new Set(c.groups.flat()).size,20);
 assert.deepEqual(c.frame,['nist','cis','nist53']);
});
test('rotas legadas do laboratório abrem o tema correspondente no roadmap',()=>{
 const result=run([
 "navigate('content');const contentRoute=location.hash;",
 "navigate('review');const reviewRoute=location.hash;",
 "navigate('settings');const settingsRoute=location.hash;",
 "openSkill(4,0);const topicRoute=location.hash;",
 "location.hash='#lab/lab-03';restoreHash();",
 "JSON.stringify({contentRoute,reviewRoute,settingsRoute,topicRoute,view,activeModule,activeSkill,legacyKey:KEY})"
 ].join('\n'));
 assert.equal(result.contentRoute,'#roadmap');
 assert.equal(result.reviewRoute,'#dashboard');
 assert.equal(result.settingsRoute,'#dashboard');
 assert.equal(result.topicRoute,'#topic/4/0');
 assert.equal(result.view,'skill');
 assert.equal(result.legacyKey,'roadmap-iam-knowledge-v2');
});
test('backup e progresso corporativo utilizam chaves locais compatíveis',()=>{
 const result=run([
 "companyStepState['lab-02']={0:true};state['9-0']=2;persist();",
 "JSON.stringify({progress:JSON.parse(storage[KEY])['9-0'],company:JSON.parse(storage[COMPANY_STEP_KEY])['lab-02'][0],source:storage[LABKEY]!==undefined})"
 ].join('\n'));
 assert.equal(result.progress,2);assert.equal(result.company,true);assert.equal(result.source,true);
});
test('navegação visual tem apenas quatro entradas, sem duplicação',()=>{
 const html=read('index.html');
 assert.equal((html.match(/data-view=/g)||[]).length,3);
 for(const v of ['dashboard','roadmap','certs'])assert.ok(html.includes('data-view="'+v+'"'));
 for(const v of ['content','review','settings','labs'])assert.ok(!html.includes('data-view="'+v+'"'));
 assert.match(html,/ROADMAP - IAM/);
 const assets=['data/catalog.js','data/expanded.js','data/learning.js','data/company-lab.js','data/topic-practice.js','assets/experience.js','assets/v3.js','assets/app.js'];
 let pos=-1;for(const asset of assets){let n=html.indexOf(asset);assert.ok(n>pos,asset+' fora de ordem');pos=n}
});


test('AtlasCorp aparece somente nas aulas que realmente possuem procedimento',()=>{
 const result=run("JSON.stringify({tcp:TOPIC_PRACTICE['0-0']||[],rbac:TOPIC_PRACTICE['4-0']||[],total:Object.values(TOPIC_PRACTICE).reduce((n,items)=>n+items.length,0),topics:Object.keys(TOPIC_PRACTICE).length})");
 assert.equal(result.tcp.length,0);
 assert.equal(result.rbac.length,5);
 assert.equal(result.total,94);
 assert.ok(result.topics>=60);
});
test('mesma ordem de navegação em Roadmap e botão próximo tema',()=>{
 const result=run("JSON.stringify({roadmap:ROADMAP_LEVELS.flatMap(l=>l.ids),learning:LEARNING_ORDER})");
 assert.deepEqual(result.roadmap,result.learning);
});
