# ROADMAP - IAM — Manual de aprendizagem por competência

**242 assuntos, 29 módulos, 3 níveis e atividades AtlasCorp integradas quando tecnicamente pertinentes.**

Este é um manual de apoio para consulta e estudo offline. O site continua sendo o ambiente principal para registrar progresso. Esta documentação não comprova execução em tenant nem substitui a versão vigente da documentação dos fornecedores.

## Método recomendado

1. Leia **O que é**, **Para que serve** e **Como funciona**; reescreva com suas próprias palavras.
2. Responda o cenário sem consultar o resumo. Compare seu raciocínio com os critérios da seção de verificação.
3. Quando a aula possuir AtlasCorp, execute a etapa na ordem segura: verifique licença, escopo, pré-requisitos, mínimo privilégio e reversão; só depois faça teste permitido/negado.
4. Marque **execução real**, **simulação** ou **apenas teoria**. Registre evidências sem senhas, tokens ou identificadores reais.
5. Revise o assunto posteriormente. Não trate uma marcação como certificação de competência.

**Referências de boas práticas:** Microsoft Entra [planejamento de políticas](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access) e [acesso emergencial](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access); [OAuth code flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow); [SCIM RFC 7644](https://www.rfc-editor.org/rfc/rfc7644).

## 1. Iniciante — Conceitos, identidade e primeiros controles

Entenda as bases, conheça o Entra e aplique os primeiros controles corporativos sem configurar infraestrutura desnecessária.

### Módulo 0: Fundamentos de TI para IAM

Entenda como sistemas e serviços identificam usuários e se comunicam.

#### 0.1. TCP/IP

**O que é:** TCP/IP é a família de protocolos que permite a comunicação entre dispositivos e serviços em redes IP. O IP é responsável por endereçamento e encaminhamento dos pacotes; o TCP oferece um transporte orientado à conexão, com sequência, confirmação, retransmissão e controle de fluxo. Nem todo tráfego IP utiliza TCP: UDP também é comum.

**Para que serve:** IAM depende de conectividade entre navegador, provedor de identidade, aplicações e APIs. Conhecer endereços IP, portas, TCP/UDP e rotas ajuda a separar falhas de rede de falhas de autenticação ou autorização.

**Como funciona:** Quando o usuário acessa uma aplicação cloud, o cliente resolve um destino, estabelece a conexão (por exemplo TCP na porta 443), negocia a segurança de transporte por TLS e só então envia requisições HTTP. O fato de a conexão funcionar não prova que a identidade foi autenticada nem que o recurso esteja autorizado.

**Questão profissional:** Uma falha ocorreu antes ou depois da autenticação?

**Critério de competência:** Consegue explicar diferença entre IP e TCP, identificar IP/máscara/gateway/porta, verificar rota, distinguir bloqueio ICMP de TCP e diagnosticar uma falha de comunicação.

**Cenário de fixação:** O navegador de Bruno falha antes da tela de login. Identifique o que verificar primeiro: conectividade IP, resolução DNS, negociação TLS e chegada ao IdP.

**Entrega esperada:** Fluxo em quatro etapas com o ponto provável de falha. Não é necessário implantar infraestrutura de rede.

**Risco:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/networking/technologies/network-subsystem/net-sub-interface

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 0.2. DNS

**O que é:** DNS traduz nomes de domínio em registros utilizados pela infraestrutura, como A, AAAA, CNAME e SRV. Aplicações cloud dependem de resolução correta do domínio do IdP, de seus endpoints e dos sistemas integrados.

**Para que serve:** Evita atribuir a MFA ou SSO uma falha que ocorreu antes da autenticação. Em AD híbrido, registros SRV têm importância adicional na descoberta de controladores de domínio.

**Como funciona:** O cliente consulta um resolvedor DNS, recebe os registros apropriados e usa os endereços retornados para iniciar a conexão. Resposta incorreta, cache desatualizado ou domínio não resolvido pode impedir a navegação, mesmo com credenciais e permissões corretas.

**Questão profissional:** Uma falha ocorreu antes ou depois da autenticação?

**Critério de competência:** Identifica registros e diagnostica falha de resolução.

**Cenário de fixação:** O endereço do aplicativo não resolve, mas outro serviço do mesmo tenant funciona. Compare registros, resolvedor e diferença entre DNS e erro de autenticação.

**Entrega esperada:** Hipótese da falha e consulta apropriada (nslookup, Resolve-DnsName ou dig).

**Risco:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/networking/dns/quickstart-install-configure-dns-server

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 0.3. HTTP e HTTPS

**O que é:** HTTP define mensagens de requisição e resposta usadas por navegadores e APIs, com métodos como GET, POST e PATCH, cabeçalhos e códigos de status. HTTPS é HTTP transportado em uma conexão protegida por TLS.

**Para que serve:** As integrações de IAM utilizam redirecionamentos, endpoints de autorização, APIs REST e respostas HTTP. Entender esses elementos facilita investigar falhas de login, chamadas Graph e provisionamento SCIM.

**Como funciona:** O cliente estabelece conexão TLS com o servidor, envia método, caminho, cabeçalhos e eventual corpo; o servidor responde com status e conteúdo. Um status 401 ou 403 pode refletir problemas diferentes e deve ser interpretado em contexto.

**Questão profissional:** Uma falha ocorreu antes ou depois da autenticação?

**Critério de competência:** Consegue explicar HTTP, TLS, certificado e porta 443, publicar um site de teste em HTTPS e diagnosticar erro de certificado ou nome.

**Cenário de fixação:** Bruno não consegue alcançar a página de login do aplicativo financeiro. SecOps precisa identificar se a falha é anterior ao IdP, na conexão ou na aplicação. Analise onde o conhecimento de "HTTP e HTTPS" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "HTTP e HTTPS", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Consegue explicar HTTP, TLS, certificado e porta 443, publicar um site de teste em HTTPS e diagnosticar erro de certificado ou nome.

**Risco:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte técnica:** https://learn.microsoft.com/en-us/iis/manage/configuring-security/how-to-set-up-ssl-on-iis

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 0.4. TLS e certificados

**O que é:** TLS estabelece um canal criptografado entre cliente e servidor, usando negociação de algoritmos e autenticação do endpoint normalmente baseada em certificados digitais. O certificado associa chave pública a uma identidade sob regras de confiança.

**Para que serve:** Evita interceptação e alteração de mensagens em comunicações com IdPs, APIs e conectores, além de auxiliar no diagnóstico de cadeias, validade e nomes incorretos de certificados.

**Como funciona:** Antes de enviar dados de login, o cliente verifica a cadeia de confiança e se o certificado atende ao nome esperado e está válido. Erros de relógio, CA desconhecida ou nome incompatível interrompem ou tornam insegura a conexão.

**Questão profissional:** Uma falha ocorreu antes ou depois da autenticação?

**Critério de competência:** Critério de aceite: Crie certificado de laboratório com nome DNS consistente; Simule expiração ou nome incorreto em ambiente isolado e observe o erro.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** O navegador recusa a conexão ao portal fictício antes de exibir SSO. Examine nome do certificado, validade, CA, relógio e TLS.

**Entrega esperada:** Diagnóstico por categoria; não desative validação TLS para forçar o acesso.

**Risco:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/identity/ad-cs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 0.5. Usuários e permissões Windows

**O que é:** Contas locais e ACLs NTFS atribuem direitos para acessar arquivos e executar operações.

**Para que serve:** Conceder privilégio excessivo permite leitura ou alteração indevida de dados usados em processos IAM.

**Como funciona:** Computer Management → Local Users and Groups e Propriedades → Security da pasta; Windows Server com políticas de domínio também. Conexão com IAM: Trace cliente → DNS → transporte → TLS → aplicação → identidade.

**Questão profissional:** Uma falha ocorreu antes ou depois da autenticação?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** Bruno não consegue alcançar a página de login do aplicativo financeiro. SecOps precisa identificar se a falha é anterior ao IdP, na conexão ou na aplicação. Analise onde o conhecimento de "Usuários e permissões Windows" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Usuários e permissões Windows", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/networking/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 0.6. Usuários e permissões Linux

**O que é:** UID, GID, grupos e bits de leitura, escrita e execução controlam recursos POSIX.

**Para que serve:** Serviços IAM em Linux exigem permissões mínimas para arquivos de configuração, certificados e segredos.

**Como funciona:** Terminal Linux com useradd/usermod, chown, chmod, id e ls -l. Conexão com IAM: Trace cliente → DNS → transporte → TLS → aplicação → identidade.

**Questão profissional:** Uma falha ocorreu antes ou depois da autenticação?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** Bruno não consegue alcançar a página de login do aplicativo financeiro. SecOps precisa identificar se a falha é anterior ao IdP, na conexão ou na aplicação. Analise onde o conhecimento de "Usuários e permissões Linux" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Usuários e permissões Linux", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/networking/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 0.7. Linha de comando (CLI)

**O que é:** CLI executa ferramentas administrativas por comandos reproduzíveis e scripts.

**Para que serve:** Diagnóstico de autenticação requer consultar rede, processos, DNS, certificados e logs com precisão.

**Como funciona:** PowerShell/Terminal no Windows; shell Bash no Linux. Conexão com IAM: Trace cliente → DNS → transporte → TLS → aplicação → identidade.

**Questão profissional:** Uma falha ocorreu antes ou depois da autenticação?

**Critério de competência:** Critério de aceite: Consulte endereço IP, DNS e serviço de teste por terminal; Documente comando, resultado esperado e retorno observado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Bruno não consegue alcançar a página de login do aplicativo financeiro. SecOps precisa identificar se a falha é anterior ao IdP, na conexão ou na aplicação. Analise onde o conhecimento de "Linha de comando (CLI)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Linha de comando (CLI)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Consulte endereço IP, DNS e serviço de teste por terminal; Documente comando, resultado esperado e retorno observado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/networking/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 0.8. PowerShell

**O que é:** PowerShell é shell e linguagem de automação orientados a objetos com cmdlets e pipeline.

**Para que serve:** Administração AD e Entra usa automação para inventário e correção auditável.

**Como funciona:** Windows PowerShell ou PowerShell 7; módulos de AD em servidores adequados e Microsoft Graph para Entra. Conexão com IAM: Trace cliente → DNS → transporte → TLS → aplicação → identidade.

**Questão profissional:** Uma falha ocorreu antes ou depois da autenticação?

**Critério de competência:** Critério de aceite: Execute Get-LocalUser em VM Windows; Crie script de consulta sem alterar identidades reais.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Bruno não consegue alcançar a página de login do aplicativo financeiro. SecOps precisa identificar se a falha é anterior ao IdP, na conexão ou na aplicação. Analise onde o conhecimento de "PowerShell" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "PowerShell", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Execute Get-LocalUser em VM Windows; Crie script de consulta sem alterar identidades reais.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte técnica:** https://learn.microsoft.com/en-us/powershell/scripting/overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 0.9. Python básico

**O que é:** Python é linguagem de automação usada para consumir APIs, processar JSON e validar inventários.

**Para que serve:** Integrações IAM frequentemente requerem transformar atributos e conciliar identidades entre sistemas.

**Como funciona:** Python em estação isolada, venv e bibliotecas padrão como json/csv/urllib. Conexão com IAM: Trace cliente → DNS → transporte → TLS → aplicação → identidade.

**Questão profissional:** Uma falha ocorreu antes ou depois da autenticação?

**Critério de competência:** Critério de aceite: Leia JSON fictício contendo usuários e departamentos; Gere CSV de resultado e trate campos ausentes.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Bruno não consegue alcançar a página de login do aplicativo financeiro. SecOps precisa identificar se a falha é anterior ao IdP, na conexão ou na aplicação. Analise onde o conhecimento de "Python básico" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Python básico", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Leia JSON fictício contendo usuários e departamentos; Gere CSV de resultado e trate campos ausentes.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte técnica:** https://docs.python.org/3/tutorial/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 0.10. APIs REST

**O que é:** REST organiza recursos acessados por HTTP com métodos como GET, POST, PATCH e DELETE.

**Para que serve:** Entra Graph, SCIM e aplicações IAM expõem operações de ciclo de vida e consulta via APIs.

**Como funciona:** Endpoints documentados dos sistemas; ferramentas curl, Postman ou PowerShell Invoke-RestMethod. Conexão com IAM: Trace cliente → DNS → transporte → TLS → aplicação → identidade.

**Questão profissional:** Uma falha ocorreu antes ou depois da autenticação?

**Critério de competência:** Critério de aceite: Faça GET a API de teste e verifique status e corpo; Teste requisição sem autorização e examine 401/403.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Bruno não consegue alcançar a página de login do aplicativo financeiro. SecOps precisa identificar se a falha é anterior ao IdP, na conexão ou na aplicação. Analise onde o conhecimento de "APIs REST" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "APIs REST", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Faça GET a API de teste e verifique status e corpo; Teste requisição sem autorização e examine 401/403.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte técnica:** https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 0.11. JSON

**O que é:** JSON representa objetos, listas e valores e é comum em APIs de identidade e tokens.

**Para que serve:** Atributos, políticas e respostas de provisionamento são frequentemente transportados em JSON.

**Como funciona:** Corpo de requisições REST, Microsoft Graph, SCIM e claims JWT. Conexão com IAM: Trace cliente → DNS → transporte → TLS → aplicação → identidade.

**Questão profissional:** Uma falha ocorreu antes ou depois da autenticação?

**Critério de competência:** Critério de aceite: Monte objeto de usuário com id, active e groups; Compare respostas de API com atributos esperados.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Bruno não consegue alcançar a página de login do aplicativo financeiro. SecOps precisa identificar se a falha é anterior ao IdP, na conexão ou na aplicação. Analise onde o conhecimento de "JSON" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "JSON", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Monte objeto de usuário com id, active e groups; Compare respostas de API com atributos esperados.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc8259

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 0.12. Git

**O que é:** Git registra versões e histórico de scripts e configurações textuais.

**Para que serve:** Mudanças em automações IAM precisam rastreabilidade, revisão e capacidade de reversão.

**Como funciona:** Repositório local ou GitHub sem incluir tokens, senhas ou arquivos secretos. Conexão com IAM: Trace cliente → DNS → transporte → TLS → aplicação → identidade.

**Questão profissional:** Uma falha ocorreu antes ou depois da autenticação?

**Critério de competência:** Critério de aceite: Inicialize repositório de laboratório com git init; Altere arquivo, veja git diff e reverta uma mudança de teste.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Bruno não consegue alcançar a página de login do aplicativo financeiro. SecOps precisa identificar se a falha é anterior ao IdP, na conexão ou na aplicação. Analise onde o conhecimento de "Git" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Git", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Inicialize repositório de laboratório com git init; Altere arquivo, veja git diff e reverta uma mudança de teste.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Um login pode falhar sem sequer alcançar o IdP.

**Fonte técnica:** https://git-scm.com/docs/gittutorial

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 1: Identidade e segurança

Identidade é a representação digital; autenticação comprova identidade, autorização decide acesso e auditoria registra ações.

#### 1.1. Identidade digital

**O que é:** Uma identidade digital é a representação de uma pessoa, serviço, dispositivo ou outra entidade no contexto de um domínio de confiança. Ela se relaciona a identificadores estáveis, atributos, contas e processos de gestão.

**Para que serve:** IAM precisa responder quem é a entidade, de onde vêm seus atributos, quem é responsável por ela e quais decisões de acesso podem ser tomadas.

**Como funciona:** A fonte autoritativa registra uma entidade; um diretório ou IdP a representa em objetos e contas; grupos, roles e políticas associam direitos, e registros de auditoria documentam o ciclo de vida. Uma pessoa pode ter várias contas e uma conta não equivale à pessoa.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Critério de aceite: Modele funcionário e serviço com identificadores distintos; Documente atributo que estabelece correlação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Identidade digital" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Identidade digital", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Modele funcionário e serviço com identificadores distintos; Documente atributo que estabelece correlação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 1.2. Contas

**O que é:** Conta é o objeto operacional que representa a identidade dentro de um sistema. Conta é representação operacional em um sistema; uma pessoa pode ter várias contas e direitos distintos.

**Para que serve:** Uma pessoa pode ter várias contas; inventariá-las permite revogar acesso ao desligar.

**Como funciona:** AD Users and Computers, Entra ID → Users e administração das aplicações. Conexão com IAM: Separe pessoa, conta, identidade, atributo, credencial e direito.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Contas" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Contas", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 1.3. Credenciais

**O que é:** Credencial é o mecanismo usado para demonstrar identidade, como senha, chave criptográfica ou certificado. Segredos, certificados e chaves têm ciclos próprios de emissão, armazenamento, validade, recuperação e revogação.

**Para que serve:** Credenciais vazadas permitem autenticação indevida mesmo quando a conta tem permissões limitadas.

**Como funciona:** Métodos de autenticação do IdP, cofre de segredos e gerenciamento de certificados. Conexão com IAM: Separe pessoa, conta, identidade, atributo, credencial e direito.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Critério de aceite: Liste credenciais permitidas no IdP de teste; Revogue-o e teste nova autenticação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Credenciais" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Credenciais", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Liste credenciais permitidas no IdP de teste; Revogue-o e teste nova autenticação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 1.4. Atributos de identidade

**O que é:** Atributos como departamento, cargo e identificador descrevem identidade e alimentam políticas. Atributos confiáveis dependem de fonte autoritativa, finalidade, atualização e política de propagação.

**Para que serve:** Erros em atributos podem causar provisionamento em grupo ou aplicação errada.

**Como funciona:** AD Attribute Editor, Entra ID propriedades de usuário, SCIM user schema. Conexão com IAM: Separe pessoa, conta, identidade, atributo, credencial e direito.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Atributos de identidade" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Atributos de identidade", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 1.5. Autenticação, autorização e auditoria (AAA)

**O que é:** Autenticação verifica quem é a entidade; autorização decide ações permitidas; auditoria registra atividades. Autenticação valida credenciais, autorização decide ações e auditoria registra decisões e eventos; uma etapa não substitui a outra.

**Para que serve:** Login bem-sucedido não significa permissão para recursos; logs são necessários para rastreio.

**Como funciona:** IdP autentica, backend aplica autorização, SIEM/IdP registra eventos. Conexão com IAM: Separe pessoa, conta, identidade, atributo, credencial e direito.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Relaciona evidência, causa provável, correção e novo teste.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Autenticação, autorização e auditoria (AAA)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Autenticação, autorização e auditoria (AAA)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Relaciona evidência, causa provável, correção e novo teste.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 1.6. Menor privilégio

**O que é:** Menor privilégio limita cada identidade às permissões necessárias à tarefa. Permissões devem atender à tarefa necessária, por recurso e prazo, e ser reduzidas se não utilizadas.

**Para que serve:** Reduz impacto de conta comprometida e abuso interno.

**Como funciona:** Roles de AD, Entra, AWS IAM, aplicativos e PAM. Conexão com IAM: Separe pessoa, conta, identidade, atributo, credencial e direito.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Critério de aceite: Monte matriz de tarefas e permissões; Confirme que a tarefa permitida funciona e operação excessiva falha.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Menor privilégio" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Menor privilégio", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Monte matriz de tarefas e permissões; Confirme que a tarefa permitida funciona e operação excessiva falha.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 1.7. Zero Trust

**O que é:** Zero Trust é estratégia arquitetural fundamentada em verificação explícita, menor privilégio e pressuposto de comprometimento; não é um produto. Zero Trust exige verificação explícita, menor privilégio e pressuposto de comprometimento; não se resume a MFA.

**Para que serve:** Acesso deve considerar identidade, contexto e política mesmo dentro da rede corporativa.

**Como funciona:** Políticas de acesso condicional, gateways e enforcement em aplicações. Conexão com IAM: Separe pessoa, conta, identidade, atributo, credencial e direito.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Explica verificação explícita e menor privilégio.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Zero Trust" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Zero Trust", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Explica verificação explícita e menor privilégio.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 1.8. Joiner (admissão)

**O que é:** Joiner cria identidade e permissões iniciais quando vínculo organizacional começa.

**Para que serve:** Automação evita atraso e acesso não aprovado.

**Como funciona:** Fluxo RH → IGA/IdP → AD/Entra → aplicação. Conexão com IAM: Separe pessoa, conta, identidade, atributo, credencial e direito.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Critério de aceite: Crie evento fictício de contratação; Simule provisionamento e registre aprovação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Joiner (admissão)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Joiner (admissão)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie evento fictício de contratação; Simule provisionamento e registre aprovação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Ciclo de vida Joiner–Mover–Leaver · Autorizar a admissão: **Onde:** Registro RH → solicitação de acesso fictícia. **Ação:** Crie ticket RH-JOIN-001 com employeeId 1001, gestor, data de início, departamento TI e prazo. O gestor confirma acessos básicos; IAM valida SoD.. **Validação:** Ticket com solicitante, aprovador, escopo e decisão.. **Se falhar:** Se houver dado ausente, não invente atributo no diretório.

#### 1.9. Mover (movimentação)

**O que é:** Mover atualiza atributos e acessos quando alguém muda de função ou departamento.

**Para que serve:** Sem retirada dos direitos anteriores ocorre acúmulo de privilégios.

**Como funciona:** Fluxos JML e regras de grupos dinâmicos ou IGA. Conexão com IAM: Separe pessoa, conta, identidade, atributo, credencial e direito.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Critério de aceite: Mude usuário fictício de RH para Financeiro; Valide permissões resultantes.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Mover (movimentação)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Mover (movimentação)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Mude usuário fictício de RH para Financeiro; Valide permissões resultantes.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 1.10. Leaver (desligamento)

**O que é:** Leaver desativa identidades e revoga acessos quando termina o vínculo.

**Para que serve:** Contas ativas após desligamento são risco de segurança e auditoria.

**Como funciona:** HR/IGA, AD, Entra, SCIM, VPN e aplicações. Conexão com IAM: Separe pessoa, conta, identidade, atributo, credencial e direito.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Critério de aceite: Crie checklist de sistemas usados pela identidade fictícia; Verifique que login e aplicação estão inacessíveis.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Leaver (desligamento)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Leaver (desligamento)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie checklist de sistemas usados pela identidade fictícia; Verifique que login e aplicação estão inacessíveis.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 1.11. Políticas IAM

**O que é:** Políticas IAM documentam regras de concessão, revisão, autenticação e revogação.

**Para que serve:** Padronizam decisões e permitem demonstrar conformidade.

**Como funciona:** Políticas corporativas e regras técnicas em IdP, IGA e aplicações. Conexão com IAM: Separe pessoa, conta, identidade, atributo, credencial e direito.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Políticas IAM" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Políticas IAM", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 1.12. Riscos de identidade

**O que é:** Risco de identidade considera probabilidade e impacto de abuso, roubo ou excesso de acesso.

**Para que serve:** Ajuda priorizar MFA, eliminação de contas órfãs e limitação de privilégio.

**Como funciona:** Avaliação de risco, sign-in risk e governança de acesso. Conexão com IAM: Separe pessoa, conta, identidade, atributo, credencial e direito.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Critério de aceite: Registre três cenários como senha vazada e admin permanente; Associe mitigação concreta a cada um.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Riscos de identidade" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Riscos de identidade", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Registre três cenários como senha vazada e admin permanente; Associe mitigação concreta a cada um.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 1.13. Segregação de funções (SoD)

**O que é:** SoD separa atividades incompatíveis para impedir fraude e erros sem supervisão. SoD previne concentração de atividades conflitantes, como criar e aprovar uma mesma transação.

**Para que serve:** Uma conta que cria e aprova pagamento concentra risco operacional.

**Como funciona:** Matrizes de conflitos IGA, RBAC e processos financeiros. Conexão com IAM: Separe pessoa, conta, identidade, atributo, credencial e direito.

**Questão profissional:** Quem é a entidade, qual sistema define seus atributos e quem aprova acesso?

**Critério de competência:** Critério de aceite: Crie roles Solicitar e Aprovar; Teste pedido de concessão conflitante e bloqueio.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH informa que uma pessoa mudou de área, mas o inventário do diretório ainda mostra os dados antigos. IAM deve relacionar a identidade a sua fonte autoritativa. Analise onde o conhecimento de "Segregação de funções (SoD)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Segregação de funções (SoD)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie roles Solicitar e Aprovar; Teste pedido de concessão conflitante e bloqueio.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Uma pessoa pode possuir múltiplas contas e uma identidade de workload pode não corresponder a pessoa física.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Preparar laboratório seguro · Definir separação de funções: **Onde:** Inventário AtlasCorp → RACI e grupos. **Ação:** Documente funções de RH, gestores, TI, IAM e SecOps. Crie matriz: empregado | área | gestor | grupo | app | justificativa | expiração.. **Validação:** Matriz AtlasCorp aprovada e grupos criados sem privilégios administrativos supérfluos.. **Se falhar:** Se não houver aprovação, mantenha usuário sem acesso específico à aplicação.

### Módulo 16: Comprovação de identidade e assurance

Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos.

#### 16.1. Identidade declarada e identidade verificada

**O que é:** Uma alegação de identidade não comprova por si só que a pessoa corresponde ao registro.

**Para que serve:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** NIST 800-63, desenho de processos, Entra ID Conexão com IAM: Separar comprovação, autenticador, federação e recuperação.

**Questão profissional:** IAL, AAL e FAL estão sendo usados para a finalidade correta?

**Critério de competência:** Entrega verificável: Mapa de atributos declarados e verificados e justificativa de cada validação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** RH precisa determinar confiança na pessoa cadastrada enquanto TI define a força do autenticador e a confiança da federação. Analise onde o conhecimento de "Identidade declarada e identidade verificada" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Identidade declarada e identidade verificada", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Mapa de atributos declarados e verificados e justificativa de cada validação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte técnica:** https://pages.nist.gov/800-63-4/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 16.2. Identity proofing e IAL

**O que é:** A comprovação de identidade avalia a confiança na associação entre um indivíduo e sua identidade digital; IAL indica nível de garantia. IAL mede garantia de comprovação da identidade e não a força do login por si só.

**Para que serve:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** NIST 800-63, desenho de processos, Entra ID Conexão com IAM: Separar comprovação, autenticador, federação e recuperação.

**Questão profissional:** IAL, AAL e FAL estão sendo usados para a finalidade correta?

**Critério de competência:** Entrega verificável: Matriz de garantia de identidade, etapas e lacunas por cenário. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Compare cadastro de usuário em fórum com contratação que exige confiança formal na pessoa.

**Entrega esperada:** Justifique IAL necessário separadamente da força MFA (AAL).

**Risco:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte técnica:** https://pages.nist.gov/800-63-4/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 16.3. Authenticator assurance e AAL

**O que é:** O nível de garantia da autenticação considera fatores, resistência e controle sobre autenticadores; não é sinônimo de IAL. AAL mede força do mecanismo de autenticação, diferente de identity proofing e federação.

**Para que serve:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** NIST 800-63, desenho de processos, Entra ID Conexão com IAM: Separar comprovação, autenticador, federação e recuperação.

**Questão profissional:** IAL, AAL e FAL estão sendo usados para a finalidade correta?

**Critério de competência:** Entrega verificável: Tabela de métodos com propriedades de resistência e exigências por risco. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** RH precisa determinar confiança na pessoa cadastrada enquanto TI define a força do autenticador e a confiança da federação. Analise onde o conhecimento de "Authenticator assurance e AAL" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Authenticator assurance e AAL", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Tabela de métodos com propriedades de resistência e exigências por risco. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte técnica:** https://pages.nist.gov/800-63-4/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 16.4. Federation assurance e FAL

**O que é:** A federação requer confiança no emissor e proteção das declarações entre provedor de identidade e aplicação. FAL aborda garantias de federação, com regras de confiança e proteção de assertions.

**Para que serve:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** NIST 800-63, desenho de processos, Entra ID Conexão com IAM: Separar comprovação, autenticador, federação e recuperação.

**Questão profissional:** IAL, AAL e FAL estão sendo usados para a finalidade correta?

**Critério de competência:** Entrega verificável: Fluxo de confiança com pelo menos três verificações de token/assertion. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** RH precisa determinar confiança na pessoa cadastrada enquanto TI define a força do autenticador e a confiança da federação. Analise onde o conhecimento de "Federation assurance e FAL" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Federation assurance e FAL", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo de confiança com pelo menos três verificações de token/assertion. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte técnica:** https://pages.nist.gov/800-63-4/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 16.5. Identificadores imutáveis e correlação

**O que é:** Identidade, conta e pessoa são entidades distintas; identificadores estáveis evitam duplicação e falhas em JML.

**Para que serve:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** NIST 800-63, desenho de processos, Entra ID Conexão com IAM: Separar comprovação, autenticador, federação e recuperação.

**Questão profissional:** IAL, AAL e FAL estão sendo usados para a finalidade correta?

**Critério de competência:** Entrega verificável: Mapeamento com ID persistente e caso de atualização de nome sem duplicidade. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** RH precisa determinar confiança na pessoa cadastrada enquanto TI define a força do autenticador e a confiança da federação. Analise onde o conhecimento de "Identificadores imutáveis e correlação" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Identificadores imutáveis e correlação", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Mapeamento com ID persistente e caso de atualização de nome sem duplicidade. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte técnica:** https://pages.nist.gov/800-63-4/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 16.6. Recuperação de conta e reproofing

**O que é:** Fluxos de recuperação são parte da superfície de ataque e exigem controles contra engenharia social.

**Para que serve:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** NIST 800-63, desenho de processos, Entra ID Conexão com IAM: Separar comprovação, autenticador, federação e recuperação.

**Questão profissional:** IAL, AAL e FAL estão sendo usados para a finalidade correta?

**Critério de competência:** Entrega verificável: Checklist de recuperação segura, aprovação e auditoria. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** RH precisa determinar confiança na pessoa cadastrada enquanto TI define a força do autenticador e a confiança da federação. Analise onde o conhecimento de "Recuperação de conta e reproofing" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Recuperação de conta e reproofing", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Checklist de recuperação segura, aprovação e auditoria. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte técnica:** https://pages.nist.gov/800-63-4/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 16.7. Privacidade na gestão de identidades

**O que é:** Dados de identidade demandam minimização, prazo de retenção, controle de finalidade e acesso proporcional.

**Para que serve:** Estabeleça confiança na identidade antes da emissão de credenciais e da concessão de acessos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** NIST 800-63, desenho de processos, Entra ID Conexão com IAM: Separar comprovação, autenticador, federação e recuperação.

**Questão profissional:** IAL, AAL e FAL estão sendo usados para a finalidade correta?

**Critério de competência:** Entrega verificável: Inventário com finalidade, acesso, prazo e exclusão de cada atributo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** RH precisa determinar confiança na pessoa cadastrada enquanto TI define a força do autenticador e a confiança da federação. Analise onde o conhecimento de "Privacidade na gestão de identidades" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Privacidade na gestão de identidades", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Inventário com finalidade, acesso, prazo e exclusão de cada atributo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Níveis não são simplesmente degraus de uma mesma escala.

**Fonte técnica:** https://pages.nist.gov/800-63-4/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 5: Senhas, MFA e passkeys

A autenticação deve resistir a roubo de credenciais, ataques de phishing e abuso de sessões.

#### 5.1. Senhas e recuperação segura

**O que é:** Senha é credencial baseada em conhecimento; recuperação deve confirmar identidade sem expor conta.

**Para que serve:** Redefinição vulnerável e reutilização permitem takeover de identidades.

**Como funciona:** Políticas do IdP, Entra ID Password Reset e administração das aplicações. Conexão com IAM: Compare fatores, origem, recuperação e força da autenticação.

**Questão profissional:** Qual autenticador prova identidade com nível de garantia apropriado?

**Critério de competência:** Critério de aceite: Habilite reset em serviço de laboratório; Verifique expiração de links e ausência de enumeração.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Funcionário cadastrado pode usar método de autenticação inadequado para uma operação sensível. IAM analisa riscos de phishing e recuperação de conta. Analise onde o conhecimento de "Senhas e recuperação segura" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Senhas e recuperação segura", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Habilite reset em serviço de laboratório; Verifique expiração de links e ausência de enumeração.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** MFA baseado em código e push não significa resistência a phishing.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/authentication/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 5.2. TOTP

**O que é:** TOTP produz códigos de uso breve calculados a partir de segredo e tempo. TOTP é segundo fator baseado em segredo compartilhado, mas não oferece resistência completa a phishing em tempo real.

**Para que serve:** É fator adicional que reduz risco de senha roubada, embora não seja resistente a phishing.

**Como funciona:** Métodos MFA do Entra, Keycloak ou Authentik. Conexão com IAM: Compare fatores, origem, recuperação e força da autenticação.

**Questão profissional:** Qual autenticador prova identidade com nível de garantia apropriado?

**Critério de competência:** Critério de aceite: Ative TOTP para usuário teste; Teste diferença de horário e recuperação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Funcionário cadastrado pode usar método de autenticação inadequado para uma operação sensível. IAM analisa riscos de phishing e recuperação de conta. Analise onde o conhecimento de "TOTP" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "TOTP", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Ative TOTP para usuário teste; Teste diferença de horário e recuperação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** MFA baseado em código e push não significa resistência a phishing.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/authentication/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 5.3. FIDO2 e WebAuthn

**O que é:** FIDO2/WebAuthn autentica com chave privada guardada no autenticador, vinculando credencial ao domínio. WebAuthn permite operações criptográficas por autenticadores; verifique origem, desafio e registro seguro.

**Para que serve:** Reduz phishing e evita segredos reutilizáveis enviados ao servidor.

**Como funciona:** Políticas de métodos de autenticação e aplicações com WebAuthn. Conexão com IAM: Compare fatores, origem, recuperação e força da autenticação.

**Questão profissional:** Qual autenticador prova identidade com nível de garantia apropriado?

**Critério de competência:** Critério de aceite: Ative método WebAuthn em IdP isolado; Teste login e exclusão da credencial.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Funcionário cadastrado pode usar método de autenticação inadequado para uma operação sensível. IAM analisa riscos de phishing e recuperação de conta. Analise onde o conhecimento de "FIDO2 e WebAuthn" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "FIDO2 e WebAuthn", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Ative método WebAuthn em IdP isolado; Teste login e exclusão da credencial.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** MFA baseado em código e push não significa resistência a phishing.

**Fonte técnica:** https://www.w3.org/TR/webauthn-3/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 5.4. Passkeys

**O que é:** Passkeys são credenciais FIDO baseadas em chave pública que podem substituir senha, conforme implementação. Passkeys implementam autenticação com chaves públicas e vinculação à origem em WebAuthn/FIDO2.

**Para que serve:** Reduz exposição a phishing e melhora a experiência de login.

**Como funciona:** Windows Hello, navegadores, gestores de passkey e IdPs que suportam WebAuthn. Conexão com IAM: Compare fatores, origem, recuperação e força da autenticação.

**Questão profissional:** Qual autenticador prova identidade com nível de garantia apropriado?

**Critério de competência:** Explica a autenticação e resistência a phishing.

**Cenário de fixação:** Compare resistência a phishing de passkey vinculada à origem com OTP compartilhado por usuário.

**Entrega esperada:** Explique challenge, par de chaves e por que o servidor não recebe chave privada.

**Risco:** MFA baseado em código e push não significa resistência a phishing.

**Fonte técnica:** https://fidoalliance.org/passkeys/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 5.5. Sessões, cookies e revogação

**O que é:** Sessão associa requisições autenticadas a um contexto; cookies seguros transportam identificadores de sessão.

**Para que serve:** Sequestrar sessão pode contornar novo desafio de senha ou MFA.

**Como funciona:** Configuração da aplicação e do IdP: SameSite, Secure, HttpOnly e timeouts. Conexão com IAM: Compare fatores, origem, recuperação e força da autenticação.

**Questão profissional:** Qual autenticador prova identidade com nível de garantia apropriado?

**Critério de competência:** Critério de aceite: Inspecione atributos de cookie em app de teste; Observe comportamento após revogar sessão.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Funcionário cadastrado pode usar método de autenticação inadequado para uma operação sensível. IAM analisa riscos de phishing e recuperação de conta. Analise onde o conhecimento de "Sessões, cookies e revogação" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Sessões, cookies e revogação", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Inspecione atributos de cookie em app de teste; Observe comportamento após revogar sessão.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** MFA baseado em código e push não significa resistência a phishing.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/authentication/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Autenticação, passkeys e MFA · Examinar sessão e localização: **Onde:** Conditional Access → Conditions → Network / Session. **Ação:** Projete uma localização nomeada somente se houver rede/IP sob sua administração. Compare Sign-in frequency e Persistent browser session para app de laboratório sem causar loop excessivo de autenticação. Não classifique toda a internet como rede confiável.. **Validação:** Tabela políticas + impacto de rede/sessão, horários UTC de avaliação e plano de exceção.. **Se falhar:** Endereço compartilhado ou VPN pode invalidar pressupostos de localização.

#### 5.6. Políticas condicionais e risco

**O que é:** Acesso baseado em risco avalia contexto como localização, dispositivo e sinais de comprometimento.

**Para que serve:** Pode exigir MFA ou bloquear acessos anômalos mesmo após credencial correta.

**Como funciona:** Entra Conditional Access e políticas adaptativas de IdPs. Conexão com IAM: Compare fatores, origem, recuperação e força da autenticação.

**Questão profissional:** Qual autenticador prova identidade com nível de garantia apropriado?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** Funcionário cadastrado pode usar método de autenticação inadequado para uma operação sensível. IAM analisa riscos de phishing e recuperação de conta. Analise onde o conhecimento de "Políticas condicionais e risco" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Políticas condicionais e risco", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** MFA baseado em código e push não significa resistência a phishing.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/authentication/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 9: Microsoft Entra ID

Serviço de identidade Microsoft para usuários, aplicações e controle de acesso na nuvem.

#### 9.1. Tenant Entra ID

**O que é:** Tenant Microsoft Entra é instância isolada de diretório cloud da organização. Tenant é limite de diretório da organização; não equivale a subscription Azure.

**Para que serve:** Identidades, grupos, aplicações e políticas são administrados dentro do tenant correto.

**Como funciona:** Microsoft Entra admin center → Overview / Properties; use tenant de laboratório. Conexão com IAM: Separe objetos tenant, aplicações, grupos e funções administrativas.

**Questão profissional:** A tarefa usa papel administrativo do Entra, grupo ou role da aplicação?

**Critério de competência:** Critério de aceite: Acesse tenant e registre tenant ID e domínios verificados; Diferencie tenant de assinatura Azure.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** AtlasCorp inicia sua administração de identidades em um tenant Entra. É necessário separar usuários, grupos, aplicativos e privilégios administrativos. Analise onde o conhecimento de "Tenant Entra ID" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Tenant Entra ID", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Acesse tenant e registre tenant ID e domínios verificados; Diferencie tenant de assinatura Azure.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Preparar laboratório seguro · Inventariar licenças: **Onde:** entra.microsoft.com → Entra ID → Billing → Licenses (navegação pode variar). **Ação:** Abra o tenant correto, confira P2 nos produtos licenciados e registre quais recursos dependem de planos adicionais. Não atribua P2 a usuários inexistentes.. **Validação:** Registro sanitizado: SKU, usuário de teste, restrições e orçamento.. **Se falhar:** Se o menu não aparecer, confira papel de leitura de licenças e diretório selecionado.

#### 9.2. Usuários Entra ID

**O que é:** O Microsoft Entra ID representa identidades por objetos de usuário dentro do tenant. Usuários podem ser criados diretamente na nuvem, sincronizados de uma origem local ou convidados de outra organização, dependendo do cenário.

**Para que serve:** Fornece contas autenticáveis, atributos de negócio e identidades de referência para atribuições e ciclo de vida.

**Como funciona:** Em um tenant de laboratório, crie contas fictícias em Entra ID → Users. Associe identificador e owner, aplique processo de Joiner e somente depois conceda grupos, app roles ou papéis administrativos quando justificados.

**Questão profissional:** A tarefa usa papel administrativo do Entra, grupo ou role da aplicação?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** AtlasCorp inicia sua administração de identidades em um tenant Entra. É necessário separar usuários, grupos, aplicativos e privilégios administrativos. Analise onde o conhecimento de "Usuários Entra ID" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Usuários Entra ID", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp: 2 procedimento(s) incorporado(s) diretamente na aula**

- Preparar laboratório seguro · Estabelecer identidades-piloto: **Onde:** Entra ID → Users → All users → New user. **Ação:** Crie camila.ti e ana.rh como usuários de laboratório; configure senha inicial forte e política de troca conforme fluxo suportado. Use nomes e dados fictícios.. **Validação:** Dois usuários visíveis, com object IDs mascarados no inventário.. **Se falhar:** Erro: falta permissão de User Administrator ou domínio incorreto.
- Ciclo de vida Joiner–Mover–Leaver · Criar e associar identidade: **Onde:** Entra ID → Users → New user. **Ação:** Crie camila.ti com employeeId de teste, departamento e gestor fictício quando os atributos forem disponíveis. Atribua SG-ATL-TI-BASE.. **Validação:** Usuário aparece no grupo esperado e não pertence a FIN-BASE.. **Se falhar:** Se for usuário híbrido, corrija na fonte autoritativa e aguarde sincronização.

#### 9.3. Grupos Entra ID

**O que é:** Grupos do Microsoft Entra ID reúnem identidades para facilitar a atribuição de aplicativos, licenças e outros recursos, conforme o suporte específico de cada serviço.

**Para que serve:** Reduz concessões individuais e facilita governança, recertificação e desligamento.

**Como funciona:** Em Entra ID → Groups, crie grupo de segurança, registre owner, escopo e membros. Para conceder acesso real a uma aplicação, também é necessário configurar a aplicação para utilizar aquele grupo, sua atribuição ou uma role correspondente. Criar o grupo isoladamente não entrega permissão de negócio.

**Questão profissional:** A tarefa usa papel administrativo do Entra, grupo ou role da aplicação?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** AtlasCorp inicia sua administração de identidades em um tenant Entra. É necessário separar usuários, grupos, aplicativos e privilégios administrativos. Analise onde o conhecimento de "Grupos Entra ID" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Grupos Entra ID", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Preparar laboratório seguro · Organizar grupos de negócio: **Onde:** Entra ID → Groups → All groups → New group. **Ação:** Crie SG-ATL-RH-BASE, SG-ATL-FIN-BASE e SG-ATL-TI-BASE como grupos de segurança e configure owner para cada um.. **Validação:** Grupo, owner, finalidade, classificação e membros registrados.. **Se falhar:** Se grupo não fornece acesso, ele ainda precisa ser associado a app, role ou controle de recurso.

#### 9.4. Roles Entra ID

**O que é:** Papéis administrativos do Microsoft Entra ID autorizam tarefas de gestão do diretório, como administrar grupos, usuários ou configurações de autenticação. Não representam automaticamente os cargos nem os direitos em aplicativos da empresa.

**Para que serve:** Distribui responsabilidades administrativas por menor privilégio, permitindo delegar atividades sem usar Global Administrator para tarefas rotineiras.

**Como funciona:** Entra ID → Roles and administrators permite examinar papéis internos, permissões e atribuições. Compare Groups Administrator com um grupo funcional de Financeiro e com Azure Reader, que se aplica a recursos Azure, não ao diretório.

**Questão profissional:** A tarefa usa papel administrativo do Entra, grupo ou role da aplicação?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** AtlasCorp inicia sua administração de identidades em um tenant Entra. É necessário separar usuários, grupos, aplicativos e privilégios administrativos. Analise onde o conhecimento de "Roles Entra ID" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Roles Entra ID", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**Complemento:** [Referência de papéis administrativos Entra](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-overview)

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Preparar laboratório seguro · Preservar recuperação administrativa: **Onde:** Entra ID → Roles and administrators / Emergency access guidance. **Ação:** Projete e valide contas de emergência segundo orientação oficial; evite depender apenas do mesmo mecanismo de MFA do piloto. Não remova a última conta administrativa testada.. **Validação:** Runbook com onde estão os fatores, responsáveis, monitoramento e teste planejado.. **Se falhar:** Teste de acesso emergencial deve ser feito em processo controlado, sem derrubar sessões válidas.

#### 9.5. Enterprise Applications

**O que é:** Uma enterprise application é a representação de uma aplicação/serviço integrado no tenant, geralmente associada a um service principal, com opções de SSO, atribuição de usuários/grupos e configurações próprias.

**Para que serve:** Conecta a identidade corporativa ao aplicativo, permitindo controlar quem pode acessar e, se suportado, que função exercerá.

**Como funciona:** Em Entra ID → Enterprise applications → aplicativo → Users and groups, atribua identidades e app roles que a aplicação expõe. Teste tanto autenticação quanto autorização no serviço; o simples vínculo com um grupo não prova controle por ação ou por registro.

**Questão profissional:** A tarefa usa papel administrativo do Entra, grupo ou role da aplicação?

**Critério de competência:** Critério de aceite: Adicione app empresarial de teste; Inspecione opções Single sign-on e Provisioning quando disponíveis.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** AtlasCorp inicia sua administração de identidades em um tenant Entra. É necessário separar usuários, grupos, aplicativos e privilégios administrativos. Analise onde o conhecimento de "Enterprise Applications" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Enterprise Applications", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Adicione app empresarial de teste; Inspecione opções Single sign-on e Provisioning quando disponíveis.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Federação SAML e OpenID Connect · Vincular grupo a aplicação: **Onde:** Entra ID → Enterprise applications → Users and groups. **Ação:** Associe grupo de usuário autorizado à aplicação com atribuição conforme suporte do tipo de app.. **Validação:** Usuário atribuído e não atribuído tratados de forma distinta.. **Se falhar:** Confirme políticas e edição de Enterprise Application usadas no tenant.

#### 9.6. App Registrations

**O que é:** App Registrations definem identidade de aplicativos que usam Microsoft identity platform.

**Para que serve:** Client ID, redirect URI e permissões afetam segurança dos fluxos OAuth/OIDC.

**Como funciona:** Entra admin center → App registrations. Conexão com IAM: Separe objetos tenant, aplicações, grupos e funções administrativas.

**Questão profissional:** A tarefa usa papel administrativo do Entra, grupo ou role da aplicação?

**Critério de competência:** Critério de aceite: Registre app de laboratório; Use endpoint OIDC de teste e valide login.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** AtlasCorp inicia sua administração de identidades em um tenant Entra. É necessário separar usuários, grupos, aplicativos e privilégios administrativos. Analise onde o conhecimento de "App Registrations" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "App Registrations", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Registre app de laboratório; Use endpoint OIDC de teste e valide login.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Federação SAML e OpenID Connect · Registrar app: **Onde:** Entra ID → App registrations → New registration. **Ação:** Registre aplicação Financeiro-LAB, defina Supported account types adequados ao laboratório e redirect URI específica (localhost HTTPS quando aplicável).. **Validação:** Application/client ID mascarado e redirect registrado.. **Se falhar:** Redirect URI diferente do callback quebra o fluxo.

#### 9.7. Conditional Access

**O que é:** Conditional Access (CA) é o mecanismo de políticas do Entra que avalia atribuições, condições e controles de acesso, como exigir MFA ou dispositivo conforme para determinado usuário e aplicativo.

**Para que serve:** Reduz risco em acessos a recursos ao aplicar requisitos proporcionais ao contexto. Requer licença elegível e planejamento para não bloquear usuários e contas emergenciais.

**Como funciona:** Defina quem está no escopo, que recurso será acessado e que controle é exigido. Comece com grupo piloto e Report-only, confirme avaliação nos Sign-in logs e somente depois habilite a política para esse grupo. Authentication methods define quais métodos podem ser registrados; CA determina em que contexto devem ser usados.

**Questão profissional:** A tarefa usa papel administrativo do Entra, grupo ou role da aplicação?

**Critério de competência:** Interpreta políticas aplicadas em log de entrada.

**Cenário de fixação:** Camila pertence ao grupo piloto e acessa o app de teste. Compare sua autenticação com a de uma pessoa fora do grupo.

**Entrega esperada:** Tabela escopo, recurso, Grant control, Report-only e resultado real nos Sign-in logs, com plano de rollback.

**Risco:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview

**Complemento:** [Planejamento oficial de Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access)

**Complemento:** [Análise de políticas Report-only](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only)

**AtlasCorp: 5 procedimento(s) incorporado(s) diretamente na aula**

- Autenticação, passkeys e MFA · Preparar um escopo reversível: **Onde:** Entra ID → Groups → All groups. **Ação:** Crie SG-ATL-LAB-CA-PILOT se ainda não existir. Inclua somente camila.ti de laboratório e registre contas de emergência que não deverão entrar no piloto.. **Validação:** Membros esperados e a justificativa da exclusão de emergência.. **Se falhar:** Se o grupo contém administradores, use conta de teste sem privilégio.
- Autenticação, passkeys e MFA · Construir política de MFA: **Onde:** Entra ID → Conditional Access → Policies → New policy. **Ação:** Nomeie CA-ATL-001-PILOT-MFA. Em Users or workload identities, Include → Select users and groups → SG-ATL-LAB-CA-PILOT. Em Target resources, escolha a aplicação de teste ou conjunto controlado. Em Grant, marque Grant access → Require authentication strength → Multifactor authentication (ou controle equivalente na UI atual).. **Validação:** Captura redigida dos campos Include, Target resources e Grant.. **Se falhar:** Se target app não aparecer, confirme enterprise application e sessão suportada.
- Autenticação, passkeys e MFA · Manter a política em Report-only: **Onde:** Conditional Access → CA-ATL-001-PILOT-MFA → Enable policy. **Ação:** Escolha Report-only antes de criar. Não selecione On imediatamente. Abra What If quando disponível e simule escopo com usuário e recurso.. **Validação:** Resultado de What If e propriedade Report-only.. **Se falhar:** What If não substitui análise do sign-in real; simulações não cobrem todos os sinais.
- Autenticação, passkeys e MFA · Ativar para o grupo piloto: **Onde:** Conditional Access → CA-ATL-001-PILOT-MFA. **Ação:** Somente se o registro de métodos, recuperação emergencial e testes report-only estiverem corretos, altere Enable policy para On. Use apenas o escopo piloto.. **Validação:** Captura da política habilitada e login com segundo fator no usuário piloto.. **Se falhar:** Caso crítico: use conta de emergência para desabilitar a política piloto.
- Autenticação, passkeys e MFA · Revisar combinação de políticas CA: **Onde:** Conditional Access → Policies / Sign-in logs. **Ação:** Documente quando duas regras independentes se aplicam simultaneamente: por exemplo MFA e dispositivo conforme. Teste a política piloto MFA separadamente antes de introduzir novas condições. Confirme que todos os requisitos aplicáveis podem precisar ser satisfeitos.. **Validação:** Matriz de resultados esperados para usuário, dispositivo, app e condição de risco.. **Se falhar:** Não interprete êxito de uma política isolada como êxito do conjunto efetivo.

#### 9.8. MFA Entra ID

**O que é:** Autenticação multifator combina categorias independentes de fatores para reduzir dependência de uma única credencial. Métodos de MFA diferem em garantia e resistência a phishing.

**Para que serve:** Protege identidades contra comprometimento de senha, particularmente em acessos privilegiados e de alto risco.

**Como funciona:** Habilite métodos apropriados para grupo piloto, registre-os no perfil de segurança do usuário e aplique requisitos por Conditional Access no aplicativo de teste. Compare métodos resistentes a phishing com aqueles vulneráveis a proxy adversário.

**Questão profissional:** A tarefa usa papel administrativo do Entra, grupo ou role da aplicação?

**Critério de competência:** Critério de aceite: Habilite método suportado para usuário teste; Teste login e recuperação com método alternativo.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** AtlasCorp inicia sua administração de identidades em um tenant Entra. É necessário separar usuários, grupos, aplicativos e privilégios administrativos. Analise onde o conhecimento de "MFA Entra ID" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "MFA Entra ID", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Habilite método suportado para usuário teste; Teste login e recuperação com método alternativo.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/

**AtlasCorp: 3 procedimento(s) incorporado(s) diretamente na aula**

- Autenticação, passkeys e MFA · Definir métodos disponíveis: **Onde:** Entra ID → Protection → Authentication methods → Policies. **Ação:** Inspecione políticas de métodos. Habilite Microsoft Authenticator/FIDO2 para grupo de teste quando necessário e permitido. Não desabilite métodos de toda a organização.. **Validação:** Usuário piloto visualiza e registra método permitido.. **Se falhar:** Ausência de método pode ser grupo errado, licenciamento ou registro incompleto.
- Autenticação, passkeys e MFA · Concluir registro da conta-piloto: **Onde:** https://mysignins.microsoft.com/security-info. **Ação:** Como camila.ti, registre autenticação disponível em sessão controlada. Para teste de phishing-resistance, use passkey FIDO2 autenticada e suportada pelo navegador/dispositivo.. **Validação:** Método visível em Security info, sem compartilhar detalhes pessoais.. **Se falhar:** Se FIDO2 não é suportado, escolha MFA compatível e documente diferença de garantia.
- Autenticação, passkeys e MFA · Distinguir políticas e métodos: **Onde:** Entra → Protection → Authentication methods / Conditional Access. **Ação:** Documente a diferença entre: quem pode registrar Microsoft Authenticator/passkey (Authentication methods), quando é exigido um método (CA authentication strength) e a autorização final da aplicação. Faça diagrama usuário → método → CA → recurso.. **Validação:** Matriz: usuário | método registrado | strength exigida | app | decisão.. **Se falhar:** Um usuário pode ter método registrado e ainda falhar por CA ou falta de autorização na app.

#### 9.9. Graph API e federação híbrida

**O que é:** Microsoft Graph é a API de gerenciamento de objetos Microsoft; sincronização e federação híbrida são arquiteturas diferentes e precisam ser estudadas separadamente.

**Para que serve:** Automação e identidade híbrida exigem consentimentos mínimos e fonte de autoridade clara.

**Como funciona:** Microsoft Graph Explorer em tenant de teste; Entra Connect/Cloud Sync para cenários híbridos. Conexão com IAM: Separe objetos tenant, aplicações, grupos e funções administrativas.

**Questão profissional:** A tarefa usa papel administrativo do Entra, grupo ou role da aplicação?

**Critério de competência:** Critério de aceite: Use Graph Explorer para GET /me ou /users com permissão adequada; Desenhe fluxo AD → Entra e mapeie atributos de correlação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** AtlasCorp inicia sua administração de identidades em um tenant Entra. É necessário separar usuários, grupos, aplicativos e privilégios administrativos. Analise onde o conhecimento de "Graph API e federação híbrida" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Graph API e federação híbrida", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Use Graph Explorer para GET /me ou /users com permissão adequada; Desenhe fluxo AD → Entra e mapeie atributos de correlação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Azure RBAC e papéis administrativos Entra não são equivalentes.

**Fonte técnica:** https://learn.microsoft.com/en-us/graph/overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 4: Autorização e políticas

Autorização aplica regras a recursos: login bem-sucedido não concede todas as permissões.

#### 4.1. RBAC

**O que é:** RBAC (Role-Based Access Control) é um modelo de autorização que organiza permissões em funções (roles) e atribui essas funções a sujeitos. A decisão depende da role, da operação e do recurso, podendo incluir escopo e regras adicionais.

**Para que serve:** Permite conceder acesso conforme as responsabilidades do trabalho, com mínimo privilégio, revisão e segregação de funções. Por exemplo, um analista financeiro pode consultar relatórios sem receber a permissão de aprová-los ou modificar pagamentos.

**Como funciona:** Na AtlasCorp, grupos como SG-ATL-FIN-APP-READ organizam quem precisa de um direito de negócio. A aplicação pode expor uma app role Leitor e associá-la ao grupo; a API ainda deve validar o token e a autorização para cada ação/recurso. Já Entra ID → Roles and administrators delega tarefas administrativas do diretório, e Azure RBAC controla recursos Azure: são superfícies distintas, não equivalentes.

**Questão profissional:** Quem pode executar a ação no recurso específico?

**Critério de competência:** Comprova ação permitida e negada por papel.

**Cenário de fixação:** Bruno pode ler um relatório financeiro, mas não editar; Camila (TI) não acessa o relatório; Renata aprova apenas ações permitidas.

**Entrega esperada:** Matriz usuário-grupo-app role-ação com ao menos uma decisão permitida e duas negadas no serviço.

**Risco:** Remover um botão não protege a operação no servidor.

**Fonte técnica:** https://csrc.nist.gov/projects/role-based-access-control

**Complemento:** [Modelo RBAC administrativo do Entra](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-overview)

**Complemento:** [Diferenciar Entra roles e Azure RBAC](https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles)

**AtlasCorp: 5 procedimento(s) incorporado(s) diretamente na aula**

- Autorização e privilégios efetivos · Mapear ações e atores: **Onde:** Matriz negócio → ação → recurso. **Ação:** Crie duas operações GET e PATCH e três perfis: Camila (TI), Bruno (Financeiro), Renata (Aprovadora). Marque ações permitidas e negadas.. **Validação:** Tabela de verdade com operações e escopos.. **Se falhar:** Não confunda "pode autenticar" com "pode modificar relatório".
- Autorização e privilégios efetivos · Definir grupos de negócio: **Onde:** Entra ID → Groups. **Ação:** Crie SG-ATL-FIN-APP-READ e SG-ATL-FIN-APP-APPROVE, com owner e critério para aprovação. Associe Bruno ao READ.. **Validação:** Inventário de membros e owners.. **Se falhar:** A app precisa mapear explicitamente grupo ou app role a ações.
- Autorização e privilégios efetivos · Atribuir acesso à aplicação: **Onde:** Entra ID → Enterprise applications → Users and groups. **Ação:** Em enterprise application de teste com app roles expostas, vincule grupo READ à role de leitura; se app não oferece roles, implemente mapeamento no backend de teste.. **Validação:** Entitlement de app e usuário autorizado.. **Se falhar:** Alguns tipos de app e licenças limitam group-based assignment; confirme suporte.
- Autorização e privilégios efetivos · Provar casos permitidos/negados: **Onde:** API local → GET/PATCH /reports/{id}. **Ação:** Faça GET permitido com Bruno e PATCH proibido. Com usuário de TI, tente ler relatório restrito. Respostas 200/403 são exemplos; siga a semântica da API de teste.. **Validação:** Saída de cada teste, recurso e ator mascarados.. **Se falhar:** Se ocultar botão gera 403 apenas na UI, corrija verificação no backend.
- Autorização e privilégios efetivos · Revogar acesso: **Onde:** Entra ID → Groups / app roles. **Ação:** Remova Bruno do grupo de leitura ou da app role e verifique a nova sessão, considerando validade de tokens emitidos.. **Validação:** Teste de acesso após revogação e observação de sessão.. **Se falhar:** Se ainda acessa, avalie cache, token anterior e concessões diretas adicionais.

#### 4.2. Modelagem de roles

**O que é:** Modelar roles é definir conjuntos coerentes de ações e recursos necessários a uma atividade profissional, evitando conceder privilégios excessivos para tarefas comuns.

**Para que serve:** Estabelece permissões auditáveis e reduz conflitos de interesse e aprovações arbitrárias. A role precisa de owner, justificativa, escopo e critérios de concessão/revogação.

**Como funciona:** Parta de tarefas de negócio, identifique ações permitidas, crie papéis separados (Leitor, Editor, Aprovador) e teste casos de permissão e negação. Não confunda um grupo organizacional com uma role efetivamente consumida por uma API.

**Questão profissional:** Quem pode executar a ação no recurso específico?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** Financeiro recebe solicitação de leitura e aprovação de documentos, enquanto TI opera a plataforma. Os direitos precisam ser distinguidos e auditados. Analise onde o conhecimento de "Modelagem de roles" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Modelagem de roles", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Remover um botão não protege a operação no servidor.

**Fonte técnica:** https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 4.3. ABAC

**O que é:** ABAC decide acesso a partir de atributos de sujeito, recurso, ação e ambiente. ABAC decide usando atributos de sujeito, recurso, ação e contexto com fontes confiáveis.

**Para que serve:** Permite regras de contexto mais finas que roles fixas.

**Como funciona:** Motor de políticas da aplicação, OPA ou IAM com condições. Conexão com IAM: Cheque role, escopo, permissão efetiva e teste negativo no backend.

**Questão profissional:** Quem pode executar a ação no recurso específico?

**Critério de competência:** Testa alteração de atributo e decisão correspondente.

**Cenário de fixação:** Financeiro recebe solicitação de leitura e aprovação de documentos, enquanto TI opera a plataforma. Os direitos precisam ser distinguidos e auditados. Analise onde o conhecimento de "ABAC" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "ABAC", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Testa alteração de atributo e decisão correspondente.

**Risco:** Remover um botão não protege a operação no servidor.

**Fonte técnica:** https://csrc.nist.gov/pubs/sp/800/162/upd2/final

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 4.4. ACL

**O que é:** Access Control List associa permissões a usuários ou grupos sobre um recurso. ACL relaciona sujeito e permissões por objeto; avalie herança e prioridades de negação.

**Para que serve:** É a autorização efetiva de muitos arquivos e objetos Windows/Linux.

**Como funciona:** Propriedades Security em NTFS ou setfacl no Linux. Conexão com IAM: Cheque role, escopo, permissão efetiva e teste negativo no backend.

**Questão profissional:** Quem pode executar a ação no recurso específico?

**Critério de competência:** Critério de aceite: Crie pasta de teste; Confirme acesso de duas contas.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Financeiro recebe solicitação de leitura e aprovação de documentos, enquanto TI opera a plataforma. Os direitos precisam ser distinguidos e auditados. Analise onde o conhecimento de "ACL" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "ACL", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie pasta de teste; Confirme acesso de duas contas.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Remover um botão não protege a operação no servidor.

**Fonte técnica:** https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 4.5. Negação por padrão

**O que é:** Deny by default rejeita qualquer operação que não possua autorização explícita.

**Para que serve:** Prevenção contra novos endpoints ou roles inadvertidamente públicos.

**Como funciona:** Middlewares e verificações de autorização do backend. Conexão com IAM: Cheque role, escopo, permissão efetiva e teste negativo no backend.

**Questão profissional:** Quem pode executar a ação no recurso específico?

**Critério de competência:** Critério de aceite: Crie endpoint protegido em aplicação de teste; Compare respostas 401, 403 e 200.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Financeiro recebe solicitação de leitura e aprovação de documentos, enquanto TI opera a plataforma. Os direitos precisam ser distinguidos e auditados. Analise onde o conhecimento de "Negação por padrão" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Negação por padrão", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie endpoint protegido em aplicação de teste; Compare respostas 401, 403 e 200.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Remover um botão não protege a operação no servidor.

**Fonte técnica:** https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 4.6. Entitlements e SoD

**O que é:** Entitlement é direito específico numa aplicação; SoD limita combinações incompatíveis.

**Para que serve:** Governança precisa revisar cada direito e detectar concentração de tarefas críticas.

**Como funciona:** Catálogo IGA e matrizes de funções da organização. Conexão com IAM: Cheque role, escopo, permissão efetiva e teste negativo no backend.

**Questão profissional:** Quem pode executar a ação no recurso específico?

**Critério de competência:** Critério de aceite: Cadastre entitlements Aprovar e Solicitar; Simule pedido que deve ser negado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Financeiro recebe solicitação de leitura e aprovação de documentos, enquanto TI opera a plataforma. Os direitos precisam ser distinguidos e auditados. Analise onde o conhecimento de "Entitlements e SoD" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Entitlements e SoD", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Cadastre entitlements Aprovar e Solicitar; Simule pedido que deve ser negado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Remover um botão não protege a operação no servidor.

**Fonte técnica:** https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 4.7. Testes de autorização no backend

**O que é:** Verificação de autorização deve ocorrer no servidor em cada operação, mesmo se UI ocultar ação.

**Para que serve:** Usuário pode chamar APIs diretamente; esconder botão não protege dados.

**Como funciona:** Controllers e middleware de backend em APIs. Conexão com IAM: Cheque role, escopo, permissão efetiva e teste negativo no backend.

**Questão profissional:** Quem pode executar a ação no recurso específico?

**Critério de competência:** Critério de aceite: Crie GET e PATCH de recurso fictício; Registre 403 para operação proibida e 200 para permitida.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Financeiro recebe solicitação de leitura e aprovação de documentos, enquanto TI opera a plataforma. Os direitos precisam ser distinguidos e auditados. Analise onde o conhecimento de "Testes de autorização no backend" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Testes de autorização no backend", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie GET e PATCH de recurso fictício; Registre 403 para operação proibida e 200 para permitida.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Remover um botão não protege a operação no servidor.

**Fonte técnica:** https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 6: SSO e SAML 2.0

Um IdP pode autenticar uma pessoa para múltiplas aplicações mediante relações de confiança.

#### 6.1. Identity Provider (IdP)

**O que é:** IdP é serviço que autentica usuários e emite informações confiáveis para aplicações.

**Para que serve:** Centraliza MFA, sessão, logs e padrões SAML/OIDC utilizados em SSO.

**Como funciona:** Microsoft Entra, Keycloak ou Authentik na configuração do tenant/realm. Conexão com IAM: Separe IdP, SP, metadata, certificado, atributos e autorização local.

**Questão profissional:** Emissor, destinatário, tempo e assinatura da assertion foram validados?

**Critério de competência:** Critério de aceite: Crie usuário fictício no IdP; Valide que login ocorre no domínio do provedor.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Portal externo aceita SSO, mas há diferença entre certificados, emissor da assertion e destinatário configurado. Analise onde o conhecimento de "Identity Provider (IdP)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Identity Provider (IdP)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie usuário fictício no IdP; Valide que login ocorre no domínio do provedor.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 6.2. Service Provider (SP)

**O que é:** SP é aplicação consumidora de autenticação federada, especialmente em SAML.

**Para que serve:** A confiança entre SP e IdP depende de endpoints e validações corretas.

**Como funciona:** Configurações SAML do aplicativo: Entity ID, ACS e metadata. Conexão com IAM: Separe IdP, SP, metadata, certificado, atributos e autorização local.

**Questão profissional:** Emissor, destinatário, tempo e assinatura da assertion foram validados?

**Critério de competência:** Critério de aceite: Selecione app SAML de laboratório; Cadastre SP no IdP e teste login.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Portal externo aceita SSO, mas há diferença entre certificados, emissor da assertion e destinatário configurado. Analise onde o conhecimento de "Service Provider (SP)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Service Provider (SP)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Selecione app SAML de laboratório; Cadastre SP no IdP e teste login.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 6.3. SSO

**O que é:** SSO reutiliza confiança e autenticação em aplicativos, mas cada aplicação continua responsável por aplicar autorização a seus próprios recursos. SSO pode reduzir logins repetidos, mas não remove a obrigação de autorização individual em aplicações.

**Para que serve:** Diminui senhas dispersas e permite MFA consistente; não substitui autorização.

**Como funciona:** Entra Enterprise Applications → Single sign-on ou Clients no Keycloak. Conexão com IAM: Separe IdP, SP, metadata, certificado, atributos e autorização local.

**Questão profissional:** Emissor, destinatário, tempo e assinatura da assertion foram validados?

**Critério de competência:** Explica IdP/SP, login e limites da autorização.

**Cenário de fixação:** Portal externo aceita SSO, mas há diferença entre certificados, emissor da assertion e destinatário configurado. Analise onde o conhecimento de "SSO" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "SSO", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Explica IdP/SP, login e limites da autorização.

**Risco:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/what-is-single-sign-on

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 6.4. Metadados SAML

**O que é:** Metadata SAML é XML que publica Entity ID, URLs de serviços e certificados de assinatura.

**Para que serve:** Troca de metadados evita divergência de endpoints e falhas de confiança.

**Como funciona:** Telas de configuração SAML do IdP e SP. Conexão com IAM: Separe IdP, SP, metadata, certificado, atributos e autorização local.

**Questão profissional:** Emissor, destinatário, tempo e assinatura da assertion foram validados?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Portal externo aceita SSO, mas há diferença entre certificados, emissor da assertion e destinatário configurado. Analise onde o conhecimento de "Metadados SAML" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Metadados SAML", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 6.5. Assertions SAML

**O que é:** Assertion SAML é documento XML com declarações sobre autenticação, sujeito e atributos. Assertion contém declarações assinadas ou protegidas; validar destinatário e prazo importa tanto quanto assinar.

**Para que serve:** SP deve validar audiência, tempo, destinatário e assinatura antes de aceitar login.

**Como funciona:** Tráfego SAML em aplicação de teste e ferramenta de inspeção apropriada. Conexão com IAM: Separe IdP, SP, metadata, certificado, atributos e autorização local.

**Questão profissional:** Emissor, destinatário, tempo e assinatura da assertion foram validados?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Portal externo aceita SSO, mas há diferença entre certificados, emissor da assertion e destinatário configurado. Analise onde o conhecimento de "Assertions SAML" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Assertions SAML", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte técnica:** https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 6.6. Assinaturas SAML

**O que é:** Assinaturas XML verificam integridade e emissor das mensagens/assertions SAML.

**Para que serve:** Ignorar assinatura pode permitir aceitação de afirmações de identidade forjadas.

**Como funciona:** Configuração de certificado público de assinatura no SP e IdP. Conexão com IAM: Separe IdP, SP, metadata, certificado, atributos e autorização local.

**Questão profissional:** Emissor, destinatário, tempo e assinatura da assertion foram validados?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Portal externo aceita SSO, mas há diferença entre certificados, emissor da assertion e destinatário configurado. Analise onde o conhecimento de "Assinaturas SAML" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Assinaturas SAML", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 6.7. Integração SAML de aplicativo

**O que é:** Federação SAML estabelece confiança entre IdP e SP para autenticação via navegador.

**Para que serve:** Viabiliza SSO para aplicativos corporativos sem senha local por aplicação.

**Como funciona:** Entra Enterprise Applications → Single sign-on → SAML ou Keycloak Clients → SAML. Conexão com IAM: Separe IdP, SP, metadata, certificado, atributos e autorização local.

**Questão profissional:** Emissor, destinatário, tempo e assinatura da assertion foram validados?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Portal externo aceita SSO, mas há diferença entre certificados, emissor da assertion e destinatário configurado. Analise onde o conhecimento de "Integração SAML de aplicativo" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Integração SAML de aplicativo", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 6.8. Investigação de falhas SSO

**O que é:** Diagnóstico SSO correlaciona erros de IdP, SP, relógio, certificado e redirecionamento.

**Para que serve:** Falha de confiança ou URL pode impedir acesso de todo um grupo.

**Como funciona:** Logs de entrada Entra/Keycloak e configurações SAML/OIDC dos dois lados. Conexão com IAM: Separe IdP, SP, metadata, certificado, atributos e autorização local.

**Questão profissional:** Emissor, destinatário, tempo e assinatura da assertion foram validados?

**Critério de competência:** Relaciona evidência, causa provável, correção e novo teste.

**Cenário de fixação:** Portal externo aceita SSO, mas há diferença entre certificados, emissor da assertion e destinatário configurado. Analise onde o conhecimento de "Investigação de falhas SSO" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Investigação de falhas SSO", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Relaciona evidência, causa provável, correção e novo teste.

**Risco:** Um assertion válido para outra aplicação não deve ser aceito.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 7: OAuth 2.0, OIDC e JWT

OAuth delega autorização; OIDC adiciona autenticação sobre OAuth e declarações de identidade.

#### 7.1. Authorization Code com PKCE

**O que é:** Authorization Code entrega código de autorização a cliente; PKCE vincula troca do código ao solicitante. PKCE protege a troca do authorization code; state e validação de redirect continuam necessários.

**Para que serve:** Impede interceptação útil do código e é padrão em clientes públicos modernos.

**Como funciona:** App Registrations no Entra ou Clients Keycloak; cliente OIDC com redirect URI. Conexão com IAM: Valide authorization code/PKCE, state, nonce, issuer e audience.

**Questão profissional:** O token é destinado ao cliente ou ao recurso da API?

**Critério de competência:** Critério de aceite: Registre cliente OIDC com code flow e PKCE; Valide token obtido no callback.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** O aplicativo testa callback conhecido e outro não registrado. O código de autorização não pode ser aceito por qualquer redirect.

**Entrega esperada:** Fluxo com state, code challenge/verifier, audience e teste negativo de URI.

**Risco:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc7636

**Complemento:** [Fluxo de código de autorização Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow)

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Federação SAML e OpenID Connect · Configurar protocolo: **Onde:** App cliente de teste → OIDC. **Ação:** Use Authorization Code e PKCE; gere verifier/challenge e state. Verifique parâmetros no redirect ao IdP.. **Validação:** Fluxo de autorização documentado sem códigos nem tokens reais.. **Se falhar:** Ausência de PKCE em cliente público é falha de projeto.

#### 7.2. Scopes

**O que é:** Scopes representam permissões delegadas expostas por uma API; sua presença não substitui validação de ownership e autorização sobre o objeto. Scopes OAuth não descrevem automaticamente o direito a cada objeto individual de uma API.

**Para que serve:** Scopes limitam quais operações e dados o token pode habilitar.

**Como funciona:** Parâmetro scope na autorização OAuth e permissões de API do IdP. Conexão com IAM: Valide authorization code/PKCE, state, nonce, issuer e audience.

**Questão profissional:** O token é destinado ao cliente ou ao recurso da API?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Aplicação de relatórios utiliza autorização OAuth/OIDC; o cliente e a API exigem tokens para finalidades diferentes. Analise onde o conhecimento de "Scopes" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Scopes", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte técnica:** https://openid.net/developers/specs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 7.3. Claims

**O que é:** Claim é declaração de identidade/contexto presente em token ou assertion. Claims são afirmações sobre sujeito e contexto, devem ser verificadas quanto a emissor, público e validade.

**Para que serve:** Aplicações usam sub, email e roles para criar contexto, mas precisam validar origem do token.

**Como funciona:** ID token OIDC e mapeadores de claims de IdPs. Conexão com IAM: Valide authorization code/PKCE, state, nonce, issuer e audience.

**Questão profissional:** O token é destinado ao cliente ou ao recurso da API?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Aplicação de relatórios utiliza autorização OAuth/OIDC; o cliente e a API exigem tokens para finalidades diferentes. Analise onde o conhecimento de "Claims" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Claims", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte técnica:** https://openid.net/developers/specs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 7.4. Consentimento OAuth

**O que é:** Consentimento registra aprovação de permissões solicitadas por um cliente OAuth. Consentimento deve ser limitado às permissões necessárias e governado especialmente em aplicativos terceiros.

**Para que serve:** Excesso de consentimento pode conceder acesso indevido a dados via aplicativo.

**Como funciona:** Consentimento de usuário ou administrador em Entra App Registrations/API permissions. Conexão com IAM: Valide authorization code/PKCE, state, nonce, issuer e audience.

**Questão profissional:** O token é destinado ao cliente ou ao recurso da API?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Aplicação de relatórios utiliza autorização OAuth/OIDC; o cliente e a API exigem tokens para finalidades diferentes. Analise onde o conhecimento de "Consentimento OAuth" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Consentimento OAuth", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte técnica:** https://openid.net/developers/specs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 7.5. ID Token

**O que é:** ID token no OIDC fornece informações de autenticação ao cliente; não substitui a decisão de autorização da API nem serve como bearer token para recursos arbitrários. ID token autentica o usuário para o cliente OIDC e não deve ser aceito como access token por API.

**Para que serve:** Não deve ser usado no lugar do access token para autorizar APIs.

**Como funciona:** Resposta OIDC ao cliente, com iss, sub, aud e exp. Conexão com IAM: Valide authorization code/PKCE, state, nonce, issuer e audience.

**Questão profissional:** O token é destinado ao cliente ou ao recurso da API?

**Critério de competência:** Valida emissor, audiência, expiração e assinatura.

**Cenário de fixação:** Aplicação de relatórios utiliza autorização OAuth/OIDC; o cliente e a API exigem tokens para finalidades diferentes. Analise onde o conhecimento de "ID Token" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "ID Token", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Valida emissor, audiência, expiração e assinatura.

**Risco:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte técnica:** https://openid.net/specs/openid-connect-core-1_0.html

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Federação SAML e OpenID Connect · Conferir tokens: **Onde:** Aplicação → validação OIDC/OAuth. **Ação:** Inspecione somente cabeçalhos/claims não sensíveis. Identifique ID token para o cliente e access token para API, e valide seus destinatários.. **Validação:** Matriz ID token versus access token com audience e finalidade.. **Se falhar:** JWT não é obrigatório como formato de access token.

#### 7.6. Access Token

**O que é:** Access token é emitido para acesso a um recurso/API; a API valida emissor, público, escopo/papéis, validade e políticas necessárias. Não é um ID token. Access token autoriza chamada a recurso designado; formato não é necessariamente JWT.

**Para que serve:** API deve validar emissor, audiência, assinatura e autorização adequada.

**Como funciona:** Cabeçalho Authorization: Bearer na API de teste. Conexão com IAM: Valide authorization code/PKCE, state, nonce, issuer e audience.

**Questão profissional:** O token é destinado ao cliente ou ao recurso da API?

**Critério de competência:** Distingue autorização de autenticação.

**Cenário de fixação:** Aplicação de relatórios utiliza autorização OAuth/OIDC; o cliente e a API exigem tokens para finalidades diferentes. Analise onde o conhecimento de "Access Token" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Access Token", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Distingue autorização de autenticação.

**Risco:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc6749

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 7.7. JWT

**O que é:** JWT é um formato de token com claims que pode ser assinado e/ou criptografado; não equivale a OAuth ou OIDC. Um access token não precisa ter formato JWT e a aplicação não deve assumir isso. JWT é formato de claims potencialmente assinado e/ou criptografado; não é um protocolo de login.

**Para que serve:** Decodificar não basta; aceitar assinatura ou algoritmo indevido compromete confiança.

**Como funciona:** Tokens OAuth/OIDC em aplicações e validadores do backend. Conexão com IAM: Valide authorization code/PKCE, state, nonce, issuer e audience.

**Questão profissional:** O token é destinado ao cliente ou ao recurso da API?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Aplicação de relatórios utiliza autorização OAuth/OIDC; o cliente e a API exigem tokens para finalidades diferentes. Analise onde o conhecimento de "JWT" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "JWT", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc7519

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 7.8. Issuer

**O que é:** Issuer (iss) identifica o provedor emissor do token. Issuer identifica emissor e precisa ser comparado com a fonte esperada, não apenas extraído do token.

**Para que serve:** Aceitar token de emissor não confiável permite impersonação entre tenants/IdPs.

**Como funciona:** Configuração de validação JWT no backend e metadata OIDC. Conexão com IAM: Valide authorization code/PKCE, state, nonce, issuer e audience.

**Questão profissional:** O token é destinado ao cliente ou ao recurso da API?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Aplicação de relatórios utiliza autorização OAuth/OIDC; o cliente e a API exigem tokens para finalidades diferentes. Analise onde o conhecimento de "Issuer" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Issuer", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte técnica:** https://openid.net/developers/specs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 7.9. Audience

**O que é:** Audience (aud) identifica o destinatário previsto de um token. Audience vincula token ao destinatário autorizado; token válido para outro recurso deve ser rejeitado.

**Para que serve:** Token válido para outra API não deve autorizar este recurso.

**Como funciona:** Validação de tokens no backend/API gateway. Conexão com IAM: Valide authorization code/PKCE, state, nonce, issuer e audience.

**Questão profissional:** O token é destinado ao cliente ou ao recurso da API?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Aplicação de relatórios utiliza autorização OAuth/OIDC; o cliente e a API exigem tokens para finalidades diferentes. Analise onde o conhecimento de "Audience" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Audience", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte técnica:** https://openid.net/developers/specs/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Federação SAML e OpenID Connect · Testar falhas: **Onde:** App local → callbacks e API. **Ação:** Tente redirect não registrado e, em teste controlado, token com audience incorreto ou expiração; a app/API deve negar.. **Validação:** Testes negativo e positivo com causa diagnosticada.. **Se falhar:** Se token inválido é aceito, pare e corrija validação do serviço.

#### 7.10. State

**O que é:** State associa resposta OAuth à solicitação iniciada pelo cliente e ajuda a mitigar CSRF. State ajuda defender contra CSRF e associa resposta OAuth à requisição iniciada pelo cliente.

**Para que serve:** Impede aceitar respostas de fluxos de autenticação não iniciados pela sessão correta.

**Como funciona:** Cliente OAuth/OIDC durante redirecionamento para IdP. Conexão com IAM: Valide authorization code/PKCE, state, nonce, issuer e audience.

**Questão profissional:** O token é destinado ao cliente ou ao recurso da API?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Aplicação de relatórios utiliza autorização OAuth/OIDC; o cliente e a API exigem tokens para finalidades diferentes. Analise onde o conhecimento de "State" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "State", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc6749

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 7.11. Nonce

**O que é:** Nonce vincula ID token a uma solicitação OIDC específica para mitigação de replay. Nonce associa ID token à requisição de autenticação para mitigar replay em OIDC.

**Para que serve:** Ajuda impedir aceitação de ID tokens de outro fluxo.

**Como funciona:** Parâmetro nonce em OIDC e validação de claim no cliente. Conexão com IAM: Valide authorization code/PKCE, state, nonce, issuer e audience.

**Questão profissional:** O token é destinado ao cliente ou ao recurso da API?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Aplicação de relatórios utiliza autorização OAuth/OIDC; o cliente e a API exigem tokens para finalidades diferentes. Analise onde o conhecimento de "Nonce" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Nonce", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Não presuma que todos os access tokens sejam JWT nem aceite ID token como credencial de API.

**Fonte técnica:** https://openid.net/specs/openid-connect-core-1_0.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 8: Keycloak e Authentik

IdPs de laboratório permitem criar fluxos, gerenciar usuários e integrar aplicações.

#### 8.1. Instalar ambientes de laboratório isolados

**O que é:** Keycloak e Authentik são IdPs self-hosted que podem executar em VMs ou containers para testar protocolos sem afetar produção.

**Para que serve:** Ambientes isolados evitam expor credenciais e permitem reproduzir erros de integração com segurança.

**Como funciona:** Docker Compose em host Linux de laboratório; documentação oficial de cada versão para requisitos de banco e TLS. Conexão com IAM: Examine clients, roles, scopes, logs e limite do laboratório.

**Questão profissional:** O IdP autenticou a identidade e a aplicação fez autorização própria?

**Critério de competência:** Critério de aceite: Prepare VM sem acesso público irrestrito; Suba apenas um IdP, crie administrador de laboratório e valide interface.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Equipe de desenvolvimento configura um IdP local para testar SSO e roles sem expor nenhuma interface administrativa à internet. Analise onde o conhecimento de "Instalar ambientes de laboratório isolados" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Instalar ambientes de laboratório isolados", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Prepare VM sem acesso público irrestrito; Suba apenas um IdP, crie administrador de laboratório e valide interface.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** O IdP emite tokens; a aplicação ainda impõe suas decisões de autorização.

**Fonte técnica:** https://www.keycloak.org/documentation

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 8.2. Usuários, grupos, roles e políticas

**O que é:** IdPs armazenam contas, groups e roles e aplicam políticas de autenticação e atribuição.

**Para que serve:** Esses objetos formam a base para claims de tokens e controle de acesso das aplicações integradas.

**Como funciona:** Keycloak → realm → Users/Groups/Realm roles; Authentik → Directory → Users/Groups e Policies. Conexão com IAM: Examine clients, roles, scopes, logs e limite do laboratório.

**Questão profissional:** O IdP autenticou a identidade e a aplicação fez autorização própria?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** Equipe de desenvolvimento configura um IdP local para testar SSO e roles sem expor nenhuma interface administrativa à internet. Analise onde o conhecimento de "Usuários, grupos, roles e políticas" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Usuários, grupos, roles e políticas", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** O IdP emite tokens; a aplicação ainda impõe suas decisões de autorização.

**Fonte técnica:** https://www.keycloak.org/documentation

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 8.3. Integrar aplicações OIDC e SAML

**O que é:** OIDC usa tokens JSON e OAuth; SAML usa mensagens XML para federação com aplicativos.

**Para que serve:** IdP só oferece SSO quando cliente e provedor concordam em endpoints e validações.

**Como funciona:** Keycloak → Clients ou Authentik → Applications/Providers. Conexão com IAM: Examine clients, roles, scopes, logs e limite do laboratório.

**Questão profissional:** O IdP autenticou a identidade e a aplicação fez autorização própria?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** Equipe de desenvolvimento configura um IdP local para testar SSO e roles sem expor nenhuma interface administrativa à internet. Analise onde o conhecimento de "Integrar aplicações OIDC e SAML" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Integrar aplicações OIDC e SAML", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** O IdP emite tokens; a aplicação ainda impõe suas decisões de autorização.

**Fonte técnica:** https://www.keycloak.org/documentation

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 8.4. Logs e troubleshooting de autenticação

**O que é:** Logs do IdP registram entradas, rejeições, sessões e falhas de protocolo.

**Para que serve:** Correlacionar eventos do IdP e da aplicação permite localizar falhas de configuração.

**Como funciona:** Keycloak → Events; Authentik → Events; logs do serviço/container. Conexão com IAM: Examine clients, roles, scopes, logs e limite do laboratório.

**Questão profissional:** O IdP autenticou a identidade e a aplicação fez autorização própria?

**Critério de competência:** Relaciona evidência, causa provável, correção e novo teste.

**Cenário de fixação:** Equipe de desenvolvimento configura um IdP local para testar SSO e roles sem expor nenhuma interface administrativa à internet. Analise onde o conhecimento de "Logs e troubleshooting de autenticação" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Logs e troubleshooting de autenticação", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Relaciona evidência, causa provável, correção e novo teste.

**Risco:** O IdP emite tokens; a aplicação ainda impõe suas decisões de autorização.

**Fonte técnica:** https://www.keycloak.org/documentation

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 2: Active Directory e Windows Server

Diretórios centralizam objetos e relações de acesso em ambientes corporativos.

#### 2.1. AD DS

**O que é:** Active Directory Domain Services é serviço de diretório Microsoft que armazena objetos de domínio e oferece autenticação e políticas. AD DS oferece diretório e autenticação em domínios Windows, não é o mesmo serviço que Entra ID cloud.

**Para que serve:** Base de identidades Windows em muitas empresas; disponibiliza contas para SSO e controle de acesso.

**Como funciona:** Windows Server → Server Manager → Add Roles and Features → Active Directory Domain Services. Conexão com IAM: Modele KDC, tickets, OU, GPO e administração do domínio.

**Questão profissional:** Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?

**Critério de competência:** Critério de aceite: Instale AD DS em VM Windows Server isolada; Crie conta de teste e valide login em cliente.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Uma unidade antiga utiliza domínio Windows com controlador, estações e compartilhamento interno. O time precisa entender a autenticação local e sua dependência de rede. Analise onde o conhecimento de "AD DS" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "AD DS", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Instale AD DS em VM Windows Server isolada; Crie conta de teste e valide login em cliente.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Active Directory híbrido · Montar AD de laboratório: **Onde:** Windows Server → Server Manager → Add Roles. **Ação:** Prepare domínio de laboratório isolado, DNS e AD DS, sem roteamento para a rede de produção.. **Validação:** DNS SRV e DC de laboratório operantes.. **Se falhar:** Falha Kerberos pode decorrer de DNS/tempo.

#### 2.2. Domínio e floresta

**O que é:** Domínio é limite lógico para objetos e administração; floresta agrega domínios que compartilham esquema e relações de confiança.

**Para que serve:** Desenho influencia administração, autenticação e limites de confiança.

**Como funciona:** AD DS em Windows Server e consoles Active Directory Domains and Trusts. Conexão com IAM: Modele KDC, tickets, OU, GPO e administração do domínio.

**Questão profissional:** Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?

**Critério de competência:** Critério de aceite: Desenhe domínio único de laboratório; Descreva quando precisaria de domínio adicional.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Uma unidade antiga utiliza domínio Windows com controlador, estações e compartilhamento interno. O time precisa entender a autenticação local e sua dependência de rede. Analise onde o conhecimento de "Domínio e floresta" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Domínio e floresta", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Desenhe domínio único de laboratório; Descreva quando precisaria de domínio adicional.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 2.3. Controladores de domínio

**O que é:** DC mantém cópia replicada do AD DS e atende autenticações e consultas.

**Para que serve:** Sem DC alcançável clientes podem enfrentar falhas de login e políticas.

**Como funciona:** Windows Server com função AD DS; ferramentas dcdiag, repadmin e DNS Manager. Conexão com IAM: Modele KDC, tickets, OU, GPO e administração do domínio.

**Questão profissional:** Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?

**Critério de competência:** Critério de aceite: Identifique DC com nltest /dsgetdc:<domínio>; Observe registros SRV e saúde do serviço.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Uma unidade antiga utiliza domínio Windows com controlador, estações e compartilhamento interno. O time precisa entender a autenticação local e sua dependência de rede. Analise onde o conhecimento de "Controladores de domínio" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Controladores de domínio", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Identifique DC com nltest /dsgetdc:<domínio>; Observe registros SRV e saúde do serviço.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 2.4. Organizational Units (OU)

**O que é:** OU organiza objetos do Active Directory e delimita escopo de GPO e delegação.

**Para que serve:** Evita concessão administrativa sobre todo o domínio e organiza políticas.

**Como funciona:** Active Directory Users and Computers → domínio → New → Organizational Unit. Conexão com IAM: Modele KDC, tickets, OU, GPO e administração do domínio.

**Questão profissional:** Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?

**Critério de competência:** Critério de aceite: Crie OUs Pessoas e Servidores; Aplique GPO de teste apenas a uma OU.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Uma unidade antiga utiliza domínio Windows com controlador, estações e compartilhamento interno. O time precisa entender a autenticação local e sua dependência de rede. Analise onde o conhecimento de "Organizational Units (OU)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Organizational Units (OU)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie OUs Pessoas e Servidores; Aplique GPO de teste apenas a uma OU.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 2.5. Usuários do AD

**O que é:** Objetos user do AD representam contas autenticáveis no domínio.

**Para que serve:** Estado, grupos e atributos da conta determinam acesso e autenticação.

**Como funciona:** Active Directory Users and Computers ou PowerShell ActiveDirectory. Conexão com IAM: Modele KDC, tickets, OU, GPO e administração do domínio.

**Questão profissional:** Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** Uma unidade antiga utiliza domínio Windows com controlador, estações e compartilhamento interno. O time precisa entender a autenticação local e sua dependência de rede. Analise onde o conhecimento de "Usuários do AD" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Usuários do AD", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Active Directory híbrido · Provar identidade local: **Onde:** Active Directory Users and Computers → OU Users. **Ação:** Crie OU, usuário, grupo e atributo estável; configure direitos mínimos.. **Validação:** Conjunto de objetos e membership registrado.. **Se falhar:** Não copie hash/senhas para evidências.

#### 2.6. Grupos do AD

**O que é:** Grupos de segurança do AD agregam contas para concessão de direitos.

**Para que serve:** RBAC prático depende de grupos bem definidos e revisão dos membros.

**Como funciona:** AD Users and Computers → New → Group e membership nas propriedades. Conexão com IAM: Modele KDC, tickets, OU, GPO e administração do domínio.

**Questão profissional:** Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** Uma unidade antiga utiliza domínio Windows com controlador, estações e compartilhamento interno. O time precisa entender a autenticação local e sua dependência de rede. Analise onde o conhecimento de "Grupos do AD" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Grupos do AD", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 2.7. GPO

**O que é:** Group Policy Objects definem configurações de computadores e usuários de domínio.

**Para que serve:** Padroniza controles de estação e servidor relevantes à segurança de acesso.

**Como funciona:** Group Policy Management (gpmc.msc) no Windows Server. Conexão com IAM: Modele KDC, tickets, OU, GPO e administração do domínio.

**Questão profissional:** Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?

**Critério de competência:** Critério de aceite: Crie GPO de laboratório vinculada à OU; Em cliente execute gpupdate e gpresult /r.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Uma unidade antiga utiliza domínio Windows com controlador, estações e compartilhamento interno. O time precisa entender a autenticação local e sua dependência de rede. Analise onde o conhecimento de "GPO" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "GPO", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie GPO de laboratório vinculada à OU; Em cliente execute gpupdate e gpresult /r.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 2.8. Delegação administrativa

**O que é:** Delegação concede tarefas específicas de administração sobre objetos sem dar domínio inteiro.

**Para que serve:** Reduz uso de Domain Admin e segmenta responsabilidades.

**Como funciona:** AD Users and Computers → OU → Delegate Control. Conexão com IAM: Modele KDC, tickets, OU, GPO e administração do domínio.

**Questão profissional:** Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?

**Critério de competência:** Critério de aceite: Crie grupo Helpdesk-Lab; Teste operação dentro e fora do escopo.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Uma unidade antiga utiliza domínio Windows com controlador, estações e compartilhamento interno. O time precisa entender a autenticação local e sua dependência de rede. Analise onde o conhecimento de "Delegação administrativa" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Delegação administrativa", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie grupo Helpdesk-Lab; Teste operação dentro e fora do escopo.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 2.9. Kerberos

**O que é:** Kerberos autentica por tickets concedidos pelo KDC, evitando reenviar senha ao serviço em cada acesso. Ticket Kerberos prova autenticação para serviço, mas o serviço ainda deve verificar sua autorização.

**Para que serve:** É mecanismo central do logon AD e SSO de serviços internos.

**Como funciona:** Clientes associados ao domínio e serviços AD; ferramenta klist. Conexão com IAM: Modele KDC, tickets, OU, GPO e administração do domínio.

**Questão profissional:** Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?

**Critério de competência:** Explica TGT, ticket de serviço e efeito da sincronização de horário.

**Cenário de fixação:** Um usuário de domínio faz login, mas falha no compartilhamento. Identifique TGT, ticket de serviço, SPN e autorização do share.

**Entrega esperada:** Diagrama KDC/cliente/serviço e distinção entre autenticação e ACL.

**Risco:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Active Directory híbrido · Verificar autenticação: **Onde:** Cliente no domínio → klist e eventos. **Ação:** Faça login com usuário de teste, consulte ticket e explique TGT versus serviço.. **Validação:** Ticket e evento sanitizados.. **Se falhar:** Clock skew e DNS devem ser verificados antes de recriar contas.

#### 2.10. Tickets Kerberos

**O que é:** TGT demonstra autenticação inicial perante o KDC; service ticket autoriza apresentação a serviço específico.

**Para que serve:** Tipos e validade dos tickets são úteis no diagnóstico de SSO e expiração.

**Como funciona:** Windows klist e logs Kerberos do DC. Conexão com IAM: Modele KDC, tickets, OU, GPO e administração do domínio.

**Questão profissional:** Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?

**Critério de competência:** Critério de aceite: Examine klist após login; Compare TGT e ticket CIFS obtido.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Uma unidade antiga utiliza domínio Windows com controlador, estações e compartilhamento interno. O time precisa entender a autenticação local e sua dependência de rede. Analise onde o conhecimento de "Tickets Kerberos" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Tickets Kerberos", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Examine klist após login; Compare TGT e ticket CIFS obtido.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 2.11. Service Principal Names (SPN)

**O que é:** SPN identifica instância de serviço ligada à conta usada pelo Kerberos.

**Para que serve:** SPN duplicado ou inexistente pode impedir autenticação Kerberos de aplicação.

**Como funciona:** Comando setspn e atributos servicePrincipalName no AD. Conexão com IAM: Modele KDC, tickets, OU, GPO e administração do domínio.

**Questão profissional:** Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?

**Critério de competência:** Critério de aceite: Consulte setspn -L de conta de serviço fictícia; Documente nome de serviço esperado sem alterar produção.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Uma unidade antiga utiliza domínio Windows com controlador, estações e compartilhamento interno. O time precisa entender a autenticação local e sua dependência de rede. Analise onde o conhecimento de "Service Principal Names (SPN)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Service Principal Names (SPN)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Consulte setspn -L de conta de serviço fictícia; Documente nome de serviço esperado sem alterar produção.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 2.12. Troubleshooting com DNS e Event Viewer

**O que é:** Diagnóstico AD conecta sintomas de logon a resolução DNS e eventos do Windows.

**Para que serve:** Problema aparente de senha pode ser falta de DC, DNS ou relógio correto.

**Como funciona:** DNS Manager, Event Viewer e Windows PowerShell no domínio. Conexão com IAM: Modele KDC, tickets, OU, GPO e administração do domínio.

**Questão profissional:** Qual papel de domínio, DNS e Kerberos é necessário para a identidade híbrida?

**Critério de competência:** Relaciona evidência, causa provável, correção e novo teste.

**Cenário de fixação:** Uma unidade antiga utiliza domínio Windows com controlador, estações e compartilhamento interno. O time precisa entender a autenticação local e sua dependência de rede. Analise onde o conhecimento de "Troubleshooting com DNS e Event Viewer" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Troubleshooting com DNS e Event Viewer", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Relaciona evidência, causa provável, correção e novo teste.

**Risco:** Autenticação Kerberos não concede automaticamente permissões sobre todos os recursos.

**Fonte técnica:** https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 3: LDAP e identidades híbridas

LDAP consulta diretórios; ambientes híbridos conectam identidades locais e nuvem.

#### 3.1. Distinguished Name (DN)

**O que é:** DN é caminho único do objeto na árvore LDAP, com componentes como CN, OU e DC.

**Para que serve:** Bind e buscas precisam identificar corretamente onde está o objeto.

**Como funciona:** Estrutura de AD, OpenLDAP e clientes LDAP. Conexão com IAM: Diferencie diretório, consultas LDAP e política de sincronização.

**Questão profissional:** Qual atributo é autoritativo e como ele é propagado?

**Critério de competência:** Critério de aceite: Localize DN de usuário no AD ou ldapsearch; Mova objeto de OU em laboratório e observe mudança.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** A AtlasCorp integra um diretório corporativo antigo a serviços cloud. Uma divergência de atributo impede a correlação correta do usuário. Analise onde o conhecimento de "Distinguished Name (DN)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Distinguished Name (DN)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Localize DN de usuário no AD ou ldapsearch; Mova objeto de OU em laboratório e observe mudança.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte técnica:** https://www.openldap.org/doc/admin26/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 3.2. LDAP bind

**O que é:** Bind estabelece contexto de autenticação de uma conexão LDAP ao diretório. Bind autentica uma sessão LDAP; permissões de consulta e modificação são avaliadas separadamente.

**Para que serve:** Credenciais e permissões do bind determinam quais objetos o cliente acessa.

**Como funciona:** Conectores LDAP de aplicações e ferramentas ldapsearch; prefira TLS. Conexão com IAM: Diferencie diretório, consultas LDAP e política de sincronização.

**Questão profissional:** Qual atributo é autoritativo e como ele é propagado?

**Critério de competência:** Explica credenciais, bind e consultas de diretório.

**Cenário de fixação:** A AtlasCorp integra um diretório corporativo antigo a serviços cloud. Uma divergência de atributo impede a correlação correta do usuário. Analise onde o conhecimento de "LDAP bind" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "LDAP bind", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Explica credenciais, bind e consultas de diretório.

**Risco:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte técnica:** https://www.openldap.org/doc/admin26/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 3.3. Filtros LDAP

**O que é:** Filtros LDAP selecionam objetos com expressões como (uid=joao) e (&(objectClass=user)(...)).

**Para que serve:** Integrações usam filtros para restringir usuários e grupos sincronizados.

**Como funciona:** Configuração de busca dos conectores LDAP, AD e OpenLDAP. Conexão com IAM: Diferencie diretório, consultas LDAP e política de sincronização.

**Questão profissional:** Qual atributo é autoritativo e como ele é propagado?

**Critério de competência:** Critério de aceite: Crie usuários fictícios de departamentos diferentes; Confira que apenas objetos esperados aparecem.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** A AtlasCorp integra um diretório corporativo antigo a serviços cloud. Uma divergência de atributo impede a correlação correta do usuário. Analise onde o conhecimento de "Filtros LDAP" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Filtros LDAP", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie usuários fictícios de departamentos diferentes; Confira que apenas objetos esperados aparecem.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte técnica:** https://www.openldap.org/doc/admin26/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 3.4. LDAPS

**O que é:** LDAPS transporta LDAP em TLS, normalmente na porta TCP 636. LDAPS protege transporte por TLS; não torna bind nem ACL inerentemente seguros.

**Para que serve:** Impede exposição de credenciais e dados de diretório na rede.

**Como funciona:** Certificado do servidor LDAP/AD e configuração do cliente para TLS. Conexão com IAM: Diferencie diretório, consultas LDAP e política de sincronização.

**Questão profissional:** Qual atributo é autoritativo e como ele é propagado?

**Critério de competência:** Critério de aceite: Configure certificado de laboratório no servidor; Teste cliente que não confia no certificado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** A AtlasCorp integra um diretório corporativo antigo a serviços cloud. Uma divergência de atributo impede a correlação correta do usuário. Analise onde o conhecimento de "LDAPS" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "LDAPS", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Configure certificado de laboratório no servidor; Teste cliente que não confia no certificado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte técnica:** https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/enable-ldap-over-ssl-3rd-certification-authority

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 3.5. Atributos e esquema de diretório

**O que é:** Schema LDAP define classes de objetos e seus atributos obrigatórios e opcionais.

**Para que serve:** Mapeamentos corretos permitem autenticar e provisionar sem conflitos de dados.

**Como funciona:** AD Schema/Attribute Editor e OpenLDAP subschema. Conexão com IAM: Diferencie diretório, consultas LDAP e política de sincronização.

**Questão profissional:** Qual atributo é autoritativo e como ele é propagado?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** A AtlasCorp integra um diretório corporativo antigo a serviços cloud. Uma divergência de atributo impede a correlação correta do usuário. Analise onde o conhecimento de "Atributos e esquema de diretório" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Atributos e esquema de diretório", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte técnica:** https://www.openldap.org/doc/admin26/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 3.6. Sincronização, identidade híbrida e conflitos

**O que é:** Identidade híbrida combina dados locais e nuvem com processos de correspondência e sincronização.

**Para que serve:** Atributos divergentes e duplicidades podem criar contas erradas ou travar provisionamento.

**Como funciona:** Microsoft Entra Connect Sync ou Cloud Sync; ferramentas do fabricante. Conexão com IAM: Diferencie diretório, consultas LDAP e política de sincronização.

**Questão profissional:** Qual atributo é autoritativo e como ele é propagado?

**Critério de competência:** Critério de aceite: Desenhe AD → Entra com atributo de correlação; Registre estratégia de conflito e fonte autoritativa.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** A AtlasCorp integra um diretório corporativo antigo a serviços cloud. Uma divergência de atributo impede a correlação correta do usuário. Analise onde o conhecimento de "Sincronização, identidade híbrida e conflitos" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Sincronização, identidade híbrida e conflitos", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Desenhe AD → Entra com atributo de correlação; Registre estratégia de conflito e fonte autoritativa.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte técnica:** https://www.openldap.org/doc/admin26/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Active Directory híbrido · Planejar sincronização: **Onde:** Entra Connect Sync ou Cloud Sync, conforme requisitos. **Ação:** Desenhe UPN, sourceAnchor, atributos e filtros de OU; implemente apenas em ambiente isolado e elegível.. **Validação:** Topologia e matriz fonte→destino.. **Se falhar:** Se alteração de atributo é read-only na nuvem, corrija na fonte local.

#### 3.7. Consulta e auditoria segura de diretório

**O que é:** Consultas LDAP recuperam dados do diretório; auditoria registra ações sensíveis.

**Para que serve:** Acesso de leitura excessivo expõe atributos pessoais e impede rastreabilidade.

**Como funciona:** ldapsearch, PowerShell AD e eventos de auditoria de diretório. Conexão com IAM: Diferencie diretório, consultas LDAP e política de sincronização.

**Questão profissional:** Qual atributo é autoritativo e como ele é propagado?

**Critério de competência:** Relaciona evidência, causa provável, correção e novo teste.

**Cenário de fixação:** A AtlasCorp integra um diretório corporativo antigo a serviços cloud. Uma divergência de atributo impede a correlação correta do usuário. Analise onde o conhecimento de "Consulta e auditoria segura de diretório" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Consulta e auditoria segura de diretório", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Relaciona evidência, causa provável, correção e novo teste.

**Risco:** LDAPS não substitui controles de bind e autorização do objeto consultado.

**Fonte técnica:** https://www.openldap.org/doc/admin26/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

## 2. Intermediário — Administração cloud e operações IAM

Aprofunde autenticação, identidade externa, dispositivos, Azure, provisionamento e investigação operacional.

### Módulo 17: Administração avançada do Microsoft Entra

Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade.

#### 17.1. Domínios verificados e configurações de tenant

**O que é:** Domínio personalizado verificado habilita identidades com namespace corporativo; tenant não é assinatura Azure.

**Para que serve:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra admin center e Microsoft Graph Conexão com IAM: Papéis, grupos, Graph, delegação e auditoria.

**Questão profissional:** O escopo de delegação cobre exatamente os objetos necessários?

**Critério de competência:** Entrega verificável: Diagrama separando organização, tenant, domínio e assinatura. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** IAM delega administração de grupos e usuários sem conceder acesso irrestrito ao diretório nem aos recursos Azure. Analise onde o conhecimento de "Domínios verificados e configurações de tenant" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Domínios verificados e configurações de tenant", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Diagrama separando organização, tenant, domínio e assinatura. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/fundamentals/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 17.2. Entra roles e escopos administrativos

**O que é:** Funções do diretório concedem permissões administrativas de identidade, distintas de Azure RBAC.

**Para que serve:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra admin center e Microsoft Graph Conexão com IAM: Papéis, grupos, Graph, delegação e auditoria.

**Questão profissional:** O escopo de delegação cobre exatamente os objetos necessários?

**Critério de competência:** Entrega verificável: Matriz de privilégios e prova de acesso antes/depois da revogação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** IAM delega administração de grupos e usuários sem conceder acesso irrestrito ao diretório nem aos recursos Azure. Analise onde o conhecimento de "Entra roles e escopos administrativos" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Entra roles e escopos administrativos", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de privilégios e prova de acesso antes/depois da revogação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/fundamentals/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- PAM, PIM e break-glass · Escolher função restrita: **Onde:** Entra ID → Roles and administrators. **Ação:** Selecione papel que possibilita operação reversível, como grupos em laboratório, com escopo mais baixo disponível.. **Validação:** Tabela tarefa → role → risco.. **Se falhar:** Evite usar Global Administrator por comodidade.

#### 17.3. Administrative Units

**O que é:** Unidades administrativas limitam o escopo de determinadas funções administrativas a conjuntos específicos de objetos. Unidade administrativa delimita administração suportada sobre objetos; não bloqueia toda visibilidade de membros fora do escopo.

**Para que serve:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra admin center e Microsoft Graph Conexão com IAM: Papéis, grupos, Graph, delegação e auditoria.

**Questão profissional:** O escopo de delegação cobre exatamente os objetos necessários?

**Critério de competência:** Entrega verificável: Mapa de escopo com usuário dentro e fora da delegação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** IAM delega administração de grupos e usuários sem conceder acesso irrestrito ao diretório nem aos recursos Azure. Analise onde o conhecimento de "Administrative Units" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Administrative Units", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Mapa de escopo com usuário dentro e fora da delegação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 17.4. Grupos atribuídos e dinâmicos

**O que é:** A associação de grupos pode ser direta ou calculada por regras de atributos, com requisitos de licença distintos.

**Para que serve:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra admin center e Microsoft Graph Conexão com IAM: Papéis, grupos, Graph, delegação e auditoria.

**Questão profissional:** O escopo de delegação cobre exatamente os objetos necessários?

**Critério de competência:** Entrega verificável: Regra, lista de membros esperados e impacto da mudança de atributo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** IAM delega administração de grupos e usuários sem conceder acesso irrestrito ao diretório nem aos recursos Azure. Analise onde o conhecimento de "Grupos atribuídos e dinâmicos" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Grupos atribuídos e dinâmicos", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Regra, lista de membros esperados e impacto da mudança de atributo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/fundamentals/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Ciclo de vida Joiner–Mover–Leaver · Demonstrar Mover: **Onde:** Entra ID → Users → Groups. **Ação:** Mude bruno.fin para a nova área no registro RH. Remova grupos antigos, peça validação do novo gestor e atribua grupo correto.. **Validação:** Comparativo de grupos antes/depois e acesso negado ao recurso antigo.. **Se falhar:** Verifique acesso direto por app role além da membresia no grupo.

#### 17.5. Atributos personalizados de segurança

**O que é:** Atributos estruturados permitem classificar objetos e apoiar decisões e governança, com permissões específicas.

**Para que serve:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra admin center e Microsoft Graph Conexão com IAM: Papéis, grupos, Graph, delegação e auditoria.

**Questão profissional:** O escopo de delegação cobre exatamente os objetos necessários?

**Critério de competência:** Entrega verificável: Esquema, responsabilidades e exemplo de uso de atributo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** IAM delega administração de grupos e usuários sem conceder acesso irrestrito ao diretório nem aos recursos Azure. Analise onde o conhecimento de "Atributos personalizados de segurança" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Atributos personalizados de segurança", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Esquema, responsabilidades e exemplo de uso de atributo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/fundamentals/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 17.6. Licenças e atribuição por grupo

**O que é:** Licenças têm escopos e efeitos próprios; a distribuição deve seguir necessidade e disponibilidade contratual.

**Para que serve:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra admin center e Microsoft Graph Conexão com IAM: Papéis, grupos, Graph, delegação e auditoria.

**Questão profissional:** O escopo de delegação cobre exatamente os objetos necessários?

**Critério de competência:** Entrega verificável: Tabela recurso-licença-usuário e riscos de expiração. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** IAM delega administração de grupos e usuários sem conceder acesso irrestrito ao diretório nem aos recursos Azure. Analise onde o conhecimento de "Licenças e atribuição por grupo" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Licenças e atribuição por grupo", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Tabela recurso-licença-usuário e riscos de expiração. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/fundamentals/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 17.7. Entra Connect Sync versus Cloud Sync

**O que é:** As soluções de sincronização híbrida têm pré-requisitos, topologias e capacidades distintas.

**Para que serve:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra admin center e Microsoft Graph Conexão com IAM: Papéis, grupos, Graph, delegação e auditoria.

**Questão profissional:** O escopo de delegação cobre exatamente os objetos necessários?

**Critério de competência:** Entrega verificável: Topologia com fonte de autoridade, filtros, atributos e caminho de falha. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** IAM delega administração de grupos e usuários sem conceder acesso irrestrito ao diretório nem aos recursos Azure. Analise onde o conhecimento de "Entra Connect Sync versus Cloud Sync" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Entra Connect Sync versus Cloud Sync", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Topologia com fonte de autoridade, filtros, atributos e caminho de falha. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/fundamentals/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 17.8. Autenticação híbrida PHS, PTA e federação

**O que é:** Password Hash Sync, Pass-through Authentication e federação trazem dependências operacionais diferentes.

**Para que serve:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra admin center e Microsoft Graph Conexão com IAM: Papéis, grupos, Graph, delegação e auditoria.

**Questão profissional:** O escopo de delegação cobre exatamente os objetos necessários?

**Critério de competência:** Entrega verificável: Matriz de dependências e impacto de indisponibilidade do AD. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** IAM delega administração de grupos e usuários sem conceder acesso irrestrito ao diretório nem aos recursos Azure. Analise onde o conhecimento de "Autenticação híbrida PHS, PTA e federação" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Autenticação híbrida PHS, PTA e federação", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de dependências e impacto de indisponibilidade do AD. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/fundamentals/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Active Directory híbrido · Testar continuidade: **Onde:** Diagrama: DC indisponível / sync atrasado. **Ação:** Modele falhas de rede, sincronização e autenticação e efeito em cloud.. **Validação:** Matriz de falhas e recuperação.. **Se falhar:** PHS, PTA e federação reagem de modo distinto à queda do AD.

#### 17.9. Microsoft Graph e permissões delegadas

**O que é:** Permissões delegadas operam no contexto do usuário; exigem consentimento apropriado.

**Para que serve:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra admin center e Microsoft Graph Conexão com IAM: Papéis, grupos, Graph, delegação e auditoria.

**Questão profissional:** O escopo de delegação cobre exatamente os objetos necessários?

**Critério de competência:** Entrega verificável: Request, response sanitizado e escopo efetivamente utilizado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** IAM delega administração de grupos e usuários sem conceder acesso irrestrito ao diretório nem aos recursos Azure. Analise onde o conhecimento de "Microsoft Graph e permissões delegadas" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Microsoft Graph e permissões delegadas", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Request, response sanitizado e escopo efetivamente utilizado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte técnica:** https://learn.microsoft.com/en-us/graph/permissions-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 17.10. Microsoft Graph com application permissions

**O que é:** Permissões de aplicação executam sem usuário e podem oferecer privilégio elevado; exigem governança.

**Para que serve:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra admin center e Microsoft Graph Conexão com IAM: Papéis, grupos, Graph, delegação e auditoria.

**Questão profissional:** O escopo de delegação cobre exatamente os objetos necessários?

**Critério de competência:** Entrega verificável: Matriz de consentimento, revisão e revogação de app roles. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** IAM delega administração de grupos e usuários sem conceder acesso irrestrito ao diretório nem aos recursos Azure. Analise onde o conhecimento de "Microsoft Graph com application permissions" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Microsoft Graph com application permissions", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de consentimento, revisão e revogação de app roles. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte técnica:** https://learn.microsoft.com/en-us/graph/permissions-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 17.11. Governança de registros de aplicações

**O que é:** App registrations e enterprise applications representam objetos e vínculos diferentes e demandam owners e revisão.

**Para que serve:** Administre o tenant e delimite responsabilidades, escopos de administração e objetos de identidade. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra admin center e Microsoft Graph Conexão com IAM: Papéis, grupos, Graph, delegação e auditoria.

**Questão profissional:** O escopo de delegação cobre exatamente os objetos necessários?

**Critério de competência:** Entrega verificável: Diagrama app object versus service principal e inventário de owners. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** IAM delega administração de grupos e usuários sem conceder acesso irrestrito ao diretório nem aos recursos Azure. Analise onde o conhecimento de "Governança de registros de aplicações" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Governança de registros de aplicações", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Diagrama app object versus service principal e inventário de owners. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Uma unidade administrativa delimita tarefas administrativas suportadas, não isola toda leitura no diretório.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/fundamentals/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 18: Autenticação avançada e Identity Protection

Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável.

#### 18.1. Temporary Access Pass (TAP)

**O que é:** O TAP é uma credencial temporária de onboarding/recuperação com duração e usos configuráveis.

**Para que serve:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, sign-in logs e políticas condicionais Conexão com IAM: Usuário, app, risco, método, dispositivo, sign-in log e rollback.

**Questão profissional:** A condição foi validada em Report-only antes do enforcement?

**Critério de competência:** Entrega verificável: Registro de emissão, uso controlado e revogação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma política de acesso deve reagir a usuários, aplicativos e sinais de risco sem bloquear administradores de recuperação. Analise onde o conhecimento de "Temporary Access Pass (TAP)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Temporary Access Pass (TAP)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Registro de emissão, uso controlado e revogação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 18.2. Certificate-Based Authentication (CBA)

**O que é:** A autenticação por certificado usa PKI e exige cadeia de confiança, vinculação à identidade e revogação.

**Para que serve:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, sign-in logs e políticas condicionais Conexão com IAM: Usuário, app, risco, método, dispositivo, sign-in log e rollback.

**Questão profissional:** A condição foi validada em Report-only antes do enforcement?

**Critério de competência:** Entrega verificável: Fluxo CBA com políticas, vinculação e tratamento de revogação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma política de acesso deve reagir a usuários, aplicativos e sinais de risco sem bloquear administradores de recuperação. Analise onde o conhecimento de "Certificate-Based Authentication (CBA)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Certificate-Based Authentication (CBA)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo CBA com políticas, vinculação e tratamento de revogação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/authentication/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 18.3. Authentication strengths

**O que é:** Authentication strengths são políticas de Conditional Access que definem conjuntos de combinações de autenticação aceitáveis para acessar recursos.

**Para que serve:** Permitem exigir mecanismos mais fortes, como autenticação resistente a phishing, em operações administrativas ou dados críticos.

**Como funciona:** Crie escopo piloto, verifique métodos já registrados e selecione a strength na opção Grant da política CA. Teste método atendido e não atendido; preservar conta de emergência e Report-only reduz risco de bloqueio.

**Questão profissional:** A condição foi validada em Report-only antes do enforcement?

**Critério de competência:** Entrega verificável: Registro das condições e do método que satisfaz a força requerida. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma política de acesso deve reagir a usuários, aplicativos e sinais de risco sem bloquear administradores de recuperação. Analise onde o conhecimento de "Authentication strengths" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Authentication strengths", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Registro das condições e do método que satisfaz a força requerida. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/authentication/

**AtlasCorp: 2 procedimento(s) incorporado(s) diretamente na aula**

- Autenticação, passkeys e MFA · Testar aceitação e negação: **Onde:** Aplicação piloto e Sign-in logs. **Ação:** Teste método que satisfaz a authentication strength; depois tente método ausente/inferior conforme o cenário seguro, sem forçar lockout da conta. Compare o resultado real e os detalhes de autenticação.. **Validação:** Uma sessão atendendo o controle; outra com challenge/negação ou simulação registrada.. **Se falhar:** Se já existe sessão autenticada, novo desafio pode não surgir; documente sessões anteriores.
- Autenticação, passkeys e MFA · Criar proteção para administradores: **Onde:** Conditional Access → Policies → New policy. **Ação:** Projete CA-ATL-002-ADMIN-PHISHING-RESISTANT para role administrativa de teste: selecione Directory roles suportadas ou grupo administrativo específico; Grant → Require authentication strength → Phishing-resistant MFA; mantenha Report-only. Exclua contas de emergência sob controles independentes.. **Validação:** Matriz de administradores cobertos, exceções e métodos resistentes disponíveis.. **Se falhar:** CA por Directory roles não se estende automaticamente a funções customizadas ou escopo de Administrative Units.

#### 18.4. Passkeys resistentes a phishing

**O que é:** Credenciais FIDO2 associadas à origem reduzem phishing em comparação com fatores baseados em códigos.

**Para que serve:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, sign-in logs e políticas condicionais Conexão com IAM: Usuário, app, risco, método, dispositivo, sign-in log e rollback.

**Questão profissional:** A condição foi validada em Report-only antes do enforcement?

**Critério de competência:** Entrega verificável: Relato de propriedades de origem, registro e recuperação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma política de acesso deve reagir a usuários, aplicativos e sinais de risco sem bloquear administradores de recuperação. Analise onde o conhecimento de "Passkeys resistentes a phishing" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Passkeys resistentes a phishing", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Relato de propriedades de origem, registro e recuperação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/authentication/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 18.5. Passwordless e Windows Hello for Business

**O que é:** Autenticação passwordless elimina a senha em fluxos específicos, mas depende de registro seguro de dispositivos.

**Para que serve:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, sign-in logs e políticas condicionais Conexão com IAM: Usuário, app, risco, método, dispositivo, sign-in log e rollback.

**Questão profissional:** A condição foi validada em Report-only antes do enforcement?

**Critério de competência:** Entrega verificável: Mapa de dependências dispositivo-usuário-chave e processo de recuperação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma política de acesso deve reagir a usuários, aplicativos e sinais de risco sem bloquear administradores de recuperação. Analise onde o conhecimento de "Passwordless e Windows Hello for Business" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Passwordless e Windows Hello for Business", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Mapa de dependências dispositivo-usuário-chave e processo de recuperação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/authentication/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 18.6. Identity Protection: riscos de usuário e entrada

**O que é:** Sinais de risco informam investigações e políticas adaptativas, mas não dispensam análise contextual.

**Para que serve:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, sign-in logs e políticas condicionais Conexão com IAM: Usuário, app, risco, método, dispositivo, sign-in log e rollback.

**Questão profissional:** A condição foi validada em Report-only antes do enforcement?

**Critério de competência:** Entrega verificável: Fluxo de triagem com decisões por sinal e política de recuperação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma política de acesso deve reagir a usuários, aplicativos e sinais de risco sem bloquear administradores de recuperação. Analise onde o conhecimento de "Identity Protection: riscos de usuário e entrada" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Identity Protection: riscos de usuário e entrada", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo de triagem com decisões por sinal e política de recuperação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/authentication/

**AtlasCorp: 4 procedimento(s) incorporado(s) diretamente na aula**

- Autenticação, passkeys e MFA · Analisar riscos no Identity Protection: **Onde:** Entra ID → Protection → Identity Protection → Risky users / Risky sign-ins. **Ação:** Com uma conta licenciada P2, abra relatórios de usuários/entradas arriscadas existentes (se houver) e identifique diferença entre user risk e sign-in risk. Não execute ataques nem dependa de gerar risco real para completar o exercício.. **Validação:** Tabela com definições de nível de risco, proprietários da resposta e ações esperadas, mesmo quando não há registros reais.. **Se falhar:** Tenant limpo pode não possuir eventos de risco; registre "não observado" em vez de inventar uma detecção.
- Autenticação, passkeys e MFA · Definir política CA de sign-in risk: **Onde:** Entra ID → Conditional Access → Policies → New policy. **Ação:** Crie CA-ATL-004-SIGNIN-RISK: inclua APENAS o grupo piloto (contas de emergência fora do escopo), Target resources conforme cenário controlado, Conditions → Sign-in risk → Medium/High, Grant access → Require authentication strength (MFA forte adequado). Configure sessão Sign-in frequency apropriada, primeiro em Report-only.. **Validação:** Registro dos campos User/Target/Sign-in risk/Grant/Session e política Report-only.. **Se falhar:** Se não houver evento com nível Medium/High, não espere que um login comum aplique a regra. Teste a estrutura e documente limitação.
- Autenticação, passkeys e MFA · Definir política CA de user risk: **Onde:** Entra ID → Conditional Access → Policies → New policy. **Ação:** Crie política separada CA-ATL-005-USER-RISK: grupo piloto, Target resources → All resources apenas se for seguro para esse grupo, Conditions → User risk → High, Grant access → Require risk remediation e strength apropriada. Observe que as configurações adicionais de sessão/strength podem ser incluídas automaticamente. Comece em Report-only.. **Validação:** Capturas sanitizadas das duas políticas separadas e sua lógica de decisão.. **Se falhar:** Não configure senha-change de usuários híbridos sem requisitos de password writeback e autoatendimento de recuperação.
- Autenticação, passkeys e MFA · Verificar status sem fabricar risco: **Onde:** Entra ID → Conditional Access → What If / Sign-in logs. **Ação:** Use What If para validar atribuição de usuário, aplicativo e condições suportadas; depois consulte sign-in logs conhecidos, verifique se as políticas de risco foram aplicadas ou não. Caso inexista risco detectado, marque testes de enforcement como "não executáveis neste ambiente" e explique a diferença.. **Validação:** Registro: política existe, é Report-only, teste de escopo e estado efetivo não acionado ou incidente real do tenant de teste (sem dado pessoal).. **Se falhar:** What If e Report-only não fabricam sinais P2 nem substituem detecção real.

#### 18.7. Conditional Access report-only

**O que é:** Report-only mede impacto sem impor bloqueio; avaliação inclui exclusões de emergência. Report-only registra avaliação prevista sem bloquear; confirme essa diferença ao analisar logs.

**Para que serve:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, sign-in logs e políticas condicionais Conexão com IAM: Usuário, app, risco, método, dispositivo, sign-in log e rollback.

**Questão profissional:** A condição foi validada em Report-only antes do enforcement?

**Critério de competência:** Entrega verificável: Logs que evidenciam decisão report-only antes de habilitar política. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma política de acesso deve reagir a usuários, aplicativos e sinais de risco sem bloquear administradores de recuperação. Analise onde o conhecimento de "Conditional Access report-only" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Conditional Access report-only", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Logs que evidenciam decisão report-only antes de habilitar política. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only

**Complemento:** [Interpretar resultados Report-only](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only)

**AtlasCorp: 2 procedimento(s) incorporado(s) diretamente na aula**

- Autenticação, passkeys e MFA · Gerar dois logins de comparação: **Onde:** Navegador privado → app de teste. **Ação:** Como camila.ti, faça login e anote horário UTC, aplicativo, correlation ID e a aba Conditional Access. Depois teste um usuário fictício fora do grupo.. **Validação:** Duas entradas comparáveis em Sign-in logs, com report-only aplicado apenas ao piloto.. **Se falhar:** Se não aparece log, espere ingestão e confira filtro/usuário/aplicativo.
- Autenticação, passkeys e MFA · Interpretar o relatório: **Onde:** Entra ID → Monitoring & health → Sign-in logs. **Ação:** Abra entrada, consulte Conditional Access e Authentication Details. Diferencie Report-only: success/failure/not applied de sucesso efetivo do login.. **Validação:** Tabela usuário | política | requisito projetado | resultado real.. **Se falhar:** Se política foi "Not applied", revise group, target resource e conditions.

#### 18.8. Revogação de sessões e resposta a incidente

**O que é:** Desabilitar conta e revogar sessões são controles distintos; tokens emitidos podem ter semânticas próprias.

**Para que serve:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, sign-in logs e políticas condicionais Conexão com IAM: Usuário, app, risco, método, dispositivo, sign-in log e rollback.

**Questão profissional:** A condição foi validada em Report-only antes do enforcement?

**Critério de competência:** Entrega verificável: Linha do tempo de revogação, efeito observado e limitações conhecidas. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma política de acesso deve reagir a usuários, aplicativos e sinais de risco sem bloquear administradores de recuperação. Analise onde o conhecimento de "Revogação de sessões e resposta a incidente" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Revogação de sessões e resposta a incidente", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Linha do tempo de revogação, efeito observado e limitações conhecidas. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/authentication/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Ciclo de vida Joiner–Mover–Leaver · Executar Leaver no ambiente teste: **Onde:** Entra ID → Users → Properties / Authentication methods / Audit logs. **Ação:** Aplique bloqueio de login ao usuário de desligamento fictício, revise sessões e remova permissões, grupos e atribuições a apps.. **Validação:** Registro de alterações, tentativas negadas de login e owner de cada acesso removido.. **Se falhar:** Tokens existentes e sessões podem ter janela de validade; valide comportamento do aplicativo.

#### 18.9. Contas de acesso emergencial

**O que é:** Contas break-glass requerem controles independentes, monitoramento e teste periódico de recuperabilidade.

**Para que serve:** Eleve a garantia de autenticação, reduza riscos e implemente acesso condicional testável. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, sign-in logs e políticas condicionais Conexão com IAM: Usuário, app, risco, método, dispositivo, sign-in log e rollback.

**Questão profissional:** A condição foi validada em Report-only antes do enforcement?

**Critério de competência:** Entrega verificável: Runbook de acesso emergencial com testes, alertas e aprovação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma política de acesso deve reagir a usuários, aplicativos e sinais de risco sem bloquear administradores de recuperação. Analise onde o conhecimento de "Contas de acesso emergencial" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Contas de acesso emergencial", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Runbook de acesso emergencial com testes, alertas e aprovação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Report-only avalia sem aplicar a restrição; não é equivalente a política habilitada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/authentication/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 19: Identidades externas e acesso B2B

Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento.

#### 19.1. B2B collaboration e usuários convidados

**O que é:** Identidades externas podem acessar recursos internos sob políticas e responsabilidades definidas.

**Para que serve:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra External ID e aplicações de teste Conexão com IAM: Trust inbound/outbound, B2B, app assignment e offboarding.

**Questão profissional:** O convidado tem sponsor, prazo e entitlement independente?

**Critério de competência:** Entrega verificável: Convite, acesso permitido e revogação documentados. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Fornecedor externo entra na AtlasCorp com sponsor e prazo definidos, recebendo exclusivamente o recurso necessário. Analise onde o conhecimento de "B2B collaboration e usuários convidados" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "B2B collaboration e usuários convidados", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Convite, acesso permitido e revogação documentados. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

**AtlasCorp: 2 procedimento(s) incorporado(s) diretamente na aula**

- Gerenciamento de convidados B2B · Autorizar parceria: **Onde:** Ticket fornecedor → segurança e Financeiro. **Ação:** Registre empresa parceira, responsável interno, recurso específico e data de expiração.. **Validação:** Aprovação do sponsor e prazo de 30 dias.. **Se falhar:** Sem sponsor não conceda acesso.
- Gerenciamento de convidados B2B · Convidar e atribuir: **Onde:** Entra ID → Users → New user → Invite external user. **Ação:** Envie convite para identidade de parceiro de teste, associe somente grupo do recurso aprovado.. **Validação:** Guest visível, convite aceito e recurso permitido.. **Se falhar:** Se resgate falha, confira restrictions e política de colaboração.

#### 19.2. B2B direct connect

**O que é:** B2B direct connect é distinto de colaboração por convite e não serve aos mesmos cenários de todos os aplicativos.

**Para que serve:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra External ID e aplicações de teste Conexão com IAM: Trust inbound/outbound, B2B, app assignment e offboarding.

**Questão profissional:** O convidado tem sponsor, prazo e entitlement independente?

**Critério de competência:** Entrega verificável: Tabela de diferenças, restrições e decisão por cenário. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Fornecedor externo entra na AtlasCorp com sponsor e prazo definidos, recebendo exclusivamente o recurso necessário. Analise onde o conhecimento de "B2B direct connect" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "B2B direct connect", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Tabela de diferenças, restrições e decisão por cenário. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 19.3. Cross-tenant access settings

**O que é:** Políticas inbound e outbound governam confiança e colaboração entre tenants.

**Para que serve:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra External ID e aplicações de teste Conexão com IAM: Trust inbound/outbound, B2B, app assignment e offboarding.

**Questão profissional:** O convidado tem sponsor, prazo e entitlement independente?

**Critério de competência:** Entrega verificável: Matriz de confiança de origem, destino e resultado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Fornecedor externo entra na AtlasCorp com sponsor e prazo definidos, recebendo exclusivamente o recurso necessário. Analise onde o conhecimento de "Cross-tenant access settings" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Cross-tenant access settings", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de confiança de origem, destino e resultado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Gerenciamento de convidados B2B · Restringir colaboração: **Onde:** Entra ID → External Identities → Cross-tenant access settings. **Ação:** Revise colaboração inbound/outbound. Em tenant de teste, modele relação com o parceiro antes do convite.. **Validação:** Mapa de confiança e condições de convidado.. **Se falhar:** External ID e B2B direct connect não são iguais.

#### 19.4. Cross-tenant synchronization

**O que é:** Sincronização entre tenants automatiza parte do ciclo de vida B2B e necessita controles claros sobre identidades.

**Para que serve:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra External ID e aplicações de teste Conexão com IAM: Trust inbound/outbound, B2B, app assignment e offboarding.

**Questão profissional:** O convidado tem sponsor, prazo e entitlement independente?

**Critério de competência:** Entrega verificável: Fluxo completo com proprietário e critérios de remoção. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Fornecedor externo entra na AtlasCorp com sponsor e prazo definidos, recebendo exclusivamente o recurso necessário. Analise onde o conhecimento de "Cross-tenant synchronization" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Cross-tenant synchronization", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo completo com proprietário e critérios de remoção. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 19.5. External ID para aplicações

**O que é:** Identidade de clientes e identidades de força de trabalho apresentam modelos de tenant e requisitos distintos.

**Para que serve:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra External ID e aplicações de teste Conexão com IAM: Trust inbound/outbound, B2B, app assignment e offboarding.

**Questão profissional:** O convidado tem sponsor, prazo e entitlement independente?

**Critério de competência:** Entrega verificável: Decisão arquitetural com fluxo de inscrição e autenticação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Fornecedor externo entra na AtlasCorp com sponsor e prazo definidos, recebendo exclusivamente o recurso necessário. Analise onde o conhecimento de "External ID para aplicações" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "External ID para aplicações", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Decisão arquitetural com fluxo de inscrição e autenticação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 19.6. Consentimento de aplicativos e publishers

**O que é:** Consentimento atribui permissões a aplicações; governança evita concessões excessivas a terceiros.

**Para que serve:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra External ID e aplicações de teste Conexão com IAM: Trust inbound/outbound, B2B, app assignment e offboarding.

**Questão profissional:** O convidado tem sponsor, prazo e entitlement independente?

**Critério de competência:** Entrega verificável: Matriz de permissões e critérios de aprovação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Fornecedor externo entra na AtlasCorp com sponsor e prazo definidos, recebendo exclusivamente o recurso necessário. Analise onde o conhecimento de "Consentimento de aplicativos e publishers" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Consentimento de aplicativos e publishers", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de permissões e critérios de aprovação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 19.7. SAML/OIDC entre tenants

**O que é:** Federação exige verificação de emissor, público, tempo e relação explícita de confiança.

**Para que serve:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra External ID e aplicações de teste Conexão com IAM: Trust inbound/outbound, B2B, app assignment e offboarding.

**Questão profissional:** O convidado tem sponsor, prazo e entitlement independente?

**Critério de competência:** Entrega verificável: Diagrama com checkpoints de segurança e evidências em logs. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Fornecedor externo entra na AtlasCorp com sponsor e prazo definidos, recebendo exclusivamente o recurso necessário. Analise onde o conhecimento de "SAML/OIDC entre tenants" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "SAML/OIDC entre tenants", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Diagrama com checkpoints de segurança e evidências em logs. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 19.8. Revisão de convidados inativos

**O que é:** Convidados esquecidos elevam risco e exigem expiração, revisão periódica e owner do acesso.

**Para que serve:** Implemente colaboração entre organizações sem perder propriedade, revisão e isolamento. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Entra External ID e aplicações de teste Conexão com IAM: Trust inbound/outbound, B2B, app assignment e offboarding.

**Questão profissional:** O convidado tem sponsor, prazo e entitlement independente?

**Critério de competência:** Entrega verificável: Relatório com decisão manter/remover e justificativa. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Fornecedor externo entra na AtlasCorp com sponsor e prazo definidos, recebendo exclusivamente o recurso necessário. Analise onde o conhecimento de "Revisão de convidados inativos" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Revisão de convidados inativos", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Relatório com decisão manter/remover e justificativa. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Convidado não é membro administrativo nem identidade de cliente em todos os cenários.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Gerenciamento de convidados B2B · Testar escopo e expiração: **Onde:** Aplicativo Financeiro → conta externa. **Ação:** Verifique recurso permitido e tentativa negada em recurso restrito; execute remoção de associação e prove perda de acesso.. **Validação:** Dois testes + evidência de remoção.. **Se falhar:** Sessões anteriores podem persistir por tempo limitado.

### Módulo 20: Microsoft Intune e identidade de dispositivos

Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo.

#### 20.1. Device registration versus Microsoft Entra Join

**O que é:** Registro e associação ao Entra produzem estados e experiências diferentes de identidade do dispositivo. Registro e ingresso no domínio cloud apresentam propriedades e gerenciamento diferentes; Hybrid Join combina AD e Entra.

**Para que serve:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Intune admin center, Entra ID e Windows de teste Conexão com IAM: MDM, estado, CA, logs, exceções e retire seguro.

**Questão profissional:** A condição de dispositivo reflete compliance Intune e não apenas cadastro?

**Critério de competência:** Entrega verificável: Tabela dos estados e seus usos de autenticação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um dispositivo piloto altera seu estado de compliance e o Entra precisa decidir acesso à aplicação baseada em sinal Intune. Analise onde o conhecimento de "Device registration versus Microsoft Entra Join" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Device registration versus Microsoft Entra Join", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Tabela dos estados e seus usos de autenticação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte técnica:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 20.2. Enrollment MDM no Intune

**O que é:** Inscrição no MDM permite distribuir políticas, inventariar e avaliar postura, sujeita ao vínculo e consentimento.

**Para que serve:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Intune admin center, Entra ID e Windows de teste Conexão com IAM: MDM, estado, CA, logs, exceções e retire seguro.

**Questão profissional:** A condição de dispositivo reflete compliance Intune e não apenas cadastro?

**Critério de competência:** Entrega verificável: Evidência de enrollment e estado de gerenciamento. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um dispositivo piloto altera seu estado de compliance e o Entra precisa decidir acesso à aplicação baseada em sinal Intune. Analise onde o conhecimento de "Enrollment MDM no Intune" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Enrollment MDM no Intune", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Evidência de enrollment e estado de gerenciamento. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte técnica:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Intune + Conditional Access · Validar gestão de dispositivos: **Onde:** intune.microsoft.com → Devices → All devices. **Ação:** Confirme licença Intune, plataforma suportada e escopo de MDM. Inscreva somente dispositivo descartável de teste, sem remover controles de equipamento de uso real.. **Validação:** Device ID de teste e estado de gerenciamento.. **Se falhar:** Se o dispositivo não aparece, cheque enrollment restrictions e atribuição de licença.

#### 20.3. Políticas de compliance

**O que é:** Políticas de compliance do Intune avaliam requisitos de postura em dispositivos gerenciados, gerando sinal que pode ser consumido por Conditional Access.

**Para que serve:** Restringir operações sensíveis conforme conformidade do dispositivo, além da identidade e da autenticação do usuário.

**Como funciona:** Crie e atribua política apenas ao dispositivo/grupo piloto no Intune; aguarde sincronização e observe o resultado. Em seguida, no Entra CA, use Require device to be marked as compliant para aplicativo piloto, analisando Sign-in logs.

**Questão profissional:** A condição de dispositivo reflete compliance Intune e não apenas cadastro?

**Critério de competência:** Entrega verificável: Política, estado calculado e justificativa do resultado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um dispositivo piloto altera seu estado de compliance e o Entra precisa decidir acesso à aplicação baseada em sinal Intune. Analise onde o conhecimento de "Políticas de compliance" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Políticas de compliance", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Política, estado calculado e justificativa do resultado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte técnica:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Intune + Conditional Access · Criar política compliance: **Onde:** Intune → Devices → Compliance → Policies → Create. **Ação:** Selecione plataforma de teste, configure requisito seguro (ex.: PIN/bloqueio de tela suportado) e atribua somente grupo piloto.. **Validação:** Política e avaliação compliant/noncompliant no Intune.. **Se falhar:** Aguarde sincronização; falha de avaliação não equivale a usuário sem login.

#### 20.4. Conditional Access com dispositivo conforme

**O que é:** O Entra pode usar o sinal de compliance fornecido pelo Intune em decisões de acesso. Política de CA no Entra usa resultado de compliance do Intune como condição e requisito de acesso.

**Para que serve:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Intune admin center, Entra ID e Windows de teste Conexão com IAM: MDM, estado, CA, logs, exceções e retire seguro.

**Questão profissional:** A condição de dispositivo reflete compliance Intune e não apenas cadastro?

**Critério de competência:** Entrega verificável: Sign-in logs mostram a condição e o resultado da avaliação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um dispositivo piloto altera seu estado de compliance e o Entra precisa decidir acesso à aplicação baseada em sinal Intune. Analise onde o conhecimento de "Conditional Access com dispositivo conforme" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Conditional Access com dispositivo conforme", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Sign-in logs mostram a condição e o resultado da avaliação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance

**AtlasCorp: 2 procedimento(s) incorporado(s) diretamente na aula**

- Intune + Conditional Access · Conectar sinal ao CA: **Onde:** Entra → Protection → Conditional Access → Policies → New. **Ação:** Crie CA-ATL-003-DEVICE-COMPLIANT. Escopo: grupo de teste + recurso definido; Grant: Require device to be marked as compliant; Report-only inicialmente.. **Validação:** Policy report-only e avaliação de dispositivo nos sign-ins.. **Se falhar:** Se o controle não aparecer, confira licença e plataforma suportada.
- Intune + Conditional Access · Gerar casos realistas: **Onde:** Dispositivo de teste + sign-in logs. **Ação:** Teste compliant e um estado de noncompliance reversível, correlacionando usuário/dispositivo/hora/política. Se tudo estiver validado, habilite temporariamente só grupo piloto.. **Validação:** Log de ambos estados com condições aplicadas.. **Se falhar:** Sem device ID no sign-in, confira join/registro e navegador cliente.

#### 20.5. Configuração de endpoints versus compliance

**O que é:** Perfis de configuração aplicam preferências de segurança; compliance avalia se requisitos são atendidos.

**Para que serve:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Intune admin center, Entra ID e Windows de teste Conexão com IAM: MDM, estado, CA, logs, exceções e retire seguro.

**Questão profissional:** A condição de dispositivo reflete compliance Intune e não apenas cadastro?

**Critério de competência:** Entrega verificável: Diferenciação entre estado configurado e avaliação de conformidade. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um dispositivo piloto altera seu estado de compliance e o Entra precisa decidir acesso à aplicação baseada em sinal Intune. Analise onde o conhecimento de "Configuração de endpoints versus compliance" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Configuração de endpoints versus compliance", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Diferenciação entre estado configurado e avaliação de conformidade. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte técnica:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 20.6. Enrollment restrictions e escopo

**O que é:** Restrições de inscrição e grupos de atribuição ajudam a limitar dispositivos e usuários elegíveis.

**Para que serve:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Intune admin center, Entra ID e Windows de teste Conexão com IAM: MDM, estado, CA, logs, exceções e retire seguro.

**Questão profissional:** A condição de dispositivo reflete compliance Intune e não apenas cadastro?

**Critério de competência:** Entrega verificável: Tabela com bloqueio/permitido por categoria de dispositivo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um dispositivo piloto altera seu estado de compliance e o Entra precisa decidir acesso à aplicação baseada em sinal Intune. Analise onde o conhecimento de "Enrollment restrictions e escopo" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Enrollment restrictions e escopo", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Tabela com bloqueio/permitido por categoria de dispositivo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte técnica:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 20.7. App protection policies (MAM)

**O que é:** Proteção de aplicativo controla dados corporativos em aplicativos suportados, inclusive cenários sem MDM.

**Para que serve:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Intune admin center, Entra ID e Windows de teste Conexão com IAM: MDM, estado, CA, logs, exceções e retire seguro.

**Questão profissional:** A condição de dispositivo reflete compliance Intune e não apenas cadastro?

**Critério de competência:** Entrega verificável: Matriz MAM versus MDM com efeito esperado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um dispositivo piloto altera seu estado de compliance e o Entra precisa decidir acesso à aplicação baseada em sinal Intune. Analise onde o conhecimento de "App protection policies (MAM)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "App protection policies (MAM)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz MAM versus MDM com efeito esperado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte técnica:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 20.8. BitLocker, chaves e identidades

**O que é:** Criptografia do endpoint protege dados em repouso; acesso e recuperação exigem controle e auditoria.

**Para que serve:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Intune admin center, Entra ID e Windows de teste Conexão com IAM: MDM, estado, CA, logs, exceções e retire seguro.

**Questão profissional:** A condição de dispositivo reflete compliance Intune e não apenas cadastro?

**Critério de competência:** Entrega verificável: Fluxo de recuperação com atribuições mínimas e evidências sem chave exposta. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um dispositivo piloto altera seu estado de compliance e o Entra precisa decidir acesso à aplicação baseada em sinal Intune. Analise onde o conhecimento de "BitLocker, chaves e identidades" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "BitLocker, chaves e identidades", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo de recuperação com atribuições mínimas e evidências sem chave exposta. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte técnica:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 20.9. Windows Hello for Business e dispositivos

**O que é:** O método de login combina identidade de usuário, material criptográfico e vínculo com dispositivo.

**Para que serve:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Intune admin center, Entra ID e Windows de teste Conexão com IAM: MDM, estado, CA, logs, exceções e retire seguro.

**Questão profissional:** A condição de dispositivo reflete compliance Intune e não apenas cadastro?

**Critério de competência:** Entrega verificável: Diagrama de autenticação sem senha e recuperação de acesso. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um dispositivo piloto altera seu estado de compliance e o Entra precisa decidir acesso à aplicação baseada em sinal Intune. Analise onde o conhecimento de "Windows Hello for Business e dispositivos" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Windows Hello for Business e dispositivos", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Diagrama de autenticação sem senha e recuperação de acesso. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte técnica:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 20.10. Desligamento e retire/wipe

**O que é:** Retire, wipe, disable device e revogação da conta possuem efeitos diferentes e exigem autorização.

**Para que serve:** Use a postura do endpoint como sinal de acesso, distinguindo identidade do usuário e dispositivo. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Intune admin center, Entra ID e Windows de teste Conexão com IAM: MDM, estado, CA, logs, exceções e retire seguro.

**Questão profissional:** A condição de dispositivo reflete compliance Intune e não apenas cadastro?

**Critério de competência:** Entrega verificável: Plano de desligamento com efeito de cada operação e ponto de rollback. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um dispositivo piloto altera seu estado de compliance e o Entra precisa decidir acesso à aplicação baseada em sinal Intune. Analise onde o conhecimento de "Desligamento e retire/wipe" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Desligamento e retire/wipe", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Plano de desligamento com efeito de cada operação e ponto de rollback. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Intune informa estado de dispositivo; Entra Conditional Access avalia acesso.

**Fonte técnica:** https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Intune + Conditional Access · Reverter o ambiente: **Onde:** Intune e Entra → políticas piloto. **Ação:** Volte CA para Report-only/Off, restaure compliance e remova enrollment descartável somente após registrar evidência.. **Validação:** Plano completo de estado final.. **Se falhar:** Nunca use wipe em dispositivo pessoal.

### Módulo 21: Azure RBAC e autorização de recursos

Entenda escopos e atribuições efetivas de autorização para recursos cloud.

#### 21.1. Tenant versus subscription versus management group

**O que é:** Organização, tenant, grupos de gerenciamento e assinaturas controlam limites diferentes.

**Para que serve:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Azure portal e Azure CLI; recurso sandbox Conexão com IAM: Role assignment, herança, NotActions, Activity Log e custos.

**Questão profissional:** A role está no resource group/recurso e é data-plane ou management-plane?

**Critério de competência:** Entrega verificável: Hierarquia contendo management group, subscription e resource group. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um recurso Azure precisa oferecer somente leitura para um principal específico, sem permitir escrita ou delegar a assinatura inteira. Analise onde o conhecimento de "Tenant versus subscription versus management group" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Tenant versus subscription versus management group", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Hierarquia contendo management group, subscription e resource group. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte técnica:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Managed Identity + Azure RBAC · Definir orçamento: **Onde:** Azure portal → Cost Management + Billing → Budgets. **Ação:** Registre orçamento e categoria de custos; se indisponível, mantenha atividade como simulação.. **Validação:** Orçamento e previsão/alerta registrados.. **Se falhar:** Sem controle de custo não crie recursos reais.

#### 21.2. Azure RBAC: principal, role e scope

**O que é:** Azure RBAC controla quem pode realizar quais operações sobre recursos Azure. Uma atribuição conecta principal, role e escopo, como recurso, resource group, assinatura ou management group.

**Para que serve:** Aplicar menor privilégio a identidades humanas e de workloads na gestão e no acesso a recursos Azure.

**Como funciona:** No recurso apropriado, abra Access control (IAM) → Add role assignment, escolha a role de dados/gestão mínima e o principal correto. Reader é papel de plano de gerenciamento e não concede automaticamente acesso aos dados de todo recurso.

**Questão profissional:** A role está no resource group/recurso e é data-plane ou management-plane?

**Critério de competência:** Entrega verificável: Tabela de permissões efetivas dentro e fora do escopo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma workload precisa ler recurso específico sem escrever e sem permissão geral na assinatura.

**Entrega esperada:** Tabela principal-role-escopo, operação positiva e negativa, e confirmação de cleanup.

**Risco:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte técnica:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

**Complemento:** [Diferenças entre papéis Azure e Entra](https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles)

**AtlasCorp: 2 procedimento(s) incorporado(s) diretamente na aula**

- Managed Identity + Azure RBAC · Criar escopo mínimo: **Onde:** Azure portal → Resource groups → Create. **Ação:** Crie RG-IAM-ATL-LAB na região adequada; configure tags owner, purpose e cleanup.. **Validação:** Resource group identificado e plano de descarte.. **Se falhar:** Erro de criação pode ser falta de RBAC ou restrição Policy.
- Managed Identity + Azure RBAC · Conceder Reader: **Onde:** Recurso Azure de destino → Access Control (IAM) → Add role assignment. **Ação:** Atribua papel apropriado para leitura somente à identidade no próprio recurso ou resource group isolado.. **Validação:** Teste leitura permitida e escrita negada.. **Se falhar:** Reader amplo demais para segredo: use role data-plane apropriada por serviço.

#### 21.3. Roles predefinidas versus roles customizadas

**O que é:** Funções personalizadas podem minimizar permissões, mas aumentam responsabilidade de manutenção.

**Para que serve:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Azure portal e Azure CLI; recurso sandbox Conexão com IAM: Role assignment, herança, NotActions, Activity Log e custos.

**Questão profissional:** A role está no resource group/recurso e é data-plane ou management-plane?

**Critério de competência:** Entrega verificável: Definição de ações e não ações alinhada ao caso de uso. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um recurso Azure precisa oferecer somente leitura para um principal específico, sem permitir escrita ou delegar a assinatura inteira. Analise onde o conhecimento de "Roles predefinidas versus roles customizadas" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Roles predefinidas versus roles customizadas", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Definição de ações e não ações alinhada ao caso de uso. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte técnica:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 21.4. NotActions e permissões efetivas

**O que é:** NotActions não implementa uma negação global; permissões podem vir de outras atribuições. Em Azure, NotActions não é explicit deny e não revoga permissões concedidas por outras role assignments.

**Para que serve:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Azure portal e Azure CLI; recurso sandbox Conexão com IAM: Role assignment, herança, NotActions, Activity Log e custos.

**Questão profissional:** A role está no resource group/recurso e é data-plane ou management-plane?

**Critério de competência:** Entrega verificável: Demonstração de por que NotActions não é explicit deny. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um recurso Azure precisa oferecer somente leitura para um principal específico, sem permitir escrita ou delegar a assinatura inteira. Analise onde o conhecimento de "NotActions e permissões efetivas" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "NotActions e permissões efetivas", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Demonstração de por que NotActions não é explicit deny. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte técnica:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 21.5. Azure Policy versus Azure RBAC

**O que é:** Azure Policy avalia conformidade de recursos, enquanto RBAC controla quem pode executar ações. Azure Policy avalia regras de configuração e conformidade, enquanto Azure RBAC decide permissão do principal.

**Para que serve:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Azure portal e Azure CLI; recurso sandbox Conexão com IAM: Role assignment, herança, NotActions, Activity Log e custos.

**Questão profissional:** A role está no resource group/recurso e é data-plane ou management-plane?

**Critério de competência:** Entrega verificável: Tabela controle preventivo de configuração versus autorização de usuário. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um recurso Azure precisa oferecer somente leitura para um principal específico, sem permitir escrita ou delegar a assinatura inteira. Analise onde o conhecimento de "Azure Policy versus Azure RBAC" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Azure Policy versus Azure RBAC", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Tabela controle preventivo de configuração versus autorização de usuário. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte técnica:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 21.6. Managed identities no Azure

**O que é:** Identidades gerenciadas fornecem credenciais por plataforma para workloads, reduzindo segredos estáticos.

**Para que serve:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Azure portal e Azure CLI; recurso sandbox Conexão com IAM: Role assignment, herança, NotActions, Activity Log e custos.

**Questão profissional:** A role está no resource group/recurso e é data-plane ou management-plane?

**Critério de competência:** Entrega verificável: Evidência de identidade, escopo e acesso restrito. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um recurso Azure precisa oferecer somente leitura para um principal específico, sem permitir escrita ou delegar a assinatura inteira. Analise onde o conhecimento de "Managed identities no Azure" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Managed identities no Azure", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Evidência de identidade, escopo e acesso restrito. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Managed Identity + Azure RBAC · Configurar managed identity: **Onde:** Azure recurso suportado → Identity. **Ação:** Ative System-assigned ou crie User-assigned, justificando decisão e registando principal ID mascarado.. **Validação:** Principal distinto do usuário humano.. **Se falhar:** Ativar identidade não concede automaticamente acesso ao recurso.

#### 21.7. Azure Key Vault com RBAC

**O que é:** Segredos devem ser acessíveis só a workloads e operadores autorizados, com logs e rotação.

**Para que serve:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Azure portal e Azure CLI; recurso sandbox Conexão com IAM: Role assignment, herança, NotActions, Activity Log e custos.

**Questão profissional:** A role está no resource group/recurso e é data-plane ou management-plane?

**Critério de competência:** Entrega verificável: Matriz de operações permitido/negado e log de acesso. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um recurso Azure precisa oferecer somente leitura para um principal específico, sem permitir escrita ou delegar a assinatura inteira. Analise onde o conhecimento de "Azure Key Vault com RBAC" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Azure Key Vault com RBAC", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de operações permitido/negado e log de acesso. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte técnica:** https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 21.8. Azure PIM para recursos

**O que é:** Acesso privilegiado a recursos Azure pode ser elegível ou temporário conforme configuração e licença.

**Para que serve:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Azure portal e Azure CLI; recurso sandbox Conexão com IAM: Role assignment, herança, NotActions, Activity Log e custos.

**Questão profissional:** A role está no resource group/recurso e é data-plane ou management-plane?

**Critério de competência:** Entrega verificável: Linha do tempo antes/durante/depois da elevação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um recurso Azure precisa oferecer somente leitura para um principal específico, sem permitir escrita ou delegar a assinatura inteira. Analise onde o conhecimento de "Azure PIM para recursos" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Azure PIM para recursos", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Linha do tempo antes/durante/depois da elevação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte técnica:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 21.9. Governança com escopos e tags

**O que é:** Organização cloud combina estrutura de recursos, políticas e rastreabilidade de proprietários.

**Para que serve:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Azure portal e Azure CLI; recurso sandbox Conexão com IAM: Role assignment, herança, NotActions, Activity Log e custos.

**Questão profissional:** A role está no resource group/recurso e é data-plane ou management-plane?

**Critério de competência:** Entrega verificável: Inventário com owner, função, escopo e exceção. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um recurso Azure precisa oferecer somente leitura para um principal específico, sem permitir escrita ou delegar a assinatura inteira. Analise onde o conhecimento de "Governança com escopos e tags" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Governança com escopos e tags", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Inventário com owner, função, escopo e exceção. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte técnica:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 21.10. Azure Activity Log e auditoria RBAC

**O que é:** Mudanças de role assignment podem ser investigadas por eventos de gerenciamento e contexto do ator.

**Para que serve:** Entenda escopos e atribuições efetivas de autorização para recursos cloud. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Azure portal e Azure CLI; recurso sandbox Conexão com IAM: Role assignment, herança, NotActions, Activity Log e custos.

**Questão profissional:** A role está no resource group/recurso e é data-plane ou management-plane?

**Critério de competência:** Entrega verificável: Registro de auditoria de concessão e remoção sem dados reais. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um recurso Azure precisa oferecer somente leitura para um principal específico, sem permitir escrita ou delegar a assinatura inteira. Analise onde o conhecimento de "Azure Activity Log e auditoria RBAC" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Azure Activity Log e auditoria RBAC", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Registro de auditoria de concessão e remoção sem dados reais. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** NotActions não constitui explicit deny global; outras concessões continuam possíveis.

**Fonte técnica:** https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Managed Identity + Azure RBAC · Revogar e limpar: **Onde:** Resource group → Role assignments / Delete. **Ação:** Exclua role e recursos após registrar Activity Log e teste de negação.. **Validação:** Concessão/revogação documentadas e custo encerrado.. **Se falhar:** Propagação de RBAC pode exigir tempo; não crie privilégios extras para acelerar.

### Módulo 10: Cloud IAM e identidades de workload

Recursos cloud e aplicações devem receber somente permissões necessárias e temporárias.

#### 10.1. AWS IAM policies, roles e STS

**O que é:** AWS IAM define políticas de permissões, trust policies de roles e credenciais temporárias por AWS STS. Trust policy controla quem assume role; permission policy controla as ações permitidas depois da assunção.

**Para que serve:** Permissões amplas permitem movimentação indevida; trust policy controla quem pode assumir role.

**Como funciona:** AWS Console → IAM → Policies/Roles; STS via CLI. Conexão com IAM: Separe autenticador, trust, principal, role e escopo.

**Questão profissional:** Quem confia na identidade da workload e qual permissão ela assume?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** Workload Financeiro deve ler recurso cloud sem client secret permanente nem papel administrativo amplo. Analise onde o conhecimento de "AWS IAM policies, roles e STS" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "AWS IAM policies, roles e STS", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Uma role confiável para uma identidade não significa autorização irrestrita.

**Fonte técnica:** https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 10.2. IAM Identity Center e federação

**O que é:** IAM Identity Center administra atribuições de identidades a contas AWS e apps, inclusive federação corporativa.

**Para que serve:** Centraliza acessos humanos multi-account sem distribuir usuários IAM individuais.

**Como funciona:** AWS Console → IAM Identity Center → Permission sets e AWS accounts. Conexão com IAM: Separe autenticador, trust, principal, role e escopo.

**Questão profissional:** Quem confia na identidade da workload e qual permissão ela assume?

**Critério de competência:** Critério de aceite: Em organização de laboratório, crie permission set mínimo; Confirme acesso federado e remova atribuição.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Workload Financeiro deve ler recurso cloud sem client secret permanente nem papel administrativo amplo. Analise onde o conhecimento de "IAM Identity Center e federação" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "IAM Identity Center e federação", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Em organização de laboratório, crie permission set mínimo; Confirme acesso federado e remova atribuição.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Uma role confiável para uma identidade não significa autorização irrestrita.

**Fonte técnica:** https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 10.3. Service principals e managed identities

**O que é:** Service principal representa aplicação no Entra; managed identity é identidade gerenciada pelo Azure para recurso/workload. Service principal representa aplicação/workload; managed identity gerencia credenciais em Azure de forma integrada.

**Para que serve:** Permite reduzir segredos fixos em serviços que chamam APIs e recursos cloud.

**Como funciona:** Azure Portal → recurso → Identity; Entra admin center → Enterprise applications. Conexão com IAM: Separe autenticador, trust, principal, role e escopo.

**Questão profissional:** Quem confia na identidade da workload e qual permissão ela assume?

**Critério de competência:** Critério de aceite: Habilite identidade gerenciada de VM/app de laboratório; Use token da identidade e revogue role.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Workload Financeiro deve ler recurso cloud sem client secret permanente nem papel administrativo amplo. Analise onde o conhecimento de "Service principals e managed identities" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Service principals e managed identities", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Habilite identidade gerenciada de VM/app de laboratório; Use token da identidade e revogue role.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Uma role confiável para uma identidade não significa autorização irrestrita.

**Fonte técnica:** https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 10.4. Credenciais temporárias e auditoria

**O que é:** Tokens e credenciais de sessão têm validade curta e permitem rastrear ações por principal.

**Para que serve:** Reduz exposição de chaves permanentes e auxilia investigação após incidentes.

**Como funciona:** AWS STS e CloudTrail; Entra workload identity e sign-in logs. Conexão com IAM: Separe autenticador, trust, principal, role e escopo.

**Questão profissional:** Quem confia na identidade da workload e qual permissão ela assume?

**Critério de competência:** Relaciona evidência, causa provável, correção e novo teste.

**Cenário de fixação:** Workload Financeiro deve ler recurso cloud sem client secret permanente nem papel administrativo amplo. Analise onde o conhecimento de "Credenciais temporárias e auditoria" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Credenciais temporárias e auditoria", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Relaciona evidência, causa provável, correção e novo teste.

**Risco:** Uma role confiável para uma identidade não significa autorização irrestrita.

**Fonte técnica:** https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 11: SCIM e provisionamento JML

A automação sincroniza o ciclo de vida de usuários e acessos entre RH, diretórios e aplicações.

#### 11.1. SCIM Users

**O que é:** SCIM padroniza uma API HTTP para gerenciar identidades entre sistemas, com recursos como /Users, atributos normalizados e operações de criação e atualização.

**Para que serve:** Automatiza Joiner, Mover e Leaver em aplicações que suportam SCIM, com correlação consistente e tratamento de falhas.

**Como funciona:** Mapeie employeeId ou externalId a uma identidade persistente; envie recursos sintéticos a /Users em um servidor de teste, leia o identificador retornado e valide alterações e desativação sem gerar duplicidades.

**Questão profissional:** A operação é Joiner, Mover ou Leaver, e qual é o ID estável?

**Critério de competência:** Interpreta id, userName e active.

**Cenário de fixação:** O RH transfere Bruno de área. O destino SCIM deve atualizar o mesmo usuário e não criar um duplicado.

**Entrega esperada:** ID/externalId original, PATCH, GET atualizado e conferência de active.

**Risco:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc7643

**Complemento:** [SCIM 2.0: operações HTTP e provisionamento (RFC 7644)](https://www.rfc-editor.org/rfc/rfc7644)

**AtlasCorp: 2 procedimento(s) incorporado(s) diretamente na aula**

- Provisionamento SCIM idempotente · Definir contrato: **Onde:** Documente mapeamento HR → Entra → /Users. **Ação:** Escolha sourceId, externalId, userName, active, department e campos obrigatórios.. **Validação:** Contrato com exemplos de entrada e saída.. **Se falhar:** Não use dados reais em payload.
- Provisionamento SCIM idempotente · Criar usuário SCIM: **Onde:** API mock → POST /Users. **Ação:** Envie JSON sintético e confira Location, status e ID retornado.. **Validação:** 200/201 esperado conforme implementação e RFC/contrato.. **Se falhar:** Se o ID não é retornado, corrija endpoint/mock.

#### 11.2. SCIM Groups

**O que é:** Grupos SCIM sincronizam associações no sistema de destino. O significado de cada grupo deve ser acordado com a lógica de autorização da aplicação. Grupos SCIM sincronizam associações; a autorização final ainda depende do aplicativo de destino.

**Para que serve:** Permite sincronizar membership entre diretório de origem e aplicações.

**Como funciona:** Servidor SCIM /Groups e provisionamento de grupos no IdP. Conexão com IAM: Mapeie externalId, PATCH, idempotência, desativação e logs.

**Questão profissional:** A operação é Joiner, Mover ou Leaver, e qual é o ID estável?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** RH comunica Joiner, Mover e Leaver; SaaS de destino não pode criar contas duplicadas nem deixar acesso órfão. Analise onde o conhecimento de "SCIM Groups" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "SCIM Groups", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc7643

**Complemento:** [SCIM 2.0: protocolo (RFC 7644)](https://www.rfc-editor.org/rfc/rfc7644)

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 11.3. REST e SCIM

**O que é:** SCIM 2.0 usa HTTP, JSON e schema padronizado para provisionamento de identidades.

**Para que serve:** Endpoints e erros consistentes facilitam integrações de ciclo de vida.

**Como funciona:** URLs /scim/v2/Users e /Groups; RFC 7643 e 7644. Conexão com IAM: Mapeie externalId, PATCH, idempotência, desativação e logs.

**Questão profissional:** A operação é Joiner, Mover ou Leaver, e qual é o ID estável?

**Critério de competência:** Critério de aceite: Teste GET /ServiceProviderConfig em servidor simulado; Examine schema e códigos 201, 400 e 401.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH comunica Joiner, Mover e Leaver; SaaS de destino não pode criar contas duplicadas nem deixar acesso órfão. Analise onde o conhecimento de "REST e SCIM" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "REST e SCIM", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Teste GET /ServiceProviderConfig em servidor simulado; Examine schema e códigos 201, 400 e 401.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc7644

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 11.4. PATCH

**O que é:** SCIM PATCH altera parcialmente um recurso com operações add, replace ou remove. PATCH SCIM permite atualizar atributos e operações específicas segundo RFC 7644, com idempotência analisada.

**Para que serve:** Evita substituir todo cadastro ao mudar apenas um atributo.

**Como funciona:** PATCH /Users/{id} com application/scim+json e schema PatchOp. Conexão com IAM: Mapeie externalId, PATCH, idempotência, desativação e logs.

**Questão profissional:** A operação é Joiner, Mover ou Leaver, e qual é o ID estável?

**Critério de competência:** Critério de aceite: Envie PATCH replace para active=false em usuário fictício; Repita operação e verifique estado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH comunica Joiner, Mover e Leaver; SaaS de destino não pode criar contas duplicadas nem deixar acesso órfão. Analise onde o conhecimento de "PATCH" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "PATCH", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Envie PATCH replace para active=false em usuário fictício; Repita operação e verifique estado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc7644

**Complemento:** [PATCH no protocolo SCIM (RFC 7644)](https://www.rfc-editor.org/rfc/rfc7644)

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Provisionamento SCIM idempotente · Mover sem duplicar: **Onde:** API mock → PATCH /Users/{id}. **Ação:** Altere departamento, preserve externalId, teste GET e idempotência.. **Validação:** ID persistido, atributos atualizados.. **Se falhar:** Se cria outro recurso, revise regra de matching.

#### 11.5. Filtros SCIM

**O que é:** Filtros SCIM selecionam objetos com operadores padronizados, como userName eq "alice".

**Para que serve:** Ajudam localizar conta existente antes de criar e evitam duplicações.

**Como funciona:** Parâmetro filter em GET /Users e /Groups. Conexão com IAM: Mapeie externalId, PATCH, idempotência, desativação e logs.

**Questão profissional:** A operação é Joiner, Mover ou Leaver, e qual é o ID estável?

**Critério de competência:** Critério de aceite: Crie dois usuários no mock SCIM; Compare resultado com filtro inexistente.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH comunica Joiner, Mover e Leaver; SaaS de destino não pode criar contas duplicadas nem deixar acesso órfão. Analise onde o conhecimento de "Filtros SCIM" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Filtros SCIM", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie dois usuários no mock SCIM; Compare resultado com filtro inexistente.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc7644

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 11.6. Paginação

**O que é:** Paginação em SCIM usa startIndex e count para limitar consultas de coleções.

**Para que serve:** Sem paginação, importações grandes podem falhar ou omitir identidades.

**Como funciona:** GET /Users?startIndex=1&count=10 e respostas listResponse. Conexão com IAM: Mapeie externalId, PATCH, idempotência, desativação e logs.

**Questão profissional:** A operação é Joiner, Mover ou Leaver, e qual é o ID estável?

**Critério de competência:** Critério de aceite: Crie conjunto de usuários fictícios; Use totalResults para verificar quantidade recuperada.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH comunica Joiner, Mover e Leaver; SaaS de destino não pode criar contas duplicadas nem deixar acesso órfão. Analise onde o conhecimento de "Paginação" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Paginação", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie conjunto de usuários fictícios; Use totalResults para verificar quantidade recuperada.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc7644

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 11.7. Provisionamento e desprovisionamento

**O que é:** Provisionamento concede/cria conta no destino; desprovisionamento remove ou desativa acesso após mudança ou saída.

**Para que serve:** Ciclo JML incompleto cria contas órfãs ou acessos indevidos.

**Como funciona:** Entra Enterprise applications → Provisioning ou plataforma IGA com conector SCIM. Conexão com IAM: Mapeie externalId, PATCH, idempotência, desativação e logs.

**Questão profissional:** A operação é Joiner, Mover ou Leaver, e qual é o ID estável?

**Critério de competência:** Critério de aceite: Associe usuário de laboratório a app com SCIM; Retire atribuição/desative conta e verifique resultado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** RH comunica Joiner, Mover e Leaver; SaaS de destino não pode criar contas duplicadas nem deixar acesso órfão. Analise onde o conhecimento de "Provisionamento e desprovisionamento" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Provisionamento e desprovisionamento", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Associe usuário de laboratório a app com SCIM; Retire atribuição/desative conta e verifique resultado.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc7644

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Provisionamento SCIM idempotente · Desativar conta: **Onde:** API mock → PATCH active=false. **Ação:** Documente que desativar identidade SCIM e bloquear login são controles relacionados porém distintos.. **Validação:** Estado active=false comprovado e autorização revisada.. **Se falhar:** Apps podem manter sessão; revise tokens/sessões.

#### 11.8. Reexecução idempotente e tratamento de falhas

**O que é:** Operação idempotente repetida mantém estado desejado, e integrações devem tratar retries e erros transitórios. Retry precisa evitar criar contas duplicadas ou reativar indevidamente identidades desativadas.

**Para que serve:** Impede duplicação de usuários quando integração falha após resposta ou timeout.

**Como funciona:** Worker de provisionamento, logs SCIM e controles de retry/backoff. Conexão com IAM: Mapeie externalId, PATCH, idempotência, desativação e logs.

**Questão profissional:** A operação é Joiner, Mover ou Leaver, e qual é o ID estável?

**Critério de competência:** Relaciona evidência, causa provável, correção e novo teste.

**Cenário de fixação:** RH comunica Joiner, Mover e Leaver; SaaS de destino não pode criar contas duplicadas nem deixar acesso órfão. Analise onde o conhecimento de "Reexecução idempotente e tratamento de falhas" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Reexecução idempotente e tratamento de falhas", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Relaciona evidência, causa provável, correção e novo teste.

**Risco:** Provisão de usuário não confirma autenticação nem autorização na aplicação de destino.

**Fonte técnica:** https://www.rfc-editor.org/rfc/rfc7644

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Provisionamento SCIM idempotente · Simular falha e retry: **Onde:** Mock → timeout/reexecução. **Ação:** Simule timeout depois de POST efetivo, faça busca por externalId e evite duplicar ao repetir.. **Validação:** Um único usuário após duas tentativas.. **Se falhar:** Se duplicou, ajuste idempotência/correlação antes de produção.

### Módulo 12: IGA e revisão de acessos

Governança verifica se permissões continuam apropriadas e justificadas ao longo do tempo.

#### 12.1. Catálogo de acessos e ownership

**O que é:** Catálogo lista entitlements, aplicações, descrição, proprietário e critérios de concessão.

**Para que serve:** Sem owner não há quem aprove nem valide necessidade dos direitos.

**Como funciona:** Plataforma IGA, planilha controlada ou sistema de tickets com registro de owners. Conexão com IAM: Assinatura de solicitação, validade, acesso efetivo e trilha auditável.

**Questão profissional:** Quem é dono do direito, quem aprovou e a remoção foi aplicada?

**Critério de competência:** Critério de aceite: Cadastre 5 entitlements de app fictício; Mostre quem pode solicitar e aprovar cada direito.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Gestor aprova acesso temporário a dados financeiros. IAM precisa registrar dono, prazo, justificativa e aplicação da remoção. Analise onde o conhecimento de "Catálogo de acessos e ownership" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Catálogo de acessos e ownership", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Cadastre 5 entitlements de app fictício; Mostre quem pode solicitar e aprovar cada direito.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Marcar acesso revisado sem aplicar remoção é evidência incompleta.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 12.2. Access requests e aprovações

**O que é:** Access request é pedido documentado para obter permissão, sujeito à decisão autorizada. Aprovação deve ser feita pelo owner autorizado; aprovação não elimina necessidade de expiração e revisão.

**Para que serve:** Evita concessão informal e preserva justificativa e rastreabilidade.

**Como funciona:** Workflows IGA ou sistema de tickets/ITSM integrado a IAM. Conexão com IAM: Assinatura de solicitação, validade, acesso efetivo e trilha auditável.

**Questão profissional:** Quem é dono do direito, quem aprovou e a remoção foi aplicada?

**Critério de competência:** Critério de aceite: Crie pedido fictício para role específica; Execute concessão, registre duração e evidência.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Gestor aprova acesso temporário a dados financeiros. IAM precisa registrar dono, prazo, justificativa e aplicação da remoção. Analise onde o conhecimento de "Access requests e aprovações" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Access requests e aprovações", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie pedido fictício para role específica; Execute concessão, registre duração e evidência.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Marcar acesso revisado sem aplicar remoção é evidência incompleta.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- IGA: acesso temporário e recertificação · Executar solicitação: **Onde:** Portal My Access / fluxo de solicitação. **Ação:** Bruno solicita acesso, gestor aprova, e IAM verifica group membership após decisão.. **Validação:** Linha do tempo pedido → approval → membership → app.. **Se falhar:** Se aceito mas sem acesso, confira atualização/atribuição ao app.

#### 12.3. Recertificação e evidências

**O que é:** Recertificação é revisão periódica por donos para confirmar necessidade de acessos existentes. A decisão de revisão e a implementação da retirada de acesso são eventos separados e devem ser confirmados.

**Para que serve:** Permite revogar excessos e demonstrar decisões em auditoria.

**Como funciona:** Campanhas Access Reviews do Entra ID Governance ou IGA. Conexão com IAM: Assinatura de solicitação, validade, acesso efetivo e trilha auditável.

**Questão profissional:** Quem é dono do direito, quem aprovou e a remoção foi aplicada?

**Critério de competência:** Critério de aceite: Gere lista de 10 acessos fictícios; Aplique revogações no laboratório e guarde evidência.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Gestor aprova acesso temporário a dados financeiros. IAM precisa registrar dono, prazo, justificativa e aplicação da remoção. Analise onde o conhecimento de "Recertificação e evidências" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Recertificação e evidências", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Gere lista de 10 acessos fictícios; Aplique revogações no laboratório e guarde evidência.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Marcar acesso revisado sem aplicar remoção é evidência incompleta.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 12.4. SoD, contas órfãs e compliance

**O que é:** SoD identifica conflitos, contas órfãs carecem de owner e compliance exige controles demonstráveis.

**Para que serve:** Risco cresce com acessos conflitantes sem titular ou revisão.

**Como funciona:** Relatórios IGA, inventário AD/Entra e controles de auditoria. Conexão com IAM: Assinatura de solicitação, validade, acesso efetivo e trilha auditável.

**Questão profissional:** Quem é dono do direito, quem aprovou e a remoção foi aplicada?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** Gestor aprova acesso temporário a dados financeiros. IAM precisa registrar dono, prazo, justificativa e aplicação da remoção. Analise onde o conhecimento de "SoD, contas órfãs e compliance" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "SoD, contas órfãs e compliance", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Marcar acesso revisado sem aplicar remoção é evidência incompleta.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 14: Logs, diagnóstico e ITSM

IAM também envolve investigar falhas, mudanças e incidentes sem interromper usuários.

#### 14.1. Logs IdP

**O que é:** Logs do IdP registram tentativas de autenticação, fatores e decisões de política.

**Para que serve:** Ajudam separar credencial inválida de erro de aplicação/federação.

**Como funciona:** Keycloak Events, Authentik Events ou console de logs do IdP. Conexão com IAM: Correlacione ator, alvo, aplicativo, UTC, tipo do log e retenção.

**Questão profissional:** Qual evento comprova a decisão de autenticação e autorização?

**Critério de competência:** Relaciona evidência, causa provável, correção e novo teste.

**Cenário de fixação:** SecOps recebeu reclamação de login negado; precisa correlacionar registros de autenticação com mudanças administrativas e decisões de política. Analise onde o conhecimento de "Logs IdP" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Logs IdP", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Relaciona evidência, causa provável, correção e novo teste.

**Risco:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 14.2. Logs Active Directory

**O que é:** Windows registra eventos relacionados a logon, alteração de contas e auditoria de diretório.

**Para que serve:** Sem correlação de eventos é difícil apurar alterações indevidas e falhas Kerberos.

**Como funciona:** Event Viewer → Windows Logs → Security no DC/servidor, conforme auditoria habilitada. Conexão com IAM: Correlacione ator, alvo, aplicativo, UTC, tipo do log e retenção.

**Questão profissional:** Qual evento comprova a decisão de autenticação e autorização?

**Critério de competência:** Relaciona evidência, causa provável, correção e novo teste.

**Cenário de fixação:** SecOps recebeu reclamação de login negado; precisa correlacionar registros de autenticação com mudanças administrativas e decisões de política. Analise onde o conhecimento de "Logs Active Directory" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Logs Active Directory", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Relaciona evidência, causa provável, correção e novo teste.

**Risco:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 14.3. Logs Entra ID

**O que é:** Sign-in e audit logs do Entra registram entrada, status, políticas e mudanças administrativas.

**Para que serve:** São base do diagnóstico de MFA, Conditional Access e incidentes cloud.

**Como funciona:** Entra admin center → Monitoring & health → Sign-in logs/Audit logs. Conexão com IAM: Correlacione ator, alvo, aplicativo, UTC, tipo do log e retenção.

**Questão profissional:** Qual evento comprova a decisão de autenticação e autorização?

**Critério de competência:** Relaciona evidência, causa provável, correção e novo teste.

**Cenário de fixação:** SecOps recebeu reclamação de login negado; precisa correlacionar registros de autenticação com mudanças administrativas e decisões de política. Analise onde o conhecimento de "Logs Entra ID" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Logs Entra ID", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Relaciona evidência, causa provável, correção e novo teste.

**Risco:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Autenticação, passkeys e MFA · Encerrar e auditar a mudança: **Onde:** Entra ID → Conditional Access e Audit logs. **Ação:** Registre change ticket, aprovador, versão da política, data de ativação e rollback. Se estava praticando com política real, retorne a Report-only ou desabilite a política ao encerrar.. **Validação:** Registro de mudança com hora, autor e evidência de retorno.. **Se falhar:** Falta de aprovação ou escopo confuso impede promoção além do piloto.

#### 14.4. Diagnóstico SAML

**O que é:** Erro SAML pode envolver ACS, audience, certificado, assinatura ou validade temporal.

**Para que serve:** Uma divergência entre IdP e SP impede login mesmo com senha correta.

**Como funciona:** Logs do IdP/SP e configurações Single sign-on → SAML. Conexão com IAM: Correlacione ator, alvo, aplicativo, UTC, tipo do log e retenção.

**Questão profissional:** Qual evento comprova a decisão de autenticação e autorização?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** SecOps recebeu reclamação de login negado; precisa correlacionar registros de autenticação com mudanças administrativas e decisões de política. Analise onde o conhecimento de "Diagnóstico SAML" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Diagnóstico SAML", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 14.5. Diagnóstico OIDC

**O que é:** OIDC depende de issuer, redirect URI, client, scope e validação de tokens.

**Para que serve:** Erros nesses elementos geram callback rejeitado ou token não aceito.

**Como funciona:** App Registrations, Clients de Keycloak e logs da aplicação. Conexão com IAM: Correlacione ator, alvo, aplicativo, UTC, tipo do log e retenção.

**Questão profissional:** Qual evento comprova a decisão de autenticação e autorização?

**Critério de competência:** Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Cenário de fixação:** SecOps recebeu reclamação de login negado; precisa correlacionar registros de autenticação com mudanças administrativas e decisões de política. Analise onde o conhecimento de "Diagnóstico OIDC" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Diagnóstico OIDC", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Descreve finalidade, validação obrigatória e resultado de valor inválido.

**Risco:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 14.6. Diagnóstico SCIM

**O que é:** SCIM falha por mapeamento de atributo, autorização, schema ou status HTTP.

**Para que serve:** Falhas podem impedir desprovisionamento e criar divergências entre origens e destinos.

**Como funciona:** Provisioning logs do Entra e respostas de endpoint SCIM. Conexão com IAM: Correlacione ator, alvo, aplicativo, UTC, tipo do log e retenção.

**Questão profissional:** Qual evento comprova a decisão de autenticação e autorização?

**Critério de competência:** Relaciona evidência, causa provável, correção e novo teste.

**Cenário de fixação:** SecOps recebeu reclamação de login negado; precisa correlacionar registros de autenticação com mudanças administrativas e decisões de política. Analise onde o conhecimento de "Diagnóstico SCIM" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Diagnóstico SCIM", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Relaciona evidência, causa provável, correção e novo teste.

**Risco:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 14.7. Gestão de incidentes e mudanças

**O que é:** Incidente exige restaurar serviço afetado; mudança controla alterações para minimizar interrupções.

**Para que serve:** IAM é crítico para acesso corporativo e alterações podem bloquear usuários em massa.

**Como funciona:** Sistema ITSM, runbooks e change calendar organizacional. Conexão com IAM: Correlacione ator, alvo, aplicativo, UTC, tipo do log e retenção.

**Questão profissional:** Qual evento comprova a decisão de autenticação e autorização?

**Critério de competência:** Critério de aceite: Crie incidente fictício de falha SSO; Defina responsáveis e plano de comunicação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** SecOps recebeu reclamação de login negado; precisa correlacionar registros de autenticação com mudanças administrativas e decisões de política. Analise onde o conhecimento de "Gestão de incidentes e mudanças" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Gestão de incidentes e mudanças", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie incidente fictício de falha SSO; Defina responsáveis e plano de comunicação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Investigação IAM com KQL · Executar remediação: **Onde:** Ticket de incidente → política piloto. **Ação:** Demonstre causa raiz de bloqueio não intencional, ajuste somente política piloto, repita acesso e registre correção.. **Validação:** Antes/depois correlacionado e aprovação da mudança.. **Se falhar:** Não afrouxe política global para consertar app de teste.

#### 14.8. Runbooks, rollback e evidências

**O que é:** Runbook define passos operacionais; rollback reverte mudança para estado funcional; evidências provam ações.

**Para que serve:** Procedimentos reproduzíveis encurtam indisponibilidade e melhoram auditoria.

**Como funciona:** Documentação versionada, ITSM, logs e controles de alteração. Conexão com IAM: Correlacione ator, alvo, aplicativo, UTC, tipo do log e retenção.

**Questão profissional:** Qual evento comprova a decisão de autenticação e autorização?

**Critério de competência:** Critério de aceite: Escreva runbook de configuração OIDC no laboratório; Simule retorno à configuração anterior.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** SecOps recebeu reclamação de login negado; precisa correlacionar registros de autenticação com mudanças administrativas e decisões de política. Analise onde o conhecimento de "Runbooks, rollback e evidências" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Runbooks, rollback e evidências", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Escreva runbook de configuração OIDC no laboratório; Simule retorno à configuração anterior.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Erros similares de login podem ter causas de políticas, redes e aplicações distintas.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/monitoring-health/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 28: Acesso adaptativo, Global Secure Access e proteção de sessões

Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos.

#### 28.1. Application Proxy para aplicações locais

**O que é:** O proxy de aplicações publica determinados aplicativos internos por um serviço de acesso remoto, com controles e dependências de conectores.

**Para que serve:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, Global Secure Access, aplicativos de teste e políticas de CA Conexão com IAM: Private Access, Internet Access, sessão, CA e conectores.

**Questão profissional:** Uma decisão de rede está sendo confundida com autorização da aplicação?

**Critério de competência:** Entrega verificável: Desenho do fluxo cliente -> serviço -> conector -> aplicação e teste de usuário não atribuído. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Colaboradores remotos precisam acessar aplicativo privado; a rota de rede e a autorização da aplicação devem ser avaliadas separadamente. Analise onde o conhecimento de "Application Proxy para aplicações locais" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Application Proxy para aplicações locais", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Desenho do fluxo cliente -> serviço -> conector -> aplicação e teste de usuário não atribuído. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/app-proxy/what-is-application-proxy

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 28.2. Continuous Access Evaluation (CAE)

**O que é:** CAE permite que serviços compatíveis reajam mais rapidamente a determinados eventos e mudanças de política; o comportamento depende da implementação.

**Para que serve:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, Global Secure Access, aplicativos de teste e políticas de CA Conexão com IAM: Private Access, Internet Access, sessão, CA e conectores.

**Questão profissional:** Uma decisão de rede está sendo confundida com autorização da aplicação?

**Critério de competência:** Entrega verificável: Linha temporal com evento, alteração de decisão e limitações reais. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Colaboradores remotos precisam acessar aplicativo privado; a rota de rede e a autorização da aplicação devem ser avaliadas separadamente. Analise onde o conhecimento de "Continuous Access Evaluation (CAE)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Continuous Access Evaluation (CAE)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Linha temporal com evento, alteração de decisão e limitações reais. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 28.3. Authentication context

**O que é:** Authentication context permite associar exigências adicionais de acesso condicional a operações ou recursos específicos em aplicações compatíveis.

**Para que serve:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, Global Secure Access, aplicativos de teste e políticas de CA Conexão com IAM: Private Access, Internet Access, sessão, CA e conectores.

**Questão profissional:** Uma decisão de rede está sendo confundida com autorização da aplicação?

**Critério de competência:** Entrega verificável: Mapa recurso-contexto-política com duas decisões e requisitos de integração. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Colaboradores remotos precisam acessar aplicativo privado; a rota de rede e a autorização da aplicação devem ser avaliadas separadamente. Analise onde o conhecimento de "Authentication context" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Authentication context", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Mapa recurso-contexto-política com duas decisões e requisitos de integração. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-authentication-context

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 28.4. Protected actions

**O que é:** Operações administrativas protegidas podem exigir critérios adicionais por Conditional Access; não equivalem a proteger toda ação de API.

**Para que serve:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, Global Secure Access, aplicativos de teste e políticas de CA Conexão com IAM: Private Access, Internet Access, sessão, CA e conectores.

**Questão profissional:** Uma decisão de rede está sendo confundida com autorização da aplicação?

**Critério de competência:** Entrega verificável: Matriz de operações protegidas, permissões e autenticação exigida. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Colaboradores remotos precisam acessar aplicativo privado; a rota de rede e a autorização da aplicação devem ser avaliadas separadamente. Analise onde o conhecimento de "Protected actions" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Protected actions", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de operações protegidas, permissões e autenticação exigida. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/protected-actions-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 28.5. Global Secure Access: arquitetura

**O que é:** Global Secure Access integra identidade e acesso de rede; Entra Private Access e Internet Access não substituem as funções de um IdP.

**Para que serve:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, Global Secure Access, aplicativos de teste e políticas de CA Conexão com IAM: Private Access, Internet Access, sessão, CA e conectores.

**Questão profissional:** Uma decisão de rede está sendo confundida com autorização da aplicação?

**Critério de competência:** Entrega verificável: Diagrama distinguindo autenticação de tráfego, roteamento e autorização de aplicação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Colaboradores remotos precisam acessar aplicativo privado; a rota de rede e a autorização da aplicação devem ser avaliadas separadamente. Analise onde o conhecimento de "Global Secure Access: arquitetura" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Global Secure Access: arquitetura", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Diagrama distinguindo autenticação de tráfego, roteamento e autorização de aplicação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 28.6. Entra Private Access

**O que é:** Private Access oferece acesso orientado a identidade a aplicações privadas sob políticas e conectividade configurada.

**Para que serve:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, Global Secure Access, aplicativos de teste e políticas de CA Conexão com IAM: Private Access, Internet Access, sessão, CA e conectores.

**Questão profissional:** Uma decisão de rede está sendo confundida com autorização da aplicação?

**Critério de competência:** Entrega verificável: Diagrama de políticas e condição de rede com decisão permitida/negada. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Colaboradores remotos precisam acessar aplicativo privado; a rota de rede e a autorização da aplicação devem ser avaliadas separadamente. Analise onde o conhecimento de "Entra Private Access" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Entra Private Access", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Diagrama de políticas e condição de rede com decisão permitida/negada. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/global-secure-access/concept-private-access

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 28.7. Entra Internet Access

**O que é:** Internet Access aplica políticas de acesso a tráfego para destinos suportados, com distinção de proteção web e autorização da aplicação.

**Para que serve:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, Global Secure Access, aplicativos de teste e políticas de CA Conexão com IAM: Private Access, Internet Access, sessão, CA e conectores.

**Questão profissional:** Uma decisão de rede está sendo confundida com autorização da aplicação?

**Critério de competência:** Entrega verificável: Tabela política-destino-grupo com análise de bloqueio e rollback. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Colaboradores remotos precisam acessar aplicativo privado; a rota de rede e a autorização da aplicação devem ser avaliadas separadamente. Analise onde o conhecimento de "Entra Internet Access" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Entra Internet Access", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Tabela política-destino-grupo com análise de bloqueio e rollback. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/global-secure-access/concept-internet-access

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 28.8. Perfis de tráfego e cliente Global Secure Access

**O que é:** Clientes, perfis e encaminhamento determinam que tráfego passa pelos controles Global Secure Access.

**Para que serve:** Aplique políticas condicionais a aplicativos e tráfego, distinguindo acesso de rede, sessão e autorização de recursos. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID, Global Secure Access, aplicativos de teste e políticas de CA Conexão com IAM: Private Access, Internet Access, sessão, CA e conectores.

**Questão profissional:** Uma decisão de rede está sendo confundida com autorização da aplicação?

**Critério de competência:** Entrega verificável: Checklist de rota, usuário, dispositivo, logs e restauração de conexão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Colaboradores remotos precisam acessar aplicativo privado; a rota de rede e a autorização da aplicação devem ser avaliadas separadamente. Analise onde o conhecimento de "Perfis de tráfego e cliente Global Secure Access" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Perfis de tráfego e cliente Global Secure Access", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Checklist de rota, usuário, dispositivo, logs e restauração de conexão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Configuração de perfil de tráfego pode afetar conectividade; faça piloto reversível.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

## 3. Avançado — Governança, privilégios e arquitetura

Evolua a AtlasCorp com governança, segurança de workloads, dados, multi-cloud e arquitetura.

### Módulo 13: PAM, PIM e JIT

Privilégios elevados exigem controle adicional, registro e duração limitada.

#### 13.1. Cofre e gestão de segredos

**O que é:** Cofre guarda senhas, chaves e tokens com controle de acesso e auditoria.

**Para que serve:** Segredos espalhados em arquivos e scripts elevam risco de vazamento.

**Como funciona:** HashiCorp Vault em lab ou solução corporativa PAM; nunca usar credenciais reais. Conexão com IAM: JIT, aprovação, MFA, auditoria, expiração e recuperação.

**Questão profissional:** Quando o privilégio é ativado, por quem e durante quanto tempo?

**Critério de competência:** Critério de aceite: Suba Vault dev apenas em VM isolada e compreenda que é inseguro para produção; Controle política de leitura e confira logs.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Renata precisa de privilégio administrativo somente durante uma janela de manutenção e a organização exige auditoria após expiração. Analise onde o conhecimento de "Cofre e gestão de segredos" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Cofre e gestão de segredos", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Suba Vault dev apenas em VM isolada e compreenda que é inseguro para produção; Controle política de leitura e confira logs.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Vault dev é inadequado para segredos reais ou produção.

**Fonte técnica:** https://developer.hashicorp.com/vault/docs

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 13.2. Rotação de credenciais

**O que é:** Rotação troca segredos periodicamente ou após suspeita, invalidando versões antigas.

**Para que serve:** Limita tempo de exposição de senha privilegiada ou token comprometido.

**Como funciona:** Cofre PAM, serviço de contas e ferramentas de automação. Conexão com IAM: JIT, aprovação, MFA, auditoria, expiração e recuperação.

**Questão profissional:** Quando o privilégio é ativado, por quem e durante quanto tempo?

**Critério de competência:** Critério de aceite: Crie conta de serviço fictícia; Confira rejeição da credencial anterior.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Renata precisa de privilégio administrativo somente durante uma janela de manutenção e a organização exige auditoria após expiração. Analise onde o conhecimento de "Rotação de credenciais" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Rotação de credenciais", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Crie conta de serviço fictícia; Confira rejeição da credencial anterior.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Vault dev é inadequado para segredos reais ou produção.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 13.3. Onboarding PAM

**O que é:** Onboarding PAM incorpora contas e ativos privilegiados a um cofre e políticas de acesso.

**Para que serve:** Traz identidade responsável, aprovação e registro antes do uso administrativo.

**Como funciona:** Console de solução PAM e inventário de contas privilegiadas. Conexão com IAM: JIT, aprovação, MFA, auditoria, expiração e recuperação.

**Questão profissional:** Quando o privilégio é ativado, por quem e durante quanto tempo?

**Critério de competência:** Critério de aceite: Inventarie servidor e conta administrativa fictícios; Teste solicitação e revogação do acesso.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Renata precisa de privilégio administrativo somente durante uma janela de manutenção e a organização exige auditoria após expiração. Analise onde o conhecimento de "Onboarding PAM" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Onboarding PAM", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Inventarie servidor e conta administrativa fictícios; Teste solicitação e revogação do acesso.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Vault dev é inadequado para segredos reais ou produção.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 13.4. Contas de serviço

**O que é:** Contas de serviço são identidades não humanas usadas por serviços, jobs e aplicações.

**Para que serve:** Senhas estáticas, falta de owner e excesso de privilégios são riscos comuns.

**Como funciona:** AD service accounts/gMSA, Entra workload identities e Linux systemd. Conexão com IAM: JIT, aprovação, MFA, auditoria, expiração e recuperação.

**Questão profissional:** Quando o privilégio é ativado, por quem e durante quanto tempo?

**Critério de competência:** Demonstra concessão, acesso negado e revogação.

**Cenário de fixação:** Renata precisa de privilégio administrativo somente durante uma janela de manutenção e a organização exige auditoria após expiração. Analise onde o conhecimento de "Contas de serviço" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Contas de serviço", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Demonstra concessão, acesso negado e revogação.

**Risco:** Vault dev é inadequado para segredos reais ou produção.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 13.5. Sessões privilegiadas e auditoria

**O que é:** Sessão privilegiada permite executar tarefas administrativas com rastreio de executor e ações.

**Para que serve:** Registro e controle facilitam investigação de alterações críticas.

**Como funciona:** PAM com session recording; logs Windows/Linux e jump servers. Conexão com IAM: JIT, aprovação, MFA, auditoria, expiração e recuperação.

**Questão profissional:** Quando o privilégio é ativado, por quem e durante quanto tempo?

**Critério de competência:** Relaciona evidência, causa provável, correção e novo teste.

**Cenário de fixação:** Renata precisa de privilégio administrativo somente durante uma janela de manutenção e a organização exige auditoria após expiração. Analise onde o conhecimento de "Sessões privilegiadas e auditoria" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Sessões privilegiadas e auditoria", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Relaciona evidência, causa provável, correção e novo teste.

**Risco:** Vault dev é inadequado para segredos reais ou produção.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 13.6. JIT, break-glass e revisão

**O que é:** Just-in-Time concede privilégio temporário; break-glass é acesso emergencial controlado. JIT fornece privilégio temporário; break-glass é recuperação excepcional monitorada, não um atalho operacional.

**Para que serve:** Evita privilégios permanentes sem comprometer recuperação de incidentes.

**Como funciona:** Entra PIM, workflows PAM e contas emergenciais protegidas. Conexão com IAM: JIT, aprovação, MFA, auditoria, expiração e recuperação.

**Questão profissional:** Quando o privilégio é ativado, por quem e durante quanto tempo?

**Critério de competência:** Critério de aceite: Modele aprovação de role por uma hora em lab; Documente controle e revisão do acesso emergencial.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Renata precisa de privilégio administrativo somente durante uma janela de manutenção e a organização exige auditoria após expiração. Analise onde o conhecimento de "JIT, break-glass e revisão" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "JIT, break-glass e revisão", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Modele aprovação de role por uma hora em lab; Documente controle e revisão do acesso emergencial.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Vault dev é inadequado para segredos reais ou produção.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/

**Complemento:** [Acesso emergencial seguro no Entra](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access)

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- PAM, PIM e break-glass · Validar expiração e emergência: **Onde:** PIM / Audit logs. **Ação:** Espere fim da janela, teste operação novamente e valide negado; documente conta emergency separada que não dependa do PIM.. **Validação:** Antes/durante/depois com logs.. **Se falhar:** Permissões permanentes alternativas podem invalidar teste.

### Módulo 22: Identidades não humanas e federação de workloads

Governance de workloads, service principals, agentes, chaves e tokens de curta duração.

#### 22.1. Service principal e application object

**O que é:** Application object descreve o aplicativo; service principal representa a instância local e suas permissões.

**Para que serve:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra Workload ID, Azure, GitHub Actions de laboratório Conexão com IAM: Issuer, subject, audience, recurso alvo e duração.

**Questão profissional:** Quais claims restringem a confiança do token de workload?

**Critério de competência:** Entrega verificável: Diagrama de objeto, instância, owners e permissões. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Pipeline de desenvolvimento solicita token federado para acessar recurso cloud; apenas uma origem de confiança autorizada deve ser aceita. Analise onde o conhecimento de "Service principal e application object" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Service principal e application object", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Diagrama de objeto, instância, owners e permissões. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 22.2. Client credentials e application permissions

**O que é:** Aplicações sem usuário usam credenciais de cliente e autorização apropriada, não ID token de login humano.

**Para que serve:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra Workload ID, Azure, GitHub Actions de laboratório Conexão com IAM: Issuer, subject, audience, recurso alvo e duração.

**Questão profissional:** Quais claims restringem a confiança do token de workload?

**Critério de competência:** Entrega verificável: Fluxo com principal, token de acesso e validação de escopo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Pipeline de desenvolvimento solicita token federado para acessar recurso cloud; apenas uma origem de confiança autorizada deve ser aceita. Analise onde o conhecimento de "Client credentials e application permissions" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Client credentials e application permissions", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo com principal, token de acesso e validação de escopo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 22.3. Managed identity system-assigned versus user-assigned

**O que é:** A identidade de workload pode seguir ciclo de vida do recurso ou ser reutilizada controladamente.

**Para que serve:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra Workload ID, Azure, GitHub Actions de laboratório Conexão com IAM: Issuer, subject, audience, recurso alvo e duração.

**Questão profissional:** Quais claims restringem a confiança do token de workload?

**Critério de competência:** Entrega verificável: Decisão justificada entre identidades system/user assigned. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Pipeline de desenvolvimento solicita token federado para acessar recurso cloud; apenas uma origem de confiança autorizada deve ser aceita. Analise onde o conhecimento de "Managed identity system-assigned versus user-assigned" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Managed identity system-assigned versus user-assigned", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Decisão justificada entre identidades system/user assigned. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 22.4. Workload identity federation e OIDC

**O que é:** Federação substitui segredos permanentes por relação de confiança com token de um emissor externo. Trust deve restringir issuer, subject e audience; federação minimiza segredos estáticos quando bem implementada.

**Para que serve:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra Workload ID, Azure, GitHub Actions de laboratório Conexão com IAM: Issuer, subject, audience, recurso alvo e duração.

**Questão profissional:** Quais claims restringem a confiança do token de workload?

**Critério de competência:** Entrega verificável: Trust policy com emissor, público, assunto e teste negado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Pipeline de desenvolvimento solicita token federado para acessar recurso cloud; apenas uma origem de confiança autorizada deve ser aceita. Analise onde o conhecimento de "Workload identity federation e OIDC" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Workload identity federation e OIDC", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Trust policy com emissor, público, assunto e teste negado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation

**AtlasCorp: 2 procedimento(s) incorporado(s) diretamente na aula**

- Federação de workload entre clouds · Definir identidade do pipeline: **Onde:** Projeto GitHub fictício → issuer/subject/audience. **Ação:** Escreva emissor, repo/branch ou ambiente permitido e audiência de destino.. **Validação:** Tabela de claims permitidas/rejeitadas.. **Se falhar:** Não insira segredo estático no repositório.
- Federação de workload entre clouds · Mapear Azure federation: **Onde:** Entra → App registration / Managed identity → Federated credentials. **Ação:** Desenhe trust externa para principal e atribua role mínima ao recurso Azure.. **Validação:** Policy de trust e role scope.. **Se falhar:** Subject errado deve rejeitar token.

#### 22.5. Rotação e expiração de credenciais

**O que é:** Chaves e certificados estáticos representam risco operacional e exigem inventário e rotação planejada.

**Para que serve:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra Workload ID, Azure, GitHub Actions de laboratório Conexão com IAM: Issuer, subject, audience, recurso alvo e duração.

**Questão profissional:** Quais claims restringem a confiança do token de workload?

**Critério de competência:** Entrega verificável: Runbook com owner, prazo, validação e revogação antiga. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Pipeline de desenvolvimento solicita token federado para acessar recurso cloud; apenas uma origem de confiança autorizada deve ser aceita. Analise onde o conhecimento de "Rotação e expiração de credenciais" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Rotação e expiração de credenciais", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Runbook com owner, prazo, validação e revogação antiga. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 22.6. Contas de serviço e ownership

**O que é:** Identidades de serviço sem responsável tendem a acumular privilégios e sobreviver às aplicações.

**Para que serve:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra Workload ID, Azure, GitHub Actions de laboratório Conexão com IAM: Issuer, subject, audience, recurso alvo e duração.

**Questão profissional:** Quais claims restringem a confiança do token de workload?

**Critério de competência:** Entrega verificável: Inventário com dono, escopos, expiração e desativação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Pipeline de desenvolvimento solicita token federado para acessar recurso cloud; apenas uma origem de confiança autorizada deve ser aceita. Analise onde o conhecimento de "Contas de serviço e ownership" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Contas de serviço e ownership", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Inventário com dono, escopos, expiração e desativação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 22.7. Agentes de IA e machine identity

**O que é:** Agentes automatizados devem receber identidade própria, autorização contextual e registro de ações.

**Para que serve:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra Workload ID, Azure, GitHub Actions de laboratório Conexão com IAM: Issuer, subject, audience, recurso alvo e duração.

**Questão profissional:** Quais claims restringem a confiança do token de workload?

**Critério de competência:** Entrega verificável: Matriz de identidade do agente, delegação e auditoria. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Pipeline de desenvolvimento solicita token federado para acessar recurso cloud; apenas uma origem de confiança autorizada deve ser aceita. Analise onde o conhecimento de "Agentes de IA e machine identity" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Agentes de IA e machine identity", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de identidade do agente, delegação e auditoria. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 22.8. Token exchange e on-behalf-of

**O que é:** Delegação entre APIs exige distinguir identidade do usuário e permissão do serviço intermediário.

**Para que serve:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra Workload ID, Azure, GitHub Actions de laboratório Conexão com IAM: Issuer, subject, audience, recurso alvo e duração.

**Questão profissional:** Quais claims restringem a confiança do token de workload?

**Critério de competência:** Entrega verificável: Fluxo seguro e rejeição de token com audience incorreto. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Pipeline de desenvolvimento solicita token federado para acessar recurso cloud; apenas uma origem de confiança autorizada deve ser aceita. Analise onde o conhecimento de "Token exchange e on-behalf-of" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Token exchange e on-behalf-of", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo seguro e rejeição de token com audience incorreto. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 22.9. CIEM e revisão de privilégios multi-cloud

**O que é:** CIEM avalia direitos de acesso efetivos em clouds e identifica permissões ociosas ou excessivas.

**Para que serve:** Governance de workloads, service principals, agentes, chaves e tokens de curta duração. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra Workload ID, Azure, GitHub Actions de laboratório Conexão com IAM: Issuer, subject, audience, recurso alvo e duração.

**Questão profissional:** Quais claims restringem a confiança do token de workload?

**Critério de competência:** Entrega verificável: Relatório de privilégio excessivo e plano de remediação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Pipeline de desenvolvimento solicita token federado para acessar recurso cloud; apenas uma origem de confiança autorizada deve ser aceita. Analise onde o conhecimento de "CIEM e revisão de privilégios multi-cloud" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "CIEM e revisão de privilégios multi-cloud", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Relatório de privilégio excessivo e plano de remediação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Não se deve usar chaves permanentes quando há federação ou managed identity apropriada.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Federação de workload entre clouds · Concluir segurança: **Onde:** Inventário → credenciais e custos. **Ação:** Compare validade, rotação, isolamento, logging e cleanup das 3 clouds.. **Validação:** Matriz de três ambientes e testes adversos.. **Se falhar:** Documente simulação caso não tenha sandbox.

### Módulo 23: Entra Identity Governance em profundidade

Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis.

#### 23.1. Access packages e catálogos

**O que é:** Pacotes de acesso agregam recursos e fluxos de concessão governados por owners e políticas. Catálogo organiza recursos; access package define conjunto e condições para concessão governada.

**Para que serve:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID Governance e Microsoft Graph Conexão com IAM: Licença, owner, pacote, aprovação, expiração e aplicação da revisão.

**Questão profissional:** Um access package termina com remoção efetiva?

**Critério de competência:** Entrega verificável: Catálogo e pacote com proprietário, público e recursos autorizados. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Financeiro adota catálogo e pacote de acesso para concessões temporárias, aprovações e revisões automáticas quando licenciadas. Analise onde o conhecimento de "Access packages e catálogos" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Access packages e catálogos", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Catálogo e pacote com proprietário, público e recursos autorizados. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

**AtlasCorp: 2 procedimento(s) incorporado(s) diretamente na aula**

- IGA: acesso temporário e recertificação · Inventariar SKU do recurso: **Onde:** Entra → Billing → Licenses → Licensed features. **Ação:** Confirme se Access Reviews, Entitlement Management e Lifecycle Workflows estão licenciados; não presuma por ter P2.. **Validação:** Matriz SKU → feature → plano B.. **Se falhar:** Sem SKU correto, use simulação documentada.
- IGA: acesso temporário e recertificação · Criar catálogo de acesso: **Onde:** Entra ID Governance → Entitlement Management → Catalogs. **Ação:** Defina catálogo FIN-ATL, owner, descrição, aplicações/grupos sob responsabilidade de Financeiro.. **Validação:** Catálogo e conjunto de recursos inventariados.. **Se falhar:** Se Entitlement Management não existir, simule com ticket e grupo.

#### 23.2. Entitlement Management: políticas e expiração

**O que é:** Políticas controlam quem pode solicitar, aprovar e por quanto tempo mantém acesso.

**Para que serve:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID Governance e Microsoft Graph Conexão com IAM: Licença, owner, pacote, aprovação, expiração e aplicação da revisão.

**Questão profissional:** Um access package termina com remoção efetiva?

**Critério de competência:** Entrega verificável: Fluxo de aprovação e evidência de expiração. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Financeiro adota catálogo e pacote de acesso para concessões temporárias, aprovações e revisões automáticas quando licenciadas. Analise onde o conhecimento de "Entitlement Management: políticas e expiração" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Entitlement Management: políticas e expiração", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo de aprovação e evidência de expiração. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- IGA: acesso temporário e recertificação · Definir access package: **Onde:** Entitlement Management → Access packages → New. **Ação:** Crie FIN-ATL-LEITURA, vincule SG-ATL-FIN-APP-READ, defina solicitantes, approval e expiração de teste.. **Validação:** Regras de política e deadline visíveis.. **Se falhar:** Um package pode exigir licença Governance adicional.

#### 23.3. Access Reviews e recertificação

**O que é:** Revisões periódicas decidem manutenção de acessos com evidências e aplicação das decisões. Revisão pode indicar remoção, mas acesso só muda quando a decisão é aplicada de acordo com política.

**Para que serve:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID Governance e Microsoft Graph Conexão com IAM: Licença, owner, pacote, aprovação, expiração e aplicação da revisão.

**Questão profissional:** Um access package termina com remoção efetiva?

**Critério de competência:** Entrega verificável: Resultado auditável por acesso, revisor e justificativa. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Financeiro adota catálogo e pacote de acesso para concessões temporárias, aprovações e revisões automáticas quando licenciadas. Analise onde o conhecimento de "Access Reviews e recertificação" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Access Reviews e recertificação", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Resultado auditável por acesso, revisor e justificativa. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- IGA: acesso temporário e recertificação · Recertificar e aplicar decisão: **Onde:** Identity Governance → Access Reviews. **Ação:** Faça review com owner em período curto de lab. Decida remover e aplique decisão conforme configuração; confira grupo e app.. **Validação:** Logs de reviewer e retirada do entitlement.. **Se falhar:** O modo de aplicação e janela da campanha importam.

#### 23.4. Lifecycle Workflows

**O que é:** Workflows automatizam tarefas condicionadas a eventos de entrada, mudança e saída do colaborador.

**Para que serve:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID Governance e Microsoft Graph Conexão com IAM: Licença, owner, pacote, aprovação, expiração e aplicação da revisão.

**Questão profissional:** Um access package termina com remoção efetiva?

**Critério de competência:** Entrega verificável: Fluxograma de estados com erro, compensação e auditoria. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Financeiro adota catálogo e pacote de acesso para concessões temporárias, aprovações e revisões automáticas quando licenciadas. Analise onde o conhecimento de "Lifecycle Workflows" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Lifecycle Workflows", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxograma de estados com erro, compensação e auditoria. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 23.5. Fonte autoritativa de RH

**O que é:** Dados mestres de identidade demandam contrato de atributos, transformação e política de atualização.

**Para que serve:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID Governance e Microsoft Graph Conexão com IAM: Licença, owner, pacote, aprovação, expiração e aplicação da revisão.

**Questão profissional:** Um access package termina com remoção efetiva?

**Critério de competência:** Entrega verificável: Contrato de atributos, regra de correlação e validação da mudança. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Financeiro adota catálogo e pacote de acesso para concessões temporárias, aprovações e revisões automáticas quando licenciadas. Analise onde o conhecimento de "Fonte autoritativa de RH" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Fonte autoritativa de RH", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Contrato de atributos, regra de correlação e validação da mudança. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 23.6. Provisionamento API-driven

**O que é:** Provisionamento por API depende de validação, escopo de origem e tratamento de eventos repetidos.

**Para que serve:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID Governance e Microsoft Graph Conexão com IAM: Licença, owner, pacote, aprovação, expiração e aplicação da revisão.

**Questão profissional:** Um access package termina com remoção efetiva?

**Critério de competência:** Entrega verificável: Tabela de idempotência e erros tratados. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Financeiro adota catálogo e pacote de acesso para concessões temporárias, aprovações e revisões automáticas quando licenciadas. Analise onde o conhecimento de "Provisionamento API-driven" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Provisionamento API-driven", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Tabela de idempotência e erros tratados. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 23.7. Reconciliação e contas órfãs

**O que é:** Reconciliar contas entre RH, diretório e aplicações encontra exceções no estado real de concessões.

**Para que serve:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID Governance e Microsoft Graph Conexão com IAM: Licença, owner, pacote, aprovação, expiração e aplicação da revisão.

**Questão profissional:** Um access package termina com remoção efetiva?

**Critério de competência:** Entrega verificável: Relatório de exceções com remediação priorizada. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Financeiro adota catálogo e pacote de acesso para concessões temporárias, aprovações e revisões automáticas quando licenciadas. Analise onde o conhecimento de "Reconciliação e contas órfãs" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Reconciliação e contas órfãs", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Relatório de exceções com remediação priorizada. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Ciclo de vida Joiner–Mover–Leaver · Buscar contas órfãs: **Onde:** Planilhas RH e Entra → cruzamento por ID. **Ação:** Compare identidades ativas com lista de empregados de teste. Encontre conta sem fonte RH e crie ticket de investigação.. **Validação:** Tabela com contas correspondidas, órfãs e ação.. **Se falhar:** Não exclua contas desconhecidas antes de confirmar finalidade e proprietário.

#### 23.8. Segregação de funções preventiva e detectiva

**O que é:** SoD pode bloquear concessão incompatível ou detectar conflito existente para remediação.

**Para que serve:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID Governance e Microsoft Graph Conexão com IAM: Licença, owner, pacote, aprovação, expiração e aplicação da revisão.

**Questão profissional:** Um access package termina com remoção efetiva?

**Critério de competência:** Entrega verificável: Matriz de risco SoD e evidências de controle preventivo/detectivo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Financeiro adota catálogo e pacote de acesso para concessões temporárias, aprovações e revisões automáticas quando licenciadas. Analise onde o conhecimento de "Segregação de funções preventiva e detectiva" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Segregação de funções preventiva e detectiva", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de risco SoD e evidências de controle preventivo/detectivo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 23.9. Privileged Identity Management (PIM)

**O que é:** PIM reduz privilégios permanentes ao usar papéis elegíveis, ativação justificada e auditoria.

**Para que serve:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID Governance e Microsoft Graph Conexão com IAM: Licença, owner, pacote, aprovação, expiração e aplicação da revisão.

**Questão profissional:** Um access package termina com remoção efetiva?

**Critério de competência:** Entrega verificável: Cronograma de elegibilidade, ativação e revogação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Financeiro adota catálogo e pacote de acesso para concessões temporárias, aprovações e revisões automáticas quando licenciadas. Analise onde o conhecimento de "Privileged Identity Management (PIM)" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Privileged Identity Management (PIM)", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Cronograma de elegibilidade, ativação e revogação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

**AtlasCorp: 3 procedimento(s) incorporado(s) diretamente na aula**

- PAM, PIM e break-glass · Criar elegibilidade: **Onde:** Entra ID Governance → Privileged Identity Management → Microsoft Entra roles. **Ação:** Atribua elegibilidade à conta renata.admin com duração, justificativa e aprovação caso disponível.. **Validação:** Role eligibility com owner e validade.. **Se falhar:** Se não aparece PIM, verifique P2 do usuário e roles do operador.
- PAM, PIM e break-glass · Testar antes da ativação: **Onde:** Entra ID → ação administrativa de teste. **Ação:** Tente operação antes de ativar e confirme que não possui função efetiva, caso não haja outra role herdada.. **Validação:** Operação negada e memberships auditados.. **Se falhar:** Se funciona, investigue role permanente adicional.
- PAM, PIM e break-glass · Ativar sob aprovação: **Onde:** PIM → My roles → Activate. **Ação:** Ative função temporária, forneça justificativa e faça MFA exigido. Anote hora de ativação/expiração.. **Validação:** Evento de ativação e operação permitida.. **Se falhar:** A ativação pode exigir refresh/relogin por latência de token.

#### 23.10. Métricas de governança e evidências

**O que é:** Governança precisa indicadores como contas órfãs, recertificações atrasadas e acessos privilegiados permanentes.

**Para que serve:** Converta JML, aprovações, recertificação e trilhas de auditoria em controles executáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra ID Governance e Microsoft Graph Conexão com IAM: Licença, owner, pacote, aprovação, expiração e aplicação da revisão.

**Questão profissional:** Um access package termina com remoção efetiva?

**Critério de competência:** Entrega verificável: Painel com fórmula, fonte, periodicidade e ação corretiva. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Financeiro adota catálogo e pacote de acesso para concessões temporárias, aprovações e revisões automáticas quando licenciadas. Analise onde o conhecimento de "Métricas de governança e evidências" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Métricas de governança e evidências", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Painel com fórmula, fonte, periodicidade e ação corretiva. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** P2 e Entra ID Governance têm recursos/licenças diferentes; nunca deduza disponibilidade.

**Fonte técnica:** https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 24: Microsoft Purview e controle de acesso a dados

Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação.

#### 24.1. Classificação e inventário da informação

**O que é:** A classificação atribui níveis de sensibilidade a dados para orientar proteção e acesso.

**Para que serve:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Purview, documentos e M365 fictícios Conexão com IAM: Classificação, criptografia, DLP, workload e falsos positivos.

**Questão profissional:** Classificação aplica proteção efetiva ou só informação visual?

**Critério de competência:** Entrega verificável: Taxonomia de dados com regras de leitura e armazenamento. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Documento financeiro sintético é classificado; a equipe deve diferenciar rótulo informativo, criptografia e prevenção de vazamento. Analise onde o conhecimento de "Classificação e inventário da informação" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Classificação e inventário da informação", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Taxonomia de dados com regras de leitura e armazenamento. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte técnica:** https://learn.microsoft.com/en-us/purview/information-protection

**AtlasCorp: 2 procedimento(s) incorporado(s) diretamente na aula**

- Purview: classificação, rótulos e DLP · Confirmar direito de licenciamento: **Onde:** purview.microsoft.com → Settings / Solutions disponíveis. **Ação:** Verifique se a licença M365/Purview permite Information Protection, labels e DLP no workload que será testado.. **Validação:** Matriz feature/licença e alternativa.. **Se falhar:** Sem licença, registre a simulação com arquivos sintéticos.
- Purview: classificação, rótulos e DLP · Definir informação e owner: **Onde:** Inventário AtlasCorp → classificação. **Ação:** Classifique 3 documentos sintéticos como Público, Interno e Confidencial e determine grupo permitido.. **Validação:** Catálogo de documentos, rótulo e acesso.. **Se falhar:** Não insira dados pessoais em amostras.

#### 24.2. Sensitivity labels

**O que é:** Rótulos de sensibilidade podem aplicar marcas, configurações de proteção e outros efeitos conforme workload.

**Para que serve:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Purview, documentos e M365 fictícios Conexão com IAM: Classificação, criptografia, DLP, workload e falsos positivos.

**Questão profissional:** Classificação aplica proteção efetiva ou só informação visual?

**Critério de competência:** Entrega verificável: Rótulo com finalidade, escopo e efeito de proteção. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Documento financeiro sintético é classificado; a equipe deve diferenciar rótulo informativo, criptografia e prevenção de vazamento. Analise onde o conhecimento de "Sensitivity labels" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Sensitivity labels", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Rótulo com finalidade, escopo e efeito de proteção. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte técnica:** https://learn.microsoft.com/en-us/purview/information-protection

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Purview: classificação, rótulos e DLP · Criar e publicar sensitivity label: **Onde:** Purview → Information Protection → Sensitivity labels. **Ação:** Crie etiqueta Confidencial e configure opções compatíveis com a plataforma; publique para grupo piloto e aguarde propagação.. **Validação:** Etiqueta visível em arquivo de teste e política de publicação.. **Se falhar:** Se não aparece, confira licença, grupo e atraso de publicação.

#### 24.3. Criptografia e direitos associados a rótulos

**O que é:** Proteção de dados pode restringir abertura e uso por identidades ou grupos, independentemente do local do arquivo.

**Para que serve:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Purview, documentos e M365 fictícios Conexão com IAM: Classificação, criptografia, DLP, workload e falsos positivos.

**Questão profissional:** Classificação aplica proteção efetiva ou só informação visual?

**Critério de competência:** Entrega verificável: Matriz de permissão para leitura e edição de documento. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Documento financeiro sintético é classificado; a equipe deve diferenciar rótulo informativo, criptografia e prevenção de vazamento. Analise onde o conhecimento de "Criptografia e direitos associados a rótulos" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Criptografia e direitos associados a rótulos", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de permissão para leitura e edição de documento. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte técnica:** https://learn.microsoft.com/en-us/purview/information-protection

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Purview: classificação, rótulos e DLP · Avaliar proteção real: **Onde:** App Office de teste → documento. **Ação:** Aplique etiqueta e compare comportamento de usuário autorizado e não autorizado. Se não houver criptografia habilitada, não espere bloqueio de abertura.. **Validação:** Tabela com efeito real vs esperado.. **Se falhar:** DLP e label podem não produzir a mesma resposta.

#### 24.4. Data Loss Prevention (DLP)

**O que é:** DLP identifica e restringe ações de dados sensíveis em locais suportados; não substitui IAM.

**Para que serve:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Purview, documentos e M365 fictícios Conexão com IAM: Classificação, criptografia, DLP, workload e falsos positivos.

**Questão profissional:** Classificação aplica proteção efetiva ou só informação visual?

**Critério de competência:** Entrega verificável: Regra DLP, cenário de detecção e justificativa do controle. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Um documento sintético confidencial é compartilhado fora da empresa durante o piloto audit-only.

**Entrega esperada:** Registro de política, aplicação, evento e análise de falso positivo sem conteúdo real.

**Risco:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte técnica:** https://learn.microsoft.com/en-us/purview/information-protection

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Purview: classificação, rótulos e DLP · Criar DLP audit-only: **Onde:** Purview → Data Loss Prevention → Policies. **Ação:** Defina regra para dados sintéticos de teste no local suportado; configure auditoria em vez de bloqueio e verifique evento.. **Validação:** Evento controlado, avaliação de falsos positivos e rollback.. **Se falhar:** Se não existe evento, veja janela de propagação e cobertura de workload.

#### 24.5. Tipos de informações sensíveis e trainable classifiers

**O que é:** Detecção pode usar padrões de dados estruturados e classificadores treinados sob controles de precisão e privacidade.

**Para que serve:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Purview, documentos e M365 fictícios Conexão com IAM: Classificação, criptografia, DLP, workload e falsos positivos.

**Questão profissional:** Classificação aplica proteção efetiva ou só informação visual?

**Critério de competência:** Entrega verificável: Plano de teste com exemplos sintéticos e critérios de precisão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Documento financeiro sintético é classificado; a equipe deve diferenciar rótulo informativo, criptografia e prevenção de vazamento. Analise onde o conhecimento de "Tipos de informações sensíveis e trainable classifiers" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Tipos de informações sensíveis e trainable classifiers", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Plano de teste com exemplos sintéticos e critérios de precisão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte técnica:** https://learn.microsoft.com/en-us/purview/information-protection

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 24.6. Data lifecycle e retention

**O que é:** Retenção e eliminação de conteúdo obedecem política e obrigações legais e devem ser distintas de revogação de conta.

**Para que serve:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Purview, documentos e M365 fictícios Conexão com IAM: Classificação, criptografia, DLP, workload e falsos positivos.

**Questão profissional:** Classificação aplica proteção efetiva ou só informação visual?

**Critério de competência:** Entrega verificável: Tabela com evento gatilho, prazo e responsável por descarte. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Documento financeiro sintético é classificado; a equipe deve diferenciar rótulo informativo, criptografia e prevenção de vazamento. Analise onde o conhecimento de "Data lifecycle e retention" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Data lifecycle e retention", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Tabela com evento gatilho, prazo e responsável por descarte. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte técnica:** https://learn.microsoft.com/en-us/purview/information-protection

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 24.7. eDiscovery e investigação

**O que é:** Investigação de conteúdo exige segregação de funções, autorização e trilha de auditoria.

**Para que serve:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Purview, documentos e M365 fictícios Conexão com IAM: Classificação, criptografia, DLP, workload e falsos positivos.

**Questão profissional:** Classificação aplica proteção efetiva ou só informação visual?

**Critério de competência:** Entrega verificável: RACI e trilha de acesso à evidência com mínimo privilégio. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Documento financeiro sintético é classificado; a equipe deve diferenciar rótulo informativo, criptografia e prevenção de vazamento. Analise onde o conhecimento de "eDiscovery e investigação" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "eDiscovery e investigação", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: RACI e trilha de acesso à evidência com mínimo privilégio. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte técnica:** https://learn.microsoft.com/en-us/purview/information-protection

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 24.8. Purview RBAC e separação administrativa

**O que é:** O acesso administrativo no Purview tem papéis e permissões próprios, distintos de Azure RBAC.

**Para que serve:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Purview, documentos e M365 fictícios Conexão com IAM: Classificação, criptografia, DLP, workload e falsos positivos.

**Questão profissional:** Classificação aplica proteção efetiva ou só informação visual?

**Critério de competência:** Entrega verificável: Matriz de funções e impacto de privilégio excessivo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Documento financeiro sintético é classificado; a equipe deve diferenciar rótulo informativo, criptografia e prevenção de vazamento. Analise onde o conhecimento de "Purview RBAC e separação administrativa" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Purview RBAC e separação administrativa", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de funções e impacto de privilégio excessivo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte técnica:** https://learn.microsoft.com/en-us/purview/information-protection

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 24.9. Proteção de informações em endpoints

**O que é:** Políticas de dados podem se estender a ações locais em dispositivos sob condições de licenciamento e integração.

**Para que serve:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Purview, documentos e M365 fictícios Conexão com IAM: Classificação, criptografia, DLP, workload e falsos positivos.

**Questão profissional:** Classificação aplica proteção efetiva ou só informação visual?

**Critério de competência:** Entrega verificável: Fluxo de controle e evidências esperadas sem dados reais. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Documento financeiro sintético é classificado; a equipe deve diferenciar rótulo informativo, criptografia e prevenção de vazamento. Analise onde o conhecimento de "Proteção de informações em endpoints" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Proteção de informações em endpoints", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo de controle e evidências esperadas sem dados reais. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte técnica:** https://learn.microsoft.com/en-us/purview/information-protection

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 24.10. Interação entre Entra, Intune e Purview

**O que é:** Identidade, estado de dispositivo e classificação de dados são sinais e mecanismos diferentes que se complementam.

**Para que serve:** Aprofunde governança de dados como extensão do princípio de acesso mínimo, sem confundi-la com autenticação. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Microsoft Purview, documentos e M365 fictícios Conexão com IAM: Classificação, criptografia, DLP, workload e falsos positivos.

**Questão profissional:** Classificação aplica proteção efetiva ou só informação visual?

**Critério de competência:** Entrega verificável: Arquitetura com camada de identidade, dispositivo e proteção de informação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Documento financeiro sintético é classificado; a equipe deve diferenciar rótulo informativo, criptografia e prevenção de vazamento. Analise onde o conhecimento de "Interação entre Entra, Intune e Purview" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Interação entre Entra, Intune e Purview", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Arquitetura com camada de identidade, dispositivo e proteção de informação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Classificação e DLP não equivalem a IAM de usuário.

**Fonte técnica:** https://learn.microsoft.com/en-us/purview/information-protection

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 25: KQL, telemetria e investigação IAM

Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis.

#### 25.1. Sign-in logs e tipos de entrada

**O que é:** Registros de login humano, não interativo e de service principals têm semânticas diferentes.

**Para que serve:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra sign-in logs, AuditLogs, Log Analytics e KQL Conexão com IAM: Consultas e timeline, hipóteses, diagnóstico e correção.

**Questão profissional:** A consulta observa a fonte, schema e janela de eventos corretos?

**Critério de competência:** Entrega verificável: Linha do tempo com entidade, app e resultado de cada login. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma investigação de acesso reúne eventos de vários serviços com horários, categorias e retenções diferentes. Analise onde o conhecimento de "Sign-in logs e tipos de entrada" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Sign-in logs e tipos de entrada", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Linha do tempo com entidade, app e resultado de cada login. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte técnica:** https://learn.microsoft.com/en-us/kusto/query/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Investigação IAM com KQL · Produzir dois eventos conhecidos: **Onde:** Entra → sign-in de conta fictícia. **Ação:** Faça login válido e inválido sem provocar bloqueio prolongado. Anote UTC, aplicativo, usuário e correlation ID.. **Validação:** Linha do tempo com status.. **Se falhar:** Se nenhum log aparece, confira ingestão e retenção.

#### 25.2. Audit logs de identidade

**O que é:** Eventos de auditoria registram alteração administrativa e ajudam a atribuir autoria e efeito de mudanças.

**Para que serve:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra sign-in logs, AuditLogs, Log Analytics e KQL Conexão com IAM: Consultas e timeline, hipóteses, diagnóstico e correção.

**Questão profissional:** A consulta observa a fonte, schema e janela de eventos corretos?

**Critério de competência:** Entrega verificável: Par de eventos e explicação da alteração de permissão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma investigação de acesso reúne eventos de vários serviços com horários, categorias e retenções diferentes. Analise onde o conhecimento de "Audit logs de identidade" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Audit logs de identidade", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Par de eventos e explicação da alteração de permissão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte técnica:** https://learn.microsoft.com/en-us/kusto/query/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Investigação IAM com KQL · Correlacionar alterações: **Onde:** Entra ID → Audit logs. **Ação:** Modifique membership de grupo de teste, filtre período/ator e encontre operação correspondente.. **Validação:** Evento administrativo com ator e alvo.. **Se falhar:** Se não aparecer, verifique operação correta e latência.

#### 25.3. KQL: where, project e summarize

**O que é:** KQL permite filtrar, projetar e agregar eventos estruturados de telemetria.

**Para que serve:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra sign-in logs, AuditLogs, Log Analytics e KQL Conexão com IAM: Consultas e timeline, hipóteses, diagnóstico e correção.

**Questão profissional:** A consulta observa a fonte, schema e janela de eventos corretos?

**Critério de competência:** Entrega verificável: Consulta KQL reproduzível e resultado interpretado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma investigação de acesso reúne eventos de vários serviços com horários, categorias e retenções diferentes. Analise onde o conhecimento de "KQL: where, project e summarize" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "KQL: where, project e summarize", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Consulta KQL reproduzível e resultado interpretado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte técnica:** https://learn.microsoft.com/en-us/kusto/query/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Investigação IAM com KQL · Criar consulta KQL: **Onde:** Workspace Log Analytics (opcional). **Ação:** Na tabela real do ambiente, filtre sign-in failures por TimeGenerated/Status, projete colunas e agregue por aplicação. Ajuste schema para não assumir tabela disponível.. **Validação:** KQL reproduzível e saída interpretada.. **Se falhar:** Se não houver workspace, use dados sintéticos e documente simulação.

#### 25.4. KQL: joins e correlação

**O que é:** Joins correlacionam tabelas por identificadores apropriados; campos devem ser confirmados em cada esquema.

**Para que serve:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra sign-in logs, AuditLogs, Log Analytics e KQL Conexão com IAM: Consultas e timeline, hipóteses, diagnóstico e correção.

**Questão profissional:** A consulta observa a fonte, schema e janela de eventos corretos?

**Critério de competência:** Entrega verificável: Consulta ou pseudocódigo com ressalva de correlação temporal. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma investigação de acesso reúne eventos de vários serviços com horários, categorias e retenções diferentes. Analise onde o conhecimento de "KQL: joins e correlação" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "KQL: joins e correlação", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Consulta ou pseudocódigo com ressalva de correlação temporal. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte técnica:** https://learn.microsoft.com/en-us/kusto/query/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 25.5. Falhas de Conditional Access

**O que é:** A análise de CA deve considerar políticas aplicáveis, condições e decisões, não somente código de erro de login.

**Para que serve:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra sign-in logs, AuditLogs, Log Analytics e KQL Conexão com IAM: Consultas e timeline, hipóteses, diagnóstico e correção.

**Questão profissional:** A consulta observa a fonte, schema e janela de eventos corretos?

**Critério de competência:** Entrega verificável: Diagnóstico mostrando política, condição e decisão final. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma investigação de acesso reúne eventos de vários serviços com horários, categorias e retenções diferentes. Analise onde o conhecimento de "Falhas de Conditional Access" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Falhas de Conditional Access", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Diagnóstico mostrando política, condição e decisão final. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte técnica:** https://learn.microsoft.com/en-us/kusto/query/

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Investigação IAM com KQL · Ler Conditional Access: **Onde:** Entra ID → Monitoring & health → Sign-in logs → evento. **Ação:** Veja status, Authentication details, policies e diferença entre report-only e política On.. **Validação:** Matriz política → condição → resultado.. **Se falhar:** Cuidado com política não aplicada por grupo/app errado.

#### 25.6. Falhas de provisionamento SCIM

**O que é:** Logs de provisionamento diferenciam erro de autenticação do conector, mapeamento, conflito e falhas transitórias.

**Para que serve:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra sign-in logs, AuditLogs, Log Analytics e KQL Conexão com IAM: Consultas e timeline, hipóteses, diagnóstico e correção.

**Questão profissional:** A consulta observa a fonte, schema e janela de eventos corretos?

**Critério de competência:** Entrega verificável: Registro de erro, causa provável e recuperação idempotente. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma investigação de acesso reúne eventos de vários serviços com horários, categorias e retenções diferentes. Analise onde o conhecimento de "Falhas de provisionamento SCIM" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Falhas de provisionamento SCIM", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Registro de erro, causa provável e recuperação idempotente. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte técnica:** https://learn.microsoft.com/en-us/kusto/query/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 25.7. Incidentes de credenciais comprometidas

**O que é:** Resposta a incidentes inclui desabilitação, revogação de sessão, revisão de consentimentos e análise de persistência.

**Para que serve:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra sign-in logs, AuditLogs, Log Analytics e KQL Conexão com IAM: Consultas e timeline, hipóteses, diagnóstico e correção.

**Questão profissional:** A consulta observa a fonte, schema e janela de eventos corretos?

**Critério de competência:** Entrega verificável: Playbook com decisão, responsável e confirmação de contenção. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma investigação de acesso reúne eventos de vários serviços com horários, categorias e retenções diferentes. Analise onde o conhecimento de "Incidentes de credenciais comprometidas" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Incidentes de credenciais comprometidas", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Playbook com decisão, responsável e confirmação de contenção. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte técnica:** https://learn.microsoft.com/en-us/kusto/query/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 25.8. Dashboards e indicadores de detecção

**O que é:** Painéis úteis mostram tendências de falha, risco, privilégios e alterações com janelas e fontes definidas.

**Para que serve:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra sign-in logs, AuditLogs, Log Analytics e KQL Conexão com IAM: Consultas e timeline, hipóteses, diagnóstico e correção.

**Questão profissional:** A consulta observa a fonte, schema e janela de eventos corretos?

**Critério de competência:** Entrega verificável: Painel e definição operacional de cada indicador. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma investigação de acesso reúne eventos de vários serviços com horários, categorias e retenções diferentes. Analise onde o conhecimento de "Dashboards e indicadores de detecção" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Dashboards e indicadores de detecção", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Painel e definição operacional de cada indicador. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte técnica:** https://learn.microsoft.com/en-us/kusto/query/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 25.9. Retenção, privacidade e cadeia de custódia

**O que é:** Logs podem conter dados pessoais; coletar, armazenar e exportar exige finalidade e acesso restrito.

**Para que serve:** Investigue operações de identidade a partir de logs correlacionados, hipóteses e resultados verificáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** Entra sign-in logs, AuditLogs, Log Analytics e KQL Conexão com IAM: Consultas e timeline, hipóteses, diagnóstico e correção.

**Questão profissional:** A consulta observa a fonte, schema e janela de eventos corretos?

**Critério de competência:** Entrega verificável: Política com acesso, prazo, integridade e descarte de registros. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Uma investigação de acesso reúne eventos de vários serviços com horários, categorias e retenções diferentes. Analise onde o conhecimento de "Retenção, privacidade e cadeia de custódia" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Retenção, privacidade e cadeia de custódia", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Política com acesso, prazo, integridade e descarte de registros. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Ausência de evento não prova ausência da ação; retenção e ingestão variam.

**Fonte técnica:** https://learn.microsoft.com/en-us/kusto/query/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 26: IAM em AWS, Google Cloud e produtos especializados

Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros.

#### 26.1. AWS IAM: users, groups, roles e policies

**O que é:** Policies expressam permissões; trust policies determinam quem pode assumir role.

**Para que serve:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** AWS IAM, Google Cloud IAM, Okta, SailPoint, CyberArk, Keycloak Conexão com IAM: Trust, permissão efetiva, SCP/org policy e workloads.

**Questão profissional:** Os conceitos são portáveis ou a semântica de role é diferente?

**Critério de competência:** Entrega verificável: Duas policies distintas e resultado de cada decisão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Arquiteto compara AWS, Google Cloud e Microsoft Azure sem assumir equivalência de política, trust e autorização. Analise onde o conhecimento de "AWS IAM: users, groups, roles e policies" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "AWS IAM: users, groups, roles e policies", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Duas policies distintas e resultado de cada decisão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte técnica:** https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 26.2. AWS STS e identidade federada

**O que é:** STS produz credenciais temporárias; integrações precisam impor condições de confiança e expiração.

**Para que serve:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** AWS IAM, Google Cloud IAM, Okta, SailPoint, CyberArk, Keycloak Conexão com IAM: Trust, permissão efetiva, SCP/org policy e workloads.

**Questão profissional:** Os conceitos são portáveis ou a semântica de role é diferente?

**Critério de competência:** Entrega verificável: Fluxo que diferencia autenticação externa e autorização AWS. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Arquiteto compara AWS, Google Cloud e Microsoft Azure sem assumir equivalência de política, trust e autorização. Analise onde o conhecimento de "AWS STS e identidade federada" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "AWS STS e identidade federada", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo que diferencia autenticação externa e autorização AWS. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte técnica:** https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Federação de workload entre clouds · Mapear AWS role: **Onde:** AWS IAM → Identity providers / Roles. **Ação:** Crie ou modele OIDC provider e trust relationship de sts:AssumeRoleWithWebIdentity restringindo subject/audience, mais permission policy separada.. **Validação:** Role aceita claims corretas e nega branch divergente.. **Se falhar:** Condições com wildcard amplo expõem conta.

#### 26.3. AWS Organizations, SCP e limites

**O que é:** SCP delimita máximo de permissões de principals em contas membro, não concede permissões por si só.

**Para que serve:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** AWS IAM, Google Cloud IAM, Okta, SailPoint, CyberArk, Keycloak Conexão com IAM: Trust, permissão efetiva, SCP/org policy e workloads.

**Questão profissional:** Os conceitos são portáveis ou a semântica de role é diferente?

**Critério de competência:** Entrega verificável: Explicação da interseção das permissões e caso negado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Arquiteto compara AWS, Google Cloud e Microsoft Azure sem assumir equivalência de política, trust e autorização. Analise onde o conhecimento de "AWS Organizations, SCP e limites" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "AWS Organizations, SCP e limites", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Explicação da interseção das permissões e caso negado. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte técnica:** https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 26.4. AWS IAM Identity Center

**O que é:** Identity Center integra fontes de identidades e permission sets para acesso a contas/aplicações.

**Para que serve:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** AWS IAM, Google Cloud IAM, Okta, SailPoint, CyberArk, Keycloak Conexão com IAM: Trust, permissão efetiva, SCP/org policy e workloads.

**Questão profissional:** Os conceitos são portáveis ou a semântica de role é diferente?

**Critério de competência:** Entrega verificável: Fluxo SSO e entitlement com fonte de identidade definida. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Arquiteto compara AWS, Google Cloud e Microsoft Azure sem assumir equivalência de política, trust e autorização. Analise onde o conhecimento de "AWS IAM Identity Center" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "AWS IAM Identity Center", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo SSO e entitlement com fonte de identidade definida. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte técnica:** https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 26.5. Google Cloud IAM: principal, role e resource

**O que é:** Google Cloud IAM vincula principals a roles sobre hierarquia de recursos, com políticas condicionais onde disponíveis.

**Para que serve:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** AWS IAM, Google Cloud IAM, Okta, SailPoint, CyberArk, Keycloak Conexão com IAM: Trust, permissão efetiva, SCP/org policy e workloads.

**Questão profissional:** Os conceitos são portáveis ou a semântica de role é diferente?

**Critério de competência:** Entrega verificável: Matriz de principal, role, recurso e acesso efetivo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Arquiteto compara AWS, Google Cloud e Microsoft Azure sem assumir equivalência de política, trust e autorização. Analise onde o conhecimento de "Google Cloud IAM: principal, role e resource" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Google Cloud IAM: principal, role e resource", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de principal, role, recurso e acesso efetivo. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte técnica:** https://cloud.google.com/iam/docs/overview

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 26.6. Google Cloud Workload Identity Federation

**O que é:** Federação de workloads evita distribuição de chaves long-lived de service accounts.

**Para que serve:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** AWS IAM, Google Cloud IAM, Okta, SailPoint, CyberArk, Keycloak Conexão com IAM: Trust, permissão efetiva, SCP/org policy e workloads.

**Questão profissional:** Os conceitos são portáveis ou a semântica de role é diferente?

**Critério de competência:** Entrega verificável: Fluxo com principal externo e restrição de confiança. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Arquiteto compara AWS, Google Cloud e Microsoft Azure sem assumir equivalência de política, trust e autorização. Analise onde o conhecimento de "Google Cloud Workload Identity Federation" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Google Cloud Workload Identity Federation", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo com principal externo e restrição de confiança. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte técnica:** https://cloud.google.com/iam/docs/workload-identity-federation

**AtlasCorp: 1 procedimento(s) incorporado(s) diretamente na aula**

- Federação de workload entre clouds · Mapear GCP federation: **Onde:** GCP IAM → Workload Identity Pools. **Ação:** Projete pool, provider, attribute mapping/condition e recurso ou service account alvo.. **Validação:** Mapeamento de trust e acesso mínimo.. **Se falhar:** Não presuma equivalência com role assignment Azure.

#### 26.7. Okta versus Microsoft Entra

**O que é:** Provedores de identidade implementam OIDC/SAML/MFA, mas não possuem modelos idênticos de grupos e políticas.

**Para que serve:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** AWS IAM, Google Cloud IAM, Okta, SailPoint, CyberArk, Keycloak Conexão com IAM: Trust, permissão efetiva, SCP/org policy e workloads.

**Questão profissional:** Os conceitos são portáveis ou a semântica de role é diferente?

**Critério de competência:** Entrega verificável: Matriz de capacidades sem afirmar equivalência total. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Arquiteto compara AWS, Google Cloud e Microsoft Azure sem assumir equivalência de política, trust e autorização. Analise onde o conhecimento de "Okta versus Microsoft Entra" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Okta versus Microsoft Entra", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Matriz de capacidades sem afirmar equivalência total. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte técnica:** https://developer.okta.com/docs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 26.8. SailPoint IGA e ciclo de vida

**O que é:** Soluções IGA correlacionam identidades, contas e entitlements; integrações variam por conector.

**Para que serve:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** AWS IAM, Google Cloud IAM, Okta, SailPoint, CyberArk, Keycloak Conexão com IAM: Trust, permissão efetiva, SCP/org policy e workloads.

**Questão profissional:** Os conceitos são portáveis ou a semântica de role é diferente?

**Critério de competência:** Entrega verificável: Fluxo IGA completo com owner, SoD e revisão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Arquiteto compara AWS, Google Cloud e Microsoft Azure sem assumir equivalência de política, trust e autorização. Analise onde o conhecimento de "SailPoint IGA e ciclo de vida" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "SailPoint IGA e ciclo de vida", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Fluxo IGA completo com owner, SoD e revisão. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte técnica:** https://documentation.sailpoint.com/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 26.9. CyberArk PAM e contas privilegiadas

**O que é:** PAM tradicional protege credenciais e sessões privilegiadas; PIM eleva funções em escopos específicos.

**Para que serve:** Transfira princípios para arquiteturas multi-cloud e ferramentas de identidade com semelhanças e limites claros. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** AWS IAM, Google Cloud IAM, Okta, SailPoint, CyberArk, Keycloak Conexão com IAM: Trust, permissão efetiva, SCP/org policy e workloads.

**Questão profissional:** Os conceitos são portáveis ou a semântica de role é diferente?

**Critério de competência:** Entrega verificável: Arquitetura que identifica segredo, sessão e elevação separadamente. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Arquiteto compara AWS, Google Cloud e Microsoft Azure sem assumir equivalência de política, trust e autorização. Analise onde o conhecimento de "CyberArk PAM e contas privilegiadas" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "CyberArk PAM e contas privilegiadas", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Arquitetura que identifica segredo, sessão e elevação separadamente. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Nomes de roles e limites de políticas não são intercambiáveis entre fornecedores.

**Fonte técnica:** https://docs.cyberark.com/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 27: Engenharia de IAM e políticas de autorização

Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis.

#### 27.1. Policy Decision Point e Policy Enforcement Point

**O que é:** O PDP avalia políticas e o PEP aplica decisões no ponto de acesso, sem depender somente da interface do usuário.

**Para que serve:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** APIs de laboratório, OPA, scripts e documentação Conexão com IAM: Regras versionadas, testes positivos e negativos e PDP/PEP.

**Questão profissional:** A política é avaliada e aplicada em toda chamada protegida?

**Critério de competência:** Entrega verificável: Arquitetura e casos permitidos/negados/falha fechada. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Aplicativo interno depende de uma política versionada para determinar se um usuário pode alterar determinado registro. Analise onde o conhecimento de "Policy Decision Point e Policy Enforcement Point" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Policy Decision Point e Policy Enforcement Point", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Arquitetura e casos permitidos/negados/falha fechada. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte técnica:** https://www.openpolicyagent.org/docs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 27.2. ReBAC e autorização por relações

**O que é:** ReBAC baseia decisões nas relações entre sujeitos, objetos e organizações, além de papéis globais.

**Para que serve:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** APIs de laboratório, OPA, scripts e documentação Conexão com IAM: Regras versionadas, testes positivos e negativos e PDP/PEP.

**Questão profissional:** A política é avaliada e aplicada em toda chamada protegida?

**Critério de competência:** Entrega verificável: Grafo de relações e duas decisões divergentes. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Aplicativo interno depende de uma política versionada para determinar se um usuário pode alterar determinado registro. Analise onde o conhecimento de "ReBAC e autorização por relações" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "ReBAC e autorização por relações", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Grafo de relações e duas decisões divergentes. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte técnica:** https://www.openpolicyagent.org/docs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 27.3. ABAC orientado a recursos

**O que é:** Atributos do sujeito, recurso, ação e ambiente sustentam políticas expressivas com validação consistente.

**Para que serve:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** APIs de laboratório, OPA, scripts e documentação Conexão com IAM: Regras versionadas, testes positivos e negativos e PDP/PEP.

**Questão profissional:** A política é avaliada e aplicada em toda chamada protegida?

**Critério de competência:** Entrega verificável: Tabela de verdade mostrando concessão e negação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Aplicativo interno depende de uma política versionada para determinar se um usuário pode alterar determinado registro. Analise onde o conhecimento de "ABAC orientado a recursos" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "ABAC orientado a recursos", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Tabela de verdade mostrando concessão e negação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte técnica:** https://www.openpolicyagent.org/docs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 27.4. OPA e policy-as-code

**O que é:** Políticas versionadas como código podem ser testadas e revisadas antes de alterar decisões de produção.

**Para que serve:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** APIs de laboratório, OPA, scripts e documentação Conexão com IAM: Regras versionadas, testes positivos e negativos e PDP/PEP.

**Questão profissional:** A política é avaliada e aplicada em toda chamada protegida?

**Critério de competência:** Entrega verificável: Política versionada e testes automatizados de autorização. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Aplicativo interno depende de uma política versionada para determinar se um usuário pode alterar determinado registro. Analise onde o conhecimento de "OPA e policy-as-code" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "OPA e policy-as-code", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Política versionada e testes automatizados de autorização. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte técnica:** https://www.openpolicyagent.org/docs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 27.5. Provisionamento SCIM resiliente

**O que é:** Integrações exigem idempotência, observabilidade e tratamento de estado parcial para não duplicar identidades.

**Para que serve:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** APIs de laboratório, OPA, scripts e documentação Conexão com IAM: Regras versionadas, testes positivos e negativos e PDP/PEP.

**Questão profissional:** A política é avaliada e aplicada em toda chamada protegida?

**Critério de competência:** Entrega verificável: Log de duas tentativas sem duplicação e com estado final correto. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Aplicativo interno depende de uma política versionada para determinar se um usuário pode alterar determinado registro. Analise onde o conhecimento de "Provisionamento SCIM resiliente" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Provisionamento SCIM resiliente", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Log de duas tentativas sem duplicação e com estado final correto. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte técnica:** https://www.openpolicyagent.org/docs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 27.6. Threat modeling para IAM

**O que é:** Modelagem de ameaças identifica ativos, fronteiras de confiança, abuso de privilégios e compensações.

**Para que serve:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** APIs de laboratório, OPA, scripts e documentação Conexão com IAM: Regras versionadas, testes positivos e negativos e PDP/PEP.

**Questão profissional:** A política é avaliada e aplicada em toda chamada protegida?

**Critério de competência:** Entrega verificável: Modelo de ameaças com ao menos cinco cenários e controles. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Aplicativo interno depende de uma política versionada para determinar se um usuário pode alterar determinado registro. Analise onde o conhecimento de "Threat modeling para IAM" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Threat modeling para IAM", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Modelo de ameaças com ao menos cinco cenários e controles. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte técnica:** https://www.openpolicyagent.org/docs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 27.7. Fail-safe, resiliência e break-glass

**O que é:** IAM precisa reduzir fail-open acidental sem impedir recuperação administrativa em incidentes.

**Para que serve:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** APIs de laboratório, OPA, scripts e documentação Conexão com IAM: Regras versionadas, testes positivos e negativos e PDP/PEP.

**Questão profissional:** A política é avaliada e aplicada em toda chamada protegida?

**Critério de competência:** Entrega verificável: Plano com fail-closed, recuperação e teste de continuidade. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Aplicativo interno depende de uma política versionada para determinar se um usuário pode alterar determinado registro. Analise onde o conhecimento de "Fail-safe, resiliência e break-glass" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Fail-safe, resiliência e break-glass", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Plano com fail-closed, recuperação e teste de continuidade. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte técnica:** https://www.openpolicyagent.org/docs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 27.8. Infraestrutura como código para IAM

**O que é:** Automações declarativas e versionadas reduzem deriva, mas precisam cuidado com estados e credenciais.

**Para que serve:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** APIs de laboratório, OPA, scripts e documentação Conexão com IAM: Regras versionadas, testes positivos e negativos e PDP/PEP.

**Questão profissional:** A política é avaliada e aplicada em toda chamada protegida?

**Critério de competência:** Entrega verificável: Diff versionado e plano reversível sem credenciais embutidas. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Aplicativo interno depende de uma política versionada para determinar se um usuário pode alterar determinado registro. Analise onde o conhecimento de "Infraestrutura como código para IAM" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Infraestrutura como código para IAM", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Diff versionado e plano reversível sem credenciais embutidas. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte técnica:** https://www.openpolicyagent.org/docs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 27.9. Arquitetura de referência e projeto final

**O que é:** Uma arquitetura madura conecta identidade, dispositivo, recurso, dados, governança e monitoramento.

**Para que serve:** Projete sistemas com controles testáveis, automação segura e regras de autorização portáveis. A análise deve explicitar o risco de concessão indevida, perda de rastreabilidade ou indisponibilidade.

**Como funciona:** APIs de laboratório, OPA, scripts e documentação Conexão com IAM: Regras versionadas, testes positivos e negativos e PDP/PEP.

**Questão profissional:** A política é avaliada e aplicada em toda chamada protegida?

**Critério de competência:** Entrega verificável: Projeto de arquitetura, checklist de testes, evidências e plano de recuperação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Cenário de fixação:** Aplicativo interno depende de uma política versionada para determinar se um usuário pode alterar determinado registro. Analise onde o conhecimento de "Arquitetura de referência e projeto final" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Arquitetura de referência e projeto final", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Entrega verificável: Projeto de arquitetura, checklist de testes, evidências e plano de recuperação. Explique a decisão técnica, o menor privilégio e uma possibilidade de falha.

**Risco:** Um erro de PDP não deve liberar automaticamente acesso não autorizado.

**Fonte técnica:** https://www.openpolicyagent.org/docs/

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

### Módulo 15: Zero Trust e arquitetura IAM

Arquiteturas maduras tratam identidades humanas e de máquina com políticas adaptativas e monitoramento.

#### 15.1. Arquitetura de confiança e decisões de acesso

**O que é:** Arquitetura IAM integra diretórios, IdP, enforcement de aplicação e mecanismos de política.

**Para que serve:** Lacunas nas fronteiras de confiança geram bypass de autorização e dependências frágeis.

**Como funciona:** Diagramas de arquitetura Zero Trust, gateways, PDP/PEP e IdP. Conexão com IAM: Desenhe IdP, PDP, PEP, aplicações, dados e ciclo de vida.

**Questão profissional:** Onde fica cada fronteira de confiança e como recuperar de falhas?

**Critério de competência:** Critério de aceite: Desenhe fluxo cliente → app → IdP → diretório; Teste decisão permitida e negada no lab.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Um arquiteto apresenta o desenho de identidade de AtlasCorp à segurança e à direção, incluindo falhas e responsáveis por cada decisão. Analise onde o conhecimento de "Arquitetura de confiança e decisões de acesso" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Arquitetura de confiança e decisões de acesso", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Desenhe fluxo cliente → app → IdP → diretório; Teste decisão permitida e negada no lab.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Zero Trust não é um produto nem implica desabilitar controles locais.

**Fonte técnica:** https://csrc.nist.gov/pubs/sp/800/207/final

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 15.2. Identidades não humanas e segredos

**O que é:** Workloads, aplicações e agentes precisam de identidades próprias para acessar recursos.

**Para que serve:** Segredos permanentes sem owner ou rotação são alvos comuns em pipelines e automações.

**Como funciona:** Managed identities, service principals, roles de workload e cofres de segredos. Conexão com IAM: Desenhe IdP, PDP, PEP, aplicações, dados e ciclo de vida.

**Questão profissional:** Onde fica cada fronteira de confiança e como recuperar de falhas?

**Critério de competência:** Critério de aceite: Inventarie três workloads fictícios; Documente owners e direitos mínimos.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Um arquiteto apresenta o desenho de identidade de AtlasCorp à segurança e à direção, incluindo falhas e responsáveis por cada decisão. Analise onde o conhecimento de "Identidades não humanas e segredos" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Identidades não humanas e segredos", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Inventarie três workloads fictícios; Documente owners e direitos mínimos.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Zero Trust não é um produto nem implica desabilitar controles locais.

**Fonte técnica:** https://csrc.nist.gov/pubs/sp/800/207/final

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 15.3. Threat modeling e resiliência

**O que é:** Threat modeling avalia ameaças a componentes e fluxos, enquanto resiliência garante recuperação da autenticação.

**Para que serve:** Falha de IdP ou roubo de token pode interromper ou comprometer toda organização.

**Como funciona:** Diagramas de fluxo de dados, STRIDE e planos de continuidade IAM. Conexão com IAM: Desenhe IdP, PDP, PEP, aplicações, dados e ciclo de vida.

**Questão profissional:** Onde fica cada fronteira de confiança e como recuperar de falhas?

**Critério de competência:** Critério de aceite: Desenhe login OIDC com fronteiras de confiança; Associe mitigação, log e plano de recuperação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Um arquiteto apresenta o desenho de identidade de AtlasCorp à segurança e à direção, incluindo falhas e responsáveis por cada decisão. Analise onde o conhecimento de "Threat modeling e resiliência" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Threat modeling e resiliência", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Desenhe login OIDC com fronteiras de confiança; Associe mitigação, log e plano de recuperação.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Zero Trust não é um produto nem implica desabilitar controles locais.

**Fonte técnica:** https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool

**AtlasCorp:** não há configuração obrigatória neste tema. O cenário serve para compreensão e análise.

#### 15.4. Projeto IAM ponta a ponta

**O que é:** Projeto IAM reúne ciclo de vida, autenticação federada, autorização, logs e revisão num cenário único.

**Para que serve:** Consolidar componentes demonstra entendimento das dependências e dos pontos de falha.

**Como funciona:** Ambiente de laboratório com IdP, aplicação OIDC, diretório e provisionador simulado. Conexão com IAM: Desenhe IdP, PDP, PEP, aplicações, dados e ciclo de vida.

**Questão profissional:** Onde fica cada fronteira de confiança e como recuperar de falhas?

**Critério de competência:** Critério de aceite: Implante Keycloak ou Authentik e uma aplicação cliente; Documente arquitetura, casos de acesso negado, logs e rollback.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Cenário de fixação:** Um arquiteto apresenta o desenho de identidade de AtlasCorp à segurança e à direção, incluindo falhas e responsáveis por cada decisão. Analise onde o conhecimento de "Projeto IAM ponta a ponta" atua nesta situação, qual é a decisão de IAM e em que ponto o resultado falharia.

**Entrega esperada:** Registre uma explicação específica de "Projeto IAM ponta a ponta", indicando o mecanismo, um caso aceitável, uma falha e como reconhecê-la. Referência de aprovação: Critério de aceite: Implante Keycloak ou Authentik e uma aplicação cliente; Documente arquitetura, casos de acesso negado, logs e rollback.. Entregue evidência sanitizada do resultado, um teste negativo ou caso de falha e a causa/correção documentadas.

**Risco:** Zero Trust não é um produto nem implica desabilitar controles locais.

**Fonte técnica:** https://csrc.nist.gov/pubs/sp/800/207/final

**AtlasCorp: 7 procedimento(s) incorporado(s) diretamente na aula**

- Projeto final IAM ponta a ponta · Consolidar contexto: **Onde:** Portfólio AtlasCorp → arquitetura. **Ação:** Crie diagrama usuários, RH, Entra, grupos, aplicações, Intune, Azure, Purview, SIEM e workloads.. **Validação:** Diagrama versionado com origem e dono de cada identidade.. **Se falhar:** Não misture simulações e serviços reais no desenho sem legenda.
- Projeto final IAM ponta a ponta · Apresentar matrizes: **Onde:** Portfólio → RACI, SoD e matriz de privilégios. **Ação:** Liste Joiner/Mover/Leaver, roles, recursos, owners, escopos e justificativas.. **Validação:** Matrizes com decisões aprovadas.. **Se falhar:** Direito sem owner é exceção a corrigir.
- Projeto final IAM ponta a ponta · Mostrar login e autorização: **Onde:** App de teste + Entra CA. **Ação:** Reproduza um login com método apropriado, app assignment e ação autorizada/negada.. **Validação:** Logs e responses 2xx/4xx sanitizados.. **Se falhar:** Se app só verifica front-end, implemente backend authorization.
- Projeto final IAM ponta a ponta · Correlacionar device/data: **Onde:** Intune + Purview quando licenciados. **Ação:** Teste condição de dispositivo e política do dado nos respectivos workloads, ou registre simulações.. **Validação:** Status de compliance e proteção de documento com escopo.. **Se falhar:** P2 sozinho não licencia os outros produtos.
- Projeto final IAM ponta a ponta · Demonstrar governança avançada: **Onde:** PIM / Access Reviews / tickets. **Ação:** Mostre concessão, ativação temporária e retirada real ou simulada.. **Validação:** Logs de solicitação, aprovação e remoção.. **Se falhar:** P2 e ID Governance têm coberturas distintas.
- Projeto final IAM ponta a ponta · Investigar incidente: **Onde:** Sign-in / audit / incident logs. **Ação:** Provoque condição controlada de bloqueio, documente hipótese e teste correção.. **Validação:** Runbook com evidências antes e depois.. **Se falhar:** Não execute incidente simulado em tenant real.
- Projeto final IAM ponta a ponta · Fazer revisão de segurança: **Onde:** Portfólio → checklist final. **Ação:** Liste licenças, custo, riscos residuais, segredos excluídos, privilégios removidos, backups e recuperação.. **Validação:** Relatório final seguro para mostrar em entrevista.. **Se falhar:** Redija identificadores de tenant, tokens e informações pessoais.

## Limites e requisitos de segurança

- **Entra P2 não inclui automaticamente Intune, Purview, Azure pago nem todas as funcionalidades de Identity Governance.**
- **CA:** não habilite bloqueio fora de tenant e grupo piloto. Exclua contas emergenciais de políticas que bloqueiam e teste recuperação independentemente.
- **IAM na aplicação:** autorização em APIs é responsabilidade da aplicação, não apenas de grupos ou autenticação do Entra.
- Menus e SKUs podem mudar. As fontes oficiais devem ser confirmadas antes de aplicar mudanças, especialmente em cenários de risco.
- Registro de prática é **autodeclarado**, sem coleta remota de evidências.

Atualização do conteúdo: outubro de 2026.