package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(TipoIncidente)
interface TipoIncidenteService {

    TipoIncidente get(Serializable id)

    List<TipoIncidente> list(Map args)

    Long count()

    void delete(Serializable id)

    TipoIncidente save(TipoIncidente tipoIncidente)

}