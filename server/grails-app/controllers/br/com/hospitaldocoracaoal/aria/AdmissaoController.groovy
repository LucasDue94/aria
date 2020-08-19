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
class AdmissaoController {

    AdmissaoService admissaoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_ADMISSAO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond admissaoService.list(params), model:[admissaoCount: admissaoService.count()]
    }

    @Secured('ROLE_ADMISSAO_SHOW')
    def show(Long id) {
        respond admissaoService.get(id)
    }

    @Transactional
    @Secured('ROLE_ADMISSAO_SAVE')
    def save(Admissao admissao) {
        if (admissao == null) {
            render status: NOT_FOUND
            return
        }
        if (admissao.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond admissao.errors
            return
        }

        try {
            admissaoService.save(admissao)
        } catch (ValidationException e) {
            respond admissao.errors
            return
        }

        respond admissao, [status: CREATED, view:"show"]
    }

    @Transactional
    @Secured('ROLE_ADMISSAO_UPDATE')
    def update(Admissao admissao) {
        if (admissao == null) {
            render status: NOT_FOUND
            return
        }
        if (admissao.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond admissao.errors
            return
        }

        try {
            admissaoService.save(admissao)
        } catch (ValidationException e) {
            respond admissao.errors
            return
        }

        respond admissao, [status: OK, view:"show"]
    }

    @Transactional
    @Secured('ROLE_ADMISSAO_DELETE')
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        admissaoService.delete(id)

        render status: NO_CONTENT
    }
}
