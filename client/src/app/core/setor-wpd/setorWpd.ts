export class SetorWpd {

  id: number;
  descricao: string;

  constructor(object?) {
    for (var prop in object) {
      this[prop] = object[prop];
    }
  }
}