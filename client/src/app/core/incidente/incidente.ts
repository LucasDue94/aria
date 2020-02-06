import {TipoIncidente} from "../tipoIncidente/tipoIncidente";

export class Incidente {
  id: string;
  dataHora: Date;
  tipoIncidente: TipoIncidente;

  constructor(object?: any) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }
}
