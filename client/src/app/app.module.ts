import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HeaderModule} from './layout/header/header.module';
import {AlertModule} from './components/alert/alert.module';
import {MenuModule} from './layout/menu/menu.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from './core/core.module';
import {ChartModule} from 'angular-highcharts';
import {SetorModule} from './setor/setor.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FastSearchModule} from './components/fast-search/fast-search.module';
import {ErrorComponent} from './components/error/error.component';
import {SelectModule} from './components/select/select.module';
import {LoginModule} from './layout/login/login.module';
import {AuthGuard} from './core/guards/auth.guard';
import {DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {GrupoModule} from './grupo/grupo.module';
import {UsuarioModule} from './usuario/usuario.module';
import {InterceptorModule} from './core/interceptor/interceptor.module';
import {RiscoModule} from './risco/risco.module';
import {TipoIncidenteModule} from './incidente/tipo/tipo-incidente.module';
import {IncidenteModule} from './incidente/incidente.module';
import {BalaoModule} from './balao/balao.module';
import {NasModule} from './nas/nas.module';
import {SpinnerModule} from './components/spinner/spinner.module';
import {EcgModule} from './ecg/ecg.module';
import {HttpClientModule} from '@angular/common/http';
import {FilterModule} from './components/filter/filter.module';
import {EstratificacaoRiscoModule} from './risco/estratificacao/estratificacao-risco.module';
import {PainelLeitosModule} from './painel-leitos/painel-leitos.module';
import {CardModule} from './components/card/card.module';
import {PerfilModule} from './perfil/perfil.module';
import {RelatoriosModule} from './relatorios/relatorios.module';
import {PacienteModule} from './paciente/paciente.module';
import { CollapseComponent } from './components/collapse/collapse.component';
import {CollapseModule} from './components/collapse/collapse.module';
import { AdmissaoModule } from './admissao/admissao.module';
import {DiagnosticoModule} from './diagnostico/diagnostico.module';
import {PainelCirurgicoModule} from './painel-cirurgico/painel-cirurgico.module';
import {ApacheModule} from './apache/apache.module';
import {PlanoTerapeuticoModule} from './plano-terapeutico/plano-terapeutico.module';
import {ModalModule} from "./components/modal/modal.module";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
    imports: [
        AppRoutingModule,
        AlertModule,
        ApacheModule,
        BalaoModule,
        DiagnosticoModule,
        BrowserModule,
        CoreModule,
        CardModule,
        CollapseModule,
        CardModule,
        ChartModule,
        EcgModule,
        EstratificacaoRiscoModule,
        FastSearchModule,
        FilterModule,
        FontAwesomeModule,
        GrupoModule,
        HttpClientModule,
        HeaderModule,
        IncidenteModule,
        InterceptorModule,
        InfiniteScrollModule,
        LoginModule,
        MenuModule,
        NasModule,
        PainelLeitosModule,
        PerfilModule,
        PacienteModule,
        RiscoModule,
        ReactiveFormsModule,
        RelatoriosModule,
        SpinnerModule,
        SetorModule,
        SelectModule,
        TipoIncidenteModule,
        UsuarioModule,
        AdmissaoModule,
        PainelCirurgicoModule,
        PlanoTerapeuticoModule,
        ModalModule
    ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthGuard, DatePipe],
  exports: [
    CollapseComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
