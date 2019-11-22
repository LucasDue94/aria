package br.com.hospitaldocoracaoal.aria


import grails.gorm.services.Service

@Service(Setor)
abstract class SetorService {

    abstract Setor get(Serializable id)

    abstract List<Setor> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Setor save(Setor setor)

}