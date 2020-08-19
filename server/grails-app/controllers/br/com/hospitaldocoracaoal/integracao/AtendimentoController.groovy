package br.com.hospitaldocoracaoal.integracao


import grails.converters.JSON
import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class AtendimentoController {

    AtendimentoService atendimentoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_ATENDIMENTO_INDEX')
    def index(Integer max, String termo, String setorId, String dataEntradaInicio,
              String dataEntradaFim, Character tipoAtendimento, Boolean internos) {
        params.max = Math.min(max ?: 30, 100)
        try {
            respond atendimentoService.list(params, termo, setorId, dataEntradaInicio,
                    dataEntradaFim, tipoAtendimento, internos), model: [atendimentoCount: atendimentoService.count()]
        } catch (IllegalArgumentException e) {
            render([error: e.message] as JSON)
        }
    }

    @Secured('ROLE_ATENDIMENTO_SHOW')
    def show(String id) {
        respond atendimentoService.get(id)
    }

    @Transactional
    def save(Atendimento atendimento) {
        if (atendimento == null) {
            render status: NOT_FOUND
            return
        }
        if (atendimento.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond atendimento.errors
            return
        }

        try {
            atendimentoService.save(atendimento)
        } catch (ValidationException e) {
            respond atendimento.errors
            return
        }

        respond atendimento, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(Atendimento atendimento) {
        if (atendimento == null) {
            render status: NOT_FOUND
            return
        }
        if (atendimento.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond atendimento.errors
            return
        }

        try {
            atendimentoService.save(atendimento)
        } catch (ValidationException e) {
            respond atendimento.errors
            return
        }

        respond atendimento, [status: OK, view: "show"]
    }

}
