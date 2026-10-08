# 18 — Azure IAM: RBAC e identidades gerenciadas

**Fase 5 — Cloud e defesa** · **Objetivo:** compreender cada conceito e executar um exercício com resultado verificável.

> **Regra:** AD/Entra são as ferramentas principais. Casos que dependem de Azure, AWS, licenças ou app específico só são práticos quando você já tem o ambiente. Simulação e observação **não equivalem** a instalação real.

## 1. Azure RBAC

**O que é?** É o mecanismo que combina **principal + role + escopo** para acesso a recursos Azure.

**Prática — faça agora:**

Se possuir assinatura de laboratório **existente**, no portal.azure.com abra um Resource Group → Access control (IAM) → View my access; anote principal, role e escopo **sem alterar**. Se não tiver assinatura, use os exemplos no papel e declare análise.

**O que você acabou de fazer?** Você identificou qual permissão é aplicada ao recurso e em qual escopo.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Concede somente o necessário em cada nível.

**Pontos negativos / riscos:** Role Owner ampla pode dar controle além da necessidade.

**Fixação:** Qual diferença entre Reader no grupo de recursos e Global Reader do Entra?

## 2. Atribuição de função

**O que é?** É conceder uma role a identidade em escopo específico.

**Prática — faça agora:**

Somente em grupo de recursos **de teste já criado** e com permissão adequada: Access control (IAM) → Add role assignment → Reader → selecione usuário fictício → Review + assign. Registre antes/depois; depois remova **somente a atribuição criada**.

**O que você acabou de fazer?** Você atribuiu Reader ao grupo de recursos, sem conceder permissão de alteração.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Menor privilégio reduz impacto.

**Pontos negativos / riscos:** Atribuição no escopo superior pode propagar a outros recursos.

**Fixação:** O usuário Reader pode excluir recurso?

## 3. Managed identity

**O que é?** É identidade gerida pelo Azure para um workload suportado, sem segredo de cliente administrado manualmente.

**Prática — faça agora:**

Se já houver app/VM de teste com Managed identity habilitada, abra Identity e anote System-assigned / User-assigned e seu principal ID. **Não provisionar VM paga só para esta aula.** Compare com App registrations → Certificates & secrets.

**O que você acabou de fazer?** Você identificou workload identity; sem serviço existente, a atividade foi observação conceitual.

**Importância:** saber quando usar este conceito no trabalho de IAM e como medir seu resultado.

**Pontos positivos:** Reduz necessidade de segredo armazenado.

**Pontos negativos / riscos:** Ainda precisa da role correta e ciclo de vida apropriado.

**Fixação:** Managed identity dá acesso a tudo por padrão?


## Desafio da fase

Repita um dos exercícios em **outro objeto fictício** ou caso de teste, sem consultar o passo a passo. Explique as decisões e os limites do que realmente foi executado. Não use contas reais nem capture senhas ou tokens.

[Trilha por fases](../curriculo.md)
