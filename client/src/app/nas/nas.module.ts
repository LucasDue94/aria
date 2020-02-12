import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NasFormComponent} from "./form/nas-form.component";
import {PacienteInfoModule} from "../paciente-info/paciente-info.module";

@NgModule({
  declarations: [NasFormComponent],
  imports: [
    CommonModule,
    PacienteInfoModule
  ]
})
export class NasModule { }
