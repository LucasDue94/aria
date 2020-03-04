package br.com.hospitaldocoracaoal.integracao

import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured

@ReadOnly
class RegistroAtendimentoLeitoController {

    RegistroAtendimentoLeitoService registroAtendimentoLeitoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_REGISTRO_ATENDIMENTO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond registroAtendimentoLeitoService.list(params), model:[registroAtendimentoLeitoCount: registroAtendimentoLeitoService.count()]
    }

    @Secured('ROLE_REGISTRO_ATENDIMENTO_INDEX')
    def show(String registroAtendimento, String leito, Date dataEntrada) {
        respond registroAtendimentoLeitoService.get(id)
    }
}
