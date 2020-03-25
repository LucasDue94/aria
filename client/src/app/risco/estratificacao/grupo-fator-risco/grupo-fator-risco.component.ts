import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EstratificacaoRisco} from "../../../core/estratificacaoRisco/estratificacaoRisco";

@Component({
  selector: 'grupo-fator-risco',
  templateUrl: './grupo-fator-risco.component.html',
  styleUrls: ['./grupo-fator-risco.component.scss']
})
export class GrupoFatorRiscoComponent implements OnInit {

  @Input() risks_stratification;
  @Input() formGroupRisk: FormGroup;
  estratificacao = new EstratificacaoRisco();

  constructor() {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroupRisk.addControl("alergia", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("acesso_periferico", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("drogas_sedativas", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("anticoagulante", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("plaquetopenia", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("posoperatorio_imediato", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("posoperatorio_imediato", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("deficit_cognitivo_demencia", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("confusional_agudo", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("confusional_agudo", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("historia_dor", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("paciente_diabetico", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("jejum_prolongado", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("sonda_nasoenteral", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("doencas_neuro_resp", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("doenciru_cabeca_pescoco", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("disfagia_orofaringea", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("iot_tqt", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("alteracao_consciencia", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("comorbidades_clinico_critico", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("paciente_paliativos", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("analgesicos_opioides", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("hipoglicemiante_corticoide", new FormControl('', Validators.required));
    this.formGroupRisk.addControl("proced_cirug_restric_fisica", new FormControl('', Validators.required));
  }

}
