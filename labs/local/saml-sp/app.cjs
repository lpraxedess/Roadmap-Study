/* SAML SP AtlasCorp: requer Keycloak IdP configurado e cert PEM real.
   Assinatura da assertion verificada pela biblioteca; SEM modo inseguro/bypass.
   Usar somente localhost e dados fictícios. */
'use strict';
const express=require('express');
const passport=require('passport');
const session=require('express-session');
const fs=require('node:fs');
const {Strategy}=require('@node-saml/passport-saml');
const secret=process.env.IAM_SAML_SESSION_SECRET||'';
const certFile=process.env.IAM_SAML_IDP_CERT_FILE||'';
if(secret.length<32||!certFile||!fs.existsSync(certFile)){
 console.error('Defina IAM_SAML_SESSION_SECRET (>=32 caracteres) e IAM_SAML_IDP_CERT_FILE (PEM de assinatura Keycloak).');
 process.exit(1);
}
const port=Number(process.env.IAM_SAML_PORT||3001);
const callbackUrl='http://127.0.0.1:'+port+'/saml/acs';
const app=express();
app.disable('x-powered-by');
app.use(express.urlencoded({extended:false,limit:'50kb'}));
app.use(session({secret,resave:false,saveUninitialized:false,cookie:{httpOnly:true,sameSite:'lax',secure:false,maxAge:30*60*1000}}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user,done)=>done(null,user));
passport.deserializeUser((user,done)=>done(null,user));
const strategy=new Strategy({
  callbackUrl,
  entryPoint:process.env.IAM_SAML_ENTRY_POINT||'http://127.0.0.1:8080/realms/atlascorp-lab/protocol/saml',
  issuer:'atlascorp-saml-sp',
  idpCert:fs.readFileSync(certFile,'utf8'),
  wantAssertionsSigned:true,
  wantAuthnResponseSigned:false,
  acceptedClockSkewMs:3000
},(profile,done)=>{
 const roles=profile.roles;
 done(null,{nameID:profile.nameID,roles:Array.isArray(roles)?roles:typeof roles==='string'?[roles]:[]});
});
passport.use('saml',strategy);
app.get('/',(req,res)=>{
 res.type('html').send('<h1>AtlasCorp SP SAML</h1><p>IdP autentica; esta aplicação valida roles no backend.</p>'+
 '<a href="/login">Login via Keycloak</a> | <a href="/rh">RH</a> | <a href="/financeiro">Financeiro</a> | <a href="/logout">Sair</a>');
});
app.get('/saml/metadata',(req,res)=>res.type('application/xml').send(strategy.generateServiceProviderMetadata(null,null)));
app.get('/login',passport.authenticate('saml',{failureRedirect:'/'}));
app.post('/saml/acs',passport.authenticate('saml',{failureRedirect:'/'}),(req,res)=>res.redirect('/'));
app.get('/rh',(req,res)=>res.status(req.user?.roles.includes('rh-leitor')?200:403).send(req.user?.roles.includes('rh-leitor')?'RH autorizado':'RH negado'));
app.get('/financeiro',(req,res)=>res.status(req.user?.roles.includes('fin-aprovador')?200:403).send(req.user?.roles.includes('fin-aprovador')?'Financeiro autorizado':'Financeiro negado'));
app.get('/logout',(req,res)=>{req.logout(()=>req.session.destroy(()=>res.redirect('/')));});
app.listen(port,'127.0.0.1',()=>console.log('SP SAML LAB em http://127.0.0.1:'+port));
