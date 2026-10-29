import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';

const cwd=join(dirname(fileURLToPath(import.meta.url)),'..');
const server=spawn('python3',['-m','http.server','8239','--bind','127.0.0.1'],{cwd,stdio:'ignore'});
const base='http://127.0.0.1:8239/';
const errors=[];
let browser;
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function tryReady(){
 for(let i=0;i<50;i++){
  try{const r=await fetch(base);if(r.ok)return}catch{}
  await pause(200);
 }
 throw Error('Servidor local não iniciou');
}
function attach(page,label){
 page.on('pageerror',err=>errors.push(label+': '+err.message));
 page.on('console',msg=>{if(msg.type()==='error')errors.push(label+' console: '+msg.text())});
}
async function fits(page,label){
 const measurements=await page.evaluate(()=>({
  doc:document.documentElement.scrollWidth,
  viewport:document.documentElement.clientWidth,
  body:document.body.scrollWidth
 }));
 assert.ok(measurements.doc<=measurements.viewport+2,
  label+': transbordamento horizontal: '+JSON.stringify(measurements));
}
async function findAndUse(page,selector){
 await page.locator(selector).first().click();
 await pause(600);
}
try{
 await tryReady();
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 await mkdir(join(cwd,'artifacts'),{recursive:true});
 const desktop=await browser.newPage({viewport:{width:1600,height:900},deviceScaleFactor:1});
 attach(desktop,'desktop');
 await desktop.goto(base,{waitUntil:'networkidle'});
 await desktop.locator('#home-path .home-path-card').first().waitFor();
 assert.equal(await desktop.locator('.home-path-card').count(),11);
 assert.equal(await desktop.locator('.primary-nav a').count(),4);
 assert.equal(await desktop.locator('.sidebar').count(),0);
 const theme=await desktop.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor);
 assert.equal(theme,'rgb(5, 5, 5)');
 await fits(desktop,'home desktop');
 await desktop.screenshot({path:join(cwd,'artifacts/home-desktop.png'),fullPage:true});
 await findAndUse(desktop,'.primary-nav a[data-page="studies"]');
 assert.equal(await desktop.locator('#page-studies').isVisible(),true);
 await desktop.locator('#study-environment > summary').click();
 assert.equal(await desktop.locator('#lab-profile').isVisible(),true);
 assert.equal(await desktop.locator('#lab-planner').isVisible(),true);
 assert.match(await desktop.locator('#hardware-advice').innerText(),/VirtualBox|RAM/);
 await fits(desktop,'jornada desktop');
 await desktop.locator('#study-environment > summary').click();
 await findAndUse(desktop,'.primary-nav a[data-page="architecture"]');
 assert.equal(await desktop.locator('#arch-atlas').isVisible(),true);
 assert.equal(await desktop.locator('.atlas-module').count(),11);
 assert.equal(await desktop.locator('.atlas-lesson').count(),41);
 assert.equal(await desktop.locator('.atlas-step').count(),296);
 assert.equal(await desktop.locator('.atlas-system-card').count(),14);
 assert.equal(await desktop.locator('.atlas-edge').count(),15);
 await fits(desktop,'arquitetura desktop');
 await desktop.screenshot({path:join(cwd,'artifacts/arquitetura-desktop.png'),fullPage:true});
 await desktop.goto(base+'#arch-lesson-iam-3-1',{waitUntil:'networkidle'});
 assert.equal(await desktop.locator('#arch-lesson-iam-3-1').getAttribute('open'),'');
 await desktop.goto(base+'#task-prep-route',{waitUntil:'networkidle'});
 await desktop.locator('#lesson-reader').waitFor({state:'visible'});
 assert.ok((await desktop.locator('#lesson-reader').innerText()).includes('Conhecer a empresa'));
 await fits(desktop,'aula desktop');
 const phone=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 attach(phone,'mobile');
 await phone.goto(base,{waitUntil:'networkidle'});
 await phone.locator('.home-path-card').first().waitFor();
 await fits(phone,'home mobile');
 await phone.screenshot({path:join(cwd,'artifacts/home-mobile.png'),fullPage:true});
 await phone.goto(base+'#laboratorio',{waitUntil:'networkidle'});
 await phone.locator('#study-environment[open]').waitFor();
 await fits(phone,'laboratorio mobile');
 await phone.screenshot({path:join(cwd,'artifacts/jornada-mobile.png'),fullPage:true});
 await phone.goto(base+'#arquitetura',{waitUntil:'networkidle'});
 await phone.locator('.atlas-systems-grid .atlas-system-card').first().waitFor();
 await fits(phone,'arquitetura mobile');
 assert.equal(await phone.locator('.atlas-step').count(),296);
 assert.deepEqual(errors,[],'Falhas do console JavaScript: '+errors.join('\n'));
 console.log('E2E OK: desktop 1600px, mobile 390px, navegação, jornada integrada, atlas, 296 passos, leitor de aulas, sem overflow.');
}catch(error){
 console.error('E2E FALHOU:',error.stack||error);
 if(errors.length)console.error('Erros JS:',errors);
 process.exitCode=1;
}finally{
 await browser?.close().catch(()=>{});
 server.kill('SIGTERM');
}