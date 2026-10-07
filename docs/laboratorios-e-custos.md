# Laboratórios, recursos e custos

## Regra: aprender sem depender de licença adicional

| Tecnologia | Finalidade | Custo de licença | Atenção |
|---|---|---|---|
| Microsoft Entra ID P2 (1 usuário) | Recursos licenciados para identidade de teste | Licença já disponível | Não extrapolar para outros usuários; nem tudo é incluído |
| Active Directory / Entra Connect | Identidade híbrida | Depende das licenças Windows disponíveis | Avaliar direito de uso de Windows Server |
| Keycloak | IdP, OIDC, OAuth 2.0, SAML | Open source | Consome RAM; não expor à internet sem proteção |
| authentik | Fluxos de acesso e aplicações | Edição open source | Alternativa, não executar junto sem necessidade |
| Teleport Community | Acesso a servidores e sessões | Recursos comunitários | Verificar limites da edição e versão |
| OpenBao | Segredos e políticas | Open source | Laboratório isolado; não usar segredos reais |
| midPoint | Provisionamento e IGA | Edição open source | Mais complexo; fase avançada |
| Microsoft Azure | RBAC, identidades de workload e logs | Pode gerar cobranças | Orçamento, alertas e exclusão obrigatórios |

## Perfis de hardware

- **Mínimo/limitado:** executar **um** IdP em contêiner por vez; preferir aplicações de teste locais e sem Azure.
- **Intermediário:** IdP + aplicação de teste + AD já existente, sem manter tudo ligado.
- **Maior capacidade:** ambientes híbridos e observabilidade em VMs separadas.

O dimensionamento exato dependerá de RAM, CPU e SSD do computador. Não presuma capacidade antes de medir.

## Checklist antes de executar

- [ ] Identifique os recursos e a licença exigida.
- [ ] Defina um limite de custo; prefira o ambiente local.
- [ ] Faça backup de configurações e salve versões.
- [ ] Use usuários e segredos fictícios.
- [ ] Não publique tokens, certificados privados ou dados pessoais.
- [ ] Anote como reverter o exercício.
- [ ] Desligue e remova recursos que não serão reutilizados.

## Distinção conceitual

Keycloak ensina padrões de federação, mas não reproduz todos os recursos de Conditional Access do Entra. Teleport Community ensina acesso privilegiado, mas não equivale a um conjunto completo de recursos empresariais de PAM. Simulações de IGA não substituem as capacidades e o licenciamento de plataformas comerciais.
