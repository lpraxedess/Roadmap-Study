# Laboratório 05 — JML com AD ou Microsoft Entra (sem Docker)

**Prática principal:** [módulo 05 — JML completo no AD/Entra](../modulos/05-jml.md). Escolha seu ambiente disponível, não instale outra plataforma.

| Ambiente | Onde administrar | Operações reais |
|---|---|---|
| AD DS de laboratório | \`dsa.msc\` | Criar usuário e grupos, alterar membership, desabilitar e opcionalmente excluir |
| Entra ID de laboratório | \`entra.microsoft.com\` | Criar usuário cloud-only e grupos, alterar membership, bloquear login e opcionalmente excluir |
| AD sincronizado | Origem on-prem e verificação cloud | Fazer alterações na origem, monitorar sync e tratar sessões cloud |

## Checklist guiado

1. [ ] Conferi permissões e ambiente de laboratório.
2. [ ] Criei \`JML-Financeiro\` e \`JML-TI\`.
3. [ ] **Joiner:** criei \`joao.jml\` e o adicionei a Financeiro.
4. [ ] **Mover:** retirei Financeiro e adicionei TI.
5. [ ] **Leaver:** desabilitei o usuário e verifiquei resultado.
6. [ ] Testei falha de grupos duplicados **apenas nos grupos do lab**.
7. [ ] Registrei evidência e decisão de retenção.
8. [ ] Repeti com outro usuário de laboratório sem roteiro.

**Atenção:** se o usuário for sincronizado AD→Entra, gerencie-o na origem on-prem. **Exclusão não é o primeiro passo do desligamento.**

[Executar tutorial com cliques e validações](../modulos/05-jml.md) · [Automatização posterior](07-jml-python.md)
