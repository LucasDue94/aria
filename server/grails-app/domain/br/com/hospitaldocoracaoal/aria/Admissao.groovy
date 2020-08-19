package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Atendimento

class Admissao {
    Date data
    Atendimento atendimento

    static hasOne = [planoTerapeutico: PlanoTerapeutico]
    static hasMany = [diagnosticos: Diagnostico]
    static constraints = {
        diagnosticos nullable: false
        planoTerapeutico nullable: false
        atendimento(nullable: false, validator: { value, object ->
            def exist = where { atendimento.id == value.id }.count()
            if (exist > 0) return false
        })
    }
}
