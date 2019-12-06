package spring

import br.com.hospitaldocoracaoal.aria.UserDetailService
import br.com.hospitaldocoracaoal.aria.UsuarioPasswordEncoderListener


import br.com.hospitaldocoracaoal.aria.conversores.ConversorTipoSetor
import br.com.hospitaldocoracaoal.aria.UserDetailContextMapper

// Place your Spring DSL code here
beans = {
//    usuarioPasswordEncoderListener(UsuarioPasswordEncoderListener)
    tipoSetorConverter ConversorTipoSetor
    userDetailsService(UserDetailService)
    ldapUserDetailsMapper(UserDetailContextMapper)
}
