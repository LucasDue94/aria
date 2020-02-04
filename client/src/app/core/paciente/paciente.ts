import {RegistroAtendimento} from '../registroAtendimento/registroAtendimento';
import {Incidente} from "../incidente/incidente";

export class Paciente {
  id: string;
  nome: string;
  registros: RegistroAtendimento[];
  incidentes: Incidente[];
  sexo: any;
  nomeMae: string;
  nascimento: any;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('registros')) {
        this.registros = object['registros'].map((obj: any) => {
          return new RegistroAtendimento(obj);
        });
        delete object['registros'];
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
