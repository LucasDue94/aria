import {Component, OnInit, Renderer2} from '@angular/core';
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {TitleService} from "../../core/title/title.service";
import {faFrown, faMeh, faSmile} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'estratificacao-risco-form',
  templateUrl: './estratificacao-risco-form.component.html',
  styleUrls: ['./estratificacao-risco-form.component.scss']
})
export class EstratificacaoRiscoFormComponent implements OnInit {
  registroAtendimento: RegistroAtendimento;
  tevSurgical: boolean = false;
  tevClinical: boolean = true;
  faFrown = faFrown;
  faSmile = faSmile;
  faMeh = faMeh;
  stratificationRisks = [
    {
      risks: [
        {id: 1, description: 'Alergia', status: true},
        {id: 2, description: 'Uso de acesso periférico', status: false},
        {id: 3, description: 'Uso de drogas sedativas', status: false},
        {id: 4, description: 'Uso de anticoagulante', status: false},
        {id: 5, description: 'Plaquetopenia (< 50.000)', status: false},
        {id: 6, description: 'Pós operatório imediato', status: false},
        {id: 7, description: 'Déficit cognitivo/demência', status: false},
        {id: 8, description: 'Estado  confusional  aguda*', status: false},
        {id: 9, description: 'História de dor atual', status: false},
        {id: 10, description: 'Pós-operatório imediato', status: false},
        {id: 11, description: 'Paciente diabético', status: false},
        {id: 12, description: 'Jejum prolongado', status: false},
        {id: 13, description: 'Paciente portando sonda nasoenteral', status: false},
        {id: 14, description: 'Doenças neurológicas e/ou respiratórias', status: false},
        {id: 15, description: 'Doenças e cirurgias de cabeças e pescoço', status: false},
        {id: 16, description: 'História prévia de disfagia orofaríngea', status: false},
        {id: 17, description: 'IOT < 48 horas, TQT, via alternativa de alimentação', status: false},
        {id: 18, description: 'Alteração do nível de consciência*', status: false},
        {id: 19, description: 'Múltiplas comorbidades e/ou estado clínico crítico', status: false},
        {id: 20, description: 'Paciente em cuidados paliativos', status: false},
        {id: 21, description: 'Uso de analgésicos/opióides', status: false},
        {id: 22, description: 'Uso de hipoglicemiante/Corticóide', status: false},
        {id: 23, description: 'Procedimentos cirúrgicos recente e/ou restrição física prolongada', status: false}
      ],
      tevClinical: [
        {
          id: 1,
          description:
            'Câncer ativo, história pessoal de TEV (com exclusão de trombose de veias superficiais), ' +
            'redução mobilidade > 24 horas (não deambula ou deambula pouco, maior parte do dia acamado), ' +
            'condições de trombofilia (hipercoaguabilidade).',
          status: false,
          pontuacao: 3
        },
        {
          id: 2,
          description:
            'Idade > 70 anos, insuficiência pulmonar ou cardíaca, IAM ou AVC recente (menos de um mês),' +
            'infecção aguda e/ou doença reumatológica, obesidade (IMC > 30 anos), uso de contraceptivos, ' +
            'terapia de reposição ou terapia hormonal.',
          status: false,
          pontuacao: 2
        },
        {
          id: 3,
          description: 'História recente de cirurgia ou trauma há menos de um mês.',
          status: false,
          pontuacao: 1
        }
      ],
      tevSurgical: [
        {
          id: 1,
          description: 'Idade > 75 anos, história pessoal de TEV, trombocitopenia\n' +
            'induzida por heparina, trombofilia congênita ou adquirida.',
          status: false,
          pontuacao: 3
        },
        {
          id: 2,
          description: 'Idade 61-74 anos, Cirurgia aberta/ laparoscópica (>45 minutos), Neoplasia maligna, ' +
            'Paciente acamado > 72 horas, Cateter venoso central /PICC',
          status: false,
          pontuacao: 2
        },
        {
          id: 3,
          description: 'AVC (menos de 1 mês)',
          status: false,
          pontuacao: 5
        },
        {
          id: 4,
          description: 'Idade 41 -60 anos, Pequena cirurgia (45 minutos), Edma de MMII ou veias varicosas, Gravidez ou' +
            'puerpério, História de abortamento inexplicada, Uso de contraceptivo ou terapia hormonal, Sepse, pneumonia grave ou função pulmonar' +
            'alterada, História de doença inflamtória intestinal, Proc. percutâneo.',
          status: false,
          pontuacao: 1
        },
      ]
    }
  ];

  constructor(
    private registroAtendimentoService: RegistroAtendimentoService,
    private titleService: TitleService, private render: Renderer2) {
  }

  ngOnInit() {
    this.titleService.send('Estratificação de riscos - Formulário');
    this.registroAtendimentoService.get('0230022').subscribe(registroAtendimento => {
      this.registroAtendimento = registroAtendimento;
    });
  }
}
