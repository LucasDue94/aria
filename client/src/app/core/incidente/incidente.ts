export class Incidente {
  id: string;
  nome: string;

  constructor(object?: any) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }
}
