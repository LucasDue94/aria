

export class RegistroAtendimentoLeitos {
    id: number;

    

    constructor (object?: any) {
      if (object) {
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.integracao.RegistroAtendimentoLeitos : ' + (this.id ? this.id : '(unsaved)');
    }
}
