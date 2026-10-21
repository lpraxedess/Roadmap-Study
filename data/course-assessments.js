/* Avaliações formativas por capítulo. A aprovação não certifica proficiência independente. */
const COURSE_ASSESS_KEY='roadmap-iam-assessments-v1';
const COURSE_QUIZZES={
 "op01": [
  [
   "Qual rede permite comunicação entre VMs sem publicar LDAP para a Internet?",
   [
    "Bridged sem firewall",
    "Host-only isolada",
    "DMZ pública"
   ],
   1,
   "Host-only mantém o tráfego no laboratório; NAT é apenas para atualizações."
  ],
  [
   "Antes de alterar o diretório, qual evidência guardar?",
   [
    "Snapshot e plano de reversão",
    "Somente uma captura de login",
    "Senha no README"
   ],
   0,
   "Baseline e rollback permitem repetir o teste com segurança."
  ]
 ],
 "op02": [
  [
   "Antes de promover o Windows Server a DC, o que validar?",
   [
    "DNS, IP e relógio",
    "Apenas navegador",
    "Uma conta convidada"
   ],
   0,
   "IP, DNS e relógio são dependências básicas."
  ],
  [
   "Qual vantagem do snapshot de baseline?",
   [
    "Dispensar logs",
    "Permitir recuperação do ambiente de teste",
    "Eliminar licenciamento"
   ],
   1,
   "Snapshot é instrumento de recuperação no laboratório."
  ]
 ],
 "op03": [
  [
   "Qual consulta indica descoberta LDAP de controlador no DNS?",
   [
    "Registro SRV _ldap._tcp.dc._msdcs",
    "Consulta TXT SPF",
    "Apenas ping externo"
   ],
   0,
   "Os registros SRV identificam serviços de domínio."
  ],
  [
   "Qual diferença entre AD DS e DNS?",
   [
    "São sinônimos",
    "AD DS organiza identidades; DNS resolve nomes e serviços",
    "DNS define RBAC"
   ],
   1,
   "Diretório e resolução desempenham papéis diferentes."
  ]
 ],
 "op04": [
  [
   "Em um desligamento, o primeiro objetivo IAM é:",
   [
    "Preservar acesso",
    "Bloquear novos acessos e revogar direitos",
    "Apagar auditoria"
   ],
   1,
   "Leaver exige revogação e rastreabilidade."
  ],
  [
   "Qual atributo ajuda a reconciliar sem depender do nome?",
   [
    "employeeId estável",
    "Nome de exibição",
    "Cargo escrito em texto livre"
   ],
   0,
   "Identificador persistente melhora a correlação."
  ]
 ],
 "op05": [
  [
   "Em AGDLP, quem representa acesso ao recurso?",
   [
    "Grupo local de domínio associado à ACL",
    "Apenas nome da OU",
    "GPO padrão"
   ],
   0,
   "A ACL deve expressar acesso pelo grupo de recurso."
  ],
  [
   "Segregação de funções evita:",
   [
    "Qualquer autenticação",
    "Que o mesmo ator solicite e aprove pagamento",
    "Logs de acesso"
   ],
   1,
   "SoD identifica conflitos de autorização."
  ]
 ],
 "op06": [
  [
   "Qual comando gera relatório das GPOs aplicadas?",
   [
    "gpresult /h",
    "klist purge",
    "nslookup -type=MX"
   ],
   0,
   "gpresult documenta a política efetiva."
  ],
  [
   "Ao retirar um computador do escopo de uma GPO, deve-se:",
   [
    "Testar se a configuração deixou de aplicar",
    "Apagar todo o domínio",
    "Desativar todos os usuários"
   ],
   0,
   "Valide escopo e herança antes/depois."
  ]
 ],
 "op07": [
  [
   "Qual ferramenta mostra tickets Kerberos no Windows?",
   [
    "klist",
    "ipconfig /flushdns",
    "df -h"
   ],
   0,
   "klist exibe tickets de sessão."
  ],
  [
   "LDAP, por si só, determina?",
   [
    "Autorização da aplicação",
    "Consultas/alterações de diretório conforme controles",
    "Criptografia TLS automática"
   ],
   1,
   "LDAP não substitui autorização de negócio nem TLS."
  ]
 ],
 "op08": [
  [
   "O modo start-dev do Keycloak é adequado para:",
   [
    "Produção pública",
    "Laboratório isolado",
    "Serviço empresarial sem controles"
   ],
   1,
   "Nunca exponha start-dev publicamente."
  ],
  [
   "Em Keycloak, qual objeto separa configurações de autenticação?",
   [
    "Realm",
    "Arquivo hosts",
    "Registro DNS A"
   ],
   0,
   "Realm isola configuração lógica de identidades e clientes."
  ]
 ],
 "op09": [
  [
   "No OIDC para cliente público, qual proteção é recomendada?",
   [
    "Authorization Code + PKCE",
    "Implicit sem state",
    "Token no URL público"
   ],
   0,
   "PKCE protege o fluxo de código."
  ],
  [
   "Qual componente precisa negar acesso sem role, mesmo após login?",
   [
    "Backend/recurso",
    "Somente botão da interface",
    "DNS"
   ],
   0,
   "Autenticação não implica autorização."
  ]
 ],
 "op10": [
  [
   "Em SCIM, qual operação atualiza atributos parcialmente?",
   [
    "PATCH /Users/{id}",
    "DELETE /Schemas",
    "HTTP TRACE"
   ],
   0,
   "SCIM define PATCH para mudanças parciais."
  ],
  [
   "Qual técnica previne contas duplicadas em retries?",
   [
    "Identificador externalId estável e reconciliação",
    "Gerar novo id aleatório a cada tentativa",
    "Ignorar respostas HTTP"
   ],
   0,
   "Faça GET e correlacione antes de repetir POST."
  ]
 ],
 "op11": [
  [
   "Qual conta deve ser usada nas atividades rotineiras?",
   [
    "Admin de domínio",
    "Identidade de menor privilégio",
    "Conta compartilhada"
   ],
   1,
   "Privilégios são separados dos acessos diários."
  ],
  [
   "Qual evidência ajuda a investigar um incidente?",
   [
    "Ator, timestamp UTC, objeto e resultado",
    "Somente captura estética",
    "Senha do operador"
   ],
   0,
   "Eventos correlacionáveis permitem reconstruir incidentes."
  ]
 ],
 "op12": [
  [
   "Uma prova de laboratório pode ser considerada execução real quando:",
   [
    "Existe teste observável no serviço, documentado",
    "A teoria foi lida",
    "A tela foi copiada de terceiros"
   ],
   0,
   "Execução precisa de evidência reproduzível."
  ],
  [
   "Para concluir um projeto, é essencial:",
   [
    "Arquitetura, testes positivos/negativos e rollback",
    "Expor RDP na Internet",
    "Descartar evidências"
   ],
   0,
   "A entrega inclui segurança e recuperação."
  ]
 ],
 "lab-00": [
  [
   "Por que manter contas de acesso emergencial fora de políticas experimentais?",
   [
    "Evitar bloqueio completo do tenant",
    "Desativar auditoria",
    "Reduzir necessidade de MFA de todos"
   ],
   0,
   "Break-glass tem proteção e monitoramento próprios."
  ],
  [
   "Qual identidade correlaciona capítulos da AtlasCorp?",
   [
    "Mesmo objectId de camila.ti",
    "Criar novo camila.ti sempre",
    "Nome de exibição"
   ],
   0,
   "Não crie identidades duplicadas ao avançar a jornada."
  ]
 ],
 "lab-01": [
  [
   "O que fazer com camila.ti após capítulo 00?",
   [
    "Criar segunda conta",
    "Reutilizar a conta existente e atualizar atributos/grupos",
    "Conceder Global Admin"
   ],
   1,
   "O Joiner deve preservar identificador e histórico."
  ],
  [
   "Mover exige qual revisão?",
   [
    "Revogar acesso incompatível anterior",
    "Somente mudar displayName",
    "Não alterar memberships"
   ],
   0,
   "Mover exige análise de direitos acumulados."
  ]
 ],
 "lab-02": [
  [
   "Qual o estado recomendado para iniciar Conditional Access?",
   [
    "On para All users",
    "Report-only em grupo piloto",
    "Off sem logs"
   ],
   1,
   "Faça avaliação de impacto antes de aplicar."
  ],
  [
   "P2 cobre todos os usuários fictícios sem licenças?",
   [
    "Sim",
    "Não; direitos variam por beneficiário",
    "Somente convidado"
   ],
   1,
   "Licenciamento premium é por beneficiário conforme termos."
  ]
 ],
 "lab-03": [
  [
   "Qual afirmação sobre RBAC é correta?",
   [
    "Login implica permissão financeira",
    "Backend deve autorizar a operação",
    "Menu escondido é proteção suficiente"
   ],
   1,
   "Roles precisam ser validadas na aplicação."
  ],
  [
   "Qual teste comprova least privilege?",
   [
    "Leitura permitida e escrita negada",
    "Ambos permitidos",
    "Sem tentativa de negação"
   ],
   0,
   "É necessário demonstrar tanto permissão quanto negação."
  ]
 ],
 "lab-04": [
  [
   "Em OIDC, qual claim precisa corresponder ao cliente?",
   [
    "aud",
    "zip",
    "host"
   ],
   0,
   "Validar audience reduz reutilização indevida de tokens."
  ],
  [
   "Em SAML, que elementos validar?",
   [
    "Issuer, audience, assinatura e prazo",
    "Somente email na tela",
    "Apenas URL sem TLS"
   ],
   0,
   "SP deve validar assertion/assinatura."
  ]
 ],
 "lab-05": [
  [
   "Usuário B2B é equivalente a empregado?",
   [
    "Não; possui ciclo de vida e restrições próprias",
    "Sempre pertence a TI",
    "Recebe Global Admin automaticamente"
   ],
   0,
   "Identidade externa tem controles específicos."
  ],
  [
   "Ao encerrar parceria, qual ação?",
   [
    "Retirar acessos e revisar sessões",
    "Preservar direitos indefinidamente",
    "Desabilitar logs"
   ],
   0,
   "Lifecycle se aplica a convidados também."
  ]
 ],
 "lab-06": [
  [
   "O que uma política de compliance pode indicar?",
   [
    "Estado do dispositivo gerenciado",
    "Permissão de pagamento no ERP",
    "Certificado de RH"
   ],
   0,
   "Conformidade é sinal de dispositivo, não regra de negócio."
  ],
  [
   "Antes de aplicar CA baseada em compliance:",
   [
    "Inscrever dispositivo piloto e usar Report-only",
    "Aplicar a todos",
    "Desativar emergência"
   ],
   0,
   "Prepare Intune e piloto."
  ]
 ],
 "lab-07": [
  [
   "Azure RBAC de recursos exige:",
   [
    "Assinatura e recurso Azure apropriados",
    "Somente licenciamento P2",
    "Somente usuário local"
   ],
   0,
   "A licença Entra P2 não financia recursos Azure."
  ],
  [
   "Este capítulo sem assinatura Azure deve ser:",
   [
    "Dispensado justificadamente sem declarar execução",
    "Marcado real automaticamente",
    "Obrigatório para finalizar IAM"
   ],
   0,
   "A prática Azure é opcional ao núcleo IAM."
  ]
 ],
 "lab-08": [
  [
   "SCIM implementa principalmente:",
   [
    "Provisionamento e ciclo de vida",
    "Autenticação primária",
    "DNS"
   ],
   0,
   "SCIM não é protocolo de login."
  ],
  [
   "Qual condição é importante num retry?",
   [
    "Não duplicar externalId",
    "Criar segunda conta",
    "Omitir id"
   ],
   0,
   "Matching e idempotência são centrais."
  ]
 ],
 "lab-09": [
  [
   "Access Reviews são usadas para:",
   [
    "Recertificar acessos com decisão de owner",
    "Criar senha de domínio",
    "Desativar DNS"
   ],
   0,
   "Revisão é decisão de governança."
  ],
  [
   "Lifecycle Workflows avançados podem exigir:",
   [
    "Licença Entra ID Governance",
    "Apenas Azure VM",
    "Nenhum requisito"
   ],
   0,
   "Confira SKU e direitos por usuário."
  ]
 ],
 "lab-10": [
  [
   "PIM busca:",
   [
    "Elegibilidade, ativação controlada e auditoria",
    "Privilégio permanente irrestrito",
    "Desativar MFA"
   ],
   0,
   "PIM administra privilégio just-in-time."
  ],
  [
   "Para testar aprovação PIM é necessário:",
   [
    "Verificar licença de beneficiário e aprovador",
    "Apenas leitor anônimo",
    "Não registrar evidência"
   ],
   0,
   "O direito de uso depende dos participantes."
  ]
 ],
 "lab-11": [
  [
   "Purview é substituto obrigatório do Entra IAM?",
   [
    "Não; complementa proteção e governança de dados",
    "Sim, para todas as tarefas",
    "É serviço DNS"
   ],
   0,
   "Purview e IAM cobrem responsabilidades diferentes."
  ],
  [
   "Sem licença Purview:",
   [
    "Dispensar capítulo ou usar alternativa rotulada",
    "Marcar implementação comercial real",
    "Criar gastos sem aprovação"
   ],
   0,
   "Não confunda simulação com produto."
  ]
 ],
 "lab-12": [
  [
   "Qual campo permite correlacionar login e investigação?",
   [
    "Correlation ID e horário UTC",
    "Senha do usuário",
    "Cor da interface"
   ],
   0,
   "Log precisa ser correlacionável."
  ],
  [
   "Envia logs ao Log Analytics sem orçamento?",
   [
    "Não, pode gerar cobrança",
    "Sim, sempre gratuito",
    "Apenas o DNS muda"
   ],
   0,
   "Revise custo e retenção."
  ]
 ],
 "lab-13": [
  [
   "Cloud Sync deve partir de:",
   [
    "Fonte autoritativa e topologia testada",
    "Usuários duplicados não reconciliados",
    "Produção sem backup"
   ],
   0,
   "Identidades híbridas exigem fonte de verdade."
  ],
  [
   "Qual risco do híbrido?",
   [
    "Conflito de atributos e duplicidade",
    "Falta de SSL sempre",
    "Não existe risco"
   ],
   0,
   "Planeje matching e rollback."
  ]
 ],
 "lab-14": [
  [
   "Workload identity difere de pessoa porque:",
   [
    "É principal não humano e requer lifecycle próprio",
    "Não tem permissões",
    "Sempre possui senha de usuário"
   ],
   0,
   "Princípios de least privilege continuam."
  ],
  [
   "Multi-cloud com custo zero deve:",
   [
    "Ser estudado/dispensado conforme recurso",
    "Ativar recursos pagos por padrão",
    "Ignorar RBAC"
   ],
   0,
   "Não crie custos sem aprovação."
  ]
 ],
 "lab-15": [
  [
   "No portfólio profissional, uma simulação deve ser:",
   [
    "Claramente distinguida da execução real",
    "Apresentada como tenant real",
    "Omitida"
   ],
   0,
   "Integridade da evidência é essencial."
  ],
  [
   "Qual entrega consolida arquitetura IAM?",
   [
    "Diagrama, decisões, controles, incidentes e testes",
    "Somente um print",
    "Senha compartilhada"
   ],
   0,
   "Defenda arquitetura com rastreabilidade."
  ]
 ]
};
