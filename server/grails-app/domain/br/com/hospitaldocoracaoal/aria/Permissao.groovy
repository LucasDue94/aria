package br.com.hospitaldocoracaoal.aria

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@EqualsAndHashCode(includes = 'authority')
@ToString(includes = 'authority', includeNames = true, includePackage = false)
class Permissao implements Serializable {

    private static final long serialVersionUID = 1

    String authority
    String nome
    String alias

    static hasMany = [
            grupos: Grupo
    ]

    static belongsTo = [Grupo]

    static constraints = {
        authority nullable: false, blank: false, unique: true
        nome unique: true
        alias nullable: false
    }
}
