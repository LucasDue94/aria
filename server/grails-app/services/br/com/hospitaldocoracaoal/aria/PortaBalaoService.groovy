package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento
import grails.gorm.services.Service

@Service(PortaBalao)
abstract class PortaBalaoService {

    abstract PortaBalao get(Serializable id)

    abstract List<PortaBalao> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract PortaBalao save(PortaBalao portaBalao)

}