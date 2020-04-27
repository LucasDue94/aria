package br.com.hospitaldocoracaoal.aria


import br.com.hospitaldocoracaoal.integracao.RegistroLeito

class Nas {
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
    boolean reanimacaoCardioRespiratoria      //Questão 15
    boolean tecnicasHemofiltracao             //Questão 16
    boolean medidaQuantitativa                //Questão 17
    boolean medidaPressaoIntracraniana        //Questão 18
    boolean tratamentoAcidose                 //Questão 19
    boolean hiperAlimentacaoIntravenosa       //Questão 20
    boolean alimentacaoEnteral                //Questão 21
    boolean intervencoesDentroUnidade         //Questão 22
    boolean intervencoesForaUnidade           //Questão 23
    float escore
    static belongsTo = [RegistroLeito]
    Date dateCreated

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
        reanimacaoCardioRespiratoria nullabe: false, blank: false
        tecnicasHemofiltracao nullabe: false, blank: false
        medidaQuantitativa nullabe: false, blank: false
        medidaPressaoIntracraniana nullabe: false, blank: false
        tratamentoAcidose nullabe: false, blank: false
        hiperAlimentacaoIntravenosa nullabe: false, blank: false
        alimentacaoEnteral nullabe: false, blank: false
        intervencoesDentroUnidade nullabe: false, blank: false
        intervencoesForaUnidade nullabe: false, blank: false
        escore nullabe: false
    }

    def beforeValidate() {
        this.calculaEscore()
    }

    def calculaEscore() {
        this.escore = 0
        this.escore += this.calculaMonitorizacao()
        this.escore += this.investigacoes ? 4.3 : 0
        this.escore += this.medicacao ? 5.6 : 0
        this.escore += this.calculaProcedimentoHigiene()
        this.escore += this.cuidadosDreno ? 1.8 : 0
        this.escore += this.calculaMobilizacaoPosicionamento()
        this.escore += this.calculaSuporteCuidado()
        this.escore += this.calculaTarefasAdministrativas()
        this.escore += this.suporteRespiratorio ? 1.4 : 0
        this.escore += this.cuidadosViasAereas ? 1.8 : 0
        this.escore += this.tratamentoFuncaoPulmonar ? 4.4 : 0
        this.escore += this.medicacaoVasoativa ? 1.2 : 0
        this.escore += this.reposicaoIntravenosa ? 2.5 : 0
        this.escore += this.monitorizacaoAtrioEsquerdo ? 14.7 : 0
        this.escore += this.reanimacaoCardioRespiratoria ? 7.1 : 0
        this.escore += this.tecnicasHemofiltracao ? 7.7 : 0
        this.escore += this.medidaQuantitativa ? 7 : 0
        this.escore += this.medidaPressaoIntracraniana ? 1.6 : 0
        this.escore += this.tratamentoAcidose ? 1.3 : 0
        this.escore += this.hiperAlimentacaoIntravenosa ? 2.8 : 0
        this.escore += this.alimentacaoEnteral ? 1.3 : 0
        this.escore += this.intervencoesDentroUnidade ? 2.8 : 0
        this.escore += this.intervencoesForaUnidade ? 1.9 : 0
    }

    //Questão 1
    def calculaMonitorizacao() {
        float result = 0
        switch (this.monitorizacao) {
            case '1a':
                result = 4.5
                break
            case '1b':
                result = 12.1
                break
            case '1c':
                result = 19.6
                break
        }
        return result
    }

    //Questão 4
    def calculaProcedimentoHigiene() {
        float result = 0
        switch (this.procedimentoHigiene) {
            case '4a':
                result = 4.1
                break
            case '14':
                result = 16.5
                break
            case '4c':
                result = 20
                break
        }
        return result
    }

    //Questão 6
    def calculaMobilizacaoPosicionamento() {
        float result = 0
        switch (this.mobilizacaoPosicionamento) {
            case '6a':
                result = 5.5
                break
            case '6b':
                result = 12.4
                break
            case '6c':
                result = 17
                break
        }
        return result
    }

    //Questão 7
    def calculaSuporteCuidado() {
        float result = 0
        switch (this.suporteCuidado) {
            case '7a':
                result = 4
                break
            case '7b':
                result = 32
                break
        }
        return result
    }

    //Questão 8
    def calculaTarefasAdministrativas() {
        float result = 0
        switch (this.tarefasAdministrativas) {
            case '8a':
                result = 4.2
                break
            case '8b':
                result = 23.2
                break
            case '8c':
                result = 30
                break
        }
        return result
    }
}

















