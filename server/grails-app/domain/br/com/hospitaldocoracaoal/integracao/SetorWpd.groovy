package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor

class SetorWpd {

    String id
    String descricao

    static hasMany = [leitos: Leito]
    static hasOne = [setor: Setor]

    static mapping = {
        id generator: 'assigned'
        version false
    }


}
