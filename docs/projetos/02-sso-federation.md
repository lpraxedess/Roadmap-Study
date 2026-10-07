# Projeto — Integração SSO OIDC e SAML

## Cenário e missão

Conectar IdP local e dois tipos de aplicação, documentando confiança, claims e segurança. A organização, usuários, dados e integrações são **fictícios**; não use dados reais de empregadores.

## Definição de pronto

1. Escreva requisitos funcionais e não funcionais, ameaças e limitações de licença.
2. Desenhe arquitetura, fluxo da identidade e fronteiras de confiança.
3. Implemente laboratório aberto ou simulação técnica suficientemente detalhada.
4. Documente autenticação, autorização, accountability, logs e resiliência.
5. Demonstre sucesso e teste negativo. **Cenários:** Redirect incorreto, audience incorreta e certificado expirado (simulação).
6. Valide custos, licenças, reversão, disponibilidade e segregação de funções.
7. Explique ao avaliador duas alternativas e por que escolheu a sua.

## Entregáveis

Diagrama de sequência, configuração sanitizada, teste positivo, três testes negativos, limites de PKCE/SAML. Inclua README específico, capturas sanitizadas, instruções de execução, dependências, versões e lições aprendidas.

## Rubrica (0–4 por critério)

| Critério | 0 | 2 | 4 |
|---|---|---|---|
| Arquitetura | Ausente | Componentes sem justificativa | Fluxos, riscos e decisões justificadas |
| Implementação | Não demonstrada | Parcial | Reproduzível, testada e documentada |
| Segurança | Privilégio excessivo | Controles limitados | Menor privilégio, segredos, auditoria |
| Diagnóstico | Não testado | Uma falha sem análise | Falhas, hipóteses, causa-raiz e correção |
| Operação e custo | Ignorados | Parcial | Monitoramento, recuperação e custos documentados |

**Aprovação:** pelo menos 16/20, sem nota zero em segurança ou implementação. Quando um recurso exigir licença, simulação técnica claramente identificada substitui a execução comercial, sem afirmar equivalência funcional.

## Publicação

O [portfólio](https://github.com/lpraxedess/Projetos) é externo e não será modificado automaticamente; só publique quando desejar.

[Voltar ao currículo](../curriculo.md)
