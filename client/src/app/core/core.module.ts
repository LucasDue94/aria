import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertService} from "./alert/alert.service";
import {SpinnerService} from "./spinner/spinner.service";
import {MenuService} from "./menu/menu.service";
import {PerfilService} from "./perfil/perfil.service";
import {HttpClientModule} from "@angular/common/http";



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
    PerfilService
  ]
})
export class CoreModule { }
