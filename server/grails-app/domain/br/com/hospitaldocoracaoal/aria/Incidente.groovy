package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimentoLeito

class Incidente {
    Date dataHora
    static belongsTo = [tipoIncidente: TipoIncidente, registroAtendimentoLeito: RegistroAtendimentoLeito]
    String obs
    static constraints = {
        obs blank: true, nullable: true
    }
}
