import {RegistroAtendimentoLeito} from "../registroAtendimentoLeito/registroAtendimentoLeito";

export class Nas {
  id: number;
  monitorizacao: string;                                      //Questão 1
  investigacoes: boolean;                                     //Questão 2
  medicacao: boolean;                                         //Questão 3
  procedimentoHigiene: string;                                //Questão 4
  cuidadosDreno: boolean;                                     //Questão 5
  mobilizacaoPosicionamento: string;                          //Questão 6
  suporteCuidado: string;                                     //Questão 7
  tarefasAdministrativas: string;                             //Questão 8
  suporteRespiratorio: boolean;                               //Questão 9
  cuidadosViasAereas: boolean;                                //Questão 10
  tratamentoFuncaoPulmonar: boolean;                          //Questão 11
  medicacaoVasoativa: boolean;                                //Questão 12
  reposicaoIntravenosa: boolean;                              //Questão 13
  monitorizacaoAtrioEsquerdo: boolean;                        //Questão 14
  reanimacaoCardioRespiratoria: boolean;                      //Questão 15
  tecnicasHemofiltracao: boolean;                             //Questão 16
  medidaQuantitativa: boolean;                                //Questão 17
  medidaPressaoIntracraniana: boolean;                        //Questão 18
  tratamentoAcidose: boolean;                                 //Questão 19
  hiperAlimentacaoIntravenosa: boolean;                       //Questão 20
  alimentacaoEnteral: boolean;                                //Questão 21
  intervencoesDentroUnidade: boolean;                         //Questão 22
  intervencoesForaUnidade: boolean;                           //Questão 23
  registroAtendimentoLeito: RegistroAtendimentoLeito;
  escore: any;
  dataCriacao: string;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('registroAtendimentoLeito')) {
        this.registroAtendimentoLeito = new RegistroAtendimentoLeito(object['registroAtendimentoLeito']);
        delete object['registroAtendimentoLeito'];
      }

      if(object.hasOwnProperty('dateCreated')){
        this.dataCriacao = object['dateCreated'];
        delete object['dateCreated']
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.aria.Nas : ' + (this.id ? this.id : '(unsaved)');
  }
}
