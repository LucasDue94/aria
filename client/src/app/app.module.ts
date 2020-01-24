import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HeaderModule} from "./header/header.module";
import {AlertModule} from "./alert/alert.module";
import {SpinnerModule} from "./spinner/spinner.module";
import {MenuModule} from "./menu/menu.module";
import {MainModule} from "./main/main.module";
import {PerfilDashboardComponent} from './perfil-dashboard/perfil-dashboard.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "./core/core.module";
import {ChartModule} from "angular-highcharts";
import {SetorModule} from "./setor/setor.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FastSearchModule} from "./fast-search/fast-search.module";
import {ErrorComponent} from "./error/error.component";
import {ApacheModule} from "./apache/apache.module";
import {SelectModule} from "./select/select.module";
import {LoginModule} from "./login/login.module";
import {AuthGuard} from "./core/guards/auth.guard";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {RelatorioModule} from "./relatorio/relatorio.module";
import {GrupoModule} from "./grupo/grupo.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {InterceptorModule} from "./interceptor/interceptor.module";
import {RiscoModule} from "./risco/risco.module";

@NgModule({
  exports: [],
  declarations: [
    AppComponent,
    PerfilDashboardComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HeaderModule,
    AlertModule,
    SpinnerModule,
    MenuModule,
    MainModule,
    ReactiveFormsModule,
    CoreModule,
    ChartModule,
    ApacheModule,
    RelatorioModule,
    SetorModule,
    InfiniteScrollModule,
    FastSearchModule,
    SelectModule,
    LoginModule,
    UsuarioModule,
    GrupoModule,
    InterceptorModule,
    RiscoModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
