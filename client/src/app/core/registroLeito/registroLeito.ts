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

  getLastNas = () => this.atendimento.ultimoNas;

  toString(): string {
    return 'br.com.hospitaldocoracaoal.integracao.RegistroLeito : ' + (this.atendimento.id ? this.atendimento.id : '(unsaved)');
  }
}
