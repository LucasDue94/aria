

export class Grupo {
    id: number;

    

    constructor (object?: any) {
      if (object) {
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.aria.Grupo : ' + (this.id ? this.id : '(unsaved)');
    }
}
