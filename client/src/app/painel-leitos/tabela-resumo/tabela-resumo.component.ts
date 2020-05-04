import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tabela-resumo',
  templateUrl: './tabela-resumo.component.html',
  styleUrls: ['./tabela-resumo.component.scss']
})
export class TabelaResumoComponent implements OnInit {

  @Input() statusArray;
  @Input() leitos;
  @Input() setoresOrdenados;

  constructor() {
  }

  ngOnInit() {
  }

  countByStatusAndSetor(status, setor) {
    let leitos = this.filterLeitos(setor);
    let filtered = leitos.filter(function (el) {
      return el.status == status.id
    });
    return filtered.length;
  }

  countByStatus(status) {
    let leitos = [];
    if (this.leitos != undefined) {
      let leitos = this.leitos.filter(function (el) {
        return el.status == status.id
      });
      return leitos.length;
    }
    return leitos;
  }

  filterLeitos(setor) {
    let leitos = [];

    if (this.leitos != undefined) {
      leitos = this.leitos.filter(function (leito) {
        return leito.setor == setor;
      });
    }

    leitos.sort((a, b) => {
      const numbA = parseInt(this.removeChar(a.numero));
      const numbB = parseInt(this.removeChar(b.numero));
      if (numbA > numbB) return 1;
      if (numbA < numbB) return -1
    });

    leitos.sort((a, b) => {
      if (a.tipo > b.tipo) return 1;
      if (a.tipo < b.tipo) return -1;
    });
    return leitos;
  }

  removeChar = (text) => text.replace(/\D+/, '');

  toPercent(number) {
    if (this.leitos != undefined) return Math.round((parseInt(number) / this.leitos.length) * 100);
  }

}
