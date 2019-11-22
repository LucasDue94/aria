import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertService} from "./alert/alert.service";
import {SpinnerService} from "./spinner/spinner.service";
import {MenuService} from "./menu/menu.service";
import {PerfilService} from "./perfil/perfil.service";
import {HttpClientModule} from "@angular/common/http";
import {SetorService} from "./setor/setor.service";
import {ErrorService} from "./error/error.service";
import {SetorWpdService} from "./setor-wpd/setorWpd.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    AlertService,
    SpinnerService,
    MenuService,
    PerfilService,
    SetorService,
    SetorWpdService,
    ErrorService,
  ]
})
export class CoreModule { }
