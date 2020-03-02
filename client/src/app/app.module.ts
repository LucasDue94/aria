import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HeaderModule} from "./layout/header/header.module";
import {AlertModule} from "./components/alert/alert.module";
import {MenuModule} from "./layout/menu/menu.module";
import {MainModule} from "./layout/main/main.module";
import {PerfilDashboardComponent} from './perfil-dashboard/perfil-dashboard.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "./core/core.module";
import {ChartModule} from "angular-highcharts";
import {SetorModule} from "./setor/setor.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FastSearchModule} from "./components/fast-search/fast-search.module";
import {ErrorComponent} from "./components/error/error.component";
import {ApacheModule} from "./apache/apache.module";
import {SelectModule} from "./components/select/select.module";
import {LoginModule} from "./layout/login/login.module";
import {AuthGuard} from "./core/guards/auth.guard";
import {DatePipe, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {RelatorioModule} from "./relatorio/relatorio.module";
import {GrupoModule} from "./grupo/grupo.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {InterceptorModule} from "./core/interceptor/interceptor.module";
import {RiscoModule} from "./risco/risco.module";
import {TipoIncidenteModule} from './tipo-incidente/tipo-incidente.module';
import {IncidenteModule} from "./incidente/incidente.module";
import {BalaoModule} from "./balao/balao.module";
import {NasModule} from "./nas/nas.module";
import {SpinnerModule} from "./components/spinner/spinner.module";
import {PacienteInfoModule} from "./paciente-info/paciente-info.module";
import {EcgModule} from "./ecg/ecg.module";
import {HttpClientModule} from "@angular/common/http";
import {FilterModule} from "./components/filter/filter.module";

@NgModule({
  exports: [],
  declarations: [
    AppComponent,
    PerfilDashboardComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    RiscoModule,
    BalaoModule,
    EcgModule,
    TipoIncidenteModule,
    IncidenteModule,
    NasModule,
    PacienteInfoModule,
    FilterModule
],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
