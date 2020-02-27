package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Grupo
import br.com.hospitaldocoracaoal.aria.Setor
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

import static org.hibernate.sql.JoinType.INNER_JOIN

@Service(RegistroAtendimento)
abstract class RegistroAtendimentoService {


    List<RegistroAtendimento> list(GrailsParameterMap args) {

        if (args.containsKey('setorId')) {
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
        } else {
            RegistroAtendimento.where {
                tipo == RegistroAtendimento.TIPO_INTERNO
            }.list(args)
        }
    }

    List<RegistroAtendimento> listInternamentos(GrailsParameterMap args, String termo) {
        def criteria = RegistroAtendimento.createCriteria()
        criteria.list(args) {
            createAlias 'paciente', 'p', INNER_JOIN
            eq 'tipo', RegistroAtendimento.TIPO_INTERNO

            if (termo != null && !termo.empty) {
                or {
                    ilike 'id', "%$termo%"
                    ilike 'p.nome', "%$termo%"
                }
            }
        } as List<RegistroAtendimento>
    }

    List<RegistroAtendimento> listUrgencias(GrailsParameterMap args, termo) {
        def criteria = RegistroAtendimento.createCriteria()
        criteria.list(args) {
            createAlias 'paciente', 'p', INNER_JOIN
            eq 'tipo', RegistroAtendimento.TIPO_EMERGENCIA
            if (termo != null && !termo.empty) {
                or {
                    ilike 'id', "%$termo%"
                    ilike 'p.nome', "%$termo%"
                }
            }
        } as List<RegistroAtendimento>
    }

    abstract Long count()
    RegistroAtendimento get(String id){
        RegistroAtendimento.findById(id)
    }
}












