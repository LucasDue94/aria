package br.com.hospitaldocoracaoal.integracao

class RegistroAtendimento {

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
            registroAtendimentoLeitos: RegistroAtendimentoLeitos,
            cirurgias: Cirurgia
    ]

    static mapping = {
        id generator: 'assigned'
        version  false
    }
}
