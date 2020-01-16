import {Setor} from "../setor/setor";
import {Grupo} from "../grupo/grupo";

export class Usuario {

  id: number;
  username: string;
  email: string;
  nome: string;
  grupo: Grupo;
  setores: Setor[];

  constructor(object?: any) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

}
