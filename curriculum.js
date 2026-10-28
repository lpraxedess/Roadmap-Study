Warning: truncated output (original token count: 82999)
Total output lines: 5061

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
          "platformUrl": "https://www.keycloak.org/getting-started/getting-started-docker",
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
        "lab": {},
        "revision": "2026.10.28.2",
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
        "sequence": 1,
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
          "platformUrl": "https://www.keycloak.org/getting-started/getting-started-docker",
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
        "lab": {},
        "revision": "2026.10.28.2",
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
        "sequence": 16,
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
          "platformUrl": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-",
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
        "lab": {},
        "revision": "2026.10.28.2",
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
        "sequence": 2,
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
          "platformUrl": "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users",
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
        "lab": {},
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
        "sequence": 11,
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
          "platformUrl": "https://csrc.nist.gov/projects/role-based-access-control",
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
        "lab": {},
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
        "sequence": 5,
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
          "platformUrl": "https://learn.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname",
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
        "lab": {},
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
        "sequence": 3,
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
          "platformUrl": "https://learn.microsoft.com/pt-br/powershell/scripting/overview",
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
        "lab": {},
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
        "sequence": 6,
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
          "platformUrl": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-",
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
        "lab": {},
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
        "sequence": 4,
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
          "platformUrl": "https://learn.microsoft.com/pt-br/windows-server/security/kerberos/kerberos-authentication-overview",
          "steps": [
            {
              "id": "acessar-ferramenta",
              "title": "Acessar ferramenta",
              "text": "Abra a ferramenta local indicada em «Windows Server / Event Viewer» no computador ou VM de laboratório. Caminho de referência: Visualizador de Event…52999 tokens truncated…e alterar."
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
        "lab": {},
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
        "sequence": 33,
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
          "platformUrl": "https://intune.microsoft.com",
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
        "lab": {},
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
        "sequence": 34,
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
          "platformUrl": "https://entra.microsoft.com",
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
        "lab": {},
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
        "sequence": 35,
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
          "platformUrl": "https://entra.microsoft.com",
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
        "lab": {},
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
        "sequence": 36,
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
          "platformUrl": "https://app.diagrams.net",
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
        "lab": {},
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
        "sequence": 37,
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
          "platformUrl": "https://nodejs.org/api/fs.html",
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
        "lab": {},
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
        "sequence": 38,
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
          "platformUrl": "https://www.rfc-editor.org/rfc/rfc9700.html",
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
        "lab": {},
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
        "sequence": 39,
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
          "platformUrl": "https://github.com",
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
        "lab": {},
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
        "sequence": 40,
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
          "platformUrl": "https://entra.microsoft.com",
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
        "lab": {},
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
        "sequence": 41,
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
