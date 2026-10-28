'use strict';
const CURRICULUM_VERSION="2026.10.28.1";
const PHASES=[
  {
    "id": "prep",
    "number": 0,
    "title": "Comece aqui · ambiente e percurso",
    "desc": "Escolha o caminho, prepare ferramentas e faça o primeiro login.",
    "environment": "Computador pessoal, navegador e ferramentas conforme percurso.",
    "requirements": "Local: Python e Docker. Híbrido: VMs Windows/licenças compatíveis. Recursos premium são opcionais.",
    "outcome": "Ambiente iniciado, identidades fictícias e primeira decisão de acesso.",
    "difficulty": "beginner",
    "items": [
      {
        "id": "prep-route",
        "title": "Escolher percurso e preparar suas ferramentas",
        "url": "https://www.keycloak.org/getting-started/getting-started-docker",
        "study": [
          {
            "topic": "O que você vai construir",
            "detail": "A Aurora é uma empresa fictícia com Financeiro, Jurídico e TI. Ana terá a mesma identidade nos eventos do RH, no provedor de login e na aplicação. O portal orienta; os serviços executam no seu computador."
          },
          {
            "topic": "Três percursos",
            "detail": "Local: Python, Keycloak e aplicação/API. Microsoft: tenant Entra e Windows/AD para cenários híbridos. Premium: Intune, PIM e IGA conforme licença. Percursos são filtros de estudo, não equivalências entre produtos."
          },
          {
            "topic": "Evidência e progresso",
            "detail": "Estudar não é executar. Uma simulação é útil, mas não prova que o serviço funciona. Registre estado inicial, resultado observado e um teste que deveria falhar. Nunca copie senhas, tokens ou chaves para as notas."
          }
        ],
        "practice": [],
        "evidence": "Inventário das ferramentas, percurso escolhido e kit extraído.",
        "prerequisite": "",
        "prerequisiteIds": [],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "technologies": [
          "keycloak"
        ],
        "difficulty": "beginner",
        "guide": {
          "platform": "Aurora Lab · laboratório local",
          "platformUrl": "https://www.keycloak.org/getting-started/getting-started-docker",
          "where": "Computador pessoal → pasta aurora-lab",
          "steps": [
            {
              "id": "choose",
              "title": "Definir objetivo",
              "text": "Selecione Local, Microsoft/híbrido ou Premium no filtro de percurso. Você pode acessar qualquer lição; avisos de pré-requisitos não bloqueiam exploração.",
              "command": "",
              "expected": ""
            },
            {
              "id": "tools",
              "title": "Conferir ferramentas",
              "text": "Para o caminho local, instale Python 3.11 ou superior e Docker com o plugin Compose. No Windows, use PowerShell e confirme suporte à virtualização. Não precisa instalar AD antes do laboratório local.",
              "command": "python --version\ndocker version\ndocker compose version",
              "expected": "Versões aparecem e o Docker Engine responde sem erro de conexão."
            },
            {
              "id": "download",
              "title": "Baixar o kit",
              "text": "Baixe o kit Aurora pelo botão nesta lição ou na Visão geral. Extraia em uma pasta local. Ele contém o servidor/API SCIM, cliente OIDC, provisionador JML, dados fictícios e Compose; não exige login no portal.",
              "command": "",
              "expected": ""
            },
            {
              "id": "inventory",
              "title": "Registrar preparação",
              "text": "Anote sistema operacional, versões, memória disponível e percurso escolhido. Reserve inicialmente cerca de 2 GB para Keycloak além do host; observe consumo real. Windows e ferramentas premium têm requisitos próprios.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Computador pessoal e navegador. Ferramentas conforme o percurso.",
          "costNote": "Instale Python/Docker somente ao escolher o laboratório local; Windows e tenant são alternativas com requisitos próprios."
        },
        "sources": [
          {
            "label": "Instalar Python",
            "url": "https://www.python.org/downloads/"
          },
          {
            "label": "Instalar Docker e Compose",
            "url": "https://docs.docker.com/get-started/get-docker/"
          },
          {
            "label": "Instalar PowerShell",
            "url": "https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell"
          }
        ],
        "revision": "2026.10.28.1",
        "challenge": "Explique o resultado sem repetir os comandos. Qual evidência contradiz sua hipótese?",
        "rollback": "Use dados fictícios. Desfaça a alteração de teste e repita os testes de acesso; não apague dados para esconder uma falha.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "As ferramentas necessárias ao percurso escolhido foram verificadas; recursos indisponíveis estão identificados."
          },
          {
            "id": "negative-case",
            "text": "O ambiente foi planejado com dados fictícios; kit extraído se o percurso local foi escolhido."
          },
          {
            "id": "restore-evidence",
            "text": "Versões, limitações e ponto de recuperação registrados sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente você acabou de preparar e o que ele não faz?",
          "answer": "A Aurora é uma empresa fictícia com Financeiro, Jurídico e TI. Ana terá a mesma identidade nos eventos do RH, no provedor de login e na aplicação. O portal orienta; os serviços executam no seu computador."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": true
      },
      {
        "id": "prep-local",
        "title": "Subir a Aurora: IdP, aplicação e API",
        "url": "https://www.keycloak.org/getting-started/getting-started-docker",
        "study": [
          {
            "topic": "Responsabilidades",
            "detail": "Keycloak autentica. A aplicação verifica tokens e decide acesso consultando seu cadastro SCIM. O provisionador recebe o estado do RH e reconcilia os dois destinos. Se um destino falhar, o outro pode já ter mudado: repetir com o mesmo employeeId corrige o estado sem criar outra pessoa."
          },
          {
            "topic": "Ambiente local",
            "detail": "Os serviços escutam em 127.0.0.1. Use localhost no navegador para que issuer, cookies e callback coincidam. HTTP e start-dev são apenas para o laboratório local; uma implantação real exige TLS, armazenamento, segredos e operação próprios."
          },
          {
            "topic": "Credenciais geradas",
            "detail": "setup.py cria .env somente no computador. A senha do administrador Keycloak, token SCIM e senha dos usuários fictícios são aleatórios. Não envie .env, banco, tokens ou capturas de credenciais ao GitHub."
          }
        ],
        "practice": [],
        "evidence": "Login OIDC funcional, decisão 200/403 e teste 401 sem autenticação.",
        "prerequisite": "",
        "prerequisiteIds": [
          "prep-route"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "technologies": [
          "keycloak"
        ],
        "difficulty": "beginner",
        "guide": {
          "platform": "Aurora Lab · laboratório local",
          "platformUrl": "https://www.keycloak.org/getting-started/getting-started-docker",
          "where": "Computador pessoal → pasta aurora-lab",
          "steps": [
            {
              "id": "venv",
              "title": "Preparar Python",
              "text": "Abra o terminal na pasta extraída e crie o ambiente virtual. No Windows ative por .venv\\Scripts\\Activate.ps1; em Linux/macOS use source .venv/bin/activate. Se a política bloquear ativação, execute o Python dentro de .venv diretamente.",
              "command": "python -m venv .venv\npython -m pip --version",
              "expected": "Ambiente virtual criado. Ative-o antes dos próximos comandos."
            },
            {
              "id": "configure",
              "title": "Instalar e configurar",
              "text": "Com o ambiente virtual ativo, instale a dependência criptográfica e gere a configuração. setup.py não sobrescreve .env existente.",
              "command": "python -m pip install -r requirements.txt\npython setup.py",
              "expected": "Arquivos .env e realm.json criados; nenhuma senha é impressa."
            },
            {
              "id": "idp",
              "title": "Iniciar o provedor de identidade",
              "text": "O Compose lê .env e importa o realm aurora somente na primeira criação. Abra http://localhost:8080 e autentique como admin com KC_ADMIN_PASSWORD de .env. Não altere master para as aplicações.",
              "command": "docker compose up -d\ndocker compose logs --tail 30",
              "expected": "Keycloak disponível e realm aurora presente; aguarde inicialização antes do JML."
            },
            {
              "id": "server",
              "title": "Iniciar aplicação",
              "text": "Em outro terminal com ambiente virtual ativo, inicie o servidor e mantenha-o aberto. Abra http://localhost:8765/health.",
              "command": "python server.py",
              "expected": "Health responde status ok. A aplicação fica em http://localhost:8765."
            },
            {
              "id": "seed",
              "title": "Criar as identidades do cenário",
              "text": "Em terceiro terminal, faça a prévia e aplique o RH fictício. JML grava no cadastro SCIM e no Keycloak. A senha inicial dos usuários é STUDENT_PASSWORD de .env.",
              "command": "python jml.py joiner.csv\npython jml.py joiner.csv --apply",
              "expected": "E001/fin.ana e E002/jur.carla existem nos dois destinos. Repetir não duplica usuários."
            },
            {
              "id": "smoke",
              "title": "Conferir a primeira decisão",
              "text": "Abra http://localhost:8765. Entre como fin.ana e teste os dois departamentos. A aplicação mostra respostas JSON sem exibir token.",
              "command": "",
              "expected": "Financeiro 200, Jurídico 403; sem login, o recurso protegido retorna 401."
            },
            {
              "id": "stop",
              "title": "Saber interromper",
              "text": "Ctrl+C encerra server.py. docker compose stop interrompe o IdP preservando o volume. Para retomar, use docker compose start e python server.py. Não use down -v se deseja preservar contas.",
              "command": "docker compose stop",
              "expected": "Serviços param sem apagar banco nem volume. Reinicie antes da próxima lição."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Kit Aurora extraído; Python 3.11+ e Docker/Compose disponíveis.",
          "costNote": "Python 3.11+ e Docker/Compose. Sem tenant cloud. Todos os dados devem ser fictícios; não exponha o kit na internet."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://www.keycloak.org/getting-started/getting-started-docker"
          }
        ],
        "revision": "2026.10.28.1",
        "challenge": "Explique o resultado sem repetir os comandos. Qual evidência contradiz sua hipótese?",
        "rollback": "Use dados fictícios. Desfaça a alteração de teste e repita os testes de acesso; não apague dados para esconder uma falha.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "Ana acessa FIN com HTTP 200 e JUR com HTTP 403."
          },
          {
            "id": "negative-case",
            "text": "Uma chamada sem login recebe HTTP 401."
          },
          {
            "id": "restore-evidence",
            "text": "Versões, limitações e ponto de recuperação registrados sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente você acabou de preparar e o que ele não faz?",
          "answer": "Keycloak autentica. A aplicação verifica tokens e decide acesso consultando seu cadastro SCIM. O provisionador recebe o estado do RH e reconcilia os dois destinos. Se um destino falhar, o outro pode já ter mudado: repetir com o mesmo employeeId corrige o estado sem criar outra pessoa."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": true
      },
      {
        "id": "prep-windows",
        "title": "Preparar Windows e rede isolada para o híbrido",
        "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-",
        "study": [
          {
            "topic": "Separação de ambientes",
            "detail": "AD DS usa DNS e autenticação próprios. Um tenant Entra não cria domínio Windows nem dá automaticamente às pastas locais os grupos cloud. Você construirá o domínio em uma rede de VMs isolada."
          },
          {
            "topic": "Plano de rede",
            "detail": "Exemplo: rede host-only 192.168.56.0/24; DC01 192.168.56.10; CL01 192.168.56.20; DNS do cliente apontando para DC01. Adapte se houver conflito. Não invente gateway: uma rede sem roteador pode não ter gateway."
          },
          {
            "topic": "Licença e capacidade",
            "detail": "Use Windows Server de avaliação/licença válida e Windows 11 Pro/Enterprise compatível com ingresso em domínio. Home não ingressa em AD DS. Reserve memória para host e VMs; 16 GB pode exigir ligar serviços em etapas."
          }
        ],
        "practice": [],
        "evidence": "Duas VMs novas ou inventário validado de ambiente existente, rede isolada e ponto inicial de recuperação.",
        "prerequisite": "",
        "prerequisiteIds": [
          "prep-route"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "technologies": [
          "windows",
          "active directory"
        ],
        "difficulty": "beginner",
        "guide": {
          "platform": "Aurora Lab · laboratório local",
          "platformUrl": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-",
          "where": "Computador pessoal → pasta aurora-lab",
          "steps": [
            {
              "id": "virtualization",
              "title": "Criar as VMs",
              "text": "Na ferramenta de virtualização que você já usa, crie DC01 com Windows Server suportado e CL01 com Windows 11 Pro/Enterprise. Monte ISOs oficiais, conclua instalação, atualizações e senhas locais. Não reutilize máquinas de trabalho.",
              "command": "",
              "expected": ""
            },
            {
              "id": "network",
              "title": "Isolar e endereçar",
              "text": "Conecte ambas à mesma rede host-only/interna. Configure IPs do plano, máscara /24 e DNS. Acesso à internet para atualizações deve ser separado e planejado; não exponha RDP, LDAP ou DNS para a internet.",
              "command": "",
              "expected": ""
            },
            {
              "id": "verify",
              "title": "Conferir conectividade",
              "text": "Em cada VM, registre a configuração. Ping pode ser bloqueado pelo firewall: não desligue o firewall inteiro para resolver. Ajuste regra de laboratório específica se necessário.",
              "command": "ipconfig /all\nGet-NetIPConfiguration",
              "expected": "IPs não conflitam e ambas as VMs estão na rede planejada. DNS completo será validado após instalar AD DS."
            },
            {
              "id": "backup",
              "title": "Criar ponto de recuperação",
              "text": "Desligue VMs e crie checkpoint inicial. Para AD já existente, faça backup consistente e verifique o domínio antes de alterar. Snapshot não substitui estratégia de backup de controlador.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Kit Aurora: Python 3.11+, Docker com Compose e navegador.",
          "costNote": "O kit usa somente loopback. Docker e Python são instalados pelo estudante; verifique licença do Docker Desktop. Não requer Azure."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-"
          }
        ],
        "revision": "2026.10.28.1",
        "challenge": "Explique o resultado sem repetir os comandos. Qual evidência contradiz sua hipótese?",
        "rollback": "Use dados fictícios. Desfaça a alteração de teste e repita os testes de acesso; não apague dados para esconder uma falha.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "DC01 e CL01 têm IPs distintos na rede isolada."
          },
          {
            "id": "negative-case",
            "text": "Não há ponte acidental para a rede de trabalho; o plano de DNS está registrado."
          },
          {
            "id": "restore-evidence",
            "text": "Versões, limitações e ponto de recuperação registrados sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente você acabou de preparar e o que ele não faz?",
          "answer": "AD DS usa DNS e autenticação próprios. Um tenant Entra não cria domínio Windows nem dá automaticamente às pastas locais os grupos cloud. Você construirá o domínio em uma rede de VMs isolada."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      }
    ]
  },
  {
    "id": "p0",
    "title": "Fundamentos IAM",
    "desc": "Conceitos, protocolos e modelos de controle.",
    "items": [
      {
        "id": "iam-0-0",
        "title": "Identidade: criar os primeiros usuários do laboratório",
        "url": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users",
        "study": [
          {
            "topic": "Identidade, conta e vínculo",
            "detail": "Ana é a pessoa; E001 é o identificador do vínculo; fin.ana é a conta; a senha é uma credencial. Trocar departamento não deve criar uma nova pessoa. O RH determina vínculo; os sistemas consumidores mantêm suas contas."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Um convidado B2B mantém uma identidade externa e recebe um objeto no tenant convidante. Não equivale a criar outro funcionário. Comece com contas internas; B2B é complemento quando houver emails de teste controlados."
          }
        ],
        "practice": [],
        "evidence": "Quatro usuários internos, três grupos e inventário dos atributos; B2B opcional não impede conclusão.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra · contas de laboratório",
          "platformUrl": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users",
          "where": "Entra ID → Users / Groups",
          "steps": [
            {
              "id": "tenant",
              "title": "Selecionar ou criar tenant",
              "text": "Abra entra.microsoft.com com sua conta de laboratório. Se ainda não possui tenant, consulte a criação oficial e a elegibilidade da sua conta. Não há garantia de tenant gratuito nem de acesso ao programa Developer. Se indisponível, siga o percurso Local e retorne depois.",
              "command": "",
              "expected": ""
            },
            {
              "id": "users",
              "title": "Criar quatro contas internas",
              "text": "Em Users → New user, crie fin.ana, jur.carla, ti.operador e adm.lab no domínio onmicrosoft.com do tenant. Use dados fictícios e senha inicial gerada; ti.operador é conta cotidiana e adm.lab fica separada. Não atribua Global Administrator neste exercício.",
              "command": "",
              "expected": ""
            },
            {
              "id": "attributes",
              "title": "Preencher vínculo e departamento",
              "text": "Registre E001 para Ana e E002 para Carla no inventário. Preencha departamento Financeiro/Jurídico nas propriedades. Identificador de RH e UPN têm funções diferentes.",
              "command": "",
              "expected": ""
            },
            {
              "id": "groups",
              "title": "Criar os grupos",
              "text": "Crie grupos de segurança LAB-FINANCEIRO, LAB-JURIDICO e LAB-TI; adicione os membros correspondentes. Nenhuma função de diretório é herdada automaticamente só por pertencer a esses grupos.",
              "command": "",
              "expected": ""
            },
            {
              "id": "verify",
              "title": "Conferir objetos",
              "text": "Pesquise cada UPN, confira Member, departamento e associação. Faça login como Ana e confira se não pode administrar o tenant. B2B é opcional: convide apenas email externo de teste controlado, registrando estado de convite.",
              "command": "",
              "expected": ""
            },
            {
              "id": "inventory",
              "title": "Guardar inventário",
              "text": "Guarde somente identificadores fictícios, grupos e estado. Duas contas de emergência serão preparadas na lição administrativa; não chame adm.lab de conta de emergência antes de configurá-la.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Entra ID Free + AD existente",
          "costNote": "A criação básica de membros, convidados B2B e grupos pode ser testada no Entra ID Free, sujeita às políticas de convite e limites do tenant; sem licenças premium nesta etapa."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "beginner",
        "technologies": [
          "entra"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-route"
        ],
        "challenge": "Explique uma hipótese de falha de Identidade. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "Os quatro usuários e três grupos existem com atributos e membros esperados."
          },
          {
            "id": "negative-case",
            "text": "Ana não consegue administrar o diretório; B2B opcional está identificado."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Identidade, conta e vínculo: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Ana é a pessoa; E001 é o identificador do vínculo; fin.ana é a conta; a senha é uma credencial. Trocar departamento não deve criar uma nova pessoa. O RH determina vínculo; os sistemas consumidores mantêm suas contas."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-0-1",
        "title": "AAA, RBAC, ABAC e menor privilégio",
        "url": "https://csrc.nist.gov/projects/role-based-access-control",
        "study": [
          {
            "topic": "Autenticar e autorizar são decisões diferentes",
            "detail": "Login confirma a identidade; autorização verifica se aquela identidade pode executar uma ação no recurso. Na Aurora, uma conta ativa do Financeiro recebe 200 em FIN e 403 em JUR. Um token válido sozinho não concede acesso a tudo."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "RBAC associa papéis a permissões; ABAC avalia atributos. Grupos de um diretório só têm efeito em um recurso integrado a ele. Entra roles, Azure RBAC e ACLs Windows são sistemas de autorização diferentes."
          }
        ],
        "practice": [],
        "evidence": "Matriz com FIN 200, JUR 403 e chamada sem login 401, com explicação da política ABAC.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Aurora Lab · aplicação/API",
          "platformUrl": "https://csrc.nist.gov/projects/role-based-access-control",
          "where": "http://localhost:8765",
          "steps": [
            {
              "id": "matrix",
              "title": "Definir a matriz",
              "text": "Com o kit iniciado, escreva a matriz: Ana ativa/Financeiro lê FIN e não lê JUR; Carla ativa/Jurídico tem a decisão inversa. O recurso deste teste é a API Aurora, não uma pasta Windows.",
              "command": "",
              "expected": ""
            },
            {
              "id": "authentication",
              "title": "Autenticar como Ana",
              "text": "Abra a aplicação, entre com fin.ana e a senha STUDENT_PASSWORD de .env. Observe redirecionamento ao IdP e retorno; não copie tokens.",
              "command": "",
              "expected": ""
            },
            {
              "id": "authorization",
              "title": "Testar os dois recursos",
              "text": "Abra /api/financeiro e /api/juridico. Compare a decisão com a matriz. O servidor exige conta ativa e departamento correspondente; este é um exemplo de autorização por atributos.",
              "command": "",
              "expected": ""
            },
            {
              "id": "rbac",
              "title": "Comparar RBAC com ABAC",
              "text": "Desenhe a variante RBAC: papel financeiro-leitor ligado à permissão ler FIN. A implementação atual consulta atributos, não implementa catálogo de papéis. Não declare esse desenho como RBAC implantado.",
              "command": "",
              "expected": ""
            },
            {
              "id": "negative",
              "title": "Separar 401 de 403",
              "text": "Em janela privada sem login, abra /api/financeiro: espere 401. Como Ana autenticada, JUR deve dar 403. Explique por que ambos são negações por causas distintas.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Kit Aurora iniciado: aplicação/API local e Keycloak.",
          "costNote": "Python 3.11+ e Docker/Compose. Sem tenant cloud. Todos os dados devem ser fictícios; não exponha o kit na internet."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://csrc.nist.gov/projects/role-based-access-control"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "beginner",
        "technologies": [
          "rbac",
          "abac",
          "keycloak"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-local"
        ],
        "challenge": "Explique uma hipótese de falha de AAA, RBAC, ABAC e menor privilégio. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A matriz prevê e explica FIN 200/JUR 403 para Ana."
          },
          {
            "id": "negative-case",
            "text": "O teste sem autenticação dá 401, diferente da negação por permissão."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Autenticar e autorizar são decisões diferentes: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Login confirma a identidade; autorização verifica se aquela identidade pode executar uma ação no recurso. Na Aurora, uma conta ativa do Financeiro recebe 200 em FIN e 403 em JUR. Um token válido sozinho não concede acesso a tudo."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": true
      },
      {
        "id": "iam-0-2",
        "title": "Redes, DNS, TLS e certificados",
        "url": "https://learn.microsoft.com/pt-br/windows-server/networking/dns/dns-top",
        "study": [
          {
            "topic": "Nome, conexão e confiança",
            "detail": "DNS transforma nome em endereço. TCP testa conexão com uma porta. TLS verifica identidade do servidor, validade e cadeia de confiança. Um deles funcionar não comprova os outros."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Kerberos depende de nomes, SPNs e relógio coerentes. nslookup/Resolve-DnsName fazem consultas; Test-NetConnection -Port 53 testa somente TCP. Investigue camada por camada antes de mudar políticas de identidade."
          }
        ],
        "practice": [],
        "evidence": "Resolução e conexão diferenciadas, certificado HTTPS inspecionado e limitações do teste local registradas.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Host pessoal · DNS e navegador",
          "platformUrl": "https://docs.python.org/3/library/socket.html#socket.getaddrinfo",
          "where": "Terminal e navegador, sem alterar DNS da rede de trabalho",
          "steps": [
            {
              "id": "resolve",
              "title": "Resolver um nome",
              "text": "No host com Python, consulte localhost e um nome público conhecido. Compare com nslookup, disponível em muitos sistemas. Não altere o DNS corporativo.",
              "command": "python -c \"import socket; print(socket.getaddrinfo('localhost', 8765))\"",
              "expected": "localhost aponta para loopback; resolver nome não prova que a aplicação está iniciada."
            },
            {
              "id": "connect",
              "title": "Separar resolução de conexão",
              "text": "Com Aurora iniciada, abra /health. Pare server.py e tente novamente: o nome continua resolvendo, mas o serviço deixa de responder. Reinicie depois.",
              "command": "http://localhost:8765/health",
              "expected": "Servidor iniciado: status ok. Servidor parado: conexão não concluída."
            },
            {
              "id": "tls",
              "title": "Inspecionar confiança TLS",
              "text": "Em um site oficial HTTPS de referência, abra as informações do certificado no navegador e confira nome/SAN, emissor e validade. A Aurora local usa HTTP: não há certificado TLS nela. Não ignore alertas de certificado para fazer um teste parecer bem-sucedido."
            },
            {
              "id": "domain",
              "title": "Aplicar ao caminho híbrido quando disponível",
              "text": "Se você montou AD, use no cliente Resolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.aurora.test. DNS do AD só existe após instalar o domínio. Test-NetConnection -Port 53 testa TCP e não substitui a consulta DNS. Sem AD, registre essa extensão como não executada."
            },
            {
              "id": "restore",
              "title": "Restaurar e explicar",
              "text": "Reinicie qualquer serviço parado, confirme /health e explique uma falha de nome, uma de porta/serviço e uma de confiança TLS. Identifique explicitamente a extensão AD simulada."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Host com Python e navegador. AD é extensão opcional.",
          "costNote": "Nenhuma licença de nuvem obrigatória; não altere DNS de produção."
        },
        "sources": [
          {
            "label": "DNS Windows Server",
            "url": "https://learn.microsoft.com/en-us/windows-server/networking/dns/dns-top"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "beginner",
        "technologies": [
          "dns",
          "tls"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-route"
        ],
        "challenge": "Explique uma hipótese de falha de Redes, DNS, TLS e certificados. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Diagrama de rede, DNS e TLS verificados"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Nome, conexão e confiança: como você explicaria a decisão observada a outra pessoa?",
          "answer": "DNS transforma nome em endereço. TCP testa conexão com uma porta. TLS verifica identidade do servidor, validade e cadeia de confiança. Um deles funcionar não comprova os outros."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-0-3",
        "title": "PowerShell, APIs e JSON",
        "url": "https://learn.microsoft.com/pt-br/powershell/scripting/overview",
        "study": [
          {
            "topic": "Objetos e automação",
            "detail": "PowerShell encadeia objetos, não apenas texto. Select-Object escolhe propriedades; ConvertTo-Json serializa e Export-Csv gera tabela. Reimportar o arquivo valida se o formato preserva a informação pretendida."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Uma API combina método, URL, autenticação e corpo. Diferencie 401 de 403, siga paginação e trate 429 respeitando Retry-After. Automatizar sem checar resultado só repete erros mais rápido."
          }
        ],
        "practice": [],
        "evidence": "Script versionado com exportação CSV/JSON",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "PowerShell · host pessoal",
          "platformUrl": "https://learn.microsoft.com/pt-br/powershell/scripting/overview",
          "where": "Terminal → PowerShell",
          "steps": [
            {
              "id": "prepare",
              "title": "Preparar PowerShell",
              "text": "No Windows use Windows PowerShell ou PowerShell 7. No Linux/macOS instale PowerShell 7 pela documentação oficial; Get-Service é específico do Windows. Confira versão antes de copiar comandos.",
              "command": "$PSVersionTable.PSVersion"
            },
            {
              "id": "script",
              "title": "Criar inventário completo",
              "text": "Salve o bloco em inventario.ps1. O endpoint /health pertence ao kit local; inicie server.py antes da chamada. O script consulta somente saúde e processos, não usa token.",
              "command": "$ErrorActionPreference = 'Stop'\ntry {\n  $items = @(Get-Process | Select-Object -First 5 Name, Id)\n  $items | ConvertTo-Json | Set-Content ./processos.json -Encoding utf8\n  $items | Export-Csv ./processos.csv -NoTypeInformation -Encoding utf8\n  $health = Invoke-RestMethod -Uri 'http://localhost:8765/health'\n  Write-Output $health.status\n  Write-Output (Import-Csv ./processos.csv).Count\n} catch {\n  Write-Error ('Falha controlada: ' + $_.Exception.Message)\n  exit 1\n}",
              "expected": "status ok e contagem do CSV correspondente aos processos exportados."
            },
            {
              "id": "execute",
              "title": "Executar e reimportar",
              "text": "Execute no diretório pessoal do laboratório. Não mude a política de execução global para contornar bloqueio; use sessão/arquivo autorizado conforme seu sistema.",
              "command": "./inventario.ps1\nGet-Content ./processos.json -Raw | ConvertFrom-Json",
              "expected": "Objetos podem ser lidos de volta e nomes/IDs correspondem ao inventário."
            },
            {
              "id": "negative",
              "title": "Gerar e diagnosticar falha",
              "text": "Pare apenas o servidor Aurora e repita: o catch deve indicar conexão indisponível. Reinicie e repita com sucesso. Não publique logs de processos reais se contiverem dados do seu trabalho."
            },
            {
              "id": "save",
              "title": "Guardar versão e resultado",
              "text": "Mantenha o script e evidências sanitizadas em uma pasta pessoal; não é necessário colocar a documentação no repositório do portal. Paginação de API será trabalhada no Graph."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "PowerShell e kit Aurora em execução para /health.",
          "costNote": "Sem licença de nuvem. Instalação de PowerShell varia conforme o sistema."
        },
        "sources": [
          {
            "label": "Microsoft Graph PowerShell",
            "url": "https://learn.microsoft.com/en-us/powershell/microsoftgraph/overview"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "beginner",
        "technologies": [
          "powershell",
          "json"
        ],
        "tracks": [
          "microsoft",
          "premium",
          "local"
        ],
        "prerequisiteIds": [
          "prep-route"
        ],
        "challenge": "Explique uma hipótese de falha de PowerShell, APIs e JSON. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Script versionado com exportação CSV/JSON"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Objetos e automação: como você explicaria a decisão observada a outra pessoa?",
          "answer": "PowerShell encadeia objetos, não apenas texto. Select-Object escolhe propriedades; ConvertTo-Json serializa e Export-Csv gera tabela. Reimportar o arquivo valida se o formato preserva a informação pretendida."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      }
    ],
    "environment": "Kit Aurora para autorização e automação; tenant de teste apenas na lição de usuários Entra.",
    "outcome": "Inventário, matriz de acesso, decisões 200/401/403, DNS/TLS e script de inventário.",
    "requirements": "A preparação local não depende de AD nem de licença cloud.",
    "number": 1,
    "difficulty": "beginner"
  },
  {
    "id": "p1",
    "title": "Active Directory e LDAP",
    "desc": "Diretório corporativo, autenticação e políticas.",
    "items": [
      {
        "id": "iam-1-0",
        "title": "AD DS, LDAP e estrutura",
        "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-",
        "study": [
          {
            "topic": "O diretório organiza e autentica",
            "detail": "Uma floresta contém domínios; cada domínio tem controladores. OUs organizam objetos e escopo de políticas, mas não são grupos de autorização. LDAP consulta o diretório; DNS permite descobrir os serviços."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Use aurora.test apenas dentro do laboratório. No híbrido, planeje UPN e correspondência com o domínio verificado/onmicrosoft do tenant; nomes DNS de AD e nomes de login cloud não são intercambiáveis por acidente."
          }
        ],
        "practice": [],
        "evidence": "Floresta criada ou validada, cliente ingressado, login de Ana e consulta de diretório reproduzidos.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Windows Server · instalação ou domínio existente",
          "platformUrl": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-",
          "where": "DC01 e CL01 → PowerShell administrativo",
          "steps": [
            {
              "id": "existing",
              "title": "Escolher caminho novo ou existente",
              "text": "Se já existe domínio de laboratório, execute Get-ADDomain com módulo AD e confira DNS/backup; não repita promoção. Em servidor novo, Get-ADDomain pode nem existir: isso não é falha de uma instalação ainda não realizada.",
              "command": "",
              "expected": ""
            },
            {
              "id": "install",
              "title": "Instalar AD DS em servidor novo",
              "text": "Somente em DC01 novo e isolado: renomeie o host, reinicie se necessário, confirme IP fixo 192.168.56.10 e instale a função.",
              "command": "Install-WindowsFeature AD-Domain-Services -IncludeManagementTools",
              "expected": "Função e ferramentas instaladas; servidor ainda não é controlador até a promoção."
            },
            {
              "id": "promote",
              "title": "Promover a nova floresta",
              "text": "No caminho novo, execute o comando. Digite uma senha DSRM segura quando solicitado. O servidor reinicia; guarde a senha fora das evidências. Não use -Force para pular avaliação.",
              "command": "Install-ADDSForest -DomainName \"aurora.test\" -DomainNetbiosName \"AURORA\" -InstallDNS",
              "expected": "Após reiniciar, login administrativo do domínio e Get-ADDomain funcionam."
            },
            {
              "id": "objects",
              "title": "Criar OU, grupo e usuário piloto",
              "text": "No AD Users and Computers, crie OU Aurora e subOUs Financeiro, Jurídico e TI. Em Financeiro crie fin.ana e grupo GG-FIN-LEITURA; adicione Ana. Escolha senha segura e habilite a conta. Contas cloud anteriores não aparecem automaticamente no AD.",
              "command": "",
              "expected": ""
            },
            {
              "id": "join",
              "title": "Ingressar o cliente",
              "text": "Em CL01 configure DNS para 192.168.56.10. Verifique descoberta e ingresse usando credencial do domínio somente no prompt. Reinicie e entre como AURORA\\fin.ana.",
              "command": "Resolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.aurora.test\nAdd-Computer -DomainName aurora.test -Credential (Get-Credential) -Restart",
              "expected": "SRV encontra DC01; cliente aparece no domínio e o login de Ana funciona."
            },
            {
              "id": "query",
              "title": "Consultar e diagnosticar",
              "text": "No DC execute as consultas; no cliente use whoami /fqdn e nltest /dsgetdc:aurora.test. LDAP pode ser observado pelo ADSI Edit somente para leitura; não altere schema.",
              "command": "Get-ADDomain\nGet-ADUser fin.ana -Properties Department\ndcdiag /test:dns",
              "expected": "Domínio e identidade identificados; DNS consistente. Em floresta de um DC, ausência de parceiros de replicação é esperada."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "VM Windows Server AD DS existente",
          "costNote": "Requer Windows Server válido e AD DS em VM/rede isolada; não exige licença Microsoft Entra."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "beginner",
        "technologies": [
          "active directory",
          "ldap",
          "windows"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-windows"
        ],
        "challenge": "Explique uma hipótese de falha de AD DS, LDAP e estrutura. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "CL01 descobre o DC por DNS e Ana entra com conta de domínio."
          },
          {
            "id": "negative-case",
            "text": "Uma conta inválida não autentica; a consulta LDAP encontra a conta correta."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "O diretório organiza e autentica: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Uma floresta contém domínios; cada domínio tem controladores. OUs organizam objetos e escopo de políticas, mas não são grupos de autorização. LDAP consulta o diretório; DNS permite descobrir os serviços."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-1-1",
        "title": "Kerberos, NTLM e DNS",
        "url": "https://learn.microsoft.com/pt-br/windows-server/security/kerberos/kerberos-authentication-overview",
        "study": [
          {
            "topic": "Tickets evitam reenviar a senha a cada serviço",
            "detail": "O KDC emite um TGT; o cliente o usa para pedir um ticket para um serviço identificado pelo SPN. O recurso valida esse ticket. klist ajuda a observar a diferença entre login inicial e acesso ao serviço."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "NTLM é um mecanismo legado com outros riscos e dependências. Registre onde aparece antes de restringi-lo; bloquear sem inventário pode interromper sistemas. Nunca altere o relógio do DC para fabricar uma falha."
          }
        ],
        "practice": [],
        "evidence": "Tickets Kerberos e eventos de logon identificados",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Windows Server / Event Viewer",
          "platformUrl": "https://learn.microsoft.com/pt-br/windows-server/security/kerberos/kerberos-authentication-overview",
          "where": "Visualizador de Eventos → Logs do Windows → Segurança",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra a ferramenta local indicada em «Windows Server / Event Viewer» no computador ou VM de laboratório. Caminho de referência: Visualizador de Eventos → Logs do Windows → Segurança. Use conta autorizada do ambiente de teste. Não é necessário entrar no tenant Entra para executar esta etapa local.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Autentique usuário de teste no domínio e identifique tickets com klist.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Use uma conta comum do domínio no cliente e execute klist antes e depois de acessar um recurso autenticado do laboratório.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "No DC, abra Event Viewer → Windows Logs → Security e filtre eventos relevantes como 4768, 4769, 4771 e 4625 conforme auditoria habilitada.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Execute w32tm /query /status e nslookup NOME-DO-DC; registre sincronização de horário e resolução do KDC.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Simule erro de nome inexistente, sem alterar o relógio do controlador; explique como falhas DNS/tempo afetam tickets e como diagnosticar sem comprometer o domínio.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Verifique hora do cliente e DC com w32tm /query /status; examine eventos de autenticação no Event Viewer e SPN com setspn -L para conta de teste.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "VM Windows Server AD DS existente",
          "costNote": "Requer AD DS e Windows Server; Kerberos/NTLM e DNS são recursos locais. Não desative NTLM em produção para testar."
        },
        "sources": [
          {
            "label": "Kerberos no Windows Server",
            "url": "https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "beginner",
        "technologies": [
          "kerberos",
          "dns",
          "windows"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-1-0"
        ],
        "challenge": "Explique uma hipótese de falha de Kerberos, NTLM e DNS. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Tickets Kerberos e eventos de logon identificados"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Tickets evitam reenviar a senha a cada serviço: como você explicaria a decisão observada a outra pessoa?",
          "answer": "O KDC emite um TGT; o cliente o usa para pedir um ticket para um serviço identificado pelo SPN. O recurso valida esse ticket. klist ajuda a observar a diferença entre login inicial e acesso ao serviço."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-1-2",
        "title": "GPO, delegação e ACL",
        "url": "https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview",
        "study": [
          {
            "topic": "Política e delegação têm escopos",
            "detail": "GPO aplica configurações a usuários/computadores conforme vínculo, herança e filtros. Delegação concede ações administrativas em objetos. Uma GPO na OU errada pode não atingir o cliente mesmo que o editor mostre a configuração."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Delegue reset de senha na OU piloto a LAB-SUPORTE. O mesmo operador deve falhar ao tentar alterar uma OU fora do escopo. Permissão mínima exige teste permitido e teste negado."
          }
        ],
        "practice": [],
        "evidence": "Relatório gpresult e delegação validada",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Group Policy Management",
          "platformUrl": "https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview",
          "where": "Gerenciador do Servidor → Ferramentas → Gerenciamento de Política de Grupo",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "No controlador ou estação RSAT autorizada, abra Server Manager → Tools → Group Policy Management (GPMC). Faça uma GPO somente na OU piloto; não vincule à raiz do domínio e não altere a Default Domain Policy para este exercício.",
              "command": "",
              "expected": ""
            },
            {
              "id": "gpo-exact",
              "title": "Definir GPO de bloqueio",
              "text": "Crie a OU Aurora-Piloto e mova somente CL01 para ela. Crie LAB-Bloqueio-Tela e vincule à OU. Configure Computer Configuration → Policies → Windows Settings → Security Settings → Local Policies → Security Options → Interactive logon: Machine inactivity limit = 300 segundos. Crie C:\\Temp no cliente antes de gpresult /h. Crie LAB-SUPORTE e um operador de teste antes da delegação.",
              "command": "New-Item -ItemType Directory -Force C:\\Temp",
              "expected": "Após gpupdate, gpresult mostra a GPO aplicada ao computador CL01."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Crie GPO simples para configuração de tela de bloqueio em OU piloto.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Em Group Policy Management, crie GPO LAB-Bloqueio-Tela vinculada somente à OU piloto; registre a configuração exata escolhida.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "No cliente da OU execute gpupdate /force e gpresult /h C:\\Temp\\lab-gpo.html; confira GPO aplicada e escopo.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Delegue em OU piloto apenas a ação de redefinir senha ao grupo LAB-SUPORTE (se criado), usando Delegation of Control Wizard.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Com conta sem delegação confirme negação; com conta delegada confirme somente a ação prevista; reverta permissões de teste após coletar evidência.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Execute gpresult /r e gpupdate /force no cliente; confira vínculo da GPO, herança, filtro de segurança e OU correta.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "VM Windows Server AD DS existente",
          "costNote": "GPO requer AD DS e cliente Windows compatível; delegação deve ser testada em OU isolada."
        },
        "sources": [
          {
            "label": "Visão geral de GPO e OUs",
            "url": "https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "beginner",
        "technologies": [
          "active directory",
          "gpo",
          "windows"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-1-1"
        ],
        "challenge": "Explique uma hipótese de falha de GPO, delegação e ACL. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Relatório gpresult e delegação validada"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Política e delegação têm escopos: como você explicaria a decisão observada a outra pessoa?",
          "answer": "GPO aplica configurações a usuários/computadores conforme vínculo, herança e filtros. Delegação concede ações administrativas em objetos. Uma GPO na OU errada pode não atingir o cliente mesmo que o editor mostre a configuração."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-1-3",
        "title": "Hardening, contas de serviço e gMSA",
        "url": "https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts-overview",
        "study": [
          {
            "topic": "Serviços não devem usar contas humanas privilegiadas",
            "detail": "Uma gMSA tem senha gerenciada pelo AD e limita quais hosts podem obtê-la. Isso reduz manejo manual, mas não corrige permissões excessivas. O serviço precisa suportar essa conta e o host precisa ser autorizado."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "LAPS gerencia senha de administrador local; gMSA serve identidades de serviço no domínio. KDS e compatibilidade são pré-requisitos de gMSA. Não executar uma etapa não significa que ela funcionou."
          }
        ],
        "practice": [],
        "evidence": "Inventário de privilégios e conta de serviço controlada",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Active Directory Users and Computers",
          "platformUrl": "https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts-overview",
          "where": "Gerenciador do Servidor → Ferramentas → Usuários e Computadores do Active Directory",
          "steps": [
            {
              "id": "prerequisites",
              "title": "Conferir suporte",
              "text": "Use AD DS do laboratório e um host membro separado com serviço que suporte gMSA, por exemplo uma tarefa agendada compatível. Domínio e host precisam atender aos requisitos oficiais; execute em PowerShell com módulo ActiveDirectory e privilégios autorizados.",
              "command": "",
              "expected": ""
            },
            {
              "id": "kds",
              "title": "Verificar chave KDS",
              "text": "No DC consulte Get-KdsRootKey. Se não existir, crie com Add-KdsRootKey -EffectiveImmediately e aguarde a janela de replicação indicada no guia (até 10 horas). Não retrodate em domínio compartilhado para contornar espera.",
              "command": "Get-KdsRootKey",
              "expected": "Chave existente e efetiva antes de criar a conta."
            },
            {
              "id": "create",
              "title": "Criar e autorizar o host",
              "text": "Substitua CL01 pelo host membro que realmente executará o serviço. Não use grupo contendo todos os computadores.",
              "command": "New-ADServiceAccount -Name svcAurora -DNSHostName svcAurora.aurora.test -PrincipalsAllowedToRetrieveManagedPassword (Get-ADComputer CL01)",
              "expected": "gMSA criada com um host autorizado."
            },
            {
              "id": "install",
              "title": "Instalar no host membro",
              "text": "No host autorizado com RSAT/módulo AD, execute os comandos. Se o host não tem o módulo, instale o RSAT compatível com sua edição pelo gerenciamento de recursos opcionais.",
              "command": "Install-ADServiceAccount svcAurora\nTest-ADServiceAccount svcAurora",
              "expected": "Test-ADServiceAccount retorna True; no host não autorizado deve falhar."
            },
            {
              "id": "consumer",
              "title": "Configurar consumidor compatível",
              "text": "Em uma tarefa agendada de teste no host autorizado, use a identidade AURORA\\svcAurora$ com LogonType Password via New-ScheduledTaskPrincipal; não informe senha. Configure ação de baixo impacto, como gravar data em arquivo local com ACL limitada. Valide o direito Log on as a batch job conforme política e execute a tarefa.",
              "command": "",
              "expected": ""
            },
            {
              "id": "verify",
              "title": "Testar e remover",
              "text": "Confirme identidade no log da tarefa, arquivo de saída e permissões mínimas. Não conceda Domain Admins para resolver falha. Remova tarefa de teste antes de remover a conta; reverta delegações adicionais.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "VM Windows Server AD DS existente",
          "costNote": "gMSA requer AD DS e requisitos de domínio/KDS; valide compatibilidade do sistema e não reutilize contas de serviço reais."
        },
        "sources": [
          {
            "label": "Contas de serviço gerenciadas de grupo",
            "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/getting-started-with-group-managed-service-accounts"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "beginner",
        "technologies": [
          "gmsa",
          "active directory"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-1-2"
        ],
        "challenge": "Explique uma hipótese de falha de Hardening, contas de serviço e gMSA. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Inventário de privilégios e conta de serviço controlada"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Serviços não devem usar contas humanas privilegiadas: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Uma gMSA tem senha gerenciada pelo AD e limita quais hosts podem obtê-la. Isso reduz manejo manual, mas não corrige permissões excessivas. O serviço precisa suportar essa conta e o host precisa ser autorizado."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      }
    ],
    "environment": "Windows Server para AD DS, cliente Windows e DNS interno em rede isolada.",
    "outcome": "Domínio funcional com OUs, grupos, contas piloto, GPO e auditoria.",
    "requirements": "Windows Server de avaliação ou licença válida; recursos de virtualização.",
    "number": 2,
    "difficulty": "beginner"
  },
  {
    "id": "p2",
    "title": "Microsoft Entra e híbrido",
    "desc": "Identidades cloud, sincronização e administração.",
    "items": [
      {
        "id": "iam-2-0",
        "title": "Tenant, roles e emergência",
        "url": "https://learn.microsoft.com/pt-br/entra/identity/role-based-access-control/security-emergency-access",
        "study": [
          {
            "topic": "Plano administrativo e recuperação",
            "detail": "Tenant é a fronteira de administração do diretório cloud. Separe conta de uso cotidiano e conta privilegiada; atribua função apenas quando o exercício exigir. Global Administrator não deve ser a solução padrão para qualquer erro."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Mantenha duas contas cloud-only de emergência, independentes do AD/federação, com autenticação resistente a phishing, custódia e monitoramento. Revise o procedimento antes de depender delas numa indisponibilidade."
          }
        ],
        "practice": [],
        "evidence": "Papéis mínimos e procedimento de emergência",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra admin center",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Entra ID → Funções e administradores / Usuários",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://entra.microsoft.com, entre com a conta exclusiva do laboratório e navegue até: Entra ID → Funções e administradores. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Crie ou prepare tenant de laboratório e duas identidades não administrativas.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Na seção Entra ID → Roles and administrators, compare Global Administrator, User Administrator e Global Reader. Para um desenho corporativo resiliente, planeje no mínimo DUAS contas de emergência distintas, somente na nuvem e com domínio *.onmicrosoft.com, não federadas nem sincronizadas.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Se a infraestrutura e a custódia estiverem adequadas, prepare adm.emergencia e adm.emergencia2 como contas cloud-only separadas das contas operacionais; a Microsoft recomenda Global Administrator ativo para contas de emergência, métodos resistentes a phishing e monitoramento. Não conceda privilégios elevados sem controles e autorização.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Revise custódia, MFA resistente a phishing, alertas e exclusões de políticas que bloqueiem a recuperação. Não use dispositivo pessoal como único fator de emergência.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Teste com sessão controlada a acessibilidade da conta sem mudar políticas de produção. Registre conta, papel, método de autenticação, responsável e ciclo de validação; nunca divulgue credenciais.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Verifique funções e métodos de cada conta de emergência; teste login controlado e alertas, nunca a remoção do único administrador.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Entra ID + AD DS existente",
          "costNote": "Funções básicas do Entra disponíveis conforme tenant; contas de emergência devem ser cloud-only, monitoradas e sob custódia segura."
        },
        "sources": [
          {
            "label": "Contas de emergência Microsoft",
            "url": "https://learn.microsoft.com/pt-br/entra/identity/role-based-access-control/security-emergency-access"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "rbac"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-1-0"
        ],
        "challenge": "Explique uma hipótese de falha de Tenant, roles e emergência. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Papéis mínimos e procedimento de emergência"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Plano administrativo e recuperação: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Tenant é a fronteira de administração do diretório cloud. Separe conta de uso cotidiano e conta privilegiada; atribua função apenas quando o exercício exigir. Global Administrator não deve ser a solução padrão para qualquer erro."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-2-1",
        "title": "Entra Connect e Cloud Sync",
        "url": "https://learn.microsoft.com/pt-br/entra/identity/hybrid/cloud-sync/what-is-cloud-sync",
        "study": [
          {
            "topic": "Sincronização precisa de uma origem definida",
            "detail": "O AD pode ser autoritativo para os atributos sincronizados. Editar no destino pode ser sobrescrito. Defina identificador, UPN e escopo piloto antes de sincronizar; matching incorreto cria duplicação ou liga contas erradas."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Connect Sync e Cloud Sync não são instalações equivalentes nem têm a mesma matriz de recursos. Este laboratório usa Cloud Sync; selecione a documentação e o agente correspondentes. Propagar senha não implica habilitar writeback."
          }
        ],
        "practice": [],
        "evidence": "Conta piloto sincronizada e logs da alteração",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / Cloud Sync",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Entra ID → Entra Connect → Sincronização na nuvem",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "No https://entra.microsoft.com, entre com papel Hybrid Identity Administrator (não convidado). Navegue até Entra ID → Entra Connect → Cloud sync. Para instalação do agente, abra Agents → Download on-premises agent. O portal pode estar em inglês ou português.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Confirme domínio AD, atributos UPN/proxyAddresses, servidor Windows membro do domínio com versão compatível, conectividade TLS e conta de administração para criar gMSA. O agente é suportado em DC, mas um servidor dedicado endurecido reduz interferências; com 16 GB, avalie o consumo antes de iniciar outra VM.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Inventarie atributos de uma conta piloto no AD e compare com possíveis contas cloud existentes. Não sincronize usuários duplicados ou administrativos sem planejar correspondência, origem autoritativa e escopo.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Instale o agente de provisionamento Microsoft Entra Cloud Sync conforme guia oficial, forneça contas administrativas somente durante a configuração e confirme que o agente aparece ativo no portal; não confunda instalar agente com habilitar sincronização.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "No portal, selecione Nova configuração → AD to Microsoft Entra ID sync; escolha domínio, filtros de escopo OU OU grupo piloto (não ambos juntos), mapeamento e Teste sob demanda. Habilite a configuração somente após validar o resultado com a conta descartável.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Modifique um atributo não sensível na conta piloto do AD; confira propagação na nuvem, logs e ausência de contas duplicadas. Teste desativação apenas com conta descartável e documente recuperação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confirme agente, conectividade e escopo de OU; compare objetos locais e sincronizados e leia logs do agente antes de alterar regras.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Entra ID + AD DS existente",
          "costNote": "Cloud Sync exige agente e AD DS compatível; confira licenças e pré-requisitos do cenário de sincronização e eventual writeback."
        },
        "sources": [
          {
            "label": "Pré-requisitos do Cloud Sync",
            "url": "https://learn.microsoft.com/pt-br/entra/identity/hybrid/cloud-sync/how-to-prerequisites"
          },
          {
            "label": "Instalação do agente",
            "url": "https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/how-to-install"
          },
          {
            "label": "Configuração de escopo e teste",
            "url": "https://learn.microsoft.com/pt-br/entra/identity/hybrid/cloud-sync/how-to-configure"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "active directory",
          "cloud sync"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-2-0"
        ],
        "challenge": "Explique uma hipótese de falha de Entra Connect e Cloud Sync. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Conta piloto sincronizada e logs da alteração"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Sincronização precisa de uma origem definida: como você explicaria a decisão observada a outra pessoa?",
          "answer": "O AD pode ser autoritativo para os atributos sincronizados. Editar no destino pode ser sobrescrito. Defina identificador, UPN e escopo piloto antes de sincronizar; matching incorreto cria duplicação ou liga contas erradas."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-2-2",
        "title": "MFA, FIDO2 e passkeys",
        "url": "https://learn.microsoft.com/pt-br/entra/identity/authentication/concept-authentication-passwordless",
        "study": [
          {
            "topic": "Registrar um fator não é exigi-lo",
            "detail": "Métodos habilitados permitem registro; a política de acesso determina quando são exigidos. MFA por código pode ser alvo de phishing. FIDO2/passkeys vincula a autenticação à origem e permite resistência a phishing quando usado corretamente."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Planeje perda do autenticador e recuperação sem criar um atalho inseguro. Diferencie capacidade do método, compatibilidade do dispositivo e licença da política que o exige."
          }
        ],
        "practice": [],
        "evidence": "MFA/passkey testado com evidência",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / Authentication methods",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Entra ID → Segurança → Métodos de autenticação → Políticas",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "No portal https://entra.microsoft.com, acesse Entra ID → Security (Segurança) → Authentication methods (Métodos de autenticação) → Policies. A habilitação de Passkey (FIDO2) requer função compatível, como Authentication Policy Administrator.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Confirme se o tenant possui método FIDO2 habilitável, grupo piloto e dispositivo autenticador compatível. Passkeys FIDO2 estão disponíveis inclusive no Entra ID Free; exigir passkeys via Conditional Access pode requerer P1.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Examine os perfis de passkey e defina escopo somente para conta piloto. Alterações na política global de passkeys afetam o tenant; não ative indiscriminadamente.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Habilite o método permitido para grupo piloto e, quando elegível, registre a passkey na página de informações de segurança do usuário. Não use credenciais reais de terceiros.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Faça login de teste com método configurado; diferencie uma autenticação resistente a phishing de uma simples verificação por código. Não exponha códigos, chaves ou registros do autenticador.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Teste tentativa sem o método apropriado somente em escopo controlado. Registre tipo de método, dispositivo, data e logs. Sem P1, não alegue imposição por política de acesso condicional.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confira políticas de métodos de autenticação, registro FIDO2, conta piloto e log de entrada. Não confunda registro de método com exigência por Conditional Access.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Entra ID + AD DS existente",
          "costNote": "Passkeys FIDO2 fazem parte do Entra ID Free. A imposição por Conditional Access, entretanto, exige licença apropriada, normalmente P1."
        },
        "sources": [
          {
            "label": "Passkeys FIDO2: configuração e licenças",
            "url": "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-enable-passkey-fido2"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "mfa",
          "fido2"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-2-1"
        ],
        "challenge": "Explique uma hipótese de falha de MFA, FIDO2 e passkeys. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: MFA/passkey testado com evidência"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Registrar um fator não é exigi-lo: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Métodos habilitados permitem registro; a política de acesso determina quando são exigidos. MFA por código pode ser alvo de phishing. FIDO2/passkeys vincula a autenticação à origem e permite resistência a phishing quando usado corretamente."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-2-3",
        "title": "SSPR e proteção de identidade",
        "url": "https://learn.microsoft.com/pt-br/entra/identity/authentication/concept-sspr-howitworks",
        "study": [
          {
            "topic": "Recuperação também é uma decisão de confiança",
            "detail": "Alterar senha conhecida é diferente de redefinir uma esquecida. SSPR exige métodos registrados e licença elegível para o cenário. Writeback precisa devolver a alteração ao AD e tem requisitos próprios."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Uma recuperação bem-sucedida deve permitir novo login e deixar trilha de auditoria. O estado de risco e sessões existentes podem exigir ações adicionais; não prometa que mudar senha encerra toda sessão de qualquer app."
          }
        ],
        "practice": [],
        "evidence": "Fluxo SSPR e registros de recuperação",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / Password reset",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Entra ID → Redefinição de senha",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://entra.microsoft.com, entre com a conta exclusiva do laboratório e navegue até: Entra ID → Redefinição de senha. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Compare três cenários: alterar senha conhecida (cloud Free), redefinir senha esquecida (licença elegível, como Business Standard ou P1/P2) e writeback híbrido (P1/P2 ou Business Premium, com configuração compatível). Identifique qual o tenant realmente permite.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Em Entra → Password reset, consulte licenças e configuração atual antes de alterar escopo; escolha grupo piloto.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "No Entra ID Free, teste apenas alteração voluntária de senha cloud. Para redefinição de senha esquecida, confira licença elegível e métodos registrados antes de utilizar o portal oficial.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Se licenciada, teste redefinição com conta piloto e valide o login posterior. Não presuma que o writeback local funciona somente por existir sincronização.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Compare logs de recuperação, método usado e origem da identidade. Se o recurso não estiver licenciado, registre cenário como estudo documental; não marque execução real.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Teste usuário piloto licenciado, métodos de recuperação e eventual writeback; valide o resultado no Entra e no AD sem expor credenciais.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Entra ID + AD DS existente",
          "costNote": "Entra Free permite alteração de senha conhecida; recuperação de senha esquecida requer licença elegível. Writeback híbrido requer licenciamento e configuração adicionais."
        },
        "sources": [
          {
            "label": "Matriz de licenças SSPR",
            "url": "https://learn.microsoft.com/pt-br/entra/identity/authentication/concept-sspr-licensing"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "sspr"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-2-2"
        ],
        "challenge": "Explique uma hipótese de falha de SSPR e proteção de identidade. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Fluxo SSPR e registros de recuperação"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Recuperação também é uma decisão de confiança: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Alterar senha conhecida é diferente de redefinir uma esquecida. SSPR exige métodos registrados e licença elegível para o cenário. Writeback precisa devolver a alteração ao AD e tem requisitos próprios."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-2-4",
        "title": "Conditional Access e Zero Trust",
        "url": "https://learn.microsoft.com/pt-br/entra/identity/conditional-access/plan-conditional-access",
        "study": [
          {
            "topic": "Acesso condicional avalia sinais e controles",
            "detail": "Uma política combina sujeitos, recursos, condições e controles. Report-only calcula o resultado sem impor o bloqueio. Security Defaults fornece proteção básica e não deve ser retirado antes de planejar sua substituição."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Teste um grupo pequeno e contas de emergência antes de ampliar. Políticas combinadas podem gerar efeito diferente de uma política isolada; consulte logs por usuário, app e horário para explicar a decisão."
          }
        ],
        "practice": [],
        "evidence": "Matriz de decisões e política piloto Report-only verificadas; registro do estado dos Security Defaults, licença P1, contas de emergência, plano de proteção equivalente e rollback. Se houver migração real, comprovar políticas-base ativas e testes positivos/negativos; caso contrário, marcar SIMULAÇÃO.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / Conditional Access",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Entra ID → Acesso Condicional → Políticas (localização pode variar)",
          "steps": [
            {
              "id": "verificar-licenca-tenant-e-autorizacao",
              "title": "Verificar licença, tenant e autorização",
              "text": "Entre em https://entra.microsoft.com com conta administrativa autorizada no tenant exclusivo de laboratório. Confirme Entra ID P1 ou Business Premium e função Conditional Access Administrator para gerenciar políticas. Risco baseado em usuário/login exige P2. Não ative trial pago automaticamente.",
              "command": "",
              "expected": ""
            },
            {
              "id": "registrar-security-defaults-antes-de-qualquer-alteracao",
              "title": "Registrar Security Defaults ANTES de qualquer alteração",
              "text": "Acesse Entra ID → Visão geral → Propriedades → Gerenciar padrões de segurança (Security defaults). Registre Habilitado/Desabilitado e capture evidência sanitizada. Security Defaults e políticas personalizadas de Conditional Access ativas não podem coexistir. Se não tiver P1 ou aprovação, mantenha Security Defaults habilitados e execute somente simulação/documentação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "garantir-acesso-de-emergencia-e-recuperacao",
              "title": "Garantir acesso de emergência e recuperação",
              "text": "Antes de alterar proteção, valide duas contas cloud-only *.onmicrosoft.com independentes do IdP/AD, protegidas por métodos resistentes a phishing e com custódia e monitoramento. Planeje exclusões das políticas que bloqueiam ou restringem entrada. Se não conseguir comprovar acesso de emergência, PARE e não desative Security Defaults.",
              "command": "",
              "expected": ""
            },
            {
              "id": "planejar-substituicao-equivalente-e-rollback",
              "title": "Planejar substituição equivalente e rollback",
              "text": "Documente as políticas-base para substituir Security Defaults: exigir MFA para usuários e administradores, MFA para administração Azure e bloquear autenticação legada; revise escopo, exceções, métodos registrados e impacto. Registre configurações existentes e o plano de reversão. Nunca deixe tenant real sem proteção equivalente.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-politicas-piloto-em-report-only",
              "title": "Preparar políticas piloto em Report-only",
              "text": "No Acesso Condicional, crie política nomeada LAB-CA-MFA-PILOTO, atribua somente grupo de usuários de teste, recurso de teste e controle Exigir MFA. Deixe Report-only. Não use todos os usuários/recursos sem plano aprovado. Confirme exclusões de emergência para políticas restritivas antes de qualquer ativação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-resultado-esperado-sem-impor-bloqueio",
              "title": "Testar resultado esperado sem impor bloqueio",
              "text": "Entre com usuário piloto e consulte Sign-in logs → Conditional Access → Report-only. Compare políticas aplicadas/não aplicadas e motivos. Report-only não bloqueia, não exige MFA interativo e não substitui proteção ativa.",
              "command": "",
              "expected": ""
            },
            {
              "id": "migrar-security-defaults-somente-com-protecao-pronta",
              "title": "Migrar Security Defaults somente com proteção pronta",
              "text": "SOMENTE no tenant de laboratório autorizado, com P1, acesso de emergência testado, políticas-base preparadas e plano aprovado: em Propriedades → Gerenciar padrões de segurança, desative Security Defaults, informe motivo de migração para Conditional Access e salve. Ative imediatamente políticas-base equivalentes após validação de impacto, em implantação controlada. Se o ambiente não permitir execução segura, documente esta etapa como SIMULAÇÃO e mantenha a proteção habilitada.",
              "command": "",
              "expected": ""
            },
            {
              "id": "validar-cenarios-positivos-e-negativos",
              "title": "Validar cenários positivos e negativos",
              "text": "Teste usuário piloto com MFA registrado, sem MFA, autenticação legada bloqueada e contas de emergência acessíveis. Registre data, resultado esperado/observado e logs. Não confunda efeito de Report-only com imposição real. Não declare migração completa se só criou política em modo relatório.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-e-recuperar-sem-perder-acesso",
              "title": "Diagnosticar e recuperar sem perder acesso",
              "text": "Se CA falhar, confira licença, Security Defaults, atribuições, exclusões, controles e logs. Para reverter política ativada, desabilite-a ou retire o grupo piloto com conta autorizada. Para retornar aos Security Defaults, a experiência Microsoft 365 pode exigir remover todas as políticas CA (inclusive Report-only); registre/exporte políticas antes, confira documentação atual e não apague configurações sem plano aprovado.",
              "command": "",
              "expected": ""
            },
            {
              "id": "evidenciar-a-entrega-e-estado-de-protecao",
              "title": "Evidenciar a entrega e estado de proteção",
              "text": "Crie LAB-iam-2-4.md com licença, estado anterior/posterior dos Security Defaults, lista de políticas-base, contas de emergência (sem segredos), matriz de testes, logs sanitizados, resultado real/simulado e rollback. Critério de aceite: tenant não fica desprotegido, Report-only validado e qualquer migração real possui MFA e proteção equivalente efetivamente habilitados.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Entra ID + AD DS existente",
          "costNote": "Conditional Access exige Microsoft Entra ID P1 ou licença que o inclua (por exemplo Microsoft 365 Business Premium). Risco de entrada/usuário exige P2. Security Defaults não podem coexistir habilitados com CA em execução."
        },
        "sources": [
          {
            "label": "Microsoft: gerenciar Security Defaults",
            "url": "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"
          },
          {
            "label": "Microsoft 365: migrar Security Defaults para CA",
            "url": "https://learn.microsoft.com/en-us/microsoft-365/admin/security-and-compliance/set-up-multi-factor-authentication?view=o365-worldwide"
          },
          {
            "label": "Planejar implantação de Conditional Access",
            "url": "https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access"
          },
          {
            "label": "Contas de acesso de emergência",
            "url": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "conditional access"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-2-3"
        ],
        "challenge": "Explique uma hipótese de falha de Conditional Access e Zero Trust. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Matriz de decisões e política piloto Report-only verificadas; registro do estado dos Security Defaults, licença P1, contas de emergência, plano de proteção equivalente e rollback. Se houver migração real, comprovar políticas-base ativas e testes positivos/negativos; caso contrário, marcar SIMULAÇÃO."
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Acesso condicional avalia sinais e controles: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Uma política combina sujeitos, recursos, condições e controles. Report-only calcula o resultado sem impor o bloqueio. Security Defaults fornece proteção básica e não deve ser retirado antes de planejar sua substituição."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      }
    ],
    "environment": "Domínio AD do módulo 02; tenant Microsoft Entra de teste; contas administrativas separadas.",
    "outcome": "Identidade híbrida piloto, MFA, recuperação e acesso condicional testados.",
    "requirements": "Tenant e licenças conforme o recurso; Cloud Sync requer servidor ingressado no domínio e agente compatível.",
    "number": 3,
    "difficulty": "intermediate"
  },
  {
    "id": "p3",
    "title": "Federação, SSO e protocolos",
    "desc": "Acesso a aplicações e confiança entre sistemas.",
    "items": [
      {
        "id": "iam-3-0",
        "title": "SAML 2.0 e federação",
        "url": "https://learn.microsoft.com/en-us/entra/identity/saas-apps/saml-toolkit-tutorial",
        "study": [
          {
            "topic": "A confiança SAML liga um IdP a um SP",
            "detail": "O IdP autentica e emite uma assertion; o SP valida assinatura, audiência, destinatário e tempo. Entity ID identifica a parte; ACS recebe a resposta. Copiar um ACS de outro aplicativo quebra o contrato de confiança."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "SSO autentica; o SP continua responsável por autorizar. Remover atribuição deve ser testado em nova sessão e com as regras de acesso do aplicativo. Certificado público de assinatura não é a chave privada."
          }
        ],
        "practice": [],
        "evidence": "SSO no SP escolhido e negação após retirada de atribuição observados; serviço externo e suas limitações registrados.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Entra + Microsoft Entra SAML Toolkit",
          "platformUrl": "https://learn.microsoft.com/en-us/entra/identity/saas-apps/saml-toolkit-tutorial",
          "where": "Entra → Enterprise apps → Microsoft Entra SAML Toolkit",
          "steps": [
            {
              "id": "availability",
              "title": "Conferir o SP escolhido",
              "text": "Este laboratório usa Microsoft Entra SAML Toolkit, um serviço externo de demonstração. Confira disponibilidade e requisitos no guia oficial. Registre somente identidades fictícias que você controla; se o serviço não estiver disponível, marque a atividade como simulação, sem inventar SSO executado.",
              "command": "",
              "expected": ""
            },
            {
              "id": "gallery",
              "title": "Adicionar o aplicativo",
              "text": "No Entra, adicione Microsoft Entra SAML Toolkit da galeria. Abra Single sign-on → SAML. O aplicativo tem identificador fixo e uma instância por tenant; não crie duplicatas.",
              "command": "",
              "expected": ""
            },
            {
              "id": "trust",
              "title": "Configurar a confiança",
              "text": "Use no portal do Toolkit SAML Configuration → Create. Transfira Login URL, Entra Identifier, Logout URL e certificado público Raw do Entra. Copie de volta os valores Sign-on URL, Identifier e ACS fornecidos pelo Toolkit para Basic SAML Configuration. A ACS indicada no guia é https://samltoolkit.azurewebsites.net/SAML/Consume; confira os valores retornados pela configuração atual.",
              "command": "",
              "expected": ""
            },
            {
              "id": "user",
              "title": "Vincular e atribuir usuário",
              "text": "Registre no Toolkit uma conta de teste correspondente à identidade Entra e atribua diretamente esse usuário ao aplicativo. Em Properties, confira User assignment required. Atribuição por grupo pode exigir P1/P2; usuário direto evita presumir essa licença.",
              "command": "",
              "expected": ""
            },
            {
              "id": "positive",
              "title": "Testar SSO iniciado pelo SP",
              "text": "Use Test this application ou abra Sign-on URL. Confira identidade autenticada e evento de entrada. A assertion deve ser validada pelo SP; somente visualizar XML não prova assinatura válida.",
              "command": "",
              "expected": ""
            },
            {
              "id": "negative",
              "title": "Testar retirada de atribuição",
              "text": "Encerre sessão do SP, remova atribuição de teste e faça novo login com assignment required. Espere negação. Restaure apenas o acesso necessário; documente certificado, audiência, ACS e efeito da sessão já existente.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Tenant Entra e serviço Microsoft Entra SAML Toolkit de demonstração.",
          "costNote": "Confira requisitos atuais e disponibilidade do serviço externo antes de iniciar. Não publique assertions ou dados reais."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://learn.microsoft.com/en-us/entra/identity/saas-apps/saml-toolkit-tutorial"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "saml",
          "entra"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-0-0"
        ],
        "challenge": "Explique uma hipótese de falha de SAML 2.0 e federação. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: SSO no SP escolhido e negação após retirada de atribuição observados; serviço externo e suas limitações registrados."
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "A confiança SAML liga um IdP a um SP: como você explicaria a decisão observada a outra pessoa?",
          "answer": "O IdP autentica e emite uma assertion; o SP valida assinatura, audiência, destinatário e tempo. Entity ID identifica a parte; ACS recebe a resposta. Copiar um ACS de outro aplicativo quebra o contrato de confiança."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-3-1",
        "title": "OAuth 2.0 e OpenID Connect",
        "url": "https://www.rfc-editor.org/rfc/rfc9700.html",
        "study": [
          {
            "topic": "OAuth autoriza; OIDC comunica identidade",
            "detail": "O cliente recebe um authorization code e troca por tokens usando PKCE S256. state liga a resposta à transação; nonce ajuda a vincular o ID token. O cliente valida o ID token; a API valida o access token para sua audiência."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Na Aurora, o emissor é o realm aurora e o cliente é aurora-web. A API exige audiência aurora-api e consulta conta ativa/departamento. Decodificar JWT não comprova assinatura; a verificação usa as chaves JWKS do emissor configurado."
          }
        ],
        "practice": [],
        "evidence": "Code+PKCE observado, verificação criptográfica identificada e testes 200/403/401/400 registrados.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Keycloak + cliente Aurora",
          "platformUrl": "https://www.rfc-editor.org/rfc/rfc9700.html",
          "where": "http://localhost:8080 e http://localhost:8765",
          "steps": [
            {
              "id": "prepare",
              "title": "Conferir os serviços",
              "text": "Use o kit iniciado em Preparação. No realm aurora confira cliente aurora-web público, Standard flow habilitado, Direct access grants desabilitado e redirect URI exata http://localhost:8765/callback.",
              "command": "",
              "expected": ""
            },
            {
              "id": "discovery",
              "title": "Ler descoberta",
              "text": "Abra a URL de descoberta e identifique issuer, authorization_endpoint, token_endpoint e jwks_uri. Emissor e endpoints devem apontar ao mesmo realm.",
              "command": "http://localhost:8080/realms/aurora/.well-known/openid-configuration",
              "expected": "issuer termina em /realms/aurora; JWKS pertence ao emissor configurado."
            },
            {
              "id": "pkce",
              "title": "Observar a autorização",
              "text": "Inicie login pela aplicação. Na requisição de autorização confira response_type=code, client_id=aurora-web e code_challenge_method=S256. Não copie code nem cookies para as evidências.",
              "command": "",
              "expected": ""
            },
            {
              "id": "validation",
              "title": "Entender a validação executada",
              "text": "Em server.py, leia verify(): algoritmo RS256, assinatura, issuer, audience, exp e nonce do ID token. /callback verifica state ligado a cookie da transação e troca code com code_verifier. Tokens ficam no servidor, não no localStorage.",
              "command": "",
              "expected": ""
            },
            {
              "id": "api",
              "title": "Verificar autorização na API",
              "text": "Após login, acesse FIN e JUR. O access token deve conter audiência aurora-api adicionada pelo mapper do cliente; API verifica a assinatura e consulta o cadastro SCIM.",
              "command": "",
              "expected": ""
            },
            {
              "id": "negative",
              "title": "Testar callback e sessão inválidos",
              "text": "Abra /callback?state=invalido: espere 400. Em janela privada, /api/financeiro deve dar 401. Para callback incorreto, altere somente a redirect URI permitida no cliente de teste, tente login e depois restaure a URI exata.",
              "command": "",
              "expected": ""
            },
            {
              "id": "restore",
              "title": "Reverter e repetir",
              "text": "Restaure callback exato, faça novo login e confira FIN 200/JUR 403 para Ana do joiner.csv. Não use wildcard para corrigir erro de URI.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Kit Aurora iniciado: aplicação/API local e Keycloak.",
          "costNote": "Python 3.11+ e Docker/Compose. Sem tenant cloud. Todos os dados devem ser fictícios; não exponha o kit na internet."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://www.rfc-editor.org/rfc/rfc9700.html"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "oidc",
          "oauth",
          "keycloak"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-local"
        ],
        "challenge": "Explique uma hipótese de falha de OAuth 2.0 e OpenID Connect. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "Code+PKCE S256 e callback exato funcionam no cliente aurora-web."
          },
          {
            "id": "negative-case",
            "text": "state inválido é rejeitado e API sem token/sessão responde 401."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "OAuth autoriza; OIDC comunica identidade: como você explicaria a decisão observada a outra pessoa?",
          "answer": "O cliente recebe um authorization code e troca por tokens usando PKCE S256. state liga a resposta à transação; nonce ajuda a vincular o ID token. O cliente valida o ID token; a API valida o access token para sua audiência."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": true
      },
      {
        "id": "iam-3-2",
        "title": "Provisionamento SCIM",
        "url": "https://www.rfc-editor.org/rfc/rfc7644.html",
        "study": [
          {
            "topic": "SCIM transporta ciclo de vida, não faz login",
            "detail": "O cliente de provisionamento cria e atualiza contas em um servidor SCIM. id é atribuído pelo destino; externalId correlaciona com RH. active=false desativa o cadastro, mas o efeito nas sessões depende da aplicação."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "O kit implementa um subconjunto didático: Users, filtros exatos, paginação e PATCH replace. Não é uma suíte de conformidade SCIM. Comunicação com Entra requer um destino suportado e alcançável de forma segura; localhost não é endpoint da nuvem."
          }
        ],
        "practice": [],
        "evidence": "Consulta, PATCH e desativação executados; 401 e ausência de duplicação confirmados.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "SCIM didático da Aurora",
          "platformUrl": "https://www.rfc-editor.org/rfc/rfc7644.html",
          "where": "http://localhost:8765/scim/v2/Users",
          "steps": [
            {
              "id": "scope",
              "title": "Identificar o contrato",
              "text": "O kit oferece Users, filtros exatos e replace; não implementa todo SCIM. O bearer token está em .env e só é usado localmente. O CSV usa employeeId como externalId.",
              "command": "",
              "expected": ""
            },
            {
              "id": "read",
              "title": "Consultar por identidade imutável",
              "text": "Use Python no terminal da pasta do kit. O helper lê o token sem imprimi-lo.",
              "command": "from jml import request, cfg\nprint(request('http://localhost:8765/scim/v2/Users?filter=externalId%20eq%20%22E001%22', token=cfg['SCIM_TOKEN']))",
              "expected": "totalResults=1 depois de aplicar joiner.csv; o id do destino é diferente de externalId E001."
            },
            {
              "id": "patch",
              "title": "Examinar o PATCH completo",
              "text": "Em jml.py, encontre schemas PatchOp e Operations. O desligamento substitui active por false e a transferência altera o departamento da extensão enterprise. Alterar somente JSON em um editor não executa o request.",
              "command": "{\"schemas\":[\"urn:ietf:params:scim:api:messages:2.0:PatchOp\"],\"Operations\":[{\"op\":\"replace\",\"path\":\"active\",\"value\":false}]}",
              "expected": ""
            },
            {
              "id": "execute",
              "title": "Executar o ciclo",
              "text": "Reaplique joiner, execute mover e depois leaver. Consulte E001 após cada etapa.",
              "command": "python jml.py joiner.csv --apply\npython jml.py mover.csv --apply\npython jml.py leaver.csv --apply",
              "expected": "Mesmo id/externalId; departamento muda e active fica false."
            },
            {
              "id": "negative",
              "title": "Validar erro e ausência de duplicação",
              "text": "Sem Authorization a consulta deve retornar 401. POST repetido com mesmo externalId deve retornar 409; o provisionador evita duplicata consultando antes. Reaplicar joiner reativa a conta no laboratório. Não exponha este serviço local à nuvem sem arquitetura e autenticação próprias.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Kit Aurora iniciado: aplicação/API local e Keycloak.",
          "costNote": "Python 3.11+ e Docker/Compose. Sem tenant cloud. Todos os dados devem ser fictícios; não exponha o kit na internet."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://www.rfc-editor.org/rfc/rfc7644.html"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "scim",
          "jml"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-local"
        ],
        "challenge": "Explique uma hipótese de falha de Provisionamento SCIM. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "E001 mantém o mesmo id no destino após atualização e desativação."
          },
          {
            "id": "negative-case",
            "text": "Consulta sem bearer falha e reaplicar o RH não duplica a identidade."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "SCIM transporta ciclo de vida, não faz login: como você explicaria a decisão observada a outra pessoa?",
          "answer": "O cliente de provisionamento cria e atualiza contas em um servidor SCIM. id é atribuído pelo destino; externalId correlaciona com RH. active=false desativa o cadastro, mas o efeito nas sessões depende da aplicação."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": true
      },
      {
        "id": "iam-3-3",
        "title": "App registrations e consentimento",
        "url": "https://learn.microsoft.com/en-us/graph/auth-register-app-v2",
        "study": [
          {
            "topic": "A permissão pertence ao cliente que recebe o token",
            "detail": "App registration define o aplicativo; service principal é sua representação no tenant. Permissão delegada atua com usuário; permissão de aplicação atua sem usuário e pode exigir consentimento administrativo."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Graph Explorer tem seu próprio cliente. Fazer /me nele não valida as permissões de LAB-APP-READONLY. Para demonstrar sua aplicação, obtenha o token usando o client ID dela e registre o cliente sem copiar tokens para as evidências."
          }
        ],
        "practice": [],
        "evidence": "Contexto comprova client ID próprio, /me funciona e revogação da concessão correta foi retestada.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Graph PowerShell · aplicação própria",
          "platformUrl": "https://learn.microsoft.com/en-us/graph/auth-register-app-v2",
          "where": "Tenant de teste → App registrations",
          "steps": [
            {
              "id": "client",
              "title": "Criar cliente público de teste",
              "text": "Crie LAB-APP-READONLY no tenant. Anote Application(client) ID e Directory(tenant) ID; em Authentication habilite public client flows para esta aplicação de laboratório. Não crie segredo em cliente público.",
              "command": "",
              "expected": ""
            },
            {
              "id": "permission",
              "title": "Definir a leitura mínima",
              "text": "Em API permissions selecione Microsoft Graph → Delegated → User.Read. Obtenha aprovação conforme política do tenant; não conceda permissões amplas de escrita.",
              "command": "",
              "expected": ""
            },
            {
              "id": "own-client",
              "title": "Autenticar no cliente criado",
              "text": "Instale o SDK e substitua os dois placeholders por IDs da sua aplicação. Device code é usado apenas no cliente público de teste autorizado; não use Graph Explorer para afirmar que testou esta aplicação.",
              "command": "Install-Module Microsoft.Graph.Authentication -Scope CurrentUser\nConnect-MgGraph -ClientId \"SEU-CLIENT-ID\" -TenantId \"SEU-TENANT-ID\" -Scopes \"User.Read\" -UseDeviceCode\nGet-MgContext | Select-Object ClientId,TenantId,Scopes\nInvoke-MgGraphRequest -Method GET -Uri \"https://graph.microsoft.com/v1.0/me\"",
              "expected": "Contexto mostra o client ID de LAB-APP-READONLY e /me retorna a identidade de teste."
            },
            {
              "id": "revoke",
              "title": "Revogar a concessão correta",
              "text": "Desconecte o SDK. Em Enterprise applications encontre a representação de LAB-APP-READONLY e a concessão delegada correspondente. Revogue o consentimento de teste com papel autorizado. Não altere Graph Explorer.",
              "command": "",
              "expected": ""
            },
            {
              "id": "retry",
              "title": "Obter nova autorização",
              "text": "Execute Disconnect-MgGraph e depois Connect-MgGraph novamente com o mesmo client ID. Registre falha ou novo pedido de consentimento conforme política; não prometa revogação imediata de access token já emitido. Remova a aplicação se não for reutilizá-la.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Ubuntu Server + Keycloak, ligado sob demanda",
          "costNote": "Registro de aplicativo é disponível conforme permissões do tenant; consentimento de administrador e permissões Graph dependem de políticas, não apenas de licença."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://learn.microsoft.com/en-us/graph/auth-register-app-v2"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "graph",
          "oauth"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-0-0"
        ],
        "challenge": "Explique uma hipótese de falha de App registrations e consentimento. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "Get-MgContext mostra o client ID criado e /me retorna o usuário de teste."
          },
          {
            "id": "negative-case",
            "text": "Após revogar a concessão correta, nova autorização exige consentimento ou falha conforme política."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "A permissão pertence ao cliente que recebe o token: como você explicaria a decisão observada a outra pessoa?",
          "answer": "App registration define o aplicativo; service principal é sua representação no tenant. Permissão delegada atua com usuário; permissão de aplicação atua sem usuário e pode exigir consentimento administrativo."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      }
    ],
    "environment": "Aurora para OIDC e SCIM; tenant e SP de demonstração para SAML/consentimento Microsoft.",
    "outcome": "Login OIDC com API, ciclo SCIM e integrações Microsoft quando disponíveis.",
    "requirements": "Cada protocolo tem plataforma e pré-requisito próprios. Não misture emissores nem client IDs.",
    "number": 4,
    "difficulty": "intermediate"
  },
  {
    "id": "p4",
    "title": "IGA — Governança de identidades",
    "desc": "Acesso correto, pelo tempo correto, com rastreabilidade.",
    "items": [
      {
        "id": "iam-4-0",
        "title": "Joiner, Mover, Leaver (JML)",
        "url": "https://www.rfc-editor.org/rfc/rfc7644.html",
        "study": [
          {
            "topic": "JML é um processo de estados",
            "detail": "Joiner cria vínculo e acesso inicial. Mover troca acesso removendo o anterior. Leaver retira acesso e encerra vínculo. employeeId permanece estável; departamento e status mudam. Um email não deve ser sua única correlação."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "A prévia mostra intenção; --apply altera destinos. O provisionador do kit reconcilia SCIM e Keycloak, mas não é uma transação distribuída. Se o segundo falhar, resta um estado parcial: corrija a causa e repita o mesmo arquivo."
          }
        ],
        "practice": [],
        "evidence": "Admissão, transferência, desligamento e reconciliação executados com o mesmo employeeId, sem duplicação.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Provisionador JML Aurora",
          "platformUrl": "https://www.rfc-editor.org/rfc/rfc7644.html",
          "where": "Kit → jml.py + arquivos CSV",
          "steps": [
            {
              "id": "source",
              "title": "Inspecionar o RH",
              "text": "Abra joiner.csv, mover.csv e leaver.csv. E001 e userName permanecem estáveis. Departamento/status são atributos mutáveis; nenhum arquivo contém senha.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preview",
              "title": "Executar sem alterar",
              "text": "A prévia valida CSV e mostra as intenções; não autentica no Keycloak nem altera SCIM.",
              "command": "python jml.py joiner.csv",
              "expected": "PRÉVIA aparece para E001/E002 e nenhum cadastro muda."
            },
            {
              "id": "joiner",
              "title": "Admitir e repetir",
              "text": "Execute o mesmo arquivo duas vezes. Verifique usuários no realm e consulta SCIM.",
              "command": "python jml.py joiner.csv --apply\npython jml.py joiner.csv --apply",
              "expected": "Somente uma conta para E001 por destino; FIN permitido para Ana."
            },
            {
              "id": "mover",
              "title": "Transferir mantendo identidade",
              "text": "Aplique mover.csv. Use sessão de Ana para repetir FIN/JUR. A aplicação consulta departamento atual a cada request.",
              "command": "python jml.py mover.csv --apply",
              "expected": "FIN 403 e JUR 200 com o mesmo externalId."
            },
            {
              "id": "leaver",
              "title": "Desligar e comprovar acesso",
              "text": "Aplique leaver.csv e repita os dois recursos na sessão existente; depois tente novo login.",
              "command": "python jml.py leaver.csv --apply",
              "expected": "Aplicação não permite recursos: 403 se o token ainda é válido, ou 401 se expirou. Novo login no IdP é bloqueado."
            },
            {
              "id": "partial",
              "title": "Ensaiar falha parcial",
              "text": "Pare Keycloak e tente --apply: autenticação inicial falha antes das alterações. Para estudar divergência, mude departamento somente no destino SCIM com PATCH; compare com RH e reexecute mover.csv para reconciliar. O provisionador não tem transação distribuída: após qualquer falha, inspecione ambos os destinos.",
              "command": "",
              "expected": ""
            },
            {
              "id": "restore",
              "title": "Repor dados de partida",
              "text": "Reinicie Keycloak se parado e aplique joiner.csv. A reativação é apenas parte do cenário de laboratório, nunca um procedimento automático de retorno de funcionário real.",
              "command": "python jml.py joiner.csv --apply",
              "expected": "Ambos os destinos voltam ao estado inicial; E001 continua único."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Kit Aurora iniciado: aplicação/API local e Keycloak.",
          "costNote": "Python 3.11+ e Docker/Compose. Sem tenant cloud. Todos os dados devem ser fictícios; não exponha o kit na internet."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://www.rfc-editor.org/rfc/rfc7644.html"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "jml",
          "scim",
          "keycloak"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-3-2",
          "iam-3-1"
        ],
        "challenge": "Explique uma hipótese de falha de Joiner, Mover, Leaver (JML). Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "Admissão e transferência geram as decisões FIN/JUR esperadas nos mesmos objetos."
          },
          {
            "id": "negative-case",
            "text": "Desligamento bloqueia novo login e acesso pela sessão existente; repetição não duplica."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "JML é um processo de estados: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Joiner cria vínculo e acesso inicial. Mover troca acesso removendo o anterior. Leaver retira acesso e encerra vínculo. employeeId permanece estável; departamento e status mudam. Um email não deve ser sua única correlação."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": true
      },
      {
        "id": "iam-4-1",
        "title": "Entitlement Management",
        "url": "https://learn.microsoft.com/pt-br/entra/id-governance/entitlement-management-overview",
        "study": [
          {
            "topic": "Direito de acesso tem dono e prazo",
            "detail": "Um catálogo organiza recursos; um pacote agrupa direitos e uma política define quem solicita, quem aprova e quando expira. A aprovação precisa refletir o risco do acesso e evitar autoaprovação indevida."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Conceder grupo não garante que o aplicativo retirará uma sessão existente na expiração. Verifique inclusão, remoção e acesso efetivo. O fluxo manual pode ensinar governança, mas não é execução de Entitlement Management."
          }
        ],
        "practice": [],
        "evidence": "Pacote de acesso com prazo e evidência",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / Entitlement Management",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Governança de identidade → Gerenciamento de direitos",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://entra.microsoft.com, entre com a conta exclusiva do laboratório e navegue até: Governança de identidade → Gerenciamento de direitos. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Confira tenant e licença: Microsoft Entra ID Governance ou Suite para os recursos atuais de Entitlement Management; algumas capacidades específicas podem aceitar P2. Caso ausente, use fluxo simulado em planilha explicitamente identificado.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "No Entra ID Governance, verifique se Entitlement Management está licenciado; sem licença, prepare catálogo e formulário offline.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Crie catálogo LAB-RECURSOS e pacote LAB-FINANCEIRO-LEITURA com grupo e duração limitada, somente se recurso estiver disponível.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Solicite acesso com usuário piloto, aprove com gestor fictício controlado e registre data de expiração; evite autoaprovação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Verifique inclusão e remoção de grupo após expiração; em simulação, marque claramente que nenhuma atribuição real ocorreu.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confira licença e funções, política do pacote, aprovador, escopo e expiração; verifique remoção real no grupo após expiração.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Entra ID; Syncope opcional sob demanda",
          "costNote": "Entitlement Management exige licença compatível de Microsoft Entra ID Governance/Suite ou condições específicas da funcionalidade. Sem licença, simule o processo sem declarar atribuições reais."
        },
        "sources": [
          {
            "label": "Licença Entitlement Management",
            "url": "https://learn.microsoft.com/pt-br/entra/id-governance/entitlement-management-overview"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "iga",
          "entra"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-4-0"
        ],
        "challenge": "Explique uma hipótese de falha de Entitlement Management. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Pacote de acesso com prazo e evidência"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Direito de acesso tem dono e prazo: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Um catálogo organiza recursos; um pacote agrupa direitos e uma política define quem solicita, quem aprova e quando expira. A aprovação precisa refletir o risco do acesso e evitar autoaprovação indevida."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-4-2",
        "title": "Access Reviews e SoD",
        "url": "https://learn.microsoft.com/pt-br/entra/id-governance/access-reviews-overview",
        "study": [
          {
            "topic": "SoD previne combinações incompatíveis",
            "detail": "Solicitar e aprovar o próprio pagamento é um conflito de segregação de funções. Uma revisão periódica pergunta se cada acesso ainda é necessário; uma política SoD pode prevenir ou detectar combinações arriscadas."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "A decisão de revogar só vira controle efetivo quando a alteração chega ao destino. Registre dono, justificativa, prazo de exceção e reteste; planilha aprovada sem remoção ainda é uma pendência."
          }
        ],
        "practice": [],
        "evidence": "Revisão SoD com acesso removido",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / Access Reviews",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Governança de identidade → Revisões de acesso",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://entra.microsoft.com, entre com a conta exclusiva do laboratório e navegue até: Governança de identidade → Revisões de acesso. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Defina pares de funções incompatíveis e uma matriz SoD.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Monte matriz SoD: solicitante de pagamento não pode ser aprovador do mesmo pagamento; associe perfis fictícios a grupos.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Em Access Reviews licenciadas, crie revisão piloto com dono definido; sem licença, use CSV com usuário, acesso, dono, decisão e prazo.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Rejeite acesso excessivo de uma conta fictícia e remova a associação de grupo em ambiente de teste.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Repita login/acesso e confirme negação; registre decisão, responsável, evidência e exceção temporária se existir.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confira escopo, revisores, convidados e decisões; compare a decisão de negar com remoção efetiva de acesso e logs.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Entra ID; Syncope opcional sob demanda",
          "costNote": "Access Reviews automatizadas exigem licenciamento Entra ID Governance/P2 conforme cenário e usuários no escopo; revisão manual não equivale ao recurso."
        },
        "sources": [
          {
            "label": "Access Reviews Microsoft Entra",
            "url": "https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "iga",
          "sod",
          "entra"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-4-1"
        ],
        "challenge": "Explique uma hipótese de falha de Access Reviews e SoD. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Revisão SoD com acesso removido"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "SoD previne combinações incompatíveis: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Solicitar e aprovar o próprio pagamento é um conflito de segregação de funções. Uma revisão periódica pergunta se cada acesso ainda é necessário; uma política SoD pode prevenir ou detectar combinações arriscadas."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-4-3",
        "title": "Recertificação e auditoria",
        "url": "https://learn.microsoft.com/pt-br/entra/id-governance/",
        "study": [
          {
            "topic": "A campanha fecha um ciclo de governança",
            "detail": "Uma campanha define escopo, população, revisores, prazo e tratamento de não resposta. A decisão gera remediação; o reteste confirma que o risco foi reduzido. Decisões sem evidência não permitem repetir a auditoria."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Separe acessos mantidos, revogados, exceções e pendências. Meça tempo até remoção e retenha evidência sanitizada. Esse processo é diferente de apenas exportar uma lista de membros."
          }
        ],
        "practice": [],
        "evidence": "Relatório de recertificação com decisões",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / Identity Governance",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Governança de identidade → Revisões de acesso",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://entra.microsoft.com, entre com a conta exclusiva do laboratório e navegue até: Governança de identidade → Revisões de acesso. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Monte inventário de acessos e responsáveis por aplicação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Exporte inventário de usuários, grupos e aplicações do laboratório sem informações sensíveis; registre data e origem.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Distribua lista aos proprietários fictícios de Financeiro e Jurídico; registre aprovar, revogar ou justificar exceção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Aplique uma revogação real em conta de teste e verifique efeito; mantenha log antes/depois e prazo de remediação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Consolide relatório com escopo, decisões, pendências, aprovadores, data e resultado do reteste.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confirme datas da campanha, proprietários, decisão, justificativa e remoção; diferencie revisão manual de campanha automatizada.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Entra ID; Syncope opcional sob demanda",
          "costNote": "Recertificação manual documentada não exige licença premium; campanhas automatizadas dependem de licenciamento Entra ID Governance compatível."
        },
        "sources": [
          {
            "label": "Revisões de acesso",
            "url": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "iga",
          "audit"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-4-2"
        ],
        "challenge": "Explique uma hipótese de falha de Recertificação e auditoria. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Relatório de recertificação com decisões"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "A campanha fecha um ciclo de governança: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Uma campanha define escopo, população, revisores, prazo e tratamento de não resposta. A decisão gera remediação; o reteste confirma que o risco foi reduzido. Decisões sem evidência não permitem repetir a auditoria."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      }
    ],
    "environment": "RH fictício e aplicações da Aurora; tenant para recursos de governança Microsoft.",
    "outcome": "Entrada, mudança e desligamento; revisão de direitos e decisões de remediação.",
    "requirements": "JML local é executável. Pacotes/revisões do Entra precisam de licença elegível; declare simulação quando documental.",
    "number": 5,
    "difficulty": "intermediate"
  },
  {
    "id": "p5",
    "title": "PAM — Acesso privilegiado",
    "desc": "Controle, monitore e reduza privilégios.",
    "items": [
      {
        "id": "iam-5-0",
        "title": "PIM, JIT e elegibilidade",
        "url": "https://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-configure",
        "study": [
          {
            "topic": "Elegibilidade não é privilégio ativo",
            "detail": "PIM permite que uma identidade elegível ative uma função por período limitado, com condições como justificativa, MFA e aprovação. JIT reduz tempo de exposição; não substitui seleção correta da função e escopo."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Funções Entra e Azure RBAC têm escopos distintos. Teste antes, durante e após a ativação. Uma planilha com horários é uma simulação de JIT, não comprovação de que o serviço removeu o privilégio."
          }
        ],
        "practice": [],
        "evidence": "Ativação JIT temporária e logs",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / PIM",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Governança de identidade → Privileged Identity Management",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://entra.microsoft.com, entre com a conta exclusiva do laboratório e navegue até: Governança de identidade → Privileged Identity Management. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Confirme licença Microsoft Entra ID P2 ou Microsoft Entra ID Governance para PIM e pessoas envolvidas. Entra ID Free e P1 isolado não fornecem execução real de PIM.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Confirme licenciamento PIM aplicável; sem P2/ID Governance apropriado, não declare ativação real.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Defina função de baixo impacto e janela curta para conta piloto; mantenha contas de emergência fora do teste de bloqueio.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Se licenciado, configure elegibilidade, ativação com justificativa e duração limitada; registre log e encerramento.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Sem licença, modele solicitação/aprovação/expiração em planilha e compare com PIM real, identificando explicitamente a simulação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Se PIM estiver ausente, confirme P2/ID Governance e papel adequado; confira elegibilidade, duração, MFA e logs de ativação.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Entra ID; JumpServer Community opcional",
          "costNote": "PIM requer Microsoft Entra ID P2 ou licença ID Governance apropriada; sem isso, somente fluxo de solicitação/aprovação simulado."
        },
        "sources": [
          {
            "label": "Requisitos do PIM",
            "url": "https://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-getting-started"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "pim",
          "entra"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-local"
        ],
        "challenge": "Explique uma hipótese de falha de PIM, JIT e elegibilidade. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Ativação JIT temporária e logs"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Elegibilidade não é privilégio ativo: como você explicaria a decisão observada a outra pessoa?",
          "answer": "PIM permite que uma identidade elegível ative uma função por período limitado, com condições como justificativa, MFA e aprovação. JIT reduz tempo de exposição; não substitui seleção correta da função e escopo."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-5-1",
        "title": "PAM: sessão autorizada e trilha de auditoria",
        "url": "https://learn.microsoft.com/pt-br/security/zero-trust/deploy/identity",
        "study": [
          {
            "topic": "PAM protege o caminho privilegiado",
            "detail": "Um bastion controla acesso a alvos e pode registrar sessão conforme edição. Um cofre armazena credenciais; rotação muda a credencial usada pelo consumidor. Nenhuma dessas funções garante automaticamente as demais."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Escolha produto, edição e versão antes do roteiro. Para esta lição, a entrega é sessão autorizada/negada e trilha disponível. Rotação é exercitada separadamente e não deve ser declarada se a edição não oferecer o recurso."
          }
        ],
        "practice": [],
        "evidence": "Ativo piloto e operador configurados, acesso permitido/negado testado e capacidade de auditoria da edição registrada. Rotação automática só conta se executada separadamente.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "JumpServer Community — PAM de sessões",
          "platformUrl": "https://www.jumpserver.org/",
          "where": "JumpServer Community → Ativos / Contas / Autorizações (varia por versão)",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Prepare uma instância isolada de JumpServer Community, verificando requisitos e instruções da versão oficial. Este é um laboratório de acesso privilegiado com bastion, NÃO um procedimento de Azure Key Vault. Não exponha serviços administrativos na internet.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Separe credenciais de teste SSH/RDP e identifique uma VM alvo. Não registre senhas em arquivos, capturas ou repositórios.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Escolha JumpServer Community para laboratório isolado; verifique requisitos atuais e só ligue VM extra após desligar Keycloak se necessário.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Cadastre ativo de teste e uma conta de operador; configure autorização mínima de sessão pela interface da versão instalada, registrando nomes de telas conforme a edição.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Teste acesso aprovado via bastion e tente acesso com conta sem autorização. Se disponível na edição, registre trilha/auditoria de sessão.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Compare auditoria de sessão e procedimento de rotação de credencial. Não alegue rotação automática ou gravação de sessão se a edição não oferecer esses recursos.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Se o acesso privilegiado falhar, verifique destino, credenciais de laboratório, gateway e logs de sessão; não confunda vault de segredos com PAM de sessões.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Entra ID; JumpServer Community opcional",
          "costNote": "JumpServer Community é uma alternativa para acesso remoto privilegiado e auditoria. Azure Key Vault armazena segredos, mas NÃO substitui um PAM de sessões."
        },
        "sources": [
          {
            "label": "JumpServer documentação",
            "url": "https://docs.jumpserver.org/"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "pam",
          "jumpserver"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-5-0"
        ],
        "challenge": "Explique uma hipótese de falha de PAM, vaults e rotação. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Ativo piloto e operador configurados, acesso permitido/negado testado e capacidade de auditoria da edição registrada. Rotação automática só conta se executada separadamente."
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "PAM protege o caminho privilegiado: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Um bastion controla acesso a alvos e pode registrar sessão conforme edição. Um cofre armazena credenciais; rotação muda a credencial usada pelo consumidor. Nenhuma dessas funções garante automaticamente as demais."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-5-2",
        "title": "Break-glass e recuperação",
        "url": "https://learn.microsoft.com/pt-br/entra/identity/role-based-access-control/security-emergency-access",
        "study": [
          {
            "topic": "Recuperação precisa funcionar durante falhas",
            "detail": "A conta de emergência não pode depender do componente que falhou. Contas cloud-only evitam depender da sincronização local, mas continuam exigindo métodos e custódia disponíveis. Teste de mesa complementa, não substitui, entrada real autorizada."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Registre cada uso, revise periodicamente e recupere a proteção após o evento. Não simule desastre removendo o único acesso administrativo nem desligue autenticação para facilitar a demonstração."
          }
        ],
        "practice": [],
        "evidence": "Procedimento break-glass ensaiado",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / Roles",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Entra ID → Funções e administradores",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://entra.microsoft.com, entre com a conta exclusiva do laboratório e navegue até: Entra ID → Funções e administradores. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Prepare duas contas de emergência cloud-only *.onmicrosoft.com, segregadas das contas operacionais e protegidas por FIDO2 ou autenticação baseada em certificado, sob custódia segura.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Revise as duas contas de emergência, sua independência de AD/SSO, funções administrativas ativas e alertas. Em tenant de estudo sem controle de custódia, documente o desenho sem ampliar privilégios.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Faça simulação de indisponibilidade, sem derrubar serviços. Verifique como uma conta emergencial acessaria o Entra sem depender de sincronização e registre responsáveis.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Documente testes de entrada, armazenamento de credenciais e rotação pós-uso; nunca remova os únicos meios de recuperação do tenant.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Planeje inspeção periódica de pelo menos 90 dias e alertas a cada uso administrativo. Registre o procedimento aprovado, riscos e resultados do tabletop.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Se a conta de emergência não entrar, revise independência de IdP, método resistente a phishing, CA aplicável e custódia; não execute lockout real.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Entra ID; JumpServer Community opcional",
          "costNote": "Contas de emergência cloud-only e documentação podem ser preparadas sem PIM; PIM e políticas CA dependem de licenças próprias."
        },
        "sources": [
          {
            "label": "Recuperação com contas de emergência",
            "url": "https://learn.microsoft.com/pt-br/entra/identity/role-based-access-control/security-emergency-access"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "recovery"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-5-1"
        ],
        "challenge": "Explique uma hipótese de falha de Break-glass e recuperação. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Procedimento break-glass ensaiado"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Recuperação precisa funcionar durante falhas: como você explicaria a decisão observada a outra pessoa?",
          "answer": "A conta de emergência não pode depender do componente que falhou. Contas cloud-only evitam depender da sincronização local, mas continuam exigindo métodos e custódia disponíveis. Teste de mesa complementa, não substitui, entrada real autorizada."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      }
    ],
    "environment": "Contas administrativas segregadas, acesso emergencial e registros de auditoria.",
    "outcome": "Privilégio temporário, aprovação e recuperação simulados ou implementados.",
    "requirements": "PIM e funcionalidades de PAM variam conforme licença e produto; não usar contas reais.",
    "number": 6,
    "difficulty": "intermediate"
  },
  {
    "id": "p6",
    "title": "Workload Identity e automação",
    "desc": "Proteja identidades não humanas e integrações.",
    "items": [
      {
        "id": "iam-6-0",
        "title": "Service principals e managed identities",
        "url": "https://learn.microsoft.com/pt-br/entra/identity/managed-identities-azure-resources/overview",
        "study": [
          {
            "topic": "Aplicações também têm identidade e ciclo de vida",
            "detail": "Service principal representa uma aplicação no tenant; managed identity é gerenciada pela plataforma em recursos compatíveis. Uma aplicação precisa de dono, escopo mínimo, revisão e processo de revogação mesmo sem usuário interativo."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Permissão de aplicação não equivale a delegação de usuário. O token precisa ter audiência do recurso e autorização adequada. Não registre segredo apenas porque a tela permite: prefira credenciais adequadas ao consumidor."
          }
        ],
        "practice": [],
        "evidence": "App com permissões mínimas",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / App registrations",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Entra ID → Registros de aplicativo",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://entra.microsoft.com, entre com a conta exclusiva do laboratório e navegue até: Entra ID → Registros de aplicativo. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Crie app registration de teste e identifique service principal.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Crie aplicação LAB-WORKLOAD-READ no Entra, sem segredos se não forem necessários, e identifique Application ID e Object ID.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Compare permissões delegadas e de aplicativo; registre apenas escopos mínimos para uma leitura de teste.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Se tiver recurso Azure compatível, habilite managed identity nele e teste token para recurso autorizado; sem Azure, documente conceito sem afirmar execução.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Remova permissão desnecessária e confirme negação controlada; registre proprietário técnico e prazo de revisão.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Compare objectId, appId, service principal e escopo RBAC; se usar managed identity, confirme recurso Azure compatível e token sem gravá-lo.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Entra ID + Microsoft Graph; Azure opcional",
          "costNote": "Service principals e app registrations podem ser testados no Entra; managed identities exigem recurso Azure compatível e podem gerar custo de infraestrutura."
        },
        "sources": [
          {
            "label": "Identidades gerenciadas para recursos Azure",
            "url": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "workload",
          "entra"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-local"
        ],
        "challenge": "Explique uma hipótese de falha de Service principals e managed identities. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: App com permissões mínimas"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Aplicações também têm identidade e ciclo de vida: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Service principal representa uma aplicação no tenant; managed identity é gerenciada pela plataforma em recursos compatíveis. Uma aplicação precisa de dono, escopo mínimo, revisão e processo de revogação mesmo sem usuário interativo."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-6-1",
        "title": "Certificados, segredos e rotação",
        "url": "https://learn.microsoft.com/pt-br/entra/identity-platform/security-best-practices-for-app-registration",
        "study": [
          {
            "topic": "Rotação exige testar o consumidor",
            "detail": "Criar uma credencial nova é só o começo. Atualize o consumidor, confirme operação e então remova a antiga. Planeje a sobreposição para evitar indisponibilidade e uma reversão que não reintroduza segredo comprometido."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Revogar credencial impede novas emissões com ela; access tokens já emitidos podem durar até expirar ou sofrer revogação conforme o recurso. Separe esses testes nas evidências."
          }
        ],
        "practice": [],
        "evidence": "Credencial rotacionada e anterior revogada",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Azure Key Vault / App registrations",
          "platformUrl": "https://portal.azure.com",
          "where": "Azure Portal → Cofres de chaves / Entra → Registros de aplicativo",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://portal.azure.com, entre com a conta exclusiva do laboratório e navegue até: Azure Portal → Cofres de chaves / Entra → Registros de aplicativo. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Inventarie credenciais de apps de teste com datas de expiração.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Inventarie credenciais de aplicação de teste com data de expiração e responsável, sem copiar valores secretos.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Crie nova credencial apenas no ambiente de teste; armazene em cofre autorizado, nunca em arquivo versionado.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Atualize consumidor de teste para usar credencial nova, confirme funcionamento e só então revogue a anterior.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Teste que a credencial antiga falha; documente rollback seguro e alerta de expiração. Key Vault pode gerar custos Azure.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confira expiração e thumbprint do certificado, permissões do Key Vault e rotação; não registre segredo em logs ou Git.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Entra ID + Microsoft Graph; Azure opcional",
          "costNote": "Certificados locais podem ser usados em app registrations; Azure Key Vault e operações associadas podem gerar cobrança conforme uso."
        },
        "sources": [
          {
            "label": "Credenciais e certificados de aplicações",
            "url": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "workload",
          "azure",
          "secrets"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-6-0"
        ],
        "challenge": "Explique uma hipótese de falha de Certificados, segredos e rotação. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Credencial rotacionada e anterior revogada"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Rotação exige testar o consumidor: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Criar uma credencial nova é só o começo. Atualize o consumidor, confirme operação e então remova a antiga. Planeje a sobreposição para evitar indisponibilidade e uma reversão que não reintroduza segredo comprometido."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-6-2",
        "title": "Microsoft Graph: inventário com menor privilégio",
        "url": "https://learn.microsoft.com/pt-br/graph/overview",
        "study": [
          {
            "topic": "Inventário é a base de automação segura",
            "detail": "Uma consulta Graph devolve uma página, não necessariamente a população toda. O SDK com -All segue paginação. Exporte somente os atributos necessários, sem autenticar com permissão de escrita para uma leitura."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Para perfil básico delegado, avalie User.ReadBasic.All. User.Read.All é mais amplo. Criação/alteração JML requer outros escopos e controles; uma exportação CSV não demonstra automação de desligamento."
          }
        ],
        "practice": [],
        "evidence": "Relatório Graph automatizado",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Graph Explorer",
          "platformUrl": "https://developer.microsoft.com/graph/graph-explorer",
          "where": "Graph Explorer → Entrar → Executar consulta",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Acesse https://developer.microsoft.com/graph/graph-explorer, entre com uma conta de teste do tenant e confirme as permissões delegadas antes de executar consultas. Não use credenciais administrativas para consultas básicas.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Autentique com permissões mínimas e liste usuários fictícios.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "No Graph Explorer, execute GET /v1.0/me com conta de teste e identifique quais permissões foram solicitadas.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Consulte GET /v1.0/users?$select=id,displayName,userPrincipalName apenas se a permissão estiver concedida; não eleve privilégios para facilitar.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Instale Microsoft.Graph no PowerShell 7 (Install-Module Microsoft.Graph -Scope CurrentUser), execute Connect-MgGraph -Scopes 'User.ReadBasic.All' com aprovação e rode Get-MgUser -All -Property Id,DisplayName,UserPrincipalName | Select-Object Id,DisplayName,UserPrincipalName | Export-Csv ./LAB-graph-users.csv -NoTypeInformation -Encoding utf8. Use apenas identidades fictícias; não eleve privilégios para contornar consentimento.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Valide número de linhas e UPNs do CSV, repita a consulta e compare para detectar duplicação; no REST, siga @odata.nextLink até o fim. Teste 403 (permissão) e 429 (limite/Retry-After) sem causar carga abusiva. Remova CSVs contendo dados reais.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "HTTP 401: token; 403: permissão/consentimento; 429: throttling e Retry-After. Siga @odata.nextLink e evite duplicações na reexecução.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Entra ID + Microsoft Graph; Azure opcional",
          "costNote": "Microsoft Graph Explorer e SDK são gratuitos; endpoints e operações exigem permissões apropriadas e eventualmente licenças do serviço."
        },
        "sources": [
          {
            "label": "Microsoft Graph PowerShell",
            "url": "https://learn.microsoft.com/en-us/powershell/microsoftgraph/get-started"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "graph",
          "powershell"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-3-3"
        ],
        "challenge": "Explique uma hipótese de falha de Microsoft Graph e automação JML. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Relatório Graph automatizado"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Inventário é a base de automação segura: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Uma consulta Graph devolve uma página, não necessariamente a população toda. O SDK com -All segue paginação. Exporte somente os atributos necessários, sem autenticar com permissão de escrita para uma leitura."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-6-3",
        "title": "Identidade de serviço: rotacionar a credencial SCIM",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
        "study": [
          {
            "topic": "O consumidor também precisa de identidade",
            "detail": "O provisionador autentica no destino SCIM com um bearer de laboratório. O segredo é uma credencial de serviço, não o usuário Ana. Ter permissão para provisionar exige dono, escopo, expiração e recuperação definidos."
          },
          {
            "topic": "Rotação em duas fases",
            "detail": "Prepare a próxima credencial mantendo a anterior aceita, teste o consumidor com a nova e só então ative/remova a antiga. O kit recarrega essas credenciais a cada requisição SCIM; não é necessário reiniciar a aplicação para a troca."
          }
        ],
        "practice": [],
        "evidence": "Consumidor funciona com credencial nova e a antiga recebe 401; nenhuma credencial aparece na evidência.",
        "prerequisite": "",
        "prerequisiteIds": [
          "iam-3-2"
        ],
        "tracks": [
          "local"
        ],
        "technologies": [
          "workload",
          "scim",
          "secrets"
        ],
        "difficulty": "advanced",
        "guide": {
          "platform": "Aurora Lab · laboratório local",
          "platformUrl": "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
          "where": "Computador pessoal → pasta aurora-lab",
          "steps": [
            {
              "id": "baseline",
              "title": "Verificar o consumidor",
              "text": "Confirme servidor iniciado e consulta SCIM funcionando. Não exponha tokens na saída ou no histórico do terminal.",
              "command": "",
              "expected": ""
            },
            {
              "id": "prepare",
              "title": "Preparar próxima credencial",
              "text": "O script cria SCIM_TOKEN_NEXT em .env com permissão local restrita, preservando SCIM_TOKEN.",
              "command": "python rotate.py prepare",
              "expected": "Ambas são aceitas na janela de transição."
            },
            {
              "id": "test-next",
              "title": "Testar antes de cortar",
              "text": "Abra um novo Python na pasta do kit e execute a consulta. O valor do token não é impresso. Guarde a variável old somente na memória desta sessão para o teste posterior.",
              "command": "from jml import request, cfg\nold = cfg[\"SCIM_TOKEN\"]\nnew = cfg[\"SCIM_TOKEN_NEXT\"]\nassert request(\"http://localhost:8765/scim/v2/Users\", token=new)[\"totalResults\"] >= 0",
              "expected": "A nova credencial permite a leitura do contrato SCIM."
            },
            {
              "id": "activate",
              "title": "Ativar a nova",
              "text": "Em outro terminal execute activate; não reinicie o Python anterior, que mantém old em memória para o teste negativo. Novas execuções jml.py passam a usar a nova credencial.",
              "command": "python rotate.py activate\npython jml.py joiner.csv --apply",
              "expected": "Provisionador funciona com a credencial nova."
            },
            {
              "id": "reject-old",
              "title": "Comprovar revogação",
              "text": "No Python anterior, repita request com token=old: espere HTTPError 401. Com token=new deve funcionar. Não imprima nem registre os valores. Apague old/new da sessão ao finalizar.",
              "command": "",
              "expected": ""
            },
            {
              "id": "recovery",
              "title": "Planejar recuperação",
              "text": "Se a próxima credencial falhar, não execute activate: confira .env, diretório e token usado. Depois do corte, não restaure credencial comprometida; prepare outra e repita. Registre tempo e consumidores afetados.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Kit Aurora iniciado: aplicação/API local e Keycloak.",
          "costNote": "Python 3.11+ e Docker/Compose. Sem tenant cloud. Todos os dados devem ser fictícios; não exponha o kit na internet."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
          }
        ],
        "revision": "2026.10.28.1",
        "challenge": "Explique o resultado sem repetir os comandos. Qual evidência contradiz sua hipótese?",
        "rollback": "Use dados fictícios. Desfaça a alteração de teste e repita os testes de acesso; não apague dados para esconder uma falha.",
        "kit": true,
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Consumidor funciona com credencial nova e a antiga recebe 401; nenhuma credencial aparece na evidência."
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "O consumidor também precisa de identidade: como você explicaria a decisão observada a outra pessoa?",
          "answer": "O provisionador autentica no destino SCIM com um bearer de laboratório. O segredo é uma credencial de serviço, não o usuário Ana. Ter permissão para provisionar exige dono, escopo, expiração e recuperação definidos."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null
      }
    ],
    "environment": "Aplicação e consumidores do laboratório; tenant/assinatura Azure somente onde a lição exigir.",
    "outcome": "Identidades de serviço com dono e escopo, inventário e credencial rotacionada com consumidor testado.",
    "requirements": "Inventário Graph é leitura delegada. Rotação SCIM local não depende de Azure Key Vault.",
    "number": 7,
    "difficulty": "intermediate"
  },
  {
    "id": "p7",
    "title": "Intune e Device Trust",
    "desc": "Conformidade de dispositivos integrada à identidade.",
    "items": [
      {
        "id": "iam-7-0",
        "title": "Inscrição MDM e limites do Autopilot",
        "url": "https://learn.microsoft.com/pt-br/intune/intune-service/enrollment/windows-enroll",
        "study": [
          {
            "topic": "Gerenciar dispositivo exige inscrição",
            "detail": "Entra registration, Entra join, ingresso em domínio AD e enrollment MDM são estados distintos. Um objeto aparecer no diretório não comprova que o Intune gerencia suas políticas."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Autopilot trata provisionamento de dispositivo e tem requisitos próprios. Esta lição verifica inscrição MDM; estudar o fluxo de Autopilot não autoriza marcar implantação executada. Confira edição Windows e licença antes de usar VM descartável."
          }
        ],
        "practice": [],
        "evidence": "Dispositivo inscrito e inventariado",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Intune admin center",
          "platformUrl": "https://intune.microsoft.com",
          "where": "Dispositivos → Inscrição",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://intune.microsoft.com, entre com a conta exclusiva do laboratório e navegue até: Dispositivos → Inscrição. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Confirme licença Intune, edição e suporte do Windows, e requisitos de inscrição. Prefira Windows 11 suportado no laboratório; não assuma que Autopilot funciona em qualquer VM ou que Enrollment MDM implica Autopilot.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Verifique licença Intune, sistema operacional suportado e capacidade da VM; não confunda inscrição MDM com Autopilot.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Se licenciado e com dispositivo compatível, inscreva máquina descartável de laboratório e confira registro. Para Autopilot, confirme suporte a identidade de hardware/registro antes de tentar implantação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Verifique status de inscrição e inventário no portal, incluindo UPN e ID do dispositivo. Não registre dados do hardware de produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Se Autopilot não puder ser executado no hardware ou tenant disponível, documente o fluxo teórico e marque explicitamente como não executado.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Verifique licença, suporte do Windows, hardware, registro Autopilot, atribuição de perfil e conectividade; sem dispositivo real, registre simulação.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Entra ID; Intune se houver licença",
          "costNote": "Intune exige licença apropriada por usuário/dispositivo; Windows Autopilot requer dispositivo compatível e requisitos de licenciamento e registro."
        },
        "sources": [
          {
            "label": "Visão geral do Windows Autopilot",
            "url": "https://learn.microsoft.com/en-us/autopilot/overview"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "intune",
          "windows"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-local"
        ],
        "challenge": "Explique uma hipótese de falha de Enrollment e Autopilot. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Dispositivo inscrito e inventariado"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Gerenciar dispositivo exige inscrição: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Entra registration, Entra join, ingresso em domínio AD e enrollment MDM são estados distintos. Um objeto aparecer no diretório não comprova que o Intune gerencia suas políticas."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-7-1",
        "title": "Compliance e Conditional Access",
        "url": "https://learn.microsoft.com/pt-br/intune/intune-service/protect/create-compliance-policy",
        "study": [
          {
            "topic": "Conformidade é um sinal, não a decisão inteira",
            "detail": "O Intune avalia o dispositivo conforme uma política e reporta um estado. Conditional Access consome esse sinal com outros controles. Atraso de sincronização pode explicar diferença entre configuração local e relatório."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Report-only ajuda a analisar impacto sem bloquear. Registre estado observado, motivo e horário. Não declare que houve bloqueio se apenas consultou o relatório de uma política não imposta."
          }
        ],
        "practice": [],
        "evidence": "Conformidade e decisões de acesso verificadas",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Intune admin center",
          "platformUrl": "https://intune.microsoft.com",
          "where": "Dispositivos → Conformidade",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://intune.microsoft.com, entre com a conta exclusiva do laboratório e navegue até: Dispositivos → Conformidade. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Crie regra de compliance simples em grupo piloto.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Crie grupo piloto e política de conformidade simples, somente com licença Intune e dispositivo de teste.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Sincronize dispositivo e consulte estado compliant/noncompliant e motivo da avaliação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Se houver Entra P1, crie Conditional Access em report-only usando sinal de dispositivo; mantenha conta de emergência excluída.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Teste cenário conforme e não conforme em laboratório, compare relatório com decisão esperada; sem licença, use matriz simulada.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confirme licença Intune e Entra P1, grupo, estado de sincronização, política de compliance e log CA Report-only; avalie dispositivo conforme e não conforme.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Entra ID; Intune se houver licença",
          "costNote": "Compliance via Intune exige licença Intune apropriada; Conditional Access baseado em conformidade exige Entra ID P1 ou plano que o inclua."
        },
        "sources": [
          {
            "label": "Licença para Conditional Access",
            "url": "https://learn.microsoft.com/pt-br/entra/identity/conditional-access/overview"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "intune",
          "conditional access"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-7-0"
        ],
        "challenge": "Explique uma hipótese de falha de Compliance e Conditional Access. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Conformidade e decisões de acesso verificadas"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Conformidade é um sinal, não a decisão inteira: como você explicaria a decisão observada a outra pessoa?",
          "answer": "O Intune avalia o dispositivo conforme uma política e reporta um estado. Conditional Access consome esse sinal com outros controles. Atraso de sincronização pode explicar diferença entre configuração local e relatório."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-7-2",
        "title": "Hardening, BitLocker e Defender",
        "url": "https://learn.microsoft.com/pt-br/intune/intune-service/protect/security-baselines-configure",
        "study": [
          {
            "topic": "Hardening tem camadas diferentes",
            "detail": "Baseline configura um conjunto de parâmetros. BitLocker protege dados em repouso e exige plano para chave de recuperação. Defender e firewall tratam outros riscos. Uma evidência de baseline não demonstra cada camada."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Aplique em grupo e dispositivo descartáveis, confira conflitos e compare antes/depois. Validar postura não exige desativar proteção nem publicar chave de recuperação."
          }
        ],
        "practice": [],
        "evidence": "Baseline aplicada e resultado comparado",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Intune admin center",
          "platformUrl": "https://intune.microsoft.com",
          "where": "Segurança de ponto de extremidade → Linhas de base de segurança",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "No https://intune.microsoft.com, com Intune Plan 1 e papel RBAC adequado, abra Endpoint security → Security baselines. Escolha baseline disponível e crie perfil piloto. Não confunda baseline do Intune com produto de segurança já licenciado.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Confirme Intune Plan 1, sistema operacional suportado, grupo piloto e backup da VM. Baselines podem aplicar mudanças imediatamente após atribuição; documente conflito de políticas antes de usar um endpoint existente.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Antes de aplicar política, confirme backup da VM e onde a chave de recuperação ficará armazenada com segurança.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "No Intune licenciado, escolha baseline apropriada para versão Windows de teste; documente configurações e conflitos possíveis.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Verifique estado do BitLocker e Defender localmente, sem publicar chaves ou desativar proteções para simular falha.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Compare postura antes/depois e registre resultado de política; se não houver Intune, execute apenas validações locais documentadas.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confira relatório Intune, versão Windows, estado BitLocker/Defender e atribuições; não desligue proteção para produzir evidência.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Entra ID; Intune se houver licença",
          "costNote": "Gerenciamento remoto de políticas exige Intune licenciado; BitLocker/Defender locais dependem da edição Windows e da capacidade do dispositivo."
        },
        "sources": [
          {
            "label": "Licença e configuração de baseline no Intune",
            "url": "https://learn.microsoft.com/en-us/intune/intune-service/protect/security-baselines-configure"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "intermediate",
        "technologies": [
          "intune",
          "bitlocker",
          "defender"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-7-1"
        ],
        "challenge": "Explique uma hipótese de falha de Hardening, BitLocker e Defender. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Baseline aplicada e resultado comparado"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Hardening tem camadas diferentes: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Baseline configura um conjunto de parâmetros. BitLocker protege dados em repouso e exige plano para chave de recuperação. Defender e firewall tratam outros riscos. Uma evidência de baseline não demonstra cada camada."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      }
    ],
    "environment": "Dispositivo Windows/VM compatível, tenant Entra e grupos piloto.",
    "outcome": "Dispositivo inscrito, políticas aplicadas e conformidade verificada.",
    "requirements": "Intune e políticas associadas requerem licenciamento e dispositivo compatíveis.",
    "number": 8,
    "difficulty": "intermediate"
  },
  {
    "id": "p8",
    "title": "Auditoria, riscos e arquitetura",
    "desc": "Visibilidade, resposta e desenho de IAM resiliente.",
    "items": [
      {
        "id": "iam-8-0",
        "title": "Logs de sign-in e audit logs",
        "url": "https://learn.microsoft.com/pt-br/entra/identity/monitoring-health/concept-sign-ins",
        "study": [
          {
            "topic": "Logs explicam acontecimentos distintos",
            "detail": "Sign-in logs mostram autenticação; audit logs mostram alterações administrativas. Horário, app, sujeito e correlation ID ajudam a ligar eventos, mas uma mudança de grupo e um login podem ter correlações diferentes."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Retenção depende do recurso/licença e exportação. Ausência de evento no período consultado não comprova ausência de tentativa. Comece com eventos que você gerou e anote a janela de tempo."
          }
        ],
        "practice": [],
        "evidence": "Linha do tempo de login e alteração",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / Sign-in logs",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Entra ID → Monitoramento e integridade → Logs de entrada",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://entra.microsoft.com, entre com a conta exclusiva do laboratório e navegue até: Entra ID → Monitoramento e integridade → Logs de entrada. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Gere login bem-sucedido e falha controlada em conta piloto.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Gere login bem-sucedido e falha controlada com conta fictícia; registre horário UTC aproximado e aplicativo.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Em Entra → Monitoring & health → Sign-in logs, filtre usuário e período; observe status, aplicativo, IP sanitizado e correlation ID.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Em Audit logs, encontre mudança de grupo ou aplicação; diferencie evento de autenticação de alteração administrativa.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Crie linha do tempo de ambos eventos e indique janela de retenção disponível no tenant; não presuma exportação SIEM gratuita.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confira fuso horário, filtro de período, retenção/licença, identidade e correlation ID; ausência de log não comprova ausência de tentativa.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Logs Entra + Windows; ferramentas locais",
          "costNote": "Logs básicos estão disponíveis no Entra; retenção e exportação avançadas dependem de licenças e destino de logs."
        },
        "sources": [
          {
            "label": "Logs de entrada Microsoft Entra",
            "url": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "advanced",
        "technologies": [
          "entra",
          "logs"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-local"
        ],
        "challenge": "Explique uma hipótese de falha de Logs de sign-in e audit logs. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Linha do tempo de login e alteração"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Logs explicam acontecimentos distintos: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Sign-in logs mostram autenticação; audit logs mostram alterações administrativas. Horário, app, sujeito e correlation ID ajudam a ligar eventos, mas uma mudança de grupo e um login podem ter correlações diferentes."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-8-1",
        "title": "Identity Protection e resposta",
        "url": "https://learn.microsoft.com/pt-br/entra/id-protection/overview-identity-protection",
        "study": [
          {
            "topic": "Conter não é apenas resetar senha",
            "detail": "Uma conta comprometida pode ter sessões, concessões OAuth e métodos de recuperação alterados. Um runbook define triagem, autoridade para bloquear, preservação de evidência, contenção e retorno controlado."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Identity Protection é uma fonte de sinais e tem requisitos de licença. Tabletop com dados fictícios permite ensaiar decisão sem provocar ataques para gerar alerta. Diferencie hipótese, sinal e incidente confirmado."
          }
        ],
        "practice": [],
        "evidence": "Runbook de resposta a conta comprometida",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / Identity Protection",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Proteção → Proteção de identidade",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra https://entra.microsoft.com, entre com a conta exclusiva do laboratório e navegue até: Proteção → Proteção de identidade. Verifique se você está no tenant/domínio de teste, nunca em produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Crie runbook para conta comprometida e sinais de risco.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Confirme licenciamento Identity Protection antes de tentar usar detecção de risco; não provoque ataques reais para gerar alertas.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Monte tabletop de login suspeito com dados fictícios: horário, local anômalo, app e usuário.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Defina decisão de contenção (bloquear conta, revogar sessões, reset de credencial) e quem pode autorizar cada ação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Registre evidência, impacto, recuperação e lições; se houver recurso licenciado, compare com alertas reais sem expor dados.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confirme licença P2 para sinais de risco avançados; diferencie simulação tabletop de detecção real e preserve correlation ID sem dados sensíveis.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Logs Entra + Windows; ferramentas locais",
          "costNote": "Identity Protection com detecções e políticas de risco avançadas requer Entra ID P2; sem P2 faça tabletop explicitamente simulado."
        },
        "sources": [
          {
            "label": "Identity Protection Microsoft Entra",
            "url": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "advanced",
        "technologies": [
          "entra",
          "identity protection"
        ],
        "tracks": [
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-8-0"
        ],
        "challenge": "Explique uma hipótese de falha de Identity Protection e resposta. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Runbook de resposta a conta comprometida"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Conter não é apenas resetar senha: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Uma conta comprometida pode ter sessões, concessões OAuth e métodos de recuperação alterados. Um runbook define triagem, autoridade para bloquear, preservação de evidência, contenção e retorno controlado."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-8-2",
        "title": "Zero Trust e threat modeling",
        "url": "https://learn.microsoft.com/pt-br/security/zero-trust/zero-trust-overview",
        "study": [
          {
            "topic": "Zero Trust descreve decisões e fronteiras",
            "detail": "Identifique quem acessa qual recurso, por qual canal e com qual evidência. O IdP, aplicativo, API, RH e administrador pertencem a fronteiras diferentes. Uma seta no diagrama não configura a confiança entre eles."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Modele roubo de token, excesso de privilégio e falha de provisionamento. Para cada ameaça associe prevenção, detecção e recuperação existentes; destaque os controles só propostos."
          }
        ],
        "practice": [],
        "evidence": "Diagrama Zero Trust com ameaças e controles",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Diagrams.net + Microsoft Entra",
          "platformUrl": "https://app.diagrams.net",
          "where": "Novo diagrama → Arquitetura IAM",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra a ferramenta local indicada em «Diagrams.net + Microsoft Entra» no computador ou VM de laboratório. Caminho de referência: Novo diagrama → Arquitetura IAM. Use conta autorizada do ambiente de teste. Não é necessário entrar no tenant Entra para executar esta etapa local.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Desenhe fluxo AD → Entra → SSO → aplicação → dispositivo.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "No diagrams.net, desenhe AD → Entra → IdP/SSO → app e anote fronteiras de confiança.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Liste ativos, identidades humanas e de workload, credenciais, tokens e pontos de autorização.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Modele três ameaças: roubo de token, privilégio excessivo e falha de sincronização; associe prevenção, detecção e recuperação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Valide ao menos um controle existente em laboratório e marque os demais como propostos, sem confundir diagrama com implementação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Para cada fluxo do diagrama, identifique identidade, ativo, confiança, controle e ameaça; valide cenário negativo e risco residual.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Logs Entra + Windows; ferramentas locais",
          "costNote": "Threat modeling com diagrams.net não requer licença premium; controles Entra aplicados dependem de licenças específicas."
        },
        "sources": [
          {
            "label": "Zero Trust Microsoft",
            "url": "https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "advanced",
        "technologies": [
          "zero trust",
          "threat modeling"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-8-1"
        ],
        "challenge": "Explique uma hipótese de falha de Zero Trust e threat modeling. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Diagrama Zero Trust com ameaças e controles"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Zero Trust descreve decisões e fronteiras: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Identifique quem acessa qual recurso, por qual canal e com qual evidência. O IdP, aplicativo, API, RH e administrador pertencem a fronteiras diferentes. Uma seta no diagrama não configura a confiança entre eles."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-8-3",
        "title": "Resiliência, BCP e recuperação",
        "url": "https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.backup",
        "study": [
          {
            "topic": "Backup só é útil quando restaura",
            "detail": "RPO define a perda de dados tolerável; RTO define o tempo desejado de recuperação. Medir restauração de um arquivo não comprova recuperação de toda a cadeia de identidade. Dependências precisam ser revalidadas."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "O kit faz backup consistente do SQLite da aplicação. Keycloak e AD exigem seus próprios backups. Restaure uma cópia isolada, teste login/acesso e registre tempo real sem chamar snapshot de estratégia completa."
          }
        ],
        "practice": [],
        "evidence": "Backup restaurado, divergência identificada e corrigida, acesso retestado e tempos medidos.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Aurora · backup consistente e restauração",
          "platformUrl": "https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.backup",
          "where": "Kit → SQLite da aplicação",
          "steps": [
            {
              "id": "scope",
              "title": "Definir RTO/RPO",
              "text": "Escolha objetivo, por exemplo RTO 10 minutos/RPO 1 hora para o cadastro da aplicação. Anote que Keycloak e AD estão fora deste backup e exigem plano separado.",
              "command": "",
              "expected": ""
            },
            {
              "id": "backup",
              "title": "Gerar cópia consistente",
              "text": "Com o servidor iniciado e joiner aplicado, faça backup. O comando usa a API de backup SQLite, não copia arquivo aberto de forma cega.",
              "command": "python backup.py save aurora-backup.sqlite",
              "expected": "Arquivo criado; ele contém apenas dados fictícios do cadastro."
            },
            {
              "id": "change",
              "title": "Alterar estado controladamente",
              "text": "Aplique mover.csv e confirme o novo departamento. Registre o horário de início do ensaio e pare server.py com Ctrl+C antes de restaurar.",
              "command": "python jml.py mover.csv --apply",
              "expected": ""
            },
            {
              "id": "restore",
              "title": "Restaurar aplicação",
              "text": "Com servidor parado, restaure e confirme digitando RESTAURAR. Reinicie python server.py. O backup restaura somente a aplicação; o IdP pode estar em estado mais novo.",
              "command": "python backup.py restore aurora-backup.sqlite\npython server.py",
              "expected": "Cadastro volta ao momento do backup; a diferença com o RH/IdP fica explícita."
            },
            {
              "id": "reconcile",
              "title": "Reconciliar e medir",
              "text": "Reaplique o CSV correspondente ao estado desejado, confira login e ambos os recursos, e calcule tempo de recuperação/perda de dados. Nunca restaure DC de produção nesta rede.",
              "command": "python jml.py joiner.csv --apply",
              "expected": "Login e autorização retornam ao estado conhecido; RTO/RPO observado registrado."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Kit Aurora iniciado: aplicação/API local e Keycloak.",
          "costNote": "Python 3.11+ e Docker/Compose. Sem tenant cloud. Todos os dados devem ser fictícios; não exponha o kit na internet."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.backup"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "advanced",
        "technologies": [
          "recovery",
          "sqlite"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-4-0"
        ],
        "challenge": "Explique uma hipótese de falha de Resiliência, BCP e recuperação. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "O SQLite restaurado contém o estado do backup e a aplicação inicia."
          },
          {
            "id": "negative-case",
            "text": "Divergência entre destinos foi detectada e reconciliada; tempo medido foi comparado ao objetivo."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Backup só é útil quando restaura: como você explicaria a decisão observada a outra pessoa?",
          "answer": "RPO define a perda de dados tolerável; RTO define o tempo desejado de recuperação. Medir restauração de um arquivo não comprova recuperação de toda a cadeia de identidade. Dependências precisam ser revalidadas."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": true
      }
    ],
    "environment": "Logs gerados nos módulos anteriores; diagrama de arquitetura e inventário de ativos.",
    "outcome": "Painel de evidências, runbooks e teste de recuperação.",
    "requirements": "Detecção de risco e retenção avançada podem exigir licenças adicionais.",
    "number": 9,
    "difficulty": "advanced"
  },
  {
    "id": "p9",
    "title": "Portfólio e carreira",
    "desc": "Transforme estudo em evidência profissional.",
    "items": [
      {
        "id": "iam-9-0",
        "title": "Laboratório IAM ponta a ponta",
        "url": "https://www.rfc-editor.org/rfc/rfc9700.html",
        "study": [
          {
            "topic": "Integração é consistência observada nos destinos",
            "detail": "O evento de RH precisa causar mudanças verificáveis no IdP e no aplicativo. Login, autorização e ciclo de vida são testes diferentes. A Aurora permite observar como desativação no destino bloqueia até sessão local existente."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Falhas parciais são esperadas em sistemas distribuídos. Mostre como detectar e reconciliar; a execução deve tolerar repetição sem duplicar a identidade. Não apresente uma sequência de capturas sem provar que as mesmas entidades foram usadas."
          }
        ],
        "practice": [],
        "evidence": "Ciclo JML completo, OIDC/API, testes negativos, reconciliação e restauração demonstrados com E001.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Aurora · avaliação integrada",
          "platformUrl": "https://www.rfc-editor.org/rfc/rfc9700.html",
          "where": "Mesmo employeeId em RH, IdP e aplicação",
          "steps": [
            {
              "id": "baseline",
              "title": "Estabelecer ponto inicial",
              "text": "Confira versões, saúde dos serviços, backup e ausência de duplicatas. Defina uma matriz de resultados para Ana e Carla antes de executar.",
              "command": "",
              "expected": ""
            },
            {
              "id": "joiner",
              "title": "Provar admissão",
              "text": "Aplique joiner.csv; faça login de Ana; FIN deve permitir e JUR negar. Em janela privada sem login, FIN deve dar 401.",
              "command": "python jml.py joiner.csv --apply",
              "expected": ""
            },
            {
              "id": "mover",
              "title": "Provar transferência",
              "text": "Aplique mover.csv e repita os testes com o mesmo usuário. Confirme mesmo id no destino.",
              "command": "python jml.py mover.csv --apply",
              "expected": "FIN 403 e JUR 200, sem nova identidade."
            },
            {
              "id": "idempotency",
              "title": "Provar repetição e reconciliação",
              "text": "Execute mover.csv novamente, confirme unicidade. Introduza uma divergência controlada no destino e reaplique para corrigir. Registre causa e efeito, não apenas mensagem de sucesso.",
              "command": "",
              "expected": ""
            },
            {
              "id": "leaver",
              "title": "Provar desligamento",
              "text": "Aplique leaver.csv. Teste a sessão existente e novo login. Registre se a resposta foi 401 ou 403 e explique o papel da expiração/token e da verificação de active na aplicação.",
              "command": "python jml.py leaver.csv --apply",
              "expected": "Nenhum acesso a FIN/JUR; nova autenticação de Ana bloqueada."
            },
            {
              "id": "recovery",
              "title": "Provar recuperação",
              "text": "Execute a lição de backup/restauração e reconcilie com RH. Correlacione eventos de SCIM e acesso em events.jsonl, sem tokens.",
              "command": "",
              "expected": ""
            },
            {
              "id": "review",
              "title": "Defender a arquitetura",
              "text": "Explique origem autoritativa, confiança no emissor, validação de audiência, regra de autorização, risco de falha parcial e limites do kit. Separe componentes reais de extensões Microsoft não executadas.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Kit Aurora iniciado: aplicação/API local e Keycloak.",
          "costNote": "Python 3.11+ e Docker/Compose. Sem tenant cloud. Todos os dados devem ser fictícios; não exponha o kit na internet."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://www.rfc-editor.org/rfc/rfc9700.html"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "advanced",
        "technologies": [
          "jml",
          "oidc",
          "scim"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-4-0",
          "iam-8-3"
        ],
        "challenge": "Explique uma hipótese de falha de Laboratório IAM ponta a ponta. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "Todos os cenários de admissão, transferência e desligamento atingiram o resultado esperado."
          },
          {
            "id": "negative-case",
            "text": "Repetição, divergência, chamada não autorizada e recuperação foram testadas sem ampliar privilégios."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Integração é consistência observada nos destinos: como você explicaria a decisão observada a outra pessoa?",
          "answer": "O evento de RH precisa causar mudanças verificáveis no IdP e no aplicativo. Login, autorização e ciclo de vida são testes diferentes. A Aurora permite observar como desativação no destino bloqueia até sessão local existente."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": true
      },
      {
        "id": "iam-9-1",
        "title": "Documentação técnica e evidências",
        "url": "https://docs.github.com/pt/get-started",
        "study": [
          {
            "topic": "Documentação serve para outra pessoa reproduzir",
            "detail": "Guarde objetivo, versão, dados fictícios, configuração, resultado esperado/observado e limitação. Uma captura sem contexto não explica o teste. Um segredo removido da última versão pode continuar no histórico do Git."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "No portal, evidências são notas locais e referências a arquivos sanitizados. Faça revisão antes de publicar portfólio e mantenha as partes simuladas identificadas. Não é necessário publicar os arquivos de configuração do laboratório."
          }
        ],
        "practice": [],
        "evidence": "Estudo de caso com capturas anonimizadas",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "GitHub / Markdown",
          "platformUrl": "https://github.com",
          "where": "Repositório de laboratório → Documentação",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra a ferramenta local indicada em «GitHub / Markdown» no computador ou VM de laboratório. Caminho de referência: Repositório de laboratório → Documentação. Use conta autorizada do ambiente de teste. Não é necessário entrar no tenant Entra para executar esta etapa local.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Desenhe topologia atual com nomes fictícios e versões.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Crie pasta docs/labs com LAB-01 a LAB-10, README de ambiente e índice de evidências.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Para cada prática, registre objetivo, pré-requisitos, passos, resultado esperado, resultado observado e problema encontrado.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Inclua capturas sanitizadas e comandos sem tokens, senhas, emails reais ou chaves de recuperação.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Faça revisão de segurança antes de publicar; marque claramente simulações, licenças ausentes e limitações do laboratório.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Revise evidências para remoção de segredos, UPNs reais e tokens; teste links, versão, data e reprodução por outro operador.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Todos os componentes anteriores, iniciados conforme o cenário",
          "costNote": "GitHub e Markdown permitem documentação sem custo obrigatório; repositórios públicos nunca devem conter segredos ou dados pessoais."
        },
        "sources": [
          {
            "label": "Documentação de repositórios GitHub",
            "url": "https://docs.github.com/en/repositories"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "advanced",
        "technologies": [
          "portfolio",
          "audit"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-9-0"
        ],
        "challenge": "Explique uma hipótese de falha de Documentação técnica e evidências. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Estudo de caso com capturas anonimizadas"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Documentação serve para outra pessoa reproduzir: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Guarde objetivo, versão, dados fictícios, configuração, resultado esperado/observado e limitação. Uma captura sem contexto não explica o teste. Um segredo removido da última versão pode continuar no histórico do Git."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      },
      {
        "id": "iam-9-2",
        "title": "Cenários e entrevistas técnicas",
        "url": "https://learn.microsoft.com/pt-br/credentials/",
        "study": [
          {
            "topic": "Diagnóstico é teste de hipóteses",
            "detail": "Comece pelo sintoma e por uma hipótese falsificável. Colete evidência antes de alterar e mude uma variável por vez. Uma correção só se sustenta quando o teste original passa e um cenário negativo continua negado."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "Entrevistas técnicas valorizam explicar limites e decisões. Dizer que resetou tudo não demonstra causa raiz. Mostre hipótese, teste, evidência, correção, reversão e prevenção."
          }
        ],
        "practice": [],
        "evidence": "Três diagnósticos com causa-raiz",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra + Windows Event Viewer",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Logs de entrada / Visualizador de Eventos",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra os logs de entrada do Entra e o Event Viewer do Windows Server conforme o cenário escolhido; use contas de laboratório e compare eventos pelo horário. Não misture logs de produção.",
              "command": "",
              "expected": ""
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Investigue falha fictícia de DNS e registre hipótese/teste.",
              "command": "",
              "expected": ""
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Cenário 1: falha DNS; compare nslookup, IP configurado e resolução do DC antes de alterar configuração.",
              "command": "",
              "expected": ""
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Cenário 2: falha SSO; compare redirect URI/ACS, audience, relógio, claims e atribuição de usuário.",
              "command": "",
              "expected": ""
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Cenário 3: acesso indevido ou revogação incompleta; examine grupos, tokens/sessões e logs de auditoria.",
              "command": "",
              "expected": ""
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Para cada caso escreva sintomas, hipótese, comando/consulta, resultado, correção e teste de regressão; diferencie exercício simulado de incidente real.",
              "command": "",
              "expected": ""
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Registre hipótese, decisão, impacto e recuperação para cada cenário; identifique claramente testes realizados e simulações.",
              "command": "",
              "expected": ""
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Todos os componentes anteriores, iniciados conforme o cenário",
          "costNote": "Simulações e entrevistas podem ser feitas sem licença; diferencie evidência de teste real e hipótese."
        },
        "sources": [
          {
            "label": "Microsoft Learn: treinamento de identidade",
            "url": "https://learn.microsoft.com/en-us/training/browse/?products=entra-id"
          }
        ],
        "revision": "2026.10.28.1",
        "difficulty": "advanced",
        "technologies": [
          "troubleshooting",
          "logs"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-9-1"
        ],
        "challenge": "Explique uma hipótese de falha de Cenários e entrevistas técnicas. Qual log, comando ou decisão permitiria confirmá-la? Corrija uma causa controlada e repita o teste sem ampliar permissões.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "expected-result",
            "text": "A entrega foi observada no ambiente: Três diagnósticos com causa-raiz"
          },
          {
            "id": "negative-case",
            "text": "Um cenário fora do escopo ou sem permissão foi negado, com motivo e evidência; se apenas documental, foi marcado como simulação."
          },
          {
            "id": "restore-evidence",
            "text": "Estado final e reversão registrados; evidências sem segredos, indicando o que foi real e o que foi simulado."
          }
        ],
        "recall": {
          "question": "Diagnóstico é teste de hipóteses: como você explicaria a decisão observada a outra pessoa?",
          "answer": "Comece pelo sintoma e por uma hipótese falsificável. Colete evidência antes de alterar e mude uma variável por vez. Uma correção só se sustenta quando o teste original passa e um cenário negativo continua negado."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "kit": false
      }
    ],
    "environment": "O mesmo ambiente construído no percurso local ou Microsoft/híbrido.",
    "outcome": "Ciclo integrado demonstrado, evidências sanitizadas, diagnóstico e recuperação.",
    "requirements": "O projeto local é executável. Integrações premium não executadas permanecem identificadas como pendências práticas.",
    "number": 10,
    "difficulty": "advanced"
  }
];
