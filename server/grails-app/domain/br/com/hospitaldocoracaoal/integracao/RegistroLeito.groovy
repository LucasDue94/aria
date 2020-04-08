package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Nas
import br.com.hospitaldocoracaoal.aria.Notificacao

class RegistroLeito implements Serializable {
    Atendimento atendimento
    Leito leito
    Date dataEntrada

    static hasMany = [notificacoes: Notificacao, nas: Nas]
    static belongsTo = [Atendimento, Leito]

    static mapping = {
//        id composite: ['atendimento', 'leito', 'dataEntrada']
        version false
    }

    static transients = ['ultimo', 'dataAlta']

    boolean isUltimo() {
        this == atendimento.ultimoRegistroLeito
    }

    boolean equals(o) {
        if (this.is(o)) return true
        if (getClass() != o.class) return false

        RegistroLeito that = (RegistroLeito) o

        if (dataEntrada != that.dataEntrada) return false
        if (leito != that.leito) return false
        if (atendimento != that.atendimento) return false

        return true
    }

    String getDataAlta() {
        def regs = this.atendimento.registroLeitos.findAll { element -> element.dataEntrada > this.dataEntrada }
        regs.any() ? regs.first().dataEntrada : null
    }
}
