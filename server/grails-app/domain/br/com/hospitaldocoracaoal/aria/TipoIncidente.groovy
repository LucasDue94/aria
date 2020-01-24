package br.com.hospitaldocoracaoal.aria

class TipoIncidente {
    String nome

    static belongsTo = [risco: Risco]

    static constraints = {
        nome nullable: false
    }
}
