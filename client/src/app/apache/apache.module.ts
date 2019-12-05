import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {FastSearchModule} from "../fast-search/fast-search.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApachePacienteListComponent} from "./paciente/list/apache-paciente-list.component";
import { ApacheFormComponent } from './form/apache-form.component';
import {SelectModule} from "../select/select.module";



@NgModule({
  declarations: [
    ApachePacienteListComponent,
    ApacheFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FastSearchModule,
    ReactiveFormsModule,
    FormsModule,
    SelectModule
  ]
})
export class ApacheModule { }
