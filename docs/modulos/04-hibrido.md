# 04 — Identidade híbrida: de onde vêm os usuários?

**Fase 1 — AD e Entra** · **40–70 minutos** · **Ambiente:** AD DS e Entra Connect/Cloud Sync **já existentes**; sem necessidade de instalar novo sincronizador nesta aula.

## 1. Entenda

Em **identidade híbrida**, parte das identidades é originada no AD local e sincronizada ao Entra. A **fonte autoritativa** define onde cada atributo deve ser alterado. A sincronização **não** é o mesmo que login. Dados como nome, departamento e estado da conta dependem do tipo de objeto e do fluxo configurado.

**Vantagem:** reaproveita o diretório local. **Risco:** alterações no local errado, conflito de atributos, sincronização atrasada e contas duplicadas.

## 2. Verificação prática — somente leitura primeiro

1. No **AD de laboratório**, abra `dsa.msc` e selecione um usuário de teste **já sincronizado**.
2. Registre seu nome de usuário e o atributo de departamento, se existir; **não modifique ainda**.
3. No [Entra](https://entra.microsoft.com), localize o mesmo usuário e observe a propriedade que indica sincronização de diretório, quando a interface exibir `On-premises sync enabled` ou equivalente.
4. Compare o identificador/UPN, os atributos e o estado atual. **Não suponha** que todos os grupos locais são sincronizados: verifique a configuração de escopo existente.
5. Se tiver acesso ao servidor de sincronização, consulte estado e histórico de sincronização; se não tiver, anote que não é possível validar a etapa de propagação.

**Resultado esperado:** você identifica um objeto sincronizado e sabe por que a mudança de atributo precisa ocorrer na origem.

## 3. Alteração opcional — apenas se você administra o laboratório

1. No AD, altere **Department** de um usuário fictício sincronizado de `Financeiro` para `TI`.
2. Registre horário e espere o próximo ciclo de sincronização **já agendado**. Não force ciclos sem necessidade.
3. Compare o valor visto no Entra após a sincronização. Se não atualizar, examine logs/escopo e permissões de leitura, sem recriar o usuário.

**Teste negativo de raciocínio:** alguém tentou editar diretamente no Entra um atributo controlado pelo AD. Explique por que a sincronização pode sobrescrever a alteração. Não faça o teste destrutivo com uma conta real.

## 4. Desafio

Desenhe setas **RH → AD DS → sincronizador → Entra ID → aplicativo**; marque a fonte autoritativa e o ponto de auditoria. Explique quais verificações faria se um Leaver fosse bloqueado no AD e ainda aparecesse habilitado na nuvem.

Se não possui laboratório híbrido, a atividade é **análise arquitetural**, não prática executada no produto. Não crie recurso Azure pago apenas para completar esta fase.

[Continuar: 05 — JML no AD ou Entra](05-jml.md)
