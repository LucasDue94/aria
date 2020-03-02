package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Notificacao

class RegistroAtendimentoLeito implements Serializable {

    RegistroAtendimento registroAtendimento
    Leito leito
    Date dataEntrada

    static hasMany = [notificacoes: Notificacao]
    static belongsTo = [RegistroAtendimento, Leito]

    static mapping = {
        id composite: ['registroAtendimento', 'leito', 'dataEntrada']
        version false
    }

    static transients = ['ultimo', 'dataAlta']

    boolean isUltimo() {
        this == registroAtendimento.ultimoRegistroAtendimentoLeito
    }

    boolean equals(o) {
        if (this.is(o)) return true
        if (getClass() != o.class) return false

        RegistroAtendimentoLeito that = (RegistroAtendimentoLeito) o

        if (dataEntrada != that.dataEntrada) return false
        if (leito != that.leito) return false
        if (registroAtendimento != that.registroAtendimento) return false

        return true
    }

    String getDataAlta() {
        def regs = this.registroAtendimento.registroAtendimentoLeitos.findAll { element -> element.dataEntrada > this.dataEntrada }
        regs.any() ? regs.first().dataEntrada : null
    }
}
