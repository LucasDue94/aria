import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PerfilDashboardComponent} from "../perfil-dashboard/perfil-dashboard.component";
import {SetorListComponent} from "../setor/list/setor-list.component";
import {SetorEditComponent} from "../setor/edit/setor-edit.component";
import {SetorCreateComponent} from "../setor/create/setor-create.component";
import {ApachePacienteListComponent} from "../apache/paciente/list/apache-paciente-list.component";
import {ApacheFormComponent} from "../apache/form/apache-form.component";
import {MainComponent} from "./main.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {RelatorioListComponent} from "../relatorio/relatorio-list/relatorio-list.component";
import {ApacheReportComponent} from "../relatorio/relatorio-list/apache-report/apache-report.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [

      {
        path: 'perfil', pathMatch: 'full',
        component: PerfilDashboardComponent, canActivate: [AuthGuard],
      },
      {
        path: 'setor',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
            canActivate: [AuthGuard],
            data: {permissao: 'ROLE_SETOR_INDEX'}

          },
          {
            path: 'list',
            component: SetorListComponent,
            canActivate: [AuthGuard]
          }, {
            path: 'edit/:id',
            component: SetorEditComponent,
            canActivate: [AuthGuard]
          }, {
            path: 'create',
            component: SetorCreateComponent,
            canActivate: [AuthGuard],
          },
        ]
      },
      {
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
            path: 'form',
            component: ApacheFormComponent,
            canActivate: [AuthGuard],
          }
        ]
      },
      {
        path: 'relatorio',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
            canActivate: [AuthGuard]
          },
          {
            path: 'list',
            component: RelatorioListComponent,
            canActivate: [AuthGuard]
          }
        ],
      },
      {
        path: 'apache-report',
        component: ApacheReportComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
