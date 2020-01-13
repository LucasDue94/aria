import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from "./spinner.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SpinnerDirective} from "./spinner.directive";


@NgModule({
  declarations: [
    SpinnerComponent,
    SpinnerDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    SpinnerComponent,
    SpinnerDirective
  ]
})
export class SpinnerModule {
}
