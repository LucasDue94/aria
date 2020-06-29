import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartModule} from "angular-highcharts";
import {PerfilRoutingModule} from "./perfil-routing.module";
import {PerfilDashboardComponent} from "./perfil-dashboard.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SelectModule} from "../components/select/select.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [PerfilDashboardComponent],
  imports: [
    CommonModule,
    ChartModule,
    PerfilRoutingModule,
    ReactiveFormsModule,
    SelectModule,
    FontAwesomeModule
  ],
  exports: [PerfilDashboardComponent]
})
export class PerfilModule {
}
