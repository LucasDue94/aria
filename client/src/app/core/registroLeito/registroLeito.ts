import {Leito} from '../leito/leito';
import {Atendimento} from '../atendimento/atendimento';
import {Nas} from '../nas/nas';


export class RegistroLeito {
  atendimento: Atendimento;
  leito: Leito;
  dataEntrada: string;
  dataAlta: string;
  nas: Nas[];

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('atendimento')) {
        this.atendimento = new Atendimento(object.registroAtendimento);
        delete object['registroAtendimento'];
      }

      if (object.hasOwnProperty('nas')) {
        this.nas = object['nas'].map((obj: any) => {
          return new Nas(obj);
        });
        delete object['nas'];
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

  lastNas() {
    this.nas = this.nas.sort(function(a, b) {
      if (a.dataCriacao > b.dataCriacao) {
        return 1;
      } else {
        return -1;
      }
    });

    return this.nas[this.nas.length - 1];
  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.integracao.RegistroLeito : ' + (this.atendimento.id ? this.atendimento.id : '(unsaved)');
  }
}
