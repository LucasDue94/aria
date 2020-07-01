import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListComponent} from "./list/list.component";
import {AuthGuard} from "../core/guards/auth.guard";

const relatoriosRouting: Routes = [{
  path: 'relatorios',
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
      canActivate: [AuthGuard]
    },
    {
      path: 'list',
      component: ListComponent,
      canActivate: [AuthGuard]
    }
  ],
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(relatoriosRouting)
  ]
})
export class RelatoriosRoutingModule {
}
