import {AfterViewChecked, Component, Input, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'paciente-card',
  templateUrl: './paciente-card.component.html',
  styleUrls: ['./paciente-card.component.scss']
})
export class PacienteCardComponent implements OnInit, AfterViewChecked {
  @Input() paciente;

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
  }

  getIdade(nasc) {
    let nascimento = new Date(nasc);
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) / 365.25);
  }
}
