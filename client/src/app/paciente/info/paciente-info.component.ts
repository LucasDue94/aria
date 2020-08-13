import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {faWindowMinimize} from '@fortawesome/free-solid-svg-icons/faWindowMinimize';
import {Paciente} from '../../core/paciente/paciente';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';

@Component({
  selector: 'paciente-info',
  templateUrl: './paciente-info.component.html',
  styleUrls: ['./paciente-info.component.scss']
})
export class PacienteInfoComponent implements OnChanges {
  @Input() paciente: Paciente;
  @Input() extras = [];
  @Input() backgroundColor: string;
  @Input() shadow: string;
  @Input() useMinimizeButton = true;
  windowMinimizeIcon = faWindowMinimize;
  faPlus = faPlus;
  minimize = false;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.transforText(this.paciente);
    this.transforText(this.extras);
  }

  transforText(obj) {
    for (const prop in obj) {
      obj[prop] = typeof obj[prop] != 'object' ? obj[prop].toLowerCase() : obj[prop];
    }
  }

  getIdade(nasc) {
    const nascimento = new Date(nasc);
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) / 365.25);
  }

  // TODO implementar o redirecionamento para o Histórico do Paciente ao clicar.
}
