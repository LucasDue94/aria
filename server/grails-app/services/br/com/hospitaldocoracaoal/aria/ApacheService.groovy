package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(Apache)
interface ApacheService {

    Apache get(Serializable id)

    List<Apache> list(Map args)

    Long count()

    void delete(Serializable id)

    Apache save(Apache apache)

}