package br.com.hospitaldocoracaoal.integracao
import br.com.hospitaldocoracaoal.aria.Incidente

class Paciente {

    String id
    String nome
    Character sexo
    Date nascimento
    String nomeMae
    static hasMany = [registrosAtendimento: RegistroAtendimento]

    static mapping = {
        id generator: 'assigned'
        version  false
    }
}
