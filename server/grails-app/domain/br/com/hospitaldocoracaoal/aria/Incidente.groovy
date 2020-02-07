package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Paciente

class Incidente {
    Date dataHora
    static belongsTo = [tipoIncidente: TipoIncidente, paciente: Paciente]
    String obs
    static constraints = {
        obs blank: true, nullable: true
    }
}
