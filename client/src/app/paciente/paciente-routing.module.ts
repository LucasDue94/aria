import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guards/auth.guard";
import {ProntuarioListComponent} from "./prontuario/list/prontuario-list.component";
import {ProntuarioShowComponent} from "./prontuario/show/prontuario-show.component";

const pacienteRouting: Routes = [{
  path: 'paciente',
  children: [{
    path: 'prontuario',
    children: [{
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
      canActivate: [AuthGuard]
    }, {
      path: 'list',
      component: ProntuarioListComponent,
      canActivate: [AuthGuard],
    }, {
      path: 'show',
      component: ProntuarioShowComponent,
      canActivate: [AuthGuard],
    }]
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
