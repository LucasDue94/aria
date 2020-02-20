package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento

class Balao {

    Date dataHoraBalao

    static belongsTo = [
            registroAtendimento: RegistroAtendimento
    ]
    static constraints = {
        registroAtendimento unique: true
        dataHoraBalao nullable: false
    }
}
