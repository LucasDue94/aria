import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BalaoListComponent} from "./list/balao-list.component";
import {BalaoFormComponent} from "./form/balao-form.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {SpinnerModule} from "../components/spinner/spinner.module";
import { ReportBalaoComponent } from './report-balao/report-balao.component';
import {ChartModule} from "angular-highcharts";



@NgModule({
  declarations: [
    BalaoListComponent,
    BalaoFormComponent,
    ReportBalaoComponent
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
    ChartModule
  ]
})
export class BalaoModule { }
