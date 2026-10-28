'use strict';
const CURRICULUM_VERSION="2026.10.28.2";
const PHASES=[
  {
    "id": "prep",
    "number": 0,
    "title": "Preparação da empresa e do ambiente",
    "desc": "Leia o desenho, prepare as VMs e construa o IdP quando chegar à etapa 04.",
    "environment": "Computador pessoal, navegador e ferramentas conforme percurso.",
    "requirements": "Local: Python e Docker. Híbrido: VMs Windows/licenças compatíveis. Recursos premium são opcionais.",
    "outcome": "Ambiente iniciado, identidades fictícias e primeira decisão de acesso.",
    "difficulty": "beginner",
    "items": [
      {
        "id": "prep-route",
        "title": "Conhecer a empresa e preparar a construção",
        "url": "https://www.keycloak.org/getting-started/getting-started-docker",
        "study": [
          {
            "topic": "A empresa vem antes da ferramenta",
            "detail": "A Arquitetura define quem são as pessoas, seus vínculos, grupos, sistemas e resultados esperados. Você não precisa inventar uma empresa enquanto estuda: cada ação das aulas usa esse contrato."
          },
          {
            "topic": "Um laboratório construído por você",
            "detail": "As etapas seguem rede, diretório, identidade cloud, IdP, aplicação e controles. Você instala serviços e cria configurações manualmente, entendendo os limites entre cada sistema. Recursos licenciados são identificados quando aparecem."
          },
          {
            "topic": "Conferir não é apenas avançar",
            "detail": "Próximo passo muda a leitura, sem registrar execução. Confirme somente depois de executar e comparar o resultado. Uma parte não disponível deve ficar identificada como simulação ou pendência prática."
          }
        ],
        "practice": [],
        "evidence": "Arquitetura lida, rh.csv criado e ambiente de trabalho definido.",
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
          "platform": "Arquitetura → empresa, identidades e fluxos",
          "platformUrl": "https://www.keycloak.org/getting-started/getting-started-docker",
          "where": "Arquitetura → empresa, identidades e fluxos",
          "steps": [
            {
              "id": "blueprint",
              "title": "Abrir o desenho antes de instalar",
              "text": "No menu lateral clique Arquitetura. Leia a empresa Aurora, as cinco camadas da topologia e os quatro fluxos. Em seguida abra Construção microsegmentada → 01. Não pule diretamente para uma ferramenta.",
              "command": "",
              "expected": "Você consegue apontar RH, DC01, CL01, IDP01, APP01 e TENANT01 no desenho.",
              "host": "Portal de estudos",
              "why": "Saber quem é responsável por cada etapa evita confundir cadastro, login e autorização."
            },
            {
              "id": "people",
              "title": "Fixar o cadastro de referência",
              "text": "Na Arquitetura, localize a tabela de pessoas. O piloto é E001/Ana e E002/Carla. Ana começa em Financeiro, Carla em Jurídico. E003/Bruno e E004/Diego são os revisores. Não invente novos nomes no meio da prática.",
              "command": "",
              "expected": "E001 permanece o mesmo antes/depois de uma transferência.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "A Aurora é uma empresa fictícia com Financeiro, Jurídico e TI."
            },
            {
              "id": "workspace",
              "title": "Criar sua pasta de trabalho",
              "text": "No seu computador, crie a pasta abaixo. Ela guardará os arquivos que você vai construir ao longo das aulas; não há pacote para baixar. Não use pasta de trabalho corporativa.",
              "command": "New-Item -ItemType Directory -Force C:\\AuroraLab\nSet-Location C:\\AuroraLab",
              "expected": "Pasta C:\\AuroraLab existe e o terminal está nela.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "A Aurora é uma empresa fictícia com Financeiro, Jurídico e TI."
            },
            {
              "id": "hr",
              "title": "Criar manualmente o cadastro do RH",
              "text": "Abra um editor, crie C:\\AuroraLab\\rh.csv e transcreva o cadastro abaixo. O arquivo documenta o estado desejado; não provisiona contas por si só.",
              "command": "employeeId,userName,displayName,department,manager,status\nE001,fin.ana,Ana Lima,Financeiro,E003,active\nE002,jur.carla,Carla Souza,Jurídico,E004,active\nE003,fin.bruno,Bruno Costa,Financeiro,E006,active\nE004,jur.diego,Diego Alves,Jurídico,E006,active\nE005,ti.operador,Paulo Silva,TI,E006,active\nE006,rh.marina,Marina Rocha,RH,,active",
              "expected": "CSV tem seis IDs distintos; só E001/E002 serão criados no primeiro piloto.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "A Aurora é uma empresa fictícia com Financeiro, Jurídico e TI."
            },
            {
              "id": "events",
              "title": "Ler a sequência de movimentos",
              "text": "Abra Arquitetura → Movimentações. J001 cria os acessos de Ana no Financeiro. M001 remove Financeiro e concede Jurídico. L001 bloqueia o vínculo. Escreva os resultados FIN/JUR esperados antes de executar.",
              "command": "",
              "expected": "J001: FIN 200/JUR 403. M001: FIN 403/JUR 200. L001: nenhum acesso.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "A Aurora é uma empresa fictícia com Financeiro, Jurídico e TI."
            },
            {
              "id": "tools",
              "title": "Conferir as ferramentas necessárias",
              "text": "Use as referências oficiais desta lição para instalar PowerShell 7, Node.js 22+ e Docker com Engine funcional no HOST01. Windows Server/cliente serão instalados na próxima lição. Não ative licença/trial cloud nesta etapa.",
              "command": "pwsh --version\nnode --version\ndocker version",
              "expected": "Versões aparecem; docker version mostra Client e Server. Se Server falha, abra o Engine antes de continuar.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "A Aurora é uma empresa fictícia com Financeiro, Jurídico e TI."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Arquitetura → empresa, identidades e fluxos",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Instalar PowerShell",
            "url": "https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell"
          },
          {
            "label": "Instalar Node.js",
            "url": "https://nodejs.org/en/download"
          },
          {
            "label": "Instalar Docker",
            "url": "https://docs.docker.com/get-started/get-docker/"
          }
        ],
        "revision": "2026.10.28.2",
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Use dados fictícios. Desfaça a alteração de teste e repita os testes de acesso; não apague dados para esconder uma falha.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "A entrega desta lição foi observada: Arquitetura lida, rh.csv criado e ambiente de trabalho definido."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Registrar a empresa e rh.csv, os eventos J001/M001/L001 e as ferramentas necessárias. A Arquitetura define quem são as pessoas, seus vínculos, grupos, sistemas e resultados esperados. Você não precisa inventar uma empresa enquanto estuda: cada ação das aulas usa esse contrato."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 1,
        "stageId": "plan",
        "stageLabel": "01 · Empresa e rede",
        "labAction": "Registrar a empresa e rh.csv, os eventos J001/M001/L001 e as ferramentas necessárias."
      },
      {
        "id": "prep-local",
        "title": "Construir IDP01: instalar e configurar o Keycloak",
        "url": "https://www.keycloak.org/getting-started/getting-started-docker",
        "study": [
          {
            "topic": "Qual parte será construída",
            "detail": "Você instalará IDP01 no HOST01 e criará o realm aurora pela interface. AD e Entra são fronteiras separadas. O cadastro manual do mesmo piloto permite entender a correlação antes de automatizar."
          },
          {
            "topic": "O que fica persistido",
            "detail": "O volume aurora-keycloak mantém as configurações do servidor. Senhas são escolhidas por você e não aparecem no material. Criar um realm não cria a APP01 nem o cadastro SCIM: isso acontece nas aulas seguintes."
          }
        ],
        "practice": [],
        "evidence": "IDP01 instalado, realm aurora e dois usuários/papéis criados por você.",
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
          "platform": "HOST01 → instalar IDP01 e configurar o realm",
          "platformUrl": "https://www.keycloak.org/getting-started/getting-started-docker",
          "where": "HOST01 → instalar IDP01 e configurar o realm",
          "steps": [
            {
              "id": "check-docker",
              "title": "Conferir o Engine",
              "text": "No HOST01 abra PowerShell 7. Docker precisa responder com Client e Server. Se IDP01 já existe de uma tentativa anterior, use docker start IDP01; não crie outro container com o mesmo nome.",
              "command": "docker version\ndocker ps -a",
              "expected": "Você sabe se vai criar ou retomar IDP01.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você instalará IDP01 no HOST01 e criará o realm aurora pela interface."
            },
            {
              "id": "install",
              "title": "Subir somente o servidor Keycloak",
              "text": "Escolha a senha administrativa no prompt protegido. O comando cria um volume persistente e publica apenas loopback. Não há Compose nem importação de realm pronto.",
              "command": "Set-Location C:\\AuroraLab\n$env:KC_BOOTSTRAP_ADMIN_PASSWORD = Read-Host -MaskInput \"Senha exclusiva do admin Keycloak\"\ndocker volume create aurora-keycloak\ndocker run -d --name IDP01 -p 127.0.0.1:8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD -v aurora-keycloak:/opt/keycloak/data quay.io/keycloak/keycloak:26.8.1 start-dev\nRemove-Item Env:KC_BOOTSTRAP_ADMIN_PASSWORD",
              "expected": "docker logs IDP01 mostra inicialização; http://localhost:8080 abre.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você instalará IDP01 no HOST01 e criará o realm aurora pela interface."
            },
            {
              "id": "login",
              "title": "Abrir administração",
              "text": "No navegador do HOST01 abra http://localhost:8080. Acesse Administration Console e entre como admin com a senha escolhida. O realm master serve à administração, não ao aplicativo.",
              "command": "",
              "expected": "Console administrativa abre sem publicar a senha.",
              "host": "HOST01 · navegador",
              "why": "Você instalará IDP01 no HOST01 e criará o realm aurora pela interface."
            },
            {
              "id": "realm",
              "title": "Criar o realm manualmente",
              "text": "No seletor de realm, clique Manage realms/Create realm. Realm name aurora; Enabled ON. Create. Confira que o seletor mudou de master para aurora.",
              "command": "",
              "expected": "A URL/contexto aponta para aurora.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você instalará IDP01 no HOST01 e criará o realm aurora pela interface."
            },
            {
              "id": "profile",
              "title": "Definir atributos do vínculo",
              "text": "Em Realm settings → User profile, crie employeeId e department. Permita edição somente a administradores; não os torne obrigatórios no login inicial. employeeId será E001/E002; department Financeiro/Jurídico. A aplicação usará cadastro próprio para autorização, não confiará só em um atributo editável pelo usuário.",
              "command": "",
              "expected": "Atributos aparecem no formulário administrado de usuário.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você instalará IDP01 no HOST01 e criará o realm aurora pela interface."
            },
            {
              "id": "ana",
              "title": "Criar Ana no IdP",
              "text": "Users → Add user: Username fin.ana; First name Ana; Last name Lima; Email fin.ana@example.test; Enabled ON. Preencha employeeId E001 e department Financeiro, salve. Em Credentials → Set password escolha senha de teste; Temporary OFF apenas para este usuário fictício.",
              "command": "",
              "expected": "fin.ana existe uma vez no realm; nenhum vínculo com AD foi criado automaticamente.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você instalará IDP01 no HOST01 e criará o realm aurora pela interface."
            },
            {
              "id": "carla",
              "title": "Criar Carla de controle",
              "text": "Repita para jur.carla, Carla Souza, jur.carla@example.test, employeeId E002 e department Jurídico. Use senha própria. Não modifique a senha do admin para uma credencial compartilhada.",
              "command": "",
              "expected": "E002 existe separadamente de E001.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você instalará IDP01 no HOST01 e criará o realm aurora pela interface."
            },
            {
              "id": "roles",
              "title": "Criar papéis de demonstração",
              "text": "Realm roles → Create role: FIN-LEITOR, JUR-LEITOR e TI-OPERADOR. Users → fin.ana → Role mapping → Assign role FIN-LEITOR; em jur.carla atribua JUR-LEITOR. As permissões da APP01 serão conferidas também no cadastro do destino.",
              "command": "",
              "expected": "Papéis correspondem à tabela da Arquitetura.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você instalará IDP01 no HOST01 e criará o realm aurora pela interface."
            },
            {
              "id": "stop",
              "title": "Aprender a parar sem apagar",
              "text": "Registre o nome e o volume. docker stop interrompe; docker start retoma. Não remova o volume para corrigir uma configuração do realm. Deixe IDP01 iniciado para a aula OIDC.",
              "command": "docker stop IDP01\ndocker start IDP01",
              "expected": "Realm e usuários permanecem após reiniciar.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você instalará IDP01 no HOST01 e criará o realm aurora pela interface."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "HOST01 → instalar IDP01 e configurar o realm",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Instalação oficial Keycloak",
            "url": "https://www.keycloak.org/getting-started/getting-started-docker"
          },
          {
            "label": "Guia administrativo e User Profile",
            "url": "https://www.keycloak.org/docs/latest/server_admin/index.html"
          }
        ],
        "revision": "2026.10.28.2",
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Use dados fictícios. Desfaça a alteração de teste e repita os testes de acesso; não apague dados para esconder uma falha.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "A entrega desta lição foi observada: IDP01 instalado, realm aurora e dois usuários/papéis criados por você."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "IDP01 instalado, realm aurora e dois usuários/papéis criados por você. Você instalará IDP01 no HOST01 e criará o realm aurora pela interface. AD e Entra são fronteiras separadas. O cadastro manual do mesmo piloto permite entender a correlação antes de automatizar."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 16,
        "stageId": "protocols",
        "stageLabel": "04 · IdP e aplicações",
        "labAction": "Instalar IDP01 e criar manualmente realm, atributos, usuários e papéis."
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
        "evidence": "DC01/CL01 isolados, nomes e endereços fixos e recuperação inicial registrada.",
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
          "windows",
          "active directory"
        ],
        "difficulty": "beginner",
        "guide": {
          "platform": "HOST01 → virtualizador → DC01 e CL01",
          "platformUrl": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-",
          "where": "HOST01 → virtualizador → DC01 e CL01",
          "steps": [
            {
              "id": "network-plan",
              "title": "Reservar os endereços",
              "text": "Leia a tabela de ativos na Arquitetura. Use rede host-only/interna 192.168.56.0/24, DC01 .10 e CL01 .20. Não conecte essas VMs como bridge à rede de trabalho. Se sua rede já usa esse intervalo, registre outro /24 e substitua os endereços de forma consistente.",
              "command": "",
              "expected": "O desenho identifica rede isolada, dois IPs distintos e DNS do cliente apontando ao DC.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "AD DS usa DNS e autenticação próprios."
            },
            {
              "id": "server-vm",
              "title": "Criar DC01",
              "text": "No virtualizador, crie VM Windows Server 2022 ou 2025 com ISO oficial/licença ou avaliação válida. Como estimativa inicial, use 2 vCPU, 4 GB de RAM e disco de 60 GB; ajuste à versão e capacidade do host. Conecte-a somente à rede reservada. Conclua instalação e atualizações.",
              "command": "",
              "expected": "Windows Server inicia; a conta administrativa é exclusiva da VM.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "AD DS usa DNS e autenticação próprios."
            },
            {
              "id": "client-vm",
              "title": "Criar CL01",
              "text": "Crie VM Windows 11 Pro/Enterprise suportada, com TPM/UEFI conforme requisitos. Reserve recursos segundo a documentação da versão, sem ultrapassar a memória do host. Windows Home não ingressa no domínio. Use a mesma rede isolada.",
              "command": "",
              "expected": "CL01 inicia; ainda está em grupo de trabalho, não no domínio.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "AD DS usa DNS e autenticação próprios."
            },
            {
              "id": "rename",
              "title": "Nomear as máquinas",
              "text": "Em cada VM abra PowerShell como administrador. Em DC01 use o primeiro comando; em CL01 troque NewName para CL01. Reinicie cada uma. Não rode ambos no mesmo computador.",
              "command": "Rename-Computer -NewName DC01 -Restart",
              "expected": "Os nomes exibidos após o reinício são DC01 e CL01.",
              "host": "DC01 e CL01 · PowerShell administrativo",
              "why": "AD DS usa DNS e autenticação próprios."
            },
            {
              "id": "ip",
              "title": "Configurar IP no Windows",
              "text": "Em DC01 abra Configurações de rede → Alterar opções do adaptador → adaptador de laboratório → Propriedades → IPv4. IP 192.168.56.10, máscara 255.255.255.0, DNS 192.168.56.10. Em CL01 use .20 e o mesmo DNS .10. Gateway fica vazio se sua rede não tiver roteador. Não desative o firewall inteiro.",
              "command": "ipconfig /all",
              "expected": "Cada VM exibe o endereço correto. O DNS ainda não responde como domínio: AD DS será instalado depois.",
              "host": "DC01 e CL01",
              "why": "AD DS usa DNS e autenticação próprios."
            },
            {
              "id": "checkpoint",
              "title": "Guardar ponto inicial",
              "text": "Desligue ambas as VMs e crie checkpoint de antes do domínio. Registre a rede e os recursos atribuídos. Ligue DC01 e CL01 para a próxima aula. Checkpoint é apoio de laboratório; backup consistente de AD será tratado em resiliência.",
              "command": "",
              "expected": "Há um ponto anterior à promoção e nenhuma VM toca em produção.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "AD DS usa DNS e autenticação próprios."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "HOST01 → virtualizador → DC01 e CL01",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-"
          }
        ],
        "revision": "2026.10.28.2",
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Use dados fictícios. Desfaça a alteração de teste e repita os testes de acesso; não apague dados para esconder uma falha.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "A entrega desta lição foi observada: DC01/CL01 isolados, nomes e endereços fixos e recuperação inicial registrada."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "DC01/CL01 isolados, nomes e endereços fixos e recuperação inicial registrada. AD DS usa DNS e autenticação próprios. Um tenant Entra não cria domínio Windows nem dá automaticamente às pastas locais os grupos cloud. Você construirá o domínio em uma rede de VMs isolada."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 2,
        "stageId": "plan",
        "stageLabel": "01 · Empresa e rede",
        "labAction": "DC01/CL01 isolados, nomes e endereços fixos e recuperação inicial registrada."
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
        "evidence": "Piloto cloud e grupo criados sem duplicar os funcionários do AD.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Entra → objetos cloud-only de teste",
          "platformUrl": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users",
          "where": "Entra → objetos cloud-only de teste",
          "steps": [
            {
              "id": "tenant",
              "title": "Usar o tenant preparado",
              "text": "Na lição Tenant/roles crie ou selecione TENANT01 autorizado e registre SEU-TENANT.onmicrosoft.com. Esta lição não fornece uma conta Microsoft nem garante elegibilidade a tenant gratuito.",
              "command": "",
              "expected": "Tenant de estudo confirmado.",
              "host": "Navegador → entra.microsoft.com",
              "why": "Ana é a pessoa; E001 é o identificador do vínculo; fin.ana é a conta; a senha é uma credencial."
            },
            {
              "id": "pilot",
              "title": "Criar um usuário cloud separado",
              "text": "Entra ID → Users → New user → Create. UPN cloud.piloto@SEU-TENANT.onmicrosoft.com; Display name Piloto Cloud; Department TI. Gere senha inicial e guarde fora das notas. Não crie fin.ana ou jur.carla na nuvem: eles virão do AD.",
              "command": "",
              "expected": "cloud.piloto é Member, cloud-only e sem papel administrativo.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Ana é a pessoa; E001 é o identificador do vínculo; fin.ana é a conta; a senha é uma credencial."
            },
            {
              "id": "group",
              "title": "Criar grupo do piloto cloud",
              "text": "Entra ID → Groups → New group → Security. Nome LAB-CLOUD-PILOTO; Membership Assigned. Adicione somente cloud.piloto. Os grupos GG-FIN/GG-JUR virão do AD no exercício de sincronização.",
              "command": "",
              "expected": "O piloto cloud pertence a LAB-CLOUD-PILOTO.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Ana é a pessoa; E001 é o identificador do vínculo; fin.ana é a conta; a senha é uma credencial."
            },
            {
              "id": "verify",
              "title": "Verificar acesso cotidiano",
              "text": "Em janela privada entre como cloud.piloto. Confira perfil e tente abrir uma ação de administração restrita. Não transforme a conta em administrador para fazê-la funcionar.",
              "command": "",
              "expected": "Login funciona e administração não autorizada é negada.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Ana é a pessoa; E001 é o identificador do vínculo; fin.ana é a conta; a senha é uma credencial."
            },
            {
              "id": "b2b",
              "title": "Registrar o convidado opcional",
              "text": "Se controlar email externo de teste, convide ext.consultoria como G001 e registre o estado. Caso contrário, deixe G001 como planejado; não bloqueia o núcleo da aula. Não use email de terceiro sem autorização.",
              "command": "",
              "expected": "Nenhum convidado recebe administração por padrão.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Ana é a pessoa; E001 é o identificador do vínculo; fin.ana é a conta; a senha é uma credencial."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Entra → objetos cloud-only de teste",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "beginner",
        "technologies": [
          "entra"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-2-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "A entrega desta lição foi observada: Piloto cloud e grupo criados sem duplicar os funcionários do AD."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Piloto cloud e grupo criados sem duplicar os funcionários do AD. Ana é a pessoa; E001 é o identificador do vínculo; fin.ana é a conta; a senha é uma credencial. Trocar departamento não deve criar uma nova pessoa. O RH determina vínculo; os sistemas consumidores mantêm suas contas."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 11,
        "stageId": "cloud",
        "stageLabel": "03 · Identidade cloud",
        "labAction": "Piloto cloud e grupo criados sem duplicar os funcionários do AD."
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
        "evidence": "Matriz aplicada em ACL NTFS com testes positivos e negativos de Ana/Carla.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "CL01 → pastas locais e grupos do domínio",
          "platformUrl": "https://csrc.nist.gov/projects/role-based-access-control",
          "where": "CL01 → pastas locais e grupos do domínio",
          "steps": [
            {
              "id": "matrix",
              "title": "Definir a regra antes da ACL",
              "text": "Ana/E001 lê FIN e deve ser negada em JUR. Carla/E002 tem o inverso. A regra nesta lição é Windows/NTFS; a autorização da APP01 será construída mais tarde.",
              "command": "",
              "expected": "Matriz registrada antes de conceder permissões.",
              "host": "Portal → Arquitetura → Matriz",
              "why": "Login confirma a identidade; autorização verifica se aquela identidade pode executar uma ação no recurso."
            },
            {
              "id": "folders",
              "title": "Criar recursos no cliente",
              "text": "Em CL01, entre com conta administrativa autorizada apenas para configurar pastas. Crie os dois diretórios e um arquivo em cada um.",
              "command": "New-Item -ItemType Directory -Force C:\\AuroraRecursos\\FIN,C:\\AuroraRecursos\\JUR\n\"FIN de teste\" | Set-Content C:\\AuroraRecursos\\FIN\\leitura.txt\n\"JUR de teste\" | Set-Content C:\\AuroraRecursos\\JUR\\leitura.txt",
              "expected": "Dois arquivos existem.",
              "host": "CL01 · PowerShell administrativo",
              "why": "Login confirma a identidade; autorização verifica se aquela identidade pode executar uma ação no recurso."
            },
            {
              "id": "acl-fin",
              "title": "Aplicar ACL à pasta FIN",
              "text": "No Explorer: FIN → Properties → Security → Advanced. Desabilite herança escolhendo converter permissões. Preserve SYSTEM e Administrators com controle total. Remova Users/Authenticated Users/Everyone se existirem com leitura ampla. Adicione AURORA\\GG-FIN-LEITURA com Read & execute, aplicado a pasta/subpastas/arquivos. Não use Deny amplo.",
              "command": "",
              "expected": "Acesso comum vem apenas do grupo FIN; administradores continuam capazes de recuperar.",
              "host": "CL01 · Explorer administrativo",
              "why": "Login confirma a identidade; autorização verifica se aquela identidade pode executar uma ação no recurso."
            },
            {
              "id": "acl-jur",
              "title": "Repetir na pasta JUR",
              "text": "Repita exatamente a lógica, trocando grupo para AURORA\\GG-JUR-LEITURA. Verifique entradas herdadas/conversão antes de testar. Não retire SYSTEM/Administrators.",
              "command": "",
              "expected": "O grupo FIN não aparece como leitura em JUR.",
              "host": "CL01",
              "why": "Login confirma a identidade; autorização verifica se aquela identidade pode executar uma ação no recurso."
            },
            {
              "id": "test-ana",
              "title": "Testar com conta comum",
              "text": "Saia da conta administrativa e entre como AURORA\\fin.ana. Leia ambos os arquivos. Não abra terminal elevado para o teste: isso invalidaria a comparação.",
              "command": "Get-Content C:\\AuroraRecursos\\FIN\\leitura.txt\nGet-Content C:\\AuroraRecursos\\JUR\\leitura.txt",
              "expected": "FIN é lido; JUR dá acesso negado.",
              "host": "CL01 · sessão Ana",
              "why": "Login confirma a identidade; autorização verifica se aquela identidade pode executar uma ação no recurso."
            },
            {
              "id": "test-carla",
              "title": "Testar a identidade de controle",
              "text": "Saia de Ana e entre como AURORA\\jur.carla. Repita as duas leituras. Se ambas funcionarem, revise a ACL em vez de conceder mais privilégios.",
              "command": "",
              "expected": "Carla lê JUR e é negada em FIN.",
              "host": "CL01 · sessão Carla",
              "why": "Login confirma a identidade; autorização verifica se aquela identidade pode executar uma ação no recurso."
            },
            {
              "id": "model",
              "title": "Diferenciar RBAC e ABAC",
              "text": "Registre: os grupos realizam a associação de papel/permissão neste recurso Windows. A APP01 acrescentará atributos active/department além do papel. Não conclua que um grupo Entra controla esta pasta sem integração.",
              "command": "",
              "expected": "Você explica qual sistema tomou cada decisão.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Login confirma a identidade; autorização verifica se aquela identidade pode executar uma ação no recurso."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "CL01 → pastas locais e grupos do domínio",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://csrc.nist.gov/projects/role-based-access-control"
          }
        ],
        "revision": "2026.10.28.2",
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
          "iam-1-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "A entrega desta lição foi observada: Matriz aplicada em ACL NTFS com testes positivos e negativos de Ana/Carla."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Matriz aplicada em ACL NTFS com testes positivos e negativos de Ana/Carla. Login confirma a identidade; autorização verifica se aquela identidade pode executar uma ação no recurso. Na Aurora, uma conta ativa do Financeiro recebe 200 em FIN e 403 em JUR. Um token válido sozinho não concede acesso a tudo."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 5,
        "stageId": "directory",
        "stageLabel": "02 · Diretório e grupos",
        "labAction": "Matriz aplicada em ACL NTFS com testes positivos e negativos de Ana/Carla."
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
        "evidence": "Rede e DNS diferenciados de TCP/TLS; consulta SRV retestada após AD DS.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "DC01 / CL01 → resolução, conexão e confiança",
          "platformUrl": "https://learn.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname",
          "where": "DC01 / CL01 → resolução, conexão e confiança",
          "steps": [
            {
              "id": "inventory",
              "title": "Conferir a camada de rede",
              "text": "Em ambas as VMs execute o comando e compare IP/máscara com a Arquitetura. Nesta etapa o domínio ainda não existe. Não trate erro de consulta SRV como erro de uma instalação que ainda não aconteceu.",
              "command": "Get-NetIPConfiguration",
              "expected": "DC01=.10 e CL01=.20; mesma rede /24.",
              "host": "DC01 e CL01",
              "why": "DNS transforma nome em endereço."
            },
            {
              "id": "localhost",
              "title": "Resolver antes de conectar",
              "text": "No HOST01 consulte localhost. Ele resolve para loopback, mas isso não prova que um serviço está rodando. Não instale DNS corporativo no host só para este teste.",
              "command": "Resolve-DnsName localhost",
              "expected": "Resposta de loopback. APP01 ainda será construída.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "DNS transforma nome em endereço."
            },
            {
              "id": "port",
              "title": "Entender o teste de porta",
              "text": "Em CL01 teste TCP 53 para DC01 antes e depois da instalação DNS/AD da próxima lição. Registre a diferença. Test-NetConnection testa TCP, não comprova sozinho UDP nem resolução de nomes.",
              "command": "Test-NetConnection 192.168.56.10 -Port 53",
              "expected": "Após DNS instalado e regra correta, conexão TCP funciona. Antes, pode falhar.",
              "host": "CL01",
              "why": "DNS transforma nome em endereço."
            },
            {
              "id": "tls",
              "title": "Inspecionar TLS",
              "text": "Abra uma documentação oficial HTTPS no navegador, veja certificado, emissor, SAN e validade. Compare com IDP01/APP01: eles usarão HTTP exclusivamente em loopback no laboratório; não há certificado TLS ali. Não ignore alertas do navegador para forçar sucesso.",
              "command": "",
              "expected": "Você distingue nome resolvido, porta acessível e certificado confiável.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "DNS transforma nome em endereço."
            },
            {
              "id": "return",
              "title": "Voltar depois de criar o domínio",
              "text": "Após a lição AD DS, retorne e execute a consulta SRV no cliente. Ela deve localizar DC01. Se falhar, confira se o DNS de CL01 é .10 antes de alterar credenciais.",
              "command": "Resolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.aurora.test",
              "expected": "SRV identifica o controlador do domínio depois da promoção.",
              "host": "CL01",
              "why": "DNS transforma nome em endereço."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "DC01 / CL01 → resolução, conexão e confiança",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Resolve-DnsName no Windows",
            "url": "https://learn.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname"
          }
        ],
        "revision": "2026.10.28.2",
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
          "prep-windows"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "A entrega desta lição foi observada: Rede e DNS diferenciados de TCP/TLS; consulta SRV retestada após AD DS."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Rede e DNS diferenciados de TCP/TLS; consulta SRV retestada após AD DS. DNS transforma nome em endereço. TCP testa conexão com uma porta. TLS verifica identidade do servidor, validade e cadeia de confiança. Um deles funcionar não comprova os outros."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 3,
        "stageId": "plan",
        "stageLabel": "01 · Empresa e rede",
        "labAction": "Rede e DNS diferenciados de TCP/TLS; consulta SRV retestada após AD DS."
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
              "command": "$PSVersionTable.PSVersion",
              "host": "PowerShell · host pessoal",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar.",
              "expected": "Registre o resultado observado desta ação em PowerShell · host pessoal e compare com a entrega: Script versionado com exportação CSV/JSON"
            },
            {
              "id": "script",
              "title": "Criar inventário completo",
              "text": "Crie C:\\AuroraLab\\inventario.ps1 em um editor e escreva o bloco abaixo. Depois de construir APP01, /health será o endpoint local. Antes disso, comente apenas a linha Invoke-RestMethod e registre que a consulta HTTP ainda não foi executada.",
              "command": "$ErrorActionPreference = 'Stop'\ntry {\n  $items = @(Get-Process | Select-Object -First 5 Name, Id)\n  $items | ConvertTo-Json | Set-Content ./processos.json -Encoding utf8\n  $items | Export-Csv ./processos.csv -NoTypeInformation -Encoding utf8\n  $health = Invoke-RestMethod -Uri 'http://localhost:8765/health'\n  Write-Output $health.status\n  Write-Output (Import-Csv ./processos.csv).Count\n} catch {\n  Write-Error ('Falha controlada: ' + $_.Exception.Message)\n  exit 1\n}",
              "expected": "status ok e contagem do CSV correspondente aos processos exportados.",
              "host": "PowerShell · host pessoal",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "execute",
              "title": "Executar e reimportar",
              "text": "Execute no diretório pessoal do laboratório. Não mude a política de execução global para contornar bloqueio; use sessão/arquivo autorizado conforme seu sistema.",
              "command": "./inventario.ps1\nGet-Content ./processos.json -Raw | ConvertFrom-Json",
              "expected": "Objetos podem ser lidos de volta e nomes/IDs correspondem ao inventário.",
              "host": "PowerShell · host pessoal",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "negative",
              "title": "Gerar e diagnosticar falha",
              "text": "Depois da aula OIDC, pare somente laboratorio.mjs e repita a consulta HTTP para observar falha controlada. Nesta primeira passagem valide JSON/CSV e deixe o teste HTTP como pendência, sem declarar uma aplicação ainda não construída.",
              "host": "PowerShell · host pessoal",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar.",
              "expected": "Registre o resultado observado desta ação em PowerShell · host pessoal e compare com a entrega: Script versionado com exportação CSV/JSON"
            },
            {
              "id": "save",
              "title": "Guardar versão e resultado",
              "text": "Mantenha o script e evidências sanitizadas em uma pasta pessoal; não é necessário colocar a documentação no repositório do portal. Paginação de API será trabalhada no Graph.",
              "host": "PowerShell · host pessoal",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar.",
              "expected": "Registre o resultado observado desta ação em PowerShell · host pessoal e compare com a entrega: Script versionado com exportação CSV/JSON"
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "PowerShell · host pessoal",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Microsoft Graph PowerShell",
            "url": "https://learn.microsoft.com/en-us/powershell/microsoftgraph/overview"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "beginner",
        "technologies": [
          "powershell",
          "json"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-1-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Script versionado com exportação CSV/JSON PowerShell encadeia objetos, não apenas texto. Select-Object escolhe propriedades; ConvertTo-Json serializa e Export-Csv gera tabela. Reimportar o arquivo valida se o formato preserva a informação pretendida."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 6,
        "stageId": "directory",
        "stageLabel": "02 · Diretório e grupos",
        "labAction": "Script versionado com exportação CSV/JSON"
      }
    ],
    "environment": "RH e rede definidos na Arquitetura; AD do laboratório para ACLs; tenant apenas no tópico cloud.",
    "outcome": "Papéis, contas e permissões aplicados a recursos identificados, sem mistura de diretórios.",
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
        "evidence": "Floresta, OUs, sete grupos e seis colaboradores criados; dois pilotos E001/E002 e login de CL01 conferidos.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "DC01 → AD DS e DNS; CL01 → domínio AURORA",
          "platformUrl": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-",
          "where": "DC01 → AD DS e DNS; CL01 → domínio AURORA",
          "steps": [
            {
              "id": "check",
              "title": "Separar ambiente novo de domínio existente",
              "text": "Este roteiro cria a floresta aurora.test em DC01. Se já existe esse domínio de estudo, valide-o e passe à criação das OUs; nunca promova novamente um controlador. Em servidor novo o módulo AD pode não existir ainda.",
              "command": "",
              "expected": "Você sabe se está no caminho novo ou de validação.",
              "host": "DC01",
              "why": "Uma floresta contém domínios; cada domínio tem controladores."
            },
            {
              "id": "role",
              "title": "Instalar a função",
              "text": "Em PowerShell administrativo no DC01 novo instale AD DS e ferramentas. Ainda não é uma promoção.",
              "command": "Install-WindowsFeature AD-Domain-Services -IncludeManagementTools",
              "expected": "Success=True; ferramentas instaladas.",
              "host": "DC01",
              "why": "Uma floresta contém domínios; cada domínio tem controladores."
            },
            {
              "id": "forest",
              "title": "Promover a floresta",
              "text": "Execute apenas no DC01 novo. Informe uma senha DSRM exclusiva quando solicitada e guarde-a fora das evidências. O servidor reiniciará. Não use Force para pular a avaliação.",
              "command": "Install-ADDSForest -DomainName aurora.test -DomainNetbiosName AURORA -InstallDNS",
              "expected": "Após reiniciar, Get-ADDomain retorna aurora.test.",
              "host": "DC01",
              "why": "Uma floresta contém domínios; cada domínio tem controladores."
            },
            {
              "id": "ous",
              "title": "Criar a estrutura de OUs",
              "text": "No DC, execute uma única vez. Se a OU já existe, confira seu DN antes de prosseguir; não duplique objetos. As contas administrativas não entram em Colaboradores.",
              "command": "New-ADOrganizationalUnit -Name AURORA -Path \"DC=aurora,DC=test\"\n\"Colaboradores\",\"Grupos\",\"Computadores\",\"Servicos\",\"Privilegiadas\" | ForEach-Object { New-ADOrganizationalUnit -Name $_ -Path \"OU=AURORA,DC=aurora,DC=test\" }\n\"Financeiro\",\"Juridico\",\"TI\",\"RH\" | ForEach-Object { New-ADOrganizationalUnit -Name $_ -Path \"OU=Colaboradores,OU=AURORA,DC=aurora,DC=test\" }",
              "expected": "AD Users and Computers mostra a árvore prevista na Arquitetura.",
              "host": "DC01",
              "why": "Uma floresta contém domínios; cada domínio tem controladores."
            },
            {
              "id": "groups",
              "title": "Criar os grupos de autorização",
              "text": "Crie grupos globais de segurança na OU Grupos. Eles serão usados em recursos Windows; não equivalem automaticamente a papéis do aplicativo.",
              "command": "\"GG-FIN-LEITURA\",\"GG-JUR-LEITURA\",\"GG-TI-SUPORTE\",\"GG-FIN-SOLICITACAO\",\"GG-FIN-APROVACAO\",\"GG-JUR-GESTAO\",\"GG-RH-OPERACAO\" | ForEach-Object { New-ADGroup -Name $_ -GroupScope Global -GroupCategory Security -Path \"OU=Grupos,OU=AURORA,DC=aurora,DC=test\" }",
              "expected": "Sete grupos existem; nenhum é Domain Admins.",
              "host": "DC01",
              "why": "Uma floresta contém domínios; cada domínio tem controladores."
            },
            {
              "id": "ana",
              "title": "Criar E001 e seu vínculo",
              "text": "Crie Ana com senha fictícia escolhida no prompt. EmployeeID e departamento vêm do RH. O UPN será ajustado para o sufixo do tenant na lição de Cloud Sync.",
              "command": "New-ADUser -Name \"Ana Lima\" -SamAccountName fin.ana -EmployeeID E001 -Department Financeiro -Path \"OU=Financeiro,OU=Colaboradores,OU=AURORA,DC=aurora,DC=test\" -AccountPassword (Read-Host -AsSecureString \"Senha de Ana\") -Enabled $true\nAdd-ADGroupMember GG-FIN-LEITURA fin.ana",
              "expected": "Get-ADUser fin.ana -Properties EmployeeID,Department mostra E001/Financeiro.",
              "host": "DC01",
              "why": "Uma floresta contém domínios; cada domínio tem controladores."
            },
            {
              "id": "carla",
              "title": "Criar E002 como controle",
              "text": "Crie Carla no Jurídico com outra senha de teste. Ela permanece no mesmo departamento durante os movimentos de Ana.",
              "command": "New-ADUser -Name \"Carla Souza\" -SamAccountName jur.carla -EmployeeID E002 -Department \"Jurídico\" -Path \"OU=Juridico,OU=Colaboradores,OU=AURORA,DC=aurora,DC=test\" -AccountPassword (Read-Host -AsSecureString \"Senha de Carla\") -Enabled $true\nAdd-ADGroupMember GG-JUR-LEITURA jur.carla",
              "expected": "E002 pertence a GG-JUR-LEITURA e não ao grupo FIN.",
              "host": "DC01",
              "why": "Uma floresta contém domínios; cada domínio tem controladores."
            },
            {
              "id": "remaining-staff",
              "title": "Completar as pessoas da empresa e os responsáveis",
              "text": "Cadastre E003–E006 conforme a tabela da Arquitetura. Cada senha é escolhida no prompt e pertence somente ao laboratório. Bruno/Diego revisam acessos; Paulo é a conta comum de suporte; Marina representa RH. Crie cada objeto uma única vez.",
              "command": "New-ADUser -Name \"Bruno Costa\" -SamAccountName fin.bruno -EmployeeID E003 -Department \"Financeiro\" -Path \"OU=Financeiro,OU=Colaboradores,OU=AURORA,DC=aurora,DC=test\" -AccountPassword (Read-Host -AsSecureString \"Senha de fin.bruno\") -Enabled $true\nAdd-ADGroupMember GG-FIN-APROVACAO fin.bruno\nNew-ADUser -Name \"Diego Alves\" -SamAccountName jur.diego -EmployeeID E004 -Department \"Jurídico\" -Path \"OU=Juridico,OU=Colaboradores,OU=AURORA,DC=aurora,DC=test\" -AccountPassword (Read-Host -AsSecureString \"Senha de jur.diego\") -Enabled $true\nAdd-ADGroupMember GG-JUR-GESTAO jur.diego\nNew-ADUser -Name \"Paulo Silva\" -SamAccountName ti.operador -EmployeeID E005 -Department \"TI\" -Path \"OU=TI,OU=Colaboradores,OU=AURORA,DC=aurora,DC=test\" -AccountPassword (Read-Host -AsSecureString \"Senha de ti.operador\") -Enabled $true\nAdd-ADGroupMember GG-TI-SUPORTE ti.operador\nNew-ADUser -Name \"Marina Rocha\" -SamAccountName rh.marina -EmployeeID E006 -Department \"RH\" -Path \"OU=RH,OU=Colaboradores,OU=AURORA,DC=aurora,DC=test\" -AccountPassword (Read-Host -AsSecureString \"Senha de rh.marina\") -Enabled $true\nAdd-ADGroupMember GG-RH-OPERACAO rh.marina\nSet-ADUser fin.ana -Manager fin.bruno\nSet-ADUser jur.carla -Manager jur.diego",
              "host": "DC01 · PowerShell administrativo",
              "why": "A delegação e as revisões posteriores precisam de responsáveis existentes, sem inventar contas durante o exercício.",
              "expected": "Seis colaboradores únicos no AD e gestores de Ana/Carla definidos."
            },
            {
              "id": "join",
              "title": "Ingressar CL01",
              "text": "No cliente com DNS .10 valide SRV e faça ingresso. Informe credencial de administração do domínio no prompt. Depois do reinício, entre como AURORA\\fin.ana.",
              "command": "Resolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.aurora.test\nAdd-Computer -DomainName aurora.test -Credential (Get-Credential) -Restart",
              "expected": "Login de Ana funciona em CL01.",
              "host": "CL01 · PowerShell administrativo",
              "why": "Uma floresta contém domínios; cada domínio tem controladores."
            },
            {
              "id": "move-client",
              "title": "Colocar CL01 na OU prevista",
              "text": "No DC abra AD Users and Computers → Computers, encontre CL01, clique Move e escolha OU=Computadores,OU=AURORA. Não mova DC01 para uma OU de estações.",
              "command": "Get-ADComputer CL01 -Properties DistinguishedName",
              "expected": "CL01 está na OU Computadores; DC01 permanece em Domain Controllers.",
              "host": "DC01",
              "why": "Uma floresta contém domínios; cada domínio tem controladores."
            },
            {
              "id": "ldap",
              "title": "Consultar e conferir",
              "text": "Confira objetos e DNS. As consultas AD usam serviços do diretório; o nome do usuário não deve ser recriado a cada mudança de departamento.",
              "command": "Get-ADDomain\nGet-ADUser fin.ana -Properties EmployeeID,Department,MemberOf\nGet-ADUser jur.carla -Properties EmployeeID,Department,MemberOf\ndcdiag /test:dns",
              "expected": "Dois pilotos únicos, departamentos e grupos corretos.",
              "host": "DC01",
              "why": "Uma floresta contém domínios; cada domínio tem controladores."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "DC01 → AD DS e DNS; CL01 → domínio AURORA",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "beginner",
        "technologies": [
          "active directory",
          "ldap",
          "windows"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-0-2"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "Entrega observada: Floresta, OUs, sete grupos e seis colaboradores criados; dois pilotos E001/E002 e login de CL01 conferidos."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Floresta, OUs, sete grupos e dois pilotos criados; CL01 ingressado e login validado. Uma floresta contém domínios; cada domínio tem controladores. OUs organizam objetos e escopo de políticas, mas não são grupos de autorização. LDAP consulta o diretório; DNS permite descobrir os serviços."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 4,
        "stageId": "directory",
        "stageLabel": "02 · Diretório e grupos",
        "labAction": "Floresta, OUs, sete grupos e dois pilotos criados; CL01 ingressado e login validado."
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
              "expected": "Registre o resultado observado desta ação em Windows Server / Event Viewer e compare com a entrega: Tickets Kerberos e eventos de logon identificados",
              "host": "Windows Server / Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Autentique usuário de teste no domínio e identifique tickets com klist.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Windows Server / Event Viewer e compare com a entrega: Tickets Kerberos e eventos de logon identificados",
              "host": "Windows Server / Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Use uma conta comum do domínio no cliente e execute klist antes e depois de acessar um recurso autenticado do laboratório.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Windows Server / Event Viewer e compare com a entrega: Tickets Kerberos e eventos de logon identificados",
              "host": "Windows Server / Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "No DC, abra Event Viewer → Windows Logs → Security e filtre eventos relevantes como 4768, 4769, 4771 e 4625 conforme auditoria habilitada.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Windows Server / Event Viewer e compare com a entrega: Tickets Kerberos e eventos de logon identificados",
              "host": "Windows Server / Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Execute w32tm /query /status e nslookup NOME-DO-DC; registre sincronização de horário e resolução do KDC.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Windows Server / Event Viewer e compare com a entrega: Tickets Kerberos e eventos de logon identificados",
              "host": "Windows Server / Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Simule erro de nome inexistente, sem alterar o relógio do controlador; explique como falhas DNS/tempo afetam tickets e como diagnosticar sem comprometer o domínio.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Windows Server / Event Viewer e compare com a entrega: Tickets Kerberos e eventos de logon identificados",
              "host": "Windows Server / Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Verifique hora do cliente e DC com w32tm /query /status; examine eventos de autenticação no Event Viewer e SPN com setspn -L para conta de teste.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Windows Server / Event Viewer e compare com a entrega: Tickets Kerberos e eventos de logon identificados",
              "host": "Windows Server / Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Windows Server / Event Viewer",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Kerberos no Windows Server",
            "url": "https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "beginner",
        "technologies": [
          "kerberos",
          "dns",
          "windows"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-1-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Observar em CL01 os tickets de E001 e os eventos de autenticação em DC01. O KDC emite um TGT; o cliente o usa para pedir um ticket para um serviço identificado pelo SPN. O recurso valida esse ticket. klist ajuda a observar a diferença entre login inicial e acesso ao serviço."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 7,
        "stageId": "directory",
        "stageLabel": "02 · Diretório e grupos",
        "labAction": "Observar em CL01 os tickets de E001 e os eventos de autenticação em DC01."
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
            "detail": "Delegue reset de senha na OU piloto a GG-TI-SUPORTE. O mesmo operador deve falhar ao tentar alterar uma OU fora do escopo. Permissão mínima exige teste permitido e teste negado."
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
              "id": "scope",
              "title": "Selecionar o computador e a OU",
              "text": "Em AD Users and Computers confira CL01 dentro de OU=Computadores,OU=AURORA. DC01 permanece em Domain Controllers. A GPO será vinculada somente à OU Computadores, não à raiz do domínio.",
              "host": "DC01 · AD Users and Computers",
              "expected": "Escopo contém CL01 e não o controlador.",
              "why": "Aplicar bloqueio de 300 segundos em CL01 e delegar reset somente na OU piloto."
            },
            {
              "id": "gpo-create",
              "title": "Criar e vincular a GPO",
              "text": "Abra Group Policy Management → Forest aurora.test → Domains → aurora.test → AURORA → Computadores. Clique direito → Create a GPO in this domain, and Link it here. Nome LAB-Bloqueio-Tela. Clique Edit.",
              "host": "DC01 · GPMC",
              "expected": "GPO aparece vinculada à OU Computadores.",
              "why": "Aplicar bloqueio de 300 segundos em CL01 e delegar reset somente na OU piloto."
            },
            {
              "id": "gpo-setting",
              "title": "Configurar o parâmetro exato",
              "text": "Computer Configuration → Policies → Windows Settings → Security Settings → Local Policies → Security Options → Interactive logon: Machine inactivity limit. Marque Define this policy setting e informe 300 segundos. Salve. Não edite a Default Domain Policy.",
              "host": "DC01 · editor da GPO",
              "expected": "Limite configurado em 300 segundos na GPO piloto.",
              "why": "Aplicar bloqueio de 300 segundos em CL01 e delegar reset somente na OU piloto."
            },
            {
              "id": "gpo-test",
              "title": "Conferir no cliente",
              "text": "Em CL01 abra PowerShell administrativo, crie a pasta de saída, atualize políticas e gere relatório. Abra C:\\Temp\\lab-gpo.html e encontre a GPO no escopo de computador.",
              "command": "New-Item -ItemType Directory -Force C:\\Temp\ngpupdate /force\ngpresult /h C:\\Temp\\lab-gpo.html",
              "host": "CL01",
              "expected": "Relatório lista LAB-Bloqueio-Tela. A inatividade leva ao bloqueio após o período configurado.",
              "why": "Aplicar bloqueio de 300 segundos em CL01 e delegar reset somente na OU piloto."
            },
            {
              "id": "delegate",
              "title": "Delegar uma tarefa limitada ao suporte",
              "text": "No DC01 clique direito na OU Financeiro sob Colaboradores → Delegate Control. Adicione GG-TI-SUPORTE; selecione apenas Reset user passwords and force password change at next logon. Conclua. Não delegue Full Control.",
              "host": "DC01 · AD Users and Computers",
              "expected": "Paulo/E005 pode executar somente a tarefa delegada nesta OU.",
              "why": "Aplicar bloqueio de 300 segundos em CL01 e delegar reset somente na OU piloto."
            },
            {
              "id": "delegation-test",
              "title": "Testar permitido e negado",
              "text": "Com ti.operador em ferramenta RSAT de administração autorizada, tente resetar Ana na OU Financeiro: permitido. Tente Carla na OU Juridico: negado. Como você muda senha de laboratório, use credencial nova e registre o impacto para não confundir falha posterior de login.",
              "host": "CL01 com RSAT ou sessão administrativa delegada",
              "expected": "Permissão não se estende ao Jurídico. Não adicione o suporte a Domain Admins.",
              "why": "Aplicar bloqueio de 300 segundos em CL01 e delegar reset somente na OU piloto."
            },
            {
              "id": "restore",
              "title": "Reverter o teste sem perder os grupos",
              "text": "Se a delegação não for mantida no cenário, remova somente a entrada criada para GG-TI-SUPORTE na segurança avançada da OU. Para retirar a GPO, desabilite somente seu link piloto. Teste novamente e registre o estado final.",
              "host": "DC01",
              "expected": "Reversão limitada ao escopo configurado.",
              "why": "Aplicar bloqueio de 300 segundos em CL01 e delegar reset somente na OU piloto."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Group Policy Management",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Visão geral de GPO e OUs",
            "url": "https://learn.microsoft.com/pt-br/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "beginner",
        "technologies": [
          "active directory",
          "gpo",
          "windows"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-1-1"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Aplicar bloqueio de 300 segundos em CL01 e delegar reset somente na OU piloto. GPO aplica configurações a usuários/computadores conforme vínculo, herança e filtros. Delegação concede ações administrativas em objetos. Uma GPO na OU errada pode não atingir o cliente mesmo que o editor mostre a configuração."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 8,
        "stageId": "directory",
        "stageLabel": "02 · Diretório e grupos",
        "labAction": "Aplicar bloqueio de 300 segundos em CL01 e delegar reset somente na OU piloto."
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
              "expected": "Registre o resultado observado desta ação em Active Directory Users and Computers e compare com a entrega: Inventário de privilégios e conta de serviço controlada",
              "host": "Active Directory Users and Computers",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "kds",
              "title": "Verificar chave KDS",
              "text": "No DC consulte Get-KdsRootKey. Se não existir, crie com Add-KdsRootKey -EffectiveImmediately e aguarde a janela de replicação indicada no guia (até 10 horas). Não retrodate em domínio compartilhado para contornar espera.",
              "command": "Get-KdsRootKey",
              "expected": "Chave existente e efetiva antes de criar a conta.",
              "host": "Active Directory Users and Computers",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "create",
              "title": "Criar e autorizar o host",
              "text": "Substitua CL01 pelo host membro que realmente executará o serviço. Não use grupo contendo todos os computadores.",
              "command": "New-ADServiceAccount -Name svcAurora -DNSHostName svcAurora.aurora.test -PrincipalsAllowedToRetrieveManagedPassword (Get-ADComputer CL01)",
              "expected": "gMSA criada com um host autorizado.",
              "host": "Active Directory Users and Computers",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "install",
              "title": "Instalar no host membro",
              "text": "No host autorizado com RSAT/módulo AD, execute os comandos. Se o host não tem o módulo, instale o RSAT compatível com sua edição pelo gerenciamento de recursos opcionais.",
              "command": "Install-ADServiceAccount svcAurora\nTest-ADServiceAccount svcAurora",
              "expected": "Test-ADServiceAccount retorna True; no host não autorizado deve falhar.",
              "host": "Active Directory Users and Computers",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "consumer",
              "title": "Configurar consumidor compatível",
              "text": "Em uma tarefa agendada de teste no host autorizado, use a identidade AURORA\\svcAurora$ com LogonType Password via New-ScheduledTaskPrincipal; não informe senha. Configure ação de baixo impacto, como gravar data em arquivo local com ACL limitada. Valide o direito Log on as a batch job conforme política e execute a tarefa.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Active Directory Users and Computers e compare com a entrega: Inventário de privilégios e conta de serviço controlada",
              "host": "Active Directory Users and Computers",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "verify",
              "title": "Testar e remover",
              "text": "Confirme identidade no log da tarefa, arquivo de saída e permissões mínimas. Não conceda Domain Admins para resolver falha. Remova tarefa de teste antes de remover a conta; reverta delegações adicionais.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Active Directory Users and Computers e compare com a entrega: Inventário de privilégios e conta de serviço controlada",
              "host": "Active Directory Users and Computers",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Active Directory Users and Computers",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Contas de serviço gerenciadas de grupo",
            "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/getting-started-with-group-managed-service-accounts"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "beginner",
        "technologies": [
          "gmsa",
          "active directory"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-1-2"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Criar svcAurora para um consumidor de teste autorizado, sem privilégio de domínio. Uma gMSA tem senha gerenciada pelo AD e limita quais hosts podem obtê-la. Isso reduz manejo manual, mas não corrige permissões excessivas. O serviço precisa suportar essa conta e o host precisa ser autorizado."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 9,
        "stageId": "directory",
        "stageLabel": "02 · Diretório e grupos",
        "labAction": "Criar svcAurora para um consumidor de teste autorizado, sem privilégio de domínio."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Entra admin center e compare com a entrega: Papéis mínimos e procedimento de emergência",
              "host": "Microsoft Entra admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Crie ou prepare tenant de laboratório e duas identidades não administrativas.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra admin center e compare com a entrega: Papéis mínimos e procedimento de emergência",
              "host": "Microsoft Entra admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Na seção Entra ID → Roles and administrators, compare Global Administrator, User Administrator e Global Reader. Para um desenho corporativo resiliente, planeje no mínimo DUAS contas de emergência distintas, somente na nuvem e com domínio *.onmicrosoft.com, não federadas nem sincronizadas.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra admin center e compare com a entrega: Papéis mínimos e procedimento de emergência",
              "host": "Microsoft Entra admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Se a infraestrutura e a custódia estiverem adequadas, prepare adm.emergencia e adm.emergencia2 como contas cloud-only separadas das contas operacionais; a Microsoft recomenda Global Administrator ativo para contas de emergência, métodos resistentes a phishing e monitoramento. Não conceda privilégios elevados sem controles e autorização.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra admin center e compare com a entrega: Papéis mínimos e procedimento de emergência",
              "host": "Microsoft Entra admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Revise custódia, MFA resistente a phishing, alertas e exclusões de políticas que bloqueiem a recuperação. Não use dispositivo pessoal como único fator de emergência.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra admin center e compare com a entrega: Papéis mínimos e procedimento de emergência",
              "host": "Microsoft Entra admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Teste com sessão controlada a acessibilidade da conta sem mudar políticas de produção. Registre conta, papel, método de autenticação, responsável e ciclo de validação; nunca divulgue credenciais.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra admin center e compare com a entrega: Papéis mínimos e procedimento de emergência",
              "host": "Microsoft Entra admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Verifique funções e métodos de cada conta de emergência; teste login controlado e alertas, nunca a remoção do único administrador.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra admin center e compare com a entrega: Papéis mínimos e procedimento de emergência",
              "host": "Microsoft Entra admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Microsoft Entra admin center",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Contas de emergência Microsoft",
            "url": "https://learn.microsoft.com/pt-br/entra/identity/role-based-access-control/security-emergency-access"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "rbac"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-route"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Preparar TENANT01, conta administrativa A002 e BG01/BG02 antes de mudar políticas. Tenant é a fronteira de administração do diretório cloud. Separe conta de uso cotidiano e conta privilegiada; atribua função apenas quando o exercício exigir. Global Administrator não deve ser a solução padrão para qualquer erro."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 10,
        "stageId": "cloud",
        "stageLabel": "03 · Identidade cloud",
        "labAction": "Preparar TENANT01, conta administrativa A002 e BG01/BG02 antes de mudar políticas."
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
              "id": "upn-scope",
              "title": "Preparar os UPNs e o escopo fixo",
              "text": "No DC01 substitua SEU-TENANT pelo domínio onmicrosoft.com registrado na Arquitetura. Adicione esse sufixo ao AD e aplique aos dois pilotos. No Cloud Sync use somente as OUs Colaboradores e Grupos sob AURORA. Não sincronize Privilegiadas/Servicos. Não deve existir duplicata cloud de fin.ana/jur.carla.",
              "command": "Set-ADForest -UPNSuffixes @{add=\"SEU-TENANT.onmicrosoft.com\"}\n\"fin.ana\",\"jur.carla\",\"fin.bruno\",\"jur.diego\",\"ti.operador\",\"rh.marina\" | ForEach-Object { Set-ADUser $_ -UserPrincipalName ( $_ + \"@SEU-TENANT.onmicrosoft.com\" ) }",
              "expected": "UPNs correspondem ao domínio do tenant; E001/E002 continuam no AD.",
              "host": "DC01",
              "why": "O AD pode ser autoritativo para os atributos sincronizados."
            },
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "No https://entra.microsoft.com, entre com papel Hybrid Identity Administrator (não convidado). Navegue até Entra ID → Entra Connect → Cloud sync. Para instalação do agente, abra Agents → Download on-premises agent. O portal pode estar em inglês ou português.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Cloud Sync e compare com a entrega: Conta piloto sincronizada e logs da alteração",
              "host": "Microsoft Entra / Cloud Sync",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Confirme domínio AD, atributos UPN/proxyAddresses, servidor Windows membro do domínio com versão compatível, conectividade TLS e conta de administração para criar gMSA. O agente é suportado em DC, mas um servidor dedicado endurecido reduz interferências; com 16 GB, avalie o consumo antes de iniciar outra VM.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Cloud Sync e compare com a entrega: Conta piloto sincronizada e logs da alteração",
              "host": "Microsoft Entra / Cloud Sync",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Inventarie atributos de uma conta piloto no AD e compare com possíveis contas cloud existentes. Não sincronize usuários duplicados ou administrativos sem planejar correspondência, origem autoritativa e escopo.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Cloud Sync e compare com a entrega: Conta piloto sincronizada e logs da alteração",
              "host": "Microsoft Entra / Cloud Sync",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Instale o agente de provisionamento Microsoft Entra Cloud Sync conforme guia oficial, forneça contas administrativas somente durante a configuração e confirme que o agente aparece ativo no portal; não confunda instalar agente com habilitar sincronização.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Cloud Sync e compare com a entrega: Conta piloto sincronizada e logs da alteração",
              "host": "Microsoft Entra / Cloud Sync",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "No portal, selecione Nova configuração → AD to Microsoft Entra ID sync; selecione o domínio aurora.test, filtro por OU e as OUs Colaboradores e Grupos sob AURORA; confira os mapeamentos e execute Teste sob demanda com fin.ana. Habilite a configuração somente após validar o resultado com a conta descartável.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Cloud Sync e compare com a entrega: Conta piloto sincronizada e logs da alteração",
              "host": "Microsoft Entra / Cloud Sync",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Modifique um atributo não sensível na conta piloto do AD; confira propagação na nuvem, logs e ausência de contas duplicadas. Teste desativação apenas com conta descartável e documente recuperação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Cloud Sync e compare com a entrega: Conta piloto sincronizada e logs da alteração",
              "host": "Microsoft Entra / Cloud Sync",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confirme agente, conectividade e escopo de OU; compare objetos locais e sincronizados e leia logs do agente antes de alterar regras.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Cloud Sync e compare com a entrega: Conta piloto sincronizada e logs da alteração",
              "host": "Microsoft Entra / Cloud Sync",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Microsoft Entra / Cloud Sync",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
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
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "active directory",
          "cloud sync"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-0-0",
          "iam-1-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Conta piloto sincronizada e logs da alteração O AD pode ser autoritativo para os atributos sincronizados. Editar no destino pode ser sobrescrito. Defina identificador, UPN e escopo piloto antes de sincronizar; matching incorreto cria duplicação ou liga contas erradas."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 12,
        "stageId": "cloud",
        "stageLabel": "03 · Identidade cloud",
        "labAction": "Conta piloto sincronizada e logs da alteração"
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
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Authentication methods e compare com a entrega: MFA/passkey testado com evidência",
              "host": "Microsoft Entra / Authentication methods",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Confirme se o tenant possui método FIDO2 habilitável, grupo piloto e dispositivo autenticador compatível. Passkeys FIDO2 estão disponíveis inclusive no Entra ID Free; exigir passkeys via Conditional Access pode requerer P1.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Authentication methods e compare com a entrega: MFA/passkey testado com evidência",
              "host": "Microsoft Entra / Authentication methods",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Examine os perfis de passkey e defina escopo somente para conta piloto. Alterações na política global de passkeys afetam o tenant; não ative indiscriminadamente.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Authentication methods e compare com a entrega: MFA/passkey testado com evidência",
              "host": "Microsoft Entra / Authentication methods",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Habilite o método permitido para grupo piloto e, quando elegível, registre a passkey na página de informações de segurança do usuário. Não use credenciais reais de terceiros.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Authentication methods e compare com a entrega: MFA/passkey testado com evidência",
              "host": "Microsoft Entra / Authentication methods",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Faça login de teste com método configurado; diferencie uma autenticação resistente a phishing de uma simples verificação por código. Não exponha códigos, chaves ou registros do autenticador.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Authentication methods e compare com a entrega: MFA/passkey testado com evidência",
              "host": "Microsoft Entra / Authentication methods",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Teste tentativa sem o método apropriado somente em escopo controlado. Registre tipo de método, dispositivo, data e logs. Sem P1, não alegue imposição por política de acesso condicional.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Authentication methods e compare com a entrega: MFA/passkey testado com evidência",
              "host": "Microsoft Entra / Authentication methods",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confira políticas de métodos de autenticação, registro FIDO2, conta piloto e log de entrada. Não confunda registro de método com exigência por Conditional Access.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Authentication methods e compare com a entrega: MFA/passkey testado com evidência",
              "host": "Microsoft Entra / Authentication methods",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Microsoft Entra / Authentication methods",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Passkeys FIDO2: configuração e licenças",
            "url": "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-enable-passkey-fido2"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "mfa",
          "fido2"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-2-1"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Registrar MFA/passkey no piloto cloud e distinguir registro de exigência. Métodos habilitados permitem registro; a política de acesso determina quando são exigidos. MFA por código pode ser alvo de phishing. FIDO2/passkeys vincula a autenticação à origem e permite resistência a phishing quando usado corretamente."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 13,
        "stageId": "cloud",
        "stageLabel": "03 · Identidade cloud",
        "labAction": "Registrar MFA/passkey no piloto cloud e distinguir registro de exigência."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Password reset e compare com a entrega: Fluxo SSPR e registros de recuperação",
              "host": "Microsoft Entra / Password reset",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Compare três cenários: alterar senha conhecida (cloud Free), redefinir senha esquecida (licença elegível, como Business Standard ou P1/P2) e writeback híbrido (P1/P2 ou Business Premium, com configuração compatível). Identifique qual o tenant realmente permite.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Password reset e compare com a entrega: Fluxo SSPR e registros de recuperação",
              "host": "Microsoft Entra / Password reset",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Em Entra → Password reset, consulte licenças e configuração atual antes de alterar escopo; selecione somente LAB-CLOUD-PILOTO, que contém cloud.piloto.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Password reset e compare com a entrega: Fluxo SSPR e registros de recuperação",
              "host": "Microsoft Entra / Password reset",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "No Entra ID Free, teste apenas alteração voluntária de senha cloud. Para redefinição de senha esquecida, confira licença elegível e métodos registrados antes de utilizar o portal oficial.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Password reset e compare com a entrega: Fluxo SSPR e registros de recuperação",
              "host": "Microsoft Entra / Password reset",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Se licenciada, teste redefinição com conta piloto e valide o login posterior. Não presuma que o writeback local funciona somente por existir sincronização.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Password reset e compare com a entrega: Fluxo SSPR e registros de recuperação",
              "host": "Microsoft Entra / Password reset",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Compare logs de recuperação, método usado e origem da identidade. Se o recurso não estiver licenciado, registre cenário como estudo documental; não marque execução real.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Password reset e compare com a entrega: Fluxo SSPR e registros de recuperação",
              "host": "Microsoft Entra / Password reset",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Teste usuário piloto licenciado, métodos de recuperação e eventual writeback; valide o resultado no Entra e no AD sem expor credenciais.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Password reset e compare com a entrega: Fluxo SSPR e registros de recuperação",
              "host": "Microsoft Entra / Password reset",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Microsoft Entra / Password reset",
          "costNote": "Recursos premium exigem licença elegível e validação no tenant de estudo. Marque o que não foi executado."
        },
        "sources": [
          {
            "label": "Matriz de licenças SSPR",
            "url": "https://learn.microsoft.com/pt-br/entra/identity/authentication/concept-sspr-licensing"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "sspr"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-2-2"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Validar recuperação de cloud.piloto; writeback só se licenciado e configurado. Alterar senha conhecida é diferente de redefinir uma esquecida. SSPR exige métodos registrados e licença elegível para o cenário. Writeback precisa devolver a alteração ao AD e tem requisitos próprios."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 14,
        "stageId": "cloud",
        "stageLabel": "03 · Identidade cloud",
        "labAction": "Validar recuperação de cloud.piloto; writeback só se licenciado e configurado."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Conditional Access e compare com a entrega: Matriz de decisões e política piloto Report-only verificadas; registro do estado dos Security Defaults, licença P1, contas de emergência, plano de proteção equivalente e rollback. Se houver migração real, comprovar políticas-base ativas e testes positivos/negativos; caso contrário, marcar SIMULAÇÃO.",
              "host": "Microsoft Entra / Conditional Access",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "registrar-security-defaults-antes-de-qualquer-alteracao",
              "title": "Registrar Security Defaults ANTES de qualquer alteração",
              "text": "Acesse Entra ID → Visão geral → Propriedades → Gerenciar padrões de segurança (Security defaults). Registre Habilitado/Desabilitado e capture evidência sanitizada. Security Defaults e políticas personalizadas de Conditional Access ativas não podem coexistir. Se não tiver P1 ou aprovação, mantenha Security Defaults habilitados e execute somente simulação/documentação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Conditional Access e compare com a entrega: Matriz de decisões e política piloto Report-only verificadas; registro do estado dos Security Defaults, licença P1, contas de emergência, plano de proteção equivalente e rollback. Se houver migração real, comprovar políticas-base ativas e testes positivos/negativos; caso contrário, marcar SIMULAÇÃO.",
              "host": "Microsoft Entra / Conditional Access",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "garantir-acesso-de-emergencia-e-recuperacao",
              "title": "Garantir acesso de emergência e recuperação",
              "text": "Antes de alterar proteção, valide duas contas cloud-only *.onmicrosoft.com independentes do IdP/AD, protegidas por métodos resistentes a phishing e com custódia e monitoramento. Planeje exclusões das políticas que bloqueiam ou restringem entrada. Se não conseguir comprovar acesso de emergência, PARE e não desative Security Defaults.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Conditional Access e compare com a entrega: Matriz de decisões e política piloto Report-only verificadas; registro do estado dos Security Defaults, licença P1, contas de emergência, plano de proteção equivalente e rollback. Se houver migração real, comprovar políticas-base ativas e testes positivos/negativos; caso contrário, marcar SIMULAÇÃO.",
              "host": "Microsoft Entra / Conditional Access",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "planejar-substituicao-equivalente-e-rollback",
              "title": "Planejar substituição equivalente e rollback",
              "text": "Documente as políticas-base para substituir Security Defaults: exigir MFA para usuários e administradores, MFA para administração Azure e bloquear autenticação legada; revise escopo, exceções, métodos registrados e impacto. Registre configurações existentes e o plano de reversão. Nunca deixe tenant real sem proteção equivalente.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Conditional Access e compare com a entrega: Matriz de decisões e política piloto Report-only verificadas; registro do estado dos Security Defaults, licença P1, contas de emergência, plano de proteção equivalente e rollback. Se houver migração real, comprovar políticas-base ativas e testes positivos/negativos; caso contrário, marcar SIMULAÇÃO.",
              "host": "Microsoft Entra / Conditional Access",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-politicas-piloto-em-report-only",
              "title": "Preparar políticas piloto em Report-only",
              "text": "No Acesso Condicional, crie política nomeada LAB-CA-MFA-PILOTO, atribua somente grupo de usuários de teste, recurso de teste e controle Exigir MFA. Deixe Report-only. Não use todos os usuários/recursos sem plano aprovado. Confirme exclusões de emergência para políticas restritivas antes de qualquer ativação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Conditional Access e compare com a entrega: Matriz de decisões e política piloto Report-only verificadas; registro do estado dos Security Defaults, licença P1, contas de emergência, plano de proteção equivalente e rollback. Se houver migração real, comprovar políticas-base ativas e testes positivos/negativos; caso contrário, marcar SIMULAÇÃO.",
              "host": "Microsoft Entra / Conditional Access",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-resultado-esperado-sem-impor-bloqueio",
              "title": "Testar resultado esperado sem impor bloqueio",
              "text": "Entre com usuário piloto e consulte Sign-in logs → Conditional Access → Report-only. Compare políticas aplicadas/não aplicadas e motivos. Report-only não bloqueia, não exige MFA interativo e não substitui proteção ativa.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Conditional Access e compare com a entrega: Matriz de decisões e política piloto Report-only verificadas; registro do estado dos Security Defaults, licença P1, contas de emergência, plano de proteção equivalente e rollback. Se houver migração real, comprovar políticas-base ativas e testes positivos/negativos; caso contrário, marcar SIMULAÇÃO.",
              "host": "Microsoft Entra / Conditional Access",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "migrar-security-defaults-somente-com-protecao-pronta",
              "title": "Migrar Security Defaults somente com proteção pronta",
              "text": "SOMENTE no tenant de laboratório autorizado, com P1, acesso de emergência testado, políticas-base preparadas e plano aprovado: em Propriedades → Gerenciar padrões de segurança, desative Security Defaults, informe motivo de migração para Conditional Access e salve. Ative imediatamente políticas-base equivalentes após validação de impacto, em implantação controlada. Se o ambiente não permitir execução segura, documente esta etapa como SIMULAÇÃO e mantenha a proteção habilitada.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Conditional Access e compare com a entrega: Matriz de decisões e política piloto Report-only verificadas; registro do estado dos Security Defaults, licença P1, contas de emergência, plano de proteção equivalente e rollback. Se houver migração real, comprovar políticas-base ativas e testes positivos/negativos; caso contrário, marcar SIMULAÇÃO.",
              "host": "Microsoft Entra / Conditional Access",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "validar-cenarios-positivos-e-negativos",
              "title": "Validar cenários positivos e negativos",
              "text": "Teste usuário piloto com MFA registrado, sem MFA, autenticação legada bloqueada e contas de emergência acessíveis. Registre data, resultado esperado/observado e logs. Não confunda efeito de Report-only com imposição real. Não declare migração completa se só criou política em modo relatório.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Conditional Access e compare com a entrega: Matriz de decisões e política piloto Report-only verificadas; registro do estado dos Security Defaults, licença P1, contas de emergência, plano de proteção equivalente e rollback. Se houver migração real, comprovar políticas-base ativas e testes positivos/negativos; caso contrário, marcar SIMULAÇÃO.",
              "host": "Microsoft Entra / Conditional Access",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-e-recuperar-sem-perder-acesso",
              "title": "Diagnosticar e recuperar sem perder acesso",
              "text": "Se CA falhar, confira licença, Security Defaults, atribuições, exclusões, controles e logs. Para reverter política ativada, desabilite-a ou retire o grupo piloto com conta autorizada. Para retornar aos Security Defaults, a experiência Microsoft 365 pode exigir remover todas as políticas CA (inclusive Report-only); registre/exporte políticas antes, confira documentação atual e não apague configurações sem plano aprovado.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Conditional Access e compare com a entrega: Matriz de decisões e política piloto Report-only verificadas; registro do estado dos Security Defaults, licença P1, contas de emergência, plano de proteção equivalente e rollback. Se houver migração real, comprovar políticas-base ativas e testes positivos/negativos; caso contrário, marcar SIMULAÇÃO.",
              "host": "Microsoft Entra / Conditional Access",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "evidenciar-a-entrega-e-estado-de-protecao",
              "title": "Evidenciar a entrega e estado de proteção",
              "text": "Crie LAB-iam-2-4.md com licença, estado anterior/posterior dos Security Defaults, lista de políticas-base, contas de emergência (sem segredos), matriz de testes, logs sanitizados, resultado real/simulado e rollback. Critério de aceite: tenant não fica desprotegido, Report-only validado e qualquer migração real possui MFA e proteção equivalente efetivamente habilitados.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Conditional Access e compare com a entrega: Matriz de decisões e política piloto Report-only verificadas; registro do estado dos Security Defaults, licença P1, contas de emergência, plano de proteção equivalente e rollback. Se houver migração real, comprovar políticas-base ativas e testes positivos/negativos; caso contrário, marcar SIMULAÇÃO.",
              "host": "Microsoft Entra / Conditional Access",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Microsoft Entra / Conditional Access",
          "costNote": "Recursos premium exigem licença elegível e validação no tenant de estudo. Marque o que não foi executado."
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
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "conditional access"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-2-3"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Testar LAB-CA-MFA-PILOTO em Report-only para LAB-CLOUD-PILOTO, preservando emergência. Uma política combina sujeitos, recursos, condições e controles. Report-only calcula o resultado sem impor o bloqueio. Security Defaults fornece proteção básica e não deve ser retirado antes de planejar sua substituição."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 15,
        "stageId": "cloud",
        "stageLabel": "03 · Identidade cloud",
        "labAction": "Testar LAB-CA-MFA-PILOTO em Report-only para LAB-CLOUD-PILOTO, preservando emergência."
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
              "expected": "Registre o resultado observado desta ação em Entra + Microsoft Entra SAML Toolkit e compare com a entrega: SSO no SP escolhido e negação após retirada de atribuição observados; serviço externo e suas limitações registrados.",
              "host": "Entra + Microsoft Entra SAML Toolkit",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "gallery",
              "title": "Adicionar o aplicativo",
              "text": "No Entra, adicione Microsoft Entra SAML Toolkit da galeria. Abra Single sign-on → SAML. O aplicativo tem identificador fixo e uma instância por tenant; não crie duplicatas.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Entra + Microsoft Entra SAML Toolkit e compare com a entrega: SSO no SP escolhido e negação após retirada de atribuição observados; serviço externo e suas limitações registrados.",
              "host": "Entra + Microsoft Entra SAML Toolkit",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "trust",
              "title": "Configurar a confiança",
              "text": "Use no portal do Toolkit SAML Configuration → Create. Transfira Login URL, Entra Identifier, Logout URL e certificado público Raw do Entra. Copie de volta os valores Sign-on URL, Identifier e ACS fornecidos pelo Toolkit para Basic SAML Configuration. A ACS indicada no guia é https://samltoolkit.azurewebsites.net/SAML/Consume; confira os valores retornados pela configuração atual.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Entra + Microsoft Entra SAML Toolkit e compare com a entrega: SSO no SP escolhido e negação após retirada de atribuição observados; serviço externo e suas limitações registrados.",
              "host": "Entra + Microsoft Entra SAML Toolkit",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "user",
              "title": "Vincular e atribuir usuário",
              "text": "Registre no Toolkit uma conta de teste correspondente à identidade Entra e atribua diretamente esse usuário ao aplicativo. Em Properties, confira User assignment required. Atribuição por grupo pode exigir P1/P2; usuário direto evita presumir essa licença.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Entra + Microsoft Entra SAML Toolkit e compare com a entrega: SSO no SP escolhido e negação após retirada de atribuição observados; serviço externo e suas limitações registrados.",
              "host": "Entra + Microsoft Entra SAML Toolkit",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "positive",
              "title": "Testar SSO iniciado pelo SP",
              "text": "Use Test this application ou abra Sign-on URL. Confira identidade autenticada e evento de entrada. A assertion deve ser validada pelo SP; somente visualizar XML não prova assinatura válida.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Entra + Microsoft Entra SAML Toolkit e compare com a entrega: SSO no SP escolhido e negação após retirada de atribuição observados; serviço externo e suas limitações registrados.",
              "host": "Entra + Microsoft Entra SAML Toolkit",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "negative",
              "title": "Testar retirada de atribuição",
              "text": "Encerre sessão do SP, remova atribuição de teste e faça novo login com assignment required. Espere negação. Restaure apenas o acesso necessário; documente certificado, audiência, ACS e efeito da sessão já existente.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Entra + Microsoft Entra SAML Toolkit e compare com a entrega: SSO no SP escolhido e negação após retirada de atribuição observados; serviço externo e suas limitações registrados.",
              "host": "Entra + Microsoft Entra SAML Toolkit",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Entra + Microsoft Entra SAML Toolkit",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://learn.microsoft.com/en-us/entra/identity/saas-apps/saml-toolkit-tutorial"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "saml",
          "entra"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-0-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Conectar o tenant ao SP Microsoft Entra SAML Toolkit e testar atribuição/negação. O IdP autentica e emite uma assertion; o SP valida assinatura, audiência, destinatário e tempo. Entity ID identifica a parte; ACS recebe a resposta. Copiar um ACS de outro aplicativo quebra o contrato de confiança."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 19,
        "stageId": "protocols",
        "stageLabel": "04 · IdP e aplicações",
        "labAction": "Conectar o tenant ao SP Microsoft Entra SAML Toolkit e testar atribuição/negação."
      },
      {
        "id": "iam-3-1",
        "title": "OAuth 2.0 e OpenID Connect",
        "url": "https://www.rfc-editor.org/rfc/rfc9700.html",
        "study": [
          {
            "topic": "Qual parte do desenho será construída",
            "detail": "Você vai conectar IDP01 à APP01. O navegador inicia login; Keycloak autentica; a aplicação troca o código, verifica os tokens e cria uma sessão local. Nenhum cadastro de usuário na aplicação será presumido."
          },
          {
            "topic": "Por que ainda pode aparecer 403",
            "detail": "Identidade autenticada e direito de acesso são estados distintos. O cadastro da APP01 começa vazio. Depois do POST SCIM da próxima aula, E001 terá FIN-LEITOR/Financeiro e poderá obter 200 em FIN. O ID token pertence ao cliente; o access token pertence à API aurora-api."
          }
        ],
        "practice": [],
        "evidence": "Cliente configurado, arquivos construídos, login Code+PKCE e negativas 400/401/403 demonstrados.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "IDP01 → cliente aurora-web → APP01 construída manualmente",
          "platformUrl": "https://www.rfc-editor.org/rfc/rfc9700.html",
          "where": "IDP01 → cliente aurora-web → APP01 construída manualmente",
          "steps": [
            {
              "id": "client",
              "title": "Criar o cliente OIDC",
              "text": "No realm aurora: Clients → Create client. Type OpenID Connect; Client ID aurora-web. Client authentication OFF (público); Standard flow ON; Direct access grants OFF. Salve.",
              "command": "",
              "expected": "aurora-web é cliente público com fluxo de código.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você vai conectar IDP01 à APP01."
            },
            {
              "id": "redirect",
              "title": "Fixar os endereços",
              "text": "Em Settings do cliente: Valid redirect URIs http://localhost:8765/callback; Web origins http://localhost:8765. Não use *. Em Advanced/Advanced settings, configure Proof Key for Code Exchange Code Challenge Method S256.",
              "command": "",
              "expected": "Callback exato e PKCE S256 salvos.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você vai conectar IDP01 à APP01."
            },
            {
              "id": "audience",
              "title": "Adicionar audience da API",
              "text": "Clients → aurora-web → Client scopes → aurora-web-dedicated → Add mapper → By configuration → Audience. Name aurora-api; Included Custom Audience aurora-api; Add to access token ON; Add to ID token OFF. Salve.",
              "command": "",
              "expected": "Access token será emitido para aurora-api; ID token continua destinado ao cliente.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você vai conectar IDP01 à APP01."
            },
            {
              "id": "folder",
              "title": "Criar a aplicação a partir de um arquivo vazio",
              "text": "No HOST01 abra PowerShell, crie APP01 e abra um novo arquivo laboratorio.mjs em seu editor. Você vai escrever cada parte abaixo no mesmo arquivo e na ordem. Não execute o arquivo incompleto.",
              "command": "New-Item -ItemType Directory -Force C:\\AuroraLab\\APP01\nSet-Location C:\\AuroraLab\\APP01\nnode --version",
              "expected": "Pasta APP01 criada; Node.js 22+ disponível.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você vai conectar IDP01 à APP01."
            },
            {
              "id": "credential",
              "title": "Gerar a credencial do provisionamento",
              "text": "Gere um token aleatório local. Copie o resultado somente para scimToken de config.json na próxima etapa. Não coloque esse valor nas notas do portal nem no GitHub. É a credencial de S002, não a senha de Ana.",
              "command": "node -e \"console.log(require('node:crypto').randomBytes(32).toString('base64url'))\"",
              "expected": "Valor aleatório de mais de 32 caracteres gerado somente no seu computador.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você vai conectar IDP01 à APP01."
            },
            {
              "id": "config-file",
              "title": "Criar config.json e cadastro.json",
              "text": "No editor, crie config.json com o JSON abaixo substituindo SOMENTE o token. Crie outro arquivo cadastro.json com [] (lista vazia). Salve UTF-8. O cadastro inicia vazio: autenticar não cria a conta da aplicação.",
              "command": "{\n  \"issuer\": \"http://localhost:8080/realms/aurora\",\n  \"clientId\": \"aurora-web\",\n  \"scimToken\": \"SUBSTITUA_PELO_TOKEN_ALEATORIO_GERADO\"\n}",
              "expected": "Dois arquivos existem na mesma pasta de laboratorio.mjs; cadastro.json contém somente [].",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você vai conectar IDP01 à APP01."
            },
            {
              "id": "app-source-1",
              "title": "Escrever a aplicação · parte 1/5 · configuração e dados",
              "text": "No mesmo laboratorio.mjs, acrescente esta parte depois da anterior. Observe a responsabilidade indicada no título. Não copie os delimitadores Markdown e não execute o arquivo antes de acrescentar as cinco partes.",
              "command": "// Aplicação didática construída na lição OIDC. Somente loopback.\nimport http from 'node:http';\nimport {readFileSync,writeFileSync,renameSync,appendFileSync} from 'node:fs';\nimport {createHash,randomBytes,createPublicKey,verify,timingSafeEqual} from 'node:crypto';\nconst loadConfig=()=>JSON.parse(readFileSync('config.json','utf8'));\nconst config=loadConfig(), origin='http://localhost:8765';\nif(!config.issuer?.startsWith('http://localhost:8080/realms/')||!config.clientId||!config.scimToken||config.scimToken.length<32)throw Error('Confira config.json: issuer local, clientId e token de pelo menos 32 caracteres.');\nconst core='urn:ietf:params:scim:schemas:core:2.0:User';\nconst enterprise='urn:ietf:params:scim:schemas:extension:enterprise:2.0:User';\nconst patch='urn:ietf:params:scim:api:messages:2.0:PatchOp';\nconst sessions=new Map(), pending=new Map();\nconst random=()=>randomBytes(32).toString('base64url');\nconst equal=(a,b)=>{const x=Buffer.from(a||''),y=Buffer.from(b||'');return x.length===y.length&&timingSafeEqual(x,y);};\nconst users=()=>JSON.parse(readFileSync('cadastro.json','utf8'));\nconst saveUsers=list=>{writeFileSync('cadastro.tmp.json',JSON.stringify(list,null,2));renameSync('cadastro.tmp.json','cadastro.json');};\nconst audit=(event,data={})=>appendFileSync('eventos.jsonl',JSON.stringify({time:new Date().toISOString(),event,...data})+'\\n');\nconst scimUser=u=>({schemas:[core,enterprise],id:u.id,externalId:u.employeeId,userName:u.userName,displayName:u.displayName,active:u.active,roles:[{value:u.role}], [enterprise]:{department:u.department}});\nconst cookies=req=>Object.fromEntries((req.headers.cookie||'').split(';').map(v=>v.trim().split('=')));\nfunction send(res,status,data,type='application/json'){\n const body=typeof data==='string'?data:JSON.stringify(data);\n res.writeHead(status,{'Content-Type':type+'; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':\"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'\"});res.end(body);\n}\nfunction redirect(res,url,cookie){res.writeHead(302,{'Location':url,'Cache-Control':'no-store',...(cookie?{'Set-Cookie':cookie}:{})});res.end();}\nasync function jsonRequest(url,options={}){const res=await fetch(url,{...options,signal:AbortSignal.timeout(8000)});if(!res.ok)throw Error('Falha no IdP');return res.json();}\n",
              "host": "HOST01 · editor → C:\\AuroraLab\\APP01\\laboratorio.mjs",
              "why": "A separação deixa explícito onde se configuram confiança, cadastro, autenticação e autorização.",
              "expected": "Esta parte foi acrescentada na ordem. Depois da parte 5, node --check laboratorio.mjs precisa passar."
            },
            {
              "id": "app-source-2",
              "title": "Escrever a aplicação · parte 2/5 · assinatura e claims",
              "text": "No mesmo laboratorio.mjs, acrescente esta parte depois da anterior. Observe a responsabilidade indicada no título. Não copie os delimitadores Markdown e não execute o arquivo antes de acrescentar as cinco partes.",
              "command": "async function tokenClaims(token,audience,nonce){\n const parts=token.split('.');if(parts.length!==3)throw Error('JWT inválido');\n const [h,b,s]=parts,header=JSON.parse(Buffer.from(h,'base64url')),claims=JSON.parse(Buffer.from(b,'base64url'));\n if(header.alg!=='RS256'||claims.iss!==config.issuer)throw Error('Algoritmo/emissor');\n const {keys}=await jsonRequest(config.issuer+'/protocol/openid-connect/certs');\n const jwk=keys.find(k=>k.kid===header.kid&&k.kty==='RSA');if(!jwk)throw Error('Chave desconhecida');\n if(!verify('RSA-SHA256',Buffer.from(h+'.'+b),createPublicKey({key:jwk,format:'jwk'}),Buffer.from(s,'base64url')))throw Error('Assinatura');\n const aud=Array.isArray(claims.aud)?claims.aud:[claims.aud],now=Date.now()/1000;\n if(!aud.includes(audience)||typeof claims.exp!=='number'||claims.exp<=now||claims.nbf>now+30||!claims.sub||(nonce!==undefined&&claims.nonce!==nonce))throw Error('Claims inválidas');\n return claims;\n}\nasync function body(req){let text='';for await(const part of req){text+=part;if(Buffer.byteLength(text)>65536)throw Error('Corpo maior que 64 KB');}const value=JSON.parse(text);if(!value||Array.isArray(value)||typeof value!=='object')throw Error('JSON deve ser objeto');return value;}\nfunction scimAuth(req){const c=loadConfig();return [c.scimToken,c.nextScimToken].filter(Boolean).some(t=>equal(req.headers.authorization,'Bearer '+t));}\n",
              "host": "HOST01 · editor → C:\\AuroraLab\\APP01\\laboratorio.mjs",
              "why": "A separação deixa explícito onde se configuram confiança, cadastro, autenticação e autorização.",
              "expected": "Esta parte foi acrescentada na ordem. Depois da parte 5, node --check laboratorio.mjs precisa passar."
            },
            {
              "id": "app-source-3",
              "title": "Escrever a aplicação · parte 3/5 · cadastro e SCIM",
              "text": "No mesmo laboratorio.mjs, acrescente esta parte depois da anterior. Observe a responsabilidade indicada no título. Não copie os delimitadores Markdown e não execute o arquivo antes de acrescentar as cinco partes.",
              "command": "async function handleScim(req,res,url){\n const fail=(status,detail)=>send(res,status,{schemas:['urn:ietf:params:scim:api:messages:2.0:Error'],status:String(status),detail},'application/scim+json');\n if(!scimAuth(req))return fail(401,'Token SCIM ausente ou inválido');\n const collection=url.pathname==='/scim/v2/Users',id=url.pathname.split('/')[4];let list=users();\n if(req.method==='GET'){\n  if(!collection){const user=list.find(u=>u.id===id);return user?send(res,200,scimUser(user),'application/scim+json'):fail(404,'Usuário não encontrado');}\n  if(url.searchParams.has('filter')){const match=/^(externalId|userName) eq \"([^\"\\\\]+)\"$/.exec(url.searchParams.get('filter'));if(!match)return fail(400,'Filtro exato obrigatório');list=list.filter(u=>(match[1]==='externalId'?u.employeeId:u.userName)===match[2]);}\n  const start=Math.max(1,Number(url.searchParams.get('startIndex')||1)),count=Math.min(100,Math.max(0,Number(url.searchParams.get('count')||100)));if(!Number.isInteger(start)||!Number.isInteger(count))return fail(400,'Paginação');\n  const page=list.slice(start-1,start-1+count);return send(res,200,{schemas:['urn:ietf:params:scim:api:messages:2.0:ListResponse'],totalResults:list.length,startIndex:start,itemsPerPage:page.length,Resources:page.map(scimUser)},'application/scim+json');\n }\n if(req.method==='POST'&&collection){\n  const d=await body(req);if(!d.schemas?.includes(core)||!['externalId','userName','displayName'].every(k=>typeof d[k]==='string'&&d[k].length>0&&d[k].length<=100)||typeof d.active!=='boolean')return fail(400,'Atributos obrigatórios');\n  if(list.some(u=>u.employeeId===d.externalId||u.userName===d.userName))return fail(409,'Identidade já existe');\n  const department=d[enterprise]?.department,role=d.roles?.[0]?.value;\n  if(!['Financeiro','Jurídico','TI'].includes(department)||!['FIN-LEITOR','JUR-LEITOR','TI-OPERADOR'].includes(role))return fail(400,'Departamento/papel');\n  const user={id:randomBytes(12).toString('hex'),employeeId:d.externalId,userName:d.userName,displayName:d.displayName,active:d.active,department,role};list.push(user);saveUsers(list);audit('scim.create',{employeeId:user.employeeId});return send(res,201,scimUser(user),'application/scim+json');\n }\n if(req.method==='PATCH'&&!collection){\n  const d=await body(req),user=list.find(u=>u.id===id);if(!user)return fail(404,'Usuário não encontrado');\n  if(d.schemas?.length!==1||d.schemas[0]!==patch||!Array.isArray(d.Operations)||d.Operations.length<1||d.Operations.length>10)return fail(400,'PatchOp obrigatório');\n  const updated={...user};for(const op of d.Operations){if(String(op.op).toLowerCase()!=='replace')return fail(400,'Somente replace neste laboratório');\n   if(op.path==='active'&&typeof op.value==='boolean')updated.active=op.value;\n   else if(op.path===enterprise+':department'&&['Financeiro','Jurídico','TI'].includes(op.value))updated.department=op.value;\n   else if(op.path==='roles'&&Array.isArray(op.value)&&op.value.length===1&&['FIN-LEITOR','JUR-LEITOR','TI-OPERADOR'].includes(op.value[0].value))updated.role=op.value[0].value;\n   else return fail(400,'Path/valor não suportado');\n  }list=list.map(u=>u.id===id?updated:u);saveUsers(list);audit('scim.patch',{employeeId:updated.employeeId});return send(res,200,scimUser(updated),'application/scim+json');\n }\n return fail(405,'Operação não implementada no subconjunto didático');\n}\n",
              "host": "HOST01 · editor → C:\\AuroraLab\\APP01\\laboratorio.mjs",
              "why": "A separação deixa explícito onde se configuram confiança, cadastro, autenticação e autorização.",
              "expected": "Esta parte foi acrescentada na ordem. Depois da parte 5, node --check laboratorio.mjs precisa passar."
            },
            {
              "id": "app-source-4",
              "title": "Escrever a aplicação · parte 4/5 · login e callback",
              "text": "No mesmo laboratorio.mjs, acrescente esta parte depois da anterior. Observe a responsabilidade indicada no título. Não copie os delimitadores Markdown e não execute o arquivo antes de acrescentar as cinco partes.",
              "command": "const server=http.createServer(async(req,res)=>{\n try{\n  const url=new URL(req.url,origin);\n  if(url.pathname==='/health')return send(res,200,{status:'ok'});\n  if(url.pathname.startsWith('/scim/v2/Users'))return await handleScim(req,res,url);\n  if(req.method==='GET'&&url.pathname==='/login'){\n   for(const [key,v] of pending)if(v.expires<Date.now())pending.delete(key);\n   for(const [key,v] of sessions)if(v.expires<Date.now())sessions.delete(key);\n   const state=random(),nonce=random(),verifier=random(),binding=random();pending.set(state,{nonce,verifier,binding,expires:Date.now()+300000});\n   const query=new URLSearchParams({client_id:config.clientId,redirect_uri:origin+'/callback',response_type:'code',scope:'openid profile',state,nonce,code_challenge:createHash('sha256').update(verifier).digest('base64url'),code_challenge_method:'S256'});\n   return redirect(res,config.issuer+'/protocol/openid-connect/auth?'+query,'transaction='+binding+'; HttpOnly; SameSite=Lax; Path=/; Max-Age=300');\n  }\n  if(req.method==='GET'&&url.pathname==='/callback'){\n   const tx=pending.get(url.searchParams.get('state'));pending.delete(url.searchParams.get('state'));\n   if(!tx||tx.expires<Date.now()||!equal(tx.binding,cookies(req).transaction))return send(res,400,{error:'Transação inválida'});\n   const tokens=await jsonRequest(config.issuer+'/protocol/openid-connect/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:config.clientId,redirect_uri:origin+'/callback',code:url.searchParams.get('code')||'',code_verifier:tx.verifier})});\n   const identity=await tokenClaims(tokens.id_token,config.clientId,tx.nonce),access=await tokenClaims(tokens.access_token,'aurora-api');if(identity.sub!==access.sub)throw Error('Sujeitos diferentes');\n   const sid=random();sessions.set(sid,{token:tokens.access_token,expires:Math.min(Date.now()+600000,access.exp*1000)});audit('login',{subject:identity.sub});return redirect(res,'/','aurora='+sid+'; HttpOnly; SameSite=Lax; Path=/; Max-Age=600');\n  }\n",
              "host": "HOST01 · editor → C:\\AuroraLab\\APP01\\laboratorio.mjs",
              "why": "A separação deixa explícito onde se configuram confiança, cadastro, autenticação e autorização.",
              "expected": "Esta parte foi acrescentada na ordem. Depois da parte 5, node --check laboratorio.mjs precisa passar."
            },
            {
              "id": "app-source-5",
              "title": "Escrever a aplicação · parte 5/5 · autorização e inicialização",
              "text": "No mesmo laboratorio.mjs, acrescente esta parte depois da anterior. Observe a responsabilidade indicada no título. Não copie os delimitadores Markdown e não execute o arquivo antes de acrescentar as cinco partes.",
              "command": "  if(req.method==='GET'&&['/api/financeiro','/api/juridico'].includes(url.pathname)){\n   let claims;try{const session=sessions.get(cookies(req).aurora);const bearer=req.headers.authorization?.startsWith('Bearer ')?req.headers.authorization.slice(7):null;if(!bearer&&(!session||session.expires<Date.now()))throw Error('Sem sessão');claims=await tokenClaims(bearer||session.token,'aurora-api');}catch{return send(res,401,{decision:'negado',reason:'Autenticação inválida'});}\n   const user=users().find(u=>u.userName===claims.preferred_username),finance=url.pathname.endsWith('financeiro'),department=finance?'Financeiro':'Jurídico',role=finance?'FIN-LEITOR':'JUR-LEITOR';const allowed=!!user&&user.active&&user.department===department&&user.role===role;\n   audit('access',{subject:claims.sub,resource:department,allowed});return send(res,allowed?200:403,{decision:allowed?'permitido':'negado',resource:department,policy:'conta ativa + departamento + papel'});\n  }\n  if(req.method==='POST'&&url.pathname==='/logout'){\n   if(req.headers.origin!==origin)return send(res,403,{error:'Origem inválida'});sessions.delete(cookies(req).aurora);return redirect(res,'/','aurora=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');\n  }\n  if(req.method==='GET'&&url.pathname==='/')return send(res,200,'<!doctype html><html lang=\"pt-BR\"><meta charset=\"utf-8\"><title>APP01 · Aurora</title><h1>APP01 · Portal Aurora</h1><p>Autenticação no Keycloak; autorização na aplicação.</p><ul><li><a href=\"/login\">Entrar</a></li><li><a href=\"/api/financeiro\">Financeiro</a></li><li><a href=\"/api/juridico\">Jurídico</a></li></ul><form method=\"post\" action=\"/logout\"><button>Sair da aplicação</button></form></html>','text/html');\n  send(res,404,{error:'Não encontrado'});\n }catch{send(res,400,{error:'Requisição ou integração inválida; confira configuração, corpo e IdP sem publicar segredos.'});}\n});\nserver.listen(8765,'127.0.0.1',()=>console.log('APP01 em http://localhost:8765 · somente laboratório local'));\n",
              "host": "HOST01 · editor → C:\\AuroraLab\\APP01\\laboratorio.mjs",
              "why": "A separação deixa explícito onde se configuram confiança, cadastro, autenticação e autorização.",
              "expected": "Esta parte foi acrescentada na ordem. Depois da parte 5, node --check laboratorio.mjs precisa passar."
            },
            {
              "id": "start",
              "title": "Conferir e iniciar",
              "text": "Depois de salvar TODAS as partes, execute a checagem de sintaxe. Se passar, inicie o servidor. Mantenha esse terminal aberto e use outro para SCIM. Caso falhe, confira ordem, chaves e arquivos na pasta atual.",
              "command": "node --check laboratorio.mjs\nnode laboratorio.mjs",
              "expected": "APP01 em http://localhost:8765; /health responde {\"status\":\"ok\"}.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você vai conectar IDP01 à APP01."
            },
            {
              "id": "before-provision",
              "title": "Observar login sem acesso provisionado",
              "text": "Abra http://localhost:8765 e entre como fin.ana. O login no Keycloak deve funcionar, mas FIN/JUR dão 403 porque cadastro.json está vazio. Essa é uma negação correta. Não remova a validação para forçar 200.",
              "command": "",
              "expected": "Autenticado sem cadastro = 403. Sem sessão/token = 401.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você vai conectar IDP01 à APP01."
            },
            {
              "id": "pkce-observation",
              "title": "Observar Code + PKCE",
              "text": "No DevTools de seu navegador, aba Network, inicie novo login e observe client_id=aurora-web, response_type=code e code_challenge_method=S256 na autorização. Não copie authorization code, token ou cookies para evidências.",
              "command": "",
              "expected": "O fluxo usa código, transação e PKCE; não usa senha do usuário diretamente na API.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você vai conectar IDP01 à APP01."
            },
            {
              "id": "negative",
              "title": "Testar transação e voltar ao fluxo",
              "text": "Abra /callback?state=invalido: espere 400. Em janela privada abra /api/financeiro sem login: espere 401. Na aula SCIM você criará o cadastro e obterá 200/403 com Ana.",
              "command": "",
              "expected": "Negativas preservadas; próximo passo é provisionar E001, não alterar permissões do IdP.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Você vai conectar IDP01 à APP01."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "IDP01 → cliente aurora-web → APP01 construída manualmente",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://www.rfc-editor.org/rfc/rfc9700.html"
          }
        ],
        "revision": "2026.10.28.2",
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
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "A entrega desta lição foi observada: Cliente configurado, arquivos construídos, login Code+PKCE e negativas 400/401/403 demonstrados."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Cliente configurado, arquivos construídos, login Code+PKCE e negativas 400/401/403 demonstrados. Você vai conectar IDP01 à APP01. O navegador inicia login; Keycloak autentica; a aplicação troca o código, verifica os tokens e cria uma sessão local. Nenhum cadastro de usuário na aplicação será presumido."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 17,
        "stageId": "protocols",
        "stageLabel": "04 · IdP e aplicações",
        "labAction": "Construir a APP01, configurar aurora-web e observar login sem provisionamento."
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
            "detail": "A aplicação construída implementa um subconjunto didático: Users, filtros exatos, paginação e PATCH replace. Não é uma suíte de conformidade SCIM. Comunicação com Entra requer um destino suportado e alcançável de forma segura; localhost não é endpoint da nuvem."
          }
        ],
        "practice": [],
        "evidence": "POST e consulta de E001/E002 executados; autorização real e erros 401/409 conferidos.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "HOST01 → requisições SCIM → cadastro da APP01",
          "platformUrl": "https://www.rfc-editor.org/rfc/rfc7644.html",
          "where": "HOST01 → requisições SCIM → cadastro da APP01",
          "steps": [
            {
              "id": "consumer",
              "title": "Preparar a identidade do consumidor",
              "text": "Deixe laboratorio.mjs iniciado. Em outro PowerShell no HOST01 leia config.json e monte o header em memória. Não imprima $cfg nem $headers, pois contêm a credencial.",
              "command": "Set-Location C:\\AuroraLab\\APP01\n$cfg = Get-Content C:\\AuroraLab\\APP01\\config.json -Raw | ConvertFrom-Json\n$headers = @{Authorization=('Bearer ' + $cfg.scimToken)}",
              "expected": "A variável contém o bearer de S002 sem copiá-lo ao portal.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O cliente de provisionamento cria e atualiza contas em um servidor SCIM."
            },
            {
              "id": "empty",
              "title": "Consultar antes de criar",
              "text": "Localize E001 por externalId. Se você já executou este POST antes, use o objeto existente em vez de criar uma duplicata.",
              "command": "Invoke-RestMethod -Uri 'http://localhost:8765/scim/v2/Users?filter=externalId%20eq%20%22E001%22' -Headers $headers",
              "expected": "totalResults=0 no estado inicial; =1 se Ana já foi provisionada.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O cliente de provisionamento cria e atualiza contas em um servidor SCIM."
            },
            {
              "id": "ana-json",
              "title": "Montar o documento de Ana",
              "text": "Crie a variável body com o JSON abaixo. schemas descreve o contrato; externalId E001 liga ao RH; id será criado pelo destino. Department e roles determinam a autorização da aplicação.",
              "command": "$body = @'\n{\n  \"schemas\": [\n    \"urn:ietf:params:scim:schemas:core:2.0:User\",\n    \"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User\"\n  ],\n  \"externalId\": \"E001\",\n  \"userName\": \"fin.ana\",\n  \"displayName\": \"Ana Lima\",\n  \"active\": true,\n  \"roles\": [\n    {\n      \"value\": \"FIN-LEITOR\"\n    }\n  ],\n  \"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User\": {\n    \"department\": \"Financeiro\"\n  }\n}\n'@",
              "expected": "Documento representa J001 de E001 sem senha nem token.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O cliente de provisionamento cria e atualiza contas em um servidor SCIM."
            },
            {
              "id": "ana-post",
              "title": "Criar Ana no destino",
              "text": "Execute POST uma única vez para o estado inicial. Guarde o id retornado sem confundi-lo com employeeId. Se aparecer 409, consulte o objeto; não invente outro externalId para evitar o conflito.",
              "command": "$ana = Invoke-RestMethod -Method POST -Uri http://localhost:8765/scim/v2/Users -Headers $headers -ContentType application/scim+json -Body $body\n$ana | Select-Object id,externalId,userName,active",
              "expected": "Resposta criada; externalId E001 e active=True.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O cliente de provisionamento cria e atualiza contas em um servidor SCIM."
            },
            {
              "id": "carla",
              "title": "Criar a conta de controle",
              "text": "Prepare e envie Carla. O mesmo destino agora mantém duas contas. Não troque o externalId de Carla para E001.",
              "command": "$body = @'\n{\n  \"schemas\": [\n    \"urn:ietf:params:scim:schemas:core:2.0:User\",\n    \"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User\"\n  ],\n  \"externalId\": \"E002\",\n  \"userName\": \"jur.carla\",\n  \"displayName\": \"Carla Souza\",\n  \"active\": true,\n  \"roles\": [\n    {\n      \"value\": \"JUR-LEITOR\"\n    }\n  ],\n  \"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User\": {\n    \"department\": \"Jurídico\"\n  }\n}\n'@\nInvoke-RestMethod -Method POST -Uri http://localhost:8765/scim/v2/Users -Headers $headers -ContentType application/scim+json -Body $body",
              "expected": "E002/Jurídico/JUR-LEITOR criado; dois IDs de destino distintos.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O cliente de provisionamento cria e atualiza contas em um servidor SCIM."
            },
            {
              "id": "positive",
              "title": "Conferir o efeito na aplicação",
              "text": "No navegador, entre como Ana. Abra FIN e JUR. Depois entre como Carla em sessão separada e repita. O servidor verifica o cadastro a cada acesso, não apenas no login.",
              "command": "",
              "expected": "Ana: FIN 200/JUR 403; Carla: FIN 403/JUR 200.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O cliente de provisionamento cria e atualiza contas em um servidor SCIM."
            },
            {
              "id": "negative",
              "title": "Executar as negativas",
              "text": "Abra /scim/v2/Users no navegador sem header: 401. Repetir o POST com E001 já existente: 409. O aplicativo implementa um subconjunto didático SCIM; localhost não pode ser configurado como endpoint do Entra cloud.",
              "command": "",
              "expected": "Autenticação do provisionador e prevenção de duplicação foram observadas.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O cliente de provisionamento cria e atualiza contas em um servidor SCIM."
            },
            {
              "id": "mapping",
              "title": "Guardar os identificadores para as mudanças",
              "text": "Refaça a consulta por E001 e anote apenas id, externalId e userName. Na próxima aula você atualizará esse id usando PATCH. Não apague/recrie Ana na transferência.",
              "command": "Invoke-RestMethod -Uri 'http://localhost:8765/scim/v2/Users?filter=externalId%20eq%20%22E001%22' -Headers $headers",
              "expected": "Exatamente um objeto é encontrado.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O cliente de provisionamento cria e atualiza contas em um servidor SCIM."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "HOST01 → requisições SCIM → cadastro da APP01",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://www.rfc-editor.org/rfc/rfc7644.html"
          }
        ],
        "revision": "2026.10.28.2",
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
          "iam-3-1"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "A entrega desta lição foi observada: POST e consulta de E001/E002 executados; autorização real e erros 401/409 conferidos."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "POST e consulta de E001/E002 executados; autorização real e erros 401/409 conferidos. O cliente de provisionamento cria e atualiza contas em um servidor SCIM. id é atribuído pelo destino; externalId correlaciona com RH. active=false desativa o cadastro, mas o efeito nas sessões depende da aplicação."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 18,
        "stageId": "protocols",
        "stageLabel": "04 · IdP e aplicações",
        "labAction": "Criar E001/E002 na APP01 por POST SCIM e comparar autorização com o desenho."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Graph PowerShell · aplicação própria e compare com a entrega: Contexto comprova client ID próprio, /me funciona e revogação da concessão correta foi retestada.",
              "host": "Microsoft Graph PowerShell · aplicação própria",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "permission",
              "title": "Definir a leitura mínima",
              "text": "Em API permissions selecione Microsoft Graph → Delegated → User.Read. Obtenha aprovação conforme política do tenant; não conceda permissões amplas de escrita.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Graph PowerShell · aplicação própria e compare com a entrega: Contexto comprova client ID próprio, /me funciona e revogação da concessão correta foi retestada.",
              "host": "Microsoft Graph PowerShell · aplicação própria",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "own-client",
              "title": "Autenticar no cliente criado",
              "text": "Instale o SDK e substitua os dois placeholders por IDs da sua aplicação. Device code é usado apenas no cliente público de teste autorizado; não use Graph Explorer para afirmar que testou esta aplicação.",
              "command": "Install-Module Microsoft.Graph.Authentication -Scope CurrentUser\nConnect-MgGraph -ClientId \"SEU-CLIENT-ID\" -TenantId \"SEU-TENANT-ID\" -Scopes \"User.Read\" -UseDeviceCode\nGet-MgContext | Select-Object ClientId,TenantId,Scopes\nInvoke-MgGraphRequest -Method GET -Uri \"https://graph.microsoft.com/v1.0/me\"",
              "expected": "Contexto mostra o client ID de LAB-APP-READONLY e /me retorna a identidade de teste.",
              "host": "Microsoft Graph PowerShell · aplicação própria",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "revoke",
              "title": "Revogar a concessão correta",
              "text": "Desconecte o SDK. Em Enterprise applications encontre a representação de LAB-APP-READONLY e a concessão delegada correspondente. Revogue o consentimento de teste com papel autorizado. Não altere Graph Explorer.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Graph PowerShell · aplicação própria e compare com a entrega: Contexto comprova client ID próprio, /me funciona e revogação da concessão correta foi retestada.",
              "host": "Microsoft Graph PowerShell · aplicação própria",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "retry",
              "title": "Obter nova autorização",
              "text": "Execute Disconnect-MgGraph e depois Connect-MgGraph novamente com o mesmo client ID. Registre falha ou novo pedido de consentimento conforme política; não prometa revogação imediata de access token já emitido. Remova a aplicação se não for reutilizá-la.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Graph PowerShell · aplicação própria e compare com a entrega: Contexto comprova client ID próprio, /me funciona e revogação da concessão correta foi retestada.",
              "host": "Microsoft Graph PowerShell · aplicação própria",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Microsoft Graph PowerShell · aplicação própria",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://learn.microsoft.com/en-us/graph/auth-register-app-v2"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "graph",
          "oauth"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-0-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Executar /me com o client ID LAB-APP-READONLY e revogar a concessão correta. App registration define o aplicativo; service principal é sua representação no tenant. Permissão delegada atua com usuário; permissão de aplicação atua sem usuário e pode exigir consentimento administrativo."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 20,
        "stageId": "protocols",
        "stageLabel": "04 · IdP e aplicações",
        "labAction": "Executar /me com o client ID LAB-APP-READONLY e revogar a concessão correta."
      }
    ],
    "environment": "IDP01 criado manualmente; APP01 será construída nas aulas, a partir de arquivos vazios.",
    "outcome": "Code+PKCE, autorização, POST/PATCH SCIM e integrações de teste explicados e executados por você.",
    "requirements": "Node.js 22+ no HOST01, realm aurora e tenant somente para SAML/consentimento Microsoft.",
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
            "topic": "Orquestração observável antes de automação",
            "detail": "Nesta etapa, você aplica o evento em cada fronteira: AD, conferência do Entra, Keycloak e cadastro da APP01 por SCIM. Não há script de orquestração pronto. Se uma fronteira falhar, compare o estado do RH com cada destino e corrija a divergência sem criar outra pessoa."
          }
        ],
        "practice": [],
        "evidence": "J001/M001/L001 executados por fronteira, com matriz antes/depois e correlação do mesmo E001.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Arquitetura → J001, M001 e L001 em cada sistema",
          "platformUrl": "https://www.rfc-editor.org/rfc/rfc7644.html",
          "where": "Arquitetura → J001, M001 e L001 em cada sistema",
          "steps": [
            {
              "id": "j001",
              "title": "Conferir o estado de admissão",
              "text": "J001 corresponde ao que você já construiu: E001 no AD/Keycloak/APP01, grupo FIN no AD e FIN-LEITOR no destino. Registre o id SCIM e confirme Ana FIN 200/JUR 403, Carla JUR 200. O piloto Entra deve estar sincronizado se você executou Cloud Sync.",
              "command": "",
              "expected": "Todos os sistemas executados representam o mesmo vínculo E001. Sistemas não disponíveis estão identificados.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Joiner cria vínculo e acesso inicial."
            },
            {
              "id": "rh-move",
              "title": "Aprovar M001 no RH",
              "text": "No rh.csv altere somente a linha E001: department Jurídico, manager E004, status active. Não altere employeeId nem userName. Registre M001 e o horário em suas evidências.",
              "command": "",
              "expected": "O estado desejado mudou; nenhum destino foi alterado automaticamente.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Joiner cria vínculo e acesso inicial."
            },
            {
              "id": "ad-move",
              "title": "Aplicar a transferência no AD",
              "text": "No DC01 remova o grupo antigo, atualize Department e OU, depois conceda o grupo novo. Como a autorização Windows usa token de logon, faça logoff/login de Ana antes de retestar ACLs.",
              "command": "Remove-ADGroupMember GG-FIN-LEITURA fin.ana -Confirm:$false\nSet-ADUser fin.ana -Department \"Jurídico\"\nGet-ADUser fin.ana | Move-ADObject -TargetPath \"OU=Juridico,OU=Colaboradores,OU=AURORA,DC=aurora,DC=test\"\nAdd-ADGroupMember GG-JUR-LEITURA fin.ana",
              "expected": "E001 preservado; FIN removido, JUR concedido e OU mudou.",
              "host": "DC01",
              "why": "Joiner cria vínculo e acesso inicial."
            },
            {
              "id": "cloud-move",
              "title": "Conferir propagação",
              "text": "No Entra aguarde/consulte o ciclo Cloud Sync do piloto e confira Department e grupos. Não edite o destino sincronizado para mascarar erro da origem. Se não houver sincronização executada, não marque esta parte como real.",
              "command": "",
              "expected": "Objeto existente atualizado sem duplicação.",
              "host": "Entra Admin Center",
              "why": "Joiner cria vínculo e acesso inicial."
            },
            {
              "id": "idp-move",
              "title": "Refletir M001 no IdP de bancada",
              "text": "Em IDP01 → realm aurora → Users → fin.ana atualize department para Jurídico. Em Role mapping remova FIN-LEITOR e atribua JUR-LEITOR. Essa mudança é manual: não há conector AD → Keycloak configurado neste núcleo.",
              "command": "",
              "expected": "O mesmo usuário permanece no realm, com o novo papel.",
              "host": "Console Keycloak",
              "why": "Joiner cria vínculo e acesso inicial."
            },
            {
              "id": "app-move",
              "title": "Atualizar o destino por PATCH",
              "text": "No HOST01 releia o token se necessário, consulte E001 e use o id retornado. O corpo altera departamento e papel na mesma requisição.",
              "command": "$cfg = Get-Content C:\\AuroraLab\\APP01\\config.json -Raw | ConvertFrom-Json\n$headers = @{Authorization=('Bearer ' + $cfg.scimToken)}\n$result = Invoke-RestMethod -Uri 'http://localhost:8765/scim/v2/Users?filter=externalId%20eq%20%22E001%22' -Headers $headers\n$id = $result.Resources[0].id\n$body = @'\n{\n  \"schemas\": [\n    \"urn:ietf:params:scim:api:messages:2.0:PatchOp\"\n  ],\n  \"Operations\": [\n    {\n      \"op\": \"replace\",\n      \"path\": \"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:department\",\n      \"value\": \"Jurídico\"\n    },\n    {\n      \"op\": \"replace\",\n      \"path\": \"roles\",\n      \"value\": [\n        {\n          \"value\": \"JUR-LEITOR\"\n        }\n      ]\n    }\n  ]\n}\n'@\nInvoke-RestMethod -Method PATCH -Uri (\"http://localhost:8765/scim/v2/Users/\" + $id) -Headers $headers -ContentType application/scim+json -Body $body",
              "expected": "Mesmo id de destino; Department Jurídico e JUR-LEITOR.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Joiner cria vínculo e acesso inicial."
            },
            {
              "id": "test-move",
              "title": "Retestar a sessão existente",
              "text": "Sem apagar o cadastro, use a sessão de Ana na APP01 e teste os recursos. A aplicação reconsulta os atributos locais; não precisa esperar um novo login para negar FIN. Carla continua servindo como controle.",
              "command": "",
              "expected": "Ana FIN 403/JUR 200; Carla JUR 200.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Joiner cria vínculo e acesso inicial."
            },
            {
              "id": "rh-leave",
              "title": "Aprovar L001 e bloquear AD",
              "text": "Altere status de E001 para inactive no rh.csv. No DC01 bloqueie a conta e retire grupos de acesso. Não exclua os objetos necessários à evidência.",
              "command": "Disable-ADAccount fin.ana\nRemove-ADGroupMember GG-JUR-LEITURA fin.ana -Confirm:$false",
              "expected": "Conta AD bloqueada; evidência de L001 preservada.",
              "host": "DC01",
              "why": "Joiner cria vínculo e acesso inicial."
            },
            {
              "id": "idp-leave",
              "title": "Bloquear o IdP e conferir o cloud",
              "text": "No Keycloak → fin.ana coloque Enabled OFF e encerre as sessões do usuário. No Entra confira o bloqueio propagado; revogue sessões com função autorizada quando o cenário permitir. Bloqueio não é garantia universal de invalidação imediata de qualquer token já emitido.",
              "command": "",
              "expected": "Novo login no Keycloak é negado; estado Entra foi observado ou marcado como pendente.",
              "host": "Keycloak e Entra",
              "why": "Joiner cria vínculo e acesso inicial."
            },
            {
              "id": "app-leave",
              "title": "Desativar a conta no destino",
              "text": "Use o mesmo $id de E001. Este PATCH retira o acesso efetivo na APP01 mesmo se existir um token ainda válido.",
              "command": "$body = @'\n{\n  \"schemas\": [\n    \"urn:ietf:params:scim:api:messages:2.0:PatchOp\"\n  ],\n  \"Operations\": [\n    {\n      \"op\": \"replace\",\n      \"path\": \"active\",\n      \"value\": false\n    }\n  ]\n}\n'@\nInvoke-RestMethod -Method PATCH -Uri (\"http://localhost:8765/scim/v2/Users/\" + $id) -Headers $headers -ContentType application/scim+json -Body $body",
              "expected": "active=False no destino; E001 não foi recriado.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Joiner cria vínculo e acesso inicial."
            },
            {
              "id": "test-leave",
              "title": "Testar e fechar a movimentação",
              "text": "Teste FIN e JUR na sessão anterior; ambos devem negar: 403 se o token ainda é válido, 401 se a autenticação já não passa. Tente novo login. Registre horário de cada sistema e diferença entre bloqueio, sessão e autorização.",
              "command": "",
              "expected": "Nenhum acesso para Ana; Carla permanece sem mudança.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Joiner cria vínculo e acesso inicial."
            },
            {
              "id": "return",
              "title": "Preparar outro ensaio sem perder o histórico",
              "text": "Para R001 de laboratório, use o evento de retorno na Arquitetura: reative os mesmos objetos e retorne atributos/grupos/papel ao estado J001. Faça PATCH de active=true, department Financeiro e roles FIN-LEITOR. Só faça isso mediante decisão fictícia explícita; não é política de readmissão automática.",
              "command": "",
              "expected": "Mesmo E001 pronto para repetir o exercício; nenhuma duplicata.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "Joiner cria vínculo e acesso inicial."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Arquitetura → J001, M001 e L001 em cada sistema",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://www.rfc-editor.org/rfc/rfc7644.html"
          }
        ],
        "revision": "2026.10.28.2",
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
          "iam-3-2"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "A entrega desta lição foi observada: J001/M001/L001 executados por fronteira, com matriz antes/depois e correlação do mesmo E001."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Executar J001, M001 e L001 manualmente, observando cada fronteira e cada decisão de acesso. Joiner cria vínculo e acesso inicial. Mover troca acesso removendo o anterior. Leaver retira acesso e encerra vínculo. employeeId permanece estável; departamento e status mudam. Um email não deve ser sua única correlação."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 21,
        "stageId": "governance",
        "stageLabel": "05 · Governança e privilégios",
        "labAction": "Executar J001, M001 e L001 manualmente, observando cada fronteira e cada decisão de acesso."
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
        "evidence": "Catálogo AURORA-RECURSOS, pacote FIN-LEITURA, aprovação de Bruno e retirada observados; expiração automática testada ou pendente identificada.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Microsoft Entra / Entitlement Management",
          "platformUrl": "https://entra.microsoft.com",
          "where": "Governança de identidade → Gerenciamento de direitos",
          "steps": [
            {
              "id": "license",
              "title": "Confirmar o recurso e os responsáveis",
              "text": "No Entra de estudo confirme licença elegível de Entitlement Management. Os responsáveis são Bruno/fin.bruno como aprovador e Ana/fin.ana como solicitante. Os objetos precisam existir no tenant por sincronização. Sem licença, registre o fluxo como simulado, sem afirmar que um pacote foi criado.",
              "host": "TENANT01 · Entra Admin Center",
              "expected": "Licença e papéis de administração de governança conferidos.",
              "why": "Criar catálogo AURORA-RECURSOS e pacote FIN-LEITURA com aprovação de Bruno e expiração."
            },
            {
              "id": "catalog",
              "title": "Criar o catálogo fixo",
              "text": "Entra ID → Identity Governance → Entitlement management → Catalogs → New catalog. Name AURORA-RECURSOS; Enabled Yes. Na tela Resources → Add resources, adicione somente o grupo GG-FIN-LEITURA. Confira proprietário autorizado para adicionar o recurso.",
              "host": "Entra · Entitlement management",
              "expected": "Catálogo existe com o grupo financeiro, sem recursos administrativos.",
              "why": "Criar catálogo AURORA-RECURSOS e pacote FIN-LEITURA com aprovação de Bruno e expiração."
            },
            {
              "id": "package",
              "title": "Criar o pacote FIN-LEITURA",
              "text": "Access packages → New access package. Name FIN-LEITURA; Catalog AURORA-RECURSOS. Em Resource roles, selecione GG-FIN-LEITURA como Member. Não inclua Owner e não adicione papéis administrativos.",
              "host": "Entra",
              "expected": "Pacote concede somente participação no grupo de leitura.",
              "why": "Criar catálogo AURORA-RECURSOS e pacote FIN-LEITURA com aprovação de Bruno e expiração."
            },
            {
              "id": "policy",
              "title": "Definir aprovação e duração",
              "text": "Na política do pacote, limite solicitações ao piloto do laboratório. Exija aprovação; escolha fin.bruno como aprovador e evite autoaprovação. Lifecycle: expire assignment after 1 day; sem renovação automática neste ensaio. Salve e registre o horário de início.",
              "host": "Entra",
              "expected": "Há aprovador definido e prazo de um dia; não é concessão permanente.",
              "why": "Criar catálogo AURORA-RECURSOS e pacote FIN-LEITURA com aprovação de Bruno e expiração."
            },
            {
              "id": "request",
              "title": "Solicitar e aprovar como pessoas distintas",
              "text": "Com Ana no portal My Access, localize FIN-LEITURA e solicite com justificativa J001. Em outra sessão com Bruno, revise a solicitação e aprove. No Entra confirme a atribuição e a participação no grupo. Não use a mesma sessão administrativa para fingir os dois papéis.",
              "host": "My Access · sessões separadas",
              "expected": "Solicitação, aprovação e concessão têm identidades/horários identificáveis.",
              "why": "Criar catálogo AURORA-RECURSOS e pacote FIN-LEITURA com aprovação de Bruno e expiração."
            },
            {
              "id": "expiry",
              "title": "Comprovar retirada sem confundir os testes",
              "text": "Para testar remoção imediata, retire a atribuição do pacote e confira remoção do grupo. Para provar expiração automática, aguarde o prazo e registre o efeito real. Remoção manual não comprova que a expiração automática executou. APP01/Keycloak não recebem essa mudança automaticamente: registre essa fronteira separada.",
              "host": "Entra e aplicação-alvo",
              "expected": "Concessão/retirada observadas; expiração comprovada ou explicitamente pendente.",
              "why": "Criar catálogo AURORA-RECURSOS e pacote FIN-LEITURA com aprovação de Bruno e expiração."
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Microsoft Entra / Entitlement Management",
          "costNote": "Recursos premium exigem licença elegível e validação no tenant de estudo. Marque o que não foi executado."
        },
        "sources": [
          {
            "label": "Licença Entitlement Management",
            "url": "https://learn.microsoft.com/pt-br/entra/id-governance/entitlement-management-overview"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "iga",
          "entra"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-4-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Criar catálogo AURORA-RECURSOS e pacote FIN-LEITURA com aprovação de Bruno e expiração. Um catálogo organiza recursos; um pacote agrupa direitos e uma política define quem solicita, quem aprova e quando expira. A aprovação precisa refletir o risco do acesso e evitar autoaprovação indevida."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 22,
        "stageId": "governance",
        "stageLabel": "05 · Governança e privilégios",
        "labAction": "Criar catálogo AURORA-RECURSOS e pacote FIN-LEITURA com aprovação de Bruno e expiração."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Access Reviews e compare com a entrega: Revisão SoD com acesso removido",
              "host": "Microsoft Entra / Access Reviews",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Defina pares de funções incompatíveis e uma matriz SoD.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Access Reviews e compare com a entrega: Revisão SoD com acesso removido",
              "host": "Microsoft Entra / Access Reviews",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Monte matriz SoD: solicitante de pagamento não pode ser aprovador do mesmo pagamento; associe perfis fictícios a grupos.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Access Reviews e compare com a entrega: Revisão SoD com acesso removido",
              "host": "Microsoft Entra / Access Reviews",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Em Access Reviews licenciadas, crie revisão piloto com dono definido; sem licença, use CSV com usuário, acesso, dono, decisão e prazo.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Access Reviews e compare com a entrega: Revisão SoD com acesso removido",
              "host": "Microsoft Entra / Access Reviews",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Rejeite acesso excessivo de uma conta fictícia e remova a associação de grupo em ambiente de teste.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Access Reviews e compare com a entrega: Revisão SoD com acesso removido",
              "host": "Microsoft Entra / Access Reviews",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Repita login/acesso e confirme negação; registre decisão, responsável, evidência e exceção temporária se existir.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Access Reviews e compare com a entrega: Revisão SoD com acesso removido",
              "host": "Microsoft Entra / Access Reviews",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confira escopo, revisores, convidados e decisões; compare a decisão de negar com remoção efetiva de acesso e logs.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Access Reviews e compare com a entrega: Revisão SoD com acesso removido",
              "host": "Microsoft Entra / Access Reviews",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Microsoft Entra / Access Reviews",
          "costNote": "Recursos premium exigem licença elegível e validação no tenant de estudo. Marque o que não foi executado."
        },
        "sources": [
          {
            "label": "Access Reviews Microsoft Entra",
            "url": "https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "iga",
          "sod",
          "entra"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-4-1"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Investigar SOD01 em E003 e retirar a combinação incompatível de grupos. Solicitar e aprovar o próprio pagamento é um conflito de segregação de funções. Uma revisão periódica pergunta se cada acesso ainda é necessário; uma política SoD pode prevenir ou detectar combinações arriscadas."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 23,
        "stageId": "governance",
        "stageLabel": "05 · Governança e privilégios",
        "labAction": "Investigar SOD01 em E003 e retirar a combinação incompatível de grupos."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Governance e compare com a entrega: Relatório de recertificação com decisões",
              "host": "Microsoft Entra / Identity Governance",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Monte inventário de acessos e responsáveis por aplicação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Governance e compare com a entrega: Relatório de recertificação com decisões",
              "host": "Microsoft Entra / Identity Governance",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Exporte inventário de usuários, grupos e aplicações do laboratório sem informações sensíveis; registre data e origem.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Governance e compare com a entrega: Relatório de recertificação com decisões",
              "host": "Microsoft Entra / Identity Governance",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Distribua lista aos proprietários fictícios de Financeiro e Jurídico; registre aprovar, revogar ou justificar exceção.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Governance e compare com a entrega: Relatório de recertificação com decisões",
              "host": "Microsoft Entra / Identity Governance",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Aplique uma revogação real em conta de teste e verifique efeito; mantenha log antes/depois e prazo de remediação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Governance e compare com a entrega: Relatório de recertificação com decisões",
              "host": "Microsoft Entra / Identity Governance",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Consolide relatório com escopo, decisões, pendências, aprovadores, data e resultado do reteste.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Governance e compare com a entrega: Relatório de recertificação com decisões",
              "host": "Microsoft Entra / Identity Governance",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confirme datas da campanha, proprietários, decisão, justificativa e remoção; diferencie revisão manual de campanha automatizada.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Governance e compare com a entrega: Relatório de recertificação com decisões",
              "host": "Microsoft Entra / Identity Governance",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Microsoft Entra / Identity Governance",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Revisões de acesso",
            "url": "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "iga",
          "audit"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-4-2"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Revisar acessos E001/E002 com Bruno/Diego, aplicar decisões e retestar o destino. Uma campanha define escopo, população, revisores, prazo e tratamento de não resposta. A decisão gera remediação; o reteste confirma que o risco foi reduzido. Decisões sem evidência não permitem repetir a auditoria."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 24,
        "stageId": "governance",
        "stageLabel": "05 · Governança e privilégios",
        "labAction": "Revisar acessos E001/E002 com Bruno/Diego, aplicar decisões e retestar o destino."
      }
    ],
    "environment": "Os mesmos E001/E002 em RH, AD, IdP e aplicação; Entra quando sincronização executada.",
    "outcome": "J001, M001, L001 e SOD01 aplicados nas fronteiras executadas.",
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
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / PIM e compare com a entrega: Ativação JIT temporária e logs",
              "host": "Microsoft Entra / PIM",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Confirme licença Microsoft Entra ID P2 ou Microsoft Entra ID Governance para PIM e pessoas envolvidas. Entra ID Free e P1 isolado não fornecem execução real de PIM.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / PIM e compare com a entrega: Ativação JIT temporária e logs",
              "host": "Microsoft Entra / PIM",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Confirme licenciamento PIM aplicável; sem P2/ID Governance apropriado, não declare ativação real.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / PIM e compare com a entrega: Ativação JIT temporária e logs",
              "host": "Microsoft Entra / PIM",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Use a conta cloud-only pim.piloto no tenant de estudo. No PIM → Microsoft Entra roles → Assignments → Add assignments selecione Reports Reader, Member pim.piloto, Assignment type Eligible e duração de 1 dia. Não altere a própria conta de emergência. Essa conta será usada somente neste exercício.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / PIM e compare com a entrega: Ativação JIT temporária e logs",
              "host": "Microsoft Entra / PIM",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Como pim.piloto, PIM → My roles → Microsoft Entra roles → Eligible assignments → Reports Reader → Activate. Informe justificativa LAB-PIM-01, duração de 30 minutos e complete MFA/aprovação se a política exigir. Como administrador, confira a atribuição ativa e o evento. Ao terminar, Deactivate e reteste o estado de atribuição; não presuma que leitura básica já permitida ao usuário será bloqueada.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / PIM e compare com a entrega: Ativação JIT temporária e logs",
              "host": "Microsoft Entra / PIM",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Sem licença, modele solicitação/aprovação/expiração em planilha e compare com PIM real, identificando explicitamente a simulação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / PIM e compare com a entrega: Ativação JIT temporária e logs",
              "host": "Microsoft Entra / PIM",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Se PIM estiver ausente, confirme P2/ID Governance e papel adequado; confira elegibilidade, duração, MFA e logs de ativação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / PIM e compare com a entrega: Ativação JIT temporária e logs",
              "host": "Microsoft Entra / PIM",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Microsoft Entra / PIM",
          "costNote": "Recursos premium exigem licença elegível e validação no tenant de estudo. Marque o que não foi executado."
        },
        "sources": [
          {
            "label": "Requisitos do PIM",
            "url": "https://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-getting-started"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "pim",
          "entra"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-local"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Ativar papel temporário de baixo impacto em conta de teste e conferir expiração. PIM permite que uma identidade elegível ative uma função por período limitado, com condições como justificativa, MFA e aprovação. JIT reduz tempo de exposição; não substitui seleção correta da função e escopo."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 25,
        "stageId": "governance",
        "stageLabel": "05 · Governança e privilégios",
        "labAction": "Ativar papel temporário de baixo impacto em conta de teste e conferir expiração."
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
              "expected": "Registre o resultado observado desta ação em JumpServer Community — PAM de sessões e compare com a entrega: Ativo piloto e operador configurados, acesso permitido/negado testado e capacidade de auditoria da edição registrada. Rotação automática só conta se executada separadamente.",
              "host": "JumpServer Community — PAM de sessões",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Separe credenciais de teste SSH/RDP e identifique uma VM alvo. Não registre senhas em arquivos, capturas ou repositórios.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em JumpServer Community — PAM de sessões e compare com a entrega: Ativo piloto e operador configurados, acesso permitido/negado testado e capacidade de auditoria da edição registrada. Rotação automática só conta se executada separadamente.",
              "host": "JumpServer Community — PAM de sessões",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Use JumpServer Community para laboratório isolado; verifique requisitos atuais e só ligue VM extra após desligar Keycloak se necessário.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em JumpServer Community — PAM de sessões e compare com a entrega: Ativo piloto e operador configurados, acesso permitido/negado testado e capacidade de auditoria da edição registrada. Rotação automática só conta se executada separadamente.",
              "host": "JumpServer Community — PAM de sessões",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Cadastre ativo de teste e uma conta de operador; configure autorização mínima de sessão pela interface da versão instalada, registrando nomes de telas conforme a edição.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em JumpServer Community — PAM de sessões e compare com a entrega: Ativo piloto e operador configurados, acesso permitido/negado testado e capacidade de auditoria da edição registrada. Rotação automática só conta se executada separadamente.",
              "host": "JumpServer Community — PAM de sessões",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Teste acesso aprovado via bastion e tente acesso com conta sem autorização. Se disponível na edição, registre trilha/auditoria de sessão.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em JumpServer Community — PAM de sessões e compare com a entrega: Ativo piloto e operador configurados, acesso permitido/negado testado e capacidade de auditoria da edição registrada. Rotação automática só conta se executada separadamente.",
              "host": "JumpServer Community — PAM de sessões",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Compare auditoria de sessão e procedimento de rotação de credencial. Não alegue rotação automática ou gravação de sessão se a edição não oferecer esses recursos.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em JumpServer Community — PAM de sessões e compare com a entrega: Ativo piloto e operador configurados, acesso permitido/negado testado e capacidade de auditoria da edição registrada. Rotação automática só conta se executada separadamente.",
              "host": "JumpServer Community — PAM de sessões",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Se o acesso privilegiado falhar, verifique destino, credenciais de laboratório, gateway e logs de sessão; não confunda vault de segredos com PAM de sessões.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em JumpServer Community — PAM de sessões e compare com a entrega: Ativo piloto e operador configurados, acesso permitido/negado testado e capacidade de auditoria da edição registrada. Rotação automática só conta se executada separadamente.",
              "host": "JumpServer Community — PAM de sessões",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "JumpServer Community — PAM de sessões",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "JumpServer documentação",
            "url": "https://docs.jumpserver.org/"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "pam",
          "jumpserver"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-5-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Controlar uma sessão privilegiada para CL01 com operador e autorização limitados. Um bastion controla acesso a alvos e pode registrar sessão conforme edição. Um cofre armazena credenciais; rotação muda a credencial usada pelo consumidor. Nenhuma dessas funções garante automaticamente as demais."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 26,
        "stageId": "governance",
        "stageLabel": "05 · Governança e privilégios",
        "labAction": "Controlar uma sessão privilegiada para CL01 com operador e autorização limitados."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Roles e compare com a entrega: Procedimento break-glass ensaiado",
              "host": "Microsoft Entra / Roles",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Prepare duas contas de emergência cloud-only *.onmicrosoft.com, segregadas das contas operacionais e protegidas por FIDO2 ou autenticação baseada em certificado, sob custódia segura.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Roles e compare com a entrega: Procedimento break-glass ensaiado",
              "host": "Microsoft Entra / Roles",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Revise as duas contas de emergência, sua independência de AD/SSO, funções administrativas ativas e alertas. Em tenant de estudo sem controle de custódia, documente o desenho sem ampliar privilégios.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Roles e compare com a entrega: Procedimento break-glass ensaiado",
              "host": "Microsoft Entra / Roles",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Faça simulação de indisponibilidade, sem derrubar serviços. Verifique como uma conta emergencial acessaria o Entra sem depender de sincronização e registre responsáveis.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Roles e compare com a entrega: Procedimento break-glass ensaiado",
              "host": "Microsoft Entra / Roles",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Documente testes de entrada, armazenamento de credenciais e rotação pós-uso; nunca remova os únicos meios de recuperação do tenant.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Roles e compare com a entrega: Procedimento break-glass ensaiado",
              "host": "Microsoft Entra / Roles",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Planeje inspeção periódica de pelo menos 90 dias e alertas a cada uso administrativo. Registre o procedimento aprovado, riscos e resultados do tabletop.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Roles e compare com a entrega: Procedimento break-glass ensaiado",
              "host": "Microsoft Entra / Roles",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Se a conta de emergência não entrar, revise independência de IdP, método resistente a phishing, CA aplicável e custódia; não execute lockout real.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Roles e compare com a entrega: Procedimento break-glass ensaiado",
              "host": "Microsoft Entra / Roles",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Microsoft Entra / Roles",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Recuperação com contas de emergência",
            "url": "https://learn.microsoft.com/pt-br/entra/identity/role-based-access-control/security-emergency-access"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "entra",
          "recovery"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-5-1"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Ensaiar recuperação com BG01/BG02 sem derrubar o tenant nem depender do AD. A conta de emergência não pode depender do componente que falhou. Contas cloud-only evitam depender da sincronização local, mas continuam exigindo métodos e custódia disponíveis. Teste de mesa complementa, não substitui, entrada real autorizada."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 27,
        "stageId": "governance",
        "stageLabel": "05 · Governança e privilégios",
        "labAction": "Ensaiar recuperação com BG01/BG02 sem derrubar o tenant nem depender do AD."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / App registrations e compare com a entrega: App com permissões mínimas",
              "host": "Microsoft Entra / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Crie app registration de teste e identifique service principal.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / App registrations e compare com a entrega: App com permissões mínimas",
              "host": "Microsoft Entra / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Crie aplicação LAB-WORKLOAD-READ no Entra, sem segredos se não forem necessários, e identifique Application ID e Object ID.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / App registrations e compare com a entrega: App com permissões mínimas",
              "host": "Microsoft Entra / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Compare permissões delegadas e de aplicativo; registre apenas escopos mínimos para uma leitura de teste.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / App registrations e compare com a entrega: App com permissões mínimas",
              "host": "Microsoft Entra / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Se tiver recurso Azure compatível, habilite managed identity nele e teste token para recurso autorizado; sem Azure, documente conceito sem afirmar execução.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / App registrations e compare com a entrega: App com permissões mínimas",
              "host": "Microsoft Entra / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Remova permissão desnecessária e confirme negação controlada; registre proprietário técnico e prazo de revisão.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / App registrations e compare com a entrega: App com permissões mínimas",
              "host": "Microsoft Entra / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Compare objectId, appId, service principal e escopo RBAC; se usar managed identity, confirme recurso Azure compatível e token sem gravá-lo.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / App registrations e compare com a entrega: App com permissões mínimas",
              "host": "Microsoft Entra / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Microsoft Entra / App registrations",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Identidades gerenciadas para recursos Azure",
            "url": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "workload",
          "entra"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-local"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Identificar S001 como aplicação de inventário, seu proprietário e suas permissões. Service principal representa uma aplicação no tenant; managed identity é gerenciada pela plataforma em recursos compatíveis. Uma aplicação precisa de dono, escopo mínimo, revisão e processo de revogação mesmo sem usuário interativo."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 28,
        "stageId": "workload",
        "stageLabel": "06 · Serviços e dispositivos",
        "labAction": "Identificar S001 como aplicação de inventário, seu proprietário e suas permissões."
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
              "expected": "Registre o resultado observado desta ação em Azure Key Vault / App registrations e compare com a entrega: Credencial rotacionada e anterior revogada",
              "host": "Azure Key Vault / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Inventarie credenciais de apps de teste com datas de expiração.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Azure Key Vault / App registrations e compare com a entrega: Credencial rotacionada e anterior revogada",
              "host": "Azure Key Vault / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Inventarie credenciais de aplicação de teste com data de expiração e responsável, sem copiar valores secretos.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Azure Key Vault / App registrations e compare com a entrega: Credencial rotacionada e anterior revogada",
              "host": "Azure Key Vault / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Crie nova credencial apenas no ambiente de teste; armazene em cofre autorizado, nunca em arquivo versionado.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Azure Key Vault / App registrations e compare com a entrega: Credencial rotacionada e anterior revogada",
              "host": "Azure Key Vault / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Atualize consumidor de teste para usar credencial nova, confirme funcionamento e só então revogue a anterior.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Azure Key Vault / App registrations e compare com a entrega: Credencial rotacionada e anterior revogada",
              "host": "Azure Key Vault / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Teste que a credencial antiga falha; documente rollback seguro e alerta de expiração. Key Vault pode gerar custos Azure.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Azure Key Vault / App registrations e compare com a entrega: Credencial rotacionada e anterior revogada",
              "host": "Azure Key Vault / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confira expiração e thumbprint do certificado, permissões do Key Vault e rotação; não registre segredo em logs ou Git.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Azure Key Vault / App registrations e compare com a entrega: Credencial rotacionada e anterior revogada",
              "host": "Azure Key Vault / App registrations",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Azure Key Vault / App registrations",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Credenciais e certificados de aplicações",
            "url": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "workload",
          "azure",
          "secrets"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-6-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Rotacionar uma credencial de aplicação com consumidor identificado; separar emissão de token de sessão. Criar uma credencial nova é só o começo. Atualize o consumidor, confirme operação e então remova a antiga. Planeje a sobreposição para evitar indisponibilidade e uma reversão que não reintroduza segredo comprometido."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 29,
        "stageId": "workload",
        "stageLabel": "06 · Serviços e dispositivos",
        "labAction": "Rotacionar uma credencial de aplicação com consumidor identificado; separar emissão de token de sessão."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Graph Explorer e compare com a entrega: Relatório Graph automatizado",
              "host": "Microsoft Graph Explorer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Autentique com permissões mínimas e liste usuários fictícios.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Graph Explorer e compare com a entrega: Relatório Graph automatizado",
              "host": "Microsoft Graph Explorer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "No Graph Explorer, execute GET /v1.0/me com conta de teste e identifique quais permissões foram solicitadas.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Graph Explorer e compare com a entrega: Relatório Graph automatizado",
              "host": "Microsoft Graph Explorer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Consulte GET /v1.0/users?$select=id,displayName,userPrincipalName apenas se a permissão estiver concedida; não eleve privilégios para facilitar.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Graph Explorer e compare com a entrega: Relatório Graph automatizado",
              "host": "Microsoft Graph Explorer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Instale Microsoft.Graph no PowerShell 7 (Install-Module Microsoft.Graph -Scope CurrentUser), execute Connect-MgGraph -Scopes 'User.ReadBasic.All' com aprovação e rode Get-MgUser -All -Property Id,DisplayName,UserPrincipalName | Select-Object Id,DisplayName,UserPrincipalName | Export-Csv ./LAB-graph-users.csv -NoTypeInformation -Encoding utf8. Use apenas identidades fictícias; não eleve privilégios para contornar consentimento.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Graph Explorer e compare com a entrega: Relatório Graph automatizado",
              "host": "Microsoft Graph Explorer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Valide número de linhas e UPNs do CSV, repita a consulta e compare para detectar duplicação; no REST, siga @odata.nextLink até o fim. Teste 403 (permissão) e 429 (limite/Retry-After) sem causar carga abusiva. Remova CSVs contendo dados reais.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Graph Explorer e compare com a entrega: Relatório Graph automatizado",
              "host": "Microsoft Graph Explorer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "HTTP 401: token; 403: permissão/consentimento; 429: throttling e Retry-After. Siga @odata.nextLink e evite duplicações na reexecução.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Graph Explorer e compare com a entrega: Relatório Graph automatizado",
              "host": "Microsoft Graph Explorer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "hybrid",
        "lab": {
          "resource": "Microsoft Graph Explorer",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Microsoft Graph PowerShell",
            "url": "https://learn.microsoft.com/en-us/powershell/microsoftgraph/get-started"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "graph",
          "powershell"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-3-3"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Exportar id, displayName e userPrincipalName do tenant com leitura mínima e paginação. Uma consulta Graph devolve uma página, não necessariamente a população toda. O SDK com -All segue paginação. Exporte somente os atributos necessários, sem autenticar com permissão de escrita para uma leitura."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 30,
        "stageId": "workload",
        "stageLabel": "06 · Serviços e dispositivos",
        "labAction": "Exportar id, displayName e userPrincipalName do tenant com leitura mínima e paginação."
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
            "detail": "Prepare a próxima credencial mantendo a anterior aceita, teste o consumidor com a nova e só então ative/remova a antiga. A aplicação construída recarrega essas credenciais a cada requisição SCIM; não é necessário reiniciar a aplicação para a troca."
          }
        ],
        "practice": [],
        "evidence": "Rotação feita manualmente com sobreposição, consumidor testado e credencial antiga rejeitada.",
        "prerequisite": "",
        "prerequisiteIds": [
          "iam-3-2"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "technologies": [
          "workload",
          "scim",
          "secrets"
        ],
        "difficulty": "advanced",
        "guide": {
          "platform": "HOST01 → config.json → credencial S002",
          "platformUrl": "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
          "where": "HOST01 → config.json → credencial S002",
          "steps": [
            {
              "id": "baseline",
              "title": "Testar antes da mudança",
              "text": "Com APP01 iniciada, leia config.json no PowerShell e confirme GET SCIM. Não imprima a variável $cfg. Guarde a credencial anterior apenas na memória desta sessão.",
              "command": "$cfg = Get-Content C:\\AuroraLab\\APP01\\config.json -Raw | ConvertFrom-Json\n$headers = @{Authorization=('Bearer ' + $cfg.scimToken)}\n$old = $cfg.scimToken\nInvoke-RestMethod -Uri http://localhost:8765/scim/v2/Users -Headers $headers",
              "expected": "Consulta funciona com a credencial atual.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O provisionador autentica no destino SCIM com um bearer de laboratório."
            },
            {
              "id": "new",
              "title": "Gerar a próxima credencial",
              "text": "Em outro terminal gere outra credencial aleatória. Não coloque o resultado em screenshots ou evidências.",
              "command": "node -e \"console.log(require('node:crypto').randomBytes(32).toString('base64url'))\"",
              "expected": "Novo valor diferente do anterior.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O provisionador autentica no destino SCIM com um bearer de laboratório."
            },
            {
              "id": "prepare",
              "title": "Preparar a sobreposição",
              "text": "No editor abra config.json e adicione a propriedade nextScimToken com o novo valor, mantendo scimToken anterior. Salve JSON válido. O servidor recarrega as credenciais para cada requisição SCIM; não precisa reiniciar.",
              "command": "",
              "expected": "Durante a transição ambos os valores são aceitos.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O provisionador autentica no destino SCIM com um bearer de laboratório."
            },
            {
              "id": "test-new",
              "title": "Testar o consumidor com a nova",
              "text": "Releia config.json, monte outro header e consulte Users. Não avance se falhar.",
              "command": "$cfg = Get-Content C:\\AuroraLab\\APP01\\config.json -Raw | ConvertFrom-Json\n$new = $cfg.nextScimToken\n$nextHeaders = @{Authorization=(\"Bearer \" + $new)}\nInvoke-RestMethod -Uri http://localhost:8765/scim/v2/Users -Headers $nextHeaders",
              "expected": "Consulta funciona com a próxima credencial.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O provisionador autentica no destino SCIM com um bearer de laboratório."
            },
            {
              "id": "cutover",
              "title": "Fazer o corte",
              "text": "No editor substitua scimToken pelo valor novo e remova nextScimToken. Salve. Atualize o header do consumidor pela leitura do arquivo. Não copie o segredo para dentro de um script versionado.",
              "command": "",
              "expected": "Somente o valor novo fica autorizado.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O provisionador autentica no destino SCIM com um bearer de laboratório."
            },
            {
              "id": "negative",
              "title": "Provar que a antiga perdeu acesso",
              "text": "Na sessão que guardou $old, tente GET com esse bearer e observe 401. Com $nextHeaders, espere sucesso. Depois remova old/new/cfg/headers da sessão. Não use a antiga para reverter uma exposição; gere outra se necessário.",
              "command": "$oldHeaders = @{Authorization=(\"Bearer \" + $old)}\ntry { Invoke-RestMethod -Uri http://localhost:8765/scim/v2/Users -Headers $oldHeaders } catch { [int]$_.Exception.Response.StatusCode }",
              "expected": "Credencial antiga 401; nova funciona.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O provisionador autentica no destino SCIM com um bearer de laboratório."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "HOST01 → config.json → credencial S002",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
          }
        ],
        "revision": "2026.10.28.2",
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Use dados fictícios. Desfaça a alteração de teste e repita os testes de acesso; não apague dados para esconder uma falha.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "A entrega desta lição foi observada: Rotação feita manualmente com sobreposição, consumidor testado e credencial antiga rejeitada."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Rotação feita manualmente com sobreposição, consumidor testado e credencial antiga rejeitada. O provisionador autentica no destino SCIM com um bearer de laboratório. O segredo é uma credencial de serviço, não o usuário Ana. Ter permissão para provisionar exige dono, escopo, expiração e recuperação definidos."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 31,
        "stageId": "workload",
        "stageLabel": "06 · Serviços e dispositivos",
        "labAction": "Executar SEC01: preparar a credencial seguinte, testar consumidor e retirar a anterior."
      }
    ],
    "environment": "S001/S002 definidos na Arquitetura e consumidores preparados nas lições anteriores.",
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
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Dispositivo inscrito e inventariado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Confirme licença Intune, edição e suporte do Windows, e requisitos de inscrição. Prefira Windows 11 suportado no laboratório; não assuma que Autopilot funciona em qualquer VM ou que Enrollment MDM implica Autopilot.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Dispositivo inscrito e inventariado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Verifique licença Intune, sistema operacional suportado e capacidade da VM; não confunda inscrição MDM com Autopilot.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Dispositivo inscrito e inventariado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Se licenciado e com dispositivo compatível, inscreva máquina descartável de laboratório e confira registro. Para Autopilot, confirme suporte a identidade de hardware/registro antes de tentar implantação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Dispositivo inscrito e inventariado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Verifique status de inscrição e inventário no portal, incluindo UPN e ID do dispositivo. Não registre dados do hardware de produção.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Dispositivo inscrito e inventariado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Se Autopilot não puder ser executado no hardware ou tenant disponível, documente o fluxo teórico e marque explicitamente como não executado.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Dispositivo inscrito e inventariado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Verifique licença, suporte do Windows, hardware, registro Autopilot, atribuição de perfil e conectividade; sem dispositivo real, registre simulação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Dispositivo inscrito e inventariado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Microsoft Intune admin center",
          "costNote": "Recursos premium exigem licença elegível e validação no tenant de estudo. Marque o que não foi executado."
        },
        "sources": [
          {
            "label": "Visão geral do Windows Autopilot",
            "url": "https://learn.microsoft.com/en-us/autopilot/overview"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "intune",
          "windows"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "prep-local"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Inscrever somente CL01 descartável no Intune se o estado do dispositivo e licença permitirem. Entra registration, Entra join, ingresso em domínio AD e enrollment MDM são estados distintos. Um objeto aparecer no diretório não comprova que o Intune gerencia suas políticas."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 32,
        "stageId": "workload",
        "stageLabel": "06 · Serviços e dispositivos",
        "labAction": "Inscrever somente CL01 descartável no Intune se o estado do dispositivo e licença permitirem."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Conformidade e decisões de acesso verificadas",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Crie regra de compliance simples em grupo piloto.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Conformidade e decisões de acesso verificadas",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Crie grupo piloto e política de conformidade simples, somente com licença Intune e dispositivo de teste.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Conformidade e decisões de acesso verificadas",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Sincronize dispositivo e consulte estado compliant/noncompliant e motivo da avaliação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Conformidade e decisões de acesso verificadas",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Se houver Entra P1, crie Conditional Access em report-only usando sinal de dispositivo; mantenha conta de emergência excluída.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Conformidade e decisões de acesso verificadas",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Teste cenário conforme e não conforme em laboratório, compare relatório com decisão esperada; sem licença, use matriz simulada.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Conformidade e decisões de acesso verificadas",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confirme licença Intune e Entra P1, grupo, estado de sincronização, política de compliance e log CA Report-only; avalie dispositivo conforme e não conforme.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Conformidade e decisões de acesso verificadas",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Microsoft Intune admin center",
          "costNote": "Recursos premium exigem licença elegível e validação no tenant de estudo. Marque o que não foi executado."
        },
        "sources": [
          {
            "label": "Licença para Conditional Access",
            "url": "https://learn.microsoft.com/pt-br/entra/identity/conditional-access/overview"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "intune",
          "conditional access"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-7-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Comparar sinal de conformidade de CL01 e decisão de CA em Report-only. O Intune avalia o dispositivo conforme uma política e reporta um estado. Conditional Access consome esse sinal com outros controles. Atraso de sincronização pode explicar diferença entre configuração local e relatório."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 33,
        "stageId": "workload",
        "stageLabel": "06 · Serviços e dispositivos",
        "labAction": "Comparar sinal de conformidade de CL01 e decisão de CA em Report-only."
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
              "text": "No https://intune.microsoft.com, com Intune Plan 1 e papel RBAC adequado, abra Endpoint security → Security baselines. Use a baseline Security Baseline for Windows 10 and later disponível na edição atual e crie perfil LAB-CL01-BASELINE. Não confunda baseline do Intune com produto de segurança já licenciado.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Baseline aplicada e resultado comparado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Confirme Intune Plan 1, sistema operacional suportado, grupo piloto e backup da VM. Baselines podem aplicar mudanças imediatamente após atribuição; documente conflito de políticas antes de usar um endpoint existente.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Baseline aplicada e resultado comparado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Antes de aplicar política, confirme backup da VM e onde a chave de recuperação ficará armazenada com segurança.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Baseline aplicada e resultado comparado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "No Intune licenciado, crie LAB-CL01-BASELINE, revise cada configuração antes de manter seu valor padrão e atribua somente ao grupo que contém CL01; não atribua a todos os dispositivos. Se a baseline não suportar a versão de CL01, pare e registre a incompatibilidade.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Baseline aplicada e resultado comparado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Verifique estado do BitLocker e Defender localmente, sem publicar chaves ou desativar proteções para simular falha.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Baseline aplicada e resultado comparado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Compare postura antes/depois e registre resultado de política; se não houver Intune, execute apenas validações locais documentadas.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Baseline aplicada e resultado comparado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confira relatório Intune, versão Windows, estado BitLocker/Defender e atribuições; não desligue proteção para produzir evidência.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Intune admin center e compare com a entrega: Baseline aplicada e resultado comparado",
              "host": "Microsoft Intune admin center",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Microsoft Intune admin center",
          "costNote": "Recursos premium exigem licença elegível e validação no tenant de estudo. Marque o que não foi executado."
        },
        "sources": [
          {
            "label": "Licença e configuração de baseline no Intune",
            "url": "https://learn.microsoft.com/en-us/intune/intune-service/protect/security-baselines-configure"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "intermediate",
        "technologies": [
          "intune",
          "bitlocker",
          "defender"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-7-1"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Aplicar baseline piloto em CL01 sem publicar chave BitLocker ou desligar proteção. Baseline configura um conjunto de parâmetros. BitLocker protege dados em repouso e exige plano para chave de recuperação. Defender e firewall tratam outros riscos. Uma evidência de baseline não demonstra cada camada."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 34,
        "stageId": "workload",
        "stageLabel": "06 · Serviços e dispositivos",
        "labAction": "Aplicar baseline piloto em CL01 sem publicar chave BitLocker ou desligar proteção."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Sign-in logs e compare com a entrega: Linha do tempo de login e alteração",
              "host": "Microsoft Entra / Sign-in logs",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Gere login bem-sucedido e falha controlada em conta piloto.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Sign-in logs e compare com a entrega: Linha do tempo de login e alteração",
              "host": "Microsoft Entra / Sign-in logs",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Gere login bem-sucedido e falha controlada com conta fictícia; registre horário UTC aproximado e aplicativo.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Sign-in logs e compare com a entrega: Linha do tempo de login e alteração",
              "host": "Microsoft Entra / Sign-in logs",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Em Entra → Monitoring & health → Sign-in logs, filtre usuário e período; observe status, aplicativo, IP sanitizado e correlation ID.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Sign-in logs e compare com a entrega: Linha do tempo de login e alteração",
              "host": "Microsoft Entra / Sign-in logs",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Em Audit logs, encontre mudança de grupo ou aplicação; diferencie evento de autenticação de alteração administrativa.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Sign-in logs e compare com a entrega: Linha do tempo de login e alteração",
              "host": "Microsoft Entra / Sign-in logs",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Crie linha do tempo de ambos eventos e indique janela de retenção disponível no tenant; não presuma exportação SIEM gratuita.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Sign-in logs e compare com a entrega: Linha do tempo de login e alteração",
              "host": "Microsoft Entra / Sign-in logs",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confira fuso horário, filtro de período, retenção/licença, identidade e correlation ID; ausência de log não comprova ausência de tentativa.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Sign-in logs e compare com a entrega: Linha do tempo de login e alteração",
              "host": "Microsoft Entra / Sign-in logs",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Microsoft Entra / Sign-in logs",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Logs de entrada Microsoft Entra",
            "url": "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins"
          }
        ],
        "revision": "2026.10.28.2",
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
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Correlacionar horários dos eventos de E001 em AD, Entra, Keycloak e APP01. Sign-in logs mostram autenticação; audit logs mostram alterações administrativas. Horário, app, sujeito e correlation ID ajudam a ligar eventos, mas uma mudança de grupo e um login podem ter correlações diferentes."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 35,
        "stageId": "operations",
        "stageLabel": "07 · Operação e entrega",
        "labAction": "Correlacionar horários dos eventos de E001 em AD, Entra, Keycloak e APP01."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Protection e compare com a entrega: Runbook de resposta a conta comprometida",
              "host": "Microsoft Entra / Identity Protection",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Crie runbook para conta comprometida e sinais de risco.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Protection e compare com a entrega: Runbook de resposta a conta comprometida",
              "host": "Microsoft Entra / Identity Protection",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Confirme licenciamento Identity Protection antes de tentar usar detecção de risco; não provoque ataques reais para gerar alertas.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Protection e compare com a entrega: Runbook de resposta a conta comprometida",
              "host": "Microsoft Entra / Identity Protection",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Monte tabletop de login suspeito com dados fictícios: horário, local anômalo, app e usuário.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Protection e compare com a entrega: Runbook de resposta a conta comprometida",
              "host": "Microsoft Entra / Identity Protection",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Defina decisão de contenção (bloquear conta, revogar sessões, reset de credencial) e quem pode autorizar cada ação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Protection e compare com a entrega: Runbook de resposta a conta comprometida",
              "host": "Microsoft Entra / Identity Protection",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Registre evidência, impacto, recuperação e lições; se houver recurso licenciado, compare com alertas reais sem expor dados.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Protection e compare com a entrega: Runbook de resposta a conta comprometida",
              "host": "Microsoft Entra / Identity Protection",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Confirme licença P2 para sinais de risco avançados; diferencie simulação tabletop de detecção real e preserve correlation ID sem dados sensíveis.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra / Identity Protection e compare com a entrega: Runbook de resposta a conta comprometida",
              "host": "Microsoft Entra / Identity Protection",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "trial",
        "lab": {
          "resource": "Microsoft Entra / Identity Protection",
          "costNote": "Recursos premium exigem licença elegível e validação no tenant de estudo. Marque o que não foi executado."
        },
        "sources": [
          {
            "label": "Identity Protection Microsoft Entra",
            "url": "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "advanced",
        "technologies": [
          "entra",
          "identity protection"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-8-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Ensaiar contenção de E001 comprometido, preservação e recuperação com autoridade definida. Uma conta comprometida pode ter sessões, concessões OAuth e métodos de recuperação alterados. Um runbook define triagem, autoridade para bloquear, preservação de evidência, contenção e retorno controlado."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 36,
        "stageId": "operations",
        "stageLabel": "07 · Operação e entrega",
        "labAction": "Ensaiar contenção de E001 comprometido, preservação e recuperação com autoridade definida."
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
              "expected": "Registre o resultado observado desta ação em Diagrams.net + Microsoft Entra e compare com a entrega: Diagrama Zero Trust com ameaças e controles",
              "host": "Diagrams.net + Microsoft Entra",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Desenhe fluxo AD → Entra → SSO → aplicação → dispositivo.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Diagrams.net + Microsoft Entra e compare com a entrega: Diagrama Zero Trust com ameaças e controles",
              "host": "Diagrams.net + Microsoft Entra",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "No diagrams.net, desenhe AD → Entra → IdP/SSO → app e anote fronteiras de confiança.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Diagrams.net + Microsoft Entra e compare com a entrega: Diagrama Zero Trust com ameaças e controles",
              "host": "Diagrams.net + Microsoft Entra",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Liste ativos, identidades humanas e de workload, credenciais, tokens e pontos de autorização.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Diagrams.net + Microsoft Entra e compare com a entrega: Diagrama Zero Trust com ameaças e controles",
              "host": "Diagrams.net + Microsoft Entra",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Modele três ameaças: roubo de token, privilégio excessivo e falha de sincronização; associe prevenção, detecção e recuperação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Diagrams.net + Microsoft Entra e compare com a entrega: Diagrama Zero Trust com ameaças e controles",
              "host": "Diagrams.net + Microsoft Entra",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Valide ao menos um controle existente em laboratório e marque os demais como propostos, sem confundir diagrama com implementação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Diagrams.net + Microsoft Entra e compare com a entrega: Diagrama Zero Trust com ameaças e controles",
              "host": "Diagrams.net + Microsoft Entra",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Para cada fluxo do diagrama, identifique identidade, ativo, confiança, controle e ameaça; valide cenário negativo e risco residual.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Diagrams.net + Microsoft Entra e compare com a entrega: Diagrama Zero Trust com ameaças e controles",
              "host": "Diagrams.net + Microsoft Entra",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Diagrams.net + Microsoft Entra",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Zero Trust Microsoft",
            "url": "https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview"
          }
        ],
        "revision": "2026.10.28.2",
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
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Marcar as fronteiras reais da Arquitetura e provar controles de três ameaças. Identifique quem acessa qual recurso, por qual canal e com qual evidência. O IdP, aplicativo, API, RH e administrador pertencem a fronteiras diferentes. Uma seta no diagrama não configura a confiança entre eles."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 37,
        "stageId": "operations",
        "stageLabel": "07 · Operação e entrega",
        "labAction": "Marcar as fronteiras reais da Arquitetura e provar controles de três ameaças."
      },
      {
        "id": "iam-8-3",
        "title": "Resiliência, BCP e recuperação",
        "url": "https://nodejs.org/api/fs.html",
        "study": [
          {
            "topic": "Backup só é útil quando restaura",
            "detail": "RPO define a perda de dados tolerável; RTO define o tempo desejado de recuperação. Medir restauração de um arquivo não comprova recuperação de toda a cadeia de identidade. Dependências precisam ser revalidadas."
          },
          {
            "topic": "No cenário Aurora",
            "detail": "APP01 usa cadastro.json e config.json. Para este ensaio, pare o servidor, copie o cadastro e depois teste a restauração. Keycloak, AD e Entra têm estados independentes e exigem estratégias próprias de recuperação."
          }
        ],
        "practice": [],
        "evidence": "Cadastro restaurado e divergência entre sistemas reconciliada, com tempo e testes registrados.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "HOST01 → arquivos da APP01 → restauração isolada",
          "platformUrl": "https://nodejs.org/api/fs.html",
          "where": "HOST01 → arquivos da APP01 → restauração isolada",
          "steps": [
            {
              "id": "scope",
              "title": "Definir o que será recuperado",
              "text": "O ensaio cobre cadastro.json e configuração da APP01. Não cobre AD, Entra ou volume Keycloak. Defina RTO 10 minutos e RPO desde o último backup como objetivos de estudo, não SLA garantido.",
              "command": "",
              "expected": "Escopo e horário inicial registrados.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "RPO define a perda de dados tolerável; RTO define o tempo desejado de recuperação."
            },
            {
              "id": "stop",
              "title": "Parar a aplicação",
              "text": "No terminal de laboratorio.mjs pressione Ctrl+C. Confirme que /health deixa de responder. Não pare DC01 para copiar arquivos da APP01.",
              "command": "",
              "expected": "Nenhuma gravação está acontecendo na aplicação.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "RPO define a perda de dados tolerável; RTO define o tempo desejado de recuperação."
            },
            {
              "id": "backup",
              "title": "Copiar o cadastro e proteger a configuração",
              "text": "Na pasta APP01, copie o cadastro. config.json contém credencial: guarde cópia somente em local protegido e não a publique. O ensaio deve usar dados fictícios.",
              "command": "Set-Location C:\\AuroraLab\\APP01\nCopy-Item cadastro.json cadastro.backup.json\nnode laboratorio.mjs",
              "expected": "Servidor voltou; backup corresponde ao estado registrado.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "RPO define a perda de dados tolerável; RTO define o tempo desejado de recuperação."
            },
            {
              "id": "change",
              "title": "Criar uma divergência conhecida",
              "text": "Execute o PATCH de M001 para mover E001 ao Jurídico. Confira FIN 403/JUR 200. Registre horário. Pare APP01 novamente com Ctrl+C.",
              "command": "",
              "expected": "Estado atual difere do backup por uma mudança conhecida.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "RPO define a perda de dados tolerável; RTO define o tempo desejado de recuperação."
            },
            {
              "id": "restore",
              "title": "Restaurar somente o destino",
              "text": "Com servidor parado, restaure a cópia. Reinicie. O AD/Keycloak/Entra podem permanecer no estado mais novo: você está observando recuperação parcial, não rollback global.",
              "command": "Copy-Item cadastro.backup.json cadastro.json -Force\nnode laboratorio.mjs",
              "expected": "Cadastro volta ao momento do backup; diferença entre fronteiras fica explícita.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "RPO define a perda de dados tolerável; RTO define o tempo desejado de recuperação."
            },
            {
              "id": "reconcile",
              "title": "Reconciliar e medir",
              "text": "Compare com o estado desejado no rh.csv e repita as alterações manuais nas fronteiras necessárias. Registre tempo decorrido, perda de dados e testes FIN/JUR. Não restaure um DC de produção nesta rede.",
              "command": "",
              "expected": "Destinos consistentes com o evento escolhido; RTO/RPO observado calculado.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "RPO define a perda de dados tolerável; RTO define o tempo desejado de recuperação."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "HOST01 → arquivos da APP01 → restauração isolada",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Arquivos no Node.js",
            "url": "https://nodejs.org/api/fs.html"
          }
        ],
        "revision": "2026.10.28.2",
        "difficulty": "advanced",
        "technologies": [
          "recovery",
          "backup",
          "node.js"
        ],
        "tracks": [
          "local",
          "microsoft",
          "premium"
        ],
        "prerequisiteIds": [
          "iam-4-0"
        ],
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "A entrega desta lição foi observada: Cadastro restaurado e divergência entre sistemas reconciliada, com tempo e testes registrados."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Cadastro restaurado e divergência entre sistemas reconciliada, com tempo e testes registrados. RPO define a perda de dados tolerável; RTO define o tempo desejado de recuperação. Medir restauração de um arquivo não comprova recuperação de toda a cadeia de identidade. Dependências precisam ser revalidadas."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 38,
        "stageId": "operations",
        "stageLabel": "07 · Operação e entrega",
        "labAction": "Cadastro restaurado e divergência entre sistemas reconciliada, com tempo e testes registrados."
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
        "evidence": "JML completo, decisões negativas, diagnóstico e recuperação demonstrados no desenho fixo.",
        "prerequisite": "Conclua a preparação indicada abaixo ou registre experiência equivalente. Os pré-requisitos orientam a sequência sem bloquear sua navegação.",
        "guide": {
          "platform": "Arquitetura → avaliação ponta a ponta",
          "platformUrl": "https://www.rfc-editor.org/rfc/rfc9700.html",
          "where": "Arquitetura → avaliação ponta a ponta",
          "steps": [
            {
              "id": "state",
              "title": "Confirmar o ponto inicial",
              "text": "Abra Arquitetura e confira os valores atuais. Registre E001/E002, id SCIM, estado do domínio, realm e aplicação. Preserve um backup da APP01 e um ponto de recuperação das VMs.",
              "command": "",
              "expected": "Você sabe qual evento será executado e como recuperar.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O evento de RH precisa causar mudanças verificáveis no IdP e no aplicativo."
            },
            {
              "id": "joiner",
              "title": "Repetir J001 sem duplicação",
              "text": "Siga a lição JML em cada fronteira. Consulte E001 antes de criar. Se já existe, atualize-o; não faça POST repetido nem invente outro ID.",
              "command": "",
              "expected": "Ana FIN 200/JUR 403; Carla JUR 200; sem sessão 401.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O evento de RH precisa causar mudanças verificáveis no IdP e no aplicativo."
            },
            {
              "id": "mover",
              "title": "Executar M001 e medir",
              "text": "Faça RH → AD → conferência Entra → Keycloak → PATCH APP01. Registre o horário em cada destino e o mesmo identificador de vínculo.",
              "command": "",
              "expected": "Ana perde FIN e ganha JUR; E002 permanece estável.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O evento de RH precisa causar mudanças verificáveis no IdP e no aplicativo."
            },
            {
              "id": "leaver",
              "title": "Executar L001 e testar sessões",
              "text": "Bloqueie o vínculo em todas as fronteiras executadas. Na aplicação teste sessão existente; no IdP tente novo login. Explique cada 401/403 e não declare integração de um produto só estudado.",
              "command": "",
              "expected": "Nenhum acesso efetivo para Ana.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O evento de RH precisa causar mudanças verificáveis no IdP e no aplicativo."
            },
            {
              "id": "failure",
              "title": "Diagnosticar uma falha controlada",
              "text": "Deixe um dos destinos com Department antigo por um instante de estudo. Observe a divergência comparando RH, AD e APP01; depois corrija somente o atributo errado e repita os testes. Não conceda admin para resolver.",
              "command": "",
              "expected": "Causa identificada e corrigida com evidência de antes/depois.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O evento de RH precisa causar mudanças verificáveis no IdP e no aplicativo."
            },
            {
              "id": "recover",
              "title": "Executar o ensaio de recuperação",
              "text": "Siga a lição Resiliência para restaurar a APP01 e reconciliar com o evento escolhido. Compare o tempo com o objetivo definido.",
              "command": "",
              "expected": "Aplicação recuperada e fronteiras consistentes.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O evento de RH precisa causar mudanças verificáveis no IdP e no aplicativo."
            },
            {
              "id": "explain",
              "title": "Defender o que foi construído",
              "text": "Explique na topologia qual sistema guarda vínculo, quem autentica, quem autoriza e quem recebe SCIM. Identifique cada ação manual, cada sincronização real e cada extensão licenciada não executada.",
              "command": "",
              "expected": "Outra pessoa consegue seguir sua evidência e reproduzir o cenário.",
              "host": "HOST01 · PowerShell 7 / navegador",
              "why": "O evento de RH precisa causar mudanças verificáveis no IdP e no aplicativo."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Arquitetura → avaliação ponta a ponta",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Referência oficial",
            "url": "https://www.rfc-editor.org/rfc/rfc9700.html"
          }
        ],
        "revision": "2026.10.28.2",
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
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
        "rollback": "Registre o estado anterior. Reverta somente alterações do laboratório, confirme que o acesso mínimo funciona e repita o teste que deve ser negado.",
        "acceptance": [
          {
            "id": "guided-result-v2",
            "text": "A entrega desta lição foi observada: JML completo, decisões negativas, diagnóstico e recuperação demonstrados no desenho fixo."
          },
          {
            "id": "boundary-check-v2",
            "text": "Os objetos e parâmetros usados correspondem à Arquitetura; cada sistema executado e cada pendência estão identificados."
          },
          {
            "id": "negative-restore-v2",
            "text": "O cenário negativo indicado foi conferido e o estado final/reversão registrado sem segredos."
          }
        ],
        "recall": {
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "JML completo, decisões negativas, diagnóstico e recuperação demonstrados no desenho fixo. O evento de RH precisa causar mudanças verificáveis no IdP e no aplicativo. Login, autorização e ciclo de vida são testes diferentes. A Aurora permite observar como desativação no destino bloqueia até sessão local existente."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 39,
        "stageId": "operations",
        "stageLabel": "07 · Operação e entrega",
        "labAction": "JML completo, decisões negativas, diagnóstico e recuperação demonstrados no desenho fixo."
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
              "expected": "Registre o resultado observado desta ação em GitHub / Markdown e compare com a entrega: Estudo de caso com capturas anonimizadas",
              "host": "GitHub / Markdown",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Desenhe topologia atual com nomes fictícios e versões.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em GitHub / Markdown e compare com a entrega: Estudo de caso com capturas anonimizadas",
              "host": "GitHub / Markdown",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Crie pasta docs/labs com LAB-01 a LAB-10, README de ambiente e índice de evidências.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em GitHub / Markdown e compare com a entrega: Estudo de caso com capturas anonimizadas",
              "host": "GitHub / Markdown",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Para cada prática, registre objetivo, pré-requisitos, passos, resultado esperado, resultado observado e problema encontrado.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em GitHub / Markdown e compare com a entrega: Estudo de caso com capturas anonimizadas",
              "host": "GitHub / Markdown",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Inclua capturas sanitizadas e comandos sem tokens, senhas, emails reais ou chaves de recuperação.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em GitHub / Markdown e compare com a entrega: Estudo de caso com capturas anonimizadas",
              "host": "GitHub / Markdown",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Faça revisão de segurança antes de publicar; marque claramente simulações, licenças ausentes e limitações do laboratório.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em GitHub / Markdown e compare com a entrega: Estudo de caso com capturas anonimizadas",
              "host": "GitHub / Markdown",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Revise evidências para remoção de segredos, UPNs reais e tokens; teste links, versão, data e reprodução por outro operador.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em GitHub / Markdown e compare com a entrega: Estudo de caso com capturas anonimizadas",
              "host": "GitHub / Markdown",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "GitHub / Markdown",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Documentação de repositórios GitHub",
            "url": "https://docs.github.com/en/repositories"
          }
        ],
        "revision": "2026.10.28.2",
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
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Documentar o ambiente que você construiu, sem publicar config.json, senhas ou tokens. Guarde objetivo, versão, dados fictícios, configuração, resultado esperado/observado e limitação. Uma captura sem contexto não explica o teste. Um segredo removido da última versão pode continuar no histórico do Git."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 40,
        "stageId": "operations",
        "stageLabel": "07 · Operação e entrega",
        "labAction": "Documentar o ambiente que você construiu, sem publicar config.json, senhas ou tokens."
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
              "expected": "Registre o resultado observado desta ação em Microsoft Entra + Windows Event Viewer e compare com a entrega: Três diagnósticos com causa-raiz",
              "host": "Microsoft Entra + Windows Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "preparar-cenario",
              "title": "Preparar cenário",
              "text": "Investigue falha fictícia de DNS e registre hipótese/teste.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra + Windows Event Viewer e compare com a entrega: Três diagnósticos com causa-raiz",
              "host": "Microsoft Entra + Windows Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "conferir-ambiente",
              "title": "Conferir ambiente",
              "text": "Cenário 1: falha DNS; compare nslookup, IP configurado e resolução do DC antes de alterar configuração.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra + Windows Event Viewer e compare com a entrega: Três diagnósticos com causa-raiz",
              "host": "Microsoft Entra + Windows Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "configurar-em-laboratorio",
              "title": "Configurar em laboratório",
              "text": "Cenário 2: falha SSO; compare redirect URI/ACS, audience, relógio, claims e atribuição de usuário.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra + Windows Event Viewer e compare com a entrega: Três diagnósticos com causa-raiz",
              "host": "Microsoft Entra + Windows Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "executar-e-observar",
              "title": "Executar e observar",
              "text": "Cenário 3: acesso indevido ou revogação incompleta; examine grupos, tokens/sessões e logs de auditoria.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra + Windows Event Viewer e compare com a entrega: Três diagnósticos com causa-raiz",
              "host": "Microsoft Entra + Windows Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "testar-cenarios",
              "title": "Testar cenários",
              "text": "Para cada caso escreva sintomas, hipótese, comando/consulta, resultado, correção e teste de regressão; diferencie exercício simulado de incidente real.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra + Windows Event Viewer e compare com a entrega: Três diagnósticos com causa-raiz",
              "host": "Microsoft Entra + Windows Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            },
            {
              "id": "diagnosticar-problemas",
              "title": "Diagnosticar problemas",
              "text": "Registre hipótese, decisão, impacto e recuperação para cada cenário; identifique claramente testes realizados e simulações.",
              "command": "",
              "expected": "Registre o resultado observado desta ação em Microsoft Entra + Windows Event Viewer e compare com a entrega: Três diagnósticos com causa-raiz",
              "host": "Microsoft Entra + Windows Event Viewer",
              "why": "Esta ação constrói ou valida uma fronteira específica do desenho. Confira os objetos da Arquitetura antes de alterar."
            }
          ]
        },
        "cost": "free",
        "lab": {
          "resource": "Microsoft Entra + Windows Event Viewer",
          "costNote": "Use somente ativos fictícios definidos na Arquitetura; nenhuma instalação ou conta é fornecida pronta."
        },
        "sources": [
          {
            "label": "Microsoft Learn: treinamento de identidade",
            "url": "https://learn.microsoft.com/en-us/training/browse/?products=entra-id"
          }
        ],
        "revision": "2026.10.28.2",
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
        "challenge": "Explique por que a ação foi feita neste componente, o que mudaria se fosse feita no destino errado e como voltar ao estado anterior.",
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
          "question": "Qual componente da Arquitetura esta lição constrói e qual evidência demonstra o resultado?",
          "answer": "Diagnosticar DNS, callback OIDC e revogação incompleta no mesmo piloto. Comece pelo sintoma e por uma hipótese falsificável. Colete evidência antes de alterar e mude uma variável por vez. Uma correção só se sustenta quando o teste original passa e um cenário negativo continua negado."
        },
        "reviewedAt": "2026-10-28",
        "testedAt": null,
        "sequence": 41,
        "stageId": "operations",
        "stageLabel": "07 · Operação e entrega",
        "labAction": "Diagnosticar DNS, callback OIDC e revogação incompleta no mesmo piloto."
      }
    ],
    "environment": "O ambiente construído passo a passo, com os valores fixos da Arquitetura.",
    "outcome": "Ciclo integrado demonstrado, evidências sanitizadas, diagnóstico e recuperação.",
    "requirements": "O projeto local é executável. Integrações premium não executadas permanecem identificadas como pendências práticas.",
    "number": 10,
    "difficulty": "advanced"
  }
];
