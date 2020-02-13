package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Paciente
import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento

class Ecg {

    Date dataHoraEcg
    Date dataHoraPorta
    RegistroAtendimento registroAtendimento

    static belongsTo = [paciente: Paciente]

    static constraints = {
        dataHoraEcg nullable: false
        registroAtendimento unique: true
    }
}
