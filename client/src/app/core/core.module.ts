import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertService} from "./alert/alert.service";
import {SpinnerService} from "./spinner/spinner.service";
import {MenuService} from "./menu/menu.service";
import {PerfilService} from "./perfil/perfil.service";
import {HttpClientModule} from "@angular/common/http";
import {SetorService} from "./setor/setor.service";
import {ErrorService} from "./error/error.service";
import {SetorWpdService} from "./setor-wpd/setorWpd.service";
import {MotivoAltaService} from './motivoAlta/motivoAlta.service';
import {CidService} from './cid/cid.service';
import {PacienteService} from './paciente/paciente.service';
import {AtendimentoService} from './atendimento/atendimento.service';
import {LeitoService} from './leito/leito.service';
import {TitleService} from "./title/title.service";
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./guards/auth.guard";
import {SelectService} from "./select/select.service";
import {ApacheService} from './apache/apache.service';
import {PermissaoService} from './permissao/permissao.service';
import {GrupoService} from './grupo/grupo.service';
import {RiscoService} from "./risco/risco.service";
import {TipoIncidenteService} from './tipoIncidente/tipoIncidente.service';
import {IncidenteService} from "./incidente/incidente.service";
import {EcgService} from './ecg/ecg.service';
import {NasService} from './nas/nas.service';
import {BalaoService} from "./balao/balao.service";
import {FilterService} from "./filter/filter.service";
import {RegistroLeitoService} from "./registroLeito/registro-leito.service";
import {EstratificacaoRiscoService} from "./estratificacaoRisco/estratificacaoRisco.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AlertService,
    SpinnerService,
    MenuService,
    PerfilService,
    SetorService,
    SetorWpdService,
    ErrorService,
    MotivoAltaService,
    CidService,
    PacienteService,
    AtendimentoService,
    LeitoService,
    TitleService,
    AuthService,
    AuthGuard,
    SelectService,
    ApacheService,
    PermissaoService,
    GrupoService,
    RiscoService,
    TipoIncidenteService,
    BalaoService,
    IncidenteService,
    EcgService,
    NasService,
    FilterService,
    EstratificacaoRiscoService,
    RegistroLeitoService

  ]
})
export class CoreModule {
}
