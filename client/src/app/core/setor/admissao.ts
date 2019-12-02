import {Leito} from "../leito/leito";
import {RegistroAtendimento} from "../registroAtendimento/registroAtendimento";

export class Admissao {
  dataEntrada: string;
  leito: Leito;
  registroAtendimento: RegistroAtendimento;

  constructor(object?) {
    if (object) {

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }
}
