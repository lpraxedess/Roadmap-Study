'use strict';
/* Visão geral: uma rota clara para entrar na próxima aula e visualizar as 11 áreas. */
window.IAMHome=(()=>{
 function render(){
  const root=document.getElementById('home-path');if(!root)return;
  const state=window.IAMApp?.getState();if(!state)return;
  root.replaceChildren();
  for(const phase of PHASES){
   const total=phase.items.length;
   const completed=phase.items.filter(item=>state.completed.includes(item.id)).length;
   const active=completed>0&&completed<total;
   const card=document.createElement('a');
   card.href='#module-'+phase.id;card.className='home-path-card'+(active?' is-progress':'')+(completed===total?' is-complete':'');
   const header=document.createElement('div');header.className='path-card-header';
   const index=document.createElement('span');index.className='path-card-index';index.textContent=String(phase.number).padStart(2,'0');
   const badge=document.createElement('span');badge.className='path-card-status';
   badge.textContent=completed===total?'CONCLUÍDO':active?'EM ANDAMENTO':'A EXPLORAR';
   header.append(index,badge);card.append(header);
   const title=document.createElement('h3');title.textContent=phase.title;card.append(title);
   const description=document.createElement('p');description.textContent=phase.outcome;card.append(description);
   const end=document.createElement('div');end.className='path-card-bottom';
   const count=document.createElement('span');count.textContent=completed+' / '+total+' aulas';
   const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');
   end.append(count,arrow);card.append(end);
   const progress=document.createElement('div');progress.className='path-card-progress';
   const fill=document.createElement('span');fill.style.width=total?Math.round(completed/total*100)+'%':'0%';progress.append(fill);card.append(progress);
   root.append(card);
  }
 }
 render();
 return {render};
})();