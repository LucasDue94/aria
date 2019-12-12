package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimentoLeito
import grails.gorm.transactions.Transactional
import grails.web.servlet.mvc.GrailsParameterMap
import static org.hibernate.sql.JoinType.INNER_JOIN

@Transactional
class RegistroAtendimentoLeitosService {


    List<RegistroAtendimentoLeito> list(GrailsParameterMap args, String termo) {
        long setorId = args.long('setorId')
        Setor s = Setor.get(setorId)

        def criteria = RegistroAtendimentoLeito.createCriteria()
        return criteria.list(args) {
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
    }
}
