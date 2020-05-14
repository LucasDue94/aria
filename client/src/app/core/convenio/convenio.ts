export class Convenio {
  id: string;
  fantasia: string;

  constructor(object?: any) {
    for (const prop in object) {
      this[prop] = object[prop];
    }
  }
}
