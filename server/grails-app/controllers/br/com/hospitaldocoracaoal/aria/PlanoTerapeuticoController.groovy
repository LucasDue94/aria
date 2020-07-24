package br.com.hospitaldocoracaoal.aria

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class PlanoTerapeuticoController {

    PlanoTerapeuticoService planoTerapeuticoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_PLANO_TERAPEUTICO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond planoTerapeuticoService.list(params), model:[planoTerapeuticoCount: planoTerapeuticoService.count()]
    }

    def show(Long id) {
        respond planoTerapeuticoService.get(id)
    }

    @Transactional
    @Secured('ROLE_PLANO_TERAPEUTICO_SAVE')
    def save(PlanoTerapeutico planoTerapeutico) {
        if (planoTerapeutico == null) {
            render status: NOT_FOUND
            return
        }
        if (planoTerapeutico.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond planoTerapeutico.errors
            return
        }

        try {
            planoTerapeuticoService.save(planoTerapeutico)
        } catch (ValidationException e) {
            respond planoTerapeutico.errors
            return
        }

        respond planoTerapeutico, [status: CREATED, view:"show"]
    }

    @Transactional
    @Secured('ROLE_PLANO_TERAPEUTICO_UPDATE')
    def update(PlanoTerapeutico planoTerapeutico) {
        if (planoTerapeutico == null) {
            render status: NOT_FOUND
            return
        }
        if (planoTerapeutico.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond planoTerapeutico.errors
            return
        }

        try {
            planoTerapeuticoService.save(planoTerapeutico)
        } catch (ValidationException e) {
            respond planoTerapeutico.errors
            return
        }

        respond planoTerapeutico, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        planoTerapeuticoService.delete(id)

        render status: NO_CONTENT
    }
}
