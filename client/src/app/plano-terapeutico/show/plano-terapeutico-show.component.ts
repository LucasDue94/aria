import {Component, Input, OnInit} from '@angular/core';
import {Paciente} from '../../core/paciente/paciente';
import {PlanoTerapeutico} from '../../core/planoTerapeutico/planoTerapeutico';
import {justificativaEnum} from '../../core/planoTerapeutico/justificativa.enum';

@Component({
  selector: 'plano-terapeutico-show',
  templateUrl: './plano-terapeutico-show.component.html',
  styleUrls: ['./plano-terapeutico-show.component.scss']
})
export class PlanoTerapeuticoShowComponent implements OnInit {

  @Input() paciente: Paciente;
  planoTerapeutico = new PlanoTerapeutico({
    resultadoEsperado: 'is that it has a more-or-less normal distribution of letters, as opposed to using Content here,' +
      ' content here, making it look like readable English. Many desktop publishing packages and web page editors now' +
      'use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infan',
    problemaAtivo: 'e suffered alteration in some form, by injected humour, or randomised words which don\'t look even\n' +
      '        slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything\n' +
      '        embarrassing hidden in the middle of text. All the Lorem I',
    conduta: 'is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here,\n' +
      '        content here \', making it look like readable English. Many desktop publishing packages and web page editors now\n' +
      '        use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in\n' +
      '        their infan',
    prazo: '30 dias'
  });

  justiticativas = [{
    desc: 'Mudança de quadro clínico',
    value: justificativaEnum.mudancaDeQuadro
  }, {
    desc: 'Óbito',
    value: justificativaEnum.obito
  }, {
    desc: 'Alta',
    value: justificativaEnum.alta
  }, {
    desc: 'Transferência',
    value: justificativaEnum.transferencia
  }];

  constructor() {
  }

  ngOnInit() {
  }

}
