import {TipoIncidente} from "../tipoIncidente/tipoIncidente";
import {Paciente} from "../paciente/paciente";

export class Incidente {
  id: string;
  dataHora: Date;
  paciente: Paciente;
  tipoIncidente: TipoIncidente;
  obs: string;

  constructor(object?: any) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }
}
