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
        respond registroAtendimentoLeitoService.list(params), model: [registroAtendimentoLeitoCount: registroAtendimentoLeitoService.count()]
    }

    @Secured('ROLE_REGISTRO_ATENDIMENTO_SHOW')
    def show(String registro, String leito, String dataEntrada) {
        respond registroAtendimentoLeitoService.get(new RegistroAtendimentoLeito(registroAtendimento: RegistroAtendimento.load(registro), leito: Leito.load(leito), dataEntrada: dataEntrada))
    }

    //TODO mudar a role
    @Secured('ROLE_REGISTRO_ATENDIMENTO_INDEX')
    def admissions(Integer max, String termo, String setorId, String dataEntradaInicio,
                   String dataEntradaFim) {
        params.sort = 'dataEntrada'
        params.order = 'desc'
        params.max = Math.min(max ?: 10, 100)
        respond registroAtendimentoLeitoService.admissoesSetor(params, termo, setorId, dataEntradaInicio, dataEntradaFim)
    }
}
