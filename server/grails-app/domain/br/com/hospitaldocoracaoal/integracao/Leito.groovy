package br.com.hospitaldocoracaoal.integracao

class Leito {

    String id
    String descricao
    SetorWpd setor

    static hasMany = [registroAtendimentoLeitos: RegistroAtendimentoLeitos]

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
