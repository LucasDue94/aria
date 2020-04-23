import {Atendimento} from '../atendimento/atendimento';
import {Paciente} from "../paciente/paciente";

export class Ecg {
  id: number;
  dataHoraEcg: any;
  dataHoraPorta: any;
  registroAtendimentoId: number;
  paciente: Paciente;
  registroAtendimento: Atendimento = new Atendimento();

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
    return 'br.com.hospitaldocoracaoal.aria.Ecg : ' + (this.id ? this.id : '(unsaved)');
  }
}
