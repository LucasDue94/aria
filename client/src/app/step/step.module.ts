import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StepComponent} from "./step.component";
import {AppModule} from "../app.module";



@NgModule({
  declarations: [
    StepComponent
  ],
  exports: [
    StepComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StepModule { }
