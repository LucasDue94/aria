import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PacienteCardComponent} from './paciente-card.component';


@NgModule({
  declarations: [PacienteCardComponent],
  imports: [
    CommonModule
  ],
  exports: [PacienteCardComponent]
})
export class PacienteCardModule {
}
