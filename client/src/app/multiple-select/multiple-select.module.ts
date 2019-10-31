import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultipleSelectComponent} from "./multiple-select.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  exports: [MultipleSelectComponent],
  declarations: [MultipleSelectComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class MultipleSelectModule {
}
