/* Curso IAM: laboratório local e cloud, reutiliza integralmente os 94 procedimentos AtlasCorp.
   Material de aprendizagem; nenhuma ação é executada contra tenant ou máquinas. */
const COURSE_LAB_KEY='roadmap-iam-course-labs-v1';
const COURSE_TRACKS=[
 {id:'onprem',title:'Laboratório Presencial · On-premises',subtitle:'Datacenter AtlasCorp em VirtualBox',summary:'Construa diretório, autenticação, autorização, aplicações e auditoria localmente. Prossiga de forma sequencial, com até duas VMs ativas.',requirements:'Windows 11 host · Ryzen 5 5600 · 16 GB RAM · VirtualBox · 1 TB (espaço livre verificado)',licensing:'Windows Server Evaluation conforme termos da Microsoft; Ubuntu e Keycloak livres. Sem necessidade de licença Entra P2.',objectives:['AD DS, DNS, contas, OU, grupos, GPO, Kerberos e LDAP','Linux, Keycloak, aplicações OIDC/SAML e autorização por role','JML, segregação de funções, privilégios Linux, investigação e recuperação']},
 {id:'cloud',title:'Laboratório Cloud',subtitle:'Tenant AtlasCorp · Microsoft Entra e integrações',summary:'Evolua a AtlasCorp: identidades, MFA, Conditional Access, PIM, dispositivos, SSO, SCIM, IGA, workloads e arquitetura.',requirements:'Tenant gratuito próprio; licenças P2 + Intune Plan 1 opcionais e limitadas ao piloto; trials condicionais.',licensing:'Orçamento total AtlasCorp: no máximo R$ 200/mês, incluindo impostos, licenças e Azure. Compare EMS E5 (reúne Entra ID P2 e Intune) com compras avulsas; preços públicos e prazos devem ser confirmados antes de contratar. O crédito gratuito de US$ 200 do Azure já foi usado. O gasto planejado com consumo Azure é R$ 0/mês; Azure RBAC, Key Vault e Managed Identities para recursos Azure são extensão avançada opcional, nunca pré-requisito da trilha IAM/IGA/PAM. Trate os laboratórios Azure como opcionais sem contratação; caso aprovados, faça orçamento específico, alertas e limpeza (alertas não bloqueiam cobrança). Nunca comprar, renovar ou ativar serviços pagos sem validação prévia. Governance, Purview, Global Secure Access e Azure podem exigir extras.',objectives:['Microsoft Entra ID, administração, segurança, MFA, PIM e Intune','Apps, Graph, SCIM, JML, IGA, workloads e identidade híbrida','Auditoria, resposta a incidentes e arquitetura Zero Trust']}
];
function localStage(id,title,goal,tools,steps,allow,deny,rollback,source){
 return {id,title,goal,tools,steps,allow,deny,rollback,source};
}
const ONPREM_STAGES=[
 localStage('op01','Planejamento, topologia e isolamento',
 'Produzir uma rede corporativa fictícia isolada e uma linha de base reversível.',
 'VirtualBox, Windows 11 host, planilha de inventário',
 [
 'Crie IAM-LAB/{evidencias,scripts,diagramas,exportacoes,incidentes} no computador host; anote o hardware, o sistema operacional e o espaço livre.',
 'Verifique no Gerenciador de Tarefas se a virtualização está habilitada; confirme disponibilidade de pelo menos 150 GB para discos dinâmicos, ISOs e snapshots.',
 'Baixe VirtualBox da Oracle, Windows Server Evaluation da Microsoft e Ubuntu Server LTS dos sites oficiais. Registre versões e termos de avaliação.',
 'No VirtualBox configure rede NAT para atualizações e uma rede Host-only exclusiva para comunicação das VMs. Não abra portas de serviços de diretório para a Internet.',
 'Desenhe AtlasCorp: RH, Financeiro, TI, Segurança, Comercial, gestores, aplicações e duas identidades administrativas segregadas.',
 'Defina plano de IP e DNS interno (ex.: 192.168.56.0/24), papel de cada VM, credenciais sob guarda segura e política de snapshots.',
 'Crie um registro de aceite com ator, objetivo, configuração, resultado esperado, observado, data em UTC, evidência e rollback.'
 ],'Arquivos de inventário, diagrama e rede Host-only existem.','Nenhum serviço de LDAP, Kerberos ou RDP deve ficar publicado na Internet.','Reverta rede e arquivos temporários sem alterar o host pessoal.','https://www.virtualbox.org/manual/'),
 localStage('op02','Windows Server: instalação e baseline',
 'Provisionar o primeiro servidor da AtlasCorp antes de instalar um domínio.',
 'VirtualBox, Windows Server Evaluation, PowerShell',
 [
 'Crie VM IAM-DC com 5 GB de RAM, 2 vCPU e VDI dinâmico de 100 GB; use NAT + Host-only sem bridge.',
 'Instale Windows Server Evaluation, defina senha administrativa forte e registre build, versão e prazo da avaliação.',
 'Renomeie o computador IAM-DC; configure IP privado fixo no adaptador Host-only conforme o plano de rede.',
 'Execute Get-NetIPConfiguration e ipconfig /all em PowerShell administrativo; confira interface e endereço do laboratório.',
 'Instale atualizações, confirme relógio e fuso do servidor; configure firewall sem habilitar acesso de fora da rede de laboratório.',
 'Crie snapshot BASE-DC-ANTES-AD e registre como restaurá-lo. Não inclua senhas nas evidências.'
 ],'Servidor inicia, tem IP Host-only conhecido e acesso de administração local.','Cliente fora da rede privada não deve alcançar serviços de administração.','Desligue IAM-DC e restaure snapshot BASE-DC-ANTES-AD se a configuração falhar.','https://learn.microsoft.com/en-us/windows-server/get-started/get-started-with-windows-server'),
 localStage('op03','Active Directory Domain Services e DNS',
 'Criar o domínio corporativo de laboratório e validar resolução interna.',
 'Windows Server, AD DS, DNS, PowerShell',
 [
 'No Server Manager selecione Add roles and features, escolha IAM-DC e instale AD DS e DNS Server.',
 'Promova o servidor a controlador de domínio para uma nova floresta fictícia (ex.: atlas.lab); não use domínio público que você não controla.',
 'Defina parâmetros e senha DSRM com armazenamento seguro; revise o assistente antes de aplicar e reiniciar.',
 'Após reiniciar, confirme o domínio e a zona DNS no DNS Manager; verifique os registros SRV do domínio.',
 'Em PowerShell administrativo execute Get-ADDomain, Get-ADForest e Get-DnsServerZone; registre somente dados fictícios.',
 'Execute nslookup -type=SRV _ldap._tcp.dc._msdcs.atlas.lab e confirme resolução do controlador de domínio.',
 'Crie snapshot DC-DOMINIO-OK, registre saúde dos serviços de diretório e procedimento de recuperação.'
 ],'Domínio e resolução SRV estão funcionais e documentados.','Nome incorreto de domínio ou DNS externo isolado não deve ser tratado como êxito de autenticação.','Restaurar snapshot anterior à promoção é procedimento apenas de laboratório; não o aplique em controladores de produção.','https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/'),
 localStage('op04','Empresa, OUs e ciclo de vida de contas',
 'Representar departamentos, responsáveis e estados de identidade no diretório.',
 'Active Directory Users and Computers, PowerShell AD',
 [
 'Crie OUs AtlasCorp/RH, Financeiro, TI, Seguranca, Comercial, Servicos e Computadores; mantenha privilegiados separados.',
 'Crie contas fictícias de empregados (ex.: ana.rh, carlos.rh, pedro.fin, juliana.fin, joao.ti), sempre com proprietário e departamento.',
 'Documente identificador imutável, UPN, gestor, departamento e o sistema que autorizou o cadastro; não reutilize a mesma conta para pessoas diferentes.',
 'Como teste Joiner, crie um empregado temporário e atribua somente os grupos previstos pela matriz de acesso.',
 'Como teste Mover, altere o departamento do colaborador e identifique quais acessos antigos precisam ser removidos manualmente.',
 'Como teste Leaver, desabilite a conta fictícia, retire grupos sensíveis e valide negação de novo login.',
 'Crie uma matriz identidade | departamento | gestor | direito | aprovação | expiração | estado e reconcilie com o AD.'
 ],'Usuário de teste correto recebe apenas direitos aprovados.','Conta desabilitada ou sem grupo adequado não deve receber novo acesso.','Reative somente contas fictícias necessárias e reverta memberships registradas.','https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/'),
 localStage('op05','Grupos, delegação administrativa e SoD',
 'Provar privilégio mínimo e evitar conflito entre solicitação e aprovação financeira.',
 'AD Users and Computers, ADAC, PowerShell',
 [
 'Defina grupos globais por função e grupos locais de domínio por recurso; documente como aplica AGDLP neste domínio.',
 'Crie SG-RH-LEITURA, SG-FIN-LEITURA e SG-FIN-APROVACAO; associe apenas pessoas explicitamente autorizadas.',
 'Crie um recurso de teste em compartilhamento NTFS na VM servidor e configure permissão de leitura restrita a um grupo.',
 'Em duas identidades fictícias, confirme que o integrante consegue ler e quem está fora recebe Access denied.',
 'Implemente em matriz SoD a regra solicitante de pagamento diferente do aprovador; rejeite concessão conflituosa no fluxo documentado.',
 'Delegue a uma conta de suporte permissão limitada sobre OU de teste, sem adicioná-la a Domain Admins.',
 'Remova a delegação temporária e teste novamente a mesma operação para comprovar revogação.'
 ],'Membro autorizado consegue consultar recurso de teste e operador modifica somente seu escopo.','Não membro não acessa o recurso; suporte não executa operação de Domain Admin.','Restaure ACL, grupos e delegações conforme baseline, sem excluir grupos utilizados pelos próximos capítulos.','https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/'),
 localStage('op06','Estação Windows, domínio e GPO',
 'Comprovar relação entre identidade de usuário, computador e política efetiva.',
 'Windows 11 Pro/Enterprise VM, GPO, gpresult',
 [
 'Desligue a VM Linux se existir; ligue apenas IAM-DC (5 GB) e WIN11-LAB (4 GB), preservando RAM para o host.',
 'No Windows 11 Pro/Enterprise de laboratório configure DNS primário para IAM-DC no adaptador Host-only; valide resolução do domínio.',
 'Ingresse WIN11-LAB no domínio fictício usando conta autorizada; reinicie e verifique o objeto de computador na OU prevista.',
 'No Group Policy Management, crie GPO-LAB-BLOQUEIO-TELA e vincule-a à OU de testes, não à floresta inteira.',
 'Aplique configuração reversível de bloqueio de tela ou aviso legal, executando gpupdate /force no cliente.',
 'Execute gpresult /r e gpresult /h C:\\IAM-LAB\\gpresult.html no cliente; registre GPO efetivamente aplicada e escopo.',
 'Mova o computador para OU fora do escopo e confirme resultado após atualização das políticas.'
 ],'Cliente ingressado no domínio e GPO aparece em gpresult com configuração observável.','Computador fora do escopo não recebe a política de teste.','Desvincule GPO ou reverta snapshot do cliente; não exclua GPOs padrão de domínio.','https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview'),
 localStage('op07','Kerberos, LDAP e diagnóstico de autenticação',
 'Distinguir emissão de tickets, consulta ao diretório e decisão de autorização.',
 'klist, Event Viewer, ldp.exe, PowerShell',
 [
 'Faça login de domínio na WIN11-LAB e confirme sincronização de tempo e resolução DNS com o controlador.',
 'Execute whoami /all e klist; identifique usuário, grupos e tickets sem publicar credenciais ou conteúdo sensível.',
 'Acesse recurso de arquivos permitido e confira se há ticket de serviço apropriado usando klist.',
 'No Event Viewer do servidor filtre eventos relevantes de logon e de falha em período controlado; registre horário UTC e conta fictícia.',
 'Inspecione objeto LDAP de laboratório com ldp.exe ou Get-ADUser; diferencie DN, atributo e identificador permanente.',
 'Teste uma tentativa de autenticação inválida de forma controlada, sem repetição automática; documente mensagem e registro.',
 'Compare falha de DNS, relógio, senha e ACL; indique em qual camada cada uma ocorre.'
 ],'Ticket e evento de autenticação correspondem ao principal testado.','Credencial incorreta não deve produzir autenticação bem-sucedida.','Encerre sessão do usuário de teste, restaure configuração DNS e evite alterações duradouras no KDC.','https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview'),
 localStage('op08','Linux e Keycloak como provedor de identidade',
 'Implantar IdP local sem expor serviços na Internet.',
 'Ubuntu Server LTS, Docker/Podman, Keycloak',
 [
 'Desligue a WIN11-LAB quando não for necessária e ative IAM-LNX (4 GB) com IAM-DC quando testar integração local.',
 'Instale Ubuntu Server LTS, atualize pacotes e confirme hostnamectl, ip -br a e free -h.',
 'Instale Docker ou Podman conforme documentação oficial; mantenha serviço do host e administração sem exposição externa.',
 'Inicie o Keycloak em modo de desenvolvimento apenas na interface Host-only do laboratório, com credenciais fictícias fortes; não o publique publicamente.',
 'Abra o console administrativo a partir do host autorizado e crie o realm atlascorp-lab.',
 'Crie dois usuários fictícios, roles rh-leitor e fin-leitor e clientes separados; configure URLs de redirecionamento exatas.',
 'Gere evento de login bem-sucedido e falho; ative e consulte logs do realm sem gravar tokens ou senhas em repositório.'
 ],'Realm, usuários e eventos de autenticação podem ser observados localmente.','Usuário inválido não autentica; Keycloak não é acessível da Internet.','Desative containers, revogue credenciais de teste e restaure snapshot BASE-LINUX-OK.','https://www.keycloak.org/getting-started/getting-started-docker'),
 localStage('op09','OIDC, SAML e segurança da autorização',
 'Conectar aplicações de teste e validar a diferença entre login e direitos de negócio.',
 'Keycloak, cliente OIDC/SAML de laboratório, navegador',
 [
 'Defina aplicação fictícia Portal-RH e serviço Financeiro com operação read e approve; não use dados reais.',
 'No Keycloak crie cliente OIDC com redirect URI exata; use Authorization Code com PKCE para cliente público.',
 'No aplicativo de laboratório faça login e valide issuer, audience, expiração, state e nonce conforme o papel do token.',
 'Configure cliente de laboratório SAML e verifique certificado, issuer, audience e prazo da assertion no service provider.',
 'Associe rh-leitor somente ao usuário de RH e exija autorização na aplicação/backend, não apenas no menu da página.',
 'Acesse recurso permitido; depois tente recurso financeiro como usuário RH e registre negação HTTP.',
 'Revogue a role, renove a sessão e observe diferença entre autorização nova e cache de sessão existente.'
 ],'OIDC e SAML autenticam clientes configurados e autorização é comprovada no backend.','Assertion inválida, audience incompatível e usuário sem role não devem autorizar operação.','Remova clientes de teste, roles temporárias e credenciais de laboratório; preserve somente cenário estável.','https://www.keycloak.org/docs/latest/server_admin/'),
 localStage('op10','SCIM e ciclo de vida com reconciliação',
 'Automatizar provisão e retirada de acesso e distinguir SCIM de SSO.',
 'API SCIM 2.0 didática, curl, Python',
 [
 'Crie uma API SCIM local de treinamento seguindo RFC 7643/7644; isole-a na rede Host-only, com autenticação de teste.',
 'Implemente GET /Users com filtro e paginação; registre atributos id, userName, active e externalId.',
 'Implemente POST /Users para criar uma identidade fictícia com externalId estável e rejeitar duplicidade indevida.',
 'Implemente PATCH /Users/{id} para alterar atributo ou definir active=false após desligamento.',
 'Repita operação de provisionamento e demonstre comportamento idempotente sem criar usuário duplicado.',
 'Compare fonte de RH fictícia, diretório e aplicativo; gere relatório de contas órfãs e conflitos.',
 'Execute teste negativo sem credencial apropriada e confirme resposta de erro; documente recuperação de falha.'
 ],'Usuário provisionado existe, alterações e desativação são observáveis e reconciliadas.','Requisição não autenticada e dados inválidos são rejeitados.','Remova somente dados sintéticos, mantenha logs saneados e restaure baseline da API.','https://www.rfc-editor.org/rfc/rfc7644'),
 localStage('op11','Privilégios, auditoria e incidente IAM',
 'Praticar elevação controlada, mínimo privilégio, contenção e rastreabilidade.',
 'Windows Event Viewer, Linux sudo/journalctl, inventário',
 [
 'Defina contas administrativas separadas das identidades de uso diário e documente responsáveis e escopo.',
 'No Linux crie uma conta técnica de teste sem privilégios; com sudoers.d delegue somente comando necessário e reversível.',
 'Teste comando permitido e comando administrativo não delegado; registre diferença sem vazar credenciais.',
 'No Windows inventarie membros de grupos privilegiados e avalie se toda concessão tem owner, necessidade e prazo.',
 'Provoque incidente controlado: colaborador movido ainda possui grupo de RH; registre condição anterior e hipótese.',
 'Remova associação residual, force nova autenticação na aplicação e confirme que o acesso antigo foi negado.',
 'Correlacione logs Linux, AD e aplicativo com ator, objeto, horário UTC, ação, resultado e recuperação.',
 'Documente causa-raiz, impacto, decisão, medidas preventivas e risco residual.'
 ],'Acesso privilegiado é controlado e incidente tem evidência de contenção.','Usuário sem delegação não executa comando restrito; acesso residual é negado após correção.','Remova delegação sudo temporária e restaure associações aprovadas.','https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/'),
 localStage('op12','Projeto final On-premises e recuperação',
 'Reexecutar sem roteiro cinco provas técnicas e defender a arquitetura local.',
 'Documentação, diagramas, snapshots, checklist',
 [
 'Entregue diagrama da topologia, zonas de confiança, DNS, AD DS, grupos, Keycloak, aplicações e pontos de auditoria.',
 'Prove criação de identidade, atribuição mínima, retirada de acesso, reautenticação e log correspondente.',
 'Prove aplicação de GPO no cliente, negação fora de escopo, klist e diagnóstico básico de autenticação.',
 'Prove SSO de aplicativo de laboratório e autorização negativa por role; identifique limitações de testes locais.',
 'Prove SCIM e reconciliação sem duplicidade; explique por que provisionamento não é autenticação.',
 'Entregue matriz de acesso e SoD, relatório de incidente, runbook de recuperação e índice de evidências.',
 'Verifique snapshots, desligamento das VMs não usadas e ausência de segredos ou serviços expostos; registre lições aprendidas.'
 ],'Cinco provas independentes reproduzidas com evidência real ou claramente rotulada simulação.','Nenhuma integração não executada pode ser relatada como concluída.','Desligue ambientes, mantenha cópias seguras e valide plano de restauração; nunca faça rollback indiscriminado em produção.','https://csrc.nist.gov/pubs/sp/800/207/final')
];
const CLOUD_CHAPTER_ORDER=['lab-00','lab-01','lab-02','lab-03','lab-04','lab-05','lab-06','lab-07','lab-08','lab-09','lab-10','lab-11','lab-12','lab-13','lab-14','lab-15'];
const CLOUD_PREREQUISITES={
 'lab-00':'Tenant gratuito próprio e inventário de licenças. Duas contas de emergência testadas antes de políticas restritivas.',
 'lab-01':'Identidades, matrizes de negócio e grupos de base criados.',
 'lab-02':'P2 para conta piloto, método MFA registrado e contas de emergência verificadas. CA começa em Report-only.',
 'lab-03':'Aplicativo de teste com autorização efetiva para permitir/negar.',
 'lab-04':'Aplicativo de teste e entendimento de OAuth/OIDC, SAML, redirect URI e validação de tokens.',
 'lab-05':'Conta externa fictícia sob seu controle. Conferir regras de External ID e acesso entre tenants.',
 'lab-06':'Usuário licenciado para Intune Plan 1, Windows 11 Pro/Enterprise VM e escopo MDM limitado.',
 'lab-07':'Capítulo OPCIONAL sobre autorização a recursos Azure: somente executar com assinatura Azure ativa e gasto explicitamente autorizado; o curso de IAM segue sem ele. P2 não concede crédito Azure; se não houver assinatura, analisar um caso de RBAC com recursos fictícios sem marcar execução real.',
 'lab-08':'API SCIM de laboratório funcional; não declarar provisionamento Entra se não houve fluxo de ponta a ponta.',
 'lab-09':'Conferir direitos de Entra Governance e cobertura de todos os usuários participantes antes de políticas premium.',
 'lab-10':'PIM exige identidade beneficiária licenciada; aprovação exige aprovador coberto conforme cenário.',
 'lab-11':'Recursos Purview dependem de Microsoft 365/Purview; caso contrário usar alternativa local rotulada.',
 'lab-12':'Logs reais disponíveis, período/retencão e tabelas KQL necessárias; exportações podem gerar custos.',
 'lab-13':'AD DS local testado. Cloud Sync/writeback condicionados aos pré-requisitos oficiais.',
 'lab-14':'Workloads fictícias com escopo mínimo, sem segredos expostos e sem custos inesperados.',
 'lab-15':'Todos os testes têm evidências e lacunas categorizadas como real, simulado ou teórico.'
};
const COURSE_LOCAL_THEORY={
 op01:0,op02:0,op03:2,op04:1,op05:4,op06:2,op07:3,op08:8,op09:7,op10:11,op11:13,op12:15
};