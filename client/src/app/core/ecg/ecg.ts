import {RegistroAtendimento} from '../registroAtendimento/registroAtendimento';

export class Ecg {
  id: number;
  dataHoraEcg: any;
  dataHoraPorta: any;
  registroAtendimentoId: number;
  registroAtendimento: RegistroAtendimento = new RegistroAtendimento();

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('registroAtendimento')) {
        this.registroAtendimento = new RegistroAtendimento(object['registroAtendimento']);
        delete object['registroAtendimento'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.aria.Ecg : ' + (this.id ? this.id : '(unsaved)');
  }
}
