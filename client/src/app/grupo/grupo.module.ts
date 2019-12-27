import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GrupoCreateComponent} from "./create/grupo-create.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [GrupoCreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class GrupoModule { }
