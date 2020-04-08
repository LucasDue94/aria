package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Atendimento

class Incidente {
    Date dataHora
    String obs
    static belongsTo = [tipoIncidente: TipoIncidente, atendimento: Atendimento, setor: Setor]

    static constraints = {
        obs blank: true, nullable: true
    }
}
