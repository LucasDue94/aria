import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiagnosticoRoutingModule} from './list/diagnostico-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DiagnosticoStatusComponent} from './status/diagnostico-status.component';
import {DiagnosticoListComponent} from './list/diagnostico-list.component';
import {FastSearchModule} from '../components/fast-search/fast-search.module';


@NgModule({
  declarations: [
    DiagnosticoStatusComponent,
    DiagnosticoListComponent
  ],
  exports: [
    DiagnosticoStatusComponent,
    DiagnosticoListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DiagnosticoRoutingModule,
    FastSearchModule
  ]
})
export class DiagnosticoModule {
}
