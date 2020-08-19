package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(Admissao)
interface AdmissaoService {

    Admissao get(Serializable id)

    List<Admissao> list(Map args)

    Long count()

    void delete(Serializable id)

    Admissao save(Admissao admissao)

}