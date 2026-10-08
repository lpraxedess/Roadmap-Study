# 10 — Microsoft Graph: API do Entra com menor privilégio

**Fase 3 — Automação IAM** · **Objetivo:** entender cada conceito e, em seguida, praticá-lo.

> **Regra do curso:** faça no AD ou Entra autorizado quando possível. Operações que exigem licença, aplicativo ou instalação extra só são executadas se já houver o recurso de laboratório. Observação, simulação e implementação real são atividades distintas.

## 1. Microsoft Graph

**O que é?** É API que dá acesso programático a identidades e outros recursos Microsoft conforme permissões.

**Prática — faça agora:**

No PowerShell de **seu laboratório**, rode `Install-Module Microsoft.Graph -Scope CurrentUser` (quando ainda não instalado); depois `Connect-MgGraph -Scopes 'User.Read'`, faça `Get-MgContext` e `Invoke-MgGraphRequest -Method GET -Uri 'https://graph.microsoft.com/v1.0/me'`. Termine com `Disconnect-MgGraph`.

**O que você acabou de fazer?** Você leu **seu próprio perfil** via API delegada.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Elimina consultas manuais repetitivas.

**Pontos negativos / riscos:** Scopes excessivos expõem outros usuários.

**Fixação:** Por que `/me` é melhor exercício inicial que listar todo o diretório?

## 2. Permissões delegadas

**O que é?** A API opera em nome do usuário autenticado, limitada por escopos e permissões efetivas.

**Prática — faça agora:**

Ainda com `User.Read`, tente **somente** consulta GET `https://graph.microsoft.com/v1.0/users` em ambiente autorizado. Caso retorne 403, anote status e não peça `User.Read.All` só para concluir.

**O que você acabou de fazer?** Você investigou diferença entre leitura própria e leitura global; o resultado depende da configuração.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Permite limitar operações ao contexto necessário.

**Pontos negativos / riscos:** Consentimento excessivo pode ampliar impacto do token.

**Fixação:** Como investigar HTTP 403 sem atribuir função Global Administrator?

## 3. Auditoria de acesso à API

**O que é?** Registrar operação, status e contexto permite investigar falhas.

**Prática — faça agora:**

Faça duas chamadas somente leitura `/me`; registre horário, URI e status sem copiar access token. Compare log da aplicação, se acessível, com resultado da API.

**O que você acabou de fazer?** Você separou evidência segura de credenciais sensíveis.

**Importância:** entender como esta etapa contribui para controle e segurança de identidades.

**Pontos positivos:** Facilita troubleshooting.

**Pontos negativos / riscos:** Logs com bearer token podem virar vazamento.

**Fixação:** Quais dados você jamais salvaria no repositório?


## Desafio de fixação

Escolha um **segundo usuário ou aplicativo de laboratório** e repita o processo **sem consultar os passos**. Registre o que realmente executou, qual resultado observou e qual limitação encontrou. Nunca compartilhe tokens ou senhas.

[Trilha por fases](../curriculo.md)
