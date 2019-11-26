package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap
import org.hibernate.sql.JoinType

@Service(Apache)
abstract class ApacheService {

    abstract Apache get(Serializable id)

    abstract List<Apache> list(Map args)

    Map<String, String> report(GrailsParameterMap args) {
        Date dataInicio = DataUtils.getFormatterToDate(args.dataInicio)
        Date dataFim = DataUtils.getFormatterToDate(args.dataFim)

        def criteria = Apache.createCriteria()

        def result = criteria.list() {
            createAlias 'registroAtendimentoLeito', 'ral', JoinType.INNER_JOIN
            createAlias 'ral.leito', 'l', JoinType.INNER_JOIN
            createAlias 'l.setor', 's', JoinType.INNER_JOIN

            between 'ral.dataEntrada', dataInicio, dataFim
            eq('s.id', args.setorId)
        }

        result
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Apache save(Apache apache)

}