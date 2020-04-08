package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor

class Leito {

    String id
    String descricao
    Setor setor

    static hasMany = [registroLeitos: RegistroLeito]

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
