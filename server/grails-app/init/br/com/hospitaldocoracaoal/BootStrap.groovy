package br.com.hospitaldocoracaoal

import br.com.hospitaldocoracaoal.aria.Grupo
import br.com.hospitaldocoracaoal.aria.Permissao
import br.com.hospitaldocoracaoal.aria.Usuario

class BootStrap {

    def init = { servletContext ->

        Permissao.createPermissoes()
        def admin = Grupo.findByName('Admin')
        if (admin == null) {
            Grupo.withTransaction {
                admin = new Grupo(name: 'Admin')
                admin.permissoes = Permissao.all
                admin.save flush: true
            }
        }

        def padrao = Grupo.findByName('Padrão')
        if (padrao == null) {
            Grupo.withTransaction {
                padrao = new Grupo(name: 'Padrão')
                padrao.permissoes = Permissao.findAllByAuthorityInList(['ROLE_ATENDIMENTO_INDEX']) as Set<Permissao>
                padrao.save flush: true
            }
        }
    }
    def destroy = {
    }
}
