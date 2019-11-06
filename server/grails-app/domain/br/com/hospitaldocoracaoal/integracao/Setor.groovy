package br.com.hospitaldocoracaoal.integracao

class Setor {

    String id
    String descricao
    String tipo

    static constraints = {
    }

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
