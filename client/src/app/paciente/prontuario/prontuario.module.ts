import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProntuarioShowComponent} from "./show/prontuario-show.component";
import {RouterModule} from "@angular/router";
import {CardModule} from "../../components/card/card.module";
import {UsuarioModule} from "../../usuario/usuario.module";
import {ModalModule} from "../../components/modal/modal.module";
import {ProntuarioListComponent} from "./list/prontuario-list.component";
import {FilterModule} from "../../components/filter/filter.module";
import {SpinnerModule} from "../../components/spinner/spinner.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfiniteScrollModule} from "ngx-infinite-scroll";


@NgModule({
  declarations: [
    ProntuarioShowComponent,
    ProntuarioListComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    UsuarioModule,
    ModalModule,
    RouterModule,
    FilterModule,
    SpinnerModule,
    FontAwesomeModule,
    InfiniteScrollModule,
  ],
  exports: [
    ProntuarioShowComponent,
    ProntuarioListComponent
  ]
})
export class ProntuarioModule {
}
