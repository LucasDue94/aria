import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PerfilDashboardComponent} from "./perfil-dashboard.component";
import {AuthGuard} from "../core/guards/auth.guard";

const perfilRouting: Routes = [{
  path: 'perfil',
  component: PerfilDashboardComponent,
  canActivate: [AuthGuard]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(perfilRouting)
  ]
})
export class PerfilRoutingModule {
}
