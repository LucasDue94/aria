import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NasFormComponent} from "./form/nas-form.component";
import {PacienteInfoModule} from "../paciente-info/paciente-info.module";
import {NasQuestionComponent} from './question/nas-question.component';
import {NasGroupComponent} from './group/nas-group.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from '../core/core.module';
import {NasPacienteListComponent} from "./list/nas-paciente-list.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SpinnerModule} from "../components/spinner/spinner.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NasRoutingModule} from "./nas-routing.module";

@NgModule({
  declarations: [
    NasFormComponent,
    NasQuestionComponent,
    NasGroupComponent,
    NasPacienteListComponent
  ],
  imports: [
    CommonModule,
    PacienteInfoModule,
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
