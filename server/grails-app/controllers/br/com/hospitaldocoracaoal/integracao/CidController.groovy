package br.com.hospitaldocoracaoal.integracao


import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class CidController {

    CidService cidService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_CID_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond cidService.list(params)
    }

    def show(Long id) {
        respond cidService.get(id)
    }

    @Transactional
    @Secured('ROLE_CID_SAVE')
    def save(Cid cid) {
        if (cid == null) {
            render status: NOT_FOUND
            return
        }
        if (cid.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond cid.errors
            return
        }

        try {
            cidService.save(cid)
        } catch (ValidationException e) {
            respond cid.errors
            return
        }

        respond cid, [status: CREATED, view: "show"]
    }

    @Transactional
    @Secured('ROLE_CID_UPDATE')
    def update(Cid cid) {
        if (cid == null) {
            render status: NOT_FOUND
            return
        }
        if (cid.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond cid.errors
            return
        }

        try {
            cidService.save(cid)
        } catch (ValidationException e) {
            respond cid.errors
            return
        }

        respond cid, [status: OK, view: "show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        cidService.delete(id)

        render status: NO_CONTENT
    }
}
