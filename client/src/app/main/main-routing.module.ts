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
import {ListComponent} from "../relatorio/list/list.component";
import {ReportApacheComponent} from "../apache/report/report-apache.component";
import {UsuarioListComponent} from "../usuario/list/usuario-list.component";
import {UsuarioEditComponent} from "../usuario/edit/usuario-edit.component";
import {GrupoListComponent} from "../grupo/list/grupo-list.component";
import {GrupoFormComponent} from "../grupo/form/grupo-form.component";
import {ErrorComponent} from "../error/error.component";
import {RiscoListComponent} from "../risco/list/risco-list.component";
import {RiscoFormComponent} from "../risco/form/risco-form.component";
import {TipoIncidenteListComponent} from "../tipo-incidente/list/tipo-incidente-list.component";
import {TipoIncidenteFormComponent} from "../tipo-incidente/form/tipo-incidente-form.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'perfil', pathMatch: 'full',
        component: PerfilDashboardComponent, canActivate: [AuthGuard],
      }, {
        path: 'error', component: ErrorComponent
      },
      {
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
          }, {
            path: 'create',
            component: SetorCreateComponent,
            canActivate: [AuthGuard],
          },
        ]
      },
      {
        path: 'usuario',
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
            component: UsuarioListComponent,
            canActivate: [AuthGuard]
          }, {
            path: 'edit/:id',
            component: UsuarioEditComponent,
            canActivate: [AuthGuard]
          }
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
            component: ListComponent,
            canActivate: [AuthGuard]
          }
        ],
      },
      {
        path: 'apache-report',
        component: ReportApacheComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'grupo',
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
      },
      {
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
      },
      {
        path: 'tipo-incidente',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
            canActivate: [AuthGuard],
          },
          {
            path: 'list',
            component: TipoIncidenteListComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'create',
            component: TipoIncidenteFormComponent,
            canActivate: [AuthGuard],
          },
          // {
          //   path: 'edit/:id',
          //   component: RiscoFormComponent,
          //   canActivate: [AuthGuard]
          // }
        ]
      },
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
