package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Paciente
import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento

class Ecg {

    Date dataHoraEcg
    Date dataHoraPorta

    static belongsTo = [registroAtendimento: RegistroAtendimento]

    static constraints = {
        dataHoraEcg nullable: false
        registroAtendimento unique: true
    }
}
