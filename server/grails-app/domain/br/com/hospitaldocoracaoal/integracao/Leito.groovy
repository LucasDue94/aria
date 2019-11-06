package br.com.hospitaldocoracaoal.integracao

class Leito {

    String id
    String descricao

    static hasMany = [registroAtendimentoLeitos: RegistroAtendimentoLeitos]

    static constraints = {
    }

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
