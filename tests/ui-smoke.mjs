import assert from 'node:assert/strict';
import {spawn,spawnSync} from 'node:child_process';
import {createServer} from 'node:http';
import {readFileSync,existsSync,mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {setTimeout as pause} from 'node:timers/promises';

// Teste de interface com Chrome real, sem pacotes npm.
const root=process.cwd();
const permitted=new Set(['index.html','style.css','curriculum.js','app.js','navigation.js','motion.js']);
const mime={'html':'text/html','css':'text/css','js':'application/javascript'};
const server=createServer((req,res)=>{
 const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1)||'index.html';
 if(!permitted.has(name)){res.writeHead(404);res.end();return}
 const type=name.split('.').at(-1);
 try{res.writeHead(200,{'content-type':mime[type]+'; charset=utf-8','cache-control':'no-store'});res.end(readFileSync(join(root,name)))}
 catch{res.writeHead(404);res.end()}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const port=server.address().port;
const chrome=process.env.CHROME_PATH||['google-chrome','google-chrome-stable','chromium','chromium-browser'].find(name=>spawnSync('which',[name],{stdio:'ignore'}).status===0);
if(!chrome){server.close();throw Error('Chrome ou Chromium não encontrado para o teste de interface')}
const profile=mkdtempSync(join(tmpdir(),'iam-smoke-'));
const browser=spawn(chrome,['--headless=new','--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--no-first-run' ,'--remote-allow-origins=*','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore'});
let socket;
let sequence=0;
const pending=new Map();
function send(method,params={}){
 const id=++sequence;
 return new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>{pending.delete(id);reject(Error('Timeout CDP: '+method))},8000);
  pending.set(id,{resolve,reject,timer});
  socket.send(JSON.stringify({id,method,params}));
 });
}
async function evaluate(expression){
 const response=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
 if(response.exceptionDetails)throw Error('JS browser: '+response.exceptionDetails.text);
 return response.result?.value;
}
async function until(expression,label){
 for(let n=0;n<85;n++){
  if(await evaluate(expression).catch(()=>false))return;
  await pause(100);
 }
 throw Error('Falha aguardando: '+label);
}
async function screenshot(name){
 await pause(520); // Capture only after the view-transition finishes.
 const result=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 mkdirSync(join(root,'_artifacts'),{recursive:true});
 writeFileSync(join(root,'_artifacts',name+'.png'),Buffer.from(result.data,'base64'));
}
try{
 let debugPort;
 for(let n=0;n<80;n++){
  const active=join(profile,'DevToolsActivePort');
  if(existsSync(active)){debugPort=Number(readFileSync(active,'utf8').split('\n')[0]);break}
  if(browser.exitCode!==null)throw Error('Chrome encerrou antes do DevTools iniciar');
  await pause(100);
 }
 if(!debugPort)throw Error('Chrome não abriu a porta de depuração');
 const targets=await (await fetch('http://127.0.0.1:'+debugPort+'/json/list')).json();
 const page=targets.find(item=>item.type==='page');
 assert.ok(page?.webSocketDebuggerUrl,'Alvo de página não encontrado');
 socket=new WebSocket(page.webSocketDebuggerUrl);
 socket.addEventListener('message',event=>{
  const message=JSON.parse(event.data);
  if(!message.id||!pending.has(message.id))return;
  const item=pending.get(message.id);pending.delete(message.id);clearTimeout(item.timer);
  if(message.error)item.reject(Error(message.error.message));else item.resolve(message.result||{});
 });
 await new Promise((resolve,reject)=>{
  socket.addEventListener('open',resolve,{once:true});
  socket.addEventListener('error',reject,{once:true});
 });
 await send('Page.enable');await send('Runtime.enable');
 await send('Emulation.setDeviceMetricsOverride',{width:1600,height:900,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url:'http://127.0.0.1:'+port+'/#visao-geral'});
 await until('document.readyState==="complete" && document.querySelectorAll(".study-accordion").length===10 && document.querySelectorAll(".cert-card").length===18','carregamento dos dados');
 let layout=await evaluate('({page:document.documentElement.scrollWidth,viewport:innerWidth,shell:Math.round(document.querySelector(".app-shell").getBoundingClientRect().width),menu:getComputedStyle(document.querySelector("#menu-toggle")).display})');
 assert.ok(layout.page<=layout.viewport+2,'Overflow horizontal desktop: '+JSON.stringify(layout));
 assert.ok(layout.shell>=layout.viewport-70,'Largura desktop subaproveitada: '+JSON.stringify(layout));
 assert.equal(layout.menu,'none','Menu mobile aparece no desktop');
 await screenshot('overview-desktop');
 await evaluate('document.querySelector("[data-page=studies]").click()');
 await until('!document.querySelector("#page-studies").hidden','navegação Estudos');
 assert.equal(await evaluate('document.querySelectorAll(".study-accordion[open]").length'),0,'Módulos deveriam iniciar recolhidos');
 await evaluate('(()=>{const mod=document.querySelector(".study-accordion");mod.open=true;const task=mod.querySelector(".task");task.open=true;for(const step of task.querySelectorAll(".step-confirm")){step.checked=true;step.dispatchEvent(new Event("change",{bubbles:true}))}const box=task.querySelector(".task-check");box.checked=true;box.dispatchEvent(new Event("change",{bubbles:true}));return true})()');
 const state=await evaluate('({modules:document.querySelectorAll(".study-accordion[open]").length,tasks:document.querySelectorAll("#roadmap-list .task[open]").length,done:JSON.parse(localStorage.getItem("roadmap-iam-progress-v2")||"[]").length})');
 assert.deepEqual(state,{modules:1,tasks:1,done:1},'Restauração de módulos e progresso incorreta');
 await screenshot('study-desktop');
 await evaluate('document.querySelector("[data-page=certifications]").click()');
 await until('!document.querySelector("#page-certifications").hidden','navegação Certificações');
 assert.equal(await evaluate('document.querySelectorAll(".cert-card").length'),18,'Certificações incompletas');
 await screenshot('certifications-desktop');
 const provider=await evaluate('(()=>{const el=document.querySelector("#cert-provider");el.value="Okta";el.dispatchEvent(new Event("change",{bubbles:true}));return document.querySelectorAll(".cert-card").length})()');
 assert.equal(provider,3,'Filtro por fornecedor não funciona');
 const earned=await evaluate('(()=>{const el=document.querySelector(".cert-card .cert-select");el.value="earned";el.dispatchEvent(new Event("change",{bubbles:true}));return JSON.parse(localStorage.getItem("roadmap-iam-certifications-v1")||"{}")["okta-pro"]})()');
 assert.equal(earned,'earned','Status de certificações não foi salvo');
 await evaluate('history.back()');
 await until('!document.querySelector("#page-studies").hidden','botão Voltar');
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await send('Page.reload',{ignoreCache:true});
 await until('document.readyState==="complete" && document.querySelectorAll(".study-accordion").length===10','layout mobile carregado');
 layout=await evaluate('({page:document.documentElement.scrollWidth,viewport:innerWidth,menu:getComputedStyle(document.querySelector("#menu-toggle")).display})');
 assert.ok(layout.page<=layout.viewport+2,'Overflow horizontal mobile: '+JSON.stringify(layout));
 assert.notEqual(layout.menu,'none','Menu mobile invisível');
 await evaluate('document.querySelector("#menu-toggle").click()');
 assert.ok(await evaluate('document.body.classList.contains("nav-open")'),'Drawer mobile não abriu');
 await evaluate('document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))');
 assert.ok(!await evaluate('document.body.classList.contains("nav-open")'),'Escape não fechou o drawer');
 await screenshot('studies-mobile');
 for(const width of [320,768,1200,2560]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<=1050});
  await pause(110);
  const size=await evaluate('({page:document.documentElement.scrollWidth,viewport:innerWidth})');
  assert.ok(size.page<=size.viewport+2,'Overflow horizontal '+width+'px: '+JSON.stringify(size));
 }
 console.log('BROWSER SMOKE OK: 320, 390, 768, 1200, 1600 e 2560px; estudo, persistência, filtros, histórico e drawer.');
}catch(error){
 console.error('TESTE DE NAVEGADOR FALHOU:',error?.stack||error);
 process.exitCode=1;
}finally{
 for(const item of pending.values()){clearTimeout(item.timer);item.reject(Error('CDP encerrado'))}
 pending.clear();
 if(socket&&socket.readyState===WebSocket.OPEN)socket.close();
 if(browser.exitCode===null){
  browser.kill('SIGTERM');
  await Promise.race([new Promise(resolve=>browser.once('exit',resolve)),pause(1200)]);
 }
 await new Promise(resolve=>server.close(resolve));
 try{rmSync(profile,{recursive:true,force:true,maxRetries:8,retryDelay:120})}
 catch(error){console.warn('Aviso ao limpar perfil temporário do Chrome:',error.message)}
}
