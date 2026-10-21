<#
.SYNOPSIS Configuração idempotente do AD DS AtlasCorp LAB (*.lab).
.EXAMPLE
  $password=Read-Host "Senha inicial fictícia" -AsSecureString
  .\Initialize-AtlasCorpAD.ps1 -InitialPassword $password -WhatIf
  .\Initialize-AtlasCorpAD.ps1 -InitialPassword $password -Confirm
#>
[CmdletBinding(SupportsShouldProcess=$true,ConfirmImpact='High')]
param([Parameter(Mandatory=$true)][SecureString]$InitialPassword)
$ErrorActionPreference='Stop'
Import-Module ActiveDirectory -ErrorAction Stop
$domain=Get-ADDomain
if($domain.DNSRoot -notlike '*.lab'){throw "Domínio não-lab detectado: $($domain.DNSRoot)"}
$base="OU=AtlasCorp,$($domain.DistinguishedName)"
function EnsureOU([string]$Name,[string]$Path){
  $dn="OU=$Name,$Path"
  if(-not (Get-ADOrganizationalUnit -Identity $dn -ErrorAction SilentlyContinue)){
    if($PSCmdlet.ShouldProcess($dn,'Criar OU')){
      New-ADOrganizationalUnit -Name $Name -Path $Path -ProtectedFromAccidentalDeletion $true|Out-Null
    }
  }
}
EnsureOU 'AtlasCorp' $domain.DistinguishedName
foreach($dept in @('RH','Financeiro','TI','Seguranca','Comercial','Servicos','Computadores')){
  EnsureOU $dept $base
}
$groups=@(
  @{Name='SG-ATL-RH-BASE';OU='RH'},@{Name='SG-ATL-FIN-BASE';OU='Financeiro'},
  @{Name='SG-ATL-TI-BASE';OU='TI'},@{Name='SG-ATL-FIN-APP-READ';OU='Financeiro'},
  @{Name='SG-ATL-FIN-APP-APPROVE';OU='Financeiro'}
)
foreach($group in $groups){
  if(-not (Get-ADGroup -Identity $group.Name -ErrorAction SilentlyContinue)){
    if($PSCmdlet.ShouldProcess($group.Name,'Criar grupo')){
      New-ADGroup -Name $group.Name -SamAccountName $group.Name -Path "OU=$($group.OU),$base" -GroupScope Global -GroupCategory Security -Description 'Somente laboratório AtlasCorp'|Out-Null
    }
  }
}
$people=@(
 @{Sam='ana.rh';Name='Ana RH';OU='RH';Group='SG-ATL-RH-BASE'},
 @{Sam='bruno.fin';Name='Bruno Financeiro';OU='Financeiro';Group='SG-ATL-FIN-BASE'},
 @{Sam='camila.ti';Name='Camila TI';OU='TI';Group='SG-ATL-TI-BASE'}
)
foreach($p in $people){
  $person=Get-ADUser -Identity $p.Sam -ErrorAction SilentlyContinue
  if(-not $person){
    if($PSCmdlet.ShouldProcess($p.Sam,'Criar identidade fictícia')){
      New-ADUser -Name $p.Name -SamAccountName $p.Sam -UserPrincipalName "$($p.Sam)@$($domain.DNSRoot)" -Path "OU=$($p.OU),$base" -AccountPassword $InitialPassword -Enabled $true -ChangePasswordAtLogon $true|Out-Null
    }
  }
  if(Get-ADUser -Identity $p.Sam -ErrorAction SilentlyContinue){
    $member=Get-ADGroupMember -Identity $p.Group|Where-Object SamAccountName -eq $p.Sam
    if(-not $member -and $PSCmdlet.ShouldProcess($p.Sam,"Associar ao $($p.Group)")){
      Add-ADGroupMember -Identity $p.Group -Members $p.Sam
    }
  }
}
Write-Host 'Baseline apresentado/aplicado. Execute Test-AtlasCorpAD.ps1.'
