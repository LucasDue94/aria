package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Atendimento

class Balao {

    Date dataHoraBalao

    static belongsTo = [
            atendimento: Atendimento
    ]
    static constraints = {
        atendimento unique: true
        dataHoraBalao nullable: false
    }

}
