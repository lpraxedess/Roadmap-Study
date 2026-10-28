'use strict';
const ARCHITECTURE={
 version:'2026.10.28.2',company:'Aurora Serviços Digitais',
 purpose:'Empresa fictícia de 6 colaboradores, com Financeiro, Jurídico, TI e RH. Você constrói cada componente nas aulas; nenhuma instalação vem pronta.',
 rules:[
  ['Origem do vínculo','O RH registra E001–E006. employeeId é imutável; departamento, gestor e status mudam.'],
  ['Diretório corporativo','AD DS em DC01 mantém contas e grupos locais. Somente Colaboradores e Grupos entram no escopo piloto de Cloud Sync.'],
  ['Identidade cloud','Entra recebe o piloto do AD. Contas administrativas e de emergência permanecem cloud-only e fora da sincronização.'],
  ['Bancada de protocolos','Keycloak é um IdP de laboratório separado. Você cadastra o mesmo piloto manualmente e registra a correlação; ele não sincroniza automaticamente com AD/Entra.'],
  ['Aplicação-alvo','APP01 valida login OIDC e autoriza no servidor. Seu cadastro é atualizado por requisições SCIM que você executa nas aulas.'],
  ['Responsabilidades','Login não cria conta no destino. Sincronizar um diretório não encerra todas as sessões. Cada fronteira tem seu próprio teste.']
 ],
 identities:[
  ['E001','Ana Lima','fin.ana','Financeiro','E003 · Bruno','GG-FIN-LEITURA','FIN-LEITOR','Piloto de admissão → transferência → desligamento'],
  ['E002','Carla Souza','jur.carla','Jurídico','E004 · Diego','GG-JUR-LEITURA','JUR-LEITOR','Controle: permanece no Jurídico durante todos os eventos'],
  ['E003','Bruno Costa','fin.bruno','Financeiro','E006 · Marina','GG-FIN-APROVACAO','Sem acesso à APP01 por padrão','Aprovador e estudo de SoD'],
  ['E004','Diego Alves','jur.diego','Jurídico','E006 · Marina','GG-JUR-GESTAO','Sem acesso à APP01 por padrão','Revisor dos acessos do Jurídico'],
  ['E005','Paulo Silva','ti.operador','TI','E006 · Marina','GG-TI-SUPORTE','TI-OPERADOR','Conta cotidiana; sem Domain Admins/Global Administrator'],
  ['E006','Marina Rocha','rh.marina','RH','Responsável do laboratório','GG-RH-OPERACAO','Sem acesso à APP01 por padrão','Origem dos eventos e aprovação de vínculo']
 ],
 privileged:[
  ['A001','adm.ad','Domínio AURORA','Criar e administrar somente o domínio fictício; nunca conta cotidiana.'],
  ['A002','adm.tenant','Entra cloud-only','Administração do tenant de estudo; funções conforme cada lição.'],
  ['A003','admin','Keycloak · master','Administrar o servidor/realm; não é usuário da aplicação.'],
  ['A004','pim.piloto','Entra cloud-only','Elegibilidade Reports Reader por 1 dia; ativação de 30 minutos no exercício PIM.'],
  ['BG01/BG02','emergencia01 / emergencia02','Entra cloud-only','Independentes de AD e federação; métodos resistentes a phishing e custódia nas lições de emergência.'],
  ['S001','svc-inventario','Aplicação Graph','Leitura mínima, dono E005, revisão e revogação documentadas.'],
  ['S002','svc-scim','APP01','Bearer SCIM exclusivo de laboratório, dono E005; nunca token de usuário.'],
  ['G001','ext.consultoria','Entra B2B','Opcional: apenas email de teste controlado; sem privilégio administrativo.']
 ],
 assets:[
  ['HOST01','Seu computador','Host-only 192.168.56.1 (exemplo a reservar)','Navegador, PowerShell, Node.js 22+ e Docker. Os serviços locais usam loopback.'],
  ['DC01','Windows Server 2022/2025','192.168.56.10/24 · DNS 192.168.56.10','AD DS + DNS do domínio aurora.test; gateway só se houver roteador configurado.'],
  ['CL01','Windows 11 Pro/Enterprise','192.168.56.20/24 · DNS 192.168.56.10','Cliente do domínio AURORA; conta comum usada nos testes.'],
  ['IDP01','Keycloak 26.8.1 · container no host','http://localhost:8080','Realm aurora; volume aurora-keycloak; modo dev somente em loopback.'],
  ['APP01','Node.js · processo no host','http://localhost:8765','Portal, callback /callback, APIs /api/financeiro e /api/juridico; cadastro.json e eventos.jsonl.'],
  ['TENANT01','Microsoft Entra de laboratório','SEU-TENANT.onmicrosoft.com','Único valor público variável do projeto. O tenant precisa existir e ter acesso autorizado; não é fornecido pelo portal.']
 ],
 ports:[
  ['CL01 → DC01','DNS','TCP/UDP 53','Consulta de nomes e registros SRV; validar resolução e não só porta.'],
  ['CL01 → DC01','Kerberos / troca de senha','TCP/UDP 88 e 464','Autenticação do domínio e operações de senha conforme cenário.'],
  ['CL01 → DC01','LDAP / descoberta','TCP/UDP 389','LDAP e descoberta AD no segmento isolado; não publicar na internet.'],
  ['CL01 → DC01','SMB / políticas','TCP 445','SYSVOL, NETLOGON e recursos usados pelo domínio.'],
  ['CL01 → DC01','RPC','TCP 135 + portas RPC dinâmicas 49152–65535','Usadas em operações Windows conforme função/versão; limitar ao segmento do laboratório, não abrir para fora.'],
  ['CL01 → DC01','Horário','UDP 123','Relógios coerentes para Kerberos e evidências.'],
  ['Ferramentas AD → DC01','AD Web Services','TCP 9389','Cmdlets AD por ADWS; não confundir com LDAP puro.'],
  ['HOST01 → IDP01','HTTP de bancada','TCP 8080 em 127.0.0.1','Somente loopback; modo dev não é configuração de produção.'],
  ['HOST01 → APP01','HTTP/API/SCIM','TCP 8765 em 127.0.0.1','Navegador e chamadas PowerShell locais; sem acesso direto do Entra cloud.'],
  ['Agente / navegador → serviços cloud','HTTPS','TCP 443 de saída','Verificar endpoints oficiais do recurso; não criar regra de entrada pública para o DC.'],
  ['Bastion → CL01, se PAM for executado','RDP','TCP 3389 restrito ao alvo e origem de teste','Extensão posterior; não habilitar acesso da internet ao cliente.']
 ],
 config:[
  ['Domínio DNS / NetBIOS','aurora.test / AURORA','DC01 e CL01'],
  ['OU raiz','OU=AURORA,DC=aurora,DC=test','Domínio isolado'],
  ['OUs de pessoas','Financeiro, Juridico, TI e RH dentro de OU=Colaboradores,OU=AURORA','Nomes de OU sem acentos; atributos Department podem ter acento'],
  ['Outras OUs','Grupos, Computadores, Servicos, Privilegiadas sob OU=AURORA','CL01 vai em Computadores; contas administrativas não ficam em Colaboradores'],
  ['Escopo Cloud Sync','OUs Colaboradores e Grupos sob AURORA','Não incluir Privilegiadas, Servicos nem o domínio inteiro'],
  ['UPN do piloto','fin.ana@SEU-TENANT.onmicrosoft.com e jur.carla@SEU-TENANT.onmicrosoft.com','Adicionar sufixo ao AD antes da sincronização; não criar duplicata cloud do piloto'],
  ['Realm / issuer OIDC','aurora / http://localhost:8080/realms/aurora','Independente do tenant Entra'],
  ['Cliente OIDC','aurora-web · público · Standard flow ON · Direct access grants OFF','PKCE S256; sem client secret neste cliente público'],
  ['Callback / origem','http://localhost:8765/callback / http://localhost:8765','URI exata, sem wildcard'],
  ['Audience da API','aurora-api','Mapper Audience no cliente; incluída em access token, não usada como audience do ID token'],
  ['Contrato SCIM','http://localhost:8765/scim/v2/Users','Subconjunto didático: GET com filtro, POST e PATCH replace. Entra cloud não alcança esse localhost.'],
  ['Autorização APP01','active=true + department correspondente + papel FIN-LEITOR ou JUR-LEITOR','A aplicação consulta o cadastro atual a cada acesso'],
  ['Segredos','Senhas escolhidas por você; scimToken aleatório em config.json','Não há senha fixa, chave privada ou token para copiar do portal']
 ],
 flows:[
  {id:'build',label:'Construção do ambiente',steps:['01 · Registrar o desenho e os dados do RH','02 · Preparar rede, DC01 e CL01','03 · Configurar o tenant e sincronizar o piloto','04 · Instalar IDP01 e construir APP01 nas aulas','05 · Aplicar movimentos e validar controles'],detail:'Esta linha mostra a ordem de construção. As outras visões mostram o tráfego e deixam explícito onde a ação é manual.'},
  {id:'login',label:'Autenticação e acesso',steps:['CL01 autentica no AD para recursos Windows','Navegador pede /login à APP01','Keycloak autentica e devolve authorization code','APP01 troca code com PKCE e valida tokens','API consulta active, departamento e papel; registra 200/401/403'],detail:'Login Windows usa AD/Kerberos. Login do portal usa Keycloak/OIDC. São dois fluxos diferentes; não há confiança automática entre eles.'},
  {id:'lifecycle',label:'Ciclo de vida · JML',steps:['RH aprova J001, M001 ou L001 para E001','Você altera a conta e os grupos no AD','Cloud Sync propaga ao Entra; você confere o log','Você reflete o evento no Keycloak e envia PATCH SCIM à APP01','Você retesta sessão existente, novo login e acesso efetivo'],detail:'Primeiro a orquestração é manual e observável. O conteúdo ensina cada chamada; não existe um script prévio que faça a integração sem você configurar.'},
  {id:'incident',label:'Auditoria e recuperação',steps:['Sintoma: 401, 403 ou atraso de sincronização','Conferir origem, conta, grupo e horário','Conferir IdP, assinatura, issuer e audience','Comparar cadastro, regra e eventos da APP01','Reverter alteração piloto e repetir teste positivo e negativo'],detail:'Corrigir a causa não significa conceder administração ampla. Preserve evidências sanitizadas e restaure apenas o ambiente fictício.'}
 ],
 events:[
  ['J001','Admissão','E001 → Financeiro','Criar conta AD, adicionar GG-FIN-LEITURA; conferir sync; criar usuário Keycloak; POST SCIM com FIN-LEITOR.','FIN 200 · JUR 403 · sem login 401','iam-4-0'],
  ['M001','Transferência','E001: Financeiro → Jurídico','Manter employeeId/userName. Remover GG-FIN-LEITURA, alterar Department, adicionar GG-JUR-LEITURA; conferir sync; atualizar IdP; PATCH department e roles na APP01.','FIN 403 · JUR 200; E002 continua JUR 200','iam-4-0'],
  ['L001','Desligamento','E001: active → inactive','Desabilitar AD, remover grupos; conferir conta bloqueada no Entra e revogar sessões conforme suporte; desabilitar Keycloak; PATCH active=false.','Novo login bloqueado; sessão da APP01 não acessa FIN nem JUR','iam-4-0'],
  ['R001','Retorno ao estado inicial','Somente exercício de laboratório','Reativar os mesmos objetos mediante decisão fictícia; repor Financeiro/FIN-LEITOR e conferir os destinos. Não criar outro E001.','Repetir J001 sem conta duplicada','iam-9-0'],
  ['SOD01','Conflito de funções','E003 · Bruno','Detectar combinação GG-FIN-SOLICITACAO + GG-FIN-APROVACAO. Revisor decide e remove o acesso incompatível; registrar exceção com prazo se aplicável.','A combinação conflitante deixa de existir; não declarar bloqueio de um sistema financeiro não instalado','iam-4-2'],
  ['SEC01','Rotação SCIM','S002 · svc-scim','Criar nextScimToken, testar chamada com a próxima credencial, atualizar consumidor e substituir scimToken; retirar nextScimToken.','Nova credencial funciona; antiga retorna 401','iam-6-3']
 ],
 stages:[
  {id:'plan',label:'01 · Empresa e rede',theme:'Identidade, arquitetura, DNS e TLS',assets:'RH · HOST01 · rede 192.168.56.0/24',lessons:['prep-route','prep-windows','iam-0-2'],result:'Plano de nomes, papéis e IPs registrado; VMs isoladas.'},
  {id:'directory',label:'02 · Diretório e grupos',theme:'AD DS, LDAP, RBAC, Kerberos, GPO e gMSA',assets:'DC01 · CL01 · aurora.test',lessons:['iam-1-0','iam-0-1','iam-0-3','iam-1-1','iam-1-2','iam-1-3'],result:'E001/E002 criados; CL01 no domínio; acesso FIN/JUR validado.'},
  {id:'cloud',label:'03 · Identidade cloud',theme:'Entra, Cloud Sync, MFA, SSPR e acesso condicional',assets:'TENANT01 · contas cloud-only · piloto AD',lessons:['iam-2-0','iam-0-0','iam-2-1','iam-2-2','iam-2-3','iam-2-4'],result:'Contas sem duplicação, recuperação e matriz de políticas documentadas.'},
  {id:'protocols',label:'04 · IdP e aplicações',theme:'SAML, OAuth, OIDC, consentimento e SCIM',assets:'IDP01 · aurora-web · APP01 · aurora-api',lessons:['prep-local','iam-3-1','iam-3-2','iam-3-0','iam-3-3'],result:'Aplicação construída à mão; login, token, autorização e provisionamento separados.'},
  {id:'governance',label:'05 · Governança e privilégios',theme:'JML, pacotes, revisão, SoD, PIM e PAM',assets:'E001/E002 · revisores E003/E004 · alvo CL01',lessons:['iam-4-0','iam-4-1','iam-4-2','iam-4-3','iam-5-0','iam-5-1','iam-5-2'],result:'J001/M001/L001 rastreáveis, sem privilégios permanentes indevidos.'},
  {id:'workload',label:'06 · Serviços e dispositivos',theme:'Workload identity, Graph, segredos e Intune',assets:'S001 · S002 · CL01',lessons:['iam-6-0','iam-6-1','iam-6-2','iam-6-3','iam-7-0','iam-7-1','iam-7-2'],result:'Consumidores identificados, credencial rotacionada e postura do dispositivo verificada onde licenciada.'},
  {id:'operations',label:'07 · Operação e entrega',theme:'Logs, incidentes, Zero Trust, recuperação e portfólio',assets:'Eventos AD/Entra/Keycloak/APP01',lessons:['iam-8-0','iam-8-1','iam-8-2','iam-8-3','iam-9-0','iam-9-1','iam-9-2'],result:'Ciclo ponta a ponta e recuperação demonstrados, com limitações identificadas.'}
 ]
};
