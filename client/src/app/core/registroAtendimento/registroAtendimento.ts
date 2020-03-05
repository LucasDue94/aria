import {Setor} from "../setor/setor";
import {Cid} from "../cid/cid";
import {MotivoAlta} from "../motivoAlta/motivoAlta";
import {Paciente} from "../paciente/paciente";
import {Incidente} from "../incidente/incidente";
import {Ecg} from "../ecg/ecg";
import {Balao} from "../balao/balao";


export class RegistroAtendimento {
  id: string;
  dataEntrada: string;
  dataAlta: string;
  setor: Setor;
  cid: Cid;
  motivoAlta: MotivoAlta;
  tipo: string;
  ecg: Ecg;
  balao: Balao;
  paciente: Paciente;
  incidentes?: Incidente[] = new Array<Incidente>();

  constructor(object?: any) {
    if (object) {
      if (object.hasOwnProperty('incidentes')) {
        this.incidentes = object['incidentes'].map((obj: any) => {
          return new Incidente(obj);
        });
        delete object['incidentes'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.integracao.RegistroAtendimento : ' + (this.id ? this.id : '(unsaved)');
  }
}
