import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrupoFormComponent} from "./form/grupo-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {GrupoListComponent} from "./list/grupo-list.component";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GrupoRoutingModule} from "./grupo-routing.module";


@NgModule({
  declarations: [
    GrupoFormComponent,
    GrupoListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    GrupoRoutingModule
  ]
})
export class GrupoModule {
}
