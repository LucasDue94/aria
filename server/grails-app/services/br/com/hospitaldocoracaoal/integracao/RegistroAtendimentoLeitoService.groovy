package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

import static org.hibernate.sql.JoinType.INNER_JOIN

@Service(RegistroAtendimentoLeito)
abstract class RegistroAtendimentoLeitoService {

    abstract RegistroAtendimentoLeito get(Serializable id)

    abstract List<RegistroAtendimentoLeito> list(Map args)

    List<RegistroAtendimentoLeito> admissoesSetor(GrailsParameterMap args, String termo) {
        def criteria = RegistroAtendimentoLeito.createCriteria()
        if (args.containsKey('setorId') && args.getLong('setorId') != null) {
            Long setorId = args.long('setorId')
            Setor s = Setor.get(setorId)
            criteria.list(args) {
                createAlias 'leito', 'l', INNER_JOIN
                createAlias 'l.setor', 's', INNER_JOIN


                if (termo != null && !termo.empty) {
                    createAlias 'registroAtendimento', 'ra', INNER_JOIN
                    createAlias 'ra.paciente', 'p', INNER_JOIN
                    or {
                        ilike 'ra.id', "%$termo%"
                        ilike 'p.nome', "%$termo%"
                    }
                }
                eq 's.id', s.setorWpdId
            } as List<RegistroAtendimentoLeito>
        } else {
            criteria.list(args) {
                if (termo != null && !termo.empty) {
                    createAlias 'registroAtendimento', 'ra', INNER_JOIN
                    createAlias 'ra.paciente', 'p', INNER_JOIN
                    or {
                        ilike 'ra.id', "%$termo%"
                        ilike 'p.nome', "%$termo%"
                    }
                }
            } as List<RegistroAtendimentoLeito>
        }
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract RegistroAtendimentoLeito save(RegistroAtendimentoLeito registroAtendimentoLeito)

}