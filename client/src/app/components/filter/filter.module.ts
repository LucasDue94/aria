import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from "./filter.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FontAwesomeModule
  ],
  exports: [
    FilterComponent
  ]
})
export class FilterModule {
}
