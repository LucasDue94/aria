import {Atendimento} from '../atendimento/atendimento';
import {Paciente} from "../paciente/paciente";

export class Balao {
  id: number;
  atendimento: Atendimento;
  dataHoraBalao: any;
  paciente: Paciente;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('atendimento')) {
        this.atendimento = new Atendimento(object['atendimento']);
        delete object['atendimento'];
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
