package br.com.hospitaldocoracaoal.aria

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.plugins.jasper.JasperReportDef
import grails.plugins.jasper.JasperService
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class EstratificacaoRiscoController {

    EstratificacaoRiscoService estratificacaoRiscoService
    JasperService jasperService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_ESTRATIFICACAO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond estratificacaoRiscoService.list(params), model:[estratificacaoRiscoCount: estratificacaoRiscoService.count()]
    }

    @Secured('ROLE_ESTRATIFICACAO_SHOW')
    def show(Long id) {
        respond estratificacaoRiscoService.get(id)
    }

    @Transactional
    @Secured('ROLE_ESTRATIFICACAO_SAVE')
    def save(EstratificacaoRisco estratificacaoRisco) {
        if (estratificacaoRisco == null) {
            render status: NOT_FOUND
            return
        }
        if (estratificacaoRisco.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond estratificacaoRisco.errors
            return
        }

        try {
            estratificacaoRiscoService.save(estratificacaoRisco)
        } catch (ValidationException e) {
            respond estratificacaoRisco.errors
            return
        }

        respond estratificacaoRisco, [status: CREATED, view:"show"]
    }

    @Transactional
    @Secured('ROLE_ESTRATIFICACAO_UPDATE')
    def update(EstratificacaoRisco estratificacaoRisco) {
        if (estratificacaoRisco == null) {
            render status: NOT_FOUND
            return
        }
        if (estratificacaoRisco.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond estratificacaoRisco.errors
            return
        }

        try {
            estratificacaoRiscoService.save(estratificacaoRisco)
        } catch (ValidationException e) {
            respond estratificacaoRisco.errors
            return
        }

        respond estratificacaoRisco, [status: OK, view:"show"]
    }

    @Transactional
    @Secured('ROLE_ESTRATIFICACAO_DELETE')
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        estratificacaoRiscoService.delete(id)

        render status: NO_CONTENT
    }

    @Secured('ROLE_ESTRATIFICACAO_REPORT')
    def printPDFReport() {
        def reportParams = [
                _format: 'PDF',
                _file: 'estratificacao_risco'
        ]

        JasperReportDef reportDef = jasperService.buildReportDefinition(reportParams, request.locale, [data: [estratificacaoRiscoService.resume()]])
        ByteArrayOutputStream reportStream = jasperService.generateReport reportDef
        response.outputStream << reportStream.toByteArray()
        reportStream.flush()
    }
}
