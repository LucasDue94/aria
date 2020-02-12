import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SpinnerModule} from "../spinner/spinner.module";
import {RegistroAtendimentoComponent} from "./list/registro-atendimento.component";



@NgModule({
  declarations: [
    RegistroAtendimentoComponent
  ],
  exports: [
    RegistroAtendimentoComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    SpinnerModule,
    FormsModule
  ]
})
export class RegistroAtendimentoModule { }
