import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PortaBalaoListComponent} from "./list/porta-balao-list.component";
import {PortaBalaoFormComponent} from "./form/porta-balao-form.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {SpinnerModule} from "../components/spinner/spinner.module";



@NgModule({
  declarations: [
    PortaBalaoListComponent,
    PortaBalaoFormComponent
  ],
    imports: [
        CommonModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        RouterModule,
        FontAwesomeModule,
        InfiniteScrollModule,
        SpinnerModule,
        FormsModule
    ]
})
export class PortaBalaoModule { }
