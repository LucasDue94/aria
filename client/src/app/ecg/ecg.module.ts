import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {RegistroAtendimentoModule} from "../registro-atendimento/registro-atendimento.module";
import {SpinnerModule} from "../components/spinner/spinner.module";
import {EcgListComponent} from "./list/ecg-list.component";
import {EcgFormComponent} from "./form/ecg-form.component";
import {ReportEcgComponent} from './report-ecg/report-ecg.component';
import {ChartModule, HIGHCHARTS_MODULES} from "angular-highcharts";
import * as more from "highcharts/highcharts-more.src";
import * as exporting from "highcharts/modules/exporting.src";
import { EcgEditComponent } from './edit/ecg-edit.component';

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
        RegistroAtendimentoModule,
        ChartModule
    ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }]
})
export class EcgModule {
}
