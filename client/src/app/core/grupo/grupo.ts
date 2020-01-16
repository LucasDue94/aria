import {Permissao} from "../permissao/permissao";

export class Grupo {
  id: number;
  name: string;
  habilitado: boolean;
  permissoes: Permissao[] = new Array<Permissao>();

  constructor(object?: any) {
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
