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
class RiscoController {

    RiscoService riscoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_RISCO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond riscoService.list(params), model:[riscoCount: riscoService.count()]
    }

    @Secured('ROLE_RISCO_SHOW')
    def show(Long id) {
        respond riscoService.get(id)
    }

    @Secured('ROLE_RISCO_SAVE')
    @Transactional
    def save(Risco risco) {
        if (risco == null) {
            render status: NOT_FOUND
            return
        }
        if (risco.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond risco.errors
            return
        }

        try {
            riscoService.save(risco)
        } catch (ValidationException e) {
            respond risco.errors
            return
        }

        respond risco, [status: CREATED, view:"show"]
    }

    @Secured('ROLE_RISCO_UPDATE')
    @Transactional
    def update(Risco risco) {
        if (risco == null) {
            render status: NOT_FOUND
            return
        }
        if (risco.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond risco.errors
            return
        }

        try {
            riscoService.save(risco)
        } catch (ValidationException e) {
            respond risco.errors
            return
        }

        respond risco, [status: OK, view:"show"]
    }

    @Secured('ROLE_RISCO_DELETE')
    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        riscoService.delete(id)

        render status: NO_CONTENT
    }
}
