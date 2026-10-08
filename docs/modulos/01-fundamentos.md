# 01 — Fundamentos de identidade: o que é login, grupo e permissão?

**Fase 1 — AD e Entra** · **30–50 minutos** · **Ambiente:** AD DS ou Microsoft Entra ID existente · **Não precisa Docker/Python**.

## 1. Entenda o essencial

- **Identidade:** o registro de quem ou o que está acessando (usuário, serviço, dispositivo).
- **Autenticação:** confirma que o usuário é quem diz ser (senha, MFA, certificado etc.).
- **Autorização:** decide o que ele pode fazer **depois** de autenticado (grupos, roles, ACLs e políticas).
- **Grupo:** organiza identidades para atribuir acesso de modo administrável.
- **Menor privilégio:** conceder somente o acesso necessário, no escopo correto.

**Por que isso existe?** Uma senha válida não deve abrir qualquer recurso. Separar autenticação de autorização evita acesso excessivo. **Ponto positivo:** controle e auditoria. **Limitação:** grupos mal configurados podem continuar dando acesso desnecessário.

## 2. Veja na ferramenta que você já usa

**Se tiver AD DS:** abra **Executar → dsa.msc**. No domínio de laboratório, abra um usuário de teste → **Propriedades → Conta** e depois **Membro de**. Anote separadamente o nome do logon, a condição de conta habilitada e as associações de grupo. **Não edite nenhum objeto nesta primeira atividade.**

**Se tiver Entra ID:** acesse https://entra.microsoft.com → **Entra ID → Users → All users** → escolha uma conta fictícia/permitida → observe o estado da conta e a lista de grupos. Depois entre em **Entra ID → Roles and administrators** e veja que roles administrativas não são simplesmente grupos comuns.

**O que conferir:** identidade existe, há atributos e grupos, mas isso **não prova** que ela tenha permissão em toda aplicação. Um app precisa usar essas informações em sua própria política.

## 3. Teste de raciocínio

Cenário: João autentica corretamente, porém não consegue acessar a pasta do Financeiro. Investigue o recurso e os grupos/ACLs, **não redefina a senha como primeira ação**.

Responda: qual foi a autenticação, qual seria a autorização e que evidência você consultaria?

**Desafio:** explique a diferença entre usuário, grupo, papel e permissão com um exemplo de help desk. Não altere senhas ou permissões reais.

**Próximo:** [02 — Active Directory](02-ad.md) ou [03 — Microsoft Entra](03-entra.md).
