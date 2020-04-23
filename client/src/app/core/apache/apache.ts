import {RegistroLeito} from '../registroLeito/registroLeito';

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
  registroLeito: RegistroLeito;
  escore: any;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('registroLeito')) {
        this.registroLeito = new RegistroLeito(object['registroLeito']);
        delete object['registroLeito'];
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
