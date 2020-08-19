import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from './filter.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    FilterComponent
  ]
})
export class FilterModule {
}
