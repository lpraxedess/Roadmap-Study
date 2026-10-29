# Plano operacional — Laboratório IAM Aurora

O portal ensina **o que é, por que usar, quando usar, onde configurar, como testar, como reverter**. O aprofundamento teórico acontece fora dele.

**Orçamento máximo:** R$ 200 por mês. A meta não é gastar tudo: primeiro construir localmente e no Entra Free, depois usar licenças por um período concentrado e com cálculo de custo real.

## Perfil real do laboratório (informado em 29/10/2026)

| Recurso | Informação confirmada |
|---|---|
| CPU | AMD Ryzen 5 5600, 6 núcleos e 12 threads |
| RAM | 16 GB DDR4 3200 MHz |
| Disco | 1 TB NVMe (espaço **livre** ainda não informado) |
| GPU | RTX 3070 (não necessária nos exercícios IAM) |
| Sistema operacional do host | **Windows 11 Pro** (confirmado) |
| Hipervisor | **Oracle VirtualBox**, versão ainda não informada |
| Microsoft Entra | Tenant gratuito já existente, sem licenças |
| Orçamento | Máximo de R$ 200/mês |
| Disponibilidade | Sem número fixo de horas; avançar por microetapas e entregas |

**Sistema operacional e hipervisor já estão definidos: Windows 11 Pro + Oracle VirtualBox.** Falta confirmar apenas versão do VirtualBox, espaço livre do NVMe e virtualização AMD-V/SVM. O tutorial específico foi publicado em [GUIA-VIRTUALBOX.md](GUIA-VIRTUALBOX.md).

### Dimensionamento inicial para 16 GB de RAM

| Máquina/serviço | CPU | RAM | Disco previsto | Quando manter ligado |
|---|---:|---:|---:|---|
| DC01 — Windows Server 2022/2025 | 2 vCPU | **4 GB** | 60 GB | Administração AD/DNS; sincronização quando necessário |
| CL01 — Windows 11 Enterprise de avaliação | 2 vCPU | 4 GB | 80 GB | Ingresso no domínio, GPO, Kerberos e depois Intune |
| IDP01 — Keycloak em Docker | CPU sob demanda | Conforme disponibilidade | Volume local | Sessões OIDC/SAML/SCIM |
| APP01 — Node.js | CPU sob demanda | Conforme disponibilidade | Pasta local | Sessões de aplicação |
| TENANT01 — Entra Free | N/A | N/A | Cloud | Práticas gratuitas via navegador |

Com DC01 (4 GB) + CL01 (4 GB) restam cerca de 8 GB de RAM ao sistema host; evitar abrir Docker/contêineres pesados e aplicativos simultaneamente. Em caso de swap/paginação, manter apenas DC01 ou CL01 quando a atividade permitir. Reservar aproximadamente **200 GB livres**, considerando ISOs, discos virtuais e snapshots.

- Windows Server com interface gráfica recomenda 4 GB; o agente Cloud Sync exige **mínimo de 4 GB**, portanto não reduzir DC01 para 3 GB se executar o agente.
- Windows 11 exige ao menos 4 GB e 64 GB de disco; verificar **UEFI, Secure Boot e TPM 2.0 virtual** no hipervisor. A avaliação Enterprise pode ser usada por 90 dias nas condições oficiais.
- O agente Microsoft Entra Cloud Sync pode ser instalado em DC01: a Microsoft suporta essa configuração. É uma concessão para não adicionar outra VM em um laboratório de 16 GB, **não um modelo de separação de funções para produção**.
- Segurança de rede no VirtualBox: **host-only para comunicação AD** (host .56.1, DC01 .56.10, CL01 .56.20 na sub-rede 192.168.56.0/24), sem DHCP do VirtualBox nessa interface. Habilitar temporariamente **Adaptador 2 NAT** no DC01 somente quando for necessário tráfego externo; não adicionar port forwarding, não registrar IP NAT no DNS do domínio. Se a sub-rede conflitar com outra rede/VPN, revisar o endereçamento em todas as partes do projeto.

Fontes:
- https://learn.microsoft.com/pt-br/windows-server/get-started/hardware-requirements
- https://learn.microsoft.com/pt-br/windows/whats-new/windows-11-requirements
- https://www.microsoft.com/pt-br/evalcenter/evaluate-windows-11-enterprise
- https://learn.microsoft.com/pt-br/entra/identity/hybrid/cloud-sync/how-to-prerequisites

### Forma de estudo: sem horas fixas

Cada sessão pode ser curta. Abra o portal, retome a última aula e microetapa, execute uma configuração, observe o resultado e marque a microetapa concluída. Anotações são opcionais; não há uma segunda checklist de evidência na aula. Se precisar parar no meio, a posição do leitor é guardada no navegador e incluída no backup. O roteiro usa marcos técnicos, **não semanas ou metas de horas**. O que libera o avanço é o resultado validado, não o calendário.

## Preparação: antes de qualquer ativação paga

1. Confirmar edição Windows 11, versão do VirtualBox, espaço disponível do NVMe e AMD-V/SVM; CPU/RAM/hipervisor já estão identificados.
2. Separar pasta local AuroraLab, planilha fictícia de RH (E001–E006), pasta de evidências sanitizadas e um perfil de navegador para o tenant de testes.
3. Verificar se já possui tenant de força de trabalho, domínio onmicrosoft.com e assinatura Azure legítimos. Não presumir que contas gratuitas podem criar tenants adicionais.
4. Criar contas cloud-only de administração/recuperação no tenant antes de testar políticas de restrição.
5. Definir o que pode ser executado de verdade, o que exige licença e o que será simulado; não misturar esses resultados.
6. Fazer backup do portal antes de mexer em configurações críticas.

## Ambiente alvo

| Ativo | Finalidade | Posição |
|---|---|---|
| HOST01 | PowerShell, navegador, Docker e evidências | Computador do estudante |
| DC01 | DNS, AD DS, domínio aurora.test | VM na rede isolada |
| CL01 | Logon, GPO e gerenciamento de dispositivo | VM Windows cliente |
| TENANT01 | Microsoft Entra Free/P1/P2 quando elegível | Tenant de teste |
| IDP01 | Keycloak, realm aurora | Loopback local |
| APP01 | Aplicação OIDC e endpoint SCIM didático | Loopback local |

O RH é origem do vínculo. E001/Ana começa em Financeiro, muda para Jurídico e é desligada; E002/Carla é o controle. A autenticação do Windows usa AD/Kerberos; OIDC da APP01 usa Keycloak. **Não há federação ou sincronização automática entre os dois só porque existem no desenho.**

## Etapa 1 — Banco de laboratório, PowerShell e arquivos

- Criar C:\AuroraLab e arquivo rh.csv da Arquitetura; conferir employeeId único e status do piloto.
- Validar PowerShell, Node.js e Docker, verificar AMD-V/SVM e a versão já instalada do Oracle VirtualBox antes de iniciar DC01.
- Fixar portas, nomes, redes e escopo que serão utilizados ao longo do projeto.
- Documentar o estado inicial e montar rotina de snapshots/backups que não dependam do navegador.
- **Validação:** o cadastro existe, o projeto local inicia e os sistemas podem ser identificados.

## Etapa 2 — Active Directory e Windows

- Seguir o [guia Windows 11 + VirtualBox](GUIA-VIRTUALBOX.md): criar rede host-only 192.168.56.0/24 com IPs fixos e DHCP da rede host-only desativado. **Nunca** expor DNS/LDAP/SMB/RDP do laboratório à internet.
- Instalar Windows Server Evaluation em DC01 com 2 vCPU, **4 GB RAM** e VDI dinâmico de 60 GB, se elegível. Ela expira em 180 dias; licença de produção é assunto distinto.
- Instalar AD DS e DNS; criar domínio aurora.test, OUs de Colaboradores/Grupos/Computadores, contas Ana/Carla e grupos FIN/JUR.
- Criar CL01 com 2 vCPU, 4 GB RAM, VDI 80 GB e UEFI/TPM 2.0/Secure Boot; ingressar no domínio (cliente Windows com licença/avaliação válidas). Validar DNS SRV, Kerberos, GPO, grupo e acesso negativo.
- **Validação:** usuário normal não administra domínio; permissão FIN não autoriza JUR; rollback registrado.
- **Fontes:** https://www.microsoft.com/pt-br/evalcenter/download-windows-server-2025

## Etapa 3 — Entra Free e identidades híbridas

- Obter tenant autorizado, domínio onmicrosoft.com e contas cloud-only de administração e emergência.
- Revisar roles por função mínima e credenciais protegidas, sem segredos nas evidências.
- Para Cloud Sync, habilitar NAT temporário no segundo adaptador de DC01 (sem port forwarding), manter DNS interno do AD e desabilitar registro da interface NAT no DNS do domínio. Verificar conta Hybrid Identity Administrator, gMSA, firewall, 4 GB RAM e escopo do agente.
- Sincronizar apenas as OUs piloto. Testar uma alteração, atraso, erro, conta não incluída e recuperação.
- **Validação:** identificar a mesma pessoa no RH, AD e Entra; contas privilegiadas nunca entram automaticamente no escopo.
- **Fontes:** https://learn.microsoft.com/pt-br/entra/identity/hybrid/cloud-sync/how-to-prerequisites

## Etapa 4 — Protocolos e aplicação

- Configurar IDP01 em loopback, realm aurora, contas piloto, papéis e cliente OIDC.
- Configurar APP01 local com redirect URI exata, Authorization Code com PKCE S256, validação de token e autorização efetiva no backend.
- Usar SCIM na APP01 para criar/atualizar usuário; testar que login **não** substitui provisionamento.
- Validar estado J001: FIN 200 e JUR 403 para Ana; testar 401/403, token inválido, state e usuário sem permissão.
- **Validação:** evidência do fluxo, do controle negativo, da correção e da reversão.
- **Fontes:** https://www.keycloak.org/guides

## Etapa 5 — JML, IGA e PAM

- Executar J001 (admissão) com grupos e permissões adequadas.
- Executar M001 (transferência), revogando FIN e concedendo JUR, nas fronteiras aplicáveis; testar FIN 403/JUR 200.
- Executar L001 (desligamento); testar novo login e sessões já existentes **separadamente**.
- Construir matriz RBAC/SoD, revisão de acessos, relatório de auditoria e histórico de aprovação.
- Recursos PIM/Identity Protection e algumas funções IGA dependem de P2/termos específicos; marcar como simulação quando não houver licença.
- **Validação:** desabilitação, propagação, efeito real, negativa e devolução do laboratório ao estado de treino.

## Etapa 6 — Conditional Access e Intune (janela paga)

- Preparar roteiros e backups **antes** de ativar avaliações; confirmar preço, impostos, quantidade de usuários, datas e renovação.
- Para CA e inscrição automática MDM, verificar licença Microsoft Entra P1/P2 e Intune P1; Business Premium inclui ambos para usuários licenciados.
- Usar uma VM/cliente de teste Windows suportado. Registrar dispositivo, verificar check-in, criar política de conformidade piloto e rever exclusões de emergência.
- Quando possível, testar CA em modo somente relatório primeiro; depois aplicar escopo mínimo e verificar logs. Nunca bloquear administradores de recuperação.
- Revogar políticas e inscrições temporárias; documentar limitações do Autopilot, sem presumir hardware/registro elegível.
- **Fontes:** https://learn.microsoft.com/en-us/intune/intune-service/enrollment/windows-enroll

## Etapa 7 — Azure opcional e identidades de aplicação

- Não levantar controlador de domínio ou máquina virtual 24/7 na nuvem por comodidade.
- Antes de criar algo, identificar tipo de assinatura, créditos, preços regionais e cobrança de discos/IPs.
- Criar orçamento com alertas em 50%, 80% e 100%. **Alertas avisam, não interrompem cobranças automaticamente.**
- Em Free com crédito, existe limite relativo ao crédito; em Pay-as-you-go, não há spending limit automático.
- Criar grupo de recursos descartável apenas para práticas que exigirem Azure, testar RBAC/service principal/managed identity e remover os recursos.
- **Fontes:** https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/spending-limit

## Etapa 8 — Auditoria e portfólio

- Registrar para cada microetapa: objetivo, pré-requisito, alvo, comando/caminho de tela, resultado esperado, observado, controle negativo, rollback e modalidade.
- Repetir J001 → M001 → L001; apresentar mapa completo das fronteiras e lacunas que permaneceram simuladas.
- Preparar evidências sanitizadas e explicação de trade-offs sem divulgar segredos ou dados reais.
- Seguir para SC-900, SC-300 e aprofundamentos de IAM, sem confundir a trilha com cobertura integral de certificações.

## Marcos de execução, sem calendário fixo

| Marco | Resultado esperado | Gasto recomendado |
|---|---|---|
| 01 | Host, inventário, isolamento e cadastro Aurora verificados | R$ 0 |
| 02 | AD DS, DNS, Kerberos, GPO e piloto validado | R$ 0 sob avaliação válida |
| 03 | Tenant Entra Free existente, roles e MFA seguro | R$ 0 |
| 04 | Piloto de sincronização híbrida e recuperação | Sem licença extra para sync básica |
| 05 | OIDC, SAML, SCIM e APP01 operando | R$ 0 |
| 06 | J001, M001 e L001 com testes positivos/negativos | R$ 0 |
| 07 | Conditional Access e governança com licença elegível | Somente quando os roteiros estiverem prontos |
| 08 | Intune, conformidade e dispositivo de teste | Janela licenciada opcional |
| 09 | Azure pontual e identidade de carga de trabalho | Opcional, medido e eliminado após teste |
| 10 | Evidências, diagrama, ADRs e portfólio | R$ 0 |

Não é obrigatório executar todos os marcos na mesma ordem se o pré-requisito da aula permitir. **O Entra Free pode ser estudado antes de criar as VMs**, enquanto o sistema operacional e a virtualização do host são confirmados.

## Estimativa financeira

Valores oficiais de referência divulgados em outubro/2026 (por **usuário/mês em contrato anual**, sem impostos): Entra P1 R$ 40,10; Intune P1 R$ 45,80; Business Premium sem Teams R$ 107,60; com Teams R$ 126,00.

Comprar o Premium para todo o laboratório só faz sentido se os usuários necessários estiverem licenciados e o compromisso anual for compatível com seu orçamento. **Não assumir** que uma licença P1 cobre vários beneficiários. A janela P2 pode ser uma avaliação elegível, mas disponibilidade não é garantida.

A interface calcula teto, número de usuários, licença, gasto Azure, extras e reserva, mas não se conecta à fatura Microsoft. Antes de contratar, conferir o checkout.

Fontes:
- https://www.microsoft.com/pt-br/security/pricing/small-medium-business
- https://www.microsoft.com/pt-br/security/business/microsoft365-business-premium
- https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/avoid-charges-free-account

## Observação sobre a segurança

O portal é estático e usa localStorage. Não executa alteração no AD, Entra, Intune, Azure nem autenticação Microsoft; as confirmações das etapas são manuais. O perfil do HOST01 (sistema operacional, AMD-V/SVM e espaço livre) também permanece somente no navegador. Mantenha backups fora do navegador. Nunca salve senha, segredo, token ou dado corporativo verdadeiro.