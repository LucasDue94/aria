import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstratificacaoRiscoFormComponent } from './form/estratificacao-risco-form.component';
import {PacienteInfoModule} from "../../paciente-info/paciente-info.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgSelectModule} from "@ng-select/ng-select";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [EstratificacaoRiscoFormComponent],
    imports: [
        CommonModule,
        PacienteInfoModule,
        FontAwesomeModule,
        NgSelectModule,
        ReactiveFormsModule
    ],
  exports: [
    EstratificacaoRiscoFormComponent
  ]
})
export class EstratificacaoRiscoModule { }
