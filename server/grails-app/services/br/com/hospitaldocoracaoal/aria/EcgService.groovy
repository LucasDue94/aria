package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(Ecg)
abstract class EcgService {

    abstract List<Ecg> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Ecg save(Ecg ecg)

    Ecg get(Long id) {
        Ecg.findById(id)
    }

    def gerarEcg() {
        Calendar c = new GregorianCalendar()

        List<Boolean> ecgLimite = Ecg.list().collect { Ecg e ->
            c.time = e.dataHoraPorta
            c.add(Calendar.MINUTE, 10)
            e.dataHoraEcg <= c.time
        }

        return [
                atendidos   : ecgLimite.count { limite -> limite },
                naoAtendidos: ecgLimite.count { limite -> !limite },
                total       : ecgLimite.size()
        ]
    }
}