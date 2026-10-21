#!/usr/bin/env node
'use strict';
/* Sem dependências. Rode na raiz: node tests/smoke.cjs */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('atlas-curriculum.js'),ctx,{filename:'atlas-curriculum.js'});
vm.runInContext(read('atlas-entra-lab.js'),ctx,{filename:'atlas-entra-lab.js'});
const curriculum=ctx.window.IAMAtlasCurriculum,stages=curriculum.environment.stages;
assert.equal(stages.length,36,'Total de laboratórios');
assert.equal(stages.reduce((n,s)=>n+s.steps.length,0),189,'Total de atividades');
const profiles=stages.map(x=>x.profile),order=['core','microsoft','local','hybrid'];
assert.deepEqual([...new Set(profiles)],order,'AD → Entra → Intune → integração');
assert.equal(stages.findIndex(s=>s.profile==='local'),26,'Intune inicia apenas após 26 etapas IAM/AD');
stages.forEach((s,i)=>{
 assert.ok(s.title&&s.goal&&s.needs&&s.license&&s.guide?.why&&s.guide?.where&&s.guide?.note&&s.reference, 'Metadados '+(i+1));
 assert.ok(s.reference.startsWith('https://'),'Referência HTTPS '+(i+1));
 assert.equal(s.guide.reasons.length,s.steps.length,'Porquê individual '+(i+1));
 s.steps.forEach((t,j)=>{
  assert.ok(t[0]&&t[1]&&t[2]&&s.guide.reasons[j], 'Completar procedimento '+(i+1)+'.'+(j+1));
 });
});
const html=read('index.html');
new vm.Script(html.split('<script>\n')[1].split('</script>')[0],{filename:'inline-index.js'});
for(const resource of ['atlas-curriculum.js','atlas-entra-lab.js','atlas-pro.css','atlas-entra-theme.css','atlas-pro.js'])assert.ok(html.includes(resource),'Recurso '+resource);
for(const obsolete of ['atlas-enterprise.js','Keycloak','Samba AD'])assert.ok(!html.includes(obsolete),'Referência obsoleta: '+obsolete);
assert.ok(html.includes('iam-atlas-checklist-entra-v2'),'Checklist do novo currículo');
assert.ok(html.includes('Report-only'),'Segurança de CA');
assert.equal(curriculum.atlasPlan.pricing.totalOnePilot,103.10,'Preço de referência piloto');
assert.ok(curriculum.atlasPlan.pricing.twoP2OneIntune>150,'Segundo P2 ultrapassa teto');
console.log('OK: 36 labs, 189 atividades, 4 fases sequenciais, sintaxe e links locais.');

/* Teste de execução do JavaScript inicial em DOM mínimo. Sintaxe válida não garante tela renderizada! */
const inline=html.split('<script>')[1]?.split('</script>')[0];
assert.ok(inline,'Script inline encontrado');
const expected={'#inicio':'Seu progresso','#labs':'Laboratório de IAM','#roadmap':'Roadmap de competências','#certs':'Certificações IAM'};
for(const [hash,phrase] of Object.entries(expected)){
 const elements=new Map();
 const element=id=>{if(!elements.has(id))elements.set(id,{
  id,innerHTML:'',value:'',dataset:{},hidden:false,style:{},
  classList:{add(){},remove(){},toggle(){}},
  setAttribute(){},addEventListener(){},getAttribute(){return ''},
  querySelector(){return element('child')},querySelectorAll(){return []},
  closest(){return null},scrollIntoView(){}
 });return elements.get(id)};
 const document={
  getElementById:element,querySelector(){return element('query')},
  querySelectorAll(){return []},addEventListener(){},createElement(){return element('created')}
 };
 const storage={getItem(){return null},setItem(){},removeItem(){}};
 const window={
  IAMAtlasCurriculum:curriculum,
  matchMedia(){return {matches:true}},
  addEventListener(){},scrollTo(){}
 };
 const context={
  document,window,location:{hash},localStorage:storage,sessionStorage:storage,
  setTimeout:()=>0,clearTimeout(){},matchMedia:window.matchMedia,
  requestAnimationFrame:cb=>cb(),confirm:()=>true,alert(){},
  URL:{},Blob:function(){}
 };
 vm.runInNewContext(inline,context,{filename:'inline-'+hash.slice(1)+'.js',timeout:5000});
 assert.ok(element('app').innerHTML.includes(phrase),'Página '+hash+' não renderizou: '+phrase);
}
console.log('OK: renderização real inicial das 4 páginas, além das validações estáticas.');
