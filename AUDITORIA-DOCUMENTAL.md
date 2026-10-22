# Auditoria documental de IAM — 22/10/2026

Este projeto é um currículo de aprendizagem, não uma confirmação automatizada de que um procedimento executou corretamente em um tenant ou VM.

## Método e alcance

- Conferência por leitura de documentação oficial para competências destacadas com `referencia-conferida`.
- Demais competências preservam link oficial de referência, mas requerem checagem adicional na versão instalada.
- A revisão compara orientações e pré-requisitos; **não** representa execução real, aprovação de custos, validação de licenças do tenant nem certificação de procedimentos.
- Rótulos de caminho dependem de idioma, permissões, versão da interface e disponibilidade regional.
- Para marcar uma competência como concluída, execute os passos e teste os critérios; simulações devem ser identificadas, não confundidas com produção.

## Correções de maior impacto

1. **Numeração:** eliminada a repetição dos passos 03, 04 e 05 nas 36 competências.
2. **Cloud Sync:** caminho Entra ID > Entra Connect > Cloud sync, requisitos do agente, gMSA, escopo e teste antes de habilitar. Um DC é suportado, mas deve ser endurecido e avaliado.
3. **Passkeys:** o recurso FIDO2 existe no Entra ID Free; Conditional Access para impô-lo tem licença separada.
4. **SSPR:** alteração de senha conhecida é diferente de redefinição de senha esquecida; writeback requer licenciamento adicional.
5. **Conditional Access:** requer P1 ou assinatura elegível; modo report-only não bloqueia nem força MFA interativo.
6. **Contas de emergência:** documentação da Microsoft recomenda pelo menos duas contas cloud-only, não sincronizadas/federadas e com autenticação resistente a phishing.
7. **SAML:** configuração depende do SP; atribuição por grupos a aplicativos empresariais exige P1/P2.
8. **SCIM:** endpoint local na rede isolada não é acessível diretamente pelo serviço cloud; teste remoto exige endpoint seguro e alcançável.
9. **IGA/PIM:** licenciamento diferenciado; PIM exige P2/ID Governance, funcionalidades IGA podem exigir ID Governance/Suite.
10. **PAM:** Azure Key Vault não substitui o gerenciamento/gravação de sessões de JumpServer.

## Fontes conferidas

- iam-0-0: [Criar usuários no Microsoft Entra](https://learn.microsoft.com/pt-br/entra/fundamentals/how-to-create-delete-users)
- iam-2-0: [Contas de emergência Microsoft](https://learn.microsoft.com/pt-br/entra/identity/role-based-access-control/security-emergency-access)
- iam-2-1: [Pré-requisitos do Cloud Sync](https://learn.microsoft.com/pt-br/entra/identity/hybrid/cloud-sync/how-to-prerequisites) · [Instalação do agente](https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/how-to-install) · [Configuração de escopo e teste](https://learn.microsoft.com/pt-br/entra/identity/hybrid/cloud-sync/how-to-configure)
- iam-2-2: [Passkeys FIDO2: configuração e licenças](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-enable-passkey-fido2)
- iam-2-3: [Matriz de licenças SSPR](https://learn.microsoft.com/pt-br/entra/identity/authentication/concept-sspr-licensing)
- iam-2-4: [Licenças Conditional Access](https://learn.microsoft.com/pt-br/entra/identity/conditional-access/overview) · [Validar políticas em report-only](https://learn.microsoft.com/pt-br/entra/identity/conditional-access/concept-conditional-access-report-only)
- iam-3-0: [Guia oficial de SAML SSO](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal-setup-sso) · [Atribuição e licença para grupos](https://learn.microsoft.com/pt-br/entra/identity/enterprise-apps/assign-user-or-group-access-portal)
- iam-3-2: [Fluxo de provisionamento SCIM](https://learn.microsoft.com/pt-br/entra/identity/app-provisioning/use-scim-to-provision-users-and-groups)
- iam-3-3: [Registro de aplicativos Microsoft](https://learn.microsoft.com/pt-br/entra/identity-platform/quickstart-register-app)
- iam-4-0: [Licenciamento Entra ID Governance](https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview)
- iam-4-1: [Licença Entitlement Management](https://learn.microsoft.com/pt-br/entra/id-governance/entitlement-management-overview)
- iam-5-0: [Requisitos do PIM](https://learn.microsoft.com/pt-br/entra/id-governance/privileged-identity-management/pim-getting-started)
- iam-5-2: [Recuperação com contas de emergência](https://learn.microsoft.com/pt-br/entra/identity/role-based-access-control/security-emergency-access)
- iam-7-1: [Licença para Conditional Access](https://learn.microsoft.com/pt-br/entra/identity/conditional-access/overview)

## Limitações e pendências

- Nenhuma das 369 instruções foi testada individualmente na interface real; a conferência documental foi direcionada aos procedimentos de maior risco.
- Todos os 37 links de competência são referências indicadas, mas apenas 14 competências tiveram fonte documental diretamente comparada nesta revisão.
- Testes reais pendentes: Cloud Sync, integração SAML/OIDC ponta a ponta, provisionamento SCIM remoto, PIM licenciado, JumpServer e Intune.
- Interfaces, preços, licenças e menus podem mudar; confirmar no portal e documentação antes de alterar configurações.
