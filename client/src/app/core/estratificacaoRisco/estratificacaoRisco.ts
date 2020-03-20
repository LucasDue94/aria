export class EstratificacaoRisco {
  id: number;
  braden_percepcao_sensorial: string;
  braden_umidade: string;
  braden_atividade: string;
  braden_mobilidade: string;
  braden_nutricao: string;
  braden_friccao_cisalhamento: string;
  bradenq_mobilidade: string;
  bradenq_atividade: string;
  bradenq_percepcao_sensorial: string;
  bradenq_umidade: string;
  bradenq_friccao_deslizamento: string;
  bradenq_nutricao: string;
  bradenq_perfusao_tecidual_oxigenacao: string;
  jh_eliminacoes_intestinais: string;
  jh_mobilidade: string;
  jh_equipamentos_assistenciais: string;
  jh_uso_medicamentos_risco_quedas: string;
  jh_cognicao: string;
  hd_diagnostico: string;
  hd_cirurgia_sedacao_anestesia: string;
  hd_deterioracao_cognitiva: string;
  hd_historia_pregressa: string;
  hd_uso_medicamentos: string;
  sonda_nasoenteral: boolean;
  alergia: boolean;
  jejum_prolongado: boolean;
  tev_cirurgico_1: boolean;
  doencas_neuro_resp: boolean;
  iot_tqt: boolean;
  plaquetopenia: boolean;
  tev_clinico_2: boolean;
  tev_cirurgico_3: boolean;
  paciente_paliativos: boolean;
  tev_clinico_1: boolean;
  historia_dor: boolean;
  posoperatorio_imediato: boolean;
  disfagia_orofaringea: boolean;
  acesso_periferico: boolean;
  analgesicos_opioides: boolean;
  tev_cirurgico_2: boolean;
  drogas_sedativas: boolean;
  comorbidades_clinico_critico: boolean;
  tev_clinico_3: boolean;
  operatorio_imediato: boolean;
  hipoglicemiante_corticoide: boolean;
  anticoagulante: boolean;
  tev_cirurgico_5: boolean;
  deficit_cognitivo_demencia: boolean;
  confusional_agudo: boolean;
  paciente_diabetico: boolean;
  alteracao_consciencia: boolean;
  proced_cirug_restric_fisica: boolean;
  doenciru_cabeca_pescoco: boolean;

  constructor(object?: any) {
    if (object) {

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'br.com.hospitaldocoracaoal.aria.EstratificacaoRisco : ' + (this.id ? this.id : '(unsaved)');
  }
}
