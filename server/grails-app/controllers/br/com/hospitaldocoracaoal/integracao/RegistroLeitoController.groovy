package br.com.hospitaldocoracaoal.integracao

import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured

@ReadOnly
class RegistroLeitoController {

    RegistroLeitoService registroLeitoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_ATENDIMENTO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond registroLeitoService.list(params)
    }

    @Secured('ROLE_ATENDIMENTO_SHOW')
    def show(String id) {
        respond registroLeitoService.get(id)
    }
}
