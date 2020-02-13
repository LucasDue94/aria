import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CoreModule } from '../core/core.module';
import {TipoIncidenteListComponent} from "./list/tipo-incidente-list.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {RouterModule} from "@angular/router";
import {TipoIncidenteFormComponent} from "./form/tipo-incidente-form.component";
import {SelectModule} from "../components/select/select.module";
import {SpinnerModule} from "../components/spinner/spinner.module";

@NgModule({
  declarations: [
    TipoIncidenteListComponent,
    TipoIncidenteFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    RouterModule,
    SpinnerModule,
    SelectModule
  ]
})
export class TipoIncidenteModule {}
