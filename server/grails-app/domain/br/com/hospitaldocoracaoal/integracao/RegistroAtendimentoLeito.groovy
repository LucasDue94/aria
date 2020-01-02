package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Apache
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
}
