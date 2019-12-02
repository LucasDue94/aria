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

    constructor (object?: any) {
      if (object) {
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'br.com.hospitaldocoracaoal.integracao.RegistroAtendimento : ' + (this.id ? this.id : '(unsaved)');
    }
}
