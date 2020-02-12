package br.com.hospitaldocoracaoal.aria

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class EcgController {

    EcgService ecgService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_ECG_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond ecgService.list(params), model:[ecgCount: ecgService.count()]
    }

    @Secured('ROLE_ECG_SHOW')
    def show(Long id) {
        respond ecgService.get(id)
    }



    @Secured('ROLE_ECG_SAVE')
    @Transactional
    def save(Ecg ecg) {
        if (ecg == null) {
            render status: NOT_FOUND
            return
        }
        if (ecg.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond ecg.errors
            return
        }

        try {
            ecgService.save(ecg)
        } catch (ValidationException e) {
            respond ecg.errors
            return
        }

        respond ecg, [status: CREATED, view:"show"]
    }

    @Secured('ROLE_ECG_UPDATE')
    @Transactional
    def update(Ecg ecg) {
        if (ecg == null) {
            render status: NOT_FOUND
            return
        }
        if (ecg.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond ecg.errors
            return
        }

        try {
            ecgService.save(ecg)
        } catch (ValidationException e) {
            respond ecg.errors
            return
        }

        respond ecg, [status: OK, view:"show"]
    }

    @Secured('ROLE_ECG_DELETE')
    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        ecgService.delete(id)

        render status: NO_CONTENT
    }
}
