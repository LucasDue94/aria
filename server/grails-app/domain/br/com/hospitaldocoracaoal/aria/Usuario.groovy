package br.com.hospitaldocoracaoal.aria

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@EqualsAndHashCode(includes='username')
@ToString(includes='username', includeNames=true, includePackage=false)
class Usuario implements Serializable {

    private static final long serialVersionUID = 1

    String username
    String nome
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired
    String email
    Grupo grupo

    static hasMany = [setores: Setor]
    static belongsTo = [Setor]

    Set<Permissao> getAuthorities() {
        grupo.permissoes as Set<Permissao>
    }

    static constraints = {
        username nullable: false, blank: false, unique: true
        email nullable: true
    }


}
