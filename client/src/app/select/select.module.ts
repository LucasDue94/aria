import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from "./select.component";
import {MultipleSelectComponent} from "../multiple-select/multiple-select.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [SelectComponent, MultipleSelectComponent],
  exports: [
    SelectComponent,
    MultipleSelectComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class SelectModule {
}
