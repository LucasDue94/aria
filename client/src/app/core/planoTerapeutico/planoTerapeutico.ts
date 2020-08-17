import {Atendimento} from '../atendimento/atendimento';

export class PlanoTerapeutico {
  id?: number;
  resultadoEsperado: string;
  conduta: string;
  problemaAtivo: string;
  prazo: number;
  atendimento: Atendimento;
  atingido = false;
  inicio: string;
  fim: string;

  constructor(obj?: any) {
    const object = Object.assign(obj);
    for (const prop in object) {
      if (object.hasOwnProperty(prop)) {
        this[prop] = object[prop];
      }
    }
  }
}
