import {RegistroAtendimentoLeito} from '../registroAtendimentoLeitos/registroAtendimentoLeito';

export class Apache {
  id: number;
  temperatura: string;
  pas: number;
  pad: number;
  frequenciaCardiaca: string;
  frequenciaRespiratoria: string;
  aapo: string;
  arterialPh: string;
  naSerico: string;
  kSerico: string;
  creatininaSerica: string;
  hematocrito: string;
  leucocitos: string;
  glasgow: number;
  problemasCronicos: string;
  registroAtendimentoLeito: RegistroAtendimentoLeito;
  escore: any;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('registroAtendimentoLeito')) {
        this.registroAtendimentoLeito = new RegistroAtendimentoLeito(object['registroAtendimentoLeito']);
        delete object['registroAtendimentoLeito'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }


  toString(): string {
    return 'br.com.hospitaldocoracaoal.aria.Apache : ' + (this.id ? this.id : '(unsaved)');
  }
}
