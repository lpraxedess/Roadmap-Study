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
