# 05 — Joiner, Mover, Leaver: gerencie um usuário de verdade

**Tempo:** 90–150 min · **Ferramenta:** Keycloak local · **Custo:** gratuito · **Pré-requisitos:** Docker instalado e funcionando · **Tipo de prática:** operação real de contas no diretório do laboratório

## 1. Entenda antes de clicar

**Joiner:** admissão. Criar a identidade e entregar apenas os acessos aprovados.

**Mover:** mudança de função ou departamento. Conceder acesso novo **e revogar o antigo**.

**Leaver:** saída. Impedir novas autenticações, encerrar sessões, remover acessos e seguir a política de retenção antes de excluir dados.

**Por que existe?** Uma conta ativa de ex-funcionário e permissões acumuladas após movimentações aumentam a exposição a incidentes. O ciclo JML controla o acesso do nascimento ao desligamento.

| Vantagem | Risco ou limitação |
|---|---|
| Menos contas órfãs | Falhas ou atrasos de RH podem impedir revogação |
| Menor privilégio por função | Grupos mal desenhados propagam privilégios excessivos |
| Auditoria de mudanças | Desabilitar conta não remove necessariamente sessões e tokens já emitidos |
| Base para automação | Automação sem teste pode errar em grande escala |

**Cenário da aula:** João entra no Financeiro, muda para TI e depois sai da empresa. Você será o operador de IAM responsável.

## 2. Preparar — faça exatamente isto

**Não use o tenant corporativo.** Aqui você criará contas reais *dentro do Keycloak de teste*, não no AD nem no Entra.

1. Instale [Docker Desktop](https://docs.docker.com/get-started/get-docker/) ou Docker Engine. Abra um terminal e execute `docker --version` e `docker info`. Se o segundo falhar, inicie o Docker antes de continuar.
2. Execute o contêiner abaixo **somente no computador local**. Use uma senha fictícia exclusiva para o laboratório, alterando o valor do exemplo:

```bash
docker run --name iam-jml-lab --rm -p 127.0.0.1:8080:8080 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD='Senha-Local-Apenas-Lab-123!' \
  quay.io/keycloak/keycloak:26.0.7 start-dev
```

3. Espere a mensagem indicando inicialização. No navegador abra `http://localhost:8080/admin/`.
4. Entre com `admin` e a senha de laboratório do comando. **Não use esse modo em produção**: `start-dev` não é protegido como uma instalação de produção. A versão do exemplo é uma referência de laboratório; menus podem variar.
5. No seletor de realm (canto superior do console), escolha **Create realm**, digite `iam-lab` e confirme **Create**. Se já existir, selecione-o.
6. Para observar o comportamento de autenticação, em **Realm settings → Events** habilite eventos de usuário, quando disponíveis na versão, e salve. Não habilite logging de informações sensíveis.

**Conferência:** o canto do painel mostra realm `iam-lab). Você administra o realm do laboratório, e não `master`.

## 3. Prepare os acessos: crie dois grupos

1. No menu do realm `iam-lab`, entre em **Groups** e escolha **Create group**.
2. Nomeie `Financeiro` e salve.
3. Repita para `TI`.
4. Confirme que ambos aparecem em **Groups**.

**O que isso prova?** Os grupos existem. **Atenção:** pertencer a um grupo, sozinho, não prova autorização em uma aplicação. Para isso seria necessário vincular o grupo a papéis/políticas de uma aplicação de teste — exercício posterior de SSO e autorização.

## 4. JOINER — admissão de João

**Ticket RH-100:** “Admitir João no Financeiro”.

1. Entre em **Users → Add user** (ou **Create new user**, conforme a interface).
2. Defina **Username:** `joao.lab`; **First name:** `Joao`; **Last name:** `Laboratorio`; **Email:** `joao.lab@example.invalid`.
3. Mantenha **Enabled** ativo, confirme a criação.
4. Abra o usuário e vá à aba **Credentials**. Escolha **Set password**; defina uma senha fictícia exclusiva de teste. Para testar login imediatamente, desmarque **Temporary** se a interface oferecer essa escolha, e confirme.
5. Abra a aba **Groups** do usuário, selecione **Join group** e escolha `Financeiro`. Confirme.
6. Verifique que **Enabled** está ligado e que `Financeiro` aparece em seus grupos.

**Teste real de autenticação:** em janela anônima abra `http://localhost:8080/realms/iam-lab/account/`. Entre como `joao.lab` com a senha fictícia. Se a página pedir completar perfil ou ações obrigatórias, finalize-as somente para o usuário do lab. Se conseguir entrar, o Joiner está validado.

**Evidência:** conta habilitada, grupo `Financeiro`, autenticação bem-sucedida (sem exibir senha).

## 5. MOVER — João foi transferido para TI

**Ticket RH-101:** “Mover João do Financeiro para TI; não manter acesso antigo”.

1. Volte ao painel de administração como `admin`.
2. Entre em **Users**, pesquise `joao.lab` e abra o registro.
3. Na aba **Groups**, localize `Financeiro` e use **Leave** ou **Leave group**, confirmando a remoção.
4. Na mesma aba, escolha **Join group** e selecione `TI`.
5. Atualize o atributo de departamento, se ele existir no seu esquema; caso não exista, registre essa limitação e mantenha a avaliação pelos grupos.
6. Confirme que **TI aparece** e **Financeiro não aparece** nos grupos de João.

**Teste negativo:** se João continuar em ambos os grupos, a movimentação está incorreta. Remova o grupo antigo e confira novamente. **Não** faça apenas a inclusão do grupo `TI`.

**Evidência:** comparação dos grupos antes e depois; ticket RH-101; sem privilégios antigos.

## 6. LEAVER — desligamento e revogação

**Ticket RH-102:** “João saiu. Impedir novos acessos imediatamente”.

1. Abra **Users → joao.lab → Details**.
2. Altere **Enabled** para **Off** e salve.
3. Vá à aba **Sessions** desse usuário (se disponível) e use a ação equivalente a **Sign out all sessions / Logout all**, confirmando. Se a função não existir na versão usada, registre a limitação — não assuma que desativar encerra tokens existentes.
4. No navegador anônimo, feche a sessão do laboratório e tente **novo login** em `http://localhost:8080/realms/iam-lab/account/` com `joao.lab`.
5. **Resultado esperado:** a nova autenticação falha. Se ainda estiver autenticado por uma sessão antiga, diferencie essa situação de um novo login e investigue sessões e tempo de vida dos tokens.
6. No console administrativo, abra os eventos do realm e registre data, usuário fictício e status do login (sem divulgar segredos).

**Desabilitar x excluir:** o desligamento normalmente começa com bloqueio e revogação; excluir imediatamente pode eliminar vínculos ou evidências necessárias. Siga uma política de retenção, mesmo no exercício.

### Exercício opcional de exclusão definitiva — somente conta fictícia

Depois de registrar as evidências e confirmar que `joao.lab` é do laboratório, em **Users → joao.lab** localize a ação **Delete** e confirme. Pesquise novamente: o usuário não deve existir. **Não execute isso em outros usuários ou no realm master.**

## 7. Troubleshooting — encontre a causa, não adivinhe

| Sintoma | Verificação | Correção |
|---|---|---|
| Login de João falha logo após Joiner | Enabled, senha, ações obrigatórias, realm e eventos | Corrigir credencial de teste ou estado do usuário |
| João está em Financeiro e TI | Aba Groups | Remover o grupo antigo |
| Conta desabilitada ainda aparece logada | Sessões existentes e duração de tokens | Revogar sessões quando disponível e conferir renovação |
| Tela administrativa não abre | `docker ps`, porta 8080 e logs | Conferir processo e contêiner |
| “Nenhuma permissão mudou no aplicativo” | Grupos não são autorização automática | Configurar role e integração de aplicativo em aula posterior |

**Comandos de diagnóstico** (no terminal, contêiner em execução):

```bash
docker ps
docker logs iam-jml-lab --tail 50
```

## 8. Desafio independente — Maria

Sem consultar os passos anteriores, faça o ciclo com `maria.lab`: Joiner em `TI`, Mover para `Financeiro`, Leaver por desativação. Confirme cada etapa. **Não exclua Maria até terminar a investigação e registrar evidências.**

## 9. Como comprovar que aprendeu

- [ ] Sei explicar Joiner/Mover/Leaver e por que existem.
- [ ] Criei um usuário real no Keycloak do laboratório e testei login.
- [ ] Troquei seus grupos sem manter a associação antiga.
- [ ] Desativei o usuário, tratei sessões e neguei um novo login.
- [ ] Diferencio desabilitar de excluir e sei quando cada ação é adequada.
- [ ] Repeti com Maria sem roteiro.

**Somente depois deste laboratório:** [simulação de automação JML com Python](../labs/07-jml-python.md). Ela ensina planejamento e validação de dados; não substitui a operação manual executada aqui.

## 10. Limpeza do ambiente

Se não quiser preservar as contas locais: pressione **Ctrl+C** no terminal do Keycloak; `--rm` remove o contêiner e, sem volumes de dados, descarta a configuração. **Não execute este comando em um contêiner compartilhado com outros laboratórios.**

[Voltar à trilha](../curriculo.md)
