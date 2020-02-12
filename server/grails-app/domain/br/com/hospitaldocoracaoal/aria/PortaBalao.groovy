package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento

class PortaBalao {

    Date dataHoraBalao

    static belongsTo = [
            registroAtendimento: RegistroAtendimento,
    ]

    static constraints = {
        registroAtendimento nullable: false
        dataHoraBalao nullable: false
    }
}
