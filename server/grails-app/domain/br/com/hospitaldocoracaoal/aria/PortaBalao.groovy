package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Paciente
import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento

class PortaBalao {

    Date dataHoraBalao

    static belongsTo = [
            registroAtendimento: RegistroAtendimento,
            paciente: Paciente
    ]


    static constraints = {
        registroAtendimento unique: true
        dataHoraBalao nullable: false
    }
}
