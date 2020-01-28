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
import {RegistroAtendimentoService} from './registroAtendimento/registroAtendimento.service';
import {LeitoService} from './leito/leito.service';
import {TitleService} from "./title/title.service";
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./guards/auth.guard";
import {SelectService} from "./select/select.service";
import {ApacheService} from './apache/apache.service';
import { PermissaoService } from './permissao/permissao.service';
import { GrupoService } from './grupo/grupo.service';
import {RiscoService} from "./risco/risco.service";


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
    RegistroAtendimentoService,
    LeitoService,
    TitleService,
    AuthService,
    AuthGuard,
    SelectService,
    ApacheService,
    PermissaoService,
    GrupoService,
    RiscoService
]
})
export class CoreModule {
}
