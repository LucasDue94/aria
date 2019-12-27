import { Grupo } from '../grupo/grupo';

export class Permissao {
    id: number;

    authority: string;
  nome: string;
  grupos: Grupo[];

    constructor (object?: any) {
      if (object) {
        
        if (object.hasOwnProperty('grupos')) {
          this.grupos = object['grupos'].map((obj: any) => { return new Grupo(obj); });
        delete object['grupos'];
        }
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.aria.Permissao : ' + (this.id ? this.id : '(unsaved)');
    }
}
