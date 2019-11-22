import {SetorWpd} from "../setor-wpd/setorWpd";

export class Setor {

  id: number;
  sigla: string;
  descricao: string;
  tipoSetor: string;
  setorWpd: SetorWpd = new SetorWpd();

  constructor(object?) {
    if (object) {
      if (object.hasOwnProperty('setorWpd')) {
        this.setorWpd = object['setorWpd'].map((obj: any) => {
          return new SetorWpd(obj);
        });
        delete object['setorWpd'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }
}
