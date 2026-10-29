'use strict';
/* Hardware do estudante: o perfil fica somente no navegador e não interage com as VMs. */
(() => {
  const KEY='iam-hardware-v1';
  const ROOT='lab-profile';
  const defaults={os:'windows11pro',hypervisor:'virtualbox',vboxVersion:'unknown',freeGb:null,virtualization:'unknown',ramGb:16,tenant:'free'};
  const osChoices=[
    ['windows11','Windows 11 (edição ainda não informada)'],
    ['unknown','Não identificado'],
    ['windows11pro','Windows 11 Pro / Enterprise'],
    ['windows11home','Windows 11 Home'],
    ['windows10','Windows 10 (planejar atualização)'],
    ['linux','Linux'],
    ['other','Outro sistema']
  ];
  const virtChoices=[['unknown','Ainda não verifiquei'],['enabled','Ativada'],['disabled','Desativada']];
  const versionChoices=[['unknown','Versão não informada'],['7.2','VirtualBox 7.2'],['7.1','VirtualBox 7.1'],['7.0','VirtualBox 7.0'],['older','VirtualBox 6.x / anterior']];
  const read=()=>{try{const v=JSON.parse(localStorage.getItem(KEY));return typeof v==='object'&&v&&!Array.isArray(v)?v:{}}catch{return {}}};
  let profile={...defaults,...read()};
  // O usuário confirmou Windows 11 Pro e VirtualBox. Corrigir perfis legados com edição indefinida.
  profile.os='windows11pro';
  profile.hypervisor='virtualbox';
  if(!versionChoices.some(([value])=>value===profile.vboxVersion))profile.vboxVersion='unknown';
  const node=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el};
  const link=(value,url)=>{const el=node('a','',value);el.href=url;el.target='_blank';el.rel='noopener noreferrer';return el};
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(profile));return true}catch{return false}};
  const root=document.getElementById(ROOT);
  if(!root)return;

  function render(){
    root.replaceChildren();
    const header=node('section','hardware-heading');
    header.append(node('span','eyebrow','AMBIENTE IDENTIFICADO · PERFIL LOCAL'),node('h2','','Windows 11 Pro + VirtualBox: sua bancada IAM.'),node('p','muted','Ryzen 5 5600 · 6 núcleos / 12 threads · RTX 3070 · 1 TB NVMe · 16 GB DDR4 · Microsoft Entra gratuito. Sem metas de horas ou prazo: avance somente após conferir cada resultado.'));
    const facts=node('div','hardware-facts');
    [['Host','Windows 11 Pro'],['Virtualização','VirtualBox'],['CPU','Ryzen 5 5600'],['Memória física','16 GB'],['Disco instalado','1 TB NVMe'],['Tenant','Entra Free'],['Licenças pagas','Nenhuma'],['Orçamento','R$ 200/mês']].forEach(([label,value])=>{const item=node('div','hardware-fact');item.append(node('small','',label),node('strong','',value));facts.append(item)});
    header.append(facts);
    const inputs=node('div','hardware-inputs');
    const formTitle=node('h3','','Confirmações necessárias antes de criar as VMs');inputs.append(formTitle);
    const fields=node('div','hardware-fields');
    const makeSelect=(title,id,choices)=>{const field=node('label','hardware-field');field.append(node('span','',title));const select=document.createElement('select');select.id='hardware-'+id;for(const [value,label] of choices){const option=document.createElement('option');option.value=value;option.textContent=label;select.append(option)}select.value=profile[id]||'unknown';select.addEventListener('change',()=>{profile[id]=select.value;save();updateAdvice()});field.append(select);fields.append(field)};
    const confirmedOS=node('div','hardware-field');
    confirmedOS.append(node('span','','Sistema operacional confirmado'),node('strong','hardware-confirmed-os','Windows 11 Pro'));
    fields.append(confirmedOS);
    makeSelect('Versão do VirtualBox','vboxVersion',versionChoices);
    makeSelect('AMD-V/SVM habilitada no firmware','virtualization',virtChoices);
    const disk=node('label','hardware-field');disk.append(node('span','','Espaço livre do NVMe (GB)'));const input=document.createElement('input');input.type='number';input.min='0';input.max='1000';input.step='1';input.id='hardware-freeGb';input.placeholder='Ex.: 260 (ainda não informado)';input.value=profile.freeGb==null?'':String(profile.freeGb);input.addEventListener('change',()=>{const raw=input.value.trim();profile.freeGb=raw===''?null:Math.min(1000,Math.max(0,Number(raw)||0));save();updateAdvice()});disk.append(input);fields.append(disk);
    inputs.append(fields);
    const advice=node('div','hardware-advice');advice.id='hardware-advice';inputs.append(advice);
    root.append(header,inputs);
    const allocate=node('section','hardware-layout');
    allocate.append(node('span','eyebrow','CAPACIDADE E SEGURANÇA'),node('h3','','Várias tecnologias, mas não todas ligadas ao mesmo tempo.'));
    const grid=node('div','hardware-machines');
    [
      ['DC01','Windows Server (avaliação)','2 vCPU · 4 GB RAM · disco de 60 GB','4 GB de RAM para AD DS/DNS e agente Cloud Sync. Instalar o agente no DC é suportado em laboratório, mas separá-lo seria preferível em produção.'],
      ['CL01','Windows 11 Enterprise (avaliação)','2 vCPU · 4 GB RAM · disco de 80 GB','VirtualBox 7.x: preparar EFI, Secure Boot e TPM 2.0 virtual. Confirmar a avaliação vigente; ligar apenas em aulas de GPO, logon ou Intune.'],
      ['IDP01 + APP01','Keycloak + Node.js','Docker/Node no host · recursos sob demanda','Iniciar após encerrar VMs não envolvidas no exercício. Keycloak em modo de desenvolvimento somente em loopback.'],
      ['TENANT01','Microsoft Entra Free','Cloud · nenhum consumo de RAM local','O tenant já existe. Priorize usuários fictícios, grupos, roles e MFA com padrões de segurança; recursos P1/P2 ficam para janelas licenciadas.']
    ].forEach(([name,label,resources,detail])=>{const card=node('article','hardware-machine');card.append(node('span','eyebrow',name),node('h4','',label),node('strong','',resources),node('p','muted',detail));grid.append(card)});
    allocate.append(grid);
    const sequence=node('div','hardware-session');
    sequence.append(node('h4','','Modo de trabalho recomendado'),node('p','','Sessão AD: ligue DC01 (4 GB); para GPO/logon, ligue CL01 (4 GB) apenas durante o teste. Sessão OIDC/SCIM: desligue CL01 e, se possível, DC01 antes de iniciar Docker + Node. Sessão Entra Free: navegador do host. Sessão híbrida: DC01 + adaptador NAT para saída HTTPS, sem encaminhamento de portas e sem registrar o IP NAT no DNS do domínio.'));
    allocate.append(sequence);
    const evidence=node('p','hardware-reference');
    evidence.append(node('span','','Fontes e requisitos: '),link('Rede host-only da Oracle','https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/networkingdetails.html'),node('span','',' · '),link('Configuração de VMs','https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/working-with-vms.html'),node('span','',' · '),link('Windows Server','https://learn.microsoft.com/pt-br/windows-server/get-started/hardware-requirements'),node('span','',' · '),link('Windows 11','https://learn.microsoft.com/pt-br/windows/whats-new/windows-11-requirements'),node('span','',' · '),link('Windows 11 Enterprise Evaluation','https://www.microsoft.com/pt-br/evalcenter/evaluate-windows-11-enterprise'),node('span','',' · '),link('Cloud Sync (agente no DC suportado)','https://learn.microsoft.com/pt-br/entra/identity/hybrid/cloud-sync/how-to-prerequisites'));
    allocate.append(evidence);
    const walkthrough=node('section','vbox-walkthrough');
    walkthrough.append(node('span','eyebrow','TUTORIAL OPERACIONAL · VIRTUALBOX'),node('h3','','Criação e validação de DC01 e CL01, sem expor o domínio.'));
    const instructions=[
      ['01 · Confirme o computador','No Windows 11 abra Gerenciador de Tarefas → Desempenho → CPU e confira “Virtualização: Habilitada”. No PowerShell rode: Get-CimInstance Win32_Processor | Select Name,VirtualizationFirmwareEnabled. Confira também a versão do VirtualBox e o espaço livre.','Não desative Proteção de Memória/Hyper-V por padrão. Se o VirtualBox estiver lento, diagnostique primeiro a coexistência com o hipervisor do Windows.'],
      ['02 · Configure a rede privada','VirtualBox → Ferramentas → Rede (Network Manager) → Redes somente-anfitrião/Host-only → Criar. Exemplo, sem conflito com outra rede: 192.168.56.1/24 no adaptador do host e DHCP do VirtualBox desativado.','Rede privada não possui saída para internet por si só. Não utilizar adaptador bridge em controladores de domínio.'],
      ['03 · Crie DC01','Nova VM → Windows Server 2022/2025 Evaluation com interface gráfica → 2 CPUs, 4096 MB e disco VDI dinâmico de 60 GB. Rede: Adaptador 1 host-only, adaptador 2 desativado inicialmente.','Em DC01 defina IP 192.168.56.10/24, DNS 192.168.56.10 (após instalar DNS) e nenhum gateway nessa interface; instalar AD DS/DNS e criar aurora.test nas aulas.'],
      ['04 · Crie CL01','Nova VM → Windows 11 Enterprise Evaluation compatível → 2 CPUs, 4096 MB e disco VDI dinâmico de 80 GB. Antes de instalar, conferir EFI, Secure Boot e TPM 2.0 virtual. Rede: adaptador 1 na mesma host-only.','IP 192.168.56.20/24, DNS 192.168.56.10 e sem gateway na interface privada. Validar DNS SRV e ingresso no domínio, sempre com credenciais de teste.'],
      ['05 · Habilite saída somente quando precisar','Para atualização ou Cloud Sync, habilite temporariamente o Adaptador 2 de DC01 como NAT. Não configure port forwarding. Mantenha no AD apenas o IP do adaptador host-only, sem registrar o endereço do NAT no DNS interno.','Quando for necessário resolver nomes externos, configure encaminhadores no serviço DNS do DC01 e confira as rotas e resoluções. Remova/desligue o NAT quando não precisar.'],
      ['06 · Teste e registre','No DC01: ipconfig /all e Resolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.aurora.test. No CL01: ipconfig /all; nslookup aurora.test 192.168.56.10; depois confira associação ao domínio e execução de GPO.','Critérios: DC01 resolve seu domínio, CL01 usa DNS do DC01, usuário comum não recebe privilégios administrativos, e nenhum serviço AD está publicado na internet.']
    ];
    const list=node('ol','vbox-guide');
    for(const [title,how,expected] of instructions){
      const item=node('li','vbox-guide-step'),details=node('details','vbox-guide-details');
      details.append(node('summary','',title),node('p','',how),node('p','vbox-guide-expected','Verificar: '+expected));
      item.append(details);list.append(item);
    }
    walkthrough.append(list);
    const official=node('p','vbox-doc-link');
    official.append(link('Abrir guia completo do VirtualBox no repositório →','https://github.com/lpraxedess/Roadmap-Study/blob/main/docs/GUIA-VIRTUALBOX.md'));
    walkthrough.append(official);root.append(walkthrough);updateAdvice();
  }
  function updateAdvice(){
    const area=document.getElementById('hardware-advice');if(!area)return;area.replaceChildren();
    const msgs=[];
    // Edição confirmada pelo estudante: Windows 11 Pro.
    if(profile.os==='windows11home')msgs.push('No Windows 11 Home use VirtualBox; não presuma disponibilidade do papel Hyper-V completo. Isso não impede criar DC01 e CL01 no VirtualBox.');
    if(profile.vboxVersion==='unknown')msgs.push('VirtualBox já confirmado. Confira a versão pelo menu Ajuda → Sobre ou pelo VBoxManage --version. Recomendado: versão 7.x recente para Windows 11 convidado com TPM virtual.');
    if(profile.vboxVersion==='older')msgs.push('VirtualBox anterior à família 7.x: confirme disponibilidade de TPM 2.0 virtual e suporte a Windows 11; avalie atualizar antes de criar CL01.');
    if(profile.virtualization==='unknown')msgs.push('Verifique SVM/AMD-V habilitada no BIOS/UEFI e disponibilidade no sistema antes de criar as VMs.');
    if(profile.virtualization==='disabled')msgs.push('Habilite SVM/AMD-V no firmware antes da virtualização. Reinicie e valide no hipervisor.');
    if(profile.freeGb===null)msgs.push('O NVMe tem 1 TB de capacidade, mas falta informar quanto está livre. Planeje aproximadamente 200 GB livres para VMs, ISOs e snapshots.');
    else if(profile.freeGb<180)msgs.push('Espaço livre abaixo de 180 GB. Não crie as duas VMs; libere espaço antes e evite snapshots extensos.');
    else msgs.push('Espaço livre informado suficiente para a proposta inicial, desde que snapshots e ISOs sejam controlados.');
    msgs.push('Com 16 GB de RAM: DC01 4 GB + CL01 4 GB deixam cerca de 8 GB para o Windows host e outros processos. Se começar a paginar, desligue CL01.');
    for(const m of msgs)area.append(node('p','',m));
    const status=node('strong','hardware-advice-status',profile.vboxVersion==='unknown'||profile.virtualization!=='enabled'||profile.freeGb===null||profile.freeGb<180?'Pré-voo pendente: confirme ambiente antes de instalar.':'Pré-voo informado: confira licenças e requisitos do hipervisor antes de instalar.');
    area.prepend(status);
  }
  window.IAMHardware={
    exportState:()=>({version:1,...profile}),
    importState(raw){
      if(!raw||raw.version!==1||!osChoices.some(([id])=>id===raw.os)||!virtChoices.some(([id])=>id===raw.virtualization)||!(raw.freeGb===null||(Number.isFinite(raw.freeGb)&&raw.freeGb>=0&&raw.freeGb<=1000))||(raw.vboxVersion!==undefined&&!versionChoices.some(([id])=>id===raw.vboxVersion)))throw Error('Perfil de hardware inválido no backup.');
      profile={...defaults,os:'windows11pro',virtualization:raw.virtualization,freeGb:raw.freeGb,vboxVersion:raw.vboxVersion||'unknown',hypervisor:'virtualbox',ramGb:16,tenant:'free'};save();render();
    },
    reset(){profile={...defaults};save();render();},
    render
  };
  render();
})();