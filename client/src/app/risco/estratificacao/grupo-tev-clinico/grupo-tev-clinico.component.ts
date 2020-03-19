import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EstratificacaoRisco} from "../../../core/estratificacaoRisco/estratificacaoRisco";

@Component({
  selector: 'grupo-tev-clinico',
  templateUrl: './grupo-tev-clinico.component.html',
  styleUrls: ['./grupo-tev-clinico.component.scss']
})
export class GrupoTevClinicoComponent implements OnInit {

  @Input() TEV_CLINICAL;
  estratificacao = new EstratificacaoRisco();

  groupTevClinical = this.fb.group({
    tev_clinico_1: this.fb.control(false, Validators.required),
    tev_clinico_2: this.fb.control(false, Validators.required),
    tev_clinico_3: this.fb.control(false, Validators.required),
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  getControl() {
    console.log(this.groupTevClinical.value);
  }
}
