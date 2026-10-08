# 12 — Python e APIs: automatizar com segurança

**Fase 3 — Automação IAM** · **Objetivo:** entender cada conceito e, em seguida, praticá-lo.

> **Regra do curso:** faça no AD ou Entra autorizado quando possível. Operações que exigem licença, aplicativo ou instalação extra só são executadas se já houver o recurso de laboratório. Observação, simulação e implementação real são atividades distintas.

## 1. JSON em APIs

**O que é?** É formato de dados usado para enviar e receber identidades em APIs.

**Prática — faça agora:**

Sem instalar produto IAM extra, execute `python -c "import json; print(json.loads('{\"active\": false}'))"`. Depois crie `usuario.json` com `userName` fictício e `active` booleano. Confirme que JSON usa `false`, não `False`.

**O que você acabou de fazer?** Você interpretou payload que APIs IAM enviam.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Padroniza integração entre sistemas.

**Pontos negativos / riscos:** Campos mal mapeados podem conceder ou revogar acesso indevido.

**Fixação:** Qual a diferença entre JSON `false` e uma string `'false'`?

## 2. Status HTTP

**O que é?** O retorno 201/400/403/409 indica sucesso ou categoria de falha.

**Prática — faça agora:**

Use [Lab 09 SCIM mock](../labs/09-scim-mock.md): crie usuário com POST (201), repita o mesmo cadastro (409) e omita `userName` (400). Anote causa de cada resposta.

**O que você acabou de fazer?** Você executou requisições HTTP em API de laboratório, sem mexer no Entra.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Facilita tratamento de erros em automações reais.

**Pontos negativos / riscos:** Repetir erro permanente sem análise pode causar bloqueios.

**Fixação:** Quando faz sentido retry e quando corrigir o payload?

## 3. Automatização do JML

**O que é?** É traduzir Joiner/Mover/Leaver conhecido para operação de API segura.

**Prática — faça agora:**

Após executar [aula 05](05-jml.md), rode `python scripts/jml_dry_run.py scripts/dados-exemplo.csv` na raiz do repositório. Confira JSON gerado e entenda **DRY_RUN_ONLY**. Não confunda saída proposta com conta criada.

**O que você acabou de fazer?** Você fez **somente planejamento de mudanças**; a operação real foi na aula 05.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Permite validar entradas antes de escrita massiva.

**Pontos negativos / riscos:** Dry-run não confirma permissões nem efetiva revogação.

**Fixação:** Que operação estaria faltando para transformar plano em alteração real?


## Desafio de fixação

Escolha um **segundo usuário ou aplicativo de laboratório** e repita o processo **sem consultar os passos**. Registre o que realmente executou, qual resultado observou e qual limitação encontrou. Nunca compartilhe tokens ou senhas.

[Trilha por fases](../curriculo.md)
