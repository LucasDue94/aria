import {Leito} from '../leito/leito';
import {Atendimento} from '../atendimento/atendimento';
import {Nas} from '../nas/nas';
import {Apache} from '../apache/apache';


export class RegistroLeito {
  id: string;
  atendimento: Atendimento;
  leito: Leito;
  dataEntrada: string;
  dataAlta: string;
  nas: Nas[];
  apache: Apache;

  constructor(object?: any) {
    if (object) {
      if (object.hasOwnProperty('atendimento')) {
        this.atendimento = new Atendimento(object.atendimento);
        delete object.atendimento;
      }

      if (object.hasOwnProperty('apache')) {
        this.apache = new Apache(object.apache);
        delete object.apache;
      }

      if (object.hasOwnProperty('nas')) {
        this.nas = object.nas.map((obj: any) => {
          return new Nas(obj);
        });
        delete object.nas;
      }

      if (object.hasOwnProperty('leito')) {
        this.leito = object.leito;
        delete object.leito;
      }

      for (const prop in object) {
        this[prop] = object[prop];
      }
    }
  }

  lastNas() {
    this.nas = this.nas.sort((a, b) => {
      if (a.data > b.data) {
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
