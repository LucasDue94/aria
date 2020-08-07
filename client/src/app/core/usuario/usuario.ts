import {Setor} from '../setor/setor';
import {Grupo} from '../grupo/grupo';
import {Conselho} from '../conselho/conselho';

export class Usuario {

  id: number;
  username: string;
  email: string;
  nome: string;
  grupo: Grupo;
  setores: Setor[];
  conselho: Conselho;

  constructor(object?: any) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }

  getProfessional() {
    const temp = JSON.parse(window.localStorage.getItem('aria'));
    return new Usuario({id: temp.id, nome: temp.nome});
  }

}
