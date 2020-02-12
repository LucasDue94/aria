import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioListComponent } from './list/usuario-list.component';
import { UsuarioEditComponent } from './edit/usuario-edit.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {FastSearchModule} from "../components/fast-search/fast-search.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsuarioService} from "../core/usuario/usuario.service";
import {SelectModule} from "../components/select/select.module";



@NgModule({
  declarations: [UsuarioListComponent, UsuarioEditComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FastSearchModule,
    ReactiveFormsModule,
    SelectModule,
    FormsModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
