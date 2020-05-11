package br.com.hospitaldocoracaoal.integracao

import grails.gorm.services.Service

@Service(Leito)
interface LeitoService {

    Leito get(Serializable id)

    List<Leito> list(Map args)

    Long count()

    void delete(Serializable id)

    Leito save(Leito leito)

}