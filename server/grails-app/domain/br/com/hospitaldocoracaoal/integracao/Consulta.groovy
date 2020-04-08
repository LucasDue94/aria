package br.com.hospitaldocoracaoal.integracao

class Consulta {

    Cid cid
    Atendimento atendimento
    Date dataAtendimento
    String conteudo

    static constraints = {
    }

    static mapping = {
        id generator: 'assigned'
    }
}
