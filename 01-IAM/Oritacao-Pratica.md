# 🛡️ PROJETO LABORATÓRIO IAM
## Active Directory + Microsoft Entra ID + Azure RBAC + MFA + Conditional Access + PIM + PAM + SIEM

> **Versão:** 1.0  
> **Objetivo:** formação prática para carreira em IAM  
> **Nível:** intermediário → avançado  
> **Estratégia:** laboratório modular, baixo consumo de hardware e foco em situações reais de trabalho  
> **Ambiente:** VirtualBox + Windows Server + Windows Client + Linux + Microsoft Azure/Entra ID

---

# 🧭 SUMÁRIO

- [1. Objetivo](#1-objetivo)
- [2. O que será desenvolvido](#2-o-que-será-desenvolvido)
- [3. Arquitetura](#3-arquitetura)
- [4. Estratégia para máquina com pouca RAM](#4-estratégia-para-máquina-com-pouca-ram)
- [5. Pré-requisitos](#5-pré-requisitos)
- [6. Planejamento de endereçamento](#6-planejamento-de-endereçamento)
- [7. Criação da rede no VirtualBox](#7-criação-da-rede-no-virtualbox)
- [8. Criação da VM LAB-DC01](#8-criação-da-vm-lab-dc01)
- [9. Configuração inicial do Windows Server](#9-configuração-inicial-do-windows-server)
- [10. Configuração de IP estático](#10-configuração-de-ip-estático)
- [11. Instalação do Active Directory](#11-instalação-do-active-directory)
- [12. Promoção para Domain Controller](#12-promoção-para-domain-controller)
- [13. Validação do domínio](#13-validação-do-domínio)
- [14. Estrutura de OUs](#14-estrutura-de-ous)
- [15. Usuários e grupos](#15-usuários-e-grupos)
- [16. Conceito de RBAC no Active Directory](#16-conceito-de-rbac-no-active-directory)
- [17. Criação do LAB-CLIENT01](#17-criação-do-lab-client01)
- [18. Ingresso no domínio](#18-ingresso-no-domínio)
- [19. DHCP](#19-dhcp)
- [20. GPO](#20-gpo)
- [21. Joiner](#21-joiner)
- [22. Mover](#22-mover)
- [23. Leaver](#23-leaver)
- [24. Contas administrativas](#24-contas-administrativas)
- [25. Microsoft Entra ID](#25-microsoft-entra-id)
- [26. Usuários e grupos no Entra](#26-usuários-e-grupos-no-entra)
- [27. Microsoft Entra RBAC](#27-microsoft-entra-rbac)
- [28. Azure RBAC](#28-azure-rbac)
- [29. MFA](#29-mfa)
- [30. Conditional Access](#30-conditional-access)
- [31. PIM](#31-pim)
- [32. PAM](#32-pam)
- [33. JIT e JEA](#33-jit-e-jea)
- [34. Auditoria](#34-auditoria)
- [35. Access Review](#35-access-review)
- [36. PowerShell](#36-powershell)
- [37. Microsoft Graph](#37-microsoft-graph)
- [38. Service Principal](#38-service-principal)
- [39. Managed Identity](#39-managed-identity)
- [40. Identidade híbrida](#40-identidade-híbrida)
- [41. IAM + SIEM](#41-iam--siem)
- [42. Hardening](#42-hardening)
- [43. Projeto corporativo final](#43-projeto-corporativo-final)
- [44. Evidências](#44-evidências)
- [45. Checklist](#45-checklist)
- [46. Competências para o currículo](#46-competências-para-o-currículo)

---

# 1. OBJETIVO

O objetivo deste projeto é construir um laboratório que permita praticar IAM de forma semelhante ao que seria encontrado em um ambiente corporativo.

O foco não será apenas aprender a criar usuários.

Você deverá aprender a controlar:

```text
IDENTIDADE
    ↓
AUTENTICAÇÃO
    ↓
AUTORIZAÇÃO
    ↓
PRIVILÉGIO
    ↓
ACESSO
    ↓
MONITORAMENTO
    ↓
REVISÃO
    ↓
REVOGAÇÃO
