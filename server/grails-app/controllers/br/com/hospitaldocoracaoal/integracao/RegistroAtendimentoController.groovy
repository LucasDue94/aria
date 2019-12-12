package br.com.hospitaldocoracaoal.integracao
import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured

@ReadOnly
class RegistroAtendimentoController {

    RegistroAtendimentoService registroAtendimentoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_REGISTRO_ATENDIMENTO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond registroAtendimentoService.list(params), model: [registroAtendimentoCount: registroAtendimentoService.count()]
    }

    @Secured('ROLE_REGISTRO_ATENDIMENTO_SHOW')
    def show(String id) {
        respond registroAtendimentoService.get(id)
    }
}
