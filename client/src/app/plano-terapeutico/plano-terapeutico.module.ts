import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanoTerapeuticoFormComponent} from './form/plano-terapeutico-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PlanoTerapeuticoShowComponent} from './show/plano-terapeutico-show.component';
import {PacienteInfoModule} from "../paciente/info/paciente-info.module";


@NgModule({
  declarations: [
    PlanoTerapeuticoFormComponent,
    PlanoTerapeuticoShowComponent
  ],
  exports: [
    PlanoTerapeuticoFormComponent,
    PlanoTerapeuticoShowComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PacienteInfoModule
  ]
})
export class PlanoTerapeuticoModule {
}
