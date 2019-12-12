package br.com.hospitaldocoracaoal.integracao

class Cid {

    String id
    String diagnostico

    static constraints = {
    }

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
