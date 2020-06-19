package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Atendimento
import br.com.hospitaldocoracaoal.integracao.Cid
import grails.plugins.orm.auditable.Auditable
import grails.plugins.orm.auditable.Stampable

class Evolucao implements Auditable, Stampable {
    Usuario medico
    Date data
    String texto
    Cid cid
    static belongsTo = [Atendimento]

    static constraints = {
        medico nullable: false, blank: false, validator: { val ->
            if (val == null || val.crm == null || val.crm.isEmpty()) {
                return ['noCrm']
            }
        }
        data nullable: false, blank: false
        texto nullable: false, blank: false, type: "text"
    }
}
