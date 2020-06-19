package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(Evolucao)
interface EvolucaoService {

    Evolucao get(Serializable id)

    List<Evolucao> list(Map args)

    Long count()

    void delete(Serializable id)

    Evolucao save(Evolucao evolucao)

}