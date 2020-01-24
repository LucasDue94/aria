package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(Risco)
interface RiscoService {

    Risco get(Serializable id)

    List<Risco> list(Map args)

    Long count()

    void delete(Serializable id)

    Risco save(Risco risco)

}