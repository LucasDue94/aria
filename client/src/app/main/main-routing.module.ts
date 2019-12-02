import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PerfilDashboardComponent} from "../perfil-dashboard/perfil-dashboard.component";
import {SpinnerComponent} from "../spinner/spinner.component";
import {SetorListComponent} from "../setor/list/setor-list.component";
import {SetorEditComponent} from "../setor/edit/setor-edit.component";
import {SetorCreateComponent} from "../setor/create/setor-create.component";
import {ApachePacienteListComponent} from "../apache/paciente/list/apache-paciente-list.component";

const routes: Routes = [
  {path: 'perfil', component: PerfilDashboardComponent},
  {path: 'spinner', component: SpinnerComponent},
  {
    path: 'setor',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: SetorListComponent,
      }, {
        path: 'edit/:id',
        component: SetorEditComponent,
      },{
        path: 'create',
        component: SetorCreateComponent,
      },
    ]
  },
  {
    path: 'apache',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ApachePacienteListComponent
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
