import {Atendimento} from '../atendimento/atendimento';
import {Paciente} from "../paciente/paciente";

export class Ecg {
  id: number;
  dataHoraEcg: any;
  dataHoraPorta: any;
  paciente: Paciente;
  atendimento: Atendimento = new Atendimento();

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
    return 'br.com.hospitaldocoracaoal.aria.Ecg : ' + (this.id ? this.id : '(unsaved)');
  }
}
