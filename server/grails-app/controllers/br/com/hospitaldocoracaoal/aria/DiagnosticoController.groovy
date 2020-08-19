package br.com.hospitaldocoracaoal.aria

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class DiagnosticoController {

    DiagnosticoService diagnosticoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_DIAGNOSTICO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond diagnosticoService.list(params), model:[diagnosticoCount: diagnosticoService.count()]
    }

    def show(Long id) {
        respond diagnosticoService.get(id)
    }

    @Transactional
    @Secured('ROLE_DIAGNOSTICO_SAVE')
    def save(Diagnostico diagnostico) {
        if (diagnostico == null) {
            render status: NOT_FOUND
            return
        }
        if (diagnostico.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond diagnostico.errors
            return
        }

        try {
            diagnosticoService.save(diagnostico)
        } catch (ValidationException e) {
            respond diagnostico.errors
            return
        }

        respond diagnostico, [status: CREATED, view:"show"]
    }

    @Transactional
    @Secured('ROLE_DIAGNOSTICO_UPDATE')
    def update(Diagnostico diagnostico) {
        if (diagnostico == null) {
            render status: NOT_FOUND
            return
        }
        if (diagnostico.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond diagnostico.errors
            return
        }

        try {
            diagnosticoService.save(diagnostico)
        } catch (ValidationException e) {
            respond diagnostico.errors
            return
        }

        respond diagnostico, [status: OK, view:"show"]
    }

    @Transactional
    @Secured('ROLE_DIAGNOSTICO_DELETE')
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        diagnosticoService.delete(id)

        render status: NO_CONTENT
    }
}
