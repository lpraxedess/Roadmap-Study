# AtlasCorp On-premises — guia de implantação

## 1. Preparação de VMs (host Windows 11, Ryzen 5 5600, 16 GB RAM)

Baixe VirtualBox, Windows Server Evaluation e Ubuntu Server LTS das páginas oficiais. Verifique espaço livre, virtualização habilitada, compatibilidade Windows e termos de licenciamento.

- IAM-DC: Windows Server Evaluation, 2 vCPU, 5 GB RAM, VDI dinâmico até 100 GB, IP Host-only 192.168.56.10/24.
- IAM-LNX: Ubuntu Server, 2 vCPU, 4 GB RAM, VDI 40 GB, IP Host-only 192.168.56.20/24.
- WIN11-LAB: Windows 11 Pro/Enterprise compatível com ingresso em domínio, 2 vCPU, 4 GB RAM, VDI 60 GB. Ligue WIN11-LAB apenas com IAM-DC, desligando IAM-LNX.
- Rede: Host-only 192.168.56.0/24 para serviços internos, NAT separado apenas para atualização. NÃO use bridge com LDAP, Kerberos, RDP ou serviços start-dev.

Registre snapshots antes e depois de alterações importantes. Confirme tempo, DNS e disponibilidade. Na IAM-DC execute PowerShell como administrador, depois de revisar domínio e senha DSRM:

    Get-NetIPConfiguration
    Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
    Install-ADDSForest -DomainName 'atlas.lab' -InstallDNS -DomainNetbiosName 'ATLAS'

A promoção reinicia o DC. Valide em PowerShell:

    Get-ADDomain
    Get-ADForest
    Get-DnsServerZone
    Resolve-DnsName -Name '_ldap._tcp.dc._msdcs.atlas.lab' -Type SRV

## 2. Criar AtlasCorp no AD (somente domínio fictício *.lab)

Os scripts estão em local/scripts. Primeiro faça simulação sem alterar objetos:

    $pw = Read-Host 'Senha apenas para identidades fictícias' -AsSecureString
    .\Initialize-AtlasCorpAD.ps1 -InitialPassword $pw -WhatIf

Depois de revisar cuidadosamente, aplique somente no domínio criado:

    .\Initialize-AtlasCorpAD.ps1 -InitialPassword $pw -Confirm
    .\Test-AtlasCorpAD.ps1

São criadas OUs RH, Financeiro, TI, Seguranca, Comercial, Servicos e Computadores; grupos funcionais; usuários fictícios ana.rh, bruno.fin e camila.ti. O script não adiciona usuários a Domain Admins e interrompe execução se o DNSRoot não terminar em .lab.

## 3. Keycloak no Linux

Instale Docker Engine e Compose plugin conforme documentação oficial Docker. Trabalhe na pasta labs/local:

    read -r -s -p 'Senha admin Keycloak: ' IAM_KC_ADMIN_PASSWORD; echo
    export IAM_KC_ADMIN_PASSWORD
    docker compose up -d
    docker compose ps

O serviço escuta apenas 127.0.0.1:8080 DA VM LINUX. Para acessar pelo host Windows usando túnel SSH autorizado:

    ssh -L 8080:127.0.0.1:8080 usuario@192.168.56.20

Acesse no host http://127.0.0.1:8080/admin/. Crie realm atlascorp-lab, usuários fictícios e roles rh-leitor e fin-aprovador. Habilite log de login do realm. Use start-dev apenas em laboratório isolado, sem publicação na Internet.

## 4. Aplicação OIDC com autorização de negócio

No Keycloak crie cliente CONFIDENCIAL de ID atlascorp-portal, client authentication ligado, Authorization Code habilitado, redirect URI EXATA http://127.0.0.1:8001/callback. Crie mapper de Realm Roles no ID token com claim roles do tipo array. Use usuário RH com rh-leitor e Financeiro com fin-aprovador.

No mesmo host que alcança o Keycloak via loopback/túnel SSH:

    cd labs/local
    python -m venv .venv
    python -m pip install -r requirements-oidc.txt

Ative o ambiente virtual do sistema e defina variáveis de ambiente em sessão temporária (não publique os segredos):

    export IAM_OIDC_SESSION_SECRET="$(python -c 'import secrets;print(secrets.token_hex(32))')"
    export IAM_OIDC_CLIENT_SECRET='<segredo-confidencial-do-Keycloak>'
    export IAM_KEYCLOAK_REALM='http://127.0.0.1:8080/realms/atlascorp-lab'
    python oidc_app.py

Abra http://127.0.0.1:8001/. Login do usuário ana.rh com a role rh-leitor deve permitir /rh e negar /financeiro com HTTP 403. Se o mapper de roles estiver ausente, negar os dois recursos é o resultado seguro. O Authlib valida ID token/claims via metadata e JWKS.

ATENÇÃO: a aplicação é didática, usa HTTP no localhost e não pode ser publicada em produção.

## 5. Service Provider SAML 2.0

Na pasta labs/local/saml-sp, instale dependências:

    npm install

No Keycloak, crie cliente SAML com Entity ID atlascorp-saml-sp e ACS http://127.0.0.1:3001/saml/acs. Habilite assinatura da assertion, exporte a chave PÚBLICA de assinatura do IdP para certificado X.509 PEM (não exporte private key). Configure mapper SAML do atributo roles. Defina:

    export IAM_SAML_SESSION_SECRET='<segredo-aleatorio-com-32-ou-mais-caracteres>'
    export IAM_SAML_IDP_CERT_FILE='/caminho/para/certificado-idp.pem'
    export IAM_SAML_ENTRY_POINT='http://127.0.0.1:8080/realms/atlascorp-lab/protocol/saml'
    node app.cjs

Acesse http://127.0.0.1:3001/, metadata em /saml/metadata. A biblioteca valida a assinatura de assertion. Teste 200 com role correta e 403 sem a role. Se o IdP não assinar corretamente, corrija o cliente/certificado: não desabilite verificação para forçar aprovação. Esta integração depende da versão e configuração real do Keycloak e exige teste antes de ser declarada concluída.

## 6. API SCIM 2.0

O arquivo scim_server.py fornece API Users didática, limitada a loopback, bearer por variável de ambiente e SQLite. Oferece GET /Users, GET por ID, filtro userName/externalId, POST e PATCH active/department. Não implementa integralmente RFC 7644, nem HTTPS automático, nem provisionamento Entra nativo.

    cd labs/local
    export IAM_SCIM_TOKEN="$(python -c 'import secrets;print(secrets.token_urlsafe(36))')"
    python scim_server.py

Em outro terminal na mesma máquina com o mesmo bearer:

    curl -X POST http://127.0.0.1:8081/scim/v2/Users -H "Authorization: Bearer $IAM_SCIM_TOKEN" -H 'Content-Type: application/scim+json' -d '{"schemas":["urn:ietf:params:scim:schemas:core:2.0:User"],"userName":"ana.rh","externalId":"RH-1001","active":true}'
    curl -G http://127.0.0.1:8081/scim/v2/Users -H "Authorization: Bearer $IAM_SCIM_TOKEN" --data-urlencode 'filter=externalId eq "RH-1001"'

Para desativar, copie o UUID do campo id retornado para USER_ID:

    curl -X PATCH "http://127.0.0.1:8081/scim/v2/Users/$USER_ID" -H "Authorization: Bearer $IAM_SCIM_TOKEN" -H 'Content-Type: application/scim+json' -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"replace","path":"active","value":false}]}'
    python -m unittest discover -s tests -p 'test_*.py'

Provas negativas: sem token -> 401; tentar criar usuário duplicado com mesmo externalId -> 409; após PATCH o GET deve exibir active=false. Repetição idempotente é alcançada consultando externalId ANTES de outro POST, não ignorando 409.

## 7. Troubleshooting e rollback

- DNS/Kerberos: confira 192.168.56.10 como DNS do cliente, consultas SRV, relógio, klist e Event Viewer.
- Keycloak: inspecione docker compose ps, logs --tail 50 e túnel SSH. Nunca abra 8080 para Internet.
- OIDC: revise redirect URI, issuer, client secret, nonce, relógio, mapper de roles; login sem role deve falhar autorização.
- SAML: valide IdP cert, Entity ID, ACS, assinatura e relógio. Não aceite assertion sem verificação.
- SCIM: 401 indica bearer; 409 pede reconciliação por externalId; 400 indica formato/atributo inválido.
- Memória: desligue uma VM, não faça três VMs simultâneas.
- Recuperação: preserve snapshots, inventário e backups. docker compose down não exclui volumes; docker compose down -v EXCLUI dados e deve ser usado somente após backup.

Documente teste permitido, teste negado, horário UTC, evidência sanitizada e diferença entre execução real, simulação e apenas estudo.

Referências: documentação Microsoft AD DS, documentação Keycloak, OIDC Core, OASIS SAML 2.0 e RFC 7644.
