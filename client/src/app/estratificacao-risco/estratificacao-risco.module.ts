import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstratificacaoRiscoFormComponent } from './form/estratificacao-risco-form.component';
import {PacienteInfoModule} from "../paciente-info/paciente-info.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [EstratificacaoRiscoFormComponent],
    imports: [
        CommonModule,
        PacienteInfoModule,
        FontAwesomeModule
    ],
  exports: [
    EstratificacaoRiscoFormComponent
  ]
})
export class EstratificacaoRiscoModule { }
