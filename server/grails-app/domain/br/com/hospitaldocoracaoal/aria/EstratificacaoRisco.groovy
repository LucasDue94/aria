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
    Boolean tev_cirurgico_2                 // Idade 61-74 anos, Cirurgia aberta / laparoscopica (>45 minutos), Neoplastia maligna, Paciente acamado >= , Cirurgia aberta / laparoscopica (>45 mnutos), Neoplasia maligna, Paciente acamado >= 72 horas, Cateter venoso central / PICC
    Boolean tev_cirurgico_1                 // Idade 41- 60 anos, Pequena cirugia (45 minutos), Edema de MMII ou veias varicosas, Gravidez ou puerperio, Historia de abortamento inexplicada, Uso de contraceptivo ou terapia hormonal, Sepse, pneumonia grave ou funcao pulmonar alterada, Historia de doenca inflamatoria intestinal, Proc. percutaneo

    // Escala de Braden
    String braden_percepcao_sensorial
    String braden_umidade
    String braden_atividade
    String braden_mobilidade
    String braden_nutricao
    String braden_friccao_cisalhamento

    // Escala de braden Q
    String bradenq_mobilidade
    String bradenq_atividade
    String bradenq_percepcao_sensorial
    String bradenq_umidade
    String bradenq_friccao_deslizamento
    String bradenq_nutricao
    String bradenq_perfusao_tecidual_oxigenacao

    // Escala JH-FRAT
//    Integer idade
    String jh_eliminacoes_intestinais
    String jh_mobilidade
    String jh_equipamentos_assistenciais
    String jh_uso_medicamentos_risco_quedas
    String jh_cognicao

    // Escala de Humpty-Dumpty
//    Integer humpty_dumpty_idade
//    Character humpty_dumpty_sexo
    String hd_diagnostico
    String hd_cirurgia_sedacao_anestesia
    String hd_deterioracao_cognitiva
    String hd_historia_pregressa
    String hd_uso_medicamentos

    static constraints = {
        braden_percepcao_sensorial nullable: true, blank: false, inList: ['Totalmente limitado', 'Muito limitado', 'Levemente limitado', 'Nenhuma limitação']
        braden_umidade nullable: true, blank: true, inList: ['Completamente molhado', 'Muito molhado', 'Ocasionalmente molhado', 'Raramente molhado']
        braden_atividade nullable: true, blank: true, inList: ['Acamado', 'Confinado à cadeira', 'Anda ocasionalmente', 'Anda frequentemente']
        braden_mobilidade nullable: true, blank: true, inList: ['Totalmente limitado', 'Bastante limitado', 'Levemente limitado', 'Não apresenta limitações']
        braden_nutricao nullable: true, blank: true, inList: ['Muito pobre', 'Provavelmente inadequada', 'Adequada', 'Excelente']
        braden_friccao_cisalhamento nullable: true, blank: true, inList: ['Problema', 'Problema potencial', 'Nenhum problema']

        bradenq_mobilidade nullable: true, blank: false, inList: ['Completamente imobilizado', 'Muito limitada', 'Ligeiramente limitada', 'Nenhuma limitacao']
        bradenq_atividade nullable: true, blank: false, inList: ['Acamado', 'Sentado', 'Anda ocasionalmente', 'Deambula ou é muito jovem para caminhar frequentemente']
        bradenq_percepcao_sensorial nullable: true, blank: false, inList: ['Completamente limitada', 'Muito limitada', 'Ligeiramente limitada', 'Nenhuma limitação']
        bradenq_umidade nullable: true, blank: false, inList: ['Pele constantemente úmida', 'Pele muito úmida', 'Pele ocasionalmente úmida', 'Pele raramente úmida']
        bradenq_friccao_deslizamento nullable: true, blank: false, inList: ['Problema significativo', 'Problema', 'Problema potencial', 'Nenhum problema']
        bradenq_nutricao nullable: true, blank: false, inList: ['Muito pobre', 'Inadequada', 'Adequada', 'Excelente']
        bradenq_perfusao_tecidual_oxigenacao nullable: true, blank: false, inList: ['Extremamente comprometido', 'Comprometido', 'Adequado', 'Excelente']

        jh_eliminacoes_intestinais nullable: true, blank: false, inList: ['Urgência/aumento da frequência e incontinência', 'Incontinência', 'Urgência ou aumento da frequência']
        jh_mobilidade nullable: true, blank: false, inList: ['Necessita de auxilio ou supervisão para mobilização', 'Marcha instável', 'Comprometimento visual ou auditivo que afeta a mobilidade']
        jh_equipamentos_assistenciais nullable: true, blank: false, inList: ['Um equipamento', 'Dois equipamentos', 'Três ou mais equipamentos']
        jh_uso_medicamentos_risco_quedas nullable: true, blank: false, inList: ['Em uso de 1 medicamento de alto risco de queda', 'Em uso de 2 ou mais medicamentos de alto risco de queda', 'Procedimento sob sedação nas últimas 24 horas']
        jh_cognicao nullable: true, blank: false, inList: ['Percepções alteradas do ambiente físico desconhecido', 'Impulsividade (comportamento imprevisível ou arriscado)', 'Falta de entendimento de suas limitações físicas e cognitivas']

        hd_diagnostico nullable: true, blank: false, inList:['Problemas neurológicos', 'Alterações de oxigenação (Respiratórios, anemia, desitratação, anorexia, tontura, síncope)', 'Transtornos psíquicos', 'Outro diagnóstico']
        hd_cirurgia_sedacao_anestesia nullable: true, blank: false, inList:['Há 24h', 'Há 48h', 'Mais de 48h / nenhum']
        hd_deterioracao_cognitiva nullable: true, blank: false, inList:['Não consciente de suas limitações', 'Esquece suas limitações', 'Orientado de acordo com suas capacidades']
        hd_historia_pregressa nullable: true, blank: false, inList:['Históra de queda ou criança de 1 mês a 3 anos acomodado em cama',
                                                                    'Em uso de dispositivo de assistência (cadeira de rodas, andador, suporte de soro, entre outros)',
                                                                    'Criança acamado', 'Criança que pode se locomover entre os ambientes sem limitações']
        hd_uso_medicamentos nullable: true, blank: false, inList:['Uso de 2 ou mais dos seguintes medicamentos (sedativos, hipnóticos, barbitúricos, antidepressivos, laxantes, diuréticos, narcóticos)',
                                                                  'Uma das medicações acima citadas', 'Outras medicações / nenhum']


    }
}
