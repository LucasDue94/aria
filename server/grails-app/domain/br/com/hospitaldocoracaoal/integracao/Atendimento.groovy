package br.com.hospitaldocoracaoal.integracao

class Atendimento {

    Cid cid
    Paciente paciente
    RegistroAtendimento registroAtendimento
    String dataAtendimento
    String conteudo

    static constraints = {
    }

    static mapping = {
        id generator: 'assigned'
    }
}
