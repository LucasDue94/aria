import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guards/auth.guard";
import {IncidentePacienteListComponent} from "./incidente-paciente-list/incidente-paciente-list.component";
import {PacienteDetailsComponent} from "./paciente-details/paciente-details.component";
import {IncidenteFormComponent} from "./form/incidente-form.component";
import {IncidenteReportComponent} from "./report/incidente-report.component";

const incidenteRouting: Routes = [{
  path: 'incidente',
  children: [
    {
      path: '',
      redirectTo: 'paciente-list',
      pathMatch: 'full',
      canActivate: [AuthGuard],
    },
    {
      path: 'paciente-list',
      component: IncidentePacienteListComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'paciente-details/:id',
      component: PacienteDetailsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'create',
      component: IncidenteFormComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'edit/:id',
      component: IncidenteFormComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'report',
      component: IncidenteReportComponent,
      canActivate: [AuthGuard]
    }
  ]
}]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(incidenteRouting)
  ]
})
export class IncidenteRoutingModule {
}
