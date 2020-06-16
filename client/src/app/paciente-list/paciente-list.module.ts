import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PacienteListComponent} from './paciente-list.component';
import {FilterModule} from "../components/filter/filter.module";
import {ApacheModule} from "../apache/apache.module";
import {IncidenteModule} from "../incidente/incidente.module";
import {EcgModule} from "../ecg/ecg.module";
import {BalaoModule} from "../balao/balao.module";
import {EstratificacaoRiscoModule} from "../risco/estratificacao/estratificacao-risco.module";
import {NasModule} from "../nas/nas.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SpinnerModule} from "../components/spinner/spinner.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


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
        BalaoModule,
        EstratificacaoRiscoModule,
        NasModule,
        InfiniteScrollModule,
        SpinnerModule,
        FontAwesomeModule
    ],
  exports: [
    PacienteListComponent
  ]

})
export class PacienteListModule {
}
