package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Atendimento
import br.com.hospitaldocoracaoal.integracao.Cid

class AtendimentoCid {

    String status
    Atendimento atendimento
    Cid cid

    static constraints = {
        status nullable: false
        cid nullable: false
        atendimento nullable: false
    }
}
