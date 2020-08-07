import {Cid} from '../cid/cid';
import {Usuario} from '../usuario/usuario';
import {EnumDiagnosticoStatus} from './enum/enumDiagnosticoStatus';
import {Atendimento} from '../atendimento/atendimento';

export class Diagnostico {
  cid: Cid;
  status: EnumDiagnosticoStatus.SUSPEITA;
  profissional: Usuario;
  atendimento: Atendimento;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
