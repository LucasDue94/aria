package br.com.hospitaldocoracaoal.aria

class TipoIncidente {
    String nome

    static hasMany = [riscos: Risco]

    static constraints = {
        nome nullable: false, unique: true
        riscos minSize: 1
    }

}
