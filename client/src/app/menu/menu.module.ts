import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MenuRoutingModule} from "./menu-routing.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MenuRoutingModule,
    RouterModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule {
}
