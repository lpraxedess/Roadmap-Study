# 17 — Secrets: senhas, tokens e identidades de aplicações

**Fase 4 — Governança e privilégios** · **Objetivo:** entender cada conceito e, em seguida, praticá-lo.

> **Regra do curso:** faça no AD ou Entra autorizado quando possível. Operações que exigem licença, aplicativo ou instalação extra só são executadas se já houver o recurso de laboratório. Observação, simulação e implementação real são atividades distintas.

## 1. Segredo de aplicativo

**O que é?** É dado confidencial usado por workload para autenticar, como client secret ou certificado privado.

**Prática — faça agora:**

No Entra → App registrations → **aplicativo de teste existente** → Certificates & secrets. **Observe apenas** metadados e expiração de segredos, nunca copie valores nem crie segredo desnecessário.

**O que você acabou de fazer?** Você identificou o local de gestão e a necessidade de rotação.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Permite inventariar expiração.

**Pontos negativos / riscos:** Segredo vazado pode dar acesso com permissões do aplicativo.

**Fixação:** Por que um client secret não deve ser incluído no Git?

## 2. Service principal e consent

**O que é?** É a identidade da aplicação e o conjunto de permissões efetivas no tenant.

**Prática — faça agora:**

Em App registrations e Enterprise applications **de laboratório**, compare app registration, service principal e API permissions; identifique delegated versus application permissions. Faça consulta somente leitura.

**O que você acabou de fazer?** Você reconheceu identidades humanas e não humanas.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Separação de responsabilidades.

**Pontos negativos / riscos:** Application permissions excessivas podem acessar dados sem usuário.

**Fixação:** O que difere app-only de delegated?

## 3. Rotação e validade

**O que é?** É trocar credenciais antes do vencimento e remover as antigas após migração controlada.

**Prática — faça agora:**

Para um app **fictício**, escreva plano de rotação: inventário → novo segredo/certificado em cofre → atualização do serviço → teste → revogação do anterior. **Não gire credenciais reais** sem aplicação de teste e rollback.

**O que você acabou de fazer?** Você planejou rotação segura; **não** a executou no produto.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Reduz janela de credenciais antigas.

**Pontos negativos / riscos:** Rotação sem validação causa indisponibilidade.

**Fixação:** Em que momento remover a credencial anterior?


## Desafio de fixação

Escolha um **segundo usuário ou aplicativo de laboratório** e repita o processo **sem consultar os passos**. Registre o que realmente executou, qual resultado observou e qual limitação encontrou. Nunca compartilhe tokens ou senhas.

[Trilha por fases](../curriculo.md)
