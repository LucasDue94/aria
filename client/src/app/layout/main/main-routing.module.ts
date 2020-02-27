import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PerfilDashboardComponent} from "../../perfil-dashboard/perfil-dashboard.component";
import {SetorListComponent} from "../../setor/list/setor-list.component";
import {SetorEditComponent} from "../../setor/edit/setor-edit.component";
import {SetorCreateComponent} from "../../setor/create/setor-create.component";
import {ApachePacienteListComponent} from "../../apache/paciente/list/apache-paciente-list.component";
import {ApacheFormComponent} from "../../apache/form/apache-form.component";
import {MainComponent} from "./main.component";
import {AuthGuard} from "../../core/guards/auth.guard";
import {ListComponent} from "../../relatorio/list/list.component";
import {ReportApacheComponent} from "../../apache/report/report-apache.component";
import {UsuarioListComponent} from "../../usuario/list/usuario-list.component";
import {UsuarioEditComponent} from "../../usuario/edit/usuario-edit.component";
import {GrupoListComponent} from "../../grupo/list/grupo-list.component";
import {GrupoFormComponent} from "../../grupo/form/grupo-form.component";
import {ErrorComponent} from "../../components/error/error.component";
import {RiscoListComponent} from "../../risco/list/risco-list.component";
import {RiscoFormComponent} from "../../risco/form/risco-form.component";
import {TipoIncidenteListComponent} from "../../tipo-incidente/list/tipo-incidente-list.component";
import {TipoIncidenteFormComponent} from "../../tipo-incidente/form/tipo-incidente-form.component";
import {PacienteListComponent} from "../../incidente/paciente-list/paciente-list.component";
import {BalaoFormComponent} from "../../balao/form/balao-form.component";
import {BalaoListComponent} from "../../balao/list/balao-list.component";
import {PacienteDetailsComponent} from "../../incidente/paciente-details/paciente-details.component";
import {IncidenteFormComponent} from "../../incidente/form/incidente-form.component";
import {IncidenteReportComponent} from "../../incidente/incidente-report/incidente-report.component";
import {NasFormComponent} from "../../nas/form/nas-form.component";
import {EcgListComponent} from "../../ecg/list/ecg-list.component";
import {EcgFormComponent} from "../../ecg/form/ecg-form.component";
import {ReportEcgComponent} from "../../ecg/report-ecg/report-ecg.component";
import {ReportBalaoComponent} from "../../balao/report-balao/report-balao.component";

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
          {
            path: 'edit/:id',
            component: TipoIncidenteFormComponent,
            canActivate: [AuthGuard]
          }
        ]
      },
      {
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
          },
          {
            path: 'report',
            component: ReportBalaoComponent,
            canActivate: [AuthGuard]
          }
        ],
      },
      {
        path: 'ecg',
        children: [
          {
            path: '',
            redirectTo: 'paciente-list',
            pathMatch: 'full',
            canActivate: [AuthGuard]
          },
          {
            path: 'paciente-list',
            component: EcgListComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'create/:id',
            component: EcgFormComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'report',
            component: ReportEcgComponent,
            canActivate: [AuthGuard]
          }
        ]
      },
      {
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
            component: PacienteListComponent,
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
      },{
        path: 'nas',
        children: [
          {
            path: 'create/:id',
            component: NasFormComponent,
            canActivate: [AuthGuard],
          },
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
