package br.com.hospitaldocoracaoal.integracao

class SetorWpd {

    String id
    String descricao

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
