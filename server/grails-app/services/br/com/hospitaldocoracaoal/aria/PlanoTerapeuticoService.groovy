package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(PlanoTerapeutico)
interface PlanoTerapeuticoService {

    PlanoTerapeutico get(Serializable id)

    List<PlanoTerapeutico> list(Map args)

    Long count()

    void delete(Serializable id)

    PlanoTerapeutico save(PlanoTerapeutico planoTerapeutico)

}