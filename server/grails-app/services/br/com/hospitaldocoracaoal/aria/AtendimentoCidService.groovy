package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(AtendimentoCid)
interface AtendimentoCidService {

    AtendimentoCid get(Serializable id)

    List<AtendimentoCid> list(Map args)

    Long count()

    void delete(Serializable id)

    AtendimentoCid save(AtendimentoCid atendimentoCid)

}