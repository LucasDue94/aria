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
//    String password
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired
    Grupo grupo

    Set<Permissao> getAuthorities() {
        grupo.permissoes as Set<Permissao>
    }

    static constraints = {
//        password nullable: false, blank: false, password: true
        username nullable: false, blank: false, unique: true
    }

//    static mapping = {
//	    password column: '`password`'
//    }
}
