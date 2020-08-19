import {Atendimento} from '../atendimento/atendimento';
import {Diagnostico} from '../diagnostico/diagnostico';
import {PlanoTerapeutico} from '../planoTerapeutico/planoTerapeutico';

export class Admissao {
  id: number;
  data: string;
  atendimento: Atendimento;
  planoTerapeutico: PlanoTerapeutico;
  diagnosticos: Diagnostico[];

  constructor(object?: any) {
    Object.assign(this, object);
  }
}
