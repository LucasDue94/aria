package br.com.hospitaldocoracaoal.aria

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class AtendimentoCidController {

    DiagnosticoService atendimentoCidService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond atendimentoCidService.list(params), model:[atendimentoCidCount: atendimentoCidService.count()]
    }

    def show(Long id) {
        respond atendimentoCidService.get(id)
    }

    @Transactional
    def save(Diagnostico atendimentoCid) {
        if (atendimentoCid == null) {
            render status: NOT_FOUND
            return
        }
        if (atendimentoCid.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond atendimentoCid.errors
            return
        }

        try {
            atendimentoCidService.save(atendimentoCid)
        } catch (ValidationException e) {
            respond atendimentoCid.errors
            return
        }

        respond atendimentoCid, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Diagnostico atendimentoCid) {
        if (atendimentoCid == null) {
            render status: NOT_FOUND
            return
        }
        if (atendimentoCid.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond atendimentoCid.errors
            return
        }

        try {
            atendimentoCidService.save(atendimentoCid)
        } catch (ValidationException e) {
            respond atendimentoCid.errors
            return
        }

        respond atendimentoCid, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        atendimentoCidService.delete(id)

        render status: NO_CONTENT
    }
}
