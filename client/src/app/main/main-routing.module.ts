import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PerfilDashboardComponent} from "../perfil-dashboard/perfil-dashboard.component";
import {SpinnerComponent} from "../spinner/spinner.component";
import {SetorListComponent} from "../setor/list/setor-list.component";
import {SetorEditComponent} from "../setor/edit/setor-edit.component";
import {SetorCreateComponent} from "../setor/create/setor-create.component";

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
        path: 'edit',
        component: SetorEditComponent,
      },{
        path: 'create',
        component: SetorCreateComponent,
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
