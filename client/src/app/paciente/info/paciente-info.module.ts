import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PacienteInfoComponent} from "./paciente-info.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [PacienteInfoComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [PacienteInfoComponent]
})
export class PacienteInfoModule {
}
