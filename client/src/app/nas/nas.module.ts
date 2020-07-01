import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NasFormComponent} from "./form/nas-form.component";
import {NasQuestionComponent} from './question/nas-question.component';
import {NasGroupComponent} from './group/nas-group.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from '../core/core.module';
import {NasPacienteListComponent} from "./list/nas-paciente-list.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SpinnerModule} from "../components/spinner/spinner.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NasRoutingModule} from "./nas-routing.module";
import {PacienteModule} from "../paciente/paciente.module";

@NgModule({
  declarations: [
    NasFormComponent,
    NasQuestionComponent,
    NasGroupComponent,
    NasPacienteListComponent
  ],
  imports: [
    CommonModule,
    PacienteModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    InfiniteScrollModule,
    SpinnerModule,
    FontAwesomeModule,
    NasRoutingModule
  ], exports: [
    NasPacienteListComponent
  ]
})
export class NasModule {
}
