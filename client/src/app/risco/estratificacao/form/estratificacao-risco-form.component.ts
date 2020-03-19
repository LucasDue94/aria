import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RegistroAtendimentoService} from "../../../core/registroAtendimento/registroAtendimento.service";
import {RegistroAtendimento} from "../../../core/registroAtendimento/registroAtendimento";
import {TitleService} from "../../../core/title/title.service";
import {faChevronCircleLeft, faChevronCircleRight, faFrown, faMeh, faSmile} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, Validators} from "@angular/forms";
import {EstratificacaoRisco} from "../../../core/estratificacaoRisco/estratificacaoRisco";

@Component({
  selector: 'estratificacao-risco-form',
  templateUrl: './estratificacao-risco-form.component.html',
  styleUrls: ['./estratificacao-risco-form.component.scss']
})

export class EstratificacaoRiscoFormComponent implements OnInit {
  @ViewChild('tabs', {static: false}) tab: ElementRef;

  registroAtendimento: RegistroAtendimento;
  tevSurgical: boolean = false;
  tevClinical: boolean = true;
  faFrown = faFrown;
  faSmile = faSmile;
  faMeh = faMeh;
  faChevronRight = faChevronCircleRight;
  faChevronLeft = faChevronCircleLeft;
  RISKS_STRATIFICATION = [
    {
      id: 1,
      description: 'Alergia',
      controlname: 'alergia',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}],
    },
    {
      id: 2,
      description: 'Uso de acesso periférico',
      controlname: 'acesso_periferico',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 3,
      description: 'Uso de drogas sedativas',
      controlname: 'drogas_sedativas',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 4,
      description: 'Uso de anticoagulante',
      controlname: 'anticoagulante',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 5,
      description: 'Plaquetopenia (< 50.000)',
      controlname: 'plaquetopenia',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 6,
      description: 'Pós operatório imediato',
      controlname: 'operatorio_imediato',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 7,
      description: 'Déficit cognitivo/demência',
      controlname: 'deficit_cognitivo_demencia',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 8,
      description: 'Estado  confusional  aguda*',
      controlname: 'confusional_agudo',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 9,
      description: 'História de dor atual',
      controlname: 'historia_dor',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 10,
      description: 'Paciente diabético',
      controlname: 'paciente_diabetico',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 11,
      description: 'Jejum prolongado',
      controlname: 'jejum_prolongado',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 12,
      description: 'Paciente portando sonda nasoenteral',
      controlname: 'sonda_nasoenteral',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 13,
      description: 'Doenças neurológicas e/ou respiratórias',
      controlname: 'doencas_neuro_resp',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 14,
      description: 'Doenças e cirurgias de cabeças e pescoço',
      controlname: 'doenciru_cabeca_pescoco',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 15,
      description: 'História prévia de disfagia orofaríngea',
      controlname: 'disfagia_orofaringea',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 16,
      description: 'IOT < 48 horas, TQT, via alternativa de alimentação',
      controlname: 'iot_tqt',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 17,
      description: 'Alteração do nível de consciência*',
      controlname: 'alteracao_consciencia',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 18,
      description: 'Múltiplas comorbidades e/ou estado clínico crítico',
      controlname: 'comorbidades_clinico_critico',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 19,
      description: 'Paciente em cuidados paliativos',
      controlname: 'paciente_paliativos',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 20,
      description: 'Uso de analgésicos/opióides',
      controlname: 'analgesicos_opioides',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 21,
      description: 'Uso de hipoglicemiante/Corticóide',
      controlname: 'hipoglicemiante_corticoide',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    },
    {
      id: 22,
      description: 'Procedimentos cirúrgicos recente e/ou restrição física prolongada',
      controlname: 'proced_cirug_restric_fisica',
      alternatives: [{option: 'Sim', value: true}, {option: 'Não', value: false}]
    }
  ];
  TEV_CLINICAL = [
    {
      id: 23,
      description:
        'Câncer ativo, história pessoal de TEV (com exclusão de trombose de veias superficiais), ' +
        'redução mobilidade > 24 horas (não deambula ou deambula pouco, maior parte do dia acamado), ' +
        'condições de trombofilia (hipercoaguabilidade).',
      controlname: 'tev_clinico_1',
      punctuation: 3
    },
    {
      id: 24,
      description:
        'Idade > 70 anos, insuficiência pulmonar ou cardíaca, IAM ou AVC recente (menos de um mês),' +
        'infecção aguda e/ou doença reumatológica, obesidade (IMC > 30 anos), uso de contraceptivos, ' +
        'terapia de reposição ou terapia hormonal.',
      controlname: 'tev_clinico_2',
      punctuation: 2
    },
    {
      id: 25,
      description: 'História recente de cirurgia ou trauma há menos de um mês.',
      controlname: 'tev_clinico_3',
      punctuation: 1
    }

  ];
  TEV_SURGICAL = [
    {
      id: 1,
      description: 'AVC (menos de 1 mês)',
      controlname: 'tev_cirurgico_5',
      punctuation: 5
    },
    {
      id: 2,
      description: 'Idade > 75 anos, história pessoal de TEV, trombocitopenia\n' +
        'induzida por heparina, trombofilia congênita ou adquirida.',
      controlname: 'tev_cirurgico_3',
      punctuation: 3
    },
    {
      id: 3,
      description: 'Idade 61-74 anos, Cirurgia aberta/ laparoscópica (>45 minutos), Neoplasia maligna, ' +
        'Paciente acamado > 72 horas, Cateter venoso central /PICC',
      controlname: 'tev_cirurgico_2',
      punctuation: 2
    },
    {
      id: 4,
      description: 'Idade 41 -60 anos, Pequena cirurgia (45 minutos), Edma de MMII ou veias varicosas, Gravidez ou' +
        'puerpério, História de abortamento inexplicada, Uso de contraceptivo ou terapia hormonal, Sepse, pneumonia grave ou função pulmonar' +
        'alterada, História de doença inflamtória intestinal, Proc. percutâneo.',
      controlname: 'tev_cirurgico_1',
      punctuation: 1
    },
  ];
  ESCALA_BRADEN = [
    {
      description: 'Percepção Sensorial',
      controlname: 'braden_percepcao_sensoriale',
      alternatives: [
        {id: 1, description: 'Totalmente limitado', punctuation: 1},
        {id: 2, description: 'Muito limitado', punctuation: 2},
        {id: 3, description: 'Levemente limitado', punctuation: 3},
        {id: 4, description: 'Nenhuma limitação', punctuation: 4}
      ]
    },
    {
      description: 'Umidade',
      controlname: 'braden_umidade',
      alternatives: [
        {id: 1, description: 'Completamente molhado', punctuation: 1},
        {id: 2, description: 'Muito molhado', punctuation: 2},
        {id: 3, description: 'Ocasionalmente molhado', punctuation: 3},
        {id: 4, description: 'Raramente molhado', punctuation: 4},
      ]
    },
    {
      description: 'Atividade',
      controlname: 'braden_atividade',
      alternatives: [
        {id: 1, description: 'Acamado', punctuation: 1},
        {id: 2, description: 'Confinado à cadeira', punctuation: 2},
        {id: 3, description: 'Anda ocasionalmente', punctuation: 3},
        {id: 4, description: 'Anda frequentemente', punctuation: 4},
      ]
    },
    {
      description: 'Mobilidade',
      controlname: 'braden_mobilidade',
      alternatives: [
        {id: 1, description: 'Totalmente limitado', punctuation: 1},
        {id: 2, description: 'Bastante limitado', punctuation: 2},
        {id: 3, description: 'Levemente limitado', punctuation: 3},
        {id: 4, description: 'Não apresenta limitações', punctuation: 4},
      ]
    },
    {
      description: 'Nutrição',
      controlname: 'braden_nutricao',
      alternatives: [
        {id: 1, description: 'Muito pobre', punctuation: 1},
        {id: 2, description: 'Provavelmente inadequada', punctuation: 2},
        {id: 3, description: 'Adequada', punctuation: 3},
        {id: 4, description: 'Excelente', punctuation: 4},
      ]
    },
    {
      description: 'Fricção',
      controlname: 'braden_friccao_cisalhamento',
      alternatives: [
        {id: 1, description: 'Problema', punctuation: 1},
        {id: 2, description: 'Problema potencial', punctuation: 2},
        {id: 3, description: 'Nenhum', punctuation: 3}
      ]
    }
  ];
  estratificacao = new EstratificacaoRisco();
  currentTab = 0;
  form = this.fb.group({
    tev_cirurgico_5: this.fb.control(false, Validators.required),
    tev_cirurgico_3: this.fb.control(false, Validators.required),
    tev_cirurgico_2: this.fb.control(false, Validators.required),
    tev_cirurgico_1: this.fb.control(false, Validators.required),
  });
  title = 'ESTRATIFICAÇÃO DE RISCOS';

  constructor(
    private registroAtendimentoService: RegistroAtendimentoService,
    private fb: FormBuilder,
    private titleService: TitleService) {
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.titleService.send('Estratificação de riscos - Formulário');
    this.registroAtendimentoService.get('0230022').subscribe(registroAtendimento => {
      this.registroAtendimento = registroAtendimento;
    });
  }

  changeTitle() {
    switch (this.currentTab) {
      case 0 :
        this.title = 'ESTRATIFICAÇÃO DE RISCOS';
        break;
      case 1 :
        this.title = 'ESTRATIFICAÇÃO DE RISCOS - TEV CLINICO / ESCALA BRADEN';
        break;
      case 2 :
        this.title = 'ESTRATIFICAÇÃO DE RISCOS - TEV CIRÚRGICO';
        break;
    }
  }

  nextTab() {
    if (this.currentTab < 3) {
      this.currentTab += 1;
    }
    this.changeTitle();
  }

  previousTab() {
    if (this.currentTab > 0) {
      this.currentTab -= 1;
    }
    this.changeTitle();
  }

}
