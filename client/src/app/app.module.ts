import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MultipleSelectModule} from "./multiple-select/multiple-select.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    MultipleSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
