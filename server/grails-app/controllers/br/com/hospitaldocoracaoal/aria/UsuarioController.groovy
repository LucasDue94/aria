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
class UsuarioController {

    UsuarioService usuarioService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_USUARIO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond usuarioService.list(params), model:[usuarioCount: usuarioService.count()]
    }

    @Secured('ROLE_USUARIO_UPDATE')
    @Transactional
    def update(Usuario usuario) {
        if (usuario == null) {
            render status: NOT_FOUND
            return
        }
        if (usuario.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond usuario.errors
            return
        }

        try {
            usuarioService.save(usuario)
        } catch (ValidationException e) {
            respond usuario.errors
            return
        }

        respond usuario, [status: OK, view:"show"]
    }
}
