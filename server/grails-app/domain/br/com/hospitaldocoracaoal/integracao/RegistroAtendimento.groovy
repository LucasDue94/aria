package br.com.hospitaldocoracaoal.integracao

class RegistroAtendimento {

    static final Character TIPO_INTERNO = 'I' as Character
    String id
    Date dataEntrada
    Date dataAlta
    SetorWpd setor
    Cid cid
    MotivoAlta motivoAlta
    Character tipo
    Paciente paciente

    static hasMany = [
            comandas: Comanda,
            atendimentos: Atendimento,
            exames: Exame,
            registroAtendimentoLeitos: RegistroAtendimentoLeito,
            cirurgias: Cirurgia
    ]

    static constraints = {
        cid nullable: true
        setor nullable: true
    }

    static mapping = {
        id generator: 'assigned'
        version  false
    }

    static transients = ['ultimoRegistroAtendimentoLeito']

    RegistroAtendimentoLeito getUltimoRegistroAtendimentoLeito() {
        registroAtendimentoLeitos.sort { r1, r2 -> r1.dataEntrada <=> r2.dataEntrada }.last()
    }
}
