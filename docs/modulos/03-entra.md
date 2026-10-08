# 03 — Microsoft Entra ID: usuários, grupos e papéis

**Fase 1 — AD e Entra** · **50–80 minutos** · **Requer:** tenant de laboratório e função com permissão para administrar usuários e grupos. **Não requer PIM ou Docker.**

## 1. O que é e por que usar?

O **Microsoft Entra ID** mantém identidades na nuvem e atende autenticação e autorização de aplicações integradas. **Security group** reúne usuários. **Entra directory role** concede capacidade administrativa sobre o diretório. **Azure RBAC** concede acesso a recursos de uma assinatura no escopo adequado: **são controles distintos**.

**Vantagens:** identidade centralizada e integração com SaaS. **Desafios:** excesso de funções, atribuições herdadas, licenciamento de serviços e diferença entre grupo, papel e permissão.

## 2. Faça no portal Entra

1. Abra [entra.microsoft.com](https://entra.microsoft.com) no **tenant de laboratório**.
2. Em **Entra ID → Groups → All groups → New group**, crie `IAM-Treino-Leitura` com **Group type = Security** e **Membership type = Assigned**.
3. Em **Entra ID → Users → All users → New user → Create new user**, crie a identidade *cloud-only* `aluno.entra` em um **domínio verificado** do tenant. Use nome fictício, uma senha inicial exclusiva e não atribua funções administrativas.
4. Volte em **Groups → IAM-Treino-Leitura → Members → Add members** e selecione esse usuário.
5. Confirme **presença em Members**, além de visualizar as associações na página do usuário.
6. Abra **Entra ID → Roles and administrators** e **observe** a diferença entre *role* administrativa e *grupo* — não conceda nova role neste exercício.

**Resultado esperado:** usuário cloud-only presente no grupo e sem privilégios administrativos extras. **Atenção:** associação ao grupo não dá acesso efetivo a um aplicativo que não use esse grupo.

## 3. Teste negativo e correção

No grupo **de laboratório**, remova o usuário em **Members → Remove member**. Confira que a conta continua existindo; apenas sua associação mudou. Adicione-o novamente.

Se a ação não estiver disponível, confira **função administrativa e propriedade do grupo**. Não atribua Global Administrator apenas para seguir o exercício.

## 4. Desafio e limpeza

Crie outro usuário fictício e repita a associação. Descreva quando usar um grupo, quando usar uma role do Entra e quando usar Azure RBAC.

A exclusão da conta do laboratório é opcional e deve obedecer ao cuidado de verificar o usuário antes de confirmar.

**Se o usuário for sincronizado do AD, não edite atributos controlados na origem nem crie conta duplicada.** Use a [aula 04](04-hibrido.md) e depois a [aula 05 JML](05-jml.md).

[Microsoft Learn — Criar usuários no Entra](https://learn.microsoft.com/pt-br/entra/fundamentals/how-to-create-delete-users)
