package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Ecg
import br.com.hospitaldocoracaoal.aria.Balao

class Paciente {

    String id
    String nome
    Character sexo
    Date nascimento
    String nomeMae
    static hasMany = [
            registrosAtendimento: RegistroAtendimento,
            ecg: Ecg,
            balao: Balao
    ]

    static mapping = {
        id generator: 'assigned'
        version  false
    }
}
