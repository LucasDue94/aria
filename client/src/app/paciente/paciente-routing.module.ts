import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guards/auth.guard";
import {ProntuarioShowComponent} from "./prontuario/show/prontuario-show.component";
import {PacienteListComponent} from "./list/paciente-list.component";
import {EvolucaoComponent} from "./evolucao/evolucao.component";

const pacienteRouting: Routes = [{
  path: 'paciente',
  children: [{
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }, {
    path: 'list',
    component: PacienteListComponent,
    canActivate: [AuthGuard],
  }, {
    path: 'show/:id',
    component: ProntuarioShowComponent,
    canActivate: [AuthGuard],
  }, {
    path: 'evolucao/:id',
    component: EvolucaoComponent,
    canActivate: [AuthGuard],
  }]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(pacienteRouting)
  ]
})
export class PacienteRoutingModule {
}
