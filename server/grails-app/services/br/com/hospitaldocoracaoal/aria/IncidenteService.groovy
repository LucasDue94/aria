package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(Incidente)
interface IncidenteService {

    Incidente get(Serializable id)

    List<Incidente> list(Map args)

    Long count()

    void delete(Serializable id)

    Incidente save(Incidente incidente)

}