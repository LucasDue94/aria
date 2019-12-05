import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {FastSearchModule} from "../fast-search/fast-search.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApachePacienteListComponent} from "./paciente/list/apache-paciente-list.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SpinnerModule} from "../spinner/spinner.module";



@NgModule({
  declarations: [
    ApachePacienteListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FastSearchModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
    SpinnerModule
  ]
})
export class ApacheModule { }
