import {Setor} from "../setor/setor";
import {Cid} from "../cid/cid";
import {MotivoAlta} from "../motivoAlta/motivoAlta";
import {Paciente} from "../paciente/paciente";


export class RegistroAtendimento {
  id: number;
  dataEntrada: string;
  dataAlta: string;
  setor: Setor;
  cid: Cid;
  motivoAlta: MotivoAlta;
  tipo: string;
  paciente: Paciente;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('cid')) {
        this.cid = object['cid'].map((obj: any) => {
          return new Cid(obj);
        });
        delete object['cid'];
      }

   /*   if (object.hasOwnProperty('setor')) {
        this.setor = object['setor'].map((obj: any) => {
          return new Setor(obj);
        });
        delete object['setor'];
      }*/

      if (object.hasOwnProperty('motivoAlta')) {
        this.motivoAlta = object['motivoAlta'].map((obj: any) => {
          return new MotivoAlta(obj);
        });
        delete object['motivoAlta'];
      }

      /*if (object.hasOwnProperty('paciente')) {
        this.paciente = object['paciente'].map((obj: any) => {
          return new Paciente(obj);
        });
        delete object['paciente'];
      }*/

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.integracao.RegistroAtendimento : ' + (this.id ? this.id : '(unsaved)');
  }
}
