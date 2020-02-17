package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

import java.text.SimpleDateFormat

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

        def tempoLimite

        Calendar c = new GregorianCalendar()

        Set<Ecg> registros = (Set<Ecg>) Ecg.findAll()
        registros.each{ e ->
            println  e.dataHoraPorta.toString()
            SimpleDateFormat s = new SimpleDateFormat("yyyy-M-dd", Locale.ENGLISH)
            Date date = s.parse(e.dataHoraPorta.toString())
            print date
        }
            println c.getTime()
    }
}