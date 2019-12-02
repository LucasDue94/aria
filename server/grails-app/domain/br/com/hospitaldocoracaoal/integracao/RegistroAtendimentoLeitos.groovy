package br.com.hospitaldocoracaoal.integracao

class RegistroAtendimentoLeitos implements Serializable {

    RegistroAtendimento registroAtendimento
    Leito leito
    Date dataEntrada

    static belongsTo = [RegistroAtendimento, Leito]

    static mapping = {
        id composite: ['registroAtendimento', 'leito', 'dataEntrada']
        version false
    }
}
