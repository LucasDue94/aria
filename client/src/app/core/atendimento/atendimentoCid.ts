import {Atendimento} from './atendimento';
import {Cid} from '../cid/cid';

export class AtendimentoCid {
  id?: number;
  status: string;
  cid: Cid;
  atendimento: Atendimento;

  constructor(obj?: any) {
    const object: any = Object.assign(obj);
    for (const prop in object) {
      this[prop] = object[prop];
    }
  }

}
