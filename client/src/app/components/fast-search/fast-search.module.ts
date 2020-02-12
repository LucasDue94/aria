import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FastSearchComponent} from "./fast-search.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SpinnerModule} from "../spinner/spinner.module";


@NgModule({
  declarations: [FastSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    SpinnerModule
  ],
  exports:[FastSearchComponent]
})
export class FastSearchModule {
}
