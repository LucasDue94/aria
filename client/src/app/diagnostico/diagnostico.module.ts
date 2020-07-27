import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DiagnosticoListComponent} from './diagnostico-list.component';
import {CoreModule} from '../core/core.module';
import {FastSearchModule} from "../components/fast-search/fast-search.module";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    DiagnosticoListComponent
  ],
  exports: [
    DiagnosticoListComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        CoreModule,
        FastSearchModule,
        FontAwesomeModule,
        ReactiveFormsModule
    ]
})
export class DiagnosticoModule {}
