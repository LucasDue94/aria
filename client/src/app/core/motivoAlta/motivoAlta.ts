export class MotivoAlta {
  id: number;
  descricao: string;
  classificacao: any;

  constructor(object?: any) {
    if (object) {

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.integracao.MotivoAlta : ' + (this.id ? this.id : '(unsaved)');
  }
}
