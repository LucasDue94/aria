package br.com.hospitaldocoracaoal.aria

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class BalaoController {

    BalaoService balaoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_BALAO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond balaoService.list(params), model:[balaoCount: balaoService.count()]
    }

    @Secured('ROLE_BALAO_SHOW')
    def show(Long id) {
        respond balaoService.get(id)
    }

    @Secured('ROLE_BALAO_SAVE')
    @Transactional
    def save(Balao balao) {
        if (balao == null) {
            render status: NOT_FOUND
            return
        }
        if (balao.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond balao.errors
            return
        }

        try {
            balaoService.save(balao)
        } catch (ValidationException e) {
            respond balao.errors
            return
        }

        respond balao, [status: CREATED, view:"show"]
    }

    @Secured('ROLE_BALAO_UPDATE')
    @Transactional
    def update(Balao balao) {
        if (balao == null) {
            render status: NOT_FOUND
            return
        }
        if (balao.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond balao.errors
            return
        }

        try {
            balaoService.save(balao)
        } catch (ValidationException e) {
            respond balao.errors
            return
        }

        respond balao, [status: OK, view:"show"]
    }

    @Secured('ROLE_BALAO_DELETE')
    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        balaoService.delete(id)

        render status: NO_CONTENT
    }
}
