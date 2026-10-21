/* IAM Atlas · interaction layer. No external dependencies. */
(() => {
'use strict';
const appRoot=document.getElementById('app');
if(!appRoot)return;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let scene=null,revealObserver=null,activeIndex=0,shownResults=[];
const toastHost=document.createElement('div');toastHost.className='atlas-toast-stack';toastHost.setAttribute('aria-live','polite');toastHost.setAttribute('aria-atomic','false');document.body.append(toastHost);
function toast(msg){const el=document.createElement('div');el.className='atlas-toast';el.innerHTML='<b>✦</b><span>'+esc(msg)+'</span>';toastHost.append(el);setTimeout(()=>{el.classList.add('leaving');setTimeout(()=>el.remove(),260)},3100)}
function entries(){
const basic=[
{label:'Visão geral',description:'Dashboard e jornada de estudos',type:'page',page:'inicio',symbol:'⌂'},
{label:'Roadmap',description:'Todos os níveis e competências',type:'page',page:'roadmap',symbol:'◈'},
{label:'Certificações',description:'Credenciais por nível',type:'page',page:'certs',symbol:'✧'},
{label:'Meu progresso',description:'Estatísticas e backup local',type:'page',page:'progresso',symbol:'◷'}
];
const skills=(typeof topics!=='undefined'?topics:[]).map(t=>({label:t.title,description:'Roadmap · '+levels[t.level],type:'topic',id:t.id,symbol:'↗'}));
const credentials=(typeof certs!=='undefined'?certs:[]).map((c,i)=>({label:c.name,description:'Certificações · '+c.provider,type:'cert',index:i,symbol:'✧'}));
return basic.concat(skills,credentials);
}
const dialog=document.createElement('dialog');dialog.className='atlas-command-dialog';dialog.setAttribute('aria-label','Busca rápida do IAM Atlas');
dialog.innerHTML='<div class="atlas-command-head"><span class="search-icon" aria-hidden="true">⌕</span><input class="atlas-command-input" type="search" autocomplete="off" spellcheck="false" placeholder="Buscar tópicos, páginas ou certificações..." aria-label="Buscar conteúdo"><button class="atlas-cmd-esc" type="button" data-atlas-close aria-label="Fechar pesquisa">ESC</button></div><div class="atlas-command-list" role="listbox" aria-label="Resultados"></div><div class="atlas-command-foot"><span>↑ ↓ navegar · ↵ abrir</span><span>IAM ATLAS / BUSCA RÁPIDA</span></div>';
document.body.append(dialog);
const input=dialog.querySelector('.atlas-command-input'),results=dialog.querySelector('.atlas-command-list');
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function commandRender(){
const q=normalize(input.value.trim());
shownResults=entries().filter(o=>!q||normalize(o.label+' '+o.description).includes(q)).slice(0,12);
activeIndex=clamp(activeIndex,0,Math.max(0,shownResults.length-1));
const html=shownResults.map((e,i)=>'<button type="button" class="atlas-command-item" data-atlas-result="'+i+'" role="option" aria-selected="'+(i===activeIndex)+'"><span class="atlas-cmd-icon" aria-hidden="true">'+esc(e.symbol)+'</span><span class="atlas-cmd-copy"><strong>'+esc(e.label)+'</strong><small>'+esc(e.description)+'</small></span><span class="atlas-cmd-arrow">↗</span></button>').join('');
results.innerHTML=shownResults.length?html:'<div class="atlas-command-empty">Nenhum resultado encontrado. Tente outro termo.</div>';
}
function commandOpen(){if(dialog.open)return;input.value='';activeIndex=0;commandRender();dialog.showModal();requestAnimationFrame(()=>input.focus())}
function commandClose(){if(dialog.open)dialog.close()}
function navigate(page){if(location.hash==='#'+page){if(typeof render==='function')render()}else location.hash='#'+page}
function openTopic(id){
commandClose();
try{if(typeof topicFilter!=='undefined')topicFilter='todos'}catch{}
const navigateAndFind=()=>{const target=Array.from(document.querySelectorAll('[data-expand-topic]')).find(b=>b.dataset.expandTopic===id);if(!target)return false;target.click();target.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});return true};
navigate('roadmap');
let attempts=0;
const retry=()=>{if(navigateAndFind())return;if(++attempts<28)setTimeout(retry,80);else toast('Não foi possível localizar o tópico.')};
setTimeout(retry,70);
}
function commandExecute(index){
const e=shownResults[index];if(!e)return;commandClose();
if(e.type==='page'){navigate(e.page);return}
if(e.type==='topic'){openTopic(e.id);return}
if(e.type==='cert'){
navigate('certs');let attempts=0;
const retry=()=>{const c=certs[e.index],button=Array.from(document.querySelectorAll('[data-stage]')).find(b=>b.dataset.stage===c.stage);if(!button){if(++attempts<28)setTimeout(retry,80);return}if(button.getAttribute('aria-expanded')!=='true')button.click();setTimeout(()=>{const tile=document.querySelector('[data-kind="cert"][data-id="'+e.index+'"]');if(tile){tile.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});tile.focus({preventScroll:true})}},200)};
setTimeout(retry,80);
}
}
dialog.addEventListener('click',e=>{if(e.target.closest('[data-atlas-close]'))commandClose();const row=e.target.closest('[data-atlas-result]');if(row)commandExecute(Number(row.dataset.atlasResult));if(e.target===dialog)commandClose()});
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(!shownResults.length)return;activeIndex=(activeIndex+(e.key==='ArrowDown'?1:-1)+shownResults.length)%shownResults.length;results.querySelectorAll('[data-atlas-result]').forEach((el,i)=>el.setAttribute('aria-selected',String(i===activeIndex)));results.querySelector('[data-atlas-result="'+activeIndex+'"]')?.scrollIntoView({block:'nearest'});}else if(e.key==='Enter'){e.preventDefault();commandExecute(activeIndex)}});
input.addEventListener('input',()=>{activeIndex=0;commandRender()});
document.addEventListener('keydown',e=>{const editable=e.target.matches('input,textarea,select,[contenteditable="true"]');if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();dialog.open?commandClose():commandOpen();return}if(e.key==='/'&&!editable&&!dialog.open){e.preventDefault();commandOpen()}});
document.addEventListener('click',e=>{
const search=e.target.closest('[data-atlas-command]');if(search){e.preventDefault();commandOpen();return}
const jump=e.target.closest('[data-atlas-jump]');if(jump){e.preventDefault();openTopic(jump.dataset.atlasJump);return}
const completedButton=e.target.closest('[data-complete-topic]');if(completedButton){const id=completedButton.dataset.completeTopic;toast(completed.has(id)?'Competência concluída. Progresso salvo.':'Competência removida do progresso.');return}
if(e.target.closest('#mark')){toast('Progresso atualizado e salvo neste navegador.');return}
if(e.target.closest('#export')){toast('Backup de progresso exportado.');return}
const btn=e.target.closest('.atlas-btn,.atlas-next-card,.atlas-stage,.atlas-command-trigger');
if(btn&&!reduced.matches){
const r=btn.getBoundingClientRect(),circle=document.createElement('span');circle.className='atlas-ripple';const diameter=Math.max(r.width,r.height)*2;circle.style.width=circle.style.height=diameter+'px';circle.style.left=e.clientX-r.left+'px';circle.style.top=e.clientY-r.top+'px';btn.append(circle);setTimeout(()=>circle.remove(),600);
}
});
function revealSetup(){
if(revealObserver){revealObserver.disconnect();revealObserver=null}
const els=appRoot.querySelectorAll('.atlas-stage,.atlas-next-card,.atlas-section-heading,.atlas-progress-feature');
if(reduced.matches||!('IntersectionObserver'in window)){els.forEach(el=>el.classList.add('is-visible'));return}
revealObserver=new IntersectionObserver(items=>{items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('is-visible');revealObserver.unobserve(item.target)}})},{threshold:0.08,rootMargin:'0px 0px -18px 0px'});
els.forEach((el,i)=>{el.classList.add('atlas-reveal');el.style.transitionDelay=Math.min(i%3*70,140)+'ms';revealObserver.observe(el)});
}
function setup3D(canvas){
if(scene){scene.dispose();scene=null}
if(!canvas)return;
const ctx=canvas.getContext('2d',{alpha:true});
if(!ctx)return;
let width=0,height=0,dpr=1,raf=0,visible=true,dragging=false,lastX=0,lastY=0;
let yaw=.46,pitch=-.17,targetYaw=.46,targetPitch=-.17;
const N=20,nodes=Array.from({length:N},(_,i)=>{const y=1-(i/(N-1))*2;const radius=Math.sqrt(1-y*y);const theta=i*Math.PI*(3-Math.sqrt(5));return {x:Math.cos(theta)*radius*1.3,y:y*1.3,z:Math.sin(theta)*radius*1.3}});
const links=[];for(let i=0;i<N;i++){const sorted=nodes.map((p,j)=>({j,d:Math.hypot(p.x-nodes[i].x,p.y-nodes[i].y,p.z-nodes[i].z)})).filter(p=>p.j!==i).sort((a,b)=>a.d-b.d).slice(0,3);sorted.forEach(t=>{if(i<t.j)links.push([i,t.j])})}
const labels=new Map([[0,'IDENTIDADE'],[5,'POLÍTICAS'],[11,'ACESSO'],[17,'MFA']]);
function transform(p){
const a=Math.cos(yaw),b=Math.sin(yaw),c=Math.cos(pitch),d=Math.sin(pitch);
const x=p.x*a+p.z*b,z=p.z*a-p.x*b,y=p.y*c-z*d,zz=p.y*d+z*c;
const perspective=4.8/(4.8+zz);
const scale=Math.min(width,height)*.265*perspective;
return{x:width/2+x*scale,y:height/2+y*scale,z:zz,k:perspective};
}
function line(a,b,color,w=1){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=color;ctx.lineWidth=w;ctx.stroke()}
function glow(x,y,r,color){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'rgba(141,98,232,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}
function draw(){
if(!width||!height)return;
ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
const center=transform({x:0,y:0,z:0});glow(center.x,center.y,Math.min(width,height)*.42,'rgba(104,64,164,.13)');
const ringColors=['rgba(172,125,248,.18)','rgba(135,102,192,.12)','rgba(191,161,241,.10)'];
for(let plane=0;plane<3;plane++){
let last=null;for(let i=0;i<=128;i++){const angle=i/128*Math.PI*2;const R=1.73;let p=plane===0?{x:Math.cos(angle)*R,y:Math.sin(angle)*R,z:0}:plane===1?{x:Math.cos(angle)*R,y:0,z:Math.sin(angle)*R}:{x:0,y:Math.cos(angle)*R,z:Math.sin(angle)*R};const v=transform(p);if(last)line(last,v,ringColors[plane],.75);last=v;}
}
const projected=nodes.map(transform);
links.forEach(([a,b])=>{const z=(projected[a].z+projected[b].z)/2;line(projected[a],projected[b],z>0?'rgba(186,147,255,.28)':'rgba(141,108,209,.13)',z>0?1.05:.7)});
const size=.44;const corners=[[-1,-1,-1],[-1,-1,1],[-1,1,-1],[-1,1,1],[1,-1,-1],[1,-1,1],[1,1,-1],[1,1,1]].map(v=>transform({x:v[0]*size,y:v[1]*size,z:v[2]*size}));
const faces=[[0,1,3,2],[4,5,7,6],[0,1,5,4],[2,3,7,6],[0,2,6,4],[1,3,7,5]].map(ids=>({ids,z:ids.reduce((n,i)=>n+corners[i].z,0)/4})).sort((a,b)=>b.z-a.z);
faces.forEach(face=>{ctx.beginPath();face.ids.forEach((i,j)=>j?ctx.lineTo(corners[i].x,corners[i].y):ctx.moveTo(corners[i].x,corners[i].y));ctx.closePath();ctx.fillStyle=face.z>0?'rgba(98,53,159,.30)':'rgba(160,103,237,.17)';ctx.fill();ctx.strokeStyle=face.z>0?'rgba(150,105,221,.62)':'rgba(205,165,255,.36)';ctx.lineWidth=1.15;ctx.stroke()});
glow(center.x,center.y,Math.min(width,height)*.17,'rgba(140,83,255,.32)');
ctx.font='800 '+Math.max(15,Math.min(22,width/22))+'px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor='rgba(202,171,255,.8)';ctx.shadowBlur=14;ctx.fillStyle='#efe6ff';ctx.fillText('IAM',center.x,center.y);ctx.shadowBlur=0;
projected.map((p,i)=>({p,i})).sort((a,b)=>b.p.z-a.p.z).forEach(({p,i})=>{
const rad=clamp(3.5*p.k,2.3,6);if(p.z<-.2){ctx.globalAlpha=.5}else{ctx.globalAlpha=1}
glow(p.x,p.y,rad*5,'rgba(156,107,255,.23)');
ctx.beginPath();ctx.arc(p.x,p.y,rad,0,Math.PI*2);ctx.fillStyle=i%4===0?'#d9baff':'#9874d7';ctx.fill();
ctx.beginPath();ctx.arc(p.x,p.y,rad+2.2,0,Math.PI*2);ctx.strokeStyle='rgba(199,161,255,.28)';ctx.lineWidth=.8;ctx.stroke();
if(labels.has(i)&&p.z>-.4&&width>300){ctx.font='700 9px system-ui';ctx.textAlign=p.x<width/2?'right':'left';ctx.textBaseline='middle';ctx.fillStyle='#bdb0cb';ctx.fillText(labels.get(i),p.x+(p.x<width/2?-10:10),p.y-12)}
ctx.globalAlpha=1;
});
}
function resize(){const r=canvas.getBoundingClientRect();width=Math.max(0,r.width);height=Math.max(0,r.height);dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);draw()}
const observer=new IntersectionObserver(items=>{visible=items[0].isIntersecting;if(visible)start();else stop()},{threshold:.04});
const resizer=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;
function step(){raf=0;const easing=dragging?.24:.075;yaw+=(targetYaw-yaw)*easing;pitch+=(targetPitch-pitch)*easing;if(!dragging){targetYaw+=.0032}draw();if(visible&&!document.hidden&&!reduced.matches)raf=requestAnimationFrame(step)}
function start(){if(!raf&&!reduced.matches&&visible&&!document.hidden)raf=requestAnimationFrame(step);else draw()}
function stop(){if(raf){cancelAnimationFrame(raf);raf=0}}
function onDown(e){dragging=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId)}
function onMove(e){if(!dragging)return;targetYaw+=(e.clientX-lastX)*.009;targetPitch=clamp(targetPitch+(e.clientY-lastY)*.007,-1.2,1.2);lastX=e.clientX;lastY=e.clientY;if(reduced.matches){yaw=targetYaw;pitch=targetPitch;draw()}}
function onUp(){dragging=false}
function onKey(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'||e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();targetYaw+=(e.key==='ArrowRight'?.24:e.key==='ArrowLeft'?-.24:0);targetPitch=clamp(targetPitch+(e.key==='ArrowDown'?.2:e.key==='ArrowUp'?-.2:0),-1.2,1.2);if(reduced.matches){yaw=targetYaw;pitch=targetPitch;draw()}}}
function onVisibility(){document.hidden?stop():start()}
canvas.addEventListener('pointerdown',onDown);canvas.addEventListener('pointermove',onMove);canvas.addEventListener('pointerup',onUp);canvas.addEventListener('pointercancel',onUp);canvas.addEventListener('keydown',onKey);document.addEventListener('visibilitychange',onVisibility);
if(resizer)resizer.observe(canvas);else window.addEventListener('resize',resize);
observer.observe(canvas);resize();start();
scene={canvas,dispose(){stop();observer.disconnect();resizer?.disconnect();canvas.removeEventListener('pointerdown',onDown);canvas.removeEventListener('pointermove',onMove);canvas.removeEventListener('pointerup',onUp);canvas.removeEventListener('pointercancel',onUp);canvas.removeEventListener('keydown',onKey);document.removeEventListener('visibilitychange',onVisibility);if(!resizer)window.removeEventListener('resize',resize)}};
}
let setupQueued=false,lastCanvas=null;
function setup(){setupQueued=false;revealSetup();const canvas=document.getElementById('atlas-network');if(canvas!==lastCanvas){lastCanvas=canvas;setup3D(canvas)}}
new MutationObserver(()=>{if(!setupQueued){setupQueued=true;requestAnimationFrame(setup)}}).observe(appRoot,{childList:true,subtree:true});
setup();
window.IAMAtlas={openSearch:commandOpen,notify:toast,goToTopic:openTopic};
})();