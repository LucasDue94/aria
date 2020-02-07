import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PacienteListComponent} from "./paciente-list/paciente-list.component";
import {IncidenteFormComponent} from "./form/incidente-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SpinnerModule} from "../spinner/spinner.module";
import { PacienteDetailsComponent } from './paciente-details/paciente-details.component';
import { IncidenteReportComponent } from './incidente-report/incidente-report.component';



@NgModule({
  declarations: [
    PacienteListComponent,
    IncidenteFormComponent,
    PacienteDetailsComponent,
    IncidenteReportComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    SpinnerModule,
    FormsModule
  ]
})
export class IncidenteModule { }
