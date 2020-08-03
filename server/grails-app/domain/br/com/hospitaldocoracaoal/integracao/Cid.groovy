package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Diagnostico

class Cid {
    String id
    String descricao

    static hasMany = [
            diagnosticos: Diagnostico
    ]
    static mapping = {
        id generator: 'assigned'
        version false
    }
}
