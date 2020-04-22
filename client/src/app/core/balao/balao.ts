import {Atendimento} from '../atendimento/atendimento';
import {Paciente} from "../paciente/paciente";

export class Balao {
  id: number;
  registroAtendimento: Atendimento;
  dataHoraBalao: any;
  paciente: Paciente;
  registroAtendimentoId: number;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('registroAtendimento')) {
        this.registroAtendimento = new Atendimento(object['registroAtendimento']);
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
