package br.com.hospitaldocoracaoal.aria

import grails.plugin.springsecurity.userdetails.GrailsUser
import org.springframework.security.core.GrantedAuthority

class UserDetail extends GrailsUser {

    final String username
    final String grupo

    UserDetail(String username, String password, boolean enabled, boolean accountNonExpired,
               boolean credentialsNonExpired, boolean accountNonLocked, Collection<GrantedAuthority> authorities,
               Object id, String grupo) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities, id)
        this.username = username
        this.grupo = grupo

    }
}
