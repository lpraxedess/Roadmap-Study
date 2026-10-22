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
 // Feedback visível nas trocas de página e na expansão de módulos.
 const play=(node,frames,options)=>{
  if(reduce.matches||!node||typeof node.animate!=='function')return;
  node.animate(frames,{duration:options.duration||380,easing:'cubic-bezier(.22,1,.36,1)',fill:'none'});
 };
 const pages=[...document.querySelectorAll('.site-page')];
 const pageObserver=new MutationObserver(records=>{
  for(const record of records){
   const page=record.target;
   if(page.hidden)continue;
   play(page,[{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:420});
   page.querySelectorAll('.experience-card,.cert-level,.phase').forEach((item,index)=>{
    if(index>9)return;
    if(reduce.matches||typeof item.animate!=='function')return;
    item.animate([{opacity:.25,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:400,delay:Math.min(index,6)*45,easing:'cubic-bezier(.22,1,.36,1)'});
   });
  }
 });
 for(const page of pages)pageObserver.observe(page,{attributes:true,attributeFilter:['hidden']});
 document.addEventListener('toggle',event=>{
  const panel=event.target;
  if(!(panel instanceof HTMLDetailsElement)||!panel.open)return;
  if(panel.matches('.study-accordion')){
   const children=[...panel.children].filter(child=>child.tagName!=='SUMMARY');
   children.slice(0,8).forEach((child,index)=>{
    if(reduce.matches||typeof child.animate!=='function')return;
    child.animate([{opacity:0,transform:'translateY(-9px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,delay:index*25,easing:'cubic-bezier(.22,1,.36,1)'});
   });
  }else if(panel.matches('.task,.cert-more')){
   const child=[...panel.children].find(el=>el.tagName!=='SUMMARY');
   play(child,[{opacity:0,transform:'translateY(-8px)'},{opacity:1,transform:'translateY(0)'}],{duration:330});
  }
 },true);
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
