import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstratificacaoRiscoFormComponent } from './form/estratificacao-risco-form.component';
import {PacienteInfoModule} from "../paciente-info/paciente-info.module";



@NgModule({
  declarations: [EstratificacaoRiscoFormComponent],
  imports: [
    CommonModule,
    PacienteInfoModule
  ],
  exports: [
    EstratificacaoRiscoFormComponent
  ]
})
export class EstratificacaoRiscoModule { }
