import {SetorWpd} from "../setor-wpd/setorWpd";

export class Leito {
  id: string;
  descricao: string;
  setor: SetorWpd;

  constructor(object?: any) {
    if (object) {
      if (object.hasOwnProperty('setor')) {
        this.setor = new SetorWpd(object['setor']);
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
