package br.com.hospitaldocoracaoal.integracao

import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured

@ReadOnly
class RegistroLeitoController {

    RegistroLeitoService registroLeitoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_ATENDIMENTO_INDEX')
    def index(Integer max, String setorId, String tipoSetor) {
        params.max = Math.min(max ?: 10, 100)
        respond registroLeitoService.list(params, setorId, tipoSetor)
    }

    @Secured('ROLE_ATENDIMENTO_SHOW')
    def show(String registro, String leito, String dataEntrada) {
        respond registroLeitoService.get(new RegistroLeito(registroAtendimento: Atendimento.load(registro), leito: Leito.load(leito), dataEntrada: dataEntrada))
    }

    @Secured('ROLE_ATENDIMENTO_INDEX')
    def admissions(Integer max, String termo, String setorId, String dataEntradaInicio,
                   String dataEntradaFim) {
        params.sort = 'dataEntrada'
        params.order = 'desc'
        params.max = Math.min(max ?: 10, 100)
        respond registroLeitoService.admissoesSetor(params, termo, setorId, dataEntradaInicio, dataEntradaFim)
    }
}