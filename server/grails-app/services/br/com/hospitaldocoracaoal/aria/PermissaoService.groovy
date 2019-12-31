package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(Permissao)
interface PermissaoService {

    Permissao get(Serializable id)

    List<Permissao> list(Map args)

    Long count()

    void delete(Serializable id)

    Permissao save(Permissao permissao)

}