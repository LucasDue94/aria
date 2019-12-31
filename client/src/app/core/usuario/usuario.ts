import {Setor} from "../setor/setor";
import {SetorWpd} from "../setor-wpd/setorWpd";

export class Usuario {

  id: number;
  username: string;
  email: string;
  nome: string;
  setores: Setor[];

  constructor(object?: any) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

}
