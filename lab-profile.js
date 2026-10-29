'use strict';
/* Hardware do estudante: o perfil fica somente no navegador e não interage com as VMs. */
(() => {
  const KEY='iam-hardware-v1';
  const ROOT='lab-profile';
  const defaults={os:'unknown',freeGb:null,virtualization:'unknown',ramGb:16,tenant:'free'};
  const osChoices=[
    ['unknown','Ainda não informado'],
    ['windows11pro','Windows 11 Pro / Enterprise'],
    ['windows11home','Windows 11 Home'],
    ['windows10','Windows 10 (planejar atualização)'],
    ['linux','Linux'],
    ['other','Outro sistema']
  ];
  const virtChoices=[['unknown','Ainda não verifiquei'],['enabled','Ativada'],['disabled','Desativada']];
  const read=()=>{try{const v=JSON.parse(localStorage.getItem(KEY));return typeof v==='object'&&v&&!Array.isArray(v)?v:{}}catch{return {}}};
  let profile={...defaults,...read()};
  const node=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el};
  const link=(value,url)=>{const el=node('a','',value);el.href=url;el.target='_blank';el.rel='noopener noreferrer';return el};
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(profile));return true}catch{return false}};
  const root=document.getElementById(ROOT);
  if(!root)return;

  function render(){
    root.replaceChildren();
    const header=node('section','hardware-heading');
    header.append(node('span','eyebrow','AMBIENTE IDENTIFICADO · PERFIL LOCAL'),node('h2','','Sua bancada IAM, dimensionada para 16 GB de RAM.'),node('p','muted','Ryzen 5 5600 · 6 núcleos / 12 threads · RTX 3070 · 1 TB NVMe · 16 GB DDR4 · Microsoft Entra gratuito. Sem metas de horas ou prazo: avance somente após conferir cada resultado.'));
    const facts=node('div','hardware-facts');
    [['CPU','Ryzen 5 5600'],['Memória física','16 GB'],['Disco instalado','1 TB NVMe'],['Tenant','Entra Free'],['Licenças pagas','Nenhuma'],['Orçamento','R$ 200/mês']].forEach(([label,value])=>{const item=node('div','hardware-fact');item.append(node('small','',label),node('strong','',value));facts.append(item)});
    header.append(facts);
    const inputs=node('div','hardware-inputs');
    const formTitle=node('h3','','Confirmações necessárias antes de criar as VMs');inputs.append(formTitle);
    const fields=node('div','hardware-fields');
    const makeSelect=(title,id,choices)=>{const field=node('label','hardware-field');field.append(node('span','',title));const select=document.createElement('select');select.id='hardware-'+id;for(const [value,label] of choices){const option=document.createElement('option');option.value=value;option.textContent=label;select.append(option)}select.value=profile[id]||'unknown';select.addEventListener('change',()=>{profile[id]=select.value;save();updateAdvice()});field.append(select);fields.append(field)};
    makeSelect('Sistema operacional do computador','os',osChoices);
    makeSelect('Virtualização no BIOS/UEFI','virtualization',virtChoices);
    const disk=node('label','hardware-field');disk.append(node('span','','Espaço livre do NVMe (GB)'));const input=document.createElement('input');input.type='number';input.min='0';input.max='1000';input.step='1';input.id='hardware-freeGb';input.placeholder='Ex.: 260 (ainda não informado)';input.value=profile.freeGb==null?'':String(profile.freeGb);input.addEventListener('change',()=>{const raw=input.value.trim();profile.freeGb=raw===''?null:Math.min(1000,Math.max(0,Number(raw)||0));save();updateAdvice()});disk.append(input);fields.append(disk);
    inputs.append(fields);
    const advice=node('div','hardware-advice');advice.id='hardware-advice';inputs.append(advice);
    root.append(header,inputs);
    const allocate=node('section','hardware-layout');
    allocate.append(node('span','eyebrow','CAPACIDADE E SEGURANÇA'),node('h3','','Várias tecnologias, mas não todas ligadas ao mesmo tempo.'));
    const grid=node('div','hardware-machines');
    [
      ['DC01','Windows Server (avaliação)','2 vCPU · 3–4 GB RAM · disco de 60 GB','3 GB é configuração enxuta; 4 GB é preferível com interface gráfica. AD DS + DNS; agente Cloud Sync no próprio DC é suportado apenas como opção econômica de laboratório.'],
      ['CL01','Windows 11 Enterprise (avaliação)','2 vCPU · 4 GB RAM · disco de 80 GB','Usar avaliação válida de 90 dias; exigir UEFI, TPM virtual e Secure Boot compatíveis. Só iniciar quando a aula precisar de logon, GPO ou dispositivo.'],
      ['IDP01 + APP01','Keycloak + Node.js','Docker/Node no host · recursos sob demanda','Iniciar após encerrar VMs não envolvidas no exercício. Keycloak em modo de desenvolvimento somente em loopback.'],
      ['TENANT01','Microsoft Entra Free','Cloud · nenhum consumo de RAM local','O tenant já existe. Priorize usuários fictícios, grupos, roles e MFA com padrões de segurança; recursos P1/P2 ficam para janelas licenciadas.']
    ].forEach(([name,label,resources,detail])=>{const card=node('article','hardware-machine');card.append(node('span','eyebrow',name),node('h4','',label),node('strong','',resources),node('p','muted',detail));grid.append(card)});
    allocate.append(grid);
    const sequence=node('div','hardware-session');
    sequence.append(node('h4','','Modo de trabalho recomendado'),node('p','','Sessão AD: ligue DC01; para testar ingresso/logon/GPO, adicione CL01 por um período curto. Sessão OIDC/SCIM: encerre CL01 e, se possível, DC01; abra apenas Docker + Node. Sessão Entra: o navegador basta. Sessão híbrida: DC01 + acesso HTTPS de saída para o agente; não publique portas AD na internet.'));
    allocate.append(sequence);
    const evidence=node('p','hardware-reference');
    evidence.append(node('span','','Fontes e requisitos: '),link('Windows Server','https://learn.microsoft.com/pt-br/windows-server/get-started/hardware-requirements'),node('span','',' · '),link('Windows 11','https://learn.microsoft.com/pt-br/windows/whats-new/windows-11-requirements'),node('span','',' · '),link('Windows 11 Enterprise Evaluation','https://www.microsoft.com/pt-br/evalcenter/evaluate-windows-11-enterprise'),node('span','',' · '),link('Cloud Sync (agente no DC suportado)','https://learn.microsoft.com/pt-br/entra/identity/hybrid/cloud-sync/how-to-prerequisites'));
    allocate.append(evidence);root.append(allocate);updateAdvice();
  }
  function updateAdvice(){
    const area=document.getElementById('hardware-advice');if(!area)return;area.replaceChildren();
    const msgs=[];
    if(profile.os==='unknown')msgs.push('Confirme se o HOST01 usa Windows Home, Pro ou Linux para escolher Hyper-V, VirtualBox ou KVM e os comandos de instalação.');
    if(profile.os==='windows11home')msgs.push('Windows Home não oferece o papel Hyper-V completo; use hipervisor compatível e verifique isolamento, TPM virtual e Secure Boot para CL01.');
    if(profile.os==='windows10')msgs.push('Windows 10 saiu do suporte geral; não use o host sem avaliar atualização/ESU e riscos de segurança.');
    if(profile.virtualization==='unknown')msgs.push('Verifique SVM/AMD-V habilitada no BIOS/UEFI e disponibilidade no sistema antes de criar as VMs.');
    if(profile.virtualization==='disabled')msgs.push('Habilite SVM/AMD-V no firmware antes da virtualização. Reinicie e valide no hipervisor.');
    if(profile.freeGb===null)msgs.push('O NVMe tem 1 TB de capacidade, mas falta informar quanto está livre. Planeje aproximadamente 200 GB livres para VMs, ISOs e snapshots.');
    else if(profile.freeGb<180)msgs.push('Espaço livre abaixo de 180 GB. Não crie as duas VMs; libere espaço antes e evite snapshots extensos.');
    else msgs.push('Espaço livre informado suficiente para a proposta inicial, desde que snapshots e ISOs sejam controlados.');
    msgs.push('Com 16 GB de RAM: DC01 3–4 GB + CL01 4 GB deixam cerca de 8–9 GB para host e demais processos. Se o host começar a paginar, desligue CL01.');
    for(const m of msgs)area.append(node('p','',m));
    const status=node('strong','hardware-advice-status',profile.os==='unknown'||profile.virtualization!=='enabled'||profile.freeGb===null||profile.freeGb<180?'Pré-voo pendente: confirme ambiente antes de instalar.':'Pré-voo informado: confira licenças e requisitos do hipervisor antes de instalar.');
    area.prepend(status);
  }
  window.IAMHardware={
    exportState:()=>({version:1,...profile}),
    importState(raw){
      if(!raw||raw.version!==1||!osChoices.some(([id])=>id===raw.os)||!virtChoices.some(([id])=>id===raw.virtualization)||!(raw.freeGb===null||(Number.isFinite(raw.freeGb)&&raw.freeGb>=0&&raw.freeGb<=1000)))throw Error('Perfil de hardware inválido no backup.');
      profile={...defaults,os:raw.os,virtualization:raw.virtualization,freeGb:raw.freeGb,ramGb:16,tenant:'free'};save();render();
    },
    reset(){profile={...defaults};save();render();},
    render
  };
  render();
})();