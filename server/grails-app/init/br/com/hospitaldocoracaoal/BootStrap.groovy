package br.com.hospitaldocoracaoal

import br.com.hospitaldocoracaoal.aria.Grupo
import br.com.hospitaldocoracaoal.aria.Permissao
import br.com.hospitaldocoracaoal.aria.Usuario

class BootStrap {

    def init = { servletContext ->


        def admin = Grupo.findByName('Admin')
        if (admin == null) {
            Grupo.withTransaction {
                admin = new Grupo(name: 'Admin')
                admin.permissoes = Permissao.all
                admin.save flush: true
            }
        }

        def padrao = Grupo.findByName('Padrão')
        if(padrao == null) {
            Grupo.withTransaction {
                padrao = new Grupo(name: 'Padrão')
                //TODO: Change later
                padrao.permissoes = Permissao.all
                padrao.save flush: true

            }
        }
        def user = Usuario.findByUsername 'admin'
        if (user == null) {
            Usuario.withTransaction {
                user = new Usuario(username: 'admin', password: 'admin', grupo: admin)
                user.save flush: true
            }
        }
    }
    def destroy = {
    }
}
