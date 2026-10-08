# 05 — Joiner, Mover, Leaver (JML)

**Fase 1 — AD e Entra** · **Objetivo:** aprender e executar cada conceito com verificação imediata.

> **Ambiente:** AD/Entra já disponível, de laboratório e autorizado. Nem todos os conceitos exigem alteração. Quando o recurso/licença não existe, o exercício é **observação/análise**, não configuração executada.

## 1. JOINER — entrada

**O que é?** É admitir uma pessoa no diretório e conceder o acesso inicial aprovado.

**Prática — faça agora:**

**No AD:** dsa.msc → OU de teste → New → User: joao.jml; crie grupo Security JML-Financeiro e adicione João em Member Of. **Ou no Entra:** Users → New user → Create new user em domínio verificado; Groups → New group → Security/Assigned JML-Financeiro → Members → Add members → João. Escolha **um** ambiente; nunca toque em usuários reais.

**O que você acabou de fazer?** Você criou uma identidade e deu o primeiro grupo de trabalho. Confira João habilitado e presente em JML-Financeiro.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Ingresso controlado e rastreável.

**Pontos negativos / riscos:** Grupo desnecessário ou errado concede associações excessivas.

**Fixação:** Qual evidência prova que João ingressou corretamente?

## 2. MOVER — movimentação

**O que é?** É atualizar função e acessos quando alguém muda de área, **sem acumular acesso antigo**.

**Prática — faça agora:**

Em AD (Properties → Member Of) **ou** Entra (Groups → Members), retire joao.jml de JML-Financeiro. Crie JML-TI e adicione João. Abra os dois grupos e confira: presente em TI, **ausente no Financeiro**. Opcional: atualize Department do objeto cloud-only/AD onde for autoritativo.

**O que você acabou de fazer?** Você moveu a identidade entre grupos, preservando a conta.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Mantém menor privilégio após mudança de função.

**Pontos negativos / riscos:** Esquecer grupo anterior causa privilege creep; remover grupo necessário pode interromper trabalho.

**Fixação:** O que acontece se João permanecer simultaneamente em Financeiro e TI?

## 3. LEAVER — desligamento

**O que é?** É impedir uso indevido após saída e seguir retenção antes de excluir.

**Prática — faça agora:**

**AD:** dsa.msc → joao.jml → Disable Account. **Entra:** Users → joao.jml → Block sign-in / Account enabled = No; onde houver, Revoke sessions. Confirme conta desabilitada. Novo login deve falhar quando for seguro testar. **Excluir é opcional**, apenas conta fictícia e após decidir retenção.

**O que você acabou de fazer?** Você desabilitou a identidade; isso não garante encerramento imediato de tokens existentes.

**Importância:** aprender a ligar um conceito de IAM a uma ação verificável do dia a dia.

**Pontos positivos:** Reduz risco de acesso após saída.

**Pontos negativos / riscos:** Excluir cedo demais pode remover evidências/dados; sessões pré-existentes exigem tratamento.

**Fixação:** Qual a diferença entre desabilitar e excluir uma identidade?


## Desafio da aula

Sem copiar os passos, reproduza o conceito em **outra identidade fictícia**, ou analise outro aplicativo de teste quando a aula for de leitura. Registre **o que fez, o que encontrou, qual falha observou e como verificou**. Nunca salve senhas/tokens.

**Conclua somente após explicar a teoria e demonstrar o resultado observado.** O quiz do portal ajuda a revisar, mas não substitui a prática.

[Trilha por fases](../curriculo.md)
