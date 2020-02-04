import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PortaBalaoListComponent} from "./list/porta-balao-list.component";
import {PortaBalaoFormComponent} from "./form/porta-balao-form.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SpinnerModule} from "../spinner/spinner.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    PortaBalaoListComponent,
    PortaBalaoFormComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    SpinnerModule
  ]
})
export class PortaBalaoModule { }
