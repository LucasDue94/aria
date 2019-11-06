package br.com.hospitaldocoracaoal.integracao

class RegistroAtendimento {

    String id
    Date dataEntrada
    Date dataAlta
    Setor setor
    Cid cid
    MotivoAlta motivoAlta
    Character tipo
    Paciente paciente

    static hasMany = [registroAtendimentoLeitos: RegistroAtendimentoLeitos]

    static constraints = {
    }

    static mapping = {
        id generator: 'assigned'
        version  false
    }
}
