import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guards/auth.guard";
import {ApachePacienteListComponent} from "./paciente/list/apache-paciente-list.component";
import {ApacheFormComponent} from "./form/apache-form.component";
import {ReportApacheComponent} from "./report/report-apache.component";

const apacheRouting: Routes = [{
  path: 'apache',
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
      canActivate: [AuthGuard]
    }, {
      path: 'list',
      component: ApachePacienteListComponent,
      canActivate: [AuthGuard]
    }, {
      path: 'form/:id',
      component: ApacheFormComponent,
      canActivate: [AuthGuard],
    }, {
      path: 'report',
      component: ReportApacheComponent,
      canActivate: [AuthGuard],
    }
  ]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(apacheRouting)
  ]
})
export class ApacheRoutingModule {
}
