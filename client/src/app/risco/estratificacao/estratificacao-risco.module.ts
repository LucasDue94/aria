import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EstratificacaoRiscoFormComponent} from './form/estratificacao-risco-form.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgSelectModule} from "@ng-select/ng-select";
import {ReactiveFormsModule} from "@angular/forms";
import {GrupoFatorRiscoComponent} from './grupo-fator-risco/grupo-fator-risco.component';
import {GrupoTevClinicoComponent} from './grupo-tev-clinico/grupo-tev-clinico.component';
import {GrupoBradenComponent} from './grupo-braden/grupo-braden.component';
import {GrupoTevCirurgicoComponent} from './grupo-tev-cirurgico/grupo-tev-cirurgico.component';
import {GrupoBradenqComponent} from './grupo-bradenq/grupo-bradenq.component';
import {GrupoEscalaJhFratComponent} from './grupo-escala-jh-frat/grupo-escala-jh-frat.component';
import {GrupoHumptyDumptyComponent} from './grupo-humpty-dumpty/grupo-humpty-dumpty.component';
import { ResumoComponent } from './resumo/resumo.component';
import { EstratificacaoListComponent } from './list/estratificacao-list.component';
import {SpinnerModule} from "../../components/spinner/spinner.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {RouterModule} from "@angular/router";
import {PacienteModule} from "../../paciente/paciente.module";


@NgModule({
  declarations: [
    EstratificacaoRiscoFormComponent,
    GrupoFatorRiscoComponent,
    GrupoTevClinicoComponent,
    GrupoBradenComponent,
    GrupoTevCirurgicoComponent,
    GrupoBradenqComponent,
    GrupoEscalaJhFratComponent,
    GrupoHumptyDumptyComponent,
    ResumoComponent,
    EstratificacaoListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgSelectModule,
    ReactiveFormsModule,
    SpinnerModule,
    InfiniteScrollModule,
    RouterModule,
    PacienteModule
  ],
  exports: [
    EstratificacaoRiscoFormComponent,
    EstratificacaoListComponent
  ]
})
export class EstratificacaoRiscoModule {
}
