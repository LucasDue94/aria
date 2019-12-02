package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap
import org.hibernate.sql.JoinType

@Service(Apache)
abstract class ApacheService {

    abstract Apache get(Serializable id)

    abstract List<Apache> list(Map args)

    def report(GrailsParameterMap args) {
        Date dataInicio = DataUtils.getFormatterToDate(args.dataInicio)
        Date dataFim = DataUtils.getFormatterToDate(args.dataFim)

        def criteria = Apache.createCriteria()

        List<Apache> apacheList = criteria.list() {
            createAlias 'registroAtendimentoLeito', 'ral', JoinType.INNER_JOIN
            createAlias 'ral.leito', 'l', JoinType.INNER_JOIN
            createAlias 'l.setor', 's', JoinType.INNER_JOIN

            between 'ral.dataEntrada', dataInicio, dataFim
            eq('s.id', args.setorId)
        } as List<Apache>

        def cirurgico = apacheList.findAll { !it.registroAtendimentoLeito.registroAtendimento.cirurgias?.isEmpty() }
        def naoCirurgicos = apacheList - cirurgico

        def result = [
                cirurgico: [
                        '1%': cirurgico.findAll({ it.escore <= 4 }).size(),
                        '3%': cirurgico.findAll({ it.escore >= 5 && it.escore <= 9 }).size(),
                        '7%': cirurgico.findAll({ it.escore >= 10 && it.escore <= 14 }).size(),
                        '12%': cirurgico.findAll({ it.escore >= 15 && it.escore <= 19 }).size(),
                        '30%': cirurgico.findAll({ it.escore >= 20 && it.escore <= 24 }).size(),
                        '35%': cirurgico.findAll({ it.escore >= 25 && it.escore <= 29 }).size(),
                        '73%': cirurgico.findAll({ it.escore >= 30 && it.escore <= 34 }).size(),
                        '88%': cirurgico.findAll({ it.escore >= 35 }).size()
                ],
                naoCirurgico: [
                        '4%':  naoCirurgicos.findAll({ it.escore <= 4 }).size(),
                        '8%':  naoCirurgicos.findAll({ it.escore >= 5 && it.escore <= 9 }).size(),
                        '15%': naoCirurgicos.findAll({ it.escore >= 10 && it.escore <= 14 }).size(),
                        '24%': naoCirurgicos.findAll({ it.escore >= 15 && it.escore <= 19 }).size(),
                        '40%': naoCirurgicos.findAll({ it.escore >= 20 && it.escore <= 24 }).size(),
                        '55%': naoCirurgicos.findAll({ it.escore >= 25 && it.escore <= 29 }).size(),
                        '73%': naoCirurgicos.findAll({ it.escore >= 30 && it.escore <= 34 }).size(),
                        '85%': naoCirurgicos.findAll({ it.escore >= 35 }).size()
                ]
        ]

        result
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Apache save(Apache apache)

}