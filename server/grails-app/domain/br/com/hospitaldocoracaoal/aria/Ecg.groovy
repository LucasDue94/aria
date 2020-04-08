package br.com.hospitaldocoracaoal.aria


import br.com.hospitaldocoracaoal.integracao.Atendimento

class Ecg {

    Date dataHoraEcg
    Date dataHoraPorta

    static belongsTo = [atendimento: Atendimento]

    static constraints = {
        dataHoraEcg nullable: false
        atendimento unique: true
    }
}
