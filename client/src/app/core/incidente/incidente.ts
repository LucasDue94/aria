import {Risco} from "../risco/risco";

export class Incidente {
  id: string;
  nome: string;
  risco: Risco;

  constructor(object?: any) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }
}
