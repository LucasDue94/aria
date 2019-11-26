package br.com.hospitaldocoracaoal.integracao

class Cirurgia {
    String id
    RegistroAtendimento registroAtendimento
    boolean cancelada

    static mapping = {
        version false
    }
}
