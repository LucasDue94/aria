package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.AtendimentoCid

class Cid {

    String id
    String diagnostico

    static hasMany = [
            atendimentoCid: AtendimentoCid
    ]
    static mapping = {
        id generator: 'assigned'
        version false
    }
}
