import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './modal.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ], exports: [
    ModalComponent
  ]
})
export class ModalModule {
}
