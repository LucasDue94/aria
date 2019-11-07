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

    static hasMany = [
            comandas: Comanda,
            atendimentos: Atendimento,
            exames: Exame,
            registroAtendimentoLeitos: RegistroAtendimentoLeitos
    ]

    static mapping = {
        id generator: 'assigned'
        version  false
    }
}
