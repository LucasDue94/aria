import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guards/auth.guard";
import {SetorListComponent} from "./list/setor-list.component";
import {SetorEditComponent} from "./edit/setor-edit.component";

const setorRouting: Routes = [{
  path: 'setor',
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
      canActivate: [AuthGuard],
    },
    {
      path: 'list',
      component: SetorListComponent,
      canActivate: [AuthGuard]
    }, {
      path: 'edit/:id',
      component: SetorEditComponent,
      canActivate: [AuthGuard]
    }
  ]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(setorRouting)
  ]
})
export class SetorRoutingModule {
}
