'use strict';
// One atomic document. This module also runs without a DOM for validation.
globalThis.IAMState = (() => {
 const KEY = 'roadmap-iam-state-v4';
 const MODES = ['real', 'simulation', 'mixed'];
 const STATUSES = ['planned', 'studying', 'earned'];
 function create(phases, certifications, storage) {
  const tasks = phases.flatMap(p => p.items), byId = new Map(tasks.map(t => [t.id, t]));
  const certIds = new Set(certifications.map(c => c.id));
  const steps = new Set(tasks.flatMap(t => t.guide.steps.map(s => t.id + '/' + s.id)));
  const tests = new Set(tasks.flatMap(t => t.acceptance.map(s => t.id + '/' + s.id)));
  let available = true, notice = '';
  const blank = () => ({version:4, curriculumVersion:CURRICULUM_VERSION, completed:[], steps:[], tests:[], modes:{}, notes:{}, certifications:{}, lastTask:null, track:'local', legacy:[], revisions:{}});
  const object = v => v && typeof v === 'object' && !Array.isArray(v);
  const unique = values => [...new Set(values)];
  function parse(raw, strict = true) {
   if (!object(raw) || ![2,3,4].includes(raw.version)) throw Error('Versão de backup incompatível.');
   const data = blank();
   function ids(value, allowed, name, required = false, retired = false) {
    if (value === undefined && !required) return [];
    if (!Array.isArray(value) || value.length > 10000 || !value.every(id => typeof id === 'string' && allowed.has(id))) {
     if (strict && !retired) throw Error(name + ' inválidos.');
     return Array.isArray(value) ? unique(value.filter(id => allowed.has(id))) : [];
    }
    return unique(value);
   }
   const completed = ids(raw.completed, byId, 'Competências', true);
   if (raw.version < 4) {
    // All lessons were revised: retain history, never invent new step confirmations.
    if (raw.steps !== undefined && (!Array.isArray(raw.steps) || !raw.steps.every(x => typeof x === 'string' && /^iam-\d+-\d+#\d+$/.test(x)))) throw Error('Passos antigos inválidos.');
    data.legacy = completed;
   } else {
    if(strict&&typeof raw.curriculumVersion!=='string')throw Error('Versão do currículo ausente.');
    const retired=typeof raw.curriculumVersion==='string'&&raw.curriculumVersion!==CURRICULUM_VERSION;
    data.steps = ids(raw.steps, steps, 'Passos', true, retired);
    data.tests = ids(raw.tests, tests, 'Testes', true, retired);
    data.legacy = ids(raw.legacy, byId, 'Histórico');
    for (const [field, allowed, max] of [['modes',MODES,40],['certifications',STATUSES,40]]) {
     const source = raw[field];
     if (source !== undefined && !object(source)) throw Error(field + ' inválido.');
     for (const [id,value] of Object.entries(source || {})) {
      if ((field === 'modes' ? byId.has(id) : certIds.has(id)) && allowed.includes(value)) data[field][id] = value;
      else if (strict) throw Error(field + ' contém valor desconhecido.');
     }
    }
    if (raw.notes !== undefined && !object(raw.notes)) throw Error('Evidências inválidas.');
    for (const [id,note] of Object.entries(raw.notes || {})) {
     if (byId.has(id) && typeof note === 'string' && note.length <= 6000) data.notes[id] = note;
     else if (strict) throw Error('Evidência inválida ou maior que 6000 caracteres.');
    }
    const revised = new Set();
    for (const task of tasks) {
     if (raw.revisions?.[task.id] === task.revision) data.revisions[task.id] = task.revision;
     else if (raw.steps?.some(id => id.startsWith(task.id + '/')) || completed.includes(task.id)) revised.add(task.id);
    }
    if (revised.size) {
     data.steps = data.steps.filter(id => !revised.has(id.split('/')[0]));
     data.tests = data.tests.filter(id => !revised.has(id.split('/')[0]));
     data.legacy = unique([...data.legacy,...completed.filter(id => revised.has(id))]);
    }
    data.completed = completed.filter(id => canComplete(data,id));
    data.legacy = unique([...data.legacy,...completed.filter(id => !data.completed.includes(id))]);
   }
   // Certification state can be recovered from older exports too.
   if (raw.version < 4 && object(raw.certifications)) for (const [id,status] of Object.entries(raw.certifications)) if (certIds.has(id) && STATUSES.includes(status)) data.certifications[id] = status;
   if (raw.lastTask != null && !byId.has(raw.lastTask) && strict) throw Error('Último tópico desconhecido.');
   data.lastTask = byId.has(raw.lastTask) ? raw.lastTask : null;
   data.track = ['local','microsoft','premium'].includes(raw.track) ? raw.track : 'local';
   return data;
  }
  function canComplete(data,id) {
   const task = byId.get(id);
   return !!task && MODES.includes(data.modes[id]) && task.guide.steps.every(s => data.steps.includes(id + '/' + s.id)) && task.acceptance.every(s => data.tests.includes(id + '/' + s.id));
  }
  let data = blank();
  try {
   const current = storage.getItem(KEY);
   if (current !== null) data = parse(JSON.parse(current),false);
   else {
    const read = (key,fallback) => {const value=storage.getItem(key);return value===null?fallback:JSON.parse(value)};
    const old = read('roadmap-iam-progress-v2',read('roadmap-iam-progress-v1',[]));
    data = parse({version:3, completed:Array.isArray(old)?old:[], steps:[], certifications:read('roadmap-iam-certifications-v1',{}), lastTask:storage.getItem('roadmap-iam-last-topic-v1')},false);
    if (data.legacy.length) notice = 'Seu histórico anterior foi preservado. As lições mudaram: reconfirme prática, testes e evidências para concluir a nova versão.';
   }
  } catch {available=false;notice='Não foi possível ler os dados locais. Os dados anteriores foram mantidos; importe um backup ou exporte esta sessão antes de sair.';}
  function save() {
   try {storage.setItem(KEY,JSON.stringify(data));available=true;return true;}
   catch {available=false;return false;}
  }
  function update(change) {
   const next = JSON.parse(JSON.stringify(data));
   change(next);
   // Revision is stamped when the new activity is actually edited.
   for (const t of tasks) if (next.steps.some(id => id.startsWith(t.id + '/')) || next.tests.some(id => id.startsWith(t.id + '/'))) next.revisions[t.id] = t.revision;
   // Editing a current lesson reopens it; only imports/revisions create legacy history.
   next.completed = next.completed.filter(id => canComplete(next,id));
   data = parse(next);
   return save();
  }
  return {key:KEY, get:()=>JSON.parse(JSON.stringify(data)), available:()=>available, notice:()=>notice, canComplete:id=>canComplete(data,id), update,
   import(raw) {const next=parse(raw);data=next;notice=raw.version<4?'Histórico importado. Reconfirme os laboratórios revisados.':'';return save();},
   export:()=>({...JSON.parse(JSON.stringify(data)),exportedAt:new Date().toISOString()}),
   reset() {data=blank();notice='';return save();}, validate:raw=>parse(raw)};
 }
 return {create,KEY};
})();
