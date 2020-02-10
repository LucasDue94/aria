package br.com.hospitaldocoracaoal.aria
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

@Service(PortaBalao)
abstract class PortaBalaoService {

    abstract PortaBalao get(Serializable id)

    List<PortaBalao> list(GrailsParameterMap args) {

    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract PortaBalao save(PortaBalao portaBalao)

}