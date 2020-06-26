import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CollapseComponent} from "./collapse.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    CollapseComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    CollapseComponent
  ]
})
export class CollapseModule { }
