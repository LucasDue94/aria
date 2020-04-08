package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Balao
import br.com.hospitaldocoracaoal.aria.Ecg
import br.com.hospitaldocoracaoal.aria.Incidente
import br.com.hospitaldocoracaoal.aria.Setor

class Atendimento {

    static final Character TIPO_INTERNO = 'I' as Character
    static final Character TIPO_EMERGENCIA = 'U' as Character
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
            consultas: Consulta,
            exames: Exame,
            registroLeitos: RegistroLeito,
            cirurgias: Cirurgia,
            incidentes: Incidente
    ]

    static hasOne = [ecg: Ecg, balao: Balao]

    static constraints = {
        cid nullable: true
        setor nullable: true
        dataAlta nullable: true
        motivoAlta nullable: true
        ecg nullable: true
        balao nullable: true
    }

    static mapping = {
        id generator: 'assigned'
        sort dataEntrada: "desc"
        version  false
    }

    static transients = ['ultimoRegistroLeito']

    RegistroLeito getUltimoRegistroLeito() {
        registroLeitos.sort { r1, r2 -> r1.dataEntrada <=> r2.dataEntrada }.last()
    }
}
