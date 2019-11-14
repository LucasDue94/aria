import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MultipleSelectModule} from "./multiple-select/multiple-select.module";
import {HeaderModule} from "./header/header.module";
import {AlertModule} from "./alert/alert.module";
import {SpinnerModule} from "./spinner/spinner.module";
import {MenuModule} from "./menu/menu.module";
import {MainModule} from "./main/main.module";
import {PerfilDashboardComponent} from './perfil-dashboard/perfil-dashboard.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "./core/core.module";
import {ChartModule} from "angular-highcharts";

@NgModule({
  exports: [
  ],
  declarations: [
    AppComponent,
    PerfilDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    MultipleSelectModule,
    HeaderModule,
    AlertModule,
    SpinnerModule,
    MenuModule,
    MainModule,
    ReactiveFormsModule,
    CoreModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
