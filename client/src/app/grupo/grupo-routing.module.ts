import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuard} from "../core/guards/auth.guard";
import {GrupoListComponent} from "./list/grupo-list.component";
import {GrupoFormComponent} from "./form/grupo-form.component";
import {RouterModule, Routes} from "@angular/router";

const grupoRouting: Routes = [{
  path: 'grupo',
  component: GrupoListComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
      canActivate: [AuthGuard],
    },
    {
      path: 'list',
      component: GrupoListComponent,
      canActivate: [AuthGuard],
    }, {
      path: 'create',
      component: GrupoFormComponent,
      canActivate: [AuthGuard],
    }, {
      path: 'edit/:id',
      component: GrupoFormComponent,
      canActivate: [AuthGuard]
    }
  ]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(grupoRouting)
  ],
  exports: [
    RouterModule
  ]
})

export class GrupoRoutingModule {
}
