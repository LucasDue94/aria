package br.com.hospitaldocoracaoal.integracao

import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured

@ReadOnly
class SetorWpdController {

    SetorWpdService setorWpdService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_SETOR_WPD_INDEX')
    def index(Integer max, String termo) {
        params.max = Math.min(max ?: 30, 100)
        respond setorWpdService.list(params, termo), model: [setorWpdCount: setorWpdService.count()]
    }

    @Secured('ROLE_SETOR_WPD_SHOW')
    def show(Long id) {
        respond setorWpdService.get(id)
    }

}
