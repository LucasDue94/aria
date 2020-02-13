package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(Nas)
interface NasService {

    Nas get(Serializable id)

    List<Nas> list(Map args)

    Long count()

    void delete(Serializable id)

    Nas save(Nas nas)

}