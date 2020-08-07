package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.db.StatusDiagnostico
import br.com.hospitaldocoracaoal.integracao.Atendimento
import br.com.hospitaldocoracaoal.integracao.Cid

class Diagnostico {

    StatusDiagnostico status
    Atendimento atendimento
    Cid cid
    Usuario profissional

    static constraints = {
        status nullable: false
        cid nullable: false
        atendimento nullable: false
        profissional nullable: false
    }
}
