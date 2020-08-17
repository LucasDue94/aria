import {Component, Input, OnInit} from '@angular/core';
import {Paciente} from '../../core/paciente/paciente';

@Component({
  selector: 'plano-terapeutico-show',
  templateUrl: './plano-terapeutico-show.component.html',
  styleUrls: ['./plano-terapeutico-show.component.scss']
})
export class PlanoTerapeuticoShowComponent implements OnInit {

  @Input() paciente: Paciente;

  constructor() {
  }

  ngOnInit() {
  }

}
