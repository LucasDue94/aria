import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PacienteListComponent} from './paciente-list.component';
import {FilterModule} from "../components/filter/filter.module";
import {ApacheModule} from "../apache/apache.module";
import {IncidenteModule} from "../incidente/incidente.module";
import {EcgModule} from "../ecg/ecg.module";
import {BalaoModule} from "../balao/balao.module";


@NgModule({
  declarations: [
    PacienteListComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    ApacheModule,
    IncidenteModule,
    EcgModule,
    BalaoModule
  ],
  exports: [
    PacienteListComponent
  ]

})
export class PacienteListModule {
}
