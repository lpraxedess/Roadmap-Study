# 10 — Microsoft Graph: mínimo privilégio

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

Microsoft Graph oferece API para objetos Microsoft; scopes delegados e permissões app-only têm riscos diferentes.

**Onde aparece no trabalho:** Preciso consultar a própria conta, sem ler todos os usuários.

**Ao terminar você fará:** Demonstre `User.Read` sem solicitar permissões de diretório amplas.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Automação auditável e integrações padronizadas.

**Ponto negativo / risco:** Consentimento excessivo e tokens expostos viram risco.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

PowerShell e Microsoft Graph SDK; identidade de laboratório autorizada.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** Use `Connect-MgGraph -Scopes 'User.Read'`; rode `Invoke-MgGraphRequest -Method GET -Uri 'https://graph.microsoft.com/v1.0/me'`; depois `Get-MgContext` e `Disconnect-MgGraph`. Consulte [lab Graph](../labs/04-graph-readonly.md).
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** API retorna objeto da própria conta; a consulta não precisa `User.Read.All`.

## 5. Quebre de propósito (apenas laboratório)

Com apenas `User.Read`, consulte `/users` em ambiente de teste e registre eventual 403, sem pedir consentimento extra.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Registre diferença entre delegated e application permissions e quando usar managed identity.

## 7. Fixação ativa

**Antes de marcar concluído**, responda à pergunta interativa exibida no final desta aula. Justifique a escolha em uma frase e confira a explicação. A atividade é uma verificação conceitual; a competência prática exige executar e diagnosticar o laboratório.

## 8. Evidência mínima (5 itens)

- [ ] Consigo explicar o conceito e **por que usar**.
- [ ] Enumero uma vantagem e uma limitação real.
- [ ] Executei a prática (ou identifiquei explicitamente uma simulação).
- [ ] Fiz teste negativo e expliquei a causa.
- [ ] Reverti o estado e consigo repetir sem o roteiro.

**Critério:** só declare prática concluída quando houver resultados observados. O botão do portal registra estudo pessoal; não é uma certificação.

[Ir ao currículo](../curriculo.md) · [Guia do aluno](../guia-do-aluno.md)
