package br.com.hospitaldocoracaoal.integracao

class Exame {
    String id
    RegistroAtendimento registro
    SetorWpd setor

    static belongsTo = RegistroAtendimento

    static mapping = {
        id generator: 'assigned'
        version false
    }

}
