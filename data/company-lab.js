/* ROADMAP - IAM · Laboratório corporativo contínuo.
 * Tenant fictício AtlasCorp. Controle de execução salvo localmente.
 * Data-base 2026-10-17: confirmações de interface/licença sempre na fonte Microsoft.
 */
const COMPANY={
 name:'AtlasCorp',tenant:'tenant EXCLUSIVO de laboratório',
 roles:['RH solicita e confirma vínculo','Gestor aprova direitos','TI provisiona e remove','IAM desenha e revisa políticas','SecOps investiga eventos','Owner do recurso confirma acesso'],
 accounts:['ana.rh@<dominio-lab> — analista de RH','bruno.fin@<dominio-lab> — financeiro','camila.ti@<dominio-lab> — TI','renata.admin@<dominio-lab> — administração separada','convidado.parceiro@<dominio-externo> — parceiro'],
 groups:['SG-ATL-RH-BASE','SG-ATL-FIN-BASE','SG-ATL-TI-BASE','SG-ATL-LAB-CA-PILOT','SG-ATL-FIN-APP-READ','SG-ATL-FIN-APP-APPROVE','SG-ATL-PIM-ADMINS'],
 rules:['Cada identidade tem um owner, justificativa, escopo e encerramento definido.','Grupos de função expressam direitos de negócio; grupos piloto expressam escopo de política.','A autenticação comprova identidade; a autorização é aplicada pelo aplicativo ou recurso.','P2 permite Conditional Access e proteção baseada em risco, mas NÃO inclui automaticamente Intune, Purview, Azure ou todos os recursos avançados de Governance.','Para políticas de CA, comece com Report-only e mantenha contas emergenciais verificadas fora do escopo de bloqueio.','Nunca use dados reais, segredos de produção nem desabilite controles de um tenant corporativo.'],
 resources:[
 {label:'Verificar licenças Entra / Governance',url:'https://learn.microsoft.com/en-us/entra/fundamentals/licensing'},
 {label:'Conditional Access — políticas e boas práticas',url:'https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview'},
 {label:'MFA com Conditional Access (Microsoft Learn)',url:'https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-mfa-strength'},
 {label:'Report-only e interpretação de logs',url:'https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only'}
 ]
};
function enterpriseTask(title,path,action,reason,proof,issue){
 return {title,path,action,reason,proof,issue};
}
const COMPANY_CHAPTERS={
 'lab-00':{
 track:'01 · Implantação da empresa',incident:'AtlasCorp inicia sua operação e precisa separar acesso administrativo de identidade dos funcionários.',
 why:'Antes de qualquer política de acesso, a organização precisa definir fonte de identidade, papéis de trabalho e conta emergencial. Isso evita permissões improvisadas e bloqueio total do tenant.',
 result:'Tenant de testes inventariado; grupos com propósito explícito; usuários sintéticos e controle de privilégio.',
 prerequisites:['Tenant próprio de laboratório com autorização administrativa.','Entra ID P2 para exercício de risco; Microsoft 365/Azure são adicionais conforme o serviço.'],
 decisions:['RH é fonte de dados de contratação; IAM define regras; gestor valida direitos.','UPN é identificador de login; guarde ID persistente para correlacionar identidade.','Mantenha duas contas emergenciais adequadamente protegidas, documentadas e monitoradas, excluídas de políticas experimentais.'],
 tasks:[
 enterpriseTask('Inventariar licenças','entra.microsoft.com → Entra ID → Billing → Licenses (navegação pode variar)','Abra o tenant correto, confira P2 nos produtos licenciados e registre quais recursos dependem de planos adicionais. Não atribua P2 a usuários inexistentes.', 'Se um recurso não está habilitado, o laboratório precisa oferecer alternativa, nunca tratar ausência como falha de IAM.','Registro sanitizado: SKU, usuário de teste, restrições e orçamento.','Se o menu não aparecer, confira papel de leitura de licenças e diretório selecionado.'),
 enterpriseTask('Estabelecer identidades-piloto','Entra ID → Users → All users → New user','Crie camila.ti e ana.rh como usuários de laboratório; configure senha inicial forte e política de troca conforme fluxo suportado. Use nomes e dados fictícios.','Uma pessoa recebe conta individual, que deve poder ser correlacionada ao RH.','Dois usuários visíveis, com object IDs mascarados no inventário.','Erro: falta permissão de User Administrator ou domínio incorreto.'),
 enterpriseTask('Organizar grupos de negócio','Entra ID → Groups → All groups → New group','Crie SG-ATL-RH-BASE, SG-ATL-FIN-BASE e SG-ATL-TI-BASE como grupos de segurança e configure owner para cada um.','O acesso deriva da função, evitando concessões individuais difíceis de revisar.','Grupo, owner, finalidade, classificação e membros registrados.','Se grupo não fornece acesso, ele ainda precisa ser associado a app, role ou controle de recurso.'),
 enterpriseTask('Preservar recuperação administrativa','Entra ID → Roles and administrators / Emergency access guidance','Projete e valide contas de emergência segundo orientação oficial; evite depender apenas do mesmo mecanismo de MFA do piloto. Não remova a última conta administrativa testada.','Recuperação é controle de disponibilidade, não exceção irrestrita ao menor privilégio.','Runbook com onde estão os fatores, responsáveis, monitoramento e teste planejado.','Teste de acesso emergencial deve ser feito em processo controlado, sem derrubar sessões válidas.'),
 enterpriseTask('Definir separação de funções','Inventário AtlasCorp → RACI e grupos','Documente funções de RH, gestores, TI, IAM e SecOps. Crie matriz: empregado | área | gestor | grupo | app | justificativa | expiração.','A decisão de acesso deve ser rastreável ao dono do recurso e ao vínculo da pessoa.','Matriz AtlasCorp aprovada e grupos criados sem privilégios administrativos supérfluos.','Se não houver aprovação, mantenha usuário sem acesso específico à aplicação.')
 ],
 verify:['Teste que um usuário TI não pertence ao grupo de RH.','Confira que nenhuma conta teste recebeu Global Administrator.','Comprove capacidade de reversão antes do próximo capítulo.']
 },
 'lab-01':{
 track:'01 · Implantação da empresa',incident:'RH contrata Camila para TI, transfere Bruno de Financeiro para outra função e desliga um contratado.',
 why:'Identidade, privilégios e dados são estados diferentes. Um processo JML de verdade precisa tratar concessão, movimento e retirada de direitos com responsabilidade.',
 result:'Fluxo de admissão, alteração de cargo e desligamento registrado e reexecutável.',
 prerequisites:['Grupos do capítulo inicial existentes.','Registro fictício RH com employeeId persistente e gestor responsável.'],
 decisions:['Grupo funcional não deve ser a única defesa: aplicativo também verifica recursos e ações.','Troca de departamento remove concessões antigas, incluindo exceções e entitlements temporários.','Leaver envolve desabilitar login, retirar grupos, revisar sessões, apps, tokens e dispositivos conforme o sistema.'],
 tasks:[
 enterpriseTask('Autorizar a admissão','Registro RH → solicitação de acesso fictícia','Crie ticket RH-JOIN-001 com employeeId 1001, gestor, data de início, departamento TI e prazo. O gestor confirma acessos básicos; IAM valida SoD.','A conta não deve surgir sem dono e justificativa.','Ticket com solicitante, aprovador, escopo e decisão.','Se houver dado ausente, não invente atributo no diretório.'),
 enterpriseTask('Criar e associar identidade','Entra ID → Users → New user','Crie camila.ti com employeeId de teste, departamento e gestor fictício quando os atributos forem disponíveis. Atribua SG-ATL-TI-BASE.','Permissões são ligadas a dados e à função, não a concessões arbitrárias.','Usuário aparece no grupo esperado e não pertence a FIN-BASE.','Se for usuário híbrido, corrija na fonte autoritativa e aguarde sincronização.'),
 enterpriseTask('Demonstrar Mover','Entra ID → Users → Groups','Mude bruno.fin para a nova área no registro RH. Remova grupos antigos, peça validação do novo gestor e atribua grupo correto.','Acúmulo de acesso antigo é um dos riscos centrais de IAM.','Comparativo de grupos antes/depois e acesso negado ao recurso antigo.','Verifique acesso direto por app role além da membresia no grupo.'),
 enterpriseTask('Executar Leaver no ambiente teste','Entra ID → Users → Properties / Authentication methods / Audit logs','Aplique bloqueio de login ao usuário de desligamento fictício, revise sessões e remova permissões, grupos e atribuições a apps.','Leaver é processo com sequência e cobertura, não apenas exclusão de objeto.','Registro de alterações, tentativas negadas de login e owner de cada acesso removido.','Tokens existentes e sessões podem ter janela de validade; valide comportamento do aplicativo.'),
 enterpriseTask('Buscar contas órfãs','Planilhas RH e Entra → cruzamento por ID','Compare identidades ativas com lista de empregados de teste. Encontre conta sem fonte RH e crie ticket de investigação.','Reconciliação detecta desvio entre o esperado e o realmente configurado.','Tabela com contas correspondidas, órfãs e ação.','Não exclua contas desconhecidas antes de confirmar finalidade e proprietário.')
 ],
 verify:['Joiner recebe exatamente seus direitos aprovados.','Mover perde o direito anterior antes de ganhar incompatibilidades.','Leaver não consegue nova autenticação e há evidência de desprovisionamento.']
 },
 'lab-02':{
 track:'02 · Autenticação e políticas P2',incident:'AtlasCorp precisa exigir MFA de funcionários e proteção maior para administradores sem bloquear toda a empresa.',
 why:'Conditional Access usa sinais e condições para permitir, impor método ou bloquear acesso. Uma licença Entra P2 traz recursos P1 e Identity Protection, mas não configura automaticamente políticas.',
 result:'Política MFA com grupo piloto, autenticação resistente a phishing para papéis sensíveis e testes com Sign-in logs.',
 prerequisites:['Entra ID P2 licenciado para usuários abrangidos; tenant de laboratório e conta Conditional Access Administrator.','Grupos SG-ATL-LAB-CA-PILOT e contas emergenciais previamente verificadas.','Método MFA registrado no usuário piloto e aplicativo de teste com login.'],
 decisions:['MFA é requisito mínimo de piloto; preferir authentication strength resistente a phishing em contas críticas, quando suportada.','Evite políticas "All users/All resources" enquanto testa. Amplie depois de ler relatório de impacto.','Não force fatores que o usuário não consegue registrar ou recuperar.','Não confunda MFA de usuário com políticas de workloads; contas não interativas usam controles próprios.'],
 tasks:[
 enterpriseTask('Preparar um escopo reversível','Entra ID → Groups → All groups','Crie SG-ATL-LAB-CA-PILOT se ainda não existir. Inclua somente camila.ti de laboratório e registre contas de emergência que não deverão entrar no piloto.','Dá para comparar resultado e corrigir política sem bloqueio de todos os usuários.','Membros esperados e a justificativa da exclusão de emergência.','Se o grupo contém administradores, use conta de teste sem privilégio.'),
 enterpriseTask('Definir métodos disponíveis','Entra ID → Protection → Authentication methods → Policies','Inspecione políticas de métodos. Habilite Microsoft Authenticator/FIDO2 para grupo de teste quando necessário e permitido. Não desabilite métodos de toda a organização.','Authentication methods define o que o usuário pode registrar; CA define o que precisa usar em um contexto.','Usuário piloto visualiza e registra método permitido.','Ausência de método pode ser grupo errado, licenciamento ou registro incompleto.'),
 enterpriseTask('Concluir registro da conta-piloto','https://mysignins.microsoft.com/security-info','Como camila.ti, registre autenticação disponível em sessão controlada. Para teste de phishing-resistance, use passkey FIDO2 autenticada e suportada pelo navegador/dispositivo.','MFA forte precisa ser registrado antes da política de acesso ficar obrigatória.','Método visível em Security info, sem compartilhar detalhes pessoais.','Se FIDO2 não é suportado, escolha MFA compatível e documente diferença de garantia.'),
 enterpriseTask('Construir política de MFA','Entra ID → Conditional Access → Policies → New policy','Nomeie CA-ATL-001-PILOT-MFA. Em Users or workload identities, Include → Select users and groups → SG-ATL-LAB-CA-PILOT. Em Target resources, escolha a aplicação de teste ou conjunto controlado. Em Grant, marque Grant access → Require authentication strength → Multifactor authentication (ou controle equivalente na UI atual).','A política vincula contexto de usuário/recurso a um controle, distinto do método permitido.','Captura redigida dos campos Include, Target resources e Grant.','Se target app não aparecer, confirme enterprise application e sessão suportada.'),
 enterpriseTask('Manter a política em Report-only','Conditional Access → CA-ATL-001-PILOT-MFA → Enable policy','Escolha Report-only antes de criar. Não selecione On imediatamente. Abra What If quando disponível e simule escopo com usuário e recurso.','Avalia o impacto sem aplicar bloqueio à autenticação.','Resultado de What If e propriedade Report-only.','What If não substitui análise do sign-in real; simulações não cobrem todos os sinais.'),
 enterpriseTask('Gerar dois logins de comparação','Navegador privado → app de teste','Como camila.ti, faça login e anote horário UTC, aplicativo, correlation ID e a aba Conditional Access. Depois teste um usuário fictício fora do grupo.','Verifica escopo e evita que regras atinjam pessoas não pretendidas.','Duas entradas comparáveis em Sign-in logs, com report-only aplicado apenas ao piloto.','Se não aparece log, espere ingestão e confira filtro/usuário/aplicativo.'),
 enterpriseTask('Interpretar o relatório','Entra ID → Monitoring & health → Sign-in logs','Abra entrada, consulte Conditional Access e Authentication Details. Diferencie Report-only: success/failure/not applied de sucesso efetivo do login.','Uma avaliação negativa em Report-only não significa que o acesso tenha sido realmente bloqueado.','Tabela usuário | política | requisito projetado | resultado real.','Se política foi "Not applied", revise group, target resource e conditions.'),
 enterpriseTask('Ativar para o grupo piloto','Conditional Access → CA-ATL-001-PILOT-MFA','Somente se o registro de métodos, recuperação emergencial e testes report-only estiverem corretos, altere Enable policy para On. Use apenas o escopo piloto.','Habilitar após evidência reduz risco de lockout.','Captura da política habilitada e login com segundo fator no usuário piloto.','Caso crítico: use conta de emergência para desabilitar a política piloto.'),
 enterpriseTask('Testar aceitação e negação','Aplicação piloto e Sign-in logs','Teste método que satisfaz a authentication strength; depois tente método ausente/inferior conforme o cenário seguro, sem forçar lockout da conta. Compare o resultado real e os detalhes de autenticação.','Mostra que Grant controla exigência de método, não membership de application role.','Uma sessão atendendo o controle; outra com challenge/negação ou simulação registrada.','Se já existe sessão autenticada, novo desafio pode não surgir; documente sessões anteriores.'),
 enterpriseTask('Criar proteção para administradores','Conditional Access → Policies → New policy','Projete CA-ATL-002-ADMIN-PHISHING-RESISTANT para role administrativa de teste: selecione Directory roles suportadas ou grupo administrativo específico; Grant → Require authentication strength → Phishing-resistant MFA; mantenha Report-only. Exclua contas de emergência sob controles independentes.','Administração de identidades exige garantia de autenticação maior que o uso rotineiro.','Matriz de administradores cobertos, exceções e métodos resistentes disponíveis.','CA por Directory roles não se estende automaticamente a funções customizadas ou escopo de Administrative Units.'),
 enterpriseTask('Encerrar e auditar a mudança','Entra ID → Conditional Access e Audit logs','Registre change ticket, aprovador, versão da política, data de ativação e rollback. Se estava praticando com política real, retorne a Report-only ou desabilite a política ao encerrar.','Segurança requer processo auditável e reversível.','Registro de mudança com hora, autor e evidência de retorno.','Falta de aprovação ou escopo confuso impede promoção além do piloto.')
 ],
 verify:['Política em Report-only com resultado de logs explicado corretamente.','Política habilitada exclusivamente no grupo de teste com MFA acionado.','Conta fora do grupo não foi afetada; recuperação de emergência validada.','Diferença entre MFA e phishing-resistant authentication strength documentada.'],
 docs:['https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-mfa-strength','https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only']
 },
 'lab-03':{
 track:'02 · Autenticação e políticas P2',incident:'O Financeiro precisa ler relatórios, mas somente um aprovador pode alterar registros de pagamento.',
 why:'Grupos podem atribuir roles, mas uma aplicação deve validar permissão e propriedade de cada recurso.',
 result:'Aplicação teste diferencia usuários, roles de negócio e autorização real na API.',
 prerequisites:['Grupo Financeiro e aprovação de responsável pela aplicação.','API ou aplicação fictícia com recurso e logs de autorização.'],
 decisions:['SG-ATL-FIN-APP-READ permite leitura de relatório de seu departamento.','SG-ATL-FIN-APP-APPROVE deve exigir owner e SoD antes de conceder direito.','Entra directory role e Azure RBAC não substituem a autorização em nível de objeto da API.'],
 tasks:[
 enterpriseTask('Mapear ações e atores','Matriz negócio → ação → recurso','Crie duas operações GET e PATCH e três perfis: Camila (TI), Bruno (Financeiro), Renata (Aprovadora). Marque ações permitidas e negadas.','As decisões precisam existir antes de serem codificadas.','Tabela de verdade com operações e escopos.','Não confunda "pode autenticar" com "pode modificar relatório".'),
 enterpriseTask('Definir grupos de negócio','Entra ID → Groups','Crie SG-ATL-FIN-APP-READ e SG-ATL-FIN-APP-APPROVE, com owner e critério para aprovação. Associe Bruno ao READ.','Atribuir entitlement via grupo facilita revisão e desligamento.','Inventário de membros e owners.','A app precisa mapear explicitamente grupo ou app role a ações.'),
 enterpriseTask('Atribuir acesso à aplicação','Entra ID → Enterprise applications → Users and groups','Em enterprise application de teste com app roles expostas, vincule grupo READ à role de leitura; se app não oferece roles, implemente mapeamento no backend de teste.','Acessar a aplicação e autorizar uma ação específica são decisões distintas.','Entitlement de app e usuário autorizado.','Alguns tipos de app e licenças limitam group-based assignment; confirme suporte.'),
 enterpriseTask('Provar casos permitidos/negados','API local → GET/PATCH /reports/{id}','Faça GET permitido com Bruno e PATCH proibido. Com usuário de TI, tente ler relatório restrito. Respostas 200/403 são exemplos; siga a semântica da API de teste.','A verificação tem que ocorrer no servidor e por objeto.','Saída de cada teste, recurso e ator mascarados.','Se ocultar botão gera 403 apenas na UI, corrija verificação no backend.'),
 enterpriseTask('Revogar acesso','Entra ID → Groups / app roles','Remova Bruno do grupo de leitura ou da app role e verifique a nova sessão, considerando validade de tokens emitidos.','O ciclo de vida precisa resultar em mudança efetiva.','Teste de acesso após revogação e observação de sessão.','Se ainda acessa, avalie cache, token anterior e concessões diretas adicionais.')
 ],
 verify:['Três identidades com decisões coerentes para GET/PATCH.','Mínimo privilégio e escopo por departamento testados.','Revogação efetiva registrada.']
 },
 'lab-04':{
 track:'02 · Autenticação e políticas P2',incident:'AtlasCorp conecta seu portal financeiro a um provedor centralizado de identidade.',
 why:'SSO evita novos bancos de senhas nas aplicações e cria dependências de confiança que precisam ser verificadas.',
 result:'Fluxo OIDC com PKCE e validação separada de identidade e autorização.',
 prerequisites:['App sandbox e IdP de teste.','Redirect URI exata, issuer e audience esperados.'],
 decisions:['Preferir Authorization Code + PKCE para clientes públicos.','A API usa access token destinado a ela, não ID token.','A app valida assinatura, expiração, emissor, público e proteção de CSRF conforme o fluxo.'],
 tasks:[
 enterpriseTask('Registrar app','Entra ID → App registrations → New registration','Registre aplicação Financeiro-LAB, defina Supported account types adequados ao laboratório e redirect URI específica (localhost HTTPS quando aplicável).','Relação cliente-IdP requer identificação e destinos cadastrados.','Application/client ID mascarado e redirect registrado.','Redirect URI diferente do callback quebra o fluxo.'),
 enterpriseTask('Configurar protocolo','App cliente de teste → OIDC','Use Authorization Code e PKCE; gere verifier/challenge e state. Verifique parâmetros no redirect ao IdP.','Protege a troca de code e a associação da resposta à requisição.','Fluxo de autorização documentado sem códigos nem tokens reais.','Ausência de PKCE em cliente público é falha de projeto.'),
 enterpriseTask('Conferir tokens','Aplicação → validação OIDC/OAuth','Inspecione somente cabeçalhos/claims não sensíveis. Identifique ID token para o cliente e access token para API, e valide seus destinatários.','Token aceito para destinatário errado pode permitir uso indevido.','Matriz ID token versus access token com audience e finalidade.','JWT não é obrigatório como formato de access token.'),
 enterpriseTask('Testar falhas','App local → callbacks e API','Tente redirect não registrado e, em teste controlado, token com audience incorreto ou expiração; a app/API deve negar.','Falhas de confiança devem ser observáveis e corrigíveis.','Testes negativo e positivo com causa diagnosticada.','Se token inválido é aceito, pare e corrija validação do serviço.'),
 enterpriseTask('Vincular grupo a aplicação','Entra ID → Enterprise applications → Users and groups','Associe grupo de usuário autorizado à aplicação com atribuição conforme suporte do tipo de app.','SSO não deve conceder acesso sem aprovação de negócio.','Usuário atribuído e não atribuído tratados de forma distinta.','Confirme políticas e edição de Enterprise Application usadas no tenant.')
 ],
 verify:['Login federado e permissões em API testadas separadamente.','Redirect não cadastrado rejeitado.','Diferenças OIDC/OAuth e responsabilidade da aplicação registradas.']
 },
 'lab-05':{
 track:'03 · Operação e dispositivos',incident:'Consultor externo presta serviço temporário ao Financeiro e não deve manter acesso após o projeto.',
 why:'Acesso externo precisa de sponsor, escopo, expiração, revisão e controle de confiança entre tenants.',
 result:'Processo B2B fictício com aprovação de parceiro e revogação rastreável.',
 prerequisites:['Parceiro ou tenant secundário controlado, ou simulação.','Aplicação e grupo de teste com owner.'],
 decisions:['Guest B2B não é automaticamente empregado.','Patrocinador responde pela necessidade de acesso.'],
 tasks:[
 enterpriseTask('Autorizar parceria','Ticket fornecedor → segurança e Financeiro','Registre empresa parceira, responsável interno, recurso específico e data de expiração.','Todo convidado precisa de proprietário de acesso.','Aprovação do sponsor e prazo de 30 dias.','Sem sponsor não conceda acesso.'),
 enterpriseTask('Restringir colaboração','Entra ID → External Identities → Cross-tenant access settings','Revise colaboração inbound/outbound. Em tenant de teste, modele relação com o parceiro antes do convite.','A confiança deve abranger somente organizações e aplicações necessárias.','Mapa de confiança e condições de convidado.','External ID e B2B direct connect não são iguais.'),
 enterpriseTask('Convidar e atribuir','Entra ID → Users → New user → Invite external user','Envie convite para identidade de parceiro de teste, associe somente grupo do recurso aprovado.','Assegura menor privilégio com rastreabilidade de sponsor.','Guest visível, convite aceito e recurso permitido.','Se resgate falha, confira restrictions e política de colaboração.'),
 enterpriseTask('Testar escopo e expiração','Aplicativo Financeiro → conta externa','Verifique recurso permitido e tentativa negada em recurso restrito; execute remoção de associação e prove perda de acesso.','Convidado não deve receber direitos implícitos amplos.','Dois testes + evidência de remoção.','Sessões anteriores podem persistir por tempo limitado.')
 ],
 verify:['Convite com sponsor e prazo.','Acesso autorizado e acesso excessivo negado.','Entitlement revogado ao término.']
 },
 'lab-06':{
 track:'03 · Operação e dispositivos',incident:'AtlasCorp autoriza documentos sensíveis somente de dispositivos sob gestão e conformidade verificável.',
 why:'A identidade do dispositivo gera sinal independente do usuário. Intune calcula conformidade e Entra CA faz decisão de acesso.',
 result:'Política piloto de acesso a app sensível exigindo dispositivo marcado como conforme.',
 prerequisites:['Intune licenciado e dispositivo exclusivamente de teste.','Entra P2 para o CA da conta piloto; enrollment MDM elegível.'],
 decisions:['P2 sozinho não fornece licença Intune.','Registered, joined e hybrid joined são estados diferentes.','Um dispositivo noncompliant não deve bloquear todos os colaboradores sem piloto.'],
 tasks:[
 enterpriseTask('Validar gestão de dispositivos','intune.microsoft.com → Devices → All devices','Confirme licença Intune, plataforma suportada e escopo de MDM. Inscreva somente dispositivo descartável de teste, sem remover controles de equipamento de uso real.','Conformidade depende de inscrição e política suportada.','Device ID de teste e estado de gerenciamento.','Se o dispositivo não aparece, cheque enrollment restrictions e atribuição de licença.'),
 enterpriseTask('Criar política compliance','Intune → Devices → Compliance → Policies → Create','Selecione plataforma de teste, configure requisito seguro (ex.: PIN/bloqueio de tela suportado) e atribua somente grupo piloto.','Postura é calculada por parâmetros verificáveis, não por opinião do operador.','Política e avaliação compliant/noncompliant no Intune.','Aguarde sincronização; falha de avaliação não equivale a usuário sem login.'),
 enterpriseTask('Conectar sinal ao CA','Entra → Protection → Conditional Access → Policies → New','Crie CA-ATL-003-DEVICE-COMPLIANT. Escopo: grupo de teste + recurso definido; Grant: Require device to be marked as compliant; Report-only inicialmente.','O Entra utiliza sinal Intune como requisito, não inventa conformidade por si.','Policy report-only e avaliação de dispositivo nos sign-ins.','Se o controle não aparecer, confira licença e plataforma suportada.'),
 enterpriseTask('Gerar casos realistas','Dispositivo de teste + sign-in logs','Teste compliant e um estado de noncompliance reversível, correlacionando usuário/dispositivo/hora/política. Se tudo estiver validado, habilite temporariamente só grupo piloto.','Compara decisão de acesso e postura real.','Log de ambos estados com condições aplicadas.','Sem device ID no sign-in, confira join/registro e navegador cliente.'),
 enterpriseTask('Reverter o ambiente','Intune e Entra → políticas piloto','Volte CA para Report-only/Off, restaure compliance e remova enrollment descartável somente após registrar evidência.','Rollback previne impactos de acesso e dados.','Plano completo de estado final.','Nunca use wipe em dispositivo pessoal.')
 ],
 verify:['Licenças Entra e Intune diferenciadas.','Política CA report-only com compliance avaliada.','Condição revertida e dispositivo de teste protegido.']
 },
 'lab-07':{
 track:'03 · Operação e dispositivos',incident:'Serviço financeiro consulta dados no Azure sem manter password ou client secret no código.',
 why:'Identidade de workload reduz credencial estática, enquanto Azure RBAC delimita as operações da workload.',
 result:'Managed identity com Reader em escopo mínimo, teste de leitura e escrita negada.',
 prerequisites:['Assinatura Azure autorizada, orçamento e resource group descartável.','Service e recurso suportados para managed identity.'],
 decisions:['Crie os recursos somente se houver assinatura própria e controle de custos.','Managed identity autentica workload; Azure RBAC determina ações.'],
 tasks:[
 enterpriseTask('Definir orçamento','Azure portal → Cost Management + Billing → Budgets','Registre orçamento e categoria de custos; se indisponível, mantenha atividade como simulação.','Laboratório de IAM cloud pode gerar despesa involuntária.','Orçamento e previsão/alerta registrados.','Sem controle de custo não crie recursos reais.'),
 enterpriseTask('Criar escopo mínimo','Azure portal → Resource groups → Create','Crie RG-IAM-ATL-LAB na região adequada; configure tags owner, purpose e cleanup.','Escopo identifica limite de recursos temporários.','Resource group identificado e plano de descarte.','Erro de criação pode ser falta de RBAC ou restrição Policy.'),
 enterpriseTask('Configurar managed identity','Azure recurso suportado → Identity','Ative System-assigned ou crie User-assigned, justificando decisão e registando principal ID mascarado.','Elimina necessidade de distribuir segredo persistente em scripts.','Principal distinto do usuário humano.','Ativar identidade não concede automaticamente acesso ao recurso.'),
 enterpriseTask('Conceder Reader','Recurso Azure de destino → Access Control (IAM) → Add role assignment','Atribua papel apropriado para leitura somente à identidade no próprio recurso ou resource group isolado.','Role e scope governam a autorização cloud.','Teste leitura permitida e escrita negada.','Reader amplo demais para segredo: use role data-plane apropriada por serviço.'),
 enterpriseTask('Revogar e limpar','Resource group → Role assignments / Delete','Exclua role e recursos após registrar Activity Log e teste de negação.','Cloud IAM precisa de ciclo de vida e auditoria.','Concessão/revogação documentadas e custo encerrado.','Propagação de RBAC pode exigir tempo; não crie privilégios extras para acelerar.')
 ],
 verify:['Workload sem senha no código.','Acesso positivo e negativo.','Resource group e custos de teste encerrados.']
 },
 'lab-08':{
 track:'04 · Governança e automação',incident:'AtlasCorp decide sincronizar o ciclo de vida dos funcionários com aplicação SaaS usando SCIM.',
 why:'Provisionamento confiável precisa correlacionar identities, interpretar PATCH e lidar com erros sem duplicar contas.',
 result:'Fluxo Users SCIM com criação, Mover, disable e retry idempotente.',
 prerequisites:['Servidor SCIM/Mock isolado com RFC 7643/7644.','Payload com externalId e userName fictícios.'],
 decisions:['Um usuário provisionado não está automaticamente autorizado.','Atributo de matching deve ser persistente e único.'],
 tasks:[
 enterpriseTask('Definir contrato','Documente mapeamento HR → Entra → /Users','Escolha sourceId, externalId, userName, active, department e campos obrigatórios.','Previne alteração de identificador ao mudar nome/departamento.','Contrato com exemplos de entrada e saída.','Não use dados reais em payload.'),
 enterpriseTask('Criar usuário SCIM','API mock → POST /Users','Envie JSON sintético e confira Location, status e ID retornado.','Valida a transformação de dados e correlação.','200/201 esperado conforme implementação e RFC/contrato.','Se o ID não é retornado, corrija endpoint/mock.'),
 enterpriseTask('Mover sem duplicar','API mock → PATCH /Users/{id}','Altere departamento, preserve externalId, teste GET e idempotência.','Mover é atualização da mesma entidade, não um Joiner duplicado.','ID persistido, atributos atualizados.','Se cria outro recurso, revise regra de matching.'),
 enterpriseTask('Desativar conta','API mock → PATCH active=false','Documente que desativar identidade SCIM e bloquear login são controles relacionados porém distintos.','Leaver depende de comportamento do aplicativo de destino.','Estado active=false comprovado e autorização revisada.','Apps podem manter sessão; revise tokens/sessões.'),
 enterpriseTask('Simular falha e retry','Mock → timeout/reexecução','Simule timeout depois de POST efetivo, faça busca por externalId e evite duplicar ao repetir.','Retry robusto é condição de escala corporativa.','Um único usuário após duas tentativas.','Se duplicou, ajuste idempotência/correlação antes de produção.')
 ],
 verify:['Mapeamento e owner formalizados.','PATCH e deactivate aplicados.','Retry não duplica objetos.']
 },
 'lab-09':{
 track:'04 · Governança e automação',incident:'Financeiro solicita acesso temporário para Bruno e precisa passar por aprovação e recertificação.',
 why:'A concessão pode existir por grupo, pacote de acesso ou conexão IGA, mas precisa de dono, regra e aplicação de retirada.',
 result:'Solicitação e aprovação de entitlement com prazo, revisão e decisão aplicada.',
 prerequisites:['Entra P2; recursos avançados podem exigir SKU adicional Entra ID Governance.','Catálogo fictício de Financeiro com owners.'],
 decisions:['P2 não garante todas as funcionalidades modernas de Entitlement Management/Lifecycle Workflows.','Owner é responsável por decisão de necessidade do direito.','Conflitos SoD devem ser bloqueados ou tratados com exceção formal.'],
 tasks:[
 enterpriseTask('Inventariar SKU do recurso','Entra → Billing → Licenses → Licensed features','Confirme se Access Reviews, Entitlement Management e Lifecycle Workflows estão licenciados; não presuma por ter P2.','Governança avançada tem licenças e pré-requisitos independentes.','Matriz SKU → feature → plano B.','Sem SKU correto, use simulação documentada.'),
 enterpriseTask('Criar catálogo de acesso','Entra ID Governance → Entitlement Management → Catalogs','Defina catálogo FIN-ATL, owner, descrição, aplicações/grupos sob responsabilidade de Financeiro.','Direitos dispersos ficam organizados por propósito/owner.','Catálogo e conjunto de recursos inventariados.','Se Entitlement Management não existir, simule com ticket e grupo.'),
 enterpriseTask('Definir access package','Entitlement Management → Access packages → New','Crie FIN-ATL-LEITURA, vincule SG-ATL-FIN-APP-READ, defina solicitantes, approval e expiração de teste.','Concessão é condicionada a tempo e aprovação.','Regras de política e deadline visíveis.','Um package pode exigir licença Governance adicional.'),
 enterpriseTask('Executar solicitação','Portal My Access / fluxo de solicitação','Bruno solicita acesso, gestor aprova, e IAM verifica group membership após decisão.','Aprovação precisa produzir efeito mensurável.','Linha do tempo pedido → approval → membership → app.','Se aceito mas sem acesso, confira atualização/atribuição ao app.'),
 enterpriseTask('Recertificar e aplicar decisão','Identity Governance → Access Reviews','Faça review com owner em período curto de lab. Decida remover e aplique decisão conforme configuração; confira grupo e app.','A revisão só fecha quando a mudança é executada, não ao clicar "deny".','Logs de reviewer e retirada do entitlement.','O modo de aplicação e janela da campanha importam.')
 ],
 verify:['Licença separada do Entra P2 investigada.','Fluxo de concessão aprovado e depois retirado.','Review com decisão aplicada e auditada.']
 },
 'lab-10':{
 track:'04 · Governança e automação',incident:'Renata administra uma função sensível apenas durante janela de manutenção aprovada.',
 why:'PIM fornece elegibilidade e ativação temporária para funções Microsoft suportadas; PAM/cofres atendem outra superfície de privilégio.',
 result:'Elevação JIT com justificativa, MFA quando exigido e retirada automática.',
 prerequisites:['Entra P2 válido para usuários aplicáveis ou produto ID Governance.','Conta administrativa separada e acesso de emergência seguro.'],
 decisions:['Não conceda Global Administrator para exercícios simples.','PIM elegível difere de assignment permanente.','Se houver acesso herdado/permanente a operação ainda pode funcionar após expiração.'],
 tasks:[
 enterpriseTask('Escolher função restrita','Entra ID → Roles and administrators','Selecione papel que possibilita operação reversível, como grupos em laboratório, com escopo mais baixo disponível.','Demonstra menor privilégio antes de aprender elevação.','Tabela tarefa → role → risco.','Evite usar Global Administrator por comodidade.'),
 enterpriseTask('Criar elegibilidade','Entra ID Governance → Privileged Identity Management → Microsoft Entra roles','Atribua elegibilidade à conta renata.admin com duração, justificativa e aprovação caso disponível.','Reduz janela de privilégio permanente.','Role eligibility com owner e validade.','Se não aparece PIM, verifique P2 do usuário e roles do operador.'),
 enterpriseTask('Testar antes da ativação','Entra ID → ação administrativa de teste','Tente operação antes de ativar e confirme que não possui função efetiva, caso não haja outra role herdada.','Demonstra baseline de privilégio.','Operação negada e memberships auditados.','Se funciona, investigue role permanente adicional.'),
 enterpriseTask('Ativar sob aprovação','PIM → My roles → Activate','Ative função temporária, forneça justificativa e faça MFA exigido. Anote hora de ativação/expiração.','Cria evento de autorização administrativo rastreável.','Evento de ativação e operação permitida.','A ativação pode exigir refresh/relogin por latência de token.'),
 enterpriseTask('Validar expiração e emergência','PIM / Audit logs','Espere fim da janela, teste operação novamente e valide negado; documente conta emergency separada que não dependa do PIM.','Verifica princípio de privilégio temporário e continuidade.','Antes/durante/depois com logs.','Permissões permanentes alternativas podem invalidar teste.')
 ],
 verify:['PIM ligado apenas ao papel necessário.','Autorização muda após ativar/expirar.','Conta break-glass permanece auditada e protegida.']
 },
 'lab-11':{
 track:'05 · Defesa e dados',incident:'Equipe de Financeiro classifica relatórios e precisa limitar exposição acidental de dados.',
 why:'Purview atua sobre proteção da informação; não substitui atribuições IAM no diretório ou na aplicação.',
 result:'Sensitivity labels e DLP pilotadas com dados fictícios e regras claras de uso.',
 prerequisites:['Microsoft Purview/M365 apropriados, separados do Entra ID P2.','Documentos e classificações totalmente sintéticos.'],
 decisions:['Label sem configuração de criptografia não impede leitura por si.','DLP primeiro em modo de auditoria; habilitar bloqueio após análise de falso positivo.'],
 tasks:[
 enterpriseTask('Confirmar direito de licenciamento','purview.microsoft.com → Settings / Solutions disponíveis','Verifique se a licença M365/Purview permite Information Protection, labels e DLP no workload que será testado.','P2 não inclui automaticamente direitos para todas as soluções Purview.','Matriz feature/licença e alternativa.','Sem licença, registre a simulação com arquivos sintéticos.'),
 enterpriseTask('Definir informação e owner','Inventário AtlasCorp → classificação','Classifique 3 documentos sintéticos como Público, Interno e Confidencial e determine grupo permitido.','Proteção depende da sensibilidade e do responsável pelo dado.','Catálogo de documentos, rótulo e acesso.','Não insira dados pessoais em amostras.'),
 enterpriseTask('Criar e publicar sensitivity label','Purview → Information Protection → Sensitivity labels','Crie etiqueta Confidencial e configure opções compatíveis com a plataforma; publique para grupo piloto e aguarde propagação.','Uma label precisa estar disponível ao usuário antes de testar aplicação.','Etiqueta visível em arquivo de teste e política de publicação.','Se não aparece, confira licença, grupo e atraso de publicação.'),
 enterpriseTask('Avaliar proteção real','App Office de teste → documento','Aplique etiqueta e compare comportamento de usuário autorizado e não autorizado. Se não houver criptografia habilitada, não espere bloqueio de abertura.','Separar classificação de controle de acesso evita falsos pressupostos.','Tabela com efeito real vs esperado.','DLP e label podem não produzir a mesma resposta.'),
 enterpriseTask('Criar DLP audit-only','Purview → Data Loss Prevention → Policies','Defina regra para dados sintéticos de teste no local suportado; configure auditoria em vez de bloqueio e verifique evento.','Permite ajustar precisão sem interromper operações legítimas.','Evento controlado, avaliação de falsos positivos e rollback.','Se não existe evento, veja janela de propagação e cobertura de workload.')
 ],
 verify:['Rótulo e DLP corretamente diferenciados.','Documento classificado e restrição demonstrada somente onde configurada.','Política piloto reversível e sem dados reais.']
 },
 'lab-12':{
 track:'05 · Defesa e dados',incident:'SecOps investiga repetidas falhas de acesso ao aplicativo de Financeiro após política Conditional Access.',
 why:'Mudanças de autenticação precisam ser confirmadas em logs com hipótese, correção e nova verificação.',
 result:'Investigação reproduzível com sign-ins, audit logs e consultas KQL quando houver workspace.',
 prerequisites:['Usuários sintéticos e políticas piloto dos capítulos anteriores.','Acesso de leitura a sign-in logs, AuditLogs e workspace se licenciado.'],
 decisions:['Login negado pode ser MFA, autorização da app, dispositivo, credencial ou política.','Ausência de log pode resultar de atraso, retenção ou filtro errado.'],
 tasks:[
 enterpriseTask('Produzir dois eventos conhecidos','Entra → sign-in de conta fictícia','Faça login válido e inválido sem provocar bloqueio prolongado. Anote UTC, aplicativo, usuário e correlation ID.','Investigar um evento conhecido valida a observabilidade.','Linha do tempo com status.','Se nenhum log aparece, confira ingestão e retenção.'),
 enterpriseTask('Ler Conditional Access','Entra ID → Monitoring & health → Sign-in logs → evento','Veja status, Authentication details, policies e diferença entre report-only e política On.','Separar avaliação prevista de enforcement real.','Matriz política → condição → resultado.','Cuidado com política não aplicada por grupo/app errado.'),
 enterpriseTask('Correlacionar alterações','Entra ID → Audit logs','Modifique membership de grupo de teste, filtre período/ator e encontre operação correspondente.','Mudança de autorização também precisa de auditoria.','Evento administrativo com ator e alvo.','Se não aparecer, verifique operação correta e latência.'),
 enterpriseTask('Criar consulta KQL','Workspace Log Analytics (opcional)','Na tabela real do ambiente, filtre sign-in failures por TimeGenerated/Status, projete colunas e agregue por aplicação. Ajuste schema para não assumir tabela disponível.','Padroniza triagem e relatórios.','KQL reproduzível e saída interpretada.','Se não houver workspace, use dados sintéticos e documente simulação.'),
 enterpriseTask('Executar remediação','Ticket de incidente → política piloto','Demonstre causa raiz de bloqueio não intencional, ajuste somente política piloto, repita acesso e registre correção.','Sem revalidação, diagnóstico não prova resolução.','Antes/depois correlacionado e aprovação da mudança.','Não afrouxe política global para consertar app de teste.')
 ],
 verify:['Hipótese sustentada por logs.','Evento de alteração de grupo localizado.','Erro corrigido e revalidado.']
 },
 'lab-13':{
 track:'06 · Integração e arquitetura',incident:'Empresa herdou Active Directory e precisa entender a correlação de identidades locais/cloud.',
 why:'AD DS, Kerberos, LDAP e sincronização em Entra executam funções diferentes, mesmo quando combinados em ambiente híbrido.',
 result:'Modelo de identidade híbrida com atributos autoritativos, prova de autenticação e consulta de diretório.',
 prerequisites:['VM Windows Server licenciado/avaliação em rede isolada ou simulação equivalente.','DNS correto e snapshot para rollback.'],
 decisions:['Nunca sincronize diretório de laboratório com tenant corporativo real.','Defina fonte autoritativa e estratégia de correlação antes de ligar sync.'],
 tasks:[
 enterpriseTask('Montar AD de laboratório','Windows Server → Server Manager → Add Roles','Prepare domínio de laboratório isolado, DNS e AD DS, sem roteamento para a rede de produção.','Domínio e DC fornecem diretório/autenticação de Windows.','DNS SRV e DC de laboratório operantes.','Falha Kerberos pode decorrer de DNS/tempo.'),
 enterpriseTask('Provar identidade local','Active Directory Users and Computers → OU Users','Crie OU, usuário, grupo e atributo estável; configure direitos mínimos.','Prepara fonte de identidade local com lifecycle separado.','Conjunto de objetos e membership registrado.','Não copie hash/senhas para evidências.'),
 enterpriseTask('Verificar autenticação','Cliente no domínio → klist e eventos','Faça login com usuário de teste, consulte ticket e explique TGT versus serviço.','Kerberos autentica para serviço, não concede automaticamente todas as permissões.','Ticket e evento sanitizados.','Clock skew e DNS devem ser verificados antes de recriar contas.'),
 enterpriseTask('Planejar sincronização','Entra Connect Sync ou Cloud Sync, conforme requisitos','Desenhe UPN, sourceAnchor, atributos e filtros de OU; implemente apenas em ambiente isolado e elegível.','Identificadores precisam ser preservados em Mover.','Topologia e matriz fonte→destino.','Se alteração de atributo é read-only na nuvem, corrija na fonte local.'),
 enterpriseTask('Testar continuidade','Diagrama: DC indisponível / sync atrasado','Modele falhas de rede, sincronização e autenticação e efeito em cloud.','Cria entendimento de dependência híbrida.','Matriz de falhas e recuperação.','PHS, PTA e federação reagem de modo distinto à queda do AD.')
 ],
 verify:['DNS/Kerberos e LDAP comprovados ou simulados.','Correlações e fontes autoritativas documentadas.','Falha híbrida explicada.']
 },
 'lab-14':{
 track:'06 · Integração e arquitetura',incident:'Pipeline AtlasCorp precisa acessar ambientes Azure, AWS e Google Cloud com credenciais temporárias.',
 why:'OIDC federation para workload evita segredos long-lived, mas deve restringir emitter/subject/audience e roles efetivas.',
 result:'Trust model multi-cloud comparável sem confundir permissões e identities dos provedores.',
 prerequisites:['IAM e OAuth/OIDC concluídos.','Sandboxes isolados nas clouds ou políticas fictícias.'],
 decisions:['Cloud IAM não é a mesma coisa em AWS/GCP/Azure.','Trust policy e permission policy têm propósitos distintos em AWS.'],
 tasks:[
 enterpriseTask('Definir identidade do pipeline','Projeto GitHub fictício → issuer/subject/audience','Escreva emissor, repo/branch ou ambiente permitido e audiência de destino.','Uma trust ampla pode aceitar qualquer branch/repo.','Tabela de claims permitidas/rejeitadas.','Não insira segredo estático no repositório.'),
 enterpriseTask('Mapear Azure federation','Entra → App registration / Managed identity → Federated credentials','Desenhe trust externa para principal e atribua role mínima ao recurso Azure.','Separa autenticação por OIDC de autorização no recurso.','Policy de trust e role scope.','Subject errado deve rejeitar token.'),
 enterpriseTask('Mapear AWS role','AWS IAM → Identity providers / Roles','Crie ou modele OIDC provider e trust relationship de sts:AssumeRoleWithWebIdentity restringindo subject/audience, mais permission policy separada.','Trust controla quem assume; permission policy o que pode fazer.','Role aceita claims corretas e nega branch divergente.','Condições com wildcard amplo expõem conta.'),
 enterpriseTask('Mapear GCP federation','GCP IAM → Workload Identity Pools','Projete pool, provider, attribute mapping/condition e recurso ou service account alvo.','GCP possui semântica de principal e resource bindings própria.','Mapeamento de trust e acesso mínimo.','Não presuma equivalência com role assignment Azure.'),
 enterpriseTask('Concluir segurança','Inventário → credenciais e custos','Compare validade, rotação, isolamento, logging e cleanup das 3 clouds.','Portabilidade exige analisar mecanismos, não traduzir nomes de botão.','Matriz de três ambientes e testes adversos.','Documente simulação caso não tenha sandbox.')
 ],
 verify:['Issuer, subject e audience bem restritos.','Papel por serviço e escopo mínimo documentados.','Tokens de origem não autorizada rejeitados em testes/simulação.']
 },
 'lab-15':{
 track:'07 · Capstone',incident:'Auditoria exige mostrar que AtlasCorp controla admissão, acesso, autenticação, dispositivos, dados, exceções e revogação.',
 why:'Projetos IAM corporativos exigem desenho de arquitetura, controles operacionais e demonstração de decisão autorizada e negada.',
 result:'Portfólio demonstrável: arquitetura, direitos, políticas, testes, investigação, riscos e retorno de serviços.',
 prerequisites:['Capítulos anteriores concluídos ou categorizados como simulação.','Custos de cloud e responsabilidades mapeados.'],
 decisions:['Não apresente simulação como implantação real.','Toda decisão de acesso deve ter dono, objetivo, execução e auditoria.','Resiliência, recuperação e privacidade são requisitos, não apêndices.'],
 tasks:[
 enterpriseTask('Consolidar contexto','Portfólio AtlasCorp → arquitetura','Crie diagrama usuários, RH, Entra, grupos, aplicações, Intune, Azure, Purview, SIEM e workloads.','Mostra fronteiras de confiança e dependências.','Diagrama versionado com origem e dono de cada identidade.','Não misture simulações e serviços reais no desenho sem legenda.'),
 enterpriseTask('Apresentar matrizes','Portfólio → RACI, SoD e matriz de privilégios','Liste Joiner/Mover/Leaver, roles, recursos, owners, escopos e justificativas.','Demonstra governança orientada ao risco.','Matrizes com decisões aprovadas.','Direito sem owner é exceção a corrigir.'),
 enterpriseTask('Mostrar login e autorização','App de teste + Entra CA','Reproduza um login com método apropriado, app assignment e ação autorizada/negada.','Demonstra que autenticação e autorização são controles diferentes.','Logs e responses 2xx/4xx sanitizados.','Se app só verifica front-end, implemente backend authorization.'),
 enterpriseTask('Correlacionar device/data','Intune + Purview quando licenciados','Teste condição de dispositivo e política do dado nos respectivos workloads, ou registre simulações.','Sinais complementares de Zero Trust.','Status de compliance e proteção de documento com escopo.','P2 sozinho não licencia os outros produtos.'),
 enterpriseTask('Demonstrar governança avançada','PIM / Access Reviews / tickets','Mostre concessão, ativação temporária e retirada real ou simulada.','Evita privilégios permanentes e contas órfãs.','Logs de solicitação, aprovação e remoção.','P2 e ID Governance têm coberturas distintas.'),
 enterpriseTask('Investigar incidente','Sign-in / audit / incident logs','Provoque condição controlada de bloqueio, documente hipótese e teste correção.','Uma defesa só está madura quando pode ser operada.','Runbook com evidências antes e depois.','Não execute incidente simulado em tenant real.'),
 enterpriseTask('Fazer revisão de segurança','Portfólio → checklist final','Liste licenças, custo, riscos residuais, segredos excluídos, privilégios removidos, backups e recuperação.','Conclui processo como um projeto de empresa.','Relatório final seguro para mostrar em entrevista.','Redija identificadores de tenant, tokens e informações pessoais.')
 ],
 verify:['Pelo menos um caso positivo e um negativo executados com evidência.','JML e privilégio com owner e retirada comprovados.','Licenças, riscos e recursos simulados explicitamente identificados.','Ambiente de teste limpo e custos controlados.']
 }
};

/* P2: ampliar a trilha de Conditional Access com condições, sessões e risco.
   Não fabricar incidentes reais nem prometer que a plataforma detectará risco sintético. */
COMPANY_CHAPTERS['lab-02'].tasks.splice(COMPANY_CHAPTERS['lab-02'].tasks.length-1,0,
 enterpriseTask('Distinguir políticas e métodos','Entra → Protection → Authentication methods / Conditional Access',
 'Documente a diferença entre: quem pode registrar Microsoft Authenticator/passkey (Authentication methods), quando é exigido um método (CA authentication strength) e a autorização final da aplicação. Faça diagrama usuário → método → CA → recurso.',
 'Regra de método e regra de acesso se complementam, mas uma não substitui a outra.',
 'Matriz: usuário | método registrado | strength exigida | app | decisão.',
 'Um usuário pode ter método registrado e ainda falhar por CA ou falta de autorização na app.'),
 enterpriseTask('Analisar riscos no Identity Protection','Entra ID → Protection → Identity Protection → Risky users / Risky sign-ins',
 'Com uma conta licenciada P2, abra relatórios de usuários/entradas arriscadas existentes (se houver) e identifique diferença entre user risk e sign-in risk. Não execute ataques nem dependa de gerar risco real para completar o exercício.',
 'Risco de conta se refere a possível comprometimento da identidade; risco de entrada avalia uma tentativa específica.',
 'Tabela com definições de nível de risco, proprietários da resposta e ações esperadas, mesmo quando não há registros reais.',
 'Tenant limpo pode não possuir eventos de risco; registre "não observado" em vez de inventar uma detecção.'),
 enterpriseTask('Definir política CA de sign-in risk','Entra ID → Conditional Access → Policies → New policy',
 'Crie CA-ATL-004-SIGNIN-RISK: inclua APENAS o grupo piloto (contas de emergência fora do escopo), Target resources conforme cenário controlado, Conditions → Sign-in risk → Medium/High, Grant access → Require authentication strength (MFA forte adequado). Configure sessão Sign-in frequency apropriada, primeiro em Report-only.',
 'P2 permite usar sinais de risco de entrada para exigir nova garantia. Escolha os limiares conforme risco e método registrado.',
 'Registro dos campos User/Target/Sign-in risk/Grant/Session e política Report-only.',
 'Se não houver evento com nível Medium/High, não espere que um login comum aplique a regra. Teste a estrutura e documente limitação.'),
 enterpriseTask('Definir política CA de user risk','Entra ID → Conditional Access → Policies → New policy',
 'Crie política separada CA-ATL-005-USER-RISK: grupo piloto, Target resources → All resources apenas se for seguro para esse grupo, Conditions → User risk → High, Grant access → Require risk remediation e strength apropriada. Observe que as configurações adicionais de sessão/strength podem ser incluídas automaticamente. Comece em Report-only.',
 'O comprometimento da identidade exige recuperação própria. Microsoft recomenda não combinar user risk e sign-in risk na MESMA política.',
 'Capturas sanitizadas das duas políticas separadas e sua lógica de decisão.',
 'Não configure senha-change de usuários híbridos sem requisitos de password writeback e autoatendimento de recuperação.'),
 enterpriseTask('Verificar status sem fabricar risco','Entra ID → Conditional Access → What If / Sign-in logs',
 'Use What If para validar atribuição de usuário, aplicativo e condições suportadas; depois consulte sign-in logs conhecidos, verifique se as políticas de risco foram aplicadas ou não. Caso inexista risco detectado, marque testes de enforcement como "não executáveis neste ambiente" e explique a diferença.',
 'Uma condição de risco não pode ser demonstrada como acionada apenas por selecionar o nível em uma política.',
 'Registro: política existe, é Report-only, teste de escopo e estado efetivo não acionado ou incidente real do tenant de teste (sem dado pessoal).',
 'What If e Report-only não fabricam sinais P2 nem substituem detecção real.'),
 enterpriseTask('Examinar sessão e localização','Conditional Access → Conditions → Network / Session',
 'Projete uma localização nomeada somente se houver rede/IP sob sua administração. Compare Sign-in frequency e Persistent browser session para app de laboratório sem causar loop excessivo de autenticação. Não classifique toda a internet como rede confiável.',
 'A localização pode ser sinal adicional; sessão e avaliação contínua dependem do aplicativo e de protocolos.',
 'Tabela políticas + impacto de rede/sessão, horários UTC de avaliação e plano de exceção.',
 'Endereço compartilhado ou VPN pode invalidar pressupostos de localização.'),
 enterpriseTask('Revisar combinação de políticas CA','Conditional Access → Policies / Sign-in logs',
 'Documente quando duas regras independentes se aplicam simultaneamente: por exemplo MFA e dispositivo conforme. Teste a política piloto MFA separadamente antes de introduzir novas condições. Confirme que todos os requisitos aplicáveis podem precisar ser satisfeitos.',
 'Policies combinadas têm efeito cumulativo. Reduz riscos de bloqueio por interseções não planejadas.',
 'Matriz de resultados esperados para usuário, dispositivo, app e condição de risco.',
 'Não interprete êxito de uma política isolada como êxito do conjunto efetivo.')
);
COMPANY_CHAPTERS['lab-02'].verify.push('User risk e sign-in risk tratados em duas políticas P2 separadas, ambas inicialmente Report-only.','Ausência de evento arriscado registrada como limitação, sem fingir teste real de enforcement.');
COMPANY_CHAPTERS['lab-02'].docs.push('https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies','https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-risk-based-user','https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies');

const COMPANY_ORDER=LABS.map(l=>l.id);
