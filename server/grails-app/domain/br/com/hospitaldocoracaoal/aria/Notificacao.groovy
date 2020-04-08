package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroLeito

class Notificacao {

    Date dateCreated
    RegistroLeito registroLeito

    static hasMany = [responsaveis: Usuario]

    static constraints = {
        registroLeito nullable: false
        responsaveis nullable: false, minSize: 1
    }
}
