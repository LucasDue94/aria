package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimentoLeito

class Notificacao {

    Date dateCreated
    RegistroAtendimentoLeito registroAtendimentoLeito

    static hasMany = [responsaveis: Usuario]

    static constraints = {
        registroAtendimentoLeito nullable: false
        responsaveis nullable: false, minSize: 1
    }
}
