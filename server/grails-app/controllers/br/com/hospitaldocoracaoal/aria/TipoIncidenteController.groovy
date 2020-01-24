package br.com.hospitaldocoracaoal.aria

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class TipoIncidenteController {

    TipoIncidenteService tipoIncidenteService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_TIPO_INCIDENTE_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond tipoIncidenteService.list(params), model:[tipoIncidenteCount: tipoIncidenteService.count()]
    }

    @Secured('ROLE_TIPO_INCIDENTE_SHOW')
    def show(Long id) {
        respond tipoIncidenteService.get(id)
    }

    @Secured('ROLE_TIPO_INCIDENTE_SAVE')
    @Transactional
    def save(TipoIncidente tipoIncidente) {
        if (tipoIncidente == null) {
            render status: NOT_FOUND
            return
        }
        if (tipoIncidente.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond tipoIncidente.errors
            return
        }

        try {
            tipoIncidenteService.save(tipoIncidente)
        } catch (ValidationException e) {
            respond tipoIncidente.errors
            return
        }

        respond tipoIncidente, [status: CREATED, view:"show"]
    }

    @Secured('ROLE_TIPO_INCIDENTE_UPDATE')
    @Transactional
    def update(TipoIncidente tipoIncidente) {
        if (tipoIncidente == null) {
            render status: NOT_FOUND
            return
        }
        if (tipoIncidente.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond tipoIncidente.errors
            return
        }

        try {
            tipoIncidenteService.save(tipoIncidente)
        } catch (ValidationException e) {
            respond tipoIncidente.errors
            return
        }

        respond tipoIncidente, [status: OK, view:"show"]
    }

    @Secured('ROLE_TIPO_INCIDENTE_DELETE')
    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        tipoIncidenteService.delete(id)

        render status: NO_CONTENT
    }
}
