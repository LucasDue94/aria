package br.com.hospitaldocoracaoal.aria

import grails.compiler.GrailsCompileStatic
import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

@GrailsCompileStatic
@EqualsAndHashCode(includes=['id', 'username'])
@ToString(includes=['id', 'username'], cache=true, includeNames=true, includePackage=false)
class AuthenticationToken implements Serializable {

	private static final long serialVersionUID = 1

	String username
	String tokenValue
	Date lastUsed = new Date()

	static constraints = {
		tokenValue nullable: false, maxSize: 64
		username nullable: false, maxSize: 64
		lastUsed nullable: false
	}
}
