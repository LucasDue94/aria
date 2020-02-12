package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

@Service(Ecg)
abstract class EcgService {

    abstract List<Ecg> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Ecg save(Ecg ecg)

    Ecg get(Long id) {
        Ecg.findById(id)
    }
}