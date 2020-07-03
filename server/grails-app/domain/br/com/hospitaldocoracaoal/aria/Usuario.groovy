package br.com.hospitaldocoracaoal.aria

import grails.compiler.GrailsCompileStatic
import grails.plugins.orm.auditable.Auditable
import grails.plugins.orm.auditable.Stampable
import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

@GrailsCompileStatic
@EqualsAndHashCode(includes='username')
@ToString(includes='username', includeNames=true, includePackage=false)
class Usuario implements Serializable, Auditable {

    private static final long serialVersionUID = 1

    String username
    String nome
    String crm
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired
    String email
    Grupo grupo

    static hasMany = [setores: Setor]

    Set<Permissao> getAuthorities() {
        grupo.permissoes as Set<Permissao>
    }

    static constraints = {
        username nullable: false, blank: false, unique: true
        email nullable: true
        crm nullable: true
    }
}
