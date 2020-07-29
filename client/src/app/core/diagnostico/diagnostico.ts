import {Cid} from '../cid/cid';
import {Usuario} from '../usuario/usuario';
import {EnumDiagnosticoStatus} from './enum/enumDiagnosticoStatus';

export class Diagnostico {
  cid: Cid;
  status: EnumDiagnosticoStatus;
  profissional: Usuario;
}
