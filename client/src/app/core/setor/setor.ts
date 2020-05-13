export class Setor {

  id: string;
  sigla: string;
  descricao: string;
  tipoSetor: string;
  prazoApache: number;
  habilitado: boolean;

  constructor(object?) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }
}
