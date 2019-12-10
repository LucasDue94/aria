package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

@Service(RegistroAtendimento)
abstract class RegistroAtendimentoService {

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

     RegistroAtendimento get(String id){
         RegistroAtendimento.findById(id)
     }
}
