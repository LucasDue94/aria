import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {EcgListComponent} from './list/ecg-list.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {RegistroAtendimentoModule} from "../registro-atendimento/registro-atendimento.module";
import { EcgFormComponent } from './form/ecg-form.component';
import {SpinnerModule} from "../components/spinner/spinner.module";

@NgModule({
  declarations: [
    EcgListComponent,
    EcgFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    SpinnerModule,
    RegistroAtendimentoModule
  ]
})
export class EcgModule {}
