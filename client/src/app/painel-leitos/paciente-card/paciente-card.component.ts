import {AfterViewChecked, Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';

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
   /* let pacienteCard = document.getElementById('paciente-card');
    if (pacienteCard) {
      let leitoContainer = this.render.parentNode(pacienteCard);
      this.render.setStyle(pacienteCard, 'top', `${leitoContainer.offsetTop + 20}px`);
    }*/
  }

  ngAfterViewChecked(): void {
  }

  getIdade(nasc) {
    let nascimento = new Date(nasc);
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) / 365.25);
  }


}
