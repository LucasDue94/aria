package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Ecg
import br.com.hospitaldocoracaoal.aria.PortaBalao

class Paciente {

    String id
    String nome
    Character sexo
    Date nascimento
    String nomeMae
    static hasMany = [
            registrosAtendimento: RegistroAtendimento,
            ecg: Ecg,
            portaBalao: PortaBalao
    ]

    static mapping = {
        id generator: 'assigned'
        version  false
    }
}
