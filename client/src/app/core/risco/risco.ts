export class Risco {
  id: number;
  nome: string;
  habilitado: boolean;

  constructor(object?: any) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.aria.Risco : ' + (this.id ? this.id : '(unsaved)');
  }
}
