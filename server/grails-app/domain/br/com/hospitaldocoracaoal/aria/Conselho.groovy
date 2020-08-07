package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.db.Uf

class Conselho {

    String nome
    Uf uf


    static hasMany = [usuarios: Usuario]
    static constraints = {
        nome nullable: false
    }
}
