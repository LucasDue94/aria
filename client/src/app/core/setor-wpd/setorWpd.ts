import {Setor} from "../setor/setor";

export class SetorWpd {

  id: number;
  descricao: string;
  setor: Setor;

  constructor(object?) {
    for (var prop in object) {
      this[prop] = object[prop];
    }
  }
}
