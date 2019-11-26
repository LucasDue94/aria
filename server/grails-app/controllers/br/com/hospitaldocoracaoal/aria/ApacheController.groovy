package br.com.hospitaldocoracaoal.aria

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class ApacheController {

    ApacheService apacheService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        respond apacheService.report(params), model:[apacheCount: apacheService.count()]
    }

    def show(Long id) {
        respond apacheService.get(id)
    }

    @Transactional
    def save(Apache apache) {
        if (apache == null) {
            render status: NOT_FOUND
            return
        }

        if (apache.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond apache.errors
            return
        }

        try {
            apacheService.save(apache)
        } catch (ValidationException e) {
            respond apache.errors
            return
        }

        respond apache, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Apache apache) {
        if (apache == null) {
            render status: NOT_FOUND
            return
        }
        if (apache.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond apache.errors
            return
        }

        try {
            apacheService.save(apache)
        } catch (ValidationException e) {
            respond apache.errors
            return
        }

        respond apache, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        apacheService.delete(id)

        render status: NO_CONTENT
    }
}
