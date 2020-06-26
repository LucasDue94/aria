import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {FastSearchModule} from "../components/fast-search/fast-search.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApachePacienteListComponent} from "./paciente/list/apache-paciente-list.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ApacheFormComponent} from "./form/apache-form.component";
import {SelectModule} from "../components/select/select.module";
import {CoreModule} from '../core/core.module';
import {HIGHCHARTS_MODULES} from "angular-highcharts";
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import {SpinnerModule} from "../components/spinner/spinner.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {PacienteInfoModule} from "../paciente-info/paciente-info.module";
import {ApacheRoutingModule} from "./apache-routing.module";

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
    InfiniteScrollModule,
    SpinnerModule,
    SelectModule,
    CoreModule,
    NgSelectModule,
    PacienteInfoModule,
    ApacheRoutingModule
  ],
  exports: [
    ApachePacienteListComponent
  ],
  providers: [
    {provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting]}
  ]
})
export class ApacheModule {
}
