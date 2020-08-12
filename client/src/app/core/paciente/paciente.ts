import {Atendimento} from '../atendimento/atendimento';

export class Paciente {
  id: string;
  nome: string;
  atendimentos: Atendimento[];
  sexo: string;
  nomeMae: string;
  nascimento: any;
  status: string;

  constructor(object?: any) {
    if (object) {
      if (object.hasOwnProperty('atendimentos')) {
        this.atendimentos = object['atendimentos'].map((obj: any) => {
          return new Atendimento(obj);
        });
        delete object['atendimentos'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  public stringSexo() {
    let sex = '';
    if (this.sexo != null && this.sexo !== '' && this.sexo.toLowerCase() === 'm') {
      sex = 'Masculino';
    } else if (this.sexo !== null && this.sexo !== '' && this.sexo.toLowerCase() === 'f') {
      sex = 'Feminino';
    }
    return sex;
  }

  getResgistrosInternacao() {
    return this.atendimentos.filter(a => a.tipo === 'I');
  }

  getConvenio(): string {
    return this.atendimentos.length > 0 ? (this.atendimentos[this.atendimentos.length - 1].convenio || {fantasia: ''}).fantasia : '';
  }

  getSetor() {
    if (this.atendimentos.filter(a => a.registroLeitos.length === 0)) {
      return this.getResgistrosInternacao().length > 0 ? this.getResgistrosInternacao()[this.getResgistrosInternacao().length - 1].getUltimoRegistroLeito().leito.setor : null;
    } else {
      return this.atendimentos.length > 0 ? this.atendimentos[this.atendimentos.length - 1].getUltimoRegistroLeito().leito.setor : null;
    }
  }

  getLeito() {
    if (this.atendimentos.filter(a => a.registroLeitos.length === 0)) {
      return this.getResgistrosInternacao().length > 0 ? this.getResgistrosInternacao()[this.getResgistrosInternacao().length - 1].getUltimoRegistroLeito().leito : null;
    } else {
      return this.atendimentos.length > 0 ? this.atendimentos[this.atendimentos.length - 1].getUltimoRegistroLeito().leito : null;
    }
  }

  getUltimoRegistro() {
    return this.atendimentos.length > 0 ? this.atendimentos[this.atendimentos.length - 1] : null;
  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.integracao.Paciente : ' + (this.id ? this.id : '(unsaved)');
  }
}


