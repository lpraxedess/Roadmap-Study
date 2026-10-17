# Revisão item a item — IAM Atlas

> **Data-base:** 16/10/2026. Documento de apoio à execução do currículo; não é certificação de competência. Foram examinadas a presença, coerência interna e associação conceitual de cada uma das aulas. A disponibilidade HTTP individual de todas as URLs não foi testada.

**Escopo:** 29 módulos, 242 aulas, 16 laboratórios. Todos mantêm conceito, prática, evidência e fonte de leitura.

## Procedimento por aula

1. Leia a definição e procure no material oficial o funcionamento do mecanismo.
2. Enumere pré-requisitos do ambiente, conta de teste, autorização e licença.
3. Faça o passo a passo utilizando dados fictícios; evite produção.
4. Registre caso positivo, caso adverso e plano de correção.
5. Preserve somente evidências sanitizadas e indique se foi execução real, simulação ou estudo teórico.
6. Explique diferenças entre fabricantes e avalie seu domínio sem confundir autoavaliação com exame.

## 00 · Fundamentos de TI para IAM

**Fase:** 01 · Bases e identidades. **Objetivo:** Entenda como sistemas e serviços identificam usuários e se comunicam.

**Ponto conceitual principal:** Examine o fluxo requisição -> DNS -> conexão -> TLS -> serviço; confirme o relógio e a cadeia de confiança antes de diagnosticar IAM.

**Risco de interpretação:** Um login pode falhar sem sequer alcançar o IdP.

### 0.1 — TCP/IP

**Definição:** TCP/IP é a pilha de protocolos que transporta dados entre endereços IP; TCP estabelece conexões e controla entrega e retransmissões.

**Objetivo profissional:** AD, LDAP, Kerberos e HTTPS precisam alcançar servidores e portas corretos; rotas e firewalls incorretos frequentemente parecem falhas de login.

**Pré-requisitos:** Acesso a computador próprio ou VM de laboratório. Comandos básicos de terminal e ambiente isolado.

**Passos do exercício:**
1. Configure duas VMs na mesma sub-rede isolada
2. Confira ipconfig /all ou ip addr e a tabela de rotas
3. Teste TCP 443 com Test-NetConnection após instalar serviço HTTPS e compare com teste de ICMP.

**Critério de aceite:** Consegue explicar diferença entre IP e TCP, identificar IP/máscara/gateway/porta, verificar rota, distinguir bloqueio ICMP de TCP e diagnosticar uma falha de comunicação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/networking/technologies/network-subsystem/net-sub-interface

### 0.2 — DNS

**Definição:** DNS traduz nomes em registros como A e SRV; AD usa SRV para localizar controladores de domínio.

**Objetivo profissional:** Clientes de domínio usam DNS para localizar autenticação Kerberos e LDAP; servidor DNS incorreto impede ingresso e logon.

**Pré-requisitos:** Acesso a computador próprio ou VM de laboratório. Comandos básicos de terminal e ambiente isolado.

**Passos do exercício:**
1. Instale DNS Server em VM isolada e confira zona de teste
2. Crie registro A e valide com nslookup
3. Em AD, consulte SRV _ldap._tcp.dc._msdcs.<domínio> e simule DNS inválido somente no cliente de laboratório.

**Critério de aceite:** Identifica registros e diagnostica falha de resolução.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/networking/dns/quickstart-install-configure-dns-server

### 0.3 — HTTP e HTTPS

**Definição:** HTTP é protocolo de requisição e resposta web; HTTPS é HTTP protegido por TLS e certificado.

**Objetivo profissional:** IdPs e aplicações IAM usam HTTPS para login, callbacks, APIs e tokens; certificados inválidos quebram integrações ou expõem dados.

**Pré-requisitos:** Acesso a computador próprio ou VM de laboratório. Comandos básicos de terminal e ambiente isolado.

**Passos do exercício:**
1. Instale Web Server (IIS) em VM de teste
2. Associe certificado ao binding HTTPS da porta 443
3. Teste navegador e curl -I e inspecione validade e nome do certificado.

**Critério de aceite:** Consegue explicar HTTP, TLS, certificado e porta 443, publicar um site de teste em HTTPS e diagnosticar erro de certificado ou nome.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/iis/manage/configuring-security/how-to-set-up-ssl-on-iis

### 0.4 — TLS e certificados

**Definição:** TLS negocia canal criptografado; o certificado X.509 vincula identidade do servidor a chave pública.

**Objetivo profissional:** Protege credenciais e tokens durante tráfego LDAP, HTTPS e APIs; cadeia ou hostname inválidos provocam rejeição segura.

**Pré-requisitos:** Acesso a computador próprio ou VM de laboratório. Comandos básicos de terminal e ambiente isolado.

**Passos do exercício:**
1. Crie certificado de laboratório com nome DNS consistente
2. Configure HTTPS e examine detalhes no navegador ou openssl s_client
3. Simule expiração ou nome incorreto em ambiente isolado e observe o erro.

**Critério de aceite:** Critério de aceite: Crie certificado de laboratório com nome DNS consistente; Simule expiração ou nome incorreto em ambiente isolado e observe o erro.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/identity/ad-cs/

### 0.5 — Usuários e permissões Windows

**Definição:** Contas locais e ACLs NTFS atribuem direitos para acessar arquivos e executar operações.

**Objetivo profissional:** Conceder privilégio excessivo permite leitura ou alteração indevida de dados usados em processos IAM.

**Pré-requisitos:** Acesso a computador próprio ou VM de laboratório. Comandos básicos de terminal e ambiente isolado.

**Passos do exercício:**
1. Crie dois usuários locais de laboratório
2. Crie pasta e atribua leitura a um usuário e gravação a outro
3. Teste acesso com ambas as contas e analise permissões efetivas.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/networking/

### 0.6 — Usuários e permissões Linux

**Definição:** UID, GID, grupos e bits de leitura, escrita e execução controlam recursos POSIX.

**Objetivo profissional:** Serviços IAM em Linux exigem permissões mínimas para arquivos de configuração, certificados e segredos.

**Pré-requisitos:** Acesso a computador próprio ou VM de laboratório. Comandos básicos de terminal e ambiente isolado.

**Passos do exercício:**
1. Crie usuários e grupo fictícios
2. Crie arquivo de teste com proprietário e permissões restritas
3. Tente acessá-lo com conta autorizada e não autorizada.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/networking/

### 0.7 — Linha de comando (CLI)

**Definição:** CLI executa ferramentas administrativas por comandos reproduzíveis e scripts.

**Objetivo profissional:** Diagnóstico de autenticação requer consultar rede, processos, DNS, certificados e logs com precisão.

**Pré-requisitos:** Acesso a computador próprio ou VM de laboratório. Comandos básicos de terminal e ambiente isolado.

**Passos do exercício:**
1. Consulte endereço IP, DNS e serviço de teste por terminal
2. Redirecione saída para arquivo sem dados sensíveis
3. Documente comando, resultado esperado e retorno observado.

**Critério de aceite:** Critério de aceite: Consulte endereço IP, DNS e serviço de teste por terminal; Documente comando, resultado esperado e retorno observado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/networking/

### 0.8 — PowerShell

**Definição:** PowerShell é shell e linguagem de automação orientados a objetos com cmdlets e pipeline.

**Objetivo profissional:** Administração AD e Entra usa automação para inventário e correção auditável.

**Pré-requisitos:** Acesso a computador próprio ou VM de laboratório. Comandos básicos de terminal e ambiente isolado.

**Passos do exercício:**
1. Execute Get-LocalUser em VM Windows
2. Filtre contas desabilitadas e exporte CSV de teste
3. Crie script de consulta sem alterar identidades reais.

**Critério de aceite:** Critério de aceite: Execute Get-LocalUser em VM Windows; Crie script de consulta sem alterar identidades reais.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/powershell/scripting/overview

### 0.9 — Python básico

**Definição:** Python é linguagem de automação usada para consumir APIs, processar JSON e validar inventários.

**Objetivo profissional:** Integrações IAM frequentemente requerem transformar atributos e conciliar identidades entre sistemas.

**Pré-requisitos:** Acesso a computador próprio ou VM de laboratório. Comandos básicos de terminal e ambiente isolado.

**Passos do exercício:**
1. Leia JSON fictício contendo usuários e departamentos
2. Detecte duplicidade de identificadores
3. Gere CSV de resultado e trate campos ausentes.

**Critério de aceite:** Critério de aceite: Leia JSON fictício contendo usuários e departamentos; Gere CSV de resultado e trate campos ausentes.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte para aprofundamento:** https://docs.python.org/3/tutorial/

### 0.10 — APIs REST

**Definição:** REST organiza recursos acessados por HTTP com métodos como GET, POST, PATCH e DELETE.

**Objetivo profissional:** Entra Graph, SCIM e aplicações IAM expõem operações de ciclo de vida e consulta via APIs.

**Pré-requisitos:** Acesso a computador próprio ou VM de laboratório. Comandos básicos de terminal e ambiente isolado.

**Passos do exercício:**
1. Faça GET a API de teste e verifique status e corpo
2. Envie POST com recurso fictício quando a API permitir
3. Teste requisição sem autorização e examine 401/403.

**Critério de aceite:** Critério de aceite: Faça GET a API de teste e verifique status e corpo; Teste requisição sem autorização e examine 401/403.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte para aprofundamento:** https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview

### 0.11 — JSON

**Definição:** JSON representa objetos, listas e valores e é comum em APIs de identidade e tokens.

**Objetivo profissional:** Atributos, políticas e respostas de provisionamento são frequentemente transportados em JSON.

**Pré-requisitos:** Acesso a computador próprio ou VM de laboratório. Comandos básicos de terminal e ambiente isolado.

**Passos do exercício:**
1. Monte objeto de usuário com id, active e groups
2. Valide sintaxe com python -m json.tool
3. Compare respostas de API com atributos esperados.

**Critério de aceite:** Critério de aceite: Monte objeto de usuário com id, active e groups; Compare respostas de API com atributos esperados.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc8259

### 0.12 — Git

**Definição:** Git registra versões e histórico de scripts e configurações textuais.

**Objetivo profissional:** Mudanças em automações IAM precisam rastreabilidade, revisão e capacidade de reversão.

**Pré-requisitos:** Acesso a computador próprio ou VM de laboratório. Comandos básicos de terminal e ambiente isolado.

**Passos do exercício:**
1. Inicialize repositório de laboratório com git init
2. Faça commit de script de consulta
3. Altere arquivo, veja git diff e reverta uma mudança de teste.

**Critério de aceite:** Critério de aceite: Inicialize repositório de laboratório com git init; Altere arquivo, veja git diff e reverta uma mudança de teste.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte para aprofundamento:** https://git-scm.com/docs/gittutorial

## 01 · Identidade e segurança

**Fase:** 01 · Bases e identidades. **Objetivo:** Identidade é a representação digital; autenticação comprova identidade, autorização decide acesso e auditoria registra ações.

**Ponto conceitual principal:** Separe pessoa, identidade, conta, credencial, direito e evidência; JML é um processo de negócio, não apenas um script.

**Risco de interpretação:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

### 1.1 — Identidade digital

**Definição:** Identidade não é uma conta específica: a organização deve manter correlação com a pessoa, entidade legal ou workload representado.

**Objetivo profissional:** É a origem lógica das contas e políticas de acesso; identidade mal correlacionada gera duplicidades e concessões incorretas.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele funcionário e serviço com identificadores distintos
2. Associe cada identidade às contas em aplicações
3. Documente atributo que estabelece correlação.

**Critério de aceite:** Critério de aceite: Modele funcionário e serviço com identificadores distintos; Documente atributo que estabelece correlação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 1.2 — Contas

**Definição:** Conta é representação operacional em um sistema; uma pessoa pode ter várias contas e direitos distintos.

**Objetivo profissional:** Uma pessoa pode ter várias contas; inventariá-las permite revogar acesso ao desligar.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie usuário fictício em dois sistemas de laboratório
2. Relacione contas a uma identidade única
3. Desative uma conta e observe o alcance da revogação.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 1.3 — Credenciais

**Definição:** Segredos, certificados e chaves têm ciclos próprios de emissão, armazenamento, validade, recuperação e revogação.

**Objetivo profissional:** Credenciais vazadas permitem autenticação indevida mesmo quando a conta tem permissões limitadas.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Liste credenciais permitidas no IdP de teste
2. Ative um método seguro na conta de laboratório
3. Revogue-o e teste nova autenticação.

**Critério de aceite:** Critério de aceite: Liste credenciais permitidas no IdP de teste; Revogue-o e teste nova autenticação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 1.4 — Atributos de identidade

**Definição:** Atributos confiáveis dependem de fonte autoritativa, finalidade, atualização e política de propagação.

**Objetivo profissional:** Erros em atributos podem causar provisionamento em grupo ou aplicação errada.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie dois usuários de teste com departamentos distintos
2. Configure regra baseada em departamento
3. Altere atributo e confira atualização do acesso.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 1.5 — Autenticação, autorização e auditoria (AAA)

**Definição:** Autenticação valida credenciais, autorização decide ações e auditoria registra decisões e eventos; uma etapa não substitui a outra.

**Objetivo profissional:** Login bem-sucedido não significa permissão para recursos; logs são necessários para rastreio.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Configure aplicação de teste com login e duas roles
2. Tente recurso restrito com conta sem autorização
3. Verifique registro de sucesso e negação.

**Critério de aceite:** Relaciona evidência, causa provável, correção e novo teste.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 1.6 — Menor privilégio

**Definição:** Permissões devem atender à tarefa necessária, por recurso e prazo, e ser reduzidas se não utilizadas.

**Objetivo profissional:** Reduz impacto de conta comprometida e abuso interno.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Monte matriz de tarefas e permissões
2. Retire role administrativa de conta de teste
3. Confirme que a tarefa permitida funciona e operação excessiva falha.

**Critério de aceite:** Critério de aceite: Monte matriz de tarefas e permissões; Confirme que a tarefa permitida funciona e operação excessiva falha.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 1.7 — Zero Trust

**Definição:** Zero Trust exige verificação explícita, menor privilégio e pressuposto de comprometimento; não se resume a MFA.

**Objetivo profissional:** Acesso deve considerar identidade, contexto e política mesmo dentro da rede corporativa.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe fluxo usuário → IdP → aplicativo
2. Adicione condição de MFA e dispositivo
3. Teste acesso dentro e fora das condições.

**Critério de aceite:** Explica verificação explícita e menor privilégio.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 1.8 — Joiner (admissão)

**Definição:** Joiner cria identidade e permissões iniciais quando vínculo organizacional começa.

**Objetivo profissional:** Automação evita atraso e acesso não aprovado.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie evento fictício de contratação
2. Mapeie departamento para grupos iniciais
3. Simule provisionamento e registre aprovação.

**Critério de aceite:** Critério de aceite: Crie evento fictício de contratação; Simule provisionamento e registre aprovação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 1.9 — Mover (movimentação)

**Definição:** Mover atualiza atributos e acessos quando alguém muda de função ou departamento.

**Objetivo profissional:** Sem retirada dos direitos anteriores ocorre acúmulo de privilégios.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Mude usuário fictício de RH para Financeiro
2. Remova grupo RH antes de conceder grupo novo
3. Valide permissões resultantes.

**Critério de aceite:** Critério de aceite: Mude usuário fictício de RH para Financeiro; Valide permissões resultantes.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 1.10 — Leaver (desligamento)

**Definição:** Leaver desativa identidades e revoga acessos quando termina o vínculo.

**Objetivo profissional:** Contas ativas após desligamento são risco de segurança e auditoria.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie checklist de sistemas usados pela identidade fictícia
2. Desabilite conta e revogue sessão quando disponível
3. Verifique que login e aplicação estão inacessíveis.

**Critério de aceite:** Critério de aceite: Crie checklist de sistemas usados pela identidade fictícia; Verifique que login e aplicação estão inacessíveis.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 1.11 — Políticas IAM

**Definição:** Políticas IAM documentam regras de concessão, revisão, autenticação e revogação.

**Objetivo profissional:** Padronizam decisões e permitem demonstrar conformidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Escreva política curta de concessão com dono e aprovador
2. Estabeleça prazo e revisão
3. Aplique a solicitação fictícia.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 1.12 — Riscos de identidade

**Definição:** Risco de identidade considera probabilidade e impacto de abuso, roubo ou excesso de acesso.

**Objetivo profissional:** Ajuda priorizar MFA, eliminação de contas órfãs e limitação de privilégio.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Registre três cenários como senha vazada e admin permanente
2. Classifique impacto e probabilidade
3. Associe mitigação concreta a cada um.

**Critério de aceite:** Critério de aceite: Registre três cenários como senha vazada e admin permanente; Associe mitigação concreta a cada um.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 1.13 — Segregação de funções (SoD)

**Definição:** SoD previne concentração de atividades conflitantes, como criar e aprovar uma mesma transação.

**Objetivo profissional:** Uma conta que cria e aprova pagamento concentra risco operacional.

**Pré-requisitos:** Conheça os termos do módulo: Identidade versus conta. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie roles Solicitar e Aprovar
2. Estabeleça regra de incompatibilidade
3. Teste pedido de concessão conflitante e bloqueio.

**Critério de aceite:** Critério de aceite: Crie roles Solicitar e Aprovar; Teste pedido de concessão conflitante e bloqueio.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

## 16 · Comprovação de identidade e assurance

**Fase:** 01 · Bases e identidades. **Objetivo:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos.

**Ponto conceitual principal:** Distinga IAL (prova), AAL (autenticador) e FAL (federação); avalie o contexto de risco.

**Risco de interpretação:** Níveis não são simplesmente degraus de uma mesma escala.

### 16.1 — Identidade declarada e identidade verificada

**Definição:** Uma alegação de identidade não comprova por si só que a pessoa corresponde ao registro.

**Objetivo profissional:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Garantias de identidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele um cadastro fictício com atributos declarados
2. Defina checagens proporcionais ao risco
3. Registre quais atributos foram comprovados
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Mapa de atributos declarados e verificados e justificativa de cada validação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte para aprofundamento:** https://pages.nist.gov/800-63-4/

### 16.2 — Identity proofing e IAL

**Definição:** IAL mede garantia de comprovação da identidade e não a força do login por si só.

**Objetivo profissional:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Garantias de identidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare dois processos fictícios de onboarding de riscos diferentes
2. Escolha requisitos de comprovação apropriados
3. Justifique exceções e riscos residuais
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de garantia de identidade, etapas e lacunas por cenário. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte para aprofundamento:** https://pages.nist.gov/800-63-4/

### 16.3 — Authenticator assurance e AAL

**Definição:** AAL mede força do mecanismo de autenticação, diferente de identity proofing e federação.

**Objetivo profissional:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Garantias de identidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare senha, TOTP e passkey resistente a phishing
2. Classifique pontos de resistência e recuperação
3. Documente a escolha para usuários privilegiados
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Tabela de métodos com propriedades de resistência e exigências por risco. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte para aprofundamento:** https://pages.nist.gov/800-63-4/

### 16.4 — Federation assurance e FAL

**Definição:** FAL aborda garantias de federação, com regras de confiança e proteção de assertions.

**Objetivo profissional:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Garantias de identidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe emissor, aplicação e claims
2. Liste verificações de issuer, audience, assinatura e tempo
3. Modele falha de confiança
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo de confiança com pelo menos três verificações de token/assertion. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte para aprofundamento:** https://pages.nist.gov/800-63-4/

### 16.5 — Identificadores imutáveis e correlação

**Definição:** Identidade, conta e pessoa são entidades distintas; identificadores estáveis evitam duplicação e falhas em JML.

**Objetivo profissional:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Garantias de identidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie tabela fictícia RH-IdP-aplicação
2. Compare dois atributos de correlação
3. Simule alteração de sobrenome sem perder vínculo
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Mapeamento com ID persistente e caso de atualização de nome sem duplicidade. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte para aprofundamento:** https://pages.nist.gov/800-63-4/

### 16.6 — Recuperação de conta e reproofing

**Definição:** Fluxos de recuperação são parte da superfície de ataque e exigem controles contra engenharia social.

**Objetivo profissional:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Garantias de identidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe recuperação para conta padrão
2. Defina procedimento mais rigoroso para administrador
3. Simule pedido de recuperação suspeito
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Checklist de recuperação segura, aprovação e auditoria. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte para aprofundamento:** https://pages.nist.gov/800-63-4/

### 16.7 — Privacidade na gestão de identidades

**Definição:** Dados de identidade demandam minimização, prazo de retenção, controle de finalidade e acesso proporcional.

**Objetivo profissional:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Garantias de identidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Liste atributos estritamente necessários para onboarding
2. Identifique dados excessivos
3. Documente retenção e exclusão conforme política fictícia
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Inventário com finalidade, acesso, prazo e exclusão de cada atributo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte para aprofundamento:** https://pages.nist.gov/800-63-4/

## 09 · Microsoft Entra ID

**Fase:** 01 · Bases e identidades. **Objetivo:** Serviço de identidade Microsoft para usuários, aplicações e controle de acesso na nuvem.

**Ponto conceitual principal:** Separe tenant, roles Entra, enterprise apps, app registrations, grupos e APIs.

**Risco de interpretação:** Azure RBAC e papéis administrativos Entra não são equivalentes.

### 9.1 — Tenant Entra ID

**Definição:** Tenant é limite de diretório da organização; não equivale a subscription Azure.

**Objetivo profissional:** Identidades, grupos, aplicações e políticas são administrados dentro do tenant correto.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Acesse tenant e registre tenant ID e domínios verificados
2. Localize licença e políticas disponíveis
3. Diferencie tenant de assinatura Azure.

**Critério de aceite:** Critério de aceite: Acesse tenant e registre tenant ID e domínios verificados; Diferencie tenant de assinatura Azure.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 9.2 — Usuários Entra ID

**Definição:** Usuários Entra são contas cloud, convidadas ou sincronizadas, com atributos e estado de entrada.

**Objetivo profissional:** A conta correta e seus métodos de autenticação determinam quem pode usar aplicações.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie usuário de teste no tenant adequado
2. Configure grupos e método de autenticação permitido
3. Bloqueie sign-in e observe impacto.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 9.3 — Grupos Entra ID

**Definição:** Grupos Entra agregam usuários e podem conceder acesso a aplicativos ou recursos.

**Objetivo profissional:** Facilitam RBAC e governança, evitando atribuições avulsas.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie grupo de segurança fictício
2. Adicione usuário teste
3. Atribua grupo a aplicação compatível e valide entrada.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 9.4 — Roles Entra ID

**Definição:** Funções administrativas do Entra protegem objetos e operações do diretório. Não confundir com Azure RBAC nem com roles internas de aplicativos.

**Objetivo profissional:** Global Administrator é mais amplo que funções como Global Reader; menor privilégio reduz exposição.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare permissões de Global Reader e User Administrator
2. Em tenant isolado atribua role mínima se permitido
3. Revogue e documente diferença.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 9.5 — Enterprise Applications

**Definição:** Enterprise Applications representam instâncias de serviço (service principals) de aplicativos no tenant.

**Objetivo profissional:** Centralizam atribuição de usuários, SSO, provisionamento e registros de acesso.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Adicione app empresarial de teste
2. Atribua apenas grupo autorizado
3. Inspecione opções Single sign-on e Provisioning quando disponíveis.

**Critério de aceite:** Critério de aceite: Adicione app empresarial de teste; Inspecione opções Single sign-on e Provisioning quando disponíveis.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 9.6 — App Registrations

**Definição:** App Registrations definem identidade de aplicativos que usam Microsoft identity platform.

**Objetivo profissional:** Client ID, redirect URI e permissões afetam segurança dos fluxos OAuth/OIDC.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Registre app de laboratório
2. Configure Redirect URI e permissões mínimas
3. Use endpoint OIDC de teste e valide login.

**Critério de aceite:** Critério de aceite: Registre app de laboratório; Use endpoint OIDC de teste e valide login.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 9.7 — Conditional Access

**Definição:** Conditional Access combina atribuições, condições e controles; primeiro teste em report-only e proteja acesso emergencial.

**Objetivo profissional:** Permite exigir MFA ou bloquear condições inadequadas; políticas mal planejadas podem bloquear administradores.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Selecione grupo exclusivo de teste
2. Crie política Report-only com app e condição
3. Analise sign-in logs antes de qualquer ativação.

**Critério de aceite:** Interpreta políticas aplicadas em log de entrada.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview

### 9.8 — MFA Entra ID

**Definição:** Diferencie MFA, authentication strength, experiência de registro e política; métodos não são igualmente resistentes a phishing.

**Objetivo profissional:** Reduz comprometimento por senhas roubadas e pode ser exigido por Conditional Access.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Habilite método suportado para usuário teste
2. Registre autenticador ou outro método
3. Teste login e recuperação com método alternativo.

**Critério de aceite:** Critério de aceite: Habilite método suportado para usuário teste; Teste login e recuperação com método alternativo.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/

### 9.9 — Graph API e federação híbrida

**Definição:** Microsoft Graph é a API de gerenciamento de objetos Microsoft; sincronização e federação híbrida são arquiteturas diferentes e precisam ser estudadas separadamente.

**Objetivo profissional:** Automação e identidade híbrida exigem consentimentos mínimos e fonte de autoridade clara.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Use Graph Explorer para GET /me ou /users com permissão adequada
2. Documente resposta sem PII
3. Desenhe fluxo AD → Entra e mapeie atributos de correlação.

**Critério de aceite:** Critério de aceite: Use Graph Explorer para GET /me ou /users com permissão adequada; Desenhe fluxo AD → Entra e mapeie atributos de correlação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/graph/overview

## 17 · Administração avançada do Microsoft Entra

**Fase:** 02 · Autenticação e autorização. **Objetivo:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade.

**Ponto conceitual principal:** Conheça objetos do tenant, administrative units, licenças, atributos, delegação e Graph.

**Risco de interpretação:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

### 17.1 — Domínios verificados e configurações de tenant

**Definição:** Domínio personalizado verificado habilita identidades com namespace corporativo; tenant não é assinatura Azure.

**Objetivo profissional:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra avançada. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Inspecione propriedades e domínios do tenant
2. Compare tenant ID e subscription ID
3. Registre impactos de adicionar domínio
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Diagrama separando organização, tenant, domínio e assinatura. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/fundamentals/

### 17.2 — Entra roles e escopos administrativos

**Definição:** Funções do diretório concedem permissões administrativas de identidade, distintas de Azure RBAC.

**Objetivo profissional:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra avançada. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Liste funções predefinidas e respectivas ações
2. Atribua função limitada a conta de teste se possível
3. Revogue e compare permissões
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de privilégios e prova de acesso antes/depois da revogação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/fundamentals/

### 17.3 — Administrative Units

**Definição:** Unidade administrativa delimita administração suportada sobre objetos; não bloqueia toda visibilidade de membros fora do escopo.

**Objetivo profissional:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra avançada. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie ou modele duas unidades administrativas
2. Associe usuário teste a uma unidade
3. Teste delegação limitada conforme recursos disponíveis
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Mapa de escopo com usuário dentro e fora da delegação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units

### 17.4 — Grupos atribuídos e dinâmicos

**Definição:** A associação de grupos pode ser direta ou calculada por regras de atributos, com requisitos de licença distintos.

**Objetivo profissional:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra avançada. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie grupo atribuído de laboratório
2. Modele regra dinâmica por departamento
3. Compare associação e impacto em acessos
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Regra, lista de membros esperados e impacto da mudança de atributo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/fundamentals/

### 17.5 — Atributos personalizados de segurança

**Definição:** Atributos estruturados permitem classificar objetos e apoiar decisões e governança, com permissões específicas.

**Objetivo profissional:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra avançada. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Defina taxonomia de ambiente e criticidade
2. Configure em tenant elegível ou simule modelo
3. Aplique classificação em duas identidades fictícias
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Esquema, responsabilidades e exemplo de uso de atributo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/fundamentals/

### 17.6 — Licenças e atribuição por grupo

**Definição:** Licenças têm escopos e efeitos próprios; a distribuição deve seguir necessidade e disponibilidade contratual.

**Objetivo profissional:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra avançada. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Consulte inventário de licenças no tenant
2. Modele atribuição por grupo
3. Documente o que depende de P1, P2 ou produto adicional
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Tabela recurso-licença-usuário e riscos de expiração. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/fundamentals/

### 17.7 — Entra Connect Sync versus Cloud Sync

**Definição:** As soluções de sincronização híbrida têm pré-requisitos, topologias e capacidades distintas.

**Objetivo profissional:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra avançada. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe fonte autoritativa AD DS
2. Compare fluxos Connect Sync e Cloud Sync
3. Se houver lab, acompanhe identidade sincronizada
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Topologia com fonte de autoridade, filtros, atributos e caminho de falha. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/fundamentals/

### 17.8 — Autenticação híbrida PHS, PTA e federação

**Definição:** Password Hash Sync, Pass-through Authentication e federação trazem dependências operacionais diferentes.

**Objetivo profissional:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra avançada. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare disponibilidade durante falha de rede
2. Modele recuperação para cada opção
3. Identifique a decisão adequada a cenário fictício
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de dependências e impacto de indisponibilidade do AD. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/fundamentals/

### 17.9 — Microsoft Graph e permissões delegadas

**Definição:** Permissões delegadas operam no contexto do usuário; exigem consentimento apropriado.

**Objetivo profissional:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra avançada. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Use Graph Explorer com permissão mínima
2. Execute GET /me com conta teste
3. Compare consentimento e resultado de requisição não autorizada
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Request, response sanitizado e escopo efetivamente utilizado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/graph/permissions-overview

### 17.10 — Microsoft Graph com application permissions

**Definição:** Permissões de aplicação executam sem usuário e podem oferecer privilégio elevado; exigem governança.

**Objetivo profissional:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra avançada. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Projete aplicação somente leitura
2. Identifique autorização administrativa necessária
3. Compare permissões de aplicativo e delegadas sem criar segredos reais
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de consentimento, revisão e revogação de app roles. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/graph/permissions-overview

### 17.11 — Governança de registros de aplicações

**Definição:** App registrations e enterprise applications representam objetos e vínculos diferentes e demandam owners e revisão.

**Objetivo profissional:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Administração Entra avançada. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie registro de app fictícia
2. Identifique application object e service principal
3. Documente proprietários e expiração de credenciais
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Diagrama app object versus service principal e inventário de owners. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/fundamentals/

## 05 · Senhas, MFA e passkeys

**Fase:** 02 · Autenticação e autorização. **Objetivo:** A autenticação deve resistir a roubo de credenciais, ataques de phishing e abuso de sessões.

**Ponto conceitual principal:** Compare fatores, resistência a phishing, vinculação de sessão, recuperação e canais de registro.

**Risco de interpretação:** MFA baseado em código e push não significa resistência a phishing.

### 5.1 — Senhas e recuperação segura

**Definição:** Senha é credencial baseada em conhecimento; recuperação deve confirmar identidade sem expor conta.

**Objetivo profissional:** Redefinição vulnerável e reutilização permitem takeover de identidades.

**Pré-requisitos:** Conheça os termos do módulo: Métodos de autenticação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Habilite reset em serviço de laboratório
2. Tente fluxo com conta válida e desconhecida
3. Verifique expiração de links e ausência de enumeração.

**Critério de aceite:** Critério de aceite: Habilite reset em serviço de laboratório; Verifique expiração de links e ausência de enumeração.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** MFA baseado em código e push não significa resistência a phishing.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/authentication/

### 5.2 — TOTP

**Definição:** TOTP é segundo fator baseado em segredo compartilhado, mas não oferece resistência completa a phishing em tempo real.

**Objetivo profissional:** É fator adicional que reduz risco de senha roubada, embora não seja resistente a phishing.

**Pré-requisitos:** Conheça os termos do módulo: Métodos de autenticação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Ative TOTP para usuário teste
2. Faça login com e sem código
3. Teste diferença de horário e recuperação.

**Critério de aceite:** Critério de aceite: Ative TOTP para usuário teste; Teste diferença de horário e recuperação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** MFA baseado em código e push não significa resistência a phishing.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/authentication/

### 5.3 — FIDO2 e WebAuthn

**Definição:** WebAuthn permite operações criptográficas por autenticadores; verifique origem, desafio e registro seguro.

**Objetivo profissional:** Reduz phishing e evita segredos reutilizáveis enviados ao servidor.

**Pré-requisitos:** Conheça os termos do módulo: Métodos de autenticação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Ative método WebAuthn em IdP isolado
2. Registre passkey ou chave compatível
3. Teste login e exclusão da credencial.

**Critério de aceite:** Critério de aceite: Ative método WebAuthn em IdP isolado; Teste login e exclusão da credencial.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** MFA baseado em código e push não significa resistência a phishing.

**Fonte para aprofundamento:** https://www.w3.org/TR/webauthn-3/

### 5.4 — Passkeys

**Definição:** Passkeys implementam autenticação com chaves públicas e vinculação à origem em WebAuthn/FIDO2.

**Objetivo profissional:** Reduz exposição a phishing e melhora a experiência de login.

**Pré-requisitos:** Conheça os termos do módulo: Métodos de autenticação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Registre passkey em aplicação de laboratório
2. Teste login sem senha quando suportado
3. Revogue passkey e verifique recuperação.

**Critério de aceite:** Explica a autenticação e resistência a phishing.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** MFA baseado em código e push não significa resistência a phishing.

**Fonte para aprofundamento:** https://fidoalliance.org/passkeys/

### 5.5 — Sessões, cookies e revogação

**Definição:** Sessão associa requisições autenticadas a um contexto; cookies seguros transportam identificadores de sessão.

**Objetivo profissional:** Sequestrar sessão pode contornar novo desafio de senha ou MFA.

**Pré-requisitos:** Conheça os termos do módulo: Métodos de autenticação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Inspecione atributos de cookie em app de teste
2. Configure expiração curta e logout
3. Observe comportamento após revogar sessão.

**Critério de aceite:** Critério de aceite: Inspecione atributos de cookie em app de teste; Observe comportamento após revogar sessão.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** MFA baseado em código e push não significa resistência a phishing.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/authentication/

### 5.6 — Políticas condicionais e risco

**Definição:** Acesso baseado em risco avalia contexto como localização, dispositivo e sinais de comprometimento.

**Objetivo profissional:** Pode exigir MFA ou bloquear acessos anômalos mesmo após credencial correta.

**Pré-requisitos:** Conheça os termos do módulo: Métodos de autenticação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie política direcionada só a grupo teste
2. Use modo relatório quando possível
3. Compare logs de acesso esperado e bloqueado.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** MFA baseado em código e push não significa resistência a phishing.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/authentication/

## 18 · Autenticação avançada e Identity Protection

**Fase:** 02 · Autenticação e autorização. **Objetivo:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável.

**Ponto conceitual principal:** Associe usuário, app, dispositivo, sinal de risco e controles com escopo e exceções explícitas.

**Risco de interpretação:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

### 18.1 — Temporary Access Pass (TAP)

**Definição:** O TAP é uma credencial temporária de onboarding/recuperação com duração e usos configuráveis.

**Objetivo profissional:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Políticas e risco. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Habilite método em tenant de teste elegível
2. Emita TAP para usuário fictício
3. Valide expiração e descarte após inscrição
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Registro de emissão, uso controlado e revogação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass

### 18.2 — Certificate-Based Authentication (CBA)

**Definição:** A autenticação por certificado usa PKI e exige cadeia de confiança, vinculação à identidade e revogação.

**Objetivo profissional:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Políticas e risco. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe cadeia CA e usuário
2. Configure em laboratório elegível ou simule fluxo
3. Investigue certificado expirado ou não confiável
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo CBA com políticas, vinculação e tratamento de revogação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/authentication/

### 18.3 — Authentication strengths

**Definição:** Authentication strength define métodos de autenticação aceitos para controlar recursos protegidos.

**Objetivo profissional:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Políticas e risco. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare MFA genérico e força resistente a phishing
2. Configure política de teste se possível
3. Demonstre método aceito e método recusado
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Registro das condições e do método que satisfaz a força requerida. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/authentication/

### 18.4 — Passkeys resistentes a phishing

**Definição:** Credenciais FIDO2 associadas à origem reduzem phishing em comparação com fatores baseados em códigos.

**Objetivo profissional:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Políticas e risco. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Registre passkey em conta de teste compatível
2. Examine o fluxo no IdP
3. Compare login e recuperação com método alternativo
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Relato de propriedades de origem, registro e recuperação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/authentication/

### 18.5 — Passwordless e Windows Hello for Business

**Definição:** Autenticação passwordless elimina a senha em fluxos específicos, mas depende de registro seguro de dispositivos.

**Objetivo profissional:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Políticas e risco. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Diferencie passkeys e Windows Hello for Business
2. Desenhe registro de dispositivo e credencial
3. Teste método permitido no ambiente disponível
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Mapa de dependências dispositivo-usuário-chave e processo de recuperação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/authentication/

### 18.6 — Identity Protection: riscos de usuário e entrada

**Definição:** Sinais de risco informam investigações e políticas adaptativas, mas não dispensam análise contextual.

**Objetivo profissional:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Políticas e risco. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare user risk e sign-in risk
2. Revise detecções demonstrativas ou documentação
3. Desenhe remediação por nível de risco
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo de triagem com decisões por sinal e política de recuperação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/authentication/

### 18.7 — Conditional Access report-only

**Definição:** Report-only registra avaliação prevista sem bloquear; confirme essa diferença ao analisar logs.

**Objetivo profissional:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Políticas e risco. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie grupo piloto e exclusões de emergência
2. Configure política somente relatório
3. Compare resultado simulado e decisão efetiva
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Logs que evidenciam decisão report-only antes de habilitar política. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only

### 18.8 — Revogação de sessões e resposta a incidente

**Definição:** Desabilitar conta e revogar sessões são controles distintos; tokens emitidos podem ter semânticas próprias.

**Objetivo profissional:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Políticas e risco. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie sessão teste
2. Execute revogação compatível com seu tenant
3. Observe nova solicitação de autenticação e eventos
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Linha do tempo de revogação, efeito observado e limitações conhecidas. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/authentication/

### 18.9 — Contas de acesso emergencial

**Definição:** Contas break-glass requerem controles independentes, monitoramento e teste periódico de recuperabilidade.

**Objetivo profissional:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Políticas e risco. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe duas contas emergenciais separadas
2. Revise exclusões e credenciais fortes
3. Simule procedimento de uso e posterior revisão sem afetar produção
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Runbook de acesso emergencial com testes, alertas e aprovação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/authentication/

## 04 · Autorização e políticas

**Fase:** 02 · Autenticação e autorização. **Objetivo:** Autorização aplica regras a recursos: login bem-sucedido não concede todas as permissões.

**Ponto conceitual principal:** Compare permissões efetivas, herança, deny, role, atributo e relação; aplique autorização em cada endpoint.

**Risco de interpretação:** Remover um botão não protege a operação no servidor.

### 4.1 — RBAC

**Definição:** Role define permissões sobre ações e recursos, sujeita ao escopo e regras de avaliação do sistema.

**Objetivo profissional:** Reduz concessões individuais e facilita revisão e revogação.

**Pré-requisitos:** Conheça os termos do módulo: Modelos de autorização. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie roles Leitor e Editor em app de laboratório
2. Mapeie ações a roles
3. Valide que Leitor não pode editar.

**Critério de aceite:** Comprova ação permitida e negada por papel.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Remover um botão não protege a operação no servidor.

**Fonte para aprofundamento:** https://csrc.nist.gov/projects/role-based-access-control

### 4.2 — Modelagem de roles

**Definição:** Role engineering define conjuntos de permissões coerentes com funções reais.

**Objetivo profissional:** Papéis amplos acumulam direitos e tornam revisões ineficazes.

**Pré-requisitos:** Conheça os termos do módulo: Modelos de autorização. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Liste tarefas de três funções fictícias
2. Associe apenas permissões necessárias
3. Identifique sobreposição e conflito.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Remover um botão não protege a operação no servidor.

**Fonte para aprofundamento:** https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

### 4.3 — ABAC

**Definição:** ABAC decide usando atributos de sujeito, recurso, ação e contexto com fontes confiáveis.

**Objetivo profissional:** Permite regras de contexto mais finas que roles fixas.

**Pré-requisitos:** Conheça os termos do módulo: Modelos de autorização. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie regra departamento igual ao do documento
2. Teste dois perfis e dois recursos
3. Altere um atributo e observe decisão.

**Critério de aceite:** Testa alteração de atributo e decisão correspondente.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Remover um botão não protege a operação no servidor.

**Fonte para aprofundamento:** https://csrc.nist.gov/pubs/sp/800/162/upd2/final

### 4.4 — ACL

**Definição:** ACL relaciona sujeito e permissões por objeto; avalie herança e prioridades de negação.

**Objetivo profissional:** É a autorização efetiva de muitos arquivos e objetos Windows/Linux.

**Pré-requisitos:** Conheça os termos do módulo: Modelos de autorização. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie pasta de teste
2. Dê leitura ao grupo A e negue gravação
3. Confirme acesso de duas contas.

**Critério de aceite:** Critério de aceite: Crie pasta de teste; Confirme acesso de duas contas.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Remover um botão não protege a operação no servidor.

**Fonte para aprofundamento:** https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

### 4.5 — Negação por padrão

**Definição:** Deny by default rejeita qualquer operação que não possua autorização explícita.

**Objetivo profissional:** Prevenção contra novos endpoints ou roles inadvertidamente públicos.

**Pré-requisitos:** Conheça os termos do módulo: Modelos de autorização. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie endpoint protegido em aplicação de teste
2. Negue requisição sem role
3. Compare respostas 401, 403 e 200.

**Critério de aceite:** Critério de aceite: Crie endpoint protegido em aplicação de teste; Compare respostas 401, 403 e 200.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Remover um botão não protege a operação no servidor.

**Fonte para aprofundamento:** https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

### 4.6 — Entitlements e SoD

**Definição:** Entitlement é direito específico numa aplicação; SoD limita combinações incompatíveis.

**Objetivo profissional:** Governança precisa revisar cada direito e detectar concentração de tarefas críticas.

**Pré-requisitos:** Conheça os termos do módulo: Modelos de autorização. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Cadastre entitlements Aprovar e Solicitar
2. Defina conflito
3. Simule pedido que deve ser negado.

**Critério de aceite:** Critério de aceite: Cadastre entitlements Aprovar e Solicitar; Simule pedido que deve ser negado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Remover um botão não protege a operação no servidor.

**Fonte para aprofundamento:** https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

### 4.7 — Testes de autorização no backend

**Definição:** Verificação de autorização deve ocorrer no servidor em cada operação, mesmo se UI ocultar ação.

**Objetivo profissional:** Usuário pode chamar APIs diretamente; esconder botão não protege dados.

**Pré-requisitos:** Conheça os termos do módulo: Modelos de autorização. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie GET e PATCH de recurso fictício
2. Teste com conta sem role
3. Registre 403 para operação proibida e 200 para permitida.

**Critério de aceite:** Critério de aceite: Crie GET e PATCH de recurso fictício; Registre 403 para operação proibida e 200 para permitida.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Remover um botão não protege a operação no servidor.

**Fonte para aprofundamento:** https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

## 06 · SSO e SAML 2.0

**Fase:** 02 · Autenticação e autorização. **Objetivo:** Um IdP pode autenticar uma pessoa para múltiplas aplicações mediante relações de confiança.

**Ponto conceitual principal:** Localize emissor, destinatário, assertion, assinatura, certificado, audiência e tempo.

**Risco de interpretação:** Um assertion válido para outra aplicação não deve ser aceito.

### 6.1 — Identity Provider (IdP)

**Definição:** IdP é serviço que autentica usuários e emite informações confiáveis para aplicações.

**Objetivo profissional:** Centraliza MFA, sessão, logs e padrões SAML/OIDC utilizados em SSO.

**Pré-requisitos:** Conheça os termos do módulo: Federação SAML. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie usuário fictício no IdP
2. Registre aplicativo cliente
3. Valide que login ocorre no domínio do provedor.

**Critério de aceite:** Critério de aceite: Crie usuário fictício no IdP; Valide que login ocorre no domínio do provedor.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

### 6.2 — Service Provider (SP)

**Definição:** SP é aplicação consumidora de autenticação federada, especialmente em SAML.

**Objetivo profissional:** A confiança entre SP e IdP depende de endpoints e validações corretas.

**Pré-requisitos:** Conheça os termos do módulo: Federação SAML. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Selecione app SAML de laboratório
2. Identifique Entity ID e ACS
3. Cadastre SP no IdP e teste login.

**Critério de aceite:** Critério de aceite: Selecione app SAML de laboratório; Cadastre SP no IdP e teste login.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

### 6.3 — SSO

**Definição:** SSO pode reduzir logins repetidos, mas não remove a obrigação de autorização individual em aplicações.

**Objetivo profissional:** Diminui senhas dispersas e permite MFA consistente; não substitui autorização.

**Pré-requisitos:** Conheça os termos do módulo: Federação SAML. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Integre aplicação fictícia via OIDC ou SAML
2. Atribua usuário e autentique no IdP
3. Teste acesso sem atribuição e sessão.

**Critério de aceite:** Explica IdP/SP, login e limites da autorização.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/what-is-single-sign-on

### 6.4 — Metadados SAML

**Definição:** Metadata SAML é XML que publica Entity ID, URLs de serviços e certificados de assinatura.

**Objetivo profissional:** Troca de metadados evita divergência de endpoints e falhas de confiança.

**Pré-requisitos:** Conheça os termos do módulo: Federação SAML. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Exporte metadata XML de ambos
2. Encontre entityID, ACS, SingleSignOnService e certificado
3. Compare com valores configurados.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

### 6.5 — Assertions SAML

**Definição:** Assertion contém declarações assinadas ou protegidas; validar destinatário e prazo importa tanto quanto assinar.

**Objetivo profissional:** SP deve validar audiência, tempo, destinatário e assinatura antes de aceitar login.

**Pré-requisitos:** Conheça os termos do módulo: Federação SAML. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Capture resposta SAML exclusivamente de conta fictícia
2. Localize Subject, Conditions e AudienceRestriction
3. Teste falha por audiência alterada em ambiente isolado.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte para aprofundamento:** https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf

### 6.6 — Assinaturas SAML

**Definição:** Assinaturas XML verificam integridade e emissor das mensagens/assertions SAML.

**Objetivo profissional:** Ignorar assinatura pode permitir aceitação de afirmações de identidade forjadas.

**Pré-requisitos:** Conheça os termos do módulo: Federação SAML. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Confira certificado configurado no SP
2. Teste login válido
3. Substitua certificado por outro apenas em laboratório e observe rejeição.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

### 6.7 — Integração SAML de aplicativo

**Definição:** Federação SAML estabelece confiança entre IdP e SP para autenticação via navegador.

**Objetivo profissional:** Viabiliza SSO para aplicativos corporativos sem senha local por aplicação.

**Pré-requisitos:** Conheça os termos do módulo: Federação SAML. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Configure Entity ID e Assertion Consumer Service URL
2. Importe metadata/certificado conforme aplicativo
3. Atribua usuário e teste login e logout.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

### 6.8 — Investigação de falhas SSO

**Definição:** Diagnóstico SSO correlaciona erros de IdP, SP, relógio, certificado e redirecionamento.

**Objetivo profissional:** Falha de confiança ou URL pode impedir acesso de todo um grupo.

**Pré-requisitos:** Conheça os termos do módulo: Federação SAML. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Execute login com usuário teste
2. Anote correlação de logs e mensagem
3. Provoque callback inválido e restaure após verificar causa.

**Critério de aceite:** Relaciona evidência, causa provável, correção e novo teste.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

## 07 · OAuth 2.0, OIDC e JWT

**Fase:** 02 · Autenticação e autorização. **Objetivo:** OAuth delega autorização; OIDC adiciona autenticação sobre OAuth e declarações de identidade.

**Ponto conceitual principal:** Distinga ID token, access token, refresh token, consent, client type e PKCE.

**Risco de interpretação:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

### 7.1 — Authorization Code com PKCE

**Definição:** PKCE protege a troca do authorization code; state e validação de redirect continuam necessários.

**Objetivo profissional:** Impede interceptação útil do código e é padrão em clientes públicos modernos.

**Pré-requisitos:** Conheça os termos do módulo: OAuth, OIDC e tokens. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Registre cliente OIDC com code flow e PKCE
2. Observe code_challenge e code_verifier no fluxo de teste
3. Valide token obtido no callback.

**Critério de aceite:** Critério de aceite: Registre cliente OIDC com code flow e PKCE; Valide token obtido no callback.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc7636

### 7.2 — Scopes

**Definição:** Scopes OAuth não descrevem automaticamente o direito a cada objeto individual de uma API.

**Objetivo profissional:** Scopes limitam quais operações e dados o token pode habilitar.

**Pré-requisitos:** Conheça os termos do módulo: OAuth, OIDC e tokens. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Solicite openid profile em cliente teste
2. Compare tokens com e sem scope adicional
3. Observe resposta da API ao scope insuficiente.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte para aprofundamento:** https://openid.net/developers/specs/

### 7.3 — Claims

**Definição:** Claims são afirmações sobre sujeito e contexto, devem ser verificadas quanto a emissor, público e validade.

**Objetivo profissional:** Aplicações usam sub, email e roles para criar contexto, mas precisam validar origem do token.

**Pré-requisitos:** Conheça os termos do módulo: OAuth, OIDC e tokens. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Emita token de laboratório
2. Decodifique payload e identifique sub e email
3. Altere mapeamento de claim no IdP e repita.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte para aprofundamento:** https://openid.net/developers/specs/

### 7.4 — Consentimento OAuth

**Definição:** Consentimento deve ser limitado às permissões necessárias e governado especialmente em aplicativos terceiros.

**Objetivo profissional:** Excesso de consentimento pode conceder acesso indevido a dados via aplicativo.

**Pré-requisitos:** Conheça os termos do módulo: OAuth, OIDC e tokens. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie app fictícia pedindo permissões mínimas
2. Observe tela ou política de consentimento
3. Revogue aprovação e tente novo acesso.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte para aprofundamento:** https://openid.net/developers/specs/

### 7.5 — ID Token

**Definição:** ID token autentica o usuário para o cliente OIDC e não deve ser aceito como access token por API.

**Objetivo profissional:** Não deve ser usado no lugar do access token para autorizar APIs.

**Pré-requisitos:** Conheça os termos do módulo: OAuth, OIDC e tokens. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Receba ID token de IdP de teste
2. Verifique assinatura, audience e expiração
3. Compare token com access token.

**Critério de aceite:** Valida emissor, audiência, expiração e assinatura.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte para aprofundamento:** https://openid.net/specs/openid-connect-core-1_0.html

### 7.6 — Access Token

**Definição:** Access token autoriza chamada a recurso designado; formato não é necessariamente JWT.

**Objetivo profissional:** API deve validar emissor, audiência, assinatura e autorização adequada.

**Pré-requisitos:** Conheça os termos do módulo: OAuth, OIDC e tokens. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Obtenha token com scope restrito
2. Chame endpoint autorizado e não autorizado
3. Teste token vencido ou audiência errada.

**Critério de aceite:** Distingue autorização de autenticação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc6749

### 7.7 — JWT

**Definição:** JWT é formato de claims potencialmente assinado e/ou criptografado; não é um protocolo de login.

**Objetivo profissional:** Decodificar não basta; aceitar assinatura ou algoritmo indevido compromete confiança.

**Pré-requisitos:** Conheça os termos do módulo: OAuth, OIDC e tokens. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Gere token de laboratório assinado
2. Separe header, payload e assinatura
3. Valide assinatura e rejeite chave incorreta.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc7519

### 7.8 — Issuer

**Definição:** Issuer identifica emissor e precisa ser comparado com a fonte esperada, não apenas extraído do token.

**Objetivo profissional:** Aceitar token de emissor não confiável permite impersonação entre tenants/IdPs.

**Pré-requisitos:** Conheça os termos do módulo: OAuth, OIDC e tokens. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Configure issuer esperado em API local
2. Teste token de IdP autorizado
3. Teste iss diferente e registre rejeição.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte para aprofundamento:** https://openid.net/developers/specs/

### 7.9 — Audience

**Definição:** Audience vincula token ao destinatário autorizado; token válido para outro recurso deve ser rejeitado.

**Objetivo profissional:** Token válido para outra API não deve autorizar este recurso.

**Pré-requisitos:** Conheça os termos do módulo: OAuth, OIDC e tokens. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Gere token para API A
2. Envie para API B
3. Confirme bloqueio por audiência.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte para aprofundamento:** https://openid.net/developers/specs/

### 7.10 — State

**Definição:** State ajuda defender contra CSRF e associa resposta OAuth à requisição iniciada pelo cliente.

**Objetivo profissional:** Impede aceitar respostas de fluxos de autenticação não iniciados pela sessão correta.

**Pré-requisitos:** Conheça os termos do módulo: OAuth, OIDC e tokens. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Registre state aleatório em requisição de laboratório
2. Compare callback esperado
3. Teste state divergente.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc6749

### 7.11 — Nonce

**Definição:** Nonce associa ID token à requisição de autenticação para mitigar replay em OIDC.

**Objetivo profissional:** Ajuda impedir aceitação de ID tokens de outro fluxo.

**Pré-requisitos:** Conheça os termos do módulo: OAuth, OIDC e tokens. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Solicite login com nonce gerado localmente
2. Compare nonce retornado no ID token
3. Rejeite resposta com valor divergente.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte para aprofundamento:** https://openid.net/specs/openid-connect-core-1_0.html

## 08 · Keycloak e Authentik

**Fase:** 02 · Autenticação e autorização. **Objetivo:** IdPs de laboratório permitem criar fluxos, gerenciar usuários e integrar aplicações.

**Ponto conceitual principal:** Pratique usuários, grupos, autenticação, clients, protocolos e logs em ambiente isolado.

**Risco de interpretação:** O IdP emite tokens; a aplicação ainda impõe suas decisões de autorização.

### 8.1 — Instalar ambientes de laboratório isolados

**Definição:** Keycloak e Authentik são IdPs self-hosted que podem executar em VMs ou containers para testar protocolos sem afetar produção.

**Objetivo profissional:** Ambientes isolados evitam expor credenciais e permitem reproduzir erros de integração com segurança.

**Pré-requisitos:** Conheça os termos do módulo: IdP de laboratório. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Prepare VM sem acesso público irrestrito
2. Instale Docker/Compose e siga quickstart oficial da versão
3. Suba apenas um IdP, crie administrador de laboratório e valide interface.

**Critério de aceite:** Critério de aceite: Prepare VM sem acesso público irrestrito; Suba apenas um IdP, crie administrador de laboratório e valide interface.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** O IdP emite tokens; a aplicação ainda impõe suas decisões de autorização.

**Fonte para aprofundamento:** https://www.keycloak.org/documentation

### 8.2 — Usuários, grupos, roles e políticas

**Definição:** IdPs armazenam contas, groups e roles e aplicam políticas de autenticação e atribuição.

**Objetivo profissional:** Esses objetos formam a base para claims de tokens e controle de acesso das aplicações integradas.

**Pré-requisitos:** Conheça os termos do módulo: IdP de laboratório. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie usuários Alice e Bruno e grupo Teste
2. Atribua role de leitura a Alice
3. Configure aplicação para receber informação e valide diferença.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** O IdP emite tokens; a aplicação ainda impõe suas decisões de autorização.

**Fonte para aprofundamento:** https://www.keycloak.org/documentation

### 8.3 — Integrar aplicações OIDC e SAML

**Definição:** OIDC usa tokens JSON e OAuth; SAML usa mensagens XML para federação com aplicativos.

**Objetivo profissional:** IdP só oferece SSO quando cliente e provedor concordam em endpoints e validações.

**Pré-requisitos:** Conheça os termos do módulo: IdP de laboratório. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Registre cliente OIDC com callback exato
2. Faça login com conta de laboratório
3. Depois integre SP SAML e compare metadados com OIDC.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** O IdP emite tokens; a aplicação ainda impõe suas decisões de autorização.

**Fonte para aprofundamento:** https://www.keycloak.org/documentation

### 8.4 — Logs e troubleshooting de autenticação

**Definição:** Logs do IdP registram entradas, rejeições, sessões e falhas de protocolo.

**Objetivo profissional:** Correlacionar eventos do IdP e da aplicação permite localizar falhas de configuração.

**Pré-requisitos:** Conheça os termos do módulo: IdP de laboratório. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Faça login válido e senha incorreta
2. Filtre evento por usuário/horário
3. Teste callback inválido e compare registros do IdP e app.

**Critério de aceite:** Relaciona evidência, causa provável, correção e novo teste.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** O IdP emite tokens; a aplicação ainda impõe suas decisões de autorização.

**Fonte para aprofundamento:** https://www.keycloak.org/documentation

## 19 · Identidades externas e acesso B2B

**Fase:** 03 · Plataformas e automação. **Objetivo:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento.

**Ponto conceitual principal:** Distinga convidados, colaboração B2B, direct connect, sincronização entre tenants e clientes externos.

**Risco de interpretação:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

### 19.1 — B2B collaboration e usuários convidados

**Definição:** Identidades externas podem acessar recursos internos sob políticas e responsabilidades definidas.

**Objetivo profissional:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidades externas. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele empresa parceira e convidados
2. Configure convite controlado em tenant de laboratório
3. Teste remoção do convidado
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Convite, acesso permitido e revogação documentados. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

### 19.2 — B2B direct connect

**Definição:** B2B direct connect é distinto de colaboração por convite e não serve aos mesmos cenários de todos os aplicativos.

**Objetivo profissional:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidades externas. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare acesso como guest e direct connect
2. Desenhe relação entre tenants
3. Escolha solução para dois casos de colaboração
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Tabela de diferenças, restrições e decisão por cenário. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

### 19.3 — Cross-tenant access settings

**Definição:** Políticas inbound e outbound governam confiança e colaboração entre tenants.

**Objetivo profissional:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidades externas. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Projete duas organizações fictícias
2. Defina permissões inbound/outbound
3. Teste ou simule bloqueio entre organizações
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de confiança de origem, destino e resultado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

### 19.4 — Cross-tenant synchronization

**Definição:** Sincronização entre tenants automatiza parte do ciclo de vida B2B e necessita controles claros sobre identidades.

**Objetivo profissional:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidades externas. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Mapeie fonte e destino
2. Defina atributos e escopo
3. Simule desativação e desprovisionamento
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo completo com proprietário e critérios de remoção. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

### 19.5 — External ID para aplicações

**Definição:** Identidade de clientes e identidades de força de trabalho apresentam modelos de tenant e requisitos distintos.

**Objetivo profissional:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidades externas. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare workforce, guest e customer identity
2. Proponha arquitetura para portal de clientes
3. Documente segurança e privacidade
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Decisão arquitetural com fluxo de inscrição e autenticação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

### 19.6 — Consentimento de aplicativos e publishers

**Definição:** Consentimento atribui permissões a aplicações; governança evita concessões excessivas a terceiros.

**Objetivo profissional:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidades externas. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Analise permissões solicitadas por app fictício
2. Escreva política de user/admin consent
3. Planeje revisão de aplicativos existentes
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de permissões e critérios de aprovação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

### 19.7 — SAML/OIDC entre tenants

**Definição:** Federação exige verificação de emissor, público, tempo e relação explícita de confiança.

**Objetivo profissional:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidades externas. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe login federado entre tenants
2. Compare SAML assertion e OIDC ID token
3. Liste falhas de validação
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Diagrama com checkpoints de segurança e evidências em logs. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

### 19.8 — Revisão de convidados inativos

**Definição:** Convidados esquecidos elevam risco e exigem expiração, revisão periódica e owner do acesso.

**Objetivo profissional:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidades externas. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Gere inventário fictício de convidados
2. Identifique inatividade e ausência de sponsor
3. Planeje revogação e notificação
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Relatório com decisão manter/remover e justificativa. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

## 20 · Microsoft Intune e identidade de dispositivos

**Fase:** 03 · Plataformas e automação. **Objetivo:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo.

**Ponto conceitual principal:** Compare registered/joined/hybrid joined, enrollment, compliance e MAM.

**Risco de interpretação:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

### 20.1 — Device registration versus Microsoft Entra Join

**Definição:** Registro e ingresso no domínio cloud apresentam propriedades e gerenciamento diferentes; Hybrid Join combina AD e Entra.

**Objetivo profissional:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Dispositivos gerenciados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Examine tipos de registro e join
2. Identifique device ID em ambiente de teste
3. Diferencie dispositivo registered, joined e hybrid joined
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Tabela dos estados e seus usos de autenticação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

### 20.2 — Enrollment MDM no Intune

**Definição:** Inscrição no MDM permite distribuir políticas, inventariar e avaliar postura, sujeita ao vínculo e consentimento.

**Objetivo profissional:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Dispositivos gerenciados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Prepare usuário e licença de teste
2. Inscreva dispositivo de laboratório se permitido
3. Verifique proprietário e estado de inscrição
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Evidência de enrollment e estado de gerenciamento. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

### 20.3 — Políticas de compliance

**Definição:** Conformidade Intune é sinal de estado do dispositivo; não é autenticação, nem garante segurança absoluta.

**Objetivo profissional:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Dispositivos gerenciados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Configure política de conformidade teste
2. Faça avaliação de dispositivo
3. Observe resultado compliant/noncompliant
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Política, estado calculado e justificativa do resultado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

### 20.4 — Conditional Access com dispositivo conforme

**Definição:** Política de CA no Entra usa resultado de compliance do Intune como condição e requisito de acesso.

**Objetivo profissional:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Dispositivos gerenciados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Prepare dispositivo conforme e grupo teste
2. Crie CA report-only exigindo conformidade
3. Compare entrada com e sem condição satisfeita
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Sign-in logs mostram a condição e o resultado da avaliação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance

### 20.5 — Configuração de endpoints versus compliance

**Definição:** Perfis de configuração aplicam preferências de segurança; compliance avalia se requisitos são atendidos.

**Objetivo profissional:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Dispositivos gerenciados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare perfil de configuração e política compliance
2. Aplique alteração inofensiva ao lab
3. Observe sincronização e relatório
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Diferenciação entre estado configurado e avaliação de conformidade. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

### 20.6 — Enrollment restrictions e escopo

**Definição:** Restrições de inscrição e grupos de atribuição ajudam a limitar dispositivos e usuários elegíveis.

**Objetivo profissional:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Dispositivos gerenciados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele política para BYOD e corporativo
2. Defina grupos de atribuição
3. Simule tentativa fora do escopo
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Tabela com bloqueio/permitido por categoria de dispositivo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

### 20.7 — App protection policies (MAM)

**Definição:** Proteção de aplicativo controla dados corporativos em aplicativos suportados, inclusive cenários sem MDM.

**Objetivo profissional:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Dispositivos gerenciados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele cenário BYOD
2. Configure ou simule política MAM
3. Compare proteção de dados com compliance de dispositivo
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz MAM versus MDM com efeito esperado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

### 20.8 — BitLocker, chaves e identidades

**Definição:** Criptografia do endpoint protege dados em repouso; acesso e recuperação exigem controle e auditoria.

**Objetivo profissional:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Dispositivos gerenciados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Configure criptografia em máquina teste se possível
2. Identifique onde recuperar chave autorizadamente
3. Descreva fluxo de acesso e auditoria
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo de recuperação com atribuições mínimas e evidências sem chave exposta. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

### 20.9 — Windows Hello for Business e dispositivos

**Definição:** O método de login combina identidade de usuário, material criptográfico e vínculo com dispositivo.

**Objetivo profissional:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Dispositivos gerenciados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe login com Hello for Business
2. Diferencie credenciais de usuário e device identity
3. Teste método em equipamento de laboratório elegível
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Diagrama de autenticação sem senha e recuperação de acesso. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

### 20.10 — Desligamento e retire/wipe

**Definição:** Retire, wipe, disable device e revogação da conta possuem efeitos diferentes e exigem autorização.

**Objetivo profissional:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Dispositivos gerenciados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Simule desligamento de funcionário fictício
2. Escolha ações apropriadas por propriedade do dispositivo
3. Documente sequência sem executar wipe em equipamento pessoal
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Plano de desligamento com efeito de cada operação e ponto de rollback. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

## 28 · Acesso adaptativo, Global Secure Access e proteção de sessões

**Fase:** 03 · Plataformas e automação. **Objetivo:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos.

**Ponto conceitual principal:** Separe segurança de tráfego, acesso a aplicações privadas, identidade, CA e autorização de recursos.

**Risco de interpretação:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

### 28.1 — Application Proxy para aplicações locais

**Definição:** O proxy de aplicações publica determinados aplicativos internos por um serviço de acesso remoto, com controles e dependências de conectores.

**Objetivo profissional:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Global Secure Access. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe aplicação interna e conector isolado
2. Escolha pré-autenticação e quem pode acessar
3. Modele falha de conector e procedimento de recuperação
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Desenho do fluxo cliente -> serviço -> conector -> aplicação e teste de usuário não atribuído. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/app-proxy/what-is-application-proxy

### 28.2 — Continuous Access Evaluation (CAE)

**Definição:** CAE permite que serviços compatíveis reajam mais rapidamente a determinados eventos e mudanças de política; o comportamento depende da implementação.

**Objetivo profissional:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Global Secure Access. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Identifique um evento crítico compatível
2. Compare tokens válidos com revogação de sessão
3. Modele latência e limites de propagação
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Linha temporal com evento, alteração de decisão e limitações reais. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation

### 28.3 — Authentication context

**Definição:** Authentication context permite associar exigências adicionais de acesso condicional a operações ou recursos específicos em aplicações compatíveis.

**Objetivo profissional:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Global Secure Access. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Defina operação de leitura geral e aprovação sensível
2. Vincule contexto de autenticação a ação sensível em arquitetura fictícia
3. Verifique a decisão de step-up
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Mapa recurso-contexto-política com duas decisões e requisitos de integração. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-authentication-context

### 28.4 — Protected actions

**Definição:** Operações administrativas protegidas podem exigir critérios adicionais por Conditional Access; não equivalem a proteger toda ação de API.

**Objetivo profissional:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Global Secure Access. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Identifique alteração administrativa sensível
2. Modele contexto de autenticação para ação protegida
3. Teste em tenant elegível ou descreva comportamento de rejeição
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de operações protegidas, permissões e autenticação exigida. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/protected-actions-overview

### 28.5 — Global Secure Access: arquitetura

**Definição:** Global Secure Access integra identidade e acesso de rede; Entra Private Access e Internet Access não substituem as funções de um IdP.

**Objetivo profissional:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Global Secure Access. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Identifique usuários, dispositivos, app privado e tráfego internet
2. Desenhe política de tráfego e controle de acesso
3. Documente dependências e licenças
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Diagrama distinguindo autenticação de tráfego, roteamento e autorização de aplicação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access

### 28.6 — Entra Private Access

**Definição:** Private Access oferece acesso orientado a identidade a aplicações privadas sob políticas e conectividade configurada.

**Objetivo profissional:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Global Secure Access. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Escolha aplicação fictícia interna
2. Modele conector e segmentação de destinos
3. Compare usuário atribuído e não atribuído
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Diagrama de políticas e condição de rede com decisão permitida/negada. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/global-secure-access/concept-private-access

### 28.7 — Entra Internet Access

**Definição:** Internet Access aplica políticas de acesso a tráfego para destinos suportados, com distinção de proteção web e autorização da aplicação.

**Objetivo profissional:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Global Secure Access. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Identifique categorias de destino fictícias
2. Modele política para grupo de teste
3. Analise efeito em conexão e exceção de rede
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Tabela política-destino-grupo com análise de bloqueio e rollback. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/global-secure-access/concept-internet-access

### 28.8 — Perfis de tráfego e cliente Global Secure Access

**Definição:** Clientes, perfis e encaminhamento determinam que tráfego passa pelos controles Global Secure Access.

**Objetivo profissional:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Global Secure Access. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe perfil para tráfego Microsoft 365
2. Identifique configuração de cliente em dispositivo de teste
3. Modele conectividade perdida e retirada segura do perfil
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Checklist de rota, usuário, dispositivo, logs e restauração de conexão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client

## 21 · Azure RBAC e autorização de recursos

**Fase:** 03 · Plataformas e automação. **Objetivo:** Entenda escopos e atribuições efetivas de autorização para recursos cloud.

**Ponto conceitual principal:** Aprenda management group, subscription, resource group, role assignment, escopo e herança.

**Risco de interpretação:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

### 21.1 — Tenant versus subscription versus management group

**Definição:** Organização, tenant, grupos de gerenciamento e assinaturas controlam limites diferentes.

**Objetivo profissional:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Azure RBAC. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe árvore de recursos Azure fictícios
2. Indique limites de tenant e assinatura
3. Identifique onde atribuir governança
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Hierarquia contendo management group, subscription e resource group. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

### 21.2 — Azure RBAC: principal, role e scope

**Definição:** Uma atribuição de função Azure conecta principal de segurança, definição de permissões e escopo.

**Objetivo profissional:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Azure RBAC. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie role assignment de leitor em sandbox ou modelo
2. Compare acesso no resource group e subscription
3. Revogue acesso de teste
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Tabela de permissões efetivas dentro e fora do escopo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

### 21.3 — Roles predefinidas versus roles customizadas

**Definição:** Funções personalizadas podem minimizar permissões, mas aumentam responsabilidade de manutenção.

**Objetivo profissional:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Azure RBAC. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare Reader, Contributor e Owner
2. Modele função custom de leitura mínima
3. Justifique ações permitidas e negadas
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Definição de ações e não ações alinhada ao caso de uso. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

### 21.4 — NotActions e permissões efetivas

**Definição:** Em Azure, NotActions não é explicit deny e não revoga permissões concedidas por outras role assignments.

**Objetivo profissional:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Azure RBAC. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Analise role definition com NotActions
2. Adicione atribuição alternativa no cenário fictício
3. Calcule conjunto efetivo de ações
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Demonstração de por que NotActions não é explicit deny. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

### 21.5 — Azure Policy versus Azure RBAC

**Definição:** Azure Policy avalia regras de configuração e conformidade, enquanto Azure RBAC decide permissão do principal.

**Objetivo profissional:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Azure RBAC. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare exemplo de criação de recurso com policy e RBAC
2. Modele negação de política
3. Explique o ponto de avaliação
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Tabela controle preventivo de configuração versus autorização de usuário. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

### 21.6 — Managed identities no Azure

**Definição:** Identidades gerenciadas fornecem credenciais por plataforma para workloads, reduzindo segredos estáticos.

**Objetivo profissional:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Azure RBAC. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie ou desenhe managed identity de laboratório
2. Atribua leitura mínima a recurso sandbox
3. Teste acesso sem secret no código
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Evidência de identidade, escopo e acesso restrito. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview

### 21.7 — Azure Key Vault com RBAC

**Definição:** Segredos devem ser acessíveis só a workloads e operadores autorizados, com logs e rotação.

**Objetivo profissional:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Azure RBAC. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele cofre com segredo fictício
2. Conceda role mínima a managed identity
3. Prove acesso negado a outro principal
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de operações permitido/negado e log de acesso. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide

### 21.8 — Azure PIM para recursos

**Definição:** Acesso privilegiado a recursos Azure pode ser elegível ou temporário conforme configuração e licença.

**Objetivo profissional:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Azure RBAC. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele função elevada temporária
2. Defina aprovação e justificativa
3. Demonstre remoção ao expirar ou simule estado
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Linha do tempo antes/durante/depois da elevação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

### 21.9 — Governança com escopos e tags

**Definição:** Organização cloud combina estrutura de recursos, políticas e rastreabilidade de proprietários.

**Objetivo profissional:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Azure RBAC. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Defina tags ambiente e owner
2. Associe papéis por escopo e workload
3. Revise atribuições herdadas
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Inventário com owner, função, escopo e exceção. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

### 21.10 — Azure Activity Log e auditoria RBAC

**Definição:** Mudanças de role assignment podem ser investigadas por eventos de gerenciamento e contexto do ator.

**Objetivo profissional:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Azure RBAC. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Altere atribuição em sandbox ou examine eventos de exemplo
2. Filtre operações de autorização
3. Relacione autor, horário e escopo
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Registro de auditoria de concessão e remoção sem dados reais. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

## 10 · Cloud IAM e identidades de workload

**Fase:** 03 · Plataformas e automação. **Objetivo:** Recursos cloud e aplicações devem receber somente permissões necessárias e temporárias.

**Ponto conceitual principal:** Compare permission policy e trust policy, assunção de role, escopo e tokens temporários.

**Risco de interpretação:** Uma role confiável para uma identidade não significa autorização irrestrita.

### 10.1 — AWS IAM policies, roles e STS

**Definição:** Trust policy controla quem assume role; permission policy controla as ações permitidas depois da assunção.

**Objetivo profissional:** Permissões amplas permitem movimentação indevida; trust policy controla quem pode assumir role.

**Pré-requisitos:** Conheça os termos do módulo: Autorização cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie role de leitura em conta sandbox e trust restrito
2. Assuma role pelo principal autorizado
3. Teste operação permitida e AccessDenied.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma role confiável para uma identidade não significa autorização irrestrita.

**Fonte para aprofundamento:** https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

### 10.2 — IAM Identity Center e federação

**Definição:** IAM Identity Center administra atribuições de identidades a contas AWS e apps, inclusive federação corporativa.

**Objetivo profissional:** Centraliza acessos humanos multi-account sem distribuir usuários IAM individuais.

**Pré-requisitos:** Conheça os termos do módulo: Autorização cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Em organização de laboratório, crie permission set mínimo
2. Atribua usuário/grupo de teste a conta sandbox
3. Confirme acesso federado e remova atribuição.

**Critério de aceite:** Critério de aceite: Em organização de laboratório, crie permission set mínimo; Confirme acesso federado e remova atribuição.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma role confiável para uma identidade não significa autorização irrestrita.

**Fonte para aprofundamento:** https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html

### 10.3 — Service principals e managed identities

**Definição:** Service principal representa aplicação/workload; managed identity gerencia credenciais em Azure de forma integrada.

**Objetivo profissional:** Permite reduzir segredos fixos em serviços que chamam APIs e recursos cloud.

**Pré-requisitos:** Conheça os termos do módulo: Autorização cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Habilite identidade gerenciada de VM/app de laboratório
2. Conceda role mínima num recurso sandbox
3. Use token da identidade e revogue role.

**Critério de aceite:** Critério de aceite: Habilite identidade gerenciada de VM/app de laboratório; Use token da identidade e revogue role.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma role confiável para uma identidade não significa autorização irrestrita.

**Fonte para aprofundamento:** https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

### 10.4 — Credenciais temporárias e auditoria

**Definição:** Tokens e credenciais de sessão têm validade curta e permitem rastrear ações por principal.

**Objetivo profissional:** Reduz exposição de chaves permanentes e auxilia investigação após incidentes.

**Pré-requisitos:** Conheça os termos do módulo: Autorização cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Gere credenciais temporárias somente em sandbox
2. Observe expiração e tentativa posterior
3. Correlacione a ação a evento no log de auditoria.

**Critério de aceite:** Relaciona evidência, causa provável, correção e novo teste.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Uma role confiável para uma identidade não significa autorização irrestrita.

**Fonte para aprofundamento:** https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

## 22 · Identidades não humanas e federação de workloads

**Fase:** 03 · Plataformas e automação. **Objetivo:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração.

**Ponto conceitual principal:** Diferencie principal, identidade gerenciada, segredo, credenciais temporárias e federação OIDC.

**Risco de interpretação:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

### 22.1 — Service principal e application object

**Definição:** Application object descreve o aplicativo; service principal representa a instância local e suas permissões.

**Objetivo profissional:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidade de workloads. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Inspecione registro de aplicação e enterprise application
2. Compare IDs distintos
3. Desenhe consentimento e escopo
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Diagrama de objeto, instância, owners e permissões. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

### 22.2 — Client credentials e application permissions

**Definição:** Aplicações sem usuário usam credenciais de cliente e autorização apropriada, não ID token de login humano.

**Objetivo profissional:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidade de workloads. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele app daemon
2. Liste fluxo client credentials
3. Compare acesso mínimo e excesso de app roles
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo com principal, token de acesso e validação de escopo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

### 22.3 — Managed identity system-assigned versus user-assigned

**Definição:** A identidade de workload pode seguir ciclo de vida do recurso ou ser reutilizada controladamente.

**Objetivo profissional:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidade de workloads. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare os dois modelos em diagrama Azure
2. Relacione ownership e descarte
3. Escolha para pipeline fictício
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Decisão justificada entre identidades system/user assigned. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

### 22.4 — Workload identity federation e OIDC

**Definição:** Trust deve restringir issuer, subject e audience; federação minimiza segredos estáticos quando bem implementada.

**Objetivo profissional:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidade de workloads. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe pipeline GitHub para Azure com OIDC
2. Configure ou simule subject/issuer/audience
3. Identifique erro por subject incorreto
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Trust policy com emissor, público, assunto e teste negado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation

### 22.5 — Rotação e expiração de credenciais

**Definição:** Chaves e certificados estáticos representam risco operacional e exigem inventário e rotação planejada.

**Objetivo profissional:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidade de workloads. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Inventarie credenciais fictícias de apps
2. Crie alerta de expiração proposto
3. Simule rotação com sobreposição controlada
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Runbook com owner, prazo, validação e revogação antiga. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

### 22.6 — Contas de serviço e ownership

**Definição:** Identidades de serviço sem responsável tendem a acumular privilégios e sobreviver às aplicações.

**Objetivo profissional:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidade de workloads. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie inventário de cinco service accounts fictícias
2. Associe owner e propósito
3. Proponha ciclo JML de workload
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Inventário com dono, escopos, expiração e desativação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

### 22.7 — Agentes de IA e machine identity

**Definição:** Agentes automatizados devem receber identidade própria, autorização contextual e registro de ações.

**Objetivo profissional:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidade de workloads. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Defina agente que lê tickets fictícios
2. Modele privilégios mínimos por tarefa
3. Teste decisão de ação proibida no papel
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de identidade do agente, delegação e auditoria. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

### 22.8 — Token exchange e on-behalf-of

**Definição:** Delegação entre APIs exige distinguir identidade do usuário e permissão do serviço intermediário.

**Objetivo profissional:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidade de workloads. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe aplicação cliente, API A e API B
2. Compare token forwarding e fluxo OBO
3. Identifique validações por audiência
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo seguro e rejeição de token com audience incorreto. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

### 22.9 — CIEM e revisão de privilégios multi-cloud

**Definição:** CIEM avalia direitos de acesso efetivos em clouds e identifica permissões ociosas ou excessivas.

**Objetivo profissional:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Identidade de workloads. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare três workloads fictícias
2. Calcule permissões concedidas versus usadas
3. Proponha redução e revisão de owners
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Relatório de privilégio excessivo e plano de remediação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

## 11 · SCIM e provisionamento JML

**Fase:** 03 · Plataformas e automação. **Objetivo:** A automação sincroniza o ciclo de vida de usuários e acessos entre RH, diretórios e aplicações.

**Ponto conceitual principal:** Separe contrato de atributos, matching, idempotência, desativação e retries.

**Risco de interpretação:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

### 11.1 — SCIM Users

**Definição:** SCIM sincroniza contas por API padronizada; active=false não deve ser confundido com exclusão definitiva.

**Objetivo profissional:** Habilita criação, consulta e desativação de identidades sem scripts proprietários.

**Pré-requisitos:** Conheça os termos do módulo: SCIM e integração. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Em servidor SCIM de teste envie POST /Users com userName
2. Faça GET /Users e encontre id
3. Defina active=false e valide mudança.

**Critério de aceite:** Interpreta id, userName e active.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc7643

### 11.2 — SCIM Groups

**Definição:** Grupos SCIM sincronizam associações; a autorização final ainda depende do aplicativo de destino.

**Objetivo profissional:** Permite sincronizar membership entre diretório de origem e aplicações.

**Pré-requisitos:** Conheça os termos do módulo: SCIM e integração. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie Group por POST /Groups
2. Adicione membro com referência ao id de User
3. Consulte membership e remova membro.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc7643

### 11.3 — REST e SCIM

**Definição:** SCIM 2.0 usa HTTP, JSON e schema padronizado para provisionamento de identidades.

**Objetivo profissional:** Endpoints e erros consistentes facilitam integrações de ciclo de vida.

**Pré-requisitos:** Conheça os termos do módulo: SCIM e integração. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Teste GET /ServiceProviderConfig em servidor simulado
2. Envie requisição autenticada a /Users
3. Examine schema e códigos 201, 400 e 401.

**Critério de aceite:** Critério de aceite: Teste GET /ServiceProviderConfig em servidor simulado; Examine schema e códigos 201, 400 e 401.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc7644

### 11.4 — PATCH

**Definição:** PATCH SCIM permite atualizar atributos e operações específicas segundo RFC 7644, com idempotência analisada.

**Objetivo profissional:** Evita substituir todo cadastro ao mudar apenas um atributo.

**Pré-requisitos:** Conheça os termos do módulo: SCIM e integração. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Envie PATCH replace para active=false em usuário fictício
2. Confira resposta e GET do recurso
3. Repita operação e verifique estado.

**Critério de aceite:** Critério de aceite: Envie PATCH replace para active=false em usuário fictício; Repita operação e verifique estado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc7644

### 11.5 — Filtros SCIM

**Definição:** Filtros SCIM selecionam objetos com operadores padronizados, como userName eq "alice".

**Objetivo profissional:** Ajudam localizar conta existente antes de criar e evitam duplicações.

**Pré-requisitos:** Conheça os termos do módulo: SCIM e integração. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie dois usuários no mock SCIM
2. Faça GET /Users?filter=userName%20eq%20%22alice%22
3. Compare resultado com filtro inexistente.

**Critério de aceite:** Critério de aceite: Crie dois usuários no mock SCIM; Compare resultado com filtro inexistente.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc7644

### 11.6 — Paginação

**Definição:** Paginação em SCIM usa startIndex e count para limitar consultas de coleções.

**Objetivo profissional:** Sem paginação, importações grandes podem falhar ou omitir identidades.

**Pré-requisitos:** Conheça os termos do módulo: SCIM e integração. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie conjunto de usuários fictícios
2. Consulte primeira e segunda páginas
3. Use totalResults para verificar quantidade recuperada.

**Critério de aceite:** Critério de aceite: Crie conjunto de usuários fictícios; Use totalResults para verificar quantidade recuperada.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc7644

### 11.7 — Provisionamento e desprovisionamento

**Definição:** Provisionamento concede/cria conta no destino; desprovisionamento remove ou desativa acesso após mudança ou saída.

**Objetivo profissional:** Ciclo JML incompleto cria contas órfãs ou acessos indevidos.

**Pré-requisitos:** Conheça os termos do módulo: SCIM e integração. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Associe usuário de laboratório a app com SCIM
2. Observe criação na API destino
3. Retire atribuição/desative conta e verifique resultado.

**Critério de aceite:** Critério de aceite: Associe usuário de laboratório a app com SCIM; Retire atribuição/desative conta e verifique resultado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc7644

### 11.8 — Reexecução idempotente e tratamento de falhas

**Definição:** Retry precisa evitar criar contas duplicadas ou reativar indevidamente identidades desativadas.

**Objetivo profissional:** Impede duplicação de usuários quando integração falha após resposta ou timeout.

**Pré-requisitos:** Conheça os termos do módulo: SCIM e integração. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Simule timeout após criação fictícia
2. Reexecute com busca por identificador estável
3. Confirme que não houve usuário duplicado.

**Critério de aceite:** Relaciona evidência, causa provável, correção e novo teste.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte para aprofundamento:** https://www.rfc-editor.org/rfc/rfc7644

## 12 · IGA e revisão de acessos

**Fase:** 03 · Plataformas e automação. **Objetivo:** Governança verifica se permissões continuam apropriadas e justificadas ao longo do tempo.

**Ponto conceitual principal:** Trabalhe catálogo, ownership, solicitação, aprovação, recertificação, segregação e expiração.

**Risco de interpretação:** Marcar acesso revisado sem aplicar remoção é evidência incompleta.

### 12.1 — Catálogo de acessos e ownership

**Definição:** Catálogo lista entitlements, aplicações, descrição, proprietário e critérios de concessão.

**Objetivo profissional:** Sem owner não há quem aprove nem valide necessidade dos direitos.

**Pré-requisitos:** Conheça os termos do módulo: Governança de direitos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Cadastre 5 entitlements de app fictício
2. Associe owner e risco
3. Mostre quem pode solicitar e aprovar cada direito.

**Critério de aceite:** Critério de aceite: Cadastre 5 entitlements de app fictício; Mostre quem pode solicitar e aprovar cada direito.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Marcar acesso revisado sem aplicar remoção é evidência incompleta.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/

### 12.2 — Access requests e aprovações

**Definição:** Aprovação deve ser feita pelo owner autorizado; aprovação não elimina necessidade de expiração e revisão.

**Objetivo profissional:** Evita concessão informal e preserva justificativa e rastreabilidade.

**Pré-requisitos:** Conheça os termos do módulo: Governança de direitos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie pedido fictício para role específica
2. Atribua aprovador legítimo
3. Execute concessão, registre duração e evidência.

**Critério de aceite:** Critério de aceite: Crie pedido fictício para role específica; Execute concessão, registre duração e evidência.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Marcar acesso revisado sem aplicar remoção é evidência incompleta.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/

### 12.3 — Recertificação e evidências

**Definição:** A decisão de revisão e a implementação da retirada de acesso são eventos separados e devem ser confirmados.

**Objetivo profissional:** Permite revogar excessos e demonstrar decisões em auditoria.

**Pré-requisitos:** Conheça os termos do módulo: Governança de direitos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Gere lista de 10 acessos fictícios
2. Marque manter ou revogar com justificativa
3. Aplique revogações no laboratório e guarde evidência.

**Critério de aceite:** Critério de aceite: Gere lista de 10 acessos fictícios; Aplique revogações no laboratório e guarde evidência.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Marcar acesso revisado sem aplicar remoção é evidência incompleta.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/

### 12.4 — SoD, contas órfãs e compliance

**Definição:** SoD identifica conflitos, contas órfãs carecem de owner e compliance exige controles demonstráveis.

**Objetivo profissional:** Risco cresce com acessos conflitantes sem titular ou revisão.

**Pré-requisitos:** Conheça os termos do módulo: Governança de direitos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare inventário fictício de RH e aplicações
2. Encontre conta sem vínculo ativo
3. Detecte conflito Aprovar/Solicitar e proponha remediação.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Marcar acesso revisado sem aplicar remoção é evidência incompleta.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/

## 23 · Entra Identity Governance em profundidade

**Fase:** 04 · Governança e defesa. **Objetivo:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis.

**Ponto conceitual principal:** Associe catálogo e access package a owner, período, aprovação, revisão e ciclo de vida.

**Risco de interpretação:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

### 23.1 — Access packages e catálogos

**Definição:** Catálogo organiza recursos; access package define conjunto e condições para concessão governada.

**Objetivo profissional:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: IGA em Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe catálogo para equipe de finanças
2. Crie ou simule access package
3. Defina recursos e patrocinador
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Catálogo e pacote com proprietário, público e recursos autorizados. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

### 23.2 — Entitlement Management: políticas e expiração

**Definição:** Políticas controlam quem pode solicitar, aprovar e por quanto tempo mantém acesso.

**Objetivo profissional:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: IGA em Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Defina solicitação de usuário interno
2. Inclua aprovação e validade
3. Simule prazo expirado e retirada automática
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo de aprovação e evidência de expiração. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

### 23.3 — Access Reviews e recertificação

**Definição:** Revisão pode indicar remoção, mas acesso só muda quando a decisão é aplicada de acordo com política.

**Objetivo profissional:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: IGA em Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie campanha fictícia trimestral
2. Defina revisores e regras para não resposta
3. Aplique decisões simuladas de remover/manter
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Resultado auditável por acesso, revisor e justificativa. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

### 23.4 — Lifecycle Workflows

**Definição:** Workflows automatizam tarefas condicionadas a eventos de entrada, mudança e saída do colaborador.

**Objetivo profissional:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: IGA em Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele workflow Joiner
2. Liste gatilhos e etapas
3. Simule falha de provisionamento e retentativa
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxograma de estados com erro, compensação e auditoria. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

### 23.5 — Fonte autoritativa de RH

**Definição:** Dados mestres de identidade demandam contrato de atributos, transformação e política de atualização.

**Objetivo profissional:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: IGA em Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Defina CSV fictício de RH
2. Mapeie atributo estável e cargo
3. Teste Mover sem recriar usuário
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Contrato de atributos, regra de correlação e validação da mudança. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

### 23.6 — Provisionamento API-driven

**Definição:** Provisionamento por API depende de validação, escopo de origem e tratamento de eventos repetidos.

**Objetivo profissional:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: IGA em Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe endpoint de entrada e worker
2. Modele payload fictício
3. Simule duplicidade, retry e resultado idempotente
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Tabela de idempotência e erros tratados. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

### 23.7 — Reconciliação e contas órfãs

**Definição:** Reconciliar contas entre RH, diretório e aplicações encontra exceções no estado real de concessões.

**Objetivo profissional:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: IGA em Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare três inventários fictícios
2. Detecte conta sem vínculo e privilégio não aprovado
3. Registre decisão e responsável
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Relatório de exceções com remediação priorizada. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

### 23.8 — Segregação de funções preventiva e detectiva

**Definição:** SoD pode bloquear concessão incompatível ou detectar conflito existente para remediação.

**Objetivo profissional:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: IGA em Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele solicitar/aprovar pagamento
2. Crie matriz de conflito e exceção
3. Simule aprovação indevida e correção
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de risco SoD e evidências de controle preventivo/detectivo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

### 23.9 — Privileged Identity Management (PIM)

**Definição:** PIM reduz privilégios permanentes ao usar papéis elegíveis, ativação justificada e auditoria.

**Objetivo profissional:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: IGA em Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele função privilegiada temporária
2. Configure ativação elegível se disponível
3. Demonstre expiração e log
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Cronograma de elegibilidade, ativação e revogação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

### 23.10 — Métricas de governança e evidências

**Definição:** Governança precisa indicadores como contas órfãs, recertificações atrasadas e acessos privilegiados permanentes.

**Objetivo profissional:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: IGA em Entra. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Defina cinco indicadores IAM com origem de dados
2. Calcule amostra fictícia
3. Proponha metas e responsáveis
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Painel com fórmula, fonte, periodicidade e ação corretiva. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

## 13 · PAM, PIM e JIT

**Fase:** 04 · Governança e defesa. **Objetivo:** Privilégios elevados exigem controle adicional, registro e duração limitada.

**Ponto conceitual principal:** Distinga cofre/segredo, sessão privilegiada, PIM e JIT; acompanhe ativação e expiração.

**Risco de interpretação:** Vault dev é inadequado para segredos reais ou produção.

### 13.1 — Cofre e gestão de segredos

**Definição:** Cofre guarda senhas, chaves e tokens com controle de acesso e auditoria.

**Objetivo profissional:** Segredos espalhados em arquivos e scripts elevam risco de vazamento.

**Pré-requisitos:** Conheça os termos do módulo: Privilégio e cofre. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Suba Vault dev apenas em VM isolada e compreenda que é inseguro para produção
2. Armazene segredo fictício
3. Controle política de leitura e confira logs.

**Critério de aceite:** Critério de aceite: Suba Vault dev apenas em VM isolada e compreenda que é inseguro para produção; Controle política de leitura e confira logs.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Vault dev é inadequado para segredos reais ou produção.

**Fonte para aprofundamento:** https://developer.hashicorp.com/vault/docs

### 13.2 — Rotação de credenciais

**Definição:** Rotação troca segredos periodicamente ou após suspeita, invalidando versões antigas.

**Objetivo profissional:** Limita tempo de exposição de senha privilegiada ou token comprometido.

**Pré-requisitos:** Conheça os termos do módulo: Privilégio e cofre. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie conta de serviço fictícia
2. Troque senha e atualize dependente
3. Confira rejeição da credencial anterior.

**Critério de aceite:** Critério de aceite: Crie conta de serviço fictícia; Confira rejeição da credencial anterior.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Vault dev é inadequado para segredos reais ou produção.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

### 13.3 — Onboarding PAM

**Definição:** Onboarding PAM incorpora contas e ativos privilegiados a um cofre e políticas de acesso.

**Objetivo profissional:** Traz identidade responsável, aprovação e registro antes do uso administrativo.

**Pré-requisitos:** Conheça os termos do módulo: Privilégio e cofre. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Inventarie servidor e conta administrativa fictícios
2. Associe owner, cofre e política de acesso
3. Teste solicitação e revogação do acesso.

**Critério de aceite:** Critério de aceite: Inventarie servidor e conta administrativa fictícios; Teste solicitação e revogação do acesso.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Vault dev é inadequado para segredos reais ou produção.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

### 13.4 — Contas de serviço

**Definição:** Contas de serviço são identidades não humanas usadas por serviços, jobs e aplicações.

**Objetivo profissional:** Senhas estáticas, falta de owner e excesso de privilégios são riscos comuns.

**Pré-requisitos:** Conheça os termos do módulo: Privilégio e cofre. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie serviço fictício com conta dedicada
2. Restrinja acesso a um recurso
3. Registre owner e plano de rotação ou identidade gerenciada.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Vault dev é inadequado para segredos reais ou produção.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

### 13.5 — Sessões privilegiadas e auditoria

**Definição:** Sessão privilegiada permite executar tarefas administrativas com rastreio de executor e ações.

**Objetivo profissional:** Registro e controle facilitam investigação de alterações críticas.

**Pré-requisitos:** Conheça os termos do módulo: Privilégio e cofre. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Abra sessão administrativa em host teste usando conta dedicada
2. Execute comando não destrutivo
3. Correlacione horário e identidade nos logs.

**Critério de aceite:** Relaciona evidência, causa provável, correção e novo teste.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Vault dev é inadequado para segredos reais ou produção.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

### 13.6 — JIT, break-glass e revisão

**Definição:** JIT fornece privilégio temporário; break-glass é recuperação excepcional monitorada, não um atalho operacional.

**Objetivo profissional:** Evita privilégios permanentes sem comprometer recuperação de incidentes.

**Pré-requisitos:** Conheça os termos do módulo: Privilégio e cofre. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele aprovação de role por uma hora em lab
2. Confirme expiração ou remoção
3. Documente controle e revisão do acesso emergencial.

**Critério de aceite:** Critério de aceite: Modele aprovação de role por uma hora em lab; Documente controle e revisão do acesso emergencial.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Vault dev é inadequado para segredos reais ou produção.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

## 24 · Microsoft Purview e controle de acesso a dados

**Fase:** 04 · Governança e defesa. **Objetivo:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação.

**Ponto conceitual principal:** Classifique informação, atribua Sensitivity Labels e avalie DLP e proteção criptográfica.

**Risco de interpretação:** Classificação e DLP não equivalem a IAM de usuário.

### 24.1 — Classificação e inventário da informação

**Definição:** A classificação atribui níveis de sensibilidade a dados para orientar proteção e acesso.

**Objetivo profissional:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Purview e dados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie três classes para documentos fictícios
2. Defina proprietário e categoria
3. Teste classificação manual em amostras
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Taxonomia de dados com regras de leitura e armazenamento. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/purview/information-protection

### 24.2 — Sensitivity labels

**Definição:** Rótulos de sensibilidade podem aplicar marcas, configurações de proteção e outros efeitos conforme workload.

**Objetivo profissional:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Purview e dados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Defina etiqueta Confidencial
2. Configure em ambiente elegível ou simule
3. Compare experiência de acesso autorizado e não autorizado
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Rótulo com finalidade, escopo e efeito de proteção. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/purview/information-protection

### 24.3 — Criptografia e direitos associados a rótulos

**Definição:** Proteção de dados pode restringir abertura e uso por identidades ou grupos, independentemente do local do arquivo.

**Objetivo profissional:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Purview e dados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Projete arquivo criptografado para grupo projeto
2. Compare destinatário permitido e não permitido
3. Documente revogação e limitações
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de permissão para leitura e edição de documento. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/purview/information-protection

### 24.4 — Data Loss Prevention (DLP)

**Definição:** DLP identifica e restringe ações de dados sensíveis em locais suportados; não substitui IAM.

**Objetivo profissional:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Purview e dados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Escreva regra para dado fictício de cartão
2. Compare evento apenas auditado e bloqueado
3. Analise falsos positivos
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Regra DLP, cenário de detecção e justificativa do controle. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/purview/information-protection

### 24.5 — Tipos de informações sensíveis e trainable classifiers

**Definição:** Detecção pode usar padrões de dados estruturados e classificadores treinados sob controles de precisão e privacidade.

**Objetivo profissional:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Purview e dados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare correspondência por padrão e por conteúdo
2. Desenhe teste com dados sintéticos
3. Avalie falso positivo/falso negativo
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Plano de teste com exemplos sintéticos e critérios de precisão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/purview/information-protection

### 24.6 — Data lifecycle e retention

**Definição:** Retenção e eliminação de conteúdo obedecem política e obrigações legais e devem ser distintas de revogação de conta.

**Objetivo profissional:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Purview e dados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie tabela de retenção de três classes
2. Simule desligamento de usuário
3. Distinga retenção de dados e exclusão de identidade
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Tabela com evento gatilho, prazo e responsável por descarte. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/purview/information-protection

### 24.7 — eDiscovery e investigação

**Definição:** Investigação de conteúdo exige segregação de funções, autorização e trilha de auditoria.

**Objetivo profissional:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Purview e dados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele investigação com custodiante fictício
2. Defina escopo e aprovadores
3. Revise quem pode coletar e visualizar evidências
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: RACI e trilha de acesso à evidência com mínimo privilégio. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/purview/information-protection

### 24.8 — Purview RBAC e separação administrativa

**Definição:** O acesso administrativo no Purview tem papéis e permissões próprios, distintos de Azure RBAC.

**Objetivo profissional:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Purview e dados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare roles do Purview e Entra
2. Modele analista DLP e administrador global
3. Identifique concessões desnecessárias
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de funções e impacto de privilégio excessivo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/purview/information-protection

### 24.9 — Proteção de informações em endpoints

**Definição:** Políticas de dados podem se estender a ações locais em dispositivos sob condições de licenciamento e integração.

**Objetivo profissional:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Purview e dados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe fluxo documento -> endpoint -> cópia externa
2. Identifique sinais e ações de política
3. Modele alerta e triagem
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo de controle e evidências esperadas sem dados reais. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/purview/information-protection

### 24.10 — Interação entre Entra, Intune e Purview

**Definição:** Identidade, estado de dispositivo e classificação de dados são sinais e mecanismos diferentes que se complementam.

**Objetivo profissional:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Purview e dados. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe usuário em dispositivo gerenciado acessando arquivo protegido
2. Defina decisão IAM e política do dado
3. Compare duas falhas independentes
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Arquitetura com camada de identidade, dispositivo e proteção de informação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/purview/information-protection

## 14 · Logs, diagnóstico e ITSM

**Fase:** 04 · Governança e defesa. **Objetivo:** IAM também envolve investigar falhas, mudanças e incidentes sem interromper usuários.

**Ponto conceitual principal:** Siga hipótese, coleta, correlação, diagnóstico, correção e revalidação.

**Risco de interpretação:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

### 14.1 — Logs IdP

**Definição:** Logs do IdP registram tentativas de autenticação, fatores e decisões de política.

**Objetivo profissional:** Ajudam separar credencial inválida de erro de aplicação/federação.

**Pré-requisitos:** Conheça os termos do módulo: Operação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Efetue login válido e inválido
2. Filtre por usuário fictício e horário
3. Descreva código/mensagem e causa.

**Critério de aceite:** Relaciona evidência, causa provável, correção e novo teste.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

### 14.2 — Logs Active Directory

**Definição:** Windows registra eventos relacionados a logon, alteração de contas e auditoria de diretório.

**Objetivo profissional:** Sem correlação de eventos é difícil apurar alterações indevidas e falhas Kerberos.

**Pré-requisitos:** Conheça os termos do módulo: Operação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Faça login em conta de domínio teste
2. Inspecione eventos pertinentes no Security
3. Compare máquina origem e evento de sucesso/falha.

**Critério de aceite:** Relaciona evidência, causa provável, correção e novo teste.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

### 14.3 — Logs Entra ID

**Definição:** Sign-in e audit logs do Entra registram entrada, status, políticas e mudanças administrativas.

**Objetivo profissional:** São base do diagnóstico de MFA, Conditional Access e incidentes cloud.

**Pré-requisitos:** Conheça os termos do módulo: Operação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Entre com usuário teste e filtre evento
2. Leia política e status de MFA
3. Compare com tentativa bloqueada.

**Critério de aceite:** Relaciona evidência, causa provável, correção e novo teste.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

### 14.4 — Diagnóstico SAML

**Definição:** Erro SAML pode envolver ACS, audience, certificado, assinatura ou validade temporal.

**Objetivo profissional:** Uma divergência entre IdP e SP impede login mesmo com senha correta.

**Pré-requisitos:** Conheça os termos do módulo: Operação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Faça login funcional em app SAML isolado
2. Altere ACS de teste e reproduza falha
3. Restaure URL e valide recuperação.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

### 14.5 — Diagnóstico OIDC

**Definição:** OIDC depende de issuer, redirect URI, client, scope e validação de tokens.

**Objetivo profissional:** Erros nesses elementos geram callback rejeitado ou token não aceito.

**Pré-requisitos:** Conheça os termos do módulo: Operação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Registre redirect URI válido
2. Faça login e capture código de erro de callback inválido
3. Corrija URI e repita.

**Critério de aceite:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

### 14.6 — Diagnóstico SCIM

**Definição:** SCIM falha por mapeamento de atributo, autorização, schema ou status HTTP.

**Objetivo profissional:** Falhas podem impedir desprovisionamento e criar divergências entre origens e destinos.

**Pré-requisitos:** Conheça os termos do módulo: Operação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Provoque HTTP 401 em servidor SCIM de teste
2. Consulte resposta e logs do provisionador
3. Restaure token e reexecute sincronização.

**Critério de aceite:** Relaciona evidência, causa provável, correção e novo teste.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

### 14.7 — Gestão de incidentes e mudanças

**Definição:** Incidente exige restaurar serviço afetado; mudança controla alterações para minimizar interrupções.

**Objetivo profissional:** IAM é crítico para acesso corporativo e alterações podem bloquear usuários em massa.

**Pré-requisitos:** Conheça os termos do módulo: Operação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie incidente fictício de falha SSO
2. Abra mudança com teste e janela
3. Defina responsáveis e plano de comunicação.

**Critério de aceite:** Critério de aceite: Crie incidente fictício de falha SSO; Defina responsáveis e plano de comunicação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

### 14.8 — Runbooks, rollback e evidências

**Definição:** Runbook define passos operacionais; rollback reverte mudança para estado funcional; evidências provam ações.

**Objetivo profissional:** Procedimentos reproduzíveis encurtam indisponibilidade e melhoram auditoria.

**Pré-requisitos:** Conheça os termos do módulo: Operação. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Escreva runbook de configuração OIDC no laboratório
2. Anote verificação e rollback
3. Simule retorno à configuração anterior.

**Critério de aceite:** Critério de aceite: Escreva runbook de configuração OIDC no laboratório; Simule retorno à configuração anterior.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

## 25 · KQL, telemetria e investigação IAM

**Fase:** 04 · Governança e defesa. **Objetivo:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis.

**Ponto conceitual principal:** Separe SigninLogs, AuditLogs e provisioning logs; consulte tipos e schemas corretos no workspace.

**Risco de interpretação:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

### 25.1 — Sign-in logs e tipos de entrada

**Definição:** Registros de login humano, não interativo e de service principals têm semânticas diferentes.

**Objetivo profissional:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Observabilidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Colete eventos de usuário teste
2. Identifique tipo, app, status e correlation ID
3. Compare duas tentativas com resultados diferentes
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Linha do tempo com entidade, app e resultado de cada login. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/kusto/query/

### 25.2 — Audit logs de identidade

**Definição:** Eventos de auditoria registram alteração administrativa e ajudam a atribuir autoria e efeito de mudanças.

**Objetivo profissional:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Observabilidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie e remova associação de grupo em lab
2. Filtre eventos de auditoria
3. Identifique alvo, autor e ação
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Par de eventos e explicação da alteração de permissão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/kusto/query/

### 25.3 — KQL: where, project e summarize

**Definição:** KQL permite filtrar, projetar e agregar eventos estruturados de telemetria.

**Objetivo profissional:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Observabilidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Use logs sintéticos em tabela de amostra ou workspace autorizado
2. Filtre falhas de entrada
3. Conte por aplicativo e horário
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Consulta KQL reproduzível e resultado interpretado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/kusto/query/

### 25.4 — KQL: joins e correlação

**Definição:** Joins correlacionam tabelas por identificadores apropriados; campos devem ser confirmados em cada esquema.

**Objetivo profissional:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Observabilidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele eventos de sign-in e auditoria
2. Relacione por usuário/tempo com cautela
3. Documente limites de inferência
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Consulta ou pseudocódigo com ressalva de correlação temporal. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/kusto/query/

### 25.5 — Falhas de Conditional Access

**Definição:** A análise de CA deve considerar políticas aplicáveis, condições e decisões, não somente código de erro de login.

**Objetivo profissional:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Observabilidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Execute tentativa em grupo de teste
2. Examine aba Conditional Access
3. Compare política report-only versus habilitada
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Diagnóstico mostrando política, condição e decisão final. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/kusto/query/

### 25.6 — Falhas de provisionamento SCIM

**Definição:** Logs de provisionamento diferenciam erro de autenticação do conector, mapeamento, conflito e falhas transitórias.

**Objetivo profissional:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Observabilidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Simule POST/PATCH inválido em SCIM lab
2. Observe resposta e retry
3. Corrija mapeamento ou atributo
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Registro de erro, causa provável e recuperação idempotente. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/kusto/query/

### 25.7 — Incidentes de credenciais comprometidas

**Definição:** Resposta a incidentes inclui desabilitação, revogação de sessão, revisão de consentimentos e análise de persistência.

**Objetivo profissional:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Observabilidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie cenário fictício de conta comprometida
2. Escreva contenção em ordem de urgência
3. Documente evidências sem dados sensíveis
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Playbook com decisão, responsável e confirmação de contenção. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/kusto/query/

### 25.8 — Dashboards e indicadores de detecção

**Definição:** Painéis úteis mostram tendências de falha, risco, privilégios e alterações com janelas e fontes definidas.

**Objetivo profissional:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Observabilidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Defina painel de cinco métricas
2. Use amostra sintética para calcular resultados
3. Valide qualidade e ruídos
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Painel e definição operacional de cada indicador. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/kusto/query/

### 25.9 — Retenção, privacidade e cadeia de custódia

**Definição:** Logs podem conter dados pessoais; coletar, armazenar e exportar exige finalidade e acesso restrito.

**Objetivo profissional:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Observabilidade. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Classifique campos de log de identidade
2. Projete política de retenção e exportação
3. Modele preservação de incidente
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Política com acesso, prazo, integridade e descarte de registros. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/kusto/query/

## 02 · Active Directory e Windows Server

**Fase:** 05 · Híbrido e arquitetura. **Objetivo:** Diretórios centralizam objetos e relações de acesso em ambientes corporativos.

**Ponto conceitual principal:** Explique domínios, trust, KDC, TGT/TGS, tickets de serviço e dependência de tempo/DNS.

**Risco de interpretação:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

### 2.1 — AD DS

**Definição:** AD DS oferece diretório e autenticação em domínios Windows, não é o mesmo serviço que Entra ID cloud.

**Objetivo profissional:** Base de identidades Windows em muitas empresas; disponibiliza contas para SSO e controle de acesso.

**Pré-requisitos:** Conheça os termos do módulo: Domínio e Kerberos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Instale AD DS em VM Windows Server isolada
2. Promova servidor a DC de domínio de laboratório com DNS
3. Crie conta de teste e valide login em cliente.

**Critério de aceite:** Critério de aceite: Instale AD DS em VM Windows Server isolada; Crie conta de teste e valide login em cliente.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

### 2.2 — Domínio e floresta

**Definição:** Domínio é limite lógico para objetos e administração; floresta agrega domínios que compartilham esquema e relações de confiança.

**Objetivo profissional:** Desenho influencia administração, autenticação e limites de confiança.

**Pré-requisitos:** Conheça os termos do módulo: Domínio e Kerberos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe domínio único de laboratório
2. Consulte nome de domínio e floresta com PowerShell Get-ADForest/Get-ADDomain
3. Descreva quando precisaria de domínio adicional.

**Critério de aceite:** Critério de aceite: Desenhe domínio único de laboratório; Descreva quando precisaria de domínio adicional.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

### 2.3 — Controladores de domínio

**Definição:** DC mantém cópia replicada do AD DS e atende autenticações e consultas.

**Objetivo profissional:** Sem DC alcançável clientes podem enfrentar falhas de login e políticas.

**Pré-requisitos:** Conheça os termos do módulo: Domínio e Kerberos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Identifique DC com nltest /dsgetdc:<domínio>
2. Execute dcdiag em laboratório
3. Observe registros SRV e saúde do serviço.

**Critério de aceite:** Critério de aceite: Identifique DC com nltest /dsgetdc:<domínio>; Observe registros SRV e saúde do serviço.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

### 2.4 — Organizational Units (OU)

**Definição:** OU organiza objetos do Active Directory e delimita escopo de GPO e delegação.

**Objetivo profissional:** Evita concessão administrativa sobre todo o domínio e organiza políticas.

**Pré-requisitos:** Conheça os termos do módulo: Domínio e Kerberos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie OUs Pessoas e Servidores
2. Mova usuário fictício para OU adequada
3. Aplique GPO de teste apenas a uma OU.

**Critério de aceite:** Critério de aceite: Crie OUs Pessoas e Servidores; Aplique GPO de teste apenas a uma OU.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

### 2.5 — Usuários do AD

**Definição:** Objetos user do AD representam contas autenticáveis no domínio.

**Objetivo profissional:** Estado, grupos e atributos da conta determinam acesso e autenticação.

**Pré-requisitos:** Conheça os termos do módulo: Domínio e Kerberos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie usuário de laboratório via New-ADUser
2. Configure senha inicial segura e habilite conta
3. Desabilite e teste bloqueio de login.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

### 2.6 — Grupos do AD

**Definição:** Grupos de segurança do AD agregam contas para concessão de direitos.

**Objetivo profissional:** RBAC prático depende de grupos bem definidos e revisão dos membros.

**Pré-requisitos:** Conheça os termos do módulo: Domínio e Kerberos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie grupo APP-Leitores
2. Adicione usuário fictício
3. Aplique grupo numa ACL de pasta e valide acesso.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

### 2.7 — GPO

**Definição:** Group Policy Objects definem configurações de computadores e usuários de domínio.

**Objetivo profissional:** Padroniza controles de estação e servidor relevantes à segurança de acesso.

**Pré-requisitos:** Conheça os termos do módulo: Domínio e Kerberos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie GPO de laboratório vinculada à OU
2. Configure política não destrutiva
3. Em cliente execute gpupdate e gpresult /r.

**Critério de aceite:** Critério de aceite: Crie GPO de laboratório vinculada à OU; Em cliente execute gpupdate e gpresult /r.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

### 2.8 — Delegação administrativa

**Definição:** Delegação concede tarefas específicas de administração sobre objetos sem dar domínio inteiro.

**Objetivo profissional:** Reduz uso de Domain Admin e segmenta responsabilidades.

**Pré-requisitos:** Conheça os termos do módulo: Domínio e Kerberos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie grupo Helpdesk-Lab
2. Delegue reset de senhas só numa OU
3. Teste operação dentro e fora do escopo.

**Critério de aceite:** Critério de aceite: Crie grupo Helpdesk-Lab; Teste operação dentro e fora do escopo.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

### 2.9 — Kerberos

**Definição:** Ticket Kerberos prova autenticação para serviço, mas o serviço ainda deve verificar sua autorização.

**Objetivo profissional:** É mecanismo central do logon AD e SSO de serviços internos.

**Pré-requisitos:** Conheça os termos do módulo: Domínio e Kerberos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Faça login com usuário de domínio
2. Execute klist e identifique tickets
3. Acesse compartilhamento para obter ticket de serviço.

**Critério de aceite:** Explica TGT, ticket de serviço e efeito da sincronização de horário.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview

### 2.10 — Tickets Kerberos

**Definição:** TGT demonstra autenticação inicial perante o KDC; service ticket autoriza apresentação a serviço específico.

**Objetivo profissional:** Tipos e validade dos tickets são úteis no diagnóstico de SSO e expiração.

**Pré-requisitos:** Conheça os termos do módulo: Domínio e Kerberos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Examine klist após login
2. Acesse recurso SMB de laboratório
3. Compare TGT e ticket CIFS obtido.

**Critério de aceite:** Critério de aceite: Examine klist após login; Compare TGT e ticket CIFS obtido.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

### 2.11 — Service Principal Names (SPN)

**Definição:** SPN identifica instância de serviço ligada à conta usada pelo Kerberos.

**Objetivo profissional:** SPN duplicado ou inexistente pode impedir autenticação Kerberos de aplicação.

**Pré-requisitos:** Conheça os termos do módulo: Domínio e Kerberos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Consulte setspn -L de conta de serviço fictícia
2. Liste registros no domínio com setspn -Q
3. Documente nome de serviço esperado sem alterar produção.

**Critério de aceite:** Critério de aceite: Consulte setspn -L de conta de serviço fictícia; Documente nome de serviço esperado sem alterar produção.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

### 2.12 — Troubleshooting com DNS e Event Viewer

**Definição:** Diagnóstico AD conecta sintomas de logon a resolução DNS e eventos do Windows.

**Objetivo profissional:** Problema aparente de senha pode ser falta de DC, DNS ou relógio correto.

**Pré-requisitos:** Conheça os termos do módulo: Domínio e Kerberos. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Use nslookup para consultar registros do DC
2. Examine Security/System em Event Viewer
3. Corrija resolução na VM e refaça login.

**Critério de aceite:** Relaciona evidência, causa provável, correção e novo teste.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

## 03 · LDAP e identidades híbridas

**Fase:** 05 · Híbrido e arquitetura. **Objetivo:** LDAP consulta diretórios; ambientes híbridos conectam identidades locais e nuvem.

**Ponto conceitual principal:** Diferencie protocolo LDAP, diretório, identidade sincronizada, PHS, PTA e federação.

**Risco de interpretação:** LDAPS não substitui controles de bind e autorização do objeto consultado.

### 3.1 — Distinguished Name (DN)

**Definição:** DN é caminho único do objeto na árvore LDAP, com componentes como CN, OU e DC.

**Objetivo profissional:** Bind e buscas precisam identificar corretamente onde está o objeto.

**Pré-requisitos:** Conheça os termos do módulo: LDAP e integração híbrida. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Localize DN de usuário no AD ou ldapsearch
2. Decomponha CN/OU/DC
3. Mova objeto de OU em laboratório e observe mudança.

**Critério de aceite:** Critério de aceite: Localize DN de usuário no AD ou ldapsearch; Mova objeto de OU em laboratório e observe mudança.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte para aprofundamento:** https://www.openldap.org/doc/admin26/

### 3.2 — LDAP bind

**Definição:** Bind autentica uma sessão LDAP; permissões de consulta e modificação são avaliadas separadamente.

**Objetivo profissional:** Credenciais e permissões do bind determinam quais objetos o cliente acessa.

**Pré-requisitos:** Conheça os termos do módulo: LDAP e integração híbrida. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Configure diretório com usuário de consulta restrita
2. Execute bind seguro e busca LDAP
3. Troque credencial por inválida e examine resposta.

**Critério de aceite:** Explica credenciais, bind e consultas de diretório.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte para aprofundamento:** https://www.openldap.org/doc/admin26/

### 3.3 — Filtros LDAP

**Definição:** Filtros LDAP selecionam objetos com expressões como (uid=joao) e (&(objectClass=user)(...)).

**Objetivo profissional:** Integrações usam filtros para restringir usuários e grupos sincronizados.

**Pré-requisitos:** Conheça os termos do módulo: LDAP e integração híbrida. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie usuários fictícios de departamentos diferentes
2. Busque com (department=TI) e filtro AND
3. Confira que apenas objetos esperados aparecem.

**Critério de aceite:** Critério de aceite: Crie usuários fictícios de departamentos diferentes; Confira que apenas objetos esperados aparecem.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte para aprofundamento:** https://www.openldap.org/doc/admin26/

### 3.4 — LDAPS

**Definição:** LDAPS protege transporte por TLS; não torna bind nem ACL inerentemente seguros.

**Objetivo profissional:** Impede exposição de credenciais e dados de diretório na rede.

**Pré-requisitos:** Conheça os termos do módulo: LDAP e integração híbrida. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Configure certificado de laboratório no servidor
2. Conecte por LDAPS e valide cadeia
3. Teste cliente que não confia no certificado.

**Critério de aceite:** Critério de aceite: Configure certificado de laboratório no servidor; Teste cliente que não confia no certificado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/enable-ldap-over-ssl-3rd-certification-authority

### 3.5 — Atributos e esquema de diretório

**Definição:** Schema LDAP define classes de objetos e seus atributos obrigatórios e opcionais.

**Objetivo profissional:** Mapeamentos corretos permitem autenticar e provisionar sem conflitos de dados.

**Pré-requisitos:** Conheça os termos do módulo: LDAP e integração híbrida. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Inspecione objectClass, cn, mail e memberOf
2. Compare dois tipos de objeto
3. Documente campo obrigatório e possível valor.

**Critério de aceite:** Demonstra concessão, acesso negado e revogação.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte para aprofundamento:** https://www.openldap.org/doc/admin26/

### 3.6 — Sincronização, identidade híbrida e conflitos

**Definição:** Identidade híbrida combina dados locais e nuvem com processos de correspondência e sincronização.

**Objetivo profissional:** Atributos divergentes e duplicidades podem criar contas erradas ou travar provisionamento.

**Pré-requisitos:** Conheça os termos do módulo: LDAP e integração híbrida. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe AD → Entra com atributo de correlação
2. Simule usuários com UPN duplicado em dados fictícios
3. Registre estratégia de conflito e fonte autoritativa.

**Critério de aceite:** Critério de aceite: Desenhe AD → Entra com atributo de correlação; Registre estratégia de conflito e fonte autoritativa.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte para aprofundamento:** https://www.openldap.org/doc/admin26/

### 3.7 — Consulta e auditoria segura de diretório

**Definição:** Consultas LDAP recuperam dados do diretório; auditoria registra ações sensíveis.

**Objetivo profissional:** Acesso de leitura excessivo expõe atributos pessoais e impede rastreabilidade.

**Pré-requisitos:** Conheça os termos do módulo: LDAP e integração híbrida. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Faça busca com conta de leitura mínima
2. Limite atributos retornados
3. Registre alteração fictícia e identifique evento associado.

**Critério de aceite:** Relaciona evidência, causa provável, correção e novo teste.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte para aprofundamento:** https://www.openldap.org/doc/admin26/

## 26 · IAM em AWS, Google Cloud e produtos especializados

**Fase:** 05 · Híbrido e arquitetura. **Objetivo:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros.

**Ponto conceitual principal:** Compare identidades, trust, permissão efetiva, herança, federação e revisões em AWS, GCP e SaaS.

**Risco de interpretação:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

### 26.1 — AWS IAM: users, groups, roles e policies

**Definição:** Policies expressam permissões; trust policies determinam quem pode assumir role.

**Objetivo profissional:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Multi-cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe role com trust restrita
2. Defina policy somente leitura
3. Teste avaliação permitida e negada por simulação
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Duas policies distintas e resultado de cada decisão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte para aprofundamento:** https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

### 26.2 — AWS STS e identidade federada

**Definição:** STS produz credenciais temporárias; integrações precisam impor condições de confiança e expiração.

**Objetivo profissional:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Multi-cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele federação OIDC para role AWS
2. Identifique issuer e subject autorizados
3. Simule erro de trust policy
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo que diferencia autenticação externa e autorização AWS. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte para aprofundamento:** https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

### 26.3 — AWS Organizations, SCP e limites

**Definição:** SCP delimita máximo de permissões de principals em contas membro, não concede permissões por si só.

**Objetivo profissional:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Multi-cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele organização com duas contas
2. Defina restrição SCP fictícia
3. Compare efeito com IAM policy permitindo ação
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Explicação da interseção das permissões e caso negado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte para aprofundamento:** https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html

### 26.4 — AWS IAM Identity Center

**Definição:** Identity Center integra fontes de identidades e permission sets para acesso a contas/aplicações.

**Objetivo profissional:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Multi-cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele usuário no IdP externo
2. Relacione permission set a conta AWS
3. Registre ciclo de remoção
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo SSO e entitlement com fonte de identidade definida. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte para aprofundamento:** https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html

### 26.5 — Google Cloud IAM: principal, role e resource

**Definição:** Google Cloud IAM vincula principals a roles sobre hierarquia de recursos, com políticas condicionais onde disponíveis.

**Objetivo profissional:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Multi-cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe organização-projeto-recurso GCP
2. Atribua papel de leitura em cenário fictício
3. Identifique efeito de herança
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de principal, role, recurso e acesso efetivo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte para aprofundamento:** https://cloud.google.com/iam/docs/overview

### 26.6 — Google Cloud Workload Identity Federation

**Definição:** Federação de workloads evita distribuição de chaves long-lived de service accounts.

**Objetivo profissional:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Multi-cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele emissor OIDC externo
2. Defina atributo de trust e mapeamento
3. Compare aceitação e rejeição de workload
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo com principal externo e restrição de confiança. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte para aprofundamento:** https://cloud.google.com/iam/docs/workload-identity-federation

### 26.7 — Okta versus Microsoft Entra

**Definição:** Provedores de identidade implementam OIDC/SAML/MFA, mas não possuem modelos idênticos de grupos e políticas.

**Objetivo profissional:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Multi-cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Compare autenticação de app fictício nos dois IdPs
2. Mapeie decisões e telas equivalentes
3. Registre diferenças de licença e terminologia
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Matriz de capacidades sem afirmar equivalência total. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte para aprofundamento:** https://developer.okta.com/docs/

### 26.8 — SailPoint IGA e ciclo de vida

**Definição:** Soluções IGA correlacionam identidades, contas e entitlements; integrações variam por conector.

**Objetivo profissional:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Multi-cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele conexão de HR para IGA e aplicação
2. Crie desenho de aprovação e recertificação
3. Compare com Entra Governance
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Fluxo IGA completo com owner, SoD e revisão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte para aprofundamento:** https://documentation.sailpoint.com/

### 26.9 — CyberArk PAM e contas privilegiadas

**Definição:** PAM tradicional protege credenciais e sessões privilegiadas; PIM eleva funções em escopos específicos.

**Objetivo profissional:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Multi-cloud. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe cofre, alvo e sessão privilegiada
2. Compare PAM versus PIM
3. Defina monitoramento e rotação
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Arquitetura que identifica segredo, sessão e elevação separadamente. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte para aprofundamento:** https://docs.cyberark.com/

## 27 · Engenharia de IAM e políticas de autorização

**Fase:** 05 · Híbrido e arquitetura. **Objetivo:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis.

**Ponto conceitual principal:** Distinga autenticação, decisão e enforcement; políticas testáveis precisam negar condições não satisfeitas.

**Risco de interpretação:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

### 27.1 — Policy Decision Point e Policy Enforcement Point

**Definição:** O PDP avalia políticas e o PEP aplica decisões no ponto de acesso, sem depender somente da interface do usuário.

**Objetivo profissional:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Policy-as-code. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe API, gateway, PDP e PEP
2. Modele GET permitido e DELETE negado
3. Teste ausência do serviço de políticas
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Arquitetura e casos permitidos/negados/falha fechada. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte para aprofundamento:** https://www.openpolicyagent.org/docs/

### 27.2 — ReBAC e autorização por relações

**Definição:** ReBAC baseia decisões nas relações entre sujeitos, objetos e organizações, além de papéis globais.

**Objetivo profissional:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Policy-as-code. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Defina estrutura documento-projeto-membro
2. Escreva regra de leitura por relação
3. Teste acesso entre projetos distintos
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Grafo de relações e duas decisões divergentes. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte para aprofundamento:** https://www.openpolicyagent.org/docs/

### 27.3 — ABAC orientado a recursos

**Definição:** Atributos do sujeito, recurso, ação e ambiente sustentam políticas expressivas com validação consistente.

**Objetivo profissional:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Policy-as-code. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie recursos com rótulos de classificação
2. Defina política por departamento e sensibilidade
3. Teste dois conjuntos de atributos
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Tabela de verdade mostrando concessão e negação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte para aprofundamento:** https://www.openpolicyagent.org/docs/

### 27.4 — OPA e policy-as-code

**Definição:** Políticas versionadas como código podem ser testadas e revisadas antes de alterar decisões de produção.

**Objetivo profissional:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Policy-as-code. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Crie regra Rego simples em sandbox
2. Implemente teste positivo e negativo
3. Faça revisão de mudança no Git
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Política versionada e testes automatizados de autorização. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte para aprofundamento:** https://www.openpolicyagent.org/docs/

### 27.5 — Provisionamento SCIM resiliente

**Definição:** Integrações exigem idempotência, observabilidade e tratamento de estado parcial para não duplicar identidades.

**Objetivo profissional:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Policy-as-code. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Modele endpoint /Users
2. Simule timeout depois de criar conta
3. Reexecute de modo idempotente
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Log de duas tentativas sem duplicação e com estado final correto. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte para aprofundamento:** https://www.openpolicyagent.org/docs/

### 27.6 — Threat modeling para IAM

**Definição:** Modelagem de ameaças identifica ativos, fronteiras de confiança, abuso de privilégios e compensações.

**Objetivo profissional:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Policy-as-code. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe login OIDC com fronteiras
2. Liste ameaças por etapa
3. Vincule mitigação e método de verificação
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Modelo de ameaças com ao menos cinco cenários e controles. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte para aprofundamento:** https://www.openpolicyagent.org/docs/

### 27.7 — Fail-safe, resiliência e break-glass

**Definição:** IAM precisa reduzir fail-open acidental sem impedir recuperação administrativa em incidentes.

**Objetivo profissional:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Policy-as-code. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Simule indisponibilidade do IdP em diagrama
2. Defina comportamento de app e cache de sessão
3. Modele ativação emergencial
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Plano com fail-closed, recuperação e teste de continuidade. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte para aprofundamento:** https://www.openpolicyagent.org/docs/

### 27.8 — Infraestrutura como código para IAM

**Definição:** Automações declarativas e versionadas reduzem deriva, mas precisam cuidado com estados e credenciais.

**Objetivo profissional:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Policy-as-code. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Escreva configuração fictícia de grupo/role em IaC
2. Gere revisão de mudança
3. Especifique rollback e segredo fora do repositório
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Diff versionado e plano reversível sem credenciais embutidas. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte para aprofundamento:** https://www.openpolicyagent.org/docs/

### 27.9 — Arquitetura de referência e projeto final

**Definição:** Uma arquitetura madura conecta identidade, dispositivo, recurso, dados, governança e monitoramento.

**Objetivo profissional:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Pré-requisitos:** Conheça os termos do módulo: Policy-as-code. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe sistema com Entra, Intune, Azure, Purview e uma app federada
2. Aplique JML e privilégio mínimo
3. Demonstre fluxos de acesso autorizado, bloqueado e auditado
4. Capture evidências sem expor usuários reais, senhas, tokens ou dados pessoais.
5. Documente como reverter as mudanças após a verificação.

**Critério de aceite:** Entrega verificável: Projeto de arquitetura, checklist de testes, evidências e plano de recuperação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte para aprofundamento:** https://www.openpolicyagent.org/docs/

## 15 · Zero Trust e arquitetura IAM

**Fase:** 05 · Híbrido e arquitetura. **Objetivo:** Arquiteturas maduras tratam identidades humanas e de máquina com políticas adaptativas e monitoramento.

**Ponto conceitual principal:** Separe decisor de política, executor, IdP, diretório, aplicação e auditoria.

**Risco de interpretação:** Zero Trust não é um produto nem implica desabilitar controles locais.

### 15.1 — Arquitetura de confiança e decisões de acesso

**Definição:** Arquitetura IAM integra diretórios, IdP, enforcement de aplicação e mecanismos de política.

**Objetivo profissional:** Lacunas nas fronteiras de confiança geram bypass de autorização e dependências frágeis.

**Pré-requisitos:** Conheça os termos do módulo: Arquitetura IAM. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe fluxo cliente → app → IdP → diretório
2. Identifique ponto que valida token e decide permissão
3. Teste decisão permitida e negada no lab.

**Critério de aceite:** Critério de aceite: Desenhe fluxo cliente → app → IdP → diretório; Teste decisão permitida e negada no lab.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Zero Trust não é um produto nem implica desabilitar controles locais.

**Fonte para aprofundamento:** https://csrc.nist.gov/pubs/sp/800/207/final

### 15.2 — Identidades não humanas e segredos

**Definição:** Workloads, aplicações e agentes precisam de identidades próprias para acessar recursos.

**Objetivo profissional:** Segredos permanentes sem owner ou rotação são alvos comuns em pipelines e automações.

**Pré-requisitos:** Conheça os termos do módulo: Arquitetura IAM. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Inventarie três workloads fictícios
2. Prefira role ou identidade gerenciada em um
3. Documente owners e direitos mínimos.

**Critério de aceite:** Critério de aceite: Inventarie três workloads fictícios; Documente owners e direitos mínimos.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Zero Trust não é um produto nem implica desabilitar controles locais.

**Fonte para aprofundamento:** https://csrc.nist.gov/pubs/sp/800/207/final

### 15.3 — Threat modeling e resiliência

**Definição:** Threat modeling avalia ameaças a componentes e fluxos, enquanto resiliência garante recuperação da autenticação.

**Objetivo profissional:** Falha de IdP ou roubo de token pode interromper ou comprometer toda organização.

**Pré-requisitos:** Conheça os termos do módulo: Arquitetura IAM. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Desenhe login OIDC com fronteiras de confiança
2. Liste ameaças como replay e indisponibilidade
3. Associe mitigação, log e plano de recuperação.

**Critério de aceite:** Critério de aceite: Desenhe login OIDC com fronteiras de confiança; Associe mitigação, log e plano de recuperação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Zero Trust não é um produto nem implica desabilitar controles locais.

**Fonte para aprofundamento:** https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool

### 15.4 — Projeto IAM ponta a ponta

**Definição:** Projeto IAM reúne ciclo de vida, autenticação federada, autorização, logs e revisão num cenário único.

**Objetivo profissional:** Consolidar componentes demonstra entendimento das dependências e dos pontos de falha.

**Pré-requisitos:** Conheça os termos do módulo: Arquitetura IAM. Use identidades, dados e recursos de laboratório, nunca produção.

**Passos do exercício:**
1. Implante Keycloak ou Authentik e uma aplicação cliente
2. Configure SSO, MFA, grupos e JML fictício
3. Documente arquitetura, casos de acesso negado, logs e rollback.

**Critério de aceite:** Critério de aceite: Implante Keycloak ou Authentik e uma aplicação cliente; Documente arquitetura, casos de acesso negado, logs e rollback.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Teste negativo:** Teste adverso: demonstre uma condição de acesso negado, atributo inválido, expiração ou falha controlada, conforme o tema.

**Verificação de erro:** Recuperação: documente causa provável, passos de diagnóstico e restauração do estado original.

**Cuidado:** Zero Trust não é um produto nem implica desabilitar controles locais.

**Fonte para aprofundamento:** https://csrc.nist.gov/pubs/sp/800/207/final

## Limitações da revisão

- A revisão de código e das estruturas pedagógicas não substitui testes com contas, licenças e dispositivos reais.
- Interfaces administrativas e objetivos das certificações podem mudar. Siga a documentação oficial do produto e mantenha um plano de rollback.
- Os exercícios não enviam evidências ao projeto; marcações no navegador representam declarações do estudante.
