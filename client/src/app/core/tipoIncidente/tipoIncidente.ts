import { Risco } from '../risco/risco';

export class TipoIncidente {
    id: number;

    nome: string;
    riscos: Risco[] = new Array<Risco>();

    constructor (object?: any) {
      if (object) {
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }
    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.aria.TipoIncidente : ' + (this.id ? this.id : '(unsaved)');
    }
}
