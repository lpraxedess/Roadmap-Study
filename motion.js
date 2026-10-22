'use strict';
/* Motion is progressive enhancement: no animation when reduced motion is requested. */
(()=>{
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 const cards=[...document.querySelectorAll('.experience-card')];
 const reset=card=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');card.style.setProperty('--mx','50%');card.style.setProperty('--my','50%')};
 for(const card of cards){
  reset(card);
  card.addEventListener('pointermove',event=>{
   if(reduce.matches||event.pointerType==='touch')return;
   const rect=card.getBoundingClientRect();
   const x=Math.min(1,Math.max(0,(event.clientX-rect.left)/rect.width));
   const y=Math.min(1,Math.max(0,(event.clientY-rect.top)/rect.height));
   card.style.setProperty('--rx',((.5-y)*5).toFixed(2)+'deg');
   card.style.setProperty('--ry',((x-.5)*7).toFixed(2)+'deg');
   card.style.setProperty('--mx',(x*100).toFixed(1)+'%');
   card.style.setProperty('--my',(y*100).toFixed(1)+'%');
  });
  card.addEventListener('pointerleave',()=>reset(card));
  card.addEventListener('blur',()=>reset(card));
 }
 if(!('IntersectionObserver' in window)||reduce.matches)return;
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){
   if(!entry.isIntersecting)continue;
   entry.target.classList.add('is-revealed');
   observer.unobserve(entry.target);
  }
 },{threshold:.08,rootMargin:'0px 0px -24px 0px'});
 document.querySelectorAll('.experience-card,.dashboard,.learning-method,.lab-infra,.lab-map').forEach(node=>{
  node.classList.add('motion-ready');
  observer.observe(node);
 });
 const onPreferenceChange=()=>{
  if(!reduce.matches)return;
  observer.disconnect();
  document.querySelectorAll('.motion-ready').forEach(node=>node.classList.add('is-revealed'));
  cards.forEach(reset);
 };
 if(reduce.addEventListener)reduce.addEventListener('change',onPreferenceChange);
})();
