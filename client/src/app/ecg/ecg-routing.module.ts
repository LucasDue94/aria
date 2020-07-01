import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guards/auth.guard";
import {EcgListComponent} from "./list/ecg-list.component";
import {EcgFormComponent} from "./form/ecg-form.component";
import {ReportEcgComponent} from "./report/report-ecg.component";
import {EcgEditComponent} from "./edit/ecg-edit.component";

const ecgRouting: Routes = [{
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
    },
    {
      path: 'edit/:id',
      component: EcgEditComponent,
      canActivate: [AuthGuard]
    }
  ]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ecgRouting)
  ]
})
export class EcgRoutingModule {
}
