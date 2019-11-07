import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PerfilDashboardComponent} from "../perfil-dashboard/perfil-dashboard.component";
import {SpinnerComponent} from "../spinner/spinner.component";

const routes: Routes = [
  {path: 'perfil', component: PerfilDashboardComponent},
  {path: 'spinner', component: SpinnerComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
