package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.*

class Atendimento {

    static final Character TIPO_INTERNO = 'I' as Character
    static final Character TIPO_EMERGENCIA = 'U' as Character
    String id
    Date dataEntrada
    Date dataAlta
    Date dataAltaMedica
    Setor setor
    Cid cid
    MotivoAlta motivoAlta
    Character tipo
    Paciente paciente

    static hasMany = [
            comandas: Comanda,
            consultas: Consulta,
            exames: Exame,
            diagnosticos: Diagnostico,
            registroLeitos: RegistroLeito,
            cirurgias: Cirurgia,
            incidentes: Incidente,
            planosTerapeutico: PlanoTerapeutico
    ]

    static hasOne = [ecg: Ecg, balao: Balao]

    static belongsTo = [convenio: Convenio]

    static constraints = {
        cid nullable: true
        setor nullable: true
        dataAlta nullable: true
        dataAltaMedica nullable: true
        motivoAlta nullable: true
        ecg nullable: true
        diagnosticos nullable: true
        planosTerapeutico nullable: true
        balao nullable: true
    }

    static mapping = {
        id generator: 'assigned'
        sort dataEntrada: "desc"
        version  false
    }

    static transients = ['ultimoRegistroLeito', 'ultimoNas', 'ultimo', 'sortedRegistroLeitos']

    RegistroLeito getUltimoRegistroLeito() {
        registroLeitos.any() ? registroLeitos.sort { r1, r2 -> r1.dataEntrada <=> r2.dataEntrada }.last() : null
    }

    List<RegistroLeito> getSortedRegistroLeitos() {
        registroLeitos.any() ? registroLeitos.sort { r1, r2 -> r1.dataEntrada <=> r2.dataEntrada } : []
    }

    Nas getUltimoNas() {
        Nas ultimoNas = null
        List<Nas> nasList = (List<Nas>) registroLeitos.nas.flatten()
        if (!nasList.empty) {
            ultimoNas = nasList.sort { n1, n2 -> n1.data <=> n2.data }.last()
        }

        return ultimoNas
    }

    boolean isUltimo() {
        this == paciente.ultimoAtendimento
    }
}
