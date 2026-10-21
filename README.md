# ROADMAP - IAM | Plataforma de formação

Plataforma pessoal e estática para estudar **IAM, IGA e PAM** do básico à arquitetura, com teoria, laboratórios guiados e certificações. Publicação via GitHub Pages; **nenhuma alteração é realizada automaticamente** em tenants Microsoft, máquinas ou contas.

## Menu

- **Painel**: visão geral, retomada dos estudos, progresso autodeclarado e backup.
- **Roadmap de estudos**: 29 módulos, 242 aulas, conceitos, decisões de segurança, exercícios e referências. As aulas agora exibem apenas um link para laboratórios relevantes.
- **Laboratórios**: duas jornadas utilizando a AtlasCorp fictícia:
  - **Presencial / On-premises**: 12 etapas sequenciais — infraestrutura, Windows Server, AD DS, DNS, OU, grupos, GPO, Kerberos, LDAP, Linux, Keycloak, OIDC/SAML, SCIM, JML, privilégios e incidentes.
  - **Cloud**: 16 capítulos e **94 procedimentos AtlasCorp existentes**, com pré-requisitos, execução, justificativa, teste, diagnóstico, evidências e rollback — Entra, MFA, CA, PIM, Intune, Graph, SSO, IGA, Azure, Purview, híbrido e workloads.
- **Certificações**: planejamento por nível e links oficiais, com SC-300 como meta principal sugerida.

## Ambiente e licenças

O laboratório local considera Windows 11, Ryzen 5 5600, 16 GB de RAM, 1 TB e VirtualBox, com **até duas VMs simultâneas**. Utilize Windows Server Evaluation conforme seus termos, Ubuntu e Keycloak. Não exponha LDAP, Kerberos, administração Docker ou RDP à Internet.

O Cloud parte de um tenant gratuito existente. **Entra ID P2 e Intune Plan 1** possibilitam testes premium para usuários/dispositivos devidamente licenciados, mas não cobrem todos os funcionários fictícios. Entra ID Governance, Purview, Azure e Global Secure Access podem exigir licenças adicionais. Trials dependem de elegibilidade, orçamento e termos de cancelamento. Simulações e alternativas locais não equivalem a integrações comerciais testadas.

## Política de orçamento do laboratório (21/10/2026)

**Teto global de gastos: R$ 200 por mês**, incluindo impostos e assinaturas. **Meta de consumo de recursos Azure: R$ 0/mês.** O crédito de avaliação Azure de **US$ 200 (dólares)** já foi consumido e não deve ser confundido com o teto recorrente de **R$ 200 (reais)**. Não interprete o orçamento como autorização automática para compras.

- **Referência Microsoft Brasil, antes de impostos e com compromisso/pagamento anual:** Entra ID P2 R$ 57,30/usuário/mês + Intune Plan 1 R$ 45,80/usuário/mês = R$ 103,10/usuário/mês.
- **Alternativa de pacote para avaliar:** Enterprise Mobility + Security E5, R$ 103,30/usuário/mês nas condições anuais anunciadas. Inclui Entra ID P2 e Intune, com outras funcionalidades, mas não todo Intune Suite e nem toda governança avançada.
- **Azure não obrigatório para IAM:** custo planejado de **R$ 0/mês**. O crédito de avaliação do Azure de US$ 200 já foi utilizado pelo estudante; não pressupor renovação ou novos créditos. Entra ID, Graph, MFA, Conditional Access, PIM de funções do diretório, aplicativos e Intune não dependem de consumo pago de recursos Azure, mas funcionalidades premium exigem licenças adequadas. Azure RBAC, Key Vault, Managed Identities para recursos Azure e aplicações hospedadas no Azure formam apenas uma extensão **opcional** da trilha avançada, e só podem gerar custos com aprovação específica e estimativa por exercício.
- **Reserva:** o teto de R$ 200/mês cobre licenças, impostos e eventuais custos explicitamente autorizados. Sem Azure pago, o saldo não precisa ser gasto: reserve-o para diferenças de cobrança ou aquisição adicional de licenças para pessoas participantes. Uma contratação acima do teto não é permitida.
- **Azure somente se autorizado:** se optar pelo módulo avançado Azure, defina orçamento específico para aquele período e crie alertas em 50%, 75% e 90%. Alertas não bloqueiam cobranças; exclua recursos e confira cobranças residuais após os testes.
- **Compromisso anual:** valores anunciados como `usuário/mês, pago anualmente` podem exigir cobrança anual e renovação automática. Como o teto do usuário é mensal, não assumir que uma assinatura anual satisfaz a condição de fluxo de caixa. Verificar disponibilidade e preço de contratação realmente mensal antes de comprar.
- **Trials:** registrar início, término, elegibilidade, custos e renovação em cada laboratório. Não criar contas novas para tentar contornar critérios do crédito gratuito Azure nem presumir que testes premium são cobertos automaticamente.

Fontes oficiais para revisar antes de qualquer compra:
- https://www.microsoft.com/pt-br/security/business/microsoft-entra-pricing
- https://www.microsoft.com/pt-br/security/business/endpoint-management/microsoft-intune
- https://www.microsoft.com/pt-br/microsoft-365/enterprise-mobility-security/compare-plans-and-pricing
- https://azure.microsoft.com/pt-br/pricing/purchase-options/azure-account
- https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets
- https://learn.microsoft.com/pt-br/entra/fundamentals/licensing

Nenhum passo autoriza alterar produção. Garanta contas administrativas de emergência funcionais antes de Conditional Access restritivo. Comece em Report-only. Não registre senhas, tokens ou dados reais.

## Progresso e backup

Os dados ficam em localStorage no seu navegador, sem backend. Exporte regularmente o JSON pelo Painel. O backup mantém o formato versão 8 e adiciona o campo courseLabs para a jornada On-premises; as 94 tarefas Cloud reutilizam companyProcedures e practiceEvidence já existentes. Importações legadas das versões 2 a 8 permanecem compatíveis e URLs #lab/lab-XX agora abrem capítulos Cloud.

Conclusão e modalidades real/simulado/teórico são **autodeclaradas**. O site não valida configurações no tenant nem no Windows.

## Executar e testar

Sirva a pasta via HTTP estático, por exemplo com python -m http.server 8000. Com Node.js 22 execute:

    node --check data/lab-courses.js
    node --check assets/lab-platform.js
    node --test tests/*.test.mjs

O GitHub Actions executa verificações de sintaxe, integridade e DOM simulado. Isso não substitui testes em navegador real nem execução das configurações. A documentação anterior permanece em docs/ como referência; sua organização pode divergir da navegação nova.

**Revisão:** outubro de 2026. Confirme sempre as condições atuais de licenças e serviços.

## Laboratórios executáveis e avaliações (atualização)

Consulte [labs/README.md](labs/README.md) e [labs/local/README.md](labs/local/README.md) para os scripts Active Directory, Keycloak em Docker, API SCIM, aplicação OIDC e SP SAML com pré-requisitos e rollback.

- AtlasCorp preserva objectId de camila.ti entre os capítulos Cloud 00 e 01; a admissão não duplica identidade.
- Azure, Purview e multi-cloud podem ser **dispensados com justificativa**, sem contar como feitos nem impedir as demais atividades.
- Novas marcações exigem modalidade real, simulação ou teoria e descrição sanitizada. Marcas antigas são preservadas como histórico não verificado.
- 56 questões formativas (duas por capítulo), com pontuação, feedback e tentativas, separadas das execuções reais autodeclaradas. Não equivalem a exame supervisionado.
- O backup JSON (formato versão 8 compatível) foi ampliado com courseAssessments e os status opcionais, mantendo leitura de backups anteriores.
- A execução real contra serviços Keycloak, Windows e tenant Microsoft depende de instalações e validações feitas pelo estudante. Os testes do site não certificam essas configurações.
