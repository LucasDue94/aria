import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AlertModule} from "../../components/alert/alert.module";
import {MenuModule} from "../menu/menu.module";
import {HeaderModule} from "../header/header.module";
import {MainRoutingModule} from "./main-routing.module";
import {SpinnerModule} from "../../components/spinner/spinner.module";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    AlertModule,
    SpinnerModule,
    MenuModule,
    HeaderModule,
    MainRoutingModule,
  ],
  exports: [
    MainComponent,
  ]
})
export class MainModule {
}
