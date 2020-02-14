package br.com.hospitaldocoracaoal.aria


import br.com.hospitaldocoracaoal.integracao.RegistroAtendimentoLeito

class Nas {
    RegistroAtendimentoLeito registroAtendimentoLeito
    String monitorizacao                      //Questão 1
    boolean investigacoes                     //Questão 2
    boolean medicacao                         //Questão 3
    String procedimentoHigiene                //Questão 4
    boolean cuidadosDreno                     //Questão 5
    String mobilizacaoPosicionamento          //Questão 6
    String suporteCuidado                     //Questão 7
    String tarefasAdministrativas             //Questão 8
    boolean suporteRespiratorio               //Questão 9
    boolean cuidadosViasAereas                //Questão 10
    boolean tratamentoFuncaoPulmonar          //Questão 11
    boolean medicacaoVasoativa                //Questão 12
    boolean reposicaoIntravenosa              //Questão 13
    boolean monitorizacaoAtrioEsquerdo        //Questão 14
    boolean reanimacaoCardiorespiratoria      //Questão 15
    boolean tecnicasHemofiltracao             //Questão 16
    boolean medidaQuantitativa                //Questão 17
    boolean medidaPressaoIntracraniana        //Questão 18
    boolean tratamentoAcidose                 //Questão 19
    boolean hiperalimentacaoIntravenosa       //Questão 20
    boolean alimentacaoEnteral                //Questão 21
    boolean intervencoesDentroUnidade         //Questão 22
    boolean intervencoesForaUnidade           //Questão 23
    int escore


    static constraints = {
        monitorizacao nullabe: false, blank: false, inList: ['1a', '1b', '1c']
        investigacoes nullabe: false, blank: false
        medicacao nullabe: false, blank: false
        procedimentoHigiene nullabe: false, blank: false, inList: ['4a', '4b', '4c']
        cuidadosDreno nullabe: false, blank: false
        mobilizacaoPosicionamento nullabe: false, blank: false, inList: ['6a', '6b', '6c']
        suporteCuidado nullabe: false, blank: false, inList: ['7a', '7b']
        tarefasAdministrativas nullabe: false, blank: false, inList: ['8a', '8b', '8c']
        suporteRespiratorio nullabe: false, blank: false
        cuidadosViasAereas nullabe: false, blank: false
        tratamentoFuncaoPulmonar nullabe: false, blank: false
        medicacaoVasoativa nullabe: false, blank: false
        reposicaoIntravenosa nullabe: false, blank: false
        monitorizacaoAtrioEsquerdo nullabe: false, blank: false
        reanimacaoCardiorespiratoria nullabe: false, blank: false
        tecnicasHemofiltracao nullabe: false, blank: false
        medidaQuantitativa nullabe: false, blank: false
        medidaPressaoIntracraniana nullabe: false, blank: false
        tratamentoAcidose nullabe: false, blank: false
        hiperalimentacaoIntravenosa nullabe: false, blank: false
        alimentacaoEnteral nullabe: false, blank: false
        intervencoesDentroUnidade nullabe: false, blank: false
        intervencoesForaUnidade nullabe: false, blank: false
        registroAtendimentoLeito validator: { val, obj, errors ->
            def reg = RegistroAtendimentoLeito.where {
                registroAtendimento.id == val.registroAtendimentoId
                leito.id == val.leitoId
                dataEntrada == val.dataEntrada
            }.count()
            if (reg == 0) {
                errors.rejectValue('registroAtendimentoLeito', 'nas.registroAtendimentoLeito.doesnt.exist')
            }
        }
    }

    //TODO calcular escore
}

















