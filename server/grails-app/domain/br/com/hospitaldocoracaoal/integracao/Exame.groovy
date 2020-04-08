package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor

class Exame {
    String id
    Atendimento atendimento
    Setor setor

    static belongsTo = Atendimento

    static mapping = {
        id generator: 'assigned'
        version false
    }

}
