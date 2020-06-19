import {AfterViewChecked, Component, Input, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'paciente-card',
  templateUrl: './paciente-card.component.html',
  styleUrls: ['./paciente-card.component.scss']
})
export class PacienteCardComponent {
  @Input() atendimento;

  constructor() {
  }

  getIdade(nasc) {
    if(nasc != null) {
      let nascimento = new Date(nasc.replace(/-/g, "/"));
      return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) / 365.25);
    }
    return ''
  }

  stringToDate(date) {
    return date != null ? new Date(date.replace(/-/g, "/")).toLocaleDateString('pt-BR') : '';
  }
}
