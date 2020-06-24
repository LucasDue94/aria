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
class EvolucaoController {

    EvolucaoService evolucaoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('EVOLUCAO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond evolucaoService.list(params), model:[evolucaoCount: evolucaoService.count()]
    }

    @Secured('EVOLUCAO_SHOW')
    def show(Long id) {
        respond evolucaoService.get(id)
    }

    @Secured('EVOLUCAO_SAVE')
    @Transactional
    def save(Evolucao evolucao) {
        if (evolucao == null) {
            render status: NOT_FOUND
            return
        }
        if (evolucao.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond evolucao.errors
            return
        }

        try {
            evolucaoService.save(evolucao)
        } catch (ValidationException e) {
            respond evolucao.errors
            return
        }

        respond evolucao, [status: CREATED, view:"show"]
    }

    @Secured('EVOLUCAO_UPDATE')
    @Transactional
    def update(Evolucao evolucao) {
        if (evolucao == null) {
            render status: NOT_FOUND
            return
        }
        if (evolucao.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond evolucao.errors
            return
        }

        try {
            evolucaoService.save(evolucao)
        } catch (ValidationException e) {
            respond evolucao.errors
            return
        }

        respond evolucao, [status: OK, view:"show"]
    }

    @Secured('EVOLUCAO_DELETE')
    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        evolucaoService.delete(id)

        render status: NO_CONTENT
    }
}
