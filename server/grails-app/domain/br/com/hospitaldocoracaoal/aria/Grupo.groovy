package br.com.hospitaldocoracaoal.aria

import grails.compiler.GrailsCompileStatic
import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

@GrailsCompileStatic
@EqualsAndHashCode(includes='name')
@ToString(includes='name', includeNames=true, includePackage=false)
class Grupo implements Serializable {

	private static final long serialVersionUID = 1

	String name
	Boolean habilitado = true

	static hasMany = [
	        usuarios: Usuario,
			permissoes: Permissao
	]

	Set<Permissao> getAuthorities() {
		permissoes
	}

	static constraints = {
		name nullable: false, blank: false, unique: true
		habilitado nullable: true
	}
}
