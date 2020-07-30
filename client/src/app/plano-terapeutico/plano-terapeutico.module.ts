import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanoTerapeuticoComponent} from './plano-terapeutico.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    PlanoTerapeuticoComponent
  ],
  exports: [
    PlanoTerapeuticoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class PlanoTerapeuticoModule {
}
