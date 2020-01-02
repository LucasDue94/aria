package br.com.hospitaldocoracaoal.aria

import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured

@ReadOnly
class PermissaoController {

    PermissaoService permissaoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_PERMISSAO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond permissaoService.list(params), model: [permissaoCount: permissaoService.count()]
    }

    def show(Long id) {
        respond permissaoService.get(id)
    }
}
