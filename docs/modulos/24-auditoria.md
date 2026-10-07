# 24 — Auditoria e indicadores

**Nível:** arquitetura · **Formato:** estudo guiado, execução e avaliação · **Custo:** priorize recursos locais e já licenciados.

## Por que aprender

Produzir documentação defensável por auditoria e gestores.

**Assuntos principais:** Controle, evidência, risco residual, SLA e KPI. Este módulo deve ser compreendido em contexto empresarial: quem solicita acesso, quem autoriza, quem opera, quem audita e qual é a consequência de uma falha.

## Como o profissional atua

1. **Descobrir requisitos:** identificar identidade, ativo, nível de privilégio e dono do recurso.
2. **Projetar:** selecionar controle e pré-requisitos, explicando risco e alternativa.
3. **Implementar:** aplicar o menor privilégio com rastreabilidade.
4. **Validar:** provar acesso autorizado e bloqueio não autorizado.
5. **Operar:** registrar logs, procedimentos de recuperação e responsáveis.

## Conceitos a dominar

- **Identidade:** representação de um usuário, serviço ou workload com atributos e ciclo de vida.
- **Autenticação:** prova de controle de um autenticador; não implica autorização.
- **Autorização:** decisão sobre operação permitida, considerando papel, política, contexto e escopo.
- **Auditoria:** registro do que mudou, quando, por quem e com qual resultado.
- **Privilégio mínimo:** conceder apenas acesso necessário, pelo menor tempo e escopo.
- **Aplicação nesta aula:** Controle, evidência, risco residual, SLA e KPI.

## Laboratório orientado

**Objetivo:** Produzir documentação defensável por auditoria e gestores.

**Preparação:** escolha ambiente isolado, identidades fictícias, documente versões e restauração. Verifique se há licença, subscrição ou risco de cobrança. Se não houver acesso, substitua por simulação com dados fictícios, mantendo as verificações conceituais.

1. Registre o estado inicial com diagrama, identidade de teste e requisitos.
2. Execute ou adapte o seguinte ponto de partida ao seu laboratório, **sem copiar placeholders literalmente**:

```text
Defina KPIs: contas órfãs, desprovisionamento no prazo, privilégios permanentes, cobertura MFA.
```

3. Configure apenas o mínimo necessário, com permissões reduzidas.
4. Faça o **teste positivo**: operação autorizada, resultado previsto e evento/auditoria correspondente.
5. Execute **teste negativo controlado**: Introduza três exceções fictícias com owners e prazo de correção.
6. Registre horário, status, mensagem de erro, causa e solução.
7. Reverta as alterações e confirme o estado final.

## Como diagnosticar

Para qualquer falha, siga **identidade → autenticação → política → autorização → aplicação/recurso → logs**. Determine o estágio exato do erro antes de alterar permissões. Classifique 401 (autenticação), 403 (autorização), indisponibilidade, configuração incorreta ou problema de sincronização conforme o contexto. Um erro de acesso não deve ser resolvido concedendo privilégio amplo sem análise.

## Evidências para aprovação

Matriz controle→risco→teste→evidência→responsável.

**Desafio sem roteiro:** reproduza o cenário com novos usuários fictícios e explique o resultado sem consultar esta página.

| Critério | Evidência exigida |
|---|---|
| Explicação | Fluxo, componentes e justificativa do controle |
| Implementação | Configuração ou simulação reproduzível |
| Validação | Sucesso e falha intencional documentados |
| Segurança | Menor privilégio, credenciais protegidas, reversão |
| Autonomia | Diagnóstico sem instruções passo a passo |

Aprovação requer todos os critérios, não somente capturas da interface.

## Segurança e limitações

Evitar alegar conformidade regulatória sem auditoria real. Métrica precisa de fonte e periodicidade. Consulte [custos e licenciamento](../laboratorios-e-custos.md) antes de qualquer recurso pago.

## Conexão com o portfólio

Registre scripts, arquitetura, decisões e evidências sanitizadas **somente quando optar por publicar**. O [repositório Projetos](https://github.com/lpraxedess/Projetos) é referência externa e não é alterado por este curso.

[Voltar ao currículo](../curriculo.md)
