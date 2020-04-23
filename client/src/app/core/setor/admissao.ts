import {Leito} from "../leito/leito";
import {Atendimento} from "../atendimento/atendimento";

export class Admissao {
  dataEntrada: string;
  leito: Leito;
  registroAtendimento: Atendimento;

  constructor(object?) {
    if (object) {

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }
}
