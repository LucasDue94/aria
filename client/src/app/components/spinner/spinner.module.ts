import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from "./spinner.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SpinnerDirective} from "./spinner.directive";
import { ScrollSpinnerComponent } from './scroll-spinner/scroll-spinner.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    SpinnerDirective,
    ScrollSpinnerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    SpinnerComponent,
    SpinnerDirective,
    ScrollSpinnerComponent
  ]
})
export class SpinnerModule {
}
