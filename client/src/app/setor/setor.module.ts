import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SetorEditComponent} from "./edit/setor-edit.component";
import {SetorListComponent} from "./list/setor-list.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {FastSearchModule} from "../components/fast-search/fast-search.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SetorCreateComponent} from "./create/setor-create.component";
import {FilterModule} from "../components/filter/filter.module";



@NgModule({
  declarations: [
    SetorEditComponent,
    SetorListComponent,
    SetorCreateComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FastSearchModule,
    ReactiveFormsModule,
    FilterModule
  ]
})
export class SetorModule { }
