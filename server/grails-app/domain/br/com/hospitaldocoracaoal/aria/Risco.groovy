package br.com.hospitaldocoracaoal.aria

class Risco {

    String nome
    Boolean habilitado = true

    static constraints = {
        nome nullable: false, unique: true
    }
}
