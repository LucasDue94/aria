import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PacienteListComponent} from "./paciente-list/paciente-list.component";
import {IncidenteFormComponent} from "./form/incidente-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { PacienteDetailsComponent } from './paciente-details/paciente-details.component';
import { IncidenteReportComponent } from './incidente-report/incidente-report.component';
import {ChartModule} from "angular-highcharts";
import {SpinnerModule} from "../components/spinner/spinner.module";



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
    FormsModule,
    ChartModule
  ]
})
export class IncidenteModule { }
