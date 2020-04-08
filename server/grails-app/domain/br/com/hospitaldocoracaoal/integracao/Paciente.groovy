package br.com.hospitaldocoracaoal.integracao

class Paciente {

    String id
    String nome
    Character sexo
    Date nascimento
    String nomeMae
    static hasMany = [
            atendimentos: Atendimento
    ]

    static mapping = {
        id generator: 'assigned'
        version  false
    }
}
