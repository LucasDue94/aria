package br.com.hospitaldocoracaoal.aria

import grails.plugins.orm.auditable.resolvers.DefaultAuditRequestResolver
import org.springframework.stereotype.Component

@Component('auditRequestResolver')
class LdapAuditResolver extends DefaultAuditRequestResolver {
    def springSecurityService

    @Override
    String getCurrentActor() {
        springSecurityService.currentUser.username ?: springSecurityService.currentUser.id
    }
}