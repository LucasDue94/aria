package br.com.hospitaldocoracaoal.integracao

class Convenio {

    String id
    String fantasia

    static constraints = {
    }

    static  mapping = {
        id generator: 'assigned'
        version false
    }
}
