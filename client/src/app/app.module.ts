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
import { PerfilDashboardComponent } from './perfil-dashboard/perfil-dashboard.component';

@NgModule({
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
    MainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
