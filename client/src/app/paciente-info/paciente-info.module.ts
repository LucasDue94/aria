import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PacienteInfoComponent} from "./paciente-info.component";



@NgModule({
  declarations: [PacienteInfoComponent],
  imports: [
    CommonModule
  ],
  exports: [PacienteInfoComponent]
})
export class PacienteInfoModule { }
