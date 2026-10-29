# IAM / Roadmap — Aurora

Portal estático de aprendizagem prática em **Identity and Access Management (IAM)**, do básico ao avançado, com uma empresa fictícia única, navegação superior e interface full-width monocromática.

O projeto acompanha a empresa fictícia **Aurora Serviços Digitais** do cadastro de RH até Active Directory, Microsoft Entra, identidade híbrida, OIDC/SAML/SCIM, governança, PAM, Intune, automação, auditoria e portfólio.

## Navegação e experiência (versão 29/10/2026)

A interface foi reorganizada para quatro áreas, sem menu lateral permanente: **Início**, **Jornada**, **Arquitetura** e **Certificações**.

- **Início:** visualização do laboratório, progresso, próxima tarefa e panorama dos 11 módulos.
- **Jornada:** estudo e laboratório são um único ambiente. O bloco de infraestrutura/VirtualBox, orçamento e marcos fica no início, e as 41 aulas vêm abaixo, com filtros recolhidos.
- **Arquitetura:** diagrama, ativos, acessos, movimentos e **Atlas completo com 14 sistemas, 15 relações, seis movimentos, 11 módulos, 41 aulas e 296 microetapas**. Cada passo informa contexto, execução, comando quando disponível e resultado esperado.
- **Certificações:** rotas complementares de carreira; nenhum exame é pré-requisito para realizar o laboratório.

Tema preto #050505, grafite e destaque branco/cinza, transições de página com suporte a preferência por movimento reduzido, layout responsivo e largura total da janela.

**[Auditoria da interface e decisões](docs/AUDITORIA-UX.md)** · **[Plano técnico completo](docs/PLANO-LABORATORIO.md)**

## Perfil atual do estudante

- Ryzen 5 5600, 16 GB DDR4 3200 MHz, RTX 3070 e NVMe de 1 TB. A GPU não é necessária para o laboratório IAM.
- HOST01 executa **Windows 11 Pro** e utiliza **Oracle VirtualBox**. Ainda falta confirmar versão do VirtualBox, espaço livre e AMD-V/SVM.
- Tenant Microsoft Entra Free já disponível, **sem licenças adicionais**.
- Orçamento máximo de R$ 200/mês; **começar gastando R$ 0**.
- Sem carga horária fixa; o aprendizado ocorre por **marcos e microetapas verificadas**, não semanas ou prazos.
- Na **Jornada → Configurar ambiente**, informar versão do VirtualBox, espaço livre e AMD-V/SVM. Windows 11 Pro + VirtualBox já estão selecionados.
- DC01 no VirtualBox: 2 vCPUs, **4 GB RAM**, VDI 60 GB; CL01: 2 vCPUs, **4 GB RAM**, VDI 80 GB com UEFI/TPM 2.0/Secure Boot. Não manter ambas as VMs e Docker simultaneamente.
- Ao recarregar o portal, ele lembra a microetapa atual; backup inclui perfil de hardware e posição de leitura.

Consulte [guia Windows 11 + VirtualBox](docs/GUIA-VIRTUALBOX.md) e [plano operacional adaptado](docs/PLANO-LABORATORIO.md) antes de instalar ou contratar recursos.

## Comece aqui

1. Acesse **Jornada** e expanda **Configurar ambiente, rede, VirtualBox e custos** para conferir a bancada, as etapas de construção e a estimativa financeira.
2. Em **Arquitetura**, conheça as identidades E001–E006, ativos e eventos J001/M001/L001.
3. Em **Estudos**, abra uma aula e execute um passo de cada vez. Cada microetapa informa onde executar, o que fazer, o motivo e o resultado esperado.
4. Confirme os critérios de aceite; registre a modalidade como **real**, **parcial** ou **simulada**. Simulação não equivale a execução.
5. Anote observações sem senhas/tokens e exporte backups. O backup inclui notas, progresso, checklist do laboratório, posição da microetapa, perfil de hardware e valores estimados de orçamento.
6. Use **Certificações** para organizar estudos adicionais, não como certificado de conclusão.

**[Plano operacional detalhado](docs/PLANO-LABORATORIO.md)** · **[Abrir Jornada + Laboratório](https://lpraxedess.github.io/Roadmap-Study/#estudos)** · [Link legado do laboratório](https://lpraxedess.github.io/Roadmap-Study/#laboratorio)

## Limite de custo: R$ 200/mês

A escolha inicial é **ambiente local e Entra Free**, sem VMs Azure permanentes. Uma janela licenciada é recomendada só quando os roteiros estiverem preparados. Confira tipo de contratação, impostos, número de usuários e renovação.

Referências públicas em 29/10/2026: Entra ID P1 R$ 40,10/usuário/mês, Intune P1 R$ 45,80, Business Premium sem Teams R$ 107,60, Business Premium com Teams R$ 126,00. **São preços com compromisso anual, sem impostos; não são cotações de cobrança mensal sem compromisso.** O preço efetivo e a elegibilidade dependem do checkout. Business Premium inclui P1 e Intune para usuários licenciados, mas recursos P2 (como PIM e Identity Protection) requerem elegibilidade/licença adicional.

Fontes: [preços Microsoft](https://www.microsoft.com/pt-br/security/pricing/small-medium-business), [Business Premium](https://www.microsoft.com/pt-br/security/business/microsoft365-business-premium), [limite de gastos Azure](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/spending-limit).

**Importante:** Alertas de orçamento Azure não são trava rígida. Azure Pay-as-you-go não dispõe de spending limit. Windows Server Evaluation expira em 180 dias e não substitui uma licença de produção.

## Arquitetura do site

HTML, CSS e JavaScript, sem dependências de frontend e compatível com GitHub Pages.

| Arquivo | Responsabilidade |
|---|---|
| index.html | Estrutura do portal |
| style.css / experience.css | UI responsiva, animações e acessibilidade |
| navigation.js | Rotas, menu mobile e histórico |
| app.js / curriculum.js | 41 aulas, 296 passos guiados, critérios e evidências |
| architecture.js / architecture-view.js | Topologia e cenário empresarial |
| state.js | Progresso, persistência e backup |
| lab-planner.js | 10 marcos de implantação, checklist e estimador de custo |
| lab-profile.js | Windows 11 Pro + VirtualBox, requisitos das VMs, checagem de RAM/AMD-V e guia de execução |
| home-studio.js | 11 módulos e panorama de progresso na home |
| architecture-atlas.js | Atlas detalhado que apresenta as 296 microetapas do currículo |
| monochrome.css | Tema preto/cinza/branco, full-width, transições e responsividade |
| scripts/e2e.mjs | Teste Playwright para desktop, mobile, navegação, leitor e Atlas |
| docs/AUDITORIA-UX.md | Evidências da reorganização da experiência |
| docs/GUIA-VIRTUALBOX.md | Roteiro de rede host-only, AD DS, Windows 11 convidado, DNS e NAT temporário |
| certifications.js | Referências profissionais e certificações |

**O portal não cria contas nem configura automaticamente AD, Entra ou Azure.** Ele ensina, orienta e registra confirmações manuais. Dados são locais ao navegador, sem sincronização entre dispositivos.

## Segurança

- Nunca introduza dados corporativos, senhas, tokens ou segredos nas evidências.
- Não publique AD DS, RDP, LDAP, Keycloak de desenvolvimento ou APP01 na internet.
- Confirme papel mínimo, requisitos de licença, controle negativo e reversão antes de concluir uma aula.
- Avaliações/licenças e preços mudam: verifique sempre Microsoft Learn e o contrato aplicável.
- Há suporte a teclado, foco visível, layout responsivo e preferência por movimento reduzido.

## Validação

Execute localmente com Node.js recente: **node scripts/validate.mjs**. O teste em browser real usa Playwright Chromium: **node scripts/e2e.mjs** após instalar a dependência e o navegador. Ambos são executados pelo GitHub Actions.

Backups devem ser exportados regularmente; o navegador pode apagar seu armazenamento local.