export class Cid {
  id: number;
  diagnostico: string;
  codigo: string;

  constructor(object?: any) {
    if (object) {

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.integracao.Cid : ' + (this.id ? this.id : '(unsaved)');
  }
}
