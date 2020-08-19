package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Atendimento

class PlanoTerapeutico {

    String problemaAtivo
    String resultadoEsperado
    String conduta
    int prazo
    Atendimento atendimento

    static belongsTo = [admissao: Admissao]
    static constraints = {
        problemaAtivo nullable: false
        resultadoEsperado nullable: false
        conduta nullable: false
        prazo nullable: false
        atendimento nullable: false
        admissao nullable: true
    }
}
