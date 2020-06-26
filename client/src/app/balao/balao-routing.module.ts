import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guards/auth.guard";
import {ReportBalaoComponent} from "./report/report-balao.component";
import {EditBalaoComponent} from "./edit/edit-balao.component";
import {BalaoFormComponent} from "./form/balao-form.component";
import {BalaoListComponent} from "./list/balao-list.component";

const balaoRouting: Routes = [{
  path: 'balao',
  children: [
    {
      path: '',
      redirectTo: 'paciente-list',
      pathMatch: 'full',
      canActivate: [AuthGuard]
    },
    {
      path: 'paciente-list',
      component: BalaoListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'create/:id',
      component: BalaoFormComponent,
      canActivate: [AuthGuard]
    }, {
      path: 'edit/:id',
      component: EditBalaoComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'report',
      component: ReportBalaoComponent,
      canActivate: [AuthGuard]
    }
  ],
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(balaoRouting)
  ]
})
export class BalaoRoutingModule {
}
