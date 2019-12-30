import {Setor} from "../setor/setor";
import {SetorWpd} from "../setor-wpd/setorWpd";

export class Usuario {

  id: number;
  username: string;
  email: string;
  nome: string;
  setor: Setor = new Setor();

  constructor(object?: any) {
    if (object) {
      if (object.hasOwnProperty('setor')) {
        this.setor = new Setor(object['setor']);
        delete object['setor'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

}
