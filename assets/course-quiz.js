/* Avaliações formativas: 2 questões por capítulo, feedback e histórico local. */
function courseQuizKey(track,id){return track+'/'+id}
function courseQuizResult(track,id){return courseAssessmentState[courseQuizKey(track,id)]||null}
function courseQuizPass(track,id){return (courseQuizResult(track,id)?.score||0)>=100}
function courseQuiz(track,id){
 const key=courseQuizKey(track,id),questions=COURSE_QUIZZES[id]||[];
 const root=el('section',{class:'panel course-board course-assessment'});
 root.append(text('h2','Avaliação formativa · confirme o aprendizado'),
 text('p','Responda sem consultar o roteiro. Acertar as duas questões gera uma indicação de compreensão; não substitui prova prática ou validação profissional.','muted'));
 if(!questions.length)return root;
 let answers=(courseQuizResult(track,id)?.answers||[]).slice(),feedback=el('div',{class:'course-feedback'});
 const renderFeedback=()=>{
  const prev=courseQuizResult(track,id);
  feedback.replaceChildren();
  if(!prev||prev.score===null)return;
  feedback.append(text('p',(prev.score===100?'Aprovado na avaliação teórica':'Revise o capítulo e tente novamente')+
   ' · '+prev.score+'% · '+prev.attempts+' tentativa(s)','course-counter'));
  questions.forEach((q,i)=>{
   if(typeof prev.answers[i]==='number'){
    feedback.append(el('p',{class:prev.answers[i]===q[2]?'course-correct':'course-warning',
    text:'Questão '+(i+1)+': '+(prev.answers[i]===q[2]?'correta. ':'incorreta. ')+q[3]}));
   }
  });
 };
 questions.forEach((q,i)=>{
  const field=el('fieldset',{class:'course-question'});
  field.append(text('legend',(i+1)+'. '+q[0]));
  q[1].forEach((choice,index)=>{
   const label=el('label',{class:'course-choice'}),radio=el('input',{type:'radio',name:'course-quiz-'+track+'-'+id+'-'+i,value:String(index)});
   radio.checked=answers[i]===index;
   radio.onchange=()=>{answers[i]=index};
   label.append(radio,text('span',choice));field.append(label);
  });
  root.append(field);
 });
 const actions=el('div',{class:'course-bottom'}),msg=text('p','','course-counter');
 actions.append(btn('Corrigir respostas',()=>{
  if(questions.some((q,i)=>!Number.isInteger(answers[i]))){msg.textContent='Responda todas as questões antes da correção.';return;}
  const previous=courseQuizResult(track,id);
  const score=Math.round(100*questions.filter((q,i)=>q[2]===answers[i]).length/questions.length);
  courseAssessmentState[key]={answers:[...answers],score,attempts:(previous?.attempts||0)+1,gradedAt:new Date().toISOString()};
  persist();renderFeedback();msg.textContent=score===100?'As duas questões foram respondidas corretamente.':'Releia o conteúdo, especialmente as justificativas abaixo.';
 },'btn primary'));
 root.append(actions,msg,feedback);renderFeedback();return root;
}
function courseReportedReal(track,chapter){
 if(track==='onprem'){
  const d=courseLabState.onprem?.[chapter];
  return d?.mode==='real'&&typeof d.note==='string'&&d.note.trim().length>=12?courseProgress(track,chapter).done:0;
 }
 return COMPANY_CHAPTERS[chapter].tasks.reduce((n,task,i)=>{
  const e=practiceProof[stableTaskKey(chapter,i)];
  return n+Number(courseStepDone('cloud',chapter,i)&&e?.mode==='real'&&typeof e.note==='string'&&e.note.trim().length>=12);
 },0);
}
function courseCanClaim(mode,note){return ['real','simulado','teorico'].includes(mode)&&typeof note==='string'&&note.trim().length>=12}
function courseEvaluationSummary(track){
 const stages=courseStages(track).filter(s=>!courseIsExcluded(track,s.id));
 const passed=stages.filter(s=>courseQuizPass(track,s.id)).length;
 const real=stages.reduce((n,s)=>n+courseReportedReal(track,s.id),0);
 return {passed,total:stages.length,real};
}

/* Artefatos reproduzíveis por capítulo local, links versionados no repositório. */
const COURSE_ARTIFACTS={
 op01:['labs/local/README.md'],
 op02:['labs/local/README.md'],
 op03:['labs/local/README.md','labs/local/scripts/Initialize-AtlasCorpAD.ps1','labs/local/scripts/Test-AtlasCorpAD.ps1'],
 op04:['labs/local/scripts/Initialize-AtlasCorpAD.ps1','labs/local/scripts/Test-AtlasCorpAD.ps1'],
 op05:['labs/local/scripts/Test-AtlasCorpAD.ps1'],
 op06:['labs/local/README.md'],
 op07:['labs/local/README.md'],
 op08:['labs/local/docker-compose.yml','labs/local/README.md'],
 op09:['labs/local/oidc_app.py','labs/local/requirements-oidc.txt','labs/local/saml-sp/app.cjs','labs/local/README.md'],
 op10:['labs/local/scim_server.py','labs/local/tests/test_scim.py','labs/local/README.md'],
 op11:['labs/local/README.md'],
 op12:['labs/README.md']
};
function courseArtifactLinks(id){
 const links=COURSE_ARTIFACTS[id]||[];
 const sec=el('section',{class:'panel course-board course-artifacts'});
 sec.append(text('h2','Arquivos, comandos e ferramentas desta etapa'),
 text('p','Abra os artefatos do próprio repositório para copiar comandos, instalar dependências e executar testes. Acesso ao GitHub não executa alterações automaticamente.','muted'));
 const list=el('ul',{class:'guide-list'});
 links.forEach(path=>{
  const item=el('li');
  item.append(exLink('https://github.com/lpraxedess/Roadmap-Study/blob/main/'+path,path+' ↗'));
  list.append(item);
 });sec.append(list);return sec;
}
