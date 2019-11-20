package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Paciente
import br.com.hospitaldocoracaoal.integracao.RegistroAtendimentoLeitos

class Apache {
    RegistroAtendimentoLeitos registroAtendimentoLeito
    String temperatura
    int pas
    int pad
    String frequenciaCardiaca
    String frequenciaRespiratoria
    String aapo
    String arterialPh
    String naSerico
    String kSerico
    String creatininaSerica
    String hematocrito
    String leucocitos
    String glasgow
    String problemasCronicos

    static constraints = {
        temperatura nullable: false, blank: false
        pas nullable: false, blank: false
        pad nullable: false, blank: false
        frequenciaCardiaca nullable: false, blank: false
        frequenciaRespiratoria nullable: false, blank: false
        aapo nullable: false, blank: false
        arterialPh nullable: false, blank: false
        naSerico nullable: false, blank: false
        kSerico nullable: false, blank: false
        creatininaSerica nullable: false, blank: false
        hematocrito nullable: false, blank: false
        leucocitos nullable: false, blank: false
        glasgow nullable: false, blank: false
        problemasCronicos nullable: false, blank: false
    }
}
