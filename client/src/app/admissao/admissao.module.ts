import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdmissaoListComponent} from './admissao-list.component';
import {CoreModule} from '../core/core.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DiagnosticoListComponent} from '../diagnostico/list/diagnostico-list.component';
import {FastSearchModule} from '../components/fast-search/fast-search.module';
import {DiagnosticoModule} from '../diagnostico/diagnostico.module';


@NgModule({
  declarations: [
    AdmissaoListComponent,
    DiagnosticoListComponent
  ],
  exports: [
    AdmissaoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    FastSearchModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    DiagnosticoModule
  ]
})
export class AdmissaoModule {}
