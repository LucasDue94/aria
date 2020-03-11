package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(EstratificacaoRisco)
interface EstratificacaoRiscoService {

    EstratificacaoRisco get(Serializable id)

    List<EstratificacaoRisco> list(Map args)

    Long count()

    void delete(Serializable id)

    EstratificacaoRisco save(EstratificacaoRisco estratificacaoRisco)

}