package br.com.hospitaldocoracaoal.integracao

import grails.gorm.services.Service

@Service(SetorWpd)
interface SetorWpdService {

    SetorWpd get(Serializable id)

    List<SetorWpd> list(Map args)

    Long count()

    void delete(Serializable id)

    SetorWpd save(SetorWpd setorWpd)

}