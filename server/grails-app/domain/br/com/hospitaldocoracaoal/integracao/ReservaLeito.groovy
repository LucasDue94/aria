package br.com.hospitaldocoracaoal.integracao

class ReservaLeito {
    Date dataInicio
    Date dataFim
    String tipo

    static belongsTo = [leito: Leito]

    static constraints = {
    }

    static mapping = {
        version false
    }
}
