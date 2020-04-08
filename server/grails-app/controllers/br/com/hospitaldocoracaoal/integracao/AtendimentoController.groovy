package br.com.hospitaldocoracaoal.integracao

import grails.converters.JSON
import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured

@ReadOnly
class AtendimentoController {

    AtendimentoService atendimentoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_ATENDIMENTO_INDEX')
    def index(Integer max, String termo, String setorId, String dataEntradaInicio,
              String dataEntradaFim, Character tipoRegistro) {
        params.max = Math.min(max ?: 30, 100)
        try {
            respond atendimentoService.list(params, termo, setorId, dataEntradaInicio,
                    dataEntradaFim, tipoRegistro), model: [atendimentoCount: atendimentoService.count()]
        } catch (IllegalArgumentException e) {
            render([error: e.message] as JSON)
        }
    }

    @Secured('ROLE_ATENDIMENTO_SHOW')
    def show(String id) {
        respond atendimentoService.get(id)
    }
}
