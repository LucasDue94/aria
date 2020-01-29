import { Risco } from '../risco/risco';

export class TipoIncidente {
    id: number;

    nome: string;
    risco: Risco;

    constructor (object?: any) {
      if (object) {

        if (object.hasOwnProperty('risco')) {
          this.risco = new Risco(object['risco']);
        delete object['risco'];
        }

        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.aria.TipoIncidente : ' + (this.id ? this.id : '(unsaved)');
    }
}
