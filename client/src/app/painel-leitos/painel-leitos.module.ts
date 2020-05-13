import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PainelLeitosComponent} from './painel-leitos.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TabelaResumoComponent} from './tabela-resumo/tabela-resumo.component';
import {PacienteInfoModule} from '../paciente-info/paciente-info.module';
import {PacienteCardModule} from './paciente-card/paciente-card.module';
import {StatusCardComponent} from './status-card/status-card.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    PainelLeitosComponent,
    TabelaResumoComponent,
    StatusCardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PacienteInfoModule,
    PacienteCardModule,
    RouterModule
  ],
  exports: [
    PainelLeitosComponent,
    TabelaResumoComponent,
    StatusCardComponent
  ]
})
export class PainelLeitosModule {
}
