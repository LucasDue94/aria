export class Setor {

  id: number;
  descricao: string;
  tipoSetor: string;
  setorWpd: Object;

  constructor(object?) {
    for (var prop in object) {
      this[prop] = object[prop];
    }
  }
}
