package br.com.hospitaldocoracaoal.aria

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class ApacheController {

    ApacheService apacheService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_APACHE_REPORT')
    def report(Integer max) {
        return [data: apacheService.report(params)]
    }

    @Secured('ROLE_APACHE_SAVE')
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
