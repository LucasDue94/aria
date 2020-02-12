import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'paciente-info',
  templateUrl: './paciente-info.component.html',
  styleUrls: ['./paciente-info.component.scss']
})
export class PacienteInfoComponent implements OnInit {
  @Input() nome: string;
  @Input() mae: string;
  @Input() registro: string;
  @Input() prontuario: string;
  @Input() dataNascimento: string;
  @Input() sexo: string;
  @Input() dataEntrada: string;
  @Input() dataSaida: string;
  @Input() motivoAlta: string;
  @Input() setor: string;

  constructor() {
  }

  ngOnInit() {
  }

  getIdade(nasc) {
    let nascimento = new Date(nasc);
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) / 365.25);
  }


}
