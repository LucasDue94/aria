package br.com.hospitaldocoracaoal.integracao
import grails.converters.JSON
import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured

@ReadOnly
class RegistroAtendimentoController {

    RegistroAtendimentoService registroAtendimentoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_REGISTRO_ATENDIMENTO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 20, 100)
        try {
            respond registroAtendimentoService.list(params), model: [registroAtendimentoCount: registroAtendimentoService.count()]
        } catch (IllegalArgumentException e) {
            render([error: e.message] as JSON)
        }
    }

    @Secured('ROLE_REGISTRO_ATENDIMENTO_SHOW')
    def show(String id) {
        respond registroAtendimentoService.get(id)
    }

}
