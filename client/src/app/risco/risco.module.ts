import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RiscoListComponent} from "./list/risco-list.component";
import {RiscoFormComponent} from "./form/risco-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SpinnerModule} from "../components/spinner/spinner.module";



@NgModule({
  declarations: [
    RiscoListComponent,
    RiscoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    SpinnerModule
  ]
})
export class RiscoModule { }
