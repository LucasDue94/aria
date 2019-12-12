package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import br.com.hospitaldocoracaoal.integracao.RegistroAtendimentoLeito

import java.time.LocalDate
import java.time.ZoneId

class Apache {
    RegistroAtendimentoLeito registroAtendimentoLeito
    String temperatura
    Integer pas
    Integer pad
    String frequenciaCardiaca
    String frequenciaRespiratoria
    String aapo
    String arterialPh
    String naSerico
    String kSerico
    String creatininaSerica
    String hematocrito
    String leucocitos
    Integer glasgow
    String problemasCronicos
    int escore

    static hasMany = [notificacoes: Notificacao]

    static constraints = {
        temperatura nullable: false, blank: false, inList: ['> 41', '39 - 40.9', '38.5 - 38.9', '36 - 38.4', '34 - 35.9', '32 - 33.9', '30 - 31.9', '< 29.9']
        pas nullable: false, blank: false
        pad nullable: false, blank: false
        frequenciaCardiaca nullable: false, blank: false, inList: ['> 180', '140 - 179', '110 - 139', '70 - 109', '55 - 69', '40 - 54', '< 39']
        frequenciaRespiratoria nullable: false, blank: false, inList: ['> 50', '35 - 49', '25 - 34', '12 - 24', '10 - 11', '6 - 9', '< 5']
        aapo nullable: false, blank: false, inList: ['> 500', '350 - 499', '200 - 349', '< 200 ou PaO2 > 70', 'PaO2 61 - 70', 'PaO2 < 55']
        arterialPh nullable: false, blank: false, inList: ['< 7.7; > 52', '7.6 - 7.69; 41 - 51.9', '7.5 - 7.59; 32 - 40.9', '7.33 - 7.49; 32 - 40.9', '7.25 - 7.32; 18 - 22.9', '7.15 - 7.24; 15 - 17.9', '< 7.15; < 15']
        naSerico nullable: false, blank: false, inList: ['> 180', '160 - 179', '155 - 159', '150 - 154', '130 - 149', '120 - 129', '111 - 119', '< 110']
        kSerico nullable: false, blank: false, inList: ['> 7', '6 - 6.9', '5.5 - 5.9', '3.5 - 5.4', '3 - 3.4', '2.5 - 2.9', '< 2.5']
        creatininaSerica nullable: false, blank: false, inList: ['> 3.5', '> 3.5 in ARF', '2 - 3.4', '2 - 3.4 in ARF', '1.5 - 1.9', '1.5 - 1.9 in ARF', '0.6 - 1.4', '< 0.6']
        hematocrito nullable: false, blank: false, inList: ['> 60', '50 - 59.9', '46 - 49.9', '30 - 45.9', '20 - 29.9', '< 20']
        leucocitos nullable: false, blank: false, inList: ['> 40', '20 - 39.9', '15 - 19.9', '3 - 14.9', '1 - 2.9', '< 1']
        glasgow nullable: false, blank: false, size: 3..15
        problemasCronicos nullable: false, blank: false, inList: ['Nenhuma', 'Não - Cirúrgico', 'Cirurgia de Emergência', 'Cirurgia Eletiva']
        registroAtendimentoLeito validator: { val, obj, errors ->
            def reg = RegistroAtendimentoLeito.where {
                registroAtendimento.id == val.registroAtendimentoId
                leito.id == val.leitoId
                dataEntrada == val.dataEntrada
            }.count()
            if (reg == 0) {
                errors.rejectValue('registroAtendimentoLeito', 'apache.registroAtendimentoLeito.doesnt.exist')
            }
        }
    }

    def beforeValidate() {
        this.calculaEscore()
    }

    def calculaEscore() {
        this.escore = 0
        this.escore += this.calculaEscoreTemperatura()
        this.escore += this.calculaEscorePressao()
        this.escore += this.calculaEscoreFrequenciaCardiaca()
        this.escore += this.calculaEscoreFrequenciaRespiratoria()
        this.escore += this.calculaEscoreAapo()
        this.escore += this.calculaEscoreArterialPh()
        this.escore += this.calculaEscoreNaSerico()
        this.escore += this.calculaEscoreKSerico()
        this.escore += this.calculaEscoreCreatinaSerica()
        this.escore += this.calculaEscoreHematocrito()
        this.escore += this.calculaEscoreLeucocitos()
        this.escore += this.calculaEscoreGlasgow()
        this.escore += this.calculaEscoreIdade()
        this.escore += this.calculaEscoreProblemasCronicos()
    }

    def calculaEscoreTemperatura() {
        int result = 0
        switch (this.temperatura) {
            case '> 41':
                result = 4
                break
            case '39 - 40.9':
                result = 3
                break
            case '38.5 - 38.9':
                result = 1
                break
            case '36 - 38.4':
                result = 0
                break
            case '34 - 35.9':
                result = 1
                break
            case '32 - 33.9':
                result = 2
                break
            case '30 - 31.9':
                result = 3
                break
            case '< 29.9':
                result = 4
                break
        }
        result
    }

    def calculaEscorePressao() {
        double paMedia = ((double) this.pas + (2 * (double) this.pad)) / 3
        int result = 0

        if (paMedia >= 160) {
            result = 4
        } else if (paMedia >= 139 && paMedia <= 159) {
            result = 3
        } else if (paMedia >= 110 && paMedia <= 129) {
            result = 2
        } else if (paMedia >= 70 && paMedia <= 109) {
            result = 0
        } else if (paMedia >= 50 && paMedia <= 69) {
            result = 2
        } else if (paMedia <= 40) {
            result = 4
        }
        result
    }

    def calculaEscoreFrequenciaCardiaca() {
        int result = 0
        switch (this.frequenciaCardiaca) {
            case '> 180':
                result = 4
                break
            case '140 - 179':
                result = 3
                break
            case '110 - 139':
                result = 2
                break
            case '70 - 109':
                result = 0
                break
            case '55 - 69':
                result = 2
                break
            case '40 - 54':
                result = 3
                break
            case '< 39':
                result = 4
                break
        }
        result
    }

    def calculaEscoreFrequenciaRespiratoria() {
        int result = 0
        switch (this.frequenciaRespiratoria) {
            case '> 50':
                result = 4
                break
            case '35 - 49':
                result = 3
                break
            case '25 - 34':
                result = 1
                break
            case '12 - 24':
                result = 0
                break
            case '10 - 11':
                result = 1
                break
            case '6 - 9':
                result = 2
                break
            case '< 5':
                result = 4
                break
        }
        result
    }

    def calculaEscoreAapo() {
        int result = 0
        switch (this.aapo) {
            case '> 500':
                result = 4
                break
            case '350 - 499':
                result = 3
                break
            case '200 - 349':
                result = 2
                break
            case '< 200 ou PaO2 > 70':
                result = 0
                break
            case 'PaO2 61 - 70':
                result = 1
                break
            case 'PaO2 55 - 60':
                result = 3
                break
            case 'PaO2 < 55':
                result = 4
                break
        }
        result
    }

    def calculaEscoreArterialPh() {
        int result = 0
        switch (this.arterialPh) {
            case '< 7.7; > 52':
                result = 4
                break
            case '7.6 - 7.69; 41 - 51.9':
                result = 3
                break
            case '7.5 - 7.59; 32 - 40.9':
                result = 1
                break
            case '7.33 - 7.49; 32 - 40.9':
                result = 0
                break
            case '7.25 - 7.32; 18 - 22.9':
                result = 2
                break
            case '7.15 - 7.24; 15 - 17.9':
                result = 3
                break
            case '< 7.15; < 15':
                result = 4
                break
        }
        result
    }

    def calculaEscoreNaSerico() {
        int result = 0
        switch (this.naSerico) {
            case '> 180':
                result = 4
                break
            case '160 - 179':
                result = 3
                break
            case '155 - 159':
                result = 2
                break
            case '150 - 154':
                result = 1
                break
            case '130 - 149':
                result = 0
                break
            case '120 - 129':
                result = 2
                break
            case '111 - 119':
                result = 3
                break
            case '< 110':
                result = 4
                break
        }
        result
    }

    def calculaEscoreKSerico() {
        int result = 0
        switch (this.kSerico) {
            case '> 7':
                result = 4
                break
            case '6 - 6.9':
                result = 3
                break
            case '5.5 - 5.9':
                result = 1
                break
            case '3.5 - 5.4':
                result = 0
                break
            case '3 - 3.4':
                result = 1
                break
            case '2.5 - 2.9':
                result = 2
                break
            case '< 2.5':
                result = 4
                break
        }
        result
    }

    def calculaEscoreCreatinaSerica() {
        int result = 0
        switch (this.creatininaSerica) {
            case '> 3.5':
                result = 4
                break
            case '> 3.5 in ARF':
                result = 8
                break
            case '2 - 3.4':
                result = 3
                break
            case '2 - 3.4 in ARF':
                result = 6
                break
            case '1.5 - 1.9':
                result = 2
                break
            case '1.5 - 1.9 in ARF':
                result = 4
                break
            case '0.6 - 1.4':
                result = 0
                break
            case '< 0.6':
                result = 2
                break
        }
        result
    }

    def calculaEscoreHematocrito() {
        int result = 0
        switch (this.hematocrito) {
            case '> 60':
                result = 4
                break
            case '50 - 59.9':
                result = 2
                break
            case '46 - 49.9':
                result = 1
                break
            case '30 - 45.9':
                result = 0
                break
            case '20 - 29.9':
                result = 2
                break
            case '< 20':
                result = 4
                break
        }
        result
    }

    def calculaEscoreLeucocitos() {
        int result = 0
        switch (this.leucocitos) {
            case '> 40':
                result = 4
                break
            case '20 - 39.9':
                result = 2
                break
            case '15 - 19.9':
                result = 1
                break
            case '3 - 14.9':
                result = 0
                break
            case '1 - 2.9':
                result = 2
                break
            case '< 1':
                result = 4
                break
        }
        result
    }

    def calculaEscoreGlasgow() {
        int result = 0
        switch (this.glasgow) {
            case 3:
                result = 12
                break
            case 4:
                result = 11
                break
            case 5:
                result = 10
                break
            case 6:
                result = 9
                break
            case 7:
                result = 8
                break
            case 8:
                result = 7
                break
            case 9:
                result = 6
                break
            case 10:
                result = 5
                break
            case 11:
                result = 4
                break
            case 12:
                result = 3
                break
            case 13:
                result = 2
                break
            case 14:
                result = 1
                break
            case 15:
                result = 0
                break
        }
        result
    }

    def calculaEscoreIdade() {
        int idade = DataUtils.calculaIdadeEntreDatas(this.registroAtendimentoLeito.registroAtendimento
                .paciente.nascimento.toInstant().atZone(ZoneId.systemDefault()).toLocalDate(), this.registroAtendimentoLeito.dataEntrada.toInstant().atZone(ZoneId.systemDefault()).toLocalDate())
        int result = 0

        if (idade >= 75) {
            result = 6
        } else if (idade >= 65 && idade <= 74) {
            result = 5
        } else if (idade >= 55 && idade <= 64) {
            result = 3
        } else if (idade >= 45 && idade <= 54) {
            result = 2
        } else if (idade <= 44) {
            result = 0
        }
        result
    }

    def calculaEscoreProblemasCronicos() {
        int result = 0
        switch (this.problemasCronicos) {
            case 'Nenhuma':
                result = 0
                break
            case 'Não - Cirúrgico':
                result = 5
                break
            case 'Cirurgia de Emergência':
                result = 5
                break
            case 'Cirurgia Eletiva':
                result = 2
                break
        }
        result
    }
}
