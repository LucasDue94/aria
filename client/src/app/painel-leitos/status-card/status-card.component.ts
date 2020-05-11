import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['../painel-leitos.component.scss']
})
export class StatusCardComponent implements OnInit {
  @Input() setor;
  @Input() statusArray;
  @Input() leitos;

  constructor() {
  }

  countByStatusAndSetor(status, setor) {
    let leitos = this.filterLeitos(setor);
    let filtered = leitos.filter((el) => {
      return el.status == status.id;
    });
    return filtered.length;
  }

  filterLeitos(setor) {
    let leitos = [];

    if (this.leitos != undefined) {
      leitos = this.leitos.filter((leito) => {
        return leito.setorWpd == setor;
      });
    }

    leitos.sort((a, b) => {
      const numbA = parseInt(this.removeChar(a.numero));
      const numbB = parseInt(this.removeChar(b.numero));
      if (numbA > numbB) return 1;
      if (numbA < numbB) return -1;
    });

    leitos.sort((a, b) => {
      if (a.tipo > b.tipo) return 1;
      if (a.tipo < b.tipo) return -1;
    });
    return leitos;
  }

  removeChar = (text) => text.replace(/\D+/, '');

  ngOnInit() {
  }

}
