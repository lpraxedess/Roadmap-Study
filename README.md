# IAM Atlas — laboratório Microsoft Entra + Active Directory + Intune

Site: **https://lpraxedess.github.io/Roadmap-Study/**

Projeto educacional independente, em português brasileiro. Atualizado em **21/10/2026**. O laboratório cria a empresa fictícia Atlas Corp e respeita a sequência pedagógica **AD DS existente → IAM completo no Microsoft Entra ID → Microsoft Intune → controles integrados**.

## Ambiente mínimo

- **1 VM existente com Windows Server AD DS licenciado**, em versão/esquema compatível com as ferramentas Microsoft. Não é preciso subir Samba ou outro controlador de domínio.
- **1 tenant Entra** e contas fictícias. Use conta operacional cloud-only e conta de emergência separadas; não use a conta de emergência nas políticas-piloto.
- **1 usuário-piloto licenciado** para P2 e, só quando chegar ao Intune, Plan 1 para o mesmo usuário.
- **1 Windows 11 Pro licenciado**, VM ou máquina exclusiva para enrollment e hardening; criptografia depende de TPM/recursos adequados.
- Mantenha **dados fictícios** e **capturas sem segredos/tokens/recovery keys**.

## Fases e conteúdos

| Fase | Etapas | Temas |
|---|---:|---|
| Fundação / AD | 01–04 | inventário, orçamento, tenant, contas de emergência, AD DS, OUs, usuários e grupos |
| Microsoft Entra IAM | 05–26 | licenças, cloud-only, Cloud Sync, MFA, SSPR, writeback, OIDC, SAML, app assignments, CA, Identity Protection, PIM, JML, SCIM, Graph, guests, auditoria, incidentes, Governance opcional e homologação |
| Microsoft Intune | 27–33 | licenciamento e pré-requisitos, Windows 11, enrollment, grupos de dispositivo, Settings Catalog, baselines, Defender/BitLocker/firewall, compliance |
| Integração e aceite | 34–36 | CA com require compliant device, incidentes e homologação completa |

**36 laboratórios e 189 atividades.** Cada atividade tem o motivo, console/ação, método de validação; comandos copiados aparecem onde apropriado. Não marque operações como executadas sem testar no AD/tenant/dispositivo.

## Orçamento total máximo: aproximadamente R$ 150/mês

Preços de tabela publicados pela **Microsoft Brasil** e consultados em 21/10/2026:

| Licença | 1 usuário (equivalente/mês, oferta paga anualmente) |
|---|---:|
| Microsoft Entra ID P2 | R$ 57,30 |
| Microsoft Intune Plan 1 | R$ 45,80 |
| **Piloto com ambas** | **R$ 103,10**, antes de impostos |
| 2 Entra P2 + 1 Intune Plan 1 | R$ 160,40, antes de impostos — excede teto |

**Atenção:** os valores anunciados são por usuário/mês **pago anualmente**, com condições de assinatura e renovação automática. `R$ 103,10/mês` é um **equivalente mensal**, não uma garantia de cobrança mensal. Consulte a cobrança efetiva e a tributação antes de comprar; para um teto de desembolso mensal, uma cobrança anual antecipada pode não ser viável. Caso prefira pagar mensalmente, verifique preço e oferta mensal separadamente.

Fontes: [Entra ID P2 — Microsoft](https://www.microsoft.com/pt-br/security/business/identity-access/microsoft-entra-id) · [Intune Plan 1 — Microsoft](https://www.microsoft.com/pt-br/security/business/endpoint-management/microsoft-intune).

**Não contratar tudo no início.** Trabalhar primeiro na fase Free; depois experimentar/assinar P2 para piloto e só adicionar Intune depois do aceite IAM. Administrador Global não substitui licença para os usuários beneficiados. Recursos como Lifecycle Workflows (Governance), Defender for Endpoint P2, Intune Suite (EPM, Remote Help, Cloud PKI) e Microsoft Purview avançado **não são incluídos automaticamente** nessas duas licenças.

## Segurança de laboratório

1. Configure conta emergencial cloud-only com controles apropriados antes de habilitar CA. Exclua-a das políticas piloto e monitore uso.
2. Limite todas as políticas a grupos pequenos e devidamente licenciados. Comece em **Report-only** e confirme o resultado no Sign-in log antes de ativar.
3. SSPR híbrido requer **password writeback** habilitado e agente Cloud Sync compatível — sincronizar usuários por si só não altera senhas no AD.
4. Cloud Sync exige Windows Server suportado, agente em host domain-joined e esquema AD adequado; leia requisitos antes de instalar no controlador de domínio.
5. Scenarios com serviço externo (por exemplo SCIM) devem usar um endpoint de teste **real e validado**. Sem ele, marcar como documentado/opcional; não existe implantação SCIM automática no projeto.
6. Não execute funções administrativas indiscriminadamente, nem exponha segredos/tokens em evidências.
7. O site salva checklists no navegador. **Não conecta, configura ou provisiona** seu ambiente Microsoft.

## Fontes primárias

- [Cloud Sync — pré-requisitos](https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/how-to-prerequisites)
- [Cloud Sync — configuração AD → Entra](https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/how-to-configure)
- [Password writeback](https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-cloud-sync-sspr-writeback)
- [Conditional Access e licenciamento](https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview)
- [Planejar Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access)
- [PIM](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure)
- [Governance — licenças](https://learn.microsoft.com/en-us/entra/id-governance/licensing-fundamentals)
- [Licenciamento Intune](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/licenses)
- [Hardening por security baseline](https://learn.microsoft.com/en-us/intune/intune-service/protect/security-baselines-configure)
- [Compliance Policies](https://learn.microsoft.com/en-us/intune/intune-service/protect/create-compliance-policy)

## Estrutura do site

- `index.html`: UI, páginas, checklists e navegação.
- `atlas-curriculum.js`: lições teóricas do roadmap.
- `atlas-entra-lab.js`: **fonte principal das 36 etapas, 189 tarefas, licenças e referências**.
- `atlas-pro.css`: layout responsivo base.
- `atlas-entra-theme.css`: aparência minimalista preta e azul-escuro.
- `atlas-pro.js`: interações e navegação.

Não há build; GitHub Pages serve os arquivos estáticos diretamente. Páginas: **Visão geral, Roadmap, Laboratórios e Certificações**.

O projeto não executa nenhuma ação no tenant automaticamente e não pressupõe que configurações reais já foram testadas. Uma política só deve ser marcada concluída após comprovar seu efeito com a conta, dispositivo ou aplicação correspondente.
