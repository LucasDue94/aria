import {RegistroAtendimento} from '../registroAtendimento/registroAtendimento';
import {Paciente} from "../paciente/paciente";

export class Balao {
  id: number;
  registroAtendimento: RegistroAtendimento;
  dataHoraBalao: any;
  paciente: Paciente;

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
    return 'br.com.hospitaldocoracaoal.aria.Balao : ' + (this.id ? this.id : '(unsaved)');
  }
}
