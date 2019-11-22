package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimentoLeitos
import grails.gorm.transactions.Transactional
import grails.web.servlet.mvc.GrailsParameterMap

@Transactional
class RegistroAtendimentoLeitosService {

    List<RegistroAtendimentoLeitos> list(GrailsParameterMap args) {
        long setorId = args.long('setorId')
        Setor s = Setor.get(setorId)
        RegistroAtendimentoLeitos.where {
            leito {
                setor {
                    id == s.setorWpdId
                }
            }
        }.list(args)
    }
}
