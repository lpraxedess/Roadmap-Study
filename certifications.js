'use strict';
const CERTIFICATIONS=[
  {
    "id": "sc900",
    "code": "SC-900",
    "level": "beginner",
    "title": "Security, Compliance and Identity Fundamentals",
    "issuer": "Microsoft",
    "category": "Trilha principal",
    "summary": "Fundamentos de identidade, Zero Trust, Microsoft Entra, segurança e conformidade.",
    "labs": "Módulos 01, 03 e 09. Complementar Microsoft Defender e Purview no Microsoft Learn. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Sem certificação prévia obrigatória. É recomendável conhecer noções de Azure e Microsoft 365.",
    "next": "Explique autenticação, RBAC, MFA, identidade híbrida e governança. Faça a avaliação prática gratuita antes de agendar.",
    "url": "https://learn.microsoft.com/pt-br/credentials/certifications/exams/sc-900/",
    "moduleIds": [
      1,
      3,
      9
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "az900",
    "code": "AZ-900",
    "level": "beginner",
    "title": "Azure Fundamentals",
    "issuer": "Microsoft",
    "category": "Complementar",
    "summary": "Conceitos de nuvem, serviços Azure, arquitetura, cobrança e governança.",
    "labs": "Módulos 01–03; estudar computação, rede, armazenamento e custos Azure fora do laboratório IAM. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Nenhuma certificação formal obrigatória. Útil caso Azure ainda seja novidade.",
    "next": "Explique tenant, assinatura, grupo de recursos, responsabilidade compartilhada e custos.",
    "url": "https://learn.microsoft.com/pt-br/credentials/certifications/azure-fundamentals/",
    "moduleIds": [
      1,
      2,
      3
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "cc",
    "code": "ISC2 CC",
    "level": "beginner",
    "title": "Certified in Cybersecurity",
    "issuer": "ISC2",
    "category": "Complementar",
    "summary": "Fundamentos de segurança, controle de acesso, redes, governança e resposta a incidentes.",
    "labs": "Módulos 01, 02 e 09; complemente política de segurança e resposta a incidentes. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Não exige experiência profissional para a certificação.",
    "next": "Resolva exercícios de princípios de segurança e explique IAM em linguagem de riscos e controles.",
    "url": "https://www.isc2.org/certifications/cc",
    "moduleIds": [
      1,
      2,
      9
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "sc300",
    "code": "SC-300",
    "level": "intermediate",
    "title": "Identity and Access Administrator Associate",
    "issuer": "Microsoft",
    "category": "Trilha principal",
    "summary": "Administração de identidades, autenticação, acesso a aplicações, governança e troubleshooting no Entra.",
    "labs": "Módulos 01–07 e 09; destaque Entra, híbrido, SSO, JML, PIM e Microsoft Graph. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Não exige SC-900. Recomenda experiência com Entra, AD DS, Azure, PowerShell e KQL.",
    "next": "Finalize o laboratório IAM ponta a ponta, revise lacunas do guia oficial e pratique casos de falha.",
    "url": "https://learn.microsoft.com/pt-br/credentials/certifications/identity-and-access-administrator/",
    "moduleIds": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      9
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "az104",
    "code": "AZ-104",
    "level": "intermediate",
    "title": "Azure Administrator Associate",
    "issuer": "Microsoft",
    "category": "Complementar",
    "summary": "Administração de Azure com identidade, RBAC, redes, recursos de computação, storage e monitoramento.",
    "labs": "Módulos 01–03 e 07. Exige novos laboratórios Azure além do roadmap IAM. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Experiência prática com Azure, sistemas operacionais, rede, PowerShell e CLI.",
    "next": "Monte laboratórios próprios de subscriptions, Azure RBAC, redes virtuais, storage e observabilidade.",
    "url": "https://learn.microsoft.com/en-us/credentials/certifications/exams/az-104/",
    "moduleIds": [
      1,
      2,
      3,
      7
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "sc500",
    "code": "SC-500",
    "level": "intermediate",
    "title": "Cloud and AI Security Engineer Associate",
    "issuer": "Microsoft",
    "category": "Especialização",
    "summary": "Controles de segurança em Azure, identidade, Key Vault, cargas híbridas e sistemas de IA.",
    "labs": "Módulos 03, 06, 07 e 09. Complemente segurança de Azure, infraestrutura e IA. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Conhecimento prático de administração Azure e identidades; vai além de IAM.",
    "next": "Estude Key Vault, identidades gerenciadas, Defender for Cloud e governança de workloads de IA.",
    "url": "https://learn.microsoft.com/en-us/credentials/certifications/cloud-and-ai-security-engineer-associate",
    "moduleIds": [
      3,
      6,
      7,
      9
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "sc100",
    "code": "SC-100",
    "level": "advanced",
    "title": "Cybersecurity Architect Expert",
    "issuer": "Microsoft",
    "category": "Trilha principal",
    "summary": "Arquitetura Zero Trust, estratégia de segurança, IAM, proteção de infraestrutura e governança.",
    "labs": "Módulos 01–10, projeto final e aprofundamento em arquitetura multinuvem, riscos e segurança além de IAM. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Para obter o título Expert: SC-100 + uma certificação associada elegível (SC-300, SC-200 ou SC-500).",
    "next": "Apresente arquitetura empresarial, trade-offs, riscos, controles e decisões técnicas documentadas.",
    "url": "https://learn.microsoft.com/pt-br/credentials/certifications/cybersecurity-architect-expert/",
    "moduleIds": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "cissp",
    "code": "CISSP",
    "level": "advanced",
    "title": "Certified Information Systems Security Professional",
    "issuer": "ISC2",
    "category": "Carreira sênior",
    "summary": "Segurança abrangente, arquitetura, gestão de riscos, operações, IAM e governança.",
    "labs": "Todos os módulos IAM; exige estudo adicional dos oito domínios oficiais da prova. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Certificação completa requer cinco anos de experiência elegível e endosso (consulte regras de redução de experiência).",
    "next": "Acumule experiência verificável e construa visão abrangente de segurança, não apenas de identidade.",
    "url": "https://www.isc2.org/certifications/cissp",
    "moduleIds": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "cism",
    "code": "CISM",
    "level": "advanced",
    "title": "Certified Information Security Manager",
    "issuer": "ISACA",
    "category": "Gestão",
    "summary": "Gestão de segurança da informação, governança, riscos, programa de segurança e incidentes.",
    "labs": "Módulos 05, 06, 09 e 10; complemente com governança organizacional e gestão de riscos. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Para obter a certificação, cinco anos de experiência profissional em gestão de segurança nos domínios aplicáveis.",
    "next": "Construa casos de negócio, estratégias de tratamento de riscos, indicadores e processos formais.",
    "url": "https://www.isaca.org/credentialing/cism/get-cism-certified",
    "moduleIds": [
      5,
      6,
      9,
      10
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "okta-pro",
    "code": "OKTA PRO",
    "level": "beginner",
    "title": "Okta Certified Professional",
    "issuer": "Okta",
    "category": "IAM / SSO",
    "summary": "Fundamentos de Okta Workforce Identity, diretório de usuários, SSO e políticas básicas.",
    "labs": "Módulos 01, 03 e 04; criar ambiente Okta de teste quando disponível e integrar aplicação OIDC ou SAML. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Não exige certificação anterior. Conferir o formato atual do exame prático no portal oficial.",
    "next": "Praticar usuários, grupos, integrações de aplicações e políticas de autenticação.",
    "url": "https://www.okta.com/pt-br/services/certification/",
    "moduleIds": [
      1,
      3,
      4
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "sailpoint-leader",
    "code": "SP LEADER",
    "level": "beginner",
    "title": "Identity Security Leader Credential",
    "issuer": "SailPoint",
    "category": "IGA / Governança",
    "summary": "Credencial de conhecimento sobre governança, risco, ciclo de vida e valor empresarial da identidade.",
    "labs": "Módulos 01, 05 e 09; montar matriz de acesso, JML e campanhas de revisão. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Concluir a trilha formativa indicada pela SailPoint; verificar condições de acesso e emissão.",
    "next": "Estudar identidade como controle de risco e documentar governança de acessos.",
    "url": "https://community.sailpoint.com/programs/certifications-and-credentials",
    "moduleIds": [
      1,
      5,
      9
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "okta-admin",
    "code": "OKTA ADMIN",
    "level": "intermediate",
    "title": "Okta Certified Administrator",
    "issuer": "Okta",
    "category": "IAM / SSO",
    "summary": "Administração de usuários, grupos, políticas e diagnóstico de problemas na plataforma Okta.",
    "labs": "Módulos 03–05; complementar com laboratórios específicos do tenant Okta. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Okta Certified Professional é pré-requisito declarado pelo programa.",
    "next": "Aprofundar políticas, integrações, logs e troubleshooting de provisionamento.",
    "url": "https://www.okta.com/pt-br/services/certification/",
    "moduleIds": [
      3,
      4,
      5
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "cyberark-def",
    "code": "DEFENDER PAM",
    "level": "intermediate",
    "title": "CyberArk Defender – PAM",
    "issuer": "CyberArk",
    "category": "PAM",
    "summary": "Operação, administração e suporte de uma solução CyberArk de acesso privilegiado.",
    "labs": "Módulo 06; usar JumpServer para conceitos gratuitos e complementar com ambiente CyberArk autorizado. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Experiência com PAM recomendada; consultar guia atual da CyberArk University. Plataforma comercial pode exigir acesso específico.",
    "next": "Estudar Vault, políticas de contas privilegiadas, rotação, sessões e trilhas de auditoria.",
    "url": "https://training.cyberark.com/learn/course/external/view/elearning/113/defender-pam-sample-items-study-guide",
    "moduleIds": [
      6
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "aws-security",
    "code": "AWS SECURITY",
    "level": "intermediate",
    "title": "AWS Certified Security – Specialty",
    "issuer": "AWS",
    "category": "Cloud IAM",
    "summary": "Segurança de workloads AWS, IAM, políticas, federação, criptografia, logs e resposta.",
    "labs": "Módulos 04, 07 e 09; adicionar laboratório AWS IAM, IAM Identity Center e CloudTrail. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Exame especializado; recomenda-se experiência prática em segurança AWS. Revisar versão atual do exame.",
    "next": "Praticar IAM policies, roles, trust policies, SCPs e identidade federada na AWS.",
    "url": "https://aws.amazon.com/pt/certification/",
    "moduleIds": [
      4,
      7,
      9
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "sailpoint-admin",
    "code": "SP ADMIN",
    "level": "intermediate",
    "title": "Identity Security Administrator Certification",
    "issuer": "SailPoint",
    "category": "IGA / Governança",
    "summary": "Administração de soluções SailPoint e processos de governança de identidades.",
    "labs": "Módulo 05; complementar com plataforma SailPoint e conectores autorizados. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Programa informa 6 meses de experiência e disponibilidade para clientes e parceiros SailPoint.",
    "next": "Estudar fontes autoritativas, provisionamento, certificações de acesso e políticas.",
    "url": "https://community.sailpoint.com/programs/certifications-and-credentials",
    "moduleIds": [
      5
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "okta-consult",
    "code": "OKTA CONSULT",
    "level": "advanced",
    "title": "Okta Certified Consultant",
    "issuer": "Okta",
    "category": "IAM / SSO",
    "summary": "Implantação e integração de Okta em cenários complexos, incluindo federação e ciclo de vida.",
    "labs": "Módulos 03–05 e 09; desenvolver arquitetura SSO e SCIM com Okta. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Okta Professional e Administrator são pré-requisitos oficiais.",
    "next": "Documentar integrações, resolução de incidentes e decisões de arquitetura.",
    "url": "https://www.okta.com/pt-br/services/certification/",
    "moduleIds": [
      3,
      4,
      5,
      9
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "cyberark-sentry",
    "code": "SENTRY PAM",
    "level": "advanced",
    "title": "CyberArk Sentry – PAM",
    "issuer": "CyberArk",
    "category": "PAM",
    "summary": "Implantação e configuração avançada de controles de acesso privilegiado.",
    "labs": "Módulos 06 e 09; complementar com laboratório comercial autorizado. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Conhecimento operacional de CyberArk PAM; conferir pré-requisitos vigentes no catálogo oficial.",
    "next": "Praticar desenho, instalação, integração, alta disponibilidade e recuperação.",
    "url": "https://training.cyberark.com/learn/public/catalog/view/1",
    "moduleIds": [
      6,
      9
    ],
    "reviewedAt": "2026-10-28"
  },
  {
    "id": "sailpoint-engineer",
    "code": "SP ENGINEER",
    "level": "advanced",
    "title": "Identity Security Engineer Certification",
    "issuer": "SailPoint",
    "category": "IGA / Governança",
    "summary": "Implementação técnica e engenharia de soluções SailPoint de governança de identidade.",
    "labs": "Módulos 05, 07 e 09; aprofundar conectores, APIs e fluxos de provisionamento. Associação editorial; não equivale à cobertura completa do exame.",
    "prerequisite": "Programa informa 1–3 anos de experiência e disponibilidade para clientes e parceiros.",
    "next": "Construir integrações, regras de identidade, aprovações e evidências de governança.",
    "url": "https://community.sailpoint.com/programs/certifications-and-credentials",
    "moduleIds": [
      5,
      7,
      9
    ],
    "reviewedAt": "2026-10-28"
  }
];
