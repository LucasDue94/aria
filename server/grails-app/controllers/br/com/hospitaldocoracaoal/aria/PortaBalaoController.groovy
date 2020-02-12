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
class PortaBalaoController {

    PortaBalaoService portaBalaoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_PORTA_BALAO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond portaBalaoService.list(params), model:[portaBalaoCount: portaBalaoService.count()]
    }

    @Secured('ROLE_PORTA_BALAO_SHOW')
    def show(Long id) {
        respond portaBalaoService.get(id)
    }

    @Secured('ROLE_PORTA_BALAO_SAVE')
    @Transactional
    def save(PortaBalao portaBalao) {
        if (portaBalao == null) {
            render status: NOT_FOUND
            return
        }
        if (portaBalao.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond portaBalao.errors
            return
        }

        try {
            portaBalaoService.save(portaBalao)
        } catch (ValidationException e) {
            respond portaBalao.errors
            return
        }

        respond portaBalao, [status: CREATED, view:"show"]
    }

    @Secured('ROLE_PORTA_BALAO_UPDATE')
    @Transactional
    def update(PortaBalao portaBalao) {
        if (portaBalao == null) {
            render status: NOT_FOUND
            return
        }
        if (portaBalao.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond portaBalao.errors
            return
        }

        try {
            portaBalaoService.save(portaBalao)
        } catch (ValidationException e) {
            respond portaBalao.errors
            return
        }

        respond portaBalao, [status: OK, view:"show"]
    }

    @Secured('ROLE_PORTA_BALAO_DELETE')
    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        portaBalaoService.delete(id)

        render status: NO_CONTENT
    }
}
