import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProntuarioComponent} from "./prontuario.component";
import {CardModule} from "../components/card/card.module";
import {UsuarioModule} from "../usuario/usuario.module";
import {ModalModule} from "../components/modal/modal.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [ProntuarioComponent],
  imports: [
    CommonModule,
    CardModule,
    UsuarioModule,
    ModalModule,
    RouterModule,
  ],
  exports: [ProntuarioComponent]
})
export class ProntuarioModule {
}
