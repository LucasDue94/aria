import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NasFormComponent} from "./form/nas-form.component";
import {AuthGuard} from "../core/guards/auth.guard";

const nasRouting: Routes = [{
  path: 'nas',
  children: [
    {
      path: 'create/:id',
      component: NasFormComponent,
      canActivate: [AuthGuard],
    }]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(nasRouting)
  ]
})
export class NasRoutingModule {
}
