import {Setor} from '../setor/setor';
import {Atendimento} from '../atendimento/atendimento';

export class Leito {
  id: string;
  descricao: string;
  setor: Setor;
  numero: string;
  tipo: string;
  atendimento: Atendimento
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
