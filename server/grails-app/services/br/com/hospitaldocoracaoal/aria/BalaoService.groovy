package br.com.hospitaldocoracaoal.aria


import grails.gorm.services.Service

@Service(Balao)
abstract class BalaoService {

    abstract Balao get(Serializable id)

    abstract List<Balao> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Balao save(Balao balao)

}