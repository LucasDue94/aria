package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento

class Ecg {

    Date dataHoraEcg
    Date dataTempoPorta
    RegistroAtendimento registroAtendimento

    static constraints = {
        dataHoraEcg nullable: false
        dataTempoPorta nullable: false
        registroAtendimento unique: true
    }

}
