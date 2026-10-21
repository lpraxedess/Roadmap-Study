import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const mock=[
"const mk=(tag='div')=>({tagName:tag.toUpperCase(),children:[],dataset:{},style:{},open:false,checked:false,value:'',textContent:'',classList:{add(){},remove(){},toggle(){}},append(...x){this.children.push(...x)},replaceChildren(...x){this.children=x},setAttribute(k,v){this[k]=v},focus(){},click(){}});",
"const nodes={'#overallTop':mk(),'#crumb':mk(),'#view':mk(),'#navToggle':mk()};",
"const nav=['dashboard','roadmap','labs','certs'].map(v=>{let n=mk('button');n.dataset.view=v;return n});",
"const document={createElement:mk,querySelector:q=>nodes[q]||mk(),querySelectorAll:q=>nav,addEventListener(){},activeElement:null};",
"const storage={};const localStorage={getItem:k=>storage[k]||null,setItem:(k,v)=>{storage[k]=v}};",
"const window={addEventListener(){},scrollTo(){}};",
"const location={hash:'',pathname:'/Roadmap-Study/',search:'',href:'https://example.invalid/'};",
"const history={pushState(_,__,url){location.hash='#'+url.split('#')[1]}};",
"const navigator={},alert=()=>{},confirm=()=>true;"
].join('\n');
const program=[
'data/catalog.js','data/expanded.js','data/learning.js','data/company-lab.js','data/topic-practice.js','data/didactics.js',
'assets/experience.js','assets/v3.js','data/lab-courses.js','data/course-assessments.js','assets/lab-platform.js','assets/course-quiz.js','assets/app.js'].map(read).join('\n');
const run=code=>JSON.parse(runInNewContext(mock+'\n'+program+'\n'+code,{}, {timeout:20000}));
test('painel, roadmap, certificações, 29 módulos e 242 aulas são montados',()=>{
 const output=run([
 'let out=[];',
 "for(const [label,fn] of [['dashboard',experienceDashboard],['roadmap',experienceRoadmap],['labs',experienceLaboratories],['certs',experienceCertifications]])out.push([label,fn().children.length]);",
 "for(let m=0;m<DATA.modules.length;m++){activeModule=m;out.push(['module-'+m,experienceModule().children.length]);for(let s=0;s<DATA.modules[m].length-3;s++){activeSkill=s;out.push(['topic-'+m+'-'+s,experienceSkill().children.length])}}",
 'JSON.stringify(out)'
 ].join('\n'));
 assert.equal(output.length,4+29+242);
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
test('rotas legadas do laboratório abrem a jornada Cloud',()=>{
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
 assert.equal(result.view,'labs');
 assert.equal(result.legacyKey,'roadmap-iam-knowledge-v2');
});
test('backup e progresso corporativo utilizam chaves locais compatíveis',()=>{
 const result=run([
 "companyStepState['lab-02']={0:true};state['9-0']=2;persist();",
 "JSON.stringify({progress:JSON.parse(storage[KEY])['9-0'],company:JSON.parse(storage[COMPANY_STEP_KEY])['lab-02'][0],source:storage[LABKEY]!==undefined})"
 ].join('\n'));
 assert.equal(result.progress,2);assert.equal(result.company,true);assert.equal(result.source,true);
});
test('navegação visual contém quatro áreas com laboratório separado',()=>{
 const html=read('index.html');
 assert.equal((html.match(/data-view=/g)||[]).length,4);
 for(const v of ['dashboard','roadmap','labs','certs'])assert.ok(html.includes('data-view="'+v+'"'));
 for(const v of ['content','review','settings'])assert.ok(!html.includes('data-view="'+v+'"'));
 assert.match(html,/ROADMAP - IAM/);
 const assets=['data/catalog.js','data/expanded.js','data/learning.js','data/company-lab.js','data/topic-practice.js','data/didactics.js','assets/experience.js','assets/v3.js','data/lab-courses.js','data/course-assessments.js','assets/lab-platform.js','assets/course-quiz.js','assets/app.js'];
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


test('242 aulas possuem explicação, caso específico e fonte de consulta',()=>{
 const items=run("JSON.stringify({all:Object.values(TOPIC_LEARNING).map(v=>({definition:v.definition.length,purpose:v.purpose.length,mechanism:v.mechanism.length,scenario:v.scenario.length,source:v.source,question:v.question})),hasNoArtificialLab:!(TOPIC_PRACTICE['0-0']||[]).length})");
 assert.equal(items.all.length,242);
 for(const x of items.all){
  assert.ok(x.definition>=50,'definição excessivamente curta');
  assert.ok(x.purpose>=25,'finalidade excessivamente curta');
  assert.ok(x.mechanism>=70,'explicação de mecanismo curta');
  assert.ok(x.scenario>=35,'falta cenário de estudo');
  assert.match(x.source,/^https:\/\//,'fonte ausente');
  assert.ok(x.question.length>25);
 }
 assert.equal(items.hasNoArtificialLab,true);
});
test('evidências têm identificadores independentes da posição e são salvas separadamente',()=>{
 const x=run([
 "const key=stableTaskKey('lab-03',0);",
 "practiceProof[key]={mode:'real',note:'Leitura autorizada; escrita negada; registro sanitizado.'};",
 "companyStepState['lab-03']={0:true};",
 "persist();",
 "JSON.stringify({key,proof:JSON.parse(storage[PRACTICE_PROOF_KEY])[key],done:JSON.parse(storage[COMPANY_STEP_KEY])['lab-03'][0],unique:LABS.every(l=>new Set(COMPANY_CHAPTERS[l.id].tasks.map((_,i)=>stableTaskKey(l.id,i))).size===COMPANY_CHAPTERS[l.id].tasks.length)})"
 ].join('\n'));
 assert.equal(x.proof.mode,'real');
 assert.equal(x.done,true);
 assert.equal(x.unique,true);
 assert.match(x.key,/^lab-03:/);
});
test('backup inclui evidências tipadas e preserva importação legada',()=>{
 const app=read('assets/app.js');
 assert.ok(app.includes('version:8,schema:"roadmap-iam-v2"'));
 assert.ok(app.includes('practiceEvidence:practiceProof'));
 assert.ok(app.includes('![2,3,4,5,6,7,8].includes(x.version)'));
 assert.ok(app.includes('if(x.version>=7&&x.companyProcedures'));
});
test('cores principais predominantemente pretas e controles acessíveis',()=>{
 const css=read('assets/styles.css');
 assert.equal((css.match(/:root\s*\{/g)||[]).length,1);
 assert.ok(css.includes('background:#000!important'));
 assert.ok(css.includes('min-height:44px'));
 assert.ok(css.includes('prefers-reduced-motion:reduce'));
});


test('duas jornadas práticas e 94 procedimentos originais preservados',()=>{
 const x=run("JSON.stringify({tracks:COURSE_TRACKS.map(t=>t.id),local:ONPREM_STAGES.map(s=>s.steps.length),cloud:CLOUD_CHAPTER_ORDER.length,micro:CLOUD_CHAPTER_ORDER.reduce((n,id)=>n+COMPANY_CHAPTERS[id].tasks.length,0)})");
 assert.deepEqual(x.tracks,['onprem','cloud']);assert.equal(x.local.length,12);
 assert.ok(x.local.every(n=>n>=6));assert.equal(x.cloud,16);assert.equal(x.micro,94);
});
test('rotas dos laboratórios aceitam etapa e preservam legado',()=>{
 const x=run(["courseSetNav('onprem','op03');const local=location.hash;","courseSetNav('cloud','lab-02');const cloud=location.hash;","location.hash='#lab/lab-03';restoreHash();","JSON.stringify({local,cloud,view,activeLabTrack,activeLabChapter})"].join('\n'));
 assert.equal(x.local,'#lab/onprem/op03');assert.equal(x.cloud,'#lab/cloud/lab-02');
 assert.equal(x.view,'labs');assert.equal(x.activeLabTrack,'cloud');assert.equal(x.activeLabChapter,'lab-03');
});
test('laboratórios são renderizados e registram progresso sem alterar os dados teóricos',()=>{
 const x=run(["courseLabState.onprem={op01:{steps:{0:true,1:true},mode:'real',note:'Teste seguro e evidenciado'}};persist();","activeLabTrack='onprem';activeLabChapter='op01';const a=experienceLaboratories().children.length;","activeLabTrack='cloud';activeLabChapter='lab-02';const b=experienceLaboratories().children.length;","JSON.stringify({a,b,local:JSON.parse(storage[COURSE_LAB_KEY]).onprem.op01.steps[1]})"].join('\n'));
 assert.ok(x.a>0&&x.b>0);assert.equal(x.local,true);
});

test('layout usa contêiner e capítulo dispensado não conta como executado',()=>{
 const x=run([
 "let home=experienceLaboratories();",
 "let isGrid=home.children.some(c=>c.className==='course-tracks'&&c.children.length===2);",
 "const before=courseTrackProgress('cloud');",
 "const blocked=courseExcludeChapter('lab-07','curto');",
 "const skipped=courseExcludeChapter('lab-07','Sem Azure pago, meta de consumo zero.');",
 "const after=courseTrackProgress('cloud');",
 "const resumed=courseExcludeChapter('lab-07',null);",
 "const final=courseTrackProgress('cloud');",
 "JSON.stringify({isGrid,blocked,skipped,after,original:before,final,resumed})"
 ].join('\n'));
 assert.equal(x.isGrid,true);assert.equal(x.blocked,false);assert.equal(x.skipped,true);
 assert.equal(x.after.excluded,1);assert.equal(x.original.total-x.after.total,5);
 assert.equal(x.final.total,x.original.total);assert.equal(x.after.done,0);
});
test('curso exige modalidade e nota, e avaliações teóricas são independentes',()=>{
 const x=run([
 "const every=ONPREM_STAGES.every(x=>COURSE_QUIZZES[x.id]?.length===2)&&CLOUD_CHAPTER_ORDER.every(id=>COURSE_QUIZZES[id]?.length===2);",
 "const valid=Object.values(COURSE_QUIZZES).every(qs=>qs.every(q=>q[2]>=0&&q[2]<q[1].length));",
 "courseAssessmentState['onprem/op01']={answers:[1,0],score:100,attempts:1,gradedAt:'2026-10-21'};",
 "persist();",
 "JSON.stringify({every,valid,good:courseCanClaim('real','Log UTC e teste negado'),bad:courseCanClaim('real',''),quizzes:Object.keys(COURSE_QUIZZES).length,graded:courseQuizPass('onprem','op01'),saved:JSON.parse(storage[COURSE_ASSESS_KEY])['onprem/op01'].score,ui:courseQuiz('onprem','op01').children.length})"
 ].join('\n'));
 assert.equal(x.every,true);assert.equal(x.valid,true);assert.equal(x.quizzes,28);
 assert.equal(x.good,true);assert.equal(x.bad,false);
 assert.equal(x.graded,true);assert.equal(x.saved,100);assert.ok(x.ui>4);
});
test('execução autodeclarada e aprovação de quiz não emitem certificados',()=>{
 const x=run([
 "companyStepState['lab-02']={0:true};",
 "practiceProof[stableTaskKey('lab-02',0)]={mode:'real',note:'Log MFA piloto UTC 2026-10-21'};",
 "const report=courseEvaluationSummary('cloud');",
 "JSON.stringify({real:report.real,quiz:report.passed,certs:certifications.filter(c=>certState[c.id]===true).length})"
 ].join('\n'));
 assert.equal(x.real,1);assert.equal(x.quiz,0);assert.equal(x.certs,0);
});
