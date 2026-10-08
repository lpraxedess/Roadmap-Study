/* IAM Academy — accessible static SPA; no accounts or server-side tracking. */
(() => {
  "use strict";
  const $ = (q, root=document) => root.querySelector(q);
  const $$ = (q, root=document) => [...root.querySelectorAll(q)];
  const main = $("#main");
  const STORAGE = "iam-academy-progress-v1";
  const stages = ["Fundamentos e identidade","Federação e protocolos","IAM Engineering","Governança e privilégios","Cloud e Identity Security","Arquitetura e auditoria"];
  const labels = {aula:"Aula",laboratorio:"Laboratório",projeto:"Projeto",referencia:"Biblioteca"};
  const icons = ["⌘","◈","◇","⊞","◉","▤"];
  let items = [], currentFilter = "todos", query = "", completed = new Set(), lastContent = "";
  const QUIZ_STORE = "iam-academy-quiz-v1";
  const NOTES_STORE = "iam-academy-notes-v1";
  let quizResults = {}, notes = {};

  function readStore(k, fallback) {try {return localStorage.getItem(k) ?? fallback;}catch {return fallback;}}
  function save(k,v) {try {localStorage.setItem(k,v);}catch {}}
  function getDone() {try {const v=JSON.parse(readStore(STORAGE,"[]"));return new Set(Array.isArray(v)?v:[]);}catch {return new Set();}}
  completed=getDone();
  try { quizResults=JSON.parse(readStore(QUIZ_STORE,"{}"))||{} } catch { quizResults={} }
  try { notes=JSON.parse(readStore(NOTES_STORE,"{}"))||{} } catch { notes={} }
  const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const slug = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const href = item => "#/conteudo/"+encodeURIComponent(item.id);
  const numbered = item => item.kind === "aula" ? String(item.order).padStart(2,"0") : item.kind === "laboratorio" ? "LAB "+String(item.order).padStart(2,"0") : "PRJ "+String(item.order).padStart(2,"0");
  const selection = kind => items.filter(x=>x.kind===kind);
  const doneCount = kind => selection(kind).filter(x=>completed.has(x.id)).length;
  const progress = (kind="aula") => selection(kind).length ? Math.round(doneCount(kind)*100/selection(kind).length):0;
  const normalized = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  function notify(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(notify.timer);notify.timer=setTimeout(()=>t.classList.remove("show"),2800);}
  function navUpdate(section){
    $$("#sidebar [data-nav]").forEach(a=>a.classList.toggle("active",a.dataset.nav===section));
    $("#current-section").textContent=({dashboard:"Visão geral",aulas:"Trilha de estudos",laboratorios:"Laboratórios",projetos:"Projetos integradores",competencias:"Competências",recursos:"Biblioteca",conteudo:"Conteúdo de estudo"})[section]||"Visão geral";
    $("#sidebar-pct").textContent=progress()+"%";
    $("#sidebar-bar").style.width=progress()+"%";
    $("#sidebar-done").textContent=doneCount("aula")+" de "+selection("aula").length+" aulas concluídas";
    $("#side-classes").textContent=selection("aula").length;
  }
  function closeMenu(){$("#sidebar").classList.remove("open");$("#overlay").hidden=true;}
  function card(item, i=0){
    const done=completed.has(item.id);
    return `<a class="course-card" href="${href(item)}"><div class="card-top"><span class="card-number">${escapeHtml(numbered(item))}</span><span class="card-emoji" aria-hidden="true">${icons[i%icons.length]}</span></div><h3>${escapeHtml(item.title.replace(/^\d+\s*[—-]\s*/,""))}</h3><p>${escapeHtml(item.description)}</p><div class="card-bottom"><span>${escapeHtml(labels[item.kind]||"Conteúdo")}</span><span class="status-chip ${done?"done":""}">${done?"✓ Concluído":"Pendente"}</span></div></a>`;
  }
  function row(item){
    const done=completed.has(item.id);
    return `<a class="lesson-row" href="${href(item)}"><span class="lesson-index">${done?"✓":escapeHtml(String(item.order).padStart(2,"0"))}</span><div class="lesson-copy"><h3>${escapeHtml(item.title.replace(/^\d+\s*[—-]\s*/,""))}</h3><p>${escapeHtml(item.description)}</p></div><span class="status-chip ${done?"done":""}">${done?"Concluída":"Estudar"}</span><span class="lesson-arrow" aria-hidden="true">↗</span></a>`;
  }
  function dashboard(){
    const next=selection("aula").find(x=>!completed.has(x.id)) || selection("aula")[0];
    const pct=progress();
    return `<section class="hero"><div><span class="pill">● SUA JORNADA EM IDENTITY & ACCESS MANAGEMENT</span><h1>Domine IAM.<br/><span>Construa seu futuro.</span></h1><p>Uma formação prática do IAM operacional à engenharia e arquitetura. Microsoft, ferramentas open source e laboratórios de baixo custo.</p><div class="buttons"><a class="btn" href="${href(next)}">Continuar aprendendo <span aria-hidden="true">→</span></a><a class="btn secondary" href="#/aulas">Explorar trilha ↗</a></div></div><div class="hero-symbol" aria-hidden="true">⬡</div></section>
    <section class="stats" aria-label="Indicadores de estudo"><div class="stat"><span class="stat-icon">▤</span><small>Aulas disponíveis</small><strong>${selection("aula").length}</strong><small>Do essencial ao avançado</small></div><div class="stat"><span class="stat-icon">⌘</span><small>Laboratórios</small><strong>${selection("laboratorio").length}</strong><small>Microsoft e open source</small></div><div class="stat"><span class="stat-icon">◇</span><small>Projetos práticos</small><strong>${selection("projeto").length}</strong><small>Aprendizado aplicado</small></div><div class="stat"><span class="stat-icon">↗</span><small>Seu avanço nas aulas</small><strong>${pct}%</strong><small>${doneCount("aula")} concluídas</small></div></section>
    <section><div class="section-head"><div><h2>Retome sua jornada</h2><p>Aprenda os fundamentos e evolua no seu ritmo.</p></div><a class="text-link" href="#/aulas">Ver trilha completa →</a></div><div class="recommend"><div><span class="eyebrow">PRÓXIMA AULA</span><strong style="display:block;margin-top:5px">${escapeHtml(next.title)}</strong><p>${escapeHtml(next.description)}</p></div><a class="btn" href="${href(next)}">Abrir aula →</a><span class="progress-ring" style="--progress:${pct}%" data-percent="${pct}%" aria-label="${pct}% das aulas concluídas"></span></div></section>
    <section><div class="section-head"><div><h2>Explore por competência</h2><p>Da identidade híbrida à arquitetura empresarial.</p></div><a class="text-link" href="#/aulas">Todas as aulas →</a></div><div class="card-grid">${stages.map((stage,i)=>{const ls=selection("aula").filter(x=>x.stage===stage);const first=ls[0];return `<a class="course-card" href="${href(first)}"><div class="card-top"><span class="card-number">TRILHA ${String(i+1).padStart(2,"0")}</span><span class="card-emoji">${icons[i]}</span></div><h3>${escapeHtml(stage)}</h3><p>${ls.length} aulas · ${ls.filter(x=>completed.has(x.id)).length} concluídas. Conceitos, atividades, desafios e critérios de avaliação.</p><div class="card-bottom"><span>Explorar trilha</span><span>↗</span></div></a>`}).join("")}</div></section>
    <section class="resource-banner"><div><h3>Prática de verdade, sem depender de licenças caras.</h3><p>Comece com Keycloak e Python. Use seu Entra ID P2 apenas quando o licenciamento permitir.</p></div><a class="btn secondary" href="#/laboratorios">Ver laboratórios →</a></section>`;
  }
  function catalog(kind,heading,sub){
    let list=(query ? items.filter(x=>x.kind!=="referencia") : selection(kind)).filter(x=>!query||normalized(x.title+" "+x.description+" "+x.stage).includes(normalized(query)));
    if(currentFilter!=="todos"&&currentFilter!=="concluidos"&&kind==="aula")list=list.filter(x=>x.stage===currentFilter);
    if(currentFilter==="concluidos")list=list.filter(x=>completed.has(x.id));
    if(query)list.sort((a,b)=>a.kind.localeCompare(b.kind)||a.order-b.order);
    let controls=kind==="aula"?`<div class="filter-row"><button class="filter-btn ${currentFilter==="todos"?"active":""}" data-filter="todos">Todas</button>${stages.map(x=>`<button class="filter-btn ${currentFilter===x?"active":""}" data-filter="${escapeHtml(x)}">${escapeHtml(x)}</button>`).join("")}<button class="filter-btn ${currentFilter==="concluidos"?"active":""}" data-filter="concluidos">Concluídas</button></div>`:"";
    return `<div class="eyebrow">IAM ACADEMY / FORMAÇÃO</div><h1 class="page-title">${heading}</h1><p class="page-sub">${sub}</p>${controls}${list.length?(kind==="aula"&&!query?`<div class="course-list">${list.map(row).join("")}</div>`:`<div class="card-grid">${list.map(card).join("")}</div>`):'<div class="empty">Nenhum conteúdo encontrado. Limpe a busca ou altere o filtro.</div>'}`;
  }
  function resourcePage(){
    const refs=selection("referencia").filter(x=>x.source!=="index.md");
    return `<div class="eyebrow">GUIAS E REFERÊNCIAS</div><h1 class="page-title">Biblioteca de estudo</h1><p class="page-sub">Guias, avaliações, custos e material de apoio do próprio curso.</p><div class="card-grid">${refs.map(card).join("")}</div>`;
  }
  function competencies(){
    const matrix=items.find(x=>x.source==="matriz-de-competencias.md");
    return `<div class="eyebrow">MAPA DE EVOLUÇÃO</div><h1 class="page-title">Matriz de competências</h1><p class="page-sub">Seus checkmarks acompanham conteúdo concluído no navegador. A aprovação técnica depende dos exercícios e evidências.</p><div class="stats"><div class="stat"><small>Aulas concluídas</small><strong>${doneCount("aula")}/25</strong></div><div class="stat"><small>Laboratórios concluídos</small><strong>${doneCount("laboratorio")}/${selection("laboratorio").length}</strong></div><div class="stat"><small>Projetos concluídos</small><strong>${doneCount("projeto")}/6</strong></div><div class="stat"><small>Progresso em aulas</small><strong>${progress()}%</strong></div></div><div class="reader-card article">${matrix?matrix.html:""}</div><div class="resource-banner"><div><h3>Seus dados são locais.</h3><p>Este site não possui login, sincronização ou banco de dados. Faça backup do progresso para não perdê-lo ao limpar o navegador.</p></div><div class="buttons"><button class="btn secondary" data-action="export">Exportar progresso ↓</button><button class="btn ghost" data-action="import">Importar progresso ↑</button><input type="file" id="import-progress" accept="application/json,.json" hidden/></div></div>`;
  }
  function resolveLinks(article,item){
    $$("a[href]",article).forEach(link=>{
      const raw=link.getAttribute("href");
      if(!raw||raw.startsWith("#")||/^(https?:|mailto:)/i.test(raw)){if(raw&&raw.startsWith("http")){link.target="_blank";link.rel="noopener noreferrer"}return;}
      if(/^javascript:|^data:/i.test(raw)){link.removeAttribute("href");return;}
      if(raw.endsWith(".md")||raw.includes(".md#")){
        const [relative]=raw.split("#");
        const base=item.source.split("/");base.pop();
        const tokens=base.concat(relative.split("/")),resolved=[];
        for(const token of tokens){if(token==="..")resolved.pop();else if(token&&token!==".")resolved.push(token)}
        const file=resolved.join("/");
        const other=items.find(x=>x.source===file);
        if(other)link.href=href(other);
        else if(relative.includes("01-IAM"))link.href="https://github.com/lpraxedess/Roadmap-Study/blob/main/01-IAM/IAM-Study-Lab.md";
      }
    });
    $$("input[type=checkbox]",article).forEach(cb=>{cb.disabled=true;cb.title="Checklist do material; use o botão Concluir para salvar progresso";});
  }
  function quizPanel(item){
    if(!item.quiz)return "";
    const q=item.quiz,passed=quizResults[item.id]===true;
    return `<section class="quiz-panel" aria-label="Pergunta de fixação"><span class="eyebrow">FIXAÇÃO ATIVA</span><h3>Teste o que aprendeu</h3><p class="quiz-question">${escapeHtml(q.prompt)}</p><div class="quiz-options">${q.options.map((option,i)=>`<button class="quiz-option" data-answer="${i}" data-id="${escapeHtml(item.id)}">${escapeHtml(option)}</button>`).join("")}</div><div id="quiz-result" role="status" aria-live="polite">${passed?"✓ Você acertou anteriormente. Repita para revisar.":""}</div><p class="quiz-hint">Acertar a teoria não comprova a execução prática.</p></section>`;
  }
  function notesPanel(item){
    if(!["aula","laboratorio"].includes(item.kind))return "";
    return `<section class="notes-panel"><h3>Registro de prática</h3><p>Anote o que executou, o resultado e como corrigiu o erro. Fica apenas no seu navegador.</p><label for="lesson-note">Suas anotações</label><textarea id="lesson-note" rows="5" maxlength="4000" placeholder="Executei... O erro foi... Corrigi com...">${escapeHtml(notes[item.id]||"")}</textarea><button class="btn secondary" data-action="save-note" data-id="${escapeHtml(item.id)}">Salvar anotação</button></section>`;
  }
  function reader(id){
    const item=items.find(x=>x.id===id);
    if(!item)return `<div class="empty"><h2>Conteúdo não encontrado</h2><a class="btn" href="#/dashboard">Voltar ao início</a></div>`;
    const index=selection(item.kind),position=index.findIndex(x=>x.id===item.id),prev=index[position-1],next=index[position+1];
    const done=completed.has(item.id);
    lastContent=item.id;
    return `<div class="eyebrow">${escapeHtml(labels[item.kind])} / ${escapeHtml(item.stage||"Prática orientada")}</div><div class="reading-layout"><section class="reader"><div class="reader-card"><div class="reader-header"><h1>${escapeHtml(item.title)}</h1><p>${escapeHtml(item.description)}</p><div class="reader-tools"><button class="btn ${done?"secondary":""}" data-action="toggle" data-id="${escapeHtml(item.id)}">${done?"✓ Marcado como concluído":"✓ Marcar como concluído"}</button><a class="btn ghost" href="#/aulas">Voltar à trilha</a></div></div><div id="article-body" class="article">${item.html}</div>${quizPanel(item)}${notesPanel(item)}<div class="content-bottom">${prev?`<a class="btn secondary" href="${href(prev)}">← Anterior</a>`:"<span></span>"}${next?`<a class="btn secondary" href="${href(next)}">Próximo →</a>`:"<span></span>"}</div></div></section><aside class="reading-side" aria-label="Nesta página"><h3>Nesta página</h3><div class="toc-links" id="toc-links"></div><div class="mini-note">Pratique em ambiente isolado. Não divulgue tokens, senhas ou dados reais.</div></aside></div>`;
  }
  function enrichReader(){
    const item=items.find(x=>x.id===lastContent),article=$("#article-body");
    if(!item||!article)return;
    resolveLinks(article,item);
    const links=$$("#article-body h2, #article-body h3").slice(0,18);
    $("#toc-links").innerHTML=links.map((h,i)=>{h.id=h.id||"topico-"+i;return `<a href="#${h.id}" data-toc="${h.id}">${escapeHtml(h.textContent)}</a>`}).join("")||"<small>Conteúdo de estudo</small>";
  }
  function currentRoute(){let hash=location.hash||"#/dashboard";try{hash=decodeURIComponent(hash)}catch{hash="#/dashboard"}const parts=hash.replace(/^#\//,"").split("/");return {route:parts[0]||"dashboard",id:parts.slice(1).join("/")};}
  function render(){
    const {route,id}=currentRoute();let view;
    if(route==="dashboard")view=dashboard();
    else if(route==="aulas")view=catalog("aula","Sua trilha de estudos","25 aulas organizadas por competências. Revise o que você já conhece e aprofunde engenharia, segurança e arquitetura.");
    else if(route==="laboratorios")view=catalog("laboratorio","Laboratórios práticos","Exercícios orientados com Keycloak, SAML, SCIM, Microsoft Graph, JML e acesso privilegiado.");
    else if(route==="projetos")view=catalog("projeto","Projetos integradores do curso","Seis desafios integradores com cenários, entregáveis e critérios de avaliação.");
    else if(route==="competencias")view=competencies();
    else if(route==="recursos")view=resourcePage();
    else if(route==="conteudo")view=reader(id);
    else view=dashboard();
    main.innerHTML=view;
    navUpdate(route);
    if(route==="conteudo")enrichReader();
    document.title=(route==="conteudo"?items.find(x=>x.id===id)?.title:$("#current-section").textContent)+" | IAM Academy";
    closeMenu();
    window.scrollTo(0,0);
  }
  function downloadProgress(){
    const payload={app:"IAM Academy",version:1,exportedAt:new Date().toISOString(),completed:[...completed]};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download="iam-academy-progresso.json";a.click();URL.revokeObjectURL(url);
    notify("Arquivo de progresso exportado.");
  }
  async function importProgress(file){
    if(!file)return;
    try{
      if(file.size>1024*1024)throw Error("Arquivo muito grande");
      const data=JSON.parse(await file.text());
      if(data.app!=="IAM Academy"||data.version!==1||!Array.isArray(data.completed)||data.completed.length>10000||!data.completed.every(x=>typeof x==="string"))throw Error("Formato inválido");
      completed=new Set(data.completed.filter(id=>items.some(x=>x.id===id)));
      save(STORAGE,JSON.stringify([...completed]));render();notify("Progresso importado.");
    }catch(e){notify("Não foi possível importar: "+e.message)}
  }
  document.addEventListener("click",event=>{
    const noteButton=event.target.closest('[data-action="save-note"]');
    if(noteButton){
      const id=noteButton.dataset.id;
      notes[id]=($("#lesson-note")?.value||"").slice(0,4000);
      save(NOTES_STORE,JSON.stringify(notes));
      notify("Anotação salva neste navegador.");
      return;
    }
    const answer=event.target.closest("[data-answer]");
    if(answer){
      const item=items.find(x=>x.id===answer.dataset.id);
      if(!item?.quiz)return;
      const correct=Number(answer.dataset.answer)===item.quiz.correct;
      const out=$("#quiz-result");
      out.textContent=(correct?"✓ Correto. ":"✗ Revise e tente novamente. ")+item.quiz.explanation;
      out.className=correct?"quiz-right":"quiz-wrong";
      $(".quiz-option").forEach(b=>b.classList.toggle("selected-answer",b===answer));
      if(correct){quizResults[item.id]=true;save(QUIZ_STORE,JSON.stringify(quizResults));}
      return;
    }
    const toggle=event.target.closest('[data-action="toggle"]');
    if(toggle){const id=toggle.dataset.id;if(completed.has(id))completed.delete(id);else completed.add(id);save(STORAGE,JSON.stringify([...completed]));render();notify("Progresso atualizado neste navegador.");return;}
    const filter=event.target.closest("[data-filter]");
    if(filter){currentFilter=filter.dataset.filter;render();return;}
    const action=event.target.closest("[data-action]");
    if(action?.dataset.action==="export")downloadProgress();
    if(action?.dataset.action==="import")$("#import-progress")?.click();
    const toc=event.target.closest("[data-toc]");
    if(toc){event.preventDefault();document.getElementById(toc.dataset.toc)?.scrollIntoView({behavior:"smooth"});}
  });
  document.addEventListener("change",e=>{if(e.target.id==="import-progress")importProgress(e.target.files[0]);});
  $("#menu-toggle").addEventListener("click",()=>{$("#sidebar").classList.toggle("open");$("#overlay").hidden=!$("#sidebar").classList.contains("open")});
  $("#overlay").addEventListener("click",closeMenu);
  $("#global-search").addEventListener("input",e=>{query=e.target.value.trim();const {route}=currentRoute();if(!["aulas","laboratorios","projetos"].includes(route)){location.hash="#/aulas";}else render();});
  window.addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();$("#global-search").focus()}if(e.key==="Escape")closeMenu();});
  window.addEventListener("hashchange",()=>{currentFilter="todos";render();});
  fetch("assets/content.json").then(r=>{if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(data=>{items=data;render()}).catch(e=>{main.innerHTML=`<div class="empty"><h2>Não foi possível carregar o conteúdo.</h2><p>${escapeHtml(e.message)}. Atualize a página e confirme a publicação do site.</p></div>`});
})();
