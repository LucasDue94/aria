package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Paciente
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

@Service(Setor)
abstract class SetorService {

    abstract Setor get(Serializable id)

    abstract List<Setor> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Setor save(Setor setor)

}