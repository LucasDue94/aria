import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RiscoListComponent} from "./list/risco-list.component";
import {RiscoFormComponent} from "./form/risco-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    RiscoListComponent,
    RiscoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class RiscoModule { }
