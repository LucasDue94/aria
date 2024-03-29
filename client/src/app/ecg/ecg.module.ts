import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SpinnerModule} from "../components/spinner/spinner.module";
import {EcgListComponent} from "./list/ecg-list.component";
import {EcgFormComponent} from "./form/ecg-form.component";
import {ReportEcgComponent} from './report/report-ecg.component';
import {ChartModule, HIGHCHARTS_MODULES} from "angular-highcharts";
import * as more from "highcharts/highcharts-more.src";
import * as exporting from "highcharts/modules/exporting.src";
import {EcgEditComponent} from './edit/ecg-edit.component';
import {EcgRoutingModule} from "./ecg-routing.module";

@NgModule({
  declarations: [
    EcgListComponent,
    EcgFormComponent,
    ReportEcgComponent,
    EcgEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    SpinnerModule,
    ChartModule,
    EcgRoutingModule
  ],
  exports: [
    EcgListComponent
  ],
  providers: [{provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting]}]
})
export class EcgModule {
}
