import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'grupo-escala-jh-frat',
  templateUrl: './grupo-escala-jh-frat.component.html',
  styleUrls: ['./grupo-escala-jh-frat.component.scss']
})
export class GrupoEscalaJhFratComponent implements OnInit {

  @Input() escala_jh_frat;
  @Input() formGroupJhFrat: FormGroup;
  @Input() hasError: boolean;
  faEclamation = faExclamationCircle;

  constructor() { }

  ngOnInit() {
    this.createGroup();
  }

  createGroup() {
    this.formGroupJhFrat.addControl('jh_eliminacoes_intestinais', new FormControl('', Validators.required));
    this.formGroupJhFrat.addControl('jh_mobilidade', new FormControl('', Validators.required));
    this.formGroupJhFrat.addControl('jh_equipamentos_assistenciais', new FormControl('', Validators.required));
    this.formGroupJhFrat.addControl('jh_uso_medicamentos_risco_quedas', new FormControl('', Validators.required));
    this.formGroupJhFrat.addControl('jh_cognicao', new FormControl('', Validators.required));
  }
}
