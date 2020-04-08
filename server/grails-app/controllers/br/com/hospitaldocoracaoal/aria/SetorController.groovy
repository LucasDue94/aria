package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroLeitoService
import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class SetorController {

    SetorService setorService
    RegistroLeitoService registroLeitoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_SETOR_INDEX')
    def index(Integer max, String tipoSetor) {
        params.max = Math.min(max ?: 100, 100)
        respond setorService.list(params, tipoSetor), model:[setorCount: setorService.count()]
    }

    @Secured('ROLE_SETOR_SHOW')
    def show(Long id) {
        respond setorService.get(id)
    }

   /* @Secured('ROLE_SETOR_SHOW')
    def admissions(Integer max, String termo) {
        params.sort = 'dataEntrada'
        params.order = 'desc'
        params.max = Math.min(max ?: 10, 100)
        respond registroLeitoService.admissoesSetor(params, termo)
    }
*/
    @Secured('ROLE_SETOR_SAVE')
    @Transactional
    def save(Setor setor) {
        if (setor == null) {
            render status: NOT_FOUND
            return
        }
        if (setor.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond setor.errors
            return
        }

        try {
            setorService.save(setor)
        } catch (ValidationException e) {
            respond setor.errors
            return
        }

        respond setor, [status: CREATED, view:"show"]
    }

    @Secured('ROLE_SETOR_UPDATE')
    @Transactional
    def update(Setor setor) {
        if (setor == null) {
            render status: NOT_FOUND
            return
        }
        if (setor.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond setor.errors
            return
        }

        try {
            setorService.save(setor)
        } catch (ValidationException e) {
            respond setor.errors
            return
        }

        respond setor, [status: OK, view:"show"]
    }

    @Secured('ROLE_SETOR_DELETE')
    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        setorService.delete(id)

        render status: NO_CONTENT
    }
}
