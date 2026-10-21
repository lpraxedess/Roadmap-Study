/* Atlas Corp enterprise extension — required runtime curriculum only. */
(()=>{
'use strict';
const c=window.IAMAtlasCurriculum;if(!c?.environment?.stages) return;
const theory=[
["SSPR e recuperação segura","Redefinição autônoma, fatores de verificação, antifraude e proteção contra enumeração.","Configure Forgot Password e SMTP de teste no Keycloak; teste expiração e recuperação.","https://www.keycloak.org/docs/latest/server_admin/#_forgot_password",1],
["AD DS, Kerberos e políticas GPO","Domínio, DNS, OUs, contas de computador, SPN, tickets Kerberos e políticas de grupo.","Monte domínio Samba AD de testes, associe estação autorizada e valide gpresult e Kerberos.","https://wiki.samba.org/index.php/Setting_up_Samba_as_an_Active_Directory_Domain_Controller",0],
["Identidades de computadores e dispositivos","Diferencie usuários, estações, service accounts, device join e postura do equipamento.","Crie inventário de máquinas, uma estação de domínio e um dispositivo Entra de teste.","https://learn.microsoft.com/en-us/entra/identity/devices/overview",0],
["Licenciamento Entra ID e Intune","Separe escopo de P2, P1, recursos de governança adicionais e licenciamento por usuário/dispositivo.","Modele um piloto de 1 usuário P2 + 1 usuário Intune Plan 1 sem aplicar políticas premium aos demais.","https://learn.microsoft.com/en-us/entra/fundamentals/licensing",3],
["Acesso Condicional e conformidade","Crie decisões por usuário, aplicativo, risco e conformidade do dispositivo.","Implemente política report-only e depois controle para um piloto devidamente licenciado.","https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview",4],
["Microsoft Entra Identity Protection","Risco de login e usuário, detecções, remediação e limites do P2.","Revise relatórios de risco e planeje política para usuário P2, sem simular riscos artificiais como detecções reais.","https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection",4],
["PIM com Entra ID P2","Funções elegíveis, ativação JIT, duração, MFA e licenciamento de aprovadores.","Configure elegibilidade de função para o único usuário P2; teste ativação e expiração sem aprovações não licenciadas.","https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-getting-started",4],
["Intune Plan 1 e endpoint management","Inscrição, perfis de configuração, conformidade, criptografia, aplicativos e políticas.","Registre um dispositivo Windows autorizado com o usuário Intune, configure compliance e avalie acesso condicionado.","https://learn.microsoft.com/en-us/intune/device-enrollment/windows/guide",4],
["SCIM 2.0 implementado","Recursos Users/Groups, filtros, schemas, PATCH, paginação, idempotência e reconciliação.","Teste GET, POST, PATCH e desprovisionamento contra servidor SCIM de demonstração autorizado.","https://www.rfc-editor.org/rfc/rfc7644",2],
["SAML com aplicação SP","Metadata, certificado de assinatura, ACS, Entity ID, atributos e validação de assertions.","Integre um segundo aplicativo de laboratório como service provider SAML no Keycloak.","https://www.keycloak.org/docs/latest/server_admin/#_saml",2],
["IGA open source com midPoint","Fonte autoritativa, conectores, correlação, reconciliação, roles, aprovação e recertificação.","Suba midPoint seguindo seu Compose oficial e configure identidade-fonte CSV e recurso alvo isolado.","https://docs.evolveum.com/book/practical-identity-management-with-midpoint.html",3],
["Cofres e segredos com OpenBao","KV, políticas ACL, tokens temporários, auditoria e rotação de credenciais de serviços.","Execute OpenBao em modo de desenvolvimento local, crie política mínima e teste segredo negado.","https://openbao.org/docs/",4],
["Bastion e sessão privilegiada","Controle de acesso a SSH/RDP, auditoria, aprovação e gravação conforme solução.","Configure bastion de teste ou auditoria SSH e diferencie-a de uma plataforma PAM completa.","https://guacamole.apache.org/doc/gug/",4],
["B2B e identidades externas","Convites, convidados, duração, trust settings, acesso mínimo e saída de terceiros.","Crie fluxograma de acesso de convidado e teste apenas o que estiver coberto por seu licenciamento.","https://learn.microsoft.com/en-us/entra/external-id/external-identities-overview",3],
["Sincronização híbrida e limites","Entenda Cloud Sync/Connect Sync, UPN, immutable IDs, PHS e writeback.","Avalie pré-requisitos oficiais de AD DS Windows Server; não assuma Samba como suporte para Cloud Sync.","https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/how-to-prerequisites",5],
["Identidades de workload e API","Service principals, credenciais federadas, certificados, expiração e escopos de aplicação.","Crie conta de aplicação de teste, conceda mínimo privilégio e documente rotação sem segredo em código.","https://learn.microsoft.com/en-us/entra/identity-platform/workload-identities-overview",5],
["SIEM, alertas e resposta IAM","Eventos, correlação, anomalias, controles compensatórios e trilha para auditoria.","Envie logs de teste para centralizador ou Wazuh opcional e comprove triagem e recuperação.","https://documentation.wazuh.com/current/",4],
["Identity proofing e confiança digital","Identificação, cadastro, autenticação e federação segundo NIST 800-63; ameaças de impersonação.","Defina política de verificação de identidade e recuperação de contas humanas e técnicas fictícias.","https://pages.nist.gov/800-63-4/",1]
];
c.extraTopics=theory.map((x,i)=>({id:'t'+(28+i),title:x[0],desc:x[1],practice:x[2],url:x[3],level:x[4]}));
for(let i=0;i<theory.length;i++){
 const x=theory[i],n=28+i;
 c.lessons['t'+n]={prerequisites:'Conceitos prévios do nível '+(x[4]+1)+' e ambiente Atlas Corp iniciado.',steps:[
  'Estude '+x[0]+': '+x[1],
  'Modele cenário realista de identidade, atores, política e fluxos com dados fictícios.',
  x[2],
  'Execute ao menos um teste permitido e um teste negado; registre limites de licença e integração.'
 ],verification:'Explique decisões, demonstre o teste e registre as evidências sem credenciais ou dados reais.',deliverable:'Diagrama, configuração de laboratório e checklist validado para '+x[0]+'.',estimated:'60–120 min'};
}
const stages=[
];
const env=c.environment;
env.stages[8].title='Marco de validação do IAM local';
env.stages[8].subtitle='Checagem do núcleo antes das integrações';
env.stages.push(...stages);
env.catalog={
 company:'Atlas Corp',domain:'atlas.test',realm:'atlas-corp',
 people:[{name:'Ana Costa',role:'RH',group:'rh'},{name:'Bruno Lima',role:'Financeiro',group:'financeiro'},{name:'Clara Nunes',role:'TI',group:'ti'},{name:'Diego Reis',role:'Gestor',group:'gestores'},{name:'Eva Rocha',role:'Terceiro',group:'terceiros'},{name:'Felipe Luz',role:'Analista',group:'operacoes'}],
 nodes:[{id:'hr',label:'RH · fonte'},{id:'directory',label:'AD / LDAP'},{id:'idp',label:'Keycloak · IdP'},{id:'apps',label:'Aplicações'},{id:'iga',label:'midPoint · IGA'},{id:'pam',label:'OpenBao · PAM'},{id:'cloud',label:'Entra ID P2'},{id:'endpoint',label:'Intune Plan 1'}],
 reference:'https://www.keycloak.org/docs/latest/server_admin/'
};
})();
