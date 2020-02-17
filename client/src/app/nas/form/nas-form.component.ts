import {Component, OnInit} from '@angular/core';
import {RegistroAtendimento} from "../../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../../core/registroAtendimento/registroAtendimento.service";
import {ActivatedRoute} from "@angular/router";
import {Alternative} from "../../core/nas/form/alternative";
import {Question} from "../../core/nas/form/question";
import {Nas} from "../../core/nas/nas";

@Component({
  selector: 'nas-form',
  templateUrl: './nas-form.component.html',
  styleUrls: ['./nas-form.component.scss']
})
export class NasFormComponent implements OnInit {
  registroAtendimento: RegistroAtendimento;
  form = [];
  group1 = {
    name: 'MONITORIZAÇÃO CONTROLES',
    questions: [
      {
        isBool: false,
        value: new Question({
          number: '1',
          title: '',
          name: 'monitorizacao',
          alternatives: [
            new Alternative({
              option: 'a',
              value: '1a',
              description: 'Sinais vitais horários, calculo e registro regular do balanço hídrico.'
            }), new Alternative({
              questionNumber: '1',
              option: 'b',
              value: '1b',
              description: 'Presença à beira do leito e observação ou atividade contínua por duas horas' +
                'ou mais em algum plantão por razões de segurança, gravidade ou terapia, tais como: ventilação mecânica' +
                ' não invasiva, desmame, agitação, confusão mental, posição prona, procedimentos de doação de órgão, preparo' +
                ' e administração de fluidos ou medicação, auxílio em procedimentos específicos'
            }), new Alternative({
              questionNumber: '1',
              option: 'c',
              value: '1c',
              description: ' Presença à beira do leito e observação ou atividade contínua por 4 horas ou mais em algum plantão' +
                ' por razões de segurança, gravidade ou terapia, tais como os exemplos acima.'
            })
          ]
        })
      },
      {
        isBool: true,
        value: new Question({
          number: '2',
          name: 'investigacoes',
          title: 'Investigações Laboratoriais: Bioquímicas e microbiológicas'
        })
      },
      {
        isBool: true, value: new Question({
          number: '3',
          name: 'medicacao',
          title: 'Medicação, exceto droga vasoativa'
        })
      }]
  };
  group2 = {
    name: 'PROCEDIMENTOS DE HIGIENE',
    questions: [
      {
        isBool: false,
        value: new Question({
          number: '4',
          title: '',
          name: 'procedimentoHigiene',
          alternatives: [
            new Alternative({
              option: 'a',
              value: '4a',
              description: 'Realização de procedimentos de higiene tais como: curativos de feridas e cateteres' +
                ' intravasculares, troca de roupa de cama, higiene corporal do paciente em situações especiais' +
                ' ( incontinência, vômito, queimaduras, feridas com secreção, curativos cirúrgicos complexos com irrigação)' +
                ' procedimentos especiais ( ex. isolamento) etc.'
            }), new Alternative({
              questionNumber: '4',
              option: 'b',
              value: '4b',
              description: 'Realização de procedimentos de higiene que durem mais do que 2 horas, em algum plantão.'
            }), new Alternative({
              questionNumber: '4',
              option: 'c',
              value: '4c',
              description: 'Realização de procedimentos de higiene que durem mais do que 4 horas, em algum plantão.'
            })
          ]
        })
      },
      {
        isBool: true,
        value: new Question({
          number: '5',
          name: 'cuidadosDreno',
          title: 'Cuidados com drenos. Todos (exceto sonda gástrica).'
        })
      },
    ]
  };
  group3 = {
    name: 'MOBILIZAÇÃO E POSICIONAMENTO INCLUINDO',
    questions: [
      {
        isBool: false,
        value: new Question({
          number: '6',
          name: 'mobilizacaoPosicionamento',
          title: 'Procedimentos tais como: mudança de decúbito, mobilização do' +
            ' paciente, transferência da cama para a cadeira, mobilização do paciente em equipe ( ex. paciente imóvel,' +
            ' tração, posição prona).',
          alternatives: [
            new Alternative({
              option: 'a',
              value: '6a',
              description: 'Realização do (s) procedimento (s) até 3 vezes em 24horas.'
            }), new Alternative({
              questionNumber: '4',
              option: 'b',
              value: '6b',
              description: ' Realização  do (s) procedimento (s) mais do que 3 vezes em 24horas ou com 2 enfermeiros ' +
                'em qualquer frequência.'
            }), new Alternative({
              questionNumber: '4',
              option: 'c',
              value: '6c',
              description: 'Realização  do (s) procedimento (s) com 3 ou mais enfermeiros em qualquer frequência.'
            })
          ]
        })
      },
    ]
  };
  group4 = {
    name: 'SUPORTE E CUIDADO AOS FAMILIARES E PACIENTES ',
    questions: [
      {
        isBool: false,
        value: new Question({
          number: '7',
          name: 'suporteCuidado',
          title: 'Procedimentos tais como: telefonemas,' +
            'entrevistas, aconselhamentos. Frequentemente o suporte e cuidado sejam aos familiares ou aos pacientes' +
            'permitem à equipe continuar com outras atividades de enfermagem ( ex. comunicação com paciente durante' +
            'procedimentos de higiene, comunicação com os familiares enquanto presente à beira do leito observando o paciente).',
          alternatives: [
            new Alternative({
              option: 'a',
              value: '7a',
              description: 'Suporte e cuidados aos familiares e pacientes que requerem dedicação exclusiva por cerca de' +
                ' uma hora em algum plantão tais como: explicar condições clínicas, lidar com a dor e angústia, lidar com ' +
                'circunstâncias familiares difíceis.'
            }), new Alternative({
              questionNumber: '7',
              option: 'b',
              value: '7b',
              description: 'Suporte e cuidados aos familiares e pacientes que requerem dedicação exclusiva por 3 horas' +
                ' ou mais em algum plantão tais como: Morte, circunstâncias trabalhosas ( grande numero de familiares,' +
                ' problemas de linguagem, familiares hostis).'
            })
          ]
        })
      },
    ]
  };
  group5 = {
    name: 'TAREFAS ADMINISTRATIVAS E GERENCIAIS',
    questions: [
      {
        isBool: false,
        value: new Question({
          number: '8',
          title: '',
          name: 'tarefasAdministrativas',
          alternatives: [
            new Alternative({
              option: 'a',
              value: '8a',
              description: ' Realização de tarefas de rotina tais como: processamento de dados clínicos, solicitação de' +
                ' exame, troca de informações profissionais ( ex. passagem de plantão, visitas clinicas).'
            }), new Alternative({
              questionNumber: '8',
              option: 'b',
              value: '8b',
              description: 'Realização de tarefas administrativas e gerenciais que requerem dedicação integral por' +
                ' cerca de 2 horas em algum plantão.'
            }), new Alternative({
              questionNumber: '8',
              option: 'c',
              value: '8c',
              description: 'Realização de tarefas administrativas e gerenciais que requerem dedicação integral por cerca' +
                ' de 4 horas ou mais tempo em algum plantão tais como: morte e procedimento de doação de órgãos,' +
                ' coordenação com outras disciplinas.'
            })
          ]
        })
      },
    ]
  };
  group6 = {
    name: 'SUPORTE VENTILATÓRIO',
    questions: [
      {
        isBool: true,
        value: new Question({
          number: '9',
          name: 'suporteRespiratorio',
          title: 'Suporte respiratório:  qualquer forma de ventilação mecânica ou ventilação assistida com ' +
            'ou sem pressão expiratória final positiva, com ou sem relaxantes musculares; respiração espontânea com ou ' +
            'sem pressão expiratória final positiva (ex. CPAP ou BIPAP), com ou sem tubo endotraqueal; oxigênio' +
            ' suplementar por qualquer método.'
        })
      }, {
        isBool: true,
        value: new Question({
          number: '10',
          name: 'cuidadosViasAereas',
          title: 'Cuidados com vias aéreas artificiais. Tubo endotraqueal ou cânula de traqueostomia.'
        })
      }, {
        isBool: true,
        value: new Question({
          number: '11',
          name: 'tratamentoFuncaoPulmonar',
          title: ' Tratamento para melhorar da função pulmonar. Fisioterapia torácica, espirometria estimulada,' +
            ' terapia inalatória, aspiração endotraqueal'
        })
      },
    ]
  };
  group7 = {
    name: 'SUPORTE CARDIOVASCULAR',
    questions: [
      {
        isBool: true,
        value: new Question({
          number: '12',
          name: 'medicacaoVasoativa',
          title: 'Suporte respiratório:  qualquer forma de ventilação mecânica ou ventilação assistida com ' +
            'ou sem pressão expiratória final positiva, com ou sem relaxantes musculares; respiração espontânea com ou ' +
            'sem pressão expiratória final positiva (ex. CPAP ou BIPAP), com ou sem tubo endotraqueal; oxigênio' +
            ' suplementar por qualquer método.'
        })
      }, {
        isBool: true,
        value: new Question({
          number: '13',
          name: 'reposicaoIntravenosa',
          title: ' Reposição intravenosa de grandes perdas de fluidos. Administração de fluidos >3lm²/ dia, ' +
            'independente do tipo de fluido administrado.'
        })
      }, {
        isBool: true,
        value: new Question({
          number: '14',
          name: 'monitorizacaoAtrioEsquerdo',
          title: 'Monitorização do átrio esquerdo. Cateter de artéria pulmonar com ou sem medida do débito cardíaco.'
        })
      }, {
        isBool: true,
        value: new Question({
          number: '15',
          name: 'reanimacaoCardioRespiratoria',
          title: 'Reanimação cardiorrespiratória nas últimas 24 horas (excluído soco precordial).'
        })
      },
    ]
  };
  group8 = {
    name: 'SUPORTE RENAL',
    questions: [
      {
        isBool: true,
        value: new Question({
          number: '16',
          name: 'tecnicasHemofiltracao',
          title: 'Técnicas de hemofiltração. Técnicas dialíticas.'
        })
      }, {
        isBool: true,
        value: new Question({
          number: '17',
          name: 'medidaQuantitativa',
          title: 'Medida quantitativa do débito urinário (ex. sonda vesical de demora).'
        })
      }
    ]
  };
  group9 = {
    name: 'SUPORTE NEUROLÓGICO',
    questions: [
      {
        isBool: true,
        value: new Question({
          number: '18',
          name: 'medidaPressaoIntracraniana',
          title: 'Medida da pressão intracraniana'
        })
      }
    ]
  };
  group10 = {
    name: 'SUPORTE METABÓLICO',
    questions: [
      {
        isBool: true,
        value: new Question({
          number: '19',
          name: 'tratamentoAcidose',
          title: 'Tratamento da acidose ou alcalose metabólica complicada'
        })
      }, {
        isBool: true,
        value: new Question({
          number: '20',
          name: 'hiperAlimentacaoIntravenosa',
          title: 'Hiperalimentação intravenosa.'
        })
      }, {
        isBool: true,
        value: new Question({
          number: '21',
          name: 'alimentacaoEnteral',
          title: ' Alimentação enteral. Através de tubo gástrico ou outra via gastrintestinal (ex. jejunostomia)'
        })
      }
    ]
  };
  group11 = {
    name: 'INTERVENÇÕES ESPECÍFICAS',
    questions: [
      {
        isBool: true,
        value: new Question({
          number: '22',
          name: 'intervencoesDentroUnidade',
          title: 'Intervenções específicas na unidade de terapia intensiva. Intubação endotraqueal, inserção de ' +
            'marca-passo, cardioversão, endoscopias, cirurgia de emergência no último período de 24h, lavagem gástrica. ' +
            'Intervenções de rotina sem consequências diretas para as condições clínicas do paciente, tais como: raio x,' +
            ' ecografia, eletrocardiograma, curativos ou inserção de cateteres venosos ou arteriais não estão incluídos.'
        })
      }, {
        isBool: true,
        value: new Question({
          number: '23',
          name: 'intervencoesForaUnidade',
          title: 'Intervenções específicas fora da unidade de terapia intensiva. Procedimentos diagnósticos ou cirúrgicos.'
        })
      }
    ]
  };

  newNas = new Nas({
    monitorizacao: '',
    investigacoes: '',
    medicacao: '',
    procedimentoHigiene: '',
    cuidadosDreno: '',
    mobilizacaoPosicionamento: '',
    suporteCuidado: '',
    tarefasAdministrativas: '',
    suporteRespiratorio: '',
    cuidadosViasAereas: '',
    tratamentoFuncaoPulmonar: '',
    medicacaoVasoativa: '',
    reposicaoIntravenosa: '',
    monitorizacaoAtrioEsquerdo: '',
    reanimacaoCardioRespiratoria: '',
    tecnicasHemofiltracao: '',
    medidaQuantitativa: '',
    medidaPressaoIntracraniana: '',
    tratamentoAcidose: '',
    hiperAlimentacaoIntravenosa: '',
    alimentacaoEnteral: '',
    intervencoesDentroUnidade: '',
    intervencoesForaUnidade: '',
    registroAtendimentoLeito: '',
  });

  constructor(private route: ActivatedRoute, private registroAtendimentoService: RegistroAtendimentoService) {
  }

  ngOnInit() {
    this.form.push(this.group1, this.group2, this.group3, this.group4, this.group5,
      this.group6, this.group7, this.group8, this.group9, this.group10, this.group11);
    this.registroAtendimentoService.get(this.route.snapshot.params['id']).subscribe(registroAtendimento => {
        this.registroAtendimento = registroAtendimento;
        this.newNas.registroAtendimentoLeito = registroAtendimento.id;
      }
    )
  }

  save() {
    this.validateFields();
    console.log(this.newNas);
  }

  validateFields() {
    for (const key in this.newNas) {
      console.log(key)
    }
  }

  isEmpty = (key) => this.newNas[key] == '';

  checkChanges(event) {
  console.log(event)
  }
}
