import {RegistroAtendimento} from '../registroAtendimento/registroAtendimento';
import {Incidente} from "../incidente/incidente";

export class Paciente {
  id: string;
  nome: string;
  registros: RegistroAtendimento[];
  incidentes: Incidente[] = new Array<Incidente>();
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

      if (object.hasOwnProperty('incidentes')) {
        this.incidentes = object['incidentes'].map((obj: any) => {
          return new Incidente(obj);
        });
        delete object['incidentes'];
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
