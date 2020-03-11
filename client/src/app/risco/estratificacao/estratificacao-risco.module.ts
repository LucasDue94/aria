import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstratificacaoRiscoFormComponent } from './form/estratificacao-risco-form.component';
import {PacienteInfoModule} from "../../paciente-info/paciente-info.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {StepModule} from "../../step/step.module";



@NgModule({
  declarations: [EstratificacaoRiscoFormComponent],
    imports: [
        CommonModule,
        PacienteInfoModule,
        FontAwesomeModule,
        StepModule
    ],
  exports: [
    EstratificacaoRiscoFormComponent
  ]
})
export class EstratificacaoRiscoModule { }
