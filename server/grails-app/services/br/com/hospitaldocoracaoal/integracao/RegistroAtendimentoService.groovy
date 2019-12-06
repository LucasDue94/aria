package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor
import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento
import grails.gorm.transactions.Transactional
import grails.web.servlet.mvc.GrailsParameterMap

@Transactional
class RegistroAtendimentoService {

    List<RegistroAtendimento> list(GrailsParameterMap args) {
        long setorId = args.long('setorId')
        Setor s = Setor.get(setorId)
        RegistroAtendimento.where {
            registroAtendimentoLeitos {
                leito {
                    setor {
                        id == s.setorWpdId
                    }
                }
            }
        }.list(args)
    }

}
