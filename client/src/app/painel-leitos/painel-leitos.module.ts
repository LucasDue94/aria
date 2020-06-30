import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PainelLeitosComponent} from './painel-leitos.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TabelaResumoComponent} from './tabela-resumo/tabela-resumo.component';
import {PacienteCardModule} from './paciente-card/paciente-card.module';
import {StatusCardComponent} from './status-card/status-card.component';
import {RouterModule} from '@angular/router';
import {PainelLeitosRoutingModule} from "./painel-leitos-routing.module";
import {PacienteModule} from "../paciente/paciente.module";


@NgModule({
  declarations: [
    PainelLeitosComponent,
    TabelaResumoComponent,
    StatusCardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PacienteModule,
    PacienteCardModule,
    RouterModule,
    PainelLeitosRoutingModule,
  ],
  exports: [
    PainelLeitosComponent,
    TabelaResumoComponent,
    StatusCardComponent
  ]
})
export class PainelLeitosModule {
}
