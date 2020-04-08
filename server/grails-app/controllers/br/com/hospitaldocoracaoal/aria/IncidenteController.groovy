package br.com.hospitaldocoracaoal.aria


import grails.converters.JSON
import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import org.grails.web.json.JSONObject

import static org.springframework.http.HttpStatus.*

@ReadOnly
class IncidenteController {

    IncidenteService incidenteService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_INCIDENTE_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond incidenteService.list(params), model:[incidenteCount: incidenteService.count()]
    }

    @Secured('ROLE_INCIDENTE_REPORT')
    def report(Integer max) {
        return [data: incidenteService.report(params)]
    }


    @Secured('ROLE_INCIDENTE_SHOW')
    def show(Long id) {
        respond incidenteService.get(id)
    }

    @Secured('ROLE_INCIDENTE_SAVE')
    @Transactional
    def save() {
        JSONObject requestJson = (JSONObject) request.JSON
        Incidente incidente = new Incidente(requestJson)

        try {
            incidenteService.save(incidente, requestJson.pacienteId)
        } catch (ValidationException e) {
            transactionStatus.setRollbackOnly()
            respond incidente.errors
            return
        }

        respond incidente, [status: CREATED, view:"show"]
    }

    @Secured('ROLE_INCIDENTE_UPDATE')
    @Transactional
    def update(Incidente incidente) {
        if (incidente == null) {
            render status: NOT_FOUND
            return
        }

        try {
            incidenteService.save(incidente, incidente.atendimento.paciente.id)
        } catch (ValidationException e) {
            transactionStatus.setRollbackOnly()
            respond incidente.errors
            return
        }

        respond incidente, [status: OK, view:"show"]
    }

    @Secured('ROLE_INCIDENTE_DELETE')
    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        incidenteService.delete(id)

        render status: NO_CONTENT
    }
}
