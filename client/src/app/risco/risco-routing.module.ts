import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RiscoFormComponent} from "./form/risco-form.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {RiscoListComponent} from "./list/risco-list.component";

const riscoRouting: Routes = [{
  path: 'risco',
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
      canActivate: [AuthGuard],
    },
    {
      path: 'list',
      component: RiscoListComponent,
      canActivate: [AuthGuard],
    }, {
      path: 'create',
      component: RiscoFormComponent,
      canActivate: [AuthGuard],
    }, {
      path: 'edit/:id',
      component: RiscoFormComponent,
      canActivate: [AuthGuard]
    }
  ]
}]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(riscoRouting)
  ]
})
export class RiscoRoutingModule {
}
