package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento

class Incidente {
    Date dataHora
    String obs
    static belongsTo = [tipoIncidente: TipoIncidente, registroAtendimento: RegistroAtendimento, setor: Setor]

    static constraints = {
        obs blank: true, nullable: true
    }
}
