import {RegistroAtendimento} from '../registroAtendimento/registroAtendimento';
import {Incidente} from "../incidente/incidente";

export class Paciente {
  id: string;
  nome: string;
  registrosAtendimento: RegistroAtendimento[];
  sexo: any;
  nomeMae: string;
  nascimento: any;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('registrosAtendimento')) {
        this.registrosAtendimento = object['registrosAtendimento'].map((obj: any) => {
          return new RegistroAtendimento(obj);
        });
        delete object['registrosAtendimento'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }


  toString(): string {
    return 'br.com.hospitaldocoracaoal.integracao.Paciente : ' + (this.id ? this.id : '(unsaved)');
  }
}
