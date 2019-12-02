import {RegistroAtendimentoLeitos} from '../registroAtendimentoLeitos/registroAtendimentoLeitos';
import {SetorWpd} from "../setor-wpd/setorWpd";

export class Leito {
  id: number;
  registroAtendimentoLeitos: RegistroAtendimentoLeitos[];
  descricao: string;
  setor: SetorWpd;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('registroAtendimentoLeitos')) {
        this.registroAtendimentoLeitos = object['registroAtendimentoLeitos'].map((obj: any) => {
          return new RegistroAtendimentoLeitos(obj);
        });
        delete object['registroAtendimentoLeitos'];
      }

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
