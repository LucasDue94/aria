package br.com.hospitaldocoracaoal.integracao

class RegistroAtendimentoLeitos implements Serializable {

    RegistroAtendimento registroAtendimento
    Leito leito
    String dataEntrada

    static belongsTo = [RegistroAtendimento, Leito]

    static mapping = {
        id composite: ['registroAtendimento', 'leito', 'dataEntrada']
        version false
    }

}
