import {Setor} from '../setor/setor';
import {Paciente} from '../paciente/paciente';

export class Leito {
  id: string;
  descricao: string;
  setor: Setor;
  setorWpd: string
  numero: string;
  tipo: string;
  paciente: Paciente;
  status: string

  constructor(object?: any) {
    if (object) {
      if (object.hasOwnProperty('setor')) {
        this.setor = new Setor(object['setor']);
        delete object['setor'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.integracao.Leito : ' + (this.id ? this.id : '(unsaved)');
  }
}
