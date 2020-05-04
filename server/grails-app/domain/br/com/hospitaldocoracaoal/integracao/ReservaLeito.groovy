package br.com.hospitaldocoracaoal.integracao

class ReservaLeito {
    Date dataInicio
    Date dataFim
    String tipo
    Leito leito

    static constraints = {
    }

    static mapping = {
        version false
    }
}
