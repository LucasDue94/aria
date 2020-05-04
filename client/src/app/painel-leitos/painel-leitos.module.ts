import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PainelLeitosComponent} from './painel-leitos.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TabelaResumoComponent} from './tabela-resumo/tabela-resumo.component';
import {PacienteInfoModule} from '../paciente-info/paciente-info.module';
import {PacienteCardModule} from './paciente-card/paciente-card.module';


@NgModule({
  declarations: [
    PainelLeitosComponent,
    TabelaResumoComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PacienteInfoModule,
    PacienteCardModule
  ],
  exports: [
    PainelLeitosComponent,
    TabelaResumoComponent
  ]
})
export class PainelLeitosModule {
}
