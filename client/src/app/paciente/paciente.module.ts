import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterModule} from "../components/filter/filter.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SpinnerModule} from "../components/spinner/spinner.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PacienteRoutingModule} from "./paciente-routing.module";
import {PacienteListComponent} from "./list/paciente-list.component";
import {PacienteInfoComponent} from "./info/paciente-info.component";
import {ProntuarioShowComponent} from "./prontuario/show/prontuario-show.component";
import {CardModule} from "../components/card/card.module";
import {ModalModule} from "../components/modal/modal.module";
import {CollapseModule} from "../components/collapse/collapse.module";


@NgModule({
  declarations: [
    PacienteListComponent,
    PacienteInfoComponent,
    ProntuarioShowComponent,

  ],
  imports: [
    CommonModule,
    FilterModule,
    InfiniteScrollModule,
    SpinnerModule,
    FontAwesomeModule,
    PacienteRoutingModule,
    CardModule,
    ModalModule,
    CollapseModule
  ],
  exports: [
    PacienteListComponent,
    PacienteInfoComponent,
    ProntuarioShowComponent,
  ]

})
export class PacienteModule {
}
