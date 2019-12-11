package br.com.hospitaldocoracaoal.integracao

class Atendimento {

    Cid cid
    RegistroAtendimento registroAtendimento
    String conteudo

    static constraints = {
    }

    static mapping = {
        id generator: 'assigned'
    }
}
