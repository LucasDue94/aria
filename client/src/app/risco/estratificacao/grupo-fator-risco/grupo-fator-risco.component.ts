import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EstratificacaoRisco} from "../../../core/estratificacaoRisco/estratificacaoRisco";

@Component({
  selector: 'grupo-fator-risco',
  templateUrl: './grupo-fator-risco.component.html',
  styleUrls: ['./grupo-fator-risco.component.scss']
})
export class GrupoFatorRiscoComponent implements OnInit {

  @Input() RISKS_STRATIFICATION;
  estratificacao = new EstratificacaoRisco();

  groupRisk = this.fb.group({
    alergia: this.fb.control(this.estratificacao.alergia, Validators.required),
    acesso_periferico: this.fb.control(this.estratificacao.acesso_periferico, Validators.required),
    drogas_sedativas: this.fb.control(this.estratificacao.drogas_sedativas, Validators.required),
    anticoagulante: this.fb.control(this.estratificacao.anticoagulante, Validators.required),
    plaquetopenia: this.fb.control(this.estratificacao.plaquetopenia, Validators.required),
    operatorio_imediato: this.fb.control(this.estratificacao.operatorio_imediato, Validators.required),
    deficit_cognitivo_demencia: this.fb.control(this.estratificacao.deficit_cognitivo_demencia, Validators.required),
    confusional_agudo: this.fb.control(this.estratificacao.confusional_agudo, Validators.required),
    historia_dor: this.fb.control(this.estratificacao.historia_dor, Validators.required),
    paciente_diabetico: this.fb.control(this.estratificacao.paciente_diabetico, Validators.required),
    jejum_prolongado: this.fb.control(this.estratificacao.jejum_prolongado, Validators.required),
    sonda_nasoenteral: this.fb.control(this.estratificacao.sonda_nasoenteral, Validators.required),
    doencas_neuro_resp: this.fb.control(this.estratificacao.doencas_neuro_resp, Validators.required),
    doenciru_cabeca_pescoco: this.fb.control(this.estratificacao.doenciru_cabeca_pescoco, Validators.required),
    disfagia_orofaringea: this.fb.control(this.estratificacao.disfagia_orofaringea, Validators.required),
    iot_tqt: this.fb.control(this.estratificacao.iot_tqt, Validators.required),
    alteracao_consciencia: this.fb.control(this.estratificacao.alteracao_consciencia, Validators.required),
    comorbidades_clinico_critico: this.fb.control(this.estratificacao.comorbidades_clinico_critico, Validators.required),
    paciente_paliativos: this.fb.control(this.estratificacao.paciente_paliativos, Validators.required),
    analgesicos_opioides: this.fb.control(this.estratificacao.analgesicos_opioides, Validators.required),
    hipoglicemiante_corticoide: this.fb.control(this.estratificacao.hipoglicemiante_corticoide, Validators.required),
    proced_cirug_restric_fisica: this.fb.control(this.estratificacao.proced_cirug_restric_fisica, Validators.required),
  });

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
  }

  getForm() {
    console.log(this.groupRisk.value);
  }

}
