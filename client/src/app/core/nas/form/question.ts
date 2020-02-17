import {Alternative} from "./alternative";
import {RegistroAtendimento} from "../../registroAtendimento/registroAtendimento";

export class Question {
  number: string;
  title: string;
  alternatives: Alternative[];
  name:string;

  constructor(object?: any) {

    if (object) {
      if (object.hasOwnProperty('alternatives')) {
        this.alternatives = object['alternatives'].map((obj: any) => {
          return new RegistroAtendimento(obj);
        });
        delete object['alternatives'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }
}
