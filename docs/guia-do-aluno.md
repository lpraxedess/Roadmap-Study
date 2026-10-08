# Guia para estudar no Roadmap-Study

**Princípio:** você não precisa aprender instalando uma coleção de ferramentas. Primeiro vai trabalhar com **Active Directory e Entra ID**, que são o foco da formação. Depois escolherá somente o que faltar.

## Como funciona uma fase

Cada fase contém temas em ordem. Em cada tema, siga o roteiro:

1. **O que é:** definição direta.
2. **Por que existe e onde usar:** exemplo de tarefa IAM.
3. **Pontos positivos e negativos:** o que resolve e quais riscos mantém.
4. **Fazer na prática:** em AD/Entra, com os caminhos da interface e pré-requisitos explícitos.
5. **Conferir:** verifique se o usuário/grupo/permissão mudou.
6. **Quebrar de propósito:** erro controlado e reversível, em laboratório.
7. **Resolver:** investigar e corrigir.
8. **Fixar:** responder ao quiz e repetir o cenário com outro usuário fictício.

## Primeiro desafio: JML no seu ambiente

Na [Fase 1, módulo 05](modulos/05-jml.md) você criará João e os grupos JML-Financeiro e JML-TI no **AD ou Entra**. Executará Joiner, Mover e Leaver, com checagem em cada etapa. **Não requer Docker, Python nem Keycloak**.

## Ambiente e permissões

- Faça apenas no laboratório. Se possuir **AD local**: execute com conta de administração delegada na OU de testes.
- Se possuir apenas **Microsoft Entra**: crie usuário **cloud-only**, use grupos de segurança atribuídos e gerencie-os pelo painel.
- Se o usuário é **sincronizado do AD**: a fonte principal é on-prem; não crie um cloud-only duplicado.
- Não use contas reais, não afete grupos de produção e não atribua Global Administrator por conveniência.
- Nem toda atividade precisa de licença P2; recursos de Governance, PIM e Azure têm requisitos próprios.

**Fase concluída:** você consegue explicar, executar, verificar o que mudou e repetir sem copiar o roteiro. O botão “concluído” do site registra apenas seu estudo; não prova execução em tenant.
