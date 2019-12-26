package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.UserDetail
import br.com.hospitaldocoracaoal.aria.Usuario
import org.springframework.ldap.core.DirContextAdapter
import org.springframework.ldap.core.DirContextOperations
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.ldap.userdetails.UserDetailsContextMapper

import br.com.hospitaldocoracaoal.aria.Grupo


class UserDetailContextMapper implements UserDetailsContextMapper {

    @Override
    UserDetails mapUserFromContext(DirContextOperations ctx, String username, Collection<? extends GrantedAuthority> authorities) {
        String nome = ctx.getStringAttribute('displayName')
        String email = ctx.getStringAttribute('mail')

        Usuario.withTransaction {

            Grupo grupo = Grupo.findByName('Padrão')
            def usuarioMap = [
                    username: username,
                    grupo: grupo,
                    nome: nome,
                    email: email
            ]

            Usuario usuario = Usuario.findOrCreateWhere usuarioMap
            usuario.save(flush: true)

            authorities = grupo.permissoes.collect({
                new SimpleGrantedAuthority(it.authority as String)
            })


            new UserDetail(username, '', true, true, true, true, authorities, usuario?.id, usuario.grupo.name, usuario.nome)
        }
    }

    @Override
    void mapUserToContext(UserDetails user, DirContextAdapter ctx) {
        throw new IllegalStateException('Só é permitido autenticação com usuários do login')
    }
}