/* IAM Atlas · motion, interactive graph and guided-study feedback · zero dependencies */
(()=>{
'use strict';
const appRoot=document.getElementById('app');
if(!appRoot)return;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
/* Sidebar controller: remembers desktop preference, adapts to viewport, closes mobile drawer. */
const sidebar=document.getElementById('atlas-sidebar');
const sidebarToggle=document.getElementById('atlas-sidebar-toggle');
const mobileMenu=document.getElementById('atlas-mobile-menu');
const backdrop=document.getElementById('atlas-nav-backdrop');
const navBreakpoint=window.matchMedia('(max-width:760px)');
const compactBreakpoint=window.matchMedia('(max-width:1100px)');
const navStorageKey='iam-atlas-sidebar-v1';
let navPreference=null;
try{const saved=localStorage.getItem(navStorageKey);if(saved==='expanded'||saved==='collapsed')navPreference=saved}catch{}
function navApply(){
const mobile=navBreakpoint.matches;
const collapsed=!mobile&&(navPreference==='collapsed'||(navPreference===null&&compactBreakpoint.matches));
document.body.classList.toggle('atlas-sidebar-collapsed',collapsed);
document.body.classList.toggle('atlas-sidebar-user-expanded',!mobile&&navPreference==='expanded');
sidebarToggle?.setAttribute('aria-expanded',String(!collapsed));
sidebarToggle?.setAttribute('aria-label',collapsed?'Expandir menu lateral':'Recolher menu lateral');
sidebarToggle?.setAttribute('title',collapsed?'Expandir menu':'Recolher menu');
sidebar?.querySelectorAll('[data-page]').forEach(btn=>{const name=btn.querySelector('.atlas-nav-label')?.textContent?.trim();if(name)btn.setAttribute('aria-label',name);btn.title=collapsed?name:''});
if(!mobile)navCloseMobile();
}
function navCloseMobile(){
document.body.classList.remove('atlas-mobile-nav-open');
mobileMenu?.setAttribute('aria-expanded','false');
mobileMenu?.setAttribute('aria-label','Abrir menu de navegação');
}
function navOpenMobile(){
document.body.classList.add('atlas-mobile-nav-open');
mobileMenu?.setAttribute('aria-expanded','true');
mobileMenu?.setAttribute('aria-label','Fechar menu de navegação');
}
sidebarToggle?.addEventListener('click',()=>{
if(navBreakpoint.matches){navCloseMobile();return}
const currentlyCollapsed=document.body.classList.contains('atlas-sidebar-collapsed');
navPreference=currentlyCollapsed?'expanded':'collapsed';
try{localStorage.setItem(navStorageKey,navPreference)}catch{}
navApply();
});
mobileMenu?.addEventListener('click',()=>document.body.classList.contains('atlas-mobile-nav-open')?navCloseMobile():navOpenMobile());
backdrop?.addEventListener('click',navCloseMobile);
sidebar?.addEventListener('click',event=>{if(event.target.closest('[data-page]')&&navBreakpoint.matches)navCloseMobile()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.classList.contains('atlas-mobile-nav-open')){navCloseMobile();mobileMenu?.focus()}});
window.addEventListener('resize',navApply,{passive:true});
navApply();

const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let scene=null,revealObserver=null;
const toastHost=document.createElement('div');toastHost.className='atlas-toast-stack';toastHost.setAttribute('aria-live','polite');document.body.append(toastHost);
function toast(msg){const el=document.createElement('div');el.className='atlas-toast';el.innerHTML='<b>✦</b><span>'+esc(msg)+'</span>';toastHost.append(el);setTimeout(()=>{el.classList.add('leaving');setTimeout(()=>el.remove(),260)},3100)}
function navigate(page){if(location.hash==='#'+page){if(typeof render==='function')render()}else location.hash='#'+page}
function openTopic(id){
const go=()=>{
const field=document.getElementById('search');if(field&&field.value){field.value='';field.dispatchEvent(new Event('input',{bubbles:true}))}
const tabs=document.querySelector('[data-topic-filter="todos"]');if(tabs&&tabs.getAttribute('aria-pressed')!=='true')tabs.click();
const toggle=Array.from(document.querySelectorAll('[data-expand-topic]')).find(b=>b.dataset.expandTopic===id);
if(!toggle)return false;
if(toggle.getAttribute('aria-expanded')!=='true')toggle.click();
toggle.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});
toggle.focus({preventScroll:true});
return true;
};
navigate('roadmap');
let tries=0;const retry=()=>{if(go())return;if(++tries<28)setTimeout(retry,75);else toast('Não foi possível localizar a competência.')};setTimeout(retry,75);
}
document.addEventListener('click',e=>{
const stage=e.target.closest('[data-atlas-stage]');if(stage){const t=topics.find(t=>t.level===Number(stage.dataset.atlasStage));if(t){e.preventDefault();openTopic(t.id)}return}
const jump=e.target.closest('[data-atlas-jump]');if(jump){e.preventDefault();openTopic(jump.dataset.atlasJump);return}
const scroll=e.target.closest('[data-atlas-scroll]');if(scroll){e.preventDefault();const target=document.getElementById(scroll.dataset.atlasScroll);if(target){target.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'})}return}
const completedButton=e.target.closest('[data-complete-topic]');if(completedButton){const id=completedButton.dataset.completeTopic;toast(completed.has(id)?'Competência concluída e salva.':'Competência removida do progresso.')}
if(e.target.closest('#mark'))toast('Progresso atualizado neste navegador.');
if(e.target.closest('#export'))toast('Arquivo de backup exportado.');
const btn=e.target.closest('.atlas-btn,.atlas-next-card,.atlas-stage,.atlas-path-card,.atlas-lab-card,.atlas-track-card');
if(btn&&!reduced.matches){const r=btn.getBoundingClientRect(),circle=document.createElement('span');circle.className='atlas-ripple';const d=Math.max(r.width,r.height)*2;circle.style.width=circle.style.height=d+'px';circle.style.left=e.clientX-r.left+'px';circle.style.top=e.clientY-r.top+'px';btn.append(circle);setTimeout(()=>circle.remove(),600)}
});
/* Perspective feedback on the corporate architecture map; respects motion preferences. */
let atlasTiltNode=null,atlasTiltFrame=0,atlasTiltX=0,atlasTiltY=0;
function atlasFlushTilt(){atlasTiltFrame=0;const el=atlasTiltNode;if(!el||!el.isConnected)return;el.style.setProperty('--atlas-rx',atlasTiltY+'deg');el.style.setProperty('--atlas-ry',atlasTiltX+'deg')}
document.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType==='touch')return;const el=e.target.closest('.atlas-arch-node');if(!el)return;
if(atlasTiltNode!==el&&atlasTiltNode?.isConnected){atlasTiltNode.style.setProperty('--atlas-rx','0deg');atlasTiltNode.style.setProperty('--atlas-ry','0deg')}
atlasTiltNode=el;const rect=el.getBoundingClientRect();atlasTiltX=clamp((e.clientX-rect.left)/rect.width-.5,-.5,.5)*8;atlasTiltY=clamp(.5-(e.clientY-rect.top)/rect.height,-.5,.5)*8;
if(!atlasTiltFrame)atlasTiltFrame=requestAnimationFrame(atlasFlushTilt);
},{passive:true});
document.addEventListener('pointerout',e=>{const el=e.target.closest('.atlas-arch-node');if(!el||e.relatedTarget&&el.contains(e.relatedTarget))return;el.style.setProperty('--atlas-rx','0deg');el.style.setProperty('--atlas-ry','0deg');if(atlasTiltNode===el)atlasTiltNode=null},{passive:true});
/* Unified perspective interaction: delegated, throttled, and disabled for touch/reduced motion. */
let surfaceFrame=0,surfaceTarget=null,surfaceX=0,surfaceY=0;
const surfaceSelector='.atlas-stage,.atlas-next-card,.atlas-path-card,.atlas-lab-card,.atlas-track-card,.atlas-progress-feature';
function paintSurface(){surfaceFrame=0;const el=surfaceTarget;if(!el?.isConnected)return;el.style.setProperty('--surface-rotate-x',surfaceY+'deg');el.style.setProperty('--surface-rotate-y',surfaceX+'deg')}
document.addEventListener('pointermove',e=>{
if(reduced.matches||e.pointerType!=='mouse')return;
const el=e.target.closest(surfaceSelector);if(!el)return;
if(surfaceTarget&&surfaceTarget!==el){surfaceTarget.style.removeProperty('--surface-rotate-x');surfaceTarget.style.removeProperty('--surface-rotate-y')}
surfaceTarget=el;const r=el.getBoundingClientRect();
surfaceX=clamp((e.clientX-r.left)/r.width-.5,-.5,.5)*4;
surfaceY=clamp(.5-(e.clientY-r.top)/r.height,-.5,.5)*4;
if(!surfaceFrame)surfaceFrame=requestAnimationFrame(paintSurface);
},{passive:true});
document.addEventListener('pointerout',e=>{
const el=e.target.closest(surfaceSelector);if(!el||(e.relatedTarget&&el.contains(e.relatedTarget)))return;
el.style.removeProperty('--surface-rotate-x');el.style.removeProperty('--surface-rotate-y');
if(surfaceTarget===el)surfaceTarget=null;
},{passive:true});
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
const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(items=>{visible=items[0].isIntersecting;if(visible)start();else stop()},{threshold:.04});
const resizer=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;
function step(){raf=0;const easing=dragging ? 0.24 : 0.075;yaw+=(targetYaw-yaw)*easing;pitch+=(targetPitch-pitch)*easing;if(!dragging){targetYaw+=.0032}draw();if(visible&&!document.hidden&&!reduced.matches)raf=requestAnimationFrame(step)}
function start(){if(!raf&&!reduced.matches&&visible&&!document.hidden)raf=requestAnimationFrame(step);else draw()}
function stop(){if(raf){cancelAnimationFrame(raf);raf=0}}
function onDown(e){dragging=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId)}
function onMove(e){if(!dragging)return;targetYaw+=(e.clientX-lastX)*.009;targetPitch=clamp(targetPitch+(e.clientY-lastY)*.007,-1.2,1.2);lastX=e.clientX;lastY=e.clientY;if(reduced.matches){yaw=targetYaw;pitch=targetPitch;draw()}}
function onUp(){dragging=false}
function onKey(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'||e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();targetYaw+=(e.key==='ArrowRight'?0.24:e.key==='ArrowLeft'?-0.24:0);targetPitch=clamp(targetPitch+(e.key==='ArrowDown'?0.2:e.key==='ArrowUp'?-0.2:0),-1.2,1.2);if(reduced.matches){yaw=targetYaw;pitch=targetPitch;draw()}}}
function onVisibility(){document.hidden?stop():start()}
canvas.addEventListener('pointerdown',onDown);canvas.addEventListener('pointermove',onMove);canvas.addEventListener('pointerup',onUp);canvas.addEventListener('pointercancel',onUp);canvas.addEventListener('keydown',onKey);document.addEventListener('visibilitychange',onVisibility);
if(resizer)resizer.observe(canvas);else window.addEventListener('resize',resize);
if(observer)observer.observe(canvas);resize();start();
scene={canvas,dispose(){stop();if(observer)observer.disconnect();resizer?.disconnect();canvas.removeEventListener('pointerdown',onDown);canvas.removeEventListener('pointermove',onMove);canvas.removeEventListener('pointerup',onUp);canvas.removeEventListener('pointercancel',onUp);canvas.removeEventListener('keydown',onKey);document.removeEventListener('visibilitychange',onVisibility);if(!resizer)window.removeEventListener('resize',resize)}};
}
let setupQueued=false,lastCanvas=null;
function setup(){setupQueued=false;revealSetup();const canvas=document.getElementById('atlas-network');if(canvas!==lastCanvas){lastCanvas=canvas;setup3D(canvas)}}
new MutationObserver(records=>{if(!records.some(r=>r.addedNodes.length||r.removedNodes.length))return;if(!setupQueued){setupQueued=true;requestAnimationFrame(setup)}}).observe(appRoot,{childList:true,subtree:true});
setup();
const navIcons={inicio:'home',roadmap:'layers',labs:'flask',certs:'award'};
document.querySelectorAll('aside [data-page]').forEach(button=>{const glyph=button.querySelector('.atlas-nav-glyph');const icon=navIcons[button.dataset.page];if(glyph&&icon&&typeof atlasIcon==='function')glyph.innerHTML=atlasIcon(icon)});
window.IAMAtlas={notify:toast,goToTopic:openTopic};
})();
