import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from "./alert.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  exports:[AlertComponent],
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class AlertModule {
}
