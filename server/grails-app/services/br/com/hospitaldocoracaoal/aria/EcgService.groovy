package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

@Service(Ecg)
abstract class EcgService {

    abstract List<Ecg> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Ecg save(Ecg ecg)

    abstract Ecg get(Long id)

    def gerarEcg(GrailsParameterMap args) {
        Calendar c = new GregorianCalendar()

        if (args.containsKey('dataInicio') && args.containsKey('dataFim')) {
            Date dataInicio = DataUtils.getFormatterToDate((String) args.dataInicio)
            Date dataFim = DataUtils.getFormatterToDate((String) args.dataFim)

            def criteria = Ecg.createCriteria()
            def ecgs = criteria.list {
                between "dataHoraPorta", dataInicio, dataFim
            }

            List<Boolean> ecgLimite = ecgs.collect {
                Ecg e ->
                    c.setTime(e.dataHoraPorta)
                    c.add(Calendar.MINUTE, 10)
                    e.dataHoraEcg <= c.getTime()
            }
            return [
                    atendidos   : ecgLimite.count { limite -> limite },
                    naoAtendidos: ecgLimite.count { limite -> !limite },
                    total       : ecgLimite.size()
            ]
        }

    }
}