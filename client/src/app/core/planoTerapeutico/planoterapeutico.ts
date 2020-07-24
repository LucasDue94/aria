import {Atendimento} from '../atendimento/atendimento';

export class Planoterapeutico {
  id?: number;
  resultadoEsperado: string;
  conduta: string;
  problemaAtivo: string;
  prazo: number;
  atendimento: Atendimento;

  constructor(obj?: any) {
    const object: any = Object.assign(obj);
    for (const prop in object) {
      this[prop] = object[prop];
    }
  }

}
