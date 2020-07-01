import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IncidentePacienteListComponent} from "./incidente-paciente-list/incidente-paciente-list.component";
import {IncidenteFormComponent} from "./form/incidente-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { PacienteDetailsComponent } from './paciente-details/paciente-details.component';
import { IncidenteReportComponent } from './report/incidente-report.component';
import {ChartModule, HIGHCHARTS_MODULES} from "angular-highcharts";
import {SpinnerModule} from "../components/spinner/spinner.module";
import * as more from "highcharts/highcharts-more.src";
import * as exporting from "highcharts/modules/exporting.src";
import {IncidenteRoutingModule} from "./incidente-routing.module";



@NgModule({
  declarations: [
    IncidentePacienteListComponent,
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
    ChartModule,
    IncidenteRoutingModule
  ],
  exports: [
    IncidentePacienteListComponent
  ],
  providers: [
    {provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting]}
  ]
})
export class IncidenteModule { }
