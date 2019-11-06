package br.com.hospitaldocoracaoal.integracao

class MotivoAlta {

    String id
    String descricao

    static constraints = {
    }

    static mapping = {
        id generator: 'assigned'
        version  false
    }
}
