import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EvolucaoComponent} from './evolucao.component';
import {CardModule} from '../../components/card/card.module';
import {ModalModule} from '../../components/modal/modal.module';
import {AdmissaoModule} from '../../admissao/admissao.module';
import {PlanoTerapeuticoModule} from '../../plano-terapeutico/plano-terapeutico.module';
import {PacienteInfoModule} from '../info/paciente-info.module';


@NgModule({
  declarations: [EvolucaoComponent],
  imports: [
    CommonModule,
    CardModule,
    ModalModule,
    AdmissaoModule,
    PlanoTerapeuticoModule,
    PacienteInfoModule
  ],
  exports: [
    EvolucaoComponent
  ]
})
export class EvolucaoModule {
}
