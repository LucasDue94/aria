import {RegistroAtendimento} from '../registroAtendimento/registroAtendimento';

export class PortaBalao {
  id: number;
  registroAtendimento: RegistroAtendimento;
  dataHoraBalao: any;

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
    return 'br.com.hospitaldocoracaoal.aria.PortaBalao : ' + (this.id ? this.id : '(unsaved)');
  }
}
