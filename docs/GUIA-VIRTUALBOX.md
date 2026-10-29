# Guia prático — Windows 11 + VirtualBox | Aurora IAM

**Ambiente:** Ryzen 5 5600 (6 núcleos/12 threads), 16 GB DDR4, NVMe 1 TB, RTX 3070, HOST01 Windows 11 com Oracle VirtualBox e Microsoft Entra gratuito. Edição exata do Windows, versão do VirtualBox, AMD-V/SVM e espaço livre ainda precisam ser confirmados. O laboratório é local e não exige contratar Azure ou Microsoft 365 agora.

## Etapa 0 — Pré-voo do HOST01

No Windows 11, abra Gerenciador de Tarefas → Desempenho → CPU e confirme se a virtualização está habilitada. No PowerShell, execute consultas sem alteração do sistema:

~~~powershell
Get-CimInstance Win32_Processor |
  Select-Object Name,VirtualizationFirmwareEnabled,SecondLevelAddressTranslationExtensions

Get-Volume -DriveLetter C |
  Select-Object DriveLetter,@{Name='LivreGB';Expression={[math]::Round($_.SizeRemaining/1GB,1)}}

& "$env:ProgramFiles\Oracle\VirtualBox\VBoxManage.exe" --version
~~~

Se o VirtualBox estiver em outro diretório, use o caminho real. Confirme a edição Home/Pro por Configurações → Sistema → Sobre. Se a SVM/AMD-V estiver desligada, habilite no firmware/BIOS e reinicie. VirtualBox 7.x recente é recomendado para CL01 com UEFI, Secure Boot e TPM 2.0 virtual.

Se houver lentidão de VMs por coexistência com Hyper-V/Windows Hypervisor Platform, diagnostique a causa antes de mudar recursos de segurança. **Não desative a integridade de memória, Credential Guard ou outras proteções do host como primeiro procedimento.**

**Validação:** versão identificada, virtualização verificada, espaço realmente livre conhecido e edição do Windows registrada.

Referências: [Oracle — instalação](https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/installation.html), [Oracle — configuração de VMs](https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/working-with-vms.html).

## Etapa 1 — Criar rede privada no VirtualBox

Abra VirtualBox Manager → Ferramentas → Rede (Network Manager) → Host-only Networks (nomes variam por versão) → Criar. Configure o adaptador somente-anfitrião do HOST01 em 192.168.56.1, máscara 255.255.255.0. **Desative o servidor DHCP do VirtualBox nessa rede privada**, pois as VMs usarão endereços fixos.

| Dispositivo | Endereço | Máscara | Gateway da rede privada | DNS |
|---|---|---|---|---|
| HOST01 — Host-only | 192.168.56.1 | /24 | Nenhum | Não definir DNS Aurora para o host |
| DC01 — Host-only | 192.168.56.10 | /24 | Nenhum | 192.168.56.10 |
| CL01 — Host-only | 192.168.56.20 | /24 | Nenhum | 192.168.56.10 |

Verifique previamente se 192.168.56.0/24 já está em uso por VPN ou outra rede. Se estiver, escolha outra sub-rede e atualize **todos os endereços na documentação e configuração**. Não altere o IP do roteador doméstico. Host-only permite comunicação local entre host e VMs e entre VMs, mas não oferece saída à internet por si só.

Não configure adaptadores em **Bridge** para as VMs AD e não publique RDP, LDAP, DNS ou SMB mediante encaminhamento NAT.

Fonte: [Oracle — Virtual Networking e Host-only](https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/networkingdetails.html).

## Etapa 2 — Criar DC01 (Active Directory)

1. Obtenha ISO Windows Server 2022/2025 Evaluation no [Evaluation Center](https://www.microsoft.com/pt-br/evalcenter/download-windows-server-2025). Confira condições da avaliação de 180 dias. Use **Desktop Experience** (interface gráfica).
2. VirtualBox → Novo → nome **DC01**, tipo Windows Server (64 bits), mídia oficial. Se a instalação desassistida atrapalhar a prática, desative-a.
3. Configurar **2 vCPUs, 4096 MB RAM, disco VDI dinâmico de 60 GB**. Os 4 GB também atendem ao mínimo publicado para o futuro agente Cloud Sync; 3 GB é insuficiente para esse requisito do agente.
4. Adaptador 1: **Host-only**, na rede criada. Adaptador 2: **desativado** inicialmente. Inicie a instalação.
5. Renomeie a VM Windows para DC01. Com Get-NetAdapter, identifique a NIC host-only antes de configurar o IP estático 192.168.56.10/24, DNS 192.168.56.10 e **sem gateway** nessa interface.
6. No Gerenciador do Servidor, instale **Serviços de Domínio do Active Directory + DNS**, clique em **Promover este servidor a controlador de domínio**, selecione **Adicionar nova floresta** com domínio **aurora.test**. Defina senha DSRM forte e diferente das demais, sem salvá-la no portal.
7. Reinicie, confira DNS e Active Directory.

Comandos de verificação, executados dentro de DC01:

~~~powershell
hostname
Get-NetAdapter | Format-Table Name,Status,InterfaceDescription
Get-NetIPConfiguration
ipconfig /all
Get-ADDomain
Get-Service NTDS,DNS
Resolve-DnsName -Name _ldap._tcp.dc._msdcs.aurora.test -Type SRV -Server 192.168.56.10
~~~

O comando Get-ADDomain requer o módulo de Active Directory instalado. O teste de registro SRV só funciona **depois** de promover o domínio.

**Aceite:** DC01 foi criado com IP e DNS fixos, DNS responde o registro SRV, domínio aurora.test existe, nenhum serviço AD exposto.

## Etapa 3 — Criar CL01 (Windows 11)

1. Use Windows 11 devidamente licenciado ou avaliação oficial elegível, como [Windows 11 Enterprise Evaluation](https://www.microsoft.com/pt-br/evalcenter/evaluate-windows-11-enterprise), observando o prazo e os termos aplicáveis.
2. VirtualBox → Novo → nome CL01; **2 vCPUs, 4096 MB RAM, VDI dinâmico de 80 GB**.
3. Configure **EFI/UEFI, Secure Boot e TPM 2.0 virtual** conforme versão do VirtualBox. **Não contorne os requisitos do Windows 11.**
4. Adaptador 1: **Host-only** na mesma rede de DC01; Adaptador 2: desativado.
5. Renomeie o Windows para CL01 e configure IP 192.168.56.20/24, DNS 192.168.56.10 e sem gateway nessa interface.
6. Antes do ingresso no domínio, teste a conectividade e resolução DNS do DC01.

~~~powershell
hostname
ipconfig /all
Test-NetConnection 192.168.56.10 -Port 53
Resolve-DnsName -Name _ldap._tcp.dc._msdcs.aurora.test -Type SRV -Server 192.168.56.10
~~~

Com resolução DNS funcionando, ingresse em aurora.test pela configuração de Nome do computador (sysdm.cpl) e reinicie. Use uma conta de laboratório com permissão de ingresso. Depois valide:

~~~powershell
whoami
whoami /groups
gpresult /r
~~~

**Aceite:** CL01 resolve o domínio via DC01, autentica a conta fictícia, recebe políticas e não concede privilégio administrativo indevido.

Fonte: [Microsoft — requisitos do Windows 11 em VM](https://learn.microsoft.com/pt-br/windows/whats-new/windows-11-requirements).

## Etapa 4 — Saída para internet sem expor a rede AD

**NAT é opcional e não deve estar ligado desde o começo.** Quando precisar de atualizações ou da etapa híbrida:

1. Desligue DC01 no VirtualBox. Habilite **Adaptador 2 → NAT**, sem port forwarding. Preserve Adaptador 1 como host-only.
2. Ligue DC01. Com Get-NetAdapter e ipconfig /all, identifique as duas interfaces. A placa NAT poderá obter IP 10.0.2.x pelo DHCP do VirtualBox.
3. O DNS da NIC host-only deve continuar apontando para DC01 (192.168.56.10). Configure, caso necessário, **encaminhadores do serviço DNS** para resolução externa, por meio de Gerenciador DNS → Propriedades do servidor → Encaminhadores.
4. **Desative o registro do IP da interface NAT no DNS do domínio** (propriedades IPv4 da NIC NAT → Avançado → DNS → Registrar endereços desta conexão no DNS, desmarcado), pois esse endereço pode quebrar a descoberta do DC01 por CL01.
5. Teste primeiro DNS interno/SRV; depois resolução externa e saída HTTPS. Não configure gateway na interface host-only, não adicione bridge e não abra portas de entrada.
6. Para Cloud Sync, confirme o papel Hybrid Identity Administrator no tenant, gMSA, .NET e requisitos oficiais. **A Microsoft admite agente em DC**; é uma economia de RAM apropriada para laboratório, não desenho ideal de produção. O mínimo do agente são 4 GB RAM.
7. Se a sessão não exigir mais saída, desligue a VM e desative o adaptador NAT. Atualizações de CL01 poderão usar NAT temporário próprio, preservando DNS do domínio.

Verificação útil após mudanças:

~~~powershell
Get-NetAdapter
Get-DnsClientServerAddress
Get-NetRoute -AddressFamily IPv4
Resolve-DnsName -Name _ldap._tcp.dc._msdcs.aurora.test -Type SRV -Server 192.168.56.10
~~~

**Atenção:** não altere DNS/rotas de todas as NICs ao mesmo tempo. Registre nome real da interface antes de qualquer comando de mudança.

Fontes: [Oracle — NAT e Host-only](https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/networkingdetails.html), [Microsoft — Cloud Sync](https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/how-to-prerequisites).

## Etapa 5 — Regime de memória e progresso

- DC01 com 4 GB e CL01 com 4 GB usam **8 GB da RAM física**, além do overhead das VMs. O HOST01 precisa do restante para Windows 11. Não execute Docker/Keycloak em paralelo com as duas VMs, salvo se verificar folga real.
- Para aprender Entra Free, normalmente só precisa do navegador do HOST01.
- Para aula OIDC/SCIM, desligue CL01 e, quando possível, DC01. Inicie apenas Docker + Node local.
- Use snapshots antes de mudanças críticas, mas evite restaurar um DC sincronizado com Entra para estado antigo sem planejar os efeitos da sincronização; mantenha backup externo e documente a reversão.
- O aprendizado segue **uma microetapa por vez**, sem hora/dia obrigatório. O portal lembra a posição e exporta evidências.

## Checklist de aceite

- [ ] Windows 11 confirmado, edição e VirtualBox versionados.
- [ ] AMD-V/SVM ativa e espaço livre medido.
- [ ] Rede host-only configurada, DHCP do VirtualBox desativado nela, sem conflito de sub-rede.
- [ ] DC01 2 vCPU / 4 GB / VDI 60 GB e domínio aurora.test ativo.
- [ ] CL01 2 vCPU / 4 GB / VDI 80 GB com EFI, Secure Boot e TPM 2.0.
- [ ] DNS/SRV e login no domínio validados de CL01.
- [ ] Nenhuma bridge ou port forwarding de serviços AD.
- [ ] Provas positivas/negativas registradas sem senhas ou tokens.
- [ ] NAT habilitado só quando necessário; nome interno e DNS preservados.

O portal registra confirmações manuais; não altera VMs ou Microsoft Entra automaticamente.