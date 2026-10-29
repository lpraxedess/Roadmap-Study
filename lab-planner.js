'use strict';
/* Plano operacional: orientações não executam alterações no tenant nem criam recursos Azure. */
(() => {
  const KEY='iam-lab-plan-v1';
  const BUDGET='iam-lab-budget-v1';
  const stages=[
    {id:'base',name:'01 · Preparar a bancada',phase:'prep',time:'Semana 1',tier:'Local · R$ 0',goal:'Organizar arquivos, recursos e o contrato da empresa Aurora.',work:[
      ['inventario','Registrar CPU, memória RAM, espaço livre, sistema operacional e suporte à virtualização.','Antes de instalar VMs, confirmar capacidade. Se faltar RAM, usar apenas a trilha local e adiar AD.'],
      ['dados','Criar C:\\AuroraLab\\rh.csv com o cadastro fictício E001–E006.','Verificar seis employeeId únicos. Nunca usar dados reais.'],
      ['isolamento','Criar rede virtual host-only para DC01 e CL01.','Testar que serviços AD não estão publicados na internet.'],
      ['backup','Criar pasta de evidências sem senhas/tokens e exportar o progresso do portal.','Salvar a exportação fora da VM.']
    ],link:'prep-route',doc:'https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview'},
    {id:'ad',name:'02 · Active Directory',phase:'p1',time:'Semanas 2–3',tier:'Local · avaliação',goal:'Construir DC01, DNS, domínio aurora.test, OUs, grupos e CL01.',work:[
      ['eval','Conferir termos e prazo da avaliação do Windows Server.','Avaliação de 180 dias; não tratar licença de avaliação como produção.'],
      ['dc','Criar DC01 e o domínio aurora.test em rede isolada.','Validar DNS e consulta dos registros SRV.'],
      ['ou','Criar OUs, grupos e contas fictícias do piloto.','Conferir associação FIN e JUR e negar privilégio excessivo.'],
      ['cliente','Associar CL01 ao domínio e testar Kerberos/GPO.','Registrar teste de usuário comum e controle negativo.']
    ],link:'iam-1-0',doc:'https://www.microsoft.com/pt-br/evalcenter/download-windows-server-2025'},
    {id:'entra',name:'03 · Microsoft Entra Free',phase:'p2',time:'Semana 4',tier:'Cloud · Free',goal:'Separar administração, usuários, grupos e auditoria do tenant de laboratório.',work:[
      ['tenant','Obter tenant de testes autorizado e registrar seu domínio onmicrosoft.com.','Não pressupor que é possível criar tenants adicionais em conta gratuita.'],
      ['privilegios','Criar administrador cloud-only separado e definir recuperação.','Não sincronizar contas administrativas; evitar bloqueio do tenant.'],
      ['identidades','Criar usuários/grupos de teste com nomenclatura da Aurora.','Conferir permissões e registrar evidências sem identificadores sensíveis.'],
      ['mfa','Habilitar métodos disponíveis e testar MFA quando aplicável.','Manter rota de emergência antes de políticas restritivas.']
    ],link:'iam-2-0',doc:'https://learn.microsoft.com/pt-br/entra/fundamentals/create-new-tenant'},
    {id:'hibrido',name:'04 · Sincronização híbrida',phase:'p2',time:'Semana 5',tier:'Cloud Free · checar pré-requisitos',goal:'Sincronizar escopo mínimo de AD para Entra com monitoramento.',work:[
      ['agente','Verificar requisitos oficiais de Cloud Sync e conta Hybrid Identity Administrator.','Agente em Windows Server ingressado no domínio; não confundir com um script simples.'],
      ['escopo','Limitar sincronização ao piloto Colaboradores e Grupos.','Contas privilegiadas e de emergência ficam fora do escopo.'],
      ['teste','Conferir identidade correlacionada, estado e logs do provisionamento.','Validar duplicatas, falhas e reversão.'],
      ['reversao','Documentar recuperação e diferença entre desabilitar AD e revogar sessões cloud.','Não assumir desligamento imediato de todas as sessões.']
    ],link:'iam-2-1',doc:'https://learn.microsoft.com/pt-br/entra/identity/hybrid/cloud-sync/how-to-prerequisites'},
    {id:'protocolos',name:'05 · OIDC, SAML e SCIM',phase:'p3',time:'Semanas 6–7',tier:'Local · R$ 0',goal:'Construir IDP01 e APP01; ver autenticação, autorização e provisionamento separados.',work:[
      ['idp','Retomar IDP01/realm aurora configurado na preparação; validar seu isolamento local.','Somente loopback para modo de desenvolvimento.'],
      ['oidc','Registrar cliente OIDC, redirect URI exata e PKCE S256.','Testar state, nonce, issuer, audience e expiração.'],
      ['scim','Criar/atualizar cadastro APP01 por chamadas SCIM.','Distinguir provisionamento de autenticação; não expor token.'],
      ['negativo','Executar cenários de 401/403, mudança de departamento e desativação.','Registrar efeito observado e reversão.']
    ],link:'iam-3-1',doc:'https://www.keycloak.org/guides'},
    {id:'jml',name:'06 · Ciclo JML e governança',phase:'p4',time:'Semana 8',tier:'Local primeiro',goal:'Executar J001, M001 e L001 em sistemas separados e provar a revogação.',work:[
      ['j','Admissão: E001 obtém grupo FIN e acesso positivo somente em FIN.','FIN 200; JUR 403.'],
      ['m','Transferência: remover FIN, conceder JUR e atualizar APP01.','FIN 403; JUR 200.'],
      ['l','Desligamento: desabilitar contas, remover atribuições e testar novas sessões.','Ambos os acessos negados.'],
      ['auditoria','Produzir matriz de evidência, revisor, data, identidade e sistema.','Separar automação real de ações manuais.']
    ],link:'iam-4-0',doc:'https://learn.microsoft.com/pt-br/entra/id-governance/'},
    {id:'premium',name:'07 · Janela licenciada P1/P2',phase:'p5',time:'Após dominar o Free',tier:'Pago/trial · controlado',goal:'Concentrar testes dependentes de licença em um período delimitado.',work:[
      ['requisitos','Listar previamente políticas CA, SSPR, PIM e revisões a executar.','CA/SSPR avançado dependem de licença; PIM e Identity Protection exigem P2 ou elegibilidade equivalente.'],
      ['licencas','Verificar preço final, impostos, prazo, quantidade de usuários e elegibilidade do trial.','Preço anunciado por usuário/ano não é mensal sem compromisso.'],
      ['ca','Criar política Conditional Access inicialmente em modo somente relatório quando disponível.','Excluir contas de emergência; ensaiar com usuário piloto.'],
      ['desligar','Exportar evidências, remover recursos temporários e revisar renovação.','Cancelar a avaliação antes da conversão se não quiser cobrar.']
    ],link:'iam-2-4',doc:'https://www.microsoft.com/pt-br/security/microsoft-entra-pricing'},
    {id:'intune',name:'08 · Intune + dispositivo',phase:'p7',time:'Janela licenciada P1',tier:'P1 / Business Premium',goal:'Gerenciar um dispositivo Windows elegível sem comprometer o computador principal.',work:[
      ['elegibilidade','Confirmar Windows suportado, licença Intune P1 e Entra P1/P2.','Inscrição MDM automática exige licença. Não inferir suporte ao Autopilot.'],
      ['enroll','Inscrever CL01 ou VM Windows elegível no Intune.','Validar entrada do dispositivo e último check-in.'],
      ['compliance','Criar política de conformidade piloto e observar resultado.','Testar usuário/dispositivo de prova antes de CA exigir conformidade.'],
      ['remocao','Desassociar dispositivo e remover políticas ao concluir.','Documentar impacto de wipe/retire; não aplicar em dispositivo pessoal.']
    ],link:'iam-7-0',doc:'https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enroll'},
    {id:'azure',name:'09 · Azure com custo sob controle',phase:'p6',time:'Somente quando necessário',tier:'Opcional · variável',goal:'Testar RBAC, service principal e managed identity sem VM Azure permanente.',work:[
      ['assinatura','Confirmar tipo de assinatura, créditos e preço regional.','Conta Free com crédito tem limite; Pay-as-you-go não tem trava de gastos.'],
      ['alerta','Criar orçamento e alertas de 50%, 80% e 100% no Azure Cost Management.','Alertas não interrompem automaticamente cobranças.'],
      ['piloto','Usar grupo de recursos descartável e recursos elegíveis, verificando custo antes de criar.','Não deixar VM, disco ou IP público alocado sem necessidade.'],
      ['limpeza','Excluir grupo de recursos após teste e inspecionar custos e cobranças pendentes.','Orçamento no portal é somente planejamento, não replica fatura Azure.']
    ],link:'iam-6-0',doc:'https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/avoid-charges-free-account'},
    {id:'portfolio',name:'10 · Projeto final e portfólio',phase:'p9',time:'Após etapas anteriores',tier:'Local · R$ 0',goal:'Comprovar fluxo completo, limites e decisões técnicas.',work:[
      ['fluxo','Executar cenário JML com AD, Entra, IdP e APP01 existentes.','Identificar os componentes realmente integrados e os que foram operados manualmente.'],
      ['evidencias','Capturar logs sanitizados de testes positivos, negativos e recuperação.','Nunca registrar credenciais, tokens ou e-mails reais.'],
      ['arquitetura','Publicar desenho, matriz RBAC/SoD e ADRs técnicos.','Informar custo, pré-requisitos e decisões.'],
      ['revisao','Realizar revisão técnica e definir próximos estudos SC-900 → SC-300.','Não afirmar certificação ou cobertura completa de prova.']
    ],link:'iam-9-0',doc:'https://learn.microsoft.com/pt-br/credentials/certifications/identity-and-access-administrator/'}
  ];
  const $=id=>document.getElementById(id);
  const text=(tag,cls,content)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(content!==undefined)el.textContent=content;return el};
  const a=(label,href)=>{const el=text('a','',label);el.href=href;return el};
  const read=(key,fallback)=>{try {return JSON.parse(localStorage.getItem(key))??fallback} catch{return fallback}};
  const write=(key,obj)=>{try{localStorage.setItem(key,JSON.stringify(obj));return true}catch{return false}};
  const money=value=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(value);
  const checked=read(KEY,{});
  const plan=read(BUDGET,{cap:200,license:0,seats:1,azure:0,extras:0,reserve:35});
  const licenses=[
    {value:0,label:'Sem licença paga · R$ 0'},
    {value:40.10,label:'Entra ID P1 · R$ 40,10/usuário/mês (plano anual)'},
    {value:45.80,label:'Intune P1 · R$ 45,80/usuário/mês (plano anual)'},
    {value:107.60,label:'Business Premium sem Teams · R$ 107,60/usuário/mês (plano anual)'},
    {value:126,label:'Business Premium com Teams · R$ 126/usuário/mês (plano anual)'}
  ];
  let active='base';
  const container=$('lab-planner');
  if(!container)return;
  function render(){
    container.replaceChildren();
    const completed=stages.flatMap(s=>s.work.map(([id])=>s.id+'-'+id)).filter(id=>checked[id]).length;
    const total=stages.reduce((n,s)=>n+s.work.length,0);
    const intro=text('section','lab-intro');
    intro.append(text('span','eyebrow','PLANO OPERACIONAL · AURORA IAM'),text('h2','','Construa um laboratório que evolui com você.'),text('p','muted','Uma única empresa fictícia. Cada etapa entrega um componente verificável. Aulas detalhadas e checklist de infraestrutura trabalham juntos — nenhuma opção abaixo cria recursos cloud automaticamente.'));
    const badges=text('div','lab-intro-badges');
    [['10','etapas de implantação'],[String(total),'verificações operacionais'],[String(completed),'verificações registradas']].forEach(([n,t])=>{const b=text('div','lab-intro-badge');b.append(text('strong','',n),text('small','',t));badges.append(b)});intro.append(badges);container.append(intro);
    const layout=text('div','lab-layout'),nav=text('nav','lab-stage-nav');nav.setAttribute('aria-label','Etapas do laboratório');
    stages.forEach(s=>{const done=s.work.filter(([id])=>checked[s.id+'-'+id]).length;const button=text('button','lab-stage'+(s.id===active?' is-active':''),s.name);button.type='button';button.setAttribute('aria-current',s.id===active?'step':'false');button.append(text('small','',done+' de '+s.work.length+' · '+s.time));button.addEventListener('click',()=>{active=s.id;render();$('lab-stage-detail')?.focus({preventScroll:true});});nav.append(button)});
    const body=text('div','lab-stage-detail');body.id='lab-stage-detail';body.tabIndex=-1;
    const stage=stages.find(s=>s.id===active);
    body.append(text('span','eyebrow',stage.tier+' · '+stage.time),text('h3','',stage.name),text('p','muted',stage.goal));
    const actions=text('div','lab-actions');const start=a('Abrir aula relacionada →','#task-'+stage.link);start.className='button';const docs=a('Documentação oficial ↗',stage.doc);docs.className='button secondary';docs.target='_blank';docs.rel='noopener noreferrer';actions.append(start,docs);body.append(actions);
    const list=text('ol','lab-checklist');stage.work.forEach(([id,title,expected],i)=>{const li=text('li','lab-check'+(checked[stage.id+'-'+id]?' is-done':''));const label=text('label','lab-check-main');const input=document.createElement('input');input.type='checkbox';input.checked=!!checked[stage.id+'-'+id];input.addEventListener('change',()=>{checked[stage.id+'-'+id]=input.checked;if(!write(KEY,checked))alert('Não foi possível salvar as verificações neste navegador.');render()});const wrap=text('span');wrap.append(text('strong','',String(i+1).padStart(2,'0')+' · '+title),text('small','',expected));label.append(input,wrap);li.append(label);list.append(li)});body.append(list);
    const advisory=text('p','lab-note','O checklist registra sua confirmação manual, não valida tecnicamente o ambiente. Para comprovar execução, faça os testes de cada aula e salve evidências sem segredos.');
    body.append(advisory);layout.append(nav,body);container.append(layout);
    const cost=text('section','lab-budget');cost.id='lab-budget';cost.append(text('span','eyebrow','CONTROLE FINANCEIRO · VALORES EM BRL'),text('h3','','Orçamento mensal para o laboratório'),text('p','muted','Calcule uma reserva antes de iniciar períodos pagos. Os preços licenciados abaixo são referências publicadas para compromisso anual, por usuário, sem impostos. Não são cotação de cobrança mensal nem substituem o checkout.'));
    const form=text('div','lab-budget-grid'),fields=[
      ['cap','Teto mensal disponível',200],
      ['seats','Usuários que precisam de licença',1],
      ['azure','Azure e consumos variáveis estimados',0],
      ['extras','Outros gastos estimados',0],
      ['reserve','Reserva para imprevistos',35]
    ];
    const licenseLabel=text('label','lab-field');licenseLabel.append(text('span','','Licença de referência (1 usuário)'));const sel=document.createElement('select');sel.id='lab-license';licenses.forEach(item=>{const op=document.createElement('option');op.value=String(item.value);op.textContent=item.label;sel.append(op)});sel.value=String(plan.license||0);sel.addEventListener('change',()=>{plan.license=Number(sel.value);write(BUDGET,plan);renderBudget()});licenseLabel.append(sel);form.append(licenseLabel);
    fields.forEach(([id,label,fallback])=>{const field=text('label','lab-field');field.append(text('span','',label));const input=document.createElement('input');input.type='number';input.id='lab-'+id;input.min='0';input.step=id==='seats'?'1':'0.01';input.inputMode='decimal';input.value=Number.isFinite(plan[id])?String(plan[id]):String(fallback);input.addEventListener('input',()=>{const n=Number(input.value);plan[id]=Number.isFinite(n)?Math.max(id==='seats'?1:0,id==='seats'?Math.floor(n):n):0;write(BUDGET,plan);renderBudget()});field.append(input);form.append(field)});
    cost.append(form);
    const summary=text('div','lab-budget-summary');summary.id='lab-budget-summary';cost.append(summary);
    const info=text('p','lab-note','Planejamento local. Não consulta cobrança Microsoft e não aplica limite de gastos no Azure. Alerts de orçamento são avisos; Pay-as-you-go não possui spending limit automático.');cost.append(info);
    const references=text('div','lab-reference-links');[['Preços oficiais Microsoft','https://www.microsoft.com/pt-br/security/pricing/small-medium-business'],['Azure Cost Management','https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/cost-mgt-alerts-monitor-usage-spending'],['Limite de gastos do Azure Free','https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/spending-limit']].forEach(([label,url])=>{const l=a(label+' ↗',url);l.target='_blank';l.rel='noopener noreferrer';references.append(l)});cost.append(references);container.append(cost);renderBudget();
    const guard=text('section','lab-safety');guard.append(text('span','eyebrow','ANTES DE ATIVAR UMA AVALIAÇÃO'),text('h3','','Regras para não interromper o estudo'));
    const guardList=text('ul');[
      'Use somente ambiente e usuários fictícios; não sincronize conta pessoal ou corporativa.',
      'Configure administradores de recuperação antes de políticas de acesso condicional.',
      'Concentre P1, P2 e Intune em janelas de testes; confira licenças por usuário beneficiado, possíveis impostos, cartão e renovação automática.',
      'Máquinas virtuais de Windows Server e Windows cliente exigem licença ou avaliação válida e hardware compatível.',
      'Não exponha AD DS, RDP, Keycloak em modo dev ou tokens SCIM na internet.',
      'Desligar VM Azure não significa eliminar todos os custos: discos e IPs podem continuar cobrando.'
    ].forEach(x=>guardList.append(text('li','',x)));guard.append(guardList);container.append(guard);
  }
  function renderBudget(){
    const target=$('lab-budget-summary');if(!target)return;target.replaceChildren();
    const cap=Math.max(0,Number(plan.cap)||0),spend=Math.max(0,Number(plan.license)||0)*Math.max(1,Math.floor(Number(plan.seats)||1))+Math.max(0,Number(plan.azure)||0)+Math.max(0,Number(plan.extras)||0),reserve=Math.max(0,Number(plan.reserve)||0),available=cap-spend-reserve;
    const cards=[['Estimativa de gastos',money(spend)],['Margem após reserva',money(available)],['Teto informado',money(cap)]];
    cards.forEach(([label,value])=>{const box=text('div','lab-cost-stat');box.append(text('small','',label),text('strong','',value));target.append(box)});
    target.classList.toggle('over-budget',available<0);
    if(available<0)target.append(text('p','lab-budget-warning','A projeção ultrapassa o teto após reservar imprevistos. Revise itens antes de contratar.'));
  }
  window.IAMLab={
    render,
    getStages:()=>stages,
    exportState:()=>({version:1,checks:{...checked},budget:{...plan}}),
    importState(payload){
      if(!payload)return;
      if(payload.version!==1||!payload.checks||typeof payload.checks!=='object'||Array.isArray(payload.checks)||!payload.budget||typeof payload.budget!=='object'||Array.isArray(payload.budget))throw Error('Plano de laboratório inválido.');
      const allowed=new Set(stages.flatMap(stage=>stage.work.map(([id])=>stage.id+'-'+id)));
      if(Object.keys(payload.checks).length>100||Object.keys(payload.checks).some(k=>!allowed.has(k)||typeof payload.checks[k]!=='boolean'))throw Error('Checklist do laboratório inválido.');
      for(const key of Object.keys(checked))delete checked[key];
      for(const [key,value] of Object.entries(payload.checks))checked[key]=value;
      for(const [key,fallback] of Object.entries({cap:200,license:0,seats:1,azure:0,extras:0,reserve:35})){
        const raw=payload.budget[key];const value=Number(raw);
        plan[key]=raw!==undefined&&Number.isFinite(value)&&value>=0&&value<1000000?(key==='seats'?Math.max(1,Math.floor(value)):value):fallback;
      }
      write(KEY,checked);write(BUDGET,plan);render();
    },
    reset(){
      for(const key of Object.keys(checked))delete checked[key];
      Object.assign(plan,{cap:200,license:0,seats:1,azure:0,extras:0,reserve:35});
      write(KEY,checked);write(BUDGET,plan);active='base';render();
    }
  };
  render();
})();