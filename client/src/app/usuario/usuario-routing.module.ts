import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guards/auth.guard";
import {UsuarioListComponent} from "./list/usuario-list.component";
import {UsuarioEditComponent} from "./edit/usuario-edit.component";

const usuarioRouting: Routes = [{
  path: 'usuario',
  children: [{
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }, {
    path: 'list',
    component: UsuarioListComponent,
    canActivate: [AuthGuard],
  }, {
    path: 'edit/:id',
    component: UsuarioEditComponent,
    canActivate: [AuthGuard],
  }]
}]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(usuarioRouting)
  ]
})
export class UsuarioRoutingModule {
}
