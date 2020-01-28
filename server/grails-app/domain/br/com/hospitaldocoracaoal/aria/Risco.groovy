package br.com.hospitaldocoracaoal.aria

class Risco {

    String nome

    static constraints = {
        nome nullable: false, unique: true
    }
}
