# 04 — AD + Entra: origem autoritativa e sincronização

**Fase 1 — AD e Entra** · **Objetivo:** aprender e executar cada conceito com verificação imediata.

> **Ambiente:** AD/Entra já disponível, de laboratório e autorizado. Nem todos os conceitos exigem alteração. Quando o recurso/licença não existe, o exercício é **observação/análise**, não configuração executada.

## 1. Fonte autoritativa

**O que é?** É o sistema responsável por manter determinado atributo de uma identidade.

**Prática — faça agora:**

No AD de teste, identifique um usuário sincronizado já existente; no Entra abra o mesmo objeto e procure On-premises sync enabled. Compare Department e UPN **sem modificar nada**.

**O que você acabou de fazer?** Você encontrou onde o atributo deve ser administrado.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Evita divergência e duplicidade.

**Pontos negativos / riscos:** Tentar editar na nuvem atributo controlado no AD pode falhar ou ser sobrescrito.

**Fixação:** Qual é a origem do atributo Department neste cenário?

## 2. Sincronização

**O que é?** Transporta alterações configuradas entre diretórios; não equivale a login ou autorização.

**Prática — faça agora:**

Somente se existir sincronizador de laboratório e você tiver autorização: altere Department de conta fictícia no AD, anote hora, aguarde ciclo já previsto e confira atributo no Entra. Se não existir integração, estude logs e declare que a prática não foi executada.

**O que você acabou de fazer?** Você validou (ou identificou impedimento para validar) a propagação de atributo.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Reduz recadastro manual.

**Pontos negativos / riscos:** Escopo de OU e ciclos de sync podem atrasar mudanças.

**Fixação:** Usuário não atualizou na nuvem: quais três pontos verificar antes de recriar?

## 3. Desligamento híbrido

**O que é?** A origem pode desabilitar identidade, mas sessões cloud já emitidas precisam de tratamento separado.

**Prática — faça agora:**

Em cenário fictício, descreva: bloquear no AD → confirmar sincronização → verificar Account enabled no Entra → avaliar revogação de sessões. Execute bloqueio somente em conta **criada para o laboratório**.

**O que você acabou de fazer?** Você separou estado da conta e validade das sessões.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Reduz contas ativas após saída.

**Pontos negativos / riscos:** Não garante invalidação instantânea de cada token já emitido.

**Fixação:** Por que bloquear no AD não encerra automaticamente todas as sessões SaaS?


## Desafio da aula

Sem copiar os passos, reproduza o conceito em **outra identidade fictícia**, ou analise outro aplicativo de teste quando a aula for de leitura. Registre **o que fez, o que encontrou, qual falha observou e como verificou**. Nunca salve senhas/tokens.

**Conclua somente após explicar a teoria e demonstrar o resultado observado.** O quiz do portal ajuda a revisar, mas não substitui a prática.

[Trilha por fases](../curriculo.md)
