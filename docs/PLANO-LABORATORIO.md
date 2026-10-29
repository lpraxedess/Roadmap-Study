# Plano operacional — Laboratório IAM Aurora

O portal ensina **o que é, por que usar, quando usar, onde configurar, como testar, como reverter**. O aprofundamento teórico acontece fora dele.

**Orçamento máximo:** R$ 200 por mês. A meta não é gastar tudo: primeiro construir localmente e no Entra Free, depois usar licenças por um período concentrado e com cálculo de custo real.

## Preparação: antes de qualquer ativação paga

1. Registrar HOST01: sistema operacional, CPU, RAM, espaço disponível, virtualização, hypervisor, acesso administrador e banda.
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
- Validar PowerShell, Node.js, Docker e hypervisor antes de instalar VMs.
- Fixar portas, nomes, redes e escopo que serão utilizados ao longo do projeto.
- Documentar o estado inicial e montar rotina de snapshots/backups que não dependam do navegador.
- **Validação:** o cadastro existe, o projeto local inicia e os sistemas podem ser identificados.

## Etapa 2 — Active Directory e Windows

- Criar rede host-only. **Nunca** expor DNS/LDAP/SMB/RDP do laboratório à internet.
- Instalar Windows Server Evaluation em DC01, se elegível. Ela expira em 180 dias; licença de produção é assunto distinto.
- Instalar AD DS e DNS; criar domínio aurora.test, OUs de Colaboradores/Grupos/Computadores, contas Ana/Carla e grupos FIN/JUR.
- Ingressar CL01 no domínio (cliente Windows com licença/avaliação válidas). Validar DNS SRV, Kerberos, GPO, grupo e acesso negativo.
- **Validação:** usuário normal não administra domínio; permissão FIN não autoriza JUR; rollback registrado.
- **Fontes:** https://www.microsoft.com/pt-br/evalcenter/download-windows-server-2025

## Etapa 3 — Entra Free e identidades híbridas

- Obter tenant autorizado, domínio onmicrosoft.com e contas cloud-only de administração e emergência.
- Revisar roles por função mínima e credenciais protegidas, sem segredos nas evidências.
- Validar pré-requisitos do agente Cloud Sync: Windows Server ingressado em domínio, conta Hybrid Identity Administrator, conta gMSA, firewall e escopo.
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

## Calendário sugerido (flexível)

| Semanas | Entrega | Gasto preferencial |
|---|---|---|
| 1–2 | preparação, arquivos, Keycloak e ambiente local | R$ 0 |
| 3–4 | AD DS, DNS, Kerberos, GPO e identidade piloto | R$ 0 com avaliação válida |
| 5–6 | Entra Free, sincronização, logs e recuperação | R$ 0 quando viável |
| 7–8 | OIDC, SAML, SCIM, APP01 e JML | R$ 0 |
| 9–10 | janela licenciada para CA, Intune e IGA conforme elegibilidade | verificar contratação |
| 11–12 | P2 opcional, Azure de curto prazo, auditoria e portfólio | dentro do limite |

## Estimativa financeira

Valores oficiais de referência divulgados em outubro/2026 (por **usuário/mês em contrato anual**, sem impostos): Entra P1 R$ 40,10; Intune P1 R$ 45,80; Business Premium sem Teams R$ 107,60; com Teams R$ 126,00.

Comprar o Premium para todo o laboratório só faz sentido se os usuários necessários estiverem licenciados e o compromisso anual for compatível com seu orçamento. **Não assumir** que uma licença P1 cobre vários beneficiários. A janela P2 pode ser uma avaliação elegível, mas disponibilidade não é garantida.

A interface calcula teto, número de usuários, licença, gasto Azure, extras e reserva, mas não se conecta à fatura Microsoft. Antes de contratar, conferir o checkout.

Fontes:
- https://www.microsoft.com/pt-br/security/pricing/small-medium-business
- https://www.microsoft.com/pt-br/security/business/microsoft365-business-premium
- https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/avoid-charges-free-account

## Observação sobre a segurança

O portal é estático e usa localStorage. Não executa alteração no AD, Entra, Intune, Azure nem autenticação Microsoft; as confirmações das etapas são manuais. Mantenha backups fora do navegador. Nunca salve senha, segredo, token ou dado corporativo verdadeiro.