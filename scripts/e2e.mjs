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
 assert.equal(await desktop.locator('.sidebar-primary-nav a').count(),4);
 assert.equal(await desktop.locator('.sidebar').count(),1);
 assert.ok(await desktop.locator('#sidebar').isVisible(),'Sidebar desktop invisível');
 assert.equal(await desktop.locator('#menu-toggle').isVisible(),false,'Menu móvel visível no desktop');
 const sidebarWidth=await desktop.locator('#sidebar').evaluate(el=>Math.round(el.getBoundingClientRect().width));
 assert.ok(sidebarWidth>=225&&sidebarWidth<=260,'Sidebar desktop fora do tamanho esperado: '+sidebarWidth);
 const theme=await desktop.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor);
 assert.equal(theme,'rgb(5, 5, 5)');
 await fits(desktop,'home desktop');
 await desktop.setViewportSize({width:2560,height:1200});
 await fits(desktop,'home ultrawide');
 const usable=await desktop.locator('#main-content').evaluate(el=>el.getBoundingClientRect().width);
 assert.ok(usable>=2250,'Conteúdo com sidebar está estreito em ultrawide: '+usable);
 await desktop.setViewportSize({width:1600,height:900});
 await desktop.screenshot({path:join(cwd,'artifacts/home-desktop.png'),fullPage:true});
 await findAndUse(desktop,'.sidebar-primary-nav a[data-page="studies"]');
 assert.equal(await desktop.locator('#page-studies').isVisible(),true);
 await desktop.locator('#study-environment > summary').click();
 assert.equal(await desktop.locator('#lab-profile').isVisible(),true);
 assert.equal(await desktop.locator('#lab-planner').isVisible(),true);
 assert.match(await desktop.locator('#hardware-advice').innerText(),/VirtualBox|RAM/);
 await fits(desktop,'jornada desktop');
 await desktop.locator('#search').fill('___termo_inexistente___');
 await desktop.locator('#empty').waitFor({state:'visible'});
 assert.equal(await desktop.locator('#roadmap-list .study-accordion').count(),0);
 await desktop.locator('#empty-clear-filters').click();
 assert.equal(await desktop.locator('#roadmap-list .study-accordion').count(),11,'Limpeza de filtros não restaurou o roteiro');
 await desktop.locator('#study-environment > summary').click();
 await findAndUse(desktop,'.sidebar-primary-nav a[data-page="architecture"]');
 assert.equal(await desktop.locator('#arch-atlas').isVisible(),true);
 assert.equal(await desktop.locator('.atlas-module').count(),11);
 assert.equal(await desktop.locator('.atlas-lesson').count(),41);
 assert.equal(await desktop.locator('.atlas-step').count(),296);
 assert.equal(await desktop.locator('.atlas-system-card').count(),14);
 assert.equal(await desktop.locator('.atlas-edge').count(),15);
 await fits(desktop,'arquitetura desktop');
 const technicalTitleColor=await desktop.locator('#arch-topology > h3').evaluate(el=>getComputedStyle(el).color);
 assert.equal(technicalTitleColor,'rgb(245, 245, 245)','Título técnico tem cor fora da paleta monocromática');
 await desktop.screenshot({path:join(cwd,'artifacts/arquitetura-desktop.png'),fullPage:true});
 await desktop.goto(base+'#arch-lesson-iam-3-1',{waitUntil:'networkidle'});
 assert.equal(await desktop.locator('#arch-lesson-iam-3-1').getAttribute('open'),'');
 await findAndUse(desktop,'.sidebar-primary-nav a[data-page="certifications"]');
 assert.equal(await desktop.locator('#page-certifications').isVisible(),true);
 assert.ok(await desktop.locator('.cert-card').count()>5);
 assert.equal(await desktop.locator('.cert-legend').count(),0,'Legenda redundante ainda aparece');
 assert.equal(await desktop.locator('.cert-classification-note').count(),0,'Texto de classificação redundante ainda aparece');
 assert.equal(await desktop.locator('.cert-priority').count(),18,'Cada cartão deve identificar sua prioridade');
 assert.equal(await desktop.locator('.cert-light--required').count()>=1,true);
 const beforePriority=await desktop.locator('.cert-card').filter({has:desktop.locator('#cert-sc300')}).getAttribute('data-priority');
 assert.equal(beforePriority,'required','SC-300 deve ser prioridade obrigatória do roteiro IAM');
 const filter=desktop.locator('#cert-priority');
 await filter.selectOption('recommended');
 assert.equal(await desktop.locator('.cert-card').count(),3,'Recomendadas devem aparecer no filtro');
 await filter.selectOption('all');
 await desktop.locator('#cert-sc300').selectOption('earned');
 const earned=desktop.locator('.cert-card').filter({has:desktop.locator('#cert-sc300')});
 assert.equal(await earned.getAttribute('data-priority'),'earned');
 assert.equal(await earned.locator('.cert-light--earned').count(),1);
 assert.match(await desktop.locator('#cert-progress').innerText(),/1 \/ 18/);
 await filter.selectOption('earned');
 assert.equal(await desktop.locator('.cert-card').count(),1,'Filtro concluídas não corresponde ao progresso');
 await filter.selectOption('all');
 await desktop.reload({waitUntil:'networkidle'});
 await desktop.locator('.sidebar-primary-nav a[data-page="certifications"]').click();
 assert.equal(await desktop.locator('#cert-sc300').inputValue(),'earned','Status não persistiu após recarregar');
 await fits(desktop,'certificações desktop');
 await desktop.screenshot({path:join(cwd,'artifacts/certificacoes-desktop.png'),fullPage:true});
 await desktop.goto(base+'#task-prep-route',{waitUntil:'networkidle'});
 await desktop.locator('#lesson-reader').waitFor({state:'visible'});
 assert.ok((await desktop.locator('#lesson-reader').innerText()).includes('Conhecer a empresa'));
 assert.equal(await desktop.locator('#lesson-reader').getByText('3. Validar e registrar evidência').count(),0);
 assert.equal(await desktop.locator('#lesson-reader').getByRole('heading',{name:'3. Concluir aula'}).count(),1);
 assert.equal(await desktop.locator('#lesson-reader .lesson-acceptance').count(),0,'Checklist duplicada ainda aparece');
 assert.equal(await desktop.locator('#lesson-reader .lesson-notes-optional').count(),1,'Anotações antigas devem continuar acessíveis');
 const finishCheck=desktop.locator('#lesson-reader .lesson-finish .check-row input');
 assert.equal(await finishCheck.isDisabled(),true,'Aula deve exigir a confirmação das microetapas');
 await desktop.locator('#guide-all-prep-route').click();
 const stepInputs=desktop.locator('#lesson-reader .guide-steps .check-row input');
 const stepCount=await stepInputs.count();
 assert.ok(stepCount>1);
 for(let i=0;i<stepCount;i++)await stepInputs.nth(i).check();
 assert.equal(await finishCheck.isDisabled(),true,'A modalidade da aula ainda é necessária');
 await desktop.locator('#mode-prep-route').selectOption('real');
 assert.equal(await finishCheck.isDisabled(),false);
 await finishCheck.check();
 assert.equal(await finishCheck.isChecked(),true);
 assert.notEqual(await desktop.locator('.header-start').getAttribute('href'),'#task-prep-route','O atalho Continuar não pode retornar à aula já concluída');
 await fits(desktop,'aula desktop');
 const phone=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 attach(phone,'mobile');
 await phone.goto(base,{waitUntil:'networkidle'});
 await phone.locator('.home-path-card').first().waitFor();
 await fits(phone,'home mobile');
 assert.equal(await phone.locator('#menu-toggle').isVisible(),true,'Botão de menu mobile não disponível');
 assert.equal(await phone.locator('#sidebar').isVisible(),false,'Sidebar mobile aberta indevidamente');
 await phone.locator('#menu-toggle').click();
 await phone.locator('#sidebar').waitFor({state:'visible'});
 assert.equal(await phone.locator('#menu-toggle').getAttribute('aria-expanded'),'true');
 await phone.keyboard.press('Escape');
 assert.equal(await phone.locator('#menu-toggle').getAttribute('aria-expanded'),'false');
 await phone.locator('#menu-toggle').click();
 await phone.locator('.sidebar-primary-nav a[data-page="certifications"]').click();
 assert.equal(await phone.locator('#page-certifications').isVisible(),true);
 assert.equal(await phone.locator('#sidebar').isVisible(),false,'Drawer não fechou após navegar');
 await fits(phone,'certificações mobile');
 await phone.screenshot({path:join(cwd,'artifacts/certificacoes-mobile.png'),fullPage:true});
 await phone.screenshot({path:join(cwd,'artifacts/home-mobile.png'),fullPage:true});
 await phone.goto(base+'#laboratorio',{waitUntil:'networkidle'});
 await phone.locator('#study-environment[open]').waitFor();
 await fits(phone,'laboratorio mobile');
 await phone.screenshot({path:join(cwd,'artifacts/jornada-mobile.png'),fullPage:true});
 await phone.goto(base+'#arquitetura',{waitUntil:'networkidle'});
 await phone.locator('.atlas-systems-grid .atlas-system-card').first().waitFor();
 await fits(phone,'arquitetura mobile');
 await phone.screenshot({path:join(cwd,'artifacts/arquitetura-mobile.png'),fullPage:true});
 assert.equal(await phone.locator('.atlas-step').count(),296);
 assert.deepEqual(errors,[],'Falhas do console JavaScript: '+errors.join('\n'));
 console.log('E2E OK: sidebar desktop/mobile, desktop 1600px e 2560px, mobile 390px, LEDs de prioridade, filtros, conclusão persistente, 296 passos e sem overflow.');
}catch(error){
 console.error('E2E FALHOU:',error.stack||error);
 if(errors.length)console.error('Erros JS:',errors);
 process.exitCode=1;
}finally{
 await browser?.close().catch(()=>{});
 server.kill('SIGTERM');
}