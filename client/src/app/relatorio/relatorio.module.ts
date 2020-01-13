import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {FastSearchModule} from "../fast-search/fast-search.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SpinnerModule} from "../spinner/spinner.module";
import {SelectModule} from "../select/select.module";
import {CoreModule} from "../core/core.module";
import { ListComponent } from './list/list.component';
import { ReportApacheComponent } from '../apache/report/report-apache.component';
import {ChartModule} from "angular-highcharts";



@NgModule({
  declarations: [
    ListComponent,
    ReportApacheComponent
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
        ChartModule
    ]
})
export class RelatorioModule { }
