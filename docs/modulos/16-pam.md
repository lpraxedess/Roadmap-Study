# 16 — PAM: acesso administrativo controlado

**Tempo estimado:** 45–90 minutos · **Nível:** progressivo · **Modo:** prática local primeiro

## 1. Conceito em 1 minuto

PAM governa acesso privilegiado a hosts/sistemas, sessões, credenciais e auditoria.

**Onde aparece no trabalho:** Operador precisa acessar Linux sem compartilhar senha root.

**Ao terminar você fará:** Defina acesso por papel e reveja uma sessão.

## 2. Por que usar? Vantagens e limites

**Ponto positivo:** Centraliza controles e evidencia atividade privilegiada.

**Ponto negativo / risco:** Depende de disponibilidade e dos recursos da edição adotada.

**Quando aplicar:** quando houver necessidade mensurável de controle, rastreabilidade ou integração no cenário acima. Não introduza complexidade sem requisito.

## 3. Preparar o ambiente

Teleport Community em VM isolada quando viável; alternativa: desenho local.

**Antes de começar:** use somente contas e dados fictícios; salve estado inicial; defina como desfazer alterações. Serviços comerciais e recursos Azure só quando disponíveis e licenciados. Atividades em papel/CSV são **simulações**, não demonstram operação de plataforma real.

## 4. Fazer agora — passo a passo

1. Leia o cenário e escreva em uma frase o resultado esperado.
2. Prepare o ambiente descrito, sem conceder direitos administrativos extras.
3. **Execute:** No [lab PAM](../labs/06-pam-lab.md), crie matriz `operador-leitura` versus `manutencao`, recursos `host-a` e `host-b`, e horários. Ao instalar Teleport Community, use guia da versão em laboratório isolado e valide logs.
4. Registre comando/configuração e resultado. Não capture senhas, tokens ou dados pessoais.

**O que deve acontecer:** Operador só alcança recursos autorizados; sessão é auditável quando a edição suporta.

## 5. Quebre de propósito (apenas laboratório)

Revogue papel em cenário de teste; nova sessão deve ser negada.

**Diagnóstico:** localize camada (identidade, autenticação, política, autorização, API ou recurso), identifique evidência do erro e corrija **a causa**, não eleve permissões por conveniência.

## 6. Limpar e repetir sem olhar

Restaure configurações fictícias, arquivos de teste e acessos temporários. **Desafio:** Defina política de break-glass independente do broker.

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
