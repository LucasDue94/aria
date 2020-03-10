package br.com.hospitaldocoracaoal.aria

class EstratificacaoRisco {

    Boolean alergia                         // Alergia
    Boolean acesso_periferico               // Risco de Flebite - Uso de acesso periferico
    Boolean sonda_nasoenteral               // Risco de Perda SNE - Paciente portando sonda nasoenteral

    // Risco de Broncoaspiração
    Boolean doencas_neuro_resp              // Doenças neurológicas e/ou respiratorias
    Boolean doenciru_cabeca_pescoco         // Doenças e cirurgias de cabeça e pescoco
//    Boolean idosos_65                     // Idosos >= 65 anos
    Boolean drogas_sedativas                // Uso de drogas sedativas
    Boolean disfagia_orofaringea            // Historia previa de disfagia orofaringea
    Boolean iot_tqt                         // IOT <= 48 horas, TQT, via alternativa de alimentacao

    // Risco de sangramento
    Boolean anticoagulante                  // Uso de anticoagulante
    Boolean plaquetopenia                   // Plaquetopenia (<50.000)
    Boolean operatorio_imediato             // Pos operatorio imediato

    // Risco de Delirium
//    Boolean idade_65                      // Idade > 65 anos
    Boolean deficit_cognitivo_demencia      // Deficit cognitivo demencia
    Boolean proced_cirug_restric_fisica     // Procedimentos cirurgicos recente e/ou restrição fisica prolongada
    Boolean confusional_agudo               // Estado confusional agudo
    Boolean alteracao_consciencia           // Alteracao do nivel de consciencia
    Boolean comorbidades_clinico_critico    // Multipla comorbidades e/ou estado clinico critico

    // Risco de Dor
    Boolean historia_dor                    // Historia de dor atual
    Boolean paciente_paliativos             // Paciente em cuidados paliativos
    Boolean analgesicos_opioides            // Uso de analgesicos opioides
    Boolean posoperatorio_imediato          // Pos-operatorio imediato

    // Riscode glicemia instavel
    Boolean paciente_diabetico              // Paciente diabetico
    Boolean jejum_prolongado                // Jejum prolongado
    Boolean hipoglicemiante_corticoide      // Uso de hipoglicemiante/Corticoide

    // Risco de TEV clinico
    Boolean tev_clinico_3                   // Cancer ativo, historia pessoal de TEV (com exclusao de trombose de veias superficiais), reducao da mobilidade >= 24 horas (nao deambula ou deambula pouco, maior parte do dia acamado), condicoes de trombofilia (hipercoagulabilidade)
    Boolean tev_clinico_2                   // Historia recente de cirurgia ou trauma ha menos de um mes
    Boolean tev_clinico_1                   // Idade >= 70 anos, insuficiencia pulmonar ou cardiaca, IAM ou AVC recente (menos de um mes), infeccao aguda e/ou doenca reumatologica, obesidade (IMC >= 30 anos), uso de contraceptivos, terapia de reposição ou terapia hormonal

    Boolean tev_cirurgico_5                 // AVC (menos de 1 mes).
    Boolean tev_cirurgico_3                 // Idade >= 75 anos, Historia pessoal de TEV, Trombocitopenia induzida por heparina, Trombofilia congenita ou adquirida
    Boolean tev_cirurgico_2                 // Idade 61-74 anos, Cirurgia aberta / laparoscopica (>45 minutos), Neoplastia maligna, Paciente acamado >=
    static constraints = {
    }
}
