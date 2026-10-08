# Guia do aluno — aprender IAM executando

**Ordem em cada módulo:** conceito (3 min) → por que existe → vantagens/limites → preparar → **executar em software real quando viável** → verificar → provocar falha controlada → corrigir → desafio sem roteiro.

O fato de uma aula possuir um comando, CSV ou tabela **não a torna um laboratório real**. Identifique sempre o tipo de exercício:

| Tipo | O que comprova |
|---|---|
| Operação real em software local | Objetos e configurações efetivamente criados/alterados no serviço de laboratório |
| Operação Microsoft | Configuração e logs vistos em tenant/assinatura autorizados e licenciados |
| Simulação offline | Entendimento do processo e tratamento de dados, **não** provisionamento real |
| Desenho arquitetural | Capacidade de justificar decisão, ainda sem implantação |

**Comece pela [aula 05 JML](modulos/05-jml.md)** para experimentar a diferença entre gerenciar identidades manualmente no Keycloak e gerar planos de alteração em Python.

## Critério de conclusão

1. Explique o conceito e o benefício em suas palavras.
2. Registre pré-requisitos e o que instalou.
3. Execute as etapas e mostre resultado esperado versus observado.
4. Comprove pelo menos **um teste negativo seguro**.
5. Descubra a causa, corrija, remova recursos temporários e repita sem roteiro.
6. Responda à pergunta de fixação da aula.

**Notas e progresso** são salvos somente no navegador. Eles não comprovam execução real nem são sincronizados automaticamente. Nunca inclua tokens, senhas ou dados corporativos nas anotações.

## Licenciamento

Uma licença Microsoft Entra ID P2 só deve ser utilizada para usuários e funcionalidades efetivamente licenciados. Governance, recursos Azure e integrações com nuvem podem requerer planos/custos diferentes. Caso a função não esteja disponível, use a alternativa local **sem afirmar que ela é equivalente ao produto Microsoft**.

## Segurança

Utilize ambiente isolado e contas fictícias. Nunca quebre políticas do tenant principal; proteja a conta de emergência. Teste exclusão **somente em objetos criados especificamente para o laboratório**.
