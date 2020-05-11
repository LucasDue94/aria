package br.com.hospitaldocoracaoal.integracao

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class LeitoController {

    LeitoService leitoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_ATENDIMENTO_INDEX')
    def index(Integer max) {
        params.max = Leito.count
        respond leitoService.list(params), model:[leitoCount: leitoService.count()]
    }

    @Secured('ROLE_ATENDIMENTO_SHOW')
    def show(Long id) {
        respond leitoService.get(id)
    }

    @Transactional
    def save(Leito leito) {
        if (leito == null) {
            render status: NOT_FOUND
            return
        }
        if (leito.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond leito.errors
            return
        }

        try {
            leitoService.save(leito)
        } catch (ValidationException e) {
            respond leito.errors
            return
        }

        respond leito, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Leito leito) {
        if (leito == null) {
            render status: NOT_FOUND
            return
        }
        if (leito.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond leito.errors
            return
        }

        try {
            leitoService.save(leito)
        } catch (ValidationException e) {
            respond leito.errors
            return
        }

        respond leito, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        leitoService.delete(id)

        render status: NO_CONTENT
    }
}
