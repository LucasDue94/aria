import {Setor} from '../setor/setor';
import {Cid} from '../cid/cid';
import {MotivoAlta} from '../motivoAlta/motivoAlta';
import {Paciente} from '../paciente/paciente';
import {Incidente} from '../incidente/incidente';
import {Ecg} from '../ecg/ecg';
import {Balao} from '../balao/balao';
import {Nas} from '../nas/nas';
import {Convenio} from '../convenio/convenio';
import {RegistroLeito} from '../registroLeito/registroLeito';


export class Atendimento {
  id?: string;
  dataEntrada?: string;
  dataAlta?: string;
  setor?: Setor;
  cid?: Cid;
  motivoAlta?: MotivoAlta;
  tipo?: string;
  ecg?: Ecg;
  balao?: Balao;
  paciente?: Paciente;
  incidentes?: Incidente[] = new Array<Incidente>();
  registroLeitos?: RegistroLeito[] = new Array<RegistroLeito>();
  ultimoNas?: Nas;
  convenio?: Convenio;
  ultimoRegistroLeito?: RegistroLeito;

  constructor(object?: any) {
    if (object) {
      if (object.hasOwnProperty('incidentes')) {
        this.incidentes = object.incidentes.map((obj: any) => {
          return new Incidente(obj);
        });
        delete object.incidentes;
      }

      if (object.hasOwnProperty('registroLeitos')) {
        this.registroLeitos = object.registroLeitos.map((obj: any) => {
          return new RegistroLeito(obj);
        });
        delete object.registroLeitos;
      }

      for (let prop in object) {
        this[prop] = object[prop];
      }
    }
  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.integracao.Atendimento : ' + (this.id ? this.id : '(unsaved)');
  }

  getUltimoRegistroLeito() {
    return this.registroLeitos.length > 0 ? this.registroLeitos[this.registroLeitos.length - 1] : null;
  }
}

