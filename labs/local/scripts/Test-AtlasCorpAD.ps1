<#
.SYNOPSIS Validação SOMENTE LEITURA do Active Directory AtlasCorp LAB.
#>
[CmdletBinding()]
param()
$ErrorActionPreference='Stop'
Import-Module ActiveDirectory -ErrorAction Stop
$domain=Get-ADDomain
if($domain.DNSRoot -notlike '*.lab'){throw 'Domínio não-lab: interrompido.'}
$base="OU=AtlasCorp,$($domain.DistinguishedName)"
$results=[System.Collections.Generic.List[object]]::new()
foreach($ou in @('RH','Financeiro','TI','Seguranca','Comercial','Servicos','Computadores')){
  $o=Get-ADOrganizationalUnit -Identity "OU=$ou,$base" -ErrorAction SilentlyContinue
  $results.Add([pscustomobject]@{Controle="OU: $ou";Valido=[bool]$o})
}
foreach($pair in @(@('ana.rh','SG-ATL-RH-BASE'),@('bruno.fin','SG-ATL-FIN-BASE'),@('camila.ti','SG-ATL-TI-BASE'))){
  $person=Get-ADUser -Identity $pair[0] -ErrorAction SilentlyContinue
  $group=Get-ADGroup -Identity $pair[1] -ErrorAction SilentlyContinue
  $valid=$false
  if($person -and $group){$valid=[bool](Get-ADGroupMember $group|Where-Object SamAccountName -eq $pair[0])}
  $results.Add([pscustomobject]@{Controle="Membership: $($pair[0])";Valido=$valid})
}
$results|Format-Table -AutoSize
if($results.Valido -contains $false){Write-Warning 'Baseline incompleta; não declare conclusão.';exit 1}
Write-Host 'Baseline validada na VM de laboratório.'
