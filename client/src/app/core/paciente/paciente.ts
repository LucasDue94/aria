import {Atendimento} from '../atendimento/atendimento';

export class Paciente {
  id: string;
  nome: string;
  atendimentos: Atendimento[];
  sexo: any;
  nomeMae: string;
  nascimento: any;

  prontuario: string;
  registro: string
  leito: string;
  paciente: string;
  mae: string;
  convenio: string;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('atendimentos')) {
        this.atendimentos = object['atendimentos'].map((obj: any) => {
          return new Atendimento(obj);
        });
        delete object['atendimentos'];
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


