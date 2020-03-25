import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'grupo-bradenq',
  templateUrl: './grupo-bradenq.component.html',
  styleUrls: ['./grupo-bradenq.component.scss']
})
export class GrupoBradenqComponent implements OnInit {

  @Input() bradenq;
  @Input() formGroupBradenq: FormGroup;
  constructor() { }

  ngOnInit() {
    this.createGroup();
  }

  createGroup() {
    this.formGroupBradenq.addControl('bradenq_mobilidade', new FormControl('', Validators.required));
    this.formGroupBradenq.addControl('bradenq_atividade', new FormControl('', Validators.required));
    this.formGroupBradenq.addControl('bradenq_percepcao_sensorial', new FormControl('', Validators.required));
    this.formGroupBradenq.addControl('bradenq_umidade', new FormControl('', Validators.required));
    this.formGroupBradenq.addControl('bradenq_friccao_deslizamento', new FormControl('', Validators.required));
    this.formGroupBradenq.addControl('bradenq_nutricao', new FormControl('', Validators.required));
    this.formGroupBradenq.addControl('bradenq_perfusao_tecidual_oxigenacao', new FormControl('', Validators.required));
  }

}
