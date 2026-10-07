# Guia do aluno

## Para quem é

Profissional com experiência em AD DS, Entra ID ou gestão de acessos que deseja avançar para IAM Engineering, IGA, PAM, Identity Security e arquitetura. O conteúdo básico existe como **nivelamento**, não como barreira obrigatória.

## Padrão obrigatório de conteúdo

Toda aula deve responder explicitamente: **o que é**, **por que existe**, **quando aplicar**, **vantagens**, **desvantagens e riscos**, **pré-requisitos**, **como implementar passo a passo**, **como comprovar que funcionou**, **como diagnosticar falhas**, **como reverter** e **o que entregar**. Quando um recurso exigir licença indisponível, diferencie **execução real** de **simulação gratuita**. Não trate checklists genéricos como laboratório completo.

**Aula-modelo já detalhada:** [15 — PIM](modulos/15-pim.md) e [Laboratório 08 — Simulação local de PIM](labs/08-pim-simulador.md). Os demais módulos devem ser aprofundados com o mesmo padrão; a existência da seção não garante que já foram validados.

## Método por aula

1. **Contexto:** qual problema corporativo resolve?
2. **Fundamentos:** conceitos e fluxo técnico.
3. **Pré-requisitos:** hardware, software, licença, permissões e custo.
4. **Implementação:** passos reproduzíveis e comandos.
5. **Verificação:** evidências e resultados esperados.
6. **Teste negativo:** o que acontece quando uma configuração falha?
7. **Investigação:** logs, hipótese e causa-raiz.
8. **Correção e reversão:** restaurar estado seguro.
9. **Desafio:** repetir sem roteiro.
10. **Portfólio:** documentação sanitizada e lições aprendidas.

## Critérios de domínio

- **Nível 1:** explica o mecanismo sem decorar termos.
- **Nível 2:** executa o procedimento guiado.
- **Nível 3:** diagnostica um erro induzido.
- **Nível 4:** implementa sem roteiro.
- **Nível 5:** projeta a solução e defende trade-offs de segurança, operação e custo.

Concluir uma aula não comprova senioridade; projetos, prática e experiência operacional também são necessários.

## Ritmo sugerido

10–12 horas semanais, ajustáveis. Registre: data, versão das ferramentas, comandos executados, evidências, problemas, solução, custo e itens pendentes.

## Regra de licenciamento

**Uma licença Entra ID P2 não autoriza usar recursos P2 com múltiplas identidades sem licenciamento aplicável.** Verifique o direito de uso de cada recurso e os pré-requisitos de Entra ID Governance, Azure e demais produtos. Quando não houver licença, use laboratório aberto ou estudo de arquitetura explicitamente identificado como simulação.

## Segurança e orçamento

Não use contas corporativas reais. Não compartilhe credenciais em repositórios. Evite habilitar serviços com cobrança sem orçamento e plano de exclusão. Mantenha conta administrativa de recuperação devidamente protegida e testada, respeitando as políticas e o licenciamento do tenant.
