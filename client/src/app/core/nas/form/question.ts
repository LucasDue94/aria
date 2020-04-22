import {Alternative} from "./alternative";
import {Atendimento} from "../../atendimento/atendimento";

export class Question {
  number: string;
  title: string;
  alternatives: Alternative[];
  name:string;

  constructor(object?: any) {

    if (object) {
      if (object.hasOwnProperty('alternatives')) {
        this.alternatives = object['alternatives'].map((obj: any) => {
          return new Atendimento(obj);
        });
        delete object['alternatives'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }
}
