'use strict';
// Motion belongs to interaction feedback; page routing is handled by navigation.js.
(()=>{
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 const ease='cubic-bezier(.22,1,.36,1)';
 const animate=(target,frames,duration=260)=>{
  if(reduce.matches||!target||typeof target.animate!=='function')return;
  target.animate(frames,{duration,easing:ease});
 };
 // Use a short, restrained press reaction only for pointer users.
 document.addEventListener('pointerdown',event=>{
  if(reduce.matches||event.button!==0)return;
  const control=event.target.closest('button,.nav-start,.hero-actions a,.sidebar-link,.method-cta,.study-nav a,.cert-official');
  if(!control||control.matches(':disabled'))return;
  const bounds=control.getBoundingClientRect();
  if(!bounds.width||!bounds.height)return;
  const point=document.createElement('span');
  point.className='tap-ripple';
  point.style.left=(event.clientX-bounds.left)+'px';
  point.style.top=(event.clientY-bounds.top)+'px';
  control.append(point);
  const effect=point.animate([{transform:'translate(-50%,-50%) scale(0)',opacity:.28},{transform:'translate(-50%,-50%) scale(1)',opacity:0}],{duration:440,easing:ease});
  effect.finished.then(()=>point.remove()).catch(()=>point.remove());
 },{passive:true});
 // Expansions reveal content rather than instantly swapping it.
 document.addEventListener('toggle',event=>{
  const details=event.target;
  if(!(details instanceof HTMLDetailsElement)||!details.open)return;
  if(details.matches('.study-accordion')){
   animate(details.querySelector(':scope > .module-blueprint'),[{opacity:0,transform:'translateY(-7px)'},{opacity:1,transform:'translateY(0)'}],290);
   animate(details.querySelector(':scope > .tasks'),[{opacity:0,transform:'translateY(-5px)'},{opacity:1,transform:'translateY(0)'}],330);
  }else if(details.matches('.task,.cert-more,.infra-details')){
   animate(details.querySelector(':scope > :not(summary)'),[{opacity:0,transform:'translateY(-7px)'},{opacity:1,transform:'translateY(0)'}],260);
  }
 },true);
 // Decorative card tilts stay small and only apply on hover-capable pointer devices.
 const hover=window.matchMedia('(hover:hover) and (pointer:fine)');
 const cards=[...document.querySelectorAll('.experience-card')];
 for(const card of cards){
  const reset=()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')};
  reset();
  card.addEventListener('pointermove',event=>{
   if(reduce.matches||!hover.matches)return;
   const rect=card.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;
   card.style.setProperty('--rx',((.5-y)*4).toFixed(2)+'deg');
   card.style.setProperty('--ry',((x-.5)*5).toFixed(2)+'deg');
  },{passive:true});
  card.addEventListener('pointerleave',reset);
  card.addEventListener('blur',reset);
 }
 if(!('IntersectionObserver' in window)||reduce.matches)return;
 const reveal=[...document.querySelectorAll('.experience-card,.dashboard,.learning-method,.lab-infra,.lab-map')];
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting){
   entry.target.classList.add('is-revealed');
   observer.unobserve(entry.target);
  }
 },{threshold:.05,rootMargin:'0px 0px -18px 0px'});
 reveal.forEach((element,index)=>{
  element.style.setProperty('--enter-delay',Math.min(index,4)*40+'ms');
  element.classList.add('motion-ready');
  observer.observe(element);
 });
 const resetMotion=()=>{
  if(!reduce.matches)return;
  observer.disconnect();
  reveal.forEach(element=>element.classList.add('is-revealed'));
  cards.forEach(card=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')});
 };
 if(reduce.addEventListener)reduce.addEventListener('change',resetMotion);
})();
