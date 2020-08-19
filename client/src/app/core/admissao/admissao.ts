import {Atendimento} from '../atendimento/atendimento';
import {Planoterapeutico} from '../planoTerapeutico/planoterapeutico';
import {Diagnostico} from '../diagnostico/diagnostico';

export class Admissao {
  id: number;
  data: string;
  atendimento: Atendimento;
  planoTerapeutico: Planoterapeutico;
  diagnosticos: Diagnostico[];

  constructor(object?: any) {
    Object.assign(this, object);
  }
}
