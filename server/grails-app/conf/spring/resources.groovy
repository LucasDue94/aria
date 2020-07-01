package spring

import br.com.hospitaldocoracaoal.aria.CustomAccessTokenRenderer
import br.com.hospitaldocoracaoal.aria.LdapAuditResolver
import br.com.hospitaldocoracaoal.aria.UserDetailContextMapper
import br.com.hospitaldocoracaoal.aria.UserDetailService
import br.com.hospitaldocoracaoal.aria.conversores.ConversorTipoSetor

// Place your Spring DSL code here
beans = {
//    usuarioPasswordEncoderListener(UsuarioPasswordEncoderListener)
    tipoSetorConverter ConversorTipoSetor
    userDetailsService(UserDetailService)
    ldapUserDetailsMapper(UserDetailContextMapper)
    accessTokenJsonRenderer(CustomAccessTokenRenderer)
    auditRequestResolver(LdapAuditResolver) {
        springSecurityService = ref('springSecurityService')
    }
}
