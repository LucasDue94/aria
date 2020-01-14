import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrupoFormComponent} from "./form/grupo-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {GrupoListComponent} from "./list/grupo-list.component";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GrupoEditComponent} from "./edit/grupo-edit.component";


@NgModule({
  declarations: [
    GrupoFormComponent,
    GrupoListComponent,
    GrupoEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class GrupoModule {
}
