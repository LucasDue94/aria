package br.com.hospitaldocoracaoal.integracao

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class SetorWpdController {

    SetorWpdService setorWpdService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 30, 100)
        respond setorWpdService.list(params), model:[setorWpdCount: setorWpdService.count()]
    }

    def show(Long id) {
        respond setorWpdService.get(id)
    }

    @Transactional
    def save(SetorWpd setorWpd) {
        if (setorWpd == null) {
            render status: NOT_FOUND
            return
        }
        if (setorWpd.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond setorWpd.errors
            return
        }

        try {
            setorWpdService.save(setorWpd)
        } catch (ValidationException e) {
            respond setorWpd.errors
            return
        }

        respond setorWpd, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(SetorWpd setorWpd) {
        if (setorWpd == null) {
            render status: NOT_FOUND
            return
        }
        if (setorWpd.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond setorWpd.errors
            return
        }

        try {
            setorWpdService.save(setorWpd)
        } catch (ValidationException e) {
            respond setorWpd.errors
            return
        }

        respond setorWpd, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        setorWpdService.delete(id)

        render status: NO_CONTENT
    }
}
