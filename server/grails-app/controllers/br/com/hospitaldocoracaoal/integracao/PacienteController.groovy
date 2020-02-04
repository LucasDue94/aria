package br.com.hospitaldocoracaoal.integracao
import grails.converters.JSON
import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured

@ReadOnly
class PacienteController {

    PacienteService pacienteService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_PACIENTE_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        try {
            respond pacienteService.list(params), model:[pacienteCount: pacienteService.count()]
        } catch (IllegalArgumentException e) {
            render([error: e.message] as JSON)
        }
    }

    @Secured('ROLE_PACIENTE_SHOW')
    def show(String id) {
        respond pacienteService.get(id)
    }
}
