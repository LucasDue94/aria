import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanoTerapeuticoComponent} from './plano-terapeutico.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { PlanoTerapeuticoShowComponent } from './show/plano-terapeutico-show.component';


@NgModule({
  declarations: [
    PlanoTerapeuticoComponent,
    PlanoTerapeuticoShowComponent
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
