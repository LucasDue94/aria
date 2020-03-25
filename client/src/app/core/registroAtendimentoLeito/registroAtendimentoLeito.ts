import {Leito} from "../leito/leito";
import {RegistroAtendimento} from "../registroAtendimento/registroAtendimento";


export class RegistroAtendimentoLeito {
  registroAtendimento: RegistroAtendimento;
  leito: Leito;
  dataEntrada: string;


  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('registroAtendimento')) {
        this.registroAtendimento = new RegistroAtendimento(object.registroAtendimento);
        delete object['registroAtendimento'];
      }

      if (object.hasOwnProperty('leito')) {
        this.leito = object['leito'];
        delete object['leito'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.integracao.RegistroAtendimentoLeito : ' + (this.registroAtendimento.id ? this.registroAtendimento.id : '(unsaved)');
  }
}
