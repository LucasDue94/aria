import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'paciente-card',
  templateUrl: './paciente-card.component.html',
  styleUrls: ['./paciente-card.component.scss']
})
export class PacienteCardComponent implements OnInit {
  @Input() paciente;

  constructor() { }

  ngOnInit() {
  }

  getIdade(nasc) {
    let nascimento = new Date(nasc);
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) / 365.25);
  }

}
