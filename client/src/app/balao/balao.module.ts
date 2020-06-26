import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BalaoListComponent} from "./list/balao-list.component";
import {BalaoFormComponent} from "./form/balao-form.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {SpinnerModule} from "../components/spinner/spinner.module";
import {ReportBalaoComponent} from './report/report-balao.component';
import {ChartModule} from "angular-highcharts";
import {EditBalaoComponent} from './edit/edit-balao.component';
import {BalaoRoutingModule} from "./balao-routing.module";


@NgModule({
  declarations: [
    BalaoListComponent,
    BalaoFormComponent,
    ReportBalaoComponent,
    EditBalaoComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    SpinnerModule,
    FormsModule,
    ChartModule,
    BalaoRoutingModule
  ],
  exports: [
    BalaoListComponent
  ]
})
export class BalaoModule {
}
