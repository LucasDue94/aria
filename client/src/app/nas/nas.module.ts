import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NasFormComponent} from "./form/nas-form.component";
import {PacienteInfoModule} from "../paciente-info/paciente-info.module";
import {NasQuestionComponent} from './question/nas-question.component';
import {NasGroupComponent} from './group/nas-group.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    NasFormComponent,
    NasQuestionComponent,
    NasGroupComponent
  ],
  imports: [
    CommonModule,
    PacienteInfoModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule
]
})
export class NasModule {
}
