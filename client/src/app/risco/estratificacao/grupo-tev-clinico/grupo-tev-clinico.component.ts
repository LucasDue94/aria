import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EstratificacaoRisco} from "../../../core/estratificacaoRisco/estratificacaoRisco";

@Component({
  selector: 'grupo-tev-clinico',
  templateUrl: './grupo-tev-clinico.component.html',
  styleUrls: ['./grupo-tev-clinico.component.scss']
})
export class GrupoTevClinicoComponent implements OnInit {

  @Input() tev_clinical;
  @Input() formGroupTevClinical: FormGroup;
  estratificacao = new EstratificacaoRisco();


  constructor() {
  }

  ngOnInit() {
    this.createGroup();
  }

  createGroup() {
    this.formGroupTevClinical.addControl("tev_clinico_1", new FormControl(false, Validators.required));
    this.formGroupTevClinical.addControl("tev_clinico_2", new FormControl(false, Validators.required));
    this.formGroupTevClinical.addControl("tev_clinico_3", new FormControl(false, Validators.required));
  }
}
