import {Component, Input} from '@angular/core';

@Component({
  selector: 'tabela-resumo',
  templateUrl: './tabela-resumo.component.html',
  styleUrls: ['./tabela-resumo.component.scss']
})
export class TabelaResumoComponent {

  @Input() statusArray;
  @Input() leitos;
  @Input() setores;

  constructor() {
  }

  countByStatusAndSetor(status, setor) {
    let leitos = this.filterLeitos(setor);
    let filtered = leitos.filter((el) => {
      return el.status.toLowerCase() == status.id.toLowerCase();
    });
    return filtered.length;
  }

  countByStatus(status) {
    let leitos = [];
    if (this.leitos && this.leitos.length > 0) {
      let leitos = this.leitos.filter((el) => {
        return el.status.toLowerCase() == status.id.toLowerCase();
      });
      return leitos.length;
    }
    return leitos;
  }

  filterLeitos(setor) {
    let leitos = [];

    if (this.leitos && this.leitos.length > 0) {
      leitos = this.leitos.filter((leito) => {
        return leito.setor.descricao == setor;
      });

      leitos.sort((a, b) => {
        const numbA = parseInt(this.removeChar(a.id));
        const numbB = parseInt(this.removeChar(b.id));
        if (numbA > numbB) return 1;
        if (numbA < numbB) return -1;
      });

      leitos.sort((a, b) => {
        if (a.tipo > b.tipo) return 1;
        if (a.tipo < b.tipo) return -1;
      });
    }
    return leitos;
  }

  removeChar = (text) => text.replace(/\D+/, '');

  toPercent(number) {
    if (this.leitos != undefined) return Math.round((parseInt(number) / this.leitos.length) * 100);
  }

}
