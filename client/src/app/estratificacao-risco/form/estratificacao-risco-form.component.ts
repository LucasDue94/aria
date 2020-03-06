import {Component, OnInit} from '@angular/core';
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {TitleService} from "../../core/title/title.service";

@Component({
  selector: 'estratificacao-risco-form',
  templateUrl: './estratificacao-risco-form.component.html',
  styleUrls: ['./estratificacao-risco-form.component.scss']
})
export class EstratificacaoRiscoFormComponent implements OnInit {

  registroAtendimento: RegistroAtendimento;


  stratificationRisks = [
    {
      risks: [
        {id: 1, description: 'Alergia', value: false},
        {id: 2, description: 'Uso de acesso periférico', value: false},
        {id: 3, description: 'Paciente portando sonda nasoenteral', value: false},
        {id: 4, description: 'Doenças neurológicas e/ou respiratórias', value: false},
        {id: 5, description: 'Doenças e cirurgias de cabeças e pescoço', value: false},
        {id: 6, description: 'Uso de drogas sedativas', value: false},
        {id: 7, description: 'História prévia de disfagia orofaríngea', value: false},
        {id: 8, description: 'IOT < 48 horas, TQT, via alternativa de alimentação', value: false},
        {id: 9, description: 'Uso de anticoagulante', value: false},
        {id: 10, description: 'Plaquetopenia (< 50.000)', value: false},
        {id: 11, description: 'Pós operatório imediato', value: false},
        {id: 12, description: 'Déficit cognitivo/demência', value: false},
        {id: 13, description: 'Procedimentos cirúrgicos recente e/ou restrição física prolongada', value: false},
        {id: 14, description: 'Estado  confusional  aguda*', value: false},
        {id: 15, description: 'Alteração do nível de consciência*', value: false},
        {id: 16, description: 'Múltiplas comorbidades e/ou estado clínico crítico', value: false},
        {id: 17, description: 'História de dor atual', value: false},
        {id: 18, description: 'Paciente em cuidados paliativos', value: false},
        {id: 19, description: 'Uso de analgésicos/opióides', value: false},
        {id: 20, description: 'Pós-operatório imediato', value: false},
        {id: 21, description: 'Paciente diabético', value: false},
        {id: 22, description: 'Jejum prolongado', value: false},
        {id: 23, description: 'Uso de hipoglicemiante/Corticóide', value: false}
      ],
      tevClinical: [
        {
          id: 1,
          description:
            'Câncer ativo, história pessoal de TEV (com exclusão de trombose de veias superficiais), ' +
            'redução mobilidade > 24 horas (não deambula ou deambula pouco, maior parte do dia acamado), ' +
            'condições de trombofilia (hipercoaguabilidade).',
          value: false
        },
        {
          id: 2,
          description: 'História recente de cirurgia ou trauma há menos de um mês.',
          value: false
        },
        {
          id: 3,
          description:
            'Idade > 70 anos, insuficiência pulmonar ou cardíaca, IAM ou AVC recente (menos de um mês), ' +
            'infecção aguda e/ou doença reumatológica, obesidade (IMC > 30 anos), uso de contraceptivos, ' +
            'terapia de reposição ou terapia hormonal.',
          value: false
        }
      ],
      tevSurgical: [{
        id: 1,
        description: 'AVC (menos de 1 mês)'
      }]
    }
  ];

  constructor(
    private registroAtendimentoService: RegistroAtendimentoService,
    private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.send('Estratificação de riscos - Formulário');
    this.registroAtendimentoService.get('0230022').subscribe(registroAtendimento => {
      this.registroAtendimento = registroAtendimento;
    });

    console.log(this.stratificationRisks);
  }

}
