package br.com.hospitaldocoracaoal.aria

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class NasController {

    NasService nasService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond nasService.list(params), model:[nasCount: nasService.count()]
    }

    def show(Long id) {
        respond nasService.get(id)
    }

    //TODO Modificar as roles
    @Secured('ROLE_PERFIL_EPIDEMIOLOGICO_INDEX')
    @Transactional
    def save(Nas nas) {
        if (nas == null) {
            render status: NOT_FOUND
            return
        }
        if (nas.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond nas.errors
            return
        }

        try {
            nasService.save(nas)
        } catch (ValidationException e) {
            respond nas.errors
            return
        }

        respond nas, [status: CREATED, view:"show"]
    }

    @Secured('ROLE_PERFIL_EPIDEMIOLOGICO_INDEX')
    @Transactional
    def update(Nas nas) {
        if (nas == null) {
            render status: NOT_FOUND
            return
        }
        if (nas.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond nas.errors
            return
        }

        try {
            nasService.save(nas)
        } catch (ValidationException e) {
            respond nas.errors
            return
        }

        respond nas, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        nasService.delete(id)

        render status: NO_CONTENT
    }
}
